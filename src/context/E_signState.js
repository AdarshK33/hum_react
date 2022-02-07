import React, { createContext, useReducer, useContext, useState } from "react";
import E_signReducer from "../reducers/E_signReducer";
import { Button, Modal } from "react-bootstrap";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

const initial_state = {
  uploadResponse: [],
  referenceResponse: [],
};

export const E_signContext = createContext();

export const E_signProvider = ({ children }) => {
  const [state, dispatch] = useReducer(E_signReducer, initial_state);
  const [letterShow, setLetterShow] = useState(false);
  const [EsignLoader, setLoader] = useState(false);
  const [showinfo, setShowInfo] = useState(false);
  const [notification, setNotif] = useState(false);
  const [DocName, setDocName] = useState("");
  const [docShow, setDocShow] = useState(false);
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

  const settingInfo = (val) => {
    setShowInfo(val);
  };
  const UploadEsignDoc = (data, eSignDetails, blob, empId) => {
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
      .post("/api/v1/e-sign/initiateTest?employeeId=" + empId, formData)
      .then((response) => {
        state.uploadResponse = response.data;
        console.log("uploadResponse", response);
        console.log("uploadResponse.data", response.data.requests[0]);
        //toast.info(response.data.message);
        // if (
        //   response.data &&
        //   response.data.requests[0] &&
        //   response.data.requests[0].refId
        // ) {
        //   getReference(parseInt(response.data.requests[0].refId));
        // }
        setLoader(false);
        // setSaveTheLetter(true);
        settingInfo(true);
        return dispatch({
          type: "UPLOAD_ESIGN",
          payload: state.uploadResponse,
        });
      })
      .catch((error) => {
        settingInfo(false);
        console.log(error);
      });
  };

  const getReference = (id, orgId = "6180cd3596d65ededc7d30f6") => {
    setLoader(true);
    client
      .get("/api/v1/e-sign/reference/" + orgId + "/" + id)
      .then((response) => {
        console.log("-->>>", response);
        state.referenceResponse = response.data;
        //toast.info(response.data.message);
        // console.log("response.eSign", response.data.eSign[0].refId);
        if (
          response.data &&
          response.data.eSign[0] &&
          response.data.eSign[0].status.toLowerCase() === "in-progress"
        ) {
          setNotification(true);
        } else {
          // window.open(response.data.eSign[0].downloadUrl, "_blank");
          setDocName(response.data.eSign[0].downloadUrl);
          setDocShow(true);
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
            {DocName ? (
              <div>
                <iframe
                  src={DocName + "#toolbar=0& navpanes=0"}
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
              </div>
            ) : (
              ""
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
          settingInfo,
          setNotification,
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
