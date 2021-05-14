import React, { Fragment, useState, useContext, useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { OfferContext } from "../../../context/OfferState";
import { CandidateContext } from "../../../context/CandidateState";
import { OnBoardContext } from "../../../context/OnBoardState";

const AcceptModal = (props) => {
  const { candidateAcceptOffer, offerAcceptData } = useContext(
    CandidateContext
  );
  const { viewCandidateId, candidateData } = useContext(OfferContext);
  const { CandidateProfile, candidateProfileData } = useContext(OnBoardContext);
  let history = useHistory();
  useEffect(() => {
    CandidateProfile();
  }, []);
  const goToFom = () => {
    console.log(
      "candidateProfileData.candidateId",
      candidateProfileData.candidateId
    );
    candidateAcceptOffer(candidateProfileData.candidateId);
    history.push("./onboard");
  };
  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>
        <Container style={{ textAlign: "center", margin: "4rem 0 4rem 0" }}>
          <Modal.Body>
            <h6 style={{ marginBottom: "1rem" }}>
              Thank you for Accepting the Offer Letter
            </h6>
            <Button onClick={goToFom}>Let's get Started</Button>
          </Modal.Body>
        </Container>
      </Modal>
    </Fragment>
  );
};

export default AcceptModal;
