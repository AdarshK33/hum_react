import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

const RegularTransferView = ({ transferData }) => {
  return (
    <Fragment>
      <Row className="mb-4">
        <Col md={2}>Transfer Type</Col>
        <Col md={8} className="text-primary">
          {transferData.transferType}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={2}>Employee Name</Col>
        <Col md={8} className="text-primary">
          {transferData.employeeName} {transferData.currentEmployeeId}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={{ span: 3, offset: 2 }} className="font-weight-bold my-2">
          Current
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="font-weight-bold my-2">
          New
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={2}>Department</Col>
        <Col md={3} className="text-primary">
          {transferData.currentDepartment}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedDepartment}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={2}>Cost Centre</Col>
        <Col md={3} className="text-primary">
          {transferData.currentCostCentre}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedCostCentre}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={2}>Manager</Col>
        <Col md={3} className="text-primary">
          {transferData.currentManagerName}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedManagerName}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={2}>Position</Col>
        <Col md={3} className="text-primary">
          {transferData.currentPosition}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedPosition}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={2}>Location</Col>
        <Col md={3} className="text-primary">
          {transferData.currentLocationName}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedLocationName}
        </Col>
      </Row>
      {/* <Row className="mb-4">
        <Col md={2}>Fixed Gross</Col>
        <Col md={3} className="text-primary">
          {transferData.currentFixedGross}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedFixedGross}
        </Col>
      </Row> */}
      <Row className="mb-4">
        <Col md={2} className="py-0">
          Bonus
        </Col>
        <Col md={3} className="text-primary">
          {transferData.promotedMonthlyBonus !== null &&
          transferData.promotedMonthlyBonus !== undefined &&
          transferData.promotedMonthlyBonus !== 0
            ? transferData.promotedMonthlyBonus +`%`
            : "NA"}
        </Col>
        <Col md={2} className="py-0">
          Relocation Bonus
        </Col>
        <Col md={3} className="text-primary">
          {transferData.promotedRelocationBonus !== null &&
          transferData.promotedRelocationBonus !== undefined &&
          transferData.promotedRelocationBonus !== ""
            ? transferData.promotedRelocationBonus
            : "NA"}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={2} className="py-0">
          Effective Date
        </Col>
        <Col md={3} className="text-primary">
          {transferData.promotedJoiningDate}
        </Col>
      </Row>
      {transferData.remark !== null &&
      transferData.remark !== undefined &&
      transferData.remark !== "" ? (
        <Row className="mb-4">
          <Col md={2} className="py-0">
            Reason for transfer rejection
          </Col>
          <Col md={3} className="text-primary">
            {transferData.remark}
          </Col>
        </Row>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default RegularTransferView;
