import React, { Fragment, useState, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";

const EditRemunerationInformation = (props) => {
  const [fixedGross, setFixedGross] = useState("");
  const [monthlyBonus, setMonthlyBonus] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fixedGrossError, setFixedGrossError] = useState(false);
  const [monthlyBonusError, setMonthlyBonusError] = useState(false);

  const { remunerationUpdate, createCandidateResponse } = useContext(
    OfferContext
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (fixedGross === "" && monthlyBonus === "") {
      setFixedGrossError(true);
      setMonthlyBonusError(true);
    } else if (fixedGross === "") {
      setFixedGrossError(true);
    } else if (monthlyBonus === "") {
      setMonthlyBonusError(true);
    } else {
      setFixedGrossError(false);
      setMonthlyBonusError(false);
      console.log("remuneration Info", fixedGross, monthlyBonus);
      const data = {
        candidateId: createCandidateResponse.candidateId,
        fixedGross: fixedGross,
        monthlyBonus: monthlyBonus,
        remunerationId: 0,
        stipend: 0,
      };
      remunerationUpdate(data);
      setDisabled(true);
      setEditButton(true);
    }
  };
  const editHandler = () => {
    setDisabled(false);
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={2}></Col>
              <Form.Label column sm={3}>
                Fixed Gross
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="fixedGross"
                  value={fixedGross}
                  onChange={(event) => setFixedGross(event.target.value)}
                  required
                  disabled={disabled}
                />
                {fixedGrossError ? (
                  <p style={{ color: "red" }}>This field cannot be empty</p>
                ) : (
                  ""
                )}
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Monthly Bonus
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="monthlyBonus"
                  value={monthlyBonus}
                  onChange={(event) => setMonthlyBonus(event.target.value)}
                  required
                  disabled={disabled}
                />
                {monthlyBonusError ? (
                  <p style={{ color: "red" }}>This field cannot be empty</p>
                ) : (
                  ""
                )}
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={5}></Col>
          <Col sm={2}>
            <Button onClick={submitHandler}>Save</Button>
          </Col>
          {editButton === true ? (
            <Col sm={2}>
              <Button onClick={editHandler}>Edit</Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Form>
    </Fragment>
  );
};

export default EditRemunerationInformation;
