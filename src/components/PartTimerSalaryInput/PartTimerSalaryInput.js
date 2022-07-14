import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { Link } from "react-router-dom";
import { PartTimeSalaryInputContext } from "../../context/PartTimeSalaryInputState";

import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "./PartTimeSalaryInput.css";
const PartTimerSalaryInput = () => {
  const [EmpName, setEmpName] = useState();
  const [contractType, setContractType] = useState("");
 

  const [state, setState] = useState({
    empName: "",
    employeeId: "",
    fixedGross: 0,
    hoursWorked:0,
    toDate: null,
    fromDate: null,

  });
  const [empNameError, setEmpNameError] = useState(null);
  const [fixedGrossError, setFixedGrossError] = useState(null);
  const [hoursWorkedError, setHoursWorkedError] = useState(null);
  const [toDateError, setToDateError] = useState(null);
  const [fromDateError, setFromDateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [fromDate,setFromDate] = useState(null)
  const [toDate,setToDate] = useState(null)
  const {
    ViewEmployeeData,employeeData,CreateSalaryInput,createdData
  } = useContext(PartTimeSalaryInputContext);

  useEffect(() => {
  if (
   employeeData &&
   employeeData !== null &&
   employeeData !== undefined &&
   Object.keys(employeeData).length
 ){
   state.empName = employeeData.firstName + " " +employeeData.lastName;
   setEmpName(employeeData.firstName + " " +
   employeeData.lastName + " / " + employeeData.employeeId)
   setContractType(employeeData.contractType)
   state.employeeId = employeeData.employeeId;
   state.contractType = employeeData.contractType;
 }
}, [employeeData]);
console.log(employeeData,"employeeData",state)

  const fromDateHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setState({ ...state, fromDate: AdjusteddateValue,toDate:null });
    setFromDate(AdjusteddateValue)
    setToDate(null)
  };
  const toDateHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setState({ ...state, toDate: AdjusteddateValue });
    setToDate(AdjusteddateValue)

  };

  const searchDataHandler = () => {
    if (EmpName !== null) {
      ViewEmployeeData(EmpName);
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
    let valid = /[^A-Za-z0-9'.,-_ ]/;
    if (e.target.name === "empName"){
      setEmpName(e.target.value);
      setState({
        ...state,
        empName: e.target.value,
      });
      if (e.target.value === ""){
        setEmpNameError("Enter Employee Name/ID");
      }else{
        setEmpNameError("");
      }
    }else if(e.target.name === "fixedGross"){
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
      if(Number.isInteger(parseInt(e.target.value)) === true && isNaN(e.target.value) !== true){
        console.log(e.target.value,"fixed gross")
      if (e.target.value < 90 || e.target.value > 400){
            setFixedGrossError("Fixed gross should be between 90 - 400");
          }else{
            setFixedGrossError("");
          }
        }else{
          setFixedGrossError("Please Enter Only Number");
        }
      // if (contractType === "Parttime" || contractType === "parttime") {
      //   if (e.target.value < 90 || e.target.value > 400) {
      //     setFixedGrossError("Value should be between 90 - 400");
      //   } else {
      //     setFixedGrossError("");
      //   }
      // } else if (contractType === "Fulltime" || contractType === "fulltime") {
      //   if (e.target.value < 18000 || e.target.value == 18000) {
      //     setFixedGrossError("Value should be above 18000");
      //   } else {
      //     setFixedGrossError("");
      //   }
      // }
    }else if(e.target.name === "hoursWorked"){
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
      if(Number.isInteger(parseInt(e.target.value)) === true && isNaN(e.target.value) !== true){
        console.log(e.target.value,"hours")
      if (e.target.value > 130 || e.target.value < 0){
            setHoursWorkedError("work hours should be  0 to 130 hrs");
          } else {
            setHoursWorkedError("");
          }
        }else{
          setHoursWorkedError("Please Enter Only Number");
        }
    }else if(e.target.name === "formDate"){
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
        if (e.target.value === ""){
          setFromDateError("Enter From Date");
        }else{
          setFromDateError("");
        }
      }else if(e.target.name === "toDate"){
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
        if (e.target.value === ""){
          setToDateError("Enter From Date");
        }else{
          setToDateError("");
        }
      }else{
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }

    console.log(state, "state");
  };
  const hoursWorkedValidation = () => {
    if(Number.isInteger(parseInt(state.hoursWorked)) === true && isNaN(state.hoursWorked) !== true){
      let date1 = new Date(toDate);
      let date2 = new Date(fromDate);
      let timeInMilisec = (date1.getTime() - date2.getTime())
      let daysBetweenDates = Math.round(Math.abs(timeInMilisec / (1000 * 60 * 60 * 24))) == 0?1:Math.round(Math.abs(timeInMilisec / (1000 * 60 * 60 * 24)))+1
      console.log(daysBetweenDates,Math.round(Math.abs(timeInMilisec / (1000 * 60 * 60 * 24))),"hours")
    if(state.hoursWorked > 130){
      setHoursWorkedError("work hours should be  0 to 130 hrs");
      return false;
    } else if((state.hoursWorked > daysBetweenDates*8 && state.hoursWorked <= 130 )){
          setHoursWorkedError(`work hours can not be greater then ${daysBetweenDates*8} hrs`);
          return false;
        } else if (state.hoursWorked <= 0 || state.hoursWorked == null ){
        setHoursWorkedError("work hours should be  0 to 130 hrs");
        return false;
      } else {
        setHoursWorkedError("");
        return true;
  };
}else{
  setHoursWorkedError("Please Enter Only Number");
  return false; 
}
}
const fixedGrossValidation = () =>{
  if(Number.isInteger(parseInt(state.fixedGross)) === true && isNaN(state.fixedGross) !== true){
  if (state.fixedGross < 90 || state.fixedGross > 400 || state.fixedGross == null){
    setFixedGrossError("Fixed gross should be between 90 - 400");
    return false;
  } else {
    setFixedGrossError("");
    return true;
};
  }else{
    setFixedGrossError("Please Enter Only Number");
    return false; 
  }
}
    const employeeNameValidation =()=>{
      if(
        state.empName === "" ||
        state.empName === null ||
        state.empName === undefined
      ){
          setEmpNameError("Please Enter Employee Name/ID");
          return false;
        }else{
          setEmpNameError("");
          return true;
    };
    }
    const fromDateValidation =()=>{
      if(
        state.fromDate === "" ||
        state.fromDate === null ||
        state.fromDate === undefined
      ){
          setFromDateError("Please Enter From Date");
          return false;
        }else{
          setFromDateError("");
          return true;
    };
    }
      const toDateValidation =()=>{
      if(
        state.toDate === "" ||
        state.toDate === null ||
        state.toDate === undefined
      ){
          setToDateError("Please Enter To Date");
          return false;
        }else{
          setToDateError("");
          return true;
    };
    }
  const checkValidations = () => {
    console.log("checkValidations");
    if(employeeData && Object.keys(employeeData).length)
    {
    if(
      (hoursWorkedValidation() === true) &
      (employeeNameValidation() === true) &
      (fromDateValidation() === true) &
      (toDateValidation() === true) &
      (fixedGrossValidation() === true)
    ){
        return true;
    } else {
      return false;
    }
  }else{
    toast.error("please search valid employee")
    return false
  }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const value = checkValidations();
    console.log(value,state)
    if (value === true){
      const infoData = {
        employeeId: state.employeeId,
        fixedGross:state.fixedGross,
        fromDate: state.fromDate,
        hoursWorked:state.hoursWorked,
        toDate: state.toDate,
        inputId:0
      };
      CreateSalaryInput(infoData);
      // setSuccessMessage(true)
  }
  }
  const handleCloseValue = () => {
    setSuccessMessage(false);
  };
  return (
    <Fragment>
      <ToastContainer />
      <Modal
        show={successMessage}
        onHide={handleCloseValue}
        size="md"
        centered
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label className="text-center">
          Parttime Employee <b>{state.hoursWorked} hours</b> Details Created successfully
          </label>
          <div className="text-center mb-2">
              <Button onClick={handleCloseValue}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
      <Breadcrumb title="PARTTIMER SALARY INPUT" parent="PARTTIMER SALARY INPUT" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>Part Timer Salary Input</b>
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
                            marginBottom: "2rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label>Emp Name/Id</label>
                            </div>
                          </Col>
                          <Col sm={1}>
                            :
                          </Col>
                          <Col sm={9}>
                            <div>
                              {false ? (
                                <label>
                                  {" "}
                                  &nbsp;&nbsp; {EmpName} &nbsp;{state.employeeId}
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
                                  <label>
                                     Fixed Gross - Per Hour
                                  </label>
                                </div>
                              </Col>
                              <Col sm={1}>
                                  :
                                </Col>
                              <Col sm={3}>
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
                                        name="fixedGross"
                                        value={state.fixedGross}
                                        onChange={(e) => changeHandler(e)}
                                        style={
                                          fixedGrossError
                                            ? { borderColor: "red" }
                                            : { borderRadius: "5px" }
                                        }
                                      />
                                    </Form.Group>
                                  )}
                                  {fixedGrossError ? (
                                    <p style={{ color: "red" }}>
                                      {fixedGrossError}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div>
                                  <label>
                                    Hours Worked
                                    
                                  </label>
                                </div>
                              </Col>
                              <Col sm={1}>
                            :
                          </Col>
                              <Col sm={3}>
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
                                        name="hoursWorked"
                                        value={state.hoursWorked}
                                        onChange={(e) => changeHandler(e)}
                                        style={
                                          hoursWorkedError
                                            ? { borderColor: "red" }
                                            : { borderRadius: "5px" }
                                        }
                                      />
                                    </Form.Group>
                                  )}
                                  {hoursWorkedError ? (
                                    <p style={{ color: "red" }}>
                                      {hoursWorkedError}
                                    </p>
                                  ) : (
                                    ""
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
                            <div>
                              <label>From Date </label>
                            </div>
                          </Col>
                          <Col sm={1}>
                            :
                          </Col>
                          <Col sm={3}>
                            <div>
                              <Form.Group>
                              <div className={fromDateError ? "part-date-error" : "part-date"}>
                                  <DatePicker
                                    className="form-control part-view"
                                  
                                    selected={fromDate}
                                    name="fromDate"
                                    // minDate={moment().toDate()}
                                    required
                                    onChange={(e) => fromDateHandler(e)}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="DD-MM-YYYY"
                                    minDate={new Date().getDate()>20?
                                      new Date(
                                        new Date().getFullYear(),
                                          new Date().getMonth() 
                                        ,21
                                      ):
                                      new Date(
                                        new Date().getFullYear(),
                                          new Date().getMonth() - 2
                                        ,21
                                      )
                                    }
                                    maxDate={
                                      new Date().getDate()>20?new Date(
                                        new Date().getFullYear(),
                                          new Date().getMonth()+1
                                        ,20
                                      ):new Date(
                                        new Date().getFullYear(),
                                          new Date().getMonth() 
                                        ,20
                                      )
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </div>
                            {fromDateError ? (
                              <p style={{ color: "red" }}>
                                {fromDateError}
                              </p>
                            ) : (
                              ""
                            )}
                          </Col>
                           <Col sm={2}>
                                <div>
                                  <label>To Date </label>
                                </div>
                              </Col>
                              <Col sm={1}>
                            :
                          </Col>
                              <Col sm={3}>
                                <div>
                                  <Form.Group>
                                  <div className={toDateError ? "part-date-error" : "part-date"}>
                                      <DatePicker
                                        className="form-control part-view"
                                        selected={toDate}
                              
                                        name="toDate"
                                         minDate={new Date(fromDate)}
                                        required
                                        onChange={(e) => toDateHandler(e)}
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText="DD-MM-YYYY"
                                        // minDate={
                                        //   new Date(
                                        //     new Date().getFullYear(),
                                        //       new Date().getMonth() - 1
                                        //     ,21
                                        //   )
                                        // }
                                        maxDate={
                                          new Date().getDate()>20?
                                          new Date(
                                            new Date().getFullYear(),
                                              new Date().getMonth()+1
                                            ,20
                                          )
                                          :
                                          new Date(
                                            new Date().getFullYear(),
                                              new Date().getMonth() 
                                            ,20
                                          )
                                        }
                                      />
                                    </div>
                                  </Form.Group>
                                </div>
                                {toDateError ? (
                                  <p style={{ color: "red" }}>
                                    {toDateError}
                                  </p>
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
                                      <button
                                        className={
                                        "stepperButtons"
                                        }
                                        onClick={submitHandler}
                                      >
                                        Submit
                                      </button>
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

export default PartTimerSalaryInput;
