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
//               Private Limited (“Decathlon/{disciplinarySearchData.company}),
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
import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const NonPerformanceLetter = () => {
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {
      typeof disciplinarySearchData !== undefined ? (
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
            <b>Residential Address:</b> {disciplinarySearchData.employeeAddress}
          </p>
          <p>
            <b>Sub:</b> Show Cause Notice
          </p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear,
             {/* <b>{disciplinarySearchData.employeeName},</b>{" "} */}
            </p>
            <br></br>

            <p>
              You have been associated with {disciplinarySearchData.company}{" "}
              Private Limited (“Decathlon/{disciplinarySearchData.company}),
              as{" "}
              <b>{disciplinarySearchData.position}</b>.
              <br />
              <br />
              <p>
                It is reported against you that you have not been
                performing the assigned tasks. Thus, on verifying your
                performances as detailed below, it demonstrates very clearly
                that your performance has been much below the performance levels
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
                We have viewed acts of wilful performance lapses very seriously
                and such instances cannot be tolerated by the company.
              </p>
              <br />
              <p>
                Hence, you are hereby called upon to show cause as to why
                appropriate disciplinary actions should not be initiated against
                you in respect of acts narrated as above.<br/>
                 Your explanation, if
                any, must be submitted in writing within 5 days of receipt of
                this notice, failing which it will be presumed that you have no
                explanation to show cause and the company will initiate further
                actions, as deemed fit, based on the materials available.
              </p>
              <br />
              The receipt of this letter should be acknowledged.
              <br />
            </p>
            <p className="mt-5 ">
              <b>For{" "} {disciplinarySearchData.company} Pvt Ltd,</b>
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

export default NonPerformanceLetter;

