import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import "./offers.css";
import { OfferContext } from "../../context/OfferState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const InternOfferLetter = () => {
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
        empEmail: user.email,
        empPhNo: user.phone,
        history: history,
        path: "../offer-release-list",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,380,185,480");
      setViewLetter(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {typeof offerLetterData !== undefined &&
      offerLetterData.internshipCandidateOffer !== undefined ? (
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
                  <b>OFFER OF ENGAGEMENT </b>
                </p>
                <br></br>
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
                  <b> Date: {moment().format("DD-MM-YYYY")}</b>
                </p>

                <p>Dear {offerLetterData.candidateName},</p>

                <p>
                  We are pleased to offer internship programme for period of{" "}
                  {offerLetterData.internshipCandidateOffer.internshipPeriod}{" "}
                  months from{" "}
                  {moment(
                    offerLetterData.internshipCandidateOffer.fromDate
                  ).format("DD-MM-YYYY")}{" "}
                  to{" "}
                  {moment(
                    offerLetterData.internshipCandidateOffer.toDate
                  ).format("DD-MM-YYYY")}{" "}
                  at {offerLetterData.companyName} . You will be
                  provided stipend{" "}
                  {offerLetterData.internshipCandidateOffer.stipend} per month.
                </p>

                <p>
                  You should note that any information and data collected during
                  the course of your internship should be kept confidential at
                  all times.
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

export default InternOfferLetter;
