import React, { Fragment, useState, useContext, useEffect } from "react";
import { Button, Container, Row, Col,Modal } from "react-bootstrap";
import Breadcrumb from "../../common/breadcrumb";
import Switch from "react-switch";
import "../offers.css";
import AcceptModal from "./AcceptModal";
import RejectModal from "./RejectModal";
//import {  Page } from 'react-pdf'
import fileName from "../../../assets/file.pdf";
import insuranceFile1 from "../../../assets/Insurance_Benefit_2021.pdf";
import insuranceFile from "../../../assets/Insurance_Benefits_2022.pdf";
import appointmentFile from "../../../assets/Full_Time_Appointment.pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { ChevronRight, ChevronLeft } from "react-feather";
import { OnBoardContext } from "../../../context/OnBoardState";
import { CandidateContext } from "../../../context/CandidateState";
import { OfferContext } from "../../../context/OfferState";
import { Link } from "react-router-dom";
import man from "../../../assets/images/dashboard/userImage.png";
import PermanentOfferLetter from "./permanentOfferLetter";
import PartTimeOfferLetter from "./partTimeOfferLetter";
import LocalExpatOfferLetter from "./localExpatOfferLetter";
import InternOfferLetter from "./internOfferLetter";
import PermanentAppointmentLetter from "./AppointmentLetter";
import PartTimeAppointmentLetter from "./partTimeAppointmentLetter";
import LocalExpactAppointmentLetter from "./localExpactAppointmentLetter";
import InternAppointmentLetter from "./internAppointmentLetter";
import { DocsVerifyContext } from "../../../context/DocverificationState";

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
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [insuranceLetter, setInsuranceLetter] = useState(false);
  const {
    CandidateProfile,
    candidateProfileData,
    generateCandidateLetter,
    candidateLetterData,
    candidateCountryList,
    documentView,
    CandidateDocView,
    docViewData
  } = useContext(OnBoardContext);
  const {
    downloadFileOnboard
  } = useContext(DocsVerifyContext);
  const { candidateRejectOffer, candidateAcceptOffer, offerAcceptData } =
    useContext(CandidateContext);
  const { viewCandidateId, candidateData } = useContext(OfferContext);
