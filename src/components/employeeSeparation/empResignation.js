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
  const [regDate, setRegDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [reasonOfSepration, setReasonOfSepration] = useState("");
  const [emailId, setEmailId] = useState("");
  const [approver, setApprover] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [withdrwaThis, setWithdrawThis] = useState(false);
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
    CreateEmplyoeeExist,
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
  console.log("employeeData", employeeData);
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
        user["locationName"] = item.locationName;
      }
    });
  }
  console.log("locationDetailsList", locationDetailsList);
  useEffect(() => {
    managerData(user.costCentre);
  }, [user.costCentre]);
  console.log(user, "user");
  useEffect(() => {
    modeOfSeparation();
    ModeOfSeparationView();
    ViewEmployeeDataById(user.employeeId);
  }, []);

  useEffect(() => {
    if (
      managerList &&
      managerList &&
      managerList !== null &&
      managerList !== undefined &&
      Object.keys(managerList).length !== 0
    ) {
      let managerNames = managerList.filter(
        (j) => j.employeeId === user.managerId
      );
      console.log("managerNames", managerNames, managerList);
      if (
        managerNames &&
        managerNames !== null &&
        managerNames !== undefined &&
        Object.keys(managerNames).length !== 0
      ) {
        setApprover(managerNames[0].firstName + " " + managerNames[0].lastName);
      }
    }
  }, [managerList]);

  useEffect(() => {
    console.log("profile data", user, employeeData);
    if (
      user !== null &&
      user !== undefined &&
      (employeeData === null ||
        employeeData === undefined ||
        Object.keys(employeeData).length > 0)
    ) {
      console.log("profile data", user);
      setEmailId(user.personalEmail);
    }
  }, [user]);

  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      setRegDate(new Date(employeeData.dateOfResignation));
      setLastDate(new Date(employeeData.lastWorkingDate));
      setReasonOfSepration("");
      setEmailId(employeeData.emailId);
      setSubmitted(true);
      setComments(employeeData.employeeComment);
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
      let tempArray;
      ModeOfSeparationData.map((item, i) => {
        if (employeeData.modeOfSeparationId === 0) {
          tempArray = " ";
        } else if (employeeData.modeOfSeparationId === 4) {
          ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
            if (employeeData.modeOfSeparationReasonId === 0) {
              tempArray = " ";
            } else if (
              employeeData.modeOfSeparationReasonId ===
              ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                .separationReasonId
            ) {
              tempArray =
                ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  .modeOfSeparationReason;
            }
          });
        }
      });
      console.log("tempArray", tempArray);
      setReasonOfSepration(tempArray);
    }
  }, [employeeData, ModeOfSeparationData]);

  useEffect(() => {
    console.log("loader in useEffect ", loader, managerList);
  }, [loader]);
  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      if (withdrwaThis === true) {
        console.log("state.empId", employeeData.exitId);
        withdraw(employeeData.exitId);
        setWithdrawThis(false);
        setRegDate();
        setLastDate();
        setReasonOfSepration("");
        setEmailId(user.personalEmail);
        if (
          managerList &&
          managerList &&
          managerList !== null &&
          managerList !== undefined &&
          Object.keys(managerList).length !== 0
        ) {
          let managerNames = managerList.filter(
            (j) => j.employeeId === user.managerId
          );
          console.log("managerNames", managerNames, managerList);
          if (
            managerNames &&
            managerNames !== null &&
            managerNames !== undefined &&
            Object.keys(managerNames).length !== 0
          ) {
            setApprover(
              managerNames[0].firstName + " " + managerNames[0].lastName
            );
          }
        }
        setComments("");
        setSubmitted(false);
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
      if (reasonOfSeparationList[i].label === reasonOfSepration) {
        reasonId = reasonOfSeparationList[i].value;
        console.log(reasonOfSeparationList[i].value);
      }
    });
    const data1 = {
      company: user.company,
      contractType: user.contractType,
      costCentreManagerEmailId: null,
      costCentreManagerName: null,
      costCentreName: user.costCentre,
      dateOfResignation: regDate,
      emailId: emailId,
      empName: user.firstName + user.lastName,
      employeeComment: comments,
      employeeId: user.employeeId,
      employeeName: user.firstName + user.lastName,
      exitId: 0,
      hoursWorked: 0,
      lastWorkingDate: lastDate,
      location: user.locationId,
      managerCostCentre: null,
      managerEmailId: null,
      managerId: user.managerId,
      managerName: approver,
      managerPosition: null,
      modeOfSeparationId: 4,
      modeOfSeparationReasonId: reasonId,
      noticePeriod: 0,
      noticePeriodRecovery: 0,
      noticePeriodRecoveryDays: 0,
      position: user.position,
      reHire: 0,
      reason: null,
      reasonForResignation: reasonOfSepration,
      rehireRemark: null,
      status: 0,
    };
    console.log(data1, "dtat1");
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
    // empResign(data1);
    CreateEmplyoeeExist(data1, user.employeeId);
    // ViewEmployeeDataById(user.employeeId);
    setSubmitted(true);
  };

  const withdrawHandler = (e) => {
    setWithdrawThis(true);
    ViewEmployeeDataById(user.employeeId);
    managerData(user.costCentre);

    // if (
    //   employeeData &&
    //   employeeData &&
    //   employeeData !== null &&
    //   employeeData !== undefined &&
    //   Object.keys(employeeData).length !== 0
    // ) {
    //   withdraw(employeeData.exitId);
    //   setRegDate(new Date());
    //   setLastDate(new Date());
    //   setReasonOfSepration("");
    //   setEmailId("");
    //   setApprover("");
    //   setComments("");
    //   setSubmitted(false);
    // }
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
                        className="disabledValue readTextBlue"
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
                        className="disabledValue readTextBlue"
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
                        className="disabledValue readTextBlue"
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
                        className="disabledValue readTextBlue"
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
                        className="disabledValue readTextBlue"
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
                        className="disabledValue readTextBlue"
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
                          className="disabledValue readTextBlue"
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
                          className="disabledValue readTextBlue"
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
                          className="form-control non-disable readTextBlue"
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
                        className="disabledValue readTextBlue"
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
                          className="disabledValue readTextBlue"
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
                          className="non-disable readTextBlue"
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
                          className="disabledValue readTextBlue"
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
                          className="form-control non-disable readTextBlue"
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
                          className="disabledValue readTextBlue"
                        />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Row}>
                      <Form.Label column sm="4" className="labels-data">
                        Approver:
                      </Form.Label>
                      <Col sm="8">
                        {/* <Form.Control
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
                        </Form.Control> */}
                        <Form.Control
                          type="text"
                          value={approver}
                          readOnly
                          className="disabledValue readTextBlue"
                        />
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
                      <a href="#" className="readTextBlue">
                        Exit Feedback Form
                      </a>
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
                          className="disabledValue readTextBlue"
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
                          className="non-disable readTextBlue"
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
