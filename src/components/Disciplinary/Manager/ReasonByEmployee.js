import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const ReasonByEmployee = () => {
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Fragment>
      {typeof disciplinarySearchData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center"> LETTER </h5>

          <p>To ,</p>
          <p>
            {" "}
            <b>Ms./Mr.</b> &nbsp; {disciplinarySearchData.managerName}
          </p>
          <p>Decathlon Sports India</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{disciplinarySearchData.managerName},</b>{" "}
            </p>
            <br></br>
            <p>
              <b>Sub:</b> Reply to the Show Cause Notice issue Date{" "}
              {moment().format("DD-MM-YYYY")}
            </p>
            <p>
              I would to explain my response towards the show cause issued on{" "}
              {disciplinarySearchData.disciplinaryAction.actionIssuedDate} and
              here is my explanation to the same.
            </p>
            <br />
            <p>{disciplinarySearchData.disciplinaryAction.employeeComment}</p>
            <br />
            From,
            <p className="">
              {" "}
              Employee Name: <b>{disciplinarySearchData.employeeName}</b>
            </p>
            <p className="">
              {" "}
              Employee Id: <b>{disciplinarySearchData.employeeId}</b>
            </p>
            <p className=""> Signatory:</p>
            <div className="float-right "></div>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ReasonByEmployee;
