import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const MisConductTerminationLetter = () => {
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
      {terminationLetterData !== undefined &&
                    terminationLetterData.employeeName}
        {/* {terminationLetterData !== undefined &&
       terminationLetterData.gender == "MALE"?
       `Mr.${terminationLetterData.employeeName}`
        :(terminationLetterData.gender == "FEMALE" 
        && terminationLetterData.maritalStatus == "Single")?
        `Miss. ${terminationLetterData.employeeName}`:
        `Mrs.${terminationLetterData.employeeName}`} */}
         </p>
           <p>
           <b>Employee ID:</b>&nbsp;&nbsp;
           {terminationLetterData !== undefined &&
            terminationLetterData.employeeId}
           </p>
          <p>
           <b>Address :</b>&nbsp;&nbsp;
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
      You have been associated with{terminationLetterData.company} at its 
      {terminationLetterData.address} location as {terminationLetterData.designation}.

                {/* You have been associated {terminationLetterData.company}
              You have been associated {terminationLetterData.company} 
              (“entity name/prodin/indeca”) as{" "}{terminationLetterData !== 
              undefined && terminationLetterData.position}. */}

              This is reference to the Show Cause letter dated on{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.dateOfResignation}. It has come 
              to our knowledge that you have indulged in act of misconduct{" "}
                {terminationLetterData !== undefined &&
                  terminationLetterData.reason}{" "}
                at in {terminationLetterData.company}. 
            The facts of the same are as below 
        <br />
        <br/>
        Your explanation is not justified, Hence the above acts of yours have 
        constituted serious misconduct in connection with the employer’s business 
        or property . 
        <br/>
        <br />
        Hence the above acts of yours have constituted serious misconduct in
            connection with the employer’s business or property.
             Therefore, you are hereby terminated from your employment with 
             {terminationLetterData.company} with immediate effect as on{" "}
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
            Authorized Signatory </p>
            <p>Manager Name:  {terminationLetterData !== undefined &&
            terminationLetterData.managerName} 
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

export default MisConductTerminationLetter;