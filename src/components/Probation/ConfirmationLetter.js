import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { ProbationContext } from "../../context/ProbationState";

const ConfirmationLetter = () => {
  const { fetchRelievingLetterData, relivingLetterData } = useContext(
    EmployeeSeparationContext
  );
  const {
    extensionLetterData,
    cnfLetterData,
    ViewExtensionLetter,
    ViewConfirmationLetter,
  } = useContext(ProbationContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {typeof cnfLetterData !== undefined ? (
        // {true ? (
        <Fragment>
          <p className="">
            {" "}
            <b>Date: {moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <p>
            To Ms./Mr. &nbsp;<b>{cnfLetterData.empName}</b>
          </p>
          <p>Address :</p>
          <p>
            <b>{cnfLetterData.address}</b>
          </p>
          <p className="mt-5 ">
            {" "}
            <b>Dear &nbsp;{cnfLetterData.empName},</b>{" "}
          </p>
          <p>
            <b> Sub: Confirmation of Employment</b>
          </p>

          <div className=" ">
            <p>
              We are glad to inform you that the management is pleased to
              confirm you in service with effect from{" "}
              <b>{cnfLetterData.confirmationDate}</b>. All the other terms and
              conditions of your appointment letter dated{" "}
              {/* {relivingLetterData.date} */}
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
