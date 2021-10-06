import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Table,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import ".././offers.css";
import { OfferContext } from "../../../context/OfferState";
import moment from "moment";
import { OnBoardContext } from "../../../context/OnBoardState";
const PermanentOfferLetter = () => {
  const { createCandidateResponse, generateOfferLetter, offerLetterData } =
    useContext(OfferContext);
  const { generateCandidateLetter, candidateLetterData } =
    useContext(OnBoardContext);
  return (
    <Container className="letterStyle">
      {candidateLetterData && candidateLetterData.permanentCandidateOffer ? (
        <Fragment>
          <p className="offerHeader">OFFER LETTER</p>
          <p className="offerSubHeader">PRIVATE AND CONFIDENTIAL</p>
          <p className="offerSubHeader">
            Date: {moment().format("DD-MM-YYYY")}
          </p>
          <p>Dear {candidateLetterData.candidateName},</p>
          <p>
            We have the pleasure to offer you the position of{" "}
            <span className="boldText">{candidateLetterData.position}</span> on
            FullTime Basis, at {candidateLetterData.companyName} Pvt. Ltd.{" "}
          </p>
          <br></br>
          <p className="offerSubHeader">1. Terms & Conditions</p>
          <ol>
            <li>
              You will report to{" "}
              <span className="boldText">
                {candidateLetterData.managerName}
              </span>{" "}
              or any officer appointed by him/her on{" "}
              {moment(
                candidateLetterData.permanentCandidateOffer.effectiveDate
              ).format("DD-MM-YYYY")}
            </li>
            <li>
              Your monthly gross salary will not exceed Rs.{" "}
              <span className="boldText">
                {candidateLetterData.permanentCandidateOffer.grossSalary}
              </span>
              . Refer to the salary annexure mentioned below
            </li>
            <li>
              You may also receive a bonus on monthly basis and which would be
              to a maximum of {candidateLetterData.bonus} % of your monthly
              gross salary.Your manager will explain to you the calculation of
              such bonus
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
            <li>
              You will be on probation for a period of{" "}
              {candidateLetterData.probationPeriod} month(s) from the date of
              your appointment. On completion of the probation period, if the
              Company finds you to be suitable for the appointed post, your
              appointment shall be confirmed and communicated to you in writing
            </li>
          </ol>
          <p>For {candidateLetterData.companyName}</p>
          <br></br>
          <p>Thanking you</p>
          <p>Manager Name</p>

          <div>
            <p id="title" className="offerHeader">
              Salary Annexure
            </p>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th>Emoluments</th>
                  <th colSpan="2">CTC without Bonus</th>
                  <th colSpan="2">CTC with Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Per Month</td>
                  <td>Per Annum</td>
                  <td>Per Month</td>
                  <td>Per Annum</td>
                </tr>
                <tr>
                  <td>Fixed Gross </td>
                  <td>{Math.round(candidateLetterData.fixedGross)}</td>
                  <td>{Math.round(candidateLetterData.fixedGross * 12)}</td>
                  <td>
                    {Math.round(
                      candidateLetterData.fixedGross 
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.fixedGross  *
                        12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Basic Salary </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.basic
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.basic * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.basic
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.basic * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>House Rent Allowance </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.hra
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.hra * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.hra
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.hra * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Conveyance Allowance </td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td>Leave Travel Allowance</td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.lta
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.lta * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.lta
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.lta * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Medical Expense Reimbursement </td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td>Special Allowance </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer
                        .specialAllowance
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer
                        .specialAllowance * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer
                        .specialAllowance
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer
                        .specialAllowance * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Bonus @ maximum 20.0% </td>
                  <td>-</td>
                  <td>-</td>
                  <td>{Math.round(candidateLetterData.bonusAmt)}</td>
                  <td>{Math.round(candidateLetterData.bonusAmt * 12)}</td>
                </tr>
                <tr>
                  <td className="boldText">Gross Salary </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.grossSalary
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.grossSalary *
                        12
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.grossSalary + candidateLetterData.bonusAmt
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      (candidateLetterData.permanentCandidateOffer.grossSalary + candidateLetterData.bonusAmt) *
                        12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>PF </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerPF
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerPF *
                        12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerPF
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerPF *
                        12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Gratuity </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.gratuity
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.gratuity * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.gratuity
                    )}
                  </td>
                  <td>
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.gratuity * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Employer ESIC</td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerESIC
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerESIC
                    ) * 12}
                  </td>

                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerESIC
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.employerESIC
                    ) * 12}
                  </td>
                </tr>
                <tr>
                  <td>CTC </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.ctc
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.ctc * 12
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.ctc
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      candidateLetterData.permanentCandidateOffer.ctc
                    ) * 12}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Container>
  );
};

export default PermanentOfferLetter;
