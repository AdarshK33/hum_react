import { startOfQuarter } from "date-fns";
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
import { OnBoardContext } from "../../context/OnBoardState";
import { ToastContainer, toast } from "react-toastify";
import BANK_NAMES from "./BankNamesList";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
const BankDetails = (props) => {
  const { user } = useContext(AppContext);
  const { bankView, bankViewData, BankUpdate, uploadFile } = useContext(
    EmployeeProfileContext
  );
  const {
    bankCreate,
    bankSaveData,
    CandidateProfile,
    candidateProfileData,
    bankUpdate,
    bankUpdateData,
  } = useContext(OnBoardContext);
  const [disabled, setDisableState] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [ifscCodeError, setIfscCodeError] = useState(false);
  const [bankIdValue, setBankIdVlue] = useState(0);
  const [panNumberEror, setPanNumberError] = useState(false);
  const [state, setState] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    panNo: "",
    employeeId: "",
  });
  const [stateOfOb, setStateOfOb] = useState({
    cancelledCheque: "",
  });
  const [stateOfName, setStateOfNames] = useState({
    cancelledCheque: "",
  });
  const [UploadedArray, setUploadedError] = useState([
    {
      ULcancelledCheque: false,
    },
  ]);
  useEffect(() => {
    bankView(user.employeeId);
  }, []);

  useEffect(() => {
    if (bankViewData && bankViewData !== null && bankViewData !== undefined) {
      setState({
        accountNumber: bankViewData.accountNumber,
        bankName: {
          label: bankViewData.bankName,
          value: bankViewData.bankName,
        },
        ifscCode: bankViewData.ifscCode,
        panNo: bankViewData.panNumber,
        employeeId: bankViewData.employeeId,
      });

      setBankIdVlue(bankViewData.bankId);
    }
    console.log("bankViewData", bankViewData);
  }, [bankViewData]);

  /* To get the bank name options */
  const bankNameOptions = useMemo(() => {
    return BANK_NAMES.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }, [BANK_NAMES]);

  /* To get the selected bank value */
  const selectedBankName = useMemo(() => {
    if (typeof state.bankName === "object" && state.bankName !== null) {
      return state.bankName.value;
    } else {
      return state.bankName;
    }
  }, [state.bankName]);

  const BankNameErrorValidation = () => {
    // const nameValid = /^[a-zA-Z\b]+$/;
    // nameValid.test(state.bankName.replace(/ +/g, ""))
    if (selectedBankName !== "" && selectedBankName !== null) {
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
      state.ifscCode.length >= 11
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
  const PanNumberValidation = () => {
    const panValid = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if ((state.panNo !== "") & panValid.test(state.panNo)) {
      var tempVar = state.panNo.split("");
      console.log(tempVar[3]);
      if (tempVar[3].toLocaleLowerCase() === "p") {
        setPanNumberError(false);
        console.log("pansucess");
        return true;
      } else {
        setPanNumberError(true);
        console.log("panerror");
        return false;
      }
    } else {
      setPanNumberError(true);
      console.log("panerror");
      return false;
    }
  };
  const checkValidations = () => {
    if (
      (BankNameErrorValidation() == true) &
      (AccountNumberErrorValidation() == true) &
      (IfscCodeErrorValidation() == true) 
      // &(PanNumberValidation() == true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const changeHandler1 = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    if (
      fileObj.type === "image/jpeg" ||
      fileObj.type === "image/jpg" ||
      fileObj.type === "image/png" ||
      fileObj.type === "application/pdf"
    ) {
      if (fileObj.size/(1024*1024)<= 2) {
        setStateOfOb({
          ...stateOfOb,
          [event.target.name]: fileObj,
        });
        setStateOfNames({
          ...stateOfName,
          [event.target.name]: fileObj.name,
        });

        if (event.target.name === "cancelledCheque") {
          UploadedArray[0].ULcancelledCheque = false;
        }
      } else {
        toast.error("File size should not exceed 2mb");
      }
    } else {
      toast.error("Please select jpg, jpeg, png and pdf formats");
    }
  };
  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;

    if (event.target.name === "cancelledCheque") {
      // if (cancelledChequeValidation() === true) {
      fileUpload = stateOfOb.cancelledCheque;
      fileType = 5;
      UploadedArray[0].ULcancelledCheque = true;
      // }
    }
    if (fileUpload) {
      console.log("inside file info", fileUpload, fileType);
      const fileInfo = {
        employeeId: user.employeeId,
        file: fileUpload,
        fileType: fileType,
      };
      console.log("handleUpload", fileInfo);
      uploadFile(fileInfo);
    } else {
      toast.info("Please select file");
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
      console.log("INSIDE BANK SUBMIT");
      const bankInfo = {
        accountNumber: state.accountNumber,
        bankId: bankIdValue,
        bankName: selectedBankName,
        ifscCode: state.ifscCode,
        panNumber: state.panNo,
        employeeId: bankViewData.employeeId,
      };
      console.log("bank payload", bankInfo);
      BankUpdate(bankInfo);
      // if (
      //   (bankSaveData && bankSaveData.bankId) ||
      //   (bankViewData && bankViewData.bankId)
      // ) {
      //   bankUpdate(bankInfo);
      // } else {
      //   bankCreate(bankInfo);
      // }
      // const nextPage = props.NextStep;
      // nextPage(true);
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

  const changeBankHandler = (option) => {
    setState({
      ...state,
      bankName: option,
    });
  };

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Form>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>Bank Name</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Select
                options={bankNameOptions}
                name="bankName"
                value={state.bankName}
                onChange={changeBankHandler}
                required
                placeholder="Bank Name"
                disabled={disabled}
                style={
                  bankNameError
                    ? { borderColor: "red", color: "#006ebb" }
                    : { color: "#006ebb" }
                }
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
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>Bank Account No</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={state.accountNumber}
                onChange={changeHandler}
                required
                placeholder="Bank Account No"
                disabled={disabled}
                maxLength="20"
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
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>IFSC Code</b><span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="ifscCode"
                value={state.ifscCode}
                onChange={changeHandler}
                required
                placeholder="IFSC Code"
                disabled={disabled}
                maxLength="20"
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
          {/* <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                <b>PAN No</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="panNo"
                value={state.panNo}
                onChange={changeHandler}
                required
                placeholder="IFSC Code"
                disabled={disabled}
                maxLength="20"
                style={panNumberEror ? { borderColor: "red" } : {}}
              />
              {panNumberEror ? (
                <p style={{ color: "red" }}> Please enter the valid PAN no</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div> */}
        </Row>
        {/* <Row style={{ marginBottom: "1rem" }}>
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
                1. The candidate name should be present on the uploaded
                cancelled cheque.
              </label>
              <br></br>
              <label>
                2. If name of the candidate is not present in the cancelled
                cheque then you can upload the bank statement or passbook
              </label>
              <br></br>
              <label>
                3. The candidate name on the bank documents are mandatory
                otherwise it is not considered as valid proof
              </label>
            </div>
          </Col>
        </Row> */}
        <Row style={{ marginTop: "2rem", marginLeft: "-2rem" }}>
          <Col>
            <Form.Group>
              <div className="FileInputWithOutStar">
                <label>
                  <b>Upload Canceled cheque</b>
                </label>
              </div>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {stateOfName.cancelledCheque !== ""
                    ? stateOfName.cancelledCheque
                    : "Select File Here"}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="cancelledCheque"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      changeHandler1(e);
                    }}
                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    name="cancelledCheque"
                    className="custom_file_Upload_button"
                    onClick={(e) => {
                      handleUpload(e);
                    }}
                  />
                  {/* <i className="fa fa-cloud-upload" />  */}
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
                    className="fa fa-upload"
                    aria-hidden="true"
                  ></i>
                </label>
              </div>

              {/* {cancelledChequeError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                    cancelled cheque
                  </p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
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
export default BankDetails;
