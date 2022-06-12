import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { PayrollContext } from "../../context/PayrollState";
import ViewTheLetter from "./view";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { PermissionContext } from "../../context/PermissionState";

const Payslip = (props) => {
  const {
    letterShow,
    SetLetterView,
    currentEmpId,
    PayrollPayslipsView,
    payslipViewData,
    makePayslipViewDataNull,
    loader,
  } = useContext(PayrollContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const { downloadFile } = useContext(DocsVerifyContext);
  const [docType, setDocType] = useState("");
  const [current, setCurrent] = useState(true);
  const [select, setSelect] = useState(false);
  const [fromYear, setFromYear] = useState(new Date());
  const [toYear, setToYear] = useState(new Date());
  const [fromMonth, setFromMonth] = useState(
    parseInt(new Date().getMonth()) > 8
      ? new Date(new Date(new Date().getFullYear(), "8"))
      : new Date()
  );
  const [toMonth, setToMonth] = useState(
    parseInt(new Date().getMonth()) > 8
      ? new Date(new Date(new Date().getFullYear(), "8"))
      : new Date()
  );
  const [tillSeptember, setTillSeptember] = useState(true);
  const [currentYear, setCurrentYear] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");

  useEffect(() => {
    if (parseInt(new Date().getMonth()) > 8) {
      setTillSeptember(false);
      setCurrent(false);
      setSelect(true);
    } else {
      setTillSeptember(true);
      setCurrent(true);
      setSelect(false);
    }
  }, []);
  useEffect(() => {
    makePayslipViewDataNull();
  }, [current, select]);
  const handleCurrentChange = (e) => {
    setCurrent(e.target.checked);
    setSelect(!e.target.checked);
  };
  const handleSelectChange = (e) => {
    setSelect(e.target.checked);
    setCurrent(!e.target.checked);
  };
  const downloadTheLetter = (e, name,employeeData) => {
    e.preventDefault();
    console.log("check", name);

    downloadFile(name,employeeData);
  };
  const showTheLetter = (e, name,employeeData) => {
    e.preventDefault();
    console.log("check", name);
    if (name !== null && name !== undefined) {
      let splitStr = name.split(".");

      if (
        splitStr[1] !== null &&
        splitStr[1] !== undefined &&
        splitStr[1] !== "" &&
        splitStr[1].toLowerCase() === "pdf"
      ) {
        console.log(splitStr[1]);
        setName("PDF");
      } else {
        console.log(splitStr[0]);
        setName("JPG");
      }
    }
    setEmployeeId(employeeData)
    ImageView(name,employeeData)
    setLetterName(name);
    SetLetterView(true);
    // return <ViewTheLetter DocName={e} />;
  };
  const currentSubmitHandler = (e) => {
    e.preventDefault();
    const ReqPayload = {
      current: 1,
      employeeId: currentEmpId,
      fromMonth: parseInt(new Date(currentMonth).getMonth()) + 1,
      fromYear: parseInt(new Date(currentYear).getFullYear()),
      toMonth: 0,
      toYear: 0,
    };
    console.log(ReqPayload);
    PayrollPayslipsView(ReqPayload);
  };
  const selectSubmitHandler = (e) => {
    e.preventDefault();
    const ReqPayload = {
      current: 0,
      employeeId: currentEmpId,
      fromMonth: parseInt(new Date(fromMonth).getMonth()) + 1,
      fromYear: parseInt(new Date(fromYear).getFullYear()),
      toMonth: parseInt(new Date(toMonth).getMonth()) + 1,
      toYear: parseInt(new Date(toYear).getFullYear()),
    };
    console.log(ReqPayload);
    PayrollPayslipsView(ReqPayload);
  };
  console.log("payslipViewData", payslipViewData);
  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} EmployeeId={EmployeeId} /> : ""}

      {tillSeptember ? (
        <Row>
          <Col sm={3} className="ml-2 mb-4">
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="yes"
                  checked={current}
                  //   required={required}
                  onChange={handleCurrentChange}
                />
                <label>
                  <strong>Current Month</strong>
                </label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="no"
                  checked={select}
                  //   required={required}
                  onChange={handleSelectChange}
                />
                <label>
                  <strong>Select Months</strong>
                </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
      ) : null}
      {/* current Month Section */}
      {current ? (
        <Row>
          <Col sm={4} className="mb-4">
            <Form.Label>
              <strong>Year:</strong>
            </Form.Label>
            <div className="onBoard-date">
              <DatePicker
                className="form-control onBoard-view"
                selected={currentYear}
                onChange={(e) => setCurrentYear(e)}
                required
                placeholderText="Select Year"
                dateFormat="yyyy"
                showYearPicker
                disabled={true}
              />
            </div>
          </Col>
          <Col sm={4}>
            <Form.Label>
              <strong>Month:</strong>
            </Form.Label>
            <div className="onBoard-date">
              <DatePicker
                className="form-control onBoard-view"
                selected={currentMonth}
                onChange={(e) => setCurrentMonth(e)}
                maxDate={new Date(new Date().getFullYear(), "9")}
                required
                disabled={true}
                placeholderText="Select Month"
                dateFormat="MM"
                showMonthYearPicker
              />
            </div>
          </Col>
          <Col sm={2}>
            <button
              style={{ marginTop: "2rem" }}
              className={true ? "profileButtons" : "confirmButton"}
              onClick={currentSubmitHandler}
              // disabled={photoGraphName ? false : true}
            >
              Submit
            </button>
          </Col>
        </Row>
      ) : select ? (
        <Fragment>
          <Row>
            <Col sm={1}></Col>
            <Col sm={4}>
              <label>
                <strong>Year</strong>
              </label>
            </Col>
            <Col sm={4}>
              <label>
                <strong>Month</strong>
              </label>
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <label>
                <strong>From:</strong>
              </label>
            </Col>
            <Col sm={4} className="mb-4">
              <div className="onBoard-date">
                <DatePicker
                  className="form-control onBoard-view"
                  selected={fromYear}
                  onChange={(e) => setFromYear(e)}
                  maxDate={new Date()}
                  required
                  placeholderText="Select Year"
                  dateFormat="yyyy"
                  showYearPicker
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="onBoard-date">
                <DatePicker
                  className="form-control onBoard-view"
                  selected={fromMonth}
                  maxDate={new Date(new Date().getFullYear(), "8")}
                  onChange={(e) => setFromMonth(e)}
                  required
                  placeholderText="Select Month"
                  dateFormat="MM"
                  showMonthYearPicker
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <label>
                <strong>To:</strong>
              </label>
            </Col>
            <Col sm={4} className="mb-4">
              <div className="onBoard-date">
                <DatePicker
                  className="form-control onBoard-view"
                  selected={toYear}
                  onChange={(e) => setToYear(e)}
                  maxDate={new Date()}
                  required
                  placeholderText="Select Year"
                  dateFormat="yyyy"
                  showYearPicker
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="onBoard-date">
                <DatePicker
                  className="form-control onBoard-view"
                  selected={toMonth}
                  maxDate={new Date(new Date().getFullYear(), "8")}
                  onChange={(e) => setToMonth(e)}
                  required
                  placeholderText="Select Month"
                  dateFormat="MM"
                  showMonthYearPicker
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={8}> </Col>
            <Col sm={2}>
              <button
                className={true ? "profileButtons" : "confirmButton"}
                onClick={selectSubmitHandler}
              >
                Submit
              </button>
            </Col>
          </Row>
        </Fragment>
      ) : null}
      <Row>
        <Col sm={10}>
          <div className="mt-5">
            <Table className="tableWrapper table table-borderless">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>View</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {loader ? (
                  <tr>
                    <td></td>
                    <td>
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
                    </td>
                    <td></td>
                  </tr>
                ) : payslipViewData && Object.keys(payslipViewData).length ? (
                  payslipViewData.map((item) => {
                    return (
                      <tr>
                        <td>{item.documentLink}</td>
                        <td>
                          <button
                            className={
                              true ? "profileButtons" : "confirmButton"
                            }
                            onClick={(e, name) =>
                              showTheLetter(e, item.documentLink,item.employeeId)
                            }
                          >
                            View
                          </button>
                        </td>
                        <td>
                          {" "}
                          <button
                            className={
                              true ? "profileButtons" : "confirmButton"
                            }
                            onClick={(e, name) =>
                              downloadTheLetter(e, item.documentLink,item.employeeId)
                            }
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td>No Documents Found</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Payslip;
