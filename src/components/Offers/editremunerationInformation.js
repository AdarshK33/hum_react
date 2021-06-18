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
    remunerationData,
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

    let remunerationDataInfo =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;

    if (remunerationDataInfo !== null && remunerationDataInfo !== undefined) {
      setFixedGross(remunerationDataInfo.fixedGross);
      setMonthlyBonus(remunerationDataInfo.monthlyBonus);
      setStipened(remunerationDataInfo.stipend);
    }
  }, [candidateData]);

  const submitHandler = (e) => {
    console.log(saveclick);
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
      (typeof stipened === "undefined" ||
        stipened === "" ||
        stipened === "null" ||
        (stipened + "").includes(" ", "-", ".", "/", "+")) &&
      (candidateData.workInformation.contractType === "Internship" ||
        workInfoViewData.contractType === "Internship") &&
      stipened < "0"
    ) {
      console.log("remuneration Info5", fixedGross, monthlyBonus, stipened);
      setStipenedError(true);
    } else if (
      (console.log(".errorr........."),
      (user.role === "ADMIN" &&
        ((candidateData.workInformation !== null &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType !== "Internship") ||
          (workInfoViewData !== null &&
            workInfoViewData !== undefined &&
            workInfoViewData.contractType !== "Internship")) &&
        (typeof fixedGross === "undefined" ||
          fixedGross === "" ||
          stipened <= 0 ||
          (fixedGross + "").includes(" ", "-", ".", "/", "+"))) ||
        ((candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
          fixedGross < 18000) ||
        ((candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
          (fixedGross < 90 || fixedGross > 200) &&
          (typeof monthlyBonus === "undefined" ||
            monthlyBonus === "" ||
            (monthlyBonus + "").includes(" ", "-", ".", "/", "+") ||
            ((candidateData.workInformation.contractType === "Permanent" ||
              workInfoViewData.contractType === "Permanent") &&
              monthlyBonus > 20) ||
            ((candidateData.workInformation.contractType === "Parttime" ||
              workInfoViewData.contractType === "Parttime") &&
              monthlyBonus > 20))))
    ) {
      setFixedGrossError(true);
      setMonthlyBonusError(true);
      setStipenedError(false);
      console.log("edit remunation info 2");
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
        remunerationinfo = {
          candidateId: candidateData.candidateInformation.candidateId,
          fixedGross:
            fixedGross === undefined || fixedGross === null ? 0 : fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: remunerationViewData
            ? remunerationViewData.remunerationId
            : 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };

        setParmanentGrossLimit(false);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
        if (remunerationinfo.monthlyBonus > 0) {
          setMonthlyBonusError(false);

          remunerationUpdate(remunerationinfo);
          viewCandidateId(candidateData.candidateInformation.candidateId);
          remunerationView(candidateData.candidateInformation.candidateId);
          setDisabled(true);
          setEditButton(true);
        } else {
          setMonthlyBonusError(true);
        }
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
        remunerationinfo = {
          candidateId: candidateData.candidateInformation.candidateId,
          fixedGross:
            fixedGross === undefined || fixedGross === null ? 0 : fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: remunerationViewData
            ? remunerationViewData.remunerationId
            : 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
        console.log("remunearion inside ....", remunerationinfo);
        setParmanentGrossLimit(false);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
        if (remunerationinfo.monthlyBonus > 0) {
          setMonthlyBonusError(false);

          remunerationUpdate(remunerationinfo);

          viewCandidateId(candidateData.candidateInformation.candidateId);
          remunerationView(candidateData.candidateInformation.candidateId);
          setDisabled(true);
          setEditButton(true);
        } else {
          setMonthlyBonusError(true);
        }
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
      (candidateData.workInformation.contractType !== "Internship" ||
        workInfoViewData.contractType !== "Internship") &&
      (typeof fixedGross === "undefined" ||
        fixedGross === "" ||
        fixedGross.includes(" ", "-", ".", "/", "+") ||
        ((candidateData.workInformation.contractType === "Permanent" ||
          workInfoViewData.contractType === "Permanent") &&
          fixedGross < 18000) ||
        ((candidateData.workInformation.contractType === "Parttime" ||
          workInfoViewData.contractType === "Parttime") &&
          (fixedGross < 90 || fixedGross > 200)))
    ) {
      console.log("remuneration Info3", fixedGross, monthlyBonus, stipened);
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
      (candidateData.workInformation.contractType !== "Internship" ||
        workInfoViewData.contractType !== "Internship") &&
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
      console.log("remuneration Info4", fixedGross, monthlyBonus, stipened);
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
    } else {
      console.log("remuneration Info7", fixedGross, monthlyBonus, stipened);
      setStipenedError(false);
      setFixedGrossError(false);
      setMonthlyBonusError(false);
      setBonusLimit(false);
      setParmanentGrossLimit(false);
      setPartTimeGrossLimit(false);
      console.log(
        "remuneration Info",
        fixedGross,
        monthlyBonus,
        remunerationSubmitData,
        remunerationViewData
      );
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
          remunerationId: remunerationViewData
            ? remunerationViewData.remunerationId
            : 0,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      } else if (
        (candidateData.remuneration ||
          remunerationData ||
          remunerationViewData) &&
        saveclick === true
      ) {
        remunerationinfo = {
          candidateId: candidateData.candidateInformation.candidateId,
          fixedGross: fixedGross,
          monthlyBonus:
            monthlyBonus === undefined || monthlyBonus === null
              ? 0
              : monthlyBonus,
          remunerationId: remunerationViewData
            ? remunerationViewData.remunerationId
            : remunerationData.remunerationId,
          stipend: stipened === undefined || stipened === null ? 0 : stipened,
        };
      }
      // console.log(
      //   "remunerationViewData.remunerationId",
      //   remunerationViewData.remunerationId
      // );

      console.log("createCandidateResponse data", remunerationinfo);

      console.log(
        "validation check",
        fixedGrossError,
        monthlyBonusError,
        stipenedError,
        partTimeGrossLimit,
        parmanentGrossLimit,
        bonusLimit
      );
      if (
        fixedGrossError === false &&
        monthlyBonusError === false &&
        stipenedError === false &&
        parmanentGrossLimit === false &&
        partTimeGrossLimit === false &&
        bonusLimit === false
        // saveclick === false
      ) {
        remunerationUpdate(remunerationinfo);
        viewCandidateId(candidateData.candidateInformation.candidateId);
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
    console.log(monthlyBonusError),
    (
      <Fragment>
        <Form>
          <Row>
            <Fragment>
              {(candidateData &&
                candidateData.workInformation !== undefined &&
                candidateData.workInformation !== null &&
                candidateData.workInformation.contractType !== null &&
                candidateData.workInformation.contractType !== undefined &&
                candidateData.workInformation.contractType !== "Internship") ||
              (workInfoViewData !== null &&
                workInfoViewData !== undefined &&
                workInfoViewData.contractType !== "Internship") ? (
                <Col sm={6}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    {/* <Col sm={2}></Col> */}
                    <Form.Label column sm={3}>
                      Fixed Gross{" "}
                      {(candidateData &&
                        candidateData.workInformation !== null &&
                        candidateData.workInformation !== undefined &&
                        candidateData.workInformation.contractType ===
                          "Parttime") ||
                      (workInfoViewData !== null &&
                        workInfoViewData !== undefined &&
                        workInfoViewData.contractType === "Parttime")
                        ? "(Hourly)"
                        : (candidateData &&
                            candidateData.workInformation &&
                            candidateData.workInformation !== null &&
                            candidateData.workInformation !== undefined &&
                            candidateData.workInformation.contractType ===
                              "Permanent") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Permanent")
                        ? ""
                        : ""}
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        className="form-input"
                        type="number"
                        min="0"
                        name="fixedGross"
                        value={fixedGross}
                        onChange={(event) => setFixedGross(event.target.value)}
                        required
                        placeholder="1000"
                        disabled={disabled}
                      />
                      {fixedGrossError ? (
                        <p style={{ color: "red" }}>
                          This field cannot be empty
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
                      ) : ((candidateData !== null &&
                          candidateData !== undefined &&
                          candidateData.workInformation !== null &&
                          candidateData.workInformation !== undefined &&
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
                    <Form.Label column sm={3}>
                      Stipend
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        className="form-input"
                        type="number"
                        min="0"
                        name="stipend"
                        placeholder="1000"
                        value={stipened}
                        onChange={(event) => setStipened(event.target.value)}
                        required
                        disabled={disabled}
                      />
                      {stipenedError ? (
                        <p style={{ color: "red" }}>
                          This field cannot be empty
                        </p>
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
                            <Form.Control
                              className="form-input"
                              type="number"
                              min="0"
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
                            {/* {monthlyBonusError ? (
                              <p style={{ color: "red" }}>
                                This field cannot be empty
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
    )
  );
};

export default EditRemunerationInformation;
