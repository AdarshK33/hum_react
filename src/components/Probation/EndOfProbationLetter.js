import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { ProbationContext } from "../../context/ProbationState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const EndOfProbationLetter = () => {
  const {
    updateProbation,
    ViewProbationDataById,
    probationData,
    endLetterData,
    loader,
    setLetterView,
    empId,
    ViewProbationEndLetter,
  } = useContext(ProbationContext);
  const { employeeData, UpdateEmplyoeeExist, lettterview, setViewLetter } =
    useContext(EmployeeSeparationContext);
  const { user } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setLetterView(false);
    setViewLetter(false);
  };
  const HandleSaveLetter = () => {
    setSaveLetter(true);
    if (
      employeeData.employeeId !== null &&
      employeeData.employeeId !== undefined
    ) {
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
        exitId: employeeData.exitId,
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
        status: 7,
      };

      console.log("createExitData", data2);
      UpdateEmplyoeeExist(data2);

      const infoData = {
        inputRef: inputRef,
        empId: endLetterData.empId,
        candidateId: 0,
        module: "Separation",
        empName: user.firstName + " " + user.lastName,
        empEmail: "amit.kumar@qsometech.com",
        empPhNo: user.phone,
        history: history,
        path: "../employee-separation-listing",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,340,185,440");
      ViewProbationEndLetter(employeeData.employeeId);
      setViewLetter(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {typeof endLetterData !== undefined ? (
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
                {/* <br></br>
          <h5 className="text-center">TERMINATION OF PROBATIONARY PERIOD</h5> */}
                <p>
                  <b>To,</b>
                </p>
                <p>
                  Employee Name:
                  {endLetterData.empName}
                </p>
                <p>
                  Employee ID:
                  {endLetterData.empId}
                </p>
                <p>
                  <b>Sub: Termination of Probationary Period</b>
                </p>

                <br />
                <p>
                  {" "}
                  Dear <b>{endLetterData.empName},</b>{" "}
                </p>
                <p>
                  This is to inform you that the probation period is being
                  terminated effective on{" "}
                  <b>
                    {" "}
                    {endLetterData.exitDate !== null &&
                    endLetterData.exitDate !== undefined
                      ? moment(new Date(endLetterData.exitDate)).format(
                          "DD-MM-YYYY"
                        )
                      : ""}
                  </b>{" "}
                  We have observed that your performance in the company is
                  unsatisfactory and hereby your employment with company is
                  terminated. <br />
                  <br />
                  Please sign the copy of this letter as receipt of acceptance.
                  <br />
                  <br />
                  Yours Sincerely,
                </p>
                <p>
                  <b>For {endLetterData.company} Pvt Ltd,</b>
                </p>
                <p>Authorised Signatory</p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            endLetterData &&
            Object.keys(endLetterData).length &&
            endLetterData.empId !== null &&
            endLetterData.empId !== undefined ? (
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

export default EndOfProbationLetter;
