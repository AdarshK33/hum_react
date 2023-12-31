import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { SeparationContext } from "../../context/SepearationState";
import moment from "moment";
import "./EmployeeExit.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import RelievingLetter from "./RelivingLetter";
import TerminationLetter from "./TerminationLetter";
import { PermissionContext } from "../../context/PermissionState";
import calendarImage from "../../assets/images/calendar-image.png";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const EmployeeExitAction = (props) => {
  const params = useParams();

  const paramsemployeeId = params["employeeid"];
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(false);
  const [RcryError, setRcryError] = useState(false);
  const [RehireError, setRehireError] = useState(false);
  const [rcryDaysError, setRcryDaysError] = useState(false);
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
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [lastWorkingDateError, setLastWorkingDateError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [lastDateSelection, setLastDateSelection] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [withdrwaThis, setWithdrawThis] = useState(false);
  const [lastWorkingDate, setlastWorkingDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [iamStatusError,SetIamStatusError] = useState(false)

  let history = useHistory()
  const [state, setState] = useState({
    empName: "",
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empPosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    modeOfSeparationId: "",
    modeOfSeparationReasonId: "",
    dateOfResignation: "",
    noticePeriod: "",
    lastWorkingDate: "",
    personalEmailId: "",
    comments: "",
    noticePeriodRcryDays: "",
    remarks: "",
    iamStatus:"",
    approverName:"",
    approverEmpId:""
  });
  const {
    loader,
    employeeData,
    ModeOfSeparationData,
    ViewEmployeeProfile,
    employeeProfileData,
    employeeId,
    ViewEmployeeDataById,
    CreateEmplyoeeExist,
    makeEmployeeDataNull,
    fetchRelievingLetterData,
    relivingLetterData,
    terminationLetterData,
    UpdateEmplyoeeExist,
    fetchTerminationLetterData,
    ModeOfSeparationView,
    terminationConfirmation,
    resignationConfirmation,
    TerminationFromDesciplinary,
    DisciplinaryTermination,
    lettterview,
    setViewLetter,
  } = useContext(EmployeeSeparationContext);
  const { withdraw } =
    useContext(SeparationContext);
  const {rolePermission} =
    useContext(PermissionContext);
  useEffect(() => {
    ViewEmployeeDataById(paramsemployeeId);
    ModeOfSeparationView();
  }, [paramsemployeeId]);
  console.log("employeeData",employeeData, paramsemployeeId);
  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      state.empName = employeeData.employeeName;
      state.empId = employeeData.employeeId;
      state.empContractType = employeeData.contractType;
      state.empCostCenterName = employeeData.costCentreName;
      state.empLocation = employeeData.location;
      state.empPosition = employeeData.position;
      state.mngrName = employeeData.managerName;
      state.mngrId = employeeData.managerId ? employeeData.managerId : "";
      state.mngrCostCenterName = employeeData.managerCostCentre;
      state.mngrPosition = employeeData.managerPosition;
      state.remarks = (employeeData.rehireRemark == null|| employeeData.rehireRemark == undefined)?"":employeeData.rehireRemark
      state.iamStatus = employeeData.iamStatus
      // state.modeOfSeparationId = employeeData.modeOfSeparationId;
      // state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
      state.dateOfResignation = employeeData.dateOfResignation;
      state.noticePeriod = employeeData.noticePeriod;
      state.approverEmpId = employeeData.approverEmpId;
      state.approverName = employeeData.approverName;
      // if (
      //   employeeData.department == "AFS" ||
      //   employeeData.department == "IT" ||
      //   employeeData.department == "Legal" ||
      //   employeeData.department == "Finance"
      // ) {
      //   state.noticePeriod = 2;
      // } else {
      //   state.noticePeriod = 1;
      // }
      if (
        state.empContractType === "internship" ||
        state.empContractType === "Internship"
      ) {
        state.lastWorkingDate = new Date(employeeData.joiningDate).setMonth(
          new Date(employeeData.joiningDate).getMonth() +
            (employeeData.internshipPeriod !== null &&
            employeeData.internshipPeriod !== undefined
              ? employeeData.internshipPeriod
              : 0)
        );
        setlastWorkingDate(
          new Date(employeeData.joiningDate).setMonth(
            new Date(employeeData.joiningDate).getMonth() +
              (employeeData.internshipPeriod !== null &&
              employeeData.internshipPeriod !== undefined
                ? employeeData.internshipPeriod
                : 0)
          )
        );
      } else if (
        state.empContractType === "Fulltime" ||
        state.empContractType === "fulltime" ||
        state.empContractType === "parttime" ||
        state.empContractType === "PartTime" ||
        state.empContractType === "Parttime"

      ) {
        var dateValue = new Date(
          new Date(employeeData.dateOfResignation).setMonth(
            new Date(employeeData.dateOfResignation).getMonth() +
              state.noticePeriod
          )
        );
        let aboveDateValue = new Date(
          new Date(employeeData.dateOfResignation).setMonth(
            new Date(employeeData.dateOfResignation).getMonth() +
              (parseInt(state.noticePeriod||0) + 1)
          )
        );
        setLastDateSelection(aboveDateValue);
        state.lastWorkingDate = dateValue;
        setlastWorkingDate(dateValue);
      } else {
        state.lastWorkingDate = "";
        setlastWorkingDate("");
      }
      state.lastWorkingDate =
        employeeData.lastWorkingDate !== null &&
        employeeData.lastWorkingDate !== undefined
          ? new Date(employeeData.lastWorkingDate)
          : new Date();
      setlastWorkingDate(
        employeeData.lastWorkingDate !== null &&
          employeeData.lastWorkingDate !== undefined
          ? new Date(employeeData.lastWorkingDate)
          : new Date()
      );
      state.personalEmailId = employeeData.personalEmailId;
      state.comments = employeeData.employeeComment;
      state.noticePeriodRcryDays =
        employeeData.noticePeriodRecoveryDays !== null &&
        employeeData.noticePeriodRecoveryDays !== undefined
          ? employeeData.noticePeriodRecoveryDays
          : "";
      if (employeeData.status === 8) {
        // setSuccessModal(true);
        setPreview(true);
      }

      if (
        employeeData.noticePeriodRecovery !== null &&
        employeeData.noticePeriodRecovery !== undefined
      ) {
        if (employeeData.noticePeriodRecovery === 2) {
          setRcryNo(true);
          setRcryYes(false);
        } else if (employeeData.noticePeriodRecovery === 1) {
          setRcryNo(false);
          setRcryYes(true);
        } else if (employeeData.noticePeriodRecovery === 0) {
          setRcryNo(false);
          setRcryYes(false);
        }
      } else {
        setRcryNo(false);
        setRcryYes(false);
      }
      if (employeeData.reHire !== null && employeeData.reHire !== undefined) {
        if (employeeData.reHire === 2) {
          setRehireNo(true);
          setRehireYes(false);
        } else if (employeeData.reHire === 1) {
          setRehireNo(false);
          setRehireYes(true);
        } else if (employeeData.reHire === 0) {
          setRehireNo(false);
          setRehireYes(false);
        }
      } else {
        setRehireNo(false);
        setRehireYes(false);
      }
    }
  }, [employeeData, ModeOfSeparationData, paramsemployeeId]);
  useEffect(() => {
    if (
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0 &&
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      if (employeeData.modeOfSeparationId === 1) {
        console.log(ModeOfSeparationData[0].modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      ModeOfSeparationData.map((item, i) => {
        if (
          employeeData.modeOfSeparationId ===
          ModeOfSeparationData[i].modeOfSeparation.separationId
        ) {
          setModeOfSeparation(
            ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation
          );
          state.modeOfSeparationId =
            ModeOfSeparationData[i].modeOfSeparation.separationId;

          ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
            if (
              employeeData.modeOfSeparationReasonId ===
              ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                .separationReasonId
            ) {
              state.modeOfSeparationReasonId =
                ModeOfSeparationData[i].modeOfSeparationReasonList[
                  j
                ].modeOfSeparationReason;
            }
          });
        }
      });
    }
  }, [employeeData, ModeOfSeparationData, paramsemployeeId]);
  const handleNoticePeriodRcryYes = (e) => {
    setRcryYes(e.target.checked);
    setRcryNo(!e.target.checked);
  };
  const handleNoticePeriodRcryNo = (e) => {
    setRcryYes(!e.target.checked);
    setRcryNo(e.target.checked);
    state.noticePeriodRcryDays = "";
  };
  const handleRehireChangeYes = (e) => {
    setRehireYes(e.target.checked);
    setRehireNo(!e.target.checked);
  };
  const handleRehireChangeNo = (e) => {
    setRehireYes(!e.target.checked);
    setRehireNo(e.target.checked);
  };
  const handleClose = () => {
    setSuccessModal(false);
  };
  const handleClose1 = () => {
    setModal(false);
    state.remarks = "";
  };
  const handleShowAddModalClose = () => setShowAddModal(false);

  const handleRelivingClose = () => setShow(false);

  const saveOfferLetter = () => {
    setPreviewGeneratedLetter(true);
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalRelivingLetter = (e) => {
    e.preventDefault();
    const value = checkValidations();
    console.log(value, "submit");
    if (value === true) {
      if (
        (RehireNo === true && state.remarks === "") ||
        state.remarks === null ||
        state.remarks === undefined
      ) {
        setModal(true);
      } else {
        const InfoData = {
          company: employeeData.company,
          contractType: employeeData.contractType,
          costCentreManagerEmailId: employeeData.costCentreManagerEmailId,
          costCentreManagerName: employeeData.costCentreManagerName,
          costCentreName: employeeData.costCentreName,
          dateOfResignation: employeeData.dateOfResignation,
          personalEmailId: state.personalEmailId,
          empName: employeeData.empName,
          employeeComment: employeeData.employeeComment,
          employeeId: employeeData.employeeId,
          employeeName: employeeData.employeeName,
          exitId: employeeData.exitId,
          hoursWorked: employeeData.hoursWorked,
          lastWorkingDate: lastWorkingDate,
          location: employeeData.location,
          managerCostCentre: employeeData.managerCostCentre,
          managerEmailId: employeeData.managerEmailId,
          managerId: employeeData.managerId ? employeeData.managerId : "",
          managerName: employeeData.managerName,
          managerPosition: employeeData.managerPosition,
          modeOfSeparationId: employeeData.modeOfSeparationId,
          modeOfSeparationReasonId: employeeData.modeOfSeparationReasonId,
          noticePeriodRecoveryDays: state.noticePeriodRcryDays,
          noticePeriod: employeeData.noticePeriod,
          noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
          position: employeeData.position,
          reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
          reason: employeeData.reason,
          reasonForResignation: employeeData.reasonForResignation,
          rehireRemark: state.remarks !== "" ? state.remarks : null,
          status: 3,
          withdraw: employeeData.withdraw,
          iamStatus :state.iamStatus

        };
        console.log("save ", InfoData);
        UpdateEmplyoeeExist(InfoData, employeeData.employeeId);
      }
    }
    if (
      employeeData.employeeId !== null &&
      employeeData.employeeId !== undefined
    ) {
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };
  const previewRelivingLetter = (e) => {
    e.preventDefault();
    if (employeeData !== null && employeeData !== undefined) {
      fetchRelievingLetterData(employeeData.employeeId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const relivingLetterClick = (e) => {
    console.log(e.target.value, "999");
    e.preventDefault();
    if (
      e.target.value == "1" ||
      e.target.value == "Resignation" ||
      e.target.value == "4" ||
      e.target.value == "Employee Resignation"
    ) {
      fetchRelievingLetterData(employeeData.employeeId);
      handleShow();
      console.log("resignation");
    } else if (e.target.value == "2" || e.target.value == "Termination") {
      fetchTerminationLetterData(employeeData.employeeId);
      handleShow();
      console.log("termination");
    }

    // setPreviewGeneratedLetter(true);
  };

  const handleShow = () => {
    console.log("inside show moodal");
    setViewLetter(true);
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
    var noticeDays = state.noticePeriod * 30;
    if (RcryYes === true) {
      if (
        state.noticePeriodRcryDays !== "" &&
        state.noticePeriodRcryDays !== null &&
        state.noticePeriodRcryDays !== undefined &&
        Valid.test(state.noticePeriodRcryDays) &&
        state.noticePeriodRcryDays <= noticeDays
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
  const iamStatusValidate = () => {
    var status = state.iamStatus
    if (
      status !== "" &&
      status !== null &&
      status !== undefined || 
      (rolePermission == "admin"||
      rolePermission == "superCostCenterManager"||
       rolePermission == "costCenterManager"||
       rolePermission == "manager")
    ) {
      SetIamStatusError(false);
      return true;
    } else {
      SetIamStatusError(true);
      return false;
    }
  };
  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateCheckBoxes(RcryYes, RcryNo, setRcryError) === true) &
      (validateCheckBoxes(RehireYes, RehireNo, setRehireError) === true) &
      (validateRcryDays() === true) 
      // &
      // (iamStatusValidate() === true)
    ) {
      console.log("on true");
      return true;
    } else {
      console.log("on falsae");
      return false;
    }
  };
  const withdrawHandler = (e) => {
    e.preventDefault()
    console.log("exitId", employeeData.exitId);
     withdraw(employeeData.exitId);
    setWithdrawThis(true);
    // ViewEmployeeDataById(state.empId);
    // setSubmitted(false);
     setPreview(false);
  };
  const dateOfBirthHandler1 = (e) => {
    console.log(e, "dateOfBirthHandler1");
    var AdjusteddateValue = new Date(
      e.getTime() - e.getTimezoneOffset() * 60000
    );
    state.lastWorkingDate = AdjusteddateValue;
    setlastWorkingDate(AdjusteddateValue);
  };
  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      console.log(RehireNo,"no",RehireYes,"yes",state.remarks)
      if (
        (RehireNo === true && state.remarks === "") ||
        (state.remarks === null ||
        state.remarks === undefined)
      ) {
        setModal(true);
      } else {
        const InfoData = {
          company: employeeData.company,
          contractType: employeeData.contractType,
          costCentreManagerEmailId: employeeData.costCentreManagerEmailId,
          costCentreManagerName: employeeData.costCentreManagerName,
          costCentreName: employeeData.costCentreName,
          dateOfResignation: employeeData.dateOfResignation,
          personalEmailId: state.personalEmailId,
          empName: employeeData.empName,
          employeeComment: employeeData.employeeComment,
          employeeId: employeeData.employeeId,
          employeeName: employeeData.employeeName,
          exitId: employeeData.exitId,
          hoursWorked: employeeData.hoursWorked,
          lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
          location: employeeData.location,
          managerCostCentre: employeeData.managerCostCentre,
          managerEmailId: employeeData.managerEmailId,
          managerId: employeeData.managerId ? employeeData.managerId : "",
          managerName: employeeData.managerName,
          managerPosition: employeeData.managerPosition,
          modeOfSeparationId: employeeData.modeOfSeparationId,
          modeOfSeparationReasonId: employeeData.modeOfSeparationReasonId,
          noticePeriodRecoveryDays: state.noticePeriodRcryDays,
          noticePeriod: employeeData.noticePeriod,
          noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
          position: employeeData.position,
          reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
          reason: employeeData.reason,
          reasonForResignation: employeeData.reasonForResignation,
          rehireRemark: state.remarks !== "" ? state.remarks : null,
          status: 8,
          withdraw: employeeData.withdraw,
          iamStatus: state.iamStatus

        };
        UpdateEmplyoeeExist(InfoData, employeeData.employeeId);
        setSuccessModal(true);
        setPreview(true);
        console.log("in else", InfoData);
      }
    }
  };
  console.log(relivingLetterData, "relivingLetterData", modeOfSeparation);
  const handleRelivingClose1 = () => {
    history.push("/employee-separation-listing");
  };
  console.log("exit",modeOfSeparation,employeeData,)
  return (
    <Fragment>
      {employeeData !== null &&
      employeeData !== undefined &&
      employeeData.status === 8 ? (
        <Modal
          show={showAddModal}
          onHide={handleShowAddModalClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Please Add the Digital Signature.
              <br />
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleShowAddModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {submitLetter ? (
        <Modal
          show={showRelivingModal}
          onHide={handleRelivingClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              The details have been saved successfully.
              <br />
              The relieving letter will be sent to the employee on{" "}
              {moment(
                terminationLetterData !== null &&
                  terminationLetterData !== undefined &&
                  (modeOfSeparation == "Termination" || modeOfSeparation == 2)
                  ? terminationLetterData.lastWorkingDate
                  : relivingLetterData !== null &&
                    relivingLetterData !== undefined &&
                    (modeOfSeparation == "Employee Resignation" ||
                      modeOfSeparation == 1)
                  ? relivingLetterData.lastWorkingDate
                  : new Date(),
                "YYYY-MM-DD"
              )
                .add(1, "days")
                .format("YYYY-MM-DD")}
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleRelivingClose1}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      {lettterview ? (
        <div>
          {relivingLetterData &&
          relivingLetterData !== undefined &&
          relivingLetterData !== null ? (
            <RelievingLetter />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <Modal show={showModal} onHide={() => handleClose1()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            {/* <label className="itemResult">State remarks:</label> */}
            <label className="itemResult">
              Please state the reason why this employee cannot be re-hired :
            </label>
            {/* <p>Please state the reason why this employee cannot be re-hired:</p> */}
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
            <label>
              Exit details saved successfully the employee has been notified
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Breadcrumb title="EMPLOYEE SEPARATION" parent="EMPLOYEE SEPARATION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>EMPLOYEE SEPARATION </b>
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
                        marginLeft: "2rem",
                        marginTop: "2rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Emp Name/Id:</b>
                            <label className="itemResult">
                              {" "}
                              &nbsp;&nbsp; {state.empName} &nbsp;{state.empId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Contract Type:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empContractType}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Cost Center Name:</b>
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
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Location:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empLocation}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Position:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empPosition}
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
                            <b>Manager Name/Id:</b>
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
                            <b>Position:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.mngrPosition}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Cost Center Name:</b>
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
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Mode of Separation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {modeOfSeparation}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Reason of Separation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.modeOfSeparationReasonId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Date of Resignation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.dateOfResignation}
                            </label>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      {state.empContractType !== "internship" ? (
                        <Col sm={2}>
                          <div>
                            {/* <label>
                              <b>Notice Period:</b>
                              <label className="itemResult">
                                &nbsp;&nbsp;{" "}
                                {state.empName ? state.noticePeriod : ""}
                              </label>
                            </label> */}
                            <label>
                                Notice Period:
                                <label className="itemResult">
                                  &nbsp;&nbsp;{" "}
                                  {state.noticePeriod === 1
                                    ? `${state.noticePeriod} Month`
                                    : state.noticePeriod > 1
                                    ? `${state.noticePeriod} Months`
                                    : state.noticePeriod}
                                </label>
                              </label>
                          </div>
                        </Col>
                      ) : (
                        <Col sm={2}>
                          <div>
                            <label>
                              <b>Internship contract end date:</b>
                              <label className="itemResult">
                                &nbsp;&nbsp;{" "}
                                {state.noticePeriod === 1
                                  ? `${state.noticePeriod} Month`
                                  : state.noticePeriod > 1
                                  ? `${state.noticePeriod} Months`
                                  : state.noticePeriod}
                              </label>
                            </label>
                          </div>
                        </Col>
                      )}
                      {/* <Col sm={4}>
                        <div>
                          <label>
                            <b>Preffered Last Working Date:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.lastWorkingDate}
                            </label>
                          </label>
                        </div>
                      </Col> */}

                      <Col sm={2}>
                        <div>
                          <label>Preffered Last Working Date:</label>
                        </div>
                      </Col>

                      <Col sm={2}>
                        <div>
                          {/* {false ? (
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.lastWorkingDate}
                            </label>
                          ) : ( */}
                          <Form.Group>
                            <div
                              className={
                                lastWorkingDateError
                                  ? "onBoard-date-error"
                                  : "onBoard-date"
                              }
                            >
                              <DatePicker
                                minDate={moment().toDate()}
                                value={moment(lastWorkingDate).format(
                                  "YYYY-MM-DD"
                                )}
                                name="lastWorkingDate"
                                selected={lastWorkingDate}
                                maxDate={lastDateSelection}
                                onChange={(e) => dateOfBirthHandler1(e)}
                                className="form-control onBoard-view"
                                dateFormat="yyyy-MM-dd"
                                placeholderText="YYYY-MM-DD"
                                required
                              />
                            </div>
                            {lastWorkingDateError ? (
                              <p style={{ color: "red" }}>
                                {" "}
                                &nbsp; *Please enter valid date
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </Form.Group>
                          {/* )} */}
                        </div>
                      </Col>
                      {/* <Col sm={4}>
                        <div>
                          <label>
                            <b>Personal Email Id:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.personalEmailId}
                            </label>
                          </label>
                        </div>
                      </Col> */}
                      <Col sm={2}>
                        <div>
                          <label>Personal Email Id:</label>
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div>
                          {false ? (
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.personalEmailId}
                            </label>
                          ) : (
                            <Form.Group>
                              <Form.Control
                                type="text"
                                placeholder=""
                                required
                                // style={{
                                //   borderColor: "#006ebb",
                                // }}
                                //   disabled={!RcryYes}
                                name="personalEmailId"
                                value={state.personalEmailId}
                                onChange={(e) => changeHandler(e)}
                                style={emailError ? { borderColor: "red" } : {borderColor: "#006ebb"}}
                              />

                              {emailError ? (
                                <p style={{ color: "red" }}>
                                  {" "}
                                  &nbsp; *Please provide valid email
                                </p>
                              ) : (
                                <p></p>
                              )}
                            </Form.Group>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {state.modeOfSeparationId == 4 ? (
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        {/* <Col sm={2}>
                          <div>
                            <label>
                              <b>Exit Feedback Form:</b>
                              <label className="itemResult">
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            <label className="itemResult">
                              <a
                                target="_blank"
                                href="https://docs.google.com/forms/d/e/1FAIpQLSf4F8RzZMXnhc_vaowkpMgtDe9Hh3i7JYT3zML3miyany5I8Q/viewform"
                                className="itemResult"
                              >
                                <u>Click here</u>
                              </a>
                            </label>
                          </div>
                        </Col> */}
                      </Row>
                    ) : (
                      ""
                    )}
                    <Row
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Approver:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.approverName}
                              &nbsp; {state.approverEmpId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      {/* <Col sm={8}>
                        <div>
                          <label>
                            <b>Comments:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.comments}
                            </label>
                          </label>
                        </div>
                      </Col> */}
                    </Row>
                    <Row
                      style={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <Col sm={2}>
                        <div>
                          <label>
                            <b>Notice Period Recovery</b>
                          </label>
                          {RcryError ? (
                            <p style={{ color: "red" }}>
                              {" "}
                              *Please select one of the option
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              value="yes"
                              checked={RcryYes}
                              style={RcryError ? { borderColor: "red" } : {}}
                              // required={required}
                              onChange={handleNoticePeriodRcryYes}
                            />
                            <label className="itemResult">Yes</label>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              value="no"
                              checked={RcryNo}
                              style={RcryError ? { borderColor: "red" } : {}}
                              // required={required}
                              onChange={handleNoticePeriodRcryNo}
                            />
                            <label className="itemResult">No</label>
                          </div>
                        </Form.Group>
                      </Col>

                      <Col sm={2}>
                        <div>
                          <label>
                            <b>Notice Period Recovery Days</b>
                          </label>
                          {/* {uanNumberError ? (
                <p style={{ color: "red" }}> *Please enter your UAN number</p>
              ) : (
                <p></p>
              )} */}
                        </div>
                      </Col>
                      <Col sm={2} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder=""
                            required
                            // style={{
                            //   borderColor: "#006ebb",
                            // }}
                            disabled={!RcryYes}
                            name="noticePeriodRcryDays"
                            value={state.noticePeriodRcryDays}
                            onChange={(e) => changeHandler(e)}
                            style={rcryDaysError ? { borderColor: "red" } : {borderColor: "#006ebb"}}
                          />

                          {rcryDaysError ? (
                            <p style={{ color: "red" }}>
                              {" "}
                              &nbsp; *Please enter valid days
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col sm={2}>
                        <div>
                          <label>
                            <b>
                              Eligible <br />
                              For Rehire
                            </b>
                          </label>
                          {RehireError ? (
                            <p style={{ color: "red" }}>
                              {" "}
                              *Please select one of the option
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              value="yes"
                              checked={RehireYes}
                              // required={required}
                              style={RehireError ? { borderColor: "red" } : {}}
                              onChange={handleRehireChangeYes}
                            />
                            <label className="itemResult">Yes</label>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              value="no"
                              checked={RehireNo}
                              // required={required}
                              style={RehireError ? { borderColor: "red" } : {}}
                              onChange={handleRehireChangeNo}
                            />
                            <label className="itemResult">No</label>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    {state.remarks !== "" &&
                    state.remarks !== null &&
                    state.remarks !== undefined ? (
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={12}>
                          <div>
                            <label>
                              <b>Remarks:</b>
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.remarks}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                     {/* <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                          <label>Identity Profile Active :</label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            {false ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.iamStatus}
                              </label>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  name="iamStatus"
                                  value={state.iamStatus}
                                  onChange={changeHandler}
                                  style={
                                    iamStatusError
                                      ? { borderColor: "red" }
                                      : {}
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="Delete">Delete</option>
                                  <option value="Suspend">Suspend</option>
                                  <option value="Keep the account active">Keep the account active</option>

                                </Form.Control>
                                {iamStatusError ? (
                                  <p style={{ color: "red" }}>
                                    {" "}
                                    &nbsp; *Please choose valid option
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                        </Row> */}
                    <div
                      style={{
                        marginTop: "2rem",
                        marginBottom: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {/* <button className="stepperButtons" onClick={PrevStep}>
            Back
          </button> */}
                      {true ? (
                        <button
                          disabled={showPreview}
                          className={
                            showPreview ? "confirmButton" : "stepperButtons"
                          }
                          onClick={submitHandler}
                        >
                          Save
                        </button>
                      ) : (
                        ""
                      )}
                      {submitted === false ||
                      modeOfSeparation == "Termination" ||
                      modeOfSeparation == 2 ? (
                        ""
                      ) : (
                        <button
                          disabled={!submitted || letterSent}
                          className={
                            !submitted || letterSent
                              ? "LetterCnfButton"
                              : "LettersButtons"
                          }
                          onClick={withdrawHandler}
                        >
                          Withdraw
                        </button>
                      )}
                      {!saveLetter && employeeData !== null &&
                          employeeData !== undefined &&
                      (employeeData.status === 2 || showPreview === true) ? (
                        <button
                          // disabled={!submitted}
                          value={modeOfSeparation}
                          className={"LettersButtons"}
                          onClick={relivingLetterClick}
                        >
                          Generate Relieving Letter
                        </button>
                      ) : (
                        ""
                      )}
                      {saveLetter && previewGeneratedLetter && showPreview ? (
                        <button
                          className={"LettersButtons"}
                          onClick={previewRelivingLetter}
                        >
                          Preview Letter
                        </button>
                      ) : (
                        ""
                      )}
                      {/* {employeeData !== null &&
        employeeData !== undefined && employeeData.status === 8?<label style={{color:'red'}}>{"Please Add the Digital signature"}</label>:''} */}
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

export default EmployeeExitAction;
