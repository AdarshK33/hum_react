import React, { createContext, useReducer, useState } from "react";
import { Fragment } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
const AppointmentLetter = (props) => {
  const [showLetter, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  const [signaturePad, setSignature] = useState(false);

  const addSignature = () => {
    setSignature(true);
  };
  return (
    <Fragment>
      <div className="appointmentLetter">
        <Modal show={showLetter} onHide={() => handleClose()} size="lg">
          <Container>
            <Modal.Header
              closeButton
              className="appointmentHeader"
            ></Modal.Header>
            <Modal.Body className="appointmentLetter">
              <h4 className="text-center">Employment Contract</h4>
              <h5 className="text-center"> Emp ID: INDECA409</h5>
              <div>
                <p className="float-left">To,</p>
                <p className="float-right">Date: 27-07-2020</p>
              </div>
              <div className="mt-5 mb-5">
                <p>Akshatha M R,</p>
                <p>sdfashafsjdkfsjkdf fsdfasffds</p>
                <p>Andaman and Nicobar Islands Afghanistan.</p>
              </div>
              <div className="mt-5 mb-5">
                <p> Dear Akshatha M R, </p>
                Thank for your interest in choosing Indeca Sporting Goods Pvt
                Ltd (Indeca). As we believe your passion for sport and your
                values match those of our Company, we, at Indeca, are pleased to
                appoint you as a Decathlon Permanent Employee on a Full Time
                basis, and your responsibilities would be those of a IT Project
                Leader at our Bangalore location effective 27-07-2020 and you
                will be on probation up to 0 month(s) or such extended period as
                specified by your Manager. Thereafter, your employment
                confirmation would be informed to you in writing. Your gross
                fixed compensation would be INR. 50000.00. You are also entitled
                for a monthly statutory/non-statutory bonus which will be at a
                maximum 0.0% of your gross monthly fixed compensation. You are
                entitled to all the social security benefits like PF, ESIC (as
                per applicability), Gratuity, and Employee Compensation as
                specified in the respective statutory acts. Please find the
                detailed breakup of salary in Annexure1 enclosed below. Further,
                sufficient holidays keep one motivated in a work environment.
                Therefore you shall have 30 days of annual leaves Kamala Nagaraj
                will be responsible to mentor and guide you in this phase of
                your professional journey or any such manager assigned by the
                later. We at Indeca strongly believe in your ability to manage
                yourself in the best interest of the Company. Fewer the rules
                better the productivity as far as we are concerned. We trust you
                will enjoy working with Indeca and take the utmost autonomy to
                complete your
                <p>
                  <b>We welcome you to the Decathlon Family!</b>
                </p>
                <p className="text-center">
                  <b>Annexure-1</b>
                </p>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={4}>Salary Structure</th>
                      <th>Monthly</th>
                      <th>Annually</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontWeight: "bold" }}>
                      <td colSpan={4}>Gross</td>
                      <td>50000.00</td>
                      <td>60000.00</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Basic</td>
                      <td>25000.00</td>
                      <td>30000.00</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>House Rent Allowance</td>
                      <td>12500.00</td>
                      <td>15000.00</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>LTA</td>
                      <td>2084.00</td>
                      <td>25001.00</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Special Allowance</td>
                      <td>10417.00</td>
                      <td>125000.00</td>
                    </tr>
                    <tr style={{ fontWeight: "bold" }}>
                      <td colSpan={4}>Gross Salary</td>
                      <td>50000.00</td>
                      <td>60000.00</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Modal.Body>
            <div className="mb-3">
              <Row>
                <Col>
                  <p>Authorised Signatory</p>
                  <button
                    className="signatureButtons"
                    onClick={() => addSignature()}
                  >
                    Add Signature
                  </button>
                </Col>
                <Col style={{ textAlign: "end" }}>
                  <p>Employee Signature</p>
                  <button className=" signatureButtons">Add Signature</button>
                </Col>
              </Row>
            </div>
            {signaturePad && (
              <div className="text-center mb-4">
                <button className=" signatureButtons">Save Changes</button>
              </div>
            )}
          </Container>
        </Modal>
      </div>
    </Fragment>
  );
};
export default AppointmentLetter;
