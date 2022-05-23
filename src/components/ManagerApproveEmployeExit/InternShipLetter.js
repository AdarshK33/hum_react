import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const InternShipLetter = () => {
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
        status: 6,
        withdraw: employeeData.withdraw,
        // iamStatus: "Delete"
      };
      console.log("save ", InfoData);
      UpdateEmplyoeeExist(InfoData, employeeData.employeeId);

      const infoData = {
        inputRef: inputRef,
        empId: relivingLetterData.employeeId,
        candidateId: 0,
        module: "Separation",
        empName: user.firstName + " " + user.lastName,
        empEmail:user.email,
        empPhNo: user.phone,
        history: history,
        path: "../employee-separation-listing",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,470,185,570");
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
              <div id="intLetter" ref={inputRef}>
                <p>
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <h5 style={{ textAlign: "center" }}>
                  TO WHOMSOEVER IT MAY CONCERN
                </h5>

                <p>
                  This is to certify that{" "}
                  {relivingLetterData !== undefined &&
                    relivingLetterData.employeeName}
                  {/* {relivingLetterData !== undefined &&
                  (relivingLetterData.gender === "male" ||
                    relivingLetterData.gender === "MALE" ||
                    relivingLetterData.gender === "Male")
                    ? `Mr.${relivingLetterData.employeeName}`
                    : ((relivingLetterData.gender === "female" ||
                        relivingLetterData.gender == "FEMALE" ||
                        relivingLetterData.gender == "Female") &&
                        relivingLetterData.maritalStatus === "single") ||
                      relivingLetterData.maritalStatus === "SINGLE" ||
                      relivingLetterData.maritalStatus === "Single"
                    ? `Miss. ${relivingLetterData.employeeName}`
                    : `Mrs.${relivingLetterData.employeeName}`} */}
                    {" "}
                  has completed internship at {relivingLetterData.company} 
                  , from <b>{relivingLetterData.dateOfJoining}</b> to{" "}
                  <b>{relivingLetterData.lastWorkingDate}</b> on under the
                  guidance of {relivingLetterData.managerName}.<br />
                  <br />
                  During the period of{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "his"
                    : "her"}{" "}
                  internship programme with us, we found{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "he"
                    : "she"}{" "}
                  was punctual, hardworking and inquisitive. We wish{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "his"
                    : "her"}{" "}
                  all the very best for{" "}
                  {relivingLetterData.gender === "male" ||
                  relivingLetterData.gender === "MALE" ||
                  relivingLetterData.gender === "Male"
                    ? "his"
                    : "her"}{" "}
                  future endeavours.
                </p>
                <br />
                <p>
                  <b>For {relivingLetterData.company} ,</b>
                </p>
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

export default InternShipLetter;
