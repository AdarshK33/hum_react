import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";

const RemunerationInformation = (props) => {
  const [fixedGross, setFixedGross] = useState();
  const [monthlyBonus, setMonthlyBonus] = useState();
  const [fixedGrossError, setFixedGrossError] = useState(false);
  const [monthlyBonusError, setMonthlyBonusError] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [saveclick, setSaveclick] = useState(false);
  const [stipened, setStipened] = useState();
  const [stipenedError, setStipenedError] = useState(false);

  const {
    remunerationSave,
    candidateData,
    createCandidateResponse,
    viewCandidateId,
    remunerationView,
    remunerationViewData,
  } = useContext(OfferContext);
  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log("candidateData remuneration1", createCandidateResponse);
    if (createCandidateResponse && createCandidateResponse.candidateId) {
      viewCandidateId(createCandidateResponse.candidateId);
    }
    console.log("candidateData remuneration2", candidateData);
    console.log("user profile", user);
  }, [candidateData]);

  const submitHandler = (e) => {
    console.log("inside submit", candidateData);
    let remunerationinfo;
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
      console.log("remuneration Info2", fixedGross, monthlyBonus, stipened);
      setFixedGrossError(true);
      setMonthlyBonusError(true);
      setStipenedError(false);
    } else if (
      (typeof fixedGross === "undefined" || fixedGross === "") &&
      candidateData.workInformation.contractType !== "Internship"
    ) {
      console.log("remuneration Info3", fixedGross, monthlyBonus, stipened);
      setFixedGrossError(true);
      setStipenedError(false);
    } else if (
      user.role === "ADMIN" &&
      (typeof monthlyBonus === "undefined" || monthlyBonus === "") &&
      candidateData.workInformation.contractType !== "Internship"
    ) {
      console.log("remuneration Info4", fixedGross, monthlyBonus, stipened);
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
      console.log("remuneration Info6", fixedGross, monthlyBonus, stipened);
      setStipenedError(false);
      setFixedGrossError(false);
      setMonthlyBonusError(false);
      console.log("remuneration Info", fixedGross, monthlyBonus, stipened);
      console.log("remunerationViewData save", remunerationViewData);
      console.log("contracttype", candidateData.workInformation.contractType);
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
          remunerationId: 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      } else if (remunerationViewData && saveclick === true) {
        console.log("second click");
        remunerationinfo = {
          candidateId: createCandidateResponse.candidateId,
          fixedGross: fixedGross,
          monthlyBonus: monthlyBonus,
          remunerationId: remunerationViewData.remunerationId,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      }

      console.log(
        "createCandidateResponse.candidateId",
        createCandidateResponse.candidateId
      );

      console.log("createCandidateResponse data", remunerationinfo);
      remunerationSave(remunerationinfo);
      viewCandidateId(createCandidateResponse.candidateId);
      remunerationView(createCandidateResponse.candidateId);
      setDisabled(true);
      setEditButton(true);
    }
  };

  const editHandler = () => {
    console.log("view cadidate id ", createCandidateResponse.candidateId);
    setDisabled(false);
    console.log("remunerationViewData edit", remunerationViewData);
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
                      placeholder="1000"
                      value={fixedGross}
                      onChange={(event) => setFixedGross(event.target.value)}
                      required
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
                            placeholder="0"
                            value={monthlyBonus}
                            onChange={(event) =>
                              setMonthlyBonus(event.target.value)
                            }
                            required
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
                            placeholder="0"
                            readOnly
                            disabled={disabled}
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

export default RemunerationInformation;