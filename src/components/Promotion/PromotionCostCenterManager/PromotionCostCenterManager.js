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
import { AppContext } from "../../../context/AppState";

const PromotionCostCenterManager = (props) => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();
  const [reject,setReject] = useState(false)
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AppContext);

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
    promotionLetter: "",
    reason: "",
    relocationBonus: 0,
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
    approvePromotion,
    rejectPromotion,
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
        effectiveDate: promotionByEmployee["effectiveDate"],
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
        status: promotionByEmployee["status"],
      });
    }
  }, [promotionByEmployee]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (user !== null && user !== undefined && user.role === "ADMIN") {
      approvePromotion(state.promotionId, 1);
    } else if (
      user !== null &&
      user !== undefined &&
      user.role === "COST_CENTER_MANAGER"
    ) {
      approvePromotion(state.promotionId, 2);
    }
  };
 const  cancelHandler = (e)=>{
  setReject(false)
 }
  const rejectReasonHandler = (e)=>{
    e.preventDefault();
    console.log(state,"state")
       // rejectPromotion(state.promotionId, state.remarks);
  }
  const rejectHandler = (e) => {
    e.preventDefault();
    if(e.target.name == "reject"){
      setReject(true)
    }
  };
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
                          marginBottom: "1rem",
                        }}
                      >
                       
                        <Col sm={3}>
                          <div>
                            <label>
                              Fixed Gross:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.oldFixedGross}
                              </label>
                            </label>
                          </div>
                        </Col>
                        {state.promotionType == 1?<> <Col sm={4}>
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
                      {/* <Row
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
                      </Row> */}
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
                              {" "}
                              Effective Date :
                              <label className="itemResult">
                                &nbsp;&nbsp;{state.effectiveDate}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label>
                              Relocation Bonus:
                              <label className="itemResult">
                                &nbsp;&nbsp;{state.relocationBonus}
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
                      {reject?<>
                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={2}>
                            <label>Reason For Rejection:</label>
                          </Col>
                          <Col sm={8}>
                            <Form.Control
                              style={
                               { borderRadius: "5px" }
                              }
                              as="textarea"
                              rows={4}
                              name="remarks"
                              value={state.remarks}
                              placeholder="Write here.."
                              onChange={(e) => changeHandler(e)}
                              required
                            />

                            {/* {reasonError ? (
                              <p style={{ color: "red" }}>{reasonError}</p>
                            ) : (
                              ""
                            )} */}
                          </Col>
                        </Row>

                        <Row 
                         style={{
                              marginTop: "2rem",
                              marginBottom: "2rem",
                              textAlign: "center",
                            }}>
                          <Col>
                            <button
                              className={
                                submitted ? "confirmButton" : "stepperButtons"
                              }
                              onClick={rejectReasonHandler}
                            >
                              Submit
                            </button>
                          </Col>
                          <Col  
                          >
                            <button
                              className={
                                submitted ? "confirmButton" : "stepperButtons"
                              }
                              onClick={cancelHandler}
                            >
                              Cancel
                            </button>
                          </Col>
                        </Row>
                      </>:
                      <Row>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            marginLeft: "4rem",
                            textAlign: "center",
                          }}
                        >
                          <button
                            className={
                              submitted ? "confirmButton" : "stepperButtons"
                            }
                            onClick={submitHandler}
                          >
                            Approve
                          </button>
                        </Col>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            marginRight: "4rem",

                            textAlign: "center",
                          }}
                        >
                          <button
                          name="reject"
                            className={
                              submitted ? "confirmButton" : "stepperButtons"
                            }
                            onClick={rejectHandler}
                          >
                            Reject
                          </button>
                        </Col>
                      </Row>}
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

export default PromotionCostCenterManager;
