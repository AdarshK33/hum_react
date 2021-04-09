import React, { Fragment, useState, useContext, useEffect } from "react";
import { OfferContext } from "../../context/OfferState";
import DatePicker from "react-datepicker";
import { PlusCircle, MinusCircle } from "react-feather";
import moment from "moment";

import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";

const CandidateOnboarding = () => {
  const { candidateData } = useContext(OfferContext);
  const [add, setAdd] = useState(false);
  const [count, setCount] = useState(1);
  const showOneMore = () => {
    setAdd(true);
    setCount(count + 1);
  };

  return (
    console.log(candidateData),
    (
      <Fragment>
        <div className="px-5 mx-auto">
          <h5>
            <u>WORK DETAILS</u>
          </h5>
          <Row className="mt-5">
            <Col sm={2}>Candidate date of joining</Col>
            <Col>
              {candidateData !== undefined &&
              candidateData.workInformation !== undefined
                ? moment(candidateData.workInformation.dateOfJoin).format(
                    "YYYY-MM-DD"
                  )
                : ""}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={1}>
              <Form.Label>Email ID</Form.Label>
            </Col>
            <Col sm={5}>
              <Form.Control style={{ borderColor: "#006ebb" }} type="text" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={1}>
              <Form.Label>FED ID</Form.Label>
            </Col>
            <Col sm={5}>
              <Form.Control style={{ borderColor: "#006ebb" }} type="text" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm={1}>
              <Form.Label>System role</Form.Label>
            </Col>
            <Col sm={5}>
              <Form.Control as="select" style={{ borderColor: "#006ebb" }} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={3}></Col>
            <Col sm={4}>
              <Button className="px-5">Save</Button>
            </Col>
          </Row>
        </div>
        <div className="px-5 mx-auto mt-4">
          <h5>
            <u>REMUNERATION DETAILS</u>
          </h5>
          <Row className="mt-4">
            <Col sm={4}>
              <label className="mr-3">Candidate ID:</label>
              <label>
                {candidateData.candidateInformation !== undefined &&
                candidateData.candidateInformation !== null
                  ? candidateData.candidateInformation.candidateId
                  : ""}
              </label>
            </Col>
            <Col sm={4}>
              <label className="mr-3">Candidate Name:</label>
              <label>
                {candidateData.candidateInformation !== undefined &&
                candidateData.candidateInformation !== null
                  ? candidateData.candidateInformation.firstName +
                    candidateData.candidateInformation.lastName
                  : ""}
              </label>
            </Col>
            <Col sm={4}>
              <label className="mr-3">Application Date:</label>
              <label>
                {candidateData.candidateInformation !== undefined &&
                candidateData.candidateInformation !== null
                  ? candidateData.candidateInformation.createdDate
                  : ""}
              </label>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <label className="mr-3">Fixed Gross:</label>
              <label>
                {candidateData.remuneration !== undefined &&
                candidateData.remuneration !== null ? (
                  <p>{candidateData.remuneration.fixedGross}</p>
                ) : (
                  <p>N/A</p>
                )}
              </label>
            </Col>
            <Col sm={4}>
              <label className="mr-3">Bonus (in %):</label>
              <label>
                {candidateData.remuneration !== undefined &&
                candidateData.remuneration !== null ? (
                  <p>{candidateData.remuneration.fixedGross}</p>
                ) : (
                  <p>N/A</p>
                )}
              </label>
            </Col>
          </Row>
        </div>
        <div className="px-5 mx-auto mt-4">
          <h5>Cost Center Split</h5>
          <Row>
            <Col sm={1}>
              <h6>Cost Center1</h6>
            </Col>
            <Col sm={1}>
              <Form.Group>
                <Form.Control as="select" placeholder="costCenter1" />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <DatePicker
                dateFormat="MM"
                placeholderText="Select Start Month"
              />
            </Col>
            <Col sm={2}>
              <DatePicker dateFormat="MM" placeholderText="Select Year" />
            </Col>
            <Col sm={2}>
              <DatePicker dateFormat="MM" placeholderText="Select End Month" />
            </Col>
            <Col sm={2}>
              <DatePicker
                dateFormat="MM"
                placeholderText="Select Year"
                // disabled={disabled}
              />
            </Col>
            <PlusCircle
              style={{ color: "#376ebb" }}
              onClick={showOneMore}
              style={{ marginTop: "2rem", color: "#006EBB" }}
            />
          </Row>
        </div>
        <div className="px-5 mx-auto mt-5">
          <h5>
            <u>GENERATE APPOINTMENT LETTER</u>
          </h5>
          <Row className="text-center mt-3">
            <Button type="button" className="px-5">
              Preview Appointment Letter
            </Button>
          </Row>
        </div>
      </Fragment>
    )
  );
};
export default CandidateOnboarding;
