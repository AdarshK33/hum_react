import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";
import { candidate } from "../../utils/canditateLogin";

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
  const [viewApiCall, setViewApiCall] = useState(false);
  const [parmanentGrossLimit, setParmanentGrossLimit] = useState(false);
  const [partTimeGrossLimit, setPartTimeGrossLimit] = useState(false);
  const [bonusLimit, setBonusLimit] = useState(false);

  const {
    remunerationSave,
    candidateData,
    createCandidateResponse,
    viewCandidateId,
    remunerationView,
    remunerationViewData,
    workInformationData,
    workInfoViewData,
    workInfoView,
    remunerationData,
  } = useContext(OfferContext);
  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log("candidateData remuneration1", createCandidateResponse);
    if (
      createCandidateResponse &&
      createCandidateResponse.candidateId &&
      candidateData &&
      candidateData.workInformation &&
      candidateData.workInformation.contractType &&
      viewApiCall === false
    ) {
      viewCandidateId(createCandidateResponse.candidateId);
      workInfoView(createCandidateResponse.candidateId);
      setViewApiCall(true);
    } else {
      setViewApiCall(false);
    }
    console.log("candidateData remuneration2", candidateData);
    console.log("workInformationData remuneration", workInformationData);
    console.log("workInfoViewData", workInfoViewData);
    console.log("user profile", user);
  }, [candidateData.workInformation]);

  const submitHandler = (e) => {
    alert("in sumbit handler");
    console.log("inside submit", candidateData);
    let remunerationinfo;
    e.preventDefault();
    console.log(
      "remuneration Info1",
      fixedGross,
      monthlyBonus,
      stipened,
      user.role,
      typeof stipened,
      workInfoViewData
    );
    if (
      (typeof stipened === "undefined" ||
        stipened === "" ||
        (stipened + "").includes(" ", "-", ".", "/", "+")) &&
      workInfoViewData.contractType === "Internship" &&
      stipened <= 0
    ) {
      console.log("remuneration Info5", fixedGross, monthlyBonus, stipened);
      setStipenedError(true);
    } else if (
      ((user.role === "ADMIN" &&
        workInfoViewData.contractType !== "Internship" &&
        (typeof fixedGross === "undefined" ||
          fixedGross === "" ||
          stipened <= 0 ||
          fixedGross.includes(" ", "-", ".", "/", "+"))) ||
        (workInfoViewData.contractType === "Permanent" && fixedGross < 18000) ||
        (workInfoViewData.contractType === "Parttime" &&
          (fixedGross < 90 || fixedGross > 200))) &&
      (typeof monthlyBonus === "undefined" ||
        monthlyBonus === "" ||
        monthlyBonus.includes(" ", "-", ".", "/", "+") ||
        (workInfoViewData.contractType === "Permanent" && monthlyBonus > 20) ||
        (workInfoViewData.contractType === "Parttime" && monthlyBonus > 20))
    ) {
      alert("in admin");
      console.log("remuneration Info2", fixedGross, monthlyBonus, stipened);
      setFixedGrossError(true);
      setMonthlyBonusError(true);
      setStipenedError(false);
      if (
        workInfoViewData.contractType === "Permanent" &&
        fixedGross <= 18000
      ) {
        setParmanentGrossLimit(true);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        workInfoViewData.contractType === "Permanent" &&
        fixedGross > 18000
      ) {
        console.log("inside permanent");
        setParmanentGrossLimit(false);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        workInfoViewData.contractType === "Parttime" &&
        (fixedGross <= 90 || fixedGross > 200)
      ) {
        setPartTimeGrossLimit(true);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      } else if (
        workInfoViewData.contractType === "Parttime" &&
        fixedGross <= 200
      ) {
        console.log("inside part time");
        setPartTimeGrossLimit(false);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      } else if (
        (workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus > 20
      ) {
        setBonusLimit(true);
        setMonthlyBonusError(false);
      } else if (
        (workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus < 20
      ) {
        setBonusLimit(false);
        setMonthlyBonusError(false);
      }
    } else if (
      workInfoViewData.contractType !== "Internship" &&
      (typeof fixedGross === "undefined" ||
        fixedGross === "" ||
        fixedGross.includes(" ", "-", ".", "/", "+") ||
        (workInfoViewData.contractType === "Permanent" && fixedGross < 18000) ||
        (workInfoViewData.contractType === "Parttime" &&
          (fixedGross < 90 || fixedGross > 200)))
    ) {
      alert("in manager");
      console.log("remuneration Info3", fixedGross, monthlyBonus, stipened);
      console.log(
        "workInfoViewData.contractType",
        workInfoViewData.contractType
      );
      setFixedGrossError(true);
      setStipenedError(false);
      if (
        workInfoViewData.contractType === "Permanent" &&
        fixedGross <= 18000
      ) {
        console.log("inside permanent");
        setParmanentGrossLimit(true);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        workInfoViewData.contractType === "Permanent" &&
        fixedGross > 18000
      ) {
        console.log("inside permanent");
        setParmanentGrossLimit(false);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        workInfoViewData.contractType === "Parttime" &&
        (fixedGross <= 90 || fixedGross > 200)
      ) {
        console.log("inside part time");
        setPartTimeGrossLimit(true);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      } else if (
        workInfoViewData.contractType === "Parttime" &&
        fixedGross <= 200
      ) {
        console.log("inside part time");
        setPartTimeGrossLimit(false);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      }
    } else if (
      user.role === "ADMIN" &&
      workInfoViewData.contractType !== "Internship" &&
      (typeof monthlyBonus === "undefined" ||
        monthlyBonus === "" ||
        monthlyBonus.includes(" ", "-", ".", "/", "+") ||
        (workInfoViewData.contractType === "Permanent" && monthlyBonus > 20) ||
        (workInfoViewData.contractType === "Parttime" && monthlyBonus > 20))
    ) {
      console.log("remuneration Info4", fixedGross, monthlyBonus, stipened);
      setMonthlyBonusError(true);
      setStipenedError(false);
      if (
        (workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus > 20
      ) {
        setBonusLimit(true);
        setMonthlyBonusError(false);
      } else if (
        (workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus < 20
      ) {
        setBonusLimit(false);
        setMonthlyBonusError(false);
      }
    } else {
      alert("secon else in manager");
      console.log("remuneration Info6", fixedGross, monthlyBonus, stipened);
      setStipenedError(false);
      setFixedGrossError(false);
      setMonthlyBonusError(false);
      setBonusLimit(false);
      setParmanentGrossLimit(false);
      setPartTimeGrossLimit(false);
      console.log("remuneration Info", fixedGross, monthlyBonus, stipened);
      console.log("remunerationViewData save", remunerationViewData);
      console.log("remunerationData", remunerationData);
      console.log("contracttype", workInfoViewData.contractType);
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
      } else if (
        (remunerationData || remunerationViewData) &&
        saveclick === true
      ) {
        console.log("second click");
        remunerationinfo = {
          candidateId: createCandidateResponse.candidateId,
          fixedGross: fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: remunerationData.remunerationId
            ? remunerationData.remunerationId
            : remunerationViewData.remunerationId,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      }

      console.log(
        "createCandidateResponse.candidateId",
        createCandidateResponse.candidateId
      );

      console.log("remuneration data", remunerationinfo);
      console.log(
        "validation check",
        fixedGrossError,
        monthlyBonusError,
        stipenedError,
        parmanentGrossLimit,
        partTimeGrossLimit,
        bonusLimit
      );
      if (
        fixedGrossError === false &&
        monthlyBonusError === false &&
        stipenedError === false &&
        parmanentGrossLimit === false &&
        partTimeGrossLimit === false &&
        bonusLimit === false
      ) {
        remunerationSave(remunerationinfo);
        viewCandidateId(createCandidateResponse.candidateId);
        remunerationView(createCandidateResponse.candidateId);
        setDisabled(true);
        setEditButton(true);
      }
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
            {workInfoViewData &&
            workInfoViewData.contractType === "Internship" ? (
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
            ) : (
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
                      <p style={{ color: "red" }}>
                        Please Enter the valid Input
                      </p>
                    ) : ((candidateData &&
                        candidateData.workInformation !== null &&
                        candidateData.workInformation !== undefined &&
                        candidateData.workInformation.contractType ===
                          "Parttime") ||
                        (workInfoViewData !== null &&
                          workInfoViewData !== undefined &&
                          workInfoViewData.contractType === "Parttime")) &&
                      (fixedGross < 90 || fixedGross > 200) ? (
                      <p style={{ color: "red" }}>
                        Value should be between 90 - 200{" "}
                      </p>
                    ) : ((candidateData &&
                        candidateData.workInformation &&
                        candidateData.workInformation !== null &&
                        candidateData.workInformation !== undefined &&
                        candidateData.workInformation.contractType ===
                          "Permanent") ||
                        (workInfoViewData !== null &&
                          workInfoViewData !== undefined &&
                          workInfoViewData.contractType === "Permanent")) &&
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
            )}

            {workInfoViewData &&
            workInfoViewData.contractType === "Internship" ? (
              ""
            ) : (
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
                              Please Enter the valid Input
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
                        Monthly Bonus ( % ){/* </Form.Label> */}
                        <Col sm={6}>
                          <Form.Control
                            className="form-input"
                            type="nummber"
                            name="monthlyBonus"
                            placeholder="0"
                            readOnly
                            disabled={disabled}
                          />
                          {/* {monthlyBonusError ? (
                            <p style={{ color: "red" }}>
                              Please Enter the valid Input
                            </p>
                          ) : (
                            ""
                          )} */}
                        </Col>
                      </Form.Group>
                    </Col>
                  )
                ) : (
                  ""
                )}
              </Fragment>
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
