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

const Payslip = (props) => {
  const [docType, setDocType] = useState("");
  const [current, setCurrent] = useState(true);
  const [select, setSelect] = useState(false);
  const [fromYear, setFromYear] = useState(new Date());
  const [toYear, setToYear] = useState(new Date());
  const [fromMonth, setFromMonth] = useState(new Date());
  const [toMonth, setToMonth] = useState(new Date());
  const [tillSeptember, setTillSeptember] = useState(true);
  useEffect(() => {
    if (parseInt(new Date().getMonth()) >= 10) {
      setTillSeptember(false);
      setCurrent(false);
      setSelect(true);
    } else {
      setTillSeptember(true);
      setCurrent(true);
      setSelect(false);
    }
  }, []);
  const handleCurrentChange = (e) => {
    setCurrent(e.target.checked);
    setSelect(!e.target.checked);
  };
  const handleSelectChange = (e) => {
    setSelect(e.target.checked);
    setCurrent(!e.target.checked);
  };
  const dateOfBirthHandler = (date, type) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    console.log("type", type);
    if (type === "fromYear") {
      console.log("type", type);
      setFromYear(new Date(AdjusteddateValue).getFullYear());
    }
  };

  return (
    <Fragment>
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
                <label>Current Month</label>
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
                <label>Select Months</label>
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
                selected={new Date()}
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
                selected={new Date()}
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
              // onClick={(e, name) =>
              //   showTheLetter(e, photoGraphName)
              // }
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
                  maxDate={new Date(new Date().getFullYear(), "9")}
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
                  maxDate={new Date(new Date().getFullYear(), "9")}
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
                // onClick={(e, name) =>
                //   showTheLetter(e, photoGraphName)
                // }
                // disabled={photoGraphName ? false : true}
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
                {/* {EmpDocsData &&
                    Object.keys(EmpDocsData).length &&
                    EmpDocsData.map((item) => {
                      return ( */}
                <tr>
                  <td>documentName</td>
                  <td>
                    <button
                      className={true ? "profileButtons" : "confirmButton"}
                      // onClick={(e, name) =>
                      //   showTheLetter(e, photoGraphName)
                      // }
                      // disabled={photoGraphName ? false : true}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className={true ? "profileButtons" : "confirmButton"}
                      // onClick={(e, name) =>
                      //   downloadTheLetter(e, photoGraphName)
                      // }
                      // disabled={photoGraphName ? false : true}
                    >
                      Download
                    </button>
                  </td>
                </tr>
                {/* //   );
                    // })} */}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Payslip;
