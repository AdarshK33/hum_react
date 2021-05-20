import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import RelievingLetter from "./Relieving Letter";
import { setGlobalCssModule } from "reactstrap/es/utils";
import { useParams } from "react-router-dom";
import moment from "moment";
import calendarImage from "../../assets/images/calendar-image.png";

import "./exitForm.css";
const EmployeeExitAction = () => {
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
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState(false);

  const params = useParams();

  const paramsemployeeId = params["employeeid"];

  const [state, setState] = useState({
    exitId: "",
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
    status: "",
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
    fetchRelievingLetterData,
    relivingLetterData,
    terminationConfirmation,
    resignationConfirmation,
  } = useContext(EmployeeSeparationContext);
  console.log("employeeId", employeeId);
  useEffect(() => {
    ViewEmployeeDataById(employeeId);
    fetchRelievingLetterData(paramsemployeeId);
  }, [employeeId]);
  useEffect(() => {
    console.log(employeeData);
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      console.log("employeeData................", employeeData);
      state.exitId = employeeData.exitId;
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
      state.status = employeeData.status;
       state.modeOfSeparationId = employeeData.modeOfSeparationId;
      // state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
      state.dateOfResignation = employeeData.dateOfResignation;
      state.noticePeriod = employeeData.noticePeriod;
      state.lastWorkingDate = employeeData.lastWorkingDate;
      state.emailId = employeeData.emailId;
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

  const handleConfirmation = (exitId, employeeId) => {
    console.log(state.modeOfSeparationId ,"deepika")
    if(state.modeOfSeparationId == 2 ) {
      console.log(state.modeOfSeparationId ,"rajashekar")
      terminationConfirmation(exitId, employeeId);
    }else if(state.modeOfSeparationId == 1 ||state.modeOfSeparationId == 4 ) {
      console.log(state.modeOfSeparationId ,"sachin")
      resignationConfirmation(exitId, employeeId);
    }
    console.log(state.modeOfSeparationId ,"sravani")

    setModal(true);
  };
  const handleClosePopup = () => {
    setMessage(false);
  };

  const handleSubmit = () => {
    setMessage(true);
  };
  const viewResignation = () => {
    setPreviewLetter(true);
    if (relivingLetterData !== undefined) {
      setSubmit(true);
    }
  };

  return (
    console.log(state.status),
    (
      <Fragment>
        <Modal show={message} onHide={() => handleClosePopup()} centered>
          <Container style={{ textAlign: "center", margin: "2rem 0 2rem 0" }}>
            <Modal.Body>
              <p style={{ marginBottom: "2rem" }}>
                {" "}
                The details have been saved successfully. The relieving letter
                will be sent to the employee on {state.lastWorkingDate}
              </p>
              <Button onClick={() => handleClosePopup()}>OK</Button>
            </Modal.Body>
          </Container>
        </Modal>
        <Modal show={showModal} onHide={() => handleClose1()} centered>
          <Container style={{ textAlign: "center", margin: "1rem 0 1rem 0" }}>
            <Modal.Body style={{ marginBottom: "1rem" }}>
              Thank you for confirming the Resignation/ Termination details
              <Button
                style={{ marginTop: "1rem" }}
                onClick={() => handleClose1()}
              >
                OK
              </Button>
            </Modal.Body>
          </Container>
        </Modal>
        <RelievingLetter previewLetter={previewLetter} />
        <Breadcrumb title="EMPLOYEE SEPARATION" parent="EMPLOYEE SEPARATION" />
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
                    <div>
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
                                &nbsp;&nbsp; {state.noticePeriod}
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
                        <Col sm={2}>
                          <div>
                            <label>
                              <b>Exit Feedback Form:</b>
                              <label className="itemResult">
                                {/* &nbsp;&nbsp; {InfoState.empName} */}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            <label>
                              <a href="~/address">
                                <u>Exit Feedback Form</u>
                              </a>
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
                                checked={RcryYes}
                                style={RcryError ? { borderColor: "red" } : {}}
                                disabled={true}
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
                                value="no"
                                checked={RcryNo}
                                disabled={true}
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
                          </div>
                        </Col>
                        <Col sm={2} style={{ marginTop: "0.5rem" }}>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder=""
                              required
                              style={{
                                borderColor: "#006ebb",
                              }}
                              disabled={true}
                              name="noticePeriodRcryDays"
                              value={state.noticePeriodRcryDays}
                              onChange={(e) => changeHandler(e)}
                              style={
                                rcryDaysError ? { borderColor: "red" } : {}
                              }
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
                                value="yes"
                                checked={RehireYes}
                                disabled={true}
                                // required={required}
                                style={
                                  RehireError ? { borderColor: "red" } : {}
                                }
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
                                value="no"
                                checked={RehireNo}
                                disabled={true}
                                // required={required}
                                style={
                                  RehireError ? { borderColor: "red" } : {}
                                }
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

                        <button
                          disabled={state.status === 4 || state.status === 3}
                          className={
                            state.status === 4 || state.status === 3
                              ? "confirmButton"
                              : "stepperButtons"
                          }
                          onClick={() =>
                            handleConfirmation(state.exitId, paramsemployeeId)
                          }
                        >
                          Confirm
                        </button>
                        {state.status === 3 ||
                          (state.status === 4 && (
                            <button
                              // disabled={previewLetter | showSuccessModal}
                              className="resignationButton"
                              onClick={() => viewResignation()}
                            >
                              {modeOfSeparation === "Termination"
                                ? "View Termination Letter"
                                : "View Resignation Letter"}
                            </button>
                          ))}
                      </div>
                      {submit === true && (
                        <div className="text-center mb-3">
                          <br></br>
                          <br></br>
                          <img
                            src={calendarImage}
                            alt="calendar"
                            width="300px"
                          />
                        </div>
                      )}
                      {submit === true && (
                        <div className="text-center mb-2">
                          <button
                            className="stepperButtons"
                            // style={{ textAlign: "center" }}
                            onClick={() => handleSubmit()}
                          >
                            {" "}
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

export default EmployeeExitAction;
