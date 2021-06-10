import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { ProbationContext } from "../../context/ProbationState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { setGlobalCssModule } from "reactstrap/es/utils";
// import RelievingLetter from "../components/ManagerApproveEmployeeExit/RelivingLetter";
import ConfirmationLetter from "./ConfirmationLetter";
import ExtensionLetter from "./ExtensionLetter";
import calendarImage from "../../assets/images/calendar-image.png";

const ProbationAction = () => {
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(false);
  const [RcryError, setRcryError] = useState(false);
  const [RehireError, setRehireError] = useState(false);
  const [rcryDaysError, setRcryDaysError] = useState(false);
  const [dateOfConfError, setDateOfConfError] = useState(false);
  const [dateOfExtError, setDateOfExtError] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showRelivingModal, setShow] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showRej, setShowRej] = useState(false);

  const [probationStatus, setProbationStatus] = useState("Confirmed");
  const [probationMonths, setProbationMonths] = useState("3 Months");
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [dateOfConfirmation, setDateOfConfirmation] = useState("");
  const [dateOfExtension, setDateOfExtension] = useState("");
  const [dateDisable, setDateDisable] = useState(true);
  const [extDATE, setExtDate] = useState("");

  const [state, setState] = useState({
    empName: "",
    empId: "",
    empCostCenterName: "",
    empDateOfJoining: "",
    probationStatus: "",
    probationMonths: "",
    reason: "",
    remarks: "",
    probationPeriod: "",
  });
  const {
    employeeData,
    UpdateEmplyoeeExist,
    fetchRelievingLetterData,
    relivingLetterData,
  } = useContext(EmployeeSeparationContext);
  const {
    updateProbation,
    probUpdateResponse,
    ViewExtensionLetter,
    ViewConfirmationLetter,
    extensionLetterData,
    cnfLetterData,
    ViewProbationDataById,
    probationData,
    empId,
    loader,
  } = useContext(ProbationContext);
  console.log("employeeId", empId);
  useEffect(() => {
    ViewProbationDataById(empId);
  }, [empId]);
  console.log("probationData->", probationData);
  useEffect(() => {
    if (
      probationData &&
      probationData &&
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0
    ) {
      state.empName = probationData.empName;
      state.empId = probationData.empId;
      state.empCostCenterName = probationData.costCentre;
      state.empDateOfJoining = probationData.dateOfJoining;
      state.remarks =
        probationData.remarks !== null && probationData.remarks !== undefined
          ? probationData.remarks
          : "";
      // state.probationPeriod = probationData.probationPeriod;
      // console.log("probationPeriod", probationData.probationPeriod);

      state.reason =
        probationData.reason !== null && probationData.reason !== undefined
          ? probationData.reason
          : "";

      if (
        probationData.probationConfirmationDate !== null &&
        probationData.probationConfirmationDate !== undefined
      ) {
        setDateOfConfirmation(
          new Date(probationData.probationConfirmationDate)
        );
      } else if (
        probationData.dateOfJoining !== null &&
        probationData.dateOfJoining !== undefined &&
        probationData.probationPeriod !== null &&
        probationData.probationPeriod !== undefined
      ) {
        let d = new Date(probationData.dateOfJoining);
        console.log(d.toLocaleDateString());
        d.setMonth(d.getMonth() + probationData.probationPeriod);
        state.probationPeriod = new Date(d.toLocaleDateString());
        console.log(d.toLocaleDateString(), new Date(d));
        setDateOfConfirmation(new Date(d.toLocaleDateString()));

        let d1 = new Date(d.toLocaleDateString());
        console.log(d1.toLocaleDateString());
        if (probationMonths === "3 Months") {
          d1.setMonth(d1.getMonth() + 3);
        } else {
          d1.setMonth(d1.getMonth() + 6);
        }
        setExtDate(new Date(d1.toLocaleDateString()));
        console.log(d1.toLocaleDateString(), new Date(d1));
        setDateOfExtension(new Date(d1.toLocaleDateString()));
        setDateDisable(false);
      } else {
        setDateOfConfirmation("");
        setDateDisable(true);
      }

      if (probationData.status === 0 || probationData.status === 1) {
        setProbationStatus("Confirmed");
      } else if (probationData.status === 2) {
        setProbationStatus("Extended");
      }
      if (probationData.probationPeriod === 6) {
        setProbationMonths("6 Months");
      } else {
        setProbationMonths("3 Months");
      }
      console.log("Inside use effect");
    }
  }, [probationData, empId]);

  useEffect(() => {
    if (
      dateOfConfirmation !== null &&
      dateOfConfirmation !== undefined &&
      dateOfConfirmation !== ""
    ) {
      let d = new Date(dateOfConfirmation);
      console.log(d.toLocaleDateString());
      if (probationMonths === "3 Months") {
        d.setMonth(d.getMonth() + 3);
      } else {
        d.setMonth(d.getMonth() + 6);
      }
      setExtDate(new Date(d.toLocaleDateString()));
      console.log(d.toLocaleDateString(), new Date(d));
      setDateOfExtension(new Date(d.toLocaleDateString()));
      // setDateOfExtension("");
      // setDateDisable(false);
    }
  }, [probationMonths]);

  const handleClose = () => {
    setSuccessModal(false);
  };
  const handleClose1 = () => {
    setModal(false);
    state.remarks = "";
  };

  const handleRelivingClose = () => {
    setShowRej(false);
    setShow(false);
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalRelivingLetter = (e) => {
    e.preventDefault();
    if (probationData !== null && probationData !== undefined) {
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      // setSuccessModal(true);
      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };

  const previewLetterViewing = (e) => {
    e.preventDefault();
    if (probationData !== null && probationData !== undefined) {
      // fetchRelievingLetterData(employeeData.employeeId);
      if (probationData.status === 1) {
        ViewConfirmationLetter(empId);
      } else if (probationData.status === 2) {
        ViewExtensionLetter(empId);
      }

      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const generateLetterClick = (e) => {
    e.preventDefault();
    // fetchRelievingLetterData(employeeData.employeeId);
    if (probationData !== null && probationData !== undefined) {
      if (probationData.status === 1) {
        ViewConfirmationLetter(empId);
      } else if (probationData.status === 2) {
        ViewExtensionLetter(empId);
      }
      handleShow();
      setPreviewGeneratedLetter(true);
    }
  };

  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };
  const handleSaveRemarks = () => {
    if (
      state.remarks !== "" &&
      state.remarks !== null &&
      state.remarks !== undefined
    ) {
      setRemarkError(false);
      setModal(false);
    } else {
      setRemarkError(true);
    }
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  const dateOfBirthHandler = (date) => {
    if (date !== null) {
      var AdjusteddateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      console.log("AdjusteddateValue");
      setDateOfConfirmation(AdjusteddateValue);
      let d = new Date(AdjusteddateValue);
      console.log(d.toLocaleDateString());
      if (probationMonths === "3 Months") {
        d.setMonth(d.getMonth() + 3);
      } else {
        d.setMonth(d.getMonth() + 6);
      }
      setExtDate(new Date(d.toLocaleDateString()));
      console.log(d.toLocaleDateString(), new Date(d));
      setDateOfExtension(new Date(d.toLocaleDateString()));
      // setDateOfExtension("");
      setDateDisable(false);
    }
  };
  const dateOfBirthHandler1 = (date) => {
    if (date !== null) {
      var AdjusteddateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      console.log("AdjusteddateValue");
      setDateOfExtension(AdjusteddateValue);
    }
  };

  const validateCheckBoxes = (itemYes, itemNo, setError) => {
    if ((itemYes === true) | (itemNo === true)) {
      setError(false);
      console.log(itemYes, itemNo);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const validateRcryDays = () => {
    const Valid = /^[0-9\b]+$/;
    if (RcryYes === true) {
      if (
        state.noticePeriodRcryDays !== "" &&
        state.noticePeriodRcryDays !== null &&
        state.noticePeriodRcryDays !== undefined &&
        Valid.test(state.noticePeriodRcryDays)
      ) {
        setRcryDaysError(false);
        return true;
      } else {
        setRcryDaysError(true);
        return false;
      }
    } else {
      return true;
    }
  };

  const validateDateOfExtension = () => {
    if (probationStatus === "Extended") {
      if (
        dateOfExtension !== "" &&
        dateOfExtension !== null &&
        dateOfExtension !== undefined
      ) {
        setDateOfExtError(false);
        return true;
      } else {
        console.log("dateOfExtension error");
        setDateOfExtError(true);
        return false;
      }
    } else {
      setDateOfExtError(false);
      return true;
    }
  };

  const validateDateOfConfirmation = () => {
    if (
      dateOfConfirmation !== "" &&
      dateOfConfirmation !== null &&
      dateOfConfirmation !== undefined
    ) {
      setDateOfConfError(false);
      return true;
    } else {
      console.log("date error");
      setDateOfConfError(true);
      return false;
    }
  };
  const validateRemarks = () => {
    if (probationStatus === "Rejected") {
      if (
        state.remarks !== "" &&
        state.remarks !== undefined &&
        state.remarks !== null
      ) {
        setRemarkError(false);
        return true;
      } else {
        console.log("reason error");
        setRemarkError(true);
        return false;
      }
    } else {
      setRemarkError(false);
      return true;
    }
  };
  const validateReason = () => {
    if (probationStatus === "Extended") {
      if (
        state.reason !== "" &&
        state.reason !== undefined &&
        state.reason !== null
      ) {
        setReasonError(false);
        return true;
      } else {
        console.log("reason error");
        setReasonError(true);
        return false;
      }
    } else {
      setReasonError(false);
      return true;
    }
  };
  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateDateOfConfirmation() === true) &
      (validateReason() === true) &
      (validateRemarks() === true) &
      (validateDateOfExtension() === true)
    ) {
      console.log("on true");
      return true;
    } else {
      console.log("on falsae");
      return false;
    }
  };

  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      const InfoData = {
        company: probationData.company,
        costCentre: probationData.costCentre,
        dateOfJoining: probationData.dateOfJoining,
        dueDays: probationData.dueDays,
        emailId: probationData.emailId,
        empId: probationData.empId,
        empName: probationData.empName,
        probationConfirmationDate: dateOfConfirmation,
        probationConfirmationLetter: probationData.probationConfirmationLetter,
        probationExtensionEndDate: dateOfExtension,
        probationExtensionPeriod:
          probationMonths === "3 Months"
            ? 3
            : probationMonths === "6 Months"
            ? 6
            : 0,
        probationExtensionStartDate: null,
        probationId: probationData.probationId,
        reason: state.reason,
        probationPeriod: probationData.probationPeriod,
        remarks: probationStatus === "Rejected" ? state.remarks : null,
        reminderSent: probationData.reminderSent,
        status:
          probationStatus === "Confirmed"
            ? 1
            : probationStatus === "Extended"
            ? 2
            : probationStatus === "Rejected"
            ? 3
            : 0,
      };

      const InfoData1 = {
        company: probationData.company,
        costCentre: probationData.costCentre,
        dateOfJoining: probationData.dateOfJoining,
        dueDays: probationData.dueDays,
        emailId: probationData.emailId,
        empId: probationData.empId,
        empName: probationData.empName,
        employeeConformationLetter: null,
        managerConformationLetter: null,
        probationConfirmationDate: dateOfConfirmation,
        probationEndDate: probationData.probationEndDate,
        probationExtension:
          probationStatus === "Confirmed"
            ? null
            : {
                emailId: probationData.emailId,
                empId: probationData.empId,
                empName: probationData.empName,
                probationExtensionEndDate: dateOfExtension,
                probationExtensionId:
                  probationData.probationExtension !== null &&
                  probationData.probationExtension !== undefined &&
                  probationData.probationExtension.probationExtensionId !== null
                    ? probationData.probationExtension.probationExtensionId
                    : 0,
                probationExtensionPeriod:
                  probationMonths === "3 Months"
                    ? 3
                    : probationMonths === "6 Months"
                    ? 6
                    : 0,
                probationExtensionStartDate: null,
                probationId: probationData.probationId,
                reason: state.reason,
                status:
                  probationStatus === "Confirmed"
                    ? 1
                    : probationStatus === "Extended"
                    ? 2
                    : 0,
              },
        probationExtensionPeriod:
          probationMonths === "3 Months"
            ? 3
            : probationMonths === "6 Months"
            ? 6
            : 0,
        probationId: probationData.probationId,
        probationPeriod: probationData.probationPeriod,
        probationStartDate: probationData.probationStartDate,
        remarks: probationStatus === "Rejected" ? state.remarks : null,
        reminderSent: probationData.reminderSent,
        status:
          probationStatus === "Confirmed"
            ? 1
            : probationStatus === "Extended"
            ? 2
            : probationStatus === "Rejected"
            ? 3
            : 0,
        //  PENDING(0),
        // APPROVED(1),
        // EXTENDED(2);
      };
      console.log("InfoData", InfoData);
      // updateProbation(InfoData, probationData.empId);
      ViewProbationDataById(empId);
      setSubmitted(true);
      if (probationStatus === "Rejected") {
        setShowRej(true);
      } else {
        setPreview(true);
      }
    }
  };

  return (
    <Fragment>
      <Modal show={showRej} onHide={handleRelivingClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label>Rejected successfully</label>
          <div className="text-center mb-2">
            <Button onClick={handleRelivingClose}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showRelivingModal} onHide={handleRelivingClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body className="mx-auto">
            <label>
              {probationStatus === "Confirmed"
                ? "Confirmation letter sent to the employee"
                : probationStatus === "Extended"
                ? "Extension letter sent to the employee"
                : ""}
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleRelivingClose}>Close</Button>
            </div>
          </Modal.Body>
        ) : previewLetter || showRelivingModal ? (
          <Modal.Body>
            {true ? (
              <div>
                {probationStatus === "Confirmed" ? (
                  <ConfirmationLetter />
                ) : probationStatus === "Extended" ? (
                  <ExtensionLetter />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <br></br>
            <Row>
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
        ) : (
          ""
        )}
      </Modal>
      <Modal show={showModal} onHide={() => handleClose1()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">State remarks:</label>
            <textarea
              className="remarkText rounded"
              name="remarks"
              value={state.remarks}
              placeholder="Write here.."
              onChange={(e) => changeHandler(e)}
            />

            {remarkError && (
              <p style={{ color: "red" }}>Please add your remarks</p>
            )}
            <div className="text-center mb-2">
              <Button onClick={() => handleSaveRemarks()}>Save</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">
              {probationData.status === 1
                ? "Confirmattion letter sent to the employee"
                : probationData.status === 2
                ? "Extension letter sent to the employee"
                : ""}
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Breadcrumb
        title="PROBATION CONFIRMATION"
        parent="PROBATION CONFIRMATION"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>PROBATION CONFIRMATION </b>
                </div>
                {loader === true ? (
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
                          <Col sm={2}>
                            <div>
                              <label>Employee Id:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {" "}
                                {/* &nbsp;&nbsp; */}
                                {state.empId}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Employee Name:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {/* &nbsp;&nbsp; */}
                                {state.empName}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Cost Center Name:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {/* &nbsp;&nbsp;  */}
                                {state.empCostCenterName}
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
                          <Col sm={2}>
                            <div>
                              <label>Date Of Joining:</label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label
                                style={{ marginLeft: "-2rem" }}
                                className="itemResult"
                              >
                                {/* &nbsp;&nbsp; */}
                                {state.empDateOfJoining}
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Date Of Confirmation:</label>
                            </div>
                          </Col>
                          <Col sm={2} style={{ marginLeft: "-2rem" }}>
                            <div>
                              {probationData &&
                              probationData &&
                              probationData !== null &&
                              probationData !== undefined &&
                              Object.keys(probationData).length !== 0 &&
                              probationData.probationConfirmationDate !== "" &&
                              probationData.probationConfirmationDate !==
                                null &&
                              probationData.probationConfirmationDate !==
                                undefined ? (
                                <label className="itemResult">
                                  {probationData.probationConfirmationDate}
                                </label>
                              ) : (
                                <Form.Group>
                                  <div
                                    className={
                                      false
                                        ? "onBoard-date-error"
                                        : "onBoard-date"
                                    }
                                  >
                                    <DatePicker
                                      className="form-control onBoard-view"
                                      selected={dateOfConfirmation}
                                      // name="dateOfResignation"
                                      minDate={
                                        state.probationPeriod !== null &&
                                        state.probationPeriod !== undefined &&
                                        state.probationPeriod !== ""
                                          ? state.probationPeriod
                                          : moment().toDate()
                                      }
                                      onChange={(e) => dateOfBirthHandler(e)}
                                      dateFormat="yyyy-MM-dd"
                                      placeholderText="YYYY-MM-DD"
                                      // minDate={new Date()}
                                    />
                                  </div>
                                  {dateOfConfError ? (
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      &nbsp; *Please select date
                                    </p>
                                  ) : (
                                    <p></p>
                                  )}
                                </Form.Group>
                              )}
                            </div>
                          </Col>
                          <Col sm={2} style={{ marginLeft: "2rem" }}>
                            <div>
                              <label>Probation Status:</label>
                            </div>
                          </Col>
                          <Col sm={2} style={{ marginLeft: "-2rem" }}>
                            <div>
                              {probationData &&
                              probationData &&
                              probationData !== null &&
                              probationData !== undefined &&
                              Object.keys(probationData).length !== 0 &&
                              probationData.status !== 0 &&
                              probationData.status !== null &&
                              probationData.status !== undefined ? (
                                <label className="itemResult">
                                  {/* &nbsp;&nbsp;{" "} */}
                                  {probationData.status == 1
                                    ? "Confirmed"
                                    : probationData.status == 2
                                    ? "Extended"
                                    : ""}
                                </label>
                              ) : (
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name="probationStatus"
                                    // options={reasonOfSeparationList}
                                    value={probationStatus}
                                    onChange={(e) =>
                                      setProbationStatus(e.target.value)
                                    }
                                    //   disabled={disabled}
                                    style={false ? { borderColor: "red" } : {}}
                                  >
                                    {/* <option value=""></option> */}
                                    <option value="Confirmed">Confirmed</option>
                                    {probationData &&
                                    probationData &&
                                    probationData !== null &&
                                    probationData !== undefined &&
                                    Object.keys(probationData).length !== 0 &&
                                    (probationData.probationExtensionPeriod ===
                                      null ||
                                      probationData.probationExtensionPeriod ===
                                        "" ||
                                      probationData.probationExtensionPeriod ===
                                        undefined ||
                                      probationData.probationExtensionPeriod ===
                                        0) ? (
                                      <option value="Extended">Extended</option>
                                    ) : (
                                      ""
                                    )}
                                    <option value="Rejected">Rejected</option>
                                  </Form.Control>
                                </Form.Group>
                              )}
                            </div>
                          </Col>
                        </Row>

                        {probationStatus === "Extended" ? (
                          <div>
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "1rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <Col sm={3}>
                                <div>
                                  <label>Should be extended by:</label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.probationExtensionPeriod !==
                                    0 &&
                                  probationData.probationExtensionPeriod !==
                                    null &&
                                  probationData.probationExtensionPeriod !==
                                    undefined ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp;{" "}
                                      {probationData.probationExtensionPeriod}{" "}
                                      Months
                                    </label>
                                  ) : (
                                    <Form.Group>
                                      <Form.Control
                                        as="select"
                                        name="probationMonths"
                                        // options={reasonOfSeparationList}
                                        value={probationMonths}
                                        onChange={(e) =>
                                          setProbationMonths(e.target.value)
                                        }
                                        style={
                                          false ? { borderColor: "red" } : {}
                                        }
                                      >
                                        {/* <option value=""></option> */}
                                        <option value="3 Months">
                                          3 Months
                                        </option>
                                        <option value="6 Months">
                                          6 Months
                                        </option>
                                      </Form.Control>
                                    </Form.Group>
                                  )}
                                </div>
                              </Col>
                              <Col sm={1}></Col>
                              <Col sm={3}>
                                <div>
                                  <label>Date of probation extension:</label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.probationExtensionEndDate !==
                                    "" &&
                                  probationData.probationExtensionEndDate !==
                                    null &&
                                  probationData.probationExtensionEndDate !==
                                    undefined ? (
                                    <label
                                      style={{ marginLeft: "-2rem" }}
                                      className="itemResult"
                                    >
                                      {probationData.probationExtensionEndDate}
                                    </label>
                                  ) : (
                                    <Form.Group>
                                      <div
                                        className={
                                          false
                                            ? "onBoard-date-error"
                                            : "onBoard-date"
                                        }
                                      >
                                        <DatePicker
                                          className="form-control onBoard-view"
                                          selected={dateOfExtension}
                                          // name="dateOfResignation"
                                          // minDate={moment().toDate()}
                                          minDate={
                                            extDATE !== null &&
                                            extDATE !== undefined &&
                                            extDATE !== ""
                                              ? extDATE
                                              : moment().toDate()
                                          }
                                          disabled={dateDisable}
                                          onChange={(e) =>
                                            dateOfBirthHandler1(e)
                                          }
                                          dateFormat="yyyy-MM-dd"
                                          placeholderText="YYYY-MM-DD"
                                          // minDate={new Date()}
                                        />
                                      </div>
                                      {dateOfExtError ? (
                                        <p style={{ color: "red" }}>
                                          {" "}
                                          &nbsp; *Please select date
                                        </p>
                                      ) : (
                                        <p></p>
                                      )}
                                    </Form.Group>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          ""
                        )}

                        {probationStatus === "Extended" ? (
                          <div>
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "1rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <Col sm={3}>
                                <div>
                                  <label>Reason for extension:</label>
                                </div>
                              </Col>
                              <Col sm={8}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.reason !== "" &&
                                  probationData.reason !== null &&
                                  probationData.reason !== undefined ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {probationData.reason}
                                    </label>
                                  ) : (
                                    <Form.Group>
                                      <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="reason"
                                        className="non-disable blueTextData"
                                        value={state.reason}
                                        onChange={changeHandler}
                                        required
                                      />
                                      {reasonError ? (
                                        <p style={{ color: "red" }}>
                                          {" "}
                                          &nbsp; *Please enter reason
                                        </p>
                                      ) : (
                                        <p></p>
                                      )}
                                    </Form.Group>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          ""
                        )}
                        {probationStatus === "Rejected" ? (
                          <div>
                            <Row
                              style={{
                                marginLeft: "2rem",
                                marginTop: "1rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <Col sm={3}>
                                <div>
                                  <label>Remarks for rejection:</label>
                                </div>
                              </Col>
                              <Col sm={8}>
                                <div>
                                  {probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.remarks !== null &&
                                  probationData.remarks !== undefined &&
                                  probationData.remarks !== "" ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {probationData.remarks}
                                    </label>
                                  ) : (
                                    <Form.Group>
                                      <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="remarks"
                                        className="non-disable blueTextData"
                                        value={state.remarks}
                                        onChange={changeHandler}
                                        required
                                      />
                                      {remarkError ? (
                                        <p style={{ color: "red" }}>
                                          {" "}
                                          &nbsp; *Please enter remarks
                                        </p>
                                      ) : (
                                        <p></p>
                                      )}
                                    </Form.Group>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          ""
                        )}

                        <div
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          {true ? (
                            <button
                              disabled={submitted}
                              className={
                                submitted ? "confirmButton" : "stepperButtons"
                              }
                              onClick={submitHandler}
                            >
                              Save
                            </button>
                          ) : (
                            ""
                          )}

                          {!saveLetter &&
                          ((probationData &&
                            probationData &&
                            probationData !== null &&
                            probationData !== undefined &&
                            Object.keys(probationData).length !== 0 &&
                            probationData.status === 2) ||
                            probationData.status === 1 ||
                            showPreview === true) ? (
                            <button
                              // disabled={!submitted}
                              className={"LettersProbButtons"}
                              onClick={generateLetterClick}
                            >
                              {probationStatus === "Extended"
                                ? "Generate Extension Letter"
                                : probationStatus === "Confirmed"
                                ? "Generate Confirmation Letter"
                                : ""}
                              {/* Generate Reliving Letter */}
                            </button>
                          ) : (
                            ""
                          )}
                          {saveLetter &&
                          previewGeneratedLetter &&
                          showPreview ? (
                            <button
                              className={"LettersProbButtons"}
                              onClick={previewLetterViewing}
                            >
                              {probationStatus === "Extended"
                                ? "Preview Extension Letter"
                                : probationStatus === "Confirmed"
                                ? "Preview Confirmation Letter"
                                : ""}
                            </button>
                          ) : (
                            ""
                          )}
                          {saveLetter && previewGeneratedLetter === true && (
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
                                  onClick={submitfinalRelivingLetter}
                                >
                                  Submit
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProbationAction;
