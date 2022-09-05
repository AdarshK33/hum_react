import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import ShowCauseNotice from "./ShowCauseNoticeLetter";
import NonPerformanceLetter from "./NonPerformanceLetter";
import WarningLetter from "../WarningManager/WarningLetter";
import NonPerformanceWarningLetter from "../WarningManager/NonPerformanceWarningLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import { PermissionContext } from "../../../context/PermissionState";
import { useHistory, useParams } from "react-router-dom";
import { Employee360Context } from "../../../context/Employee360State";

// view-----
const ActionPage = () => {
  const [showModal, setModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [intern, setIntern] = useState(false);
  const history = useHistory();
  const [showShowCauseNoticeModal, setShow] = useState(false);
  const [showShowCauseNoticeModalLink, setShowLink] = useState(false);
  const [showShowCauseNoticeModalLink1, setShowLink1] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);

  const [showCauseReason, setShowCauseReason] = useState("");
  const [EmpName, setEmpName] = useState();
  const { rolePermission } = useContext(PermissionContext);
  // const {employeeid   } = useParams();
  const params = useParams();

  const paramsemployeeId = params["employeeId"];
 
  const [state, setState] = useState({
    empId: "",
    empName: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empAddress: "",
    employeePosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    reasonForCause: "",
    reason: "",
    remarks: "",
    empRemark: "",
    warningReason: "",
    pip: "",
    warningComment: "",
    clickOnsubmit: false,

    actionDueDaysSCIN: "",
    actionIssuedDateSCIN: "",
    disciplinaryId: "",
    employeeActionStatusSCIN: "",
    employeeCommentSCIN: "",
    managerCommentSCIN: "",
    reasonIdSCIN: "",
    reasonDetailsIdSCIN: "",
    reasonSCIN: "",
    reasonDetailsSCIN: "",
    showCauseLetterSCIN: "",
    showCauseNoticeSCIN: "",
    statusDescSCIN: "",
    warningIssuedSCIN: "",
    employeeCommentDW: "",
    employeeWarningStatusDW: "",
    managerCommentDW: "",
    reasonDW: "",
    reasonDetailsDW: "",
    reasonIdDW: "",
    reasonDetailsIdDW: "",
    statusDescDW: "",
    warningDueDaysDW: "",
    warningIdDW: "",
    warningIssuedDateDW: "",
    pipEndDate: "",
    warningLetterDW: "",
  });
  const {
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    IssueShowCauseNoticeLetter,
    issueShowCauseNoticeData,
    createShowCauseIssue,
    loader,
    lettterview,
    setViewLetter,
  } = useContext(DisciplinaryContext);

  const { Manager360ListData} =useContext(Employee360Context);
  useEffect(() => {
    if (Manager360ListData) {
          let getDisciplinaryId = Manager360ListData.map((item)=>{
          if(item?.employeeId===paramsemployeeId ){
            disciplinaryEmployeeSearch(item?.disciplinaryAction?.disciplinaryId);
          }
    });
  }
  }, [paramsemployeeId]);

  useEffect(() => {
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0
    ) {
      state.empId = disciplinarySearchData.employeeId;
      state.empName = disciplinarySearchData.employeeName;
      setEmpName(
        disciplinarySearchData.employeeName +
          " " +
          disciplinarySearchData.employeeId
      );

      state.empContractType = disciplinarySearchData.contractType;
      state.empCostCenterName = disciplinarySearchData.employeeCostCentre;
      state.empAddress = disciplinarySearchData.employeeAddress;
      state.employeePosition = disciplinarySearchData.employeePosition;
      state.mngrId = disciplinarySearchData.managerId;
      state.mngrName = disciplinarySearchData.managerName;
      state.mngrPosition = disciplinarySearchData.managerPosition;
      state.mngrCostCenterName = disciplinarySearchData.managerCostCentre;

      if (
        disciplinarySearchData.disciplinaryAction !== null &&
        disciplinarySearchData.disciplinaryAction !== undefined &&
        disciplinarySearchData.disciplinaryAction !== ""
      ) {
        state.empRemark =
          disciplinarySearchData.disciplinaryAction.employeeComment;
        state.reasons =
          disciplinarySearchData.disciplinaryAction.managerComment;
        state.reasonForCause =
          disciplinarySearchData.disciplinaryAction.reasonDetails;
        setShowCauseReason(disciplinarySearchData.disciplinaryAction.reason);
        state.actionDueDaysSCIN =
          disciplinarySearchData.disciplinaryAction.actionDueDays;
        state.actionIssuedDateSCIN =
          disciplinarySearchData.disciplinaryAction.actionIssuedDate;
        state.disciplinaryId =
          disciplinarySearchData.disciplinaryAction.disciplinaryId;
        state.employeeActionStatusSCIN =
          disciplinarySearchData.disciplinaryAction.employeeActionStatus;
        state.employeeCommentSCIN =
          disciplinarySearchData.disciplinaryAction.employeeComment;
        state.empId = disciplinarySearchData.disciplinaryAction.employeeId;
        state.managerCommentSCIN =
          disciplinarySearchData.disciplinaryAction.managerComment;
        state.reasonIdSCIN = disciplinarySearchData.disciplinaryAction.reasonId;
        state.reasonDetailsIdSCIN =
          disciplinarySearchData.disciplinaryAction.reasonDetailsId;
        state.reasonSCIN = disciplinarySearchData.disciplinaryAction.reason;
        state.reasonDetailsSCIN =
          disciplinarySearchData.disciplinaryAction.reasonDetails;
        state.showCauseLetterSCIN =
          disciplinarySearchData.disciplinaryAction.showCauseLetter;
        // state.showCauseNoticeSCIN =
        //   disciplinarySearchData.disciplinaryAction.showCauseNotice;
        state.statusDescSCIN =
          disciplinarySearchData.disciplinaryAction.statusDesc;
        state.warningIssuedSCIN =
          disciplinarySearchData.disciplinaryAction.warningIssued;
        state.employeeReasonAccepted =
          disciplinarySearchData.disciplinaryAction.employeeReasonAccepted;
      }
      if (
        disciplinarySearchData.disciplinaryWarning !== null &&
        disciplinarySearchData.disciplinaryWarning !== undefined &&
        disciplinarySearchData.disciplinaryWarning !== ""
      ) {
        state.warningReason = disciplinarySearchData.disciplinaryWarning.reason;
        state.warningComment =
          disciplinarySearchData.disciplinaryWarning.managerComment;
        state.pip =
          disciplinarySearchData.disciplinaryWarning.improvementPeriod;

        state.disciplinaryId =
          disciplinarySearchData.disciplinaryWarning.disciplinaryId;
        state.employeeCommentDW =
          disciplinarySearchData.disciplinaryWarning.employeeComment;
        state.employeeWarningStatusDW =
          disciplinarySearchData.disciplinaryWarning.employeeWarningStatus;

        state.managerCommentDW =
          disciplinarySearchData.disciplinaryWarning.managerComment;
        state.reasonDW = disciplinarySearchData.disciplinaryWarning.reason;
        state.reasonDetailsDW =
          disciplinarySearchData.disciplinaryWarning.reasonDetails;
        state.reasonIdDW = disciplinarySearchData.disciplinaryWarning.reasonId;
        state.reasonDetailsIdDW =
          disciplinarySearchData.disciplinaryWarning.reasonDetailsId;

        state.statusDescDW =
          disciplinarySearchData.disciplinaryWarning.statusDesc;
        state.warningDueDaysDW =
          disciplinarySearchData.disciplinaryWarning.warningDueDays;
        state.warningIdDW =
          disciplinarySearchData.disciplinaryWarning.warningId;
        state.warningIssuedDateDW =
          disciplinarySearchData.disciplinaryWarning.warningIssuedDate;
        state.pipEndDate =
          disciplinarySearchData.disciplinaryWarning.pipEndDate;
        state.warningLetterDW =
          disciplinarySearchData.disciplinaryWarning.warningLetter;
      }
    }
  }, [disciplinarySearchData]);
  console.log("disciplinarySearchData", disciplinarySearchData);

  const handleShowCauseLetterClose = () => setShow(false);
  const handleShowCauseLetterClose1 = () => {
    setShow(false);
    history.push("../disciplinary-action");
  };
  const LetterShow = () => {
    console.log(";;;;;");
    setShowLink(true);
  };
  const LetterShow1 = () => {
    console.log(";;;;;");
    setShowLink1(true);
  };
  const handleShowCauseLetterCloseLink = () => {
    setShow(false);
    setShowLink1(false);
    setShowLink(false);
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalShowCauseLetter = (e) => {
    if (
      disciplinarySearchData.employeeId !== null &&
      disciplinarySearchData.employeeId !== undefined
    ) {
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      submitHandler(e);

      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };

  const previewShowCauseLetter = (e) => {
    e.preventDefault();
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
      disciplinaryEmployeeSearch(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const ShowCauseLetterClick = (e) => {
    e.preventDefault();
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
      disciplinaryEmployeeSearch(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      handleShow();
      setViewLetter(true);
      setPreviewGeneratedLetter(true);
    }
  };
  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };
  // end
  const handleClose = () => {
    setModal(false);
    setSuccessModal(false);
  };

  const submitHandler = (e) => {
    console.log("submit handler");
    e.preventDefault();

    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0
    ) {
      const InfoData = {
        contractType: state.empContractType,
        disciplinaryAction: {
          actionDueDays: state.actionDueDaysSCIN,
          actionIssuedDate: state.actionIssuedDateSCIN,
          disciplinaryId: state.disciplinaryId,
          employeeActionStatus: state.employeeActionStatusSCIN,
          employeeComment: state.employeeCommentSCIN,
          employeeId: state.empId,
          managerComment: state.managerCommentSCIN,
          reasonId: state.reasonIdSCIN,
          initiatedRole: rolePermission !== null ? rolePermission : null,
          reasonDetailsId: state.reasonDetailsIdSCIN,
          reason: state.reasonSCIN,
          reasonDetails: state.reasonDetailsSCIN,
          showCauseLetter: state.showCauseLetterSCIN,
          // showCauseNotice: state.showCauseNoticeSCIN,
          status: 0,
          statusDesc: state.statusDescSCIN,
          warningIssued: state.warningIssuedSCIN,
        },
        disciplinaryWarning:
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== " "
            ? {
                disciplinaryId: state.disciplinaryId,
                employeeComment: state.employeeCommentDW,
                employeeWarningStatus: state.employeeWarningStatusDW,
                improvementPeriod: state.pip,
                managerComment: state.managerCommentDW,
                reason: state.reasonDW,
                initiatedRole: rolePermission !== null ? rolePermission : null,
                reasonDetails: state.reasonDetailsDW,
                reasonId: state.reasonIdDW,
                reasonDetailsId: state.reasonDetailsIdDW,
                status: 0,
                statusDesc: state.statusDescDW,
                warningDueDays: state.warningDueDaysDW,
                warningId: state.warningIdDW,
                warningIssuedDate: state.warningIssuedDateDW,
                pipEndDate: state.pipEndDate,
                warningLetter: state.warningLetterDW,
              }
            : null,

        employeeAddress: state.empAddress,
        employeePosition: state.employeePosition,
        employeeCostCentre: state.empCostCenterName,
        employeeId: state.empId,
        employeeName: state.empName,
        managerCostCentre: state.mngrCostCenterName,
        managerPosition: state.mngrPosition,
        managerId: state.mngrId,
        managerName: state.mngrName,
      };
      console.log("InfoData", InfoData);
      createShowCauseIssue(InfoData);
      setSubmitted(true);
      state.clickOnsubmit = true;
      setPreview(true);
      // setSuccessModal(true);
    } else {
      console.log("search data is null");
    }
  };
  console.log(disciplinarySearchData, "disciplinarySearchData");
  return (
    <Fragment>
      {/* letter */}
      <Modal
        show={showShowCauseNoticeModalLink}
        onHide={handleShowCauseLetterCloseLink}
        size="md"
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          disciplinarySearchData.disciplinaryAction !== "" &&
          disciplinarySearchData.disciplinaryAction.reasonId == 2 ? (
            <ShowCauseNotice />
          ) : (
            <NonPerformanceLetter />
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={showShowCauseNoticeModalLink1}
        onHide={handleShowCauseLetterCloseLink}
        size="md"
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== "" &&
          disciplinarySearchData.disciplinaryWarning.reasonId == 2 ? (
            <WarningLetter sign={false} />
          ) : (
            <NonPerformanceWarningLetter sign={false} />
          )}
        </Modal.Body>
      </Modal>

      {submitLetter ? (
        <Modal
          show={showShowCauseNoticeModal}
          onHide={handleShowCauseLetterClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
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
            ) : disciplinarySearchData &&
              disciplinarySearchData &&
              disciplinarySearchData !== null &&
              disciplinarySearchData !== undefined &&
              Object.keys(disciplinarySearchData).length !== 0 &&
              disciplinarySearchData.disciplinaryWarning !== undefined &&
              disciplinarySearchData.disciplinaryWarning !== "" &&
              disciplinarySearchData.disciplinaryWarning !== null &&
              disciplinarySearchData.disciplinaryWarning.reportingType !==
                null &&
              disciplinarySearchData.disciplinaryWarning.reportingType !==
                undefined ? (
              disciplinarySearchData.disciplinaryWarning.reportingType === 1 ? (
                <label className="text-center">
                  Warning details saved successfully , the employee has been
                  notified.
                </label>
              ) : rolePermission == "manager" ? (
                <label className="text-center">
                  Warning details saved successfully, sent for cost center
                  manager confirmation.
                </label>
              ) : rolePermission == "costCenterManager" ? (
                <label className="text-center">
                  Warning details saved successfully, sent for super cost center
                  manager confirmation.
                </label>
              ) : rolePermission == "superCostCenterManager" ? (
                <label className="text-center">
                  Warning details saved successfully, sent for admin
                  confirmation.
                </label>
              ) : (
                <label className="text-center">
                  Warning letter details saved successfully.
                </label>
              )
            ) : disciplinarySearchData &&
              disciplinarySearchData &&
              disciplinarySearchData !== null &&
              disciplinarySearchData !== undefined &&
              Object.keys(disciplinarySearchData).length !== 0 &&
              disciplinarySearchData.disciplinaryAction !== null &&
              disciplinarySearchData.disciplinaryAction !== undefined &&
              disciplinarySearchData.disciplinaryAction.reportingType !==
                null &&
              disciplinarySearchData.disciplinaryAction.reportingType !==
                undefined ? (
              disciplinarySearchData.disciplinaryAction.reportingType === 1 ? (
                <label className="text-center">
                  Show cause notice details saved successfully, Employee has
                  been notified.
                </label>
              ) : rolePermission == "manager" ? (
                <label className="text-center">
                  Show cause notice details saved successfully, sent for Cost
                  Center Manager confirmation.
                </label>
              ) : rolePermission == "costCenterManager" ? (
                <label className="text-center">
                  Show cause notice details saved successfully, sent for Super
                  Cost Center Manager confirmation.
                </label>
              ) : rolePermission == "superCostCenterManager" ? (
                <label className="text-center">
                  Show cause notice details saved successfully, sent for Admin
                  confirmation.
                </label>
              ) : (
                <label className="text-center">
                  Show cause notice details saved successfully.
                </label>
              )
            ) : (
              <label className="text-center">
                Show cause notice details saved successfully.
              </label>
            )}

            <div className="text-center">
              <Button onClick={handleShowCauseLetterClose1}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      {lettterview ? (
        <div>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== "" &&
          disciplinarySearchData.disciplinaryWarning.reasonId == 2 ? (
            <WarningLetter />
          ) : disciplinarySearchData &&
            disciplinarySearchData !== null &&
            disciplinarySearchData !== undefined &&
            Object.keys(disciplinarySearchData).length !== 0 &&
            disciplinarySearchData.disciplinaryWarning !== null &&
            disciplinarySearchData.disciplinaryWarning !== undefined &&
            disciplinarySearchData.disciplinaryWarning !== "" &&
            disciplinarySearchData.disciplinaryWarning.reasonId == 1 ? (
            <NonPerformanceWarningLetter />
          ) : disciplinarySearchData &&
            disciplinarySearchData &&
            disciplinarySearchData !== null &&
            disciplinarySearchData !== undefined &&
            Object.keys(disciplinarySearchData).length !== 0 &&
            disciplinarySearchData.disciplinaryAction !== null &&
            disciplinarySearchData.disciplinaryAction !== undefined &&
            disciplinarySearchData.disciplinaryAction !== "" &&
            disciplinarySearchData.disciplinaryAction.reasonId == 2 ? (
            <ShowCauseNotice />
          ) : (
            <NonPerformanceLetter />
          )}
        </div>
      ) : (
        ""
      )}

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label>
              {disciplinarySearchData &&
              disciplinarySearchData &&
              disciplinarySearchData !== null &&
              disciplinarySearchData !== undefined &&
              Object.keys(disciplinarySearchData).length !== 0 &&
              disciplinarySearchData.disciplinaryWarning !== null &&
              disciplinarySearchData.disciplinaryWarning !== undefined &&
              disciplinarySearchData.disciplinaryWarning !== ""
                ? rolePermission == "costCenterManager"
                  ? "Warning letter details saved successfully, the employee has been notified."
                  : "Warning letter issued successfully ,sent for Cost Center Manager confirmation."
                : rolePermission == "costCenterManager"
                ? "Show cause notice details saved successfully,the employee has been notified"
                : "Show cause notice details saved successfully, sent for Cost Center Manager confirmation."}
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Breadcrumb title="DISCIPLINARY ACTION" parent="DISCIPLINARY ACTION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>DISCIPLINARY ACTION</b>
                </div>
                <Form>
                  <Row
                    style={{
                      marginRight: "2rem",
                    }}
                  >
                    <Col>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Emp Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {EmpName}
                              </label>
                            </label>
                          </div>
                        </Col>

                        <Col sm={4}>
                          <div>
                            <label>
                              Contract Type:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empContractType}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empCostCenterName}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={8}>
                          <div>
                            <label>
                              Address:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empAddress}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.employeePosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Manager Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrName}
                                &nbsp; {state.mngrId}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrCostCenterName}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={6}>
                          <div>
                            <label>
                              Issue Show Cause Notice For:
                              <label className="itemResult">
                                &nbsp;&nbsp; {showCauseReason}
                              </label>
                            </label>
                          </div>
                        </Col>
                        {showCauseReason === "Misconduct" ? (
                          <Col sm={6}>
                            <div>
                              <label>
                                Reason For Show Cause Notice:
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.reasonForCause}
                                </label>
                              </label>
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>State Reason for Show Cause Notice:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.reasons}
                            </label>
                          </div>
                        </Col>
                      </Row>
                      {/* <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>Preview Show Cause Notice:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <a onClick={LetterShow}>
                              {" "}
                              <u className="itemResult">
                                View Show Cause Notice
                              </u>
                            </a>
                          </div>
                        </Col>
                      </Row> */}
                      {state.empRemark !== null &&
                      state.empRemark !== undefined &&
                      state.empRemark !== "" ? (
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "2rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label>Respond To Show Cause Notice:</label>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div>
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empRemark}
                              </label>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {disciplinarySearchData &&
                      disciplinarySearchData &&
                      disciplinarySearchData !== null &&
                      disciplinarySearchData !== undefined &&
                      Object.keys(disciplinarySearchData).length !== 0 &&
                      disciplinarySearchData.disciplinaryAction !== null &&
                      disciplinarySearchData.disciplinaryAction !== undefined &&
                      disciplinarySearchData.disciplinaryAction !== "" &&
                      disciplinarySearchData.disciplinaryAction
                        .employeeReasonAccepted !== null &&
                      disciplinarySearchData.disciplinaryAction
                        .employeeReasonAccepted !== undefined &&
                      disciplinarySearchData.disciplinaryAction
                        .employeeReasonAccepted !== "" ? (
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={3}>
                            <label>
                              Do you accept the reason submitted by the
                              employee?{" "}
                            </label>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  checked={
                                    disciplinarySearchData.disciplinaryAction
                                      .employeeReasonAccepted === "true"
                                      ? true
                                      : false
                                  }
                                  disabled={true}
                                  style={{ borderColor: "blue" }}
                                  // onChange={handleAcceptEmployeeReason}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  checked={
                                    disciplinarySearchData.disciplinaryAction
                                      .employeeReasonAccepted === "false"
                                      ? true
                                      : false
                                  }
                                  disabled={true}
                                  style={{ borderColor: "blue" }}
                                  // onChange={handleAcceptEmployeeReason}
                                />
                                <label className="itemResult">No</label>
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {disciplinarySearchData &&
                      disciplinarySearchData &&
                      disciplinarySearchData !== null &&
                      disciplinarySearchData !== undefined &&
                      Object.keys(disciplinarySearchData).length !== 0 &&
                      disciplinarySearchData.disciplinaryWarning !== null &&
                      disciplinarySearchData.disciplinaryWarning !==
                        undefined &&
                      disciplinarySearchData.disciplinaryWarning !== "" ? (
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "2rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={3}>
                            <label>Issue Warning Letter </label>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  disabled={true}
                                  checked={
                                    disciplinarySearchData &&
                                    disciplinarySearchData &&
                                    disciplinarySearchData !== null &&
                                    disciplinarySearchData !== undefined &&
                                    Object.keys(disciplinarySearchData)
                                      .length !== 0 &&
                                    disciplinarySearchData.disciplinaryWarning !==
                                      null &&
                                    disciplinarySearchData.disciplinaryWarning !==
                                      undefined &&
                                    disciplinarySearchData.disciplinaryWarning !==
                                      ""
                                      ? true
                                      : false
                                  }
                                  style={{ borderColor: "blue" }}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  disabled={true}
                                  checked={
                                    (disciplinarySearchData &&
                                      disciplinarySearchData &&
                                      disciplinarySearchData !== null &&
                                      disciplinarySearchData !== undefined &&
                                      Object.keys(disciplinarySearchData)
                                        .length !== 0 &&
                                      disciplinarySearchData.disciplinaryWarning ===
                                        null) ||
                                    disciplinarySearchData.disciplinaryWarning ===
                                      undefined ||
                                    disciplinarySearchData.disciplinaryWarning ===
                                      ""
                                      ? true
                                      : false
                                  }
                                  style={{ borderColor: "blue" }}
                                />
                                <label className="itemResult">No</label>
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {disciplinarySearchData &&
                      disciplinarySearchData &&
                      disciplinarySearchData !== null &&
                      disciplinarySearchData !== undefined &&
                      Object.keys(disciplinarySearchData).length !== 0 &&
                      disciplinarySearchData.disciplinaryWarning !== null &&
                      disciplinarySearchData.disciplinaryWarning !==
                        undefined &&
                      disciplinarySearchData.disciplinaryWarning !== "" ? (
                        <div>
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "2rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Col sm={6}>
                              <div>
                                <label>
                                  Reason for warning:
                                  <label className="itemResult">
                                    &nbsp;&nbsp; {state.warningReason}
                                  </label>
                                </label>
                              </div>
                            </Col>
                            {showCauseReason === "Misconduct" ? (
                              ""
                            ) : (
                              <Col sm={6}>
                                <div>
                                  <label>
                                    Performance improvement period:
                                    <label className="itemResult">
                                      &nbsp;&nbsp;{" "}
                                      {state.pip !== 0
                                        ? state.pip === 1
                                          ? state.pip + " Month"
                                          : state.pip + " Months"
                                        : ""}
                                    </label>
                                  </label>
                                </div>
                              </Col>
                            )}
                          </Row>
                          {showCauseReason === "Misconduct" ? (
                            ""
                          ) : (
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "2rem",
                                marginBottom: "1rem",
                              }}
                            >
                              <Col sm={6}>
                                <div>
                                  <label>
                                    PIP Start Date:
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {state.warningIssuedDateDW}
                                    </label>
                                  </label>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div>
                                  <label>
                                    PIP End Date:
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {state.pipEndDate}
                                    </label>
                                  </label>
                                </div>
                              </Col>
                            </Row>
                          )}
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "2rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Col sm={2}>
                              <div>
                                <label>State detailed reason:</label>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.warningComment}
                                </label>
                              </div>
                            </Col>
                          </Row>
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "2rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Col sm={2}>
                              <div>
                                <label>View Warning Letter:</label>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <a onClick={LetterShow1}>
                                  {" "}
                                  <u className="itemResult">
                                    View Warning Letter
                                  </u>
                                </a>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        ""
                      )}
                      <Row>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          {/* <button
                            disabled={submitted}
                            className={
                              submitted ? "confirmButton" : "stepperButtons"
                            }
                            onClick={submitHandler}
                          >
                            Confirm
                          </button> */}

                          {!saveLetter ? (
                            <button
                              // disabled={!submitted}
                              className={"LettersButtonsExtra"}
                              onClick={ShowCauseLetterClick}
                            >
                              Add Digital Signature
                            </button>
                          ) : (
                            ""
                          )}
                          {/* {saveLetter ? (
                            <button
                              style={{ marginLeft: "-4px" }}
                              className={"LettersButtonsExtra"}
                              onClick={previewShowCauseLetter}
                            >
                              {disciplinarySearchData &&
                              disciplinarySearchData &&
                              disciplinarySearchData !== null &&
                              disciplinarySearchData !== undefined &&
                              Object.keys(disciplinarySearchData).length !==
                                0 &&
                              disciplinarySearchData.disciplinaryWarning !==
                                null &&
                              disciplinarySearchData.disciplinaryWarning !==
                                undefined &&
                              disciplinarySearchData.disciplinaryWarning !== ""
                                ? "Preview Warning Letter"
                                : " Preview Show Cause Notice"}
                            </button>
                          ) : (
                            ""
                          )} */}

                          {/* {saveLetter && (
                            <div className="preview-section">
                              <br></br>
                              <br></br>
                              <img
                                src={calendarImage}
                                alt="calendar"
                                width="200px"
                              />
                              <br></br>
                              <br></br>

                              {true ? (
                                <button
                                  disabled={letterSent}
                                  className={
                                    letterSent
                                      ? " confirmButton "
                                      : "stepperButtons"
                                  }
                                  onClick={submitfinalShowCauseLetter}
                                >
                                  Submit
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          )} */}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ActionPage;
