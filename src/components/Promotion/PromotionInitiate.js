import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { PromotionContext } from "../../context/PromotionState";
import { PermissionContext } from "../../context/PermissionState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { SeparationContext } from "../../context/SepearationState";
import { setGlobalCssModule } from "reactstrap/es/utils";

const PromotionInitiate = () => {
  

  const [state, setState] = useState({
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empPosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    modeOfSeparationReasonId: "",
    noticePeriod: "",
    emailId: "",
    comments: "",
    noticePeriodRcryDays: "",
    remarks: "",
  });

  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
 
  };

  return (
    <Fragment>
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
                                &nbsp;&nbsp; {} &nbsp;{state.empId}
                              </label>
                            ) : (
                              <Form.Group>
                                <div className="faq-form ">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="empName"
                                    // disabled={disabled}
                                    value={''}
                                    style={{ borderRadius: "5px" }}
                                
                                    placeholder="Search.."
                                    required
                                  />
                                  <Search
                                    className="search-icon"
                                    style={{ color: "#313131" }}
                                    onClick={''}
                                  />
                                </div>
                              </Form.Group>
                            )}
                          </div>
                        </Col>

                       
                        <Col sm={6}>
                          <div>
                            <label>
                              Fixed Gross:
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
                        <Col sm={6}>
                        <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          
                          <div>
                            <label>
                              Department:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empLocation}
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
                        <Col sm={2}>
                          <div>
                            <label>New Position:</label>
                          </div>
                        </Col>
                       

                        <Col sm={3}>
                          <div>
                            <label>New Department:</label>
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
                     <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {}
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
                                  //   disabled={!RcryYes}
                                  name="emailId"
                                  value={state.emailId}
                                  // onChange={(e) => changeHandler(e)}
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
               
                          <Col sm={2}>
                            <div>
                              <label> Effective Date :</label>
                            </div>
                          </Col>
                   
                          <Col sm={2}>
                            <div>
                  
                                <Form.Group>
                                  <div
                                    className={
                                     ''
                                    }
                                  >
                                    <DatePicker
                                      className="form-control onBoard-view"
                                      // selected={dateOfResignation}
                                      name="dateOfResignation"
                                      minDate={moment().toDate()}
                                      // required
                                      // onChange={(e) => dateOfBirthHandler(e)}
                                      dateFormat="yyyy-MM-dd"
                                      placeholderText="YYYY-MM-DD"
                                      minDate={new Date()}
                                      // disabled={disabled}
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
                                &nbsp;&nbsp; {state.emailId}
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
                                  //   disabled={!RcryYes}
                                  name="emailId"
                                  value={state.emailId}
                                  // onChange={(e) => changeHandler(e)}
                                  style={
                                    { borderColor: "red" } 
                                  }
                                />

                            
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                   
                        </Row>
       
          <Modal.Body className="mx-auto">
            <label className="itemResult">State remarks:</label>
            <textarea
              className="remarkText rounded"
              name="remarks"
              value={state.remarks}
              placeholder="Write here.."
              // onChange={(e) => changeHandler(e)}
            />

            {
              <p style={{ color: "red" }}>Please add your remarks</p>
            }
        
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
                            // onClick={submitHandler}
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
    </Fragment>
  );
};

export default PromotionInitiate;
