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

const OtherPayrollDoc = (props) => {
  const [docType, setDocType] = useState("");
  const [years, setYears] = useState([]);
  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < 5; i++) {
      let range = "";
      let from = new Date().getFullYear() - i;
      let to = new Date().getFullYear() - (i + 1);
      range = to + "-" + from;
      console.log(range);
      tempArray.push({ key: range, value: range });
    }
    setYears(tempArray.reverse());
  }, []);
  console.log("years", years);
  return (
    <Fragment>
      <Row>
        <Col sm={4}>
          <Form.Group>
            <Form.Label>
              <strong>Year:</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="nationality"
              // value={state.nationality}
              options={years}
              // onChange={changeHandler}
              required
              // style={nationalityError ? { borderColor: "red" } : {}}
            >
              <option value="">Select Year</option>
              {years !== null &&
                years !== undefined &&
                years.length > 0 &&
                years.map((item) => {
                  return <option key={item.key}>{item.value}</option>;
                })}
            </Form.Control>
          </Form.Group>
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
export default OtherPayrollDoc;
