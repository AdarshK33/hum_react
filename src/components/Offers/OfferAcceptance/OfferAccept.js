import React, { Fragment, useState, useContext, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Breadcrumb from "../../common/breadcrumb";
import Switch from "react-switch";
import "../offers.css";
import AcceptModal from "./AcceptModal";
import RejectModal from "./RejectModal";
//import {  Page } from 'react-pdf'
import fileName from "../../../assets/file.pdf";
import appointmentFile from "../../../assets/Full_Time_Appointment.pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { ChevronRight, ChevronLeft } from "react-feather";
import { OnBoardContext } from "../../../context/OnBoardState";
import { CandidateContext } from "../../../context/CandidateState";
import { OfferContext } from "../../../context/OfferState";

const OfferAccept = (props) => {
  const [showLetter, setShowLetter] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [numAppointPages, setNumAppointPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageAppointNumber, setPageAppointNumber] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [showAppointmentLetter, setShowAppointmentLetter] = useState(false);
  const { CandidateProfile, candidateProfileData } = useContext(OnBoardContext);
  const { candidateRejectOffer } = useContext(CandidateContext);
  const { viewCandidateId, candidateData } = useContext(OfferContext);

  const handleClose = () => setModal(false);
  const handleRejectClose = () => {
    setRejectModal(false);
  };
  const handleOk = () => {
    candidateRejectOffer({
      Id: candidateProfileData.candidateId,
      history: props.history,
    });
  };
  useEffect(() => {
    CandidateProfile();
  }, []);

  useEffect(() => {
    console.log("candidateProfileData offer accept", candidateProfileData);
    viewCandidateId(candidateProfileData.candidateId);
  }, [candidateProfileData]);

  const showLetterClick = (e) => {
    setShowLetter(true);
  };

  const showAppointmentLetterClick = (e) => {
    setShowAppointmentLetter(true);
  };

  const handleSwitch = (e) => {
    setChecked(e);
    if (e === true) {
      setModal(true);
      setRejectModal(false);
    } else {
      setModal(false);
      setRejectModal(true);
    }
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const onAppoinmentDocumentLoadSuccess = ({ numAppointPages }) => {
    setNumAppointPages(numAppointPages);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1);

  const goToNextPage = () => setPageNumber(pageNumber + 1);

  const goToAppointPrevPage = () => setPageAppointNumber(pageAppointNumber - 1);

  const goToAppointNextPage = () => setPageAppointNumber(pageAppointNumber + 1);

  return (
    <Fragment>
      <Breadcrumb title="CANDIDATE OFFER ACCEPTANCE" parent="onboard-offer" />
      <Container className="main-container">
        <h5 className="offerHeading">Candidate Offer Acceptance</h5>
        <Container className="middle-container">
          <h6>Congrats!</h6>
          <h6>Welcome to Decathlon</h6>
          <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
            <span style={{ marginRight: "1rem" }}>View Your Offer Letter</span>
            <Button onClick={showLetterClick}>Show</Button>
          </div>
        </Container>

        {showLetter === true && (
          <Container className="last-container">
            <Row>
              <Col sm={2}>
                {pageNumber <= 1 ? (
                  <ChevronLeft
                    disabled
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                ) : (
                  <ChevronLeft
                    onClick={goToPrevPage}
                    disabled={pageNumber === 1}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                )}
              </Col>
              <Col sm={8}>
                <Document file={fileName} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </Col>
              <Col sm={2}>
                {pageNumber === numPages ? (
                  <ChevronRight
                    disabled
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                ) : (
                  <ChevronRight
                    onClick={goToNextPage}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                )}
              </Col>
            </Row>

            <p>
              Page {pageNumber} of {numPages}
            </p>
            {candidateProfileData && candidateProfileData.status === 5 ? (
              <React.Fragment>
                <span style={{ marginRight: "1rem" }}>
                  Do you accept the Offer letter
                </span>
                <Switch
                  onChange={handleSwitch}
                  checked={checked}
                  className="react-switch"
                />
              </React.Fragment>
            ) : (
              ""
            )}
          </Container>
        )}
        {candidateProfileData && candidateProfileData.status === 6 ? (
          <Container className="middle-container">
            <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
              <span style={{ marginRight: "1rem" }}>
                View Your Appointment Letter
              </span>
              <Button onClick={showAppointmentLetterClick}>Show</Button>
            </div>
          </Container>
        ) : (
          ""
        )}
        {showAppointmentLetter === true && (
          <Container className="last-container">
            <Row>
              <Col sm={2}>
                {pageAppointNumber <= 1 ? (
                  <ChevronLeft
                    disabled
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                ) : (
                  <ChevronLeft
                    onClick={goToAppointPrevPage}
                    disabled={pageAppointNumber === 1}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                )}
              </Col>
              <Col sm={8}>
                <Document
                  file={appointmentFile}
                  onLoadSuccess={onAppoinmentDocumentLoadSuccess}
                >
                  <Page pageNumber={pageAppointNumber} />
                </Document>
              </Col>
              <Col sm={2}>
                {pageAppointNumber === numAppointPages ? (
                  <ChevronRight
                    disabled
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                ) : (
                  <ChevronRight
                    onClick={goToAppointNextPage}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginTop: "20rem",
                    }}
                  />
                )}
              </Col>
            </Row>
            {/* <p>
              Page {pageAppointNumber} of {numAppointPages}
            </p> */}
            {/* <Button>Save</Button> */}
          </Container>
        )}
        <AcceptModal modal={modal} handleClose={handleClose} />
        <RejectModal
          rejectModal={rejectModal}
          handleRejectClose={handleRejectClose}
          handleOk={handleOk}
        />
      </Container>
    </Fragment>
  );
};

export default OfferAccept;
