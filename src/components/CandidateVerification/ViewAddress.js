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
import "../OnBording/OnBoard.css";
import countryList from "react-select-country-list";
import { OnBoardContext } from "../../context/OnBoardState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { useParams } from "react-router-dom";

const EditAddress = (props) => {
  const {
    candidateCountryList,
    candidateCountryData,
    CandidateStateList,
    candidateStateData,
    candidateCityList,
    candidateCityData,
  } = useContext(OnBoardContext);
  const { addressInfo, addressInfoData, loader } = useContext(
    DocsVerifyContext
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

  // acessing candidateId from params
  const params = useParams();
  const candidateId = params["candidateId"];

  const [state, setState] = useState({
    flatNumber: "",
    street: "",
    locality: "",
    addressLine: "",
    countryId: "",
    stateId: 0,
    cityId: 0,
    pinCode: "",
    phoneNumber: "",
    permanentFlatNumber: "",
    permanentStreet: "",
    permanentLocality: "",
    permanentAddressLine: "",
    permanentCountryId: "",
    permanentStateId: 0,
    permanentCityId: 0,
    permanentPinCode: "",
    permanentPhoneNumber: "",
  });

  useEffect(() => {
    addressInfo(candidateId);
    setState(addressInfoData);
    candidateCountryList();
    // CandidateStateList();
    setDisableState(true);
  }, []);
  useEffect(() => {
    var countryvalue = candidateCountryData.filter(
      (i) => i.countryId === state.countryId
    );
    if (countryvalue !== undefined && countryvalue[0] !== undefined) {
      CandidateStateList(countryvalue[0].countryName);
    }
    var permanentCountry = candidateCountryData.filter(
      (j) => j.countryId === state.permanentCountryId
    );
    if (permanentCountry !== undefined && permanentCountry[0] !== undefined) {
      CandidateStateList(countryvalue[0].countryName);
    }
  }, [candidateCountryData]);
  useEffect(() => {
    var stateList = candidateStateData.filter(
      (i) => i.stateId === state.stateId
    );
    if (stateList !== undefined && stateList[0] !== undefined) {
      candidateCityList(stateList[0].stateId);
    }
    var permanetStateList = candidateStateData.filter(
      (st) => st.stateId === state.permanentStateId
    );
    if (permanetStateList !== undefined && permanetStateList[0] !== undefined) {
      candidateCityList(permanetStateList[0].stateId);
    }
  }, [candidateStateData]);
  const flatNumberValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.flatNumber !== "") {
      setFlatNumberError(false);
      return true;
    } else {
      setFlatNumberError(true);
      return false;
    }
  };
  const addressLineValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.addressLine !== "") {
      setAddressLineError(false);
      return true;
    } else {
      setAddressLineError(true);
      return false;
    }
  };
  const countryValidation = () => {
    if ((state.countryId !== "") & (state.countryId !== "Country")) {
      setCountryError(false);
      return true;
    } else {
      setCountryError(true);
      return false;
    }
  };
  const StateValidation = () => {
    if ((state.stateId !== 0) & (state.stateId !== "State")) {
      setStateError(false);
      return true;
    } else {
      setStateError(true);
      return false;
    }
  };
  const CityValidation = () => {
    if ((state.cityId !== 0) & (state.cityId !== "City")) {
      setCityError(false);
      return true;
    } else {
      setCityError(true);
      return false;
    }
  };
  const PinCodeErrorValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.pinCode !== "") {
      setPinCodeError(false);
      return true;
    } else {
      setPinCodeError(true);
      return false;
    }
  };
  const PhoneNoErrorValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.phoneNumber !== "") {
      setPhoneNoError(false);
      return true;
    } else {
      setPhoneNoError(true);
      return false;
    }
  };

  const permanentFlatNumberValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.permanentFlatNumber !== "") {
      setPermanentFlatNumberError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setPermanentFlatNumberError(true);
      console.log("flatNumberError");
      return false;
    }
  };
  const permanentAddressLineValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.permanentAddressLine !== "") {
      setPermanentAddressLineError(false);
      console.log("addresSuccess");
      return true;
    } else {
      setPermanentAddressLineError(true);
      console.log("addressError");
      return false;
    }
  };
  const permanentCountryValidation = () => {
    if (
      (state.permanentCountryId !== "") &
      (state.permanentCountryId !== "Country")
    ) {
      setPermanentCountryError(false);
      console.log("CountrySucess");
      return true;
    } else {
      setPermanentCountryError(true);
      console.log("countryFaill");
      return false;
    }
  };
  const permanentStateValidation = () => {
    if ((state.permanentStateId !== 0) & (state.permanentStateId !== "State")) {
      setPermanentStateError(false);
      console.log("StateSucess");
      return true;
    } else {
      setPermanentStateError(true);
      console.log("stateFaill");
      return false;
    }
  };
  const permanentCityValidation = () => {
    if ((state.permanentCityId !== 0) & (state.permanentCityId !== "City")) {
      setPermanentCityError(false);
      console.log("citySucess");
      return true;
    } else {
      setPermanentCityError(true);
      console.log("cityFaill");
      return false;
    }
  };
  const permanentPinCodeErrorValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.permanentPinCode !== "") {
      setPermanentPinCodeError(false);
      console.log("pinCodeSuccess");
      return true;
    } else {
      setPermanentPinCodeError(true);
      console.log("pinCodeFailError");
      return false;
    }
  };
  const permanentPhoneNoErrorValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.permanentPhoneNumber !== "") {
      setPermanentPhoneNoError(false);
      console.log("phoneNoeSuccess");
      return true;
    } else {
      setPermanentPhoneNoError(true);
      console.log("phoneNumberFailError");
      return false;
    }
  };
  const checkValidations = () => {
    if (
      (flatNumberValidation() == true) &
      (addressLineValidations() == true) &
      (countryValidation() == true) &
      (StateValidation() == true) &
      (CityValidation() == true) &
      (PinCodeErrorValidations() == true) &
      (PhoneNoErrorValidations() == true)
    ) {
      if (isChecked == false) {
        console.log("isChecked");
        if (
          (permanentFlatNumberValidation() == true) &
          (permanentAddressLineValidations() == true) &
          (permanentCountryValidation() == true) &
          (permanentCityValidation() == true) &
          (permanentStateValidation() == true) &
          (permanentPinCodeErrorValidations() == true) &
          (permanentPhoneNoErrorValidations() == true)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const submitHandler = (e) => {
    const nextPage = props.NextStep;
    nextPage();
    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
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
    }
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
  var countryvalue = candidateCountryData.filter(
    (i) => i.countryId === state.countryId
  );

  var stateVale =
    candidateStateData !== null &&
    candidateStateData.filter((s) => s.stateId === state.stateId);
  var cityvalue =
    candidateCityData !== null &&
    candidateCityData.filter((c) => c.cityId === state.cityId);
  var permanetCountry = candidateCountryData.filter(
    (k) => k.countryId === state.permanentCountryId
  );
  var permanentStateValue =
    candidateStateData !== null &&
    candidateStateData.filter(
      (state) => state.stateId === state.permanentStateId
    );
  var permanentCityValue =
    candidateCityData !== null &&
    candidateCityData.filter((city) => city.cityId === state.permanentCityId);
  return (
    console.log(permanetCountry),
    (
      <Fragment>
        {addressInfoData !== null && addressInfoData !== undefined ? (
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
                {/* <label for="validationCustom03" class="form-label">
                City
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom03"
                required
                disabled={disabled}
              />
              <div class="invalid-feedback">Please provide a valid city.</div> */}
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
                    name="countryId"
                    type="text"
                    value={
                      countryvalue !== undefined &&
                      countryvalue[0] !== undefined &&
                      countryvalue[0].countryName
                    }
                    required
                    style={countryError ? { borderColor: "red" } : {}}
                    disabled={true}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-3">
                <Form.Group>
                  <Form.Label>
                    State <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    name="stateId"
                    type="text"
                    value={
                      stateVale !== undefined &&
                      stateVale[0] !== undefined &&
                      stateVale[0].stateName
                    }
                    style={stateError ? { borderColor: "red" } : {}}
                    onChange={changeHandler}
                    disabled={true}
                  ></Form.Control>
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
                    type="text"
                    name="cityId"
                    value={
                      cityvalue !== undefined &&
                      cityvalue[0] !== undefined &&
                      cityvalue[0].cityName
                    }
                    style={cityError ? { borderColor: "red" } : {}}
                    onChange={changeHandler}
                    disabled={true}
                  ></Form.Control>
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                        <p style={{ color: "red" }}>
                          {" "}
                          Please enter flat/plot no
                        </p>
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
                          PermanentAddressLineError
                            ? { borderColor: "red" }
                            : {}
                        }
                        placeholder="Address Line 1"
                        disabled={disabled}
                      />
                      {PermanentAddressLineError ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please enter address line1
                        </p>
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
                        type="text"
                        name="permanentCountryId"
                        value={
                          permanetCountry !== undefined &&
                          permanetCountry[0] !== undefined &&
                          permanetCountry[0].countryName
                        }
                        options={options}
                        onChange={changeHandler}
                        required
                        style={
                          PermanentCountryError ? { borderColor: "red" } : {}
                        }
                        disabled={disabled}
                      ></Form.Control>
                      {PermanentCountryError ? (
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
                        type="text"
                        name="permanentStateId"
                        value={
                          permanentStateValue !== undefined &&
                          permanentStateValue[0] !== undefined &&
                          permanentStateValue[0].stateName
                        }
                        style={
                          PermanentStateError ? { borderColor: "red" } : {}
                        }
                        onChange={changeHandler}
                        disabled={true}
                      ></Form.Control>
                      {PermanentStateError ? (
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
                        type="text"
                        value={
                          permanentCityValue !== undefined &&
                          permanentCityValue[0] !== undefined &&
                          permanentCityValue[0].cityName
                        }
                        style={PermanentCityError ? { borderColor: "red" } : {}}
                        onChange={changeHandler}
                        disabled={true}
                      ></Form.Control>
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
                        style={
                          PermanentPinCodeError ? { borderColor: "red" } : {}
                        }
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
                        style={
                          PermanentPhoneNoError ? { borderColor: "red" } : {}
                        }
                        placeholder="Phone No"
                        disabled={disabled}
                      />
                      {PermanentPhoneNoError ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please enter phone number
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                </Row>
              </div>
            )}
          </Form>
        ) : (
          <div className="text-center">No Data Found</div>
        )}
      </Fragment>
    )
  );
};
export default EditAddress;
