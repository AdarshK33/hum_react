import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Table, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import moment from "moment";

const PartTimeAppointmentLetter = () => {
  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
  } = useContext(OfferContext);

  return (
    <Fragment>
      {offerLetterData && offerLetterData.partTimeCandidateOffer ? (
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
                  <h5 className="text-center">
                    {" "}
                    Emp ID: {offerLetterData.employeeId}
                  </h5>
                  <div>
                    <p className="float-left">To,</p>
                    <p className="float-right">
                      Date: {moment().format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div className="mt-5 mb-5">
                    <p>{offerLetterData.candidateName}</p>
                    <p>{offerLetterData.address}</p>
                    <p>{offerLetterData.cityName}</p>
                  </div>
                  <p>Dear {offerLetterData.candidateName},</p>
                  <p>
                    Thank for your interest in choosing Decathlon Sports India
                    Pvt Ltd (DSIPL). As we believe your passion for sport and
                    your values match those of our Company, we, at DSIPL, are
                    pleased to appoint you as a Decathlon Permanent Employee on
                    a part time basis, and your responsibilities would be those
                    of a{" "}
                    <span className="boldText">{offerLetterData.position}</span>{" "}
                    at our {offerLetterData.location} location effective{" "}
                    {offerLetterData.partTimeCandidateOffer.effectiveDate}.{" "}
                  </p>
                  <br></br>
                  <p>
                    Your gross fixed compensation would be INR.{" "}
                    {offerLetterData.partTimeCandidateOffer.grossSalary} per
                    hour. You are entitled to all the social security benefits
                    like PF, ESIC (as per applicability), & bonus as specified
                    in the respective statutory acts. Further, sufficient
                    holidays keep one motivated in a work environment.{" "}
                  </p>
                  <p>
                    You would be entitled to non-statutory benefits such as
                    Health & Social Security Insurance. Further you would be
                    eligible to earn monthly performance bonus to a maximum of{" "}
                    {offerLetterData.bonus} % . Monthly performance bonus is
                    payable subject to the successful achievement of individual
                    and Company goals as specified by your manager from time to
                    time.
                  </p>
                  <p>
                    {offerLetterData.managerName} will be responsible to mentor
                    and guide you in this phase of your professional journey or
                    any such manager assigned by the later.
                  </p>

                  <p>
                    We at Indeca strongly believe in your ability to manage
                    yourself in the best interest of the Company. Fewer the
                    rules better the productivity as far as we are concerned.
                  </p>
                  <p>
                    We trust you will enjoy working with Indeca and take the
                    utmost autonomy to complete your responsibilities-
                  </p>
                  <ol>
                    <li>
                      We believe you will treat your team mates and customers
                      with utmost respect
                    </li>
                    <li>
                      We are bound by certain regulations by the Government of
                      India and our Group norms. You will be required to abide
                      by all these regulations* currently existing or any such
                      rules that might be incorporated from time to time
                    </li>
                    <li>
                      When you are happy being a part of the Indeca family, we
                      expect you will be open to relocate to any location where
                      the Company currently has stores or may be established or
                      any other Group companies as deemed necessary
                    </li>
                    <li>
                      Your salary and its components are strictly confidential
                      and we prefer you not share it with other team members
                    </li>
                    <li>
                      We hold transparency in high regard. You cannot involve
                      yourself in taking or giving bribe, gambling, theft,
                      fraudulent practices or any such act that might affect
                      Indecas reputation or damage to property
                    </li>
                    <li>
                      We at DSIPL, have a strict policy against sexual
                      harassment. We believe that you will not engage in any
                      form of sexual harassment towards any of the Company
                      employees and the Company's customers. DSIPL also ensures
                      a safe environment to all its employees and customers and
                      strict action will be taken against any offender, be it
                      employee or customer
                    </li>
                    <li>
                      All documents submitted by you to the Company shall be
                      subjected to scrutiny by the appropriate authorities
                    </li>
                    <li>
                      In the event you feel you cannot be a part of our culture
                      and environment, kindly communicate your desire to depart
                      at least 7 days in advance
                    </li>
                    <li>
                      However, your employment will be subjected to immediate
                      termination on the following conditions prescribed in the
                      Industrial Employment/Model Standing Orders Act 1946-
                    </li>
                    <ul>
                      <li>
                        ● Wilful in subordination or disobedience, whether alone
                        or in combination with others, to any lawful and
                        reasonable order of a superior
                      </li>
                      <li>
                        ● Theft, fraud or dishonesty in connection with the
                        employers business or property
                      </li>
                      <li>
                        ● Wilful damage to or loss of employers goods or
                        property
                      </li>
                      <li>
                        ● Taking or giving bribes or any illegal gratification
                      </li>
                      <li>
                        ● Habitual absence without leave or absence without
                        leave for more than 10 days
                      </li>
                      <li>● Habitual late attendance</li>
                      <li>
                        ● Habitual breach of any law applicable to the
                        establishment
                      </li>
                      <li>
                        ● Riotous or disorderly behaviours during working hours
                        at the establishment or any act subversive of discipline
                      </li>
                      <li>● Habitual negligence or neglect of work</li>
                      <li>
                        ● Unauthorised strike of work or inciting others to
                        strike work in contravention of the provision of any
                        law, or rule having the force of law.
                      </li>
                    </ul>
                    <li>
                      Any image taken of you during a Decathlon event or during
                      a photo-shoot shall be the property of Decathlon and you
                      consent to Decathlon's use of the such image in
                      communication.
                    </li>
                    <li>
                      Apart from the above mentioned rules all rules specified
                      under the certified standing orders of Decathlon will be
                      applicable to you from the date of your joining Decathlon
                    </li>
                    <li>
                      Clause 4 of this employment contract shall continue to
                      survive even after any form of termination of this
                      employment contract.
                    </li>
                  </ol>
                  <p>
                    <b>
                      *. Notwithstanding anything mentioned above, please note
                      that the regulations would be explained to you by your
                      respective manager during your induction program{" "}
                    </b>
                  </p>
                  <p>
                    Should you accept the above information, then kindly sign
                    the duplicate copy of this appointment letter
                  </p>
                  <p>
                    <b>We welcome you to the Decathlon Family!</b>
                  </p>
                </Modal.Body>
                <div className="mb-3">
                  <Row>
                    <Col>
                      <p>For Decathlon Sports India Pvt Ltd</p>
                      <p>Authorised Signatory</p>
                      <button
                        className="signatureButtons"
                        onClick={() => addSignature()}
                      >
                        Add Signature
                      </button>
                    </Col>
                    <Col style={{ textAlign: "end" }}>
                      <p>Accepted By Me</p>
                      <p>Employee Signature</p>
                      <button className=" signatureButtons">
                        Add Signature
                      </button>
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
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PartTimeAppointmentLetter;
