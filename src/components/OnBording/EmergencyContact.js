import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const submitHandler = (e) => {
  e.preventDefault();
};

const EmergencyContact = () => {
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={6}>
            <div>
              <label>
                <b>Present Address</b>
              </label>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          {/* <div className="divContents"> */}
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Flat/Plot No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Flat/Plot No"
                required="required"
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street"
                required="required"
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Locality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Locality"
                required="required"
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Address Line 1<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Address Line 1"
                required="required"
              />
            </Form.Group>
          </div>
          {/* </div> */}
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control as="select">
                <option value="">City</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control as="select">
                <option value="">Country</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                PinCode<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="PinCode"
                required="required"
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>
                Phone No<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone No"
                required="required"
              />
            </Form.Group>
          </div>
        </Row>
      </Form>
    </Fragment>
  );
};
export default EmergencyContact;
