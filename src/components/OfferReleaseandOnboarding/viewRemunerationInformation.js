import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";
import "../Offers/offers.css";
import "./offerReleaseandOnboarding.css";

const ViewRemunerationInformation = (props) => {
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
  const [parmanentGrossLimit, setParmanentGrossLimit] = useState(false);
  const [partTimeGrossLimit, setPartTimeGrossLimit] = useState(false);
  const [bonusLimit, setBonusLimit] = useState(false);

  const {
    remunerationUpdate,
    createCandidateResponse,
    candidateData,
    remunerationView,
    remunerationViewData,
    viewCandidateId,
    workInfoView,
    workInfoViewData,
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
      candidateData.candidateInformation &&
      viewApiCall === false
    ) {
      viewCandidateId(candidateData.candidateInformation.candidateId);
      setViewApiCall(true);
      workInfoView(candidateData.candidateInformation.candidateId);
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
      setStipened(remunerationData.stipend);
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
      user.role,
      typeof stipened,
      typeof fixedGross,
      typeof monthlyBonus
    );
    if (
      user.role === "ADMIN" &&
      (typeof fixedGross === "undefined" ||
        fixedGross === "" ||
        (fixedGross + "").includes(" ", "-", ".", "/", "+") ||
        ((candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
          fixedGross < 18000) ||
        ((candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
          (fixedGross < 90 || fixedGross > 200))) &&
      (typeof monthlyBonus === "undefined" ||
        monthlyBonus === "" ||
        (monthlyBonus + "").includes(" ", "-", ".", "/", "+") ||
        ((candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
          monthlyBonus > 20) ||
        ((candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
          monthlyBonus > 20))
    ) {
      setFixedGrossError(true);
      setMonthlyBonusError(true);
      setStipenedError(false);
      if (
        (candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
        fixedGross <= 18000
      ) {
        setParmanentGrossLimit(true);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
        fixedGross > 18000
      ) {
        console.log("inside permanent");
        setParmanentGrossLimit(false);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
        (fixedGross <= 90 || fixedGross > 200)
      ) {
        setPartTimeGrossLimit(true);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
        fixedGross <= 200
      ) {
        console.log("inside part time");
        setPartTimeGrossLimit(false);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus > 20
      ) {
        setBonusLimit(true);
        setMonthlyBonusError(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus < 20
      ) {
        setBonusLimit(false);
        setMonthlyBonusError(false);
      }
    } else if (
      typeof fixedGross === "undefined" ||
      fixedGross === "" ||
      fixedGross.includes(" ", "-", ".", "/", "+") ||
      ((candidateData.workInformation.contractType === "Permanent" ||
        workInfoViewData.contractType === "Permanent") &&
        fixedGross < 18000) ||
      ((candidateData.workInformation.contractType === "Parttime" ||
        workInfoViewData.contractType === "Parttime") &&
        (fixedGross < 90 || fixedGross > 200))
    ) {
      setFixedGrossError(true);
      setStipenedError(false);
      if (
        (candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
        fixedGross <= 18000
      ) {
        console.log("inside permanent");
        setParmanentGrossLimit(true);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
        fixedGross > 18000
      ) {
        console.log("inside permanent");
        setParmanentGrossLimit(false);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
        (fixedGross <= 90 || fixedGross > 200)
      ) {
        console.log("inside part time");
        setPartTimeGrossLimit(true);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
        fixedGross <= 200
      ) {
        console.log("inside part time");
        setPartTimeGrossLimit(false);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
      }
    } else if (
      user.role === "ADMIN" &&
      (typeof monthlyBonus === "undefined" ||
        monthlyBonus === "" ||
        (monthlyBonus + "").includes(" ", "-", ".", "/", "+") ||
        ((candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
          monthlyBonus > 20) ||
        ((candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
          monthlyBonus > 20))
    ) {
      setMonthlyBonusError(true);
      setStipenedError(false);
      if (
        (candidateData.workInformation.contractType === "Parttime" ||
          candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus > 20
      ) {
        setBonusLimit(true);
        setMonthlyBonusError(false);
      } else if (
        (candidateData.workInformation.contractType === "Parttime" ||
          candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Parttime" ||
          workInfoViewData.contractType === "Permanent") &&
        monthlyBonus < 20
      ) {
        setBonusLimit(false);
        setMonthlyBonusError(false);
      }
    } else if (
      (typeof stipened === "undefined" ||
        stipened === "" ||
        (stipened + "").includes(" ", "-", ".", "/", "+")) &&
      (candidateData.workInformation.contractType === "Internship" ||
        workInfoViewData.contractType === "Internship")
    ) {
      console.log("remuneration Info5", fixedGross, monthlyBonus, stipened);
      setStipenedError(true);
    } else {
      setStipenedError(false);
      setFixedGrossError(false);
      setMonthlyBonusError(false);
      setBonusLimit(false);
      setParmanentGrossLimit(false);
      setPartTimeGrossLimit(false);
      console.log("remuneration Info", fixedGross, monthlyBonus);
      if (saveclick === false) {
        console.log("first click");
        setSaveclick(true);
        remunerationinfo = {
          candidateId: candidateData.candidateInformation.candidateId,
          fixedGross:
            fixedGross === undefined || fixedGross === null ? 0 : fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: remunerationSubmitData
            ? remunerationSubmitData.remunerationId
            : 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      } else if (candidateData.remuneration && saveclick === true) {
        remunerationinfo = {
          candidateId: candidateData.candidateInformation.candidateId,
          fixedGross: fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: remunerationSubmitData.remunerationId
            ? remunerationSubmitData.remunerationId
            : 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      }
      // console.log(
      //   "remunerationViewData.remunerationId",
      //   remunerationViewData.remunerationId
      // );

      console.log("createCandidateResponse data", remunerationinfo);
      if (
        fixedGrossError === false &&
        monthlyBonusError === false &&
        stipenedError === false &&
        parmanentGrossLimit === false &&
        partTimeGrossLimit === false &&
        bonusLimit === false
      ) {
        remunerationUpdate(remunerationinfo);
        remunerationView(candidateData.candidateInformation.candidateId);
        setDisabled(true);
        setEditButton(true);
      }
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
            {(candidateData &&
              candidateData.workInformation &&
              candidateData.workInformation.contractType !== "Internship") ||
            workInfoViewData.contractType !== "Internship" ? (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  {/* <Col sm={2}></Col> */}
                  <h5>Fixed Gross</h5>
                  <Col sm={6}>
                    <h5 className="headingColor">
                      {candidateData.remuneration !== null &&
                      candidateData.candidateData !== undefined
                        ? fixedGross
                        : "N/A"}
                    </h5>

                    {fixedGrossError ? (
                      <p style={{ color: "red" }}>This field cannot be empty</p>
                    ) : ((candidateData &&
                        candidateData.workInformation &&
                        candidateData.workInformation.contractType ===
                          "Parttime") ||
                        workInfoViewData.contractType === "Parttime") &&
                      (fixedGross < 90 || fixedGross > 200) ? (
                      <p style={{ color: "red" }}>
                        Value should be between 90 - 200{" "}
                      </p>
                    ) : ((candidateData &&
                        candidateData.workInformation &&
                        candidateData.workInformation.contractType ===
                          "Permanent") ||
                        workInfoViewData.contractType === "Permanent") &&
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
                  <h5 column sm={3}>
                    Stipend
                  </h5>
                  <Col sm={6}>
                    {stipened}

                    {stipenedError ? (
                      <p style={{ color: "red" }}>This field cannot be empty</p>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
            )}

            {(candidateData &&
              candidateData.workInformation &&
              candidateData.workInformation.contractType !== "Internship") ||
            (workInfoViewData &&
              workInfoViewData.contractType !== "Internship") ? (
              <Fragment>
                {user ? (
                  user.role === "ADMIN" ? (
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="formHorizontalEmail">
                        {/* <Form.Label column sm={3}> */}
                        Monthly Bonus ( % ){/* </Form.Label> */}
                        <Col sm={6}>
                          <h5 className="headingColor">
                            {candidateData.remuneration !== null &&
                            candidateData.remuneration !== undefined
                              ? monthlyBonus
                              : "N/A"}
                          </h5>

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
                        Monthly Bonus ( % ){/* </Form.Label> */}
                        <Col sm={6}>
                          <Form.Control
                            className="form-input"
                            type="number"
                            min="0"
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
      </Form>
    </Fragment>
  );
};

export default ViewRemunerationInformation;
