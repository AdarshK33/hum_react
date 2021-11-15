import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import { OnBoardContext } from "../../context/OnBoardState";
import { AppContext } from "../../context/AppState";

const EducationAndWorkDoc = (props) => {
  const { user } = useContext(AppContext);

  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={8}>
            <label>
              <b>Heighest Education Certificate :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <label>
              <b>Relieving Letter :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <label>
              <b>Latest Payslip :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <label>
              <b>College Letter :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <label>
              <b>System Generated Appointment Letter :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <label>
              <b>Signed Appointment Letter :</b>
            </label>
            <br />
            <label className="itemResult">fileeeeeee.jpg</label>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              {/* onClick={submitHandler} */}
              <button className="stepperButtons">View</button>
            </div>
          </Col>
          <Col sm={2}>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "right",
              }}
            >
              <button className="stepperButtons">Download</button>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default EducationAndWorkDoc;
