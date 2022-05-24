// import React, { Fragment, useState, useContext, useEffect } from "react";
// import { Modal, Row, Col, Form, Button } from "react-bootstrap";
// import calendarImage from "../../../assets/images/calendar-image.png";
// import moment from "moment";
// import { DisciplinaryContext } from "../../../context/DisciplinaryState";

// const ShowCauseNotice = () => {
//   const { disciplinarySearchData } = useContext(DisciplinaryContext);
//   //   connsole.log("today", moment().format("DD-MM-YYYY"));
//   return (
//     <Fragment>
//       {typeof disciplinarySearchData !== undefined ? (
//         <Fragment>
//           <p className="">
//             {" "}
//             Date: <b>{moment().format("DD-MM-YYYY")}</b>
//           </p>
//           <br></br>

//           <p>To ,</p>
//           <p>
//             {" "}
//             <b>
//               {disciplinarySearchData !== null &&
//               disciplinarySearchData !== undefined &&
//               Object.keys(disciplinarySearchData).legth !== 0 &&
//               disciplinarySearchData.gender !== null &&
//               disciplinarySearchData.gender !== undefined &&
//               disciplinarySearchData.maritalStatus !== null &&
//               disciplinarySearchData.maritalStatus !== undefined
//                 ? disciplinarySearchData.gender === "MALE"
//                   ? "Mr."
//                   : disciplinarySearchData.maritalStatus === "Married"
//                   ? "Mrs."
//                   : "Miss"
//                 : "Mr./Ms."}
//             </b>{" "}
//             &nbsp; {disciplinarySearchData.employeeName}
//           </p>
//           <p>
//             <b>Employee Id:</b> {disciplinarySearchData.employeeId}
//           </p>
//           <p>
//             <b>Residential Address:</b> {disciplinarySearchData.employeeAddress}
//           </p>
//           <p>
//             <b>Sub:</b> Show Cause Notice
//           </p>
//           <div className=" ">
//             <p className="mt-5 ">
//               {" "}
//               Dear <b>{disciplinarySearchData.employeeName},</b>{" "}
//             </p>
//             <br></br>

//             <p>
//               You have been associated with {disciplinarySearchData.company}{" "}
//                (“Decathlon/{disciplinarySearchData.company}),
//               having its registered office at{" "}
//               {disciplinarySearchData.storeAddressLine}, at its Store located at{" "}
//               <b>{disciplinarySearchData.storeLocation}</b> (“Decathlon/
//               {disciplinarySearchData.company}”). You are currently working at
//               Decathlon <b>{disciplinarySearchData.department}</b> as{" "}
//               <b>{disciplinarySearchData.position}</b>.
//               <br />
//               <p>
//                 It is reported against you that you have indulged in Gross
//                 Negligence and Misconduct{" "}
//               </p>
//               <br />
//               <b>
//                 {disciplinarySearchData !== null &&
//                 disciplinarySearchData !== undefined &&
//                 disciplinarySearchData.disciplinaryAction !== null &&
//                 disciplinarySearchData.disciplinaryAction !== undefined &&
//                 Object.keys(disciplinarySearchData).length !== 0
//                   ? disciplinarySearchData.disciplinaryAction.managerComment
//                   : ""}
//               </b>
//               .
//               <br />
//               <br />
//               This acts, as alleged above to have been committed by you,amount
//               to{" "}
//               {disciplinarySearchData !== null &&
//               disciplinarySearchData !== undefined &&
//               disciplinarySearchData.disciplinaryAction !== null &&
//               disciplinarySearchData.disciplinaryAction !== undefined &&
//               Object.keys(disciplinarySearchData).length !== 0 &&
//               disciplinarySearchData.disciplinaryAction.reason ===
//                 "Misconduct" ? (
//                 <b>{disciplinarySearchData.disciplinaryAction.reasonDetails}</b>
//               ) : (
//                 <b>Wilful Misconduct and Gross Negligence</b>
//               )}{" "}
//               which, if proved, would warrant serious disciplinary action
//               against you.
//               <br />
//               <br />
//               Accordingly, you are hereby required to show cause within <b>
//                 5
//               </b>{" "}
//               days in receipt of this letter as to why you have indulged in such
//               an act of wilful misconduct and Gross Negligence. Such charges,
//               levelled against you, are of grave and serious nature, if you fail
//               to submit the explanation as required, it will be presumed that
//               you admit the charges and have no explanation to offer and the
//               matter will be disposed of without any further reference to you.
//               <br />
//               <br />
//               <br />
//               The receipt of this letter should be acknowledged.
//               <br />
//             </p>
//             <p className="mt-5 ">
//               <b>{disciplinarySearchData.company} Pvt Ltd,</b>
//             </p>
//             <div className="float-right "></div>
//           </div>
//         </Fragment>
//       ) : (
//         ""
//       )}
//     </Fragment>
//   );
// };

