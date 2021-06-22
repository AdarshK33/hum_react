import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const ShowCauseNotice = () => {
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
          <h5 className="text-center"> LETTER OF SHOW CAUSE NOTICE </h5>

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
              You have been associated with {disciplinarySearchData.company}{" "}
              Private Limited (“Decathlon/{disciplinarySearchData.company}),
              having its registered office at Survey No. 78/10, A2 – 0
              Chikkajala Village, Bellary Road, Bangalore 562157, KA, IN, at its
              Store located at <b>{disciplinarySearchData.storeLocation}</b>{" "}
              (“Decathlon/{disciplinarySearchData.company}”). You are currently
              working at Decathlon <b>{disciplinarySearchData.department}</b> as{" "}
              <b>{disciplinarySearchData.position}</b>.
              <br />
              <br />
              <b>
                {disciplinarySearchData !== null &&
                disciplinarySearchData !== undefined &&
                disciplinarySearchData.disciplinaryAction !== null &&
                disciplinarySearchData.disciplinaryAction !== undefined &&
                Object.keys(disciplinarySearchData).length !== 0
                  ? disciplinarySearchData.disciplinaryAction.managerComment
                  : ""}
              </b>
              .
              <br />
              <br />
              This acts, as alleged above to have been committed by you, amount
              to Wilful Misconduct and Gross Negligence which, if proved, would
              warrant serious disciplinary action against you.
              <br />
              <br />
              Accordingly, you are hereby required to show cause within <b>
                5
              </b>{" "}
              days in receipt of this letter as to why you have indulged in such
              an act of wilful misconduct and Gross Negligence. Such charges,
              levelled against you, are of grave and serious nature, if you fail
              to submit the explanation as required, it will be presumed that
              you admit the charges and have no explanation to offer and the
              matter will be disposed of without any further reference to you.
              <br />
              <br />
              <br />
              The receipt of this letter should be acknowledged.
              <br />
            </p>
            <p className="mt-5 ">
              <b>{disciplinarySearchData.company} Pvt Ltd,</b>
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

export default ShowCauseNotice;
