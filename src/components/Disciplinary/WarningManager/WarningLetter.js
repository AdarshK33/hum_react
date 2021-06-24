import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const WarningLetter = () => {
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  console.log(disciplinarySearchData);
  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center"> WARNING LETTER </h5>

          <p>To ,</p>
          <p>
            {" "}
            <b>Ms./Mr.</b> &nbsp; {disciplinarySearchData.employeeName}
          </p>
          <p>
            <b>EmployeeId:</b> {disciplinarySearchData.employeeId}
          </p>
          <p>
            <b>Residential Address:</b> {disciplinarySearchData.employeeAddress}
          </p>

          <div className=" ">
            <p>Sub: Show cause notice</p>
            <p className="mt-5 ">
              {" "}
              Dear <b>{disciplinarySearchData.employeeName},</b>{" "}
            </p>
            <p>
              You have been associated Decathlon Sports India Private Limited
              (“Decathlon/Company”), having its registered office at{" "}
              {disciplinarySearchData.storeAddressLine}, You are currently
              working at Decathlon (prodin/indeca) india pvt ltd,
              <b>{disciplinarySearchData.storeLocation} </b>as a
              <b>{disciplinarySearchData.position}</b>.
              <br />
              On ,
              <b>
                {disciplinarySearchData.disciplinaryAction.actionIssuedDate}{" "}
              </b>
              , Decathlon issued to you a Show Cause notice, asking you for a
              clear written explanation regarding the following accusations-
              <b>{disciplinarySearchData.disciplinaryAction.managerComment} </b>
              <br />
              In furtherance to your reply to show cause notice is not
              satisfactory and justified. Therefore you are hereby warned to
              refrain in doing these activities and follow the right process of
              the company. It is expected that henceforth, there will be no
              occasions for such complaints in future otherwise appropriate
              disciplinary action will follow Please note, the Company reserves
              the right to take appropriate action with respect to any
              repetition of similar act.
              <br />
              <br />
              <br />
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

export default WarningLetter;
