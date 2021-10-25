import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import PartTimeOfferLetter from "../Offers/partTimeOfferLetter";
import PermanentOfferLetter from "./permanentOfferLetter";
import InternOfferLetter from "./internOfferLetter";
import LocalExpatOfferLetter from "./localExpatOfferLetter";
import { Link } from "react-router-dom";

const ViewOfferLetter = () => {
  const [showModal, setShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [offerButtonEnable, setOfferButtonEnable] = useState(false);
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
  useEffect(() => {
    console.log("candidateData useeffect", candidateData);
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      Object.keys(candidateData).length !== 0 &&
      candidateData.candidateInformation !== null &&
      candidateData.candidateInformation !== undefined &&
      Object.keys(candidateData.candidateInformation).length !== 0 &&
      candidateData.workInformation !== "" &&
      candidateData.workInformation !== null &&
      candidateData.workInformation !== undefined &&
      Object.keys(candidateData.workInformation).length !== 0 &&
      candidateData.remuneration !== null &&
      candidateData.remuneration !== undefined &&
      Object.keys(candidateData.remuneration).length !== 0
    ) {
      setOfferButtonEnable(true);
    } else {
      setOfferButtonEnable(false);
    }
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
      {offerButtonEnable === true ? (
        <Fragment>
          <Form>
            <Row>
              <Col sm={4}></Col>
              <Col sm={5}>
                <p>Documents are available in Document Managenment</p>
                {/* <Button type="button" onClick={offerLetterClick}>
                  Preview Offer Letter
                </Button> */}
              </Col>
            </Row>
          </Form>

          <Modal show={showModal} onHide={handleClose} size="md">
            <Modal.Header closeButton className="modal-line"></Modal.Header>
            {submitLetter ? (
              <Modal.Body>
                <div className="offer-letter-message ">
                  <p className="signature-text">
                    Offer Letter Sent to Candidate
                  </p>
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
                offerLetterData.contractType === "Fulltime" ? (
                  <PermanentOfferLetter />
                ) : offerLetterData &&
                  offerLetterData.contractType !== undefined &&
                  offerLetterData.contractType !== null &&
                  offerLetterData.contractType === "Parttime" ? (
                  <PartTimeOfferLetter />
                ) : offerLetterData &&
                  offerLetterData.contractType !== undefined &&
                  offerLetterData.contractType !== null &&
                  offerLetterData.contractType === "Local Expat" ? (
                  <LocalExpatOfferLetter />
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
                    {/* {showSignature ? (
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
                )} */}

                    <>
                      <p className="signature-text">Your signature</p>
                      <img
                        src={calendarImage}
                        alt="calendar"
                        width="50px"
                        className="digital-signature"
                      />
                    </>
                  </Col>
                </Row>
              </Modal.Body>
            ) : (
              ""
            )}
          </Modal>
        </Fragment>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>
          Please check all the details to preview offer letter
        </p>
      )}
    </Fragment>
  );
};

export default ViewOfferLetter;
