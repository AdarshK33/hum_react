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
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { set } from "js-cookie";
import { AppContext } from "../../../context/AppState";

const PromotionApproval = (props) => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();
  const [reject, setReject] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AppContext);
  const [modelStatus, setModelStatus] = useState(false);
  const [modelStatusReject, setModelStatusReject] = useState(false);

  const [state, setState] = useState({
    validatedAdminId: "",
    validatedAdminName: "",
    validatedManagerId: "",
    validatedManagerName: "",
    managerValidatedDate: "",
    adminValidatedDate: "",
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
    promotionType: 0,
    reason: "",
    relocationBonus: 0,
    remarks: "",
    salaryEffectiveDate: "",
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
  const { rolePermission } = useContext(PermissionContext);
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
    if (
      promotionIdData !== null &&
      promotionIdData !== undefined &&
      Object.keys(promotionIdData).length !== 0 &&
      promotionIdData.department !== null &&
      promotionIdData.department !== undefined
    ) {
      PositionNew(promotionIdData.departmentId);
    }
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
        validatedManagerId: promotionIdData["validatedManagerId"],
        validatedManagerName: promotionIdData["validatedManagerName"],
        managerValidatedDate: promotionIdData["managerValidatedDate"],
        adminValidatedDate: promotionIdData["adminValidatedDate"],
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
        promotionType: promotionIdData["promotionType"],
        reason: promotionIdData["reason"],
        relocationBonus: promotionIdData["relocationBonus"],
        remarks: promotionIdData["remarks"],
        salaryEffectiveDate: promotionIdData["salaryEffectiveDate"],
        status: promotionIdData["status"],
      });
    }
  }, [promotionIdData]);
  console.log(state,"state1")

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (user !== null && user !== undefined && rolePermission == "admin") {
      approvePromotion(state.promotionId, 1);
      setModelStatus(true);
    } else if (
      user !== null &&
      user !== undefined &&
      rolePermission == "costCenterManager"
    ) {
      approvePromotion(state.promotionId, 2);
      setModelStatus(true);
    }
  };
  const cancelHandler = (e) => {
    setReject(false);
  };
  const rejectReasonHandler = (e) => {
    e.preventDefault();
    console.log(state, "state");
    rejectPromotion(state.promotionId, state.remarks);
    setModelStatusReject(true);
    setSubmitted(true);
  };
  const rejectHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "reject") {
      setReject(true);
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
  const handleCloseValue = () => {
    setModelStatus(false);
    setModelStatusReject(false);
  };
  return (
    <React.Fragment>
      <div>
        <ToastContainer />
        <Modal show={modelStatus} onHide={handleCloseValue} size="md" centered>
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {user !== null && user !== undefined && rolePermission == "admin"
                ? "Promotion details saved successfully, request sent to the manager"
                : user !== null &&
                  user !== undefined &&
                  rolePermission == "costCenterManager"
                ? "Promotion confirmed successfully, request sent to Admin"
                : ""}
            </label>
            <div className="text-center mb-2">
              <Link to={"/promotion-list"}>
                <Button onClick={handleCloseValue}>Close</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={modelStatusReject}
          onHide={handleCloseValue}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Promotion rejected,the Manager/Admin has been
              notified
            </label>
            <div className="text-center mb-2">
              <Link to={"/promotion-list"}>
                <Button onClick={handleCloseValue}>Close</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>

        <Breadcrumb title="PROMOTION APPROVAL" parent="PROMOTION APPROVAL" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div>
                  <div className="OnBoardHeading">
                    <b> PROMOTION APPROVAL </b>
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
                                <label>Emp Name/Id:</label>
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
                                <label>Cost Center Name:</label>
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
                                <label>Position:</label>
                              </div>
                            </Col>
                            <Col sm={4}>
                              <div>
                                <label className="itemResult">
                                  {state.oldPosition}
                                </label>
                              </div>
                            </Col>
                          </>{" "}
                          <>
                            <Col sm={2}>
                              <div>
                                <label>Department:</label>
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
                                <label>New Position :</label>
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
                                <label>New Department:</label>
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
                                <label>Reporting Manager:</label>
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
                                <label>Current Manager:</label>
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
                                    promotionIdData.promotionType == 1
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
                                    promotionIdData.promotionType == 0
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
                          <>
                            <Col sm={2}>
                              <div>
                                <label>
                                  Fixed Gross{" "}
                                  {`${
                                    state.contractType == "parttime" ||
                                    state.contractType == "Parttime"
                                      ? "(per/hr)"
                                      : ""
                                  }`}
                                  :
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
                          state.promotionType == 1 ? (
                            <>
                              <>
                                <Col sm={2}>
                                  <div>
                                    <label>
                                      New Fixed Gross{" "}
                                      {`${
                                        state.contractType == "parttime" ||
                                        state.contractType == "Parttime"
                                          ? "(per/hr)"
                                          : ""
                                      }`}
                                      :
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
                                {/* <Col sm={2}>
                                  <div>
                                    <label>Salary Effective Date :</label>
                                  </div>
                                </Col>
                                <Col sm={2}>
                                  <div>
                                    <label className="itemResult">
                                      {state.salaryEffectiveDate}
                                    </label>
                                  </div>
                                </Col> */}
                              </>
                            </>
                          ) : (
                            ""
                          )}
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
                                <label>Relocation Bonus:</label>
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
                                <label>Effective Date :</label>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div>
                                <label className="itemResult">
                                  {state.effectiveDate !== null && state.effectiveDate !== undefined && state.effectiveDate !== ""
                                  ?moment(state.effectiveDate).format("DD-MM-YYYY"):""}
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
                                <label>Validated by Costcenter Leader:</label>
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
                                <label>Date:</label>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div>
                                <label className="itemResult">
                                  {state.managerValidatedDate !== null && state.managerValidatedDate !== undefined && state.managerValidatedDate !== ""
                                  ?moment(state.managerValidatedDate).format("DD-MM-YYYY"):""}
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
                                <label>Validated by Admin:</label>
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
                          <>
                            <Col sm={2}>
                              <div>
                                <label>Date:</label>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div>
                                <label className="itemResult">
                                  {state.adminValidatedDate !== null && state.adminValidatedDate !== undefined && state.adminValidatedDate !== ""
                                  ?moment(state.adminValidatedDate).format("DD-MM-YYYY"):""}
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
                        {reject ? (
                          <>
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
                                  style={{ borderRadius: "5px" }}
                                  as="textarea"
                                  rows={4}
                                  name="remarks"
                                  value={state.remarks}
                                  placeholder="Write here.."
                                  onChange={(e) => changeHandler(e)}
                                  required
                                />
                              </Col>
                            </Row>

                            <Row
                              style={{
                                marginBottom: "2rem",
                                textAlign: "center",
                              }}
                            >
                              <Col sm={4}></Col>
                              <Col sm={2}>
                                <button
                                  disabled={submitted}
                                  className={
                                    submitted
                                      ? "confirmButton"
                                      : "stepperButtons"
                                  }
                                  onClick={rejectReasonHandler}
                                >
                                  Submit
                                </button>
                              </Col>
                              <Col sm={2}>
                                <button
                                  disabled={submitted}
                                  className={
                                    submitted
                                      ? "confirmButton"
                                      : "stepperButtons"
                                  }
                                  onClick={cancelHandler}
                                >
                                  Cancel
                                </button>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <Row
                            style={{
                              marginBottom: "2rem",
                              textAlign: "center",
                            }}
                          >
                            <Col sm={4}></Col>
                            <Col sm={2}>
                              <button
                                disabled={submitted}
                                className={
                                  submitted ? "confirmButton" : "stepperButtons"
                                }
                                onClick={submitHandler}
                              >
                                Approve
                              </button>
                            </Col>
                            <Col sm={2}>
                              <button
                                disabled={submitted}
                                name="reject"
                                className={
                                  submitted ? "confirmButton" : "stepperButtons"
                                }
                                onClick={rejectHandler}
                              >
                                Reject
                              </button>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PromotionApproval;
