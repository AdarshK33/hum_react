import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import PartTimeOfferLetter from "../Offers/partTimeOfferLetter";
import PermanentOfferLetter from "./permanentOfferLetter";
import InternOfferLetter from "./internOfferLetter";
import { Link } from "react-router-dom";

const ViewOfferLetter = () => {
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
    candidateData,
    finalSubmitOfferLetter,
  } = useContext(OfferContext);

  const handleClose = () => setShow(false);

  useEffect(() => {
    let candidateRefData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation;
    console.log("view candidateRefData", candidateRefData);
    // generateOfferLetter(candidateRefData.candidateId);
  }, [candidateData]);

  const offerLetterClick = () => {
    let candidateRefData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.candidateInformation;
    console.log("view offer candidate id", candidateData);
    generateOfferLetter(candidateRefData.candidateId);
    console.log("offer letter response data", offerLetterData);
    handleShow();
  };
  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
    console.log("offer letter response", offerLetterData);
  };

  const digitalSignature = () => {
    setShowSignature(true);
    console.log("offer letter response sig", offerLetterData);
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={5}></Col>
          <Col sm={2}>
            <Button type="button" onClick={offerLetterClick}>
              Preview Offer Letter
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal show={showModal} onHide={handleClose} size="lg">
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
            {}
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
                    <Button
                      disabled
                      variant="primary"
                      onClick={digitalSignature}
                    >
                      Add digital signature
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </Fragment>
  );
};

export default ViewOfferLetter;
