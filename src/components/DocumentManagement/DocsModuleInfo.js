import React from "react";
import { Row, Col } from "react-bootstrap";

const DocsModuleInfo = ({ loginRole, costCentre, module, employee }) => {
  return (
    <div className="docs-module-container">
      <Row className="mb-3">
        <Col md={6}>
          <Row>
            <Col md={4}>Cost Centre:</Col>
            <Col md={8} className="text-primary">
              {costCentre}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={4}>Module:</Col>
            <Col md={8} className="text-primary">
              {module}
            </Col>
          </Row>
        </Col>
      </Row>
      {loginRole !== "Employee" && (
        <Row className="mb-3">
          <Col md={6}>
            <Row>
              <Col md={4}>Employee:</Col>
              <Col md={8} className="text-primary">
                {employee}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DocsModuleInfo;
