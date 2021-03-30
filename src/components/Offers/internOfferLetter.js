import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";

const InternOfferLetter = () => {
  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
  } = useContext(OfferContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {typeof offerLetterData &&
      offerLetterData.internshipCandidateOffer !== undefined ? (
        <Fragment>
          <p className="offerHeader">OFFER LETTER</p>
          <br></br>
          <p className="offerSubHeader">PRIVATE AND CONFIDENTIAL</p>

          <p className="offerSubHeader">
            Date: {moment().format("DD-MM-YYYY")}
          </p>

          <p>Dear {offerLetterData.candidateName},</p>

          <p>
            We are pleased to offer internship programme for period of{" "}
            {offerLetterData.internshipCandidateOffer.internshipPeriod} months
            from {offerLetterData.internshipCandidateOffer.fromDate} to{" "}
            {offerLetterData.internshipCandidateOffer.toDate} at{" "}
            {offerLetterData.companyName} Pvt. Ltd. You will be provided stipend{" "}
            {offerLetterData.internshipCandidateOffer.stipend} per month.
          </p>

          <p>
            You should note that any information and data collected during the
            course of your internship should be kept confidential at all times.
          </p>
          <br></br>
          <p>For {offerLetterData.companyName} Pvt. Ltd</p>
          <br></br>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default InternOfferLetter;
