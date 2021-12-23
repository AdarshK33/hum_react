import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button, Container } from "react-bootstrap";
import moment from "moment";
import ".././offers.css";
import { OfferContext } from "../../../context/OfferState";
import { OnBoardContext } from "../../../context/OnBoardState";

const InternOfferLetter = () => {
  const { createCandidateResponse, generateOfferLetter, offerLetterData } =
    useContext(OfferContext);
  const { generateCandidateLetter, candidateLetterData } =
    useContext(OnBoardContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Container className="letterStyle">
      {typeof candidateLetterData &&
      candidateLetterData.internshipCandidateOffer !== undefined ? (
        <Fragment>
          <p className="offerHeader">OFFER OF ENGAGEMENT</p>
          <br></br>
          <p className="offerSubHeader">PRIVATE AND CONFIDENTIAL</p>

          <p className="offerSubHeader">
            Date: {moment().format("DD-MM-YYYY")}
          </p>

          <p>Dear {candidateLetterData.candidateName},</p>

          <p>
            We are pleased to offer internship programme for period of{" "}
            {candidateLetterData.internshipCandidateOffer.internshipPeriod}{" "}
            months from{" "}
            {moment(
              candidateLetterData.internshipCandidateOffer.fromDate
            ).format("DD-MM-YYYY")}{" "}
            to{" "}
            {moment(candidateLetterData.internshipCandidateOffer.toDate).format(
              "DD-MM-YYYY"
            )}{" "}
            at {candidateLetterData.companyName} Pvt. Ltd. You will be provided
            stipend {candidateLetterData.internshipCandidateOffer.stipend} per
            month.
          </p>

          <p>
            You should note that any information and data collected during the
            course of your internship should be kept confidential at all times.
          </p>
          <br></br>
          <p>For {candidateLetterData.companyName} Pvt. Ltd</p>
          <br></br>
          <br></br>
          <p>Thanking you</p>
          <p>Manager Name</p>
        </Fragment>
      ) : (
        ""
      )}
    </Container>
  );
};

export default InternOfferLetter;
