import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { OfferContext } from "../../../context/OfferState";
import { SeparationContext } from "../../../context/SepearationState";

import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { set } from "js-cookie";
import "../Disciplinary.css"
const ManagerWarningAction = (props) => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();

  const [state, setState] = useState({
    validatedAdminId: "",
    validatedAdminName: "",
    validatedManagerId: "",
    validatedManagerName: "",
    bonus: 0,
    bonusInPercentage: 0,
    costCentre: "",
    costCentreManagerEmail: "",
    costCentreManagerId: "",
    costCentreManagerName: "",
    departmentId: 0,
    reportingManagerId: "",
    reportingManagerName: "",
    effectiveDate: "",
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
    positionId: 0,
    promotedPosition: "",
    promotionId: 0,
    promotionLetter: "",
    reason: "",
    relocationBonus: 0,
    remarks: "",
    salaryEffectiveDate:"",
    status: 0,
  });
  const [stateError, setStateError] = useState({
    empNameError: "",
    departmentIdError: "",
    positionIdError: "",
    costCentreError: "",
    newFixedGrossError: "",
    oldPositionError: "",
    positionIdError: "",
    reasonError: "",
    relocationBonusError: "",
  });

  const { departmentView, departmentName } = useContext(OfferContext);
  const {disciplinaryEmployeeSearch,disciplinarySearchData} = useContext(DisciplinaryContext);
  useEffect(() => {
    disciplinaryEmployeeSearch()
  }, []);

  // useEffect(() => {
  //   console.log(promotionIdData, "promotionIdData");
  //   if (
  //     promotionIdData !== null &&
  //     promotionIdData !== undefined &&
  //     Object.keys(promotionIdData).length !== 0
  //   ) {
  //     setState({
      
  //     });
  //   }
  // }, [promotionIdData]);

  const changeHandler = (e) => {
    //if (e.target.name === "empName") {
    //   setEmpName(e.target.value);
    // } else if (e.target.name === "departmentId") {
    //   let value = departmentName.filter(
    //     (item) => item.departmentName === e.target.value
    //   );
    //   console.log(e.target.value, value, state, "department1");
    //   setDepartmentNew(e.target.value);
    //   setState({
    //     ...state,
    //     newDepartment: value[0].departmentName,
    //     departmentId: value[0].deptId,
    //   });
    //   console.log(e.target.value, value, state, "department2");
    // } else if (e.target.name === "positionId") {
    //   positionNew.map((item) => {
    //     if (item.position === e.target.value) {
    //       setPosition(e.target.value);
    //       setState({
    //         ...state,
    //         positionId: item.positionId,
    //       });
    //     }
    //   });
    //   console.log(e.target.value, state, "value666");
    // } else {
    //   setState({
    //     ...state,
    //     [e.target.name]: e.target.value,
    //   });
    // }
    // console.log(state, "state");
  };
  return (
    <div>
      <Breadcrumb title="DISCIPLINARY ACTION" parent="DISCIPLINARY ACTION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>DISCIPLINARY ACTION </b>
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
                        <>
                        <Col sm={2}>
                          <div>
                            <label>
                              Emp Name/Id:
                             
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.empName}
                              </label>
                          </div>
                          </Col>
                          </>
                          <>
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Contract Type:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.oldPosition}
                              </label>
                          </div>
                          </Col>
                          </>
                        <Col sm={2}>
                          <div>
                            <label>
                            Cost Center Name:                            
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.costCentre}
                              </label>
                          </div>
                          </Col>
                          </>
                    
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                         <>
                         <Col sm={2}>
                          <div>
                            <label>
                            Address:                            
                            </label>
                          </div>
                          </Col>
                          <Col sm={6}>
                          <div>
                              <label className="itemResult">
                                {state.oldDepartment}
                              </label>
                          </div>
                          </Col>
                        <Col sm={2}>
                          <div>
                            <label>
                            Designation:                            
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.oldDepartment}
                              </label>
                          </div>
                          </Col>
                          </>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <>
                        <Col sm={2}>
                          <div>
                            <label>
                              Manager Name & manager ID:
                             
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.empName}
                              </label>
                          </div>
                          </Col>
                          </>
                          <>
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Designation:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.oldPosition}
                              </label>
                          </div>
                          </Col>
                          </>
                        <Col sm={2}>
                          <div>
                            <label>
                            Cost Center Name:                            
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.costCentre}
                              </label>
                          </div>
                          </Col>
                          </>
                    
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                         <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Issue Show Case Notice for :
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
                          <div>
                              <label className="itemResult">
                                {state.promotedPosition}
                              </label>
                          </div>
                          </Col>
                          </>
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Reason for Show Case Notice:
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
                          <div>
                              <label className="itemResult">
                                {state.newDepartment}
                              </label>
                          </div>
                          </Col>
                          </>
                        </Row>
                        <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            State Reason Show Case Notice:
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
                          <div>
                              <label className="itemResult">
                                {state.reportingManagerName}
                              </label>
                          </div>
                          </Col>
                          </>
                     </Row>
                     <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >  
                        <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Preview Show Case Notice:
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
                          <div>
                              <label className="itemResult">
                                {state.currentManagerName}
                              </label>
                          </div>
                          </Col>
                          </>
                      </Row>
                       
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >  
                         <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Add Remarks
                            </label>
                          </div>
                          </Col>
                          <Col sm={10}>
                          <div>
                              <label className="itemResult">
                                {state.oldFixedGross}
                              </label>
                          </div>
                          </Col>
                          </>      
                  
                      </Row>
                     
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                           <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Issue Warning Letter:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <label class="switch">
                      	<input class="switch-input" type="checkbox" />
                      	<span class="switch-label" data-on="Yes" data-off="No"></span> 
                      	<span class="switch-handle"></span> 
                                    </label>
                          </Col>
                          </>       
                      
                      </Row>

                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                         <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Reason for Warning :
                            </label>
                          </div>
                          </Col>
                          <Col sm={3}>
                          <Form.Group>
                              <Form.Control
                                as="select"
                                name="positionId"
                                defaultValue={position}
                                style={
                                  
                                  { borderRadius: "5px" }
                                }
                                // onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Position</option>
                                {[] !== null &&
                                  [] !== undefined &&
                                  [].length > 0 &&
                                  [].map((item, index) => {
                                    return (
                                      <option key={index + 1}>
                                        {item.position}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {'' ? (
                                <p style={{ color: "red" }}>
                                  {''}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                          </>
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Performance Improvement period:
                            </label>
                          </div>
                          </Col>
                          <Col sm={3}>
                          <Form.Group>
                              <Form.Control
                                as="select"
                                name="positionId"
                                defaultValue={position}
                                style={
                                 { borderRadius: "5px" }
                                }
                                onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Position</option>
                                {[] !== null &&
                                  [] !== undefined &&
                                  [].length > 0 &&
                                  [].map((item, index) => {
                                    return (
                                      <option key={index + 1}>
                                        {item.position}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {'' ? (
                                <p style={{ color: "red" }}>
                                  {''}
                                </p>
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </Col>
                          </>
                        </Row>
                       <Row
                         style={{
                           marginLeft: "2rem",
                           marginTop: "1rem",
                           marginBottom: "3rem",
                         }}
                       >
                           <>
                         <Col sm={3}>
                           <div>
                             <label>
                             State detailed reason :
                             </label>
                           </div>
                           </Col>
                           <Col sm={7}>
                           <Form.Control
                              style={
                             
                                   { borderRadius: "5px" }
                              }
                              as="textarea"
                              rows={4}
                              name="reason"
                              value={state.reason}
                              placeholder="Write here.."
                              onChange={(e) => changeHandler(e)}
                              required
                            />
                           </Col>
                           </>    
                           </Row>    
                           <Row
                         style={{
                           marginLeft: "2rem",
                           marginTop: "1rem",
                           marginBottom: "3rem",
                         }}
                       >
                           <>
                         <Col sm={6}>
                         <button
                              style={{float:"right"}}    className={"stepperButtons"}
                                >
                                  Save
                                </button>
                           </Col>
                           <Col sm={6}>
                           <button
                                  className={"LettersProbButtons"}
                                >
                                  Preview Promotion Letter
                                </button>
                           </Col>
                           </>    
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

export default ManagerWarningAction;
