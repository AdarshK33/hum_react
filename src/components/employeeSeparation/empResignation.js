import React, { useState, useContext, useEffect } from "react";
import { PermissionContext } from "../../context/PermissionState";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AppContext } from "../../context/AppState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../common/style.css";
import { SeparationContext } from "../../context/SepearationState";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { setQuarter } from "date-fns";
const EmpResignation = () => {
  const [regDate, setRegDate] = useState();
  const [noticePeriod, setNoticePeriod] = useState(0);
  const [lastDate, setLastDate] = useState();
  const [reasonOfSepration, setReasonOfSepration] = useState("");
  const [emailId, setEmailId] = useState("");
  const [approver, setApprover] = useState("");
  const [approverId, setApproverId] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [withdrwaThis, setWithdrawThis] = useState(false);
  const [reasonOfSeparationList, setReasonOfSeparationList] = useState([]);
  const [lastDateSelection, setLastDateSelection] = useState(new Date());
  const { locationDetails, locationDetailsList } =
    useContext(PermissionContext);
  const { user,fetchemployeeData } = useContext(AppContext);
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
    managersByCostcenter,
    managersByCostcenterList
  } = useContext(SeparationContext);
  console.log("employeeData", user, fetchemployeeData,employeeData);
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
        fetchemployeeData["locationName"] = item.locationName;
      }
    });
  }
  console.log("locationDetailsList", locationDetailsList);
  useEffect(() => {
    managerData(fetchemployeeData.costCentre);
    managersByCostcenter(fetchemployeeData.costCentre)
  }, [fetchemployeeData.costCentre]);
  console.log(user,fetchemployeeData, "user");
  useEffect(() => {
    if (employeeData == null) {
      ViewEmployeeDataById(fetchemployeeData.employeeId);
      setSubmitted(false);
      setReasonOfSepration("");
      setComments();
      modeOfSeparation();
      ModeOfSeparationView();
    }
  }, [employeeData]);
  useEffect(() => {
    modeOfSeparation();
    ModeOfSeparationView();
    ViewEmployeeDataById(fetchemployeeData.employeeId);
  }, [fetchemployeeData]);

  useEffect(() => {
    if (
      managersByCostcenterList &&
      managersByCostcenterList &&
      managersByCostcenterList !== null &&
      managersByCostcenterList !== undefined &&
      Object.keys(managersByCostcenterList).length !== 0
    ) {
      let managerNames = managersByCostcenterList.filter(
        (j) => j.employeeId === fetchemployeeData.managerId
      );
      console.log("managerNames", managerNames, managersByCostcenterList);
      if (
        managerNames &&
        managerNames !== null &&
        managerNames !== undefined &&
        Object.keys(managerNames).length !== 0
      ) {
        setApprover(managerNames[0].firstName + " " + managerNames[0].lastName);
        setApproverId(managerNames[0].employeeId);
      }
    }
  }, [managersByCostcenterList]);

  useEffect(() => {
    console.log("profile data", user, "profile data1", employeeData);
    if (
      fetchemployeeData !== null &&
      fetchemployeeData !== undefined &&
      (employeeData === null ||
        employeeData === undefined ||
        Object.keys(employeeData).length > 0)
    ) {
      console.log("profile data", fetchemployeeData);
      setEmailId(fetchemployeeData.personalEmail);
      // if(user.department == "AFS" || user.department == "IT" ||user.department == "Legal" ||user.department == "Finance"){
      //   setNoticePeriod(2)
      // }else{
      //   setNoticePeriod(1)
      // }
    }
    if (
      fetchemployeeData !== null &&
      fetchemployeeData !== undefined &&
      (fetchemployeeData.department == "AFS" ||
      fetchemployeeData.department == "IT" ||
      fetchemployeeData.department == "Legal" ||
      fetchemployeeData.department == "Finance") &&
      (fetchemployeeData.contractType === "Fulltime" || fetchemployeeData.contractType === "parttime" || fetchemployeeData.contractType === "Parttime")
    ) {
      setNoticePeriod(fetchemployeeData.noticePeriod);
      var dateValue = new Date(new Date().setMonth(new Date().getMonth() + fetchemployeeData.noticePeriod));
      let aboveDateValue = new Date(
        new Date().setMonth(new Date().getMonth() + (parseInt(fetchemployeeData.noticePeriod) + 1))
      );
      setLastDateSelection(aboveDateValue);
       setLastDate(new Date(new Date().setMonth(new Date().getMonth()+ parseInt(fetchemployeeData.noticePeriod))))
      setEmailId(fetchemployeeData.personalEmail);
      console.log(dateValue, aboveDateValue, "hello if");
    } else {
      setNoticePeriod(fetchemployeeData.noticePeriod);
      var dateValue = new Date(new Date().setMonth(new Date().getMonth() + fetchemployeeData.noticePeriod));
      let aboveDateValue = new Date(
        new Date().setMonth(new Date().getMonth() + (parseInt(fetchemployeeData.noticePeriod) + 1))
      );
      setLastDateSelection(aboveDateValue);
       setLastDate(new Date(new Date().setMonth(new Date().getMonth()+ parseInt(fetchemployeeData.noticePeriod))))
      setEmailId(fetchemployeeData.personalEmail);
      console.log(dateValue, aboveDateValue, "hello else");
    }
  }, [fetchemployeeData]);

  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      console.log(employeeData, "inuse");
      setRegDate(new Date(employeeData.dateOfResignation));
      setLastDate(new Date(employeeData.lastWorkingDate));
      var noticeValue = 0;
      // setLastDate(new Date(employeeData.lastWorkingDate));
      // if (
      //   employeeData.department == "AFS" ||
      //   employeeData.department == "IT" ||
      //   employeeData.department == "Legal" ||
      //   employeeData.department == "Finance"
      // ) {
        setNoticePeriod(employeeData.noticePeriod);
        var dateValue = new Date(
          new Date().setMonth(new Date().getMonth() + employeeData.noticePeriod)
        );
        let aboveDateValue = new Date(
          new Date().setMonth(new Date().getMonth() + (parseInt(employeeData.noticePeriod) + 1))
        );
        setLastDateSelection(aboveDateValue);
        console.log(dateValue, aboveDateValue, "check value");
      // } else {
      //   setNoticePeriod(employeeData.noticePeriod);
      //   var dateValue = new Date(
      //     new Date().setMonth(new Date().getMonth() + 1)
      //   );
      //   let aboveDateValue = new Date(
      //     new Date().setMonth(new Date().getMonth() + (parseInt(1) + 1))
      //   );
      //   setLastDateSelection(aboveDateValue);
      //   console.log(dateValue, aboveDateValue, "1");
      // }

      setReasonOfSepration("");
      setEmailId(employeeData.personalEmailId);
      setSubmitted(true);
      setComments(employeeData.employeeComment);
      console.log(employeeData, "98098098098");
    }
  }, [employeeData]);
  console.log(employeeData,"employeeData");
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
    console.log("loader in useEffect ", loader, managersByCostcenterList);
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
        setEmailId(fetchemployeeData.personalEmail);
        if (
          managersByCostcenterList &&
          managersByCostcenterList &&
          managersByCostcenterList !== null &&
          managersByCostcenterList !== undefined &&
          Object.keys(managersByCostcenterList).length !== 0
        ) {
          let managerNames = managersByCostcenterList.filter(
            (j) => j.employeeId === fetchemployeeData.managerId
          );
          console.log("managerNames", managerNames, managersByCostcenterList);
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
  console.log(lastDate, regDate, "lastDate");
  const SubmitHandler = (e) => {
    e.preventDefault();
    var reasonId = 0;
    console.log(lastDate, regDate, "lastDate");
    reasonOfSeparationList.map((item, i) => {
      if (reasonOfSeparationList[i].label === reasonOfSepration) {
        reasonId = reasonOfSeparationList[i].value;
        console.log(reasonOfSeparationList[i].value);
      }
    });
    console.log(fetchemployeeData, "user888");
    if (fetchemployeeData.contractType == "internship") {
      toast.error("internship employee cannot raise self resignation");
    } else {
      const data1 = {
        company: fetchemployeeData.company,
        contractType: fetchemployeeData.contractType,
        costCentreManagerEmailId: null,
        costCentreManagerName: null,
        costCentreName: fetchemployeeData.costCentre,
        dateOfResignation: moment(regDate).format("YYYY-MM-DD"),
        personalEmailId: emailId,
        empName: fetchemployeeData.firstName + fetchemployeeData.lastName,
        employeeComment: comments,
        employeeId: fetchemployeeData.employeeId,
        employeeName: fetchemployeeData.firstName + fetchemployeeData.lastName,
        exitId: 0,
        hoursWorked: 0,
        lastWorkingDate:moment(lastDate).format("YYYY-MM-DD"),
        location: user.locationId,
        managerCostCentre: null,
        managerEmailId: null,
        managerId: fetchemployeeData.managerId ? fetchemployeeData.managerId : "",
        managerName: approver,
        managerPosition: null,
        modeOfSeparationId: 4,
        modeOfSeparationReasonId: reasonId,
        noticePeriod: noticePeriod,
        noticePeriodRecovery: 0,
        noticePeriodRecoveryDays: 0,
        position: fetchemployeeData.position,
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
      CreateEmplyoeeExist(data1, fetchemployeeData.employeeId);
      // ViewEmployeeDataById(user.employeeId);
      setSubmitted(true);
    }
  };
  const changeHandler = (e) => {
    let valid = /[^A-Za-z0-9'.,-_ ]/;
    if (e.target.name === "comments" && e.target.value !== "") {
      if (valid.test(e.target.value) === true) {
        console.log("do nothing");
      } else {
        setComments(e.target.value);
      }
    }
  };
  const withdrawHandler = (e) => {
    setWithdrawThis(true);
    ViewEmployeeDataById(fetchemployeeData.employeeId);
    managerData(fetchemployeeData.costCentre);
    setReasonOfSepration("");

    setComments("");
    setReasonOfSepration("");

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
  const handleResignationDate = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    var AdjusteddateValue1 = new Date(AdjusteddateValue)
    setLastDate(AdjusteddateValue1.setMonth(AdjusteddateValue1.getMonth()+ parseInt(noticePeriod)))
    setRegDate(AdjusteddateValue);
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
                        value={` ${fetchemployeeData.firstName} ${fetchemployeeData.lastName}/ ${fetchemployeeData.employeeId} `}
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
                        value={fetchemployeeData.contractType}
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
                        value={fetchemployeeData.costCentre}
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
                        value={fetchemployeeData.locationName}
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
                        value={fetchemployeeData.position}
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
                      Type of Separation:
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
                      <Form.Label column sm="3" className="labels-data ">
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
                      <Form.Label column sm="3" className="labels-data">
                        Date of Resignation:
                      </Form.Label>
                      <Col sm="8">
                        <DatePicker
                          minDate={moment().toDate()}
                          value={moment(regDate).format("DD/MM/YYYY")}
                          // disabled={true}
                          selected={regDate}
                          onChange={(e) => handleResignationDate(e)}
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
                        value={`${
                          noticePeriod == 1
                            ? `${noticePeriod} Month`
                            : noticePeriod > 1
                            ? `${noticePeriod} Months`
                            : 0
                        }`}
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
                      <Form.Label column sm="3" className="labels-data">
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
                      <Form.Label column sm="3" className="labels-data">
                        Preffered Last Working Date:
                      </Form.Label>
                      <Col sm="8">
                        <DatePicker
                          value={moment(lastDate).format("DD/MM/YYYY")}
                          selected={lastDate}
                          minDate={moment().toDate()}
                          // maxDate={lastDateSelection}
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
                        <label
                          style={{
                            color: "#006ebb",
                            textAlign: "center",
                            paddingLeft: "10px",
                          }}
                        >
                          {approverId}
                        </label>
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
                        <label
                          style={{
                            color: "#006ebb",
                            textAlign: "center",
                            paddingLeft: "10px",
                          }}
                        >
                          {approverId}
                        </label>
                      </Col>
                    </Form.Group>
                  )}
                </Col>
                <Col sm={4}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="labels-data">
                      Exit Feedback Form:
                    </Form.Label>
                    {submitted === false?<Col sm="7">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSf4F8RzZMXnhc_vaowkpMgtDe9Hh3i7JYT3zML3miyany5I8Q/viewform"
                        target="_blank"
                        className="readTextBlue"
                      >
                        Click here
                      </a>
                    </Col>:
                    <Col sm="7">
                  
                      <Form.Control
                        type="text"
                        value={"Feedback Form Filled"}
                        readOnly
                        className="disabledValue readTextBlue"
                      />
                    </Col>}
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
                          maxLength="500"
                          name="comments"
                          onChange={(e) => changeHandler(e)}
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
                    <Button disabled={employeeData!==undefined&&employeeData!==null&&employeeData.modeOfSeparationId == 2?true:false} onClick={withdrawHandler}>
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
