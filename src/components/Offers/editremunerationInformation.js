import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";

const EditRemunerationInformation = (props) => {
  const [fixedGross, setFixedGross] = useState();
  const [monthlyBonus, setMonthlyBonus] = useState();
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fixedGrossError, setFixedGrossError] = useState(false);
  const [monthlyBonusError, setMonthlyBonusError] = useState(false);
  const [saveclick, setSaveclick] = useState(false);

  const {
    remunerationUpdate,
    createCandidateResponse,
    candidateData,
    remunerationView,
    remunerationViewData,
  } = useContext(OfferContext);

  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log("candidateData remuneration", candidateData);
    let remunerationData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;

    if (remunerationData !== null && remunerationData !== undefined) {
      setFixedGross(remunerationData.fixedGross);
      setMonthlyBonus(remunerationData.monthlyBonus);
    }
  }, [candidateData]);

  const submitHandler = (e) => {
    console.log("inside edit submit", candidateData);
    let remunerationinfo;
    let remunerationSubmitData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;
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
      if (saveclick === false) {
        console.log("first click");
        setSaveclick(true);
        remunerationinfo = {
          candidateId: createCandidateResponse.candidateId,
          fixedGross: fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: candidateData.remuneration.remunerationId
            ? candidateData.remuneration.remunerationId
            : 0,
          stipend: 0,
        };
      } else if (candidateData.remuneration && saveclick === true) {
        remunerationinfo = {
          candidateId: createCandidateResponse.candidateId,
          fixedGross: fixedGross,
          monthlyBonus: monthlyBonus,
          remunerationId: remunerationSubmitData.remunerationId,
          stipend: 0,
        };
      }
      console.log(
        "remunerationViewData.remunerationId",
        remunerationViewData.remunerationId
      );

      console.log("createCandidateResponse data", remunerationinfo);
      remunerationUpdate(remunerationinfo);
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
                    value={fixedGross}
                    onChange={(event) => setFixedGross(event.target.value)}
                    required
                    placeholder="1000"
                    disabled={disabled}
                  />
                  {fixedGrossError ? (
                    <p style={{ color: "red" }}>This field cannot be empty</p>
                  ) : fixedGross < 15000 ? (
                    <p style={{ color: "red" }}>
                      Should be greater than 15000{" "}
                    </p>
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
                    Monthly Bonus ( % )
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      className="form-input"
                      type="number"
                      name="monthlyBonus"
                      value={monthlyBonus}
                      onChange={(event) => setMonthlyBonus(event.target.value)}
                      required
                      placeholder="0"
                      disabled={disabled}
                    />
                    {monthlyBonusError ? (
                      <p style={{ color: "red" }}>This field cannot be empty</p>
                    ) : monthlyBonus > 20 ? (
                      <p style={{ color: "red" }}>Maximum Bonus 20 %</p>
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
                      readOnly
                      disabled={disabled}
                      placeholder="0"
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

export default EditRemunerationInformation;
