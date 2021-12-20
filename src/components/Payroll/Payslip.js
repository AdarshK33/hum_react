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
  const handleCurrentChange = (e) => {
    setCurrent(e.target.checked);
    setSelect(!e.target.checked);
  };
  const handleSelectChange = (e) => {
    setSelect(e.target.checked);
    setCurrent(!e.target.checked);
  };

  return (
    <Fragment>
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
              <label>Current</label>
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
              <label>Select </label>
            </div>
          </Form.Group>
        </Col>
      </Row>
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
            <Col sm={4}>
              <label>
                <strong>From</strong>
              </label>
            </Col>
            <Col sm={4}>
              <label>
                <strong>To</strong>
              </label>
            </Col>
          </Row>
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
                />
              </div>
            </Col>
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
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Label>
                <strong>Month:</strong>
              </Form.Label>
              <div className="onBoard-date">
                <DatePicker
                  className="form-control onBoard-view"
                  selected={new Date()}
                  required
                  placeholderText="Select Month"
                  dateFormat="MM"
                  showMonthYearPicker
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
                  required
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
        </Fragment>
      ) : null}
      <Row>
        <Col sm={10}>
          <div className="mt-5">
            <Table className="tableWrapper table table-borderless">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>view</th>
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
