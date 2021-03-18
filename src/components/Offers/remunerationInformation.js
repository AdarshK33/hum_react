import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";

const RemunerationInformation = (props) => {
  const [fixedGross, setFixedGross] = useState("");
  const [monthlyBonus, setMonthlyBonus] = useState("");
  const [fixedGrossError, setFixedGrossError] = useState(false);
  const [monthlyBonusError, setMonthlyBonusError] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    remunerationSave,
    candidateData,
    createCandidateResponse,
    remunerationView,
    remunerationViewData,
  } = useContext(OfferContext);
  const { user } = useContext(AppContext);

  // useEffect(() => {
  //   console.log("candidateData remuneration1", createCandidateResponse);
  //   console.log("candidateData remuneration2", candidateData);
  //   getUserInfo();
  //   console.log("user profile", user);
  // });

  const submitHandler = (e) => {
    console.log("inside submit");
    e.preventDefault();
    if (user.role === "ADMIN" && fixedGross === "" && monthlyBonus === "") {
      setFixedGrossError(true);
      setMonthlyBonusError(true);
    } else if (fixedGross === "") {
      setFixedGrossError(true);
    } else if (user.role === "ADMIN" && monthlyBonus === "") {
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
      remunerationSave(data);
      remunerationView(createCandidateResponse.candidateId);
      setDisabled(true);
      setEditButton(true);
    }
  };

  const editHandler = () => {
    console.log("view cadidate id ", createCandidateResponse.candidateId);
    setDisabled(false);
    console.log("remunerationViewData", remunerationViewData);
    // setFixedGross(remunerationViewData.fixedGross);
    // setMonthlyBonus(remunerationViewData.monthlyBonus);
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Fragment>
            <Col sm={6}>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Col sm={2}></Col>
                <Form.Label column sm={3}>
                  Fixed Gross
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    className="form-input"
                    type="number"
                    name="fixedGross"
                    placeholder="1000"
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
            {user.role === "ADMIN" ? (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Monthly Bonus
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      className="form-input"
                      type="number"
                      name="monthlyBonus"
                      placeholder="0"
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
            ) : (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Monthly Bonus
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      className="form-input"
                      type="nummber"
                      name="monthlyBonus"
                      placeholder="0"
                      value={0}
                      onChange={(event) => setMonthlyBonus(event.target.value)}
                      required
                      readOnly
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
            )}
          </Fragment>
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

export default RemunerationInformation;
