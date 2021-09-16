import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const TerminationLetter = () => {
  const { terminationLetterData,loader, fetchTerminationLetterData } = useContext(
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
      ):typeof terminationLetterData !== undefined ? (
        <Fragment>
          <div>
            <p className="float-left mb-5">
              {" "}
              Date: <b>{moment().format("DD-MM-YYYY")}</b>
            </p>
            <br></br>

            <div className="relievingLetterHeading">
              <div className="mt-1">
                <p>To,</p>
                <p>
                  Name:&nbsp;&nbsp;
                  {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}
                </p>
                <p>
                  EmployeeId:&nbsp;&nbsp;
                  {terminationLetterData !== undefined &&
                    terminationLetterData.employeeId}
                </p>
                <p>
                  Designation:&nbsp;&nbsp;
                  {terminationLetterData !== undefined &&
                    terminationLetterData.designation}
                </p>
              </div>
            </div>
            <p>
              {" "}
              <b>Sub:</b>Termination of your employment{" "}
            </p>
            <div className="relievingLetterContent mb-5">
              <p className="mt-5 mb-5">
                {" "}
                Dear{" "}
                <b>
                  {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}
                  ,
                </b>{" "}
              </p>
              <p>
                You have been associated Decathlon Sports India Private Limited
                (“Decathlon/Company”) at its XXXXXXXX located at{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.location}
                {terminationLetterData !== undefined &&
                  terminationLetterData.company}
                . It has come to our notice that you were working as{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.designation}
                . This is reference to the Show Cause letter dated on{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.dateOfResignation}
                . It has come to our knowledge that on XXXXXXXXXXX, you have
                indulged in act of misconduct{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.reason}{" "}
                at in {terminationLetterData.company}. The facts of the same are
                as below Hence the above acts of yours have constituted serious
                misconduct in connection with the employer’s business or
                property. Therefore, you are hereby terminated from your
                employment with Decathlon with immediate effect as on{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.lastWorkingDate}
                . Your full and final settlement post calculations of any dues
                from you will be recovered and shall be paid to you during the
                next payroll cycle.
              </p>
              <p className="mt-5 mb-5">
                <b>For {terminationLetterData.company} Pvt Ltd,</b>
              </p>
            </div>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default TerminationLetter;
