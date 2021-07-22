import React, { Fragment } from "react";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";

const ChangeEmployementType = ({ transferData }) => {
  return (
    <Fragment>
      {transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length > 0 ? (
        <Form>
          <Row className="mb-4">
            <Col md={2}>Transfer Type: </Col>
            <Col md={8} className="text-primary">
              {transferData.transferType === "Employment Type Transfer"
                ? "Change In Employement Type Transfer"
                : transferData.transferType}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={2}>Employee Name: </Col>
            <Col md={8} className="text-primary">
              {transferData.employeeName} {transferData.currentEmployeeId}
            </Col>
          </Row>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col className="font-weight-bold">
              <u>Work Information</u>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>Cost Center:</Col>
            <Col md={4} className="text-primary">
              {transferData.currentCostCentre}
            </Col>

            <Col md={2}>Contract Type:</Col>
            <Col md={4} className="text-primary">
              {transferData.currentContractType}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2} className="py-0">
              Change Employement:
            </Col>

            <Col md={4} className="text-primary">
              {transferData.promotedContractType}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col className="font-weight-bold">
              <u>Remuneration Information</u>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>Salary Type:</Col>
            <Col md={4} className="text-primary">
              {transferData.salaryType}
            </Col>

            <Col md={2}>Fixed Gross:</Col>
            <Col md={4} className="text-primary">
              {transferData.promotedFixedGross}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>Effective Date:</Col>
            <Col md={4} className="text-primary">
              {transferData.promotedJoiningDate}
            </Col>
          </Form.Group>
        </Form>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ChangeEmployementType;
