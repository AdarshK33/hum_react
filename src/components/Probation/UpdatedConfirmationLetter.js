import React, {
  Fragment,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { ProbationContext } from "../../context/ProbationState";
import { E_signContext } from "../../context/E_signState";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { useHistory, useParams } from "react-router-dom";

const ConfirmationLetter1 = () => {
  const {
    cnfLetterData,
    loader,
    setLetterView,
    setSaveTheLetter,
    LetterSaved,
    ViewProbationDataById,
  } = useContext(ProbationContext);
  const { EmpProfileView, EmpProfile } = useContext(EmployeeProfileContext);
  const history = useHistory();

  useEffect(() => {
    if (
      cnfLetterData &&
      Object.keys(cnfLetterData).length &&
      cnfLetterData.empId !== null &&
      cnfLetterData.empId !== undefined
    ) {
      EmpProfileView(cnfLetterData.empId);
    }
  }, [cnfLetterData]);

  const { UploadEsignDoc, EsignLoader, settingInfo, showinfo, uploadResponse } =
    useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setLetterView(false);
  };

  console.log("ShowCNF->", show);
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    // ExportPDFandUpload(inputRef.current, cnfLetterData.empId, 2);

    const doc = new jsPDF();
    //get table html
    const pdfTable = document.getElementById("cnfLetter");
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // pdfMake.createPdf(documentDefinition).open();

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    console.log("doc--.-.", pdfDocGenerator.pageCount);

    pdfDocGenerator.getBuffer((buffer) => {
      var blobStore = new Blob([buffer], { type: "application/pdf" });
      blobStore.name = "esignDoc.pdf";
      console.log("blobStore", blobStore);

      const data = {
        recipient1: {
          observer: "false",
          pageNo: "1",
          reason: "testing",
          location: "Bangalore",
          rectangle: "0,0,150,100",
          name: EmpProfile.firstName ? EmpProfile.firstName : null,
          // "John Doe",
          email: "rajasekhar@theretailinsights.com",
          //  EmpProfile.email ?EmpProfile.email: null ,,
          phoneNumber: EmpProfile.phone ? EmpProfile.phone : null,
          // "+91 8074058844",
          signature_type: "Aadhaar",
        },
      };
      const eSignDetails = {
        orgId: "6180cd3596d65ededc7d30f6",
        checkOrder: "true",
        reminder: "true",
        reminder_duration: 12,
        eStampRequired: "false",
        signature_expiry: "08/07/2022",
      };

      UploadEsignDoc(data, eSignDetails, blobStore, cnfLetterData.empId);
    });

    console.log("inputRef.current-->", inputRef.current);
    setShow(false);
    // setSaveTheLetter(true);
  };
  const handleLoaderClose = () => {};
  return (
    <Fragment>
      <Modal show={EsignLoader} onHide={handleLoaderClose} size="md">
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

      {typeof cnfLetterData !== undefined ? (
        // {true ? (

        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {loader ? (
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
            ) : (
              <div id="cnfLetter" ref={inputRef}>
                <div>
                  <p className="">
                    {" "}
                    <b>Date: {moment().format("DD-MM-YYYY")}</b>
                  </p>
                  <br></br>
                  <p>
                    To Ms./Mr. &nbsp;<b>{cnfLetterData.empName}</b>
                  </p>
                  <p>Address :</p>
                  <p>
                    <b>{cnfLetterData.address}</b>
                  </p>
                  <p className="mt-5 ">
                    {" "}
                    <b>Dear &nbsp;{cnfLetterData.empName},</b>{" "}
                  </p>
                  <p>
                    <b> Sub: Confirmation of Employment</b>
                  </p>

                  <div className=" ">
                    <p>
                      We are glad to inform you that the management is pleased
                      to confirm you in service with effect from{" "}
                      <b>{cnfLetterData.confirmationDate}</b>. All the other
                      terms and conditions of your appointment letter dated{" "}
                      shall remain same.
                      <br />
                      Please sign the copy of this letter as receipt of
                      acceptance.
                      <br />
                      <br />
                      Thanking You,
                    </p>
                    <p className="mt-5 ">
                      <b>For {cnfLetterData.company} Pvt Ltd,</b>
                    </p>
                    <div className="float-right "></div>
                  </div>
                </div>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            cnfLetterData &&
            Object.keys(cnfLetterData).length &&
            cnfLetterData.empId !== null &&
            cnfLetterData.empId !== undefined ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ConfirmationLetter1;
