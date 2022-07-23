import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const PermanentOfferLetter = () => {
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
  const { user,fetchemployeeData } = useContext(AppContext);
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
        empName: fetchemployeeData.firstName + " " + fetchemployeeData.lastName,
        empEmail: fetchemployeeData.email,
        empPhNo: fetchemployeeData.phone,
        history: history,
        path: "../offer-release-list",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,220,185,320", true);
      setViewLetter(false);
      setShow(false);
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
                
                {/* <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="500.000000pt" height="80.000000pt" viewBox="255 10 500.000000 90"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,49.000000) scale(0.100000,-0.100000)"
fill="#006ebb" stroke="none">
<path d="M0 245 l0 -245 1000 0 1000 0 0 245 0 245 -1000 0 -1000 0 0 -245z
m693 124 c12 -6 30 -18 39 -27 16 -14 16 -17 1 -43 l-17 -28 -24 20 c-45 35
-101 20 -117 -32 -10 -29 24 -73 59 -77 37 -5 58 16 114 110 45 75 48 78 84
78 l38 0 0 -125 0 -125 -35 0 c-27 0 -35 4 -35 19 0 22 -34 19 -96 -10 -48
-23 -85 -24 -122 -5 -102 53 -107 176 -10 236 37 22 88 26 121 9z m887 -4 c15
-8 38 -27 49 -41 l21 -27 0 37 c0 34 2 36 33 36 27 0 36 -7 59 -43 15 -23 36
-52 45 -65 18 -22 18 -21 15 43 l-4 65 41 0 41 0 0 -125 0 -125 -34 0 c-31 0
-39 6 -78 62 l-43 61 -3 -61 -3 -62 -34 0 c-33 0 -35 2 -35 34 l0 34 -33 -33
c-42 -42 -94 -53 -148 -32 -21 8 -39 11 -39 6 0 -5 -34 -9 -75 -9 l-75 0 0
125 0 125 35 0 35 0 0 -95 c0 -94 0 -95 24 -95 23 0 23 2 14 39 -26 103 96
196 192 146z m-1281 -9 c13 -7 30 -24 37 -37 13 -23 13 -23 14 14 l0 37 75 0
75 0 0 -30 c0 -28 -2 -30 -40 -30 -29 0 -40 -4 -40 -15 0 -10 11 -15 35 -15
32 0 35 -2 35 -30 0 -28 -3 -30 -35 -30 -28 0 -35 -4 -35 -20 0 -17 7 -20 40
-20 38 0 40 -2 40 -30 l0 -30 -75 0 -75 0 0 34 0 34 -34 -34 c-33 -33 -36 -34
-115 -34 l-81 0 0 125 0 125 78 0 c44 -1 87 -6 101 -14z m751 -16 c0 -25 -4
-30 -25 -30 -25 0 -25 0 -25 -95 l0 -95 -35 0 -35 0 0 95 c0 95 0 95 -25 95
-21 0 -25 5 -25 30 l0 30 85 0 85 0 0 -30z m80 -15 c0 -45 0 -45 35 -45 35 0
35 0 35 45 0 45 0 45 35 45 l35 0 0 -125 0 -125 -35 0 c-35 0 -35 0 -35 45 0
45 0 45 -35 45 -35 0 -35 0 -35 -45 0 -45 0 -45 -35 -45 l-35 0 0 125 0 125
35 0 c35 0 35 0 35 -45z"/>
<path d="M787 236 c-4 -10 -5 -21 -2 -24 9 -9 17 6 13 25 -3 17 -4 17 -11 -1z"/>
<path d="M1484 302 c-51 -34 -25 -122 36 -122 45 0 79 54 58 93 -14 29 -27 37
-58 37 -14 0 -30 -4 -36 -8z"/>
<path d="M190 251 l0 -71 34 0 c88 0 86 117 -1 135 l-33 7 0 -71z"/>
</g>
</svg> */}
                <p
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
 
                 {/* <img style={{width: "200px"}} src="https://humine-application.s3.ap-south-1.amazonaws.com/humine_dev/Cheque_CANDID3037.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220704T160544Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIAUF5TYHAB7GQC7DLX%2F20220704%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d93b063443f616c151acea6ae6783da9460400776c5b8b2b22b73d6443bcff3d" alt="decathlonLogo"/> */}
                 {/* <img className="logoStyle" style={{width: "200px"}} src={decathlonLogo} alt="decathlonLogo"/> */}

                  <b> OFFER LETTER</b>
                </p>
                <p style={{ fontWeight: "700", fontSize: "15px" }}>
                  <b> PRIVATE AND CONFIDENTIAL</b>
                </p>
                <p style={{ fontWeight: "700", fontSize: "15px" }}>
                  <b> Date: {moment().format("DD-MM-YYYY")}</b>
                </p>
                <p>Dear {offerLetterData.candidateName},</p>
                <p>
                  We have the pleasure to offer you the position of{" "}
                  <b>{offerLetterData.position}</b> on Full-Time Basis, at{" "}
                  {offerLetterData.companyName}.{" "}
                </p>
                <br></br>
                <p style={{ fontWeight: "700", fontSize: "15px" }}>
                  <b>1. Terms & Conditions</b>
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
                    Your monthly gross salary will not exceed Rs.{" "}
                    <b>{offerLetterData.permanentCandidateOffer.grossSalary}</b>{" "}
                    (INR.{" "}
                    {number2text(
                      parseInt(
                        offerLetterData.permanentCandidateOffer.grossSalary
                      )
                    )}
                    ) (fixed gross). Refer to the salary annexure mentioned
                    below
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
                <p>For {offerLetterData.companyName}</p>
                <br></br>
                <p>Thanking you</p>
                <p>Manager Name :{offerLetterData.managerName}</p>

                <p
                  style={{ fontWeight: "700", fontSize: "15px" }}
                  class="pdf-pagebreak-before"
                >
                  <b> Salary Annexure</b>
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
                      <td>{Math.round(offerLetterData.fixedGross)}</td>
                      <td>{Math.round(offerLetterData.fixedGross)* 12}</td>
                      <td>{Math.round(offerLetterData.fixedGross)}</td>
                      <td>{Math.round(offerLetterData.fixedGross)* 12}</td>
                    </tr>
                    <tr>
                      <td>Basic Salary </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.basic
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.basic 
                        )* 12}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.basic
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.basic
                        )* 12}
                      </td>
                    </tr>
                    <tr>
                      <td>House Rent Allowance </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra 
                        )* 12}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.hra 
                        )* 12}
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
                          offerLetterData.permanentCandidateOffer.lta 
                        )* 12}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.lta 
                        )* 12}
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
                            .specialAllowance 
                        )* 12}
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
                            .specialAllowance 
                        )* 12}
                      </td>
                    </tr>
                    <tr>
                      <td>Bonus @ maximum {offerLetterData.bonus}% </td>
                      <td>-</td>
                      <td>-</td>
                      <td>{Math.round(offerLetterData.bonusAmt)}</td>
                      <td>{Math.round(offerLetterData.bonusAmt )* 12}</td>
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
                              .grossSalary 
                          )* 12}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer
                              .grossSalary  +offerLetterData.bonusAmt
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            (offerLetterData.permanentCandidateOffer
                              .grossSalary +
                              offerLetterData.bonusAmt) 
                              
                          )* 12}
                        </b>
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
                          offerLetterData.permanentCandidateOffer.employerPF 
                            
                        )* 12}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.employerPF 
                            
                        )* 12}
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
                          offerLetterData.permanentCandidateOffer.gratuity 
                        )* 12}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.gratuity
                        )}
                      </td>
                      <td>
                        {Math.round(
                          offerLetterData.permanentCandidateOffer.gratuity 
                        )* 12}
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
                            offerLetterData.permanentCandidateOffer.ctc 
                          )* 12}
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc+
                            offerLetterData.bonusAmt) 
                          }
                        </b>
                      </td>
                      <td>
                        <b>
                          {Math.round(
                            offerLetterData.permanentCandidateOffer.ctc
                            +
                            offerLetterData.bonusAmt) * 12}
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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

export default PermanentOfferLetter;
