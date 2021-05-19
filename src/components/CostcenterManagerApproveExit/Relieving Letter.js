import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import moment from "moment";
import calendarImage from "../../assets/images/calendar-image.png";

import "./exitForm.css";
const RelievingLetter = (props) => {
  const [showLetter, setLetter] = useState(false);
  const { relievingLetterData } = useContext(EmployeeSeparationContext);
  const [showSignature, setSignature] = useState(false);
  const [message, setMessage] = useState(false);
  const handleClose = () => {
    setLetter(false);
  };
  useEffect(() => {
    if (props.previewLetter) {
      console.log(props.previewLetter);
      setLetter(true);
    }
  }, [props.previewLetter]);
  const addSignature = () => {
    setSignature(true);
  };
  const handleSave = () => {
    setLetter(false);
    setMessage(true);
  };
  const handleClosePopup = () => {
    setMessage(false);
  };
  return (
    console.log(showLetter),
    console.log(props.previewLetter),
    (
      <Fragment>
        <Modal show={message} onHide={() => handleClosePopup()} centered>
          <Container style={{ textAlign: "center", margin: "2rem 0 2rem 0" }}>
            <Modal.Body>
              <p style={{ marginBottom: "2rem" }}>
                {" "}
                The details have been saved successfully. The relieving letter
                will be sent to the employee on {moment().format("DD-MM-YYYY")}
              </p>
              <Button onClick={() => handleClosePopup()}>OK</Button>
            </Modal.Body>
          </Container>
        </Modal>
        <Modal
          show={showLetter}
          onHide={() => handleClose()}
          size="md"
          // className="text-center"
        >
          <Container className="mb-5">
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <Modal.Body>
              <p className="float-left mb-5">
                {" "}
                Date: {moment().format("DD-MM-YYYY")}
              </p>
              <br></br>
              <h5 className="text-center"> RELIEVING & EXPERIENCE LETTER</h5>
              <div className="float-left">
                <div className="mt-1 mb-5">
                  <p>Name:</p>
                  <p>EmployeeId:</p>
                  <p>Designation:</p>
                </div>
              </div>
              <div className="relievingLetterContent mb-5">
                <p className="mt-5 mb-5">
                  {" "}
                  Dear <b>Candidate,</b>{" "}
                </p>
                <p>
                  With reference to your resignation. We would like to inform
                  you that your resignation has been accepted and you are
                  relieved from the services of the Decathlon Sports India on
                  the closing of working hours of 28-02-2018. We hereby confirm
                  that you have been working in Decathlon Sports India since
                  13-03-2007. Please be informed that you shall be bound by the
                  relevant clause of your appointment letter which states that
                  you shall not use, disclose, remove or transfer whether
                  directly or indirectly, to any person, corporation or
                  organisation, any trade secrets, know-how and confidential
                  information relating to the business or financial conditions
                  of Decathlon. During the employment tenure with us, we found
                  him to be good at work & thank you for your service and
                  commitment to the Decathlon. He left the services of the
                  Decathlon on his own accord. We wish him all the best in his
                  future endeavours.
                </p>
                <p className="mt-5 mb-5">
                  <b>For Decathlon Sports India India Pvt Ltd,</b>
                </p>
                <div className="float-right ">
                  {showSignature && (
                    <div className="text-center">
                      <img
                        src={calendarImage}
                        alt="calendar"
                        width="100px"
                        className="digital-signature"
                      />
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      className="signatureButtons"
                      onClick={() => addSignature()}
                    >
                      Add Signature
                    </button>
                  </div>
                  {showSignature && (
                    <div className="text-center mt-5 mb-5">
                      <button
                        className="signatureButtons"
                        onClick={() => handleSave()}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
          </Container>
        </Modal>
      </Fragment>
    )
  );
};
export default RelievingLetter;