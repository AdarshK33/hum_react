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
import { PermissionContext } from "../../context/PermissionState";
import { useHistory } from "react-router-dom";
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
  const [onBoardPopup, setOnboardPopup] = useState(false);
  const [UANYes, setYes] = useState(false);
  const [UANNo, setNo] = useState(false);
  const [uanNumber, setUanNumber] = useState("");
  const [photoError, setPhotoError] = useState(false);
  const [panError, setPnaError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [epfError, setEpfError] = useState(false);
  const [docType, setDocType] = useState("");
  const [shiftingTheStatus, setShiftingTheStatus] = useState("");
  const [disApproveTheStatus, setDisApproveTheStatus] = useState("");
  const [docShow, setDocShow] = useState(false);

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
    documentRejectComplete,
  } = useContext(DocsVerifyContext);

  const { rolePermission,ImageView,imageViewData } = useContext(PermissionContext);
  const {
    candidateData,
    aadhaarNotificationData,
    adhaarVerificationNotification,
  } = useContext(OfferContext);
  const { getUserInfo, user } = useContext(AppContext);

  // useEffect(() => {
  //   console.log("acceptStatus+rejectStatus");
  //   verificationDocsView(candidateId);
  //   personalInfo(candidateId);
  //   // setState(personalInfoData);
  // }, []);
  let history = useHistory();
  useEffect(() => {
    console.log("userinfo");
    getUserInfo();
    personalInfo(candidateId);
  }, []);

  useEffect(() => {
    console.log("prsnl");
    setState(personalInfoData);
  }, [personalInfoData]);

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
    setShiftingTheStatus(docId);
    console.log(shiftingTheStatus, "in approve");
    return approveDocument(docId, candidateId);
  };
  const handleDisApproveDocument = (docId, type) => {
    setDisApproveTheStatus(docId);
    setModal(true);
    setremarks("");
    setdocId(docId);
    setDocType(type);

    console.log(shiftingTheStatus, "in approve");
  };
  const handleClose = () => setModal(false);
  const handleChange = (e) => {
    setremarks(e.target.value);
    setError(false);
  };
  const handleSave = (docId, candidateId, remarks, type) => {
    if (remarks !== "") {
      disApproveDocument(docId, candidateId, remarks);
      handleClose();
    } else {
      setError(true);
    }
  };

  const handleOnboard = () => {
    adhaarVerificationNotification(candidateId);
    // documentRejectComplete(candidateId);
    setOnboardPopup(true);
  };
  const handleReupload = () => {
    // adhaarVerificationNotification(candidateId);
    history.push("/candidate-verification");
    documentRejectComplete(candidateId);
    // setOnboardPopup(true);
  };

  // useEffect(() => {
  var documents = "";
  var educationDocuments = "";
  console.log("docsToVerify", docsToVerify);
  documents =
    docsToVerify !== undefined &&
    docsToVerify !== null &&
    docsToVerify
      .filter(
        (personal) =>
          personal.documentType <= 5 ||
          personal.documentType === 14 ||
          personal.documentType === 17
      )
      .map((filteredResult) => {
        return filteredResult;
      });
  educationDocuments =
    docsToVerify !== undefined &&
    docsToVerify !== null &&
    docsToVerify
      .filter(
        (personal) => personal.documentType > 5 && personal.documentType !== 14
      )
      .map((filteredResult) => {
        return filteredResult;
      });
  educationDocuments =
    educationDocuments !== undefined &&
    educationDocuments !== null &&
    Object.keys(educationDocuments).length !== 0 &&
    educationDocuments
      .filter(
        (personal) => personal.documentType > 5 && personal.documentType !== 17
      )
      .map((filteredResult) => {
        return filteredResult;
      });
  educationDocuments =
    educationDocuments !== undefined &&
    educationDocuments !== null &&
    Object.keys(educationDocuments).length !== 0 &&
    educationDocuments
      .filter(
        (personal) => personal.documentType > 5 && personal.documentType !== 24
      )
      .map((filteredResult) => {
        return filteredResult;
      });
  // }, [docsToVerify]);

  const handleDocShow = () => {
    setDocShow(true);
  };

  const handleDocClose = () => {
    setDocShow(false);
  };

  return (
    <Fragment>
              <Modal show={docShow} onHide={handleDocClose} size="md">
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {imageViewData !== undefined &&
             Object.keys(imageViewData).length !== 0 && imageViewData.data!=="File does not exist" ? (
              <div>

                  <iframe
                  src={
                    imageViewData.data ? imageViewData.data +
                    "#toolbar=0& navpanes=0":""
                  }
                  style={{ width: "100%", height: "900px" }}
                  frameborder="0"
                ></iframe>
                {/* ) : (
                  <img
                  style={{ width: "100%", height: "100%" }}
                  src={imageViewData.data ? imageViewData.data:""}
                />
                )} */}
              </div>
            ) : (
              "File does not exist"
            )}
          </Modal.Body>
        </Modal>

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
              The documents have been verified successfully, please complete the
              steps to onboard the candidate
            </h6>{" "}
            <Link to="/candidate-verification">
              <Button onClick={() => setOnboardPopup(false)}>OK</Button>
            </Link>
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
              <th>View</th>
              <th>Download</th>
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
                        ) : item.documentType === 1 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Aadhar Card
                            </span>{" "}
                            {personalInfoData.contractType !== "Local Expat" ? (
                              <span style={{ color: "red" }}>*</span>
                            ) : (
                              ""
                            )}
                          </label>
                        ) : item.documentType === 2 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Pan Number
                            </span>{" "}
                            {personalInfoData.contractType !== "Local Expat" ? (
                              <span style={{ color: "red" }}>*</span>
                            ) : (
                              ""
                            )}
                          </label>
                        ) : item.documentType === 3 ? (
                          <label>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Address Proof
                            </span>{" "}
                            {personalInfoData.contractType !== "Local Expat" ? (
                              <span style={{ color: "red" }}>*</span>
                            ) : (
                              ""
                            )}
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
                                fontSize: "16px",
                              }}
                            >
                              (First page of the book)
                            </span>
                          </label>
                        ) : item.documentType === 14 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                              Passport
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
                        ) : item.documentType === 17 ? (
                          <p>
                            <span style={{ color: "black", fontSize: "16px" }}>
                            Employment VISA (work permit)
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </p>
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
                      {/* <p
                        style={{ cursor: "pointer" }}
                        onClick={() => downloadDocument(item.documentName)}
                      > */}
                      <a
                        href={"#"}
                      >
                        {downloadedFile && <img src={downloadedFile} alt="" />}
                        {item.documentName}
                      </a>
                      {/* <button
                        className="downloadButton"
                        onClick={() => downloadDocument(item.documentName)}
                      >
                        Download
                      </button> */}
                      {/* </p> */}
                    </td>
                    <td className="buttonMargin1">
                    {/* <a
                        href={(imageViewData !== null && imageViewData !== undefined &&
                          Object.keys(imageViewData).length !== 0 && imageViewData.data)?imageViewData.data:""}
                        target="_blank."
                      > */}
                        <button className="downloadButton" onClick={()=>{ImageView(item.documentName,item.candidateId);handleDocShow()}}>View</button>
                      {/* </a> */}
                    </td>
                    <td className="buttonMargin1">
                      <button
                        className="downloadButton"
                        onClick={() => downloadDocument(item.documentName,item.candidateId)}
                      >
                        Download
                      </button>
                    </td>
                    {item.statusDesc !== null &&
                    item.statusDesc !== "Pending" &&
                    item.documentType !== 4 &&
                    item.documentType !== 5 ? (
                      <td className="buttonMargin1">{item.statusDesc}</td>
                    ) : (
                      <td className="buttonMargin1">
                        {(rolePermission == "superCostCenterManager" ||
                          rolePermission == "costCenterManager" ||
                          rolePermission == "manager") &&
                          item.documentType !== 4 &&
                          item.documentType !== 5 && (
                            <button
                              className="approveButton"
                              style={{ opacity: "10px" }}
                              disabled={rejectStatus === "FAIL" ? true : false}
                              onClick={() =>
                                handleApproveDocument(item.documentId)
                              }
                            >
                              Approve
                            </button>
                          )}

                        {(rolePermission == "superCostCenterManager" ||
                          rolePermission == "costCenterManager" ||
                          rolePermission == "manager") &&
                          item.documentType !== 4 &&
                          item.documentType !== 5 && (
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
                      </td>
                    )}
                    <td className="buttonMargin1">
                      {item.documentType !== 4 &&
                      item.documentType !== 5 &&
                      item.status === 2 &&
                      item.remark !== null
                        ? item.remark
                        : ""}
                    </td>
                    <td className="buttonMargin1">
                      {item.documentType !== 4 &&
                      item.documentType !== 5 &&
                      (item.status === 2 || item.status === 1)
                        ? item.verifiedDate !== null
                          ? item.verifiedDate
                          : "N/A"
                        : ""}
                    </td>
                    :
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
                              Offer Letter
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
                        ) : //  item.documentType === 14 ? (
                        //   <p>
                        //     <span style={{ //color: "black", fontSize: "16px" }}>
                        //       Passport
                        //     </span>{" "}
                        //     <span style={{ //color: "red" }}>*</span>
                        //   </p>
                        // )
                        item.documentType === 15 ? (
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
                        {/* : (
                          item.documentType === 17 && (
                            <p>
                              <span
                                style={{ color: "black", fontSize: "16px" }}
                              >
                                FRRO
                              </span>{" "}
                              <span style={{ color: "red" }}>*</span>
                            </p>
                          )
                        ) */}
                      </p>
                      {item.documentType >= 6 &&
                      item.documentType !== 24 &&
                      item.documentType !== 14 &&
                      item.documentType !== 17 ? (
                        <React.Fragment>
                          <a
                            href="#"
                          >
                            {downloadedFile && (
                              <img src={downloadedFile} alt="" />
                            )}
                            {item.documentName}
                          </a>
                          {/* <button
                            className="downloadButton"
                            onClick={() => downloadDocument(item.documentName)}
                          >
                            Download
                          </button> */}
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </td>
                    {item.documentType >= 6 &&
                    item.documentType !== 24 &&
                    item.documentType !== 14 &&
                    item.documentType !== 17 ? (
                      <React.Fragment>
                        <td className="buttonMargin1">
                        {/* <a
                        href={(imageViewData !== null && imageViewData !== undefined &&
                          Object.keys(imageViewData).length !== 0 && imageViewData.data)?imageViewData.data:""}
                        target="_blank"
                      > */}
                        <button className="downloadButton" onClick={()=>{ImageView(item.documentName,item.candidateId);handleDocShow()}}>View</button>
                          {/* </a> */}
                        </td>
                        <td className="buttonMargin1">
                          <button
                            className="downloadButton"
                            onClick={() => downloadDocument(item.documentName,item.candidateId)}
                          >
                            Download
                          </button>
                        </td>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {item.statusDesc !== null &&
                    item.statusDesc !== "Pending" &&
                    item.documentType >= 6 &&
                    item.documentType !== 24 &&
                    item.documentType !== 14 &&
                    item.documentType !== 17 &&
                    item.documentType !== 10 &&
                    item.documentType !== 11 &&
                    item.documentType !== 16 &&
                    item.documentType !== 15 &&
                    item.documentType !== 12 ? (
                      <td className="buttonMargin1">{item.statusDesc}</td>
                    ) : item.documentType >= 6 &&
                      item.documentType !== 24 &&
                      item.documentType !== 14 &&
                      item.documentType !== 15 &&
                      item.documentType !== 16 &&
                      item.documentType !== 17 &&
                      item.documentType !== 10 &&
                      item.documentType !== 11 &&
                      item.documentType !== 12 ? (
                      <td className="buttonMargin1">
                        <button
                          className="approveButton"
                          onClick={() => handleApproveDocument(item.documentId)}
                        >
                          Approve
                        </button>
                        {(rolePermission == "superCostCenterManager" ||
                          rolePermission == "costCenterManager" ||
                          rolePermission == "manager") && (
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
                    ) : (
                      ""
                    )}

                    {item.remark !== null ? (
                      <td className="buttonMargin1">
                        {item.documentType >= 6 &&
                          item.documentType !== 24 &&
                          item.documentType !== 14 &&
                          item.documentType !== 15 &&
                          item.documentType !== 16 &&
                          item.documentType !== 17 &&
                          item.documentType !== 10 &&
                          item.documentType !== 11 &&
                          item.documentType !== 12 &&
                          item.status === 2 &&
                          item.remark}
                      </td>
                    ) : (
                      item.documentType >= 6 &&
                      item.documentType !== 24 &&
                      item.documentType !== 14 &&
                      item.documentType !== 15 &&
                      item.documentType !== 16 &&
                      item.documentType !== 17 &&
                      item.documentType !== 10 &&
                      item.documentType !== 11 &&
                      item.documentType !== 12 &&
                      item.status === 1 && <td className="buttonMargin1"></td>
                    )}
                    {item.verifiedDate !== null && item.status !== 0 ? (
                      <td className="buttonMargin1">
                        {item.documentType >= 6 &&
                          item.documentType !== 24 &&
                          item.documentType !== 14 &&
                          item.documentType !== 15 &&
                          item.documentType !== 16 &&
                          item.documentType !== 17 &&
                          item.documentType !== 10 &&
                          item.documentType !== 11 &&
                          item.documentType !== 12 &&
                          item.verifiedDate}
                      </td>
                    ) : (
                      item.documentType >= 6 &&
                      item.documentType !== 24 &&
                      item.documentType !== 14 &&
                      item.documentType !== 15 &&
                      item.documentType !== 16 &&
                      item.documentType !== 17 &&
                      item.documentType !== 10 &&
                      item.documentType !== 11 &&
                      item.documentType !== 12 && (
                        <td className="buttonMargin1"></td>
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
      {/* {user.role === "ADMIN" && (
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
      )} */}
      {/* {UANNo && (
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
                  maxLength="12"
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
        {state !== undefined && state.verificationStatus === 1 && (
          // <Link to="/candidate-verification">
          <button className="onboardButton" onClick={() => handleOnboard()}>
            Onboard Candidate
          </button>
          /* </Link> */
        )}
        {state !== undefined && state.verificationStatus === 2 && (
          // <Link to="/candidate-verification">
          <button className="onboardButton" onClick={() => handleReupload()}>
            Submit
          </button>
          /* </Link> */
        )}
      </div>
    </Fragment>
  );
};
export default DocVerification;
