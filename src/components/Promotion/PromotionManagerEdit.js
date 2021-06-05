import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { OfferContext } from "../../context/OfferState";
import { SeparationContext } from "../../context/SepearationState";

import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { PromotionContext } from "../../context/PromotionState";
import { PermissionContext } from "../../context/PermissionState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { set } from "js-cookie";

const PromotionCostCenterManagerEdit = (props) => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();
  const [submitted, setSubmitted] = useState(false);

  const [state, setState] = useState({
    approveByAdminName: "",
    approveByCostCentreManagerName: "",
    bonus: 0,
    bonusInPercentage: 0,
    costCentre: "",
    costCentreManagerEmail: "",
    costCentreManagerId: "",
    costCentreManagerName: "",
    departmentId: 0,
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
    promotionType: 0,
    promotionLetter: "",
    reason: "",
    relocationBonus: 0,
    salaryEffectiveDate: 0,
    remarks: "",
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
    PromotionCreate,
  } = useContext(PromotionContext);
  useEffect(() => {
    PositionNew();
    departmentView();
  }, []);

  useEffect(() => {
    var id = props.history.location.pathname;

    console.log(id, id.slice(id.length - 1), "id");
    ViewPromotionById(id.slice(id.length - 1));
  }, []);
  useEffect(() => {
    console.log(promotionByEmployee, "promotionByEmployee");
    if (
      promotionByEmployee !== null &&
      promotionByEmployee !== undefined &&
      Object.keys(promotionByEmployee).length !== 0
    ) {
      setState({
        approveByAdminName: promotionByEmployee["approveByAdminName"],
        approveByCostCentreManagerName:
          promotionByEmployee["approveByCostCentreManagerName"],
        bonus: promotionByEmployee["bonus"],
        bonusInPercentage: promotionByEmployee["bonusInPercentage"],
        costCentre: promotionByEmployee["costCentre"],
        costCentreManagerEmail: promotionByEmployee["costCentreManagerEmail"],
        costCentreManagerId: promotionByEmployee["costCentreManagerId"],
        costCentreManagerName: promotionByEmployee["costCentreManagerName"],
        departmentId: promotionByEmployee["departmentId"],
        effectiveDate:
          promotionByEmployee["effectiveDate"] !== null
            ? new Date(promotionByEmployee["effectiveDate"])
            : "",
        emailId: promotionByEmployee["emailId"],
        empName: promotionByEmployee["empName"],
        employeeId: promotionByEmployee["employeeId"],
        managerId: promotionByEmployee["managerId"],
        managerName: promotionByEmployee["managerName"],
        newDepartment: promotionByEmployee["newDepartment"],
        newFixedGross: promotionByEmployee["newFixedGross"],
        oldDepartment: promotionByEmployee["oldDepartment"],
        oldFixedGross: promotionByEmployee["oldFixedGross"],
        oldPosition: promotionByEmployee["oldPosition"],
        positionId: promotionByEmployee["positionId"],
        promotedPosition: promotionByEmployee["promotedPosition"],
        promotionId: promotionByEmployee["promotionId"],
        promotionLetter: promotionByEmployee["promotionLetter"],
        reason: promotionByEmployee["reason"],
        relocationBonus: promotionByEmployee["relocationBonus"],
        remarks: promotionByEmployee["remarks"],
        salaryEffectiveDate:
          promotionByEmployee["salaryEffectiveDate"] !== null
            ? new Date(promotionByEmployee["salaryEffectiveDate"])
            : "",
        promotionType: promotionByEmployee["promotionType"],
        status: promotionByEmployee["status"],
      });
    }
  }, [promotionByEmployee]);

  const effectiveHandler = (e) => {
    console.log("ChangeHandler", e);
    state.effectiveDate = e;
  };

  const salaryeEffectiveHandler = (e) => {
    console.log("ChangeHandler", e);
    state.salaryEffectiveDate = e;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const infoData = {
      approveByAdminName: null,
      approveByCostCentreManagerName: null,
      bonus: 0,
      bonusInPercentage: 0,
      costCentre: state.costCentre,
      costCentreManagerEmail: null,
      costCentreManagerId: null,
      costCentreManagerName: null,
      departmentId: state.departmentId,
      effectiveDate: state.effectiveDate,
      emailId: null,
      empName: state.empName,
      employeeId: state.employeeId,
      managerId: promotionByEmployee["managerId"],
      managerName: promotionByEmployee["managerName"],
      newDepartment: state.newDepartment,
      newFixedGross: state.newFixedGross,
      oldDepartment: state.oldDepartment,
      oldFixedGross: state.oldFixedGross,
      oldPosition: state.oldPosition,
      positionId: state.positionId,
      promotedPosition: state.promotedPosition,
      promotionId: state.promotionId,
      promotionLetter: null,
      reason: state.reason,
      relocationBonus: state.relocationBonus,
      salaryEffectiveDate: state.salaryEffectiveDate,
      promotionType: state.promotionType,
      remarks: null,
      status: 0,
    };
    PromotionCreate(infoData);
    setSubmitted(true);
    console.log("all okay", infoData);
  };

  return (
    <div>
      <Breadcrumb title="PROMOTION APPROVAL" parent="PROMOTION APPROVAL" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>COST CENTER MANAGER PROMOTION APPROVAL </b>
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
                              Fixed Gross:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.oldFixedGross}
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
                          <div>
                            <label>
                              New Department:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.newDepartment}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label>
                              New Fixed Gross:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.newFixedGross}
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
                        <Col sm={5}>
                          <label>
                            Is this employee is applicable for promotion and
                            hike{" "}
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
                                  promotionByEmployee.promotionType === 1
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
                                value="yes"
                                disabled={true}
                                checked={
                                  promotionByEmployee.promotionType === 0
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
                          marginBottom: "2rem",
                        }}
                      >
                        {promotionByEmployee !== null &&
                        promotionByEmployee !== undefined &&
                        promotionByEmployee.promotionType == 0 ? (
                          <React.Fragment>
                            <Col sm={3}>
                              <div>
                                <label>Effective Date :</label>
                              </div>
                            </Col>

                            <Col sm={3}>
                              <div>
                                <Form.Group>
                                  <div className={""}>
                                    <DatePicker
                                      className="form-control onBoard-view"
                                      selected={state.effectiveDate}
                                      name="effectiveDate"
                                      required
                                      onChange={(e) => effectiveHandler(e)}
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
                                <label>Salary Effective Date :</label>
                              </div>
                            </Col>

                            <Col sm={3}>
                              <div>
                                <Form.Group>
                                  <div className={""}>
                                    <DatePicker
                                      className="form-control onBoard-view"
                                      selected={state.salaryEffectiveDate}
                                      name="salaryEffectiveDate"
                                      required
                                      onChange={(e) =>
                                        salaryeEffectiveHandler(e)
                                      }
                                      dateFormat="yyyy-MM-dd"
                                      placeholderText="YYYY-MM-DD"
                                      minDate={new Date()}
                                    />
                                  </div>
                                </Form.Group>
                              </div>
                            </Col>
                          </React.Fragment>
                        ) : promotionByEmployee !== null &&
                          promotionByEmployee !== undefined &&
                          promotionByEmployee.promotionType === 1 ? (
                          <React.Fragment>
                            <Col sm={3}>
                              <div>
                                <label>Effective Date :</label>
                              </div>
                            </Col>

                            <Col sm={3}>
                              <div>
                                <Form.Group>
                                  <div className={""}>
                                    <DatePicker
                                      className="form-control onBoard-view"
                                      selected={state.effectiveDate}
                                      name="effectiveDate"
                                      required
                                      onChange={(e) => effectiveHandler(e)}
                                      dateFormat="yyyy-MM-dd"
                                      placeholderText="YYYY-MM-DD"
                                      minDate={new Date()}
                                    />
                                  </div>
                                </Form.Group>
                              </div>
                            </Col>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                        <Col sm={2}>
                          <div>
                            <label>Relocation Bonus:</label>
                          </div>
                        </Col>
                        <Col sm={3}>
                          <div>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.relocationBonus}
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
                        <Col sm={10}>
                          <div>
                            <label>
                              Reason For Promotion:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.reason}
                              </label>
                            </label>
                          </div>
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCostCenterManagerEdit;
