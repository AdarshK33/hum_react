import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../../common/breadcrumb";
import { EmployeeSeparationContext } from "../../../context/EmployeeSeparationState";
import moment from "moment";
import "../../ManagerApproveEmployeExit/EmployeeExit.css";
import { setGlobalCssModule } from "reactstrap/es/utils";
import RelievingLetter from "./RelivingLetter";
import calendarImage from "../../../assets/images/calendar-image.png";

const HistoryView = () => {
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(false);
  const [RcryError, setRcryError] = useState(false);
  const [RehireError, setRehireError] = useState(false);
  const [rcryDaysError, setRcryDaysError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showRelivingModal, setShow] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);

  const [state, setState] = useState({
    empName: "",
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
    empPosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    modeOfSeparationId: "",
    modeOfSeparationReasonId: "",
    dateOfResignation: "",
    noticePeriod: "",
    lastWorkingDate: "",
    emailId: "",
    comments: "",
    noticePeriodRcryDays: "",
    remarks: "",
  });
  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationData,
    UpdateEmplyoeeExist,
    employeeId,
    loader,
    updateResponse,
    fetchRelievingLetterData,
    relivingLetterData,
  } = useContext(EmployeeSeparationContext);
  console.log("employeeId", employeeId);
  useEffect(() => {
    ViewEmployeeDataById(employeeId);
  }, [employeeId]);
  console.log("employeeData", employeeData);
  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      state.empName = employeeData.employeeName;
      state.empId = employeeData.employeeId;
      state.empContractType = employeeData.contractType;
      state.empCostCenterName = employeeData.costCentreName;
      state.empLocation = employeeData.location;
      state.empPosition = employeeData.position;
      state.mngrName = employeeData.managerName;
      state.mngrId = employeeData.managerId;
      state.mngrCostCenterName = employeeData.managerCostCentre;
      state.mngrPosition = employeeData.managerPosition;
      state.noticePeriod = employeeData.noticePeriod;
      // state.modeOfSeparationId = employeeData.modeOfSeparationId;
      // state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
      // if (
      //   employeeData.department == "AFS" ||
      //   employeeData.department == "IT" ||
      //   employeeData.department == "Legal" ||
      //   employeeData.department == "Finance"
      // ) {
      //   state.noticePeriod = 2;
      // } else {
      //   state.noticePeriod = 1;
      // }
      state.dateOfResignation = employeeData.dateOfResignation;
      // state.noticePeriod = employeeData.noticePeriod;
      state.lastWorkingDate = employeeData.lastWorkingDate;
      state.emailId = employeeData.personalEmailId;
      state.comments = employeeData.employeeComment;
      state.noticePeriodRcryDays =
        employeeData.noticePeriodRecoveryDays !== null &&
        employeeData.noticePeriodRecoveryDays !== undefined
          ? employeeData.noticePeriodRecoveryDays
          : "";

      if (
        employeeData.noticePeriodRecovery !== null &&
        employeeData.noticePeriodRecovery !== undefined
      ) {
        if (employeeData.noticePeriodRecovery === 2) {
          setRcryNo(true);
          setRcryYes(false);
        } else if (employeeData.noticePeriodRecovery === 1) {
          setRcryNo(false);
          setRcryYes(true);
        } else if (employeeData.noticePeriodRecovery === 0) {
          setRcryNo(false);
          setRcryYes(false);
        }
      } else {
        setRcryNo(false);
        setRcryYes(false);
      }
      if (employeeData.reHire !== null && employeeData.reHire !== undefined) {
        if (employeeData.reHire === 2) {
          setRehireNo(true);
          setRehireYes(false);
        } else if (employeeData.reHire === 1) {
          setRehireNo(false);
          setRehireYes(true);
        } else if (employeeData.reHire === 0) {
          setRehireNo(false);
          setRehireYes(false);
        }
      } else {
        setRehireNo(false);
        setRehireYes(false);
      }
    }
  }, [employeeData, ModeOfSeparationData, employeeId]);
  useEffect(() => {
    if (
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0 &&
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      if (employeeData.modeOfSeparationId === 1) {
        console.log(ModeOfSeparationData[0].modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      ModeOfSeparationData.map((item, i) => {
        if (
          employeeData.modeOfSeparationId ===
          ModeOfSeparationData[i].modeOfSeparation.separationId
        ) {
          setModeOfSeparation(
            ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation
          );

          ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
            if (
              employeeData.modeOfSeparationReasonId ===
              ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                .separationReasonId
            ) {
              state.modeOfSeparationReasonId =
                ModeOfSeparationData[i].modeOfSeparationReasonList[
                  j
                ].modeOfSeparationReason;
            }
          });
        }
      });
    }
  }, [employeeData, ModeOfSeparationData, employeeId]);
  const handleNoticePeriodRcryYes = (e) => {
    setRcryYes(e.target.checked);
    setRcryNo(!e.target.checked);
  };
  const handleNoticePeriodRcryNo = (e) => {
    setRcryYes(!e.target.checked);
    setRcryNo(e.target.checked);
  };
  const handleRehireChangeYes = (e) => {
    setRehireYes(e.target.checked);
    setRehireNo(!e.target.checked);
  };
  const handleRehireChangeNo = (e) => {
    setRehireYes(!e.target.checked);
    setRehireNo(e.target.checked);
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

  const submitfinalRelivingLetter = () => {
    if (
      employeeData.employeeId !== null &&
      employeeData.employeeId !== undefined
    ) {
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);
      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };

  const previewRelivingLetter = () => {
    if (employeeData !== null && employeeData !== undefined) {
      fetchRelievingLetterData(employeeData.employeeId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const relivingLetterClick = (e) => {
    e.preventDefault();
    fetchRelievingLetterData(employeeData.employeeId);
    handleShow();
    setPreviewGeneratedLetter(true);
  };

  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
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
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  const validateCheckBoxes = (itemYes, itemNo, setError) => {
    if ((itemYes === true) | (itemNo === true)) {
      setError(false);
      console.log(itemYes, itemNo);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const validateRcryDays = () => {
    const Valid = /^[0-9\b]+$/;
    if (RcryYes === true) {
      if (
        state.noticePeriodRcryDays !== "" &&
        state.noticePeriodRcryDays !== null &&
        state.noticePeriodRcryDays !== undefined &&
        Valid.test(state.noticePeriodRcryDays)
      ) {
        setRcryDaysError(false);
        return true;
      } else {
        setRcryDaysError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateCheckBoxes(RcryYes, RcryNo, setRcryError) === true) &
      (validateCheckBoxes(RehireYes, RehireNo, setRehireError) === true) &
      (validateRcryDays() === true)
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
      if (
        (RehireNo === true && state.remarks === "") ||
        state.remarks === null ||
        state.remarks === undefined
      ) {
        setModal(true);
      } else {
        const InfoData = {
          company: employeeData.company,
          contractType: employeeData.contractType,
          costCentreManagerEmailId: employeeData.costCentreManagerEmailId,
          costCentreManagerName: employeeData.costCentreManagerName,
          costCentreName: employeeData.costCentreName,
          dateOfResignation: employeeData.dateOfResignation,
          emailId: employeeData.emailId,
          empName: employeeData.empName,
          employeeComment: employeeData.employeeComment,
          employeeId: employeeData.employeeId,
          employeeName: employeeData.employeeName,
          exitId: employeeData.exitId,
          hoursWorked: employeeData.hoursWorked,
          lastWorkingDate: employeeData.lastWorkingDate,
          location: employeeData.location,
          managerCostCentre: employeeData.managerCostCentre,
          managerEmailId: employeeData.managerEmailId,
          managerId: employeeData.managerId,
          managerName: employeeData.managerName,
          managerPosition: employeeData.managerPosition,
          modeOfSeparationId: employeeData.modeOfSeparationId,
          modeOfSeparationReasonId: employeeData.modeOfSeparationReasonId,
          noticePeriodRecoveryDays: state.noticePeriodRcryDays,
          noticePeriod: employeeData.noticePeriod,
          noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
          position: employeeData.position,
          reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
          reason: employeeData.reason,
          reasonForResignation: employeeData.reasonForResignation,
          rehireRemark: state.remarks !== "" ? state.remarks : null,
          status: 2,
          withdraw: employeeData.withdraw,
        };
        UpdateEmplyoeeExist(InfoData);
        setSuccessModal(true);
        setPreview(true);
        console.log("in else");
      }
    }
  };

  return (
    <Fragment>
      <Modal show={showRelivingModal} onHide={handleRelivingClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body>
            <div className="offer-letter-message ">
              <p>
                The details have been saved successfully. The relieving letter
                will be sent to the employee on{" "}
                {relivingLetterData.lastWorkingDate}
              </p>
              <br></br>
              {/* <Link
                to="/employee-separation-listing
              "
                className="text-center"
              > */}
              <Button type="button" onClick={handleRelivingClose}>
                Close
              </Button>
              {/* </Link> */}
            </div>
          </Modal.Body>
        ) : previewLetter || showRelivingModal ? (
          <Modal.Body>
            {relivingLetterData &&
            relivingLetterData !== undefined &&
            relivingLetterData !== null ? (
              <RelievingLetter />
            ) : (
              ""
            )}
            <br></br>
            <Row>
              {/* <Col sm={6}>
                <p>Thanking you</p>
                <p>{employeeData.managerName}</p>
              </Col> */}

              {showSignature ? (
                <Fragment>
                  <br></br>
                  <img
                    src={calendarImage}
                    alt="calendar"
                    width="50px"
                    className="digital-signature"
                  />
                </Fragment>
              ) : (
                <>
                  <br></br>
                  <Button
                    variant="primary"
                    style={{ marginLeft: "20px" }}
                    onClick={digitalSignature}
                  >
                    Add digital signature
                  </Button>
                </>
              )}
            </Row>
            {showSignature && !previewLetter ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <Button variant="primary" onClick={saveOfferLetter}>
                    Save Changes
                  </Button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
      <Modal show={showModal} onHide={() => handleClose1()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">State remarks:</label>
            <textarea
              className="remarkText rounded"
              name="remarks"
              value={state.remarks}
              placeholder="Write here.."
              onChange={(e) => changeHandler(e)}
            />

            {remarkError && (
              <p style={{ color: "red" }}>Please add your remarks</p>
            )}
            <div className="text-center mb-2">
              <Button onClick={() => handleSaveRemarks()}>Save</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">
              Exit details saved successfully, the employee has been notified
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      {/* <Breadcrumb title="EMPLOYEE SEPARATION" parent="EMPLOYEE SEPARATION" /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>EMPLOYEE SEPARATION </b>
                </div>
                {loader === true ? (
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
                ) : (
                  <Form>
                    <Row
                      style={{
                        marginLeft: "2rem",
                        marginTop: "2rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Emp Name/Id:</b>
                            <label className="itemResult">
                              {" "}
                              &nbsp;&nbsp; {state.empName} &nbsp;{state.empId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Contract Type:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empContractType}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Cost Center Name:</b>
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
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Location:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empLocation}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Position:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.empPosition}
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
                            <b>Manager Name/Id:</b>
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
                            <b>Position:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.mngrPosition}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Cost Center Name:</b>
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
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Mode of Separation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {modeOfSeparation}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Reason of Separation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.modeOfSeparationReasonId}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Date of Resignation:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.dateOfResignation}
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
                        <div>
                          <label>
                            <b>Notice Period:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp;{" "}
                              {state.noticePeriod == 1
                                ? `${state.noticePeriod} Month`
                                : state.noticePeriod == 2
                                ? `${state.noticePeriod} Months`
                                : ""}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Preffered Last Working Date:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.lastWorkingDate}
                            </label>
                          </label>
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div>
                          <label>
                            <b>Personal Email Id:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.emailId}
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
                      <Col sm={12}>
                        <div>
                          <label>
                            <b>Comments:</b>
                            <label className="itemResult">
                              &nbsp;&nbsp; {state.comments}
                            </label>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <Col sm={2}>
                        <div>
                          <label>
                            <b>Notice Period Recovery</b>
                          </label>
                          {RcryError ? (
                            <p style={{ color: "red" }}>
                              {" "}
                              *Please select one of the option
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              value="yes"
                              disabled="true"
                              checked={RcryYes}
                              style={RcryError ? { borderColor: "red" } : {}}
                              // required={required}
                              onChange={handleNoticePeriodRcryYes}
                            />
                            <label className="itemResult">Yes</label>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              disabled="true"
                              value="no"
                              checked={RcryNo}
                              style={RcryError ? { borderColor: "red" } : {}}
                              // required={required}
                              onChange={handleNoticePeriodRcryNo}
                            />
                            <label className="itemResult">No</label>
                          </div>
                        </Form.Group>
                      </Col>

                      <Col sm={2}>
                        <div>
                          <label>
                            <b>Notice Period Recovery Days</b>
                          </label>
                          {/* {uanNumberError ? (
                <p style={{ color: "red" }}> *Please enter your UAN number</p>
              ) : (
                <p></p>
              )} */}
                        </div>
                      </Col>
                      <Col sm={2} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <Form.Control
                            disabled="true"
                            type="text"
                            placeholder=""
                            required
                            style={{
                              borderColor: "#006ebb",
                            }}
                            disabled={!RcryYes}
                            name="noticePeriodRcryDays"
                            value={state.noticePeriodRcryDays}
                            onChange={(e) => changeHandler(e)}
                            style={rcryDaysError ? { borderColor: "red" } : {}}
                          />

                          {rcryDaysError ? (
                            <p style={{ color: "red" }}>
                              {" "}
                              &nbsp; *Please enter valid days
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col sm={2}>
                        <div>
                          <label>
                            <b>
                              Eligible <br />
                              For Rehire
                            </b>
                          </label>
                          {RehireError ? (
                            <p style={{ color: "red" }}>
                              {" "}
                              *Please select one of the option
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              disabled="true"
                              value="yes"
                              checked={RehireYes}
                              // required={required}
                              style={RehireError ? { borderColor: "red" } : {}}
                              onChange={handleRehireChangeYes}
                            />
                            <label className="itemResult">Yes</label>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col sm={1} style={{ marginTop: "0.5rem" }}>
                        <Form.Group>
                          <div className="boxField_2 input">
                            <input
                              className="largerCheckbox"
                              type="checkbox"
                              disabled="true"
                              value="no"
                              checked={RehireNo}
                              // required={required}
                              style={RehireError ? { borderColor: "red" } : {}}
                              onChange={handleRehireChangeNo}
                            />
                            <label className="itemResult">No</label>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    {state.remarks !== "" &&
                    state.remarks !== null &&
                    state.remarks !== undefined ? (
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={12}>
                          <div>
                            <label>
                              <b>Remarks:</b>
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.remarks}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <div
                      style={{
                        marginTop: "2rem",
                        marginBottom: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {/* <button className="stepperButtons" onClick={PrevStep}>
            Back
          </button> */}
                      {(employeeData.status === 0 ||
                        updateResponse.status === 0) &&
                      letterSent === false ? (
                        <button
                          // style={
                          //   showModal | showSuccessModal
                          //     ? { borderColor: "#aaa" }
                          //     : ""
                          // }
                          disabled={showModal | showSuccessModal}
                          className="stepperButtons"
                          onClick={submitHandler}
                        >
                          Save
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    {!saveLetter &&
                    (employeeData.status === 2 || showPreview === true) ? (
                      <Row>
                        <Col sm={4}></Col>
                        <Col
                          sm={2}
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          {/* <Button disabled="true"    type="button" onClick={relivingLetterClick}>
                            Generate Relieving Letter
                          </Button> */}
                        </Col>
                      </Row>
                    ) : (
                      saveLetter &&
                      previewGeneratedLetter === true && (
                        <div className="preview-section">
                          <Button type="button" onClick={previewRelivingLetter}>
                            Preview Reliving Letter
                          </Button>
                          <br></br>
                          <br></br>
                          <img
                            src={calendarImage}
                            alt="calendar"
                            width="200px"
                          />
                          <br></br>
                          <br></br>
                          {letterSent ? (
                            ""
                          ) : (
                            <Button
                              type="button"
                              disabled="true"
                              onClick={submitfinalRelivingLetter}
                              style={{
                                marginTop: "2rem",
                                marginBottom: "2rem",
                                textAlign: "center",
                              }}
                            >
                              Submit
                            </Button>
                          )}
                        </div>
                      )
                    )}
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HistoryView;
