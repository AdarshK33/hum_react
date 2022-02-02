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

import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { PromotionContext } from "../../context/PromotionState";

const PromotionLetter = () => {
  const { promotionLetterData, loader } = useContext(PromotionContext);
  console.log(promotionLetterData,"promotionLetterData")

  return (
    <Fragment>
      {loader ? (
        <div className="loader-box loader" style={{ width: "100% !important" }}>
          <div className="loader">
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
            <div className="line bg-primary"></div>
          </div>
        </div>
      ) : typeof promotionLetterData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <p>To,</p>
          <p>Employee Name:{
          promotionLetterData !== undefined &&
              promotionLetterData.gender == "MALE"?
              `Mr.${promotionLetterData.empName}`
              :(promotionLetterData.gender == "FEMALE" && 
              promotionLetterData.maritalStatus == "Single")?
              `Miss. ${promotionLetterData.empName}`
              :`Mrs.${promotionLetterData.empName}`}</p>
          <p>Employee ID:{promotionLetterData.employeeId}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{
              promotionLetterData !== undefined &&
              promotionLetterData.gender == "MALE"?
              `Mr.${promotionLetterData.empName}`
              :(promotionLetterData.gender == "FEMALE" && 
              promotionLetterData.maritalStatus == "Single")?
              `Miss. ${promotionLetterData.empName}`
              :`Mrs.${promotionLetterData.empName}`},</b>{" "}
            </p>
            <br></br>
            <p>
              <b>Sub: Letter of Promotion </b>
            </p>
            <p>
              {" "}
              We are  pleased to
              promote you as <b>{promotionLetterData.promotedPosition}</b> with
              effect from <b> {
                promotionLetterData.effectiveDate !== null && 
                promotionLetterData.effectiveDate !== undefined 
                && promotionLetterData.effectiveDate !== ""?
                moment(promotionLetterData.effectiveDate).format("DD-MM-YYYY"):""
              }</b>. You will be reporting to {" "}
              <b> {promotionLetterData !== undefined &&
              promotionLetterData.managerGender == "MALE"?
              `Mr.${promotionLetterData.reportingManagerName}`
              :(promotionLetterData.managerGender == "FEMALE" && 
              promotionLetterData.managerMaritalStatus == "Single")?
              `Miss. ${promotionLetterData.reportingManagerName}`
              :`Mrs.${promotionLetterData.reportingManagerName}`}</b> . All
              the other terms and conditions of your appointment letter shall remain
              the same.
            </p>

            <p>Please sign the copy of this letter as receipt of acceptance.</p>
            <p className="mt-5 ">
              <p>Yours Sincerely,</p>
              <b>For {promotionLetterData.company} Pvt Ltd,</b>
            </p><br/>
            <p className="mt-5 ">
              <b>Authorised Signatory</b>
            </p>
            <div className="float-right "></div>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PromotionLetter;
