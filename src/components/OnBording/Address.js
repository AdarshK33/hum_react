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
import { OnBoardContext } from "../../context/OnBoardState";

const Address = (props) => {
  const { stateList, StateList, cityList, CityList } = useContext(
    OnBoardContext
  );
  const [isChecked, changeCheckState] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const [flatNumberErro, setFlatNumberError] = useState(false);
  const [addressLineError, setAddressLineError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);

  const [PermanentFlatNumberError, setPermanentFlatNumberError] = useState(
    false
  );
  const [PermanentAddressLineError, setPermanentAddressLineError] = useState(
    false
  );
  const [PermanentCountryError, setPermanentCountryError] = useState(false);
  const [PermanentStateError, setPermanentStateError] = useState(false);
  const [PermanentCityError, setPermanentCityError] = useState(false);
  const [PermanentPinCodeError, setPermanentPinCodeError] = useState(false);
  const [PermanentPhoneNoError, setPermanentPhoneNoError] = useState(false);

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
  const flatNumberValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.flatNumber !== "") {
      setFlatNumberError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setFlatNumberError(true);
      console.log("flatNumberError");
      return false;
    }
  };
  const addressLineValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.addressLineError !== "") {
      setAddressLineError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setAddressLineError(true);
      console.log("flatNumberError");
      return false;
    }
  };

  const submitHandler = (e) => {
    const AddressInfo = {
      addressId: 0,
      addressLine: state.addressLine,
      addressProof: " ",
      addressType: 0,
      candidateId: 0,
      cityId: state.cityId,
      countryId: state.countryId,
      stateId: state.stateId,
      flatNumber: state.flatNumber,
      locality: state.locality,
      permanentAddressLine: state.permanentAddressLine,
      permanentAddressProof: " ",
      permanentCityId: state.permanentCityId,
      permanentCountryId: state.countryId,
      permanentStateId: state.permanentStateId,
      permanentFlatNumber: state.permanentFlatNumber,
      permanentLocality: state.permanentLocality,
      permanentPhoneNumber: state.permanentPhoneNumber,
      permanentPinCode: state.permanentPinCode,
      permanentStreet: state.permanentStreet,
      phoneNumber: state.phoneNumber,
      pinCode: state.pinCode,
      street: state.street,
    };
    console.log(AddressInfo);
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
            <Form.Group>
              <Form.Label>
                Flat/Plot No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="flatNumber"
                value={state.flatNumber}
                onChange={changeHandler}
                required
                style={flatNumberErro ? { borderColor: "red" } : {}}
                placeholder="Flat/Plot No"
                disabled={disabled}
              />
              {flatNumberErro ? (
                <p style={{ color: "red" }}> Please enter flat/plot no</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={state.street}
                onChange={changeHandler}
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
                style={addressLineError ? { borderColor: "red" } : {}}
                placeholder="Address Line 1"
                disabled={disabled}
              />
              {addressLineError ? (
                <p style={{ color: "red" }}> Please enter address line1</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          {/* </div> */}
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Country <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="countryId"
                value={state.countryId}
                options={options}
                onChange={changeHandler}
                required
                style={countryError ? { borderColor: "red" } : {}}
                disabled={disabled}
              >
                <option value="">Country</option>
                {options.map((item) => {
                  return <option key={item.value}>{item.label}</option>;
                })}
              </Form.Control>
              {countryError ? (
                <p style={{ color: "red" }}> Please choose country</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                State <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="stateId"
                value={state.stateId}
                style={stateError ? { borderColor: "red" } : {}}
                onChange={changeHandler}
              >
                <option value="">State</option>
              </Form.Control>
              {stateError ? (
                <p style={{ color: "red" }}> Please choose state</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                City <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="cityId"
                value={state.cityId}
                style={cityError ? { borderColor: "red" } : {}}
                onChange={changeHandler}
              >
                <option value="">City</option>
              </Form.Control>
              {cityError ? (
                <p style={{ color: "red" }}> Please choose city</p>
              ) : (
                <p></p>
              )}
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
                style={pinCodeError ? { borderColor: "red" } : {}}
                placeholder="Pin Code"
                disabled={disabled}
              />
              {pinCodeError ? (
                <p style={{ color: "red" }}> Please enter pin code</p>
              ) : (
                <p></p>
              )}
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
                style={phoneNoError ? { borderColor: "red" } : {}}
                placeholder="Phone No"
                disabled={disabled}
              />
              {phoneNoError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  Please enter valid phone number{" "}
                </p>
              ) : (
                <p></p>
              )}
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
                    style={
                      PermanentFlatNumberError ? { borderColor: "red" } : {}
                    }
                    placeholder="Flat/Plot No"
                    disabled={disabled}
                  />
                  {PermanentFlatNumberError ? (
                    <p style={{ color: "red" }}> Please enter flat/plot no</p>
                  ) : (
                    <p></p>
                  )}
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
                    style={
                      PermanentAddressLineError ? { borderColor: "red" } : {}
                    }
                    placeholder="Address Line 1"
                    disabled={disabled}
                  />
                  {PermanentAddressLineError ? (
                    <p style={{ color: "red" }}> Please enter address line1</p>
                  ) : (
                    <p></p>
                  )}
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
                    style={PermanentCountryError ? { borderColor: "red" } : {}}
                    disabled={disabled}
                  >
                    <option value="">Country</option>
                    {options.map((item) => {
                      return <option key={item.value}>{item.label}</option>;
                    })}
                  </Form.Control>
                  {PermanentCountryError ? (
                    <p style={{ color: "red" }}> Please choose country</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentStateId"
                    value={state.permanentStateId}
                    style={PermanentStateError ? { borderColor: "red" } : {}}
                    onChange={changeHandler}
                  >
                    <option value="">State</option>
                  </Form.Control>
                  {PermanentStateError ? (
                    <p style={{ color: "red" }}> Please choose state</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentCityId"
                    value={state.permanentCityId}
                    style={PermanentCityError ? { borderColor: "red" } : {}}
                    onChange={changeHandler}
                  >
                    <option value="">City</option>
                  </Form.Control>
                  {PermanentCityError ? (
                    <p style={{ color: "red" }}> Please choose city</p>
                  ) : (
                    <p></p>
                  )}
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
                    style={PermanentPinCodeError ? { borderColor: "red" } : {}}
                    placeholder="Pin Code"
                    disabled={disabled}
                  />
                  {PermanentPinCodeError ? (
                    <p style={{ color: "red" }}> Please enter pin code</p>
                  ) : (
                    <p></p>
                  )}
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
                    style={PermanentPhoneNoError ? { borderColor: "red" } : {}}
                    placeholder="Phone No"
                    disabled={disabled}
                  />
                  {PermanentPhoneNoError ? (
                    <p style={{ color: "red" }}> Please enter phone number</p>
                  ) : (
                    <p></p>
                  )}
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
