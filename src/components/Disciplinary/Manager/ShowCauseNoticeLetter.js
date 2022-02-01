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
//               Private Limited (“Decathlon/{disciplinarySearchData.company}),
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

import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const ShowCauseNotice = () => {
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  console.log(disciplinarySearchData,"disciplinarySearchData")
  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>

          <p>To ,</p>
          <p>
            {" "}
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
                  : "Miss"
                : "Mr./Ms."}
            </b>{" "}
            &nbsp; {disciplinarySearchData.employeeName}
          </p>
          <p>
            <b>Employee ID:</b> {disciplinarySearchData.employeeId}
          </p>
          <p>
            <b>Residential Address:</b> {disciplinarySearchData.employeeAddress}
          </p>
          <p>
            <b>Sub:</b> Show Cause Notice
          </p>
          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear ,
              {/* <b>{disciplinarySearchData.employeeName},</b>{" "} */}
            </p>
            <br></br>

            <p>
              You have been associated with {disciplinarySearchData.company}{" "}
              Private Limited (“Decathlon/{disciplinarySearchData.company}),
               as a {" "}
              <b>{disciplinarySearchData.position}</b>.
              <br />
              <p>
                It is reported against you that you have indulged in Gross
                Negligence and Misconduct{" "}<b>{disciplinarySearchData.disciplinaryAction.reasonDetails}</b>

              </p>
              <br />
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
              <br />
              <br />
              This acts, as alleged above to have been committed by you  which amounts to
               Misconduct which, if proved, would warrant serious disciplinary action against you.{" "}
              Accordingly, you are hereby required to show cause within <b>
                5
              </b>{" "}
              days in receipt of this letter as to why you have indulged in such
              an act of  Misconduct. Such charges, levelled against you, are of grave 
              and serious nature, if you fail to submit the explanation as required, 
              it will be presumed that you admit the charges and have no explanation to 
              offer and the matter will be disposed of without any further reference to you.
              <br />
              <br />
              <br />
              The receipt of this letter should be acknowledged.
              <br />
            </p>
            <p className="mt-5 ">
              <b>For {disciplinarySearchData.company} Pvt Ltd,</b>
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

export default ShowCauseNotice;

