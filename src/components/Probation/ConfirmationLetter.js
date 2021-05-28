import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const ConfirmationLetter = () => {
  const { fetchRelievingLetterData, relivingLetterData } = useContext(
    EmployeeSeparationContext
  );
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {typeof relivingLetterData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            <b>Date: {moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <p>
            <b> To Ms./Mr. {relivingLetterData.employeeName}</b>
          </p>
          <p>Address :</p>
          <p>addressss:{relivingLetterData.employeeId}</p>
          {/* <p>Designation:{relivingLetterData.designation}</p> */}
          <br></br>
          <p className="mt-5 ">
            {" "}
            <b>Dear {relivingLetterData.employeeName},</b>{" "}
          </p>
          <p>
            <b> Sub: Confirmation of Employment</b>
          </p>
          {/* <h5 className="text-center">
            {" "}
            <u>LETTER OF EXTENSION OF PROBATIONARY PERIOD </u>
          </h5> */}

          <div className=" ">
            <p>
              We are glad to inform you that the management is pleased to
              confirm you in service with effect from {relivingLetterData.date}.
              All the other terms and conditions of your appointment letter
              dated {relivingLetterData.date}
              shall remain same.
              <br />
              Please sign the copy of this letter as receipt of acceptance.
              <br />
              <br />
              Thanking You,
            </p>
            <p className="mt-5 ">
              <b>For Decathlon Sports India Pvt Ltd,</b>
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

export default ConfirmationLetter;
