import React, { Fragment, useState, useContext, useEffect } from "react";
import { OfferContext } from "../../context/OfferState";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { DocsVerifyContext } from "../../context/DocverificationState";

import DatePicker from "react-datepicker";
import moment from "moment";
import "./offerReleaseandOnboarding.css";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { AdminContext } from "../../context/AdminState";
import AppointmentLetter from "./AppointmentLetter";

const CandidateOnboarding = () => {
  const { generateOfferLetter, offerLetterData, candidateData } = useContext(
    OfferContext
  );
  const {
    costCenterSplit,
    createEmployee,
    createStatus,
    candidateOnBoard,
    onBoardData,
    personalInfo,
    personalInfoData,
    viewEmployee,
    empData,
  } = useContext(DocsVerifyContext);

  const { RoleList } = useContext(RoleManagementContext);
  const { costCenterList } = useContext(AdminContext);
  const [count, setCount] = useState(0);
  const [costCenter1, setCostCenter1] = useState(false);
  const [email, setEmail] = useState("");
  const [fedId, setFedId] = useState("");
  const [costCenter, setCostCenter] = useState(true);
  const [costCenter2, setCostCenter2] = useState(false);
  const [costCenter3, setCostCenter3] = useState(false);
  const [costCenter4, setCostCenter4] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [startMonth1Date, setStartMonth1Date] = useState(0);
  const [startYear1Date, setStartYear1Date] = useState(0);
  const [startMonth1End, setStartMonth1EndDate] = useState(0);
  // const [endMonth1Date, setEndMonth1Date] = useState("");
  const [endYear1Date, setEndYear1Date] = useState(0);
  const [startMonth2Date, setStartMonth2Date] = useState(0);
  const [startYear2Date, setStartYear2Date] = useState(0);
  const [endMonth2Date, setEndMonth2Date] = useState(0);
  const [endYear2Date, setEndyear2Date] = useState(0);
  const [startMonth3Date, setStartMonth3Date] = useState(0);

  const [startYear3Date, setStartYear3Date] = useState(0);
  const [endMonth3Date, setEndMonth3Date] = useState(0);
  const [endYear3Date, setEndYear3Date] = useState(0);
  const [startMonth4Date, setStartMonth4Date] = useState(0);
  const [startYear4Date, setStartYear4Date] = useState(0);
  const [endMonth4Date, setEndMonth4Date] = useState(0);
  const [endYear4Date, setEndYear4Date] = useState(0);
  const [startMonth5Date, setStartMonth5Date] = useState(0);
  const [endMonth5Date, setEndMonth5Date] = useState(0);
  const [startYear5Date, setStartYear5Date] = useState(0);
  const [endYear5Date, setEndYear5Date] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const [costCenterA, setCostCenterA] = useState("");
  const [costCenterB, setCostCenterB] = useState("");
  const [costCenterC, setCostCenterC] = useState("");
  const [costCenterD, setCostCenterD] = useState("");
  const [costCenterE, setCostCenterE] = useState("");
  const [emailError, setError] = useState(false);
  const [costCentersData, setCostCentersData] = useState({});
  const previewAppointmentLetter = () => {
    console.log("candidateData id", candidateData);
    setShowLetter(true);
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation
    ) {
      generateOfferLetter(candidateData.candidateInformation.candidateId);
    }
  };
  useEffect(() => {
    if (
      candidateData !== undefined &&
      candidateData.candidateInformation !== undefined &&
      candidateData.remuneration !== null
    ) {
      candidateOnBoard(candidateData.candidateInformation.candidateId);
    }
    if (onBoardData === null) {
      personalInfo(candidateData.candidateInformation.candidateId);
    }
  }, [candidateData, onBoardData]);
  useEffect(() => {
    if (
      onBoardData === null &&
      candidateData !== undefined &&
      candidateData.candidateInformation !== undefined
    ) {
      personalInfo(candidateData.candidateInformation.candidateId);
    }
  }, [onBoardData]);
  useEffect(() => {
    setEmployeeData({
      ...employeeData,
      ["employeeId"]:
        onBoardData !== undefined && onBoardData !== null
          ? onBoardData.employeeId
          : personalInfoData !== undefined
          ? personalInfoData.employeeId
          : "",
    });
  }, [onBoardData, personalInfoData]);
  useEffect(() => {
    if (
      personalInfoData !== undefined &&
      personalInfoData !== null &&
      personalInfoData.employeeId !== undefined
    ) {
      viewEmployee(personalInfoData.employeeId);
      setEmployeeData(empData);
    }
  }, [personalInfoData]);
  useEffect(() => {
    if (empData !== undefined && empData !== null) {
      setEmployeeData({
        ...employeeData,
        ["active"]: empData !== undefined ? empData.active : "",
        ["additionalRole"]: empData !== undefined ? empData.additionalRole : "",
        ["address"]: empData.address,
        ["bloodGroup"]: empData.bloodGroup,
        ["company"]: empData.company,
        ["contractType"]: empData.contractType,
        ["costCentre"]: empData.costCentre,
        ["department"]: empData.department,
        ["dob"]: empData.dob,
        ["employeeName"]:
          empData.employeeName !== null
            ? empData.employeeName
            : empData.firstName,
        ["fatherName"]: empData.fatherName,
        ["gender"]: empData.gender,
        ["joiningDate"]: empData.joiningDate,
        ["locationId"]: empData.locationId,
        ["lastName"]: empData.lastName,
        ["loginType"]: empData.loginType,
        ["managerId"]: empData.managerId,
        ["maritalStatus"]: empData.maritalStatus,
        ["nationality"]: empData.nationality,
        ["paymentType"]:
          empData.paymentType !== null ? empData.paymentType : "Bank",
        ["personalEmail"]: empData.personalEmail,
        ["phone"]: empData.phone,
        ["position"]: empData.position,
        ["firstName"]: empData.firstName,
        ["email"]: empData.email,
        ["fedId"]: empData.fedId,
        ["role"]: empData.role,
      });
    }
  }, [empData]);
  const [employeeData, setEmployeeData] = useState({
    active: "",
    additionalRole: "",
    address: "",
    bloodGroup: "",
    company: "",
    contractType: "",
    costCentre: "",
    department: "",
    dob: "",
    email: "",
    employeeId:
      onBoardData !== undefined && onBoardData !== null
        ? onBoardData.employeeId
        : personalInfoData !== undefined
        ? personalInfoData.employeeId
        : "",
    employeeName: "",
    fatherName: "",
    fedId: "",
    firstName: "",
    gender: "",
    isClusterManager: 0,
    joiningDate: "",
    lastName: "",
    locationId: 0,
    loginType: "",
    managerId: "",
    maritalStatus: "",
    nationality: "",
    paymentType: "",
    personalEmail: "",
    phone: "",
    position: "",
    role: "",
  });

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });

    setError(false);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      if (
        email.indexOf(
          "@decathlon.com",
          email.length - "@decathlon.com".length
        ) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  useEffect(() => {
    if (createStatus === "SUCCESS") {
      setEmployeeData(empData);
      costCenterSplit(costCentersData);
    }
  }, [createStatus]);
  const handleDataSave = () => {
    const costCenterData = {
      costCenterSplitId: 0,
      costCentreA: costCenterA,
      costCentreB: costCenterB,
      costCentreC: costCenterC,
      costCentreD: costCenterD,
      costCentreE: costCenterE,
      employeeId:
        onBoardData !== undefined && onBoardData !== null
          ? onBoardData.employeeId
          : personalInfoData !== undefined
          ? personalInfoData.employeeId
          : "",
      endMonthA: parseInt(moment(startMonth1End).format("MM")),
      endMonthB: parseInt(moment(endMonth2Date).format("MM")),
      endMonthC: parseInt(moment(endMonth3Date).format("MM")),
      endMonthD: parseInt(moment(endMonth4Date).format("MM")),
      endMonthE: parseInt(moment(endMonth5Date).format("MM")),
      endYearA: parseInt(moment(endYear1Date).format("YYYY")),
      endYearB: parseInt(moment(endYear2Date).format("YYYY")),
      endYearC: parseInt(moment(endYear3Date).format("YYYY")),
      endYearD: parseInt(moment(endYear4Date).format("YYYY")),
      endYearE: parseInt(moment(endYear5Date).format("YYYY")),
      startMonthA: parseInt(moment(startMonth1Date).format("MM")),
      startMonthB: parseInt(moment(startMonth2Date).format("MM")),
      startMonthC: parseInt(moment(startMonth3Date).format("MM")),
      startMonthD: parseInt(moment(startMonth4Date).format("MM")),
      startMonthE: parseInt(moment(startMonth5Date).format("MM")),
      startYearA: parseInt(moment(startYear1Date).format("YYYY")),
      startYearB: parseInt(moment(startYear2Date).format("YYYY")),
      startYearC: parseInt(moment(startYear3Date).format("YYYY")),
      startYearD: parseInt(moment(startYear4Date).format("YYYY")),
      startYearE: parseInt(moment(startYear5Date).format("YYYY")),
    };
    setCostCentersData(costCenterData);
    if (validateEmail(employeeData.email)) {
      createEmployee(employeeData);
      // if (createStatus === "SUCCESS") {
      //   alert("Hii");
      //   costCenterSplit(costCenterData);
      // }
    } else {
      setError(true);
    }
  };
  const handleIncrement = (key) => {
    setClicked(true);
    if (count <= 5) {
      switch (count) {
        case 0:
          setCostCenter(true);
          setCount(count + 1);
          break;
        case 1:
          setCostCenter1(true);
          setCount(count + 1);
          break;
        case 2:
          setCostCenter2(true);
          setCount(count + 1);
          break;
        case 3:
          setCostCenter3(true);
          setCount(count + 1);
          break;
        case 4:
          setCostCenter4(true);
          setCount(count + 1);
          break;
        default:
          break;
      }
    }
  };
  const cancel = (num) => {
    if (count >= 0) {
      switch (num) {
        case 1:
          setCostCenter1(false);
          setCount(count - 1);
          return;
          break;
        case 2:
          setCostCenter2(false);
          setCount(count - 1);
          return;
          break;
        case 3:
          setCostCenter3(false);
          setCount(count - 1);
          return;
          break;
        case 4:
          setCostCenter4(false);
          setCount(count - 1);
          return;
          break;

        default:
          break;
      }
    }
  };

  return (
    <Fragment>
      {showLetter && <AppointmentLetter />}

      <div className="px-5 mx-auto">
        <h5>
          <u>WORK DETAILS</u>
        </h5>
        <Row className="mt-5">
          <Col sm={2}>Candidate date of joining</Col>
          <Col>
            {candidateData !== undefined &&
            candidateData.workInformation !== undefined
              ? moment(candidateData.workInformation.dateOfJoin).format(
                  "YYYY-MM-DD"
                )
              : ""}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={1}>
            <Form.Label>Email ID</Form.Label>
          </Col>
          <Col sm={5}>
            <Form.Control
              style={{ borderColor: "#006ebb" }}
              type="text"
              name="email"
              value={
                employeeData !== undefined && employeeData !== null
                  ? employeeData.email
                  : ""
              }
              onChange={(e) => handleChange(e)}
            />
            {emailError === true && (
              <span style={{ color: "red" }}>Please enter a valid email</span>
            )}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={1}>
            <Form.Label>FED ID</Form.Label>
          </Col>
          <Col sm={5}>
            <Form.Control
              style={{ borderColor: "#006ebb" }}
              type="text"
              name="fedId"
              value={
                employeeData !== undefined && employeeData !== null
                  ? employeeData.fedId
                  : ""
              }
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={1}>
            <Form.Label>System role</Form.Label>
          </Col>
          <Col sm={5}>
            <Form.Control
              as="select"
              name="role"
              value={
                employeeData !== undefined && employeeData !== null
                  ? employeeData.role
                  : ""
              }
              onChange={(e) => handleChange(e)}
              style={{ borderColor: "#006ebb" }}
            >
              <option value="">Select Role</option>
              {RoleList !== null &&
                RoleList !== undefined &&
                RoleList.map((item, i) => {
                  return (
                    <option key={i} value={item.roleId}>
                      {item.roleName}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Row>
      </div>
      <div className="px-5 mx-auto mt-4">
        <h5>
          <u>REMUNERATION DETAILS</u>
        </h5>
        <Row className="mt-4">
          <Col sm={4}>
            <label className="mr-3">Candidate ID:</label>
            <label>
              {candidateData.candidateInformation !== undefined &&
              candidateData.candidateInformation !== null
                ? candidateData.candidateInformation.candidateId
                : ""}
            </label>
          </Col>
          <Col sm={4}>
            <label className="mr-3">Candidate Name:</label>
            <label>
              {candidateData.candidateInformation !== undefined &&
              candidateData.candidateInformation !== null
                ? candidateData.candidateInformation.firstName +
                  candidateData.candidateInformation.lastName
                : ""}
            </label>
          </Col>
          <Col sm={4}>
            <label className="mr-3">Application Date:</label>
            <label>
              {candidateData.candidateInformation !== undefined &&
              candidateData.candidateInformation !== null
                ? candidateData.candidateInformation.createdDate
                : ""}
            </label>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <label className="mr-3">Fixed Gross:</label>
            <label>
              {candidateData.remuneration !== undefined &&
              candidateData.remuneration !== null ? (
                <p>{candidateData.remuneration.fixedGross}</p>
              ) : (
                <p>N/A</p>
              )}
            </label>
          </Col>
          <Col sm={4}>
            <label className="mr-3">Bonus (in %):</label>
            <label>
              {candidateData.remuneration !== undefined &&
              candidateData.remuneration !== null ? (
                <p>{candidateData.remuneration.fixedGross}</p>
              ) : (
                <p>N/A</p>
              )}
            </label>
          </Col>
        </Row>
      </div>
      <div className="px-5 mx-auto mt-4">
        <h5>Cost Center Split</h5>
        {costCenter === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="costCentreA"
                  value={costCenterA}
                  onChange={(e) => setCostCenterA(e.target.value)}
                  placeholder="costCenter1"
                >
                  <option value="">Cost Center1</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                name="startMonthA"
                selected={startMonth1Date}
                onChange={(date) => setStartMonth1Date(date)}
                placeholderText="Select Start Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear1Date}
                onChange={(date) => setStartYear1Date(date)}
                placeholderText="Select Start Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth1End}
                onChange={(date) => setStartMonth1EndDate(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear1Date}
                onChange={(date) => setEndYear1Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
          </Row>
        )}
        {costCenter1 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterB}
                  onChange={(e) => setCostCenterB(e.target.value)}
                >
                  <option value="">Cost Center2</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth2Date}
                onChange={(date) => setStartMonth2Date(date)}
                placeholderText="Select Start Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear2Date}
                onChange={(date) => setStartYear2Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth2Date}
                onChange={(date) => setEndMonth2Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear2Date}
                onChange={(date) => setEndyear2Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(1)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        {costCenter2 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterC}
                  onChange={(e) => setCostCenterC(e.target.value)}
                >
                  <option value="">Cost Center3</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth3Date}
                onChange={(date) => setStartMonth3Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear3Date}
                onChange={(date) => setStartYear3Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth3Date}
                onChange={(date) => setEndMonth3Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear3Date}
                onChange={(date) => setEndYear3Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(2)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        {costCenter3 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterD}
                  onChange={(e) => setCostCenterD(e.target.value)}
                >
                  <option value="">Cost Center4</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth4Date}
                onChange={(date) => setStartMonth4Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear4Date}
                onChange={(date) => setStartYear4Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth4Date}
                onChange={(date) => setEndMonth4Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear4Date}
                onChange={(date) => setEndYear4Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(3)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        {costCenter4 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control
                  as="select"
                  placeholder="costCenter1"
                  value={costCenterE}
                  onChange={(e) => setCostCenterE(e.target.value)}
                >
                  <option value="">Cost Center5</option>
                  {costCenterList !== null &&
                    costCenterList !== undefined &&
                    costCenterList.map((item, i) => {
                      return (
                        <option key={i} value={item.costCenterId}>
                          {item.costCentreName}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startMonth5Date}
                onChange={(date) => setStartMonth5Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={startYear5Date}
                onChange={(date) => setStartYear5Date(date)}
                placeholderText="Select Start Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endMonth5Date}
                onChange={(date) => setEndMonth5Date(date)}
                placeholderText="Select End Month"
                dateFormat="MM"
                showMonthYearPicker
                showFullMonthYearPicker
              />{" "}
            </Col>
            <Col sm={2}>
              <DatePicker
                selected={endYear5Date}
                onChange={(date) => setEndYear5Date(date)}
                placeholderText="Select End Year"
                dateFormat="yyyy"
                showYearPicker
              />{" "}
            </Col>
            {isClicked === true && (
              <Col sm={2}>
                <Form.Group>
                  <div>
                    <button
                      className="buttonField  button"
                      onClick={() => cancel(4)}
                      // disabled={!isClicked}
                    >
                      <b> Cancel </b>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            )}
          </Row>
        )}
        <div className="text-right addButtonWrapper">
          <button
            className="addButtonField  button"
            onClick={() => {
              handleIncrement(count);
            }}
            disabled={false}
            style={{ width: "160px" }}
          >
            <b> Add + </b>
          </button>
        </div>
        {/* <Row className="mt-5">
            <Col sm={3}></Col>
            <Col sm={4} className="text-center">
              <Button className="px-5">Save</Button>
            </Col>
          </Row> */}
      </div>
      <div className="px-5 mx-auto mt-5">
        <h5>
          <u>GENERATE APPOINTMENT LETTER</u>
        </h5>
        <Row className="text-center mt-3">
          <Button
            type="button"
            className="px-5 mb-4 previewButton"
            onClick={() => previewAppointmentLetter()}
          >
            Preview Appointment Letter
          </Button>
        </Row>
      </div>
      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <button className="stepperButtons">Back</button>
        <button className="stepperButtons" onClick={() => handleDataSave()}>
          Save & Next
        </button>
      </div>
    </Fragment>
  );
};
export default CandidateOnboarding;
