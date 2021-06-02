import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { ProbationContext } from "../../context/ProbationState";

const ExtensionLetter = () => {
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
      {typeof extensionLetterData !== undefined ? (
        <Fragment>
          <p className=""> Date: {moment().format("DD-MM-YYYY")}</p>
          <br></br>
          <p>
            <b>To,</b>
          </p>
          <p>
            <b>Name: &nbsp;{extensionLetterData.empName}</b>
          </p>
          <p>
            <b>EmployeeId: &nbsp;{extensionLetterData.empId}</b>
          </p>
          {/* <p>Designation:{relivingLetterData.designation}</p> */}
          <br></br>
          <p className="mt-5 ">
            {" "}
            Dear &nbsp;<b>{extensionLetterData.empName},</b>{" "}
          </p>
          <h5 className="text-center">
            {" "}
            <u>LETTER OF EXTENSION OF PROBATIONARY PERIOD </u>
          </h5>

          <div className=" ">
            <p>
              Based on the probation assessment, we regret to inform you that
              your performance is unsatisfactory and we are unable to confirm
              your employment at this point. We have decided to extend your
              probationary period for a further{" "}
              <b>{extensionLetterData.probationExtensionPeriod}</b> months
              starting from <b>{extensionLetterData.probationStartDate}</b> to{" "}
              <b>{extensionLetterData.probationEndDate}</b>.
              <br />
              Within this period, you are advised to improve your skills and
              performance and to work closely with your manager for guidance and
              feedback.
              <br />
              At the end of this period, your performance will be appraised and
              the final decision regarding your employment will be made in view
              of your performance in the period.
              <br />
              However, if your performance is still unsatisfactory, the company
              may decide to terminate your services due to non-confirmation.
              <br />
              All the other terms and conditions of your appointment letter
              dated <b>{extensionLetterData.probationEndDate}</b>, shall remain
              the same.
              <br />
              Please sign the copy of this letter as receipt of acceptance.
              <br />
              <br />
              <br />
              Yours Sincerely,
              <br />
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

export default ExtensionLetter;
