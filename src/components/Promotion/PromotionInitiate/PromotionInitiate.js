import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { OfferContext } from "../../../context/OfferState";
import { SeparationContext } from "../../../context/SepearationState";

import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import { PromotionContext, } from "../../../context/PromotionState";
import { PermissionContext } from "../../../context/PermissionState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";

const PromotionInitiate = () => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();

  const [state, setState] = useState({
    "approveByAdminName": "",
    "approveByCostCentreManagerName": "",
    "bonus": 0,
    "bonusInPercentage": 0,
    "costCentre": "",
    "costCentreManagerEmail": "",
    "costCentreManagerId": "",
    "costCentreManagerName": "",
    "departmentId": 0,
    "effectiveDate": "",
    "emailId": "",
    "empName": "",
    "employeeId": "",
    "managerId": "",
    "managerName": "",
    "newDepartment": "",
    "newFixedGross": 0,
    "oldDepartment": "",
    "oldFixedGross": 0,
    "oldPosition": "",
    "positionId": 0,
    "promotedPosition": "",
    "promotionId": 0,
    "promotionLetter": "",
    "reason": "",
    "relocationBonus": 0,
    "remarks": "",
    "status": 0
  });
  const [stateError,setStateError] = useState({
    empNameError:'',
    departmentError: '',
departmentIdError: '',
    positionIdError:'',
    costCentreError:'',
    newFixedGrossError:'',
    oldPositionError:'',
    positionIdError:'',
    reasonError:'',
    relocationBonusError:''
  })
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
    searchByCostCenter,
    searchByCostData,
  } = useContext(SeparationContext);
  const { departmentView,departmentName } = useContext(
    OfferContext
  );
  const { PositionNew,positionNew ,PromotionCreate} = useContext(
    PromotionContext
  );
  useEffect(() => {
    PositionNew()
    departmentView();
  }, []);

  useEffect(() => {
    ViewEmployeeProfile();
  }, []);

 console.log(positionNew,"positionNew")
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
      console.log(searchByCostData,"searchByCostData")
      const temp =
        searchByCostData.lastName !== null &&
        searchByCostData.lastName !== undefined
          ? searchByCostData.lastName
          : "";
      state.employeeId = searchByCostData.employeeId;
      state.empName  = searchByCostData.empName
      setEmpName(searchByCostData.firstName + " " + temp);

      state.costCentre = searchByCostData.costCentre;
      state.oldPosition = searchByCostData.position;
      state.department = searchByCostData.department

    }
  }, [searchByCostData]);
  const checkValidations = () => {

    if (
      state.empName == "" ||
      state.empName == null ||
      state.empName == undefined
    ) {
      setStateError({...stateError,empNameError:"Select the Employee Name"})
    }else if(state.department == "" ||
    state.department == null ||
    state.department == undefined){
      setStateError({...stateError,departmentError:"Select the Department Name"}) 
    }else if(state.departmentId == "" ||
    state.departmentId == null ||
    state.departmentId == undefined){
      setStateError({...stateError,departmentIdError:"Select the New Department"}) 
    }else if(state.positionId == "" ||
    state.positionId == null ||
    state.positionId == undefined){
      setStateError({...stateError,positionIdError:"Select the  New Position "}) 
    }else if(state.costCentre == "" ||
    state.costCentre == null ||
    state.costCentre == undefined){
      setStateError({...stateError,costCentreError:"Select the costCentre"}) 
    }else if(state.newFixedGross == "" ||
    state.newFixedGross == null ||
    state.newFixedGross == undefined){
      setStateError({...stateError,newFixedGrossError:"Add New Fixed Gross"}) 
    }else if(state.department == "" ||
    state.department == null ||
    state.department == undefined){
      setStateError({...stateError,departmentError:"Select the Department Name"}) 
    }else if(state.reason == "" ||
    state.reason == null ||
    state.reason == undefined){
      setStateError({...stateError,reasonError:"Please Add Reason for Promotion"}) 
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setState({...state,empName:EmpName})
    PromotionCreate(state)
    const value = checkValidations();
    if (value === true) {
    }
    console.log("submit handler",state);
  };
  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setState({...state,effectiveDate:AdjusteddateValue});
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
  const changeHandler = (e) => {
    if (e.target.name === "empName") {
      setEmpName(e.target.value);
    } else if(e.target.name === "departmentId"){
    let value =  departmentName.filter((item) =>item.departmentName === e.target.value)
    console.log(e.target.value,value,state,"department1")
          setDepartmentNew(e.target.value)
          setState({
            ...state,
            newDepartment:value[0].departmentName,
            departmentId: value[0].deptId,
      });
      console.log(e.target.value,value,state,"department2")
     
    }else if(e.target.name === "positionId"){
      positionNew.map((item) => {
        if (item.position === e.target.value) {
          setPosition(e.target.value)
          setState({
            ...state,
            positionId: item.positionId,
          });
        }
      });
      console.log(e.target.value,state,"value666")
    }else{
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    console.log(state,"state");
  };
  return (
    <div>
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
                              <label className="itemResult">
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
                                    style={{ borderRadius: "5px" }}
                                    // style={
                                    //   stateError.empName1Error.length > 0 ? { borderColor: "red" } : ''
                                    // }
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
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                        <Col sm={6}>
                        <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.oldPosition}
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
                         <Col sm={6}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.costCentre}
                              </label>
                            </label>
                          </div>
                        </Col>
                     
                        <Col sm={6}>
                          
                          <div>
                            <label>
                              Department:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.department}
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
                        <Col sm={6}>
                        
                          <Form.Group>
                  <Form.Label>New Position:</Form.Label>
                  &nbsp;&nbsp; <Form.Control
                    as="select"
                    name="positionId"
                    defaultValue={position}
                     onChange={(e) => changeHandler(e)}

                  >
                    <option value="">Select Position</option>
                    {positionNew !== null &&
                      positionNew !== undefined &&
                      positionNew.length > 0 &&
                      positionNew.map((item) => {
                        return (
                          <option key={item.deptId}  >
                            {item.position}
                          </option>
                        );
                      })}
                  </Form.Control>
                  </Form.Group>
                        </Col>
                       

                        <Col sm={6}>
                        <Form.Group>
                  <Form.Label>Select Department:</Form.Label>
                  &nbsp;&nbsp; <Form.Control
                    as="select"
                    name="departmentId"
                    defaultValue={departmentNew}
                    onChange={(e) => changeHandler(e)}
                  
                  >
                    <option value="">Select Department</option>
                    {departmentName !== null &&
                      departmentName !== undefined &&
                      departmentName.length > 0 &&
                      departmentName.map((item) => {
                        return (
                          <option  key={item.deptId}>
                            {item.departmentName}
                          </option>
                        );
                      })}
                  </Form.Control>
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
                    
                   

                        <Col sm={6}>
                          <div>
                            <label>
                              Fixed Gross:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.oldFixedGross}
                              </label>
                            </label>
                          </div>
                        </Col>
                     <Col sm={3}>
                          <div>
                            <label>New Fixed Gross:</label>
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
                                  style={{
                                    borderColor: "#006ebb",
                                  }}
                                  name="newFixedGross"
                                  value={state.newFixedGross}
                                  onChange={(e) => changeHandler(e)}
                                  // style={
                                  //   emailError ? { borderColor: "red" } : {}
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
               
                          <Col sm={3}>
                            <div>
                              <label> Effective Date :</label>
                            </div>
                          </Col>
                   
                          <Col sm={3}>
                            <div>
                  
                                <Form.Group>
                                  <div
                                    className={
                                     ''
                                    }
                                  >
                                    <DatePicker
                                      className="form-control onBoard-view"
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
                          </Col> 
                     <Col sm={3}>
                          <div>
                            <label>Relocation Bonus:</label>
                          </div>
                        </Col>
                        <Col sm={2}>
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
                                  style={{
                                    borderColor: "#006ebb",
                                  }}
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
       
          <Modal.Body className="mx-auto">
            <label className="itemResult">Reason For Promotion:</label>
            <textarea
              className="remarkText rounded"
              name="reason"
              value={state.reason}
              placeholder="Write here.."
               onChange={(e) => changeHandler(e)}
            />
{/* 
            {
             ? <p style={{ color: "red" }}>Please add your reason</p>:''
            } */}
        
          </Modal.Body>
      
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
                             "stepperButtons"
                            }
                             onClick={submitHandler}
                          >
                            Save
                          </button>
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
    </div>
  );
};

export default PromotionInitiate;


