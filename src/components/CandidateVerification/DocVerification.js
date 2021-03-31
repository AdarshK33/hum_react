import React, { Fragment, useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { OnBoardContext } from "../../context/OnBoardState";
const DocVerification = () => {
  const [isChecked, changeState] = useState(false);

  const { verificationDocsView, docsToVerify } = useContext(DocsVerifyContext);
  const { CandidateProfile } = useContext(OnBoardContext);
  useEffect(() => {
    CandidateProfile();
    // verificationDocsView();
  }, []);
  const handleShifting = () => {
    changeState(!isChecked);
    console.log(!isChecked);
  };
  return (
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
        <Table>
          <thead>
            <tr>
              <th>
                PhotoId<span style={{ color: "red" }}>*</span>
              </th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Dates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PHotoId</td>
              <td>
                <div className="d-inline-flex w-50 text-center">
                  <div className="mr-2">
                    <button className="approveButton rounded">Approve</button>
                  </div>
                  <div className="">
                    <button className=" approveButton rounded">
                      Disapprove
                    </button>
                  </div>
                </div>
              </td>
              <td>NA</td>

              <td>2021-31-03</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};
export default DocVerification;
