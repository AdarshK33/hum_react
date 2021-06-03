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

const PromotionInitiate = () => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();

  const [state, setState] = useState({
    approveByAdminName: "",
    approveByCostCentreManagerName: "",
    bonus: 0,
    bonusInPercentage: 0,
    costCentre: "",
    costCentreManagerEmail: "",
    costCentreManagerId: "",
    costCentreManagerName: "",
    departmentId: "",
    effectiveDate: "",
    emailId: "",
    empName: "",
    employeeId: "",
    managerId: "",
    managerName: "",
    newDepartment: "",
    newFixedGross: "",
    oldDepartment: "",
    oldFixedGross: 0,
    oldPosition: "",
    positionId: "",
    promotedPosition: "",
    promotionId: 0,
    promotionLetter: "",
    reason: "",
    relocationBonus: 0,
    remarks: "",
    status: 0,
  });
  const [empNameError, setEmpNameError] = useState("");
  const [departmentIdError, setDepartmentIdError] = useState("");
  const [positionIdError, setPositionIdError] = useState("");
  const [newFixedGrossError, setNewFixedGrossError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const {
    employeeData,
    ViewEmployeeProfile,
    employeeProfileData,
    ViewEmployeeDataById,
    fetchRelievingLetterData,
    relivingLetterData,
  } = useContext(EmployeeSeparationContext);
  const { empResign, withdraw, searchByCostCenter, searchByCostData } =
    useContext(SeparationContext);
  const { departmentView, departmentName } = useContext(OfferContext);
  const { PositionNew, positionNew, PromotionCreate } =
    useContext(PromotionContext);
  useEffect(() => {
    PositionNew();
    departmentView();
  }, []);

  useEffect(() => {
    ViewEmployeeProfile();
  }, []);

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
      console.log(searchByCostData, "searchByCostData");
      const temp =
        searchByCostData.lastName !== null &&
        searchByCostData.lastName !== undefined
          ? searchByCostData.lastName
          : "";
      state.employeeId = searchByCostData.employeeId;
      state.empName = searchByCostData.firstName + " " + temp;
      setEmpName(searchByCostData.firstName + " " + temp);

      state.costCentre = searchByCostData.costCentre;
      state.oldPosition = searchByCostData.position;
      state.oldDepartment = searchByCostData.department;
      // state.oldFixedGross = searchByCostData.oldFixedGross;
      state.oldFixedGross = searchByCostData.fixedGross;
    }
  }, [searchByCostData]);

  console.log(state, EmpName, "state");

  const submitHandler = (e) => {
    e.preventDefault();
    //  setState({...state,empName:EmpName})
    var empName = state.empName;
    if (empName == "" || empName == null || empName == undefined) {
      setEmpNameError("Select choose the employee name");
      console.log(empNameError, "empNameError");
    } else {
      setEmpNameError("");
    }

    var departmentId = state.departmentId;
    if (
      departmentId == "" ||
      departmentId == null ||
      departmentId == undefined
    ) {
      setDepartmentIdError("Please select the department");
      console.log(departmentIdError);
    } else {
      setDepartmentIdError("");
    }
    var positionId = state.positionId;

    if (positionId == "" || positionId == null || positionId == undefined) {
      setPositionIdError(" Please select the position ");
      console.log(positionIdError);
    } else {
      setPositionIdError("");
    }

    var newFixedGross = state.newFixedGross;
    if (
      newFixedGross == "" ||
      newFixedGross == null ||
      newFixedGross == undefined
    ) {
      setNewFixedGrossError(" Please add fixed gross");
      console.log(newFixedGrossError);
    } else {
      setNewFixedGrossError("");
    }

    var newDepartment = state.newDepartment;
    if (
      newDepartment == "" ||
      newDepartment == null ||
      newDepartment == undefined
    ) {
      setDepartmentIdError("Please select the department");
      console.log(departmentIdError);
    } else {
      setDepartmentIdError("");
    }

    var reason = state.reason;
    if (reason == "" || reason == null || reason == undefined) {
      setReasonError("Please add reason for promotion");
    } else {
      setReasonError("");
    }

    if (
      newDepartment !== "" &&
      reason !== "" &&
      newFixedGross !== "" &&
      positionId !== "" &&
      departmentId !== "" &&
      empName !== "" &&
      newDepartment !== null &&
      reason !== null &&
      newFixedGross !== null &&
      positionId !== null &&
      departmentId !== null &&
      empName !== null &&
      newDepartment !== undefined &&
      reason !== undefined &&
      newFixedGross !== undefined &&
      positionId !== undefined &&
      departmentId !== undefined &&
      empName !== undefined
    ) {
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
        effectiveDate: null,
        emailId: null,
        empName: state.empName,
        employeeId: state.employeeId,
        managerId: null,
        managerName: null,
        newDepartment: state.newDepartment,
        newFixedGross: state.newFixedGross,
        oldDepartment: state.oldDepartment,
        oldFixedGross: state.oldFixedGross,
        oldPosition: state.oldPosition,
        positionId: state.positionId,
        promotedPosition: state.promotedPosition,
        promotionId: 0,
        promotionLetter: null,
        reason: state.reason,
        relocationBonus: state.relocationBonus,
        remarks: null,
        status: 0,
      };
      PromotionCreate(infoData);
      setSubmitted(true);
      console.log("all okay", infoData);
    } else {
      console.log("NOT OK", empName);
      // toast.error("Data is not filled Properly")
    }
  };

  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setState({ ...state, effectiveDate: AdjusteddateValue });
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
      setState({
        ...state,
        empName: e.target.value,
      });
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
            promotedPosition: item.position,
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
                                <label>
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

                          <Col sm={6}>
                            <label>Position:</label>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldPosition}
                            </label>
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
                              <label>Cost Center Name:</label>
                            </div>
                          </Col>
                          <Col sm={4}>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.costCentre}
                            </label>
                          </Col>

                          <Col sm={6}>
                            <label>Department:</label>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldDepartment}
                            </label>
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
                            <label>New Position </label>
                          </Col>
                          <Col sm={8}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="positionId"
                                defaultValue={position}
                                style={
                                  positionIdError
                                    ? { borderColor: "red" }
                                    : { borderRadius: "5px" }
                                }
                                onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Position</option>
                                {positionNew !== null &&
                                  positionNew !== undefined &&
                                  positionNew.length > 0 &&
                                  positionNew.map((item, index) => {
                                    return (
                                      <option key={index + 1}>
                                        {item.position}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {positionIdError ? (
                                <p style={{ color: "red" }}>
                                  {positionIdError}
                                </p>
                              ) : (
                                ""
                              )}
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
                          <Col sm={2}>
                            <label>Select Department </label>
                          </Col>
                          <Col sm={8}>
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="departmentId"
                                style={
                                  departmentIdError
                                    ? { borderColor: "red" }
                                    : { borderRadius: "5px" }
                                }
                                defaultValue={departmentNew}
                                onChange={(e) => changeHandler(e)}
                              >
                                <option value="">Select Department</option>
                                {departmentName !== null &&
                                  departmentName !== undefined &&
                                  departmentName.length > 0 &&
                                  departmentName.map((item, index) => {
                                    return (
                                      <option key={index + 1}>
                                        {item.departmentName}
                                      </option>
                                    );
                                  })}
                              </Form.Control>
                              {departmentIdError ? (
                                <p style={{ color: "red" }}>
                                  {departmentIdError}
                                </p>
                              ) : (
                                ""
                              )}
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
                          <Col sm={2}>
                            <div>
                              <label>Fixed Gross:</label>
                            </div>
                          </Col>
                          <Col sm={3}>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.oldFixedGross}
                            </label>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>New Fixed Gross:</label>
                            </div>
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
                                    name="newFixedGross"
                                    value={state.newFixedGross}
                                    onChange={(e) => changeHandler(e)}
                                    style={
                                      newFixedGrossError
                                        ? { borderColor: "red" }
                                        : { borderRadius: "5px" }
                                    }
                                  />
                                </Form.Group>
                              )}
                              {newFixedGrossError ? (
                                <p style={{ color: "red" }}>
                                  {newFixedGrossError}
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
                              <label> Effective Date :</label>
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
                                    minDate={moment().toDate()}
                                    required
                                    disabled={true}
                                    onChange={(e) => dateOfBirthHandler(e)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="YYYY-MM-DD"
                                    minDate={new Date()}
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Relocation Bonus:</label>
                            </div>
                          </Col>
                          <Col sm={3}>
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

                        <Row
                          style={{
                            marginLeft: "2rem",
                            marginTop: "1rem",
                            marginBottom: "3rem",
                          }}
                        >
                          <Col sm={2}>
                            <label>Reason For Promotion:</label>
                          </Col>
                          <Col sm={8}>
                            <Form.Control
                              style={
                                reasonError
                                  ? { borderColor: "red" }
                                  : { borderRadius: "5px" }
                              }
                              as="textarea"
                              rows={4}
                              name="reason"
                              value={state.reason}
                              placeholder="Write here.."
                              onChange={(e) => changeHandler(e)}
                              required
                            />

                            {reasonError ? (
                              <p style={{ color: "red" }}>{reasonError}</p>
                            ) : (
                              ""
                            )}
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
                  </Container>
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
