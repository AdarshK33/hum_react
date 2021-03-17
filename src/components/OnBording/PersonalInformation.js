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
import "./OnBoard.css";
import "./Documents.css";
import { OnBoardContext } from "../../context/OnBoardState";
import countryList from "react-select-country-list";

const PersonalInformation = () => {
  const { updatePersonalInfo, Infodata } = useContext(OnBoardContext);
  const options = useMemo(() => countryList().getData(), []);
  // const [InfoData, setInfo] = useState("");
  console.log(options);
  const [isClicked, setIsClicked] = useState(false);
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
  const [state, setState] = useState({
    aadhaarName: "",
    fatherName: "",
    aadhaarNumber: "",
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
  const prevent = (e) => {
    e.preventDefault();
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const InfoData = {
      aadhaarDoc: null,
      aadhaarName: state.aadhaarName,
      aadhaarNumber: state.fatherName,
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
    console.log(state);
  };

  const aadharChecking = (e) => {
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
      console.log(state);
    }
  };
  const panChecking = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
    console.log(e.target.value.length);
    if (e.target.value.length >= 10) {
      const re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (re.test(e.target.value) === false) {
        setState({
          ...state,
          [e.target.name]: "",
        });
      }
    }
  };
  const dateOfBirthHandler = (date) => {
    setDOB(date);
    console.log(DOB);
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
      <Form onSubmit={submitHandler}>
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
                    placeholder="Name as per adhaar"
                    disabled={disabled}
                  />
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
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Date Of Birth<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className="onBoard-date">
                    <DatePicker
                      className="form-control onBoard-view"
                      selected={DOB}
                      required
                      onChange={(e) => dateOfBirthHandler(e)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Date Of Birth"
                      disabled={disabled}
                    />
                  </div>
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
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Aadhaar Number<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="aadhaarNumber"
                    value={state.aadhaarNumber}
                    onChange={aadharChecking}
                    required
                    maxLength="12"
                    pattern="[0-9]*"
                    placeholder="Aadhaar Number"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Pan Number<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="panNumber"
                    value={state.panNumber}
                    onChange={panChecking}
                    maxLength="10"
                    required
                    placeholder="Pan Number"
                    disabled={disabled}
                  />
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
                  >
                    <option>Nationality</option>
                    {options.map((item) => {
                      return <option key={item.value}>{item.label}</option>;
                    })}
                  </Form.Control>
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
                  >
                    <option value="">Disability</option>
                    <option> Yes</option>
                    <option> No</option>
                  </Form.Control>
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
                  <div className="boxField input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Male"
                      checked={genderCheckM}
                      required={required}
                      onChange={handleMaleGenderCheckboxChange}
                    />
                    <label>Male </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Female"
                      required={required}
                      checked={genderCheckF}
                      onChange={handleFemaleGenderCheckboxChange}
                    />
                    <label>Female</label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: "3rem" }}>
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
                  <div className="boxField input" style={{ marginTop: "1rem" }}>
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Married"
                      reuired={statusRequired}
                      checked={married}
                      onChange={handleMarriedCheckboxChange}
                    />
                    <label>Married </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group>
                  <div
                    className="boxField input"
                    style={{ marginTop: "0.9rem" }}
                  >
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      value="Unmarried"
                      required={statusRequired}
                      checked={unMarried}
                      onChange={handleUnMarriedCheckboxChange}
                    />
                    <label>UnMarried</label>
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
                    value={state.empName1}
                    onChange={changeHandler}
                    required
                    placeholder="Emp Name/ID"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="emp1Eamil"
                    value={state.emp1Eamil}
                    onChange={changeHandler}
                    placeholder="Email ID"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="emp1Designation"
                    value={state.emp1Designation}
                    onChange={changeHandler}
                    placeholder="Designation"
                    disabled={disabled}
                  />
                </Form.Group>
              </div>
            </Row>
          </Col>

          <Col sm={3} style={{ marginTop: "2rem" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={AddExtrReferenceClick}
                  disabled={isClicked}
                >
                  <b> Add + </b>
                </button>
              </div>
            </Form.Group>
          </Col>
        </Row>
        {isClicked ? (
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={8}>
              <Row style={{ marginBottom: "1rem" }}>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Emp Name/ID<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="empName2"
                      value={state.empName2}
                      onChange={changeHandler}
                      required
                      placeholder="Emp Name/ID"
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp2Eamil"
                      value={state.emp2Eamil}
                      onChange={changeHandler}
                      placeholder="Email ID"
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp2Designation"
                      value={state.emp2Designation}
                      onChange={changeHandler}
                      placeholder="Designation"
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={3} style={{ marginTop: "2rem" }}>
              <Form.Group>
                <div>
                  <button
                    className="buttonField  button"
                    onClick={CancelExtrReferenceClick}
                    disabled={!isClicked}
                  >
                    <b> Cancel </b>
                  </button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button className="stepperButtons">Back</button>
          <button className="stepperButtons" type="submit">
            Save & Next
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default PersonalInformation;
