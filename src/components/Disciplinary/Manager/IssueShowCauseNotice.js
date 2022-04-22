import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../../common/breadcrumb";
import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import ShowCauseNotice from "./ShowCauseNoticeLetter";
import NonPerformanceLetter from "./NonPerformanceLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../../context/PermissionState";

const IssueShowCauseNotice = () => {
  const [showCauseReason, setShowCauseReason] = useState("");
  const [changeInReason, setChangeInReason] = useState(0);
  const [remarkError, setRemarkError] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [checkForExist, setCheckForExist] = useState(false);
  const [firstTimeUpdate, setFirstTimeUpdate] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [intern, setIntern] = useState(false);
  const [EmpName, setEmpName] = useState();
  const history = useHistory();

  const [showCauseReasonError, setShowCauseReasonError] = useState(false);
  const [reasonForCauseError, setReasonForCauseError] = useState(false);

  const [showShowCauseNoticeModal, setShow] = useState(false);
  //   const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const { rolePermission } = useContext(PermissionContext);

  const [state, setState] = useState({
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empAddress: "",
    employeePosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    reasonForCause: "",
    reason: "",
    remarks: "",
    clickOnsubmit: false,
  });
  const [disciplinaryReasonList, setdisciplinaryReasonList] = useState([]);
  const [resonsForShowCauseList, setResonsForShowCauseList] = useState([]);
  const {
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    disciplinaryResonsView,
    disciplinaryResonsData,
    createShowCauseIssue,
    showCauseIssueCreateResponse,
    SubmitDisciplinaryLetter,
    issueShowCauseNoticeData,
    EmployeeSearchWithKey,
    disciplinaryEmpSearchData,
    loader,
    lettterview,
    setViewLetter,
  } = useContext(DisciplinaryContext);
  const { ViewEmployeeProfile, employeeProfileData } = useContext(
    EmployeeSeparationContext
  );

  useEffect(() => {
    ViewEmployeeProfile();
  }, []);
  // useEffect(() => {
  //   if (
  //     disciplinarySearchData &&
  //     disciplinarySearchData &&
  //     disciplinarySearchData !== null &&
  //     disciplinarySearchData !== undefined &&
  //     Object.keys(disciplinarySearchData).length !== 0
  //   ) {
  //     state.empId = disciplinarySearchData.employeeId;
  //     state.empName = disciplinarySearchData.employeeName;
  //     setEmpName(
  //       disciplinarySearchData.employeeName +
  //         " " +
  //         disciplinarySearchData.employeeId
  //     );

  //     state.empContractType = disciplinarySearchData.contractType;
  //     state.empCostCenterName = disciplinarySearchData.employeeCostCentre;
  //     state.empAddress = disciplinarySearchData.employeeAddress;
  //     state.employeePosition = disciplinarySearchData.employeePosition;
  //     state.mngrId = disciplinarySearchData.managerId;
  //     state.mngrName = disciplinarySearchData.managerName;
  //     state.mngrPosition = disciplinarySearchData.managerPosition;
  //     state.mngrCostCenterName = disciplinarySearchData.managerCostCentre;

  //     if (
  //       disciplinarySearchData.disciplinaryAction !== null &&
  //       disciplinarySearchData.disciplinaryAction !== undefined &&
  //       disciplinarySearchData.disciplinaryAction !== ""
  //     ) {
  //       state.remarks =
  //         disciplinarySearchData.disciplinaryAction.employeeComment;
  //       state.reason =
  //         disciplinarySearchData.disciplinaryAction.managerComment;
  //         setChangeInReason(disciplinarySearchData.disciplinaryAction.reasonId)
  //     }
  //     setSubmitted(true);
  //     state.clickOnsubmit = true;
  //     setPreview(true);
  //     setSuccessModal(true);
  //   }
  // }, [disciplinarySearchData]);

  useEffect(() => {
    if (
      disciplinaryEmpSearchData &&
      disciplinaryEmpSearchData &&
      disciplinaryEmpSearchData !== null &&
      disciplinaryEmpSearchData !== undefined &&
      Object.keys(disciplinaryEmpSearchData).length !== 0
    ) {
      if (submitted === false && state.clickOnsubmit === false) {
        if (checkForExist === true || firstTimeUpdate === true) {
          if (
            disciplinaryEmpSearchData.disciplinaryAction !== null &&
            disciplinaryEmpSearchData.disciplinaryAction !== undefined
          ) {
            console.log("********");
            setShowInfoModal(true);
            setCheckForExist(false);
            setFirstTimeUpdate(false);
            toast.info("Employe is in disciplinary list");
          }
        }
      }
    }
  }, [disciplinaryEmpSearchData]);

  useEffect(() => {
    if (
      disciplinaryEmpSearchData &&
      disciplinaryEmpSearchData &&
      disciplinaryEmpSearchData !== null &&
      disciplinaryEmpSearchData !== undefined &&
      Object.keys(disciplinaryEmpSearchData).length !== 0
    ) {
      state.empId = disciplinaryEmpSearchData.employeeId;
      setEmpName(
        disciplinaryEmpSearchData.employeeName +
          " " +
          disciplinaryEmpSearchData.employeeId
      );

      state.empContractType = disciplinaryEmpSearchData.contractType;
      state.empCostCenterName = disciplinaryEmpSearchData.employeeCostCentre;
      state.empAddress = disciplinaryEmpSearchData.employeeAddress;
      state.employeePosition = disciplinaryEmpSearchData.employeePosition;

      state.mngrName = disciplinaryEmpSearchData.managerName;
      state.mngrId = disciplinaryEmpSearchData.managerId;
      state.mngrCostCenterName = disciplinaryEmpSearchData.managerCostCentre;
      state.mngrPosition = disciplinaryEmpSearchData.managerPosition;

      if (
        state.empContractType === "internship" ||
        state.empContractType === "Internship"
      ) {
        setIntern(true);
      } else {
        setIntern(false);
      }
    }
  }, [disciplinaryEmpSearchData]);

  console.log("disciplinaryResonsData", disciplinaryResonsData);
  console.log("disciplinaryEmpSearchData", disciplinaryEmpSearchData);
  const searchDataHandler = () => {
    if (EmpName !== null) {
      EmployeeSearchWithKey(EmpName);
      setEmpName("");
      setCheckForExist(true);
      state.clickOnsubmit = false;
    }
  };

  useEffect(() => {
    let tempArr = [];

    tempArr.push({
      label: "Non-Performance",
      value: 1,
    });
    tempArr.push({
      label: "Misconduct",
      value: 2,
    });
    setdisciplinaryReasonList(tempArr);
  }, []);
  console.log("disciplinaryReasonList", disciplinaryReasonList);

  useEffect(() => {
    if (
      disciplinaryResonsData &&
      disciplinaryResonsData !== null &&
      disciplinaryResonsData !== undefined &&
      Object.keys(disciplinaryResonsData).length !== 0
    ) {
      let tempArray = [];
      disciplinaryResonsData.map((item, i) => {
        if (disciplinaryResonsData[i].reasonId !== 4) {
          tempArray.push({
            label: disciplinaryResonsData[i].reason,
            value: disciplinaryResonsData[i].reasonId,
          });
        }
      });
      setResonsForShowCauseList(tempArray);
    }
  }, [disciplinaryResonsData, changeInReason]);
  console.log("resonsForShowCauseList", resonsForShowCauseList);

  const handleShowCauseLetterClose = () => setShow(false);
  const handleShowCauseLetterClose1 = () => {
    setShow(false);
    history.push("./disciplinary-action");
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalShowCauseLetter = (e) => {
    e.preventDefault();
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction.disciplinaryId !== 0
    ) {
      console.log("INSIDE");
      var reasonDetailsId = 0;
      resonsForShowCauseList.map((item, i) => {
        if (resonsForShowCauseList[i].label === state.reasonForCause) {
          reasonDetailsId = resonsForShowCauseList[i].value;
          console.log(resonsForShowCauseList[i].value);
        }
      });
      const InfoData = {
        contractType: state.empContractType,
        disciplinaryAction: {
          actionDueDays: 0,
          actionIssuedDate: null,
          disciplinaryId:
            disciplinarySearchData.disciplinaryAction.disciplinaryId,
          employeeActionStatus: null,
          employeeComment: null,
          employeeId: state.empId,
          initiatedRole: rolePermission !== null ? rolePermission : null,
          managerComment:
            disciplinarySearchData.disciplinaryAction.managerComment,
          reasonId: disciplinarySearchData.disciplinaryAction.reasonId,
          reasonDetailsId:
            disciplinarySearchData.disciplinaryAction.reasonDetailsId,
          showCauseLetter: "ShowCauseLetter.pdf",
          //  showCauseNotice: null, //31/1/2022
          status: 0,
          // rolePermission == "costCenterManager" ? 2 : 0,
          statusDesc: null,
          warningIssued: false,
        },
        disciplinaryWarning: null,
        employeeAddress: state.empAddress,
        employeePosition: state.employeePosition,
        employeeCostCentre: state.empCostCenterName,
        employeeId: state.empId,
        employeeName: disciplinaryEmpSearchData.employeeName,
        managerCostCentre: null,
        managerDesignation: null,
        managerId: null,
        managerName: null,
        // {
        //   "disciplinaryId": 0,
        //   "employeeComment": "string",
        //   "employeeWarningStatus": "string",
        //   "improvementPeriod": 0,
        //   "managerComment": "string",
        //   "reason": "string",
        //   "reasonDetails": "string",
        //   "status": 0,
        //   "statusDesc": "string",
        //   "warningDueDays": 0,
        //   "warningId": 0,
        //   "warningIssuedDate": "string",
        //   "warningLetter": "string"
        // },
      };

      console.log("createShowCauseData", InfoData);
      createShowCauseIssue(InfoData, state.empId);
      SubmitDisciplinaryLetter(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
    }
  };

  const previewShowCauseLetter = (e) => {
    e.preventDefault();
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction.disciplinaryId !== 0
    ) {
      disciplinaryEmployeeSearch(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const ShowCauseLetterClick = (e) => {
    e.preventDefault();
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction.disciplinaryId !== 0
    ) {
      disciplinaryEmployeeSearch(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      handleShow();
      setViewLetter(true);
      setPreviewGeneratedLetter(true);
    }
  };
  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };
  // end
  const handleClose = () => {
    setModal(false);
    setSuccessModal(false);
  };
  const handleInfoClose = () => {
    setShowInfoModal(false);
    setEmpName("");
    state.empId = "";
    state.empContractType = "";
    state.empAddress = "";
    state.employeePosition = "";
    state.empLocation = "";
    state.empCostCenterName = "";
  };
  const handleSaveRemarks = () => {
    if (
      state.remarks !== "" &&
      state.remarks !== null &&
      state.remarks !== undefined
    ) {
      setRemarkError(false);
      setModal(false);
    } else {
      setRemarkError(true);
    }
  };
  const changeHandler = (e) => {
    let valid = /[^A-Za-z0-9'.,-_ ]/;
    if (e.target.name === "reason" && e.target.value !== "") {
      if (valid.test(e.target.value) === true) {
        console.log("do nothing");
      } else {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "empName") {
      setEmpName(e.target.value);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    console.log(state);
  };
  const DisciplinaryReasonHandler = (e) => {
    setShowCauseReason(e.target.value);
    if (e.target.value === "Misconduct") {
      disciplinaryResonsView(2);
      setChangeInReason(2);
      state.reasonForCause = "";
    } else {
      state.reasonForCause = "NA";
      setChangeInReason(1);
    }

    console.log(e.target.value);
  };

  const validateEmpDetails = () => {
    if (EmpName !== "" && EmpName !== null && EmpName !== undefined) {
      return true;
    } else {
      toast.info("Please Provide the Employee details");
      return false;
    }
  };

  const validateDropDown = (item, setError) => {
    if (intern === false) {
      if (item !== "" && item !== null && item !== undefined) {
        setError(false);
        return true;
      } else {
        setError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const validateReason = () => {
    if (
      state.reason !== "" &&
      state.reason !== null &&
      state.reason !== undefined
    ) {
      console.log(state.reason, "state.reason");
      setReasonError(false);
      return true;
    } else {
      setReasonError(true);
      return false;
    }
  };

  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateEmpDetails() === true) &
      (validateDropDown(showCauseReason, setShowCauseReasonError) === true) &
      (validateDropDown(state.reasonForCause, setReasonForCauseError) ===
        true) &
      (validateReason() === true)
    ) {
      console.log("on true");
      return true;
    } else {
      console.log("on falsae");
      return false;
    }
  };

  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      console.log("INSIDE");
      var reasonDetailsId = 0;
      resonsForShowCauseList.map((item, i) => {
        if (resonsForShowCauseList[i].label === state.reasonForCause) {
          reasonDetailsId = resonsForShowCauseList[i].value;
          console.log(resonsForShowCauseList[i].value);
        }
      });
      const InfoData = {
        contractType: state.empContractType,
        disciplinaryAction: {
          actionDueDays: 0,
          actionIssuedDate: null,
          disciplinaryId: 0,
          employeeActionStatus: null,
          employeeComment: null,
          employeeId: state.empId,
          managerComment: state.reason,
          reasonId: changeInReason,
          initiatedRole: rolePermission !== null ? rolePermission : null,
          reasonDetailsId:
            changeInReason === 1 ? changeInReason : reasonDetailsId,
          showCauseLetter: "ShowCauseLetter.pdf",
          // showCauseNotice: null,
          status:
            rolePermission == "admin"
              ? 13
              : rolePermission == "superCostCenterManager"
              ? 12
              : rolePermission == "costCenterManager"
              ? 11
              : 10,
          statusDesc: null,
          warningIssued: false,
        },
        disciplinaryWarning: null,
        employeeAddress: state.empAddress,
        employeePosition: state.employeePosition,
        employeeCostCentre: state.empCostCenterName,
        employeeId: state.empId,
        employeeName: disciplinaryEmpSearchData.employeeName,
        managerCostCentre: null,
        managerDesignation: null,
        managerId: null,
        managerName: null,
        // {
        //   "disciplinaryId": 0,
        //   "employeeComment": "string",
        //   "employeeWarningStatus": "string",
        //   "improvementPeriod": 0,
        //   "managerComment": "string",
        //   "reason": "string",
        //   "reasonDetails": "string",
        //   "status": 0,
        //   "statusDesc": "string",
        //   "warningDueDays": 0,
        //   "warningId": 0,
        //   "warningIssuedDate": "string",
        //   "warningLetter": "string"
        // },
      };

      console.log("createShowCauseData", InfoData, rolePermission);
      setSubmitted(true);
      state.clickOnsubmit = true;
      createShowCauseIssue(InfoData, state.empId);
      setPreview(true);
      setSuccessModal(true);
    }
  };

  return (
    <Fragment>
      {/* letter */}

      {submitLetter ? (
        <Modal
          show={showShowCauseNoticeModal}
          onHide={handleShowCauseLetterClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            {loader ? (
              <div
                className="loader-box loader"
                style={{ width: "100% !important" }}
              >
                <div className="loader">
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                </div>
              </div>
            ) : disciplinarySearchData &&
              disciplinarySearchData &&
              disciplinarySearchData !== null &&
              disciplinarySearchData !== undefined &&
              Object.keys(disciplinarySearchData).length !== 0 &&
              disciplinarySearchData.disciplinaryAction !== null &&
              disciplinarySearchData.disciplinaryAction !== undefined &&
              disciplinarySearchData.disciplinaryAction.reportingType !==
                null &&
              disciplinarySearchData.disciplinaryAction.reportingType !==
                undefined ? (
              disciplinarySearchData.disciplinaryAction.reportingType === 1 ? (
                <label className="text-center">
                  Show cause notice details saved successfully, Employee has
                  been notified.
                </label>
              ) : rolePermission == "manager" ? (
                <label className="text-center">
                  Show cause notice details saved successfully, sent for Cost
                  Center Manager confirmation.
                </label>
              ) : rolePermission == "costCenterManager" ? (
                <label className="text-center">
                  Show cause notice details saved successfully, sent for Super
                  Cost Center Manager confirmation.
                </label>
              ) : rolePermission == "superCostCenterManager" ? (
                <label className="text-center">
                  Show cause notice details saved successfully, sent for Admin
                  confirmation.
                </label>
              ) : (
                <label className="text-center">
                  Show cause notice details saved successfully.
                </label>
              )
            ) : (
              <label className="text-center">
                Show cause notice details saved successfully.
              </label>
            )}

            {/* {rolePermission == "costCenterManager" ? (
              <label className="text-center">
                Show cause notice details saved successfully, employee has been
                notified.
              </label>
            ) : (
              <label className="text-center">
                Show cause notice details saved successfully, sent for cost
                center manager confirmation.{" "}
              </label>
            )} */}

            <div className="text-center">
              <Button onClick={handleShowCauseLetterClose1}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      {lettterview ? (
        <div>
          {disciplinarySearchData &&
          disciplinarySearchData &&
          disciplinarySearchData !== null &&
          disciplinarySearchData !== undefined &&
          Object.keys(disciplinarySearchData).length !== 0 &&
          disciplinarySearchData.disciplinaryAction !== null &&
          disciplinarySearchData.disciplinaryAction !== undefined &&
          state.disciplinaryAction !== null &&
          changeInReason == 2 ? (
            <ShowCauseNotice />
          ) : (
            <NonPerformanceLetter />
          )}
        </div>
      ) : (
        ""
      )}

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Show cause notice details saved successfully
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal show={showInfoModal} onHide={() => handleInfoClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">
              Show cause notice for this employee {EmpName} has already been
              issued
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleInfoClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Breadcrumb title="DISCIPLINARY ACTION" parent="DISCIPLINARY ACTION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>DISCIPLINARY ACTION</b>
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
                        <Col sm={2}>
                          <Form.Group>
                            <div className="faq-form ">
                              <input
                                className="form-control"
                                type="text"
                                name="empName"
                                // disabled={disabled}
                                value={EmpName}
                                style={{ borderRadius: "5px" }}
                                // style={
                                //   empName1Error ? { borderColor: "red" } : {}
                                // }
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
                          </Form.Group>
                        </Col>

                        <Col sm={4}>
                          <div>
                            <label>
                              Contract Type:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empContractType}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
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
                        <Col sm={2}>
                          <div>
                            <label>Address:</label>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empAddress}
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.employeePosition}
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
                        <Col sm={4}>
                          <div>
                            <label>
                              Manager Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrName}
                                &nbsp; {state.mngrId}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrCostCenterName}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={3}>
                          <div>
                            <label>Issue Show Cause Notice For:</label>
                          </div>
                        </Col>

                        <Col sm={3}>
                          <div>
                            {submitted === true ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {showCauseReason}
                              </label>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  name="lgbt"
                                  options={disciplinaryReasonList}
                                  value={showCauseReason}
                                  onChange={DisciplinaryReasonHandler}
                                  //   disabled={disabled}
                                  style={
                                    showCauseReasonError
                                      ? { borderColor: "red" }
                                      : {}
                                  }
                                >
                                  <option value="" disabled selected hidden>
                                    Search Reason
                                  </option>
                                  {disciplinaryReasonList.map((item) => {
                                    return (
                                      <option key={item.value}>
                                        {item.label}
                                      </option>
                                    );
                                  })}
                                </Form.Control>
                                {showCauseReasonError ? (
                                  <p style={{ color: "red" }}>
                                    {" "}
                                    &nbsp; *Please choose valid option
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                        {changeInReason === 1 || showCauseReason === "" ? (
                          ""
                        ) : (
                          <Col sm={3}>
                            <div>
                              <label>Reason For Show Cause Notice:</label>
                            </div>
                          </Col>
                        )}
                        {changeInReason === 1 || showCauseReason === "" ? (
                          ""
                        ) : (
                          <Col sm={3}>
                            <div>
                              {submitted === true ? (
                                <label className="itemResult">
                                  &nbsp;&nbsp;{state.reasonForCause}
                                </label>
                              ) : (
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name="reasonForCause"
                                    options={resonsForShowCauseList}
                                    value={state.reasonForCause}
                                    onChange={changeHandler}
                                    //   disabled={disabled}
                                    style={
                                      reasonForCauseError
                                        ? { borderColor: "red" }
                                        : {}
                                    }
                                  >
                                    <option value="" disabled selected hidden>
                                      Select Reason For
                                    </option>
                                    {resonsForShowCauseList.map((item) => {
                                      return (
                                        <option key={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                  </Form.Control>
                                  {reasonForCauseError ? (
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      &nbsp; *Please choose valid option
                                    </p>
                                  ) : (
                                    <p></p>
                                  )}
                                </Form.Group>
                              )}
                            </div>
                          </Col>
                        )}
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={2}>
                          <label>State Reason for Show Cause Notice:</label>
                        </Col>
                        <Col sm={10}>
                          <div>
                            {submitted === true ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.reason}
                              </label>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  style={
                                    reasonError
                                      ? { borderColor: "red" }
                                      : { borderRadius: "5px" }
                                  }
                                  as="textarea"
                                  rows={4}
                                  name="reason"
                                  maxLength="500"
                                  value={state.reason}
                                  placeholder="Write here.."
                                  onChange={(e) => changeHandler(e)}
                                  required
                                />

                                {reasonError ? (
                                  <p style={{ color: "red" }}>
                                    &nbsp; *Please provide reason
                                  </p>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                            )}
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
                            disabled={submitted}
                            className={
                              submitted ? "confirmButton" : "stepperButtons"
                            }
                            onClick={submitHandler}
                          >
                            Save
                          </button>

                          {!saveLetter &&
                          showPreview === true &&
                          submitted === true ? (
                            <button
                              // disabled={!submitted}
                              className={"LettersButtonsExtra"}
                              onClick={ShowCauseLetterClick}
                            >
                              Generate Show Cause Notice
                            </button>
                          ) : (
                            ""
                          )}
                          {saveLetter &&
                          previewGeneratedLetter &&
                          showPreview ? (
                            <button
                              className={"LettersButtonsExtra"}
                              onClick={previewShowCauseLetter}
                            >
                              Preview Show Cause Notice
                            </button>
                          ) : (
                            ""
                          )}

                          {saveLetter && previewGeneratedLetter && showPreview && (
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
                                  onClick={submitfinalShowCauseLetter}
                                >
                                  Submit
                                </button>
                              ) : (
                                // <Button
                                //   type="button"
                                //   onClick={submitfinalShowCauseLetter}
                                //   style={{
                                //     marginTop: "2rem",
                                //     marginBottom: "2rem",
                                //     textAlign: "center",
                                //   }}
                                // >
                                //   Submit
                                // </Button>
                                ""
                              )}
                            </div>
                          )}
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

export default IssueShowCauseNotice;
