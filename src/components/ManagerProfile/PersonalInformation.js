import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { AppContext } from "../../context/AppState";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import BankDetails from "./BankDetails";
import moment from "moment";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";

const PersonalInformation = (props) => {
  const { UpdateEmployeeProfile, EmpProfileView, EmpProfile, currentEmpId } =
    useContext(EmployeeProfileContext);
  useEffect(() => {
    EmpProfileView(currentEmpId);
  }, []);

  const { user } = useContext(AppContext);
  // const [bloodGrp, setBloodGrp] = useState(EmpProfile.bloodGroup);
  // const [maritalStatus, setMaritalStatus] = useState(EmpProfile.maritalStatus);
  // const [personalEmailId, setPersonalEmailId] = useState(
  //   EmpProfile.personalEmail
  // );
  const [bloodGrp, setBloodGrp] = useState("");
  const [maritalStatus, setMaritalStatus] = useState(user && Object.keys(user).length ? user.maritalStatus.toLowerCase() === "unmarried" ||
  user.maritalStatus.toLowerCase() === "single" ? "UnMarried" : "Married" : null );
  const [personalEmailId, setPersonalEmailId] = useState("");
  const [disability, setDisability] = useState();

  const [bloodGroupError, setBloodGroupError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  useEffect(() => {
    if (
      EmpProfile !== null &&
      EmpProfile !== undefined &&
      Object.keys(EmpProfile).length !== 0
    ) {
      setBloodGrp(EmpProfile.bloodGroup);
      setMaritalStatus(EmpProfile.maritalStatus);
      setPersonalEmailId(EmpProfile.personalEmail);
    } else {
      setBloodGrp("");
      setMaritalStatus("");
      setPersonalEmailId("");
    }
  }, [EmpProfile]);

  const DropDownsValidation = (item, setError) => {
    if (item !== "" && item !== null && item !== undefined) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const emailValidation = () => {
    const emailValid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      personalEmailId !== "" &&
      personalEmailId !== null &&
      personalEmailId !== undefined &&
      emailValid.test(personalEmailId)
    ) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true);
      return false;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("insideSubmit");
    if (
      (DropDownsValidation(bloodGrp, setBloodGroupError) === true) &
      (DropDownsValidation(maritalStatus, setMaritalStatusError) === true) &
      (emailValidation() === true)
    ) {
      if (
        EmpProfile !== null &&
        EmpProfile !== undefined &&
        EmpProfile !== "" &&
        Object.keys(EmpProfile).length !== 0
      ) {
        EmpProfile.bloodGroup = bloodGrp;
        EmpProfile.maritalStatus = maritalStatus;
        EmpProfile.personalEmail = personalEmailId;
        console.log("EmpProfile", EmpProfile);
        UpdateEmployeeProfile(EmpProfile);
      }
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      {EmpProfile !== null &&
      EmpProfile !== undefined &&
      Object.keys(EmpProfile).length !== 0 ? (
        <Form>
          <label>
            <b>Personal :</b>
          </label>
          <Row
            style={{
              borderTop: "2px solid #006ebb",
              width: "98%",
              marginRight: "1rem",
              marginBottom: "1rem",
              marginLeft: "-2px",
            }}
          ></Row>
          <Row
            style={{
              marginBottom: "2rem",
            }}
          >
            <Col sm={3}>
              <label>
                <b>Employee Id</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.employeeId}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>First Name</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.firstName}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>Last Name</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.lastName}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>Father's Name</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.fatherName}</label>
            </Col>
          </Row>
          <Row
            style={{
              marginBottom: "2rem",
            }}
          >
            <Col sm={3}>
              <label>
                <b>Date of Birth</b>
              </label>
              <br />

              <label className="itemResult">
                {moment(EmpProfile.dob).format("DD-MM-YYYY")}
              </label>
            </Col>
            <Col sm={3}>
              <label>
                <b>Gender</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.gender}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>Blood Group</b><span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Form.Group>
                <Form.Control
                  as="select"
                  className="text-primary"
                  name="bloodGroup"
                  value={bloodGrp}
                  onChange={(e) => setBloodGrp(e.target.value)}
                  required
                  // disabled={disabled}
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
            </Col>
            <Col sm={3}>
              <label>
                <b>Date of Joining Group</b>
              </label>
              <br />
              <label className="itemResult">
                {EmpProfile.actualJoiningDate}
              </label>
            </Col>
          </Row>
          <Row
            style={{
              marginBottom: "2rem",
            }}
          >
            <Col sm={3}>
              <label>
                <b>Date of Joining</b>
              </label>
              <br />
              <label className="itemResult">
                {moment(EmpProfile.joiningDate).format("DD-MM-YYYY")}
              </label>
            </Col>
            <Col sm={3}>
              <label>
                <b>Marital Status</b><span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Form.Group>
                <Form.Control
                  as="select"
                  name="maritalStatus"
                  className="text-primary"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                  // disabled={disabled}
                  style={maritalStatusError ? { borderColor: "red" } : {}}
                >
                <option value="">Select Marital Status</option>
                <option value= "Married">Married</option>
                <option value="UnMarried" >UnMarried</option>
                </Form.Control>

                {maritalStatusError ? (
                  <p style={{ color: "red" }}>Please choose marital status</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <label>
                <b>Disability</b>
              </label>
              <br />
              <Form.Group>
                <Form.Control
                  as="select"
                  name="disability"
                  className="text-primary"
                  // value={state.bloodGroup}
                  // onChange={changeHandler}
                  required
                  // disabled={disabled}
                  // style={bloodGroupError ? { borderColor: "red" } : {}}
                >
                  <option value="">Select Disability</option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Control>

                {/* {bloodGroupError ? (
                <p style={{ color: "red" }}>Please choose blood group</p>
              ) : (
                <p></p>
              )} */}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <label>
                <b>Nationality</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.nationality}</label>
            </Col>
          </Row>
          <Row
            style={{
              marginBottom: "2rem",
            }}
          >
            <Col sm={3}>
              <label>
                <b>Personal Email Id</b><span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <Form.Group>
                <Form.Control
                  type="text"
                  name="emailId"
                  className="text-primary"
                  value={personalEmailId}
                  onChange={(e) => setPersonalEmailId(e.target.value)}
                  required
                  placeholder="Personal Email Id"
                  // disabled={disabled}
                  style={emailError ? { borderColor: "red" } : {}}
                />
                {emailError ? (
                  <p style={{ color: "red" }}>Please enter valid email</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
            <Col sm={3}>
              <label>
                <b>Aadhaar Number</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.aadhaarNumber}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>PAN Number</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.panNo}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>PF UAN Number</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.pfUanNo}</label>
            </Col>
          </Row>
          <Row
            style={{
              marginBottom: "2rem",
            }}
          >
            <Col sm={12}>
              <label>
                <b>Are you an EPS member in your earlier employment?</b>
              </label>
              <br />
              <label className="itemResult">{EmpProfile.epsMember?EmpProfile.epsMember:"NA"}</label>
            </Col>
          </Row>
          {EmpProfile &&
          Object.keys(EmpProfile).length &&
          EmpProfile.reference1Name ? (
            <Row
              style={{
                marginBottom: "2rem",
              }}
            >
              <Col sm={3}>
                <label>
                  <b>Reference 1 Name</b>
                </label>
                <br />
                <label className="itemResult">
                  {EmpProfile.reference1Name?EmpProfile.reference1Name:"NA"}
                </label>
              </Col>
              <Col sm={3}>
                <label>
                  <b>Reference 1 Email Id</b>
                </label>
                <br />
                <label className="itemResult">
                  {EmpProfile.reference1Email?EmpProfile.reference1Email:"NA"}
                </label>
              </Col>
            </Row>
          ) : (
            ""
          )}
          {EmpProfile !== null &&
          EmpProfile !== undefined &&
          Object.keys(EmpProfile).length !== 0 &&
          EmpProfile.reference2Name !== null &&
          EmpProfile.reference2Name !== undefined ? (
            <Row
              style={{
                marginBottom: "2rem",
              }}
            >
              <Col sm={3}>
                <label>
                  <b>Reference 2 Name</b>
                </label>
                <br />
                <label className="itemResult">
                  {EmpProfile.reference2Name?EmpProfile.reference2Name:"NA"}
                </label>
              </Col>
              <Col sm={3}>
                <label>
                  <b>Reference 2 Email Id</b>
                </label>
                <br />
                <label className="itemResult">
                  {EmpProfile.reference2Email?EmpProfile.reference2Email:"NA"}
                </label>
              </Col>
              <Col sm={3}></Col>
              {/* <Col sm={3} style={{ textAlign: "right" }}>
              
              <br />
              <button className="profileButtons">Update</button>
            </Col> */}
            </Row>
          ) : (
            ""
          )}
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
      ) : (
        ""
      )}
      <Row style={{ marginBottom: "2rem" }}>
        <Container fluid className="container-accordion">
          <Accordion preExpanded={["a"]}>
            <AccordionItem uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>Address</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Address />
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Emergency Contact</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <EmergencyContact />
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Bank</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <BankDetails />
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Row>
    </Fragment>
  );
};
export default PersonalInformation;
