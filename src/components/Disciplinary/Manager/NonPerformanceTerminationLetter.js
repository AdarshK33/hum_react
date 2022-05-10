import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import { E_signContext } from "../../../context/E_signState";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../../context/PermissionState";
import { AppContext } from "../../../context/AppState";
import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";

const NonPerformanceTerminationLetter = () => {
  const {
    terminationLetterData,
    loader,
    employeeData,
    UpdateEmplyoeeExist,
    lettterview,
    setViewLetter,
  } = useContext(EmployeeSeparationContext);

  const { user } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
    // setLetterView(false);
  };

  const HandleSaveLetter = () => {
    // setSaveLetter(true);
    // if (candidateData && Object.keys(candidateData).length) {
    const data2 = {
      company: employeeData.company,
      contractType: employeeData.contractType,
      costCentreManagerEmailId: employeeData.costCentreManagerEmailId,
      costCentreManagerName: employeeData.costCentreManagerName,
      costCentreName: employeeData.costCentreName,
      dateOfResignation: employeeData.dateOfResignation,
      emailId: employeeData.emailId,
      empName: employeeData.empName,
      employeeComment: employeeData.employeeComment,
      employeeId: employeeData.employeeId,
      employeeName: employeeData.employeeName,
      exitId: employeeData.exitId ? employeeData.exitId : 0,
      hoursWorked: employeeData.hoursWorked,
      lastWorkingDate: employeeData.lastWorkingDate,
      location: employeeData.location,
      managerCostCentre: employeeData.managerCostCentre,
      managerEmailId: employeeData.managerEmailId,
      managerId: employeeData.managerId,
      managerName: employeeData.managerName,
      managerPosition: employeeData.managerPosition,
      modeOfSeparationId: employeeData.modeOfSeparationId,
      modeOfSeparationReasonId: employeeData.modeOfSeparationReasonId,
      noticePeriod: employeeData.noticePeriod,
      noticePeriodRecovery: employeeData.noticePeriodRecovery,
      noticePeriodRecoveryDays: employeeData.noticePeriodRecoveryDays,
      position: employeeData.position,
      reHire: employeeData.reHire,
      reason: employeeData.reason,
      reasonForResignation: employeeData.reasonForResignation,
      rehireRemark: employeeData.rehireRemark,
      status: employeeData.contractType
        ? employeeData.contractType.toLowerCase() === "internship"
          ? 2
          : 4
        : 4,
    };

    console.log("createExitData", data2);
    UpdateEmplyoeeExist(data2, employeeData.employeeId);

    console.log("HandleSaveLetter");
    const infoData = {
      inputRef: inputRef,
      empId: employeeData.employeeId,
      candidateId: 0,
      module: "Separation",
      empName: employeeData.managerName,
      empEmail: employeeData.managerEmailId,
      empPhNo: employeeData.managerPhNo,
      history: history,
      path: "../employee-separation-listing",
      recipient2: {
        rectangle: "430,20,580,120",
        name: employeeData.managerCostCentre,
        email: employeeData.costCentreManagerEmailId,
        phoneNumber: employeeData.costCentreManagerPhNo,
      },
    };
    console.log(
      "getBoundingClientRect",
      inputRef.current.getBoundingClientRect()
    );
    CreatePdfAndUpload(infoData, "35,20,185,120");
    setViewLetter(false);
    setShow(false);
    // }
  };
  return (
    <Fragment>
      {typeof terminationLetterData !== undefined ? (
        <Modal show={lettterview} onHide={handleClose} size="md">
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
              <div id="disMisconductLetter" ref={inputRef}>
                {/* <h5 className="text-center"> WARNING LETTER </h5> */}
                <p>
                  {" "}
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>

                <p>To ,</p>
                <p>
                  <p>
                    {" "}
                    <b>Name:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                    terminationLetterData.gender == "MALE"
                      ? `Mr.${terminationLetterData.employeeName}`
                      : terminationLetterData.gender == "FEMALE" &&
                        terminationLetterData.maritalStatus == "Single"
                      ? `Miss ${terminationLetterData.employeeName}`
                      : `Mrs.${terminationLetterData.employeeName}`}
                  </p>
                  <p>
                    <b>Employee ID:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                      terminationLetterData.employeeId}
                  </p>
                  <p>
                    <b>Address:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                      terminationLetterData.address}
                  </p>
                </p>
                <br />
                <p>
                  {" "}
                  <b>Sub:</b>
                  <b>Termination of your employment </b>
                </p>
                <br />
                <p>
                  {" "}
                  Dear{" "}
                  <b>
                    {terminationLetterData !== undefined &&
                    terminationLetterData.gender == "MALE"
                      ? `Mr.${terminationLetterData.employeeName}`
                      : terminationLetterData.gender == "FEMALE" &&
                        terminationLetterData.maritalStatus == "Single"
                      ? `Miss. ${terminationLetterData.employeeName}`
                      : `Mrs.${terminationLetterData.employeeName}`}
                  </b>{" "}
                </p>
                <br></br>

                <p>
                  You have been associated with {terminationLetterData.company}{" "}
                  as a{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.position}
                  .
                  <br />
                  <br />
                  You have been working under a Performance Improvement Plan
                  (PIP) designed to assist you in achieving a satisfactory level
                  of performance.
                  <br />
                  <br />
                  Unfortunately, you have not improved your performance to a
                  consistent acceptable standard as required. On Date{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.dateOfResignation}
                  , you were issued with a written warning in relation to your
                  poor performance.
                  <br />
                  <br />
                  This PIP period has now ended and it is time to assess your
                  performance over that period and your performance has not met
                  the required standard.
                  <br />
                  <br />
                  The performance over this period has been unsatisfactory.
                  Specifically,{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.reason}{" "}
                  {/* warningIssuedDate */}
                  <br />
                  <br />
                  Therefore, you are hereby terminated from your employment with{" "}
                  {terminationLetterData.company} / Prodin / Indeca with
                  immediate effect as on{" "}
                  {terminationLetterData !== undefined &&
                    terminationLetterData.lastWorkingDate}
                  . Your full and final settlement post calculations of any dues
                  from you will be recovered and shall be paid to you during the
                  next payroll cycle.
                  <br />
                  <br />
                </p>
                <p>Thanking you,</p>

                <div style={{ marginLeft: "2rem" }}>
                  {/* stylings are not accepting by html to pdf */}
                  <p>
                    For {terminationLetterData.company},
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    &nbsp; Accepted By 
                  </p>
                </div>
                <div style={{ marginLeft: "2rem" }}>
                  <p>
                    Authorised Signatory
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    &nbsp;&nbsp; Employee Signature
                  </p>
                </div>
                <div style={{ marginLeft: "2rem" }}>
                  {/* stylings are not accepting by html to pdf */}
                  <p>
                    Manager Name:
                    {terminationLetterData !== undefined &&
                      terminationLetterData.managerName}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    {terminationLetterData !== undefined &&
                      terminationLetterData.employeeName}
                  </p>
                </div>
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

export default NonPerformanceTerminationLetter;
