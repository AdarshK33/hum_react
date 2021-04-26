import React, { Fragment, useState, useContext, useEffect } from "react";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { OfferContext } from "../../context/OfferState";

import { AppContext } from "../../context/AppState";
import { useParams } from "react-router-dom";
import "../CandidateVerification/ManageCandidate.css";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";

// import { handleInputChange } from "react-select/src/utils";

const DocVerification = () => {
  const [isChecked, changeState] = useState(false);
  const { candidateData } = useContext(OfferContext);

  const params = useParams();
  const candidateId = params["candidateId"];
  const [showModal, setModal] = useState(false);
  const [remarks, setremarks] = useState("");
  const [docId, setdocId] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState({});
  const [attempt, setAttempt] = useState(false);
  const [onBoardPopup, setOnboardPopup] = useState(false);
  const {
    verificationDocsView,
    docsToVerify,
    loader,
    setLoader,
    approveDocument,
    disApproveDocument,
    acceptStatus,
    rejectStatus,
    downloadDocument,
    downloadedFile,
    personalInfoData,
    personalInfo,
    step5suscessStatus,
  } = useContext(DocsVerifyContext);
  const { getUserInfo, user } = useContext(AppContext);
  useEffect(() => {
    getUserInfo();
    setState(personalInfoData);
  }, []);
  const handleShifting = () => {
    changeState(!isChecked);
  };

  const handleApproveDocument = (docId) => {
    approveDocument(docId);
  };
  const handleDisApproveDocument = (docId) => {
    setModal(true);
    setdocId(docId);
  };
  const handleClose = () => setModal(false);
  const handleChange = (e) => {
    setremarks(e.target.value);
    setError(false);
  };
  const handleSave = (docId, candidateId, remarks) => {
    if (remarks !== "") {
      disApproveDocument(docId, candidateId, remarks);

      handleClose();
      if (
        rejectStatus !== undefined &&
        rejectStatus.data !== undefined &&
        rejectStatus.data.data.status === "FAIL"
      ) {
        setAttempt(true);
      }
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    verificationDocsView(candidateData.candidateInformation.candidateId);
  }, [onBoardPopup]);
  const handleOnboard = () => {
    step5suscessStatus(true);
    setOnboardPopup(true);
  };
  var documents =
    docsToVerify !== undefined &&
    docsToVerify !== null &&
    docsToVerify
      .filter((personal) => personal.documentType <= 5)
      .map((filteredResult) => {
        return filteredResult;
      });
  var educationDocuments =
    docsToVerify !== undefined &&
    docsToVerify !== null &&
    docsToVerify
      .filter(
        (personal) => personal.documentType > 5 && personal.documentType <= 8
      )
      .map((filteredResult) => {
        return filteredResult;
      });
  return (
    <Fragment>
      <Modal show={showModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <h6 className="mb-1">State remarks for disapproval</h6>
            <textarea
              className="remarkText rounded"
              value={remarks}
              placeholder="Write here.."
              onChange={(e) => handleChange(e)}
            />

            {error && <p style={{ color: "red" }}>Please add your remarks</p>}
            <div className="text-center mb-2">
              <Button
                onClick={() =>
                  handleSave(
                    docId,
                    candidateData.candidateInformation.candidateId,
                    remarks
                  )
                }
              >
                Save
              </Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Modal show={onBoardPopup} onHide={() => setOnboardPopup(false)} centered>
        <Container style={{ textAlign: "center", margin: "4rem 0 4rem 0" }}>
          <Modal.Body>
            <h6 style={{ marginBottom: "1rem" }}>
              The documents have been verified successfully, please complete the
              steps to onboard the candidate
            </h6>{" "}
            <Button onClick={() => setOnboardPopup(false)}>Cancel</Button>
          </Modal.Body>
        </Container>
      </Modal>
      <div className="parent">
        <button
          className="buttonField1 button"
          disabled={!isChecked}
          onClick={handleShifting}
        >
          Personal Documents
        </button>
        <button
          className="buttonField2 button"
          disabled={isChecked}
          onClick={handleShifting}
        >
          Education & Work Documents
        </button>
      </div>
      <div className="mt-5">
        <Table className="tableWrapper table table-borderless">
          <thead>
            <tr>
              <th></th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Date</th>
            </tr>
          </thead>
          {loader === true &&
          docsToVerify !== undefined &&
          docsToVerify !== null ? (
            <tbody>
              <tr>
                <td colSpan="12">
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
                </td>
              </tr>
            </tbody>
          ) : documents !== undefined &&
            !isChecked &&
            documents !== null &&
            documents.length > 0 ? (
            documents.map((item, i) => {
              return (
                <tbody key={i} className="tableText">
                  <tr>
                    <td className="text-left">
                      <p>
                        {item.documentType === 0 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              PhotoID
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        ) : item.documentType === 1 && user.role === "ADMIN" ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              AadhaarID
                            </span>
                            <span style={{ color: "red" }}>*</span>
                            <span
                              style={{
                                color: "#47ef47",
                                fontStyle: "italic",
                                fontSize: "14px",
                              }}
                            >
                              (Upload the first and last page)
                            </span>
                          </label>
                        ) : item.documentType === 2 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Pan Number
                            </span>{" "}
                            <span style={{ color: "red", fontSize: "16px" }}>
                              *
                            </span>
                          </label>
                        ) : item.documentType === 3 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Address Proof
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        ) : item.documentType === 4 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              EPF Passbook
                            </span>{" "}
                            <span
                              style={{
                                color: "#47ef47",
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              (First page of the book)
                            </span>
                          </label>
                        ) : (
                          item.documentType === 5 && (
                            <label>
                              <span
                                style={{ color: "black", fontSize: "16px " }}
                              >
                                Cancelled Cheque
                              </span>{" "}
                            </label>
                          )
                        )}
                      </p>
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => downloadDocument(item.documentName)}
                      >
                        {downloadedFile && <img src={downloadedFile} alt="" />}
                        {item.documentType <= 5 && item.documentName}
                      </p>
                    </td>
                    {item.statusDesc !== null &&
                    item.documentType === 1 &&
                    item.statusDesc !== "Pending" ? (
                      <td className="buttonMargin1">{item.statusDesc}</td>
                    ) : (
                      <td className="row text-center buttonMargin">
                        {user.role === "ADMIN" && item.documentType === 1 && (
                          <button
                            className="approveButton ml-4"
                            onClick={() =>
                              handleApproveDocument(item.documentId)
                            }
                          >
                            Approve
                          </button>
                        )}
                        {user.role === "ADMIN" && item.documentType === 1 && (
                          <button
                            className="approveButton ml-4"
                            disabled={
                              rejectStatus !== undefined &&
                              rejectStatus === "FAIL"
                                ? true
                                : false
                            }
                            style={
                              rejectStatus !== undefined &&
                              rejectStatus === "FAIL"
                                ? { opacity: "0.6" }
                                : { opacity: "1" }
                            }
                            onClick={() =>
                              handleDisApproveDocument(item.documentId)
                            }
                          >
                            Disapprove
                          </button>
                        )}
                        {item.documentType === 1 &&
                          rejectStatus !== undefined &&
                          rejectStatus === "FAIL" && (
                            <p style={{ color: "red" }}>Attempt has reached</p>
                          )}
                      </td>
                    )}
                    {item.documentType === 1 && (
                      <td className="buttonMargin1">
                        {item.remark !== null ? item.remark : "N/A"}
                      </td>
                    )}
                    {item.documentType === 1 && (
                      <td className="buttonMargin1">
                        {item.verifiedDate !== null ? item.verifiedDate : "N/A"}
                      </td>
                    )}
                  </tr>
                </tbody>
              );
            })
          ) : educationDocuments !== undefined &&
            isChecked &&
            educationDocuments !== null &&
            educationDocuments.length > 0 ? (
            educationDocuments.map((item, i) => {
              return (
                <tbody key={i} className="tableText">
                  <tr>
                    <td className="text-left mx-auto px-4 ">
                      <p>
                        {item.documentType === 6 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Highest Education
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : item.documentType === 7 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Relieving Letter
                            </span>
                            <span style={{ color: "red" }}>*</span>
                            <span
                              style={{
                                color: "#47ef47",
                                fontStyle: "italic",
                                fontSize: "20px",
                              }}
                            >
                              (Upload the first and last page)
                            </span>
                          </p>
                        ) : (
                          item.documentType === 8 && (
                            <p>
                              <span
                                style={{ color: "black", fontSize: "16px" }}
                              >
                                Latest play slip
                              </span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </p>
                          )
                        )}
                      </p>
                      {item.documentType > 5 && item.documentName}
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan="12">No Record Found</td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>

      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        {state !== undefined && state.verificationStatus === 1 && (
          <button className="onboardButton" onClick={() => handleOnboard()}>
            Proceed
          </button>
        )}
      </div>
    </Fragment>
  );
};
export default DocVerification;
