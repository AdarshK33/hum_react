import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { OfferContext } from "../../../context/OfferState";
import { SeparationContext } from "../../../context/SepearationState";
import { Link } from "react-router-dom";
import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import { PromotionContext } from "../../../context/PromotionState";
import { PermissionContext } from "../../../context/PermissionState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { AppContext } from "../../../context/AppState";
import calendarImage from "../../../assets/images/calendar-image.png";
import PromotionLetters from "../PromotionLetter";
import PromotionSalaryLetters from "../PromotionSalaryLetter";

const PromotionInitiate = () => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState("");
  const [departmentNew, setDepartmentNew] = useState();
  const [contractType, setContractType] = useState("");
  const [currentManager, SetCurrentManager] = useState("");
  const [contractTypeStatus, setContractTypeStatus] = useState(false);

  const [state, setState] = useState({
    validatedAdminId: "",
    validatedAdminName: "",
    validatedManagerId: "",
    validatedManagerName: "",
    bonus: 0,
    bonusInPercentage: 0,
    company: "",
    costCentre: "",
    costCentreManagerEmail: "",
    costCentreManagerId: "",
    costCentreManagerName: "",
    departmentId: "",
    reportingManagerId: "",
    reportingManagerName: "",
    effectiveDate: null,
    emailId: "",
    empName: "",
    employeeId: "",
    currentManagerId: "",
    currentManagerName: "",
    contractType: "",
    newDepartment: "",
    newFixedGross: 0,
    oldDepartment: "",
    oldFixedGross: 0,
    oldPosition: "",
    positionId: "",
    promotedPosition: "",
    promotionId: 0,
    promotionLetter: "",
    promotionType: 0,
    reason: "",
    relocationBonus: 0,
    remarks: "",
    salaryEffectiveDate: null,
    status: 0,
  });
  const [empNameError, setEmpNameError] = useState("");
  const [departmentIdError, setDepartmentIdError] = useState("");
  const [positionIdError, setPositionIdError] = useState("");
  const [newFixedGrossError, setNewFixedGrossError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [salaryEffectiveDateError, setSalaryEffectiveDateError] = useState("");
  const [promotionTypeError, setPromotionTypeError] = useState("");
  const [effectiveDateError, setEffectiveDateError] = useState("");
  const [reportingManagerError, setReportingManagerError] = useState("");
  const [modelStatus, setModelStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AppContext);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [showRelivingModal, setShow] = useState(false);
  const {
    employeeData,
    ViewEmployeeProfile,
    employeeProfileData,
    ViewEmployeeDataById,
    fetchRelievingLetterData,
    relivingLetterData,
  } = useContext(EmployeeSeparationContext);
  const {
    empResign,
    withdraw,
    promotioManagerList,
    searchByCostCenter,
    promotionManagerData,
    searchByCostData,
  } = useContext(SeparationContext);
  const { departmentView, departmentName } = useContext(OfferContext);
  const {
    PositionNew,
    positionNew,
    PromotionCreate,
    promotionIdData,
    generatePromotionLetter,
    createdPromotion,
  } = useContext(PromotionContext);
  useEffect(() => {
    if (createdPromotion) {
      setModelStatus(true);
    } else {
      setModelStatus(false);
    }
  }, [createdPromotion]);
  useEffect(() => {
    departmentView();
  }, []);
  useEffect(() => {
    if (
      state.departmentId !== "" &&
      state.departmentId !== null &&
      state.departmentId !== undefined
    ) {
      PositionNew(state.departmentId);
    }
  }, [departmentNew]);

  useEffect(() => {
    ViewEmployeeProfile();
  }, []);
  useEffect(() => {
    if (
      state.costCentre !== "" &&
      state.costCentre !== null &&
      state.costCentre !== undefined &&
      departmentNew !== null &&
      departmentNew !== undefined &&
      departmentNew !== ""
    ) {
      promotionManagerData(state.costCentre, departmentNew);
    }
  }, [departmentNew]);
  useEffect(() => {
    console.log("state.empI", state.employeeId);
    if (
      state.employeeId !== "" &&
      state.employeeId !== null &&
      state.employeeId !== undefined
    ) {
      console.log("state.employeeId", state.employeeId);
      ViewEmployeeDataById(state.employeeId);
    }
  }, [EmpName]);

  useEffect(() => {
    if (
      searchByCostData &&
      searchByCostData &&
      searchByCostData !== null &&
      searchByCostData !== undefined &&
      Object.keys(searchByCostData).length !== 0
    ) {
      console.log(searchByCostData, "searchByCostData");
      const temp =
        searchByCostData.lastName !== null &&
        searchByCostData.lastName !== undefined
          ? searchByCostData.lastName
          : "";
      state.employeeId = searchByCostData.employeeId;
      state.company = searchByCostData.company;
      state.empName = searchByCostData.firstName + " " + temp;
      setEmpName(searchByCostData.firstName + " " + temp);
      state.contractType = searchByCostData.contractType;
      setContractType(searchByCostData.contractType);
      state.costCentre = searchByCostData.costCentre;
      state.oldPosition = searchByCostData.position;
      state.oldDepartment = searchByCostData.department;
      state.currentManagerId = searchByCostData.managerId;
      state.oldFixedGross = searchByCostData.fixedGross;
      if (
        searchByCostData.contractType === "internship" ||
        searchByCostData.contractType === "Internship"
      ) {
        setContractTypeStatus(true);
      }
    }
  }, [searchByCostData]);

  useEffect(() => {
    if (
      searchByCostData &&
      searchByCostData &&
      searchByCostData !== null &&
      searchByCostData !== undefined &&
      Object.keys(searchByCostData).length !== 0 &&
      promotioManagerList &&
      promotioManagerList &&
      promotioManagerList !== null &&
      promotioManagerList !== undefined &&
      Object.keys(promotioManagerList).length !== 0
    ) {
      promotioManagerList.map((item) => {
        if (item.employeeId == searchByCostData.managerId) {
          const temp =
            item.lastName !== null && item.lastName !== undefined
              ? item.lastName
              : "";
          state.currentManagerName = item.firstName + " " + temp;
          SetCurrentManager(item.firstName + " " + temp);
        }
      });
    }
  }, [promotioManagerList, searchByCostData]);

  const submitHandler = (e) => {
    e.preventDefault();
    var empName = state.empName;
    if (empName == "" || empName == null || empName == undefined) {
      setEmpNameError("Select choose the employee name");
    } else {
      setEmpNameError("");
    }

    var departmentId = state.departmentId;
    if (
      departmentId == "" ||
      departmentId == null ||
      departmentId == undefined
    ) {
      setDepartmentIdError("Please select the department");
      console.log(departmentIdError);
    } else {
      setDepartmentIdError("");
    }
    var positionId = state.positionId;

    if (positionId === "" || positionId === null || positionId === undefined) {
      setPositionIdError(" Please select the position ");
      console.log(positionIdError, positionId);
    } else {
      setPositionIdError("");
    }

    var newFixedGross = state.newFixedGross;
    if (
      newFixedGross !== "" &&
      contractType !== null &&
      contractType !== undefined &&
      newFixedGross !== null &&
      newFixedGross !== undefined
    ) {
      if (contractType === "Parttime" || contractType === "parttime") {
        if (newFixedGross < 90 || newFixedGross > 400) {
          setNewFixedGrossError("Value should be between 90 - 400");
        } else {
          setNewFixedGrossError("");
        }
      } else if (contractType === "Permanent" || contractType === "permanent") {
        if (newFixedGross < 18000) {
          setNewFixedGrossError("Value should be above 18000");
        } else {
          setNewFixedGrossError("");
        }
      }
    } else {
      setNewFixedGrossError(" Please add new fixed gross");
    }
    var newDepartment = state.newDepartment;
    if (
      newDepartment == "" ||
      newDepartment == null ||
      newDepartment == undefined
    ) {
      setDepartmentIdError("Please select the department");
      console.log(departmentIdError);
    } else {
      setDepartmentIdError("");
    }

    var reason = state.reason;
    if (reason == "" || reason == null || reason == undefined) {
      setReasonError("Please add reason for promotion");
    } else {
      setReasonError("");
    }

    var reportingManagerName = state.reportingManagerName;
    if (
      reportingManagerName == "" ||
      reportingManagerName == null ||
      reportingManagerName == undefined
    ) {
      setReportingManagerError("Please select reporting manager ");
    } else {
      setReportingManagerError("");
    }
    var effectiveDate = state.effectiveDate;
    if (
      (state.promotionType == 1 && effectiveDate == "") ||
      effectiveDate == null ||
      effectiveDate == undefined
    ) {
      setEffectiveDateError("Please add promotion effective date");
    } else {
      setEffectiveDateError("");
    }
    // var salaryEffectiveDate = state.salaryEffectiveDate;
    // if (
    //   (state.promotionType == 1 && salaryEffectiveDate == "") ||
    //   salaryEffectiveDate == null ||
    //   salaryEffectiveDate == undefined
    // ) {
    //   setSalaryEffectiveDateError("Please add salary effective date");
    // } else {
    //   setSalaryEffectiveDateError("");
    // }

    console.log(newFixedGrossError, "newFixedGrossError");
    if (
      newDepartment !== "" &&
      reason !== "" &&
      newFixedGross !== "" &&
      positionId !== "" &&
      departmentId !== "" &&
      empName !== "" &&
      newDepartment !== null &&
      reason !== null &&
      newFixedGross !== null &&
      positionId !== null &&
      departmentId !== null &&
      empName !== null &&
      newDepartment !== undefined &&
      reason !== undefined &&
      newFixedGross !== undefined &&
      positionId !== undefined &&
      departmentId !== undefined &&
      empName !== undefined
    ) {
      const infoData = {
        validatedAdminId: null,
        validatedAdminName: null,
        validatedManagerId: null,
        validatedManagerName: null,
        bonus: 0,
        bonusInPercentage: 0,
        costCentre: state.costCentre,
        costCentreManagerEmail: null,
        costCentreManagerId: null,
        costCentreManagerName: null,
        departmentId: state.departmentId,
        reportingManagerId: state.reportingManagerId,
        reportingManagerName: state.reportingManagerName,
        effectiveDate: state.effectiveDate,
        emailId: null,
        empName: state.empName,
        employeeId: state.employeeId,
        currentManagerId: state.currentManagerId,
        currentManagerName: state.currentManagerName,
        contractType: state.contractType,
        newDepartment: state.newDepartment,
        newFixedGross: state.newFixedGross,
        oldDepartment: state.oldDepartment,
        oldFixedGross: state.oldFixedGross,
        oldPosition: state.oldPosition,
        positionId: state.positionId,
        promotedPosition: state.promotedPosition,
        promotionId: 0,
        promotionLetter: null,
        promotionType: state.promotionType,
        reason: state.reason,
        relocationBonus: state.relocationBonus,
        remarks: null,
        salaryEffectiveDate: state.salaryEffectiveDate,
        status: 0,
      };
      if (
        contractType.toLowerCase() == "parttime" &&
        state.newFixedGross >= 90 &&
        state.newFixedGross <= 400
      ) {
        // setModelStatus(true);
        setSubmitted(true);
        if (
          user !== null &&
          user !== undefined &&
          (user.loginType == 7 || user.additionalRole === "7")
        ) {
          PromotionCreate(infoData, 2);
        } else if (
          user !== null &&
          user !== undefined &&
          (user.additionalRole === "1" || user.loginType == "1")
        ) {
          PromotionCreate(infoData, 1);
          setPreview(true);
        } else {
          PromotionCreate(infoData);
        }
        console.log("all okay1", infoData);
      } else if (
        contractType.toLowerCase() == "permanent" &&
        state.newFixedGross > 18000
      ) {
        // setModelStatus(true);
        setSubmitted(true);
        if (
          user !== null &&
          user !== undefined &&
          (user.loginType == 7 || user.additionalRole === "7")
        ) {
          PromotionCreate(infoData, 2);
        } else if (
          user !== null &&
          user !== undefined &&
          (user.additionalRole === "1" || user.loginType == "1")
        ) {
          PromotionCreate(infoData, 1);
          setPreview(true);
        } else {
          PromotionCreate(infoData);
        }
        console.log("all okay2", infoData);
      } else if (
        state.promotionType == 0 &&
        (contractType.toLowerCase() == "parttime" ||
          contractType.toLowerCase() == "permanent")
      ) {
        // setModelStatus(true);
        setSubmitted(true);
        if (
          user !== null &&
          user !== undefined &&
          (user.loginType == 7 || user.additionalRole === "7")
        ) {
          PromotionCreate(infoData, 2);
        } else if (
          user !== null &&
          user !== undefined &&
          (user.additionalRole === "1" || user.loginType == "1")
        ) {
          PromotionCreate(infoData, 1);
          setPreview(true);
        } else {
          PromotionCreate(infoData);
        }
        console.log("all okay3", infoData);
      } else {
        console.log("NOT OK", infoData);
      }
    } else {
      console.log("NOT OK", empName);
      // toast.error("Data is not filled Properly")
    }
  };
  console.log(promotioManagerList, "promotioManagerList");
  const handleCloseValue = () => {
    setModelStatus(false);
    setContractTypeStatus(false);
  };
  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setState({ ...state, effectiveDate: AdjusteddateValue });
  };
  const dateOfBirthHandler1 = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setState({ ...state, salaryEffectiveDate: AdjusteddateValue });
  };
  const searchDataHandler = () => {
    if (EmpName !== null) {
      searchByCostCenter(EmpName);
      if (
        employeeData &&
        employeeData &&
        employeeData !== null &&
        employeeData !== undefined &&
        Object.keys(employeeData).length !== 0
      ) {
        employeeData.employeeId = 0;
      }
    }
  };
  const handlePromotionTypeYes = (e) => {
    if (e.target.value === "yes") {
      if (state.promotionType == 0) {
        setState({ ...state, promotionType: 1 });
      } else {
        setState({
          ...state,
          promotionType: 0,
          salaryEffectiveDate: null,
          newFixedGross: 0,
        });
      }
    }
  };
  const handlePromotionTypeNo = (e) => {
    if (e.target.value === "no") {
      if (state.promotionType == 0) {
        setState({ ...state, promotionType: 1 });
      } else {
        setState({
          ...state,
          promotionType: 0,
          salaryEffectiveDate: null,
          newFixedGross: 0,
        });
      }
    }
  };
  const changeHandler = (e) => {
    let valid = /[^A-Za-z0-9'.,-_ ]/;
    if (e.target.name === "empName") {
      setEmpName(e.target.value);
      setState({
        ...state,
        empName: e.target.value,
      });
    } else if (e.target.name === "departmentId") {
      let value = departmentName.filter(
        (item) => item.departmentName === e.target.value
      );
      console.log(e.target.value, value, state, "department1");
      setDepartmentNew(e.target.value);
      setState({
        ...state,
        newDepartment: value[0].departmentName,
        departmentId: value[0].deptId,
      });
      console.log(e.target.value, value, state, "department2");
    } else if (e.target.name === "positionId") {
      positionNew.map((item) => {
        if (item.position === e.target.value) {
          setPosition(e.target.value);
          setState({
            ...state,
            positionId: item.positionId,
            promotedPosition: item.position,
          });
        }
      });
      console.log(e.target.value, state, "value666");
    } else if (e.target.name === "reportingManagerId") {
      promotioManagerList.map((item) => {
        const temp =
          item.lastName !== null && item.lastName !== undefined
            ? item.lastName
            : "";
        if (item.firstName + " " + temp === e.target.value) {
          setState({
            ...state,
            reportingManagerId: item.employeeId,
            reportingManagerName: item.firstName + " " + temp,
          });
        }
      });
      console.log(e.target.value, state, "value666");
    } else {
      if (e.target.name === "reason" && e.target.value !== "") {
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
    }

    console.log(state, "state");
  };
  const submitfinalRelivingLetter = (e) => {
    e.preventDefault();
    if (
      promotionIdData !== null &&
      promotionIdData !== undefined &&
      Object.keys(promotionIdData).length !== 0
    ) {
      const infoData = {
        adminValidatedDate: promotionIdData["adminValidatedDate"],
        validatedAdminId: promotionIdData["validatedAdminId"],
        validatedAdminName: promotionIdData["validatedAdminName"],
        managerValidatedDate: promotionIdData["managerValidatedDate"],
        validatedManagerId: promotionIdData["validatedManagerId"],
        validatedManagerName: promotionIdData["validatedManagerName"],
        bonus: promotionIdData["bonus"],
        bonusInPercentage: promotionIdData["bonusInPercentage"],
        costCentre: promotionIdData["costCentre"],
        costCentreManagerEmail: promotionIdData["costCentreManagerEmail"],
        costCentreManagerId: promotionIdData["costCentreManagerId"],
        costCentreManagerName: promotionIdData["costCentreManagerName"],
        departmentId: promotionIdData["departmentId"],
        reportingManagerId: promotionIdData["reportingManagerId"],
        reportingManagerName: promotionIdData["reportingManagerName"],
        effectiveDate: state.effectiveDate,
        emailId: null,
        empName: state.empName,
        employeeId: state.employeeId,
        currentManagerId: promotionIdData["currentManagerId"],
        currentManagerName: promotionIdData["currentManagerName"],
        contractType: promotionIdData["contractType"],
        newDepartment: state.newDepartment,
        newFixedGross: state.newFixedGross,
        oldDepartment: state.oldDepartment,
        oldFixedGross: state.oldFixedGross,
        oldPosition: state.oldPosition,
        positionId: state.positionId,
        promotedPosition: state.promotedPosition,
        promotionId: promotionIdData["promotionId"],
        promotionLetter: null,
        reason: state.reason,
        relocationBonus: state.relocationBonus,
        salaryEffectiveDate: state.salaryEffectiveDate,
        promotionType: state.promotionType,
        remarks: promotionIdData["remarks"],
        status: 3,
      };
      PromotionCreate(infoData);
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      // setSuccessModal(true);
      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };
  const previewLetterViewing = (e) => {
    e.preventDefault();
    if (promotionIdData !== null && promotionIdData !== undefined) {
      // fetchRelievingLetterData(employeeData.employeeId);
      generatePromotionLetter(promotionIdData.promotionId);

      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const generateLetterClick = (e) => {
    e.preventDefault();
    if (
      promotionIdData !== null &&
      promotionIdData !== undefined &&
      Object.keys(promotionIdData).length !== 0
    ) {
      generatePromotionLetter(promotionIdData.promotionId);
      handleShow();
      setPreviewGeneratedLetter(true);
    } else {
      console.log("promotionIdData->", promotionIdData);
    }
  };

  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };
  const handleRelivingClose = () => setShow(false);
  const digitalSignature = () => {
    setShowSignature(true);
  };
  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  return (
    <Fragment>
      <ToastContainer />

      <Modal show={showRelivingModal} onHide={handleRelivingClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body className="mx-auto">
            <label>Promotion Letter has been sent to the employee</label>
            <div className="text-center mb-2">
              <Link to={"/promotion-list"}>
                <Button onClick={handleRelivingClose}>Close</Button>
              </Link>
            </div>
          </Modal.Body>
        ) : previewLetter || showRelivingModal ? (
          <Modal.Body>
            {true ? (
              <div>
                {promotionIdData.promotionType === 0 ? (
                  <PromotionLetters />
                ) : promotionIdData.promotionType === 1 ? (
                  <PromotionSalaryLetters />
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
      <Modal
        show={contractTypeStatus}
        onHide={handleCloseValue}
        size="md"
        centered
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label className="text-center">
            This employee cannot be promoted.
          </label>
          <div className="text-center mb-2">
            <Link to={"/promotion-list"}>
              <Button onClick={handleCloseValue}>Close</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={modelStatus} onHide={handleCloseValue} size="md" centered>
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label className="text-center">
            {user !== null &&
            user !== undefined &&
            Object.keys(user).length !== 0 &&
            (user.loginType == 7 || user.additionalRole === "7")
              ? "Your request has been sent to admin."
              : user !== null &&
                user !== undefined &&
                Object.keys(user).length !== 0 &&
                (user.additionalRole === "1" || user.loginType == "1")
              ? "Your request has been saved successfully."
              : "Your request has been sent to cost center manager."}
          </label>
          <div className="text-center mb-2">
            {user !== null &&
            user !== undefined &&
            Object.keys(user).length !== 0 &&
            (user.additionalRole === "1" || user.loginType == "1") ? (
              <Button onClick={handleCloseValue}>Close</Button>
            ) : (
              <Link to={"/promotion-list"}>
                <Button onClick={handleCloseValue}>Close</Button>
              </Link>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Breadcrumb title="PROMOTION INTIATION" parent="PROMOTION INTIATION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>PROMOTION INTIATION </b>
                </div>
                <Form>
                  <Container>
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
                              <label>Emp Name/Id:</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <div>
                              {false ? (
                                <label>
                                  {" "}
                                  &nbsp;&nbsp; {} &nbsp;{state.employeeId}
                                </label>
                              ) : (
                                <Form.Group>
                                  <div className="faq-form ">
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="empName"
                                      // disabled={disabled}
                                      value={EmpName}
                                      style={
                                        empNameError
                                          ? { borderColor: "red" }
                                          : { borderRadius: "5px" }
                                      }
                                      placeholder="Search.."
                                      onChange={(e) => changeHandler(e)}
                                      required
                                    />
                                    <Search
                                      className="search-icon"
                                      style={{ color: "#313131" }}
                                      onClick={searchDataHandler}
                                    />
                                  </div>
                                  {empNameError ? (
                                    <p style={{ color: "red" }}>
                                      {empNameError}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>
                              )}
                            </div>
                          </Col>

                          <Col sm={6}>
                            <label>Employee Id:</label>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.employeeId}
                            </label>
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
                              <label>Cost Center Name:</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.costCentre}
                            </label>
                          </Col>

                          <Col sm={6}>
                            <label>Department:</label>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldDepartment}
                            </label>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "2rem",
                          }}
                        >
                          <Col sm={6}>
                            <label>Position:</label>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldPosition}
                            </label>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <Col sm={2}>
                            <label>New Department </label>
                          </Col>
                          <Col sm={8}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="departmentId"
                                style={
                                  departmentIdError
                                    ? { borderColor: "red" }
                                    : { borderRadius: "5px" }
                                }
                                defaultValue={departmentNew}
                                onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Department</option>
                                {departmentName !== null &&
                                  departmentName !== undefined &&
                                  departmentName.length > 0 &&
                                  departmentName.map((item, index) => {
                                    return (
                                      <option key={index + 1}>
                                        {item.departmentName}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {departmentIdError ? (
                                <p style={{ color: "red" }}>
                                  {departmentIdError}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <Col sm={2}>
                            <label>New Position </label>
                          </Col>
                          <Col sm={8}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="positionId"
                                defaultValue={position}
                                style={
                                  positionIdError
                                    ? { borderColor: "red" }
                                    : { borderRadius: "5px" }
                                }
                                onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Position</option>
                                {positionNew !== null &&
                                  positionNew !== undefined &&
                                  positionNew.length > 0 &&
                                  positionNew.map((item, index) => {
                                    return (
                                      <option key={index + 1}>
                                        {item.position}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {positionIdError ? (
                                <p style={{ color: "red" }}>
                                  {positionIdError}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
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
                                {" "}
                                Current Manager :
                                <label className="itemResult">
                                  &nbsp;&nbsp;{currentManager}
                                </label>
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <label>Reporting Manager </label>
                          </Col>
                          <Col sm={4}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="reportingManagerId"
                                style={
                                  departmentIdError
                                    ? { borderColor: "red" }
                                    : { borderRadius: "5px" }
                                }
                                defaultValue={departmentNew}
                                onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Manager</option>
                                {promotioManagerList !== null &&
                                  promotioManagerList !== undefined &&
                                  promotioManagerList.length > 0 &&
                                  promotioManagerList.map((item, index) => {
                                    const temp =
                                      item.lastName !== null &&
                                      item.lastName !== undefined
                                        ? item.lastName
                                        : "";
                                    return (
                                      <option key={index + 1}>
                                        {item.firstName + " " + temp}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {reportingManagerError ? (
                                <p style={{ color: "red" }}>
                                  {reportingManagerError}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={5}>
                            <label>
                              Is this employee is applicable for salary hike{" "}
                            </label>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  checked={state.promotionType ? true : false}
                                  style={
                                    promotionTypeError
                                      ? { borderColor: "red" }
                                      : { borderColor: "blue" }
                                  }
                                  // required={required}
                                  onChange={handlePromotionTypeYes}
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
                                  checked={!state.promotionType ? true : false}
                                  style={
                                    promotionTypeError
                                      ? { borderColor: "red" }
                                      : { borderColor: "blue" }
                                  }
                                  // required={required}
                                  onChange={handlePromotionTypeNo}
                                />
                                <label className="itemResult">No</label>
                              </div>
                            </Form.Group>
                          </Col>
                          {promotionTypeError ? (
                            <p style={{ color: "red" }}>{promotionTypeError}</p>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={1}>
                            <div>
                              <label>
                                Fixed Gross
                                {`${
                                  contractType == "parttime" ||
                                  contractType == "Parttime"
                                    ? "(per/hr)"
                                    : ""
                                }`}
                                :
                              </label>
                            </div>
                          </Col>
                          <Col sm={1}>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldFixedGross}
                            </label>
                          </Col>
                          {state.promotionType == 1 ? (
                            <>
                              <Col sm={2}>
                                <div>
                                  <label>
                                    New Fixed Gross
                                    {`${
                                      contractType == "parttime" ||
                                      contractType == "Parttime"
                                        ? "(per/hr)"
                                        : ""
                                    }`}
                                    :
                                  </label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  {false ? (
                                    <label className="itemResult">
                                      &nbsp;&nbsp; {}
                                    </label>
                                  ) : (
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        placeholder=""
                                        required
                                        name="newFixedGross"
                                        value={state.newFixedGross}
                                        onChange={(e) => changeHandler(e)}
                                        style={
                                          newFixedGrossError
                                            ? { borderColor: "red" }
                                            : { borderRadius: "5px" }
                                        }
                                      />
                                    </Form.Group>
                                  )}
                                  {/* <p style={{ color: "red" }}>
                               {(contractType == "parttime" && state.newFixedGross <90 || state.newFixedGross >400)?"parttime invalid":
                               (contractType == "permanent" && state.newFixedGross < 18000)?"permanent":""}
                             </p>  */}
                                  {newFixedGrossError ? (
                                    <p style={{ color: "red" }}>
                                      {newFixedGrossError}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>

                              {/* <Col sm={2}>
                                <div>
                                  <label>Salary Effective Date :</label>
                                </div>
                              </Col>

                              <Col sm={2}>
                                <div>
                                  <Form.Group>
                                    <div className={""}>
                                      <DatePicker
                                        className="form-control onBoard-view"
                                        selected={state.salaryEffectiveDate}
                                        style={
                                          salaryEffectiveDateError
                                            ? { borderColor: "red" }
                                            : { borderRadius: "5px" }
                                        }
                                        name="salaryEffectiveDate"
                                        // minDate={moment().toDate()}
                                        required
                                        onChange={(e) => dateOfBirthHandler1(e)}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="YYYY-MM-DD"
                                        minDate={
                                          new Date(
                                            new Date().setMonth(
                                              new Date().getMonth() - 2
                                            )
                                          )
                                        }
                                      />
                                    </div>
                                  </Form.Group>
                                </div>
                                {salaryEffectiveDateError ? (
                                  <p style={{ color: "red" }}>
                                    {salaryEffectiveDateError}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </Col> */}
                            </>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label>Promotion Effective Date :</label>
                            </div>
                          </Col>

                          <Col sm={3}>
                            <div>
                              <Form.Group>
                                <div className={""}>
                                  <DatePicker
                                    className="form-control onBoard-view"
                                    style={
                                      effectiveDateError
                                        ? { borderColor: "red" }
                                        : { borderRadius: "5px" }
                                    }
                                    selected={state.effectiveDate}
                                    name="effectiveDate"
                                    // minDate={moment().toDate()}
                                    required
                                    onChange={(e) => dateOfBirthHandler(e)}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="DD-MM-YYYY"
                                    minDate={
                                      new Date(
                                        new Date().setMonth(
                                          new Date().getMonth() - 2
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </div>
                            {effectiveDateError ? (
                              <p style={{ color: "red" }}>
                                {effectiveDateError}
                              </p>
                            ) : (
                              ""
                            )}
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Relocation Bonus:</label>
                            </div>
                          </Col>
                          <Col sm={3}>
                            <div>
                              {false ? (
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.relocationBonus}
                                </label>
                              ) : (
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    required
                                    name="relocationBonus"
                                    value={state.relocationBonus}
                                    onChange={(e) => changeHandler(e)}
                                    // style={
                                    //   { borderColor: "red" }
                                    // }
                                  />
                                </Form.Group>
                              )}
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
                          <Col sm={2}>
                            <label>Reason For Promotion:</label>
                          </Col>
                          <Col sm={8}>
                            <Form.Control
                              style={
                                reasonError
                                  ? { borderColor: "red" }
                                  : { borderRadius: "5px" }
                              }
                              as="textarea"
                              rows={4}
                              name="reason"
                              maxLength="500"
                              value={state.reason}
                              placeholder="Write here.."
                              onChange={(e) => changeHandler(e)}
                              required
                            />

                            {reasonError ? (
                              <p style={{ color: "red" }}>{reasonError}</p>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            style={{
                              marginBottom: "2rem",
                              textAlign: "center",
                            }}
                          >
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
                                    (promotionIdData !== null &&
                                      promotionIdData !== undefined &&
                                      Object.keys(promotionIdData).length !==
                                        0 &&
                                      promotionIdData.status === 5)
                                  }
                                  className={
                                    submitted ||
                                    (promotionIdData !== null &&
                                      promotionIdData !== undefined &&
                                      Object.keys(promotionIdData).length !==
                                        0 &&
                                      promotionIdData.status === 5)
                                      ? "confirmButton"
                                      : "stepperButtons"
                                  }
                                  onClick={submitHandler}
                                >
                                  Submit
                                </button>
                              ) : (
                                ""
                              )}
                              {(showPreview === true || !saveLetter) &&
                              user !== null &&
                              user !== undefined &&
                              Object.keys(user).length !== 0 &&
                              (user.additionalRole === "1" ||
                                user.loginType == "1") &&
                              promotionIdData !== null &&
                              promotionIdData !== undefined &&
                              Object.keys(promotionIdData).length !== 0 &&
                              (promotionIdData.status === 1 ||
                                promotionIdData.status === 5) ? (
                                <button
                                  // disabled={!submitted}
                                  className={"LettersProbButtons"}
                                  onClick={generateLetterClick}
                                >
                                  Generate Promotion Letter
                                </button>
                              ) : (
                                ""
                              )}
                              {user !== null &&
                              user !== undefined &&
                              Object.keys(user).length !== 0 &&
                              (user.additionalRole === "1" ||
                                user.loginType == "1") &&
                              saveLetter &&
                              previewGeneratedLetter ? (
                                <button
                                  className={"LettersProbButtons"}
                                  onClick={previewLetterViewing}
                                >
                                  Preview Promotion Letter
                                </button>
                              ) : (
                                ""
                              )}
                              {user !== null &&
                                user !== undefined &&
                                Object.keys(user).length !== 0 &&
                                (user.additionalRole === "1" ||
                                  user.loginType == "1") &&
                                saveLetter &&
                                previewGeneratedLetter === true && (
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
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PromotionInitiate;
