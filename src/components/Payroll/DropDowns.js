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
import Select from "react-select";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { PayrollContext } from "../../context/PayrollState";
import { SeparationContext } from "../../context/SepearationState";

const DropDowns = (props) => {
  const { searchByCostCenter, searchByCostData } =
    useContext(SeparationContext);
  const {
    setManagerFlag,
    managerFlag,
    setEmployeeId,
    currentEmpId,
    makePayrollOtherDocDataNull,
    makePayslipViewDataNull,
    empSearchByCostCenter,
    empSearchByCostData,
  } = useContext(PayrollContext);
  const [docType, setDocType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empNameId, setEmpNameId] = useState("");
  const [empOptions, setEmpOptions] = useState([{ id: " ", name: " " }]);
  const [empSelected, setEmpSelected] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleOnSearch = (string, results) => {
    //console.lo("changing", string, results);
    setEmpNameId("");
    setEmployeeId("");
    setSearchString(string);
  };

  const handleOnClear = () => {
    //console.lo("Cleared");
    setSearchString("");
    setEmpNameId("");
    setEmployeeId("");
  };

  const handleOnSelect = (string) => {
    //console.lo("string", string);
    if (string && Object.keys(string).length) {
      setSearchString(string.name);
      setEmpNameId(string.id);
      setEmployeeId(string.id);
    } else {
      setEmpNameId("");
      setEmployeeId("");
    }
  };
  useEffect(() => {
    makePayrollOtherDocDataNull();
    makePayslipViewDataNull();
  }, [docType]);
  // const searchValueHandler = (e) => {
  //   e.preventDefault();
  //   makePayrollOtherDocDataNull();
  //   makePayslipViewDataNull();
  //   if (
  //     searchInput !== null &&
  //     searchInput !== undefined &&
  //     searchInput !== ""
  //   ) {
  //     empSearchByCostCenter(searchInput);
  //   } else {
  //     setEmpNameId("");
  //     setEmployeeId("");
  //   }
  // };

  // const ChangeSearchOption = (option) => {
  //   //console.lo("option", option);
  //   if (option) {
  //     setEmpSelected(option);
  //     setEmpNameId(option.value);
  //     setSearchInput(option.vlaue);
  //     setEmployeeId(option.value);
  //   } else {
  //     setEmpNameId("");
  //     setSearchInput("");
  //     setEmployeeId("");
  //   }
  // };
  useEffect(() => {
    if (searchString) {
      empSearchByCostCenter(searchString);
    }
  }, [searchString]);
  useEffect(() => {
    if (
      empSearchByCostData !== null &&
      empSearchByCostData !== undefined &&
      Object.keys(empSearchByCostData).length
    ) {
      let tempArray = [];
      empSearchByCostData.map((item, i) => {
        tempArray.push({
          name: item.firstName + "" + item.lastName + " " + item.employeeId,
          id: item.employeeId,
        });
      });
      setEmpOptions(tempArray);
    } else {
      setEmpOptions([]);
    }
  }, [empSearchByCostData]);

  //console.lo("empOptions", empOptions);
  //console.lo("empSearchByCostData", empSearchByCostData);
  //console.lo("empNameId", empNameId);
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
            >
              <option value="">Select Document Type</option>
              <option value="Payslip">Payslip</option>
              <option value="IT statement">It Statment</option>
              <option value="IT declaration">It Declaration</option>
              <option value="IT proofs">It Proofs</option>
              <option value="Form 16">Form 16</option>
              <option value="Form 12 BB">Form 12BB</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {managerFlag ? (
        <Row className="mt-3 mb-3" style={{ marginLeft: "0px" }}>
          <div
            style={{
              width: "82%",
              zIndex: "1",
              border: "0px",
            }}
          >
            <ReactSearchAutocomplete
              styling={{
                borderRadius: "5px",
                boxShadow: "none",
                height: "37px",
              }}
              placeholder="Search Employee Name/Id"
              inputDebounce={10}
              items={empOptions}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              onClear={handleOnClear}
              inputSearchString={searchString}
              showIcon={false}
            />
          </div>
        </Row>
      ) : // <Row className="mt-3 mb-3">
      //   <Col sm={10}>
      //     <div>
      //       <Select
      //         name="Week"
      //         options={
      //           empOptions && Object.keys(empOptions).length
      //             ? empOptions.map((item) => ({
      //                 label: item.label,
      //                 value: item.value,
      //               }))
      //             : []
      //         }
      //         value={empSelected}
      //         onChange={ChangeSearchOption}
      //         placeholder="Search Employee/Id"
      //         isSearchable
      //         // className="rosterSelect"
      //       ></Select>
      //     </div>
      //   </Col>
      // </Row>
      // <Row className="mt-3">
      //   <Col sm={10}>
      //     <Form.Group>
      //       <Form.Control
      //         type="text"
      //         placeholder="Search Employee Id/Name"
      //         value={searchInput}
      //         onChange={(e) => setSearchInput(e.target.value)}
      //       />
      //       <Search
      //         className="search-icon mr-1"
      //         style={{ color: "#313131" }}
      //         onClick={searchValueHandler}
      //       />
      //     </Form.Group>
      //   </Col>
      // </Row>
      null}
      {managerFlag ? (
        empNameId !== "" && empNameId ? (
          docType === "Payslip" ? (
            <Payslip />
          ) : docType ? (
            <OtherPayrollDoc docType={docType} />
          ) : (
            ""
          )
        ) : null
      ) : docType === "Payslip" ? (
        <Payslip />
      ) : docType ? (
        <OtherPayrollDoc docType={docType} />
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default DropDowns;
