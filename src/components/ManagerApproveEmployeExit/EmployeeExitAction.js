import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
const EmployeeExitAction = () => {
  return (
    <Fragment>
      <div className="card" style={{ overflowX: "auto" }}>
        <Form>
          <Row>
            <Col>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>EMPLOYEE SEPARATION </b>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default EmployeeExitAction;
