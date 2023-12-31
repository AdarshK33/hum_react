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
import { useHistory, useParams } from "react-router-dom";
import { SeparationContext } from "../../context/SepearationState";
import ConfirmationLetter1 from "./UpdatedConfirmationLetter";
import ExtensionLetter1 from "./UpdatedExtensionLetter";
import PdfView from "./ViewLetter";

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
  const [ViewLetter, setViewLetter] = useState(false);
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
  const history = useHistory();
  const [showNotify, setShowNotify] = useState(false);
  const { employeeid } = useParams();

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
    ModeOfSeparationView,
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
    setLetterView,
    setLetterPreView,
    ShowViewLetterModel,
    ShowPreViewLetterModel,
    setSaveTheLetter,
    LetterSaved,
  } = useContext(ProbationContext);
  const { searchByCostCenter } = useContext(SeparationContext);
  console.log("employeeId", employeeid);
  useEffect(() => {
    ViewProbationDataById(employeeid);
  }, [employeeid]);

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
        var AdjusteddateValue = new Date(
          d.getTime() - d.getTimezoneOffset() * 60000
        );
        state.probationPeriod = new Date(AdjusteddateValue);
        console.log(d.toLocaleDateString(), new Date(d));
        setDateOfConfirmation(new Date(d.toLocaleDateString()));

        let d1 = new Date(d.toLocaleDateString());
        console.log(d1.toLocaleDateString());
        if (probationMonths === "3 Months") {
          d1.setMonth(d1.getMonth() + 3);
        } else {
          d1.setMonth(d1.getMonth() + 6);
        }
        var AdjusteddateValue = new Date(
          d1.getTime() - d1.getTimezoneOffset() * 60000
        );
        setExtDate(new Date(AdjusteddateValue));
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
  }, [probationData,probationMonths]);

  const handleClose = () => {
    setSuccessModal(false);
  };
  const handleClose1 = () => {
    setModal(false);
    state.remarks = "";
  };

  const handleRelivingClose1 = () => {
    history.push("../probation");

    setShow(false);
  };
  const handleRelivingClose = () => {
    setShow(false);
    history.push("../probation");
  };
  const handleRejectionClose = () => {
    setShowRej(false);
    history.push("../probation");
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setViewLetter(false);
    // setShow(false); commented for updated letter
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
      const value = checkValidations();
      if (value === true) {
        if (probationStatus === "Rejected") {
          setShowRej(true);
        } else {
          const InfoData = {
            company: probationData.company,
            costCentre: probationData.costCentre,
            dateOfJoining: probationData.dateOfJoining,
            dueDays: probationData.dueDays,
            emailId: probationData.emailId,
            empId: probationData.empId,
            empName: probationData.empName,
            probationConfirmationDate: probationData.probationConfirmationDate,
            probationConfirmationLetter:
              probationData.probationConfirmationLetter,
            probationExtensionEndDate: probationData.probationExtensionEndDate,
            probationExtensionPeriod: probationData.probationExtensionPeriod,
            probationExtensionStartDate: null,
            probationId: probationData.probationId,
            reason: probationData.reason,
            probationPeriod: probationData.probationPeriod,
            remarks: probationData.remarks,
            reminderSent: probationData.reminderSent,
            status:
              probationData.status === 5
                ? 1
                : probationData.status === 6
                ? 2
                : 3,
          };

          console.log("InfoData", InfoData);
          updateProbation(InfoData, probationData.empId);
          ViewProbationDataById(empId);
        }
      }
    }
  };

  const previewLetterViewing = (e) => {
    e.preventDefault();
    if (probationData !== null && probationData !== undefined) {
      console.log(
        "ShowPreViewLetterModel",
        ShowPreViewLetterModel,
        previewLetter
      );
      setPreviewLetter(false);
      setViewLetter(true);
      setLetterPreView(true);
      setLetterView(false);
      // if (probationData.status === 5 || probationData.status === 1) {
      //   // ViewConfirmationLetter(empId);

      // } else if (probationData.status === 6 || probationData.status === 2) {
      //   // ViewExtensionLetter(empId);

      // }

      setSubmitLetter(false);
      setPreviewLetter(true);
      // setShow(true);
    }
  };
  const generateLetterClick = (e) => {
    e.preventDefault();
    // fetchRelievingLetterData(employeeData.employeeId);
    if (probationData !== null && probationData !== undefined) {
      if (probationData.status === 5 || probationData.status === 1) {
        ViewConfirmationLetter(empId);
        setViewLetter(true);
        setLetterView(true);
      } else if (probationData.status === 6 || probationData.status === 2) {
        ViewExtensionLetter(empId);
        setViewLetter(true);
        setLetterView(true);
      }
      // handleShow(); comment for updated letter
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
    let valid = /[^A-Za-z0-9'.,-_ ]/;
    if (
      (e.target.name === "remarks" || e.target.name === "reason") &&
      e.target.value !== ""
    ) {
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
  const GoToSeperation = () => {
    if (
      probationData &&
      probationData &&
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0
    ) {
      const InfoData = {
        company: probationData.company,
        costCentre: probationData.costCentre,
        dateOfJoining: probationData.dateOfJoining,
        dueDays: probationData.dueDays,
        emailId: probationData.emailId,
        empId: probationData.empId,
        empName: probationData.empName,
        probationConfirmationDate:
          moment(dateOfConfirmation).format("YYYY-MM-DD"),
        probationConfirmationLetter: probationData.probationConfirmationLetter,
        probationExtensionEndDate:
          probationStatus === "Extended" ?moment(dateOfExtension).format("YYYY-MM-DD") : null,
        probationExtensionPeriod:
          probationStatus === "Extended"
            ? probationMonths === "3 Months"
              ? 3
              : probationMonths === "6 Months"
              ? 6
              : 0
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

      console.log("InfoData", InfoData);
      updateProbation(InfoData, probationData.empId);
      ViewProbationDataById(empId);
      // searchByCostCenter(probationData.empId);

      setSubmitted(true);
      setShowRej(false);
      ModeOfSeparationView();
      history.push("../probation-separation");
    }
  };

  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      if (probationStatus === "Rejected") {
        setShowRej(true);
      } else {
        const InfoData = {
          company: probationData.company,
          costCentre: probationData.costCentre,
          dateOfJoining: probationData.dateOfJoining,
          dueDays: probationData.dueDays,
          emailId: probationData.emailId,
          empId: probationData.empId,
          empName: probationData.empName,
          probationConfirmationDate:
            moment(dateOfConfirmation).format("YYYY-MM-DD"),
          probationConfirmationLetter:
            probationData.probationConfirmationLetter,
          probationExtensionEndDate:
            probationStatus === "Extended" ? moment(dateOfExtension).format("YYYY-MM-DD") : null,
          probationExtensionPeriod:
            probationStatus === "Extended"
              ? probationMonths === "3 Months"
                ? 3
                : probationMonths === "6 Months"
                ? 6
                : 0
              : 0,
          probationExtensionStartDate: null,
          probationId: probationData.probationId,
          reason: state.reason,
          probationPeriod: probationData.probationPeriod,
          remarks: probationStatus === "Rejected" ? state.remarks : null,
          reminderSent: probationData.reminderSent,
          status:
            probationStatus === "Confirmed"
              ? 5
              : probationStatus === "Extended"
              ? 6
              : probationStatus === "Rejected"
              ? 3
              : 0,
        };

        console.log("InfoData", InfoData);
        updateProbation(InfoData, probationData.empId);
        ViewProbationDataById(empId);
        setSubmitted(true);
        setPreview(true);
      }
    }
  };
  const closeTheLetter = () => {
    setViewLetter(false);
  };

  return (
    <Fragment>
      {/* {probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0 &&
      probationData.probationConfirmationLetter !== null &&
      probationData.probationConfirmationLetter !== undefined &&
      probationData.probationConfirmationLetter !== "" &&
      (ShowPreViewLetterModel || previewLetter) ? (
        <PdfView letter={probationData.probationConfirmationLetter} />
      ) : (
        ""
      )} */}
      {ViewLetter &&
      ShowViewLetterModel &&
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0 &&
      (probationData.status === 5 || probationData.status === 1) ? (
        <ConfirmationLetter1 />
      ) : ViewLetter &&
        ShowViewLetterModel &&
        probationData !== null &&
        probationData !== undefined &&
        Object.keys(probationData).length !== 0 &&
        (probationData.status === 6 || probationData.status === 2) ? (
        <ExtensionLetter1 />
      ) : (
        ""
      )}

      {/* <Modal show={ViewLetter} onHide={closeTheLetter} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {probationData !== null &&
          probationData !== undefined &&
          Object.keys(probationData).length !== 0 &&
          (probationData.status === 5 || probationData.status === 1) ? (
            <ConfirmationLetter />
          ) : probationData !== null &&
            probationData !== undefined &&
            Object.keys(probationData).length !== 0 &&
            (probationData.status === 6 || probationData.status === 2) ? (
            <ExtensionLetter />
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
                <button className={"stepperButtons"} onClick={digitalSignature}>
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
                <button className={"stepperButtons"} onClick={saveOfferLetter}>
                  Save Changes
                </button>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal> */}

      <Modal show={showRej} onHide={handleRejectionClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label>
            Exit has been initiated against the employee. Please go to separation
            module for next steps of action
          </label>
          <div className="text-center mb-2">
            <Button onClick={handleRejectionClose}>Close</Button>
            <></>

            <Button onClick={GoToSeperation} style={{ marginLeft: "1rem" }}>
              Next
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showRelivingModal} onHide={handleRelivingClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>

        <Modal.Body className="mx-auto">
          <label>
            {probationData &&
            probationData &&
            probationData !== null &&
            probationData !== undefined &&
            Object.keys(probationData).length !== 0 &&
            (probationData.status === 5 || probationData.status === 1)
              ? "Confirmation letter sent to the employee"
              : probationData &&
                probationData &&
                probationData !== null &&
                probationData !== undefined &&
                Object.keys(probationData).length !== 0 &&
                (probationData.status === 6 || probationData.status === 2)
              ? "Extension letter sent to the employee"
              : ""}
          </label>
          <div className="text-center mb-2">
            <Button onClick={handleRelivingClose1}>Close</Button>
          </div>
        </Modal.Body>
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
              maxLength="500"
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
              {probationData !== null &&
              probationData !== undefined &&
              Object.keys(probationData).length !== 0 &&
              probationData.status === 1
                ? "Confirmattion letter sent to the employee"
                : probationData !== null &&
                  probationData !== undefined &&
                  Object.keys(probationData).length !== 0 &&
                  probationData.status === 2
                ? "Extension letter sent to the employee"
                : ""}
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Breadcrumb title="PROBATION CONFIRMATION" parent="Probation List" />
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
                                  {probationData.status == 1 ||
                                  probationData.status == 5
                                    ? "Confirm"
                                    : probationData.status == 2 ||
                                      probationData.status == 6
                                    ? "Extend"
                                    : probationData.status == 3
                                    ? "Reject"
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
                                    <option value="Confirmed">Confirm</option>
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
                                      <option value="Extended">Extend</option>
                                    ) : (
                                      ""
                                    )}
                                    <option value="Rejected">Reject</option>
                                  </Form.Control>
                                </Form.Group>
                              )}
                            </div>
                          </Col>
                        </Row>

                        {probationStatus === "Extended" ||
                        (probationData &&
                          probationData &&
                          probationData !== null &&
                          probationData !== undefined &&
                          Object.keys(probationData).length !== 0 &&
                          probationData.status === 6) ? (
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
                                          maxDate={
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

                        {probationStatus === "Extended" ||
                        (probationData &&
                          probationData &&
                          probationData !== null &&
                          probationData !== undefined &&
                          Object.keys(probationData).length !== 0 &&
                          probationData.status === 6) ? (
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
                                        maxLength="500"
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
                                        maxLength="500"
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
                              disabled={
                                submitted ||
                                (probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.status === 5) ||
                                probationData.status === 6
                              }
                              className={
                                submitted ||
                                (probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  probationData.status === 5) ||
                                probationData.status === 6
                                  ? "confirmButton"
                                  : "stepperButtons"
                              }
                              onClick={submitHandler}
                            >
                              Save
                            </button>
                          ) : (
                            ""
                          )}

                          {(probationData &&
                            probationData &&
                            probationData !== null &&
                            probationData !== undefined &&
                            Object.keys(probationData).length !== 0 &&
                            probationData.status === 5) ||
                          probationData.status === 6 ||
                          showPreview === true ? (
                            <button
                              // disabled={!submitted}
                              className={"LettersProbButtons"}
                              onClick={generateLetterClick}
                            >
                              {probationData &&
                              probationData &&
                              probationData !== null &&
                              probationData !== undefined &&
                              Object.keys(probationData).length !== 0 &&
                              (probationData.status === 5 ||
                                probationData.status === 1)
                                ? "Generate Confirmation Letter"
                                : probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  (probationData.status === 6 ||
                                    probationData.status === 2)
                                ? "Generate Extension Letter"
                                : ""}
                              {/* Generate Relieving Letter */}
                            </button>
                          ) : (
                            ""
                          )}
                          {/* {previewGeneratedLetter &&
                          probationData &&
                          probationData &&
                          probationData !== null &&
                          probationData !== undefined &&
                          Object.keys(probationData).length !== 0 &&
                          (probationData.status === 6 ||
                            probationData.status === 5 ||
                            probationData.status === 1 ||
                            probationData.status === 2) ? (
                            <button
                              className={"LettersProbButtons"}
                              onClick={previewLetterViewing}
                            >
                              {probationData &&
                              probationData &&
                              probationData !== null &&
                              probationData !== undefined &&
                              Object.keys(probationData).length !== 0 &&
                              (probationData.status === 6 ||
                                probationData.status === 2)
                                ? "Preview Extension Letter"
                                : probationData &&
                                  probationData &&
                                  probationData !== null &&
                                  probationData !== undefined &&
                                  Object.keys(probationData).length !== 0 &&
                                  (probationData.status === 5 ||
                                    probationData.status === 1)
                                ? "Preview Confirmation Letter"
                                : ""}
                            </button>
                          ) : (
                            ""
                          )} */}
                          {showSignature && previewGeneratedLetter === true && (
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
