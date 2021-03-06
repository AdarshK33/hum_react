import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const submitHandler = (e) => {
  e.preventDefault();
};

const BankDetails = () => {
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Bank Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                required="required"
              />
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Bank Account No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Account No"
                required="required"
              />
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                IFSC Code<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Account No"
                required="required"
              />
            </Form.Group>
          </div>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={8}>
            <div className="inputField">
              <label>
                <b>Guidelines for Bank Account</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <div>
              <br></br>
              <label>
                <b>1.</b>The Candidate's name sholud be upload on the cancelled
                cheque.
              </label>
              <br></br>
              <label>
                <b>2.</b>If the name of the candidate is not present then you
                can upload bank statments and passbook.
              </label>
              <br></br>
              <label>
                <b>3.</b>The candidate's name on the documents is mandatory
                otherwise it will not be considered as valid proof.
              </label>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default BankDetails;
