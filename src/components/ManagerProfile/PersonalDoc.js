import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { PermissionContext } from "../../context/PermissionState";

import ViewTheLetter from "./view";
import { ToastContainer, toast } from "react-toastify";


const PersonalDoc = (props) => {
  const { user,fetchemployeeData } = useContext(AppContext);
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);

  const {
    DocumentView,
    documentsList,
    letterShow,
    SetLetterView,
    uploadFile,
    loader,
    currentEmpId,
  } = useContext(EmployeeProfileContext);
  const { downloadFile } = useContext(DocsVerifyContext);
  const [photoGraphName, setPhotoGraphName] = useState("");
  const [cancelledCheque, setCancelledChequeName] = useState("");
  const [PANName, setPANName] = useState("");
  const [AddressProofName, setAddressProofName] = useState("");
  const [adharCardName, setAdharCardName] = useState("");
  const [EPFName, setEPFName] = useState("");
  const [passPortName, setPassPortName] = useState("");

  const [photoGraphStatus, setPhotoGraphStatus] = useState("");
  const [cancelledChequeStatus, setCancelledChequeStatus] = useState("");
  const [PANStatus, setPANStatus] = useState("");
  const [AddressProofStatus, setAddressProofStatus] = useState("");
  const [adharCardStatus, setAdharCardStatus] = useState("");
  const [EPFStatus, setEPFStatus] = useState("");
  const [passPortStatus, setPassPortStatus] = useState("");

  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [state, setState] = useState({
    photoId: "",
    cancelledCheque: "",
    panId: "",
    addressProof: "",
    aadharId: "",
    epfPassBook: "",
    passport: "",
  });
  const [stateOfName, setStateOfNames] = useState({
    photoId: "",
    cancelledCheque: "",
    panId: "",
    addressProof: "",
    aadharId: "",
    epfPassBook: "",
    passport: "",
  });
  const [UploadedArray, setUploadedError] = useState([
    {
      ULPhotoId: false,
      ULAdharId: false,
      ULPanId: false,
      ULAddressProof: false,
      ULEpfPassBook: false,
      ULCancelledCheque: false,
      ULFrro: false,
      ULPassport: false,
      ULCollegeId: false,
      ULCollegeLetter: false,
      ULEducationCer: false,
      ULRelivingLetter: false,
      ULLatestPaySlip: false,
    },
  ]);

  useEffect(() => {
    DocumentView(currentEmpId);
  }, []);
  console.log("documentsList", documentsList);
  useEffect(() => {
    if (
      documentsList &&
      documentsList !== null &&
      documentsList !== undefined &&
      Object.keys(documentsList).length !== 0
    ) {
      documentsList.map((item, i) => {
        setEmployeeId(item.employeeId)
        if (item.documentType === 0) {
          setPhotoGraphName(item.documentName);
          setPhotoGraphStatus(item.status)
        } else if (item.documentType === 5) {
          setCancelledChequeName(item.documentName);
          setCancelledChequeStatus(item.status)
        } else if (item.documentType === 2) {
          setPANName(item.documentName);
          setPANStatus(item.status)
        } else if (item.documentType === 3) {
          setAddressProofName(item.documentName);
          setAddressProofStatus(item.status)
        } else if (item.documentType === 1) {
          setAdharCardName(item.documentName);
          setAdharCardStatus(item.status)
        } else if (item.documentType === 4) {
          setEPFName(item.documentName);
          setEPFStatus(item.status)
        } else if (item.documentType === 14) {
          setPassPortName(item.documentName);
          setPassPortStatus(item.status)
        }
      });
    }
  }, [documentsList]);
  const downloadTheLetter = (e, name,EmployeeId) => {
    e.preventDefault();
    console.log("check", name);

    downloadFile(name,EmployeeId);
  };
  const showTheLetter = (e, name,EmployeeId) => {
    e.preventDefault();
    console.log("check", name);
    if (name !== null && name !== undefined) {
      let splitStr = name.split(".");

      if (
        splitStr[1] !== null &&
        splitStr[1] !== undefined &&
        splitStr[1] !== "" &&
        splitStr[1].toLowerCase() === "pdf"
      ) {
        console.log(splitStr[1]);
        setName("PDF");
      } else {
        console.log(splitStr[0]);
        setName("JPG");
      }
    }
    ImageView(name,EmployeeId)
    setLetterName(name);
    SetLetterView(true);
    // return <ViewTheLetter DocName={e} />;
  };
  console.log("Name", Name);
  const changeHandler = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    if (
      fileObj.type === "image/jpeg" ||
      fileObj.type === "image/jpg" ||
      fileObj.type === "image/png" ||
      fileObj.type === "application/pdf"
    ) {
      if (fileObj.size/(1024*1024)<= 2) {
        setState({
          ...state,
          [event.target.name]: fileObj,
        });
        setStateOfNames({
          ...stateOfName,
          [event.target.name]:
            fileObj.name.length > 15
              ? fileObj.name.substring(0, 15) + ".."
              : fileObj.name,
        });

        if (event.target.name === "photoId") {
          UploadedArray[0].ULPhotoId = false;
        } else if (event.target.name === "aadharId") {
          UploadedArray[0].ULAdharId = false;
        } else if (event.target.name === "panId") {
          UploadedArray[0].ULPanId = false;
        } else if (event.target.name === "addressProof") {
          UploadedArray[0].ULAddressProof = false;
        } else if (event.target.name === "passport") {
          UploadedArray[0].ULPassport = false;
        } else if (event.target.name === "epfPassBook") {
          UploadedArray[0].ULEpfPassBook = false;
        } else if (event.target.name === "cancelledCheque") {
          UploadedArray[0].ULCancelledCheque = false;
        }
      } else {
        toast.error("File size should not exceed 2mb");
      }
    } else {
      toast.error("Please select jpg, jpeg, png and pdf formats");
    }
  };
  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;

    if (event.target.name === "photoId") {
      // if (PhotoIdErrorValidation() === true) {
      fileUpload = state.photoId;
      fileType = 0;
      UploadedArray[0].ULPhotoId = true;
      // }
    } else if (event.target.name === "aadharId") {
      // if (AadharIdErrorValidation() === true) {
      fileUpload = state.aadharId;
      fileType = 1;
      UploadedArray[0].ULAdharId = true;
      // }
    } else if (event.target.name === "panId") {
      // if (PanIdErrorValidation() === true) {
      fileUpload = state.panId;
      fileType = 2;
      UploadedArray[0].ULPanId = true;
      // }
    } else if (event.target.name === "addressProof") {
      // if (AddressProofValidation() === true) {
      fileUpload = state.addressProof;
      fileType = 3;
      UploadedArray[0].ULAddressProof = true;
      // }
    } else if (event.target.name === "passport") {
      // if (PassPortValidation() === true) {
      fileUpload = state.passport;
      fileType = 14;
      UploadedArray[0].ULPassport = true;
      // }
    } else if (event.target.name === "epfPassBook") {
      // if (EPFValidation() === true) {
      fileUpload = state.epfPassBook;
      fileType = 4;
      UploadedArray[0].ULEpfPassBook = true;
      // }
    } else if (event.target.name === "cancelledCheque") {
      // if (CancelledChequeValidation() === true) {
      fileUpload = state.cancelledCheque;
      fileType = 5;
      UploadedArray[0].ULCancelledCheque = true;
      // }
    }
    if (fileUpload) {
      console.log("inside file info", fileUpload, fileType);
      const fileInfo = {
        employeeId: currentEmpId,
        file: fileUpload,
        fileType: fileType,
      };
      console.log("handleUpload", fileInfo);
      uploadFile(fileInfo);
    } else {
      toast.error("Please select file");
    }
  };
  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} EmployeeId={EmployeeId}/> : ""}
      {loader ? (
        <div className="loader-box loader" style={{ width: "100% !important" }}>
          <div className="loader">
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
          </div>
        </div>
      ) : (
        <Form>
          <Row>
            <Col sm={3} >
              <label className="keyField">
                <b>Photograph :</b>
              </label>
              <br />
              <label className="itemResult">{photoGraphName}</label>
              <p style={{ color: "red" }}>{photoGraphStatus === 0 ? "Admin Document verification is pending" : photoGraphStatus === 2 ? "Admin Rejected the documet":""}</p>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                {/* onClick={submitHandler} */}
                <button
                  className={
                    photoGraphName && photoGraphStatus === 1 ? "profileButtons" : "confirmButton2"
                  }
                  onClick={(e, name) => showTheLetter(e, photoGraphName)}
                  disabled={photoGraphName && photoGraphStatus === 1 ? false : true}
                >
                  View
                </button>
              </div>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                <button
                  className={
                    photoGraphName && photoGraphStatus === 1 ? "profileButtons" : "confirmButton2"
                  }
                  onClick={(e, name) => downloadTheLetter(e, photoGraphName,EmployeeId)}
                  disabled={photoGraphName && photoGraphStatus === 1 ? false : true}
                >
                  Download
                </button>
              </div>
            </Col>
            <Col sm={5} style={{ marginTop: "0.5rem" }}>
              <Form.Group>
                <div className="parentInput">
                  <label className="fileInputField3">
                    &nbsp;&nbsp;
                    {stateOfName.photoId !== ""
                      ? stateOfName.photoId
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      name="photoId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload2">
                    <input
                      type="button"
                      className="custom_file_Upload_button"
                      name="photoId"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icons2"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {/* {photoIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the photo id
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <label className="keyField">
                <b>Cancelled Cheque :</b>
              </label>
              <br />
              <label className="itemResult">{cancelledCheque}</label>
              <p style={{ color: "red" }}>{cancelledChequeStatus=== 0 ? "Admin Document verification is pending": cancelledChequeStatus === 2 ? "Admin Rejected the documet":""}</p>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                {/* onClick={submitHandler} */}
                <button
                   className={
                    cancelledCheque && cancelledChequeStatus === 1 ? "profileButtons" : "confirmButton2"
                  }
                  onClick={(e, name) => showTheLetter(e, cancelledCheque)}
                  disabled={cancelledCheque && cancelledChequeStatus === 1 ? false : true}
                >
                  View
                </button>
              </div>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                <button
                  className={
                    cancelledCheque && cancelledChequeStatus === 1 ? "profileButtons" : "confirmButton2"
                  }
                  onClick={(e, name) => downloadTheLetter(e, cancelledCheque,EmployeeId)}
                  disabled={cancelledCheque && cancelledChequeStatus === 1 ? false : true}
                >
                  Download
                </button>
              </div>
            </Col>
            <Col sm={5} style={{ marginTop: "0.5rem" }}>
              <Form.Group>
                <div className="parentInput">
                  <label className="fileInputField3">
                    &nbsp;&nbsp;
                    {stateOfName.cancelledCheque !== ""
                      ? stateOfName.cancelledCheque
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      name="cancelledCheque"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload2">
                    <input
                      type="button"
                      name="cancelledCheque"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icons2"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>

                {/* {cancelledChequeError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                    cancelled cheque
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            </Col>
          </Row>
          {fetchemployeeData &&
          fetchemployeeData !== null &&
          fetchemployeeData !== undefined &&
          Object.keys(fetchemployeeData).length !== 0 &&
          fetchemployeeData.contractType.toLowerCase() === "local expat" ? (
            ""
          ) : (
            <Row>
              <Col sm={3}>
                <label className="keyField">
                  <b>PAN :</b>
                </label>
                <br />
                <label className="itemResult">{PANName}</label>
                <p style={{ color: "red" }}>{PANStatus=== 0?"Admin Document verification is pending": PANStatus === 2 ? "Admin Rejected the documet":""}</p>
              </Col>
              <Col sm={2}>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "right",
                  }}
                >
                  {/* onClick={submitHandler} */}
                  <button
                    className={PANName && PANStatus === 1 ? "profileButtons" : "confirmButton2"}
                    onClick={(e, name) => showTheLetter(e, PANName)}
                    disabled={PANName && PANStatus === 1 ? false : true}
                  >
                    View
                  </button>
                </div>
              </Col>
              <Col sm={2}>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "right",
                  }}
                >
                  <button
                    className={PANName && PANStatus === 1 ? "profileButtons" : "confirmButton2"}
                    onClick={(e, name) => downloadTheLetter(e, PANName,EmployeeId)}
                    disabled={PANName && PANStatus === 1 ? false : true}
                  >
                    Download
                  </button>
                </div>
              </Col>
              <Col sm={5} style={{ marginTop: "0.5rem" }}>
                <Form.Group>
                  <div className="parentInput">
                    <label className="fileInputField3">
                      &nbsp;&nbsp;
                      {stateOfName.panId !== ""
                        ? stateOfName.panId
                        : "Select File Here"}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        name="panId"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                        readOnly
                      />
                    </label>

                    <label className="custom-file-upload2">
                      <input
                        type="button"
                        name="panId"
                        className="custom_file_Upload_button"
                        onClick={(e) => {
                          handleUpload(e);
                        }}
                      />
                      {/* <i className="fa fa-cloud-upload" />  */}
                      Upload File{" "}
                      <i
                        id="custom_file_upload_icons2"
                        className="fa fa-upload"
                        aria-hidden="true"
                      ></i>
                    </label>
                  </div>
                  {/* {panIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the PAN id
                  </p>
                ) : (
                  <p></p>
                )} */}
                </Form.Group>
              </Col>
            </Row>
          )}
          <Row>
            <Col sm={3}>
              <label className="keyField">
                <b>Address Proof :</b>
              </label>
              <br />
              <label className="itemResult">{AddressProofName}</label>
              <p style={{ color: "red" }}>{AddressProofStatus === 0 ? "Admin Document verification is pending" : AddressProofStatus === 2 ? "Admin Rejected the documet" : ""}</p>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                {/* onClick={submitHandler} */}
                <button
                   className={
                    AddressProofName && AddressProofStatus === 1 ? "profileButtons" : "confirmButton2"
                  }
                  onClick={(e, name) => showTheLetter(e, AddressProofName)}
                  disabled={AddressProofName && AddressProofStatus === 1 ? false : true}
                >
                  View
                </button>
              </div>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                <button
                  className={
                    AddressProofName && AddressProofStatus === 1 ? "profileButtons" : "confirmButton2"
                  }
                  onClick={(e, name) => downloadTheLetter(e, AddressProofName,EmployeeId)}
                  disabled={AddressProofName && AddressProofStatus === 1 ? false : true}
                >
                  Download
                </button>
              </div>
            </Col>
            <Col sm={5} style={{ marginTop: "0.5rem" }}>
              <Form.Group>
                <div className="parentInput">
                  <label className="fileInputField3">
                    &nbsp;&nbsp;
                    {stateOfName.addressProof !== ""
                      ? stateOfName.addressProof
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      name="addressProof"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload2">
                    <input
                      type="button"
                      name="addressProof"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icons2"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {/* {addressProofError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the address
                    Proof
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            </Col>
          </Row>
          {fetchemployeeData &&
          fetchemployeeData !== null &&
          fetchemployeeData !== undefined &&
          Object.keys(fetchemployeeData).length !== 0 &&
          fetchemployeeData.contractType.toLowerCase() === "local expat" ? (
            <Row>
              <Col sm={3}>
                <label className="keyField">
                  <b>Passport :</b>
                </label>
                <br />
                <label className="itemResult">{passPortName}</label>
                <p style={{ color: "red" }}>{passPortStatus === 0 ? "Admin Document verification is pending" : passPortStatus === 2 ? "Admin Rejected the documet" : ""}</p>
              </Col>
              <Col sm={2}>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "right",
                  }}
                >
                  {/* onClick={submitHandler} */}
                  <button
                    className={
                      passPortName && passPortStatus === 1 ? "profileButtons" : "confirmButton2"
                    }
                    onClick={(e, name) => showTheLetter(e, passPortName)}
                    disabled={passPortName && passPortStatus === 1 ? false : true}
                  >
                    View
                  </button>
                </div>
              </Col>
              <Col sm={2}>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "right",
                  }}
                >
                  <button
                    className={
                      passPortName && passPortStatus === 1 ? "profileButtons" : "confirmButton2"
                    }
                    onClick={(e, name) => downloadTheLetter(e, passPortName,EmployeeId)}
                    disabled={passPortName && passPortStatus === 1 ? false : true}
                  >
                    Download
                  </button>
                </div>
              </Col>
              <Col sm={5} style={{ marginTop: "0.5rem" }}>
                <Form.Group>
                  <div className="parentInput">
                    <label className="fileInputField3">
                      &nbsp;&nbsp;
                      {stateOfName.passport !== ""
                        ? stateOfName.passport
                        : "Select File Here"}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        name="passport"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                        readOnly
                      />
                    </label>

                    <label className="custom-file-upload2">
                      <input
                        type="button"
                        name="passport"
                        className="custom_file_Upload_button"
                        onClick={(e) => {
                          handleUpload(e);
                        }}
                      />
                      {/* <i className="fa fa-cloud-upload" />  */}
                      Upload File{" "}
                      <i
                        id="custom_file_upload_icons2"
                        className="fa fa-upload"
                        aria-hidden="true"
                      ></i>
                    </label>
                  </div>
                  {/* {passportError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the passport
                  </p>
                ) : (
                  <p></p>
                )} */}
                </Form.Group>
              </Col>
            </Row>
          ) : (
            ""
          )}
          {fetchemployeeData &&
          fetchemployeeData !== null &&
          fetchemployeeData !== undefined &&
          Object.keys(fetchemployeeData).length !== 0 &&
          fetchemployeeData.contractType.toLowerCase() === "local expat" ? (
            ""
          ) : (
            <Row>
              <Col sm={3}>
                <label>
                  <b>Aadhaar Card :</b>
                </label>
                <br />
                <label className="itemResult">{adharCardName}</label>
                <p style={{ color: "red" }}>{adharCardStatus=== 0 ? "Admin Document verification is pending" : adharCardStatus === 2 ? "Admin Rejected the documet" : ""}</p>
              </Col>
              <Col sm={2}>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "right",
                  }}
                >
                  {/* onClick={submitHandler} */}
                  <button
                    className={
                      adharCardName && adharCardStatus === 1 ? "profileButtons" : "confirmButton2"
                    }
                    onClick={(e, name) => showTheLetter(e, adharCardName)}
                    disabled={adharCardName && adharCardStatus === 1 ? false : true}
                  >
                    View
                  </button>
                </div>
              </Col>
              <Col sm={2}>
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "right",
                  }}
                >
                  <button
                    className={
                      adharCardName && adharCardStatus === 1 ? "profileButtons" : "confirmButton2"
                    }
                    onClick={(e, name) => downloadTheLetter(e, adharCardName,EmployeeId)}
                    disabled={adharCardName && adharCardStatus === 1 ? false : true}
                  >
                    Download
                  </button>
                </div>
              </Col>
              <Col sm={5} style={{ marginTop: "0.5rem" }}>
                <Form.Group>
                  <div className="parentInput">
                    <label className="fileInputField3">
                      &nbsp;&nbsp;
                      {stateOfName.aadharId !== ""
                        ? stateOfName.aadharId
                        : "Select File Here"}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        name="aadharId"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                        readOnly
                      />
                    </label>

                    <label className="custom-file-upload2">
                      <input
                        type="button"
                        name="aadharId"
                        className="custom_file_Upload_button"
                        onClick={(e) => {
                          handleUpload(e);
                        }}
                      />
                      {/* <i className="fa fa-cloud-upload" />  */}
                      Upload File{" "}
                      <i
                        id="custom_file_upload_icons2"
                        className="fa fa-upload"
                        aria-hidden="true"
                      ></i>
                    </label>
                  </div>
                  {/* {aadharIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the aadhaar
                    id
                  </p>
                ) : (
                  <p></p>
                )} */}
                </Form.Group>
              </Col>
            </Row>
          )}
          <Row>
            <Col sm={3}>
              <label className="keyField">
                <b>EPF Passbook (first page):</b>
              </label>
              <br />
              <label className="itemResult">{EPFName}</label>
              <p style={{ color: "red" }}>{EPFStatus=== 0 ? "Admin Document verification is pending": EPFStatus === 2 ? "Admin Rejected the documet" : ""}</p>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                {/* onClick={submitHandler} */}
                <button
                  className={EPFName && EPFStatus === 1 ? "profileButtons" : "confirmButton2"}
                  onClick={(e, name) => showTheLetter(e, EPFName)}
                  disabled={EPFName && EPFStatus === 1 ? false : true}
                >
                  View
                </button>
              </div>
            </Col>
            <Col sm={2}>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                <button
                  className={EPFName && EPFStatus === 1 ? "profileButtons" : "confirmButton2"}
                  onClick={(e, name) => downloadTheLetter(e, EPFName,EmployeeId)}
                  disabled={EPFName && EPFStatus===1 ? false : true}
                >
                  Download
                </button>
              </div>
            </Col>
            <Col sm={5} style={{ marginTop: "0.5rem" }}>
              <Form.Group>
                <div className="parentInput">
                  <label className="fileInputField3">
                    &nbsp;&nbsp;
                    {stateOfName.epfPassBook !== ""
                      ? stateOfName.epfPassBook
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      name="epfPassBook"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload2">
                    <input
                      type="button"
                      name="epfPassBook"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icons2"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {/* {EPFError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the EPF Pass
                    book
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )}
    </Fragment>
  );
};
export default PersonalDoc;
