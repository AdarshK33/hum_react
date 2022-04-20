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
import WarningLetter from "../Disciplinary/WarningManager/WarningLetter";
 import NonPerformanceLetter from "../Disciplinary/Manager/NonPerformanceLetter";
import NonPerformanceWarningLetter from "../Disciplinary/WarningManager/NonPerformanceWarningLetter";
// view-----
const EmployeWarningLetter = () => {
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
  const [remarksError, setRemarkError] = useState(false);

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
    statusSCIN: "",
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
    statusDW: "",
  });
  const {
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    IssueShowCauseNoticeLetter,
    issueShowCauseNoticeData,
    createShowCauseIssue,
  } = useContext(DisciplinaryContext);

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
        state.empRemark =
          disciplinarySearchData.disciplinaryWarning.employeeComment;
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
        state.statusDW = disciplinarySearchData.disciplinaryWarning.status;
      }
    }
  }, [disciplinarySearchData]);
  console.log("disciplinarySearchData", disciplinarySearchData);

  const handleShowCauseLetterClose = () => setShow(false);
  const handleShowCauseLetterClose1 = () => {
    setShow(false);
    history.push("../documents");
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
    setShowLink(false);
    setShowLink1(false);
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
      disciplinarySearchData.employeeId !== null &&
      disciplinarySearchData.employeeId !== undefined
    ) {
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
  const handleClose = () => {
    setModal(false);
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
          employeeComment: state.employeeCommentSCIN,
          employeeId: state.empId,
          managerComment: state.managerCommentSCIN,
          reasonId: state.reasonIdSCIN,
          reasonDetailsId: state.reasonDetailsIdSCIN,
          reason: state.reasonSCIN,
          reasonDetails: state.reasonDetailsSCIN,
          showCauseLetter: state.showCauseLetterSCIN,
          showCauseNotice: state.showCauseNoticeSCIN,
          status: state.statusSCIN,
          statusDesc: state.statusDescSCIN,
          warningIssued: state.warningIssuedSCIN,
        },
        disciplinaryWarning:
          disciplinarySearchData.disciplinaryWarning !== null &&
          disciplinarySearchData.disciplinaryWarning !== undefined &&
          disciplinarySearchData.disciplinaryWarning !== " "
            ? {
                disciplinaryId: state.disciplinaryId,
                employeeComment: state.empRemark,
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
      //   setSuccessModal(true);
    } else {
      console.log("search data is null");
    }
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    console.log(state);
  };

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
          disciplinarySearchData.disciplinaryAction !== ""  && 
          disciplinarySearchData.disciplinaryAction == 2? (
            <ShowCauseNotice />
          ) : (
            <NonPerformanceLetter/>
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
          disciplinarySearchData.disciplinaryWarning !== "" ? (
            <WarningLetter />
          ) : (
            <NonPerformanceWarningLetter/>
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
            <label className="text-center">
              Notification has been sent to the manager
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
            {disciplinarySearchData &&
            disciplinarySearchData !== null &&
            disciplinarySearchData !== undefined &&
            Object.keys(disciplinarySearchData).length !== 0 &&
            disciplinarySearchData.disciplinaryAction !== null &&
            disciplinarySearchData.disciplinaryAction !== undefined &&
            disciplinarySearchData.disciplinaryAction !== "" ? (
              <WarningLetter />
            ) : (
             < NonPerformanceWarningLetter/>
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
            <label>Show cause notice has been issued to the employee</label>

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
                      </Row>
                      {state.employeeCommentSCIN !== null &&
                      state.employeeCommentSCIN !== undefined &&
                      state.employeeCommentSCIN !== "" ? (
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "2rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label> Add Remarks:</label>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div>
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.employeeCommentSCIN}
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
                                  Pip Start Date:
                                  <label className="itemResult">
                                    &nbsp;&nbsp; {state.warningIssuedDateDW}
                                  </label>
                                </label>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <label>
                                  Pip End Date:
                                  <label className="itemResult">
                                    &nbsp;&nbsp; {state.pipEndDate}
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
                        </div>
                      ) : (
                        ""
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
                            <label>Preview Warning Letter:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <a onClick={LetterShow1}>
                              {" "}
                              <u className="itemResult">View Warning Letter</u>
                            </a>
                          </div>
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

export default EmployeWarningLetter;
