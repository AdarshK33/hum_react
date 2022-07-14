import React, { Fragment, useState, useContext, useEffect } from "react";

import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { Edit2, Eye, Search, Download } from "react-feather";
import { PermissionContext } from "../../context/PermissionState";
import "../CandidateVerification/ManageCandidate.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";
import ViewTheLetter from "./view";
// import { handleInputChange } from "react-select/src/utils";

const AdminDocVerfication = () => {
  const [isChecked, changeState] = useState(false);
  const [showModal, setModal] = useState(false);
  const [remarks, setremarks] = useState("");
  const [docId, setdocId] = useState("");
  const [remarkError, setRemarkError] = useState(false);
  const [docType, setDocType] = useState("");
  const [LetterName, setLetterName] = useState("");
  const [Name, setName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");

  const { rolePermission } = useContext(PermissionContext);
  const { downloadFile } = useContext(DocsVerifyContext);
  const {
    DocApprove,
    DocDisapprove,
    EmpDocsView,
    EmpDocsData,
    currentEmpId,
    letterShow,
    SetLetterView,
  } = useContext(EmployeeProfileContext);
  useEffect(() => {
    EmpDocsView(currentEmpId);
  }, []);
  const [letterNamesArray, setLetterNamesArray] = useState([
    { key: "Photo", value: "Photo Id" },
    { key: "PAN", value: "PAN Card" },
    { key: "Aadhaar", value: "Aadhaar Card" },
    { key: "Address", value: "Address Proof" },
    { key: "EPF", value: "EPF Pass Book" },
    { key: "Address", value: "Address Proof" },
    { key: "Cheque", value: "Cancelled Cheque" },
    { key: "Disability Doc", value: "Disability" },
    { key: "Form 11(UAN)", value: "Form 11(UAN)" },
    { key: "Form 2(EPF)", value: "Form 2(EPF)" },
    { key: "Form F(Gratuity)", value: "Form F(Gratuity)" },
    { key: "Passport", value: "Passport" },
    { key: "Relieving Letter", value: "Relieving Letter" },
    { key: "Latest Payslips", value: "Latest Payslips" },
  ]);
  //   const FindTheLetterName=(nameKey)=>{

  //        if(Photo) return "Photo";
  //     case 1:
  //         return "Aadhaar";
  //     case 2:
  //         return "PAN";
  //     case 3:
  //         return "Address";
  //     case 4:
  //         return "EPF";
  //     case 5:
  //         return "Cheque";
  //     case 6:
  //         return "Education";
  //     case 7:
  //         return "Relieving Letter";
  //     case 8:
  //         return "Latest Payslips";
  //     case 9:
  //         return "Offer Letter";
  //     case 10:
  //         return "Form 11(UAN)";
  //     case 11:
  //         return "Form 2(EPF)";
  //     case 12:
  //         return "Form F(Gratuity)";
  //     case 13:
  //         return "Disability Doc";
  //     case 14:
  //         return "Passport";
  //     case 15:
  //         return "College Letter";
  //     case 16:
  //         return "College Id";
  //     case 17:
  //         return "Frro";
  //     case 18:
  //         return "Appointment Letter";

  //   }
  const showTheLetter = (e, name,item) => {
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
    setEmployeeId(item.employeeId)
    SetLetterView(true);
    // return <ViewTheLetter DocName={e} />;
  };
  const downloadTheLetter = (e,item) => {
    console.log("check", e,item);
    downloadFile(e,item.employeeId);
  };
  const handleApproveDocument = (Id) => {
    DocApprove(Id);
  };
  const handleDisapproveDocument = (Id) => {
    setModal(true);
    setdocId(Id);
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleSaveRemarks = () => {
    console.log(docId, remarks);
    if (remarks) {
      setRemarkError(false);
      DocDisapprove(docId, remarks);
      setModal(false);
    } else {
      setRemarkError(true);
    }
  };
  return (
    <Fragment>
      {letterShow ? <ViewTheLetter DocName={LetterName} Name={Name} EmployeeId={EmployeeId}/> : ""}
      <Modal show={showModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            {/* <label className="itemResult">State remarks:</label> */}
            <label className="itemResult">Remarks :</label>
            {/* <p>Please state the reason why this employee cannot be re-hired:</p> */}
            <textarea
              className="remarkText rounded"
              name="remarks"
              value={remarks}
              placeholder="Write here.."
              onChange={(e) => setremarks(e.target.value)}
            />

            {remarkError && (
              <p style={{ color: "red" }}>Please add your remarks</p>
            )}
            <div className="text-center mb-2">
              <Button onClick={() => handleSaveRemarks()}>Save</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Breadcrumb
        title="EMPLOYEE DOCUMENT VERIFICATION"
        parent="EMPLOYEE DOCUMENT VERIFICATION"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="OnBoardHeading">
                <strong>EMPLOYEE DOCUMENT VERIFICATION </strong>
              </div>
              <div className="mt-5">
                <Table className="tableWrapper table table-borderless">
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Old Document</th>
                      <th>New Document</th>
                      <th>Status</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EmpDocsData &&
                      Object.keys(EmpDocsData).length &&
                      EmpDocsData.map((item) => {
                        return (
                          <tr>
                            <td>
                              {letterNamesArray.map((itemArray) => {
                                if (itemArray.key === item.fileName) {
                                  return <label>{itemArray.value}</label>;
                                }
                              })}
                            </td>
                            <td>
                              {item.oldDocumentName ? (
                                <div>
                                  <Eye
                                    style={{
                                      textAlign: "right",
                                      fontSize: "xx-small",
                                      color: "#4f90ff",
                                    }}
                                    onClick={(e) =>
                                      showTheLetter(e, item.oldDocumentName,item)
                                    }
                                  />

                                  <Download
                                    style={{
                                      fontSize: "xx-small",
                                      color: "#4f90ff",
                                      marginLeft: "2rem",
                                    }}
                                    onClick={(e) =>
                                      downloadTheLetter(item.oldDocumentName,item)
                                    }
                                  />
                                </div>
                              ) : (
                                "No Documents Available"
                              )}
                            </td>
                            <td>
                              {item.documentName ? (
                                <div>
                                  <div>
                                    <Eye
                                      style={{
                                        textAlign: "right",
                                        fontSize: "xx-small",
                                        color: "#4f90ff",
                                      }}
                                      onClick={(e) =>
                                        showTheLetter(e, item.documentName,item)
                                      }
                                    />
                                    <Download
                                      style={{
                                        fontSize: "xx-small",
                                        color: "#4f90ff",
                                        marginLeft: "2rem",
                                      }}
                                      onClick={(e) =>
                                        downloadTheLetter(item.documentName,item)
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                "No Documents Available"
                              )}
                            </td>
                            {item.statusDesc.toLowerCase() === "pending" ? (
                              <td>
                                <button
                                  className="approveButton ml-4"
                                  onClick={() =>
                                    handleApproveDocument(
                                      item.documentVerificationId
                                    )
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  className="approveButton ml-4"
                                  onClick={() =>
                                    handleDisapproveDocument(
                                      item.documentVerificationId
                                    )
                                  }
                                >
                                  Disapprove
                                </button>
                              </td>
                            ) : (
                              <td>{item.statusDesc}</td>
                            )}
                            <td>{item.remarks}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AdminDocVerfication;
