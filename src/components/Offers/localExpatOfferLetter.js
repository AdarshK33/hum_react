import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Table, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import moment from "moment";

const LocalExpatOfferLetter = () => {
  const { createCandidateResponse, generateOfferLetter, offerLetterData } =
    useContext(OfferContext);

  return (
    <Fragment>
      {offerLetterData && offerLetterData.permanentCandidateOffer ? (
        <Fragment>
          <p className="offerHeader">OFFER LETTER</p>
          <p className="offerSubHeader">PRIVATE AND CONFIDENTIAL</p>
          <p className="offerSubHeader">
            Date: {moment().format("DD-MM-YYYY")}
          </p>
          <p>Dear {offerLetterData.candidateName},</p>
          <p>
            We have the pleasure to offer you the position of{" "}
            <span className="boldText">{offerLetterData.position}</span> on
            FullTime Basis, at {offerLetterData.companyName} Pvt. Ltd.{" "}
          </p>
          <br></br>
          <p className="offerSubHeader">1. Terms & Conditions</p>
          <ol>
            <li>
              You will report to{" "}
              <span className="boldText">{offerLetterData.managerName}</span> or
              any officer appointed by him/her on{" "}
              {moment(
                offerLetterData.permanentCandidateOffer.effectiveDate
              ).format("DD-MM-YYYY")}
            </li>
            <li>
              Your monthly gross salary will not exceed Rs.{" "}
              <span className="boldText">
                {offerLetterData.permanentCandidateOffer.grossSalary}
              </span>
              . Refer to the salary annexure mentioned below
            </li>
            <li>
              You may also receive a bonus on monthly basis and which would be
              to a maximum of {offerLetterData.bonus} % of your monthly gross
              salary.Your manager will explain to you the calculation of such
              bonus
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
              {offerLetterData.probationPeriod} month(s) from the date of your
              appointment. On completion of the probation period, if the Company
              finds you to be suitable for the appointed post, your appointment
              shall be confirmed and communicated to you in writing
            </li>
          </ol>
          <p>For {offerLetterData.companyName}</p>
          <br></br>
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
                  <td>{offerLetterData.fixedGross}</td>
                  <td>{offerLetterData.fixedGross * 12}</td>
                  <td>
                    {offerLetterData.fixedGross }
                  </td>
                  <td>
                    {offerLetterData.fixedGross *
                      12}
                  </td>
                </tr>
                <tr>
                  <td>Basic Salary </td>
                  <td>{offerLetterData.permanentCandidateOffer.basic}</td>
                  <td>{offerLetterData.permanentCandidateOffer.basic * 12}</td>
                  <td>{offerLetterData.permanentCandidateOffer.basic}</td>
                  <td>{offerLetterData.permanentCandidateOffer.basic * 12}</td>
                </tr>
                <tr>
                  <td>House Rent Allowance </td>
                  <td>{offerLetterData.permanentCandidateOffer.hra}</td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.hra * 12
                    )}
                  </td>
                  <td>
                    {Math.round(offerLetterData.permanentCandidateOffer.hra)}
                  </td>
                  <td>{offerLetterData.permanentCandidateOffer.hra * 12}</td>
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
                    {Math.round(offerLetterData.permanentCandidateOffer.lta)}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.lta * 12
                    )}
                  </td>
                  <td>
                    {Math.round(offerLetterData.permanentCandidateOffer.lta)}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.lta * 12
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
                      offerLetterData.permanentCandidateOffer.specialAllowance
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.specialAllowance *
                        12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.specialAllowance
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.specialAllowance *
                        12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Bonus @ maximum 20.0% </td>
                  <td>-</td>
                  <td>-</td>
                  <td>{Math.round(offerLetterData.bonusAmt)}</td>
                  <td>{Math.round(offerLetterData.bonusAmt * 12)}</td>
                </tr>
                <tr>
                  <td className="boldText">Gross Salary </td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.grossSalary
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.grossSalary * 12
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.grossSalary + offerLetterData.bonusAmt
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      (offerLetterData.permanentCandidateOffer.grossSalary + offerLetterData.bonusAmt) * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>PF </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerPF
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerPF * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerPF
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerPF * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Gratuity </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.gratuity
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.gratuity * 12
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.gratuity
                    )}
                  </td>
                  <td>
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.gratuity * 12
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Employer ESIC</td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerESIC
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerESIC
                    ) * 12}
                  </td>

                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerESIC
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.employerESIC
                    ) * 12}
                  </td>
                </tr>
                <tr>
                  <td>CTC </td>
                  <td className="boldText">
                    {Math.round(offerLetterData.permanentCandidateOffer.ctc)}
                  </td>
                  <td className="boldText">
                    {Math.round(
                      offerLetterData.permanentCandidateOffer.ctc * 12
                    )}
                  </td>
                  <td className="boldText">
                    {Math.round(offerLetterData.permanentCandidateOffer.ctc)}
                  </td>
                  <td className="boldText">
                    {Math.round(offerLetterData.permanentCandidateOffer.ctc) *
                      12}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <p>
            <span style={{ color: "red" }}>*</span> The teammates from countries
            with whom India does not have a Social Security Agreement (the
            countries not mentioned in the list on
            https://www.epfindia.gov.in/site_en/International_workers.php are
            counties with whom India does not have a Social Security Agreement)
            can withdraw their Provident Fund amount only after attaining the
            age of 58 years (retirement age as fixed by the Government of
            India).
          </p>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default LocalExpatOfferLetter;
