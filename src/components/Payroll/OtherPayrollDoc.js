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

const OtherPayrollDoc = ({ docType }) => {
  const {
    letterShow,
    SetLetterView,
    currentEmpId,
    PayrollOtherDocView,
    otherDocViewData,
    loader,
  } = useContext(PayrollContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);
  const { downloadFile } = useContext(DocsVerifyContext);
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [error, setError] = useState(false);
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
  const downloadTheLetter = (e, name,EmployeeId) => {
    e.preventDefault();
    console.log("check", name);

    downloadFile(name,EmployeeId);
  };
  const showTheLetter = (e, name,EmployeeId) => {
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
    ImageView(name,EmployeeId)
    setLetterName(name);
    SetLetterView(true);
    setEmployeeId(EmployeeId)
    // return <ViewTheLetter DocName={e} />;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("selectedYear", selectedYear);
    if (selectedYear && selectedYear !== "") {
      setError(false);
      let year = selectedYear.split("-");
      PayrollOtherDocView(docType, currentEmpId, year[1]);
    } else {
      setError(true);
    }
  };
  console.log("docType", docType);
  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} EmployeeId={EmployeeId}/> : ""}
      <Row>
        <Col sm={4}>
          <Form.Group>
            <Form.Label>
              <strong>Year:</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="nationality"
              value={selectedYear}
              options={years}
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
              required
              style={error ? { borderColor: "red" } : {}}
            >
              <option value="">Select Year</option>
              {years !== null &&
                years !== undefined &&
                years.length > 0 &&
                years.map((item) => {
                  return <option key={item.key}>{item.value}</option>;
                })}
            </Form.Control>
            {error ? (
              <p style={{ color: "red" }}>Please choose year</p>
            ) : (
              <p></p>
            )}
          </Form.Group>
        </Col>
        <Col sm={2}>
          <button
            style={{ marginTop: "2rem" }}
            className={true ? "profileButtons" : "confirmButton"}
            onClick={submitHandler}
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
                ) : otherDocViewData && Object.keys(otherDocViewData).length ? (
                  otherDocViewData.map((item) => {
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
                            // disabled={photoGraphName ? false : true}
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
                            // disabled={photoGraphName ? false : true}
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
export default OtherPayrollDoc;
