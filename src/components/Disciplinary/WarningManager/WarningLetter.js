import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const WarningLetter = () => {
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  console.log(disciplinarySearchData);
  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Fragment>
          <h5 className="text-center"> WARNING LETTER </h5>
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
            <b>Residential Address:</b> {disciplinarySearchData.employeeAddress}
          </p>

          <div className=" ">
            {/* <p className="mt-5 ">
              {" "}
              Dear <b>{disciplinarySearchData.employeeName},</b>{" "}
            </p>
            <br></br> */}

            <p>
              You have been associated {disciplinarySearchData.company}
              (“Decathlon/Company”) as a
              <b>{disciplinarySearchData.position}</b>.
              <br />
              <br />
              On ,
              <b>
                {disciplinarySearchData.disciplinaryAction.actionIssuedDate}{" "}
              </b>
              , {disciplinarySearchData.company} issued to you a Show Cause notice, asking you for a
              clear written explanation regarding the following accusations-
              <b>{disciplinarySearchData.disciplinaryAction.managerComment} </b>
              <br />
              <br />
              In furtherance to your reply to show cause notice is not satisfactory 
              and justified. Therefore you are hereby warned to refrain in doing these
               activities and follow the right process of the company. It is expected 
               that henceforth, there will be no occasions for such complaints in future 
               otherwise appropriate disciplinary action will follow.
              <br />
              <br />
              Please note, the Company reserves the right to take appropriate 
              action with respect to any repetition of similar acts.
              <br />
              <br />
            </p>
            <p className="mt-5 ">
              <b>For {disciplinarySearchData.company} Pvt Ltd,</b>
            </p><br/>
            <p className="mt-5 ">
            <b>Authorized Signatory</b>
            </p>
            <p className="">
              {" "}
              <b>Accpeted By:</b> <b>{disciplinarySearchData.managerName}</b>
            </p>
            <p className="">
              {" "}
              <b>Employee Name:</b> <b>{disciplinarySearchData.employeeName}</b>
            </p>
            <p className="">
              {" "}
              <b>Employee ID:</b> <b>{disciplinarySearchData.employeeId}</b>
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

export default WarningLetter;
