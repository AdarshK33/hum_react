// import React, { Fragment, useState, useContext, useEffect } from "react";
// import { Modal, Row, Col, Form, Button } from "react-bootstrap";
// import calendarImage from "../../../assets/images/calendar-image.png";
// import moment from "moment";
// import { DisciplinaryContext } from "../../../context/DisciplinaryState";

// const NonPerformanceLetter = () => {
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
//               {" "}
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
//             <b>Employee ID:</b> {disciplinarySearchData.employeeId}
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
//               <br />
//               <p>
//                 It is reported against you that you have been not been
//                 performing the assigned tasks. Thus, on verifying your
//                 performances as detailed below, it demonstrates very clearly
//                 that your performance has been much below the performance levels
//                 expected by the Company.
//               </p>
//               <p>
//                 {disciplinarySearchData.disciplinaryAction !== null &&
//                 disciplinarySearchData.disciplinaryAction !== undefined &&
//                 disciplinarySearchData.disciplinaryAction !== ""
//                   ? disciplinarySearchData.disciplinaryAction.managerComment
//                   : ""}{" "}
//               </p>
//               <p>
//                 We have viewed acts of wilful performance lapses very seriously
//                 and such instances cannot be tolerated by the company.
//               </p>
//               <br />
//               <p>
//                 Hence, you are hereby called upon to show cause as to why
//                 appropriate disciplinary actions should not be initiated against
//                 you in respect of acts narrated as above. Your explanation, if
//                 any, must be submitted in writing within 5 days of receipt of
//                 this notice, failing which it will be presumed that you have no
//                 explanation to show cause and the company will initiate further
//                 actions, as deemed fit, based on the materials available.
//               </p>
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

// export default NonPerformanceLetter;

//new template Non performance  show cause notice letter
import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import { E_signContext } from "../../../context/E_signState";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../../context/PermissionState";
import { AppContext } from "../../../context/AppState";

const NonPerformanceLetter = ({ approver = true, sign = true }) => {
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

  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
    setModal(false);
    setModalLetter(false);
    setShowValue(false)
  };
  console.log("disciplinarySearchData", disciplinarySearchData);
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
          warningIssued:
            disciplinarySearchData.disciplinaryAction.warningIssued,
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
      CreatePdfAndUpload(infoData, "35,60,185,160");
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
          show={lettterview || modalView || modalViewLetter||lettterviewShow}
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
              <div id="disLetter" ref={inputRef}>
                <p>
                  {" "}
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <p>To ,</p>
                <p>
                  {" "}
                  <b>
                    {" "}
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
                        : "Miss"
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
                <br />
                <p>
                  {" "}
                  Dear,
                  {/* <b>{disciplinarySearchData.employeeName},</b>{" "} */}
                </p>
                <br></br>

                <p>
                  You have been associated with {disciplinarySearchData.company}{" "}
                   , as a{" "}
                  <b>{disciplinarySearchData.position}</b>.
                </p>
                <br />
                <p>
                  It is reported against you that you have not been performing
                  the assigned tasks. Thus, on verifying your performances as
                  detailed below, it demonstrates very clearly that your
                  performance has been much below the performance levels
                  expected by the Company.
                </p>
                <p>
                  {disciplinarySearchData.disciplinaryAction !== null &&
                  disciplinarySearchData.disciplinaryAction !== undefined &&
                  disciplinarySearchData.disciplinaryAction !== ""
                    ? disciplinarySearchData.disciplinaryAction.managerComment
                    : ""}{" "}
                </p>
                <p>
                  We have viewed acts of wilful performance lapses very
                  seriously and such instances cannot be tolerated by the
                  company.
                </p>
                <br />
                <p>
                  Hence, you are hereby called upon to show cause as to why
                  appropriate disciplinary actions should not be initiated
                  against you in respect of acts narrated as above.
                  <br />
                  Your explanation, if any, must be submitted in writing within
                  5 days of receipt of this notice, failing which it will be
                  presumed that you have no explanation to show cause and the
                  company will initiate further actions, as deemed fit, based on
                  the materials available.
                </p>
                <br />
                <p>The receipt of this letter should be acknowledged.</p>
                <br />
                <p>
                  <b>For {disciplinarySearchData.company},</b>
                </p>
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

export default NonPerformanceLetter;
