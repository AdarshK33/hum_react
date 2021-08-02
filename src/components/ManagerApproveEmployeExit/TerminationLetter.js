import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const TerminationLetter = () => {
  const { terminationLetterData ,
    fetchTerminationLetterData} = useContext(
    EmployeeSeparationContext
  );
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {typeof terminationLetterData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center"> Termination of your employment </h5>

          <p>Name:{terminationLetterData.employeeName}</p>
          <p>EmployeeId:{terminationLetterData.employeeId}</p>
          <p>Designation:{terminationLetterData.designation}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{terminationLetterData.employeeName},</b>{" "}
            </p>
            <p>
            You have been associated Decathlon Sports India Private Limited
               (“Decathlon/Company”) at its XXXXXXXX located at {terminationLetterData.location?terminationLetterData.location:''} 
               {terminationLetterData.company}. It has come to our notice that you were working 
               as {terminationLetterData.designation}.  This is reference to the Show
                Cause letter dated on {terminationLetterData.dateOfResignation?terminationLetterData.dateOfResignation:''}. 
                It has come to our knowledge that on XXXXXXXXXXX, you have indulged 
                in act of misconduct {terminationLetterData.reason} at in Decathlon 
                XXXXXXXXXX.  The facts of the same are as below 

                Hence the above acts of yours have constituted serious misconduct in 
                connection with the employer’s business or property.
                Therefore, you are hereby terminated from your employment with Decathlon
                 with immediate effect as on {terminationLetterData.lastWorkingDate?terminationLetterData.lastWorkingDate:''}. 
                 Your full and final settlement post calculations of any dues from you
                  will be recovered and shall be paid to you during the next payroll cycle.

            </p>
            <p className="mt-5 ">
              <b>For Decathlon Sports India India Pvt Ltd,</b>
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

export default TerminationLetter;