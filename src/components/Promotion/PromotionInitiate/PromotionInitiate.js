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
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";

const PromotionInitiate = () => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();
  const [contractType,setContractType] = useState('')
  const [currentManager,SetCurrentManager] = useState('')
  const [contractTypeStatus,setContractTypeStatus] = useState(false)

  const [state, setState] = useState({
    validatedByAdminName: "",
    validatedByCostCentreManagerName: "",
    bonus: 0,
    bonusInPercentage: 0,
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
  const [reportingManagerError,setReportingManagerError] =useState('')
  const [modelStatus,setModelStatus] = useState(false)
  const [submitted, setSubmitted] = useState(false);
  const {
    employeeData,
    ViewEmployeeProfile,
    employeeProfileData,
    ViewEmployeeDataById,
    fetchRelievingLetterData,
    relivingLetterData,
  } = useContext(EmployeeSeparationContext);
  const { empResign, withdraw,managerList, searchByCostCenter, managerData,searchByCostData } =
    useContext(SeparationContext);
  const { departmentView, departmentName } = useContext(OfferContext);
  const { PositionNew, positionNew, PromotionCreate } =
    useContext(PromotionContext);
  useEffect(() => {
    PositionNew();
    departmentView();
  }, []);

  useEffect(() => {
    ViewEmployeeProfile();
  }, []);

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
      state.empName = searchByCostData.firstName + " " + temp;
      setEmpName(searchByCostData.firstName + " " + temp);
      state.contractType = searchByCostData.contractType
      setContractType(searchByCostData.contractType)
      managerData(searchByCostData.costCentre)
      state.costCentre = searchByCostData.costCentre;
      state.oldPosition = searchByCostData.position;
      state.oldDepartment = searchByCostData.department;
     state.currentManagerId = searchByCostData.managerId;
      state.oldFixedGross = searchByCostData.fixedGross;
    if(searchByCostData.contractType === "intership"||searchByCostData.contractType === "Intership"){
      setContractTypeStatus(true)
    }
  
  }}, [searchByCostData]);
  
  useEffect(()=>{
    if (
      searchByCostData &&
      searchByCostData &&
      searchByCostData !== null &&
      searchByCostData !== undefined &&
      Object.keys(searchByCostData).length !== 0
    ) {
   managerList.map((item)=>{
    if(item.employeeId == searchByCostData.managerId){
      const temp =
      item.lastName !== null &&
      item.lastName !== undefined
        ? item.lastName
        : "";
      state.currentManagerName = item.firstName + " " + temp
      SetCurrentManager(item.firstName + " " + temp)
    }})
  
  }
  },[managerList,searchByCostData])


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

    if (positionId == "" || positionId == null || positionId == undefined) {
      setPositionIdError(" Please select the position ");
      console.log(positionIdError);
    } else {
      setPositionIdError("");
    }

    var newFixedGross = state.newFixedGross;
    if (
      newFixedGross !== "" && contractType !== null && contractType !== undefined &&
      newFixedGross !== null && newFixedGross !== undefined
    ) {
      if( contractType === "Parttime" ||contractType === "parttime"){
        if( newFixedGross < 90 || newFixedGross > 200){
          setNewFixedGrossError("Value should be between 90 - 200"); 
        }else{
          setNewFixedGrossError('')
        }
      }else if(contractType === "Permanent" ||contractType === "permanent"){
          if(newFixedGross >18000){
        setNewFixedGrossError("Value should be above 18000")
          }else{
            setNewFixedGrossError('')
          }
      }
    }else{
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
      setReportingManagerError(
        "Please select reporting manager "
      );
    } else {
      setReportingManagerError("");
    }
    var effectiveDate = state.effectiveDate;
    if (state.promotionType == 1 &&
      effectiveDate == "" ||
      effectiveDate == null ||
      effectiveDate == undefined
    ) {
      setEffectiveDateError("Please add  effective date");
    } else {
      setEffectiveDateError("");
    }
    var salaryEffectiveDate = state.salaryEffectiveDate;
    if (state.promotionType == 1 &&
      salaryEffectiveDate == "" ||
      salaryEffectiveDate == null ||
      salaryEffectiveDate == undefined
    ) {
      setSalaryEffectiveDateError("Please add salary effective date");
    } else {
      setSalaryEffectiveDateError("");
    }

   
