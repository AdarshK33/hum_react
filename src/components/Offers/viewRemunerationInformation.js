import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";

const ViewRemunerationInformation = (props) => {
  const [fixedGross, setFixedGross] = useState();
  const [monthlyBonus, setMonthlyBonus] = useState();
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fixedGrossError, setFixedGrossError] = useState(false);
  const [monthlyBonusError, setMonthlyBonusError] = useState(false);
  const [saveclick, setSaveclick] = useState(false);
  const [stipend, setStipend] = useState();

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
      setStipend(remunerationData.stipend);
    }
  }, [candidateData]);

  return (
    <Fragment>
      <Form>
        <Row>
          <Fragment>
            {candidateData &&
            candidateData.workInformation &&
            candidateData.workInformation.contractType !== "Internship" ? (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  {/* <Col sm={2}></Col> */}
                  <Form.Label column sm={3}>
                    Fixed Gross
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      className="form-input"
                      type="number"
                      name="fixedGross"
                      value={fixedGross}
                      placeholder="1000"
                      readOnly
                    />
                  </Col>
                </Form.Group>
              </Col>
            ) : (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Col sm={2}></Col>
                  <Form.Label column sm={3}>
                    Stipend
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      className="form-input"
                      type="number"
                      name="stipend"
                      value={stipend}
                      placeholder="1000"
                      readOnly
                    />
                  </Col>
                </Form.Group>
              </Col>
            )}
            {candidateData &&
            candidateData.workInformation &&
            candidateData.workInformation.contractType !== "Internship" ? (
              <Fragment>
                {user.role === "ADMIN" ? (
                  <Col sm={6}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      {/* <Form.Label column sm={3}> */}
                      Monthly Bonus ( % ){/* </Form.Label> */}
                      <Col sm={6}>
                        <Form.Control
                          className="form-input"
                          type="number"
                          name="monthlyBonus"
                          value={monthlyBonus}
                          placeholder="0"
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                ) : (
                  <Col sm={6}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      {/* <Form.Label column sm={3}> */}
                      Monthly Bonus
                      {/* </Form.Label> */}
                      <Col sm={6}>
                        <Form.Control
                          className="form-input"
                          type="nummber"
                          name="monthlyBonus"
                          readOnly
                          disabled="true"
                          placeholder="0"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                )}
              </Fragment>
            ) : (
              ""
            )}
          </Fragment>
        </Row>
      </Form>
    </Fragment>
  );
};

export default ViewRemunerationInformation;