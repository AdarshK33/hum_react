import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import PartTimeOfferLetter from "../Offers/partTimeOfferLetter";
import PermanentOfferLetter from "./permanentOfferLetter";
import { Link } from "react-router-dom";

const GenerateOfferLetter = () => {
  const [showModal, setShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);

  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
  } = useContext(OfferContext);

  const handleClose = () => setShow(false);

  const offerLetterClick = () => {
    console.log("offer candidate id", createCandidateResponse.candidateId);
    generateOfferLetter(createCandidateResponse.candidateId);
    console.log("offer letter response data", offerLetterData);

    handleShow();
  };
  const handleShow = () => {
    console.log("inside show moodal");
    // if (offerLetterData.length > 0) {
    setShow(true);
    console.log("offer letter response", offerLetterData);
    // }
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
    console.log("offer letter response sig", offerLetterData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const submitOfferLetter = () => {
    setSubmitLetter(true);
    setLetterSent(true);
    setShow(true);
  };

  const previewOfferLetter = () => {
    setSubmitLetter(false);
    setPreviewLetter(true);
    setShow(true);
  };
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        {!saveLetter ? (
          <Row>
            <Col sm={5}></Col>
            <Col sm={2}>
              <Button type="button" onClick={offerLetterClick}>
                Generate Offer Letter
              </Button>
            </Col>
          </Row>
        ) : (
          <div className="preview-section">
            <Button type="button" onClick={previewOfferLetter}>
              Preview Offer Letter
            </Button>
            <br></br>
            <br></br>
            <img src={calendarImage} alt="calendar" width="200px" />
            <br></br>
            <br></br>
            {letterSent ? (
              ""
            ) : (
              <Button
                type="button"
                onClick={submitOfferLetter}
                style={{ textAlign: "center" }}
              >
                Submit
              </Button>
            )}
          </div>
        )}
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body>
            <div className="offer-letter-message">
              <p className="signature-text">Offer Letter Sent to Candidate</p>
              <br></br>
              <Link to="/offer-release-list">
                <Button type="button" onClick={handleClose}>
                  close
                </Button>
              </Link>
            </div>
          </Modal.Body>
        ) : previewLetter || showModal ? (
          <Modal.Body>
            {/* <p>[Your Company's Name]</p>
            <p>[Street Address]</p>
            <p>[City, State Zip Code]</p>
            <p>[Phone Number]</p>
            <br></br>
            <p>[Date]</p>
            <br></br>
            <p>[Recipient Name]</p>
            <p>[Street Address]</p>
            <p>[City, State Zip Code]</p>
            <p>[Phone Number]</p>
            <br></br>
            <p>Dear [Name of Recipient],</p>
            <br></br>
            <p>
              [Introduction - State the company's name and extend them a job.
              Give them details about the position and their department.]
            </p>
            <br></br>
            <p>
              [Let them know what they get if they accept the job. This would
              include salary, benefits, bonuses, stocks, etc. Identify a start
              date.]
            </p>
            <br></br>
            <p>
              [Let them know by what date they need to respond to the offer and
              when their hire date is.]
            </p>
            <br></br>
            <p>
              [Let them know to whom they will report and whom to call if any
              questions arise.]
            </p>
            <br></br>
            <p>Sincerely,</p>
            <br></br>
            <br></br>
            <p>(Sign here for letters sent by mail or fax)</p>
            <br></br>
            <br></br>
            <p>
              [Your Name(or the name of the person who is doing the hiring)]
            </p>
            <br></br>
            <p>[Title - if applicable]</p> */}
            {offerLetterData.contractType === "permanent" ? (
              <PermanentOfferLetter />
            ) : (
              <PartTimeOfferLetter />
            )}
            <br></br>
            <Row>
              <Col sm={6}>
                <p>Thanking you</p>
                <p>{offerLetterData.managerName}</p>
              </Col>
              <Col sm={6}>
                {showSignature ? (
                  <img
                    src={calendarImage}
                    alt="calendar"
                    width="50px"
                    className="digital-signature"
                  />
                ) : (
                  <>
                    <p className="signature-text">Your signature</p>
                    <Button variant="primary" onClick={digitalSignature}>
                      Add digital signature
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            {showSignature && !previewLetter ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <Button variant="primary" onClick={saveOfferLetter}>
                    Save Changes
                  </Button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </Fragment>
  );
};

export default GenerateOfferLetter;
