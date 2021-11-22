import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import ViewTheLetter from "./view";
import { ToastContainer, toast } from "react-toastify";
const OtherDocuments = (props) => {
  const { user } = useContext(AppContext);
  const { DocumentView, documentsList, letterShow, SetLetterView, uploadFile } =
    useContext(EmployeeProfileContext);
  const { downloadFile } = useContext(DocsVerifyContext);
  const [educationDocName, setEducationDocName] = useState("");
  const [relivingDocName, setRelivingDocName] = useState("");
  const [latestPayslipDocName, setLatestPayslipDocName] = useState("");
  const [collegeDocName, setCollegeDocName] = useState("");
  const [appointmentDocName, setAppointmentDocName] = useState("");
  const [signedDocName, setSignedDocName] = useState("");
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");
  const [DocName, setDocName] = useState("");

  const [stateOfOb, setStateOfOb] = useState({
    addressProof: "",
  });
  const [stateOfName, setStateOfNames] = useState({
    addressProof: "",
  });
  const [UploadedArray, setUploadedError] = useState([
    {
      ULAddressProof: false,
    },
  ]);

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
  const changeHandler1 = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    if (
      fileObj.type === "image/jpeg" ||
      fileObj.type === "image/jpg" ||
      fileObj.type === "image/png" ||
      fileObj.type === "application/pdf"
    ) {
      if (fileObj.size <= 512000) {
        setStateOfOb({
          ...stateOfOb,
          [event.target.name]: fileObj,
        });
        setStateOfNames({
          ...stateOfName,
          [event.target.name]: fileObj.name,
        });

        if (event.target.name === "addressProof") {
          UploadedArray[0].ULAddressProof = false;
        }
      } else {
        toast.error("File size should not exceed 500kb");
      }
    } else {
      toast.error("Please select jpg, jpeg, png and pdf formats");
    }
  };
  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;

    if (event.target.name === "addressProof") {
      // if (AddressProofValidation() === true) {
      fileUpload = stateOfOb.addressProof;
      fileType = 3;
      UploadedArray[0].ULAddressProof = true;
      // }
    }
    if (fileUpload) {
      console.log("inside file info", fileUpload, fileType);
      const fileInfo = {
        employeeId: user.employeeId,
        file: fileUpload,
        fileType: fileType,
      };
      console.log("handleUpload", fileInfo);
      uploadFile(fileInfo);
    } else {
      toast.info("Please select file");
    }
  };

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
                value={DocName}
                onChange={(e) => setDocName(e.target.value)}
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
                  {stateOfName.addressProof !== ""
                    ? stateOfName.addressProof
                    : "Select File Here"}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    name="addressProof"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      changeHandler1(e);
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
      </Form>
    </Fragment>
  );
};
export default OtherDocuments;
