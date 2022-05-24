import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const NonPerformanceTerminationLetter = () => {
  const { terminationLetterData,loader, fetchTerminationLetterData } = useContext(
    EmployeeSeparationContext
  );
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
    {/* <h5 className="text-center"> WARNING LETTER </h5> */}
    <p className="">
      {" "}
      Date: <b>{moment().format("DD-MM-YYYY")}</b>
    </p>
    <br></br>

    <p>To ,</p>
    <p>
    <p>  
    {" "}
      <b>Name:</b>&nbsp;&nbsp;
        {/* {terminationLetterData !== undefined &&
       terminationLetterData.gender == "MALE"?
       `Mr.${terminationLetterData.employeeName}`
        :(terminationLetterData.gender == "FEMALE" 
        && terminationLetterData.maritalStatus == "Single")?
        `Miss. ${terminationLetterData.employeeName}`:
        `Mrs.${terminationLetterData.employeeName}`} */}
         {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}
         </p>
           <p>
           <b>Employee ID:</b>&nbsp;&nbsp;
           {terminationLetterData !== undefined &&
            terminationLetterData.employeeId}
           </p>
          <p>
           <b>Address:</b>&nbsp;&nbsp;
           {terminationLetterData !== undefined &&
           terminationLetterData.address}
          </p>
          </p>
          <br/>
          <p>
              {" "}
              <b>Sub:</b><b>Termination of your employment {" "}</b>
            </p>
    <div className=" ">
      <p className="mt-5 ">
                {" "}
                Dear{" "}
                <b>
                {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}
                  {/* {terminationLetterData !== undefined &&
                  terminationLetterData.gender == "MALE"?
                  `Mr.${terminationLetterData.employeeName}`
                  :(terminationLetterData.gender == "FEMALE" && 
                  terminationLetterData.maritalStatus == "Single")?
                  `Miss. ${terminationLetterData.employeeName}`
                  :`Mrs.${terminationLetterData.employeeName}`} */}
                  
                </b>{" "}
              </p>
      <br></br>

      <p>
      You have been associated with{terminationLetterData.company}
              (“entity name/prodin/indeca”) as{" "}{terminationLetterData !== 
              undefined && terminationLetterData.position}.
              <br/>
              <br/>
              You have been working under a Performance Improvement 
              Plan (PIP) designed to assist you in achieving a satisfactory
               level of performance.
               <br/>
               <br/>
               Unfortunately, you have not improved your performance to a 
               consistent acceptable standard as required. On Date {terminationLetterData !== undefined &&
                  terminationLetterData.dateOfResignation},
                you were issued with a written warning in 
                relation to your poor performance. 
                <br/>
                <br/>
                This PIP period has now ended and it is time to assess your 
                performance over that period and your performance has not met
                 the required standard.
                <br/>
                <br/>
                The performance over this period has been unsatisfactory.
                 Specifically, {terminationLetterData !== undefined &&
                  terminationLetterData.reason}{" "}

        <br />
        <br />

             Therefore, you are hereby terminated from your employment with 
             {terminationLetterData.company} / Prodin / Indeca with immediate effect as on{" "}
            {terminationLetterData !== undefined &&
            terminationLetterData.lastWorkingDate}. Your full and final
            settlement post calculations of any dues from you will be 
            recovered and shall be paid to you during the next payroll cycle.
        <br />
        <br />
      </p>
      <p>
            Thanking you,
            </p>	
          
                <Row>
             <Col sm="8">
             <p className="mt-5 ">
                <b>For {terminationLetterData.company}</b>
              </p>
             </Col>
              <Col sm="4">
              <p> Accepted By
          {terminationLetterData !== undefined &&
          terminationLetterData.employeeName}
          </p>
              </Col>
              </Row>
              <p>
            Authorized Signatory</p>
             <p> Manager Name:  {terminationLetterData !== undefined &&
            terminationLetterData.managerName} </p>
      <div className="float-right "></div>
    </div>
  </Fragment>      
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default NonPerformanceTerminationLetter;

