import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AppContext } from "../../context/AppState";
import "../common/style.css";
import { SeparationContext } from "../../context/SepearationState";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const EmpResignation = () => {
  const [regDate, setRegDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());
  const [reasonOfSepration, setReasonOfSepration] = useState("");
  const [emailId, setEmailId] = useState("");
  const [approver, setApprover] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reasonOfSeparationList, setReasonOfSeparationList] = useState([]);

  const { user } = useContext(AppContext);
  const {
    employeeData,
    ModeOfSeparationData,
    ModeOfSeparationView,
    ViewEmployeeDataById,
  } = useContext(EmployeeSeparationContext);
  const {
    empResign,
    managerData,
    managerList,
    modeOfSeparation,
    modeOfResponse,
    reason,
    withdraw,
    loader,
  } = useContext(SeparationContext);

  useEffect(() => {
    managerData(user.costCentre);
  }, [user.costCentre]);

  useEffect(() => {
    modeOfSeparation();
    ModeOfSeparationView();
  }, []);

  useEffect(() => {
    console.log("loader in useEffect ", loader, managerList);
  }, [loader]);

  useEffect(() => {
    if (
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      let tempArray = [];
      ModeOfSeparationData.map((item, i) => {
        if (ModeOfSeparationData[i].modeOfSeparation.separationId === 4)
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
  }, [ModeOfSeparationData]);
  console.log("reasonOfSeparationList", reasonOfSeparationList);

  const SubmitHandler = (e) => {
    e.preventDefault();
    // const data1 = {
    //   company: "string",
    //   contractType: "string",
    //   costCentreManagerEmailId: "string",
    //   costCentreManagerName: "string",
    //   costCentreName: "string",
    //   dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
    //   emailId: state.emailId,
    //   empName: "string",
    //   employeeComment: "string",
    //   employeeId: state.empId,
    //   employeeName: "string",
    //   exitId: 0,
    //   hoursWorked: 0,
    //   lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
    //   location: "string",
    //   managerCostCentre: "string",
    //   managerEmailId: "string",
    //   managerId: "string",
    //   managerName: "string",
    //   managerPosition: "string",
    //   modeOfSeparationId: changeInSeparation,
    //   modeOfSeparationReasonId: reasonId,
    //   noticePeriod: 0,
    //   noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
    //   noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
    //   position: "string",
    //   reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
    //   reason: "string",
    //   reasonForResignation: "string",
    //   rehireRemark: "string",
    //   status: 2,
    //   withdraw: "string",
    // };

    const create = {
      emailId: emailId,
      employeeComment: comments,
      employeeId: user.employeeId,
      exitId: 0,
      lastWorkingDate: moment(lastDate).format("YYYY-MM-DD"),
      managerId: approver,
      modeOfSeparationId: 1,
      modeOfSeparationReasonId: 1,
      withdraw: "string",
    };
    console.log("create", create);
    empResign(create);
    setSubmitted(true);
  };

  const withdrawHandler = (e) => {
    withdraw(user.employeeId);
    setRegDate(new Date());
    setLastDate(new Date());
    setReasonOfSepration("");
    setEmailId("");
    setApprover("");
    setComments("");
    setSubmitted(false);
  };

  return (
    <>
      <Container>
        <Row className="emp-heading">
          <h5>Employee Resignation</h5>
        </Row>
        <Form onSubmit={SubmitHandler}>
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
            <>
              <Row>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="labels-data">
                      Emp Name/ID:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        value={` ${user.firstName} ${user.lastName}/ ${user.employeeId} `}
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="labels-data">
                      Contract Type:
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="text"
                        value={user.contractType}
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="labels-data">
                      Cost Center Name:
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="text"
                        value={user.costCentre}
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="labels-data">
                      Location:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        value={user.locationId}
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="labels-data">
                      Position:
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="text"
                        value={user.position}
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="labels-data">
                      Mode of Separation:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        value={reason}
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  {submitted === true ? (
                    <Form.Group as={Row}>
                      <Form.Label column sm="5" className="labels-data">
                        Reason of Separation:
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="text"
                          value={reasonOfSepration}
                          readOnly
                          className="disabledValue blueTextData"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="5" className="labels-data">
                        Reason of Separation:
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          as="select"
                          className="non-disable blueTextData"
                          required
                          value={reasonOfSepration}
                          onChange={(e) => setReasonOfSepration(e.target.value)}
                        >
                          {/* <option value="">Select Reason</option> */}
                          <option value=""></option>
                          {reasonOfSeparationList.map((item) => {
                            return (
                              <option key={item.value}>{item.label}</option>
                            );
                          })}

                          {/* {modeOfResponse !== null &&
                            modeOfResponse !== undefined &&
                            modeOfResponse.map((item) => {
                              return (
                                <option
                                  key={item.separationReasonId}
                                  value={item.modeOfSeparationReason}
                                >
                                  {item.modeOfSeparationReason}
                                </option>
                              );
                            })} */}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  )}
                </Col>
                <Col sm={4}>
                  {submitted === true ? (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Date of Resignation:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          value={moment(regDate).format("DD/MM/YYYY")}
                          readOnly
                          className="disabledValue blueTextData"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Date of Resignation:
                      </Form.Label>
                      <Col sm="8">
                        <DatePicker
                          selected={regDate}
                          onChange={(date) => setRegDate(date)}
                          className="form-control non-disable blueTextData"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select Date"
                          required
                        />
                      </Col>
                    </Form.Group>
                  )}
                </Col>
              </Row>

              <Row>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="labels-data">
                      Notice Period:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        value="2 Months"
                        readOnly
                        className="disabledValue blueTextData"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  {submitted === true ? (
                    <Form.Group as={Row}>
                      <Form.Label column sm="5" className="labels-data">
                        Personal Email Id:
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="text"
                          value={emailId}
                          readOnly
                          className="disabledValue blueTextData"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="5" className="labels-data">
                        {" "}
                        Personal Email Id:
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="email"
                          value={emailId}
                          className="non-disable blueTextData"
                          onChange={(e) => setEmailId(e.target.value)}
                          placeholder="Enter Email Id"
                          required
                        />
                      </Col>
                    </Form.Group>
                  )}
                </Col>
                <Col sm={4}>
                  {submitted === true ? (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Preffered Last Working Date:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          value={moment(lastDate).format("DD/MM/YYYY")}
                          readOnly
                          className="disabledValue blueTextData"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Preffered Last Working Date:
                      </Form.Label>
                      <Col sm="8">
                        <DatePicker
                          selected={lastDate}
                          onChange={(date) => setLastDate(date)}
                          className="form-control non-disable blueTextData"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select Date"
                          required
                        />
                      </Col>
                    </Form.Group>
                  )}
                </Col>
              </Row>

              <Row>
                <Col sm={4}>
                  {submitted === true ? (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Approver:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          value={approver}
                          readOnly
                          className="disabledValue blueTextData"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Approver:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          className="non-disable blueTextData"
                          value={approver}
                          onChange={(e) => setApprover(e.target.value)}
                        >
                          <option value="">Select Approver</option>
                          {managerList !== null &&
                            managerList !== undefined &&
                            managerList.map((item) => {
                              return (
                                <option
                                  key={item.employeeId}
                                  value={item.employeeId}
                                >
                                  {item.firstName + " " + item.employeeId}
                                </option>
                              );
                            })}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  )}
                </Col>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="labels-data">
                      Exit Feedback Form:
                    </Form.Label>
                    <Col sm="7">
                      <a href="#">Exit Feedback Form</a>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={8}>
                  {submitted === true ? (
                    <Form.Group as={Row}>
                      <Form.Label column sm="2" className="labels-data">
                        Comments:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          value={comments}
                          readOnly
                          className="disabledValue blueTextData"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="2">
                        {" "}
                        Comments:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className="non-disable blueTextData"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm={4}></Col>
                <Col>
                  {submitted === false ? (
                    <Button type="submit">Submit</Button>
                  ) : (
                    <Button onClick={withdrawHandler}>
                      WithDraw Resignation
                    </Button>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Container>
    </>
  );
};

export default EmpResignation;
