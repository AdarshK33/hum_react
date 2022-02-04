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

const ExtensionLetter1 = () => {
  const { extensionLetterData, loader, setLetterView, setSaveTheLetter } =
    useContext(ProbationContext);
  const { EmpProfileView, EmpProfile } = useContext(EmployeeProfileContext);
  useEffect(() => {
    if (
      extensionLetterData &&
      Object.keys(extensionLetterData).length &&
      extensionLetterData.empId !== null &&
      extensionLetterData.empId !== undefined
    ) {
      EmpProfileView(extensionLetterData.empId);
    }
  }, [extensionLetterData]);
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
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    // ExportPDFandUpload(inputRef.current, extensionLetterData.empId, 2);

    const doc = new jsPDF();
    //get table html
    const pdfTable = document.getElementById("extLetter");
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
          signature_type: "All",
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

      UploadEsignDoc(data, eSignDetails, blobStore, extensionLetterData.empId);
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
      {typeof extensionLetterData !== undefined ? (
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
              <div id="extLetter" ref={inputRef}>
                <h5 className="text-center">
                  {" "}
                  <u>LETTER OF EXTENSION OF PROBATIONARY PERIOD </u>
                </h5>
                <p className=""> Date: {moment().format("DD-MM-YYYY")}</p>
                <br></br>
                <p>
                  <b>To,</b>
                </p>
                <p>
                  <b>Name: &nbsp;{extensionLetterData.empName}</b>
                </p>
                <p>
                  <b>EmployeeId: &nbsp;{extensionLetterData.empId}</b>
                </p>
                {/* <p>Designation:{relivingLetterData.designation}</p> */}
                <br></br>
                <p className="mt-5 ">
                  {" "}
                  Dear &nbsp;<b>{extensionLetterData.empName},</b>{" "}
                </p>

                <div className=" ">
                  <p>
                    Based on the probation assessment, we regret to inform you
                    that your performance is unsatisfactory and we are unable to
                    confirm your employment at this point. We have decided to
                    extend your probationary period for a further{" "}
                    <b>{extensionLetterData.probationExtensionPeriod}</b> months
                    starting from{" "}
                    <b>{extensionLetterData.probationStartDate}</b> to{" "}
                    <b>{extensionLetterData.probationEndDate}</b>.
                    <br />
                    Within this period, you are advised to improve your skills
                    and performance and to work closely with your manager for
                    guidance and feedback.
                    <br />
                    At the end of this period, your performance will be
                    appraised and the final decision regarding your employment
                    will be made in view of your performance in the period.
                    <br />
                    However, if your performance is still unsatisfactory, the
                    company may decide to terminate your services due to
                    non-confirmation.
                    <br />
                    All the other terms and conditions of your appointment
                    letter dated{" "}
                    <b>{extensionLetterData.appointmentLetterDate}</b>, shall
                    remain the same.
                    <br />
                    <br />
                    Please sign the copy of this letter as receipt of
                    acceptance.
                    <br />
                    <br />
                    Yours Sincerely,
                    <br />
                  </p>
                  <p className="mt-5 ">
                    <b>For {extensionLetterData.company} Pvt Ltd,</b>
                  </p>
                  <div className="float-right "></div>
                </div>
              </div>
            )}
            {!saveLetter && !loader ? (
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

export default ExtensionLetter1;
