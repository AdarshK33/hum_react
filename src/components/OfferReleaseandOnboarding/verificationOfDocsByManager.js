import React, { Fragment, useState, useContext, useEffect } from "react";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { AppContext } from "../../context/AppState";
import { useParams } from "react-router-dom";
import "../CandidateVerification/ManageCandidate.css";
import { OfferContext } from "../../context/OfferState";

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
  const [onBoardPopup, setOnboardPopup] = useState(false);
  const [UANYes, setYes] = useState(false);
  const [UANNo, setNo] = useState(false);
  const [uanNumber, setUanNumber] = useState("");
  const [docType, setDocType] = useState("");
  const [disapprovePopup, setDisapprovePopup] = useState(false);
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
    rejectMessage,
    step5suscessStatus,
    step5Status,
  } = useContext(DocsVerifyContext);

  const { getUserInfo, user } = useContext(AppContext);
  useEffect(() => {
    if (rejectMessage) {
      setDisapprovePopup(true);
    }
    if (candidateData.candidateInformation !== undefined) {
      verificationDocsView(candidateData.candidateInformation.candidateId);
    }
  }, [acceptStatus, rejectStatus, rejectMessage]);
  useEffect(() => {
    if (disapprovePopup === true) {
      if (candidateData.candidateInformation !== undefined) {
        verificationDocsView(candidateData.candidateInformation.candidateId);
      }
      // setState(personalInfoData);
    }
  }, [disapprovePopup]);
  useEffect(() => {
    getUserInfo();
    setState(personalInfoData);
  }, []);
  useEffect(() => {
    verificationDocsView(candidateData.candidateInformation.candidateId);
  }, [onBoardPopup]);
  const handleShifting = () => {
    changeState(!isChecked);
  };

  const handleUANYes = (e) => {
    setYes(true);
    setNo(false);
  };

  const handleUANNo = (e) => {
    setNo(true);
    setYes(false);
  };

  const handleUANNumber = (e) => {
    setUanNumber(e.target.value);
  };
  const handleApproveDocument = (docId) => {
    approveDocument(docId);
  };
  const handleDisApproveDocument = (docId, type) => {
    setModal(true);
    setdocId(docId);
    setDocType(type);
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
    } else {
      setError(true);
    }
  };

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
    console.log(state.verificationStatus),
    (
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
        <Modal
          show={onBoardPopup}
          onHide={() => setOnboardPopup(false)}
          centered
        >
          <Container style={{ textAlign: "center", margin: "4rem 0 4rem 0" }}>
            <Modal.Body>
              <h6 style={{ marginBottom: "1rem" }}>
                The documents have been verified successfully, please complete
                the steps to onboard the candidate
              </h6>{" "}
              <Button onClick={() => setOnboardPopup(false)}>OK</Button>
            </Modal.Body>
          </Container>
        </Modal>
        <Modal
          show={disapprovePopup}
          onHide={() => setDisapprovePopup(false)}
          centered
          closeButton
        >
          <Container style={{ textAlign: "center", margin: "4rem 0 4rem 0" }}>
            <Modal.Body>
              <h6 style={{ marginBottom: "1rem" }}>
                Document has been rejected.
              </h6>{" "}
              {/* <Button onClick={() => setOnboardPopup(false)}>Cancel</Button> */}
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
                              <span style={{ color: "black" }}>PhotoID</span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                          ) : item.documentType === 1 ? (
                            <label>
                              <span style={{ color: "black" }}>
                                Aadhar Card
                              </span>{" "}
                              <span style={{ color: "red" }}>*</span>
                              <span
                                style={{
                                  color: "#47ef47",
                                  fontStyle: "italic",
                                }}
                              >
                                (Upload the first and last page)
                              </span>
                            </label>
                          ) : item.documentType === 2 ? (
                            <label>
                              <span style={{ color: "black" }}>Pan Number</span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                          ) : item.documentType === 3 ? (
                            <label>
                              <span style={{ color: "black" }}>
                                Address Proof
                              </span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                          ) : item.documentType === 4 ? (
                            <label>
                              <span style={{ color: "black" }}>
                                EPF Passbook
                              </span>{" "}
                              <span
                                style={{
                                  color: "#47ef47",
                                  fontStyle: "italic",
                                }}
                              >
                                (First page of the book)
                              </span>
                            </label>
                          ) : (
                            item.documentType === 5 && (
                              <p>
                                <span
                                  style={{ color: "black", fontSize: "16px" }}
                                >
                                  Cancelled Cheque
                                </span>{" "}
                              </p>
                            )
                          )}
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => downloadDocument(item.documentName)}
                        >
                          {downloadedFile && (
                            <img src={downloadedFile} alt="" />
                          )}
                          {item.documentName}
                        </p>
                      </td>
                      {item.statusDesc !== null &&
                      item.statusDesc !== "Pending" ? (
                        <td className="buttonMargin1">{item.statusDesc}</td>
                      ) : (
                        <td className="row text-center buttonMargin">
                          {user.role === "MANAGER" && (
                            <button
                              className="approveButton"
                              onClick={() =>
                                handleApproveDocument(item.documentId)
                              }
                            >
                              Approve
                            </button>
                          )}

                          {user.role === "MANAGER" && (
                            <button
                              className="approveButton ml-4"
                              style={
                                rejectStatus === "FAIL" &&
                                docType === item.documentType
                                  ? { opacity: "0.6" }
                                  : { opacity: "1" }
                              }
                              disabled={
                                rejectStatus === "FAIL" &&
                                docType === item.documentType &&
                                item.documentId
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                handleDisApproveDocument(
                                  item.documentId,
                                  item.documentType
                                )
                              }
                            >
                              Disapprove
                            </button>
                          )}
                          {/* {rejectStatus === "FAIL" &&
                          docType === item.documentType && (
                            <p style={{ color: "red" }}>
                              Maximum attempst had reached
                            </p>
                          )} */}
                        </td>
                      )}
                      <td className="buttonMargin1">
                        {item.remark !== null ? item.remark : "N/A"}
                      </td>
                      <td className="buttonMargin1">
                        {item.verifiedDate !== null ? item.verifiedDate : "N/A"}
                      </td>
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
                              <span
                                style={{ color: "black", fontSize: "16px" }}
                              >
                                Highest Education
                              </span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </p>
                          ) : item.documentType === 7 ? (
                            <p>
                              <span
                                style={{ color: "black", fontSize: "16px" }}
                              >
                                Relieving Letter
                              </span>
                              <span style={{ color: "red" }}>*</span>
                              <span
                                style={{
                                  color: "#47ef47",
                                  fontStyle: "italic",
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

                      {item.statusDesc !== null &&
                      item.statusDesc !== "Pending" &&
                      item.documentType > 5 ? (
                        <td className="buttonMargin1">{item.statusDesc}</td>
                      ) : (
                        item.documentType > 5 && (
                          <td className="row text-center buttonMargin">
                            <button
                              className="approveButton"
                              onClick={() =>
                                handleApproveDocument(item.documentId)
                              }
                            >
                              Approve
                            </button>
                            {user.role === "MANAGER" && (
                              <button
                                className="approveButton ml-4"
                                style={
                                  rejectStatus === "FAIL" &&
                                  docType === item.documentType
                                    ? { opacity: "0.6" }
                                    : { opacity: "1" }
                                }
                                disabled={
                                  rejectStatus === "FAIL" &&
                                  docType === item.documentType &&
                                  item.documentId
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                  handleDisApproveDocument(
                                    item.documentId,
                                    item.documentType
                                  )
                                }
                              >
                                Disapprove
                              </button>
                            )}
                            {rejectStatus === "FAIL" &&
                              docType === item.documentType && (
                                <p style={{ color: "red" }}>
                                  Maximum attempst had reached
                                </p>
                              )}
                          </td>
                        )
                      )}
                      {item.remark !== null ? (
                        <td className="buttonMargin1">
                          {item.documentType > 5 && item.remark}
                        </td>
                      ) : (
                        item.documentType > 5 && (
                          <td className="buttonMargin1">NA</td>
                        )
                      )}
                      {item.verifiedDate !== null ? (
                        <td className="buttonMargin1">
                          {item.documentType > 5 && item.verifiedDate}
                        </td>
                      ) : (
                        item.documentType > 5 && (
                          <td className="buttonMargin1">NA</td>
                        )
                      )}
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
        {user.role === "ADMIN" && (
          <Row className="mx-2">
            <label>Is UAN Number Generated ?</label>
            <Col sm={2}>
              <Form.Group>
                <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value="yes"
                    checked={UANYes}
                    // required={required}
                    onChange={(e) => handleUANYes(e)}
                  />
                  <label>Yes</label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <div className="boxField input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    value="no"
                    checked={UANNo}
                    // required={required}
                    onChange={(e) => handleUANNo(e)}
                  />
                  <label>No </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        )}
        {UANNo && (
          <Row>
            <Col sm={6}>
              <Form.Group>
                <div className="boxField input">
                  <label>Enter UAN Number</label>
                  <input
                    className="mx-2"
                    type="text"
                    name="uannbr"
                    value={uanNumber}
                    // required={required}
                    onChange={(e) => handleUANNumber(e)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        )}
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
    )
  );
};
export default DocVerification;
