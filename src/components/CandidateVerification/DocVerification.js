import React, { Fragment, useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { useParams } from "react-router-dom";
import "./ManageCandidate.css";
const DocVerification = () => {
  const [isChecked, changeState] = useState(false);
  const params = useParams();
  const candidateId = params["candidateId"];
  const { verificationDocsView, docsToVerify, loader, setLoader } = useContext(
    DocsVerifyContext
  );
  useEffect(() => {
    verificationDocsView(candidateId);
  }, []);
  const handleShifting = () => {
    changeState(!isChecked);
  };
  return (
    console.log(docsToVerify),
    (
      <Fragment>
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
                <th>Documents</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Dates</th>
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
            ) : docsToVerify !== undefined &&
              docsToVerify !== null &&
              docsToVerify.length > 0 ? (
              docsToVerify.map((item, i) => {
                return (
                  <tbody key={i} className="tableText">
                    <tr>
                      <td className="text-left mx-auto px-4 ">
                        <p style={{ color: "black", fontSize: "20px" }}>
                          {item.documentType === 0
                            ? "PhotoID"
                            : item.documentType === 1
                            ? "AadhaarID"
                            : item.documentType === 2
                            ? "Pan number"
                            : item.documentType === 3
                            ? "Address Proof"
                            : "Epfbook"}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        {item.documentName}
                      </td>
                      {item.reviewStatus !== null ? (
                        <td>{item.reviewStatus}</td>
                      ) : (
                        <td className="row text-center">
                          <button className="approveButton">Approve</button>
                          <button className="approveButton ml-4">
                            Disapprove
                          </button>
                        </td>
                      )}
                      {item.remark !== null ? (
                        <td>{item.remark}</td>
                      ) : (
                        <td>NA</td>
                      )}
                      {item.verifiedDate !== null ? (
                        <td>{item.verifiedDate}</td>
                      ) : (
                        <td>NA</td>
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
      </Fragment>
    )
  );
};
export default DocVerification;
