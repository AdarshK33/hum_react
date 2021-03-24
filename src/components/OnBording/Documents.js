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
  const [isChecked, changeState] = useState(false);
  const [photoIdError, setPhotoIdError] = useState(false);
  const [aadharIdError, setAadharIdError] = useState(false);
  const [panIdError, setPanIdError] = useState(false);
  const [addressProofError, setAddressProofError] = useState(false);
  const [eduCertificatesError, setEduCertificatesError] = useState(false);
  const [relievingLetterError, setRelievingLetterError] = useState(false);
  const [latestPaySlipsError, setLatestPaySlipsError] = useState(false);

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
  });

  const PhotoIdErrorValidation = () => {
    if (state.photoId !== "") {
      setPhotoIdError(false);
      console.log("photoSuccess");
      return true;
    } else {
      setPhotoIdError(true);
      console.log("photoFail");
      return false;
    }
  };
  const AadharIdErrorValidation = () => {
    if (state.aadharId !== "") {
      setAadharIdError(false);
      console.log("aadharSuccess");
      return true;
    } else {
      setAadharIdError(true);
      console.log("aadharFail");
      return false;
    }
  };
  const PanIdErrorValidation = () => {
    if (state.panId !== "") {
      setPanIdError(false);
      console.log("panSuccess");
      return true;
    } else {
      setPanIdError(true);
      console.log("panFail");
      return false;
    }
  };
  const AddressProofValidation = () => {
    if (state.addressProof !== "") {
      setAddressProofError(false);
      console.log("addressSuccess");
      return true;
    } else {
      setAddressProofError(true);
      console.log("addressFail");
      return false;
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
  };

  const submitHandler = (e) => {
    const value = checkValidations();
    if (value === true) {
      console.log(state);
      const nextPage = props.NextStep;
      nextPage();
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
      {!isChecked ? (
        <Form>
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
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
                      class="fa fa-upload"
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
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
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
                      class="fa fa-upload"
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
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
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
                      class="fa fa-upload"
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

          <Row>
            <Col>
              <Form.Group>
                <div className="FileInput">
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
                      class="fa fa-upload"
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
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInputWithOutStar">
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
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <div className="FileInputWithOutStar">
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
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      ) : (
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
                      class="fa fa-upload"
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
                      class="fa fa-upload"
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
                      class="fa fa-upload"
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
        </Form>
      )}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
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
