import React, { Fragment, useState, useContext, useEffect } from "react";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { AppContext } from "../../context/AppState";
import { useParams, Link } from "react-router-dom";
import "./ManageCandidate.css";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { OfferContext } from "../../context/OfferState";

// import { handleInputChange } from "react-select/src/utils";

const DocVerification = () => {
  const [isChecked, changeState] = useState(false);
  const params = useParams();
  const candidateId = params["candidateId"];
  const [showModal, setModal] = useState(false);
  const [remarks, setremarks] = useState("");
  const [docId, setdocId] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState({});
  const [pfData, setPFData] = useState({});
  const [onBoardPopup, setOnboardPopup] = useState(false);
  const [UANYes, setYes] = useState(false);
  const [UANNo, setNo] = useState(false);
  const [uanNumber, setUanNumber] = useState("");
  const [uanError, setUanError] = useState(false);
  const [shiftingTheStatus, setShiftingTheStatus] = useState("");
  const [disApproveTheStatus, setDisApproveTheStatus] = useState("");
  const [docType, setDocType] = useState("");
  const {
    verificationDocsView,
    docsToVerify,
    loader,
    setLoader,
    approveDocument,
    aadharStatus,
    approveAadharByAdmin,
    disapproveAadharByAdmin,
    disApproveAadhar,
    disApproveDocument,
    // acceptStatus,
    rejectStatus,
    downloadDocument,
    downloadedFile,
    personalInfoData,
    personalInfo,
    updateUANNumber,
    uanUpdate,
    pfDetails,
    fetchPfDetails,
    documentRejectComplete,
    adminRejectComplete,
  } = useContext(DocsVerifyContext);
  const {
    candidateData,
    aadhaarNotificationData,
    adhaarVerificationNotification,
  } = useContext(OfferContext);
  const { getUserInfo, user } = useContext(AppContext);
  useEffect(() => {
    verificationDocsView(candidateId);
    personalInfo(candidateId);
    // setState(personalInfoData);
  }, [disApproveAadhar, uanUpdate]);
  useEffect(() => {
    if (aadharStatus === "SUCCESS") {
      verificationDocsView(candidateId);
      personalInfo(candidateId);
    }
  }, [aadharStatus]);
  useEffect(() => {
    getUserInfo();
    personalInfo(candidateId);
    fetchPfDetails(candidateId);
    setPFData(pfDetails);
    setState(personalInfoData);
  }, []);
  useEffect(() => {
    setState(personalInfoData);
  }, [personalInfoData]);

  useEffect(() => {
    setPFData(pfDetails);
    console.log("pfDetails", pfDetails);
    if (
      pfDetails !== undefined &&
      pfDetails !== null &&
      pfDetails.uanNumber !== ""
    ) {
      setYes(true);
      setNo(false);
      setUanNumber(pfDetails.uanNumber);
      setUanError(false);
    } else {
      setYes(false);
      setNo(true);
      setUanNumber("");
    }
  }, [pfDetails]);

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
    setUanNumber("");
  };

  const handleUANNumber = (e) => {
    console.log("uan value", e.target.value);
    setUanNumber(e.target.value);
    setUanError(false);
  };
  const handleApproveDocument = (docId, candidateId) => {
    approveAadharByAdmin(docId, candidateId);
  };

  const handleChequeApproveDocument = (docId) => {
    setShiftingTheStatus(docId);
    console.log(shiftingTheStatus, "in approve");
    return approveDocument(docId, candidateId);
  };

  const handleChequeDisApproveDocument = (docId, type) => {
    setDisApproveTheStatus(docId);
    setModal(true);
    setdocId(docId);
    setDocType(type);

    console.log(shiftingTheStatus, "in approve");
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
      disapproveAadharByAdmin(docId, candidateId, remarks);
      handleClose();
    } else {
      setError(true);
    }
  };

  const handleOnboard = () => {
    // adhaarVerificationNotification(candidateId);
    // documentRejectComplete(candidateId);
    setOnboardPopup(true);
  };

  const handleReupload = () => {
    // adhaarVerificationNotification(candidateId);
    adminRejectComplete(candidateId);
    // setOnboardPopup(true);
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
      .filter((personal) => personal.documentType >= 6)
      .map((filteredResult) => {
        return filteredResult;
      });

  const handleDocSave = () => {
    if (uanNumber !== "") {
      updateUANNumber(personalInfoData.candidateId, uanNumber);
    } else {
      setUanError(true);
    }
  };
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
                onClick={() => handleSave(docId, candidateId, remarks, docType)}
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
              The documents have been verified successfully, notification sent
              to the manager to complete candidate onboarding
            </h6>{" "}
            <Button onClick={() => setOnboardPopup(false)}>OK</Button>
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
                            <span style={{ color: "red" }}>*</span>
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
                              }}
                            >
                              (First page of the book)
                            </span>
                          </label>
                        ) : (
                          item.documentType === 5 && (
                            <label>
                              <span
                                style={{ color: "black", fontSize: "16px" }}
                              >
                                Cancelled Cheque
                              </span>{" "}
                            </label>
                          )
                        )}
                      </p>
                      {/* <p
                        style={{ cursor: "pointer" }}
                        onClick={() => downloadDocument(item.documentName)}
                      > */}
                      <a
                        href={
                          "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                          item.documentName
                        }
                        target="_blank"
                      >
                        {downloadedFile && <img src={downloadedFile} alt="" />}
                        {item.documentName}
                      </a>
                      {/* </p> */}
                      <button
                        className="downloadButton"
                        onClick={() => downloadDocument(item.documentName)}
                      >
                        Download
                      </button>
                    </td>
                    {item.statusDesc !== null &&
                    item.documentType === 1 &&
                    (item.adminStatus === 1 || item.adminStatus === 2) ? (
                      <td className="buttonMargin1">{item.adminStatusDesc}</td>
                    ) : item.statusDesc !== null &&
                      item.documentType === 5 &&
                      (item.adminStatus === 1 || item.adminStatus === 2) ? (
                      <td className="buttonMargin1">{item.adminStatusDesc}</td>
                    ) : item.statusDesc !== null &&
                      item.documentType === 4 &&
                      (item.adminStatus === 1 || item.adminStatus === 2) ? (
                      <td className="buttonMargin1">{item.adminStatusDesc}</td>
                    ) : (
                      <td className="row text-center buttonMargin">
                        {user.role === "ADMIN" &&
                        item.documentType === 1 &&
                        item.adminStatus === 0 ? (
                          <button
                            className="approveButton ml-4"
                            onClick={() =>
                              handleApproveDocument(
                                item.documentId,
                                candidateId
                              )
                            }
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
                        {user.role === "ADMIN" &&
                        item.documentType === 5 &&
                        item.adminStatus === 0 ? (
                          <button
                            className="approveButton ml-4"
                            disabled={rejectStatus === "FAIL" ? true : false}
                            onClick={() =>
                              handleApproveDocument(
                                item.documentId,
                                candidateId
                              )
                            }
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
                        {user.role === "ADMIN" &&
                        item.documentType === 4 &&
                        item.adminStatus === 0 ? (
                          <button
                            className="approveButton ml-4"
                            disabled={rejectStatus === "FAIL" ? true : false}
                            onClick={() =>
                              handleApproveDocument(
                                item.documentId,
                                candidateId
                              )
                            }
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
                        {user.role === "ADMIN" &&
                        item.documentType === 1 &&
                        item.adminStatus === 0 ? (
                          <button
                            className="approveButton ml-4"
                            disabled={
                              disApproveAadhar !== undefined &&
                              disApproveAadhar === "FAIL"
                                ? true
                                : false
                            }
                            style={
                              disApproveAadhar !== undefined &&
                              disApproveAadhar === "FAIL"
                                ? { opacity: "0.6" }
                                : { opacity: "1" }
                            }
                            onClick={() =>
                              handleDisApproveDocument(item.documentId)
                            }
                          >
                            Disapprove
                          </button>
                        ) : user.role === "ADMIN" &&
                          item.documentType === 5 &&
                          item.adminStatus === 0 ? (
                          <button
                            className="approveButton ml-4"
                            disabled={
                              disApproveAadhar !== undefined &&
                              disApproveAadhar === "FAIL"
                                ? true
                                : false
                            }
                            style={
                              disApproveAadhar !== undefined &&
                              disApproveAadhar === "FAIL"
                                ? { opacity: "0.6" }
                                : { opacity: "1" }
                            }
                            onClick={() =>
                              handleDisApproveDocument(item.documentId)
                            }
                          >
                            Disapprove
                          </button>
                        ) : (
                          ""
                        )}
                        {user.role === "ADMIN" &&
                        item.documentType === 4 &&
                        item.adminStatus === 0 ? (
                          <button
                            className="approveButton ml-4"
                            disabled={
                              disApproveAadhar !== undefined &&
                              disApproveAadhar === "FAIL"
                                ? true
                                : false
                            }
                            style={
                              disApproveAadhar !== undefined &&
                              disApproveAadhar === "FAIL"
                                ? { opacity: "0.6" }
                                : { opacity: "1" }
                            }
                            onClick={() =>
                              handleDisApproveDocument(item.documentId)
                            }
                          >
                            Disapprove
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </td>
                    )}
                    {(item.documentType === 1 ||
                      item.documentType === 5 ||
                      item.documentType === 4) && (
                      <td className="buttonMargin1">
                        {item.remark !== null ? item.remark : "N/A"}
                      </td>
                    )}
                    {(item.documentType === 1 ||
                      item.documentType === 5 ||
                      item.documentType === 4) && (
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
                              }}
                            >
                              (Upload the first and last page)
                            </span>
                          </p>
                        ) : item.documentType === 8 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Latest play slip
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : item.documentType === 9 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              OfferLetter
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : item.documentType === 10 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Form11Uan
                            </span>{" "}
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </p>
                        ) : item.documentType === 11 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Form2EPF
                            </span>{" "}
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </p>
                        ) : item.documentType === 12 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              FormFGratuity
                            </span>{" "}
                            {/* <span style={{ color: "red" }}>*</span> */}
                          </p>
                        ) : item.documentType === 13 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              DisabilityDoc
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : item.documentType === 14 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Passport
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : item.documentType === 15 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              CollegeLetter
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : (
                          item.documentType === 16 && (
                            <p>
                              <span
                                style={{ color: "black", fontSize: "16px" }}
                              >
                                CollegeId
                              </span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </p>
                          )
                        )}
                      </p>
                      {item.documentType >= 6 && (
                        <React.Fragment>
                          <a
                            href={
                              "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                              item.documentName
                            }
                            target="_blank"
                          >
                            {downloadedFile && (
                              <img src={downloadedFile} alt="" />
                            )}
                            {item.documentName}
                          </a>
                          <button
                            className="downloadButton"
                            onClick={() => downloadDocument(item.documentName)}
                          >
                            Download
                          </button>
                        </React.Fragment>
                      )}
                    </td>
                    {item.reviewStatus !== null && item.documentType >= 6 && (
                      <td>{item.reviewStatus}</td>
                    )}
                    <td>
                      {item.remark !== null &&
                        item.documentType >= 6 &&
                        item.remark}
                    </td>
                    <td>
                      {item.verifiedDate !== null &&
                        item.documentType >= 6 &&
                        item.verifiedDate}
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
                  onChange={handleUANYes}
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
                  onChange={handleUANNo}
                />
                <label>Link </label>
              </div>
            </Form.Group>
            {uanError && (
              <p style={{ color: "red" }}>Please Enter UAN Number</p>
            )}
          </Col>
        </Row>
      )}
      {(UANYes || UANNo) && user.role === "ADMIN" && pfDetails !== null && (
        <Row>
          <Col sm={6}>
            <Form.Group style={{ borderRadius: " 12.25rem !important" }}>
              <div className="boxField input">
                <label>UAN Number</label>{" "}
                <input
                  type="text"
                  name="uannbr"
                  value={uanNumber}
                  className="form-control"
                  // required={required}
                  onChange={(e) => handleUANNumber(e)}
                />
              </div>
            </Form.Group>
            {uanError && (
              <p style={{ color: "red" }}>Please Enter UAN Number</p>
            )}
          </Col>
        </Row>
      )}

      {/* {user.role === "ADMIN" &&
        state.adminVerificationStatus === 1 &&
        UANYes &&
        pfDetails !== null && (
          <Row>
            <Col sm={6}>
              <Form.Group style={{ borderRadius: " 12.25rem !important" }}>
                <div className="boxField input">
                  <label>UAN Number</label>{" "}
                  <input
                    type="text"
                    name="uannbr"
                    value={uanNumber}
                    className="form-control"
                    // required={required}
                    onChange={(e) => handleUANNumber(e)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        )} */}
      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        {state.uanStatus !== 1 &&
          (state.adminVerificationStatus === 1 ||
            state.adminVerificationStatus === 2) && (
            <button className="stepperButtons" onClick={() => handleDocSave()}>
              Save
            </button>
          )}

        {state !== undefined &&
          state.uanStatus === 1 &&
          state.adminVerificationStatus === 1 &&
          state.documentUploaded === 1 && (
            <Link to="/candidate-verification">
              <button className="onboardButton" onClick={() => handleOnboard()}>
                Onboard Candidate
              </button>
            </Link>
          )}

        {state !== undefined &&
          state.uanStatus === 1 &&
          state.adminVerificationStatus === 2 &&
          state.documentUploaded === 0 && (
            <Link to="/candidate-verification">
              <button
                className="onboardButton"
                onClick={() => handleReupload()}
              >
                Submit
              </button>
            </Link>
          )}
      </div>
    </Fragment>
  );
};
export default DocVerification;
