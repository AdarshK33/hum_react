//this is old template
// import React, { Fragment, useState, useContext, useEffect } from "react";
// import { Modal, Row, Col, Form, Button } from "react-bootstrap";
// import calendarImage from "../../assets/images/calendar-image.png";
// import moment from "moment";
// import { PromotionContext } from "../../context/PromotionState";

// const PromotionLetter = () => {
//   const { promotionLetterData, loader } = useContext(PromotionContext);

//   return (
//     <Fragment>
//       {loader ? (
//         <div className="loader-box loader" style={{ width: "100% !important" }}>
//           <div className="loader">
//             <div className="line bg-primary"></div>
//             <div className="line bg-primary"></div>
//             <div className="line bg-primary"></div>
//             <div className="line bg-primary"></div>
//           </div>
//         </div>
//       ) : typeof promotionLetterData !== undefined ? (
//         <Fragment>
//           <p className="">
//             {" "}
//             Date: <b>{moment().format("DD-MM-YYYY")}</b>
//           </p>
//           <br></br>
//           <h5 className="text-center"> PROMOTION LETTER</h5>

//           <p>Name:{
//           promotionLetterData !== undefined &&
//               promotionLetterData.gender == "MALE"?
//               `Mr.${promotionLetterData.empName}`
//               :(promotionLetterData.gender == "FEMALE" &&
//               promotionLetterData.maritalStatus == "Single")?
//               `Miss. ${promotionLetterData.empName}`
//               :`Mrs.${promotionLetterData.empName}`}</p>
//           <p>Employee ID:{promotionLetterData.employeeId}</p>

//           <div className=" ">
//             <p className="mt-5 ">
//               {" "}
//               Dear <b>{
//               promotionLetterData !== undefined &&
//               promotionLetterData.gender == "MALE"?
//               `Mr.${promotionLetterData.empName}`
//               :(promotionLetterData.gender == "FEMALE" &&
//               promotionLetterData.maritalStatus == "Single")?
//               `Miss. ${promotionLetterData.empName}`
//               :`Mrs.${promotionLetterData.empName}`},</b>{" "}
//             </p>
//             <br></br>
//             <p>
//               <b>Sub: Promotion </b>
//             </p>
//             <p>
//               {" "}
//               We are glad to inform you that the management is pleased to
//               promote you as <b>{promotionLetterData.promotedPosition}</b> with
//               effect from <b> {
//                 promotionLetterData.effectiveDate !== null &&
//                 promotionLetterData.effectiveDate !== undefined
//                 && promotionLetterData.effectiveDate !== ""?
//                 moment(promotionLetterData.effectiveDate).format("DD-MM-YYYY"):""
//               }</b>. You will
//               be reporting to
//               <b> {promotionLetterData.reportingManagerName}</b> and your bonus
//               rate is upto
//               <b> {promotionLetterData.bonusInPercentage}</b> % per month. All
//               the other terms and conditions of your appointment letter dated{" "}
//               <b>{
//                 promotionLetterData.appointmentLetterDate !== null &&
//                 promotionLetterData.appointmentLetterDate !== undefined
//                 && promotionLetterData.appointmentLetterDate !== ""?
//                 moment(promotionLetterData.appointmentLetterDate).format("DD-MM-YYYY"):""
//               }</b> shall remain
//               the same.
//             </p>

//             <p>Please sign the copy of this letter as receipt of acceptance.</p>
//             <p className="mt-5 ">
//               <p>Yours Sincerely,</p>
//               <b>For {promotionLetterData.company} Pvt Ltd,</b>
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

// export default PromotionLetter;

//this is new template 31/10/2021

