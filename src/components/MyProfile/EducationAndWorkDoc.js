import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import ViewTheLetter from "./view";
import { PermissionContext } from "../../context/PermissionState";

const EducationAndWorkDoc = (props) => {
  const { user,fetchemployeeData } = useContext(AppContext);
  const { DocumentView, documentsList, letterShow, SetLetterView } = useContext(
    EmployeeProfileContext
  );
  const { rolePermission ,ImageView,imageViewData} = useContext(PermissionContext);
  const { downloadFile } = useContext(DocsVerifyContext);
  const [educationDocName, setEducationDocName] = useState("");
  const [relivingDocName, setRelivingDocName] = useState("");
  const [latestPayslipDocName, setLatestPayslipDocName] = useState("");
  const [collegeDocName, setCollegeDocName] = useState("");
  const [collegeIdName, setCollegeIdName] = useState("");
  const [appointmentDocName, setAppointmentDocName] = useState("");
  const [signedDocName, setSignedDocName] = useState("");
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");

  useEffect(() => {
    DocumentView(fetchemployeeData.employeeId);
  }, []);
  console.log("documentsList", documentsList);
  useEffect(() => {
    if (
      documentsList &&
      documentsList !== null &&
      documentsList !== undefined &&
      Object.keys(documentsList).length !== 0
    ) {
      console.log(documentsList,"myprofile")
      documentsList.map((item, i) => {
        setEmployeeId(item.employeeId)
        if (item.documentType === 6) {
          setEducationDocName(item.documentName);
        } else if (item.documentType === 7) {
          setRelivingDocName(item.documentName);
        } else if (item.documentType === 8) {
          setLatestPayslipDocName(item.documentName);
        } else if (item.documentType === 15) {
          setCollegeDocName(item.documentName);
        } else if (item.documentType === 16) {
          setCollegeIdName(item.documentName);
        } else if (item.documentType === 18) {
          setSignedDocName(item.documentName);
        }
      });
    }
  }, [documentsList]);
  console.log(documentsList,"myprofile")

  const downloadTheLetter = (e, name,employeeData) => {
    e.preventDefault();
    console.log("check", name);
    downloadFile(name,employeeData);
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

  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} EmployeeId={EmployeeId}/> : ""}
      <Form>
        <Row>
          <Col sm={8}>
            <label>
              <b>Highest Education Certificate :</b>
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
                  educationDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) => showTheLetter(e, educationDocName,EmployeeId)}
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
                  educationDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) => downloadTheLetter(e, educationDocName,EmployeeId)}
                disabled={educationDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
        {fetchemployeeData &&
        fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 &&
        fetchemployeeData.contractType.toLowerCase() !== "internship" ? 
          <Fragment>
        <Row>
          <Col sm={8}>
            <label>
              <b>Relieving Letter :</b>
            </label>
            <br />
            <label className="itemResult">{relivingDocName}</label>
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
                className={relivingDocName ? "profileButtons" : "confirmButton"}
                onClick={(e, name) => showTheLetter(e, relivingDocName,EmployeeId)}
                disabled={relivingDocName ? false : true}
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
                className={relivingDocName ? "profileButtons" : "confirmButton"}
                onClick={(e, name) => downloadTheLetter(e, relivingDocName,EmployeeId)}
                disabled={relivingDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <label>
              <b>Latest Payslip :</b>
            </label>
            <br />
            <label className="itemResult">{latestPayslipDocName}</label>
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
                  latestPayslipDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) => showTheLetter(e, latestPayslipDocName,EmployeeId)}
                disabled={latestPayslipDocName ? false : true}
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
                  latestPayslipDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) =>
                  downloadTheLetter(e, latestPayslipDocName,EmployeeId)
                }
                disabled={latestPayslipDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
        </Fragment>
        :""
        }
        {fetchemployeeData &&
        fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 &&
        fetchemployeeData.contractType.toLowerCase() === "internship" ? (
          <Row>
            <Col sm={8}>
              <label>
                <b>College Letter :</b>
              </label>
              <br />
              <label className="itemResult">{collegeDocName}</label>
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
                    collegeDocName ? "profileButtons" : "confirmButton"
                  }
                  onClick={(e, name) => showTheLetter(e, collegeDocName,EmployeeId)}
                  disabled={collegeDocName ? false : true}
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
                    collegeDocName ? "profileButtons" : "confirmButton"
                  }
                  onClick={(e, name) => downloadTheLetter(e, collegeDocName,EmployeeId)}
                  disabled={collegeDocName ? false : true}
                >
                  Download
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {fetchemployeeData &&
        fetchemployeeData !== null &&
        fetchemployeeData !== undefined &&
        Object.keys(fetchemployeeData).length !== 0 &&
        fetchemployeeData.contractType.toLowerCase() === "internship" ? (
          <Row>
            <Col sm={8}>
              <label>
                <b>College ID :</b>
              </label>
              <br />
              <label className="itemResult">{collegeIdName}</label>
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
                    collegeIdName ? "profileButtons" : "confirmButton"
                  }
                  onClick={(e, name) => showTheLetter(e, collegeIdName,EmployeeId)}
                  disabled={collegeIdName ? false : true}
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
                    collegeIdName ? "profileButtons" : "confirmButton"
                  }
                  onClick={(e, name) => downloadTheLetter(e, collegeIdName,EmployeeId)}
                  disabled={collegeIdName ? false : true}
                >
                  Download
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {/* <Row>
          <Col sm={8}>
            <label>
              <b>System Generated Appointment Letter :</b>
            </label>
            <br />
            <label className="itemResult">{appointmentDocName}</label>
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
                  appointmentDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) => showTheLetter(e, appointmentDocName,EmployeeId)}
                disabled={appointmentDocName ? false : true}
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
                  appointmentDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) => downloadTheLetter(e, appointmentDocName,EmployeeId)}
                disabled={appointmentDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row> */}
        <Row>
          <Col sm={8}>
            <label>
              <b>Signed Appointment Letter :</b>
            </label>
            <br />
            <label className="itemResult">{signedDocName}</label>
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
                className={signedDocName ? "profileButtons" : "confirmButton"}
                onClick={(e, name) => showTheLetter(e, signedDocName,EmployeeId)}
                disabled={signedDocName ? false : true}
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
                className={signedDocName ? "profileButtons" : "confirmButton"}
                onClick={(e, name) => downloadTheLetter(e, signedDocName,EmployeeId)}
                disabled={signedDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default EducationAndWorkDoc;
