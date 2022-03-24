import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const RelivingLetter = ({ anotherPath = false }) => {
  const {
    fetchRelievingLetterData,
    relivingLetterData,
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
  };
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    if (employeeData && Object.keys(employeeData).length) {
      const InfoData = {
        company: employeeData.company,
        contractType: employeeData.contractType,
        costCentreManagerEmailId: employeeData.costCentreManagerEmailId,
        costCentreManagerName: employeeData.costCentreManagerName,
        costCentreName: employeeData.costCentreName,
        dateOfResignation: employeeData.dateOfResignation,
        personalEmailId: employeeData.personalEmailId,
        empName: employeeData.empName,
        employeeComment: employeeData.employeeComment,
        employeeId: employeeData.employeeId,
        employeeName: employeeData.employeeName,
        exitId: employeeData.exitId,
        hoursWorked: employeeData.hoursWorked,
        lastWorkingDate: employeeData.lastWorkingDate,
        location: employeeData.location,
        managerCostCentre: employeeData.managerCostCentre,
        managerEmailId: employeeData.managerEmailId,
        managerId: employeeData.managerId ? employeeData.managerId : "",
        managerName: employeeData.managerName,
        managerPosition: employeeData.managerPosition,
        modeOfSeparationId: employeeData.modeOfSeparationId,
        modeOfSeparationReasonId: employeeData.modeOfSeparationReasonId,
        noticePeriodRecoveryDays: employeeData.noticePeriodRecoveryDays,
        noticePeriod: employeeData.noticePeriod,
        noticePeriodRecovery: employeeData.noticePeriodRecovery,
        position: employeeData.position,
        reHire: employeeData.reHire,
        reason: employeeData.reason,
        reasonForResignation: employeeData.reasonForResignation,
        rehireRemark: employeeData.rehireRemark,
        status: 2,
        withdraw: employeeData.withdraw,
      };
      console.log("save ", InfoData);
      UpdateEmplyoeeExist(InfoData, employeeData.employeeId);

      const infoData = {
        inputRef: inputRef,
        empId: relivingLetterData.employeeId,
        candidateId: 0,
        module: "Separation",
        empName: user.firstName + " " + user.lastName,
        empEmail: "rajasekhar@theretailinsights.com",
        empPhNo: user.phone,
        history: history,
        path: anotherPath ? "../employee-separation-listing" : "/exit-approval",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,180,185,280");
      setViewLetter(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {typeof relivingLetterData !== undefined ? (
        // {true ? (
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
              <div id="cnfLetter" ref={inputRef}>
                <p>
                  {" "}
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <h5 style={{ textAlign: "center" }}>
                  {" "}
                  RELIEVING & EXPERIENCE LETTER
                </h5>

                <p>
                  Name:
                  {relivingLetterData !== undefined &&
                  relivingLetterData.gender == "MALE"
                    ? `Mr.${relivingLetterData.employeeName}`
                    : relivingLetterData.gender == "FEMALE" &&
                      relivingLetterData.maritalStatus == "Single"
                    ? `Miss. ${relivingLetterData.employeeName}`
                    : `Mrs.${relivingLetterData.employeeName}`}
                </p>
                <p>
                  Employee ID:
                  {relivingLetterData !== undefined &&
                    relivingLetterData.employeeId}
                </p>
                <p>
                  Designation:
                  {relivingLetterData !== undefined &&
                    relivingLetterData.designation}
                </p>

                <br />
                <p>
                  Dear{" "}
                  <b>
                    {relivingLetterData !== undefined &&
                    relivingLetterData.gender == "MALE"
                      ? `Mr.${relivingLetterData.employeeName}`
                      : relivingLetterData.gender == "FEMALE" &&
                        relivingLetterData.maritalStatus == "Single"
                      ? `Miss. ${relivingLetterData.employeeName}`
                      : `Mrs.${relivingLetterData.employeeName}`}
                  </b>{" "}
                </p>
                <p>
                  With reference to your resignation. We would like to inform
                  you that your resignation has been accepted and you are
                  relieved from the services of the {relivingLetterData.company}{" "}
                  on the closing of working hours of{" "}
                  <b>
                    {relivingLetterData !== undefined &&
                      relivingLetterData.lastWorkingDate}
                  </b>
                  .
                  <br />
                  <br />
                  We hereby confirm that you have been working in{" "}
                  {relivingLetterData.company} &nbsp;since{" "}
                  <b>
                    {relivingLetterData !== undefined &&
                      relivingLetterData.dateOfJoining}
                  </b>
                  .
                  <br />
                  <br />
                  Please be informed that you shall be bound by the relevant
                  clause of your appointment letter which states that you shall
                  not use, disclose, remove or transfer whether directly or
                  indirectly, to any person, corporation or organisation, any
                  trade secrets, know-how and confidential information relating
                  to the business or financial conditions of{" "}
                  {relivingLetterData.company}.
                  <br />
                  <br />
                  During the employment tenure with us, we found him to be good
                  at work & thank you for your service and commitment to the{" "}
                  {relivingLetterData.company}.
                  <br />
                  <br />
                  He left the services of the {relivingLetterData.company} on
                  his own accord. We wish him all the best in his future
                  endeavours.
                </p>
                <br />
                <p>
                  <b>For {relivingLetterData.company} ,</b>
                </p>
                <br />
                <p>
                  <b>Authorised Signatory</b>
                </p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            relivingLetterData &&
            Object.keys(relivingLetterData).length &&
            relivingLetterData.employeeId !== null &&
            relivingLetterData.employeeId !== undefined ? (
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

export default RelivingLetter;
