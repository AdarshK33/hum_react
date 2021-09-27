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
    loader,
  } = useContext(ProbationContext);
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
      ) : typeof cnfLetterData !== undefined ? (
        // {true ? (
        <Fragment>
          <p className="">
            {" "}
            <b>Date: {moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <p>
            <b>To Ms./Mr. &nbsp;{cnfLetterData.empName}</b>
          </p>
          <p>Address :</p>
          <p>
            <b>{cnfLetterData.address}</b>
          </p>
          <p className="mt-4 ">
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
              <b>
                {" "}
                {cnfLetterData.confirmationDate !== null &&
                cnfLetterData.confirmationDate !== undefined
                  ? moment(new Date(cnfLetterData.confirmationDate)).format(
                      "DD-MM-YYYY"
                    )
                  : ""}
              </b>
              . All the other terms and conditions of your appointment letter
              dated {/* {relivingLetterData.date} */}
              shall remain same.
              <br />
              <br />
              Please sign the copy of this letter as receipt of acceptance.
              <br />
              <br />
              <br />
              Thanking You,
            </p>
            <p className="mt-2 ">
              <b>For {cnfLetterData.company} Pvt Ltd,</b>
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
