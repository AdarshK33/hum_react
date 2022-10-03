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

const ReasonByEmployee = ({ sign = true }) => {
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
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const history = useHistory();
  const ref = React.createRef();
  const inputRef = useRef(null);
  const [saveLetter, setSaveLetter] = useState(false);
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
    setModal(false);
  };

  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  console.log(disciplinarySearchData, "disciplinarySearchData");

  const submitfinalShowCauseLetter = (e) => {
    e.preventDefault();
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
          status: 2,
          statusDesc: disciplinarySearchData.disciplinaryAction.statusDesc,
          warningIssued:
            disciplinarySearchData.disciplinaryAction.warningIssued,
        },
        disciplinaryWarning:
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== " "
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
                status: disciplinarySearchData.disciplinaryWarning.status,
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
            : null,
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
        empId: disciplinarySearchData.employeeId,
        candidateId: 0,
        module: "Disciplinary Action Response",
        empName: fetchemployeeData.firstName + " " + fetchemployeeData.lastName,
        empEmail: user.email,
        empPhNo: fetchemployeeData.phone,
        history: history,
        path: "../my_disciplinary",
      };
      console.log("createShowCauseData", InfoData);
      createShowCauseIssue(InfoData, disciplinarySearchData.employeeId);
      SubmitDisciplinaryLetter(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      CreatePdfAndUpload(infoData, "35,260,185,360");
      setViewLetter(false);
      setModal(false);
      setShow(false);
    }
  };
  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Modal show={lettterview || modalView} onHide={handleClose} size="md">
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
                <p>
                  {" "}
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <p>To ,</p>
                {/* <p>
            {" "}
            <b>Ms./Mr.</b> &nbsp; {disciplinarySearchData.managerName}
          </p> */}
                <p>
                  {" "}
                  <b>
                    {/* {disciplinarySearchData !== null &&
                    disciplinarySearchData !== undefined &&
                    Object.keys(disciplinarySearchData).legth !== 0 &&
                    disciplinarySearchData.initiatedByGender !== null &&
                    disciplinarySearchData.initiatedByGender !== undefined &&
                    disciplinarySearchData.initiatedByMarital !== null &&
                    disciplinarySearchData.initiatedByMarital !== undefined
                      ? disciplinarySearchData.initiatedByGender === "MALE"
                        ? "Mr."
                        : disciplinarySearchData.initiatedByMarital ===
                          "Married"
                        ? "Mrs."
                        : "Miss."
                      : "Mr./Ms."} */}
                  </b>{" "}
                  &nbsp; {disciplinarySearchData !== undefined && disciplinarySearchData.initiatedByName}
                </p>
                <p> {disciplinarySearchData.company}</p>
                <br />
                <p>
                  <b>Sub:</b> Reply to the Show Cause Notice issued on{" "}
                  {moment().format("DD-MM-YYYY")}
                </p>
                <br />
                <p>
                  {" "}
                  Dear <b>{disciplinarySearchData.initiatedByName},</b>{" "}
                </p>
                <br></br>
                <p>
                  I would to explain my response towards the show cause issued
                  on{" "}
                  {disciplinarySearchData.disciplinaryAction.actionIssuedDate}{" "}
                  and here is my explanation to the same.
                </p>
                <br />
                <p>
                  {disciplinarySearchData.disciplinaryAction.employeeComment}
                </p>
                <br />
                <p>From,</p>
                <p>
                  {" "}
                  Employee Name: <b>{disciplinarySearchData.employeeName}</b>
                </p>
                <p>
                  {" "}
                  Employee ID: <b>{disciplinarySearchData.employeeId}</b>
                </p>
                <p> Signatory:</p>
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

export default ReasonByEmployee;
