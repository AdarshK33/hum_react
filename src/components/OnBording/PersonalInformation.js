import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const submitHandler = (e) => {
  e.preventDefault();
};

const PersonalInformation = () => {
  const [isClicked, setIsClicked] = useState(false);

  const AddExtrReferenceClick = () => {
    setIsClicked(true);
  };
  const CancelExtrReferenceClick = () => {
    setIsClicked(false);
  };
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={8}>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Name as per Aadhaar<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name as per Aadhaar"
                    required="required"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Father's Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Father's Name"
                    required="required"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Date Of Birth<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className="onBoard-date">
                    <DatePicker
                      className="form-control onBoard-view"
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="Date Of Birth"
                    />
                  </div>
                </Form.Group>
              </div>
            </Row>

            <Row style={{ marginBottom: "2rem" }}>
              {/* <Col sm={4}>
                <Form.Group>
                  <div className="select_box">
                    <select>
                      <option>Blood Group</option>
                      <option value="1">O+</option>
                      <option value="2">O-</option>
                      <option value="3">A+</option>
                      <option value="4">A-</option>
                      <option value="5">B+</option>
                      <option value="6">B+</option>
                      <option value="7">AB+</option>
                      <option value="8">AB-</option>
                    </select>
                  </div>
                </Form.Group>
              </Col> */}
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Blood Group<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control as="select">
                    <option value="">Select Blood Group</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Aadhaar Number<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Aadhaar Number"
                    required="required"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Pan Number<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pan Number"
                    required="required"
                  />
                </Form.Group>
              </div>
            </Row>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Natonality<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control as="select">
                    <option value="">Natonality</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Disability<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control as="select">
                    <option value="">Disability</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    LGBT<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control as="select">
                    <option value="">LGBT</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={3} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="inputField">
                    <label>
                      <b>Gender</b>
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Male"
                    />
                    <label>Male </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Female"
                    />
                    <label>Female</label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: "3rem" }}>
              <Col sm={3}>
                <Form.Group>
                  <div className="inputField">
                    <label>
                      <b>
                        {" "}
                        Marital<br></br>Status
                      </b>
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <div className="boxField input" style={{ marginTop: "1rem" }}>
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Married"
                    />
                    <label>Married </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group>
                  <div
                    className="boxField input"
                    style={{ marginTop: "0.9rem" }}
                  >
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Unarried"
                    />
                    <label>UnMarried</label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={5}>
            <div>
              <label>
                <b>State References</b>
              </label>
              <br></br>
              <label>
                <b>(Max: Only 2)</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={8}>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Emp Name/ID<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Emp Name/ID"
                    required="required"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Email ID<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email ID"
                    required="required"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Designation<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Designation"
                    required="required"
                  />
                </Form.Group>
              </div>
            </Row>
          </Col>

          <Col sm={3} style={{ marginTop: "2rem" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={AddExtrReferenceClick}
                  disabled={isClicked}
                >
                  <b> Add + </b>
                </button>
              </div>
            </Form.Group>
          </Col>
        </Row>
        {isClicked ? (
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={8}>
              <Row style={{ marginBottom: "1rem" }}>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Emp Name/ID<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Emp Name/ID"
                      required="required"
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Email ID<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email ID"
                      required="required"
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Designation<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Designation"
                      required="required"
                    />
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={3} style={{ marginTop: "2rem" }}>
              <Form.Group>
                <div>
                  <button
                    className="buttonField  button"
                    onClick={CancelExtrReferenceClick}
                    disabled={!isClicked}
                  >
                    <b> Cancel </b>
                  </button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
      </Form>
    </Fragment>
  );
};
export default PersonalInformation;
