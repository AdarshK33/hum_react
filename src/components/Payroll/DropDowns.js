import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Payslip from "./Payslip";
import OtherPayrollDoc from "./OtherPayrollDoc";

const DropDowns = (props) => {
  const [docType, setDocType] = useState("");

  return (
    <Fragment>
      <Row className="mt-3">
        <Col sm={10}>
          <Form.Group>
            <Form.Control
              as="select"
              name="type"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              required
              //   style={countryError ? { borderColor: "red" } : {}}
            >
              <option value="">Select Document Type</option>
              <option value="Payslip">Payslip</option>
              <option value="It Statment">It Statment</option>
              <option value="It Declaration">It Declaration</option>
              <option value="It Proofs">It Proofs</option>
              <option value="Form 16">Form 16</option>
              <option value="Form 12BB">Form 12BB</option>
            </Form.Control>
            {/* {HolidayError ? (
                <p style={{ color: "red" }}> Please choose Holiday</p>
              ) : (
                <p></p>
              )} */}
          </Form.Group>
        </Col>
      </Row>
      {docType === "Payslip" ? <Payslip /> : docType ? <OtherPayrollDoc /> : ""}
    </Fragment>
  );
};
export default DropDowns;
