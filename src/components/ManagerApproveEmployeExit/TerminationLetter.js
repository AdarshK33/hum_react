import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const TerminationLetter = () => {
  const { terminationLetterData, loader, fetchTerminationLetterData } =
    useContext(EmployeeSeparationContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    // setLetterView(false);
  };
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    const infoData = {
      inputRef: inputRef,
      empId: terminationLetterData.employeeId,
      candidateId: 0,
      module: "Separation",
      empName: fetchemployeeData.firstName + " " + fetchemployeeData.lastName,
      empEmail: user.email,
      empPhNo: fetchemployeeData.phone,
      history: history,
      path: "../employee-separation-listing",
    };
    console.log(
      "getBoundingClientRect",
      inputRef.current.getBoundingClientRect()
    );
    CreatePdfAndUpload(infoData, "35,180,185,280");
    setShow(false);
  };

  return (
    <Fragment>
      {typeof terminationLetterData !== undefined ? (
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
                <p>
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <p>To ,</p>
                <p>
                  <p>
                    <b>Name:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}

                    {/* {terminationLetterData !== undefined &&
                    terminationLetterData.gender == "MALE"
                      ? `Mr.${terminationLetterData.employeeName}`
                      : terminationLetterData.gender == "FEMALE" &&
                        terminationLetterData.maritalStatus == "Single"
                      ? `Miss. ${terminationLetterData.employeeName}`
                      : `Mrs.${terminationLetterData.employeeName}`} */}
                  </p>
                  <p>
                    <b>EmployeeId:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                      terminationLetterData.employeeId}
                  </p>
                  <p>
                    <b>Designation:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                      terminationLetterData.designation}
                  </p>
                </p>
                <br />
                <p>
                  Dear{" "}
                  <b>
                  {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}
                    {/* {terminationLetterData !== undefined &&
                    terminationLetterData.gender == "MALE"
                      ? `Mr.${terminationLetterData.employeeName}`
                      : terminationLetterData.gender == "FEMALE" &&
                        terminationLetterData.maritalStatus == "Single"
                      ? `Miss. ${terminationLetterData.employeeName}`
                      : `Mrs.${terminationLetterData.employeeName}`} */}
                  </b>{" "}
                </p>
                <br></br>

                <p>
                   You have been associated Decathlon Sports India
                  Private Limited  (“entity name/prodin/indeca”) as{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.position}
                  . This is reference to the Show Cause letter dated on{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.dateOfResignation}
                  . It has come to our knowledge that you have indulged in act
                  of misconduct{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.reason}{" "}
                  at in {terminationLetterData.company}. The facts of the same
                  are as below
                  <br />
                  <br />
                  Hence the above acts of yours have constituted serious
                  misconduct in connection with the employer’s business or
                  property. Therefore, you are hereby terminated from your
                  employment with Decathlon Sports India Pvt Ltd / Prodin /
                  Indeca with immediate effect as on{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.lastWorkingDate}
                  . Y our full and final settlement post calculations of any
                  dues from you will be recovered and shall be paid to you
                  during the next payroll cycle.
                  <br />
                  <br />
                </p>
                <p>Thanking you,</p>
                <br />
                <p>
                  <b>For {terminationLetterData.company} </b>
                </p>
                <Row>
                  <Col sm="8"></Col>
                  <Col sm="4">
                    <p>
                      {" "}
                      Accepted By 
                      {/* {terminationLetterData !== undefined &&
                        terminationLetterData.costCentreManagerName} */}
                        {terminationLetterData !== undefined &&
                        terminationLetterData.employeeName}
                    </p>
                  </Col>
                </Row>
                <p>
                  Authorized Signatory <br />
                  Manager
                  <br />
                  Name:{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.managerName}
                </p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            terminationLetterData &&
            Object.keys(terminationLetterData).length &&
            terminationLetterData.employeeId !== null &&
            terminationLetterData.employeeId !== undefined ? (
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
export default TerminationLetter;
{
  /* <Fragment>
          <div>
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
                  terminationLetterData.gender == "MALE"?`Mr.${terminationLetterData.employeeName}`
                  :(terminationLetterData.gender == "FEMALE" && terminationLetterData.maritalStatus == "Single")?`Miss ${terminationLetterData.employeeName}`:`Mrs.${terminationLetterData.employeeName}`}
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
            <br/>
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
                  terminationLetterData.gender == "MALE"?
                  `Mr.${terminationLetterData.employeeName}`
                  :(terminationLetterData.gender == "FEMALE" && 
                  terminationLetterData.maritalStatus == "Single")?
                  `Miss. ${terminationLetterData.employeeName}`
                  :`Mrs.${terminationLetterData.employeeName}`}
                  
                </b>{" "}
              </p>
              <p>
              
              You have been associated Decathlon Sports India Private Limited 
              (“entity name/prodin/indeca”) as{" "}{terminationLetterData !== 
              undefined && terminationLetterData.position}.
              This is reference to the Show Cause letter dated on{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.dateOfResignation}. It has come 
              to our knowledge that you have indulged in act of misconduct{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.reason}{" "}
                at in {terminationLetterData.company}. 
            The facts of the same are as below 
              </p>
              <p>
            Hence the above acts of yours have constituted serious misconduct in
            connection with the employer’s business or property.
             Therefore, you are hereby terminated from your employment with Decathlon
             Sports India Pvt Ltd / Prodin / Indeca with immediate effect as on{" "}
            {terminationLetterData !== undefined &&
            terminationLetterData.lastWorkingDate}. Your full and final
            settlement post calculations of any dues from you will be 
            recovered and shall be paid to you during the next payroll cycle.
                   </p>

            
              <p>
            Thanking you,
            </p>		<br/>
            <p className="mt-5 mb-5">
                <b>For {terminationLetterData.company} ,</b>
              </p>
                <Row>
             <Col sm="8"></Col>
              <Col sm="4">
              <p> Accepted By
          Mr.{terminationLetterData !== undefined &&
          terminationLetterData.costCentreManagerName}
          </p>
              </Col>
              </Row>
              <p>
            Authorised Signatory <br/>
              Manager<br/>
            Name:  {terminationLetterData !== undefined &&
            terminationLetterData.managerName} 
            </p>
            </div>
          </div>
        </Fragment>
       */
}
