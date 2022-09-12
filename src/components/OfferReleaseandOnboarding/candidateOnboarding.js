import React, { Fragment, useState, useContext, useEffect } from "react";
import { OfferContext } from "../../context/OfferState";
import { useHistory } from "react-router-dom";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { DashboardContext } from "../../context/DashboardState";
import calendarImage from "../../assets/images/calendar-image.png";
import DatePicker from "react-datepicker";

import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
  subWeeks,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import moment from "moment";
import "./offerReleaseandOnboarding.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import AppointmentLetter from "./AppointmentLetter";
import PartTimeAppointmentLetter from "./partTimeAppointmentLetter";
import InternAppointmentLetter from "./internAppointmentLetter";
import LocalExpatAppointmentLetter from "./localExpactAppointmentLetter";
const CandidateOnboarding = () => {
  const {
    generateOfferLetter,
    offerLetterData,
    candidateData,
    finalSubmitAppointmentLetter,
    submitAppointmentLetter,
    lettterview,
    setViewLetter,
  } = useContext(OfferContext);
  const {
    costCenterSplit,
    createEmployee,
    createStatus,
    candidateOnBoard,
    onBoardData,
    personalInfo,
    personalInfoData,
    viewEmployee,
    empData,
    step6suscessStatus,
  } = useContext(DocsVerifyContext);

  const { RoleList } = useContext(RoleManagementContext);
  const { costCenterList } = useContext(AdminContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);

  const [count, setCount] = useState(1);
  const [costCenter1, setCostCenter1] = useState(false);
  const [email, setEmail] = useState("");
  const [fedId, setFedId] = useState("");
  const [costCenter, setCostCenter] = useState(true);
  const [costCenter2, setCostCenter2] = useState(false);
  const [costCenter3, setCostCenter3] = useState(false);
  const [costCenter4, setCostCenter4] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [startMonth1Date, setStartMonth1Date] = useState(0);
  const [startYear1Date, setStartYear1Date] = useState(0);
  const [startMonth1End, setStartMonth1EndDate] = useState(0);
  // const [endMonth1Date, setEndMonth1Date] = useState("");
  const [endYear1Date, setEndYear1Date] = useState(0);
  const [startMonth2Date, setStartMonth2Date] = useState(0);
  const [startYear2Date, setStartYear2Date] = useState(0);
  const [endMonth2Date, setEndMonth2Date] = useState(0);
  const [endYear2Date, setEndyear2Date] = useState(0);
  const [startMonth3Date, setStartMonth3Date] = useState(0);

  const [startYear3Date, setStartYear3Date] = useState(0);
  const [endMonth3Date, setEndMonth3Date] = useState(0);
  const [endYear3Date, setEndYear3Date] = useState(0);
  const [startMonth4Date, setStartMonth4Date] = useState(0);
  const [startYear4Date, setStartYear4Date] = useState(0);
  const [endMonth4Date, setEndMonth4Date] = useState(0);
  const [endYear4Date, setEndYear4Date] = useState(0);
  const [startMonth5Date, setStartMonth5Date] = useState(0);
  const [endMonth5Date, setEndMonth5Date] = useState(0);
  const [startYear5Date, setStartYear5Date] = useState(0);
  const [endYear5Date, setEndYear5Date] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const [costCenterA, setCostCenterA] = useState("");
  const [costCenterB, setCostCenterB] = useState("");
  const [costCenterC, setCostCenterC] = useState("");
  const [costCenterD, setCostCenterD] = useState("");
  const [costCenterE, setCostCenterE] = useState("");
  const [emailError, setError] = useState(false);
  const [costCentersData, setCostCentersData] = useState({});
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showSubmitModal, setSubmitModal] = useState(false);
  const [costCenterError, setCostCenterError] = useState(false);
  const [fedError, setFedError] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [generateAppoint, setGenerateAppoint] = useState(false);
  const [joiningError, setJoiningError] = useState(false);
  const [employeeFedId, setEmployeeFedId] = useState("");

  let history = useHistory();
  useEffect(() => {
    if (
      candidateData !== undefined &&
      candidateData.candidateInformation !== undefined &&
      candidateData.remuneration !== null
    ) {
      candidateOnBoard(candidateData.candidateInformation.candidateId);
    }
    if (onBoardData === null) {
      if (
        candidateData !== undefined &&
        candidateData.candidateInformation !== undefined && candidateData.candidateInformation !== null
      ) {
      personalInfo(candidateData.candidateInformation.candidateId);
      }
    }
  }, [candidateData]);
  console.log("RoleList", RoleList,user);

  useEffect(() => {
    if (
      onBoardData === null &&
      candidateData !== undefined && Object.keys(candidateData).length > 0 &&
      candidateData.candidateInformation !== undefined && candidateData.candidateInformation !== null
    ) {
      personalInfo(candidateData.candidateInformation.candidateId);
    }
  }, [onBoardData]);
  useEffect(() => {
    setEmployeeData({
      ...employeeData,
      ["employeeId"]:
        onBoardData !== undefined && onBoardData !== null
          ? onBoardData.employeeId
          : personalInfoData !== undefined
          ? personalInfoData.employeeId
          : "",
    });
  }, [onBoardData, personalInfoData]);
  useEffect(() => {
    console.log("employeeData", employeeData);
    if (
      personalInfoData !== undefined &&
      personalInfoData !== null && Object.keys(personalInfoData).length > 0 &&
      personalInfoData.employeeId !== undefined
    ) {
      viewEmployee(personalInfoData.employeeId);
      // setEmployeeData(empData);
    }
  }, [personalInfoData]);

  useEffect(() => {
    console.log("employeeData", employeeData);
    if (
      personalInfoData !== undefined &&
      personalInfoData !== null &&
      personalInfoData.employeeId !== undefined
    ) {
      setEmployeeData({
        ...employeeData,
        ["email"]:"",
        ["fedId"]:"",
    })
  }
  }, [personalInfoData]);


  useEffect(() => {
    if (
      empData !== undefined &&
      empData !== null &&
      candidateData !== undefined &&
      candidateData !== null &&
      Object.keys(candidateData).length !== 0
    ) {
      console.log("empData check1",empData);
      // let employeeFedId = (empData.fedId !== null && empData.fedId !== undefined && empData.fedId !== " ")?empData.fedId:""
      // var newFedId=   employeeFedId.replace(/"/g, '');
      // setEmployeeFedId(newFedId)
      setEmployeeData({
        ...employeeData,
        ["active"]: empData !== undefined ? empData.active : "",
        ["additionalRole"]: empData !== undefined ? empData.additionalRole : "",
        ["employeeId"]: empData !== undefined ? empData.employeeId : "",
        ["bloodGroup"]: empData.bloodGroup,
        ["company"]: empData.company,
        ["contractType"]: empData.contractType,
        ["costCentre"]: empData.costCentre,
        ["department"]: empData.department,
        ["dob"]: empData.dob,
        ["employeeName"]:
          empData.employeeName !== null
            ? empData.employeeName
            : empData.firstName,
        ["fatherName"]: empData.fatherName,
        ["gender"]: empData.gender,
        // ["joiningDate"]:
        //   candidateData !== undefined &&
        //   candidateData !== null &&
        //   Object.keys(candidateData).length !== 0 &&
        //   candidateData.workInformation !== undefined &&
        //   candidateData.workInformation !== null &&
        //   candidateData.workInformation.dateOfJoin !== null &&
        //   candidateData.workInformation.dateOfJoin !== undefined &&
        //   candidateData.workInformation.dateOfJoin !== ""
        //     ? new Date(candidateData.workInformation.dateOfJoin)
        //     : new Date(),
        ["joiningDate"]:moment().format("YYYY-MM-DD"),
          // candidateData !== undefined &&
          // candidateData !== null &&
          // Object.keys(candidateData).length !== 0 &&
          // candidateData.workInformation !== undefined &&
          // candidateData.workInformation !== null &&
          // candidateData.workInformation.dateOfJoin !== null &&
          // candidateData.workInformation.dateOfJoin !== undefined &&
          // candidateData.workInformation.dateOfJoin !== ""
          //   ? moment(candidateData.workInformation.dateOfJoin).format(
          //       "YYYY-MM-DD"
          //     )
          //   : 
        ["locationId"]: empData.locationId,
        ["lastName"]: empData.lastName,
        ["loginType"]: empData.loginType,
        ["managerId"]: empData.managerId,
        ["maritalStatus"]: empData.maritalStatus,
        ["nationality"]: empData.nationality,
        ["paymentType"]:
          empData.paymentType !== null ? empData.paymentType : "Bank",
        ["personalEmail"]: empData.personalEmail,
        ["phone"]: empData.phone,
        ["position"]: empData.position,
        ["firstName"]: empData.firstName,
        //After identity access need to be enabled
        // ["email"]: empData.email,
        // ["fedId"]: (empData.fedId !== null && 
        //   empData.fedId !== undefined && empData.fedId !== "")?empData.fedId.replace(/"/g, ''):'',
        ["role"]: empData.role,
        ["address"]: empData.address,
        ["isClusterManager"]: 0,
        ["aadhaarNumber"]: empData.aadhaarNumber,
        ["designation"]: empData.designation,
        ["aadhaarDoc"]: empData.aadhaarDoc,
        ["panDoc"]:empData.panDoc,
        ["photo"]:empData.photo
      });
     
    }
  }, [empData]);
  console.log("empData check",empData);

  // useEffect(() => {
  //   if (
  //     candidateData !== undefined &&
  //     candidateData.workInformation !== undefined &&
  //     candidateData.workInformation !== null
  //   ) {
  //     setEmployeeData({
  //       ...employeeData,
  //       ["joiningDate"]:
  //         candidateData !== undefined &&
  //         candidateData !== null &&
  //         Object.keys(candidateData).length !== 0 &&
  //         candidateData.workInformation !== undefined &&
  //         candidateData.workInformation !== null &&
  //         candidateData.workInformation.dateOfJoin !== null &&
  //         candidateData.workInformation.dateOfJoin !== undefined &&
  //         candidateData.workInformation.dateOfJoin !== ""
  //           ? new Date(candidateData.workInformation.dateOfJoin)
  //           : new Date(),
  //     });
  //   }
  // }, [candidateData]);

  const [employeeData, setEmployeeData] = useState(
    {
      active: "",
      additionalRole: "",
      address: "",
      bloodGroup: "",
      company: "",
      contractType: "",
      costCentre: "",
      department: "",
      dob: "",
      email: "",
      employeeId:
        onBoardData !== undefined && onBoardData !== null&& Object.keys(onBoardData).length
          ? onBoardData.employeeId
          : personalInfoData !== undefined &&personalInfoData!==null && Object.keys(personalInfoData).length
          ? personalInfoData.employeeId
          : "",
      employeeName: "",
      fatherName: "",
      fedId: "",
      firstName: "",
      gender: "",
      isClusterManager: 0,
      joiningDate: "",
      lastName: "",
      locationId: 0,
      loginType: "",
      managerId: "",
      maritalStatus: "",
      nationality: "",
      paymentType: "",
      personalEmail: "",
      phone: "",
      position: "",
      role: "",
      designation: "",
      aadhaarNumber: "",
    },
    []
  );

  // console.log("joining date", employeeData.joiningDate);
  const dateOfJoiningHandler = (date) => {
    setEmployeeData({
      ...employeeData,
      ["joiningDate"]: moment(date).format("YYYY-MM-DD"),
    });
  };

  const handleChange = (e) => {
    console.log("handleChange names", e.target.value);
    setError(false);
    setFedError(false);
    if (
      candidateData !== undefined &&
      candidateData.workInformation !== undefined &&
      candidateData.workInformation.contractType !== "Internship" &&
      e.target.name === "email"
    ) {
      if (!validateEmail(e.target.value)) {
        setError(true);
      } else {
        setEmployeeData({ ...employeeData, ["email"]: e.target.value });
      }
    }
    if (e.target.name === "fedId") {
      if (!alphaNumeric(e.target.value)) {
        setFedError(true);
      } else {
        setEmployeeData({ ...employeeData, ["fedId"]: e.target.value });
      }
    }

    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };
  const alphaNumeric = (fedId) => {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if (fedId.match(letterNumber)) {
      return true;
    } else {
      return false;
    }
  };

  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      if (
        // email.indexOf(
        //   "@decathlon.com",
        //   email.length - "@decathlon.com".length
        // ) !== -1
        email.includes("@decathlon.com")
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  const saveCostcenterData = (costCentersData) => {
    // setEmployeeData(empData);
    costCenterSplit(costCentersData);
    step6suscessStatus(true);
    // } else {
    //   setCostCenterError(true);
    // }
  };
  const generateAppointmentLetter = () => {
    console.log("candidateData id", candidateData);
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation
    ) {
      generateOfferLetter(candidateData.candidateInformation.candidateId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setViewLetter(true);
      setShowLetter(true);
    }
  };

  const handleClose = () => {
    setSubmitModal(false);
    history.push("/offer-release-list");
  };
  const previewAppointmentLetter = () => {
    console.log("candidateData id", candidateData);
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation
    ) {
      console.log("inside condition", candidateData);
      generateOfferLetter(candidateData.candidateInformation.candidateId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShowLetter(true);
    }
  };
  const submitAppointLetter = () => {
    console.log("inside submit", candidateData.candidateInformation);
    if (
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined
    ) {
      console.log(
        "offer Letter id",
        candidateData.candidateInformation.candidateId
      );
      setSubmitLetter(true);
      setLetterSent(true);
      setSubmitModal(true);
      finalSubmitAppointmentLetter(
        candidateData.candidateInformation.candidateId
      );
    }
  };

  const handleDataSave = () => {
    console.log("emdata", employeeData, moment().format("YYYY-MM-DD"));
    const costCenterData = {
      costCenterSplitId: 0,
      costCentreA: costCenterA,
      costCentreB: costCenterB,
      costCentreC: costCenterC,
      costCentreD: costCenterD,
      costCentreE: costCenterE,
      employeeId:
        onBoardData !== undefined && onBoardData !== null
          ? onBoardData.employeeId
          : personalInfoData !== undefined
          ? personalInfoData.employeeId
          : "",
      endMonthA: parseInt(moment(startMonth1End).format("MM")),
      endMonthB: parseInt(moment(endMonth2Date).format("MM")),
      endMonthC: parseInt(moment(endMonth3Date).format("MM")),
      endMonthD: parseInt(moment(endMonth4Date).format("MM")),
      endMonthE: parseInt(moment(endMonth5Date).format("MM")),
      endYearA: parseInt(moment(endYear1Date).format("YYYY")),
      endYearB: parseInt(moment(endYear2Date).format("YYYY")),
      endYearC: parseInt(moment(endYear3Date).format("YYYY")),
      endYearD: parseInt(moment(endYear4Date).format("YYYY")),
      endYearE: parseInt(moment(endYear5Date).format("YYYY")),
      startMonthA: parseInt(moment(startMonth1Date).format("MM")),
      startMonthB: parseInt(moment(startMonth2Date).format("MM")),
      startMonthC: parseInt(moment(startMonth3Date).format("MM")),
      startMonthD: parseInt(moment(startMonth4Date).format("MM")),
      startMonthE: parseInt(moment(startMonth5Date).format("MM")),
      startYearA: parseInt(moment(startYear1Date).format("YYYY")),
      startYearB: parseInt(moment(startYear2Date).format("YYYY")),
      startYearC: parseInt(moment(startYear3Date).format("YYYY")),
      startYearD: parseInt(moment(startYear4Date).format("YYYY")),
      startYearE: parseInt(moment(startYear5Date).format("YYYY")),
    };

    setCostCentersData(costCenterData);
    if (
      validateEmail(employeeData.email) &&
      //   alphaNumeric(employeeData.fedId) &&
      employeeData.role !== null &&
      employeeData.role !== "" &&
      employeeData.email !== null &&
      employeeData.email !== "" &&
      employeeData.fedId !== null &&
      employeeData.fedId !== "" &&
      employeeData.joiningDate !== null &&
      employeeData.joiningDate !== ""
    ) {
      console.log("inside if");
      const data ={
          "employeeId": employeeData.employeeId,
          "firstName": employeeData.firstName,
          "lastName": employeeData.lastName,
          "company": employeeData.company,
          "fatherName": employeeData.fatherName,
          "phone": employeeData.phone,
          "costCentre": employeeData.costCentre,
          "managerId": employeeData.managerId,
          "dob": employeeData.dob,
          "gender": employeeData.gender,
          "address": employeeData.address,
          "bloodGroup": employeeData.bloodGroup,
          "personalEmail": employeeData.personalEmail,
          "nationality": employeeData.nationality,
          "maritalStatus": employeeData.maritalStatus,
          "contractType": employeeData.contractType,
          "joiningDate": employeeData.joiningDate,
          "department": employeeData.department,
          "locationId": employeeData.locationId,
          "paymentType": employeeData.paymentType,
          "position": employeeData.position,
          "aadhaarNumber": employeeData.aadhaarNumber,
          "designation": employeeData.designation,
          "loginType": employeeData.loginType,
          "additionalRole": employeeData.additionalRole,
          "role": employeeData.role,
          "isClusterManager":employeeData.isClusterManager,
          "employeeName": employeeData.employeeName,
          "email": employeeData.email,
          "fedId": employeeData.fedId,
          "active": employeeData.active,
          "aadhaarDoc": employeeData.aadhaarDoc,
          "panDoc":employeeData.panDoc,
          "photo":employeeData.photo
      }
      console.log("createEmployee",data);
      createEmployee(data);
      saveCostcenterData(costCenterData);
      setError(false);
      setFedError(false);
      setMandatory(false);
      setJoiningError(false);
      setGenerateAppoint(true);
    } else {
      console.log("inside else");
      if (
        (candidateData !== undefined &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType !== "Internship" &&
          employeeData.email === "") ||
        employeeData.email === null ||
        !employeeData.email.includes("@decathlon.com")
      ) {
        setError(true);
      }
      if (employeeData.fedId === "" || employeeData.fedId === null) {
        setFedError(true);
      }
      if (
        employeeData.joiningDate === null ||
        employeeData.joiningDate === ""
      ) {
        setJoiningError(true);
      }

      // createEmployee(employeeData);
      // saveCostcenterData(costCenterData);
      setMandatory(true);
      setGenerateAppoint(false);
      // setCostCenterError(true);
    }
  };

  const handleDataSubmit = () => {
    submitAppointLetter();
  };

  const handleIncrement = (key) => {
    console.log(key);
    setClicked(true);
    if (count <= 5) {
      switch (key) {
        case 0:
          setCostCenter(true);
          setCount(count + 1);
          break;
        case 1:
          setCostCenter1(true);
          setCount(count + 1);
          break;
        case 2:
          setCostCenter2(true);
          setCount(count + 1);
          break;
        case 3:
          setCostCenter3(true);
          setCount(count + 1);
          break;
        case 4:
          setCostCenter4(true);
          setCount(count + 1);
          break;
        default:
          break;
      }
    }
  };
  const cancel = (num) => {
    if (count >= 0) {
      switch (num) {
        case 1:
          setCostCenter1(false);
          setCount(count - 1);
          return;
          break;
        case 2:
          setCostCenter2(false);
          setCount(count - 1);
          return;
          break;
        case 3:
          setCostCenter3(false);
          setCount(count - 1);
          return;
          break;
        case 4:
          setCostCenter4(false);
          setCount(count - 1);
          return;
          break;

        default:
          break;
      }
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      {lettterview ? (
        <div>
          {showLetter &&
          candidateData !== undefined &&
          candidateData.workInformation !== undefined ? (
            candidateData.workInformation.contractType === "Fulltime" ? (
              <AppointmentLetter />
            ) : candidateData.workInformation.contractType === "Parttime" ? (
              <PartTimeAppointmentLetter />
            ) : candidateData !== undefined &&
              candidateData.workInformation !== undefined &&
              candidateData.workInformation.contractType === "Local Expat" ? (
              <LocalExpatAppointmentLetter />
            ) : (
              <InternAppointmentLetter />
            )
          ) : (
            ""
          )}
        </div>
      ) : null}
      {/* 
      {previewLetter &&
      candidateData !== undefined &&
      candidateData.workInformation !== undefined ? (
        candidateData.workInformation.contractType === "Fulltime" ? (
          <AppointmentLetter previewLetter={previewLetter} />
        ) : candidateData.workInformation.contractType === "Parttime" ? (
          <PartTimeAppointmentLetter previewLetter={previewLetter} />
        ) : candidateData !== undefined &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType === "Local Expat" ? (
          <LocalExpatAppointmentLetter previewLetter={previewLetter} />
        ) : (
          <InternAppointmentLetter previewLetter={previewLetter} />
        )
      ) : (
        ""
      )} */}

      <Modal show={showSubmitModal} onHide={handleClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body>
            <div className="offer-letter-message ">
              {/* <p>Appointment Letter has been Sent to the Candidate</p> */}
              <p>
                Onboarding is completed and Employee Record has been created
              </p>
              <br></br>
              <Button type="button" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
      {employeeData !== null && employeeData !== undefined ? (
        <div className="px-5 mx-auto">
          <h5 style={{ fontWeight: 700 }}>Work Details</h5>
          {/* <Row className="mt-4">
            <Col sm={3}>Candidate date of joining</Col>
            <Col sm={6}>
              {candidateData !== undefined &&
              candidateData.workInformation !== undefined
                ? moment(candidateData.workInformation.dateOfJoin).format(
                    "YYYY-MM-DD"
                  )
                : ""}
            </Col>
          </Row> */}

          <Row className="mt-4">
            <Col sm={3}>
              <Form.Label> Candidate date of joining</Form.Label>
            </Col>
            <Col sm={6}>
              <DatePicker
                className="joiningField"
                selected={
                  employeeData !== undefined &&
                  employeeData !== null &&
                  employeeData.joiningDate !== undefined &&
                  employeeData.joiningDate !== null &&
                  employeeData.joiningDate !== ""
                    ? moment(employeeData.joiningDate).toDate()
                    :
                     new Date()
                }
                required
                onChange={(e) => dateOfJoiningHandler(e)}
                // minDate={subDays(new Date(employeeData.joiningDate), 7)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Date of Joining"
              />
              {joiningError === true && (
                <span style={{ color: "red" }}>Please enter a valid date</span>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              <Form.Label>Offical Email ID</Form.Label>
            </Col>
            <Col sm={6}>
              <Form.Control
                style={{ borderColor: "#006ebb" }}
                type="text"
                name="email"
                value={
                  employeeData !== undefined && employeeData !== null
                    ? employeeData.email
                    : ""
                }
                onChange={(e) => handleChange(e)}
              />
              {emailError === true && (
                <span style={{ color: "red" }}>Please enter a valid email</span>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              <Form.Label>FED ID</Form.Label>
            </Col>
            <Col sm={6}>
              <Form.Control
                style={{ borderColor: "#006ebb" }}
                type="text"
                name="fedId"
                value={
                  employeeData !== undefined && employeeData !== null
                    ? employeeData.fedId
                    : ""
                }
                onChange={(e) => handleChange(e)}
              />
              {fedError === true && (
                <p style={{ color: "red" }}>Please enter valid FedId</p>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={3}>
              <Form.Label>System role</Form.Label>
            </Col>
            <Col sm={6}>
              <Form.Control
                as="select"
                name="role"
                value={employeeData.role}
                onChange={(e) => handleChange(e)}
                style={{ borderColor: "#006ebb" }}
              >
                <option value="">Select Role</option>
                {RoleList !== null &&
                  RoleList !== undefined &&
                  RoleList.map((item, i) => {
                    if (
                      // item.roleName !== "ADMIN" &&
                      // item.roleName !== "IT_ADMIN"
                      (rolePermission == "manager" && item.roleName == "GENERAL_USER")|| ((fetchemployeeData.department.includes("finance")||fetchemployeeData.department.includes("Finance")) && 
                       item.roleName == "FINANCE_PARTNER")
                    ) {
                      return (
                        <option key={i} value={item.roleId}>
                          {item.roleDesc}
                        </option>
                      );
                    }else if (
                      rolePermission == "costCenterManager" &&(
                       item.roleName == "MANAGER" ||
                       item.roleName == "GENERAL_USER")|| ((fetchemployeeData.department.includes("finance")||fetchemployeeData.department.includes("Finance")) && 
                       item.roleName == "FINANCE_PARTNER")){
                      return (
                        <option key={i} value={item.roleId}>
                          {item.roleDesc}
                        </option>
                      );
                    }else if (
                      rolePermission == "superCostCenterManager" &&(
                       item.roleName == "MANAGER" ||
                       item.roleName == "COST_CENTER_MANAGER" ||
                       item.roleName == "GENERAL_USER")|| ((fetchemployeeData.department.includes("finance")||fetchemployeeData.department.includes("Finance")) && 
                       item.roleName == "FINANCE_PARTNER")
                    ) {
                      return (
                        <option key={i} value={item.roleId}>
                          {item.roleDesc}
                        </option>
                      );
                    }
                  })}
              </Form.Control>
            </Col>
          </Row>
          {mandatory === true && (
            <span style={{ color: "red" }}>
              Please Enter all Details and make sure Appointment Letter
              Generated
            </span>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="px-5 mx-auto mt-4">
        <h5 style={{ fontWeight: 700 }}>Remuneration Details</h5>
        <Row className="mt-4">
          <Col sm={4}>
            <label className="mr-3">Candidate ID:</label>
            <label>
              {candidateData.candidateInformation !== undefined &&
              candidateData.candidateInformation !== null
                ? candidateData.candidateInformation.candidateId
                : ""}
            </label>
          </Col>
          <Col sm={4}>
            <label className="mr-3">Candidate Name:</label>
            <label>
              {candidateData.candidateInformation !== undefined &&
              candidateData.candidateInformation !== null
                ? candidateData.candidateInformation.firstName +
                  " " +
                  candidateData.candidateInformation.lastName
                : ""}
            </label>
          </Col>
          {/* <Col sm={4}>
            <label className="mr-3">Application Date:</label>
            <label>
              {candidateData.candidateInformation !== undefined &&
              candidateData.candidateInformation !== null
                ? candidateData.candidateInformation.createdDate
                : ""}
            </label>
          </Col> */}
        </Row>
        {candidateData !== undefined &&
        candidateData.workInformation !== undefined &&
        candidateData.workInformation.contractType !== "Internship" ? (
          <Row>
            <Col sm={4}>
              {candidateData.workInformation.contractType === "Parttime" ? (
                <label className="mr-3">Fixed Gross (Hourly) :</label>
              ) : (
                <label className="mr-3">Fixed Gross :</label>
              )}
              <label>
                {candidateData.remuneration !== undefined &&
                candidateData.remuneration !== null ? (
                  <p>{candidateData.remuneration.fixedGross}</p>
                ) : (
                  <p>N/A</p>
                )}
              </label>
            </Col>
            <Col sm={4}>
              <label className="mr-3">Bonus (in %):</label>
              <label>
                {candidateData.remuneration !== undefined &&
                candidateData.remuneration !== null ? (
                  <p>{candidateData.remuneration.monthlyBonus}</p>
                ) : (
                  <p>N/A</p>
                )}
              </label>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col sm={4}>
              <label className="mr-3">Stipend:</label>
              <label>
                {candidateData.remuneration !== undefined &&
                candidateData.remuneration !== null ? (
                  <p>{candidateData.remuneration.stipend}</p>
                ) : (
                  <p>N/A</p>
                )}
              </label>
            </Col>
          </Row>
        )}
      </div>
      {/* <div className="px-5  mt-4">
        <h5 style={{ fontWeight: 700 }}>Cost Center Split</h5>
        {costCenter === true && (
          <Row className="mt-4">
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="costCentreA"
                  className="form-input"
                  value={costCenterA}
                  onChange={(e) => setCostCenterA(e.target.value)}
                  placeholder="costCenter1"
                >
                  <option value="">Cost Center1</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                name="startMonthA"
                style={{ width: "20%" }}
                selected={startMonth1Date}
                onChange={(date) => setStartMonth1Date(date)}
                placeholderText="Select Start Month"
                dateFormat="MM"
                minDate={subMonths(new Date(), 1)}
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear1Date}
                onChange={(date) => setStartYear1Date(date)}
                placeholderText="Select Start Year"
                dateFormat="yyyy"
                showYearPicker
                showTwoColumnMonthYearPicker
                minDate={subYears(new Date(), 1)}
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth1End}
                onChange={(date) => setStartMonth1EndDate(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
                minDate={subMonths(new Date(), 1)}
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear1Date}
                onChange={(date) => setEndYear1Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
                showTwoColumnMonthYearPicker
                minDate={subYears(new Date(), 1)}
              />{" "}
            </Col>
          </Row>
        )}
        {costCenter1 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterB}
                  onChange={(e) => setCostCenterB(e.target.value)}
                >
                  <option value="">Cost Center2</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth2Date}
                onChange={(date) => setStartMonth2Date(date)}
                placeholderText="Select Start Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear2Date}
                onChange={(date) => setStartYear2Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth2Date}
                onChange={(date) => setEndMonth2Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear2Date}
                onChange={(date) => setEndyear2Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div style={{ marginLeft: "100px" }}>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(1)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        {costCenter2 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterC}
                  onChange={(e) => setCostCenterC(e.target.value)}
                >
                  <option value="">Cost Center3</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth3Date}
                onChange={(date) => setStartMonth3Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear3Date}
                onChange={(date) => setStartYear3Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth3Date}
                onChange={(date) => setEndMonth3Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear3Date}
                onChange={(date) => setEndYear3Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div style={{ marginLeft: "100px" }}>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(2)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        {costCenter3 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterD}
                  onChange={(e) => setCostCenterD(e.target.value)}
                >
                  <option value="">Cost Center4</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth4Date}
                onChange={(date) => setStartMonth4Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear4Date}
                onChange={(date) => setStartYear4Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth4Date}
                onChange={(date) => setEndMonth4Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear4Date}
                onChange={(date) => setEndYear4Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div style={{ marginLeft: "100px" }}>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(3)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        {costCenter4 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterE}
                  onChange={(e) => setCostCenterE(e.target.value)}
                >
                  <option value="">Cost Center5</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth5Date}
                onChange={(date) => setStartMonth5Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear5Date}
                onChange={(date) => setStartYear5Date(date)}
                placeholderText="Select Start Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth5Date}
                onChange={(date) => setEndMonth5Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear5Date}
                onChange={(date) => setEndYear5Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div style={{ marginLeft: "100px" }}>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(4)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
            {costCenterError === true && (
              <p style={{ color: "red" }}>
                Please select atleast one cost Center
              </p>
            )}
          </Row>
        )}
        {costCenterError === true && (
          <p style={{ color: "red" }}>Please select atleast one cost Center</p>
        )}
        <div className="text-right addButtonWrapper float-right">
          <button
            className="addButtonField  button"
            onClick={() => {
              handleIncrement(count);
            }}
            disabled={false}
            style={{ width: "160px" }}
          >
            <b> Add + </b>
          </button>
        </div>
        <Row className="mt-5">
            <Col sm={3}></Col>
            <Col sm={4} className="text-center">
              <Button className="px-5">Save</Button>
            </Col>
          </Row>
      </div> */}
      {!previewLetter && generateAppoint === false && (
        <Row className="text-center mt-4">
          <Button
            type="button"
            className="px-5 mb-4 previewButton"
            onClick={handleDataSave}
          >
            Save
          </Button>
        </Row>
      )}
      {generateAppoint === true ? (
        <div className="px-5 mx-auto mt-5">
          <h5 style={{ fontWeight: 700 }}>GENERATE APPOINTMENT LETTER</h5>
          <Row className="text-center mt-4">
            <Button
              type="button"
              className="px-5 mb-4 previewButton"
              onClick={() => generateAppointmentLetter()}
            >
              Generate Appointment Letter
            </Button>
          </Row>
        </div>
      ) : (
        ""
      )}
      {/* {previewLetter === true && letterSent === false && (
        <div className="preview-section">
          <Button
            type="button"
            onClick={handleDataSubmit}
            style={{ textAlign: "center" }}
          >
            Save & Submit
          </Button>
        </div>
      )} */}
      {/* <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <button className="stepperButtons" onClick={() => handleDataSave()}>
          Save
        </button>
      </div> */}
    </Fragment>
  );
};
export default CandidateOnboarding;
