import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { OnBoardContext } from "../../context/OnBoardState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom";

const EmergencyContact = (props) => {
  const { candidateProfileData, addressView } = useContext(OnBoardContext);
  const {
    emergencyContactView,
    EmergencyContactView,
    EmergencyContactUpdate,
    currentEmpId,
  } = useContext(EmployeeProfileContext);
  const [disabled, setDisableState] = useState(false);
  // acessing employeeId from params
  const params = useParams();
  const empId = params["employeeid"];

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
    employeeId: 0,
    contactId: 0,
    locality: "",
    phoneNumber: "",
    pinCode: "",
    relationship: "",
  });
  useEffect(() => {
    if(currentEmpId !== 0 && currentEmpId !== null && currentEmpId !== undefined) {
    EmergencyContactView(currentEmpId);
  }else{
    EmergencyContactView(empId);
  }
    console.log(emergencyContactView, "emergencyContactView");
  }, []);
  useEffect(() => {
    if (
      emergencyContactView &&
      Object.keys(emergencyContactView).length
    ) {
      console.log(emergencyContactView, "emergencyContactView3");
      setState({
        contactName: emergencyContactView.contactName,
        addressLine: emergencyContactView.addressLine,
        employeeId: currentEmpId !== 0 ? currentEmpId : empId,
        contactId: emergencyContactView.contactId,
        city: emergencyContactView.city,
        country: emergencyContactView.country,
        locality: emergencyContactView.locality,
        phoneNumber: emergencyContactView.phoneNumber,
        pinCode: emergencyContactView.pinCode,
        relationship: emergencyContactView.relationship,
      });
      setDataExist({ exist: true });
    } else {
      setState({
        contactName: "",
        addressLine: "",
        employeeId: currentEmpId !== 0 ? currentEmpId :empId,
        contactId: 0,
        city: "",
        country: "",
        locality: "",
        phoneNumber: "",
        pinCode: "",
        relationship: "",
      });
    }
    console.log(state, "previous2");
  }, [emergencyContactView]);
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
    console.log("next", state,currentEmpId);
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
                maxLength="100"
                required
                placeholder="Name"
                disabled={disabled}
                style={
                  stateError.contactNameError ? { borderColor: "red" } : {}
                }
              />
              {/* <p style={{ color: "red" }}>{stateError.contactNameError} </p> */}
                 {stateError.contactNameError ? (
                  <p style={{ color: "red" }}> 
                   {" "}
                  { stateError.contactNameError}
                  </p>
                ) :state.contactName && state.contactName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
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
                maxLength="10"
                onChange={changeHandler}
                required
                placeholder="Contact No"
                disabled={disabled}
                style={
                  stateError.phoneNumberError ? { borderColor: "red" } : {}
                }
              />
              {/* <p style={{ color: "red" }}>{stateError.phoneNumberError} </p> */}
              {stateError.phoneNumberError ? (
                  <p style={{ color: "red" }}>  {stateError.phoneNumberError}</p>
                ) :state.phoneNumber && state.phoneNumber.length >10 ? (
                  <p style={{ color: "red" }}> Max 10 Characters</p>
                ) : (
                  <p></p>
                )}

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
                maxLength="100"
                onChange={changeHandler}
                required
                placeholder="Address Line 1"
                disabled={disabled}
              />
              {/* <p style={{ color: "red" }}>{stateError.addressLineError} </p> */}
              {stateError.addressLineError ? (
                  <p style={{ color: "red" }}>  {stateError.addressLineError}</p>
                ) :state.addressLine && state.addressLine.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
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
                <b>Locality</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="locality"
                value={state.locality}
                onChange={changeHandler}
                maxLength="100"
                required
                placeholder="Locality"
                disabled={disabled}
                style={stateError.localityError ? { borderColor: "red" } : {}}
              />
            </Form.Group>
            {/* <p style={{ color: "red" }}>{stateError.localityError} </p> */}
            {stateError.localityError ? (
                  <p style={{ color: "red" }}>  {stateError.localityError}</p>
                ) :state.locality && state.locality.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}

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
                maxLength="250"
                required
                placeholder="City"
                disabled={disabled}
                style={stateError.cityError ? { borderColor: "red" } : {}}
              />
              {/* <p style={{ color: "red" }}>{stateError.cityError}</p> */}
              {stateError.cityError ? (
                  <p style={{ color: "red" }}>  {stateError.cityError}</p>
                ) :state.city && state.city.length === 250 ? (
                  <p style={{ color: "red" }}> Max 250 Characters</p>
                ) : (
                  <p></p>
                )}
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
                maxLength="100"
                required
                placeholder="Country"
                disabled={disabled}
                style={stateError.countryError ? { borderColor: "red" } : {}}
              />
              {/* <p style={{ color: "red" }}>{stateError.countryError} </p> */}
              {stateError.countryError ? (
                  <p style={{ color: "red" }}>  {stateError.countryError}</p>
                ) :state.country && state.country.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
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
