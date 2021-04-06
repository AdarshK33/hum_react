import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";
import NomineeForm from "./NominForm";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const InsuranceNomination = (props) => {
  const [isChecked, changeCheckState] = useState(false);
  const [count, setCount] = useState(0);
  const [NomineeCount, setNomineeCount] = useState(0);
  const [NominForm1, setNominForm1] = useState(false);
  const [NominForm2, setNominForm2] = useState(false);
  const [NominForm3, setNominForm3] = useState(false);
  const [NominForm4, setNominForm4] = useState(false);
  const [Nominee1DOB, setNominee1DOB] = useState();
  const [Nominee2DOB, setNominee2DOB] = useState();
  const [Nominee3DOB, setNominee3DOB] = useState();
  const [Nominee4DOB, setNominee4DOB] = useState();
  const [Nominee5DOB, setNominee5DOB] = useState();
  const [ageError_1, setageError_1] = useState(false);
  const [bloodGroupError_1, setBloodGroupError_1] = useState(false);
  const [genderError_1, setGenderError_1] = useState(false);
  const [nomineNameError_1, setNomineerror_1] = useState(false);
  const [relationshipError_1, setRelationshipError_1] = useState(false);
  const [DOBError_1, setDobError_1] = useState(false);

  const [ageError_2, setageError_2] = useState(false);
  const [bloodGroupError_2, setBloodGroupError_2] = useState(false);
  const [genderError_2, setGenderError_2] = useState(false);
  const [nomineNameError_2, setNomineerror_2] = useState(false);
  const [relationshipError_2, setRelationshipError_2] = useState(false);
  const [DOBError_2, setDobError_2] = useState(false);

  const [ageError_3, setageError_3] = useState(false);
  const [bloodGroupError_3, setBloodGroupError_3] = useState(false);
  const [genderError_3, setGenderError_3] = useState(false);
  const [nomineNameError_3, setNomineerror_3] = useState(false);
  const [relationshipError_3, setRelationshipError_3] = useState(false);
  const [DOBError_3, setDobError_3] = useState(false);

  const [ageError_4, setageError_4] = useState(false);
  const [bloodGroupError_4, setBloodGroupError_4] = useState(false);
  const [genderError_4, setGenderError_4] = useState(false);
  const [nomineNameError_4, setNomineerror_4] = useState(false);
  const [relationshipError_4, setRelationshipError_4] = useState(false);
  const [DOBError_4, setDobError_4] = useState(false);

  const [ageError_5, setageError_5] = useState(false);
  const [bloodGroupError_5, setBloodGroupError_5] = useState(false);
  const [genderError_5, setGenderError_5] = useState(false);
  const [nomineNameError_5, setNomineerror_5] = useState(false);
  const [relationshipError_5, setRelationshipError_5] = useState(false);
  const [DOBError_5, setDobError_5] = useState(false);
  const [state, setState] = useState({
    age: "",
    bloodGroup: "",
    candidateId: 0,
    gender: "",
    nominiId: 0,
    nominiName: "",
    relationship: "",

    nominee2Age: "",
    nominee2BloodGroup: "",
    nominee2CandidateId: 0,
    nominee2Gender: "",
    nominee2NominiId: 0,
    nominee2NominiName: "",
    nominee2Relationship: "",

    nominee3Age: "",
    nominee3BloodGroup: "",
    nominee3CandidateId: 0,
    nominee3Gender: "",
    nominee3NominiId: 0,
    nominee3NominiName: "",
    nominee3Relationship: "",

    nominee4Age: "",
    nominee4BloodGroup: "",
    nominee4CandidateId: 0,
    nominee4Gender: "",
    nominee4NominiId: 0,
    nominee4NominiName: "",
    nominee4Relationship: "",

    nominee5Age: "",
    nominee5BloodGroup: "",
    nominee5CandidateId: 0,
    nominee5Gender: "",
    nominee5NominiId: 0,
    nominee5NominiName: "",
    nominee5Relationship: "",
  });
  const validateInput = (itemState, setError) => {
    if (itemState !== "") {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const validateSelectInput = (itemState, setError, condition) => {
    if ((itemState !== "") & (itemState !== condition)) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const DOBValidation = (dateItem, setError) => {
    let dob = new Date(dateItem);
    let now = new Date();
    if ((now - dob > 568024668000) & (dateItem !== "")) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const CheckValidationsNomine_1 = () => {
    if (
      (validateInput(state.age, setageError_1) === true) &
      (validateInput(state.nominiName, setNomineerror_1) === true) &
      (validateInput(state.gender, setGenderError_1) === true) &
      DOBValidation(Nominee1DOB, setDobError_1) &
      (validateSelectInput(
        state.relationship,
        setRelationshipError_1,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.bloodGroup,
        setBloodGroupError_1,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_2 = () => {
    if (
      (validateInput(state.nominee2Age, setageError_2) === true) &
      (validateInput(state.nominee2NominiName, setNomineerror_2) === true) &
      (validateInput(state.nominee2Gender, setGenderError_2) === true) &
      DOBValidation(Nominee2DOB, setDobError_2) &
      (validateSelectInput(
        state.nominee2Relationship,
        setRelationshipError_2,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee2BloodGroup,
        setBloodGroupError_2,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_3 = () => {
    if (
      (validateInput(state.nominee3Age, setageError_3) === true) &
      (validateInput(state.nominee3NominiName, setNomineerror_3) === true) &
      (validateInput(state.nominee3Gender, setGenderError_3) === true) &
      DOBValidation(Nominee3DOB, setDobError_3) &
      (validateSelectInput(
        state.nominee3Relationship,
        setRelationshipError_3,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee3BloodGroup,
        setBloodGroupError_3,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_4 = () => {
    if (
      (validateInput(state.nominee4Age, setageError_4) === true) &
      (validateInput(state.nominee4NominiName, setNomineerror_4) === true) &
      (validateInput(state.nominee4Gender, setGenderError_4) === true) &
      DOBValidation(Nominee4DOB, setDobError_4) &
      (validateSelectInput(
        state.nominee4Relationship,
        setRelationshipError_4,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee4BloodGroup,
        setBloodGroupError_4,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_5 = () => {
    if (
      (validateInput(state.nominee5Age, setageError_5) === true) &
      (validateInput(state.nominee5NominiName, setNomineerror_5) === true) &
      (validateInput(state.nominee5Gender, setGenderError_5) === true) &
      DOBValidation(Nominee5DOB, setDobError_5) &
      (validateSelectInput(
        state.nominee5Relationship,
        setRelationshipError_5,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee5BloodGroup,
        setBloodGroupError_5,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checkAllValidations = () => {
    switch (NomineeCount) {
      case 0:
        if (CheckValidationsNomine_1() === true) {
          return true;
        } else {
          console.log("error 1");
          return false;
          break;
        }
      case 1:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true)
        ) {
          return true;
        } else {
          console.log("error 2");
          return false;
          break;
        }
      case 2:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true) &
          (CheckValidationsNomine_3() === true)
        ) {
          return true;
        } else {
          console.log("error 3");
          return false;
          break;
        }
      case 3:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true) &
          (CheckValidationsNomine_3() === true) &
          (CheckValidationsNomine_4() === true)
        ) {
          return true;
        } else {
          console.log("error 4");
          return false;
          break;
        }
      case 4:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true) &
          (CheckValidationsNomine_3() === true) &
          (CheckValidationsNomine_4() === true) &
          (CheckValidationsNomine_5() === true)
        ) {
          return true;
        } else {
          console.log("error 5");
          return false;
          break;
        }
      default:
        break;
    }
  };
  const submitHandler = (e) => {
    const nextPage = props.NextStep;
    nextPage();
    if (checkAllValidations() === true) {
      const NominiInfo = [
        {
          age: state.age,
          bloodGroup: state.bloodGroup,
          candidateId: 0,
          dateOfBirth: Nominee1DOB,
          gender: state.gender,
          nominiId: 0,
          nominiName: state.nominiName,
          relationship: state.relationship,
        },

        // NominForm1 == true
        //   ? {
        //       age: NominForm1 == true ? state.nominee2Age : 0,
        //       bloodGroup: NominForm1 == true ? state.nominee2BloodGroup : null,
        //       candidateId: NominForm1 == true ? 0 : 0,
        //       dateOfBirth: NominForm1 == true ? Nominee2DOB : null,
        //       gender: NominForm1 == true ? state.nominee2Gender : null,
        //       nominiId: NominForm1 == true ? 0 : 0,
        //       nominiName: NominForm1 == true ? state.nominee2NominiName : null,
        //       relationship:
        //         NominForm1 == true ? state.nominee2Relationship : null,
        //     }
        //   : null,
        // NominForm2 == true
        //   ? {
        //       age: NominForm2 == true ? state.nominee3Age : 0,
        //       bloodGroup: NominForm2 == true ? state.nominee3BloodGroup : null,
        //       candidateId: NominForm2 == true ? 0 : 0,
        //       dateOfBirth: NominForm2 == true ? Nominee3DOB : null,
        //       gender: NominForm2 == true ? state.nominee3Gender : null,
        //       nominiId: NominForm2 == true ? 0 : 0,
        //       nominiName: NominForm2 == true ? state.nominee3NominiName : null,
        //       relationship:
        //         NominForm2 == true ? state.nominee3Relationship : null,
        //     }
        //   : null,
        // NominForm3 == true
        //   ? {
        //       age: NominForm3 == true ? state.nominee4Age : 0,
        //       bloodGroup: NominForm3 == true ? state.nominee4BloodGroup : null,
        //       candidateId: NominForm3 == true ? 0 : 0,
        //       dateOfBirth: NominForm3 == true ? Nominee4DOB : null,
        //       gender: NominForm3 == true ? state.nominee4Gender : null,
        //       nominiId: NominForm3 == true ? 0 : 0,
        //       nominiName: NominForm3 == true ? state.nominee4NominiName : null,
        //       relationship:
        //         NominForm3 == true ? state.nominee4Relationship : null,
        //     }
        //   : null,
        // NominForm4 == true
        //   ? {
        //       age: NominForm4 == true ? state.nominee5Age : 0,
        //       bloodGroup: NominForm4 == true ? state.nominee5BloodGroup : null,
        //       candidateId: NominForm4 == true ? 0 : 0,
        //       dateOfBirth: NominForm4 == true ? Nominee5DOB : null,
        //       gender: NominForm4 == true ? state.nominee5Gender : null,
        //       nominiId: NominForm4 == true ? 0 : 0,
        //       nominiName: NominForm4 == true ? state.nominee5NominiName : null,
        //       relationship:
        //         NominForm4 == true ? state.nominee5Relationship : null,
        //     }
        //   : null,
      ];
      console.log(NominiInfo);
      // const nextPage = props.NextStep;
      // nextPage();
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const handleCheckboxChange = (e) => {
    changeCheckState(e.target.checked);
    console.log(isChecked);
  };
  const handleNoCheckboxChange = (e) => {
    changeCheckState(!e.target.checked);
    console.log(isChecked);
  };
  const dateOfBirthHandler = (date, key) => {
    switch (key) {
      case "1":
        setNominee1DOB(date);
        console.log("Nomineee1Dob");
        break;
      case "2":
        setNominee2DOB(date);
        console.log("Nomineee2Dob");
        break;
      case "3":
        setNominee3DOB(date);
        console.log("Nomineee3Dob");
        break;
      case "4":
        setNominee4DOB(date);
        console.log("Nomineee4Dob");
        break;
      case "5":
        setNominee5DOB(date);
        console.log("Nomineee5Dob");
        break;

      default:
        break;
    }
  };
  const cancel = () => {
    if (NomineeCount >= 0) {
      console.log(NomineeCount);
      switch (NomineeCount) {
        case 1:
          console.log("11111");
          setNominForm1(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 2:
          console.log("22222");
          setNominForm2(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 3:
          console.log("3333");
          setNominForm3(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 4:
          console.log("4444");
          setNominForm4(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;

        default:
          break;
      }
    }
    console.log(NomineeCount);
  };

  const handleIncrement = () => {
    if (NomineeCount <= 4) {
      console.log(NomineeCount);

      switch (NomineeCount) {
        case 0:
          // need to implement on another cases alse
          if (checkAllValidations() === true) {
            console.log("11111");
            setNominForm1(true);
            setNomineeCount(NomineeCount + 1);
            return;
          }
          break;
        case 1:
          console.log("22222");
          setNominForm2(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;
        case 2:
          console.log("3333");
          setNominForm3(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;
        case 3:
          console.log("4444");
          setNominForm4(true);
          setNomineeCount(NomineeCount + 1);
          return;
          break;

        default:
          break;
      }
    }
    console.log(NomineeCount);
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
      {/* <Form onSubmit={submitHandler}>  */}
      <Row style={{ marginBottom: "2rem" }} className="CheckBoxField">
        <Col sm={2}>
          <div>
            <label>
              <b>Employee Name:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Gender:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Date Of Birth:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Age:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Blood Group:</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col sm={5}>
          <div>
            <label>
              <b>Enroll Dependents for Insurance Nomination</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "2rem" }}>
        <Col sm={3}>
          <Form.Group>
            <div className="boxField input">
              <input
                type="checkbox"
                value="No"
                checked={!isChecked}
                onChange={handleNoCheckboxChange}
              />
              <label>Add New Nominee</label>
            </div>
          </Form.Group>
        </Col>
        <Col sm={3} style={{ marginLeft: "-6rem" }}>
          <Form.Group>
            <div className="boxField input">
              <input
                type="checkbox"
                value="Yes"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>Edit Existing Nominees </label>
            </div>
          </Form.Group>
        </Col>
      </Row>
      {isChecked ? (
        <div></div>
      ) : (
        <div>
          <div>
            {/* first Nominee */}
            <Row style={{ marginBottom: "2rem" }}>
              <Col sm={11}>
                <Row>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Nominee Name
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nominiName"
                        value={state.nominiName}
                        onChange={changeHandler}
                        required
                        style={nomineNameError_1 ? { borderColor: "red" } : {}}
                        placeholder="Nominee Name"
                      />
                      {nomineNameError_1 ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          &nbsp; *Please enter valid name
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Relationship <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="relationship"
                        value={state.relationship}
                        onChange={changeHandler}
                        style={
                          relationshipError_1 ? { borderColor: "red" } : {}
                        }
                      >
                        <option value="">Relationship</option>
                      </Form.Control>
                      {relationshipError_1 ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          &nbsp; *Please select relationship
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Gender<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Gender"
                        required="required"
                        name="gender"
                        value={state.gender}
                        onChange={changeHandler}
                        style={genderError_1 ? { borderColor: "red" } : {}}
                      />
                      {genderError_1 ? (
                        <p style={{ color: "red" }}>
                          &nbsp; * Please fill the gender
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={11}>
                <Row>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Datte Of Birth<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <div
                        className={
                          DOBError_1 ? "onBoard-date-error" : "onBoard-date"
                        }
                      >
                        <DatePicker
                          className="form-control onBoard-view"
                          selected={Nominee1DOB}
                          required
                          onChange={(e) => dateOfBirthHandler(e, "1")}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="YYYY-MM-DD"
                          style={DOBError_1 ? { borderColor: "red" } : {}}
                        />
                      </div>
                      {DOBError_1 ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          &nbsp; *Please select valid date
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Age<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        required="required"
                        name="age"
                        value={state.age}
                        onChange={changeHandler}
                        style={ageError_1 ? { borderColor: "red" } : {}}
                      />
                      {ageError_1 ? (
                        <p style={{ color: "red" }}>
                          &nbsp; * Please enter valid age
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Blood Group <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="bloodGroup"
                        value={state.bloodGroup}
                        onChange={changeHandler}
                        style={bloodGroupError_1 ? { borderColor: "red" } : {}}
                      >
                        <option value="">Blood Group</option>
                      </Form.Control>
                      {bloodGroupError_1 ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          &nbsp; *Please select blood group
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                </Row>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </div>
          {NominForm1 === true ? (
            <div>
              {/* second Nominee */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Second Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee2NominiName"
                          value={state.nominee2NominiName}
                          onChange={changeHandler}
                          placeholder="Nominee Name"
                          required="required"
                          style={
                            nomineNameError_2 ? { borderColor: "red" } : {}
                          }
                        />
                        {nomineNameError_2 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid name
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee2Relationship"
                          value={state.nominee2Relationship}
                          onChange={changeHandler}
                          style={
                            relationshipError_2 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Relationship</option>
                        </Form.Control>
                        {relationshipError_2 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select relationship
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee2Gender"
                          value={state.nominee2Gender}
                          onChange={changeHandler}
                          placeholder="Gender"
                          required="required"
                          style={genderError_2 ? { borderColor: "red" } : {}}
                        />
                        {genderError_2 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please fill the gender
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div
                          className={
                            DOBError_2 ? "onBoard-date-error" : "onBoard-date"
                          }
                        >
                          <DatePicker
                            className="form-control onBoard-view"
                            selected={Nominee2DOB}
                            required
                            onChange={(e) => dateOfBirthHandler(e, "2")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            style={DOBError_2 ? { borderColor: "red" } : {}}
                          />
                        </div>
                        {DOBError_2 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select valid date
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee2Age"
                          value={state.nominee2Age}
                          onChange={changeHandler}
                          placeholder="Age"
                          required="required"
                          style={ageError_2 ? { borderColor: "red" } : {}}
                        />
                        {ageError_2 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid age
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee2BloodGroup"
                          value={state.nominee2BloodGroup}
                          onChange={changeHandler}
                          style={
                            bloodGroupError_2 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Blood Group</option>
                        </Form.Control>
                        {bloodGroupError_2 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select valid blood group
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {NominForm2 === true ? (
            <div>
              {/* Third Nominee  */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Third Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee3NominiName"
                          value={state.nominee3NominiName}
                          onChange={changeHandler}
                          placeholder="Nominee Name"
                          required="required"
                          style={
                            nomineNameError_3 ? { borderColor: "red" } : {}
                          }
                        />
                        {nomineNameError_3 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid name
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee3Relationship"
                          value={state.nominee3Relationship}
                          onChange={changeHandler}
                          style={
                            relationshipError_3 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Relationship</option>
                        </Form.Control>
                        {relationshipError_3 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select relation ship
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee3Gender"
                          value={state.nominee3Gender}
                          onChange={changeHandler}
                          placeholder="Gender"
                          required="required"
                          style={genderError_3 ? { borderColor: "red" } : {}}
                        />
                        {genderError_3 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please fill the gender
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div
                          className={
                            DOBError_3 ? "onBoard-date-error" : "onBoard-date"
                          }
                        >
                          <DatePicker
                            className="form-control onBoard-view"
                            selected={Nominee3DOB}
                            required
                            onChange={(e) => dateOfBirthHandler(e, "3")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            style={DOBError_3 ? { borderColor: "red" } : {}}
                          />
                        </div>
                        {DOBError_3 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select valid date
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee3Age"
                          value={state.nominee3Age}
                          onChange={changeHandler}
                          placeholder="Age"
                          required="required"
                          style={ageError_3 ? { borderColor: "red" } : {}}
                        />
                        {ageError_3 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid age
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee3BloodGroup"
                          value={state.nominee3BloodGroup}
                          onChange={changeHandler}
                          style={
                            bloodGroupError_3 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Blood Group</option>
                        </Form.Control>
                        {bloodGroupError_3 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid blood group
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {NominForm3 === true ? (
            <div>
              {/* fourth Nominee Name */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Fourth Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee4NominiName"
                          value={state.nominee4NominiName}
                          onChange={changeHandler}
                          placeholder="Nominee Name"
                          required="required"
                          style={
                            nomineNameError_4 ? { borderColor: "red" } : {}
                          }
                        />
                        {nomineNameError_4 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid name
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee4Relationship"
                          value={state.nominee4Relationship}
                          onChange={changeHandler}
                          style={
                            relationshipError_4 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Relationship</option>
                        </Form.Control>
                        {relationshipError_4 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select relationship
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee4Gender"
                          value={state.nominee4Gender}
                          onChange={changeHandler}
                          placeholder="Gender"
                          required="required"
                          style={genderError_4 ? { borderColor: "red" } : {}}
                        />
                        {genderError_4 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please fill the gender
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          &nbsp; *Datte Of Birth
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div
                          className={
                            DOBError_4 ? "onBoard-date-error" : "onBoard-date"
                          }
                        >
                          <DatePicker
                            className="form-control onBoard-view"
                            selected={Nominee4DOB}
                            required
                            onChange={(e) => dateOfBirthHandler(e, "4")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            style={DOBError_4 ? { borderColor: "red" } : {}}
                          />
                        </div>
                        {DOBError_4 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select valid date
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee4Age"
                          value={state.nominee4Age}
                          onChange={changeHandler}
                          placeholder="Age"
                          required="required"
                          style={ageError_4 ? { borderColor: "red" } : {}}
                        />
                        {ageError_4 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid age
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee4BloodGroup"
                          value={state.nominee4BloodGroup}
                          onChange={changeHandler}
                          style={
                            bloodGroupError_4 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Blood Group</option>
                        </Form.Control>
                        {bloodGroupError_4 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select blood group
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {NominForm4 === true ? (
            <div>
              {/* Fifth Nominee */}
              <Row style={{ marginBottom: "2rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Fifth Nominee Name
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee5NominiName"
                          value={state.nominee5NominiName}
                          onChange={changeHandler}
                          placeholder="Nominee Name"
                          required="required"
                          style={
                            nomineNameError_5 ? { borderColor: "red" } : {}
                          }
                        />
                        {nomineNameError_5 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid name
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Relationship <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee5Relationship"
                          value={state.nominee5Relationship}
                          onChange={changeHandler}
                          style={
                            relationshipError_5 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Relationship</option>
                        </Form.Control>
                        {relationshipError_5 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select relationship
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Gender<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee5Gender"
                          value={state.nominee5Gender}
                          onChange={changeHandler}
                          placeholder="Gender"
                          required="required"
                          style={genderError_5 ? { borderColor: "red" } : {}}
                        />
                        {genderError_5 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please fill the gender
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1} style={{ marginLeft: "-2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        onClick={cancel}
                        type="cancel"
                        style={{ color: "white", border: " 2px solid#4466f2" }}
                      >
                        <i
                          class="fa fa-close"
                          style={{ fontSize: "20px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col sm={11}>
                  <Row>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Datte Of Birth<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div
                          className={
                            DOBError_5 ? "onBoard-date-error" : "onBoard-date"
                          }
                        >
                          <DatePicker
                            className="form-control onBoard-view"
                            selected={Nominee5DOB}
                            required
                            onChange={(e) => dateOfBirthHandler(e, "5")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            style={DOBError_5 ? { borderColor: "red" } : {}}
                          />
                        </div>
                        {DOBError_5 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select valid date
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Age<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nominee5Age"
                          value={state.nominee5Age}
                          onChange={changeHandler}
                          placeholder="Age"
                          required="required"
                          style={ageError_5 ? { borderColor: "red" } : {}}
                        />
                        {ageError_5 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please enter valid age
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-sm-4">
                      <Form.Group>
                        <Form.Label>
                          Blood Group <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="nominee5BloodGroup"
                          value={state.nominee5BloodGroup}
                          onChange={changeHandler}
                          style={
                            bloodGroupError_5 ? { borderColor: "red" } : {}
                          }
                        >
                          <option value="">Blood Group</option>
                        </Form.Control>
                        {bloodGroupError_5 ? (
                          <p style={{ color: "red" }}>
                            {" "}
                            &nbsp; *Please select blood group
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </Form.Group>
                    </div>
                  </Row>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </div>
          ) : (
            ""
          )}

          {/* {(() => {
            switch (NomineeCount) {
              case 1:
                return <NomineeForm />;
              case 2:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />{" "}
                  </div>
                );
              case 3:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              case 4:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              case 5:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              default:
                return <div>Nominees.</div>;
            }
          })()} */}

          <Row>
            <Col sm={4}></Col>
            <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
              {/* style={{ padding: "0px 0px 0px 20px" }} */}
              <Form.Group>
                <div>
                  <button
                    className="buttonField  button"
                    onClick={handleIncrement}
                    disabled={false}
                    style={{ width: "160px" }}
                  >
                    <b> Add New Nominee + </b>
                  </button>
                  {/* onClick={AddExtrReferenceClick} disabled={isClicked} */}
                </div>
              </Form.Group>
            </Col>
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
    </Fragment>
  );
};
export default InsuranceNomination;
