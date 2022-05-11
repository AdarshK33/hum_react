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

const MisConductTerminationLetter = () => {
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
        rectangle: "430,120,580,220",
        name: employeeData.managerCostCentre,
        email: employeeData.costCentreManagerEmailId,
        phoneNumber: employeeData.costCentreManagerPhNo,
      },
    };
    console.log(
      "getBoundingClientRect",
      inputRef.current.getBoundingClientRect()
    );
    CreatePdfAndUpload(infoData, "35,120,185,220");
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
                      ? `Miss. ${terminationLetterData.employeeName}`
                      : `Mrs.${terminationLetterData.employeeName}`}
                  </p>
                  <p>
                    <b>Employee ID:</b>&nbsp;&nbsp;
                    {terminationLetterData !== undefined &&
                      terminationLetterData.employeeId}
                  </p>
                  <p>
                    <b>Address :</b>&nbsp;&nbsp;
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
                  at its
                  {terminationLetterData.address} location as{" "}
                  {terminationLetterData.designation}.
                  {/* You have been associated {terminationLetterData.company}
              You have been associated {terminationLetterData.company} 
              (“entity name/prodin/indeca”) as{" "}{terminationLetterData !== 
              undefined && terminationLetterData.position}. */}
                  This is reference to the Show Cause letter dated on{" "}
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
                  Your explanation is not justified, Hence the above acts of
                  yours have constituted serious misconduct in connection with
                  the employer’s business or property .
                  <br />
                  <br />
                  Hence the above acts of yours have constituted serious
                  misconduct in connection with the employer’s business or
                  property. Therefore, you are hereby terminated from your
                  employment with {terminationLetterData.company} with immediate
                  effect as on{" "}
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

export default MisConductTerminationLetter;
