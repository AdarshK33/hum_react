import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const EmergencyContact = (props) => {
  const [disabled, setDisableState] = useState(false);
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
  const submitHandler = (e) => {
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
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="relationship"
                value={state.relationship}
                onChange={changeHandler}
                required
                disabled={disabled}
              >
                <option value="">Relationship</option>
              </Form.Control>
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
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={state.city}
                onChange={changeHandler}
                required
                placeholder="City"
                disabled={disabled}
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Country</Form.Label>
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
            </Form.Group>
          </div>
        </Row>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
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
