import { startOfQuarter } from "date-fns";
import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";
import { OnBoardContext } from "../../context/OnBoardState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BankDetails = (props) => {
  const {
    bankCreate,
    bankSaveData,
    CandidateProfile,
    candidateProfileData,
    bankView,
    bankViewData,
    bankUpdate,
    bankUpdateData,
  } = useContext(OnBoardContext);
  const [disabled, setDisableState] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [ifscCodeError, setIfscCodeError] = useState(false);
  const [bankIdValue, setBankIdVlue] = useState(0);

  useEffect(() => {
    CandidateProfile();
    bankView(candidateProfileData.candidateId);
  }, []);

  useEffect(() => {
    if (bankViewData && bankViewData !== null && bankViewData !== undefined) {
      setState({
        accountNumber: bankViewData.accountNumber,
        bankName: bankViewData.bankName,
        ifscCode: bankViewData.ifscCode,
      });
      setBankIdVlue(bankViewData.bankId);
    }
    console.log("bankViewData", bankViewData);
  }, [bankViewData]);

  const [state, setState] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  });

  const BankNameErrorValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.bankName !== "" &&
      state.bankName !== null &&
      state.bankName !== undefined &&
      nameValid.test(state.bankName.replace(/ +/g, ""))
    ) {
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
    const aadharValid = /^[0-9\b]+$/;
    if (
      state.accountNumber !== "" &&
      state.accountNumber !== null &&
      state.accountNumber !== undefined &&
      aadharValid.test(state.accountNumber)
    ) {
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
    const aadharValid = /^[0-9\b]+$/;
    if (
      state.ifscCode !== "" &&
      state.ifscCode !== null &&
      state.ifscCode !== undefined &&
      state.ifscCode.length >= 11 &&
      aadharValid.test(state.accountNumber)
    ) {
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
    console.log("inside bank submit handler", bankSaveData);
    // const nextPage = props.NextStep;
    // // let bankValue;
    // nextPage();
    e.preventDefault();
    // if (!bankSaveData || !bankViewData) {
    //   bankValue = 0;
    // } else if (bankViewData || bankSaveData) {
    //   bankValue = bankSaveData.bankId
    //     ? bankSaveData.bankId
    //     : bankViewData.bankId;
    // }
    const value = checkValidations();
    if (value === true) {
      const bankInfo = {
        accountNumber: state.accountNumber,
        bankId: bankIdValue,
        bankName: state.bankName,
        candidateId: candidateProfileData.candidateId,
        ifscCode: state.ifscCode,
      };
      console.log("bank payload", bankInfo);
      if (
        (bankSaveData && bankSaveData.bankId) ||
        (bankViewData && bankViewData.bankId)
      ) {
        bankUpdate(bankInfo);
      } else {
        bankCreate(bankInfo);
      }
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
  return (
    <Fragment>
      <ToastContainer />
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
                style={bankNameError ? { borderColor: "red" } : {}}
              />
              {bankNameError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  Please enter the valid bank name
                </p>
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
                style={accountNumberError ? { borderColor: "red" } : {}}
              />
              {accountNumberError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  Please enter the valid Account Number
                </p>
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
                style={ifscCodeError ? { borderColor: "red" } : {}}
              />
              {ifscCodeError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  Please enter the valid IFSC code
                </p>
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
                1. The Candidate's name sholud be upload on the cancelled
                cheque.
              </label>
              <br></br>
              <label>
                2. If the name of the candidate is not present then you can
                upload bank statments and passbook.
              </label>
              <br></br>
              <label>
                3. The candidate's name on the documents is mandatory otherwise
                it will not be considered as valid proof.
              </label>
            </div>
          </Col>
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
export default BankDetails;
