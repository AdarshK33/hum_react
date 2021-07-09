import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { TransferContext } from "../../../context/TransferState";

const RegularTransferAcceptance = ({
  transferData,
  costCentreLocationData,
}) => {
  const { createTransferInitiation } = useContext(TransferContext);

  const [newLocation, setNewLocation] = useState(transferData.promotedLocation);
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [newGross, setNewGross] = useState(transferData.promotedFixedGross);
  const [grossErrMsg, setGrossErrMsg] = useState("");
  const [bonus, setBonus] = useState(
    transferData.promotedMonthlyBonus ? transferData.promotedMonthlyBonus : ""
  );
  const [relocationBonus, setRelocationBonus] = useState(
    transferData.promotedRelocationBonus
  );
  const [relocationBonusErrMsg, setRelocationBonusErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (formValid === true) {
      const initiationData = {
        ...transferData,
        promotedFixedGross: newGross,
        promotedLocation: newLocation,
        promotedMonthlyBonus: bonus !== "" ? bonus : null,
        promotedRelocationBonus: relocationBonus,
        status: 1,
      };
      createTransferInitiation(initiationData);
    }
  }, [formValid]);

  const changeLocationHandler = (e) => {
    setNewLocation(e.target.value);
    setLocationErrMsg("");
  };

  const changeGrossHandler = (e) => {
    setNewGross(e.target.value);
    setGrossErrMsg("");
  };

  const changeBonusHandler = (e) => {
    setBonus(e.target.value);
  };

  const changeRelocationBonusHandler = (e) => {
    setRelocationBonus(e.target.value);
    setRelocationBonusErrMsg("");
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;

    if (newLocation === "") {
      validForm = false;
      setLocationErrMsg("Please select location");
    }

    if (newGross === "") {
      validForm = false;
      setGrossErrMsg("Please enter fixed gross");
    }

    if (relocationBonus === "") {
      validForm = false;
      setRelocationBonusErrMsg("Please enter relocation bonus");
    }

    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
    if (validFormRes === true) {
      setFormValid(true);
    }
  };

  return (
    <Form>
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
        <Col md={2}>Position</Col>
        <Col md={3} className="text-primary">
          {transferData.currentPosition}
        </Col>
        <Col md={{ span: 3, offset: 2 }} className="text-primary">
          {transferData.promotedPosition}
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
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="transferInitiationLocation"
      >
        <Form.Label column md={2}>
          Location
        </Form.Label>
        <Col md={3} className="text-primary">
          {transferData.currentLocationName}
        </Col>
        <Col md={{ span: 3, offset: 2 }}>
          <Form.Control
            as="select"
            className="text-primary"
            aria-label="transferAcceptanceLocation"
            value={newLocation}
            placeholder="Select Location"
            onChange={changeLocationHandler}
          >
            <option>Select Location</option>
            {costCentreLocationData !== null &&
              costCentreLocationData !== undefined &&
              Object.keys(costCentreLocationData).length !== 0 && (
                <option value={costCentreLocationData.locationId}>
                  {costCentreLocationData.locationName}
                </option>
              )}
          </Form.Control>
          {locationErrMsg !== "" && (
            <span className="text-danger">{locationErrMsg}</span>
          )}
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="transferAcceptanceFixedGross"
      >
        <Form.Label column md={2}>
          Fixed Gross
        </Form.Label>
        <Col md={3} className="text-primary">
          {transferData.currentFixedGross}
        </Col>
        <Col md={{ span: 3, offset: 2 }}>
          <Form.Control
            type="text"
            placeholder=""
            value={newGross}
            className="text-primary"
            onChange={changeGrossHandler}
          ></Form.Control>
          {grossErrMsg !== "" && (
            <span className="text-danger">{grossErrMsg}</span>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column md={2}>
          Bonus In Percent (Optional)
        </Form.Label>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder=""
            value={bonus}
            className="text-primary"
            id="transferInitiationCurrentPercent"
            onChange={changeBonusHandler}
          ></Form.Control>
        </Col>
        <Col md={2} className="pt-2">
          Relocation Bonus
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder=""
            value={relocationBonus}
            className="text-primary"
            id="transferInitiationBonus"
            onChange={changeRelocationBonusHandler}
          ></Form.Control>
          {relocationBonusErrMsg !== "" && (
            <span className="text-danger">{relocationBonusErrMsg}</span>
          )}
        </Col>
      </Form.Group>
      <Row className="mb-4">
        <Col md={2} className="py-0">
          Effective Date
        </Col>
        <Col md={3} className="text-primary">
          {transferData.promotedJoiningDate}
        </Col>
      </Row>
      <Row className="my-5">
        <Col
          md={{ span: 6, offset: 2 }}
          className="d-flex justify-content-around"
        >
          <Button
            variant="primary"
            disabled={formValid}
            type="button"
            onClick={submitHandler}
          >
            Save and Accept
          </Button>
          <Button variant="primary" className="px-4" type="button">
            Reject
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegularTransferAcceptance;
