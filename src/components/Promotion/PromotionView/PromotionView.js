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

const PromotionView = (props) => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();

  const [state, setState] = useState({
    validatedByAdminName: "",
    validatedByCostCentreManagerName: "",
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
    managerId: "",
    managerName: "",
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
        validatedByAdminName: promotionIdData["validatedByAdminName"],
        validatedByCostCentreManagerName:
          promotionIdData["validatedByCostCentreManagerName"],
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
        managerId: promotionIdData["managerId"],
        managerName: promotionIdData["managerName"],
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
      <Breadcrumb title="PROMOTION VIEW" parent="PROMOTION VIEW" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>PROMOTION VIEW </b>
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
                        <Col sm={6}>
                          <div>
                            <label>
                              Emp Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empName}
                              </label>
                            </label>
                          </div>
                        </Col>
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
                                &nbsp;&nbsp; {state.oldPosition}
                              </label>
                            </label>
                          </div>
                        </Col>

                        <Col sm={6}>
                          <div>
                            <label>
                              Department:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.oldDepartment}
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
                              New Position :
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.promotedPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                      
                        <Col sm={6}>
                          <div>
                            <label>
                              New Department:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.newDepartment}
                              </label>
                            </label>
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
                     <Col sm={4}>
                          <div>
                            <label>
                              Fixed Gross:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.oldFixedGross}
                              </label>
                            </label>
                          </div>
                        </Col>
                        {promotionIdData !== null &&
                          promotionIdData !== undefined &&
                          promotionIdData.promotionType === 1
                        ?<><Col sm={4}>
                          <div>
                            <label>
                              New Fixed Gross:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.newFixedGross}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              {" "}
                             Salary Effective Date :
                              <label className="itemResult">
                                &nbsp;&nbsp;{state.salaryEffectiveDate}
                              </label>
                            </label>
                          </div>
                        </Col></>:''}
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
                              Relocation Bonus:
                              <label className="itemResult">
                                &nbsp;&nbsp;{state.relocationBonus}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              {" "}
                              Effective Date :
                              <label className="itemResult">
                                &nbsp;&nbsp;{state.effectiveDate}
                              </label>
                            </label>
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
                       {state.remarks && state.validatedByAdminName && state.validatedByCostCentreManagerName?
                       <>
                                           <Col sm={4}>
                                           <div>
                                                <label>
                                                  Approved By:
                                                  <label className="itemResult">
                                                    &nbsp;&nbsp; {state.validatedByCostCentreManagerName}
                                                  </label>
                                                </label>
                                                </div>
                                           </Col>
                                           <Col sm={4}>
                                           <div>
                                                <label>
                                                  Rejected By:
                                                  <label className="itemResult">
                                                    &nbsp;&nbsp; {state.validatedByAdminName}
                                                  </label>
                                                </label>
                                                </div>
                                           </Col>
                                           <Col sm={10}>
                                              <div>
                                                <label>
                                                  Reason For Rejection:
                                                  <label className="itemResult">
                                                    &nbsp;&nbsp; {state.remarks}
                                                  </label>
                                                </label>
                                              </div>
                                            </Col></>
                       :state.remarks && state.validatedByAdminName?
                       <>
                                           <Col>
                                           <div>
                                                <label>
                                                  Rejected By:
                                                  <label className="itemResult">
                                                    &nbsp;&nbsp; {state.validatedByAdminName}
                                                  </label>
                                                </label>
                                                </div>
                                           </Col>
                                           <Col sm={10}>
                                              <div>
                                                <label>
                                                  Reason For Rejection:
                                                  <label className="itemResult">
                                                    &nbsp;&nbsp; {state.remarks}
                                                  </label>
                                                </label>
                                              </div>
                                            </Col></>
                       :
                       <Col sm={10}>
                          <div>
                            <label>
                              Reason For Promotion:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.reason}
                              </label>
                            </label>
                          </div>
                        </Col>}
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

export default PromotionView;