console.log("docViewData",docViewData);
  const handleClose = () => {
    setModal(false);
    setShowLetter(false);
    setYesChecked(false)
  }

  const handleCloseLetter = () => {
    setShowLetter(false);
  }
  const handleAppCloseLetter = () => {
    setShowAppointmentLetter(false);
  }
  
  const handleRejectClose = () => {
    setRejectModal(false);
    setNoChecked(false)
  };
  const handleOk = () => {
    candidateRejectOffer({
      Id: candidateProfileData.candidateId,
      history: props.history,
    });
  };
  useEffect(() => {
    CandidateProfile();
    // candidateCountryList();
  }, []);

  // useEffect(() => {
  //   if (
  //     candidateProfileData !== undefined &&
  //     candidateProfileData !== null &&
  //     candidateProfileData.status === 2
  //   ) {
  //     props.history.push("/onboard");
  //   }
  // }, [candidateProfileData]);

  useEffect(() => {
    console.log("candidateProfileData offer accept", candidateProfileData);
    if (
      candidateProfileData !== null &&
      candidateProfileData !== undefined &&
      Object.keys(candidateProfileData).length !== 0
    ) {
      viewCandidateId(candidateProfileData.candidateId);
      generateCandidateLetter(candidateProfileData.candidateId);
    }
  }, [candidateProfileData]);

  const showLetterClick = (e) => {
    console.log("candidate Offer", candidateLetterData);
    setShowLetter(true);
    CandidateDocView(candidateProfileData.candidateId,candidateProfileData.signedLetter)
  };

  const showInsuranceClick = (e) => {
    console.log("candidate Offer", candidateLetterData);
    setInsuranceLetter(true);
  };
  const showAppointmentLetterClick = (e) => {
    setShowAppointmentLetter(true);
    CandidateDocView(candidateProfileData.candidateId,candidateProfileData.appointmentSignedLetter)
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

  const checkedYesHandler = () => {
    if(yesChecked === false){
      setYesChecked(true);
      setNoChecked(false);
      setModal(true);
      setRejectModal(false);
    }else{
      setYesChecked(false);
      setNoChecked(false);
      setModal(false);
      setRejectModal(false);
    }
  };
  const checkedNoHandler = () => {
    if(noChecked===false){
      setNoChecked(true);
      setYesChecked(false);
      setModal(false);
      setRejectModal(true);
    }else{
    setNoChecked(false);
    setYesChecked(false);
    setModal(false);
    setRejectModal(false);
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

  const candidateLogout = () => {
    console.log("inside candidate logout");
    localStorage.removeItem("candidate_access_token");
    props.history.push("/onboard-offer");
  };

  const downloadOfferLetter = () => {
    downloadFileOnboard(candidateProfileData.signedLetter);
  };

  const downloadAppointmentLetter = () => {
    downloadFileOnboard(candidateProfileData.appointmentSignedLetter);
  };

  return (
    <Fragment>
      {candidateProfileData !== undefined &&
      candidateProfileData !== null &&
      Object.keys(candidateProfileData).length !== 0 ? (
        candidateProfileData.status === 2 ? (
          <Fragment>
            {/* <Breadcrumb
              title="CANDIDATE OFFER ACCEPTANCE"
              parent="onboard-offer"
            /> */}
            <Fragment>
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-2">
                  <h6
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "rgb(0, 110, 187)",
                      textAlign: "left",
                    }}
                  >
                    Hello, {candidateProfileData.firstName}{" "}
                    {candidateProfileData.lastName}
                  </h6>
                </div>
                <div className="col-md-2">
                  <li
                    className="onhover-dropdown"
                    style={{ listStyle: "none" }}
                  >
                    <div className="media align-items-center">
                      {"  "}
                      <img
                        className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                        src={man}
                        alt="header-user"
                      />
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                      <li>
                        <a href="#profile">My Profile</a>
                      </li>

                      <li
                        onClick={() => {
                          candidateLogout();
                        }}
                      >
                        <a href="">Log out</a>
                      </li>
                    </ul>
                  </li>
                </div>
              </div>
            </Fragment>
            <Container className="main-container">
              <h5 className="offerHeading">Candidate Offer Acceptance</h5>
              <Container className="middle-container">
                <h6>Congrats!</h6>
                <h6>Welcome to Decathlon</h6>
                <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                  <span style={{ marginRight: "1rem" }}>
                    View Your Offer Letter
                  </span>
                  <Button onClick={showLetterClick}>Show</Button>
                  <Button onClick={downloadOfferLetter} style={{ marginLeft: "1rem" }}>Download</Button>
                </div>
              </Container>
              <Container className="last-container">
                <Row>
                  <Col sm={2}></Col>
                  <Col sm={9}>
                  <Fragment>
        <Modal show={showLetter} onHide={handleCloseLetter} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {docViewData !== undefined &&
             Object.keys(docViewData).length !== 0 && docViewData!=="File does not exist" ? (
              <div>

                  <iframe
                  src={
                    docViewData ? docViewData +"#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
              </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>
    </Fragment>
                    {/* {showLetter === true && candidateLetterData ? (
                      candidateLetterData.contractType !== undefined &&
                      candidateLetterData.contractType !== null &&
                      candidateLetterData.contractType === "Fulltime" ? (
                        <PermanentOfferLetter />
                      ) : candidateLetterData &&
                        candidateLetterData.contractType !== undefined &&
                        candidateLetterData.contractType !== null &&
                        candidateLetterData.contractType === "Parttime" ? (
                        <PartTimeOfferLetter />
                      ) : candidateLetterData &&
                        candidateLetterData.contractType !== undefined &&
                        candidateLetterData.contractType !== null &&
                        candidateLetterData.contractType === "Local Expat" ? (
                        <LocalExpatOfferLetter />
                      ) : (
                        <InternOfferLetter />
                      )
                    ) : (
                      ""
                    )} */}
                  </Col>
                  <Col sm={1}></Col>
                </Row>
              </Container>

              <Container className="middle-container">
                <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                  <span style={{ marginRight: "1rem" }}>
                    View Benefits
                  </span>
                  <Button onClick={showInsuranceClick}>Show</Button>
                </div>
              </Container>
              {insuranceLetter === true && (
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
                      <Document
                        file={insuranceFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
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

                  {/* <p>
                    Page {pageNumber} of {numPages}
                  </p> */}
                </Container>
              )}
              {/* {insuranceLetter === true && (
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
                      <Document
                        file={insuranceFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                      ></Document>
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
                </Container>
              )} */}

              {(candidateProfileData.status === 2 &&
                candidateProfileData.documentUploaded === 0 &&
                candidateProfileData.documentReUploadCount !== 4 &&
                candidateProfileData.adminVerificationStatus === 0 &&
                candidateProfileData.verificationStatus === 0) ||
              (candidateProfileData.status === 2 &&
                candidateProfileData.documentUploaded === 1 &&
                candidateProfileData.documentReUploadCount !== 4 &&
                (candidateProfileData.adminVerificationStatus === 2 ||
                  candidateProfileData.verificationStatus === 2)) ? (
                <Link
                  style={{
                    color: "#ffffff",
                    textDecoration: "none !important",
                  }}
                  to="/onboard"
                >
                  <Button>
                    Candidate Onboard{" "}
                    <ChevronRight
                      disabled
                      style={{
                        color: "#ffffff",
                        cursor: "pointer",
                        verticalAlign: "inherit",
                      }}
                    />
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </Container>
          </Fragment>
        ) : (
          <Fragment>
            {/* <Breadcrumb
              title="CANDIDATE OFFER ACCEPTANCE"
              parent="onboard-offer"
            /> */}{" "}
            <Fragment>
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-2">
                  <h6
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "rgb(0, 110, 187)",
                      textAlign: "left",
                    }}
                  >
                    Hello, {candidateProfileData.firstName}{" "}
                    {candidateProfileData.lastName}
                  </h6>
                </div>
                <div className="col-md-2">
                  <li
                    className="onhover-dropdown"
                    style={{ listStyle: "none" }}
                  >
                    <div className="media align-items-center">
                      {"  "}
                      <img
                        className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                        src={man}
                        alt="header-user"
                      />
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                      <li>
                        <a href="#profile">My Profile</a>
                      </li>

                      <li
                        onClick={() => {
                          candidateLogout();
                        }}
                      >
                        <a href="">Log out</a>
                      </li>
                    </ul>
                  </li>
                </div>
              </div>
            </Fragment>
            <Container className="main-container">
              <h5 className="offerHeading">Candidate Offer Acceptance</h5>
              <Container className="middle-container">
                <h6>Congrats!</h6>
                <h6>Welcome to Decathlon</h6>
                <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                  <span style={{ marginRight: "1rem" }}>
                    View Your Offer Letter
                  </span>
                  <Button onClick={showLetterClick}>Show</Button>
                  <Button onClick={downloadOfferLetter} style={{ marginLeft: "1rem" }}>Download</Button>
                </div>
              </Container>
              <Container className="last-container">
                <Row>
                  <Col sm={2}></Col>
                  <Col sm={9}>
                  <Fragment>
        <Modal show={showLetter} onHide={handleCloseLetter} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {docViewData !== undefined &&
             Object.keys(docViewData).length !== 0 && docViewData!=="File does not exist" ? (
              <div>
                  <iframe
                  src={
                    docViewData ? docViewData +"#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
              </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>
    </Fragment>
                  </Col>
                  <Col sm={1}></Col>
                </Row>
              </Container>

              <Container className="middle-container">
                <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                  <span style={{ marginRight: "1rem" }}>
                    View Benefits
                  </span>
                  <Button onClick={showInsuranceClick}>Show</Button>
                </div>
              </Container>
              {insuranceLetter === true && (
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
                      <Document
                        file={insuranceFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
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

                  {/* <p>
                    Page {pageNumber} of {numPages}
                  </p> */}
                </Container>
              )}
              {/* {insuranceLetter === true && (
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
                      <p>Insurance</p>
                      <Document
                        file={insuranceFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                      ></Document>
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
                </Container>
              )} */}

              {candidateProfileData &&
              (candidateProfileData.status === 5) ? (
                <React.Fragment>
                  <span style={{ marginRight: "1rem" }}>
                    Do you accept the Offer letter
                  </span>
                  {/* <Switch
                        onChange={handleSwitch}
                        checked={checked}
                        className="react-switch"
                      /> */}
                  Yes &nbsp;{" "}
                  <input
                    type="checkbox"
                    name="accept"
                    checked={yesChecked}
                    onChange={checkedYesHandler}
                  />
                  &nbsp; &nbsp;&nbsp; &nbsp; No &nbsp;{" "}
                  <input
                    type="checkbox"
                    name="accept"
                    checked={noChecked}
                    onChange={checkedNoHandler}
                  />
                </React.Fragment>
              ) : (
                ""
              )}

              {candidateProfileData && candidateProfileData.status === 6 ? (
                <Container className="middle-container">
                  <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                    <span style={{ marginRight: "1rem" }}>
                      View Your Appointment Letter
                    </span>
                    <Button onClick={showAppointmentLetterClick}>Show</Button>
                    <Button onClick={downloadAppointmentLetter} style={{ marginLeft: "1rem" }}>Download</Button>
                  </div>
                </Container>
              ) : (
                ""
              )}
              <Container className="last-container">
                <Row>
                  <Col sm={2}></Col>
                  <Col sm={9}>
                  <Fragment>
        <Modal show={showAppointmentLetter} onHide={handleAppCloseLetter} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {docViewData !== undefined &&
             Object.keys(docViewData).length !== 0 && docViewData!=="File does not exist" ? (
              <div>
                  <iframe
                  src={
                    docViewData ? docViewData +"#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
              </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>
    </Fragment>
                    {/* {showAppointmentLetter === true && candidateLetterData ? (
                      candidateLetterData.contractType !== undefined &&
                      candidateLetterData.contractType !== null &&
                      candidateLetterData.contractType === "Fulltime" ? (
                        <PermanentAppointmentLetter />
                      ) : candidateLetterData &&
                        candidateLetterData.contractType !== undefined &&
                        candidateLetterData.contractType !== null &&
                        candidateLetterData.contractType === "Parttime" ? (
                        <PartTimeAppointmentLetter />
                      ) : candidateLetterData &&
                        candidateLetterData.contractType !== undefined &&
                        candidateLetterData.contractType !== null &&
                        candidateLetterData.contractType === "Local Expat" ? (
                        <LocalExpactAppointmentLetter />
                      ) : (
                        <InternAppointmentLetter />
                      )
                    ) : (
                      ""
                    )} */}
                  </Col>
                  <Col sm={1}></Col>
                </Row>
              </Container>
              {/* {showAppointmentLetter === true && (
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
                  </Row> */}
              {/* <p>
              Page {pageAppointNumber} of {numAppointPages}
            </p> */}
              {/* <Button>Save</Button> */}
              {/* </Container>
              )} */}
              <AcceptModal modal={modal} handleClose={handleClose} />
              <RejectModal
                rejectModal={rejectModal}
                handleRejectClose={handleRejectClose}
                handleOk={handleOk}
              />
            </Container>
          </Fragment>
        )
      ) : (
        <div className="loader-box loader" style={{ width: "100% !important" }}>
          <div className="loader">
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OfferAccept;
