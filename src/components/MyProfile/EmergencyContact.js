import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { OnBoardContext } from "../../context/OnBoardState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";

const EmergencyContact = (props) => {
  const { candidateProfileData, addressView } = useContext(OnBoardContext);
  const { emergencyContactView, EmergencyContactView, EmergencyContactUpdate } =
    useContext(EmployeeProfileContext);
  const [disabled, setDisableState] = useState(false);

  const { user } = useContext(AppContext);
  // acessing employeeId from params

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
  const [dataExist, setDataExist] = useState({
    exist: false,
  });
  const [state, setState] = useState({
    contactName: "",
    addressLine: "",
    city: "",
    country: "",
    employeeId: user.employeeId,
    contactId: 0,
    locality: "",
    phoneNumber: "",
    pinCode: "",
    relationship: "",
  });
  useEffect(() => {
    EmergencyContactView(user.employeeId);
    console.log(emergencyContactView, "emergencyContactView");
  }, []);
  useEffect(() => {
    if (
      emergencyContactView !== null &&
      Object.keys(emergencyContactView).length !== 0
    ) {
      console.log(emergencyContactView, "emergencyContactView3");
      
        state.contactName= emergencyContactView[0].contactName
        state.addressLine =  emergencyContactView[0].addressLine
        state.employeeId =  emergencyContactView[0].employeeId?emergencyContactView[0].employeeId:user.employeeId
        state.contactId = emergencyContactView[0].contactId
        state.city = emergencyContactView[0].city
        state.country = emergencyContactView[0].country
        state.locality = emergencyContactView[0].locality
        state.phoneNumber = emergencyContactView[0].phoneNumber
        state.pinCode = emergencyContactView[0].pinCode
        state.relationship =  emergencyContactView[0].relationship
    
      setDataExist({ exist: true });
    }
  }, [emergencyContactView]);
  console.log(state,emergencyContactView, "previous2");
  const validateForm = () => {
    let fields = state;
    let stateError = {};
    let formIsValid = true;
    console.log(state, "state in emergencyContact");
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
    // if (!fields["addressLine"]) {
    //   formIsValid = false;
    //   stateError["addressLineError"] = "*Please enter your address.";
    // }

    // if (typeof fields["addressLine"] !== "undefined") {
    //   if (
    //     !fields["addressLine"].match(/^[a-zA-Z0-9\s,.'-]{3,}$/)
    //   ) {
    //     formIsValid = false;
    //     stateError["addressLineError"] = "*Please enter valid address.";
    //   }
    // }
    if (!fields["city"]) {
      formIsValid = false;
      stateError["cityError"] = "*Please enter your city.";
    }

    if (!fields["country"]) {
      formIsValid = false;
      stateError["countryError"] = "*Please enter your country.";
    }

    if (typeof fields["country"] !== "undefined") {
      if (!fields["country"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["countryError"] = "*Please enter the valid country name.";
      }
    }
    // if (!fields["locality"]) {
    //   formIsValid = false;
    //   stateError["localityError"] = "Please enter your locality.";
    // }

    // if (typeof fields["locality"] !== "undefined") {
    //   if (!fields["locality"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     stateError["localityError"] = "Please enter alphabet characters only.";
    //   }
    // }
    if (!fields["phoneNumber"]) {
      formIsValid = false;
      stateError["phoneNumberError"] = "*Please enter the phone no.";
    }

    if (typeof fields["phoneNumber"] !== "undefined") {
      if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        stateError["phoneNumberError"] = "*Please enter the valid phone no.";
      }
    }
    // if (!fields["pinCode"]) {
    //   formIsValid = false;
    //   stateError["pinCodeError"] = "*Please enter your pinCode.";
    // }

    if (
      state.pinCode !== "" &&
      state.pinCode !== null &&
      state.pinCode !== undefined
    ) {
      console.log("---->", state.pinCode);
      if (!/^[0-9]{6}$/g.test(fields["pinCode"])) {
        formIsValid = false;
        stateError["pinCodeError"] = "*Please enter the valid pinCode.";
      }
    }
    if (typeof fields["city"] !== "undefined") {
      if (!fields["city"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        stateError["cityError"] = "*Please enter the valid city.";
      }
    }

    if (!fields["relationship"]) {
      formIsValid = false;
      stateError["relationshipError"] = "*Please choose relationship.";
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
    e.preventDefault();
    console.log("next", state);
    if (validateForm()) {
      console.log("INSIDE SUBMIT HANDLER");
      console.log("state of emergency", state);
      EmergencyContactUpdate(state);
      // if (dataExist.exist == true) {
      //   EmergencyContactUpdate(state);
      //   const nextPage = props.NextStep;
      //   nextPage(true);
      // } else {
      //   EmergencyContactCreate(state);
      //   const nextPage = props.NextStep;
      //   nextPage(true);
      // }
    }
  };

  const PrevStep = (e) => {
    e.preventDefault();
    console.log("previous");
    const back = props.PrevStep;
    back();
    addressView(candidateProfileData.employeeId);
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
      {/* <ToastContainer /> */}
      <Form>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={6}>
            <div>
              <label>
                <b>Emergency Contact</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          {/* <div className="divContents"> */}
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>Name</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="contactName"
                value={state.contactName}
                onChange={changeHandler}
                required
                placeholder="Name"
                disabled={disabled}
                style={
                  stateError.contactNameError ? { borderColor: "red" } : {}
                }
              />
              <p style={{ color: "red" }}>{stateError.contactNameError} </p>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>Relationship</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="relationship"
                value={state.relationship}
                onChange={changeHandler}
                required
                disabled={disabled}
                style={
                  stateError.relationshipError ? { borderColor: "red" } : {}
                }
              >
                <option value="">Relationship</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Spouse">Spouse</option>\{" "}
                <option value="Others">Others</option>
              </Form.Control>
              <p style={{ color: "red" }}>{stateError.relationshipError} </p>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b> Contact No</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={changeHandler}
                required
                placeholder="Contact No"
                disabled={disabled}
                style={
                  stateError.phoneNumberError ? { borderColor: "red" } : {}
                }
              />
              <p style={{ color: "red" }}>{stateError.phoneNumberError} </p>
            </Form.Group>
          </div>

          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>Address Line 1</b>
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
              <Form.Label>
                <b>Locality</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="locality"
                value={state.locality}
                onChange={changeHandler}
                required
                placeholder="Locality"
                disabled={disabled}
                style={stateError.localityError ? { borderColor: "red" } : {}}
              />
            </Form.Group>
            <p style={{ color: "red" }}>{stateError.localityError} </p>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>City</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={state.city}
                onChange={changeHandler}
                required
                placeholder="City"
                disabled={disabled}
                style={stateError.cityError ? { borderColor: "red" } : {}}
              />
              <p style={{ color: "red" }}>{stateError.cityError}</p>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>Country</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={state.country}
                onChange={changeHandler}
                required
                placeholder="Country"
                disabled={disabled}
                style={stateError.countryError ? { borderColor: "red" } : {}}
              />
              <p style={{ color: "red" }}>{stateError.countryError} </p>
            </Form.Group>
          </div>

          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b> PinCode</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="pinCode"
                value={state.pinCode}
                onChange={changeHandler}
                required
                placeholder="Pin Code"
                disabled={disabled}
                style={stateError.pinCodeError ? { borderColor: "red" } : {}}
              />
              <p style={{ color: "red" }}>{stateError.pinCodeError} </p>
            </Form.Group>
          </div>
        </Row>
        <div
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            textAlign: "right",
          }}
        >
          <button className="profileButtons" onClick={submitHandler}>
            Update
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default EmergencyContact;
