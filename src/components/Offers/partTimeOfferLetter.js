import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const PartTimeOfferLetter = () => {
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
      CreatePdfAndUpload(infoData, "35,210,185,310");
      setViewLetter(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {typeof offerLetterData !== undefined &&
      offerLetterData.partTimeCandidateOffer !== undefined ? (
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
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  <b>OFFER LETTER</b>
                </p>
                <br></br>
                <p style={{ fontSize: "15px", fontWeight: "700" }}>
                  <b>PRIVATE AND CONFIDENTIAL</b>
                </p>

                <p style={{ fontSize: "15px", fontWeight: "700" }}>
                  <b>Date: {moment().format("DD-MM-YYYY")}</b>
                </p>

                <p>Dear {offerLetterData.candidateName},</p>

                <p>
                  We have the pleasure to offer you the position of{" "}
                  <b>{offerLetterData.position}</b> on Part-Time Basis at{" "}
                  {offerLetterData.companyName}.{" "}
                </p>

                <p style={{ fontSize: "15px", fontWeight: "700" }}>
                  <b>1. Terms & Conditions</b>
                </p>
                <p>
                  <ol style={{ fontSize: "15px" }}>
                    <li>
                      You will report to <b>{offerLetterData.managerName}</b> or
                      any officer appointed by him/her on{" "}
                      {moment(
                        offerLetterData.partTimeCandidateOffer.effectiveDate
                      ).format("DD-MM-YYYY")}
                    </li>
                    <li>
                      Your gross salary will not exceed{" "}
                      <b>{offerLetterData.fixedGross}</b>(INR.{" "}
                      {number2text(parseInt(offerLetterData.fixedGross))}) per
                      Hourly
                    </li>
                    <li>
                      You may also receive a bonus on monthly basis and which
                      would be to a maximum of <b>{offerLetterData.bonus} %</b>{" "}
                      of your monthly gross salary.Your manager will explain to
                      you the calculation of such bonus
                    </li>
                    <li>
                      Please note that salary and bonus payments are made based
                      on individual merits and therefore such matters should be
                      kept strictly confidential to yourself only
                    </li>
                    <li>
                      Changes in your compensation are subject to the discretion
                      of the Company and will be subject to and be on the basis
                      of your effective performance and results during your
                      employment and other relevant criteria
                    </li>
                    <li>
                      You will be on probation for a period of{" "}
                      <b>{offerLetterData.probationPeriod} month(s)</b> from the
                      date of your appointment. On completion of the probation
                      period, if the Company finds you to be suitable for the
                      appointed post, your appointment shall be confirmed and
                      communicated to you in writing
                    </li>
                  </ol>
                </p>
                <p>
                  Also, please sign the duplicate of this offer as your
                  acceptance and forward the same to us.
                </p>
                <br></br>
                <p>For {offerLetterData.companyName}</p>
                <br></br>
                <p>Thanking you</p>
                <p>Manager Name :{offerLetterData.managerName}</p>
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

export default PartTimeOfferLetter;
