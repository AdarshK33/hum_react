import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import DatePicker from "react-datepicker";
import Breadcrumb from "../common/breadcrumb";
import { DSICharterContext } from "../../context/DSICharterState";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { AppContext } from "../../context/AppState";

const CharterEdit = () => {

  const [status,setStatus] = useState("")
  const [startDate,SetStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)

  const [acknowledgementError,setAnknowledgementError] = useState("")
  const [startDateError,setStartDateError] = useState("")
  const [endDateError,setEndDateError] = useState("")

  const {  dsiCharterEnable,charterEnable,ViewEmployeeProfile,employeeProfileData} = useContext(DSICharterContext);
  const { getUserInfo,fetchEmployeeProfile,fetchemployeeData, user } = useContext(AppContext);
  useEffect(()=>{
    ViewEmployeeProfile()
    fetchEmployeeProfile()
  },[])
  useEffect(()=>{
    if(fetchemployeeData !== null && 
      fetchemployeeData !== undefined && 
      fetchemployeeData !== ""){
    if(fetchemployeeData.isAdminEnabled !== null && 
      fetchemployeeData.isAdminEnabled !== "" && 
      fetchemployeeData.isAdminEnabled !== undefined){
         console.log(fetchemployeeData,"employeeProfileDataedit")
        setStatus(fetchemployeeData.isAdminEnabled)
        SetStartDate(new Date(fetchemployeeData.startingDate === null||fetchemployeeData.startingDate === undefined || fetchemployeeData.startingDate === "" ?new Date():fetchemployeeData.startingDate))
          setEndDate(new Date(fetchemployeeData.closingDate === null 
            || fetchemployeeData.closingDate === undefined || fetchemployeeData.closingDate === "" ?new Date():fetchemployeeData.closingDate))
          // SetEndDate(new Date(employeeProfileData.closingDate))
          
       }
    }
  },[fetchemployeeData])
  console.log(status,startDate,endDate)
  const handleCheckBox =(e)=>{
    console.log(e.target.value)
    if(e.target.value == "yes"){
      setStatus(true)
    }else if(e.target.value == "no"){
      setStatus(false)
    }
  }
  console.log(status,"status")
  const handleSave=(e)=>{
    e.preventDefault()
    if (
      startDate == null ||
      startDate == undefined
    ) {
      setStartDateError("Please select start date");
    } else {
      setStartDateError("");
    }
    if (
      endDate == null ||
      endDate == undefined
    ) {
      setEndDateError("Please select end date");
    } else {
      setEndDateError("");
    }
    console.log(startDate,endDate,status,"handlesave")
    if(status !== null && status !== undefined && status !== "" &&
      startDate !== null && startDate !== undefined && startDate !== "" &&
      endDate !== null && endDate !== undefined && endDate !== ""){
      setAnknowledgementError("")
      var start= moment(startDate).format("YYYY-MM-DD")
      var end= moment(endDate).format("YYYY-MM-DD")
      const infoData={
        "status":status,
        "startingDate":start,
        "closingDate":end
      }
      console.log(startDate,endDate,status,"startend",start,end,infoData)
     dsiCharterEnable(infoData)
    }else{
      setAnknowledgementError("Please select the checkbox")
    }
  }
  const startHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    moment(new Date(AdjusteddateValue)).format("DD/MM/YYYY")
    SetStartDate(AdjusteddateValue);
  };
  const endHandler = (date) => {
    var endDateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    moment(new Date(endDateValue)).format("DD/MM/YYYY")
    setEndDate(endDateValue);
  };
  return (
    <Fragment>
      {/* {true?<Modal
          show={true}
          // onHide={handleTermination}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Disciplinary action has to be taken before termination.
              <br />            
            </label>
            <div className="text-center mb-2">
              <Button onClick={""}>Close</Button>
              <Button onClick={""} style={{ marginLeft: "1rem" }}>
              Next
            </Button>

            </div>
          </Modal.Body>
        </Modal>:""} */}

      <Breadcrumb title="DSI Charter" parent="DSI Charter" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>DSI Charter </b>
                </div>
                <Form>
                 <Row
                    style={{
                      marginRight: "2rem",
                    }}
                  >
                    <Col>
                     {/*   <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value={acknowledgement}
                    checked={acknowledgement}
                    // required={required}
                    onChange={(e) => handleCheckBox(e)}
                  />
                </div>
                        <Col sm={5}>
                          <div>
                            <label>Enable charter acknowledgement for all Employees:</label>
                          </div>
                        </Col>
                      
                  </Row> */}
                     <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={2}>
                            <div>
                              <label>Start Date :</label>
                            </div>
                          </Col>

                          <Col sm={3} style={{marginLeft: "-6rem"}}>
                            <div>
                              <Form.Group>
                                <div className={""}>
                                  <DatePicker
                                    className="form-control onBoard-view"
                                    style={
                                      startDateError
                                        ? { borderColor: "red" }
                                        : { borderRadius: "5px" }
                                    }
                                    selected={startDate}
                                    name="startDate"
                                    // minDate={moment().toDate()}
                                    required
                                    onChange={(e) => startHandler(e)}
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
                            {startDateError ? (
                              <p style={{ color: "red" }}>
                                {startDateError}
                              </p>
                            ) : (
                              ""
                            )}
                          </Col>
                          <Col sm={2} style={{marginLeft: "6rem"}}>
                            <div>
                              <label>End Date :</label>
                            </div>
                          </Col>

                          <Col sm={3} style={{marginLeft: "-6rem"}}>
                            <div>
                              <Form.Group>
                                <div className={""}>
                                  <DatePicker
                                    className="form-control onBoard-view"
                                    style={
                                      endDateError
                                        ? { borderColor: "red" }
                                        : { borderRadius: "5px" }
                                    }
                                    selected={endDate}
                                    name="endDate"
                                    // minDate={moment().toDate()}
                                    required
                                    onChange={(e) => endHandler(e)}
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
                            {endDateError ? (
                              <p style={{ color: "red" }}>
                                {endDateError}
                              </p>
                            ) : (
                              ""
                            )}
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
                            Enable charter acknowledgement for all Employees:
                            </label><br/>
                            {acknowledgementError ? (
                            <p style={{ color: "red" }}>{acknowledgementError}</p>
                          ) : (
                            ""
                          )}
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  checked={status}
                                  style={
                                    acknowledgementError
                                      ? { borderColor: "red" }
                                      : { borderColor: "blue" }
                                  }
                                  // required={required}
                                  onChange={handleCheckBox}
                                />
                                <label className="itemResult"> Yes</label>
                              </div>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.25rem" }}>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  checked={status ===false?true:""}
                                  style={
                                    acknowledgementError
                                      ? { borderColor: "red" }
                                      : { borderColor: "blue" }
                                  }
                                  // required={required}
                                  onChange={handleCheckBox}
                                />
                                <label className="itemResult">No</label>
                              </div>
                          </Col><br/>
                        
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
                               "stepperButtons"
                            }
                            onClick={handleSave}
                          >
                            Submit
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
    </Fragment>
  );
};

export default CharterEdit;
