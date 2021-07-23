import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const InternationalTransferView = ({ transferData }) => {
  return (
    <div className="mb-5">
      <Row className="mb-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Transfer Type</Col>
            <Col md={7} className="text-primary">
              {transferData.transferType}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Empployee Name</Col>
            <Col md={7} className="text-primary">
              {transferData.employeeName} {transferData.currentEmployeeId}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Cost Centre Name</Col>
            <Col md={7} className="text-primary">
              {transferData.currentCostCentre}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={5}>Contract Type</Col>
            <Col md={7} className="text-primary">
              {transferData.currentContractType}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Coutry Moving To</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedCountry}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={5}>Designation</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedDesignation}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Onward Date</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedJoiningDate}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={5}>Return Date</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedDateOfReturn}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Cost centre of the host country</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedCostCentre}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={5}>Name of global mobility manager</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedManagerName}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Email id of global mobility manager</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedManagerEmailId}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={6}>Are you covered under insurance in host country?</Col>
            <Col md={6} key="inline-checkbox">
              <Form.Check inline type="checkbox">
                <Form.Check.Input
                  type="checkbox"
                  name="insurence"
                  value="Yes"
                  id="insurence_yes"
                  className="largerCheckbox border-primary"
                  checked={transferData.isInsuranceCovered}
                  disabled
                />
                <Form.Check.Label className="text-primary">
                  Yes
                </Form.Check.Label>
              </Form.Check>
              <Form.Check inline type="checkbox">
                <Form.Check.Input
                  type="checkbox"
                  name="insurence"
                  value="No"
                  id="insurence_no"
                  className="largerCheckbox border-primary"
                  checked={!transferData.isInsuranceCovered}
                  disabled
                />
                <Form.Check.Label className="text-primary">No</Form.Check.Label>
              </Form.Check>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6}>
          <Row>
            <Col md={5}>Term of the project</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedTermOfProject}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="font-weight-bold">Renumeration</Col>
      </Row>
      <Row className="mt-3">
        <Col md={4}>
          <Row>
            <Col md={4}> Currency</Col>
            <Col md={8} className="text-primary">
              {transferData.currency}
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={4}>Fixed Gross</Col>
            <Col md={8} className="text-primary">
              {transferData.promotedFixedGross}
            </Col>
          </Row>
        </Col>

        <Col md={4}>
          <Row>
            <Col md={5}>Bonus</Col>
            <Col md={7} className="text-primary">
              {transferData.promotedMonthlyBonus}
            </Col>
          </Row>
        </Col>
      </Row>
      {transferData.contractStatus !== null &&
        transferData.contractStatus !== undefined && (
          <Row className="mt-3">
            <Col md={6}>
              <Row>
                <Col md={5}>Contract Status</Col>
                <Col md={7} className="text-primary">
                  {transferData.contractStatus}
                </Col>
              </Row>
            </Col>
          </Row>
        )}
    </div>
  );
};

export default InternationalTransferView;
