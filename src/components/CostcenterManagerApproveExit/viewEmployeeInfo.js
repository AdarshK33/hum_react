import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { SeparationContext } from "../../context/SepearationState";
import RelievingLetter from "./Relieving Letter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TerminationLetter from "./TerminationLetter";
import NonPerformanceTerminationLetter from "./NonPerformanceTerminationLetter"
import MisConductTerminationLetter from "./MisConductTerminationLetter"
import { setGlobalCssModule } from "reactstrap/es/utils";
import { PermissionContext } from "../../context/PermissionState";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import calendarImage from "../../assets/images/calendar-image.png";
// import PdfExample from "../PdfLetters/pdfexample";

import "./exitForm.css";
const EmployeeExitAction = (props) => {
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [modeOfSeparationReasonId,setModeOfSeparationReasonId] = useState("")
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(false);
  const [RcryError, setRcryError] = useState(false);
  const [RehireError, setRehireError] = useState(false);
  const [rcryDaysError, setRcryDaysError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [letterView, setLetterView] = useState("");
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [terminationLetter, setTerminationLetter] = useState(false);
  const [lastWorkingDate, setLastWorkingDate] = useState(new Date());
  const [lastWorkingDateError, setLastWorkingDateError] = useState(false);
  const [lastDateSelection, setLastDateSelection] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [intern, setIntern] = useState(false);
  const [iamStatusError,SetIamStatusError] = useState(false)

  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageDemise, setMessageDemise] = useState(false);

  const params = useParams();

  const paramsemployeeId = params["employeeid"];

  const [showSignature, setShowSignature] = useState(false);
  const [showRelivingModal, setShow] = useState(false);

  const [state, setState] = useState({
    exitId: "",
    company: "",
    contractType: "",
    costCentreManagerEmailId: "",
    costCentreName: "",
    hoursWorked: "",
    employeeName: "",
    employeeComment: "",
    managerEmailId: "",
    employeeId: "",
    location: "",
    position: "",
    reason: "",
    managerName: "",
    managerId: "",
    managerCostCentre: "",
    managerPosition: "",
    modeOfSeparationId: "",
    modeOfSeparationReasonId: "",
    dateOfResignation: "",
    noticePeriod: "",
    lastWorkingDate: new Date(),
    emailId: "",
    personalEmailId: "",
    noticePeriodRcryDays: "",
    reasonForResignation: "",
    noticePeriodRecovery: "",
    remarks: "",
    status: "",
    withdraw: "",
    iamStatus:"",
    approverName:"",
    approverEmpId:""
  });
  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    CreateEmplyoeeExist,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationData,
    UpdateEmplyoeeExist,
    employeeId,
    loader,
    ModeOfSeparationView,
    fetchRelievingLetterData,
    terminationLetterData,
    fetchTerminationLetterData,
    relivingLetterData,
    terminationConfirmation,
    resignationConfirmation,
  } = useContext(EmployeeSeparationContext);
  const {rolePermission} =
  useContext(PermissionContext);
  const {
    empResign,
    withdraw,
    searchByCostCenter,
    searchByEmployee,
    searchByCostData,
  } = useContext(SeparationContext);
  console.log("employeeId", paramsemployeeId);
  console.log("employeeData", employeeData);
  useEffect(() => {
    ViewEmployeeDataById(paramsemployeeId);
    fetchRelievingLetterData(paramsemployeeId);
    fetchTerminationLetterData(paramsemployeeId);
    ModeOfSeparationView();
  }, [paramsemployeeId]);
  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      console.log("employeeData................", employeeData);
      state.company = employeeData.company;
      state.withdraw = employeeData.withdraw;
      state.contractType = employeeData.contractType;
      state.costCentreManagerEmailId = employeeData.costCentreManagerEmailId;
      state.costCentreManagerName = employeeData.costCentreManagerName;
      state.costCentreName = employeeData.costCentreName;
      state.dateOfResignation = employeeData.dateOfResignation;
      state.managerEmailId = employeeData.managerEmailId;
      state.reason = employeeData.reason;
      state.exitId = employeeData.exitId;
      state.employeeName = employeeData.employeeName;
      state.employeeComment = employeeData.employeeComment;
      state.employeeId = employeeData.employeeId;
      state.hoursWorked = employeeData.hoursWorked;
      state.noticePeriodRcryDays = employeeData.noticePeriodRecoveryDays;
      state.reasonForResignation = employeeData.reasonForResignation;
      state.noticePeriod = employeeData.noticePeriod;
      state.location = employeeData.location;
      state.position = employeeData.position;
      state.managerName = employeeData.managerName;
      state.managerId = employeeData.managerId;
      state.managerCostCentre = employeeData.managerCostCentre;
      state.managerPosition = employeeData.managerPosition;
      state.status = employeeData.status;
      state.modeOfSeparationId = employeeData.modeOfSeparationId;
      state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
      state.personalEmailId = employeeData.personalEmailId;
      state.iamStatus = employeeData.iamStatus;
      state.remarks = employeeData.rehireRemark;
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
      // state.noticePeriod = employeeData.noticePeriod;
      if (
        employeeData.lastWorkingDate !== null &&
        employeeData.lastWorkingDate !== undefined &&
        employeeData.lastWorkingDate !== ""
      ) {
        setLastWorkingDate(employeeData.lastWorkingDate);
      }
      state.lastWorkingDate = employeeData.lastWorkingDate;
      state.emailId = employeeData.emailId;
      console.log(employeeData.lastWorkingDate, "employeedat444");

      if (
        state.contractType === "internship" ||
        state.contractType === "Internship"
      ) {
        setIntern(true);
        setLastWorkingDate(
          new Date(searchByCostData.joiningDate).setMonth(
            new Date(searchByCostData.joiningDate).getMonth() +
              (searchByCostData.internshipPeriod !== null &&
              searchByCostData.internshipPeriod !== undefined
                ? searchByCostData.internshipPeriod
                : 0)
          )
        );
      } else if (
        state.contractType === "Fulltime" ||
        state.contractType === "fulltime" ||
        state.contractType === "parttime" ||
        state.contractType === "PartTime" ||
        state.contractType === "Parttime"
      ) {
        var dateValue = new Date(
          new Date().setMonth(new Date().getMonth() + state.noticePeriod||0)
        );
        let aboveDateValue = new Date(
          new Date().setMonth(
            new Date().getMonth() + (parseInt(state.noticePeriod||0) + 1)
          )
        );
        setIntern(false);
        setLastDateSelection(aboveDateValue);
        setLastWorkingDate(dateValue);
      } else {
        setIntern(false);
        setLastWorkingDate("");
      }
      setLastWorkingDate(
        employeeData.lastWorkingDate !== null &&
          employeeData.lastWorkingDate !== undefined
          ? new Date(employeeData.lastWorkingDate)
          : new Date()
      );
      state.noticePeriodRcryDays =
        employeeData.noticePeriodRecoveryDays !== null &&
        employeeData.noticePeriodRecoveryDays !== undefined
          ? employeeData.noticePeriodRecoveryDays
          : "";

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
        console.log(ModeOfSeparationData[0].modeOfSeparation,"item");
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      ModeOfSeparationData.map((item, i) => {
        if (
          employeeData.modeOfSeparationId ===
          item.modeOfSeparation.separationId
        ) {
          setModeOfSeparation(
            item.modeOfSeparation.modeOfSeparation
          );
            console.log(item,"itemi")
          item.modeOfSeparationReasonList.map((item1, j) => {
            console.log(item1,"item1")
            if (
              employeeData.modeOfSeparationReasonId ===
              item1
                .separationReasonId
            ) {
              console.log(item1,"item2")
              state.modeOfSeparationReasonId =item1.modeOfSeparationReason;
                setModeOfSeparationReasonId(item1.modeOfSeparationReason)
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
  const iamStatusValidate = () => {
    let statusData = state.iamStatus
    if (
      (statusData !== "" &&
      statusData !== null &&
      statusData !== undefined) &&
      (rolePermission == "admin"||
      rolePermission == "superCostCenterManager"||
       rolePermission == "costCenterManager"||
       rolePermission == "manager"
      )
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
      //  &
      // (iamStatusValidate() === true)
    ) {
      console.log("on true");
      return true;
    } else {
      console.log("on falsae");
      return false;
    }
  };

  const dateOfBirthHandler1 = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setLastWorkingDate(AdjusteddateValue);
  };

  const handleConfirmation = (exitId, employeeId) => {
    if (state.modeOfSeparationId == 2) {
     terminationConfirmation(exitId, employeeId);
      viewTermination();
      setLetterView(2)
      setShow(true);
      // setModal(true)
    } else if (state.modeOfSeparationId == 1 || state.modeOfSeparationId == 4) {
     resignationConfirmation(exitId, employeeId);
      viewResignation();
      setLetterView(4)
      setShow(true);
      // setModal(true)
    }
     console.log(letterView, "sravani");

  };
  const handleClosePopup = () => {
    setMessage(false);
  };
  const handleCloseDemise =()=>{
    setMessageDemise(false)
  }
  const handleRelivingClose = () => {
    setShow(false)
  }
  const handleSubmit = () => {
    setMessage(true);
  };
  const viewTermination = () => {
    setTerminationLetter(true);
    if (terminationLetterData !== undefined) {
      setSubmit(true);
    }
  };
  const viewResignation = () => {
    setPreviewLetter(true);
    if (relivingLetterData !== undefined) {
      setSubmit(true);
    }
  };
  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      if (intern == false) {
      
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
          status: 9,
          withdraw: employeeData.withdraw,
           iamStatus: state.iamStatus
        };
        console.log("createExitData", InfoData);
        UpdateEmplyoeeExist(InfoData,paramsemployeeId);
        if(state.modeOfSeparationId === 7){
          setSubmitted(true);
          setMessageDemise(true)
        }else{
          setSubmitted(true);
          setModal(true)
        }
       
        // setPreview(true);
        // setSuccessModal(true);
      }
    }
  };
  console.log(state)
  return (
    console.log(state.status),
    (
      <Fragment>
        <Modal
          show={message}
          size="md"
          onHide={() => handleClosePopup()}
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {" "}
              The details have been saved successfully.
              <br /> The relieving letter will be sent to the employee on{" "}
              {moment(
                terminationLetterData !== null &&
                  terminationLetterData !== undefined &&
                  (modeOfSeparation == "Termination" || modeOfSeparation == 2)
                  ? terminationLetterData.lastWorkingDate
                  : relivingLetterData !== null &&
                    relivingLetterData !== undefined &&
                    (modeOfSeparation == "Resignation" ||
                      modeOfSeparation == 1 ||
                      modeOfSeparation == "Employee Resignation" ||
                      modeOfSeparation == 4)
                  ? relivingLetterData.lastWorkingDate
                  : "",
                "YYYY-MM-DD"
              )
                .add(1, "days")
                .format("YYYY-MM-DD")}
            </label>
            <div className="text-center mb-2">
              <Link to={"/exit-approval"}>
                {" "}
                <Button onClick={() => handleClosePopup()}>OK</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={messageDemise}
          size="md"
          onHide={() => handleCloseDemise()}
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {" "}
              The details have been saved successfully.
            </label>
            <div className="text-center mb-2">
              <Link to={"/exit-approval"}>
                {" "}
                <Button onClick={() => handleCloseDemise()}>OK</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showModal} onHide={() => handleClose1()} centered>
          <Container style={{ textAlign: "center", margin: "1rem 0 1rem 0" }}>
            <Modal.Body style={{ marginBottom: "1rem" }}>
              <label className="text-center">
                {modeOfSeparation === "Termination"
                  ? "Thank you for confirming the Termination details"
                  : "Thank you for confirming the Resignation details"}
              </label>
              <Button onClick={() => handleClose1()}>OK</Button>
            </Modal.Body>
          </Container>
        </Modal>
        { (letterView == 1 || letterView == 4||letterView == 2)?(
        <Modal show={showRelivingModal} onHide={handleRelivingClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {(letterView == 1 || letterView == 4) ? (
              <RelievingLetter />
            ) :(letterView == 2 && employeeData.disciplinaryReasonId == 2)? (
              <MisConductTerminationLetter />
            ) : (
              <NonPerformanceTerminationLetter/>
            )}
            <br></br>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
       {/* {letterView == 2?<RelievingLetter previewLetter={previewLetter} />:
        (letterView == 1 || letterView == 4)? <TerminationLetter terminationLetter={terminationLetter} /> :""}
         */}
        <Breadcrumb title="EMPLOYEE SEPARATION" parent="EMPLOYEE SEPARATION" />
        {/* <PdfExample /> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div>
                  <div className="OnBoardHeading">
                    <b>EMPLOYEE SEPARATION LISTING</b>
                  </div>
                  <div>
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
                              &nbsp;&nbsp; {state.employeeName +"/"+state.employeeId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Contract Type:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.contractType}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Cost Center Name:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.costCentreName}
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
                              &nbsp;&nbsp; {state.location}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Position:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.position}
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
                              &nbsp;&nbsp; {state.managerName}
                              &nbsp; {state.managerId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Position:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.managerPosition}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Cost Center Name:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.managerCostCentre}
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
                     {state.modeOfSeparationId === 7?"":<Col sm={4}>
                        <div>
                          <label>
                            <b>Date of Resignation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.dateOfResignation}
                            </label>
                          </label>
                        </div>
                      </Col>}
                    </Row>
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
                            <b>Notice Period:</b>
                            {/* <label className="itemResult">
                                &nbsp;&nbsp; {state.noticePeriod}
                              </label>
                            </label> */}
                            <label className="itemResult">
                              &nbsp;&nbsp;{" "}
                              {state.noticePeriod == 1
                                ? `${state.noticePeriod} Month`
                                : state.noticePeriod > 1
                                ? `${state.noticePeriod} Months`
                                : ""}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div>
                          <label>
                            <b>Preffered Last Working Date:</b>
                            {/* <label className="itemResult">
                                &nbsp;&nbsp; {state.lastWorkingDate}
                              </label> */}
                          </label>
                        </div>
                      </Col>
                      <Col sm={2}>
                        <Form.Group>
                          <div
                            className={
                              lastWorkingDateError
                                ? "onBoard-date-error"
                                : "onBoard-date"
                            }
                          >
                            <DatePicker
                              className="form-control onBoard-view"
                              selected={lastWorkingDate}
                              name="lastWorkingDate"
                              minDate={new Date()}
                              maxDate={lastDateSelection}
                              onChange={(e) => dateOfBirthHandler1(e)}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="YYYY-MM-DD"
                              disabled={submitted}
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
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Personal Email Id:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.personalEmailId}
                            </label>
                          </label>
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
                            <label>
                              <a
                                target="_blank"
                                href="https://docs.google.com/forms/d/e/1FAIpQLSf4F8RzZMXnhc_vaowkpMgtDe9Hh3i7JYT3zML3miyany5I8Q/viewform"
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
                    {/* <Row
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      <Col sm={12}>
                        <div>
                          <label>
                            <b>Comment:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.employeeComment}
                            </label>
                          </label>
                        </div>
                      </Col>
                    </Row> */}
                        <Row
                      style={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                        marginBottom: "2rem",
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
                              disabled={true}
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
                              disabled={true}
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
                            disabled={true}
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
                              disabled={true}
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
                              disabled={true}
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
                                    iamStatusError? { borderColor: "red" }
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
                   {state.modeOfSeparationId === 7?<>
                    <div
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
                        onClick={submitHandler}
                      >
                        confirm 
                      </button>
                      </div>
                   </>:<> <div
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
                        onClick={submitHandler}
                      >
                        confirm 
                      </button>

                      {submitted ? (
                        <button
                          // disabled={previewLetter | showSuccessModal}
                          className="resignationButton"
                          onClick={() => {
                            handleConfirmation(state.exitId, paramsemployeeId);
                          }}
                        >
                          {modeOfSeparation === "Termination"
                            ? "View Letter"
                            : "View Letter"}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    {submit === true && (
                      <div className="text-center mb-3">
                        <br></br>
                        <br></br>
                        <img src={calendarImage} alt="calendar" width="300px" />
                      </div>
                    )}
                    {submit === true && (
                      <div className="text-center mb-2">
                        <button
                          className={
                            message ? "confirmButton" : "stepperButtons"
                          }
                          // style={{ textAlign: "center" }}
                          onClick={() => handleSubmit()}
                        >
                          {" "}
                          Submit
                        </button>
                      </div>
                    )}</>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

export default EmployeeExitAction;
