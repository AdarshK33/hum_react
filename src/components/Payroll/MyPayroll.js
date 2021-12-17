import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "../common/breadcrumb";
import DocVerification from "../../components/CandidateVerification/DocVerification";
import { OnBoardContext } from "../../context/OnBoardState";
import { OfferContext } from "../../context/OfferState";
import man from "../../assets/images/dashboard/userImage.png";
import DatePicker from "react-datepicker";

const MyPayroll = (props) => {
  const [docType, setDocType] = useState("");
  return (
    <Fragment>
      <Breadcrumb title="MY PAYROLL" parent="MY PAYROLL" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>MY PAYROLL</b>
                </div>
                <div>
                  <Row className="mt-4 ml-4">
                    <Col sm={4}>
                      <Form.Group>
                        {/* <Form.Label>
              <b> Select  </b>
            </Form.Label> */}
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
                  {docType === "Payslip" ? (
                    <Row className="mb-4 ml-4">
                      <Col sm={4}>
                        <div className="onBoard-date">
                          <DatePicker
                            //   style={DOBError ? { borderColor: "red" } : {}}
                            className="form-control onBoard-view"
                            //   selected={DOB}
                            required
                            //   onChange={(e) => dateOfBirthHandler(e)}
                            placeholderText="Select Year"
                            dateFormat="yyyy"
                            showYearPicker
                          />
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div className="onBoard-date">
                          <DatePicker
                            //   style={DOBError ? { borderColor: "red" } : {}}
                            className="form-control onBoard-view"
                            //   selected={DOB}
                            required
                            //   onChange={(e) => dateOfBirthHandler(e)}
                            placeholderText="Select Month"
                            dateFormat="MM"
                            showMonthYearPicker
                            // showFullMonthYearPicker
                          />
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div
                          style={{
                            marginBottom: "1rem",
                            textAlign: "right",
                          }}
                        >
                          {/* onClick={submitHandler} */}
                          <button
                            className={
                              true ? "profileButtons" : "confirmButton"
                            }
                            // onClick={(e, name) =>
                            //   showTheLetter(e, photoGraphName)
                            // }
                            // disabled={photoGraphName ? false : true}
                          >
                            View
                          </button>
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div
                          style={{
                            marginRight: "1rem",
                            marginBottom: "1rem",
                            textAlign: "right",
                          }}
                        >
                          <button
                            className={
                              true ? "profileButtons" : "confirmButton"
                            }
                            // onClick={(e, name) =>
                            //   downloadTheLetter(e, photoGraphName)
                            // }
                            // disabled={photoGraphName ? false : true}
                          >
                            Download
                          </button>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default MyPayroll;
