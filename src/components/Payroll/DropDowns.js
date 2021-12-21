import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import Payslip from "./Payslip";
import OtherPayrollDoc from "./OtherPayrollDoc";

import { PayrollContext } from "../../context/PayrollState";
import { SeparationContext } from "../../context/SepearationState";

const DropDowns = (props) => {
  const { searchByCostCenter, searchByCostData } =
    useContext(SeparationContext);
  const { setManagerFlag, managerFlag, setEmployeeId, currentEmpId } =
    useContext(PayrollContext);
  const [docType, setDocType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empNameId, setEmpNameId] = useState("");
  const searchValueHandler = (e) => {
    e.preventDefault();
    if (
      searchInput !== null &&
      searchInput !== undefined &&
      searchInput !== ""
    ) {
      searchByCostCenter(searchInput);
    } else {
      setEmpNameId("");
      setEmployeeId("");
    }
  };

  useEffect(() => {
    if (
      searchByCostData !== null &&
      searchByCostData !== undefined &&
      Object.keys(searchByCostData).length
    ) {
      let name =
        searchByCostData.firstName +
        " " +
        searchByCostData.lastName +
        " " +
        searchByCostData.employeeId;
      setEmpNameId(name);
      setSearchInput(name);
      setEmployeeId(searchByCostData.employeeId);
    } else {
      setEmpNameId("");
      setSearchInput("");
      setEmployeeId("");
    }
  }, [searchByCostData]);
  console.log("empNameId", empNameId);
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
      {managerFlag ? (
        <Row className="mt-3">
          <Col sm={10}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search Employee Id/Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search
                className="search-icon mr-1"
                style={{ color: "#313131" }}
                onClick={searchValueHandler}
              />
              {/* {empErrMsg !== "" && (
                <span className="text-danger">{empErrMsg}</span>
              )} */}
            </Form.Group>
          </Col>
        </Row>
      ) : null}
      {managerFlag ? (
        empNameId !== "" && empNameId ? (
          docType === "Payslip" ? (
            <Payslip />
          ) : docType ? (
            <OtherPayrollDoc />
          ) : (
            ""
          )
        ) : null
      ) : docType === "Payslip" ? (
        <Payslip />
      ) : docType ? (
        <OtherPayrollDoc />
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default DropDowns;
