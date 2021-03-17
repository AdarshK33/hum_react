import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";

const PartTimeOfferLetter = () => {
  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
  } = useContext(OfferContext);
  //   console.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {typeof offerLetterData.partTimeCandidateOffer !== "undefined" ? (
        <Fragment>
          <p className="offerHeader">OFFER LETTER</p>
          <br></br>
          <p className="offerSubHeader">PRIVATE AND CONFIDENTIAL</p>
          <br></br>
          <p className="offerSubHeader">
            Date: {moment().format("DD-MM-YYYY")}
          </p>
          <br></br>
          <p>Dear {offerLetterData.candidateName},</p>
          <br></br>
          <p>
            We have the pleasure to offer you the position of{" "}
            <span className="boldText">{offerLetterData.position}</span> on
            Part-Time Basis at Decathlon Sports India Pvt. Ltd.{" "}
          </p>
          <br></br>
          <p className="offerSubHeader">1. Terms & Conditions</p>
          <ol>
            <li>
              You will report to{" "}
              <span className="boldText">{offerLetterData.managerName}</span> or
              any officer appointed by him/her on{" "}
              {offerLetterData.partTimeCandidateOffer.effectiveDate}
            </li>
            <li>
              Your gross salary will not exceed{" "}
              <span className="boldText">
                {offerLetterData.partTimeCandidateOffer.rate}
              </span>
              (INR. One Hundred and Twenty) per Hourly
            </li>
            <li>
              You may also receive a bonus on monthly basis and which would be
              to a maximum of 20.0 % of your monthly gross salary.Your manager
              will explain to you the calculation of such bonus
            </li>
            <li>
              Please note that salary and bonus payments are made based on
              individual merits and therefore such matters should be kept
              strictly confidential to yourself only
            </li>
            <li>
              Changes in your compensation are subject to the discretion of the
              Company and will be subject to and be on the basis of your
              effective performance and results during your employment and other
              relevant criteria
            </li>
          </ol>
          <p>
            Also, please sign the duplicate of this offer as your acceptance and
            forward the same to us.
          </p>
          <br></br>
          <p>For Prodin Sporting Pvt Ltd</p>
          <br></br>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PartTimeOfferLetter;
