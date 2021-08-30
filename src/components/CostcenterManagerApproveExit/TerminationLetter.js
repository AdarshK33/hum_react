import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import moment from "moment";
import calendarImage from "../../assets/images/calendar-image.png";
// import Pdf from "react-to-pdf";
// import ReactPDF from "@react-pdf/renderer";

import "./exitForm.css";
const ref = React.createRef();

const TerminationLetter = (props) => {
  const [showLetter, setLetter] = useState(false);
  const { terminationLetterData, fetchTerminationLetterData } = useContext(
    EmployeeSeparationContext
  );
  const [showSignature, setSignature] = useState(false);
  const [message, setMessage] = useState(false);
  const handleClose = () => {
    setLetter(false);
  };
  useEffect(() => {
    if (props.terminationLetter) {
      console.log(props.terminationLetter);
      setLetter(true);
    }
    // console.log(relievingLetterData,"relieving")
  }, [props.terminationLetter]);
  const addSignature = () => {
    setSignature(true);
  };

  const handleSave = () => {
    setLetter(false);
    // setMessage(true);
  };
  // const handleClosePopup = () => {
  //   setMessage(false);
  // };
  return (
    console.log(showLetter),
    console.log(props.terminationLetter),
    console.log("letterData", terminationLetterData),
    (
      <Fragment>
        <Modal show={showLetter} onHide={() => handleClose()} size="md">
          <Container className="mb-5">
            <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
            <Modal.Body>
              <div ref={ref}>
                <p className="float-left mb-5">
                  {" "}
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>

                <div className="relievingLetterHeading">
                  <div className="mt-1">
                    <p>To,</p>
                    <p>
                      Name:&nbsp;&nbsp;
                      {terminationLetterData !== undefined &&
                        terminationLetterData.employeeName}
                    </p>
                    <p>
                      EmployeeId:&nbsp;&nbsp;
                      {terminationLetterData !== undefined &&
                        terminationLetterData.employeeId}
                    </p>
                    <p>
                      Designation:&nbsp;&nbsp;
                      {terminationLetterData !== undefined &&
                        terminationLetterData.designation}
                    </p>
                  </div>
                </div>
                <p>
                  {" "}
                  <b>Sub:</b>Termination of your employment{" "}
                </p>
                <div className="relievingLetterContent mb-5">
                  <p className="mt-5 mb-5">
                    {" "}
                    Dear{" "}
                    <b>
                      {terminationLetterData !== undefined &&
                        terminationLetterData.employeeName}
                      ,
                    </b>{" "}
                  </p>
                  <p>
                    You have been associated Decathlon Sports India Private
                    Limited (“Decathlon/Company”) at its XXXXXXXX located at{" "}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.location}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.company}
                    . It has come to our notice that you were working as{" "}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.designation}
                    . This is reference to the Show Cause letter dated on{" "}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.dateOfResignation}
                    . It has come to our knowledge that on XXXXXXXXXXX, you have
                    indulged in act of misconduct{" "}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.reason}{" "}
                    at in {terminationLetterData.company}. The facts of the same
                    are as below Hence the above acts of yours have constituted
                    serious misconduct in connection with the employer’s
                    business or property. Therefore, you are hereby terminated
                    from your employment with Decathlon with immediate effect as
                    on{" "}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.lastWorkingDate}
                    . Your full and final settlement post calculations of any
                    dues from you will be recovered and shall be paid to you
                    during the next payroll cycle.
                  </p>
                  <p className="mt-5 mb-5">
                    <b>For {terminationLetterData.company} Pvt Ltd,</b>
                  </p>
                </div>
                <div style={{ textAlign: "end" }}>
                  {showSignature && (
                    <div>
                      <img src={calendarImage} alt="calendar" width="100px" />
                    </div>
                  )}
                  {!showSignature && (
                    <div className="mt-3">
                      <button
                        className="signatureButtons"
                        onClick={() => addSignature()}
                      >
                        Add Signature
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mt-5 mb-5">
                {showSignature && (
                  <button
                    className="signatureButtons"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                )}
              </div>
              {/* <Pdf targetRef={ref} filename="relieving-letter.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
              </Pdf> */}
            </Modal.Body>
          </Container>
        </Modal>
      </Fragment>
    )
  );
};
export default TerminationLetter;
