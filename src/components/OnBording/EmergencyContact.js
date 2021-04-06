import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const EmergencyContact = (props) => {
  const [disabled, setDisableState] = useState(false);
  // acessing candidateId from params

  const [stateError, setStateError] = useState({
    contactNameError: "",
    addressLineError: "",
    cityError: "",
    countryError: "",
    localityError: "",
    phoneNumberError: "",
    pinCodeError: "",
    relationshipError: "",
  });
  const [state, setState] = useState({
    contactName: "",
    addressLine: "",
    city: "",
    country: "",
    locality: "",
    phoneNumber: "",
    pinCode: "",
    relationship: "",
  });

  const validateForm = () => {
    let fields = state;
    let stateError = {};
    let formIsValid = true;

    if (!fields["contactName"]) {
      formIsValid = false;
      stateError["contactNameError"] = "*Please enter your name.";
    }

    if (typeof fields["contactName"] !== "undefined") {
      if (!fields["contactName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["contactNameError"] =
          "*Please enter alphabet characters only.";
      }
    }
    if (!fields["addressLine"]) {
      formIsValid = false;
      stateError["addressLineError"] = "*Please enter your address.";
    }

    if (typeof fields["addressLine"] !== "undefined") {
      if (
        !fields["addressLine"].match(/^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/)
      ) {
        formIsValid = false;
        stateError["addressLineError"] = "*Please enter valid address.";
      }
    }
    if (!fields["city"]) {
      formIsValid = false;
      stateError["cityError"] = "*Please enter your city.";
    }

    if (typeof fields["city"] !== "undefined") {
      if (!fields["city"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["cityError"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["country"]) {
      formIsValid = false;
      stateError["countryError"] = "*Please enter your country.";
    }

    if (typeof fields["country"] !== "undefined") {
      if (!fields["country"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["countryError"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["locality"]) {
      formIsValid = false;
      stateError["localityError"] = "Please enter your locality.";
    }

    if (typeof fields["locality"] !== "undefined") {
      if (!fields["locality"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["localityError"] = "Please enter alphabet characters only.";
      }
    }
    if (!fields["phoneNumber"]) {
      formIsValid = false;
      stateError["phoneNumberError"] = "*Please enter your mobile no.";
    }

    if (typeof fields["phoneNumber"] !== "undefined") {
      if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        stateError["phoneNumberError"] = "*Please enter valid mobile number.";
      }
    }
    if (!fields["pinCode"]) {
      formIsValid = false;
      stateError["pinCodeError"] = "*Please enter your pinCode.";
    }

    if (typeof fields["pinCode"] !== "undefined") {
      if (!fields["pinCode"].match(/^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/)) {
        formIsValid = false;
        stateError["pinCodeError"] = "*Please enter numbers only.";
      }
    }

    if (!fields["relationship"]) {
      formIsValid = false;
      stateError["relationshipError"] = "*Please enter your relationship.";
    }
    if (typeof fields["relationship"] !== "undefined") {
      if (!fields["relationship"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["relationshipError"] =
          "*Please enter alphabet characters only.";
      }
    }

    setStateError(stateError);
    return formIsValid;
  };
  const submitHandler = (e) => {
    if (validateForm()) {
    }
    const nextPage = props.NextStep;
    nextPage();
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  return (
    <Fragment>
      <Form>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={6}>
            <div>
              <label>
                <b>Present Address</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          {/* <div className="divContents"> */}
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="contactName"
                value={state.contactName}
                onChange={changeHandler}
                required
                placeholder="Name"
                disabled={disabled}
              />
              <p style={{ color: "red" }}>{stateError.contactNameError} </p>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Relationships<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="relationship"
                value={state.relationship}
                onChange={changeHandler}
                required
                disabled={disabled}
              >
                <option value="">Relationships</option>
              </Form.Control>
              <p style={{ color: "red" }}>{stateError.relationshipError} </p>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Contact No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={changeHandler}
                required
                placeholder="Contact No"
                disabled={disabled}
              />
              <p style={{ color: "red" }}>{stateError.phoneNumberError} </p>
            </Form.Group>
          </div>

          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Address Line 1<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="addressLine"
                value={state.addressLine}
                onChange={changeHandler}
                required
                placeholder="Address Line 1"
                disabled={disabled}
              />
              <p style={{ color: "red" }}>{stateError.addressLineError} </p>
            </Form.Group>
          </div>
          {/* </div> */}
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Locality</Form.Label>
              <Form.Control
                type="text"
                name="locality"
                value={state.locality}
                onChange={changeHandler}
                required
                placeholder="Locality"
                disabled={disabled}
              />
            </Form.Group>
            <p style={{ color: "red" }}>{stateError.localityError} </p>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                City<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={state.city}
                onChange={changeHandler}
                required
                placeholder="City"
                disabled={disabled}
              />
              <span style={{ color: "red" }}>{stateError.cityError}</span>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Country<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={state.country}
                onChange={changeHandler}
                required
                placeholder="Country"
                disabled={disabled}
              />
            </Form.Group>
            <p style={{ color: "red" }}>{stateError.countryError} </p>
          </div>

          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                PinCode<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="pinCode"
                value={state.pinCode}
                onChange={changeHandler}
                required
                placeholder="Pin Code"
                disabled={disabled}
              />
              <p style={{ color: "red" }}>{stateError.pinCodeError} </p>
            </Form.Group>
          </div>
        </Row>
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <button className="stepperButtons" onClick={PrevStep}>
            Back
          </button>
          <button className="stepperButtons" onClick={submitHandler}>
            Save & Next
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default EmergencyContact;
