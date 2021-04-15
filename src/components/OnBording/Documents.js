import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import './OnBoard.css'
import "./Documents.css";
import { toast } from "react-toastify";
import { OnBoardContext } from "../../context/OnBoardState";
import { OfferContext } from "../../context/OfferState";
// File Type list:
// Photo = 0
// Aadhaar = 1
// PAN = 2
// Address = 3
// EPF = 4
// Cheque = 5
// Education = 6
// RelievingLetter = 7
// LatestPayslips = 8
// OfferLetter = 9

const Documents = (props) => {
  const { uploadFile, candidateProfileData } = useContext(OnBoardContext);
  const { candidateData } = useContext(OfferContext);
  const [fileName, setFileName] = useState("");
  const [fullTime, setFullTime] = useState(true);
  const [partTime, setParTime] = useState(false);
  const [localExpact, setLocalExpact] = useState(false);
  const [internship, setInternship] = useState(false);
  const [isChecked, changeState] = useState(false);
  const [photoIdError, setPhotoIdError] = useState(false);
  const [aadharIdError, setAadharIdError] = useState(false);
  const [panIdError, setPanIdError] = useState(false);
  const [addressProofError, setAddressProofError] = useState(false);
  const [cancelledChequeError, setCancelledChequeError] = useState(false);
  const [eduCertificatesError, setEduCertificatesError] = useState(false);
  const [relievingLetterError, setRelievingLetterError] = useState(false);
  const [latestPaySlipsError, setLatestPaySlipsError] = useState(false);
  const [frroError, setFrroError] = useState(false);
  const [passportError, setPassPortError] = useState(false);
  const [collegeIdError, setCollegeError] = useState(false);
  const [collegeLetterError, setCollegeLetterError] = useState(false);
  // const [fileUpload, setFileUpload] = useState();
  const [workInfoData, setWorkInfoData] = useState();
  useEffect(() => {
    console.log("candidateProfileData", candidateProfileData);
    console.log("candidateData", candidateData);
  }, [candidateProfileData]);
  useEffect(() => {
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.workInformation
    ) {
      setWorkInfoData(candidateData.workInformation);
    }
  }, [candidateData]);
  console.log("contractType", workInfoData);

  useEffect(() => {
    if (
      workInfoData !== null &&
      workInfoData !== undefined &&
      Object.keys(workInfoData).length !== 0 &&
      workInfoData.contractType !== null
    ) {
      if (workInfoData.contractType === "Permanent") {
        console.log("permanent");
        setFullTime(true);
        setParTime(false);
        setInternship(false);
        setLocalExpact(false);
      } else if (workInfoData.contractType === "Parttime") {
        console.log("Parttime");
        setParTime(true);
        setFullTime(false);
        setInternship(false);
        setLocalExpact(false);
      } else if (workInfoData.contractType === "Internship") {
        setInternship(true);
        setParTime(false);
        setFullTime(false);
        setLocalExpact(false);
      } else if (workInfoData.contractType === "Others") {
        setLocalExpact(true);
        setParTime(false);
        setFullTime(false);
        setInternship(false);
      }
      whichOneIsRequired();
    }
  }, [workInfoData]);
  const [state, setState] = useState({
    photoId: "",
    aadharId: "",
    panId: "",
    addressProof: "",
    passport: "",
    epfPassBook: "",
    cancelledCheque: "",
    educationCertificate: "",
    relievingLetter: "",
    latestPaySlips: "",
    frro: "",
    passport: "",
    collegeId: "",
    collegeLetter: "",
    disabilityDocument: "",
    form11: "",
    form2epf: "",
    formf: "",
  });

  const [FandP_Time_Required, setFandP_Required] = useState([
    {
      ReqPhotoId: false,
      ReqAdharId: false,
      ReqPanId: false,
      ReqAddressProof: false,
      ReqEpfPassBook: false,
      ReqCancelledCheque: false,
      ReqFrro: false,
      ReqPassport: false,
      ReqCollegeId: false,
      ReqCollegeLetter: false,
    },
  ]);

  const whichOneIsRequired = () => {
    if ((partTime === true) | (fullTime === true)) {
      let tempArray = [...FandP_Time_Required];
      tempArray[0].ReqPhotoId = true;
      tempArray[0].ReqAdharId = true;
      tempArray[0].ReqPanId = true;
      tempArray[0].ReqAddressProof = true;
      tempArray[0].ReqEpfPassBook = true;
      tempArray[0].ReqCancelledCheque = true;
      tempArray[0].ReqFrro = false;
      tempArray[0].ReqPassport = false;
      tempArray[0].ReqCollegeId = false;
      tempArray[0].ReqCollegeLetter = false;
      setFandP_Required(tempArray);
    }
    if (localExpact === true) {
      let tempArray = [...FandP_Time_Required];
      tempArray[0].ReqPhotoId = true;
      tempArray[0].ReqAdharId = false;
      tempArray[0].ReqPanId = false;
      tempArray[0].ReqAddressProof = false;
      tempArray[0].ReqEpfPassBook = false;
      tempArray[0].ReqCancelledCheque = false;
      tempArray[0].ReqFrro = true;
      tempArray[0].ReqPassport = true;
      tempArray[0].ReqCollegeId = false;
      tempArray[0].ReqCollegeLetter = false;
    }
    if (internship === true) {
      let tempArray = [...FandP_Time_Required];
      tempArray[0].ReqPhotoId = true;
      tempArray[0].ReqAdharId = false;
      tempArray[0].ReqPanId = false;
      tempArray[0].ReqAddressProof = true;
      tempArray[0].ReqEpfPassBook = false;
      tempArray[0].ReqCancelledCheque = true;
      tempArray[0].ReqFrro = false;
      tempArray[0].ReqPassport = false;
      tempArray[0].ReqCollegeId = true;
      tempArray[0].ReqCollegeLetter = true;
    }
  };
  // whichOneIsRequired();
  // console.log(FandP_Time_Required);
  const PhotoIdErrorValidation = () => {
    if (FandP_Time_Required[0].ReqPhotoId === true) {
      if (state.photoId !== "") {
        setPhotoIdError(false);
        console.log("photoSuccess");
        return true;
      } else {
        setPhotoIdError(true);
        console.log("photoFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const AadharIdErrorValidation = () => {
    if (FandP_Time_Required[0].ReqAdharId === true) {
      if (state.aadharId !== "") {
        setAadharIdError(false);
        console.log("aadharSuccess");
        return true;
      } else {
        setAadharIdError(true);
        console.log("aadharFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const PanIdErrorValidation = () => {
    if (FandP_Time_Required[0].ReqPanId === true) {
      if (state.panId !== "") {
        setPanIdError(false);
        console.log("panSuccess");
        return true;
      } else {
        setPanIdError(true);
        console.log("panFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const AddressProofValidation = () => {
    if (FandP_Time_Required[0].ReqAddressProof === true) {
      if (state.addressProof !== "") {
        setAddressProofError(false);
        console.log("addressSuccess");
        return true;
      } else {
        setAddressProofError(true);
        console.log("addressFail");
        return false;
      }
    } else {
      return true;
    }
  };

  const CancelledChequeValidation = () => {
    if (FandP_Time_Required[0].ReqCancelledCheque === true) {
      if (state.cancelledCheque !== "") {
        setCancelledChequeError(false);
        console.log("cancelledchequeSuccess");
        return true;
      } else {
        setCancelledChequeError(true);
        console.log("cancelledcheqFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const PassPortValidation = () => {
    if (FandP_Time_Required[0].ReqPassport === true) {
      if (state.passport !== "") {
        setPassPortError(false);
        console.log("passportSuccess");
        return true;
      } else {
        setPassPortError(true);
        console.log("passportFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const FrroValidation = () => {
    if (FandP_Time_Required[0].ReqFrro === true) {
      if (state.frro !== "") {
        setFrroError(false);
        console.log("frroSuccess");
        return true;
      } else {
        setFrroError(true);
        console.log("frroFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const CollegeLetterValidation = () => {
    if (FandP_Time_Required[0].ReqCollegeLetter === true) {
      if (state.collegeLetter !== "") {
        setCollegeLetterError(false);
        console.log("collegeLetterSuccess");
        return true;
      } else {
        setCollegeLetterError(true);
        console.log("collegeLetterFail");
        return false;
      }
    } else {
      return true;
    }
  };
  const CollegeIdValidation = () => {
    if (FandP_Time_Required[0].ReqCollegeId === true) {
      if (state.collegeId !== "") {
        setCollegeError(false);
        console.log("collegeIdSuccess");
        return true;
      } else {
        setCollegeError(true);
        console.log("collegeIdFail");
        return false;
      }
    } else {
      return true;
    }
  };

  const EducationCertificatesValidation = () => {
    if (state.educationCertificate !== "") {
      setEduCertificatesError(false);
      console.log("eduSuccess");
      return true;
    } else {
      setEduCertificatesError(true);
      console.log("eduFail");
      return false;
    }
  };
  const RelievingLetterValidation = () => {
    if (state.relievingLetter !== "") {
      setRelievingLetterError(false);
      console.log("releivingSuccess");
      return true;
    } else {
      setRelievingLetterError(true);
      console.log("releivingFail");
      return false;
    }
  };
  const PaySlipsValidation = () => {
    if (state.relievingLetter !== "") {
      setLatestPaySlipsError(false);
      console.log("payslipsSuccess");
      return true;
    } else {
      setLatestPaySlipsError(true);
      console.log("paySlipsFail");
      return false;
    }
  };

  const checkValidations = () => {
    if ((partTime === true) | (fullTime === true)) {
      if (
        (PhotoIdErrorValidation() === true) &
        (AadharIdErrorValidation() === true) &
        (PanIdErrorValidation() === true) &
        (AddressProofValidation() === true)
      ) {
        if (
          (EducationCertificatesValidation() === true) &
          (RelievingLetterValidation() === true) &
          (PaySlipsValidation() === true)
        ) {
          return true;
        } else {
          console.log("its came if statement");
          handleShifting();
          return false;
        }
      } else if (
        (EducationCertificatesValidation() === true) &
        (RelievingLetterValidation() === true) &
        (PaySlipsValidation() === true)
      )
        if (
          (PhotoIdErrorValidation() === true) &
          (AadharIdErrorValidation() === true) &
          (PanIdErrorValidation() === true) &
          (AddressProofValidation() === true)
        ) {
          return true;
        } else {
          console.log("its came on else if statement");
          handleShifting();
          return false;
        }
      {
        return false;
      }
    } else {
      if (
        (PhotoIdErrorValidation() === true) &
        (AadharIdErrorValidation() === true) &
        (PanIdErrorValidation() === true) &
        (AddressProofValidation() === true) &
        (CancelledChequeValidation() === true) &
        (PassPortValidation() === true) &
        (FrroValidation() === true) &
        (CollegeLetterValidation() === true) &
        (CollegeIdValidation() === true)
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const submitHandler = (e) => {
    const value = checkValidations();
    if (value === true) {
      console.log(state);
      const nextPage = props.NextStep;
      nextPage(true);
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };

  const handleShifting = () => {
    changeState(!isChecked);
    console.log(!isChecked);
  };
  // const changeHandler = (e) => {
  //   let fileObj = e.target.files;
  // setState({
  //   ...state,
  //   [e.target.name]: fileObj[0].name,
  // });
  //   console.log(state);
  // };

  const changeHandler = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    setState({
      ...state,
      [event.target.name]: fileObj,
    });
    // setFileUpload(fileObj);
  };

  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;

    if (event.target.name === "photoId") {
      fileUpload = state.photoId;
      fileType = 0;
    } else if (event.target.name === "aadharId") {
      fileUpload = state.aadharId;
      fileType = 1;
    } else if (event.target.name === "panId") {
      fileUpload = state.panId;
      fileType = 2;
    } else if (event.target.name === "addressProof") {
      fileUpload = state.addressProof;
      fileType = 3;
    } else if (event.target.name === "passport") {
      fileUpload = state.passport;
      fileType = 0;
    } else if (event.target.name === "frro") {
      fileUpload = state.frro;
      fileType = 0;
    } else if (event.target.name === "epfPassBook") {
      fileUpload = state.epfPassBook;
      fileType = 4;
    } else if (event.target.name === "disabilityDocument") {
      fileUpload = state.disabilityDocument;
      fileType = 0;
    } else if (event.target.name === "cancelledCheque") {
      fileUpload = state.cancelledCheque;
      fileType = 5;
    } else if (event.target.name === "collegeLetter") {
      fileUpload = state.collegeLetter;
      fileType = 0;
    } else if (event.target.name === "collegeId") {
      fileUpload = state.collegeId;
      fileType = 0;
    } else if (event.target.name === "educationCertificate") {
      fileUpload = state.educationCertificate;
      fileType = 6;
    } else if (event.target.name === "relievingLetter") {
      fileUpload = state.relievingLetter;
      fileType = 7;
    } else if (event.target.name === "latestPaySlips") {
      fileUpload = state.latestPaySlips;
      fileType = 8;
    } else if (event.target.name === "form11") {
      fileUpload = state.form11;
      fileType = 10;
    } else if (event.target.name === "form2epf") {
      fileUpload = state.form2epf;
      fileType = 11;
    } else if (event.target.name === "formf") {
      fileUpload = state.formf;
      fileType = 12;
    }
    if (fileUpload) {
      console.log("inside file info", fileUpload, fileType);
      const fileInfo = {
        candidateId: candidateProfileData.candidateId,
        file: fileUpload,
        fileType: fileType,
      };
      console.log("handleUpload", fileInfo);
      uploadFile(fileInfo);
    } else {
      toast.info("Something went wrong");
    }
  };

  return (
    <Fragment>
      {(localExpact === false) & (internship === false) ? (
        <Row>
          <Col>
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
          </Col>
        </Row>
      ) : (
        ""
      )}
      {/* personal documents */}
      <Form>
        {isChecked === false ? (
          // required in all contracts
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqPhotoId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Photo ID</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.photoId !== ""
                      ? state.photoId.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="photoId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      className="custom_file_Upload_button"
                      name="photoId"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {photoIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the photo id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) &
        ((localExpact === true) | (internship === false)) ? (
          //required in full, part time
          // not required for local expact
          //no need on intership
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqAdharId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>
                    Aadhaar ID
                    <span style={{ color: "#47ef47", fontStyle: "italic" }}>
                      (Upload the first and last page)
                    </span>
                  </label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.aadharId !== ""
                      ? state.aadharId.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="aadharId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
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
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {aadharIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the aadhaar id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) &
        ((localExpact === true) | (internship === false)) ? (
          //required in full, part time
          // not required for local expact
          //no need on intership
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqPanId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>PAN ID</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.panId !== "" ? state.panId.name : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="panId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
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
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {panIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the PAN id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) &
        ((localExpact === false) | (internship === true)) ? (
          // required in internshipp,  full, part time
          //no need on local expact
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqAddressProof
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Address Proof</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.addressProof !== ""
                      ? state.addressProof.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="addressProof"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
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
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {addressProofError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the address Proof
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) & (localExpact === true) ? (
          // only on locak Expact  and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqPassport
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Pass Port</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.passport !== ""
                      ? state.passport.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="passport"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
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
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {passportError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the passport
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) & (localExpact === true) ? (
          // only on locak Expact  and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqFrro
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>FRRO</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.frro !== "" ? state.frro.name : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="frro"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="frro"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {frroError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the FRRO
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) &
        (localExpact === false) &
        (internship === false) ? (
          // required in full time and part time
          //no need on localexact and internship
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqEpfPassBook
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>
                    EPF Passbook
                    <span style={{ color: "#47ef47", fontStyle: "italic" }}>
                      (First page of the book)
                    </span>
                  </label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.epfPassBook !== ""
                      ? state.epfPassBook.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="epfPassBook"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="epfPassBook"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) |
        (localExpact === true) |
        (internship === true) ? (
          // not required for local expact
          // required in internship, full ,part time
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqCancelledCheque
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Cancelled Cheque</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.cancelledCheque !== ""
                      ? state.cancelledCheque.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="cancelledCheque"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
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
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>

                {cancelledChequeError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the cancelled cheque
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) & (internship === true) ? (
          // only on internship and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqCollegeLetter
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>College Letter</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.collegeLetter !== ""
                      ? state.collegeLetter.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="collegeLetter"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="collegeLetter"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {collegeLetterError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the college letter
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) & (internship === true) ? (
          // only on internship and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqCollegeId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>College Id</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.collegeId !== ""
                      ? state.collegeId.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="collegeId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="collegeId"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {collegeIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the college id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Form>
      {isChecked ? (
        <Form>
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Highest education certification</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.educationCertificate !== ""
                      ? state.educationCertificate.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="educationCertificate"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="educationCertificate"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {eduCertificatesError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the highest education
                    certification
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Relieving Letter</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.relievingLetter !== ""
                      ? state.relievingLetter.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="relievingLetter"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="relievingLetter"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {relievingLetterError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the relieving letter
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Latest Payslips</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.latestPaySlips !== ""
                      ? state.latestPaySlips.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="latestPaySlips"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="latestPaySlips"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    {/* <i className="fa fa-cloud-upload" />  */}
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {latestPaySlipsError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the latest payslips
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form 11 Declaration</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;                                
                    {state.form11 !== ""
                      ? state.form11.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="form11"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="form11"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                   
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {relievingLetterError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the Form 11
                    Declaration
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row> */}
          {/* <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form 2 EPF Nomination</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.form2epf !== ""
                      ? state.form2epf.name
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="form2epf"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="form2epf"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {relievingLetterError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the Form 2 EPF
                    Nomination
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row> */}
          {/* <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form F Gratuity</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.formf !== "" ? state.formf.name : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="formf"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label className="custom-file-upload">
                    <input
                      type="button"
                      name="formf"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {relievingLetterError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the Form F Gratuity
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row> */}
        </Form>
      ) : (
        ""
      )}
      <div
        style={{ marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}
      >
        <button className="stepperButtons" onClick={PrevStep}>
          Back
        </button>
        <button className="stepperButtons" onClick={submitHandler}>
          Save & Next
        </button>
      </div>
    </Fragment>
  );
};
export default Documents;
