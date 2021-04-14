import React, { Fragment, useState, useContext, useEffect } from "react";
import { OfferContext } from "../../context/OfferState";
import { RoleManagementContext } from "../../context/RoleManagementState";
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
  const { candidateData } = useContext(OfferContext);
  const { RoleList } = useContext(RoleManagementContext);
  const { costCenterList } = useContext(AdminContext);
  const [count, setCount] = useState(1);
  const [costCenter1, setCostCenter1] = useState(false);
  const [email, setEmail] = useState("");
  const [fedId, setFedId] = useState("");
  const [costCenter2, setCostCenter2] = useState(false);
  const [costCenter3, setCostCenter3] = useState(false);
  const [costCenter4, setCostCenter4] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [startMonth1Date, setStartMonth1Date] = useState("");
  const [startYear1Date, setStartYear1Date] = useState("");
  const [startMonth1End, setStartMonth1EndDate] = useState("");
  const [endYear1Date, setEndYear1Date] = useState("");
  const [startMonth2Date, setStartMonth2Date] = useState("");
  const [startYear2Date, setStartYear2Date] = useState("");
  const [endMonth2Date, setEndMonth2Date] = useState("");
  const [endYear2Date, setEndyear2Date] = useState("");
  const [startMonth3Date, setStartMonth3Date] = useState("");
  const [startYear3Date, setStartYear3Date] = useState("");
  const [endMonth3Date, setEndMonth3Date] = useState("");
  const [endYear3Date, setEndYear3Date] = useState("");
  const previewAppointmentLetter = () => {
    setShowLetter(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFedChange = (e) => {
    setFedId(e.target.value);
  };

  const handleIncrement = (key) => {
    if (count <= 5) {
      switch (count) {
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
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
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
              value={fedId}
              onChange={(e) => handleFedChange(e)}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={1}>
            <Form.Label>System role</Form.Label>
          </Col>
          <Col sm={5}>
            <Form.Control as="select" style={{ borderColor: "#006ebb" }}>
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
        <Row>
          <Col sm={2}>
            <Form.Group>
              <Form.Control as="select" placeholder="costCenter1">
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
        {costCenter1 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control as="select" placeholder="costCenter1">
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
          </Row>
        )}
        {costCenter2 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control as="select" placeholder="costCenter1">
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
          </Row>
        )}
        {costCenter3 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control as="select" placeholder="costCenter1">
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
                dateFormat="MM"
                placeholderText="Select Start Month"
              />
            </Col>
            <Col sm={2}>
              <DatePicker dateFormat="MM" placeholderText="Select Year" />
            </Col>
            <Col sm={2}>
              <DatePicker dateFormat="MM" placeholderText="Select End Month" />
            </Col>
            <Col sm={2}>
              <DatePicker
                dateFormat="MM"
                placeholderText="Select Year"
                // disabled={disabled}
              />
            </Col>
          </Row>
        )}
        {costCenter4 === true && (
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Control as="select" placeholder="costCenter1">
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
                dateFormat="MM"
                placeholderText="Select Start Month"
              />
            </Col>
            <Col sm={2}>
              <DatePicker dateFormat="MM" placeholderText="Select Year" />
            </Col>
            <Col sm={2}>
              <DatePicker dateFormat="MM" placeholderText="Select End Month" />
            </Col>
            <Col sm={2}>
              <DatePicker
                dateFormat="MM"
                placeholderText="Select Year"
                // disabled={disabled}
              />
            </Col>
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
        <button className="stepperButtons">Save & Next</button>
      </div>
    </Fragment>
  );
};
export default CandidateOnboarding;
