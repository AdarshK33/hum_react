import React, { Fragment, useState, useContext, useEffect } from "react";

import moment from "moment";
import { ProbationContext } from "../../context/ProbationState";

const EndOfProbationLetter = () => {
  const { endLetterData, loader } = useContext(ProbationContext);
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
      ) : typeof endLetterData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center">TERMINATION OF PROBATIONARY PERIOD</h5>

          <p>
            Name:
            {endLetterData.empName}
          </p>
          <p>
            EmployeeId:
            {endLetterData.empId}
          </p>
          <p>
            <b>Sub: Termination of Probationary Period</b>
          </p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{endLetterData.empName},</b>{" "}
            </p>
            <p>
              This is to inform you that the probation period is being
              terminated effective on <b>{endLetterData.exitDate}</b> We have
              observed that your performance in the company is unsatisfactory
              and hereby your employment with company is terminated. Please sign
              the copy of this letter as receipt of acceptance.
              <br />
              <br />
              Yours Sincerely,
            </p>
            <p className="mt-5 ">
              <b>For {endLetterData.company} Pvt Ltd,</b>
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

export default EndOfProbationLetter;
