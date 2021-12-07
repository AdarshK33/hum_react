import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import { DocsVerifyContext } from "../../context/DocverificationState";
import ViewTheLetter from "./view";

const EducationAndWorkDoc = (props) => {
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
              <b>Heighest Education Certificate :</b>
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
                  educationDocName ? "profileButtons" : "confirmButton"
                }
                onClick={(e, name) => downloadTheLetter(e, educationDocName)}
                disabled={educationDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
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
                onClick={(e, name) => showTheLetter(e, relivingDocName)}
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
                onClick={(e, name) => downloadTheLetter(e, relivingDocName)}
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
                onClick={(e, name) => showTheLetter(e, latestPayslipDocName)}
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
                  downloadTheLetter(e, latestPayslipDocName)
                }
                disabled={latestPayslipDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
        {user &&
        user !== null &&
        user !== undefined &&
        Object.keys(user).length !== 0 &&
        user.contractType.toLowerCase() === "internship" ? (
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
                  onClick={(e, name) => showTheLetter(e, collegeDocName)}
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
                  onClick={(e, name) => downloadTheLetter(e, collegeDocName)}
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
        <Row>
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
                onClick={(e, name) => showTheLetter(e, appointmentDocName)}
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
                onClick={(e, name) => downloadTheLetter(e, appointmentDocName)}
                disabled={appointmentDocName ? false : true}
              >
                Download
              </button>
            </div>
          </Col>
        </Row>
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
                onClick={(e, name) => showTheLetter(e, signedDocName)}
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
                onClick={(e, name) => downloadTheLetter(e, signedDocName)}
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
