import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { Fragment } from "react";
import { OfferContext } from "../../context/OfferState";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import moment from "moment";
import "../Offers/offers.css";

const AppointmentLetter = (props) => {
  const {
    generateOfferLetter,
    offerLetterData,
    candidateData,
    finalSubmitAppointmentLetter,
    submitAppointmentLetter,
  } = useContext(OfferContext);
  const [showLetter, setShow] = useState(true);
  const [previewClick, setPreviewClick] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    console.log(
      "inside full appointment letter",
      offerLetterData,
      props.previewLetter
    );
    if (props.previewLetter === true) {
      setShow(true);
      setPreviewClick(true);
    }
  }, [offerLetterData]);
  const [signaturePad, setSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const addSignature = () => {
    setSignature(true);
  };
  const saveAppointmentLetter = () => {
    setSaveLetter(true);
    setShow(false);
    /*saveAppointmentLetter */
  };
  return (
    <Fragment>
      {offerLetterData && offerLetterData.permanentCandidateOffer ? (
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
                <div className="mt-5 mb-5">
                  <p> Dear {offerLetterData.candidateName}, </p>
                  <p>
                    Thank for your interest in choosing Indeca Sporting Goods
                    Pvt Ltd (Indeca). As we believe your passion for sport and
                    your values match those of our Company, we, at Indeca, are
                    pleased to appoint you as a Decathlon Permanent Employee on
                    a Full Time basis, and your responsibilities would be those
                    of a {offerLetterData.position} at our{" "}
                    {offerLetterData.location} location effective
                    {offerLetterData.permanentCandidateOffer.effectiveDate} and
                    you will be on probation up to{" "}
                    {offerLetterData.probationPeriod} month(s) or such extended
                    period as specified by your Manager. Thereafter, your
                    employment confirmation would be informed to you in writing.
                  </p>
                  <p>
                    Your gross fixed compensation would be INR.{" "}
                    {offerLetterData.permanentCandidateOffer.grossSalary}. You
                    are also entitled for a monthly statutory/non-statutory
                    bonus which will be at a maximum {offerLetterData.bonus} %
                    of your gross monthly fixed compensation. You are entitled
                    to all the social security benefits like PF, ESIC (as per
                    applicability), Gratuity, and Employee Compensation as
                    specified in the respective statutory acts. Please find the
                    detailed breakup of salary in Annexure1 enclosed below.
                    Further, sufficient holidays keep one motivated in a work
                    environment. Therefore you shall have{" "}
                    {offerLetterData.permanentCandidateOffer.eligibleLeaves}{" "}
                    days of annual leaves
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
                      Working for Indeca is a full time job! While we believe in
                      honesty in the job responsibility, we insist you dedicate
                      your working hours solely to Indeca, and not work
                      elsewhere, and also do not indulge in any trade or
                      business owned by you or any third party
                    </li>
                    <li>
                      We hold transparency in high regard. You cannot involve
                      yourself in taking or giving bribe, gambling, theft,
                      fraudulent practices or any such act that might affect
                      Indecas reputation or damage to property
                    </li>
                    <li>
                      We at Indeca, have a strict policy against sexual
                      harassment. We believe that you will not engage in any
                      form of sexual harassment towards any of the Company
                      employees and the Company's customers. Indeca also ensures
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
                      at least 7 days in advance during probation or 1 month in
                      advance if your employment is confirmed
                    </li>
                    <li>
                      In the event we find you have not abided by these, and
                      other regulations explained to you by your manager or if
                      you do not share the values of Indeca, we shall
                      communicate the dis-continuance of employment with Indeca
                      to you at least 7 days in advance during probation or 1
                      month in advance if your employment is confirmed
                    </li>
                    <li>
                      Service rules under the Certified Standing Orders of
                      Decathlon will be applicable to you from the date of
                      certification of such orders. The information on the
                      certification of such standing orders will be communicated
                      to you electronically
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
                  <p className="text-center">
                    <b>Annexure-1</b>
                  </p>
                  {/* <Table striped bordered hover>
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
                  </Table> */}

                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Salary Structure</th>
                        <th>Monthly</th>
                        <th>Annually</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Gross </td>
                        <td>
                          {offerLetterData.fixedGross +
                            offerLetterData.permanentCandidateOffer.bonus}
                        </td>
                        <td>
                          {(offerLetterData.fixedGross +
                            offerLetterData.permanentCandidateOffer.bonus) *
                            12}
                        </td>
                      </tr>
                      <tr>
                        <td>Basic </td>
                        <td>
                          {offerLetterData.permanentCandidateOffer.basic +
                            offerLetterData.permanentCandidateOffer.bonus}
                        </td>
                        <td>
                          {(offerLetterData.permanentCandidateOffer.basic +
                            offerLetterData.permanentCandidateOffer.bonus) *
                            12}
                        </td>
                      </tr>
                      <tr>
                        <td>House Rent Allowance </td>

                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.hra +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td>
                          {(offerLetterData.permanentCandidateOffer.hra +
                            offerLetterData.permanentCandidateOffer.bonus) *
                            12}
                        </td>
                      </tr>

                      <tr>
                        <td>Leave Travel Allowance</td>
                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.lta +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer.lta +
                              offerLetterData.permanentCandidateOffer.bonus) *
                              12
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>Special Allowance </td>
                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .specialAllowance +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer
                              .specialAllowance +
                              offerLetterData.permanentCandidateOffer.bonus) *
                              12
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Monthly Bonus/ Statutory Bonus*+ </td>
                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.bonus * 12
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="boldText">Gross Salary </td>
                        <td className="boldText">
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .grossSalary +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td className="boldText">
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer
                              .grossSalary +
                              offerLetterData.permanentCandidateOffer.bonus) *
                              12
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Employer PF </td>
                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.employerPF +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer
                              .employerPF +
                              offerLetterData.permanentCandidateOffer.bonus) *
                              12
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Gratuity </td>
                        <td>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.gratuity +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer.gratuity +
                              offerLetterData.permanentCandidateOffer.bonus) *
                              12
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>Employer ESIC</td>
                        <td className="boldText">
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .employerESIC +
                              offerLetterData.permanentCandidateOffer.bonus
                          )}
                        </td>
                        <td className="boldText">
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .employerESIC +
                              offerLetterData.permanentCandidateOffer.bonus
                          ) * 12}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>CTC </b>
                        </td>
                        <td className="boldText">
                          <b>
                            {Math.round(
                              offerLetterData.permanentCandidateOffer.ctc +
                                offerLetterData.permanentCandidateOffer.bonus
                            )}
                          </b>
                        </td>
                        <td className="boldText">
                          <b>
                            {Math.round(
                              offerLetterData.permanentCandidateOffer.ctc +
                                offerLetterData.permanentCandidateOffer.bonus
                            ) * 12}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={8}>
                          * Please note that if you are drawing a monthly gross
                          salary upto 21000 then you would get a minimum of INR.
                          583/per month for the number of months that you have
                          worked in any Financial year or a maximum upto 0.0 %
                          of your Monthly fixed gross basis the criterion
                          mentioned by your manager from time to time + Please
                          note that if you are drawing monthly gross more than
                          21000 then you can earn maximum upto 0.0 % of your
                          Monthly fixed gross basis the criterion mentioned by
                          your manager from time to time
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Modal.Body>
              <div className="mb-3">
                <Row>
                  <Col>
                    <p>For Indeca Sporting Goods Pvt Ltd</p>
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
                    <button className=" signatureButtons">Add Signature</button>
                  </Col>
                </Row>
              </div>
              {signaturePad && !saveLetter && (
                <div className="text-center mb-4">
                  <button
                    className=" signatureButtons"
                    onClick={saveAppointmentLetter}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </Container>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default AppointmentLetter;
