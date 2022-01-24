import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const InternShipLetter = () => {
  const { fetchRelievingLetterData,loader, relivingLetterData } = useContext(
    EmployeeSeparationContext
  );
     console.log(relivingLetterData,"relivingLetterData");
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
          <h5 className="text-center">TO WHOMSOEVER IT MAY CONCERN</h5>
          {/* <h5 className="text-center"> INTERNSHIP EXPERIENCE LETTER</h5> */}
{/* 
          <p>Name:{relivingLetterData !== undefined &&
                  relivingLetterData.gender.toLowerCase() == "male"?
                  `Mr.${relivingLetterData.employeeName}`
                  :(relivingLetterData.gender.toLowerCase() == "female" && 
                  relivingLetterData.maritalStatus.toLowerCase() == "single")?
                  `Miss. ${relivingLetterData.employeeName}`
                  :`Mrs.${relivingLetterData.employeeName}`}</p>
          <p>EmployeeId:{relivingLetterData.employeeId}</p>
          <p>Designation:{relivingLetterData.designation}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{relivingLetterData !== undefined &&
                  relivingLetterData.gender.toLowerCase() == "male"?
                  `Mr.${relivingLetterData.employeeName}`
                  :(relivingLetterData.gender.toLowerCase() == "female" && 
                  relivingLetterData.maritalStatus.toLowerCase() == "single")?
                  `Miss. ${relivingLetterData.employeeName}`
                  :`Mrs.${relivingLetterData.employeeName}`},</b>{" "}
            </p> */}
            <p>
            This is to certify that  {relivingLetterData !== undefined &&
                  (relivingLetterData.gender === "male"||
                  relivingLetterData.gender === "MALE"||
                  relivingLetterData.gender === "Male")?
                  `Mr.${relivingLetterData.employeeName}`
                  :((relivingLetterData.gender === "female"||
                  relivingLetterData.gender == "FEMALE"||
                  relivingLetterData.gender == "Female") && 
                  relivingLetterData.maritalStatus === "single"||
                  relivingLetterData.maritalStatus === "SINGLE"||
                  relivingLetterData.maritalStatus === "Single")?
                  `Miss. ${relivingLetterData.employeeName}`
                  :`Mrs.${relivingLetterData.employeeName}`}{" "} has 
            completed internship at {relivingLetterData.company} Pvt Ltd, from{" "}  
            <b>{relivingLetterData.dateOfJoining}</b>{" "} to  <b>{relivingLetterData.lastWorkingDate}</b>{" "} on
           under the guidance of  {relivingLetterData.managerName}.<br/><br/>

            During the period of {(relivingLetterData.gender === "male"||
                  relivingLetterData.gender === "MALE"||
                  relivingLetterData.gender === "Male")?"his":"her"}{" "} internship programme with us, 
            we found {(relivingLetterData.gender === "male"||
                  relivingLetterData.gender === "MALE"||
                  relivingLetterData.gender === "Male")?"he":"she"}{" "}  was punctual, hardworking and inquisitive.

            We wish {(relivingLetterData.gender === "male"||
                  relivingLetterData.gender === "MALE"||
                  relivingLetterData.gender === "Male")?"his":"her"}{" "}  all the very best for {(relivingLetterData.gender === "male"||
                  relivingLetterData.gender === "MALE"||
                  relivingLetterData.gender === "Male")?"his":"her"}{" "}  future endeavours.
            </p>
            <p className="mt-5 ">
              <b>For {relivingLetterData.company} Pvt Ltd,</b>
            </p><br/>
            <div className="float-right "></div>
            <p className="mt-5 ">
              <b>Authorised Signatory</b>
            </p>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default InternShipLetter;