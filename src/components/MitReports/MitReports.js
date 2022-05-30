import React, { useState, useEffect, useContext, useMemo } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { toast, ToastContainer } from "react-toastify";
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
  const [company, setCompany] = useState();
  const [year, setYear] = useState(new Date());
  const [month, setMonth] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "MitReports",
      company,
      month,
      parseInt(moment(year).format("YYYY"))
    );
if (company !==undefined && month!==undefined ){
  getMitReport(
    company,
    month,
    parseInt(moment(year).format("YYYY"))
  );
}else{
  toast.error("Please fill the required filed")
}
    
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
                    <option>Select Company</option>
                    <option value="Decathlon Sports India Pvt Ltd">DSI</option>
                    <option value="Indeca Sporting Goods Pvt Ltd">INDECA</option>
                    <option value="Prodin Sporting Pvt Ltd">PRODIN</option>
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
                controlId="reportModuleName"
              >
                <Form.Label column sm="3">
                  Select Company Name:
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    className="text-primary"
                    value={month}
                    placeholder="Select Month"
                    name="name"
                    required
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              {/* <Form.Group
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
              </Form.Group> */}
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
