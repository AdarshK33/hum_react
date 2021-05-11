import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import "./EmployeeExit.css";
const EmployeeExitAction = () => {
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(false);
  const [RcryError, setRcryError] = useState(false);
  const [RehireError, setRehireError] = useState(false);
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
  });
  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationData,
  } = useContext(EmployeeSeparationContext);
  console.log(ModeOfSeparationData);
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
      // state.modeOfSeparationId = employeeData.modeOfSeparationId;
      // state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
      state.dateOfResignation = employeeData.dateOfResignation;
      state.noticePeriod = employeeData.noticePeriod;
      state.lastWorkingDate = employeeData.lastWorkingDate;
      state.emailId = employeeData.emailId;
      state.comments = employeeData.employeeComment;
    }
  }, [employeeData]);
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
  }, [employeeData, ModeOfSeparationData]);
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
  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateCheckBoxes(RcryYes, RcryNo, setRcryError) === true) &
      (validateCheckBoxes(RehireYes, RehireNo, setRehireError) === true)
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
    }
  };

  return (
    <Fragment>
      <Breadcrumb title="EMPLOYEE SEPARATION" parent="EMPLOYEE SEPARATION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>EMPLOYEE SEPARATION </b>
                </div>
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
                            &nbsp;&nbsp; {state.empName} {state.empId}
                          </label>
                        </label>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div>
                        <label>
                          <b>Contract Type:</b>
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.contractType}
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
                            {state.mngrId}
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
                        />
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

                    <button className="stepperButtons" onClick={submitHandler}>
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeExitAction;
