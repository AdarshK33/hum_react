import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import ShowCauseNotice from "../Disciplinary/Manager/ShowCauseNoticeLetter";
import calendarImage from "../../assets/images/calendar-image.png";
import { DisciplinaryContext } from "../../context/DisciplinaryState";
import { useHistory } from "react-router-dom";
import ReasonByEmployee from "../Disciplinary/Manager/ReasonByEmployee";
import NonPerformanceLetter from "../Disciplinary/Manager/NonPerformanceLetter";
import { PermissionContext } from "../../context/PermissionState";

// view-----
const EmployeShowCaseLetter = () => {
  // const [showModal, setModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [intern, setIntern] = useState(false);
  const history = useHistory();
  const [showShowCauseNoticeModal, setShow] = useState(false);
  const [view, setView] = useState(false);

  const [showShowCauseNoticeModalLink, setShowLink] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [employeeReasonShow, setEmployeeReasonShow] = useState(false);

  const [showCauseReason, setShowCauseReason] = useState("");
  const [EmpName, setEmpName] = useState();
  const [remarksError, setRemarkError] = useState(false);
  const [edit, setEdit] = useState(false);

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
    initiatedRoleSCIN: "",
    statusSCIN: "",
    employeeCommentDW: "",
    employeeWarningStatusDW: "",
    managerCommentDW: "",
    reasonDW: "",
    reasonDetailsDW: "",
    initiatedRoleDW: "",
    reasonIdDW: "",
    reasonDetailsIdDW: "",
    statusDescDW: "",
    warningDueDaysDW: "",
    warningIdDW: "",
    warningIssuedDateDW: "",
    warningLetterDW: "",
    statusDW: "",
    showCauseLetter:""
  });
  const {
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    IssueShowCauseNoticeLetter,
    issueShowCauseNoticeData,
    createShowCauseIssue,
    lettterview,
    setViewLetter,
    setModal,
    modalView,
  } = useContext(DisciplinaryContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);
  console.log("lettterview", lettterview);
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
        state.showCauseLetter=disciplinarySearchData.disciplinaryAction.showCauseLetter
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
        state.initiatedRoleSCIN =
          disciplinarySearchData.disciplinaryAction.initiatedRole;
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
        state.showCauseNoticeSCIN =
          disciplinarySearchData.disciplinaryAction.showCauseNotice;
        state.statusDescSCIN =
          disciplinarySearchData.disciplinaryAction.statusDesc;
        state.warningIssuedSCIN =
          disciplinarySearchData.disciplinaryAction.warningIssued;
        state.statusSCIN = disciplinarySearchData.disciplinaryAction.status;
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
        state.initiatedRoleDW =
          disciplinarySearchData.disciplinaryAction.initiatedRole;
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
        state.warningLetterDW =
          disciplinarySearchData.disciplinaryWarning.warningLetter;
        state.statusDW = disciplinarySearchData.disciplinaryWarning.status;
      }
    }
  }, [disciplinarySearchData]);
  console.log("disciplinarySearchData", disciplinarySearchData);

  const handleShowCauseLetterClose = () => setShow(false);
  const handleShowCauseLetterClose1 = () => {
    setShow(false);
    history.push("../my_disciplinary");
  };
  const LetterShow = () => {
    console.log(";;;;;");
    // setModal(true);
    // setShowLink(true);
      // setViewLetter(true)
      setView(true)
    ImageView(state.showCauseLetter,state.empId)
  };
  const handleShowCauseLetterCloseLink = () => setShowLink(false);

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalShowCauseLetter = () => {
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
          employeeComment: state.empRemark,
          employeeId: state.empId,
          managerComment: state.managerCommentSCIN,
          reasonId: state.reasonIdSCIN,
          reasonDetailsId: state.reasonDetailsIdSCIN,
          reason: state.reasonSCIN,
          initiatedRole: state.initiatedRoleSCIN,

          reasonDetails: state.reasonDetailsSCIN,
          showCauseLetter: state.showCauseLetterSCIN,
          showCauseNotice: state.showCauseNoticeSCIN,
          status: 2,
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
                reasonDetails: state.reasonDetailsDW,
                reasonId: state.reasonIdDW,
                reasonDetailsId: state.reasonDetailsIdDW,
                status: state.statusDW,
                initiatedRole: state.initiatedRoleDW,
                statusDesc: state.statusDescDW,
                warningDueDays: state.warningDueDaysDW,
                warningId: state.warningIdDW,
                warningIssuedDate: state.warningIssuedDateDW,
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
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
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
    // setModal(false);
    setSuccessModal(false);
  };
  const validateRemark = () => {
    if (
      state.empRemark !== "" &&
      state.empRemark !== null &&
      state.empRemark !== undefined
    ) {
      console.log(state.empRemark, "state.empRemark");
      setRemarkError(false);
      return true;
    } else {
      setRemarkError(true);
      return false;
    }
  };
  const EditHandler = (e) => {
    e.preventDefault();
    setEdit(true);
    setSubmitted(false);
  };

  const submitHandler = (e) => {
    console.log("submit handler");
    e.preventDefault();
    const value = validateRemark();

    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      value === true
    ) {
      const InfoData = {
        contractType: state.empContractType,
        disciplinaryAction: {
          actionDueDays: state.actionDueDaysSCIN,
          actionIssuedDate: state.actionIssuedDateSCIN,
          disciplinaryId: state.disciplinaryId,
          employeeActionStatus: state.employeeActionStatusSCIN,
          employeeComment: state.empRemark,
          employeeId: state.empId,
          managerComment: state.managerCommentSCIN,
          reasonId: state.reasonIdSCIN,
          reasonDetailsId: state.reasonDetailsIdSCIN,
          reason: state.reasonSCIN,
          reasonDetails: state.reasonDetailsSCIN,
          showCauseLetter: state.showCauseLetterSCIN,
          showCauseNotice: state.showCauseNoticeSCIN,
          initiatedRole: state.initiatedRoleSCIN,
          status: 9,
          //  state.statusSCIN
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
                reasonDetails: state.reasonDetailsDW,
                reasonId: state.reasonIdDW,
                reasonDetailsId: state.reasonDetailsIdDW,
                status: state.statusDW,
                statusDesc: state.statusDescDW,
                warningDueDays: state.warningDueDaysDW,
                initiatedRole: state.initiatedRoleDW,
                warningId: state.warningIdDW,
                warningIssuedDate: state.warningIssuedDateDW,
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
      setEdit(false);
      //   setSuccessModal(true);
    } else {
      console.log("search data is null");
    }
  };
  const changeHandler = (e) => {
    let valid = /[^A-Za-z0-9'.,-_ ]/;
    if (e.target.name === "empRemark" && e.target.value !== "") {
      if (valid.test(e.target.value) === true) {
        console.log("do nothing");
      } else {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    // setState({
    //   ...state,
    //   [e.target.name]: e.target.value,
    // });

    console.log(state);
  };

  const employeeReason = () => {
    console.log(";;;;;");
    setEmployeeReasonShow(true);
  };

  const handleEmployeeReason = () => setEmployeeReasonShow(false);
  const handleDocClose =()=>{
    setView(false)
  }
  return (
    <Fragment>
      {/* letter */}
      <Modal show={employeeReasonShow} onHide={handleEmployeeReason} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          disciplinarySearchData.disciplinaryAction !== "" ? (
            <ReasonByEmployee />
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
      {modalView ? (
        <div>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          disciplinarySearchData.disciplinaryAction !== "" &&
          disciplinarySearchData.disciplinaryAction.reasonId == 2 ? (
            <ShowCauseNotice sign={false} />
          ) : (
            <NonPerformanceLetter sign={false} />
          )}
        </div>
      ) : null}

      {submitLetter ? (
        <Modal
          show={showShowCauseNoticeModal}
          onHide={handleShowCauseLetterClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {disciplinarySearchData &&
              disciplinarySearchData &&
              disciplinarySearchData !== null &&
              disciplinarySearchData !== undefined &&
              Object.keys(disciplinarySearchData).length !== 0 &&
              disciplinarySearchData.disciplinaryAction !== null &&
              disciplinarySearchData.disciplinaryAction !== undefined &&
              disciplinarySearchData.disciplinaryAction !== "" &&
              disciplinarySearchData.disciplinaryAction.initiatedRole !== null
                ? disciplinarySearchData.disciplinaryAction.initiatedRole ==
                  "costCentermanager"
                  ? " Show cause response details saved successfully, cost center manager has been notified."
                  : disciplinarySearchData.disciplinaryAction.initiatedRole ==
                    "superCostCentermanager"
                  ? " Show cause response details saved successfully, super cost center manager has been notified."
                  : " Show cause response details saved successfully, " +
                    disciplinarySearchData.disciplinaryAction.initiatedRole +
                    " has been notified."
                : " Show cause response details saved successfully, respective person has been notified."}
            </label>
            <div className="text-center">
              <Button onClick={handleShowCauseLetterClose1}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
        <Modal show={view} onHide={handleDocClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {imageViewData !== undefined &&
             Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
              <div>

                  <iframe
                  src={
                    imageViewData.data ? imageViewData.data +
                    "#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
                {/* ) : (
                  <img
                  style={{ width: "100%", height: "100%" }}
                  src={imageViewData.data ? imageViewData.data:""}
                />
                )} */}
              </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>
      {lettterview ? (
        <div>
          {disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          disciplinarySearchData.disciplinaryAction !== "" ? (
            <ReasonByEmployee />
          ) : (
            ""
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
              Show cause details saved successfully, respective manager/cost
              center manager has been notified.
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
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>View Show Cause Notice:</label>
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
                            <label>
                              {" "}
                              Respond To Show Cause Notice:
                              <span style={{ color: "red" }}>*</span>
                            </label>
                          </div>
                        </Col>
                        {(submitted === true || state.statusSCIN === 9) &&
                        edit === false ? (
                          <Col sm={6}>
                            <div>
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empRemark}
                              </label>
                            </div>
                          </Col>
                        ) : (
                          <Col sm={10}>
                            {" "}
                            <Form.Group>
                              <Form.Control
                                style={
                                  remarksError
                                    ? { borderColor: "red" }
                                    : { borderRadius: "5px" }
                                }
                                as="textarea"
                                rows={4}
                                maxLength="500"
                                name="empRemark"
                                value={state.empRemark}
                                placeholder="Write here.."
                                onChange={(e) => changeHandler(e)}
                                required
                              />

                              {remarksError ? (
                                <p style={{ color: "red" }}>
                                  &nbsp; *Please add remarks
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                        )}
                      </Row>

                      <Row>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          {submitted === false &&
                          (state.statusSCIN !== 9 || edit === true) ? (
                            <button
                              className="stepperButtons"
                              onClick={submitHandler}
                            >
                              Save
                            </button>
                          ) : !previewGeneratedLetter ? (
                            <button
                              className="stepperButtons"
                              onClick={EditHandler}
                            >
                              Edit
                            </button>
                          ) : (
                            <button className="confirmButton" disabled={true}>
                              Save
                            </button>
                          )}

                          {(state.statusSCIN === 9 || submitted) &&
                          !saveLetter &&
                          edit === false ? (
                            <button
                              // disabled={!submitted}
                              className={"LettersButtonsExtra"}
                              onClick={ShowCauseLetterClick}
                            >
                              View Show Cause Response
                            </button>
                          ) : (
                            ""
                          )}
                          {saveLetter ||
                          (previewGeneratedLetter &&
                            showPreview &&
                            edit == false) ? (
                            <button
                              className={"LettersButtonsExtra"}
                              onClick={previewShowCauseLetter}
                            >
                              Preview Show Cause Response
                            </button>
                          ) : (
                            ""
                          )}

                          {saveLetter ||
                          (previewGeneratedLetter && showPreview) ? (
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
                          ) : (
                            ""
                          )}
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

export default EmployeShowCaseLetter;
