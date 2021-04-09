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
  const {
    candidateCountryList,
    candidateCountryData,
    CandidateStateList,
    candidateStateData,
    candidateCityList,
    candidateCityData,
    addressCreate,
    addressSaveData,
    addressView,
    addressViewData,
    CandidateProfile,
    candidateData,
  } = useContext(OnBoardContext);

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
  const [saveclick, setSaveclick] = useState(false);

  const [state, setState] = useState({
    flatNumber: "",
    street: "",
    locality: "",
    addressLine: "",
    pinCode: "",
    phoneNumber: "",
    permanentFlatNumber: "",
    permanentStreet: "",
    permanentLocality: "",
    permanentAddressLine: "",
    permanentPinCode: "",
    permanentPhoneNumber: "",
  });

  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [cityName, setCityName] = useState();
  const [permanentCountryName, setPermanentCountryName] = useState();
  const [permanentStateName, setPermanentStateName] = useState();
  const [permanentCityName, setPermanentCityName] = useState();

  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [cityId, setCityId] = useState();
  const [permanentCountryId, setPermanentCountryId] = useState();
  const [permanentStateId, setPermanentStateId] = useState();
  const [permanentCityId, setPermanentCityId] = useState();
  const [addressValue, setAddressValue] = useState(0);

  useEffect(() => {
    CandidateProfile();
    candidateCountryList();
    addressView(candidateData.candidateId);
  }, []);
  console.log("address candidate data", candidateData);
  console.log("candidateCountryList data", candidateCountryData);
  console.log("addressViewData data", addressViewData);

  useEffect(() => {
    console.log("prefill data", addressViewData);
    let countryvalue;
    let stateValue;
    let cityValue;
    let permanentCountryvalue;
    let permanentStatevalue;
    let permanentCityValue;

    if (addressViewData !== undefined && addressViewData !== null) {
      if (addressViewData.addressType === 0) {
        setAddressValue(addressViewData.addressId);
        countryvalue = candidateCountryData.filter(
          (i) => i.countryId === addressViewData.countryId
        );
        console.log("Countryvalue", countryvalue);
        setCountryName(countryvalue[0].countryName);
        setCountryId(countryvalue[0].countryId);
        CandidateStateList(countryvalue[0].countryName);

        console.log("candidateStateData", candidateStateData);
        stateValue = candidateStateData.filter(
          (i) => i.stateId === addressViewData.stateId
        );
        console.log("stateValue", stateValue);
        if (stateValue.length !== 0) {
          setStateId(stateValue[0].stateId);
          setStateName(stateValue[0].stateName);
          candidateCityList(addressViewData.stateId);
          console.log("stateName", stateName);
          console.log("candidateCityData", candidateCityData);
        }

        cityValue = candidateCityData.filter(
          (i) => i.cityId === addressViewData.cityId
        );
        console.log("cityValue", cityValue);
        if (cityValue.length !== 0) {
          setCityId(cityValue[0].cityId);
          setCityName(cityValue[0].cityName);
        }

        permanentCountryvalue = candidateCountryData.filter(
          (i) => i.countryId === addressViewData.permanentCountryId
        );
        console.log("permanentCountryvalue", permanentCountryvalue);
        setPermanentCountryId(permanentCountryvalue[0].countryId);
        setPermanentCountryName(permanentCountryvalue[0].countryName);
        CandidateStateList(permanentCountryvalue[0].countryName);

        permanentStatevalue = candidateStateData.filter(
          (i) => i.stateId === addressViewData.permanentStateId
        );
        console.log("permanentStatevalue", permanentStatevalue);
        if (permanentStatevalue.length !== 0) {
          setPermanentStateId(permanentStatevalue[0].stateId);
          setPermanentStateName(permanentStatevalue[0].stateName);
          candidateCityList(addressViewData.permanentStateId);
        }

        permanentCityValue = candidateCityData.filter(
          (i) => i.cityId === addressViewData.permanentCityId
        );
        console.log("permanentCityValue", permanentCityValue);
        if (permanentCityValue.length !== 0) {
          setPermanentCityId(permanentCityValue[0].cityId);
          setPermanentCityName(permanentCityValue[0].cityName);
        }

        changeCheckState(false);
        setState({
          flatNumber: addressViewData.flatNumber,
          street: addressViewData.street,
          locality: addressViewData.locality,
          addressLine: addressViewData.addressLine,
          pinCode: addressViewData.pinCode,
          phoneNumber: addressViewData.phoneNumber,
          permanentFlatNumber: addressViewData.permanentFlatNumber,
          permanentStreet: addressViewData.permanentStreet,
          permanentLocality: addressViewData.permanentLocality,
          permanentAddressLine: addressViewData.permanentAddressLine,
          permanentPinCode: addressViewData.permanentPinCode,
          permanentPhoneNumber: addressViewData.permanentPhoneNumber,
        });
      } else if (addressViewData.addressType === 1) {
        setAddressValue(addressViewData.addressId);
        countryvalue = candidateCountryData.filter(
          (i) => i.countryId === addressViewData.countryId
        );
        console.log("Countryvalue", countryvalue);
        setCountryName(countryvalue[0].countryName);
        setCountryId(countryvalue[0].countryId);
        CandidateStateList(countryvalue[0].countryName);
        stateValue = candidateStateData.filter(
          (i) => i.stateId === addressViewData.stateId
        );
        console.log("stateValue", stateValue);

        if (stateValue.length !== 0) {
          setStateId(stateValue[0].stateId);
          setStateName(stateValue[0].stateName);
          candidateCityList(stateValue[0].stateId);
        }

        cityValue = candidateCityData.filter(
          (i) => i.cityId === addressViewData.cityId
        );
        console.log("cityValue addresstype 1", cityValue);
        if (cityValue.length !== 0) {
          setCityId(cityValue[0].cityId);
          setCityName(cityValue[0].cityName);
        }

        changeCheckState(true);
        setState({
          flatNumber: addressViewData.flatNumber,
          street: addressViewData.street,
          locality: addressViewData.locality,
          addressLine: addressViewData.addressLine,
          pinCode: addressViewData.pinCode,
          phoneNumber: addressViewData.phoneNumber,
        });
      }
    }
  }, [addressViewData]);

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
    if (state.addressLine !== "") {
      setAddressLineError(false);
      console.log("flatNumberSuccess");
      return true;
    } else {
      setAddressLineError(true);
      console.log("flatNumberError");
      return false;
    }
  };
  const countryValidation = () => {
    if ((state.countryId !== "") & (state.countryId !== "Country")) {
      setCountryError(false);
      console.log("CountrySucess");
      return true;
    } else {
      setCountryError(true);
      console.log("countryFaill");
      return false;
    }
  };
  const StateValidation = () => {
    if ((state.stateId !== 0) & (state.stateId !== "State")) {
      setStateError(false);
      console.log("StateSucess");
      return true;
    } else {
      setStateError(true);
      console.log("stateFaill");
      return false;
    }
  };
  const CityValidation = () => {
    if ((state.cityId !== 0) & (state.cityId !== "City")) {
      setCityError(false);
      console.log("citySucess");
      return true;
    } else {
      setCityError(true);
      console.log("cityFaill");
      return false;
    }
  };
  const PinCodeErrorValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.pinCode !== "") {
      setPinCodeError(false);
      console.log("pinCodeSuccess");
      return true;
    } else {
      setPinCodeError(true);
      console.log("pinCodeFailError");
      return false;
    }
  };
  const PhoneNoErrorValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.phoneNumber !== "") {
      setPhoneNoError(false);
      console.log("phoneNoeSuccess");
      return true;
    } else {
      setPhoneNoError(true);
      console.log("phoneNumberFailError");
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
  const countryHandler = (e) => {
    console.log("countryHandler", e.target.value);
    let filteredListOfCountry = candidateCountryData.filter(
      (i) => i.countryName === e.target.value
    );
    console.log("filteredListOfCountry", filteredListOfCountry);
    setCountryName(e.target.value);
    setCountryId(filteredListOfCountry[0].countryId);
    CandidateStateList(filteredListOfCountry[0].countryName);
  };

  const stateHandler = (e) => {
    console.log("stateHandler", e.target.value);
    let filteredListOfState = candidateStateData.filter(
      (i) => i.stateName === e.target.value
    );
    console.log("filteredListOfState", filteredListOfState);
    setStateName(e.target.value);
    setStateId(filteredListOfState[0].stateId);
    candidateCityList(filteredListOfState[0].stateId);
  };

  const cityHandler = (e) => {
    let filteredListOfCity = candidateCityData.filter(
      (i) => i.cityName === e.target.value
    );
    console.log("filteredListOfCity", filteredListOfCity);
    setCityName(e.target.value);
    setCityId(filteredListOfCity[0].cityId);
  };

  const permanentCountryHandler = (e) => {
    let filteredListOfCountry = candidateCountryData.filter(
      (i) => i.countryName === e.target.value
    );
    console.log("filteredListOfCountry", filteredListOfCountry);
    setPermanentCountryName(e.target.value);
    setPermanentCountryId(filteredListOfCountry[0].countryId);
    CandidateStateList(filteredListOfCountry[0].countryName);
  };

  const permanentStateHandler = (e) => {
    let filteredListOfState = candidateStateData.filter(
      (i) => i.stateName === e.target.value
    );
    console.log("filteredListOfState", filteredListOfState);
    setPermanentStateName(e.target.value);
    setPermanentStateId(filteredListOfState[0].stateId);
    candidateCityList(filteredListOfState[0].stateId);
  };

  const permanentCityHandler = (e) => {
    let filteredListOfCity = candidateCityData.filter(
      (i) => i.cityName === e.target.value
    );
    console.log("filteredListOfCity", filteredListOfCity);
    setPermanentCityName(e.target.value);
    setPermanentCityId(filteredListOfCity[0].cityId);
  };

  const submitHandler = (e) => {
    const nextPage = props.NextStep;
    // let addressValue;
    nextPage();
    e.preventDefault();
    console.log("addressViewData", addressViewData, addressSaveData, saveclick);
    // if (saveclick === false) {
    //   addressValue = 0;
    //   setSaveclick(true);
    // } else if (addressSaveData || addressViewData || saveclick === true) {
    //   addressValue = addressSaveData.addressId
    //     ? addressSaveData.addressId
    //     : addressViewData.addressId;
    // }
    const value = checkValidations();
    if (value === true) {
      // setSaveclick(true);
      const AddressInfo = {
        addressId: addressValue,
        addressLine: state.addressLine,
        addressProof: " ",
        addressType: isChecked ? 1 : 0,
        candidateId: candidateData.candidateId,
        cityId: cityId,
        countryId: countryId,
        stateId: stateId,
        flatNumber: state.flatNumber,
        locality: state.locality,
        permanentAddressLine: isChecked ? "" : state.permanentAddressLine,
        permanentAddressProof: " ",
        permanentCityId: isChecked ? "" : permanentCityId,
        permanentCountryId: isChecked ? "" : permanentCountryId,
        permanentStateId: isChecked ? "" : permanentStateId,
        permanentFlatNumber: isChecked ? "" : state.permanentFlatNumber,
        permanentLocality: isChecked ? "" : state.permanentLocality,
        permanentPhoneNumber: isChecked ? "" : state.permanentPhoneNumber,
        permanentPinCode: isChecked ? "" : state.permanentPinCode,
        permanentStreet: isChecked ? "" : state.permanentStreet,
        phoneNumber: state.phoneNumber,
        pinCode: state.pinCode,
        street: state.street,
      };
      console.log("address payload", AddressInfo);
      addressCreate(AddressInfo);
      const nextPage = props.NextStep;
      nextPage(true);
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
            {/* <label for="validationCustom03" class="form-label">City</label>
    <input type="text" class="form-control" id="validationCustom03" required/>
    <div class="invalid-feedback">
      Please provide a valid city.
    </div> */}
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
                value={countryName}
                onChange={(e) => countryHandler(e)}
                required
                style={countryError ? { borderColor: "red" } : {}}
                disabled={disabled}
              >
                <option value="">Select Country</option>
                {candidateCountryData !== null &&
                  candidateCountryData !== undefined &&
                  candidateCountryData.length > 0 &&
                  candidateCountryData.map((item, i) => {
                    return (
                      <option key={item.countryId}>{item.countryName}</option>
                    );
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
                value={stateName}
                style={stateError ? { borderColor: "red" } : {}}
                onChange={(e) => stateHandler(e)}
              >
                <option value="">Select State</option>
                {candidateStateData !== null &&
                  candidateStateData !== undefined &&
                  candidateStateData.length > 0 &&
                  candidateStateData.map((item, i) => {
                    return <option key={item.stateId}>{item.stateName}</option>;
                  })}
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
                value={cityName}
                style={cityError ? { borderColor: "red" } : {}}
                onChange={cityHandler}
              >
                <option value="">City</option>
                {candidateCityData !== null &&
                  candidateCityData !== undefined &&
                  candidateCityData.length > 0 &&
                  candidateCityData.map((item, i) => {
                    return <option key={item.cityId}>{item.cityName}</option>;
                  })}
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
                  <Form.Label>
                    Country <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentCountryId"
                    value={permanentCountryName}
                    onChange={permanentCountryHandler}
                    required
                    style={PermanentCountryError ? { borderColor: "red" } : {}}
                    disabled={disabled}
                  >
                    <option value="">Select Country</option>
                    {candidateCountryData !== null &&
                      candidateCountryData !== undefined &&
                      candidateCountryData.length > 0 &&
                      candidateCountryData.map((item) => {
                        return (
                          <option key={item.countryId}>
                            {item.countryName}
                          </option>
                        );
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
                  <Form.Label>
                    State <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentStateId"
                    value={permanentStateName}
                    style={PermanentStateError ? { borderColor: "red" } : {}}
                    onChange={permanentStateHandler}
                  >
                    <option value="">Select State</option>
                    {candidateStateData !== null &&
                      candidateStateData !== undefined &&
                      candidateStateData.length > 0 &&
                      candidateStateData.map((item) => {
                        return (
                          <option key={item.stateId}>{item.stateName}</option>
                        );
                      })}
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
                  <Form.Label>
                    City <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentCityId"
                    value={permanentCityName}
                    style={PermanentCityError ? { borderColor: "red" } : {}}
                    onChange={permanentCityHandler}
                  >
                    <option value="">Select City</option>
                    {candidateCityData !== null &&
                      candidateCityData !== undefined &&
                      candidateCityData.length > 0 &&
                      candidateCityData.map((item) => {
                        return (
                          <option key={item.cityId}>{item.cityName}</option>
                        );
                      })}
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
export default Address;
