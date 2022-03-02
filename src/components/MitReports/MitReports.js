import React, { useState, useEffect, useContext, useMemo } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MitReport.css";
import MultiSelect from "react-multi-select-component";
import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
  subWeeks,
  addWeeks,
  subDays,
  addDays,
} from "date-fns";
import { MitReportContext } from "../../context/MitReportState";

const MitReports = () => {
  const { getMitReport } = useContext(MitReportContext);
  const [company, setCompany] = useState("");
  const [year, setYear] = useState(new Date());
  const [month, setMonth] = useState(new Date());

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "MitReports",
      company,
      parseInt(moment(month).format("MM")),
      parseInt(moment(year).format("YYYY"))
    );

    getMitReport(
      company,
      parseInt(moment(month).format("MM")),
      parseInt(moment(year).format("YYYY"))
    );
  };

  return (
    <div className="module-reports">
      <ToastContainer />
      <Breadcrumb title="MIT REPORTS" parent="MIT REPORTS" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">MIT REPORTS</b>
          </div>
          <div className="module-reports-form mx-5 my-5">
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportModuleName"
              >
                <Form.Label column sm="3">
                  Select Company Name:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    value={company}
                    placeholder="Select Company"
                    name="company"
                    required
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value="">Select Company</option>
                    <option value="Decathlon Sports India">DSI</option>
                    <option value="INDECA">INDECA</option>
                    <option value="PRODIN">PRODIN</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportSubModuleName"
              >
                <Form.Label column sm="3">
                  Select Year:
                </Form.Label>
                <Col sm="8">
                  <DatePicker
                    selected={year}
                    className="mitDates"
                    onChange={(date) => setYear(date)}
                    minDate={new Date("2012")}
                    maxDate={new Date("2022")}
                    placeholderText="Select Year"
                    dateFormat="yyyy"
                    showYearPicker
                    showYearDropdown
                    dropdownMode="scroll"
                    required
                  />{" "}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="reportSubModuleName"
              >
                <Form.Label column sm="3">
                  Select Month:
                </Form.Label>
                <Col sm="8">
                  <DatePicker
                    selected={month}
                    className="mitDates"
                    onChange={(date) => setMonth(date)}
                    // minDate={new Date()}
                    placeholderText="Select Month"
                    dateFormat="MM"
                    showMonthYearPicker
                    // showFullMonthYearPicker
                    showTwoColumnMonthYearPicker
                    required
                  />{" "}
                </Col>
              </Form.Group>
              <Row className="mt-5">
                <Col className="text-center">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={submitHandler}
                  >
                    Download Report
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MitReports;
