import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const submitHandler = (e) => {
  e.preventDefault();
};

const PFDeclaration = () => {
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Is this your first job ?</label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="Yes" />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="No" />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Were you contributing in your previous organization ?
              </label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="Yes" />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="No" />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Provide your UAN number</label>
            </div>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="UAN number"
                required="required"
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <div>
              <label for=" ">
                Fill <a href="~/address">EPF Form</a> here
              </label>
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Are you a member of employer pension scheme in your previous
                employement ?
              </label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="Yes" />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="No" />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Does the PF nomination hold good in case of health ?
              </label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="Yes" />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input type="checkbox" value="No" />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <div>
              <label for=" ">
                <a href="~/address">Add</a> Details here
              </label>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default PFDeclaration;