// export default ShowCauseNotice;

//new template misconduct show cause letter

import React, {
  Fragment,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import { E_signContext } from "../../../context/E_signState";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../../context/PermissionState";
import { AppContext } from "../../../context/AppState";

const ShowCauseNotice = ({ approver = true, sign = true }) => {
  console.log("approver", approver);
  const {
    disciplinarySearchData,
    SubmitDisciplinaryLetter,
    createShowCauseIssue,
    loader,
    lettterview,
    setViewLetter,
    setModal,
    modalView,
    setModalLetter,
    modalViewLetter,
    setShowValue,
    lettterviewShow
  } = useContext(DisciplinaryContext);
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const history = useHistory();
  const ref = React.createRef();
  const inputRef = useRef(null);
  const [saveLetter, setSaveLetter] = useState(false);
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
    setModal(false);
    setModalLetter(false);
    setShowValue(false)
  };

  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  console.log(disciplinarySearchData, "disciplinarySearchData");

  const submitfinalShowCauseLetter = (e) => {
    e.preventDefault();
    setSaveLetter(true);
    if (
      disciplinarySearchData &&
      disciplinarySearchData &&
      disciplinarySearchData !== null &&
      disciplinarySearchData !== undefined &&
      Object.keys(disciplinarySearchData).length !== 0 &&
      disciplinarySearchData.disciplinaryAction !== null &&
      disciplinarySearchData.disciplinaryAction !== undefined &&
      disciplinarySearchData.disciplinaryAction.disciplinaryId !== 0
    ) {
      console.log("INSIDE nonperformance");

      const InfoData = {
        contractType: disciplinarySearchData.contractType,
        disciplinaryAction: {
          actionDueDays:
            disciplinarySearchData.disciplinaryAction.actionDueDays,
          actionIssuedDate:
            disciplinarySearchData.disciplinaryAction.actionIssuedDate,
          disciplinaryId:
            disciplinarySearchData.disciplinaryAction.disciplinaryId,
          employeeActionStatus:
            disciplinarySearchData.disciplinaryAction.employeeActionStatus,
          employeeComment:
            disciplinarySearchData.disciplinaryAction.employeeComment,
          employeeId: disciplinarySearchData.employeeId,
          initiatedRole:
            disciplinarySearchData.disciplinaryAction.initiatedRole,
          managerComment:
            disciplinarySearchData.disciplinaryAction.managerComment,
          reasonId: disciplinarySearchData.disciplinaryAction.reasonId,
          reasonDetailsId:
            disciplinarySearchData.disciplinaryAction.reasonDetailsId,
          showCauseLetter: "ShowCauseLetter.pdf",
          //  showCauseNotice: null, //31/1/2022
          status: approver === true ? 0 : 2,
          // rolePermission == "costCenterManager" ? 2 : 0,
          statusDesc: disciplinarySearchData.disciplinaryAction.statusDesc,
          warningIssued: false,
        },
        disciplinaryWarning: null,
        employeeAddress: disciplinarySearchData.employeeAddress,
        employeePosition: disciplinarySearchData.employeePosition,
        employeeCostCentre: disciplinarySearchData.employeeCostCentre,
        employeeId: disciplinarySearchData.employeeId,
        employeeName: disciplinarySearchData.employeeName,
        managerCostCentre: disciplinarySearchData.managerCostCentre,
        managerDesignation: disciplinarySearchData.managerDesignation,
        managerId: disciplinarySearchData.managerId,
        managerName: disciplinarySearchData.managerName,
        // {
        //   "disciplinaryId": 0,
        //   "employeeComment": "string",
        //   "employeeWarningStatus": "string",
        //   "improvementPeriod": 0,
        //   "managerComment": "string",
        //   "reason": "string",
        //   "reasonDetails": "string",
        //   "status": 0,
        //   "statusDesc": "string",
        //   "warningDueDays": 0,
        //   "warningId": 0,
        //   "warningIssuedDate": "string",
        //   "warningLetter": "string"
        // },
      };
      const infoData = {
        inputRef: inputRef,
        empId: disciplinarySearchData.employeeId,
        candidateId: 0,
        module: "Disciplinary Action",
        empName: user.firstName + " " + user.lastName,
        empEmail: user.email,
        empPhNo: user.phone,
        history: history,
        path: "../disciplinary-action",
      };
      console.log("createShowCauseData", InfoData);
      createShowCauseIssue(InfoData, disciplinarySearchData.employeeId);
      SubmitDisciplinaryLetter(
        disciplinarySearchData.disciplinaryAction.disciplinaryId
      );
      CreatePdfAndUpload(infoData, "35,130,185,230");
      setViewLetter(false);
      setModalLetter(false);
      setModal(false);
      setShow(false);
      setShowValue(false)
    }
  };
  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Modal
          show={lettterview || modalView || modalViewLetter ||lettterviewShow}
          onHide={handleClose}
          size="md"
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body>
            {loader ? (
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
            ) : (
              <div id="disMisconductLetter" ref={inputRef}>
                <p>
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>{" "}
                </p>
                <br></br>
                <p>To ,</p>
                <p>
                  <b>
                    {disciplinarySearchData !== null &&
                    disciplinarySearchData !== undefined &&
                    Object.keys(disciplinarySearchData).legth !== 0 &&
                    disciplinarySearchData.gender !== null &&
                    disciplinarySearchData.gender !== undefined &&
                    disciplinarySearchData.maritalStatus !== null &&
                    disciplinarySearchData.maritalStatus !== undefined
                      ? disciplinarySearchData.gender === "MALE"
                        ? "Mr."
                        : disciplinarySearchData.maritalStatus === "Married"
                        ? "Mrs."
                        : "Miss."
                      : "Mr./Ms."}
                  </b>{" "}
                  &nbsp; {disciplinarySearchData.employeeName}
                </p>
                <p>
                  <b>Employee ID:</b> {disciplinarySearchData.employeeId}
                </p>
                <p>
                  <b>Residential Address:</b>{" "}
                  {disciplinarySearchData.employeeAddress}
                </p>
                <p>
                  <b>Sub:</b> Show Cause Notice
                </p>
                <p>
                  {" "}
                  Dear ,
                  {/* <b>{disciplinarySearchData.employeeName},</b>{" "} */}
                </p>
                <p>
                  You have been associated with {disciplinarySearchData.company}{" "}
                  , as a <b>{disciplinarySearchData.position}</b>
                  .
                </p>
                <br />
                <p>
                  It is reported against you that you have indulged in Gross
                  Negligence and Misconduct{" "}
                  <b>
                    {disciplinarySearchData.disciplinaryAction.reasonDetails}
                  </b>
                </p>
                <br />
                <p>
                  <b>
                    {disciplinarySearchData !== null &&
                    disciplinarySearchData !== undefined &&
                    disciplinarySearchData.disciplinaryAction !== null &&
                    disciplinarySearchData.disciplinaryAction !== undefined &&
                    Object.keys(disciplinarySearchData).length !== 0
                      ? disciplinarySearchData.disciplinaryAction.managerComment
                      : ""}
                  </b>
                  .
                </p>
                <p>
                  <br />
                  This acts, as alleged above to have been committed by you
                  which amounts to Misconduct which, if proved, would warrant
                  serious disciplinary action against you. Accordingly, you are
                  hereby required to show cause within<b> 5 </b>days in receipt
                  of this letter as to why you have indulged in such an act of
                  Misconduct. Such charges, levelled against you, are of grave
                  and serious nature, if you fail to submit the explanation as
                  required, it will be presumed that you admit the charges and
                  have no explanation to offer and the matter will be disposed
                  of without any further reference to you.
                  <br />
                  The receipt of this letter should be acknowledged.
                  <br />
                </p>
                <p>
                  <b>For {disciplinarySearchData.company}.</b>
                </p>
                <br />
                <p>
                  <b>Authorised Signatory</b>
                </p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            sign &&
            disciplinarySearchData &&
            Object.keys(disciplinarySearchData).length &&
            disciplinarySearchData.employeeId !== null &&
            disciplinarySearchData.employeeId !== undefined ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={submitfinalShowCauseLetter}
                  >
                    Save Changes
                  </button>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ShowCauseNotice;