import React, { Fragment, useState, useContext, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import { PromotionContext } from "../../context/PromotionState";
import { E_signContext } from "../../context/E_signState";
import { AppContext } from "../../context/AppState";
import { useHistory } from "react-router-dom";

const PromotionLetter = () => {
  const {
    promotionLetterData,
    loader,
    promotionIdData,
    PromotionCreate,
    lettterview,
    setViewLetter,
  } = useContext(PromotionContext);
  console.log(promotionLetterData, "promotionLetterData");

  const { user } = useContext(AppContext);
  const history = useHistory();
  const { CreatePdfAndUpload } = useContext(E_signContext);
  const [show, setShow] = useState(true);
  const [saveLetter, setSaveLetter] = useState(false);

  const ref = React.createRef();
  const inputRef = useRef(null);
  const handleClose = () => {
    setShow(false);
    setViewLetter(false);
  };
  const HandleSaveLetter = () => {
    if (
      promotionIdData !== null &&
      promotionIdData !== undefined &&
      Object.keys(promotionIdData).length !== 0
    ) {
      const InfoData = {
        adminValidatedDate: promotionIdData["adminValidatedDate"],
        validatedAdminId: promotionIdData["validatedAdminId"],
        validatedAdminName: promotionIdData["validatedAdminName"],
        managerValidatedDate: promotionIdData["managerValidatedDate"],
        validatedManagerId: promotionIdData["validatedManagerId"],
        validatedManagerName: promotionIdData["validatedManagerName"],
        bonus: promotionIdData["bonus"],
        // bonusInPercentage: promotionIdData["bonusInPercentage"],
        costCentre: promotionIdData["costCentre"],
        costCentreManagerEmail: promotionIdData["costCentreManagerEmail"],
        costCentreManagerId: promotionIdData["costCentreManagerId"],
        costCentreManagerName: promotionIdData["costCentreManagerName"],
        departmentId: promotionIdData["departmentId"],
        reportingManagerId: promotionIdData["reportingManagerId"],
        reportingManagerName: promotionIdData["reportingManagerName"],
        effectiveDate: promotionIdData["effectiveDate"],
        emailId: null,
        empName: promotionIdData["empName"],
        employeeId: promotionIdData["employeeId"],
        currentManagerId: promotionIdData["currentManagerId"],
        currentManagerName: promotionIdData["currentManagerName"],
        contractType: promotionIdData["contractType"],
        newDepartment: promotionIdData["newDepartment"],
        newFixedGross: promotionIdData["newFixedGross"],
        oldDepartment: promotionIdData["oldDepartment"],
        oldFixedGross: promotionIdData["oldFixedGross"],
        oldPosition: promotionIdData["oldPosition"],
        positionId: promotionIdData["positionId"],
        promotedPosition: promotionIdData["promotedPosition"],
        promotionId: promotionIdData["promotionId"],
        promotionLetter: null,
        reason: promotionIdData["reason"],
        relocationBonus: promotionIdData["relocationBonus"],
        salaryEffectiveDate: promotionIdData["salaryEffectiveDate"],
        promotionType: promotionIdData["promotionType"],
        remarks: promotionIdData["remarks"],
        status: 3,
      };
      PromotionCreate(InfoData);

      const infoData = {
        inputRef: inputRef,
        empId: promotionLetterData.employeeId,
        candidateId: 0,
        module: "Promotion",
        empName: user.firstName + " " + user.lastName,
        empEmail: "rajasekhar@theretailinsights.com",
        empPhNo: user.phone,
        history: history,
        path: "../promotion-list",
      };
      console.log(
        "getBoundingClientRect",
        inputRef.current.getBoundingClientRect()
      );
      CreatePdfAndUpload(infoData, "35,330,185,430");
      setViewLetter(false);
      setShow(false);
    }
  };

  return (
    <Fragment>
      {typeof promotionLetterData !== undefined ? (
        // {true ? (
        <Modal show={lettterview} onHide={handleClose} size="md">
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
              <div id="promotionLetter" ref={inputRef}>
                <p>
                  {" "}
                  Date: <b>{moment().format("DD-MM-YYYY")}</b>
                </p>
                <br></br>
                <p>To,</p>
                <p>
                  Employee Name: {promotionLetterData.empName}
                  {/* {
          promotionLetterData !== undefined &&
              promotionLetterData.gender == "MALE"?
              `Mr.${promotionLetterData.empName}`
              :(promotionLetterData.gender == "FEMALE" && 
              promotionLetterData.maritalStatus == "Single")?
              `Miss. ${promotionLetterData.empName}`
              :`Mrs.${promotionLetterData.empName}`} */}
                </p>
                <p>Employee ID:{promotionLetterData.employeeId}</p>
                <p>
                  {" "}
                  Dear{" "}
                  <b>
                    {promotionLetterData.empName}
                    {/* {
              promotionLetterData !== undefined &&
              promotionLetterData.gender == "MALE"?
              `Mr.${promotionLetterData.empName}`
              :(promotionLetterData.gender == "FEMALE" && 
              promotionLetterData.maritalStatus == "Single")?
              `Miss. ${promotionLetterData.empName}`
              :`Mrs.${promotionLetterData.empName}`} */}
                    ,
                  </b>{" "}
                </p>
                <br></br>
                <p>
                  <b>Sub: Letter of Promotion </b>
                </p>
                <p>
                  {" "}
                  We are pleased to promote you as{" "}
                  <b>{promotionLetterData.promotedPosition}</b> with effect from{" "}
                  <b>
                    {" "}
                    {promotionLetterData.effectiveDate !== null &&
                    promotionLetterData.effectiveDate !== undefined &&
                    promotionLetterData.effectiveDate !== ""
                      ? moment(promotionLetterData.effectiveDate).format(
                          "DD-MM-YYYY"
                        )
                      : ""}
                  </b>
                  . You will be reporting to{" "}
                  <b>
                    {/* {promotionLetterData !== undefined &&
              promotionLetterData.managerGender == "MALE"?
              `Mr.${promotionLetterData.reportingManagerName}`
              :(promotionLetterData.managerGender == "FEMALE" && 
              promotionLetterData.managerMaritalStatus == "Single")?
              `Miss. ${promotionLetterData.reportingManagerName}`
              :`Mrs.${promotionLetterData.reportingManagerName}`} */}
                    {promotionLetterData.reportingManagerName}
                  </b>{" "}
                  . All the other terms and conditions of your appointment
                  letter shall remain the same.
                </p>

                <p>
                  Please sign the copy of this letter as receipt of acceptance.
                </p>
                <p>
                  <p>Yours Sincerely,</p>
                  <b>For {promotionLetterData.company} Pvt Ltd,</b>
                </p>
                <br />
                <p>
                  <b>Authorised Signatory</b>
                </p>
              </div>
            )}
            {!saveLetter &&
            !loader &&
            promotionLetterData &&
            Object.keys(promotionLetterData).length &&
            promotionLetterData.employeeId !== null &&
            promotionLetterData.employeeId !== undefined ? (
              <Row>
                <Col sm={4}></Col>
                <Col sm={5}>
                  <br></br>
                  <br></br>
                  <button
                    className={"stepperButtons"}
                    onClick={HandleSaveLetter}
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

export default PromotionLetter;
