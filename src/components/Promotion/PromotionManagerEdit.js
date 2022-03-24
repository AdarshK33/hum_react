import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Modal,
  FormLabel,
} from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { OfferContext } from "../../context/OfferState";
import { SeparationContext } from "../../context/SepearationState";
import { Link } from "react-router-dom";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { PromotionContext } from "../../context/PromotionState";
import { PermissionContext } from "../../context/PermissionState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { ProbationContext } from "../../context/ProbationState";
import PromotionLetters from "./PromotionLetter";
import PromotionSalaryLetters from "./PromotionSalaryLetter";
import calendarImage from "../../assets/images/calendar-image.png";
import "./Promotion.css";

const PromotionManagerEdit = (props) => {
  const [EmpName, setEmpName] = useState();
  const [position, setPosition] = useState();
  const [departmentNew, setDepartmentNew] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showRelivingModal, setShow] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [salaryEffectiveDateError, setSalaryEffectiveDateError] = useState("");
  const [effectiveDateError, setEffectiveDateError] = useState("");

  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [state, setState] = useState({
    adminValidatedDate: null,
    validatedAdminId: "",
    validatedAdminName: "",
    managerValidatedDate: null,
    validatedManagerId: "",
    validatedManagerName: "",
    bonus: 0,
    // bonusInPercentage: 0,
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
    promotionType: 0,
    promotionLetter: "",
    reason: "",
    relocationBonus: 0,
    salaryEffectiveDate: null,
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
    generatePromotionLetter,
    promotionLetterData,
    lettterview,
    setViewLetter,
  } = useContext(PromotionContext);
  const { rolePermission } = useContext(PermissionContext);

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
        adminValidatedDate: promotionIdData["adminValidatedDate"],
        validatedAdminId: promotionIdData["validatedAdminId"],
        validatedAdminName: promotionIdData["validatedAdminName"],
        managerValidatedDate: promotionIdData["managerValidatedDate"],
        validatedManagerId: promotionIdData["validatedManagerId"],
        validatedManagerName: promotionIdData["validatedManagerName"],
        bonus: promotionIdData["bonus"],
        // bonusInPercentage: promotionIdData["bonusInPercentage"],
        costCentre: promotionIdData["costCentre"],
        costCentreManagerEmail: promotionIdData["costCentreManagerEmail"],
        costCentreManagerId: promotionIdData["costCentreManagerId"],
        costCentreManagerName: promotionIdData["costCentreManagerName"],
        departmentId: promotionIdData["departmentId"],
        reportingManagerId: promotionIdData["reportingManagerId"],
        reportingManagerName: promotionIdData["reportingManagerName"],
        effectiveDate:
          promotionIdData["effectiveDate"] !== null
            ? new Date(promotionIdData["effectiveDate"])
            : null,
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
        salaryEffectiveDate:
          promotionIdData["salaryEffectiveDate"] !== null
            ? new Date(promotionIdData["salaryEffectiveDate"])
            : null,
        promotionType: promotionIdData["promotionType"],
        status: promotionIdData["status"],
      });
    }
  }, [promotionIdData]);
  const handleSaveRemarks = () => {
    console.log(state);
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  const handleClose = () => {
    setSuccessModal(false);
  };
  const handleClose1 = () => {
    setModal(false);
    state.remarks = "";
  };

  const handleRelivingClose = () => setShow(false);

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalRelivingLetter = (e) => {
    e.preventDefault();
    if (
      promotionIdData !== null &&
      promotionIdData !== undefined &&
      Object.keys(promotionIdData).length !== 0
    ) {
      const infoData = {
        adminValidatedDate: promotionIdData["adminValidatedDate"],
        validatedAdminId: promotionIdData["validatedAdminId"],
        validatedAdminName: promotionIdData["validatedAdminName"],
        managerValidatedDate: promotionIdData["managerValidatedDate"],
        validatedManagerId: promotionIdData["validatedManagerId"],
        validatedManagerName: promotionIdData["validatedManagerName"],
        bonus: promotionIdData["bonus"],
        // bonusInPercentage: promotionIdData["bonusInPercentage"],
        costCentre: promotionIdData["costCentre"],
        costCentreManagerEmail: promotionIdData["costCentreManagerEmail"],
        costCentreManagerId: promotionIdData["costCentreManagerId"],
        costCentreManagerName: promotionIdData["costCentreManagerName"],
        departmentId: promotionIdData["departmentId"],
        reportingManagerId: promotionIdData["reportingManagerId"],
        reportingManagerName: promotionIdData["reportingManagerName"],
        effectiveDate: promotionIdData["effectiveDate"],
        emailId: null,
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
        promotionLetter: null,
        reason: promotionIdData["reason"],
        relocationBonus: promotionIdData["relocationBonus"],
        salaryEffectiveDate: promotionIdData["salaryEffectiveDate"],
        promotionType: promotionIdData["promotionType"],
        remarks: promotionIdData["remarks"],
        status: 3,
      };
      PromotionCreate(infoData);
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      // setSuccessModal(true);
      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };

  const previewLetterViewing = (e) => {
    e.preventDefault();
    if (promotionIdData !== null && promotionIdData !== undefined) {
      generatePromotionLetter(promotionIdData.promotionId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const generateLetterClick = (e) => {
    e.preventDefault();
    generatePromotionLetter(promotionIdData.promotionId);
    handleShow();
    setViewLetter(true);
    setPreviewGeneratedLetter(true);
  };

  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };

  const effectiveHandler = (date) => {
    console.log("ChangeHandler", date);
    if (date !== null) {
      var AdjusteddateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      console.log("AdjusteddateValue");
      setState({ ...state, effectiveDate: AdjusteddateValue });
    }
  };

  const salaryeEffectiveHandler = (date) => {
    console.log("ChangeHandler", date);
    if (date !== null) {
      var AdjusteddateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      console.log("AdjusteddateValue");
      setState({ ...state, salaryEffectiveDate: AdjusteddateValue });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //var salaryEffectiveDate = state.salaryEffectiveDate;
    // if (
    //   (state.promotionType == 1 && salaryEffectiveDate == "") ||
    //   salaryEffectiveDate == null ||
    //   salaryEffectiveDate == undefined
    // ) {
    //   setSalaryEffectiveDateError("Please add salary effective date");
    // } else {
    //   setSalaryEffectiveDateError("");
    // }
    var effectiveDate = state.effectiveDate;
    if (
      (state.promotionType == 1 && effectiveDate == "") ||
      effectiveDate == null ||
      effectiveDate == undefined
    ) {
      setEffectiveDateError("Please add  effective date");
    } else {
      setEffectiveDateError("");
    }
    const infoData = {
      adminValidatedDate: promotionIdData["adminValidatedDate"],
      validatedAdminId: promotionIdData["validatedAdminId"],
      validatedAdminName: promotionIdData["validatedAdminName"],
      managerValidatedDate: promotionIdData["managerValidatedDate"],
      validatedManagerId: promotionIdData["validatedManagerId"],
      validatedManagerName: promotionIdData["validatedManagerName"],
      bonus: promotionIdData["bonus"],
      // bonusInPercentage: promotionIdData["bonusInPercentage"],
      costCentre: promotionIdData["costCentre"],
      costCentreManagerEmail: promotionIdData["costCentreManagerEmail"],
      costCentreManagerId: promotionIdData["costCentreManagerId"],
      costCentreManagerName: promotionIdData["costCentreManagerName"],
      departmentId: promotionIdData["departmentId"],
      reportingManagerId: promotionIdData["reportingManagerId"],
      reportingManagerName: promotionIdData["reportingManagerName"],
      effectiveDate: state.effectiveDate,
      emailId: null,
      empName: state.empName,
      employeeId: state.employeeId,
      currentManagerId: promotionIdData["currentManagerId"],
      currentManagerName: promotionIdData["currentManagerName"],
      contractType: promotionIdData["contractType"],
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
      remarks: promotionIdData["remarks"],
      status: 5,
    };
    if (
      state.effectiveDate !== "" &&
      state.effectiveDate !== null &&
      state.effectiveDate !== undefined
    ) {
      if (state.promotionType == 1) {
        // if (
        //   state.salaryEffectiveDate !== "" &&
        //   state.salaryEffectiveDate !== null &&
        //   state.salaryEffectiveDate !== undefined
        // ) {
        //   console.log("in 1 ",infoData)
        //   PromotionCreate(infoData);
        //   setSubmitted(true);
        //   setPreview(true);
        //   console.log("all okay", infoData);
        // }
        PromotionCreate(infoData);
        setSubmitted(true);
        setPreview(true);
      } else {
        console.log("all okay", infoData);
        PromotionCreate(infoData);
        setSubmitted(true);
        setPreview(true);
      }
    }
  };
  console.log("lettterview", lettterview);
  return (
    <Fragment>
      {lettterview ? (
        <div>
          {promotionIdData.promotionType === 0 ? (
            <PromotionLetters />
          ) : promotionIdData.promotionType === 1 ? (
            <PromotionSalaryLetters />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {/* <Modal show={showRelivingModal} onHide={handleRelivingClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body className="mx-auto">
            <label>Promotion Letter has been sent to the employee</label>
            <div className="text-center mb-2">
              <Link to={"/promotion-list"}>
                <Button onClick={handleRelivingClose}>Close</Button>
              </Link>
            </div>
          </Modal.Body>
        ) : previewLetter || showRelivingModal ? (
          <Modal.Body>
            {true ? (
              <div>
                {promotionIdData.promotionType === 0 ? (
                  <PromotionLetters />
                ) : promotionIdData.promotionType === 1 ? (
                  <PromotionSalaryLetters />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <br></br>
            <Row>
              {showSignature ? (
                <Fragment>
                  <br></br>
                  <img
                    style={{marginLeft:"50px"}}
                    src={calendarImage}
                    alt="calendar"
                    width="50px"
                    className="digital-signature"
                  />
                </Fragment>
              ) : (
                <>
                  <br></br>
                  <button
                    className={"stepperButtonsLetter"}
                    onClick={digitalSignature}
                  >
                    Add digital signature
                  </button>
                </>
              )}
            </Row>
            {showSignature && !previewLetter ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={saveOfferLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal> */}

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">
              Promotion letter sent to the employee"
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <div>
        <Breadcrumb title="PROMOTION APPROVAL" parent="PROMOTION APPROVAL" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div>
                  <div className="OnBoardHeading">
                    <b> MANAGER PROMOTION APPROVAL </b>
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
                                  &nbsp;&nbsp;
                                  {`${state.empName}  /${state.employeeId}`}
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
                                Fixed Gross{" "}
                                {`${
                                  state.contractType == "parttime" ||
                                  state.contractType == "Parttime"
                                    ? "(per/hr)"
                                    : ""
                                }`}
                                :
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
                          {promotionIdData !== null &&
                          promotionIdData !== undefined &&
                          promotionIdData.promotionType === 1 ? (
                            <Col sm={6}>
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
                                  <label className="itemResult">
                                    &nbsp;&nbsp; {state.newFixedGross}
                                  </label>
                                </label>
                              </div>
                            </Col>
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
                          <Col sm={6}>
                            <div>
                              <label>
                                Reporting Manager:
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.reportingManagerName}
                                </label>
                              </label>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div>
                              <label>
                                Current Manager:
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.currentManagerName}
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
                            marginBottom: "2rem",
                          }}
                        >
                          {/* <Col sm={3}>
                            <div>
                              
                            </div>
                          </Col> */}

                          <Col sm={6}>
                            <div>
                              <Form.Group>
                                <FormLabel>Effective Date :</FormLabel>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <DatePicker
                                  className="form-control onBoard-view"
                                  selected={state.effectiveDate}
                                  name="effectiveDate"
                                  required
                                  onChange={(e) => effectiveHandler(e)}
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
                              </Form.Group>
                            </div>
                            {effectiveDateError ? (
                              <p style={{ color: "red" }}>
                                {effectiveDateError}
                              </p>
                            ) : (
                              ""
                            )}
                          </Col>

                          {/* {promotionIdData !== null &&
                          promotionIdData !== undefined &&
                          promotionIdData.promotionType === 1 ? (
                            <Col sm={6}>
                              <div>
                                <Form.Group>
                                  <FormLabel>
                                    New Salary Effective Date:
                                  </FormLabel>
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <DatePicker
                                    className="form-control onBoard-view"
                                    selected={state.salaryEffectiveDate}
                                    name="salaryEffectiveDate"
                                    required
                                    onChange={(e) => salaryeEffectiveHandler(e)}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="DD-MM-YYYY"
                                    minDate={new Date()}
                                  />
                                </Form.Group>
                              </div>
                              {salaryEffectiveDateError ? (
                                <p style={{ color: "red" }}>
                                  {salaryEffectiveDateError}
                                </p>
                              ) : (
                                ""
                              )}
                            </Col>
                          ) : (
                            ""
                          )} */}
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
                                Relocation Bonus:
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.relocationBonus}
                                </label>
                              </label>
                            </div>

                            <div>
                              <label></label>
                            </div>
                          </Col>
                        </Row>
                        {
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
                                      Validated by Costcenter Leader:
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
                                    <label>Date:</label>
                                  </div>
                                </Col>
                                <Col sm={2}>
                                  <div>
                                    <label className="itemResult">
                                      {state.managerValidatedDate !== null &&
                                      state.managerValidatedDate !==
                                        undefined &&
                                      state.managerValidatedDate !== ""
                                        ? moment(
                                            state.managerValidatedDate
                                          ).format("DD-MM-YYYY")
                                        : ""}
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
                                      {state.adminValidatedDate !== null &&
                                      state.adminValidatedDate !== undefined &&
                                      state.adminValidatedDate !== ""
                                        ? moment(
                                            state.adminValidatedDate
                                          ).format("DD-MM-YYYY")
                                        : ""}
                                    </label>
                                  </div>
                                </Col>
                              </>
                            </Row>
                          </>
                        }
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
                              {true ? (
                                <button
                                  disabled={
                                    showPreview ||
                                    (promotionIdData !== null &&
                                      promotionIdData !== undefined &&
                                      Object.keys(promotionIdData).length !==
                                        0 &&
                                      promotionIdData.status === 5)
                                  }
                                  className={
                                    showPreview ||
                                    (promotionIdData !== null &&
                                      promotionIdData !== undefined &&
                                      Object.keys(promotionIdData).length !==
                                        0 &&
                                      promotionIdData.status === 5)
                                      ? "confirmButton"
                                      : "stepperButtons"
                                  }
                                  onClick={submitHandler}
                                >
                                  Save
                                </button>
                              ) : (
                                ""
                              )}
                              {(!saveLetter &&
                                promotionIdData &&
                                promotionIdData &&
                                promotionIdData !== null &&
                                promotionIdData !== undefined &&
                                Object.keys(promotionIdData).length !== 0 &&
                                promotionIdData.status === 5) ||
                              showPreview === true ? (
                                <button
                                  // disabled={!submitted}
                                  className={
                                    saveLetter
                                      ? "confirmButton"
                                      : "PromotionstepperButtons"
                                  }
                                  onClick={generateLetterClick}
                                >
                                  Generate Promotion Letter
                                </button>
                              ) : (
                                ""
                              )}
                              {/* {saveLetter && previewGeneratedLetter ? (
                                <button
                                  className={"LettersProbButtons"}
                                  onClick={previewLetterViewing}
                                >
                                  Preview Promotion Letter
                                </button>
                              ) : (
                                ""
                              )} */}
                              {/* {saveLetter && previewGeneratedLetter === true && (
                                <div className="preview-section">
                                  <br></br>
                                  <br></br>
                                  <img
                                    src={calendarImage}
                                    alt="calendar"
                                    width="200px"
                                  />
                                  <br></br>
                                  <br></br>
                                  {true ? (
                                    <button
                                      disabled={letterSent}
                                      className={
                                        letterSent
                                          ? " confirmButton "
                                          : "stepperButtons"
                                      }
                                      onClick={submitfinalRelivingLetter}
                                    >
                                      Submit
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )} */}
                            </div>
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
    </Fragment>
  );
};

export default PromotionManagerEdit;
