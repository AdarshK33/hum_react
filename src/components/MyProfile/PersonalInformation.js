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
  const { UpdateEmployeeProfile } = useContext(EmployeeProfileContext);
  const { getUserInfo,fetchEmployeeProfile, user,fetchemployeeData } = useContext(AppContext);
  const [bloodGrp, setBloodGrp] = useState(fetchemployeeData.bloodGroup);
  const [maritalStatus, setMaritalStatus] = useState(fetchemployeeData && Object.keys(fetchemployeeData).length ? fetchemployeeData.maritalStatus.toLowerCase() === "unmarried" ||
  fetchemployeeData.maritalStatus.toLowerCase() === "single" ? "UnMarried" : "Married" : null );
  const [personalEmailId, setPersonalEmailId] = useState(fetchemployeeData.personalEmail);
  const [disability, setDisability] = useState();

  const [bloodGroupError, setBloodGroupError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  
  useEffect(() => {
    getUserInfo();
    fetchEmployeeProfile();
  }, []);

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
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      // (DropDownsValidation(maritalStatus, setMaritalStatusError) === true) &
      (emailValidation() === true)
    ) {
      if (
        fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        fetchemployeeData !== "" &&
        Object.keys(fetchemployeeData).length !== 0
      ) {
        fetchemployeeData.bloodGroup = bloodGrp;
        fetchemployeeData.maritalStatus = maritalStatus;
        fetchemployeeData.personalEmail = personalEmailId;
        console.log("user", user);
        UpdateEmployeeProfile(fetchemployeeData);
      }
    }
  };

  return (
    <Fragment>
      <ToastContainer />
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
            <label className="itemResult">{fetchemployeeData.employeeId}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>First Name</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.firstName}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Last Name</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.lastName}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Father's Name</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.fatherName}</label>
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
              {moment(fetchemployeeData.dob).format("DD-MM-YYYY")}
            </label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Gender</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.gender}</label>
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
            {moment(fetchemployeeData.joiningDate).format("DD-MM-YYYY")}</label>
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
            {fetchemployeeData.actualJoiningDate?fetchemployeeData.actualJoiningDate:moment(fetchemployeeData.joiningDate).format("DD-MM-YYYY")}
            </label>
          </Col>
          {/* <Col sm={3}>
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
          </Col> */}
          <Col sm={3}>
            <label>
              <b>Marital Status</b>
            </label>
            <br />
            <label className="itemResult">{maritalStatus}</label>
          </Col>
          {/* <Col sm={3}>
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
              </Form.Control> */}

              {/* {bloodGroupError ? (
                <p style={{ color: "red" }}>Please choose blood group</p>
              ) : (
                <p></p>
              )} */}
            {/* </Form.Group>
          </Col> */}
           <Col sm={3}>
            <label>
              <b>Aadhaar Number</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.aadhaarNumber}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Nationality</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.nationality}</label>
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
          {fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 && fetchemployeeData.contractType.toLowerCase() !== "local expat" && fetchemployeeData.contractType.toLowerCase() !== "internship"?
          <Col sm={3}>
            <label>
              <b>PAN Number</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.panNo}</label>
          </Col>
          :""
}
          <Col sm={3}>
            <label>
              <b>PF UAN Number</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.pfUanNo}</label>
          </Col>
          {fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 &&fetchemployeeData.contractType.toLowerCase() === "internship"?
          <Col sm={3}>
            <label>
              <b>College Name</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.collegeName}</label>
          </Col>:null}
          {fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 &&fetchemployeeData.contractType.toLowerCase() === "local expat"?
          <Col sm={3}>
            <label>
              <b>Passport Number</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.passportNumber}</label>
          </Col>:null}
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
            <label className="itemResult">{fetchemployeeData.epsMember?fetchemployeeData.epsMember:"NA"}</label>
          </Col>
        </Row>
        {fetchemployeeData &&
          Object.keys(fetchemployeeData).length &&
          fetchemployeeData.reference1Name ? (
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
            <label className="itemResult">{fetchemployeeData.reference1Name?fetchemployeeData.reference1Name:"NA"}</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Reference 1 Email Id</b>
            </label>
            <br />
            <label className="itemResult">{fetchemployeeData.reference1Email?fetchemployeeData.reference1Email:"NA"}</label>
          </Col>
        </Row>
          ) : (
            ""
          )}
        {fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 &&
        fetchemployeeData.reference2Name !== null &&
        fetchemployeeData.reference2Name !== undefined ? (
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
              <label className="itemResult">{fetchemployeeData.reference2Name?fetchemployeeData.reference2Name:"NA"}</label>
            </Col>
            <Col sm={3}>
              <label>
                <b>Reference 2 Email Id</b>
              </label>
              <br />
              <label className="itemResult">{fetchemployeeData.reference2Email?fetchemployeeData.reference2Email:"NA"}</label>
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
