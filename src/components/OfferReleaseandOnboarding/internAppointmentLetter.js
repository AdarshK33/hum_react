import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import "../Offers/offers.css";
import { OfferContext } from "../../context/OfferState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const InternAppointmentLetter = (props) => {
  const {
    generateOfferLetter,
    offerLetterData,
    candidateData,
    finalSubmitAppointmentLetter,
    submitAppointmentLetter,
    loader,
    lettterview,
    setViewLetter,
  } = useContext(OfferContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
  };
  console.log("candidateDatacandidateData", candidateData);
  const HandleSaveLetter = () => {
    // setSaveLetter(true);
    if (candidateData && Object.keys(candidateData).length) {
      finalSubmitAppointmentLetter(
        candidateData.candidateInformation.candidateId
      );
      console.log("HandleSaveLetter");
      const infoData = {
        inputRef: inputRef,
        empId: 0,
        candidateId: candidateData.candidateInformation.candidateId,
        module: "Appointment",
        empName: fetchemployeeData.firstName + " " + fetchemployeeData.lastName,
        empEmail: fetchemployeeData.email,
        empPhNo: fetchemployeeData.phone,
        history: history,
        path: "../offer-release-list",
        recipient2: {
          rectangle: "430,190,580,290",
          name:
            candidateData.candidateInformation.firstName +
            " " +
            candidateData.candidateInformation.lastName,
          email:candidateData.candidateInformation.personalEmail,
          phoneNumber: candidateData.candidateInformation.empPhNo,
        },
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,190,185,290");
      setViewLetter(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {typeof offerLetterData &&
      offerLetterData.internshipCandidateOffer !== undefined &&
      offerLetterData.internshipCandidateOffer !== null &&
      Object.keys(offerLetterData.internshipCandidateOffer).length !== 0 ? (
        <Modal show={lettterview} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {loader ? (
              <div
                className="loader-box loader"
                style={{ width: "100% !important" }}
              >
                <div className="loader">
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                </div>
              </div>
            ) : (
              <div ref={inputRef}>
                <h4 style={{ textAlign: "center" }}>Letter of Engagement</h4>
                <h5 style={{ textAlign: "center" }}>
                  {" "}
                  Emp ID: {offerLetterData.employeeId}
                </h5>
                <br />
                <p style={{ textAlign: "right" }}>Date: {moment().format("DD-MM-YYYY")}</p>
                <p>To,</p>
                <p>{offerLetterData.candidateName}</p>
                <p>{offerLetterData.address}</p>
                <p>{offerLetterData.cityName}</p>
                <br />
                <p>
                  Dear <b>{offerLetterData.candidateName}</b>,
                </p>
                <p>
                  We thank you for your interest in choosing{" "}
                  {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                    ? "DSIPL"
                    : offerLetterData.companyName}{" "}
                  . We are in receipt of your application authorised by your
                  institute/college/university to do an internship project on
                  the topic{" "}
                  <b>{offerLetterData.internshipCandidateOffer.department}</b>.
                  As we believe your passion for sport and your values match
                  those of our Company, we, at{" "}
                  {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                    ? "DSIPL"
                    : offerLetterData.companyName}{" "}
                  , encourage academic aspirants to learn practical aspects of
                  their academic curriculum. We are pleased to assign the
                  project of your interest and we permit you to carry out the
                  learning and we engage you as an{" "}
                  <b>intern</b> for the period{" "}
                  <b>
                    {moment(
                      offerLetterData.internshipCandidateOffer.fromDate
                    ).format("DD-MM-YYYY")}
                  </b>{" "}
                  to{" "}
                  <b>
                    {moment(
                      offerLetterData.internshipCandidateOffer.toDate
                    ).format("DD-MM-YYYY")}
                  </b>{" "}
                  at our <b>{offerLetterData.location}</b> location.
                </p>
                <p>
                  Your fixed stipend would be INR.{" "}
                  <b>{offerLetterData.internshipCandidateOffer.stipend}</b> per{" "}
                  <b>month</b>. This stipend is paid purely to manage your
                  travel, record maintenance, project submission and any other
                  unforeseen project related expenses. Further it is to be noted
                  that{" "}
                  {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                    ? "DSIPL"
                    : offerLetterData.companyName}{" "}
                  will not be in receipt of any professional service from you
                  which might result in financial gain in the form of revenue or
                  profits. Hence, this stipend is not to be treated as a wage in
                  any form.
                </p>

                {/* <p>
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
                    at <b>{offerLetterData.companyName}</b> Pvt. Ltd. You will be
                    provided stipend{" "}
                    <b>{offerLetterData.internshipCandidateOffer.stipend}</b> per
                    month.
                  </p> */}

                <p>
                  As mutually discussed, your engagement as as Intern is subject
                  to the following:
                </p>
                <ol>
                  <li>
                    {" "}
                    You would be eligible for an accidental insurance, which
                    would be communicated to you by your manager within 45 days
                    from the date of your joining.
                  </li>
                  <li>
                    <b>{offerLetterData.managerName}</b> will be responsible to
                    mentor and guide you in this phase of your professional
                    journey or any such manager assigned by the later.
                  </li>
                  <li>
                    We at{" "}
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "DSIPL"
                      : offerLetterData.companyName}{" "}
                    strongly believe in your ability to manage yourself in the
                    best interest of the Company. Fewer the rules better the
                    productivity as far as we are concerned.
                  </li>
                  <li>
                    We trust you will enjoy the stay with{" "}
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "DSIPL"
                      : offerLetterData.companyName}{" "}
                    and take the utmost autonomy to complete your Project and
                    enhance the learnings.
                    <ol type="i">
                      <li>
                        We believe you will treat your team mates and customers
                        with utmost respect{" "}
                      </li>
                      <li>
                        We are bound by certain regulations by the Government of
                        India and our Group norms. You will be required to abide
                        by all these regulations* currently existing or any such
                        rules that might be incorporated from time to time{" "}
                      </li>
                      <li>
                        When you are happy being a part of the{" "}
                        {offerLetterData.companyName ===
                        "Decathlon Sports India Pvt Ltd"
                          ? "DSIPL"
                          : offerLetterData.companyName}{" "}
                        family, we expect you will be open to relocate to any
                        location where the Company currently has stores or may
                        be established or any other Group companies as deemed
                        necessary{" "}
                      </li>
                      <li>
                        Your stipend components are strictly confidential and we
                        prefer you not share it with other team members{" "}
                      </li>
                      <li>
                        We hold transparency in high regard. You cannot involve
                        yourself in taking or giving bribe, gambling, theft,
                        fraudulent practices or any such act that might affect
                        DSIPLs reputation or damage to property{" "}
                      </li>
                      <li>
                        We at{" "}
                        {offerLetterData.companyName ===
                        "Decathlon Sports India Pvt Ltd"
                          ? "DSIPL"
                          : offerLetterData.companyName}
                        , have a strict policy against sexual harassment. We
                        believe that you will not engage in any form of sexual
                        harassment towards any of the Company employees and the
                        Company's customers.{" "}
                        {offerLetterData.companyName ===
                        "Decathlon Sports India Pvt Ltd"
                          ? "DSIPL"
                          : offerLetterData.companyName}{" "}
                        also ensures a safe environment to all its employees and
                        customers and strict action will be taken against any
                        offender, be it employee or customer{" "}
                      </li>
                      <li>
                        All documents submitted by you to the Company shall be
                        subjected to scrutiny by the appropriate authorities{" "}
                      </li>
                      <li>
                        In the event you feel you cannot be a part of our
                        culture and environment, kindly communicate your desire
                        to depart at least 7 days in advance{" "}
                      </li>
                      <li>
                        In the event we find you have not abided by these, and
                        other regulations explained to you by your manager or if
                        you do not share the values of{" "}
                        {offerLetterData.companyName ===
                        "Decathlon Sports India Pvt Ltd"
                          ? "DSIPL"
                          : offerLetterData.companyName}
                        , we shall communicate the dis-continuance of this
                        engagement with{" "}
                        {offerLetterData.companyName ===
                        "Decathlon Sports India Pvt Ltd"
                          ? "DSIPL"
                          : offerLetterData.companyName}{" "}
                        to you at least 7 days in advance{" "}
                      </li>
                      <li>
                         However, your engagement will be subjected to
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
                            taking or giving bribes or any illegal gratification
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
                            hours at the establishment or any act subversive of
                            discipline
                          </li>
                          <li> habitual negligence or neglect of work</li>
                          <li>
                            unauthorised strike of work or inciting others to
                            strike work in contravention of the provision of any
                            law, or rule having the force of law.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Apart from the above mentioned rules , any rules /
                        procedures framed by the Company from time to time will
                        be applicable to you from the date of your engagement
                        with Decathlon
                      </li>
                      {/* <li>
                          Any image taken of you during a Decathlon event or
                          during a photo-shoot shall be the property of
                          Decathlon and you consent to Decathlon's use of the
                          such image in communication
                        </li>
                        <li>
                          You should note that any information and data
                          collected during the course of your internship should
                          be kept confidential at all times.
                        </li> */}
                      <li>
                        You’re learning progress will be evaluated on a
                        quarterly basis by your leader/ mentor and shall be
                        discussed with you for further guidance etc.
                      </li>
                    </ol>
                  </li>
                </ol>
                <br></br>
                <p>
                  <b>
                    We welcome you to the{" "}
                    {offerLetterData.companyName === "Decathlon Sports India Pvt Ltd"
                      ? "Decathlon"
                      : offerLetterData.companyName}{" "}
                    Family!
                  </b>
                </p>
                <div style={{ marginLeft: "2rem" }}>
                  {/* stylings are not accepting by html to pdf */}
                  <p>
                    For {offerLetterData.companyName}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    &nbsp; Accepted By Me
                  </p>
                </div>
                <div style={{ marginLeft: "3rem" }}>
                  <p>
                    Authorised Signatory
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Employee Signature
                  </p>
                </div>
              </div>
            )}
            {!loader ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default InternAppointmentLetter;
