import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { OfferContext } from "../../../context/OfferState";
import { SeparationContext } from "../../../context/SepearationState";

import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import { PromotionContext } from "../../../context/PromotionState";
import { PermissionContext } from "../../../context/PermissionState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { set } from "js-cookie";

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
  const {
    promotionIdData,
    ViewPromotionById,
    loader,
    total,
    PositionNew,
    positionNew,
    promotionByEmployee,
  } = useContext(PromotionContext);
  useEffect(() => {
    PositionNew();
    departmentView();
  }, []);

  useEffect(() => {
    console.log(promotionIdData, "promotionIdData");
    if (
      promotionIdData !== null &&
      promotionIdData !== undefined &&
      Object.keys(promotionIdData).length !== 0
    ) {
      setState({
        validatedAdminId: promotionIdData["validatedAdminId"],
        validatedAdminName: promotionIdData["validatedAdminName"],
        validatedManagerId:promotionIdData["validatedManagerId"],
        validatedManagerName:promotionIdData["validatedManagerName"],
        bonus: promotionIdData["bonus"],
        bonusInPercentage: promotionIdData["bonusInPercentage"],
        costCentre: promotionIdData["costCentre"],
        costCentreManagerEmail: promotionIdData["costCentreManagerEmail"],
        costCentreManagerId: promotionIdData["costCentreManagerId"],
        costCentreManagerName: promotionIdData["costCentreManagerName"],
        departmentId: promotionIdData["departmentId"],
        reportingManagerId: promotionIdData["reportingManagerId"],
        reportingManagerName: promotionIdData["reportingManagerName"],
        effectiveDate: promotionIdData["effectiveDate"],
        emailId: promotionIdData["emailId"],
        empName: promotionIdData["empName"],
        employeeId: promotionIdData["employeeId"],
        currentManagerId: promotionIdData["currentManagerId"],
        currentManagerName: promotionIdData["currentManagerName"],
        contractType: promotionIdData["contractType"],
        newDepartment: promotionIdData["newDepartment"],
        newFixedGross: promotionIdData["newFixedGross"],
        oldDepartment: promotionIdData["oldDepartment"],
        oldFixedGross: promotionIdData["oldFixedGross"],
        oldPosition: promotionIdData["oldPosition"],
        positionId: promotionIdData["positionId"],
        promotedPosition: promotionIdData["promotedPosition"],
        promotionId: promotionIdData["promotionId"],
        promotionLetter: promotionIdData["promotionLetter"],
        reason: promotionIdData["reason"],
        relocationBonus: promotionIdData["relocationBonus"],
        remarks: promotionIdData["remarks"],
        salaryEffectiveDate:promotionIdData["salaryEffectiveDate"],
        status: promotionIdData["status"],
      });
    }
  }, [promotionIdData]);

  const changeHandler = (e) => {
    if (e.target.name === "empName") {
      setEmpName(e.target.value);
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
          });
        }
      });
      console.log(e.target.value, state, "value666");
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    console.log(state, "state");
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
                          <Col sm={4}>
                          <div>
                              <label className="itemResult">
                                {state.empName}
                              </label>
                          </div>
                          </Col>
                          </>
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Cost Center Name:                            
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
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
                            Position:
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
                          <div>
                              <label className="itemResult">
                                {state.oldPosition}
                              </label>
                          </div>
                          </Col>
                          </> <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Department:                            
                            </label>
                          </div>
                          </Col>
                          <Col sm={4}>
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
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                         <>
                        <Col sm={2}>
                          <div>
                            <label>
                            New Position :
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
                            New Department:
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
                            Reporting Manager:
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
                     
                        <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Current Manager:
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
                          <Col sm={4}>
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
                                  disabled={true}
                                  checked={
                                    promotionIdData !== null &&
                                    promotionIdData !== undefined &&
                                    promotionIdData.promotionType === 1
                                      ? true
                                      : false
                                  }
                                  style={{ borderColor: "blue" }}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.25rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  disabled={true}
                                  checked={
                                    promotionIdData !== null &&
                                    promotionIdData !== undefined &&
                                    promotionIdData.promotionType === 0
                                      ? true
                                      : false
                                  }
                                  style={{ borderColor: "blue" }}
                                />
                                <label className="itemResult">No</label>
                              </div>
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
                         <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Fixed Gross {`${(state.contractType =="parttime" ||state.contractType =="Parttime")?"(per/hr)":''}`}:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.oldFixedGross}
                              </label>
                          </div>
                          </Col>
                          </>      
                  
                        {promotionIdData !== null &&
                          promotionIdData !== undefined &&
                          promotionIdData.promotionType === 1
                        ?<>
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            New Fixed Gross {`${(state.contractType =="parttime" ||state.contractType =="Parttime")?"(per/hr)":''}`}:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.newFixedGross}
                              </label>
                          </div>
                          </Col>
                          </>      
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Salary Effective Date :
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.salaryEffectiveDate}
                              </label>
                          </div>
                          </Col>
                          </>      
                            </>:''}
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
                            Relocation Bonus:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.relocationBonus}
                              </label>
                          </div>
                          </Col>
                          </>      
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Effective Date :
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.effectiveDate}
                              </label>
                          </div>
                          </Col>
                          </>      
                      
                      </Row>

                        <>
                       {state.remarks && state.validatedAdminName && state.validatedManagerName?
                       <>

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
                            Validated By:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.validatedManagerName}
                              </label>
                          </div>
                          </Col>
                          </>      
                          <>
                        <Col sm={2}>
                          <div>
                            <label>
                            Rejected By:
                            </label>
                          </div>
                          </Col>
                          <Col sm={2}>
                          <div>
                              <label className="itemResult">
                                {state.validatedAdminName}
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
                        <Col sm={3}>
                          <div>
                            <label>
                            Reason For Rejection:
                            </label>
                          </div>
                          </Col>
                          <Col sm={7}>
                          <div>
                              <label className="itemResult">
                                {state.remarks}
                              </label>
                          </div>
                          </Col>
                          </>    
                          </Row>    
                        </>
                       :state.remarks && state.validatedManagerName?
                       <>
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
                           Rejected By:
                           </label>
                         </div>
                         </Col>
                         <Col sm={2}>
                         <div>
                             <label className="itemResult">
                               {state.validatedAdminName}
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
                       <Col sm={3}>
                         <div>
                           <label>
                           Reason For Rejection:
                           </label>
                         </div>
                         </Col>
                         <Col sm={7}>
                         <div>
                             <label className="itemResult">
                               {state.remarks}
                             </label>
                         </div>
                         </Col>
                         </>
                         </Row>
                         </>
                       :<>
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
                             Validated By:
                             </label>
                           </div>
                           </Col>
                           <Col sm={2}>
                           <div>
                               <label className="itemResult">
                                 {state.validatedManagerName}
                               </label>
                           </div>
                           </Col>
                           </>      
                           <>
                         <Col sm={2}>
                           <div>
                             <label>
                             Validated By:
                             </label>
                           </div>
                           </Col>
                           <Col sm={2}>
                           <div>
                               <label className="itemResult">
                                 {state.validatedAdminName}
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
                         <Col sm={3}>
                           <div>
                             <label>
                             Reason For Promotion:
                             </label>
                           </div>
                           </Col>
                           <Col sm={7}>
                           <div>
                               <label className="itemResult">
                                 {state.reason}
                               </label>
                           </div>
                           </Col>
                           </>    
                           </Row>    
                         </>
                      //  <>
                      //     <Row
                      //   style={{
                      //     marginLeft: "2rem",
                      //     marginTop: "1rem",
                      //     marginBottom: "3rem",
                      //   }}
                      // >
                      //  <Col sm={3}>
                      //    <div>
                      //      <label>
                      //      Reason For Promotion:
                      //      </label>
                      //    </div>
                      //    </Col>
                      //    <Col sm={7}>
                      //    <div>
                      //        <label className="itemResult">
                      //          {state.reason}
                      //        </label>
                      //    </div>
                      //    </Col>
                      //    </Row>
                      //    </>        
                     }
                     </>
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
