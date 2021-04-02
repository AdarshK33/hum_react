import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "../OnBording/OnBoard.css";
import "../OnBording/Documents.css";
import { OnBoardContext } from "../../context/OnBoardState";
import countryList from "react-select-country-list";
import { candidate } from "../../utils/canditateLogin";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { useParams } from "react-router-dom";
const EditPersonalInformation = (props) => {
  const {
    updatePersonalInfo,
    Infodata,
    CandidateProfile,
    candidateData,
  } = useContext(OnBoardContext);
  const params = useParams();
  const candidateId = params["candidateId"];

  const { personalInfo, personalInfoData } = useContext(DocsVerifyContext);

  const options = useMemo(() => countryList().getData(), []);
  const [isClicked, setIsClicked] = useState(false);
  const [fullTime, setFullTime] = useState(true);
  const [partTime, setParTime] = useState(false);
  const [localExpact, setLocalExpact] = useState(false);
  const [internship, setInternship] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const [DOB, setDOB] = useState();
  const [genderCheckM, setGenderM] = useState(false);
  const [genderCheckF, setGenderF] = useState(false);
  const [married, setMarried] = useState(false);
  const [unMarried, setUnMarried] = useState(false);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [required, setRequired] = useState(true);
  const [statusRequired, setstatusRequired] = useState(true);
  const [disabilityDoc, setDocName] = useState("");
  const [panNumberError, setPanNumberError] = useState(false);
  const [aadharNumberError, setAdharNumberError] = useState(false);
  const [passPortNoError, setPassPortError] = useState(false);
  const [DOBError, setDOBError] = useState(false);
  const [adharNameError, setAdharNameError] = useState(false);
  const [fatherName, setFatherNameError] = useState(false);
  const [disabilityError, setDisabilityError] = useState(false);
  const [disabilityDocError, setDisabilityDocError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [bloodGroupError, setBloodGroupError] = useState(false);
  const [empName1Error, setEmpNam1Error] = useState(false);
  const [empName2Error, setEmpNam2Error] = useState(false);
  const [emp1EmailError, setEmp1EmailError] = useState(false);
  const [emp2EmailError, setEmp2EmailError] = useState(false);
  const [state, setState] = useState({
    aadhaarName: "",
    fatherName: "",
    aadhaarNumber: "",
    passPortNo: "",
    panNumber: "",
    bloodGroup: "",
    nationality: "",
    disability: "",
    lgbt: "",
    empName1: "",
    emp1Eamil: "",
    emp1Designation: "",
    empName2: "",
    emp2Eamil: "",
    emp2Designation: "",
  });
  const [references, setReferences] = useState([]);
  useEffect(() => {
    if (window.location.href.includes("verification")) {
      console.log(candidateId);
      personalInfo(candidateId);
      setState(personalInfoData);
      if (personalInfoData.candidateReferences !== undefined) {
        setReferences(personalInfoData.candidateReferences);
      }
      if (personalInfoData.dateOfBirth !== undefined) {
        var date = new Date(personalInfoData.dateOfBirth);
        setDOB(date);
      }
      setDisableState(true);
      if (
        personalInfoData.gender !== undefined &&
        personalInfoData.gender === "Female"
      ) {
        setGenderF(true);
        setGenderM(false);
      } else {
        setGenderF(true);
        setGenderM(false);
      }
      if (
        personalInfoData.maritalStatus !== undefined &&
        personalInfoData.maritalStatus === "Single"
      ) {
        setMarried(false);
        setUnMarried(true);
      } else {
        setMarried(true);
        setUnMarried(false);
      }
      // setDOB(personalInfoData.dateOfBirth);
    }
  }, []);
  const AdharNameValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;

    if (
      (state.aadhaarName !== "") &
      nameValid.test(state.aadhaarName.replace(/ +/g, ""))
    ) {
      setAdharNameError(false);
      console.log("adharNAmeSuccess");
      return true;
    } else {
      setAdharNameError(true);
      console.log("AdharnameError");
      return false;
    }
  };
  const FatherNameValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (state.fatherName !== "") {
      setFatherNameError(false);
      console.log("fatherNAmeSuccess");
      return true;
    } else {
      setFatherNameError(true);
      console.log("fathernameError");
      return false;
    }
  };
  const PanNumberValidation = () => {
    const panValid = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (fullTime === true) {
      if ((state.panNumber !== "") & panValid.test(state.panNumber)) {
        setPanNumberError(false);
        console.log("pansucess");
        return true;
      } else {
        setPanNumberError(true);
        console.log("panerror");
        return false;
      }
    } else {
      return true;
    }
  };
  const AadharNumberValidation = () => {
    const aadharValid = /^[0-9\b]+$/;
    console.log("adhar");
    if ((fullTime === true) | (partTime === true)) {
      if (
        (state.aadhaarNumber !== "") &
        aadharValid.test(state.aadhaarNumber)
      ) {
        setAdharNumberError(false);
        console.log("adharsucess");
        return true;
      } else {
        setAdharNumberError(true);
        console.log("adhaerror");
        return false;
      }
    } else {
      return true;
    }
  };
  const PassPortNumberValidations = () => {
    const passPortValid = /^[0-9\b]+$/;
    console.log("passPort");
    if (localExpact === true) {
      if ((state.passPortNo !== "") & passPortValid.test(state.passPortNo)) {
        setPassPortError(false);
        console.log("passPortsucess");
        return true;
      } else {
        setPassPortError(true);
        console.log("passPorterror");
        return false;
      }
    } else {
      return true;
    }
  };
  const DOBValidation = () => {
    console.log("Dob");
    let dob = new Date(DOB);
    let now = new Date();
    console.log(now - dob);
    if (now - dob > 568024668000) {
      console.log("DOBSuccess");
      setDOBError(false);
      setDOB(DOB);
      console.log(DOB);
      return true;
    } else {
      setDOBError(true);
      console.log("DOBerror");
      return false;
    }
  };
  const disabilityValidation = () => {
    if ((state.disability !== "") & (state.disability !== "Disability")) {
      setDisabilityError(false);
      console.log("disabilitySucess");
      return true;
    } else {
      setDisabilityError(true);
      console.log("disabilityFaill");
      return false;
    }
  };
  const disabilityDocValidation = () => {
    if (state.disability === "Yes") {
      if (state.disabilityDoc === "") {
        setDisabilityDocError(false);
        console.log("disabilityDocSucess");
        return true;
      } else {
        setDisabilityDocError(true);
        console.log("disabilityDocFaill");
        return false;
      }
    } else {
      return true;
    }
  };
  const nationalityValidation = () => {
    if ((state.nationality !== "") & (state.nationality !== "Nationality")) {
      setNationalityError(false);
      console.log("nationalitySucess");
      return true;
    } else {
      setNationalityError(true);
      console.log("nationalityFaill");
      return false;
    }
  };

  const bloodGroupValidation = () => {
    if (
      (state.bloodGroup !== "") &
      (state.bloodGroup !== "Select Blood Group")
    ) {
      setBloodGroupError(false);
      console.log("nationalitySucess");
      return true;
    } else {
      setBloodGroupError(true);
      console.log("nationalityFaill");
      return false;
    }
  };
  const empName1Validation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if ((state.empName1 !== "") & nameValid.test(state.empName1)) {
      setEmpNam1Error(false);
      console.log("emp1Success");
      return true;
    } else {
      setEmpNam1Error(true);
      console.log("emp1NameFailure");
      return false;
    }
  };
  const empName2Validation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if ((state.empName2 !== "") & nameValid.test(state.empName2)) {
      setEmpNam2Error(false);
      console.log("emp2Success");
      return true;
    } else {
      setEmpNam2Error(true);
      console.log("emp2NameFailure");
      return false;
    }
  };
  const emp1EmailValidation = () => {
    const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log("----------------");
    if (state.emp1Eamil !== "") {
      if (emailValid.test(state.emp1Eamil)) {
        setEmp1EmailError(false);
        console.log("email1sucess");
        return true;
      } else {
        setEmp1EmailError(true);
        console.log("email1Fail");
        return false;
      }
    } else {
      setEmp1EmailError(false);
      console.log("email1sucess");
      return true;
    }
  };
  const emp2EmailValidation = () => {
    const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log("----------------");
    if (state.emp2Eamil !== "") {
      if (emailValid.test(state.emp2Eamil)) {
        setEmp2EmailError(false);
        console.log("email2sucess");
        return true;
      } else {
        setEmp2EmailError(true);
        console.log("email2Fail");
        return false;
      }
    } else {
      setEmp2EmailError(false);
      console.log("email2sucess");
      return true;
    }
  };
  const checkValidations = () => {
    if (
      (PanNumberValidation() === true) &
      (AadharNumberValidation() === true) &
      (DOBValidation() === true) &
      (AdharNameValidation() === true) &
      (FatherNameValidation() === true) &
      (disabilityValidation() === true) &
      (nationalityValidation() === true) &
      (bloodGroupValidation() === true) &
      (empName1Validation() === true) &
      (emp1EmailValidation() === true) &
      (PassPortNumberValidations() === true) &
      (disabilityDocValidation() === true)
    ) {
      if (isClicked === true) {
        console.log("------");
        if (
          (empName2Validation() === true) &
          (emp2EmailValidation() === true)
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
    const submited = props.NextStep; //next component
    submited();
    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      const InfoData = {
        aadhaarDoc: null,
        aadhaarName: state.aadhaarName,
        aadhaarNumber: state.aadhaarNumber,
        bloodGroup: state.bloodGroup,
        candidateId: 0,
        candidateReferences: [
          {
            designation:
              state.emp1Designation !== null ? state.emp1Designation : null,
            email: state.emp1Eamil !== null ? state.emp1Eamil : null,
            employeeName: state.empName1 !== null ? state.empName1 : null,
          },
          {
            designation:
              state.emp2Designation !== null ? state.emp2Designation : null,
            email: state.emp2Eamil !== null ? state.emp2Eamil : null,
            employeeName: state.empName2 !== null ? state.empName2 : null,
          },
        ],
        createdDate: null,
        dateOfBirth: DOB,
        disability: state.disability,
        disabilityDoc: disabilityDoc,
        fatherName: state.fatherName,
        firstName: null,
        gender: gender,
        lastName: null,
        lgbt: state.lgbt,
        maritalStatus: maritalStatus,
        nationality: state.nationality,
        panDoc: null,
        panNumber: state.panNumber,
        personalEmail: null,
        photo: null,
        referred: true,
        status: 0,
        statusDesc: null,
        verificationStatus: 0,
        verificationStatusDesc: null,
      };
      console.log("onsubmit");
      console.log(InfoData);
      updatePersonalInfo(InfoData);
    }
  };
  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };

  const disabilityDocument = (e) => {
    var files = e.target.files;
    console.log(files[0].name);
    setDocName(files[0].name);
    console.log(state);
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const dateOfBirthHandler = (date) => {
    console.log(date);
    setDOB(date);
  };

  const handleMaleGenderCheckboxChange = (e) => {
    setGenderM(e.target.checked);
    setGenderF(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
    {
      genderCheckM ? setGender("FeMale") : setGender("Male");
    }
    console.log(genderCheckM);
    console.log("---");
    console.log(gender);
  };
  const handleFemaleGenderCheckboxChange = (e) => {
    setGenderF(e.target.checked);
    setGenderM(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
    {
      genderCheckF ? setGender("Male") : setGender("FeMale");
    }
    console.log(genderCheckF);
    console.log("---");
    console.log(gender);
  };
  const handleMarriedCheckboxChange = (e) => {
    setMarried(e.target.checked);
    setUnMarried(!e.target.checked);
    {
      statusRequired
        ? setstatusRequired(!statusRequired)
        : setstatusRequired(statusRequired);
    }
    {
      married ? setMaritalStatus("UnMarried") : setMaritalStatus("Married");
    }
    console.log(married);
    console.log(maritalStatus);
  };
  const handleUnMarriedCheckboxChange = (e) => {
    setUnMarried(e.target.checked);
    setMarried(!e.target.checked);
    {
      statusRequired
        ? setstatusRequired(!statusRequired)
        : setstatusRequired(statusRequired);
    }
    {
      unMarried ? setMaritalStatus("Married") : setMaritalStatus("UnMarried");
    }
    console.log(unMarried);
    console.log(maritalStatus);
  };
  const AddExtrReferenceClick = () => {
    setIsClicked(true);
  };
  const CancelExtrReferenceClick = () => {
    setIsClicked(false);
  };
  return (
    <Fragment>
      <Form>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={8}>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Name as per Aadhaar<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="aadhaarName"
                    value={state.aadhaarName}
                    onChange={changeHandler}
                    required
                    style={adharNameError ? { borderColor: "red" } : {}}
                    placeholder="Name as per adhaar"
                    disabled={disabled}
                  />

                  {adharNameError ? (
                    <p style={{ color: "red" }}> Please enter valid name</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Father's Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fatherName"
                    value={state.fatherName}
                    onChange={changeHandler}
                    required
                    placeholder="Father's Name"
                    disabled={disabled}
                    style={fatherName ? { borderColor: "red" } : {}}
                  />
                  {fatherName ? (
                    <p style={{ color: "red" }}>
                      Please enter valid father's name
                    </p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Date Of Birth<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div
                    className={DOBError ? "onBoard-date-error" : "onBoard-date"}
                  >
                    <DatePicker
                      style={DOBError ? { borderColor: "red" } : {}}
                      className="form-control onBoard-view"
                      selected={DOB}
                      required
                      onChange={(e) => dateOfBirthHandler(e)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="YYYY-MM-DD"
                      disabled={disabled}
                    />
                  </div>
                  {DOBError ? (
                    <p style={{ color: "red" }}>Age should be above 18</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
            </Row>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Natonality<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="nationality"
                    value={state.nationality}
                    options={options}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                    style={nationalityError ? { borderColor: "red" } : {}}
                  >
                    <option value="">Nationality</option>
                    {options.map((item) => {
                      return <option key={item.value}>{item.label}</option>;
                    })}
                  </Form.Control>

                  {nationalityError ? (
                    <p style={{ color: "red" }}>
                      Please choose valid nationality
                    </p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Disability<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="disability"
                    value={state.disability}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                    style={disabilityError ? { borderColor: "red" } : {}}
                  >
                    <option value="">Disability</option>
                    <option> Yes</option>
                    <option> No</option>
                  </Form.Control>

                  {disabilityError ? (
                    <p style={{ color: "red" }}>
                      Please choose disability option
                    </p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>

              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>LGBT</Form.Label>
                  <Form.Control
                    as="select"
                    name="lgbt"
                    value={state.lgbt}
                    onChange={changeHandler}
                    disabled={disabled}
                  >
                    <option value="">LGBT</option>
                    <option> Yes</option>
                    <option> No</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </Row>

            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Blood Group<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="bloodGroup"
                    value={state.bloodGroup}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                    style={bloodGroupError ? { borderColor: "red" } : {}}
                  >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </Form.Control>

                  {bloodGroupError ? (
                    <p style={{ color: "red" }}>Please choose blood group</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </div>
              <div className="col-sm-4">
                {(fullTime === true) | (partTime === true) ? (
                  <Form.Group>
                    <Form.Label>
                      Aadhaar Number
                      <span style={{ color: "red" }}>
                        {internship ? "" : "*"}
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="aadhaarNumber"
                      value={state.aadhaarNumber}
                      onChange={changeHandler}
                      required
                      maxLength="12"
                      placeholder="Aadhaar Number"
                      disabled={disabled}
                      style={aadharNumberError ? { borderColor: "red" } : {}}
                    />
                    {aadharNumberError ? (
                      <p style={{ color: "red" }}>
                        Please enter valid aadhar number
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                ) : (
                  ""
                )}
                {localExpact === true ? (
                  <Form.Group>
                    <Form.Label>
                      Pass Port Number<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="passPortNo"
                      value={state.passPortNo}
                      onChange={changeHandler}
                      required
                      maxLength="12"
                      placeholder="Pass Port No"
                      disabled={disabled}
                      style={passPortNoError ? { borderColor: "red" } : {}}
                    />
                    {passPortNoError ? (
                      <p style={{ color: "red" }}>
                        Please enter valid passport number
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="col-sm-4">
                {(partTime === true) | (fullTime === true) ? (
                  <Form.Group>
                    <Form.Label>
                      Pan Number
                      <span style={{ color: "red" }}>
                        {" "}
                        {fullTime ? "*" : ""}
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="panNumber"
                      value={state.panNumber}
                      onChange={changeHandler}
                      maxLength="10"
                      required
                      placeholder="Pan Number"
                      disabled={disabled}
                      style={panNumberError ? { borderColor: "red" } : {}}
                    />

                    {panNumberError ? (
                      <p style={{ color: "red" }}>
                        Please enter valid pan number
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                ) : (
                  ""
                )}
              </div>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={3} style={{ marginTop: "1.8rem" }}>
                <Form.Group>
                  <div className="inputField">
                    <label>Gender</label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField_1 input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Male"
                      checked={genderCheckM}
                      required={required}
                      disabled={disabled}
                      onChange={handleMaleGenderCheckboxChange}
                    />
                    <label>Male </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField_1 input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Female"
                      required={required}
                      checked={genderCheckF}
                      disabled={disabled}
                      onChange={handleFemaleGenderCheckboxChange}
                    />
                    <label>Female</label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: "4rem" }}>
              <Col sm={3}>
                <Form.Group>
                  <div className="inputField">
                    <label>
                      Marital<br></br>Status
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <div
                    className="boxField_1 input"
                    style={{ marginTop: "1rem" }}
                  >
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Married"
                      required={statusRequired}
                      checked={married}
                      disabled={disabled}
                      onChange={handleMarriedCheckboxChange}
                    />
                    <label>Married </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group>
                  <div
                    className="boxField_1 input"
                    style={{ marginTop: "0.9rem" }}
                  >
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Unmarried"
                      required={statusRequired}
                      checked={unMarried}
                      disabled={disabled}
                      onChange={handleUnMarriedCheckboxChange}
                    />
                    <label>Unmarried</label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            {state.disability === "Yes" ? (
              <Row style={{ marginTop: "2rem" }}>
                <Col sm={12}>
                  <div className="FileInput">
                    <label>Disability Document</label>
                  </div>
                  <div className="parentInput">
                    <input
                      className="fileInputField2"
                      placeholder="Choose File"
                      type="text"
                      name="disabilityDoc"
                      value={disabilityDoc}
                    />
                    <label
                      className="custom-file-upload"
                      style={{ fontSize: "16px" }}
                    >
                      <input
                        type="file"
                        className="custom_file_Upload_button"
                        onChange={disabilityDocument}
                      />
                      {/* <i className="fa fa-cloud-upload" />  */}
                      Upload
                      {/* <i
                        id="custom_file_upload_icon"
                        class="fa fa-upload"
                        aria-hidden="true"
                      ></i> */}
                    </label>
                  </div>

                  {disabilityDocError ? (
                    <p style={{ color: "red" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp; Please upload the disability
                      document
                    </p>
                  ) : (
                    <p></p>
                  )}
                </Col>
              </Row>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={5}>
            <div>
              {/* style={{ backgroundColor: "#006ebb" }} */}
              <label>
                <b>State References:</b>
                <b>(Max: Only 2)</b>
              </label>
            </div>
          </Col>
        </Row>
        {references !== undefined &&
          references.map((ele, i) => {
            return (
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={8}>
                  <Row style={{ marginBottom: "2rem" }}>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Emp Name/ID<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="empName1"
                          value={ele.employeeName}
                          required
                          placeholder="Emp Name/ID"
                          disabled={disabled}
                          style={empName1Error ? { borderColor: "red" } : {}}
                        />
                        {empName1Error ? (
                          <p style={{ color: "red" }}>
                            Please enter valid name
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="emp1Eamil"
                          value={ele.email}
                          placeholder="Email ID"
                          disabled={disabled}
                          style={emp1EmailError ? { borderColor: "red" } : {}}
                        />
                        {emp1EmailError ? (
                          <p style={{ color: "red" }}>
                            Please enter valid email
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                          type="text"
                          name="emp1Designation"
                          value={ele.designation}
                          placeholder="Designation"
                          disabled={disabled}
                        />
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
              </Row>
            );
          })}

        {/* {references !== undefined && (
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={8}>
                <Row style={{ marginBottom: "2rem" }}>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Emp Name/ID<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="empName1"
                        value={references.employeeName}
                        onChange={changeHandler}
                        required
                        placeholder="Emp Name/ID"
                        disabled={disabled}
                        style={empName1Error ? { borderColor: "red" } : {}}
                      />
                      {empName1Error ? (
                        <p style={{ color: "red" }}>Please enter valid name</p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="emp1Eamil"
                        value={references.email}
                        onChange={changeHandler}
                        placeholder="Email ID"
                        disabled={disabled}
                        style={emp1EmailError ? { borderColor: "red" } : {}}
                      />
                      {emp1EmailError ? (
                        <p style={{ color: "red" }}>Please enter valid email</p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>Designation</Form.Label>
                      <Form.Control
                        type="text"
                        name="emp1Designation"
                        value={references.designation}
                        onChange={changeHandler}
                        placeholder="Designation"
                        disabled={disabled}
                      />
                    </Form.Group>
                  </div>
                </Row>
              </Col>
            </Row>
          )} */}
      </Form>
    </Fragment>
  );
};
export default EditPersonalInformation;