console.log(newFixedGrossError,"newFixedGrossError")
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
        validatedByAdminName: null,
        validatedByCostCentreManagerName:null,
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
        currentManagerName:state.currentManagerName,
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
      if((contractType == "parttime" ||contractType == "Parttime") &&
       state.newFixedGross >=90 && state.newFixedGross <=200){
     PromotionCreate(infoData);
      setModelStatus(true)
       setSubmitted(true);
    console.log("all okay1", infoData);
      }else if((contractType == "permanent" ||contractType == "Permanent") && 
      state.newFixedGross > 18000){
      PromotionCreate(infoData);
      setModelStatus(true)
       setSubmitted(true);
      console.log("all okay2", infoData);
      }else if(state.promotionType == 0 && 
        ((contractType == "parttime" ||contractType == "Parttime")||
        (contractType == "permanent" ||contractType == "Permanent"))){
        PromotionCreate(infoData);
      setModelStatus(true)
       setSubmitted(true);
        console.log("all okay3", infoData);
      }else{
        console.log("NOT OK", infoData);
      }
     }else {
      console.log("NOT OK", empName);
      // toast.error("Data is not filled Properly")
    }
  };
  console.log(managerList,"managerList")
  const handleCloseValue = ()=>{
    setModelStatus(false)
    setContractTypeStatus(false)
  }
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
        setState({ ...state, promotionType: 0 ,salaryEffectiveDate:null,newFixedGross:0});
      }
    }
  };
  const handlePromotionTypeNo = (e) => {
    if (e.target.value === "no") {
      if (state.promotionType == 0) {

        setState({ ...state, promotionType: 1 });
      } else {
        setState({ ...state, promotionType: 0 ,salaryEffectiveDate:null,newFixedGross:0});
      }
    }
  };
  const changeHandler = (e) => {
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
    }else if (e.target.name === "reportingManagerId") {
      managerList.map((item) => {
        const temp =
        item.lastName !== null &&
        item.lastName !== undefined
          ? item.lastName
          : "";
        if ((item.firstName + " " + temp) === e.target.value) {
          setState({
            ...state,
            reportingManagerId: item.employeeId,
    reportingManagerName:item.firstName + " " + temp,
          });
        }
      });
      console.log(e.target.value, state, "value666");
    }else{
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  
    console.log(state, "state");
  };

  return (
    <Fragment>
      <ToastContainer/>
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
             <Link to={"/promotion-list"}><Button onClick={handleCloseValue}>Close</Button></Link> 
            </div>
          </Modal.Body>
        </Modal> 
        <Modal
          show={modelStatus}
           onHide={handleCloseValue}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Your request has been sent to manager.
            
            </label>
            <div className="text-center mb-2">
             <Link to={"/promotion-list"}><Button onClick={handleCloseValue}>Close</Button></Link> 
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
                                {managerList !== null &&
                                  managerList !== undefined &&
                                  managerList.length > 0 &&
                                  managerList.map((item, index) => {
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
                              <label>Fixed Gross{`${(contractType =="parttime" ||contractType =="Parttime")?"(per/hr)":''}`}:</label>
                            </div>
                          </Col>
                          <Col sm={1}>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldFixedGross}
                            </label>
                          </Col>
                          {state.promotionType==1?(
                           <>
                          <Col sm={2}>
                            <div>
                              <label>New Fixed Gross{`${(contractType =="parttime" ||contractType =="Parttime")?"(per/hr)":''}`}:</label>
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
                               {(contractType == "parttime" && state.newFixedGross <90 || state.newFixedGross >200)?"parttime invalid":
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
                       

                         <Col sm={2}>
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
                                    minDate={moment().toDate()}
                                    required
                                    onChange={(e) => dateOfBirthHandler1(e)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="YYYY-MM-DD"
                                    minDate={new Date()}
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
                          </Col>
                          </>):''}
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
                              <label> Effective Date :</label>
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
                                    minDate={moment().toDate()}
                                    required
                                    onChange={(e) => dateOfBirthHandler(e)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="YYYY-MM-DD"
                                    minDate={new Date()}
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
                              marginTop: "2rem",
                              marginBottom: "2rem",
                              textAlign: "center",
                            }}
                          >
                            <button
                              className={
                                submitted ? "confirmButton" : "stepperButtons"
                              }
                              onClick={submitHandler}
                            >
                              Submit
                            </button>
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
