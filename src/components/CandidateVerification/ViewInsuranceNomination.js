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
import "../OnBording/OnBoard.css";
// import NomineeForm from "./NominForm";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { useParams } from "react-router-dom";
import { OnBoardContext } from "../../context/OnBoardState";
import { OfferContext } from "../../context/OfferState";

const EditInsuranceNomination = (props) => {
  const params = useParams();
  const candidateId = params["candidateId"];
  const [isChecked, changeCheckState] = useState(false);
  const [disable, setDisable] = useState(false);
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

  const {
    fetchNominationDetails,
    nominationDetails,
    loader,
    personalInfoData,
  } = useContext(DocsVerifyContext);

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

  useEffect(() => {
    if (window.location.href.includes("verification")) {
      fetchNominationDetails(candidateId);
      setState(nominationDetails);
      setDisable(true);
      if (nominationDetails.dateOfBirth !== undefined) {
        var date = new Date(nominationDetails.dateOfBirth);
        // var todayDate = moment(date).format("YYYY-MM-DD");
        setNominee1DOB(date);
      }
    }
  }, []);
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
      ];
      console.log(NominiInfo);
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
  const selectedDate = (date) => {
    return new Date(date);
  };

  var ageDifMs = Date.now() - new Date(personalInfoData.dateOfBirth).getTime();
  var ageDate = new Date(ageDifMs);
  var finalAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  var finalDate = finalAge !== null && finalAge !== undefined ? finalAge : "";

  return (
    <Fragment>
      {nominationDetails !== null && nominationDetails !== undefined ? (
        <div>
          {/* <Form onSubmit={submitHandler}>  */}
          <Row style={{ marginBottom: "2rem" }} className="CheckBoxField">
            <Col sm={3}>
              <div>
                <label>
                  <b>Employee Name: </b>
                  &nbsp;&nbsp; {personalInfoData.firstName}
                </label>
              </div>
            </Col>
            <Col sm={2}>
              <div>
                <label>
                  <b>Gender: </b>
                  &nbsp;&nbsp; {personalInfoData.gender}
                </label>
              </div>
            </Col>
            <Col sm={3}>
              <div>
                <label>
                  <b>Date Of Birth:</b>
                  &nbsp;&nbsp; {personalInfoData.dateOfBirth}
                </label>
              </div>
            </Col>
            <Col sm={2}>
              <div>
                <label>
                  <b>Age:</b>
                  &nbsp;&nbsp; {finalDate}
                </label>
                <label>
                  <b></b>
                </label>
              </div>
            </Col>
            <Col sm={2}>
              <div>
                <label>
                  <b>Blood Group: </b>
                  {personalInfoData.bloodGroup}
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

          <div>
            <label>
              <b>First Dependent</b>
            </label>
          </div>
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
                          value={
                            nominationDetails[0] !== undefined
                              ? nominationDetails[0].nominiName
                              : ""
                          }
                          onChange={changeHandler}
                          disabled={disable}
                          required
                          style={
                            nomineNameError_1 ? { borderColor: "red" } : {}
                          }
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
                          as="input"
                          name="relationship"
                          value={
                            nominationDetails[0] !== undefined
                              ? nominationDetails[0].relationship
                              : ""
                          }
                          disabled={true}
                          onChange={changeHandler}
                          style={
                            relationshipError_1 ? { borderColor: "red" } : {}
                          }
                        ></Form.Control>
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
                          disabled={disable}
                          value={
                            nominationDetails[0] !== undefined
                              ? nominationDetails[0].gender
                              : ""
                          }
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
                          Datte Of Birth
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div
                          className={
                            DOBError_1 ? "onBoard-date-error" : "onBoard-date"
                          }
                        >
                          <DatePicker
                            className="form-control onBoard-view"
                            selected={
                              nominationDetails[0] !== undefined
                                ? selectedDate(nominationDetails[0].dateOfBirth)
                                : Nominee1DOB
                            }
                            required
                            disabled={disable}
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
                          value={
                            nominationDetails[0] !== undefined
                              ? nominationDetails[0].age
                              : ""
                          }
                          onChange={changeHandler}
                          disabled={disable}
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
                          type="text"
                          name="bloodGroup"
                          value={
                            nominationDetails[0] !== undefined
                              ? nominationDetails[0].bloodGroup
                              : ""
                          }
                          disabled={disable}
                          onChange={changeHandler}
                          style={
                            bloodGroupError_1 ? { borderColor: "red" } : {}
                          }
                        >
                          {/* <option value="">Blood Group</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>O+</option>
                          <option>O-</option>
                          <option>AB+</option>
                          <option>AB-</option>{" "} */}
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
            {nominationDetails[1] !== undefined ? (
              <div>
                <div>
                  <label>
                    <b>Second Dependent</b>
                  </label>
                </div>
                {/* second Nominee */}
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
                            name="nominee2NominiName"
                            value={
                              nominationDetails[1] !== undefined
                                ? nominationDetails[1].nominiName
                                : ""
                            }
                            onChange={changeHandler}
                            placeholder="Nominee Name"
                            disabled={true}
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
                            type="text"
                            name="nominee2Relationship"
                            value={
                              nominationDetails[1] !== undefined
                                ? nominationDetails[1].relationship
                                : ""
                            }
                            disabled={true}
                            onChange={changeHandler}
                            style={
                              relationshipError_2 ? { borderColor: "red" } : {}
                            }
                          >
                            {/* <option value="">Relationship</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Spouse">Spouse</option>\{" "}
                            <option value="Others">Others</option>{" "} */}
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
                            value={
                              nominationDetails[0] !== undefined
                                ? nominationDetails[0].gender
                                : ""
                            }
                            disabled={true}
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
                  {/* <Col sm={1} style={{ marginLeft: "-2rem" }}>
                    <Form.Group>
                      <div>
                        <button
                          onClick={cancel}
                          type="cancel"
                          style={{
                            color: "white",
                            border: " 2px solid#4466f2",
                          }}
                        >
                          <i
                            class="fa fa-close"
                            style={{ fontSize: "20px", color: "red" }}
                          ></i>
                        </button>
                      </div>
                    </Form.Group>
                  </Col> */}
                </Row>
                <Row style={{ marginBottom: "1rem" }}>
                  <Col sm={11}>
                    <Row>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Datte Of Birth
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <div
                            className={
                              DOBError_2 ? "onBoard-date-error" : "onBoard-date"
                            }
                          >
                            <DatePicker
                              className="form-control onBoard-view"
                              selected={
                                nominationDetails[1] !== undefined
                                  ? selectedDate(
                                      nominationDetails[0].dateOfBirth
                                    )
                                  : Nominee2DOB
                              }
                              disabled={true}
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
                            value={
                              nominationDetails[0] !== undefined
                                ? nominationDetails[0].age
                                : ""
                            }
                            disabled={true}
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
                            type="text"
                            name="nominee2BloodGroup"
                            value={
                              nominationDetails[0] !== undefined
                                ? nominationDetails[0].bloodGroup
                                : ""
                            }
                            onChange={changeHandler}
                            disabled={true}
                            style={
                              bloodGroupError_2 ? { borderColor: "red" } : {}
                            }
                          >
                            {/* <option value="">Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option>{" "} */}
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
            {/* <Row>
              <Col sm={3} style={{ marginTop: "2rem" }}>
                <label>Do you want to add dependent as</label>
              </Col>
              <Col sm={2} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField_1 input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      //   style={genderError ? { borderColor: "red" } : {}}
                      value="Male"
                      disabled={true}
                      checked={
                        nominationDetails[2].relationship === "Mother" ||
                        nominationDetails[2].relationship === "Father"
                          ? true
                          : false
                      }
                      //required={required}
                      // onChange={handleParentCheckboxChange}
                    />
                    <label>Parents</label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={2} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField_1 input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      //   style={genderError ? { borderColor: "red" } : {}}
                      value="Female"
                      disabled={true}
                      checked={
                        nominationDetails[2].relationship === "Mother In-Law" ||
                        nominationDetails[2].relationship === "Father In-Law"
                          ? true
                          : false
                      }
                      //   required={required}
                      // checked={InlawCheck}
                      // onChange={handleInLawCheckboxChange}
                    />
                    <label>In-Laws</label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={2} style={{ marginTop: "2rem" }}>
                <Form.Group>
                  <div className="boxField_1 input">
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      //   style={genderError ? { borderColor: "red" } : {}}
                      value="Other"
                      disabled={true}

                      //   required={required}
                      // checked={NAcheck}
                      // onChange={handleNACheckboxChange}
                    />
                    <label>NA</label>
                  </div>
                </Form.Group>
              </Col>
            </Row> */}
            {nominationDetails[2] !== undefined ? (
              <div>
                <div>
                  <label>
                    <b>Third Dependent</b>
                  </label>
                </div>
                {/* Third Nominee  */}
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
                            name="nominee3NominiName"
                            value={nominationDetails[2].nominiName}
                            onChange={changeHandler}
                            placeholder="Nominee Name"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Relationship <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nominee3Relationship"
                            value={nominationDetails[2].relationship}
                            disabled={true}
                          >
                            {/* <option value="">Relationship</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Spouse">Spouse</option>\{" "}
                            <option value="Others">Others</option>{" "} */}
                          </Form.Control>
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
                            value={nominationDetails[2].gender}
                            placeholder="Gender"
                            required="required"
                            disabled={true}
                          />
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
                            Datte Of Birth
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <div
                            className={
                              DOBError_3 ? "onBoard-date-error" : "onBoard-date"
                            }
                          >
                            <DatePicker
                              className="form-control onBoard-view"
                              selected={
                                nominationDetails[2] !== undefined
                                  ? selectedDate(
                                      nominationDetails[2].dateOfBirth
                                    )
                                  : Nominee1DOB
                              }
                              required
                              disabled={true}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="YYYY-MM-DD"
                              style={DOBError_3 ? { borderColor: "red" } : {}}
                            />
                          </div>
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
                            value={nominationDetails[2].age}
                            placeholder="Age"
                            required="required"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Blood Group <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nominee3BloodGroup"
                            value={nominationDetails[2].bloodGroup}
                            disabled={true}
                          >
                            {/* <option value="">Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option> */}
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
            {nominationDetails[3] !== undefined ? (
              <div>
                <div>
                  <label>
                    <b>Fourth Dependent</b>
                  </label>
                </div>
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
                            value={nominationDetails[3].nominiName}
                            onChange={changeHandler}
                            placeholder="Nominee Name"
                            required="required"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Relationship <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nominee4Relationship"
                            value={nominationDetails[3].relationship}
                            onChange={changeHandler}
                            disabled={true}
                          >
                            {/* <option value="">Relationship</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Spouse">Spouse</option>\{" "}
                            <option value="Others">Others</option>{" "} */}
                          </Form.Control>
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
                            value={nominationDetails[3].gender}
                            onChange={changeHandler}
                            placeholder="Gender"
                            required="required"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                    </Row>
                  </Col>
                  <Col sm={1} style={{ marginLeft: "-2rem" }}>
                    <Form.Group>
                      <div>
                        {/* <button
                          onClick={cancel}
                          type="cancel"
                          style={{
                            color: "white",
                            border: " 2px solid#4466f2",
                          }}
                        >
                          <i
                            class="fa fa-close"
                            style={{ fontSize: "20px", color: "red" }}
                          ></i>
                        </button> */}
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
                              selected={
                                nominationDetails[3] !== undefined
                                  ? selectedDate(
                                      nominationDetails[3].dateOfBirth
                                    )
                                  : Nominee1DOB
                              }
                              required
                              dateFormat="yyyy-MM-dd"
                              placeholderText="YYYY-MM-DD"
                              disabled={true}
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
                            value={nominationDetails[3].age}
                            onChange={changeHandler}
                            placeholder="Age"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Blood Group <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nominee4BloodGroup"
                            value={nominationDetails[3].bloodGroup}
                            onChange={changeHandler}
                            disabled={true}
                          >
                            {/* <option value="">Blood Group</option> */}
                          </Form.Control>
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
            {nominationDetails[4] !== undefined ? (
              <div>
                <div>
                  <label>
                    <b>Fifth Dependent</b>
                  </label>
                </div>
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
                            value={nominationDetails[4].nominiName}
                            onChange={changeHandler}
                            placeholder="Nominee Name"
                            required="required"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Relationship <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nominee5Relationship"
                            value={nominationDetails[4].relationship}
                            onChange={changeHandler}
                            disabled={true}
                          >
                            {/* <option value="">Relationship</option> */}
                          </Form.Control>
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
                            value={nominationDetails[4].gender}
                            onChange={changeHandler}
                            placeholder="Gender"
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                    </Row>
                  </Col>
                  {/* <Col sm={1} style={{ marginLeft: "-2rem" }}>
                    <Form.Group>
                      <div>
                        <button
                          onClick={cancel}
                          type="cancel"
                          style={{
                            color: "white",
                            border: " 2px solid#4466f2",
                          }}
                        >
                          <i
                            class="fa fa-close"
                            style={{ fontSize: "20px", color: "red" }}
                          ></i>
                        </button>
                      </div>
                    </Form.Group>
                  </Col> */}
                </Row>
                <Row style={{ marginBottom: "1rem" }}>
                  <Col sm={11}>
                    <Row>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Datte Of Birth
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <div
                            className={
                              DOBError_5 ? "onBoard-date-error" : "onBoard-date"
                            }
                          >
                            <DatePicker
                              className="form-control onBoard-view"
                              selected={
                                nominationDetails[4] !== undefined
                                  ? selectedDate(
                                      nominationDetails[4].dateOfBirth
                                    )
                                  : Nominee1DOB
                              }
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
                            value={nominationDetails[4].age}
                            onChange={changeHandler}
                            placeholder="Age"
                            required="required"
                            style={ageError_5 ? { borderColor: "red" } : {}}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-4">
                        <Form.Group>
                          <Form.Label>
                            Blood Group <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nominee5BloodGroup"
                            value={nominationDetails[4].bloodGroup}
                            onChange={changeHandler}
                            style={
                              bloodGroupError_5 ? { borderColor: "red" } : {}
                            }
                          >
                            {/* <option value="">Blood Group</option> */}
                          </Form.Control>
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
              {!candidateId && (
                <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
                  {/* style={{ padding: "0px 0px 0px 20px" }} */}
                  <Form.Group>
                    <div>
                      <button
                        className="buttonField  button"
                        onClick={handleIncrement}
                        disabled={disable}
                        style={{ width: "160px" }}
                      >
                        <b> Add New Nominee + </b>
                      </button>
                      {/* onClick={AddExtrReferenceClick} disabled={isClicked} */}
                    </div>
                  </Form.Group>
                </Col>
              )}
            </Row>
          </div>
          {/* )} */}
        </div>
      ) : (
        <div className="text-center">No Data Found</div>
      )}
    </Fragment>
  );
};
export default EditInsuranceNomination;
