import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "../Offers/offers.css";
import { OfferContext } from "../../context/OfferState";
import PartTimeOfferLetter from "../Offers/partTimeOfferLetter";
import PermanentOfferLetter from "../Offers/permanentOfferLetter";
import InternOfferLetter from "../Offers/internOfferLetter";
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
    finalSubmitOfferLetter,
    candidateData,
  } = useContext(OfferContext);

  const handleClose = () => setShow(false);

  const offerLetterClick = () => {
    generateOfferLetter(candidateData.candidateInformation.candidateId);
    handleShow();
  };
  const handleShow = () => {
    setShow(true);
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const submitOfferLetter = () => {
    setSubmitLetter(true);
    setLetterSent(true);
    setShow(true);
    finalSubmitOfferLetter(createCandidateResponse.candidateId);
  };

  const previewOfferLetter = () => {
    generateOfferLetter(createCandidateResponse.candidateId);
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

      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        {submitLetter ? (
          <Modal.Body>
            <div className="offer-letter-message ">
              <p className="signature-text">Offer Letter Sent to Candidate</p>
              <br></br>
              <Link to="/offer-release-list" className="text-center">
                <Button type="button" onClick={handleClose}>
                  Close
                </Button>
              </Link>
            </div>
          </Modal.Body>
        ) : previewLetter || showModal ? (
          <Modal.Body>
            {offerLetterData &&
            offerLetterData.contractType !== undefined &&
            offerLetterData.contractType !== null &&
            offerLetterData.contractType === "Permanent" ? (
              <PermanentOfferLetter />
            ) : offerLetterData &&
              offerLetterData.contractType !== undefined &&
              offerLetterData.contractType !== null &&
              offerLetterData.contractType === "Parttime" ? (
              <PartTimeOfferLetter />
            ) : (
              <InternOfferLetter />
            )}
            <br></br>
            <Row>
              <Col sm={6}>
                <p>Thanking you</p>
                <p>{offerLetterData.managerName}</p>
              </Col>
              <Col sm={6} className="signature-center-text">
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
