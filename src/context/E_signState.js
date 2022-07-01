import React, { createContext, useReducer, useContext, useState,useEffect } from "react";
import E_signReducer from "../reducers/E_signReducer";
import { Button, Modal } from "react-bootstrap";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { PermissionContext } from "../context/PermissionState";

const initial_state = {
  uploadResponse: [],
  referenceResponse: [],
};

export const E_signContext = createContext();

export const E_signProvider = ({ children }) => {
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const [state, dispatch] = useReducer(E_signReducer, initial_state);
  const [letterShow, setLetterShow] = useState(false);
  const [EsignLoader, setLoader] = useState(false);
  const [showinfo, setShowInfo] = useState(false);
  const [notification, setNotif] = useState(false);
  const [DocName, setDocName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");

  const [docShow, setDocShow] = useState(false);
  const history = useHistory();
  const [notificationState, setNotificationState] = useState({
    email: "",
    phNo: "",
    history: "",
    path: "",
  });

  console.log("imageViewData",imageViewData);
  useEffect(() => {
    ImageView(DocName,EmployeeId)
  }, [DocName]);

  const handleClose = () => {
    setNotif(false);
  };
  const handleCloseDoc = () => {
    setDocShow(false);
    setDocName("");
  };
  const setNotification = (val) => {
    setNotif(val);
  };
  const handleCloseNotify = () => {
    setShowInfo(false);
    console.log("(notificationState.path)", notificationState.path);
    notificationState.history.push(notificationState.path);
  };

  const CreatePdfAndUpload = (
    infoData,
    rectangle = "0,0,150,100",
    firstPageSign = false,
    location = "Bangalore"
  ) => {
    const pdfTable = infoData.inputRef.current;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    var last_page = null;
    const documentDefinition = {
      content: html,
      tableAutoSize: true,
      styles: {
        "with-margin": {
          marginTop: 43, // apply a margin with the specific class is used
        },
      },
      pageBreakBefore: function (currentNode) {
        return (
          currentNode.style &&
          currentNode.style.indexOf("pdf-pagebreak-before") > -1
        );
      },
      footer: function (currentPage, pageCount) {
        last_page = pageCount;
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // pdfMake.createPdf(documentDefinition).open();

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    pdfDocGenerator.getBuffer((buffer) => {
      var blobStore = new Blob([buffer], { type: "application/pdf" });
      blobStore.name = "esignDoc.pdf";
      console.log("blobStore", blobStore);
      var data = {};
      if (infoData.recipient2) {
        data = {
          recipient1: {
            observer: "false",
            pageNo:
              firstPageSign === true
                ? "1"
                : firstPageSign === 3
                ? "3"
                : firstPageSign === false
                ? last_page.toString()
                : last_page.toString(),
            reason: "",
            location: location,
            rectangle: rectangle,
            name: infoData.empName,
            email: infoData.empEmail, //useremail@gmail.com,
            phoneNumber: infoData.empPhNo,
            signature_type: "Aadhaar",
          },
          recipient2: {
            observer: "false",
            pageNo:
              firstPageSign === true
                ? "1"
                : firstPageSign === 3
                ? "3"
                : firstPageSign === false
                ? last_page.toString()
                : last_page.toString(),
            reason: "",
            location: location,
            rectangle: infoData.recipient2.rectangle,
            name: infoData.recipient2.name,
            email:infoData.recipient2.email , //"sachin.nagalikar@theretailinsights.com",
            phoneNumber:  infoData.recipient2.phoneNumber ?infoData.recipient2.phoneNumber :"+91 1234567890",
            signature_type: "Aadhaar",
          },
        };
      } else {
        data = {
          recipient1: {
            observer: "false",
            pageNo: firstPageSign ? "1" : last_page.toString(),
            reason: "",
            location: location,
            rectangle: rectangle,
            name: infoData.empName,
            email:infoData.empEmail, //"useremail@gmail.com"
            phoneNumber: infoData.empPhNo,
            signature_type: "Aadhaar",
          },
        };
      }
      const eSignDetails = {
        orgId: "6180cd3596d65ededc7d30f6",
        checkOrder: "true",
        reminder: "true",
        reminder_duration: 12,
        eStampRequired: "false",
        signature_expiry: "08/07/2022",
      };
      UploadEsignDoc(
        data,
        eSignDetails,
        blobStore,
        infoData.empId,
        infoData.candidateId,
        infoData.module
      );
    });
    setNotificationState({
      email: infoData.empEmail,
      phNo: infoData.empPhNo,
      history: infoData.history,
      path: infoData.path,
    });
    console.log("inputRef.current-->", infoData.inputRef.current);
  };

  const UploadEsignDoc = (
    data,
    eSignDetails,
    blob,
    empId = 0,
    candidateId = 0,
    module
  ) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", blob, blob.name);
    formData.append("data", JSON.stringify(data));
    formData.append("eSignDetails", JSON.stringify(eSignDetails));

    console.log("blob", blob);
    console.log("data", data);
    console.log("eSignDetails", eSignDetails);
    console.log("formData", formData);
    client
      .post(
        "/api/v1/e-sign/initiateTest?candidateId=" +
          candidateId +
          "&employeeId=" +
          empId +
          "&moduleName=" +
          module,
        formData
      )
      .then((response) => {
        state.uploadResponse = response.data;
        console.log("uploadResponse", response);
        console.log("uploadResponse.data", response.data.requests[0]);
        //toast.info(response.data.message);
        setLoader(false);
        // setSaveTheLetter(true);
        setShowInfo(true);
        return dispatch({
          type: "UPLOAD_ESIGN",
          payload: state.uploadResponse,
        });
      })
      .catch((error) => {
        setShowInfo(false);
        console.log(error);
      });
  };

  // const getDocument = (letterName) => {
  //   setLoader(true);
  //       if (
  //         letterName &&
  //         letterName !== null &&
  //         letterName !== undefined &&
  //         letterName !== ""
  //       ) {
  //         setDocName(letterName);
  //         setDocShow(true); 
  //       } else {
  //         setNotification(true);
  //       }
  //       setLoader(false);
  // };

  const getReference = (id, letterName,employeeId,orgId = "6180cd3596d65ededc7d30f6") => {
    console.log(id, letterName,employeeId,"EsignStatus")
    setLoader(true);
    client
      .get("/api/v1/e-sign/reference/" + orgId + "/" + id)
      .then((response) => {
        console.log("-->>>", response);
        state.referenceResponse = response.data;
        if (letterName) {
          setEmployeeId(employeeId)
          setDocName(letterName);
          setDocShow(true);
        }else
        //  if (
        //   response.data &&
        //   response.data.eSign[0] &&
        //   response.data.eSign[0].status.toLowerCase() === "in-progress"
        // )
         {
          setNotification(true);
        } 
        setLoader(false);
        return dispatch({
          type: "REFERENCE_CHECK",
          payload: state.referenceResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {EsignLoader ? (
        <Modal show={EsignLoader} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            <div
              className="loader-box loader"
              style={{ width: "100% !important" }}
            >
              <div className="loader">
                <div className="line bg-primary"></div>
                <div className="line bg-primary"></div>
                <div className="line bg-primary"></div>
                <div className="line bg-primary"></div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      {showinfo ? (
        <Modal show={showinfo} onHide={handleCloseNotify} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <div className="text-center">
              <label>
                Notification sent successfully to{" "}
                <b>{notificationState.email}</b> and{" "}
                <b>{notificationState.phNo}</b> to complete e-sign process
              </label>
            </div>
            <div className="text-center mb-2">
              <Button
                onClick={handleCloseNotify}
                style={{ marginLeft: "1rem" }}
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {notification ? (
        <Modal show={notification} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <label>This document is in e-sign process</label>
            </div>
            <div className="text-center mb-2">
              <Button onClick={handleClose} style={{ marginLeft: "1rem" }}>
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {docShow ? (
        <Modal show={docShow} onHide={handleCloseDoc} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {DocName &&
             imageViewData !== undefined &&
             Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
              <div>
                 {/* <iframe
                    src={
                      process.env.REACT_APP_S3_URL +
                      DocName +
                      "#toolbar=0& navpanes=0"
                    }
                    style={{ width: "100%", height: "900px" }}
                    frameborder="0"
                  ></iframe> */}
                   <iframe
                  src={
                    imageViewData.data ? imageViewData.data +"#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
                  </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      <E_signContext.Provider
        value={{
          UploadEsignDoc,
          getReference,
          setNotification,
          CreatePdfAndUpload,
          uploadResponse: state.uploadResponse,
          referenceResponse: state.referenceResponse,
          showinfo: showinfo,
          EsignLoader: EsignLoader,
          notification: notification,
        }}
      >
        {children}
      </E_signContext.Provider>
    </div>
  );
};
