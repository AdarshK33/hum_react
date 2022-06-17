import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button, Container } from "react-bootstrap";
import moment from "moment";
import { OfferContext } from "../../../context/OfferState";
import { OnBoardContext } from "../../../context/OnBoardState";
import ".././offers.css";

const InternAppointmentLetter = (props) => {
  const { createCandidateResponse, generateOfferLetter, offerLetterData } =
    useContext(OfferContext);
  const { generateCandidateLetter, candidateLetterData } =
    useContext(OnBoardContext);
  const [showLetter, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);
  const [previewClick, setPreviewClick] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    console.log(
      "inside intern appointment letter",
      candidateLetterData,
      props.previewLetter
    );
    if (props.previewLetter === true) {
      setShow(true);
      setPreviewClick(true);
    }
  }, [candidateLetterData]);
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
    <Container className="letterStyle">
      {
      // typeof candidateLetterData &&
      // candidateLetterData.internshipCandidateOffer !== undefined &&
      // candidateLetterData.internshipCandidateOffer !== null &&
      // Object.keys(candidateLetterData.internshipCandidateOffer).length !== 0 
      true? (
        <div className="appointmentLetter">
          <h4 className="text-center">Employment Contract</h4>
          <h5 className="text-center">
            {" "}
            Emp ID: {candidateLetterData.employeeId}
          </h5>
          <div>
          <p style={{ textAlign: "right" }}>Date: {moment().format("DD-MM-YYYY")}</p>
            <p className="float-left">To,</p>
          </div>
          <div className="mt-5 mb-5">
            <p>{candidateLetterData.candidateName}</p>
            <p>{candidateLetterData.address}</p>
            <p>{candidateLetterData.cityName}</p>
          </div>
          <p>
            Dear <b>{candidateLetterData.candidateName}</b>,
          </p>
          <p>
            We thank you for your interest in choosing Decathlon Sports India
            Pvt Ltd (DSIPL). We are in receipt of your application authorised by
            your institute/college/university to do an internship project on the
            topic <b>{candidateLetterData.internshipCandidateOffer.department == undefined?"":
            candidateLetterData.internshipCandidateOffer.department}</b>. As we believe your passion for sport and
            your values match those of our Company, we, at DSIPL, encourage
            academic aspirants to learn practical aspects of their academic
            curriculum. We are pleased to assign the project of your interest
            and we permit you to carry out the learning and we engage you as an
            intern for the period{" "}
            <b>
              {moment(
                candidateLetterData.internshipCandidateOffer.fromDate
              ).format("DD-MM-YYYY")}
            </b>{" "}
            to{" "}
            <b>
              {moment(
                candidateLetterData.internshipCandidateOffer.toDate
              ).format("DD-MM-YYYY")}
            </b>{" "}
            at our <b>{candidateLetterData.location}</b> location.
          </p>
          <p>
            Your fixed stipend would be INR.{" "}
            <b>{candidateLetterData.internshipCandidateOffer.stipend}</b> per month.
            This stipend is paid purely to manage your travel, record
            maintenance, project submission and any other unforeseen project
            related expenses. Further it is to be noted that DSIPL will not be
            in receipt of any professional service from you which might result
            in financial gain in the form of revenue or profits. Hence, this
            stipend is not to be treated as a wage in any form.
          </p>

          <p>
            We are pleased to offer internship programme for period of{" "}
            <b>
              {candidateLetterData.internshipCandidateOffer.internshipPeriod}
            </b>{" "}
            months from{" "}
            <b>{candidateLetterData.internshipCandidateOffer.fromDate}</b> to{" "}
            <b>{candidateLetterData.internshipCandidateOffer.toDate}</b> at{" "}
            <b>{candidateLetterData.companyName}</b> . You will be provided
            stipend <b>{candidateLetterData.internshipCandidateOffer.stipend}</b> per
            month.
          </p>

          <p>
            As mutually discussed, your engagement as as Intern is subject to
            the following:
          </p>
          <ol>
            <li>
              <b>{candidateLetterData.managerName}</b> will be responsible to
              mentor and guide you in this phase of your professional journey or
              any such manager assigned by the later.
            </li>
            <li>
              We at DSIPL strongly believe in your ability to manage yourself in
              the best interest of the Company. Fewer the rules better the
              productivity as far as we are concerned.
            </li>
            <li>
              3. We trust you will enjoy the stay with DSIPL and take the utmost
              autonomy to complete your Project and enhance the learnings.
              <ol type="i">
                <li>
                  We believe you will treat your team mates and customers with
                  utmost respect{" "}
                </li>
                <li>
                  We are bound by certain regulations by the Government of India
                  and our Group norms. You will be required to abide by all
                  these regulations* currently existing or any such rules that
                  might be incorporated from time to time{" "}
                </li>
                <li>
                  When you are happy being a part of the DSIPL family, we expect
                  you will be open to relocate to any location where the Company
                  currently has stores or may be established or any other Group
                  companies as deemed necessary{" "}
                </li>
                <li>
                  Your stipend components are strictly confidential and we
                  prefer you not share it with other team members{" "}
                </li>
                <li>
                  We hold transparency in high regard. You cannot involve
                  yourself in taking or giving bribe, gambling, theft,
                  fraudulent practices or any such act that might affect DSIPLs
                  reputation or damage to property{" "}
                </li>
                <li>
                  We at DSIPL, have a strict policy against sexual harassment.
                  We believe that you will not engage in any form of sexual
                  harassment towards any of the Company employees and the
                  Company's customers. DSIPL also ensures a safe environment to
                  all its employees and customers and strict action will be
                  taken against any offender, be it employee or customer{" "}
                </li>
                <li>
                  All documents submitted by you to the Company shall be
                  subjected to scrutiny by the appropriate authorities{" "}
                </li>
                <li>
                  In the event you feel you cannot be a part of our culture and
                  environment, kindly communicate your desire to depart at least
                  7 days in advance{" "}
                </li>
                <li>
                  In the event we find you have not abided by these, and other
                  regulations explained to you by your manager or if you do not
                  share the values of DSIPL, we shall communicate the
                  dis-continuance of this engagement with DSIPL to you at least
                  7 days in advance{" "}
                </li>
                <li>
                  x. However, your engagement will be subjected to immediate
                  termination on the following conditions:
                  <ul>
                    <li>
                      wilful in subordination or disobedience, whether alone or
                      in combination with others, to any lawful and reasonable
                      order of a superior
                    </li>
                    <li>
                      theft, fraud or dishonesty in connection with the
                      employers business or property
                    </li>
                    <li>
                      wilful damage to or loss of employers goods or property
                    </li>
                    <li>
                      taking or giving bribes or any illegal gratification
                    </li>
                    <li>
                      habitual absence without leave or absence without leave
                      for more than 10 days
                    </li>
                    <li>habitual late attendance</li>
                    <li>
                      habitual breach of any law applicable to the establishment
                    </li>
                    <li>
                      riotous or disorderly behaviours during working hours at
                      the establishment or any act subversive of discipline
                    </li>
                    <li> habitual negligence or neglect of work</li>
                  </ul>
                </li>
                <li>
                  Apart from the above mentioned rules , any rules / procedures
                  framed by te Company from time to time will be applicable to
                  you from the date of your engagement with Decathlon
                </li>
                <li>
                  Any image taken of you during a Decathlon event or during a
                  photo-shoot shall be the property of Decathlon and you consent
                  to Decathlon's use of the such image in communication
                </li>
                <li>
                  You should note that any information and data collected during
                  the course of your internship should be kept confidential at
                  all times.
                </li>
              </ol>
            </li>
          </ol>
          <br></br>
          <p>
            <b>We welcome you to the Decathlon Family!</b>
          </p>
          <div className="mb-3">

            {/* <Row>
              <Col>
                <p>For {candidateLetterData.companyName} Pvt. Ltd</p>
                <p>Authorised Signatory</p> */}
                {/* <button
                  className="signatureButtons"
                  onClick={() => addSignature()}
                >
                  Add Signature
                </button> */}
              {/* </Col>
              <Col style={{ textAlign: "end" }}>
                <p>Accepted By Me</p>
                <p>Employee Signature</p>
              </Col>

            </Row> */}
            
             <Row>
             <Col sm="8">
             <p>For {candidateLetterData.companyName} </p>
             </Col>
              <Col sm="4">
              <p> Accepted By Me</p>
              <p>{candidateLetterData !== undefined &&
          candidateLetterData.candidateName}
          </p>
              </Col>
              </Row>
              <Row>
             <Col sm="8">
             <p>Authorised Signatory</p>
             </Col>
              <Col sm="4">
              <p> Employee Signature</p>
              </Col>
              </Row>
          </div>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};

export default InternAppointmentLetter;
