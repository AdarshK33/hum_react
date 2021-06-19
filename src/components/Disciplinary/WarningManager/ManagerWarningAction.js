import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { Link } from "react-router-dom";
import WarningLetter from "./WarningLetter";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import moment from "moment";
import { toast } from "react-toastify";
import calendarImage from "../../../assets/images/calendar-image.png";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { set } from "js-cookie";
import "../Disciplinary.css";
const ManagerWarningAction = (props) => {
  const [reasonError, setReasonError] = useState("");
  const [improvementPeriodError, setImprovementPeriodError] = useState("");
  const [managerCommentError, setManagerCommentError] = useState("");
  const [showCauseReason, setShowCauseReason] = useState();
  const [EmpName, setEmpName] = useState();
  const [issueWarningStatus, setIssueWarningStatus] = useState("no");
  const [initalExit, setInitalExit] = useState(false);
  const [warningManagerReason, setWarningManagerReason] = useState("");
  const [showModal, setModal] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showShowCauseNoticeModal, setShow] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);

  const [state, setState] = useState({
    company: null,
    contractType: null,
    department: null,
    disciplinaryAction: {
      actionDueDays: 0,
      actionIssuedDate: null,
      disciplinaryId: 0,
      employeeActionStatus: null,
      employeeComment: null,
      employeeId: null,
      managerComment: null,
      reason: null,
      reasonDetails: null,
      reasonDetailsId: 0,
      reasonId: null,
      showCauseLetter: null,
      showCauseNotice: null,
      status: 0,
      statusDesc: null,
      warningIssued: null,
    },
    disciplinaryWarning: {
      disciplinaryId: 0,
      employeeComment: null,
      employeeWarningStatus: null,
      improvementPeriod: 0,
      managerComment: null,
      reason: null,
      reasonDetails: null,
      reasonDetailsId: 0,
      reasonId: 0,
      status: 0,
      statusDesc: null,
      warningDueDays: null,
      warningId: 0,
      warningIssuedDate: null,
      warningLetter: null,
    },
    employeeAddress: null,
    employeeCostCentre: null,
    employeeId: null,
    employeeName: null,
    managerCostCentre: null,
    managerDesignation: null,
    managerId: null,
    managerName: null,
    position: null,
    storeLocation: null,
    InputImprovementPeriod: "",
    inputReasonId: "",
  });

  const {
    disciplinaryEmployeeSearch,
    IssueShowCauseNoticeLetter,
    issueShowCauseNoticeData,
    createShowCauseIssue,
    disciplinarySearchData,
    SubmitDisciplinaryLetter,
  } = useContext(DisciplinaryContext);

  useEffect(() => {
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0
    ) {
      state.employeeId = disciplinarySearchData.employeeId;
      setEmpName(
        disciplinarySearchData.employeeName +
          " " +
          disciplinarySearchData.employeeId
      );
      state.company = disciplinarySearchData.company;
      state.contractType = disciplinarySearchData.contractType;
      state.department = disciplinarySearchData.department;
      state.position = disciplinarySearchData.position;
      state.storeLocation = disciplinarySearchData.storeLocation;
      state.employeeName = disciplinarySearchData.employeeName;
      state.contractType = disciplinarySearchData.contractType;
      state.employeeCostCentre = disciplinarySearchData.employeeCostCentre;
      state.employeeAddress = disciplinarySearchData.employeeAddress;
      state.managerId = disciplinarySearchData.managerId;
      state.managerName = disciplinarySearchData.managerName;
      state.managerDesignation = disciplinarySearchData.managerDesignation;
      state.employeeDesignation = disciplinarySearchData.employeeDesignation;
      state.managerCostCentre = disciplinarySearchData.managerCostCentre;

      if (
        disciplinarySearchData.disciplinaryAction !== null &&
        disciplinarySearchData.disciplinaryAction !== undefined &&
        disciplinarySearchData.disciplinaryAction !== ""
      ) {
        state.disciplinaryAction.actionDueDays =
          disciplinarySearchData.disciplinaryAction.actionDueDays;
        state.disciplinaryAction.actionIssuedDate =
          disciplinarySearchData.disciplinaryAction.actionIssuedDate;
        state.disciplinaryAction.disciplinaryId =
          disciplinarySearchData.disciplinaryAction.disciplinaryId;
        state.disciplinaryAction.employeeActionStatus =
          disciplinarySearchData.disciplinaryAction.employeeActionStatus;
        state.disciplinaryAction.employeeComment =
          disciplinarySearchData.disciplinaryAction.employeeComment;
        state.disciplinaryAction.employeeId =
          disciplinarySearchData.disciplinaryAction.employeeId;
        state.disciplinaryAction.managerComment =
          disciplinarySearchData.disciplinaryAction.managerComment;
        state.disciplinaryAction.reason =
          disciplinarySearchData.disciplinaryAction.reason;
        state.disciplinaryAction.reasonDetails =
          disciplinarySearchData.disciplinaryAction.reasonDetails;
        state.disciplinaryAction.reasonDetailsId =
          disciplinarySearchData.disciplinaryAction.reasonDetailsId;
        state.disciplinaryAction.reasonId =
          disciplinarySearchData.disciplinaryAction.reasonId;
        state.disciplinaryAction.showCauseLetter =
          disciplinarySearchData.disciplinaryAction.showCauseLetter;
        state.disciplinaryAction.showCauseNotice =
          disciplinarySearchData.disciplinaryAction.showCauseNotice;
        state.disciplinaryAction.status =
          disciplinarySearchData.disciplinaryAction.status;
        state.disciplinaryAction.statusDesc =
          disciplinarySearchData.disciplinaryAction.statusDesc;
        state.disciplinaryAction.warningIssued =
          disciplinarySearchData.disciplinaryAction.warningIssued;

        if (disciplinarySearchData.disciplinaryAction.reasonId === 1) {
          setShowCauseReason("Non-Performance");
        } else if (disciplinarySearchData.disciplinaryAction.reasonId === 2) {
          setShowCauseReason("Others");
        }
      }
      if (
        disciplinarySearchData.disciplinaryWarning !== null &&
        disciplinarySearchData.disciplinaryWarning !== undefined &&
        Object.keys(disciplinarySearchData.disciplinaryWarning).length !== 0 &&
        disciplinarySearchData.disciplinaryWarning !== ""
      ) {
        setIssueWarningStatus("yes");

        setWarningManagerReason(
          disciplinarySearchData.disciplinaryWarning.managerComment
        );
        state.disciplinaryWarning.disciplinaryId =
          disciplinarySearchData.disciplinaryWarning.disciplinaryId;
        state.disciplinaryWarning.employeeComment =
          disciplinarySearchData.disciplinaryWarning.employeeComment;
        state.disciplinaryWarning.employeeWarningStatus =
          disciplinarySearchData.disciplinaryWarning.employeeWarningStatus;
        state.disciplinaryWarning.improvementPeriod =
          disciplinarySearchData.disciplinaryWarning.improvementPeriod;
        state.disciplinaryWarning.managerComment =
          disciplinarySearchData.disciplinaryWarning.managerComment;
        state.disciplinaryWarning.reason =
          disciplinarySearchData.disciplinaryWarning.reason;
        state.disciplinaryWarning.reasonDetails =
          disciplinarySearchData.disciplinaryWarning.reasonDetails;
        state.disciplinaryWarning.reasonDetailsId =
          disciplinarySearchData.disciplinaryWarning.reasonDetailsId;
        state.disciplinaryWarning.reasonId =
          disciplinarySearchData.disciplinaryWarning.reasonId;
        state.disciplinaryWarning.status =
          disciplinarySearchData.disciplinaryWarning.status;
        state.disciplinaryWarning.statusDesc =
          disciplinarySearchData.disciplinaryWarning.statusDesc;

        state.disciplinaryWarning.warningDueDays =
          disciplinarySearchData.disciplinaryWarning.warningDueDays;
        state.disciplinaryWarning.warningId =
          disciplinarySearchData.disciplinaryWarning.warningId;

        state.disciplinaryWarning.warningIssuedDate =
          disciplinarySearchData.disciplinaryWarning.warningIssuedDate;
        state.disciplinaryWarning.warningLetter =
          disciplinarySearchData.disciplinaryWarning.warningLetter;

        if (disciplinarySearchData.disciplinaryWarning.reasonId === 1) {
          setShowCauseReason("Non-Performance");
        } else if (disciplinarySearchData.disciplinaryWarning.reasonId === 2) {
          setShowCauseReason("Others");
        }
      } else {
        setIssueWarningStatus("no");
        setWarningManagerReason("");

        state.disciplinaryWarning.improvementPeriod = "";
        state.disciplinaryWarning.managerComment = "";
        state.disciplinaryWarning.reason = "";
      }
    }
  }, [disciplinarySearchData]);
  const handleInitialExit = (e) => {
    e.preventDefault();
    var infoData = {
      company: state.company,
      contractType: state.contractType,
      department: state.department,
      disciplinaryAction: {
        actionDueDays: state.disciplinaryAction.actionDueDays,
        actionIssuedDate: state.disciplinaryAction.actionIssuedDate,
        disciplinaryId: state.disciplinaryAction.disciplinaryId,
        employeeActionStatus: state.disciplinaryAction.employeeActionStatus,
        employeeComment: state.disciplinaryAction.employeeComment,
        employeeId: state.disciplinaryAction.employeeId,
        managerComment: state.disciplinaryAction.managerComment,
        reason: state.disciplinaryAction.reason,
        reasonDetails: state.disciplinaryAction.reasonDetails,
        reasonDetailsId: state.disciplinaryAction.reasonDetailsId,
        reasonId: state.disciplinaryAction.reasonId,
        showCauseLetter: state.disciplinaryAction.showCauseLetter,
        showCauseNotice: state.disciplinaryAction.showCauseNotice,
        status: 1,
        statusDesc: state.disciplinaryAction.statusDesc,
        warningIssued: true,
      },
      disciplinaryWarning:
        state.disciplinaryAction.warningIssued === true
          ? {
              //api response data
              disciplinaryId: state.disciplinaryWarning.disciplinaryId,
              employeeComment: state.disciplinaryWarning.employeeComment,
              employeeWarningStatus:
                state.disciplinaryWarning.employeeWarningStatus,
              improvementPeriod: state.disciplinaryWarning.improvementPeriod,
              managerComment: state.disciplinaryWarning.managerComment,
              reason: state.disciplinaryWarning.reason,
              reasonDetails: state.disciplinaryWarning.reasonDetails,
              reasonDetailsId: state.disciplinaryWarning.reasonDetailsId,
              reasonId: state.disciplinaryWarning.reasonId,
              status: 1,
              statusDesc: state.disciplinaryWarning.statusDesc,
              warningDueDays: state.disciplinaryWarning.warningDueDays,
              warningId: state.disciplinaryWarning.warningId,
              warningIssuedDate: state.disciplinaryWarning.warningIssuedDate,
              warningLetter: state.disciplinaryWarning.warningLetter,
            }
          : null,
      employeeAddress: state.employeeAddress,
      employeeCostCentre: state.employeeCostCentre,
      employeeId: state.employeeId,
      employeeName: state.employeeName,
      managerCostCentre: state.managerCostCentre,
      managerDesignation: state.managerDesignation,
      managerId: state.managerId,
      managerName: state.managerName,
      position: state.position,
      storeLocation: state.storeLocation,
    };
    console.log(infoData, "infoData");
    createShowCauseIssue(infoData);
    setInitalExit(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var reason = state.inputReasonId;
    if (reason == "" || reason == null || reason == undefined) {
      setReasonError("Please add reason for warning");
    } else {
      setReasonError("");
    }
    var improvementPeriod = state.InputImprovementPeriod;
    if (
      improvementPeriod == "" ||
      improvementPeriod == null ||
      improvementPeriod == undefined
    ) {
      setImprovementPeriodError("Please add improvement period");
    } else {
      setImprovementPeriodError("");
    }
    var managerComment = warningManagerReason;
    if (
      managerComment == "" ||
      managerComment == null ||
      managerComment == undefined
    ) {
      setManagerCommentError("Please add reason ");
    } else {
      setManagerCommentError("");
    }
    if (
      improvementPeriod !== "" &&
      reason !== "" &&
      managerComment !== "" &&
      reason !== null &&
      improvementPeriod !== null &&
      managerComment !== null &&
      reason !== undefined &&
      improvementPeriod !== undefined &&
      managerComment !== undefined
    ) {
      var infoData = {
        company: state.company,
        contractType: state.contractType,
        department: state.department,
        disciplinaryAction: {
          actionDueDays: state.disciplinaryAction.actionDueDays,
          actionIssuedDate: state.disciplinaryAction.actionIssuedDate,
          disciplinaryId: state.disciplinaryAction.disciplinaryId,
          employeeActionStatus: state.disciplinaryAction.employeeActionStatus,
          employeeComment: state.disciplinaryAction.employeeComment,
          employeeId: state.disciplinaryAction.employeeId,
          managerComment: state.disciplinaryAction.managerComment,
          reason: state.disciplinaryAction.reason,
          reasonDetails: state.disciplinaryAction.reasonDetails,
          reasonDetailsId: state.disciplinaryAction.reasonDetailsId,
          reasonId: state.disciplinaryAction.reasonId,
          showCauseLetter: state.disciplinaryAction.showCauseLetter,
          showCauseNotice: state.disciplinaryAction.showCauseNotice,
          status: 0,
          statusDesc: state.disciplinaryAction.statusDesc,
          warningIssued: true,
        },
        disciplinaryWarning:
          state.disciplinaryAction.warningIssued === true
            ? {
                //api response data
                disciplinaryId: state.disciplinaryWarning.disciplinaryId,
                employeeComment: state.disciplinaryWarning.employeeComment,
                employeeWarningStatus:
                  state.disciplinaryWarning.employeeWarningStatus,
                improvementPeriod: state.disciplinaryWarning.improvementPeriod,
                managerComment: state.disciplinaryWarning.managerComment,
                reason: state.disciplinaryWarning.reason,
                reasonDetails: state.disciplinaryWarning.reasonDetails,
                reasonDetailsId: state.disciplinaryWarning.reasonDetailsId,
                reasonId: state.disciplinaryWarning.reasonId,
                status: 0,
                statusDesc: state.disciplinaryWarning.statusDesc,
                warningDueDays: state.disciplinaryWarning.warningDueDays,
                warningId: state.disciplinaryWarning.warningId,
                warningIssuedDate: state.disciplinaryWarning.warningIssuedDate,
                warningLetter: state.disciplinaryWarning.warningLetter,
              }
            : {
                //  input data
                disciplinaryId: state.disciplinaryAction.disciplinaryId,
                employeeComment: null,
                employeeWarningStatus: null,
                improvementPeriod: improvementPeriod,
                //  state.InputImprovementPeriod,
                managerComment: managerComment,
                // warningManagerReason,
                reason: null,
                reasonDetails: null,
                reasonDetailsId: 0,
                reasonId: state.inputReasonId,
                status: 0,
                statusDesc: null,
                warningDueDays: 0,
                warningId: 0,
                warningIssuedDate: null,
                warningLetter: null,
              },
        employeeAddress: state.employeeAddress,
        employeeCostCentre: state.employeeCostCentre,
        employeeId: state.employeeId,
        employeeName: state.employeeName,
        managerCostCentre: state.managerCostCentre,
        managerDesignation: state.managerDesignation,
        managerId: state.managerId,
        managerName: state.managerName,
        position: state.position,
        storeLocation: state.storeLocation,
      };
      console.log(infoData, "infoData");
      console.log("all okay");
      console.log(infoData, "infoData submit");
      createShowCauseIssue(infoData);

      setSubmitted(true);
      setPreview(true);
      setSuccessModal(true);
    } else {
      console.log("not okay");
    }
  };
  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "managerComment") {
      setWarningManagerReason(e.target.value);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeLetter = (e) => {
    var result = e.target.value;
    console.log(result, "result");
    // var result = document.getElementsByClassName("switch-input")[0].checked ? 'yes' : 'no'

    setIssueWarningStatus(result);
    console.log(result, "radio");
  };

  const handleClose = (e) => {
    console.log(state);
    setInitalExit(false);
    setModal(false);
    setSuccessModal(false);
  };

  const handleShowCauseLetterClose = () => setShow(false);
  const handleShowCauseLetterClose1 = () => {
    setShow(false);
    props.history.push("./probation");
  };

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
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction.disciplinaryId !== 0
    ) {
      SubmitDisciplinaryLetter(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);

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
      setPreviewGeneratedLetter(true);
    }
  };
  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };
  // end

  const handleInfoClose = () => {
    setShowInfoModal(false);
    setEmpName("");
    state.empId = "";
    state.empContractType = "";
    state.empAddress = "";
    state.empLocation = "";
    state.empCostCenterName = "";
  };
  console.log(issueWarningStatus, "warningstatus");
  return (
    <div>
      {initalExit ? (
        <Modal show={handleClose} onHide={handleClose} size="md" centered>
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Exit has been initated against the employee. Please go to
              separation module for next steps of action
            </label>
            <div className="text-center">
              <Button onClick={handleClose}>Close</Button>
              <></>
              <Link to={"/employee-separation-listing"}>
                <Button style={{ marginLeft: "1rem" }}>Next</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* letter */}

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
              Warning letter has been issued to the employee
            </label>
            <div className="text-center">
              <Button onClick={handleShowCauseLetterClose1}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : previewLetter || showShowCauseNoticeModal ? (
        <Modal
          show={showShowCauseNoticeModal}
          onHide={handleShowCauseLetterClose}
          size="md"
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {issueShowCauseNoticeData &&
            issueShowCauseNoticeData !== undefined &&
            issueShowCauseNoticeData !== null ? (
              <WarningLetter />
            ) : (
              ""
            )}
            <br></br>
            <Row>
              {/* <Col sm={6}>
                <p>Thanking you</p>
                <p>{employeeData.managerName}</p>
              </Col> */}

              {showSignature ? (
                <Fragment>
                  <br></br>
                  <img
                    src={calendarImage}
                    alt="calendar"
                    width="50px"
                    className="digital-signature"
                  />
                </Fragment>
              ) : (
                <>
                  <br></br>

                  <button
                    className={"stepperButtons"}
                    onClick={digitalSignature}
                  >
                    Add digital signature
                  </button>
                </>
              )}
            </Row>
            {showSignature && !previewLetter ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={saveOfferLetter}
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

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label>Warning letter has been issued to the employee</label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal show={showInfoModal} onHide={() => handleInfoClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">
              Warning letter for this employee {EmpName} has already been issued
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleInfoClose()}>Close</Button>
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
                  <b>DISCIPLINARY ACTION </b>
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
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Emp Name/Id:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label className="itemResult">
                                {state.employeeName}
                              </label>
                            </div>
                          </Col>
                        </>
                        <>
                          <>
                            <Col sm={2}>
                              <div>
                                <label>Contract Type:</label>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div>
                                <label className="itemResult">
                                  {state.contractType}
                                </label>
                              </div>
                            </Col>
                          </>
                          <Col sm={2}>
                            <div>
                              <label>Cost Center Name:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label className="itemResult">
                                {state.employeeCostCentre}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Address:</label>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div>
                              <label className="itemResult">
                                {state.employeeAddress}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Designation:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label className="itemResult">
                                {state.employeeDesignation}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Manager Name & manager ID:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label className="itemResult">
                                {state.managerName}
                              </label>
                            </div>
                          </Col>
                        </>
                        <>
                          <>
                            <Col sm={2}>
                              <div>
                                <label>Designation:</label>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div>
                                <label className="itemResult">
                                  {state.managerDesignation}
                                </label>
                              </div>
                            </Col>
                          </>
                          <Col sm={2}>
                            <div>
                              <label>Cost Center Name:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label className="itemResult">
                                {state.managerCostCentre}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Issue Show Case Notice for :</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <div>
                              <label className="itemResult">
                                {state.disciplinaryAction.reason}
                              </label>
                            </div>
                          </Col>
                        </>
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Reason for Show Case Notice:</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <div>
                              <label className="itemResult">
                                {state.disciplinaryAction.reasonDetails}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <>
                          <Col sm={2}>
                            <div>
                              <label>State Reason Show Case Notice:</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <div>
                              <label className="itemResult">
                                {state.disciplinaryAction.managerComment}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Preview Show Case Notice:</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <div>
                              <label className="itemResult">
                                {state.disciplinaryAction.showCauseLetter}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>

                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <>
                          <Col sm={2}>
                            <div>
                              <label>Add Remarks</label>
                            </div>
                          </Col>
                          <Col sm={10}>
                            <div>
                              <label className="itemResult">
                                {state.employeeComment}
                              </label>
                            </div>
                          </Col>
                        </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={3}>
                          <label>Issue Warning Letter : </label>
                        </Col>
                        <Col sm={1} style={{ marginTop: "0.25rem" }}>
                          <Form.Group>
                            <div className="boxField_2 input">
                              <input
                                className="largerCheckbox"
                                type="checkbox"
                                value="yes"
                                checked={
                                  issueWarningStatus == "yes" ? true : false
                                }
                                style={{ borderColor: "blue" }}
                                // required={required}
                                onChange={handleChangeLetter}
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
                                  issueWarningStatus == "no" ? true : false
                                }
                                style={{ borderColor: "blue" }}
                                // required={required}
                                onChange={handleChangeLetter}
                              />
                              <label className="itemResult">No</label>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                           <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Issue Warning Letter:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <label class="switch">
                      	<input defaultValue={issueWarningStatus} value={issueWarningStatus} class="switch-input" type="checkbox" onChange={handleChangeLetter}/>
                      	<span class="switch-label"data-off="No" data-on="Yes" ></span> 
                      	<span class="switch-handle"></span> 
                                    </label>
                          </Col>
                          </>       
                      
                      </Row> */}

                      {issueWarningStatus === "yes" ? (
                        <>
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "1rem",
                              marginBottom: "2rem",
                            }}
                          >
                            <>
                              <Col sm={3}>
                                <div>
                                  <label>Reason for Warning :</label>
                                </div>
                              </Col>
                              {state.disciplinaryWarning.reason !== null &&
                              state.disciplinaryWarning.reason !== undefined &&
                              state.disciplinaryWarning.reason !== "" ? (
                                <Col sm={3}>
                                  <div>
                                    <label className="itemResult">
                                      {state.disciplinaryWarning.reason}
                                    </label>
                                  </div>
                                </Col>
                              ) : (
                                <Col sm={3}>
                                  <Form.Group>
                                    <Form.Control
                                      as="select"
                                      name="inputReasonId"
                                      defaultValue={state.inputReasonId}
                                      style={
                                        reasonError
                                          ? { borderColor: "red" }
                                          : { borderRadius: "5px" }
                                      }
                                      onChange={(e) => changeHandler(e)}
                                    >
                                      <option value="">Select Reason</option>

                                      <option
                                        name="inputReasonId"
                                        value="1"
                                        key={1}
                                      >
                                        Non Performance
                                      </option>
                                      <option
                                        name="inputReasonId"
                                        value="2"
                                        key={2}
                                      >
                                        Others
                                      </option>
                                    </Form.Control>
                                    {reasonError ? (
                                      <p style={{ color: "red" }}>
                                        {reasonError}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </Form.Group>
                                </Col>
                              )}
                            </>
                            <>
                              <Col sm={3}>
                                <div>
                                  <label>Performance Improvement period:</label>
                                </div>
                              </Col>
                              {state.disciplinaryWarning.improvementPeriod !==
                                null &&
                              state.disciplinaryWarning.improvementPeriod !==
                                undefined &&
                              state.disciplinaryWarning.improvementPeriod !==
                                "" ? (
                                <Col sm={3}>
                                  <div>
                                    <label className="itemResult">
                                      {state.disciplinaryWarning
                                        .improvementPeriod + "Month"}
                                    </label>
                                  </div>
                                </Col>
                              ) : (
                                <Col sm={3}>
                                  <Form.Group>
                                    <Form.Control
                                      as="select"
                                      name="InputImprovementPeriod"
                                      value={state.InputImprovementPeriod}
                                      style={
                                        improvementPeriodError
                                          ? { borderColor: "red" }
                                          : { borderRadius: "5px" }
                                      }
                                      onChange={(e) => changeHandler(e)}
                                    >
                                      <option value="">Select Period</option>

                                      <option
                                        name="InputImprovementPeriod"
                                        value="1"
                                        key={1}
                                      >
                                        1 month
                                      </option>
                                      <option
                                        name="InputImprovementPeriod"
                                        value="2"
                                        key={2}
                                      >
                                        2 months
                                      </option>
                                      <option
                                        name="InputImprovementPeriod"
                                        value="3"
                                        key={2}
                                      >
                                        3 months
                                      </option>
                                    </Form.Control>
                                    {improvementPeriodError ? (
                                      <p style={{ color: "red" }}>
                                        {improvementPeriodError}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </Form.Group>
                                </Col>
                              )}
                            </>
                          </Row>
                          <Row
                            style={{
                              marginLeft: "2rem",
                              marginTop: "1rem",
                              marginBottom: "3rem",
                            }}
                          >
                            <>
                              <Col sm={2}>
                                <div>
                                  <label>State detailed reason :</label>
                                </div>
                              </Col>
                              {state.disciplinaryWarning.managerComment !==
                                null &&
                              state.disciplinaryWarning.managerComment !==
                                undefined &&
                              state.disciplinaryWarning.managerComment !==
                                "" ? (
                                <Col sm={10}>
                                  <div>
                                    <label className="itemResult">
                                      {state.disciplinaryWarning.managerComment}
                                    </label>
                                  </div>
                                </Col>
                              ) : (
                                <Col sm={10}>
                                  <Form.Control
                                    style={
                                      managerCommentError
                                        ? { borderColor: "red" }
                                        : { borderRadius: "5px" }
                                    }
                                    as="textarea"
                                    rows={4}
                                    name="managerComment"
                                    value={warningManagerReason}
                                    defaultValue={
                                      state.disciplinaryWarning.managerComment
                                    }
                                    placeholder="Write here.."
                                    onChange={(e) => changeHandler(e)}
                                    required
                                  />
                                  {managerCommentError ? (
                                    <p style={{ color: "red" }}>
                                      {managerCommentError}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </Col>
                              )}
                            </>
                          </Row>
                          <Row>
                            <Col
                              style={{
                                marginTop: "2rem",
                                marginBottom: "2rem",
                                textAlign: "center",
                              }}
                            >
                              <button
                                disabled={submitted}
                                className={
                                  submitted ? "confirmButton" : "stepperButtons"
                                }
                                onClick={handleSubmit}
                              >
                                Save
                              </button>

                              {!saveLetter &&
                              showPreview === true &&
                              submitted === true ? (
                                <button
                                  // disabled={!submitted}
                                  className={"LettersButtonsExtra"}
                                  onClick={ShowCauseLetterClick}
                                >
                                  Generate Warning Letter
                                </button>
                              ) : (
                                ""
                              )}
                              {saveLetter &&
                              previewGeneratedLetter &&
                              showPreview ? (
                                <button
                                  className={"LettersButtonsExtra"}
                                  onClick={previewShowCauseLetter}
                                >
                                  Preview Warning Letter
                                </button>
                              ) : (
                                ""
                              )}

                              {saveLetter &&
                                previewGeneratedLetter &&
                                showPreview && (
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
                                      // <Button
                                      //   type="button"
                                      //   onClick={submitfinalShowCauseLetter}
                                      //   style={{
                                      //     marginTop: "2rem",
                                      //     marginBottom: "2rem",
                                      //     textAlign: "center",
                                      //   }}
                                      // >
                                      //   Submit
                                      // </Button>
                                      ""
                                    )}
                                  </div>
                                )}
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <Row>
                          <Col
                            style={{
                              marginTop: "2rem",
                              marginBottom: "2rem",
                              textAlign: "center",
                            }}
                          >
                            <button
                              className={"stepperButtons"}
                              onClick={handleInitialExit}
                            >
                              Initial Exit
                            </button>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerWarningAction;
