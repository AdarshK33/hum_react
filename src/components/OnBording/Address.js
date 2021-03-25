import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";
import countryList from "react-select-country-list";

const Address = (props) => {
  const [isChecked, changeCheckState] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const [state, setState] = useState({
    flatNumber: "",
    street: "",
    locality: "",
    addressLine: "",
    countryId: 0,
    stateId: 0,
    cityId: 0,
    pinCode: "",
    phoneNumber: "",
    permanentFlatNumber: "",
    permanentStreet: "",
    permanentLocality: "",
    permanentAddressLine: "",
    permanentCountryId: 0,
    permanentStateId: 0,
    permanentCityId: 0,
    permanentPinCode: "",
    permanentPhoneNumber: "",
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
  const handleCheckboxChange = (e) => {
    changeCheckState(e.target.checked);
    console.log(isChecked);
  };
  const handleNoCheckboxChange = (e) => {
    changeCheckState(!e.target.checked);
    console.log(isChecked);
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
          <label for="validationCustom03" class="form-label">City</label>
    <input type="text" class="form-control" id="validationCustom03" required/>
    <div class="invalid-feedback">
      Please provide a valid city.
    </div>
            {/* <Form.Group>
              <Form.Label>
                Flat/Plot No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="flatNumber"
                value={state.flatNumber}
                onChange={changeHandler}
                required
                placeholder="Flat/Plot No"
                disabled={disabled}
              />
            </Form.Group> */}
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={state.street}
                onChange={changeHandler}
                required
                placeholder="Street"
                disabled={disabled}
              />
            </Form.Group>
          </div>
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
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="countryId"
                value={state.countryId}
                options={options}
                onChange={changeHandler}
                required
                disabled={disabled}
              >
                <option value="">Country</option>
                {options.map((item) => {
                  return <option key={item.value}>{item.label}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                name="stateId"
                value={state.stateId}
                onChange={changeHandler}
              >
                <option value="">State</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                name="cityId"
                value={state.cityId}
                onChange={changeHandler}
              >
                <option value="">City</option>
              </Form.Control>
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
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Phone No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={changeHandler}
                required
                placeholder="Phone No"
                disabled={disabled}
              />
            </Form.Group>
          </div>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                <b>Is permanent address same as present address ?</b>
              </label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                {/* className="CheckBoxField" */}

                {/* <input  className="largerCheckbox" type="checkbox" value="No" /> */}
                <input
                  type="checkbox"
                  value="No"
                  checked={!isChecked}
                  onChange={handleNoCheckboxChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                {/* <label>Yes</label> */}
                {/* <input  className="largerCheckbox" type="checkbox" value="Yes" /> */}
                <input
                  type="checkbox"
                  value="Yes"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        {isChecked ? (
          <div></div>
        ) : (
          <div>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={6}>
                <div>
                  <label>
                    <b>Permanent Address</b>
                  </label>
                </div>
              </Col>
            </Row>
            <Row style={{ marginBottom: "2rem" }}>
              {/* <div className="divContents"> */}
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>
                    Flat/Plot No<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="permanentFlatNumber"
                    value={state.permanentFlatNumber}
                    onChange={changeHandler}
                    required
                    placeholder="Flat/Plot No"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="permanentStreet"
                    value={state.permanentStreet}
                    onChange={changeHandler}
                    required
                    placeholder="Street"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>Locality</Form.Label>

                  <Form.Control
                    type="text"
                    name="permanentLocality"
                    value={state.permanentLocality}
                    onChange={changeHandler}
                    required
                    placeholder="Locality"
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
                    name="permanentAddressLine"
                    value={state.permanentAddressLine}
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
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentCountryId"
                    value={state.permanentCountryId}
                    options={options}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                  >
                    <option value="">Country</option>
                    {options.map((item) => {
                      return <option key={item.value}>{item.label}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentStateId"
                    value={state.permanentStateId}
                    onChange={changeHandler}
                  >
                    <option value="">State</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentCityId"
                    value={state.permanentCityId}
                    onChange={changeHandler}
                  >
                    <option value="">City</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>
                    PinCode<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="permanentPinCode"
                    value={state.permanentPinCode}
                    onChange={changeHandler}
                    required
                    placeholder="Pin Code"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
            </Row>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>
                    Phone No<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="permanentPhoneNumber"
                    value={state.permanentPhoneNumber}
                    onChange={changeHandler}
                    required
                    placeholder="Phone No"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
            </Row>
          </div>
        )}
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
export default Address;
