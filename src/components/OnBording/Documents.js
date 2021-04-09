import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import './OnBoard.css'
import "./Documents.css";
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
  const [FileName, setFileName] = useState("");
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

  const [state, setState] = useState({
    photoId: "",
    aadharId: "",
    panId: "",
    addressProof: "",
    epfPassBook: "",
    cancelledCheque: "",
    educationCertificate: "",
    relievingLetter: "",
    latestPaySlips: "",
    frro: "",
    passport: "",
    collegeId: "",
    collegeLetter: "",
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
  const changeHandler = (e) => {
    let fileObj = e.target.files;
    setState({
      ...state,
      [e.target.name]: fileObj[0].name,
    });
    console.log(state);
  };

  const onChange = (e) => {
    var files = e.target.files;
    console.log(files[0].name);
    // var filesArr = Array.prototype.slice.call(files);
    // console.log(filesArr);
    setFileName(files[0].name);
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={state.photoId}
                    style={photoIdError ? { borderColor: "red" } : {}}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      className="custom_file_Upload_button"
                      name="photoId"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={aadharIdError ? { borderColor: "red" } : {}}
                    value={state.aadharId}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="aadharId"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={panIdError ? { borderColor: "red" } : {}}
                    value={state.panId}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="panId"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={addressProofError ? { borderColor: "red" } : {}}
                    value={state.addressProof}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="addressProof"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={passportError ? { borderColor: "red" } : {}}
                    value={state.passport}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="passport"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={frroError ? { borderColor: "red" } : {}}
                    value={state.frro}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="frro"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={state.epfPassBook}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="epfPassBook"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <label>Disability Document</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={state.epfPassBook}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="epfPassBook"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    value={state.cancelledCheque}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="cancelledCheque"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={collegeLetterError ? { borderColor: "red" } : {}}
                    value={state.collegeLetter}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="collegeLetter"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={collegeIdError ? { borderColor: "red" } : {}}
                    value={state.collegeId}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="collegeId"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={eduCertificatesError ? { borderColor: "red" } : {}}
                    value={state.educationCertificate}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="educationCertificate"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={relievingLetterError ? { borderColor: "red" } : {}}
                    value={state.relievingLetter}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="relievingLetter"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={latestPaySlipsError ? { borderColor: "red" } : {}}
                    value={state.latestPaySlips}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="latestPaySlips"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form 11 Declaration</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={relievingLetterError ? { borderColor: "red" } : {}}
                    value={state.relievingLetter}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="relievingLetter"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the Form 11
                    Declaration
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
                  <label>Form 2 EPF Nomination</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={relievingLetterError ? { borderColor: "red" } : {}}
                    value={state.relievingLetter}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="relievingLetter"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the Form 2 EPF
                    Nomination
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
                  <label>Form F Gratuity</label>
                </div>
                <div className="parentInput">
                  <input
                    className="fileInputField"
                    placeholder="Choose File"
                    type="text"
                    style={relievingLetterError ? { borderColor: "red" } : {}}
                    value={state.relievingLetter}
                    readOnly
                  />
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="relievingLetter"
                      className="custom_file_Upload_button"
                      onChange={changeHandler}
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
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please upload the Form F Gratuity
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
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
