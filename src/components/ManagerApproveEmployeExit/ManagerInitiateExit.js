import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import "./EmployeeExit.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setGlobalCssModule } from "reactstrap/es/utils";

const ManagerInitiateExit = () => {
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [changeInSeparation, setChangeInSeparation] = useState(0);
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
  const [dateOfResignation, setDateOfResignation] = useState("");
  const [lastWorkingDate, setLastWorkingDate] = useState("");
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
  const [modeOfSeparationList, setModeOfSeparationList] = useState([]);
  const [reasonOfSeparationList, setReasonOfSeparationList] = useState([]);

  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationData,
    UpdateEmplyoeeExist,
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
  }, [employeeData]);
  useEffect(() => {
    if (
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      let tempArr = [];
      //   ModeOfSeparationData.map((item, i) => {
      //     tempArr.push({
      //       label: ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation,
      //       value: ModeOfSeparationData[i].modeOfSeparation.separationId,
      //     });
      //   });
      tempArr.push({
        label: "Resignation",
        value: 1,
      });
      tempArr.push({
        label: "Termination",
        value: 2,
      });
      setModeOfSeparationList(tempArr);
    }
  }, [ModeOfSeparationData]);
  console.log("modeOfSeparationList", modeOfSeparationList);

  useEffect(() => {
    if (
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      let tempArray = [];
      ModeOfSeparationData.map((item, i) => {
        if (
          ModeOfSeparationData[i].modeOfSeparation.separationId ===
          changeInSeparation
        )
          ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
            tempArray.push({
              label:
                ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  .modeOfSeparationReason,
              value:
                ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  .separationReasonId,
            });
          });
      });
      setReasonOfSeparationList(tempArray);
    }
  }, [ModeOfSeparationData, changeInSeparation]);
  console.log("reasonOfSeparationList", reasonOfSeparationList);

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
  const handleClose = () => {
    setModal(false);
    setSuccessModal(false);
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
  const ModeOfSepchangeHandler = (e) => {
    setModeOfSeparation(e.target.value);
    modeOfSeparationList.map((item, i) => {
      if (modeOfSeparationList[i].label === e.target.value) {
        setChangeInSeparation(modeOfSeparationList[i].value);
        console.log(modeOfSeparationList[i].value);
      }
    });

    console.log(e.target.value);
  };

  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setDateOfResignation(AdjusteddateValue);
  };

  const dateOfBirthHandler1 = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setLastWorkingDate(AdjusteddateValue);
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
          status: employeeData.status,
          withdraw: employeeData.withdraw,
        };
        UpdateEmplyoeeExist(InfoData);
        setSuccessModal(true);
        console.log("in else");
      }
    }
  };

  return (
    <Fragment>
      <Modal show={showModal} onHide={() => handleClose()} centered>
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
                    <Col sm={2}>
                      <div>
                        <label>Emp Name/Id:</label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        {false ? (
                          <label className="itemResult">
                            {" "}
                            &nbsp;&nbsp; {state.empName} &nbsp;{state.empId}
                          </label>
                        ) : (
                          <Form.Group>
                            <div className="faq-form ">
                              <input
                                className="form-control"
                                type="text"
                                // disabled={disabled}
                                // value={empName1}
                                style={{ borderRadius: "5px" }}
                                // style={
                                //   empName1Error ? { borderColor: "red" } : {}
                                // }
                                placeholder="Search.."
                                // onChange={(e) => empName1Handler(e)}
                                required
                              />
                              <Search
                                className="search-icon"
                                style={{ color: "#313131" }}
                                // onClick={searchDataHandler}
                              />
                            </div>
                          </Form.Group>
                        )}
                      </div>
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
                    <Col sm={4}>
                      <div>
                        <label>
                          Location:
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.empLocation}
                          </label>
                        </label>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div>
                        <label>
                          Position:
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
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Col sm={2}>
                      <div>
                        <label>Mode of Separation:</label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        {false ? (
                          <label className="itemResult">
                            &nbsp;&nbsp; {modeOfSeparation}
                          </label>
                        ) : (
                          <Form.Group>
                            <Form.Control
                              as="select"
                              name="lgbt"
                              options={modeOfSeparationList}
                              value={modeOfSeparation}
                              onChange={ModeOfSepchangeHandler}
                              //   disabled={disabled}
                            >
                              <option value=""></option>
                              {modeOfSeparationList.map((item) => {
                                return (
                                  <option key={item.value}>{item.label}</option>
                                );
                              })}
                              {/* <option value="">LGBT</option>
                              <option> Yes</option>
                              <option> No</option> */}
                            </Form.Control>
                          </Form.Group>
                        )}
                      </div>
                    </Col>

                    <Col sm={2}>
                      <div>
                        <label>Date of Resignation:</label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        {false ? (
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.dateOfResignation}
                          </label>
                        ) : (
                          <Form.Group>
                            <div
                            //   className={
                            //     DOBError ? "onBoard-date-error" : "onBoard-date"
                            //   }
                            >
                              <DatePicker
                                // style={DOBError ? { borderColor: "red" } : {}}
                                className="form-control onBoard-view"
                                selected={dateOfResignation}
                                name="dateOfResignation"
                                // required
                                onChange={(e) => dateOfBirthHandler(e)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="YYYY-MM-DD"
                                // disabled={disabled}
                              />
                            </div>
                            {/* {DOBError ? (
                              <p style={{ color: "red" }}>Age should be above 18</p>
                            ) : (
                              <p></p>
                            )} */}
                          </Form.Group>
                        )}
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        <label>Preffered Last Working Date:</label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        {false ? (
                          <label className="itemResult">
                            &nbsp;&nbsp; {lastWorkingDate}
                          </label>
                        ) : (
                          <Form.Group>
                            <div
                            //   className={
                            //     DOBError ? "onBoard-date-error" : "onBoard-date"
                            //   }
                            >
                              <DatePicker
                                // style={DOBError ? { borderColor: "red" } : {}}
                                className="form-control onBoard-view"
                                selected={state.lastWorkingDate}
                                name="lastWorkingDate"
                                // required
                                onChange={(e) => dateOfBirthHandler1(e)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="YYYY-MM-DD"
                                // disabled={disabled}
                              />
                            </div>
                            {/* {DOBError ? (
                              <p style={{ color: "red" }}>Age should be above 18</p>
                            ) : (
                              <p></p>
                            )} */}
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
                      <div>
                        <label>Reason of Separation:</label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        {false ? (
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.modeOfSeparationReasonId}
                          </label>
                        ) : (
                          <Form.Group>
                            <Form.Control
                              as="select"
                              name="lgbt"
                              options={reasonOfSeparationList}
                              //   value={state.lgbt}
                              //   onChange={changeHandler}
                              //   disabled={disabled}
                            >
                              <option value=""></option>
                              {reasonOfSeparationList.map((item) => {
                                return (
                                  <option key={item.value}>{item.label}</option>
                                );
                              })}
                            </Form.Control>
                          </Form.Group>
                        )}
                      </div>
                    </Col>
                    {/* <Col sm={4}>
                      <div>
                        <label>
                          <b>Notice Period:</b>
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.noticePeriod}
                          </label>
                        </label>
                      </div>
                    </Col> */}

                    <Col sm={2}>
                      <div>
                        <label>Personal Email Id:</label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        {false ? (
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.emailId}
                          </label>
                        ) : (
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder=""
                              required
                              style={{
                                borderColor: "#006ebb",
                              }}
                              //   disabled={!RcryYes}
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
                        )}
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        <label>Notice Period Recovery</label>
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
                  </Row>
                  {/* <Row
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
                  </Row> */}
                  <Row
                    style={{
                      marginTop: "2rem",
                      marginLeft: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Col sm={2}>
                      <div>
                        <label>Notice Period Recovery Days</label>
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
                          Eligible <br />
                          For Rehire
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

export default ManagerInitiateExit;
