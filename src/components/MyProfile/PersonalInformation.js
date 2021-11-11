import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Search, PlusCircle, MinusCircle } from "react-feather";
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
import { OnBoardContext } from "../../context/OnBoardState";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import BankDetails from "./BankDetails";
import moment from "moment";

const PersonalInformation = (props) => {
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
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>First Name</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Last Name</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Father's Name</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
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
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Gender</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Blood Group</b>
            </label>
            <br />
            <Form.Group>
              <Form.Control
                as="select"
                name="bloodGroup"
                // value={state.bloodGroup}
                // onChange={changeHandler}
                required
                // disabled={disabled}
                // style={bloodGroupError ? { borderColor: "red" } : {}}
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

              {/* {bloodGroupError ? (
                <p style={{ color: "red" }}>Please choose blood group</p>
              ) : (
                <p></p>
              )} */}
            </Form.Group>
          </Col>
          <Col sm={3}>
            <label>
              <b>Date of Joining Group</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
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
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Marital Status</b>
            </label>
            <br />
            <Form.Group>
              <Form.Control
                as="select"
                name="maritalStatus"
                // value={state.bloodGroup}
                // onChange={changeHandler}
                required
                // disabled={disabled}
                // style={bloodGroupError ? { borderColor: "red" } : {}}
              >
                <option value="">Select Marital Status</option>
                <option>Married</option>
                <option>UnMarried</option>
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
              <b>Disability</b>
            </label>
            <br />
            <Form.Group>
              <Form.Control
                as="select"
                name="disability"
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
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: "2rem",
          }}
        >
          <Col sm={3}>
            <label>
              <b>Personal Email Id</b>
            </label>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                name="emailId"
                // value={state.aadhaarNumber}
                // onChange={changeHandler}
                required
                placeholder="Personal Email Id"
                // disabled={disabled}
                // style={aadharNumberError ? { borderColor: "red" } : {}}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <label>
              <b>Adhar No</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>PAN No</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>PF UAN No</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
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
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
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
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Reference 1 Email Id</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
        </Row>
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
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}>
            <label>
              <b>Reference 2 Email Id</b>
            </label>
            <br />
            <label className="itemResult">IDDDDD</label>
          </Col>
          <Col sm={3}></Col>
          <Col sm={3} style={{ textAlign: "right" }}>
            {/* onClick={submitHandler} */}
            <br />
            <button className="stepperButtons">Update</button>
          </Col>
        </Row>
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
