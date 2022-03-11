import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const LocalExpatOfferLetter = () => {
  const {
    createCandidateResponse,
    generateOfferLetter,
    offerLetterData,
    loader,
    finalSubmitOfferLetter,
    candidateData,
    number2text,
    setViewLetter,
  } = useContext(OfferContext);
  const { user } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
    // setLetterView(false);
  };

  const HandleSaveLetter = () => {
    // setSaveLetter(true);
    if (candidateData && Object.keys(candidateData).length) {
      finalSubmitOfferLetter(candidateData.candidateInformation.candidateId);

      const infoData = {
        inputRef: inputRef,
        empId: 0,
        candidateId: candidateData.candidateInformation.candidateId,
        module: "Offer and On Boarding",
        empName: user.firstName + " " + user.lastName,
        empEmail: "amit.kumar@qsometech.com",
        empPhNo: user.phone,
        history: history,
        path: "../offer-release-list",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,220,185,320", true);
      setShow(false);
      setViewLetter(false);
    }
  };

  return (
    <Fragment>
      {typeof offerLetterData !== undefined &&
      offerLetterData.permanentCandidateOffer !== undefined ? (
        // {true ? (
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {loader ? (
              <div
                className="loader-box loader"
                style={{ width: "100% !important" }}
              >
                <div className="loader">
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                </div>
              </div>
            ) : (
              <div ref={inputRef}>
                <p
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  <b>OFFER LETTER</b>
                </p>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  <b>PRIVATE AND CONFIDENTIAL</b>
                </p>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  <b>Date: {moment().format("DD-MM-YYYY")}</b>
                </p>
                <p>Dear {offerLetterData.candidateName},</p>
                <p>
                  We have the pleasure to offer you the position of{" "}
                  <b>{offerLetterData.position}</b> on Full-Time Basis, at{" "}
                  {offerLetterData.companyName} Pvt. Ltd.{" "}
                </p>
                <br></br>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  <b>1. Terms & Conditions </b>
                </p>
                <ol>
                  <li>
                    You will report to <b>{offerLetterData.managerName}</b> or
                    any officer appointed by him/her on{" "}
                    {moment(
                      offerLetterData.permanentCandidateOffer.effectiveDate
                    ).format("DD-MM-YYYY")}
                  </li>
                  <li>
                    Your monthly gross salary will not exceed $.{" "}
                    <b>{offerLetterData.permanentCandidateOffer.grossSalary}</b>
                    (INR.{" "}
                    {number2text(
                      parseInt(
                        offerLetterData.permanentCandidateOffer.grossSalary
                      )
                    )}
                    ) . Refer to the salary annexure mentioned below
                  </li>
                  <li>
                    You may also receive a bonus on monthly basis and which
                    would be to a maximum of {offerLetterData.bonus} % of your
                    monthly gross salary.Your manager will explain to you the
                    calculation of such bonus
                  </li>
                  <li>
                    Please note that salary and bonus payments are made based on
                    individual merits and therefore such matters should be kept
                    strictly confidential to yourself only
                  </li>
                  <li>
                    Changes in your compensation are subject to the discretion
                    of the Company and will be subject to and be on the basis of
                    your effective performance and results during your
                    employment and other relevant criteria
                  </li>
                  <li>
                    You will be on probation for a period of{" "}
                    {offerLetterData.probationPeriod} month(s) from the date of
                    your appointment. On completion of the probation period, if
                    the Company finds you to be suitable for the appointed post,
                    your appointment shall be confirmed and communicated to you
                    in writing
                  </li>
                </ol>
                <p>For {offerLetterData.companyName} Pvt Ltd</p>
                <br></br>
                <p>Thanking you</p>
                <p>Manager Name :{offerLetterData.managerName}</p>

                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                  class="pdf-pagebreak-before"
                >
                  <b>Salary Annexure</b>
                </p>
                <Table
                  bordered
                  size="sm"
                  data-pdfmake="{'widths':[220,60,60,60,60]}"
                >
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
                      <td>{offerLetterData.fixedGross}</td>
                      <td>{offerLetterData.fixedGross * 12}</td>
                    </tr>
                    <tr>
                      <td>Basic Salary </td>
                      <td>{offerLetterData.permanentCandidateOffer.basic}</td>
                      <td>
                        {offerLetterData.permanentCandidateOffer.basic * 12}
                      </td>
                      <td>{offerLetterData.permanentCandidateOffer.basic}</td>
                      <td>
                        {offerLetterData.permanentCandidateOffer.basic * 12}
                      </td>
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
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra
                        )}
                      </td>
                      <td>
                        {offerLetterData.permanentCandidateOffer.hra * 12}
                      </td>
                    </tr>
                    {/* <tr>
                  <td>Conveyance Allowance </td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr> */}
                    <tr>
                      <td>Leave Travel Allowance</td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta * 12
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta * 12
                        )}
                      </td>
                    </tr>
                    {/* <tr>
                  <td>Medical Expense Reimbursement </td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr> */}
                    <tr>
                      <td>Special Allowance </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer
                            .specialAllowance
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer
                            .specialAllowance * 12
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer
                            .specialAllowance
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer
                            .specialAllowance * 12
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Bonus @ maximum {offerLetterData.bonus}% </td>
                      <td>-</td>
                      <td>-</td>
                      <td>{Math.round(offerLetterData.bonusAmt)}</td>
                      <td>{Math.round(offerLetterData.bonusAmt * 12)}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Gross Salary</b>{" "}
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.grossSalary
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .grossSalary * 12
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .grossSalary + offerLetterData.bonusAmt
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer
                              .grossSalary +
                              offerLetterData.bonusAmt) *
                              12
                          )}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td> Employer PF </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF *
                            12
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF *
                            12
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
                    {/* <tr>
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
                </tr> */}
                    <tr>
                      <td>CTC </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc * 12
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc+
                            offerLetterData.bonusAmt
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc+
                            offerLetterData.bonusAmt
                          ) * 12}
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <p>
                  <span style={{ color: "red" }}>*</span> The teammates from
                  countries with whom India does not have a Social Security
                  Agreement (the countries not mentioned in the list on
                  https://www.epfindia.gov.in/site_en/International_workers.php
                  are counties with whom India does not have a Social Security
                  Agreement) can withdraw their Provident Fund amount only after
                  attaining the age of 58 years (retirement age as fixed by the
                  Government of India).
                </p>
              </div>
            )}
            {!loader ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default LocalExpatOfferLetter;
