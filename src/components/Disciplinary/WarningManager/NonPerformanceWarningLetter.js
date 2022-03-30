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
//new template
const NonPerformanceWarningLetter = ({ approver = true, sign = true }) => {
  const {
    disciplinaryResonsView,
    disciplinaryEmployeeSearch,
    disciplinaryResonsData,
    issueShowCauseNoticeData,
    createShowCauseIssue,
    disciplinarySearchData,
    SubmitDisciplinaryLetter,
    loader,
    lettterview,
    setViewLetter,
    setModal,
    modalView,
  } = useContext(DisciplinaryContext);
  console.log(disciplinarySearchData);
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [showShowCauseNoticeModal, setShow] = useState(true);
  const history = useHistory();
  const ref = React.createRef();
  const inputRef = useRef(null);
  const [saveLetter, setSaveLetter] = useState(false);
  const handleShowCauseLetterClose = () => {
    setViewLetter(false);
    setShow(false);
    setModal(false);
  };

  const submitfinalShowCauseLetter = () => {
    setSaveLetter(true);
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction.disciplinaryId !== 0
    ) {
      var InfoData = {
        company: disciplinarySearchData.company,
        contractType: disciplinarySearchData.contractType,
        department: disciplinarySearchData.department,
        disciplinaryAction: {
          actionDueDays:
            disciplinarySearchData.disciplinaryAction.actionDueDays,
          actionIssuedDate:
            disciplinarySearchData.disciplinaryAction.actionIssuedDate,
          disciplinaryId:
            disciplinarySearchData.disciplinaryAction.disciplinaryId,
          employeeActionStatus:
            disciplinarySearchData.disciplinaryAction.employeeActionStatus,
          employeeComment:
            disciplinarySearchData.disciplinaryAction.employeeComment,
          initiatedRole:
            disciplinarySearchData.disciplinaryAction.initiatedRole,
          employeeId: disciplinarySearchData.disciplinaryAction.employeeId,
          managerComment:
            disciplinarySearchData.disciplinaryAction.managerComment,
          employeeReasonAccepted:
            disciplinarySearchData.acceptEmployeeReason == "yes"
              ? true
              : disciplinarySearchData.acceptEmployeeReason == "no"
              ? false
              : null,
          reason: disciplinarySearchData.disciplinaryAction.reason,
          reasonDetails:
            disciplinarySearchData.disciplinaryAction.reasonDetails,
          reasonDetailsId:
            disciplinarySearchData.disciplinaryAction.reasonDetailsId,
          reasonId: disciplinarySearchData.disciplinaryAction.reasonId,
          showCauseLetter:
            disciplinarySearchData.disciplinaryAction.showCauseLetter,
          showCauseNotice:
            disciplinarySearchData.disciplinaryAction.showCauseNotice,
          status: disciplinarySearchData.disciplinaryAction.status,
          statusDesc: disciplinarySearchData.disciplinaryAction.statusDesc,
          warningIssued: true,
        },
        disciplinaryWarning:
          disciplinarySearchData.disciplinaryAction.warningIssued === true
            ? {
                //api response data
                disciplinaryId:
                  disciplinarySearchData.disciplinaryWarning.disciplinaryId,
                employeeComment:
                  disciplinarySearchData.disciplinaryWarning.employeeComment,
                employeeWarningStatus:
                  disciplinarySearchData.disciplinaryWarning
                    .employeeWarningStatus,
                improvementPeriod: disciplinarySearchData.disciplinaryWarning
                  .improvementPeriod
                  ? parseInt(
                      disciplinarySearchData.disciplinaryWarning
                        .improvementPeriod
                    )
                  : 0,
                managerComment: disciplinarySearchData.warningManagerReason,
                pipEndDate:
                  disciplinarySearchData.disciplinaryWarning.pipEndDate,
                reason: disciplinarySearchData.disciplinaryWarning.reason,
                reasonDetails:
                  disciplinarySearchData.disciplinaryWarning.reasonDetails,
                reasonDetailsId:
                  disciplinarySearchData.disciplinaryWarning.reasonDetailsId,
                reasonId: disciplinarySearchData.disciplinaryWarning.reasonId,
                // status: rolePermission == "costCenterManager" ? 2 : 0,
                status: approver === true ? 0 : 2,
                statusDesc:
                  disciplinarySearchData.disciplinaryWarning.statusDesc,
                initiatedRole:
                  disciplinarySearchData.disciplinaryWarning.initiatedRole,
                warningDueDays:
                  disciplinarySearchData.disciplinaryWarning.warningDueDays,
                warningId: disciplinarySearchData.disciplinaryWarning.warningId,
                warningIssuedDate:
                  disciplinarySearchData.disciplinaryWarning.warningIssuedDate,
                warningLetter:
                  disciplinarySearchData.disciplinaryWarning.warningLetter,
              }
            : {
                //  input data
                disciplinaryId:
                  disciplinarySearchData.disciplinaryAction.disciplinaryId,
                employeeComment: null,
                employeeWarningStatus: null,
                improvementPeriod:
                  disciplinarySearchData.disciplinaryAction.improvementPeriod,
                //  state.InputImprovementPeriod,
                managerComment:
                  disciplinarySearchData.disciplinaryAction.managerComment,
                // warningManagerReason,
                initiatedRole:
                  disciplinarySearchData.disciplinaryAction.initiatedRole,
                reason: disciplinarySearchData.disciplinaryAction.reason,
                reasonDetails:
                  disciplinarySearchData.disciplinaryAction.reasonDetails,
                reasonDetailsId:
                  disciplinarySearchData.disciplinaryAction.reasonDetailsId,
                reasonId: disciplinarySearchData.inputReasonId,
                status: approver === true ? 0 : 2,
                statusDesc:
                  disciplinarySearchData.disciplinaryAction.statusDesc,
                warningDueDays:
                  disciplinarySearchData.disciplinaryAction.warningDueDays,
                warningId: disciplinarySearchData.disciplinaryAction.warningId,
                warningIssuedDate:
                  disciplinarySearchData.disciplinaryAction.warningIssuedDate,
                warningLetter: "WarningLetter.pdf",
              },
        employeeAddress: disciplinarySearchData.employeeAddress,
        employeeCostCentre: disciplinarySearchData.employeeCostCentre,
        employeeId: disciplinarySearchData.employeeId,
        employeeName: disciplinarySearchData.employeeName,
        managerCostCentre: disciplinarySearchData.managerCostCentre,
        managerPosition: disciplinarySearchData.managerPosition,
        managerId: disciplinarySearchData.managerId,
        managerName: disciplinarySearchData.managerName,
        position: disciplinarySearchData.position,
        storeLocation: disciplinarySearchData.storeLocation,
      };

      const infoData = {
        inputRef: inputRef,
        empId: 0, //disciplinarySearchData.employeeId,
        candidateId: parseInt(
          disciplinarySearchData.disciplinaryAction.disciplinaryId
        ),
        module: "Disciplinary Warning",
        empName: user.firstName + " " + user.lastName,
        empEmail: "rajasekhar@theretailinsights.com ",
        empPhNo: user.phone,
        history: history,
        path: "../disciplinary",
      };
      console.log("createShowCauseData", InfoData);
      createShowCauseIssue(InfoData, disciplinarySearchData.employeeId);
      SubmitDisciplinaryLetter(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      CreatePdfAndUpload(infoData, "35,250,185,350");
      setViewLetter(false);
      setModal(false);
      setShow(false);

      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };

  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Modal
          show={lettterview || modalView}
          onHide={handleShowCauseLetterClose}
          size="md"
        >
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
              <div id="warningLetter" ref={inputRef}>
                <h5 style={{ textAlign: "center" }}> WARNING LETTER </h5>
                <p>
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>{" "}
                </p>
                <br></br>
                <p>To ,</p>
                <p>
                  {" "}
                  <b>
                    {disciplinarySearchData !== null &&
                    disciplinarySearchData !== undefined &&
                    Object.keys(disciplinarySearchData).legth !== 0 &&
                    disciplinarySearchData.gender !== null &&
                    disciplinarySearchData.gender !== undefined &&
                    disciplinarySearchData.maritalStatus !== null &&
                    disciplinarySearchData.maritalStatus !== undefined
                      ? disciplinarySearchData.gender === "MALE"
                        ? "Mr."
                        : disciplinarySearchData.maritalStatus === "Married"
                        ? "Mrs."
                        : "Miss"
                      : "Mr./Ms."}
                  </b>{" "}
                  &nbsp; {disciplinarySearchData.employeeName}
                </p>
                <p>
                  <b>Residential Address:</b>{" "}
                  {disciplinarySearchData.employeeAddress}
                </p>

                {/* <p className="mt-5 ">
              {" "}
              Dear <b>{disciplinarySearchData.employeeName},</b>{" "}
            </p>
            <br></br> */}

                <p>
                  You have been associated with {disciplinarySearchData.company}{" "}
                   , as a{" "}
                  <b>{disciplinarySearchData.position}</b>.
                  <br />
                  On ,
                  <b>
                    {disciplinarySearchData.disciplinaryAction.actionIssuedDate}{" "}
                  </b>
                  , {disciplinarySearchData.company} issued to you a Show Cause
                  notice, asking you for a clear written explanation regarding
                  your Non- Performance at work.
                  {/* <b>{disciplinarySearchData.disciplinaryAction.managerComment} </b> */}
                  <br />
                  In furtherance, your reply to show cause notice is not
                  satisfactory and justified. Therefore you are hereby warned
                  and given an opportunity to improve the performance at work.
                  You will be given{" "}
                  {
                    disciplinarySearchData.disciplinaryWarning.improvementPeriod
                  }{" "}
                  months to improve your performance and we shall be reviewing
                  your performance after completion of{" "}
                  {disciplinarySearchData.disciplinaryWarning.improvementPeriod}{" "}
                  months by your leader. If your performance does not improve
                  within the given period appropriate disciplinary action will
                  follow.
                  <br />
                  Please note, the Company reserves the right to take
                  appropriate action with respect to any repetition of similar
                  acts.
                  <br />
                </p>
                <p>
                  <b>For {disciplinarySearchData.company},</b>
                </p>
                <p>
                  <b>Authorised Signatory</b>
                </p>
                <p>
                  {" "}
                  <b>Accpeted By:</b>{" "}
                  <b>{disciplinarySearchData.managerName}</b>
                </p>
                <p>
                  {" "}
                  <b>Employee Name:</b>{" "}
                  <b>{disciplinarySearchData.employeeName}</b>
                </p>
                <p>
                  {" "}
                  <b>Employee ID:</b> <b>{disciplinarySearchData.employeeId}</b>
                </p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            sign &&
            disciplinarySearchData &&
            Object.keys(disciplinarySearchData).length &&
            disciplinarySearchData.employeeId !== null &&
            disciplinarySearchData.employeeId !== undefined ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={submitfinalShowCauseLetter}
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

export default NonPerformanceWarningLetter;
