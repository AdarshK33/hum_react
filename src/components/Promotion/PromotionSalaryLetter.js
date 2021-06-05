import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import calendarImage from "../../assets/images/calendar-image.png";
import moment from "moment";
import { PromotionContext } from "../../context/PromotionState";

const PromotionSalaryLetter = () => {
  const { promotionLetterData } = useContext(PromotionContext);

  return (
    <Fragment>
      {typeof promotionLetterData !== undefined ? (
        <Fragment>
          <p className="">
            {" "}
            Date: <b>{moment().format("DD-MM-YYYY")}</b>
          </p>
          <br></br>
          <h5 className="text-center"> PROMOTION LETTER</h5>

          <p>Name:{promotionLetterData.employeeName}</p>
          <p>EmployeeId:{promotionLetterData.employeeId}</p>

          <div className=" ">
            <p className="mt-5 ">
              {" "}
              Dear <b>{promotionLetterData.employeeName},</b>{" "}
            </p>
            <br></br>
            <p>
              <b>Sub: Promotion with salary increment</b>
            </p>
            <p>
              We are pleased to promote you as XXX and your new gross salary
              will be INR. <b>{promotionLetterData.newFixedGross},</b>/- with
              effect from <b>{promotionLetterData.effectiveDate},</b>. You will
              be reporting to Ms./Mr. <b>{promotionLetterData.managerName},</b>.
              All the other terms and conditions of your appointment letter
              dated <b>{promotionLetterData.appointmentLetterDate},</b> shall
              remain the same.
            </p>
            <p>Please sign the copy of this letter as receipt of acceptance.</p>
            <p className="mt-5 ">
              <p>Yours Sincerely,</p>
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

export default PromotionSalaryLetter;
