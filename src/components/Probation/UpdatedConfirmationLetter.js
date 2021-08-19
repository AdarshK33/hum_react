import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { ProbationContext } from "../../context/ProbationState";

const ConfirmationLetter1 = () => {
  const { cnfLetterData, loader } = useContext(ProbationContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);
  const { uploadBase64Image, ExportPDFandUpload } =
    useContext(DocsVerifyContext);
  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
  };
  const HandleSaveLetter = () => {
    ExportPDFandUpload(inputRef.current);
    console.log("inputRef.current-->", inputRef.current);
    setShow(false);
    setSaveLetter(true);
  };
  return (
    <Fragment>
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
              <div id="capture" ref={inputRef}>
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

export default ConfirmationLetter1;
