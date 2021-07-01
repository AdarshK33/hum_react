import React, { Fragment, useState, useContext, useEffect } from "react";
import { Modal, Row, Col, Form, Button,Container } from "react-bootstrap";
import calendarImage from "../../../assets/images/calendar-image.png";
import moment from "moment";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";

const ReasonByEmployee = () => {
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  //   connsole.log("today", moment().format("DD-MM-YYYY"));
  return (
    <Container>
    {typeof disciplinarySearchData !== undefined ? (
        // <Fragment>
        //     <h6>Reason By Employee:</h6> 
        //    <b> {disciplinarySearchData.disciplinaryAction.employeeComment}</b>

        // </Fragment>
        <>
          <Modal.Header  className="modalHeader">
            <Modal.Title>Reason By Employee:</Modal.Title>
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label>{disciplinarySearchData.disciplinaryAction.employeeComment}</label>

        
          </Modal.Body></>
      ) : (
        ""
      )}
        </Container>
  );
};

export default ReasonByEmployee;
