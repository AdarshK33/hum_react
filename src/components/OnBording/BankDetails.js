import { startOfQuarter } from "date-fns";
import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const BankDetails = (props) => {
  const [disabled, setDisableState] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [ifscCodeError, setIfscCodeError] = useState(false);

  const [state, setState] = useState({
    accountNumber: "",
    bankId: 0,
    bankName: "",
    ifscCode: "",
  });

  const BankNameErrorValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.bankName !== "") {
      setBankNameError(false);
      console.log("bankNameSuccess");
      return true;
    } else {
      setBankNameError(true);
      console.log("bankNameFailError");
      return false;
    }
  };
  const AccountNumberErrorValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.accountNumber !== "") {
      setAccountNumberError(false);
      console.log("accountNumberSuccess");
      return true;
    } else {
      setAccountNumberError(true);
      console.log("AccountNumberFail");
      return false;
    }
  };

  const IfscCodeErrorValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if ((state.ifscCode !== "") & (state.ifscCode.length >= 12)) {
      setIfscCodeError(false);
      console.log("ifscCodeSuccess");
      return true;
    } else {
      setIfscCodeError(true);
      console.log("ifscCodeFail");
      return false;
    }
  };
  const checkValidations = () => {
    if (
      (BankNameErrorValidation() == true) &
      (AccountNumberErrorValidation() == true) &
      (IfscCodeErrorValidation() == true)
    ) {
      return true;
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
      const bankInfo = {
        accountNumber: state.accountNumber,
        bankId: 0,
        bankName: state.bankName,
        candidateId: 0,
        ifscCode: state.ifscCode,
      };
      console.log(bankInfo);
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
  return (
    <Fragment>
      <Form>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Bank Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                value={state.bankName}
                onChange={changeHandler}
                required
                placeholder="Bank Name"
                disabled={disabled}
              />
              {bankNameError ? (
                <p style={{ color: "red" }}> Please enter bank name</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Bank Account No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={state.accountNumber}
                onChange={changeHandler}
                required
                placeholder="Bank Account No"
                disabled={disabled}
              />
              {accountNumberError ? (
                <p style={{ color: "red" }}> Please enter Account Number</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                IFSC Code<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="ifscCode"
                value={state.ifscCode}
                onChange={changeHandler}
                required
                placeholder="IFSC Code"
                disabled={disabled}
              />
              {ifscCodeError ? (
                <p style={{ color: "red" }}> Please enter valid IFSC code</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={8}>
            <div className="inputField">
              <label>
                <b>Guidelines for Bank Account</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <div>
              <br></br>
              <label>
                <b>1.</b>The Candidate's name sholud be upload on the cancelled
                cheque.
              </label>
              <br></br>
              <label>
                <b>2.</b>If the name of the candidate is not present then you
                can upload bank statments and passbook.
              </label>
              <br></br>
              <label>
                <b>3.</b>The candidate's name on the documents is mandatory
                otherwise it will not be considered as valid proof.
              </label>
            </div>
          </Col>
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
export default BankDetails;
