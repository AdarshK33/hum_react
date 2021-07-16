import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";

import { Fragment } from "react";

const EntityTransfer = ({ transferData }) => {
  const [transferType, setTransferType] = useState("Entity Transfer");
  const [newEntity, setNewEntity] = useState("");
  const [newEntityErrMsg, setNewEntityErrMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empErrMsg, setEmpErrMsg] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newCostCentre, setNewCostCentre] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showInitiationLetter, setShowInitiationLetter] = useState(false);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showLetterSubmitModal, setShowLetterSubmitModal] = useState(false);

  return (
    <Fragment>
      {transferData &&
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0 ? (
        <Form>
          <Row className="mb-4">
            <Col md={2}>Transfer Type: </Col>
            <Col md={8} className="text-primary">
              {transferData.transferType}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={2}>Employee Name: </Col>
            <Col md={8} className="text-primary">
              {transferData.employeeName} {transferData.currentEmployeeId}
            </Col>
          </Row>

          <Row style={{ marginTop: "2rem" }}></Row>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>
              <Form.Label>Cost Center Name:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.currentCostCentre}
            </Col>
            <Col md={2}>
              <Form.Label>Contract Type:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.currentContractType}
            </Col>
          </Form.Group>
          <Row className="mb-4">
            <Col md={2}>Manager Name</Col>
            <Col md={8} className="text-primary">
              {transferData.currentManagerName +
                " " +
                transferData.currentManagerId}
            </Col>
          </Row>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>
              <Form.Label>Cost Center Name:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.currentManagerCostCentre}
            </Col>
            <Col md={2}>
              <Form.Label>Contract Type:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.currentManagerContractType}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>
              <Form.Label>UAN Number:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length !== 0 &&
              transferData.internationalTransfer !== null &&
              transferData.internationalTransfer !== undefined
                ? transferData.internationalTransfer.uanNumber
                : "(No Documents Available)"}
            </Col>
            <Col md={2}>
              <Form.Label>Bank Account Number:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length !== 0 &&
              transferData.internationalTransfer !== null &&
              transferData.internationalTransfer !== undefined
                ? transferData.internationalTransfer.bankAccountNumber
                : "(No Documents Available)"}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Col md={2}>
              <Form.Label>PAN Number:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length !== 0 &&
              transferData.internationalTransfer !== null &&
              transferData.internationalTransfer !== undefined
                ? transferData.internationalTransfer.panNumber
                : ""}
              &nbsp;&nbsp;
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length !== 0 &&
              transferData.internationalTransfer !== null &&
              transferData.internationalTransfer !== undefined &&
              transferData.internationalTransfer.panNumberDoc !== null &&
              transferData.internationalTransfer.panNumberDoc !== undefined ? (
                <a
                  href={
                    "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                    transferData.internationalTransfer.panNumberDoc
                  }
                  target="_blank"
                >
                  {" "}
                  <u className="text-primary">View</u>
                </a>
              ) : (
                "(No Documents Available)"
              )}
            </Col>
            <Col md={2}>
              <Form.Label>Aadhaar Number:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length !== 0 &&
              transferData.internationalTransfer !== null &&
              transferData.internationalTransfer !== undefined
                ? transferData.internationalTransfer.aadhaarNumber
                : ""}
              &nbsp;&nbsp;
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length !== 0 &&
              transferData.internationalTransfer !== null &&
              transferData.internationalTransfer !== undefined &&
              transferData.internationalTransfer.aadhaarNumberDoc !== null &&
              transferData.internationalTransfer.aadhaarNumberDoc !==
                undefined ? (
                <a
                  href={
                    "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                    transferData.internationalTransfer.aadhaarNumberDoc
                  }
                  target="_blank"
                >
                  {" "}
                  <u className="text-primary">View</u>
                </a>
              ) : (
                "(No Documents Available)"
              )}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationPosition"
          >
            <Col md={2}>
              <Form.Label>Old Entity:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.currentCompany}
            </Col>
            <Col md={2}>
              <Form.Label>New Entity:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedCompany}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationCostCentre"
          >
            <Col md={2}>
              <Form.Label>Old Fixed Gross:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.currentFixedGross}
            </Col>
            <Col md={2}>
              <Form.Label>New Fixed Gross:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedFixedGross}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationCostCentre"
          >
            <Col md={2}>
              <Form.Label>Effective Date:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedJoiningDate}
            </Col>
            <Col md={2}>
              <Form.Label>Relocation Bonus:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedRelocationBonus}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationCostCentre"
          >
            <Col md={2}>
              <Form.Label>New Cost Center:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedCostCenter}
            </Col>
            <Col md={2}>
              <Form.Label>New Location:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedLocationName}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationCostCentre"
          >
            <Col md={2}>
              <Form.Label>Company:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedCompany}
            </Col>
            <Col md={2}>
              <Form.Label>New Department:</Form.Label>
            </Col>
            <Col md={3} className="text-primary">
              {transferData.promotedDepartment}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationCostCentre"
          >
            <Col md={2}>
              <Form.Label>New Position:</Form.Label>
            </Col>
            <Col md={3}>{transferData.promotedPosition}</Col>
            <Col md={2}>
              <Form.Label>Date Of Joining:</Form.Label>
            </Col>

            <Col md={3} className="text-primary">
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

export default EntityTransfer;
