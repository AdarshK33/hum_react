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
  const [stipened, setStipened] = useState();
  const [stipenedError, setStipenedError] = useState(false);
  const [viewApiCall, setViewApiCall] = useState(false);

  const {
    remunerationUpdate,
    createCandidateResponse,
    candidateData,
    remunerationView,
    remunerationViewData,
    viewCandidateId,
  } = useContext(OfferContext);

  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log("candidateData remuneration", candidateData);
    if (
      createCandidateResponse &&
      createCandidateResponse.candidateId &&
      candidateData &&
      candidateData.workInformation &&
      candidateData.workInformation.contractType &&
      viewApiCall === false
    ) {
      viewCandidateId(createCandidateResponse.candidateId);
      setViewApiCall(true);
    } else {
      setViewApiCall(false);
    }

    let remunerationData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;

    if (remunerationData !== null && remunerationData !== undefined) {
      setFixedGross(remunerationData.fixedGross);
      setMonthlyBonus(remunerationData.monthlyBonus);
    }
  }, [candidateData.workInformation]);

  const submitHandler = (e) => {
    console.log("inside edit submit", candidateData);
    let remunerationinfo;
    let remunerationSubmitData =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;
    e.preventDefault();
    console.log(
      "remuneration Info1",
      fixedGross,
      monthlyBonus,
      stipened,
      candidateData.workInformation.contractType,
      user.role,
      typeof stipened
    );
    if (
      user.role === "ADMIN" &&
      (typeof fixedGross === "undefined" || fixedGross === "") &&
      (typeof monthlyBonus === "undefined" || monthlyBonus === "") &&
      candidateData.workInformation.contractType !== "Internship"
    ) {
      setFixedGrossError(true);
      setMonthlyBonusError(true);
      setStipenedError(false);
    } else if (
      (typeof fixedGross === "undefined" || fixedGross === "") &&
      candidateData.workInformation.contractType !== "Internship"
    ) {
      setFixedGrossError(true);
      setStipenedError(false);
    } else if (
      user.role === "ADMIN" &&
      (typeof monthlyBonus === "undefined" || monthlyBonus === "") &&
      candidateData.workInformation.contractType !== "Internship"
    ) {
      setMonthlyBonusError(true);
      setStipenedError(false);
    } else if (
      user.role === "ADMIN" &&
      (typeof stipened === "undefined" || stipened === "") &&
      candidateData.workInformation.contractType === "Internship"
    ) {
      console.log("remuneration Info5", fixedGross, monthlyBonus, stipened);
      setStipenedError(true);
    } else {
      setStipenedError(false);
      setFixedGrossError(false);
      setMonthlyBonusError(false);
      console.log("remuneration Info", fixedGross, monthlyBonus);
      if (saveclick === false) {
        console.log("first click");
        setSaveclick(true);
        remunerationinfo = {
          candidateId: createCandidateResponse.candidateId,
          fixedGross:
            fixedGross === undefined || fixedGross === null ? 0 : fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: candidateData.remuneration.remunerationId
            ? candidateData.remuneration.remunerationId
            : 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      } else if (candidateData.remuneration && saveclick === true) {
        remunerationinfo = {
          candidateId: createCandidateResponse.candidateId,
          fixedGross: fixedGross,
          monthlyBonus: monthlyBonus,
          remunerationId: remunerationSubmitData.remunerationId,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
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
                      onChange={(event) => setFixedGross(event.target.value)}
                      required
                      placeholder="1000"
                      disabled={disabled}
                    />
                    {fixedGrossError ? (
                      <p style={{ color: "red" }}>This field cannot be empty</p>
                    ) : candidateData &&
                      candidateData.workInformation &&
                      candidateData.workInformation.contractType ===
                        "Parttime" &&
                      (fixedGross < 90 || fixedGross > 200) ? (
                      <p style={{ color: "red" }}>
                        Value should be between 90 - 200{" "}
                      </p>
                    ) : candidateData &&
                      candidateData.workInformation &&
                      candidateData.workInformation.contractType ===
                        "Permanent" &&
                      fixedGross < 18000 ? (
                      <p style={{ color: "red" }}>
                        Value should be greater than 18000{" "}
                      </p>
                    ) : (
                      ""
                    )}
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
                      placeholder="1000"
                      value={stipened}
                      onChange={(event) => setStipened(event.target.value)}
                      required
                      disabled={disabled}
                    />
                    {stipenedError ? (
                      <p style={{ color: "red" }}>This field cannot be empty</p>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
            )}

            {candidateData &&
            candidateData.workInformation &&
            candidateData.workInformation.contractType !== "Internship" ? (
              <Fragment>
                {user ? (
                  user.role === "ADMIN" ? (
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
                            onChange={(event) =>
                              setMonthlyBonus(event.target.value)
                            }
                            required
                            placeholder="0"
                            disabled={disabled}
                          />
                          {monthlyBonusError ? (
                            <p style={{ color: "red" }}>
                              This field cannot be empty
                            </p>
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
                        {/* <Form.Label column sm={3}> */}
                        Monthly Bonus
                        {/* </Form.Label> */}
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
                            <p style={{ color: "red" }}>
                              This field cannot be empty
                            </p>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Form.Group>
                    </Col>
                  )
                ) : (
                  ""
                )}
              </Fragment>
            ) : (
              ""
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
