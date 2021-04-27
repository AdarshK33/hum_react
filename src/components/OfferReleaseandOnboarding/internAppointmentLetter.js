import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button, Container } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { OfferContext } from "../../context/OfferState";

const InternAppointmentLetter = (props) => {
  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
  } = useContext(OfferContext);
  const [showLetter, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);
  const [previewClick, setPreviewClick] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    console.log(
      "inside intern appointment letter",
      offerLetterData,
      props.previewLetter
    );
    if (props.previewLetter === true) {
      setShow(true);
      setPreviewClick(true);
    }
  }, [offerLetterData]);
  const addSignature = () => {
    setSignature(true);
  };
  const saveAppointmentLetter = () => {
    setSaveLetter(true);
    setShow(false);
    /*saveAppointmentLetter */
  };
  const [signaturePad, setSignature] = useState(false);
  return (
    <Fragment>
      {typeof offerLetterData &&
      offerLetterData.internshipCandidateOffer !== undefined ? (
        <Fragment>
          <div className="appointmentLetter">
            <Modal show={showLetter} onHide={() => handleClose()} size="md">
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
                  <p>
                    Dear <b>{offerLetterData.candidateName}</b>,
                  </p>
                  <p>
                    We thank you for your interest in choosing Decathlon Sports
                    India Pvt Ltd (DSIPL). We are in receipt of your application
                    authorised by your institute/college/university to do an
                    internship project on the topic Legal Real Estate. As we
                    believe your passion for sport and your values match those
                    of our Company, we, at DSIPL, encourage academic aspirants
                    to learn practical aspects of their academic curriculum. We
                    are pleased to assign the project of your interest and we
                    permit you to carry out the learning and we engage you as an
                    intern for the period{" "}
                    <b>{offerLetterData.internshipCandidateOffer.fromDate}</b>{" "}
                    to <b>{offerLetterData.internshipCandidateOffer.toDate}</b>{" "}
                    at our <b>{offerLetterData.location}</b> location.
                  </p>
                  <p>
                    Your fixed stipend would be INR.{" "}
                    {offerLetterData.internshipCandidateOffer.stipend} per
                    month. This stipend is paid purely to manage your travel,
                    record maintenance, project submission and any other
                    unforeseen project related expenses. Further it is to be
                    noted that DSIPL will not be in receipt of any professional
                    service from you which might result in financial gain in the
                    form of revenue or profits. Hence, this stipend is not to be
                    treated as a wage in any form.
                  </p>

                  <p>
                    We are pleased to offer internship programme for period of{" "}
                    <b>
                      {
                        offerLetterData.internshipCandidateOffer
                          .internshipPeriod
                      }
                    </b>{" "}
                    months from{" "}
                    <b>{offerLetterData.internshipCandidateOffer.fromDate}</b>{" "}
                    to <b>{offerLetterData.internshipCandidateOffer.toDate}</b>{" "}
                    at {offerLetterData.companyName} Pvt. Ltd. You will be
                    provided stipend{" "}
                    {offerLetterData.internshipCandidateOffer.stipend} per
                    month.
                  </p>

                  <p>
                    As mutually discussed, your engagement as as Intern is
                    subject to the following:
                  </p>
                  <ol>
                    <li>
                      <b>{offerLetterData.managerName}</b> will be responsible
                      to mentor and guide you in this phase of your professional
                      journey or any such manager assigned by the later.
                    </li>
                    <li>
                      We at DSIPL strongly believe in your ability to manage
                      yourself in the best interest of the Company. Fewer the
                      rules better the productivity as far as we are concerned.
                    </li>
                    <li>
                      3. We trust you will enjoy the stay with DSIPL and take
                      the utmost autonomy to complete your Project and enhance
                      the learnings.
                      <ol type="i">
                        <li>
                          We believe you will treat your team mates and
                          customers with utmost respect{" "}
                        </li>
                        <li>
                          We are bound by certain regulations by the Government
                          of India and our Group norms. You will be required to
                          abide by all these regulations* currently existing or
                          any such rules that might be incorporated from time to
                          time{" "}
                        </li>
                        <li>
                          When you are happy being a part of the DSIPL family,
                          we expect you will be open to relocate to any location
                          where the Company currently has stores or may be
                          established or any other Group companies as deemed
                          necessary{" "}
                        </li>
                        <li>
                          Your stipend components are strictly confidential and
                          we prefer you not share it with other team members{" "}
                        </li>
                        <li>
                          We hold transparency in high regard. You cannot
                          involve yourself in taking or giving bribe, gambling,
                          theft, fraudulent practices or any such act that might
                          affect DSIPLs reputation or damage to property{" "}
                        </li>
                        <li>
                          We at DSIPL, have a strict policy against sexual
                          harassment. We believe that you will not engage in any
                          form of sexual harassment towards any of the Company
                          employees and the Company's customers. DSIPL also
                          ensures a safe environment to all its employees and
                          customers and strict action will be taken against any
                          offender, be it employee or customer{" "}
                        </li>
                        <li>
                          All documents submitted by you to the Company shall be
                          subjected to scrutiny by the appropriate authorities{" "}
                        </li>
                        <li>
                          In the event you feel you cannot be a part of our
                          culture and environment, kindly communicate your
                          desire to depart at least 7 days in advance{" "}
                        </li>
                        <li>
                          In the event we find you have not abided by these, and
                          other regulations explained to you by your manager or
                          if you do not share the values of DSIPL, we shall
                          communicate the dis-continuance of this engagement
                          with DSIPL to you at least 7 days in advance{" "}
                        </li>
                        <li>
                          x. However, your engagement will be subjected to
                          immediate termination on the following conditions:
                          <ul>
                            <li>
                              wilful in subordination or disobedience, whether
                              alone or in combination with others, to any lawful
                              and reasonable order of a superior
                            </li>
                            <li>
                              theft, fraud or dishonesty in connection with the
                              employers business or property
                            </li>
                            <li>
                              wilful damage to or loss of employers goods or
                              property
                            </li>
                            <li>
                              taking or giving bribes or any illegal
                              gratification
                            </li>
                            <li>
                              habitual absence without leave or absence without
                              leave for more than 10 days
                            </li>
                            <li>habitual late attendance</li>
                            <li>
                              habitual breach of any law applicable to the
                              establishment
                            </li>
                            <li>
                              riotous or disorderly behaviours during working
                              hours at the establishment or any act subversive
                              of discipline
                            </li>
                            <li> habitual negligence or neglect of work</li>
                          </ul>
                        </li>
                        <li>
                          Apart from the above mentioned rules , any rules /
                          procedures framed by te Company from time to time will
                          be applicable to you from the date of your engagement
                          with Decathlon
                        </li>
                        <li>
                          Any image taken of you during a Decathlon event or
                          during a photo-shoot shall be the property of
                          Decathlon and you consent to Decathlon's use of the
                          such image in communication
                        </li>
                        <li>
                          You should note that any information and data
                          collected during the course of your internship should
                          be kept confidential at all times.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <br></br>
                  <p>
                    <b>We welcome you to the Decathlon Family!</b>
                  </p>
                </Modal.Body>
                <div className="mb-3">
                  <Row>
                    <Col>
                      <p>For {offerLetterData.companyName} Pvt. Ltd</p>
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
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default InternAppointmentLetter;
