import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const PersonalInformation = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const [DOB, setDOB] = useState();
  const [state, setState] = useState({
    aadhaarName: "",
    fatherName: "",
    aadhaarNumber: "",
    panNumber: "",
    bloodGroup: "",
    nationality: "",
    disability: "",
    lgbt: "",
    emp1Name: "",
    emp1Eamil: "",
    emp1Designation: "",
    emp2Name: "",
    emp2Eamil: "",
    emp2Designation: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const personalInformation = {
      // adharDoc: null,
      adharName: state.aadhaarName,
      fatherName: state.fatherName,
      aadhaarNumber: state.aadhaarNumber,
      panNumber: state.panNumber,
      dateOfBirth: DOB,
      bloodGroup: state.bloodGroup,
      candidateReferences: [
        {
          designation: emp1Designation !== null ? emp1Designation : null,
          email: emp1Eamil !== null ? emp1Eamil : null,
          employeeName: empName1 !== null ? empName1 : null,
        },
        {
          designation: emp2Designation !== null ? emp2Designation : null,
          email: emp1Eamil !== null ? emp1Eamil : null,
          employeeName: empName2 !== null ? empName2 : null,
        },
      ],
      // adharNumber: ,
      // bloodGroup: null,
      // candidateId: 0,

      // createdDate: null,
      // dateOfBirth: null,
      // disability: null,
      // disabilityDoc: null,
      // fatherName: null,
      // firstName: state.firstName,
      // gender: null,
      // lastName: state.lastName,
      // lgbt: null,
      // maritalStatus: null,
      // nationality: null,
      // panDoc: null,
      // panNumber: null,
      // personalEmail: state.email,
      // photo: null,
      // refered: true,
      // status: 1,
      // verificationStatus: 0,
    };
    console.log("onsubmit");
    console.log(personalInformation);
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  const dateOfBirthHandler = (date) => {
    setDOB(date);
    console.log(DOB);
  };

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
                    name="aadhaarName"
                    value={state.aadhaarName}
                    onChange={changeHandler}
                    required
                    placeholder="First Name"
                    disabled={disabled}
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
                    name="fatherName"
                    value={state.fatherName}
                    onChange={changeHandler}
                    required
                    placeholder="Father's Name"
                    disabled={disabled}
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
                      selected={DOB}
                      required
                      onChange={(e) => dateOfBirthHandler(e)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Date Of Birth"
                      disabled={disabled}
                    />
                  </div>
                </Form.Group>
              </div>
            </Row>

            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Blood Group<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="bloodGroup"
                    value={state.bloodGroup}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                  >
                    <option value="">Select Blood Group</option>
                    <option>one</option>
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
                    name="aadhaarNumber"
                    value={state.aadhaarNumber}
                    onChange={changeHandler}
                    required
                    placeholder="Aadhaar Number"
                    disabled={disabled}
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
                    name="panNumber"
                    value={state.panNumber}
                    onChange={changeHandler}
                    required
                    placeholder="Pan Number"
                    disabled={disabled}
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
                  <Form.Control
                    as="select"
                    name="nationality"
                    value={state.nationality}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                  >
                    <option value="">Natonality</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Disability<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="disability"
                    value={state.disablity}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                  >
                    <option value="">Disability</option>
                    <option> Yes</option>
                    <option> No</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    LGBT<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="lgbt"
                    value={state.lgbt}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                  >
                    <option value="">LGBT</option>
                    <option> Yes</option>
                    <option> No</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={3} style={{ marginTop: "1.8rem" }}>
                <Form.Group>
                  <div className="inputField">
                    <label>Gender</label>
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
                      Marital<br></br>Status
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
              {/* style={{ backgroundColor: "#006ebb" }} */}
              <label>
                <b>State References:</b>
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
                    name="emp1Name"
                    value={state.emp1Name}
                    onChange={changeHandler}
                    required
                    placeholder="Emp Name/ID"
                    disabled={disabled}
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
                    name="emp1Email"
                    value={state.emp1Email}
                    onChange={changeHandler}
                    required
                    placeholder="Email ID"
                    disabled={disabled}
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
                    name="emp1Designation"
                    value={state.emp1Designation}
                    onChange={changeHandler}
                    required
                    placeholder="Designation"
                    disabled={disabled}
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
                      name="emp2Name"
                      value={state.emp2Name}
                      onChange={changeHandler}
                      required
                      placeholder="Emp Name/ID"
                      disabled={disabled}
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
                      name="emp2Email"
                      value={state.emp2Email}
                      onChange={changeHandler}
                      required
                      placeholder="Email ID"
                      disabled={disabled}
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
                      name="emp2Designation"
                      value={state.emp2Designation}
                      onChange={changeHandler}
                      required
                      placeholder="Designation"
                      disabled={disabled}
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
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button className="stepperButtons">Back</button>
          <button className="stepperButtons" type="submit">
            Save & Next
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default PersonalInformation;
