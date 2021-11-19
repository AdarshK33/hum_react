import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import ViewTheLetter from "./view";

const OtherDocuments = (props) => {
  const { user } = useContext(AppContext);
  const { DocumentView, documentsList, letterShow, SetLetterView } = useContext(
    EmployeeProfileContext
  );
  const { downloadFile } = useContext(DocsVerifyContext);
  const [educationDocName, setEducationDocName] = useState("");
  const [relivingDocName, setRelivingDocName] = useState("");
  const [latestPayslipDocName, setLatestPayslipDocName] = useState("");
  const [collegeDocName, setCollegeDocName] = useState("");
  const [appointmentDocName, setAppointmentDocName] = useState("");
  const [signedDocName, setSignedDocName] = useState("");
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");

  useEffect(() => {
    DocumentView();
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
        if (item.documentType === 6) {
          setEducationDocName(item.documentName);
        } else if (item.documentType === 7) {
          setRelivingDocName(item.documentName);
        } else if (item.documentType === 8) {
          setLatestPayslipDocName(item.documentName);
        } else if (item.documentType === 15) {
          setCollegeDocName(item.documentName);
        } else if (item.documentType === 18) {
          setAppointmentDocName(item.documentName);
        } else if (item.documentType === 18) {
          setSignedDocName(item.documentName);
        }
      });
    }
  }, [documentsList]);
  const downloadTheLetter = (e, name) => {
    e.preventDefault();
    console.log("check", name);
    downloadFile(name);
  };
  const showTheLetter = (e, name) => {
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
    setLetterName(name);
    SetLetterView(true);
    // return <ViewTheLetter DocName={e} />;
  };
  console.log("Name", Name);

  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} /> : ""}
      <Form>
        <Row>
          <Col sm={8}>
            <label>
              <b>Ethics Charter :</b>
            </label>
            <br />
            <label className="itemResult">{educationDocName}</label>
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
                  educationDocName ? "stepperButtons" : "confirmButton"
                }
                onClick={(e, name) => showTheLetter(e, educationDocName)}
                disabled={educationDocName ? false : true}
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
                  educationDocName ? "stepperButtons" : "confirmButton"
                }
                onClick={(e, name) => downloadTheLetter(e, educationDocName)}
                disabled={educationDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col sm={4}>
            <Form.Group>
              <Form.Label>
                <b>Name of the document :</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="newDoc"
                //   value={state.flatNumber}
                //   onChange={changeHandler}
                required
                style={
                  false
                    ? { borderColor: "red", borderRadius: "13px" }
                    : { borderRadius: "13px" }
                }
                placeholder="Name of the document"
                //   disabled={disabled}
              />
              {/* {flatNumberErro ? (
                  <p style={{ color: "red" }}> Please enter flat/plot no</p>
                ) : (
                  <p></p>
                )} */}
            </Form.Group>
          </Col>
          <Col sm={8} style={{ marginTop: "1.5rem" }}>
            <Form.Group>
              <div className="parentInput">
                <label className="fileInputField">
                  &nbsp;&nbsp;
                  {/* {stateOfName.photoId !== ""
                      ? stateOfName.photoId
                      : "Select File Here"} */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="photoId"
                    style={{ display: "none" }}
                    //   onChange={(e) => {
                    //     changeHandler(e);
                    //   }}

                    readOnly
                  />
                </label>

                <label className="custom-file-upload">
                  <input
                    type="button"
                    className="custom_file_Upload_button"
                    name="photoId"

                    //   onClick={(e) => {
                    //     handleUpload(e);
                    //   }}
                  />
                  Upload File{" "}
                  <i
                    id="custom_file_upload_icon"
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
      </Form>
    </Fragment>
  );
};
export default OtherDocuments;
