import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const RelivingLetter = () => {
  const { fetchRelievingLetterData, relivingLetterData,loader } = useContext(
    EmployeeSeparationContext
  );
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
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
      ) : typeof relivingLetterData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center"> RELIEVING & EXPERIENCE LETTER</h5>

          <p>Name:{relivingLetterData !== undefined &&
                  relivingLetterData.gender == "MALE"?
                  `Mr.${relivingLetterData.employeeName}`
                  :(relivingLetterData.gender == "FEMALE" && 
                  relivingLetterData.maritalStatus == "Single")?
                  `Miss. ${relivingLetterData.employeeName}`
                  :`Mrs.${relivingLetterData.employeeName}`}</p>
          <p>EmployeeId:{relivingLetterData !== undefined && relivingLetterData.employeeId}</p>
          <p>Designation:{relivingLetterData !== undefined && relivingLetterData.designation}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{relivingLetterData !== undefined &&
                  relivingLetterData.gender == "MALE"?
                  `Mr.${relivingLetterData.employeeName}`
                  :(relivingLetterData.gender == "FEMALE" && 
                  relivingLetterData.maritalStatus == "Single")?
                  `Miss. ${relivingLetterData.employeeName}`
                  :`Mrs.${relivingLetterData.employeeName}`}</b>{" "}
            </p>
            <p>
              With reference to your resignation. We would like to inform you
              that your resignation has been accepted and you are relieved from
              the services of the Decathlon Sports India on the closing of
              working hours of <b>{relivingLetterData !== undefined && relivingLetterData.lastWorkingDate}</b>. We
              hereby confirm that you have been working in Decathlon Sports
              India since <b>{relivingLetterData !== undefined && relivingLetterData.dateOfJoining}</b>. Please be
              informed that you shall be bound by the relevant clause of your
              appointment letter which states that you shall not use, disclose,
              remove or transfer whether directly or indirectly, to any person,
              corporation or organisation, any trade secrets, know-how and
              confidential information relating to the business or financial
              conditions of Decathlon. During the employment tenure with us, we
              found him to be good at work & thank you for your service and
              commitment to the Decathlon. He left the services of the Decathlon
              on his own accord. We wish him all the best in his future
              endeavours.
            </p>
            <p className="mt-5 ">
              <b>For {relivingLetterData.company} Pvt Ltd,</b>
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

export default RelivingLetter;
