import React, { useState, useContext, useEffect } from "react";
import { PermissionContext } from "../../context/PermissionState";
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
  const { locationDetails, locationDetailsList } = useContext(
    PermissionContext
  );
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
    locationDetails();
  }, []);
  if (
    locationDetailsList &&
    locationDetailsList &&
    locationDetailsList !== null &&
    locationDetailsList !== undefined &&
    Object.keys(locationDetailsList).length !== 0
  ) {
    locationDetailsList.map((item, i) => {
      if (item.locationId === user.locationId) {
        user['locationName'] = item.locationName;
      }
    });
  }
  console.log("locationDetailsList", locationDetailsList);
  useEffect(() => {
    managerData(user.costCentre);

  }, [user.costCentre]);
console.log(user,"user")
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
    var reasonId = 0;
          reasonOfSeparationList.map((item, i) => {
            if (
              reasonOfSeparationList[i].label === reasonOfSepration
            ) {
              reasonId = reasonOfSeparationList[i].value;
              console.log(reasonOfSeparationList[i].value);
            }
          })
    const data1 = {
      company: user.company,
      contractType: user.contractType,
      costCentreManagerEmailId: null,
      costCentreManagerName: null,
      costCentreName: user.costCentre,
      dateOfResignation: regDate,
      emailId: emailId,
      empName: user.employeeName,
      employeeComment: comments,
      employeeId: user.employeeId,
      employeeName: user.employeeName,
      exitId: 0,
      hoursWorked: 0,
      lastWorkingDate: lastDate,
      location:user.locationId,
      managerCostCentre: null,
      managerEmailId: null,
      managerId: approver,
      managerName: null,
      managerPosition: null,
      modeOfSeparationId: 4,
      modeOfSeparationReasonId: reasonId,
      noticePeriod: 0,
      noticePeriodRecovery:0,
      noticePeriodRecoveryDays:0,
      position:user.position,
      reHire:0,
      reason: null,
      reasonForResignation: reasonOfSepration,
      rehireRemark: null,
      status: 0,
    };
console.log(data1,"dtat1")
    // const create = {
    //   emailId: emailId,
    //   employeeComment: comments,
    //   employeeId: user.employeeId,
    //   exitId: 0,
    //   lastWorkingDate: moment(lastDate).format("YYYY-MM-DD"),
    //   managerId: approver,
    //   modeOfSeparationId: 1,
    //   modeOfSeparationReasonId: 1,
    //   withdraw: "string",
    // };
    // console.log("create", create);
     empResign(data1);
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
                        value={user.locationName}
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
                          minDate={moment().toDate()}
                          selected={regDate}
                          onChange={(date) => setRegDate(date)}
                          className="form-control non-disable blueTextData"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select Date"
                          minDate={new Date()}
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
                          minDate={moment().toDate()}
                          onChange={(date) => setLastDate(date)}
                          className="form-control non-disable blueTextData"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select Date"
                          minDate={new Date()}
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
                          required
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