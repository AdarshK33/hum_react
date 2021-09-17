import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";

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
  const [localExpatGrossLimit, setLocalExpatGrossLimit] = useState(false);
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
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);

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
      // viewCandidateId(candidateData.candidateInformation.candidateId);
      setViewApiCall(true);
      workInfoView(candidateData.candidateInformation.candidateId);
    } else {
      setViewApiCall(false);
    }
    let remunerationDataInfo =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;

    if (
      getBonusByContractType !== null &&
      getBonusByContractType !== undefined
    ) {
      setMonthlyBonus(getBonusByContractType.bonus);
    }
    if (remunerationDataInfo !== null && remunerationDataInfo !== undefined) {
      setFixedGross(remunerationDataInfo.fixedGross);
      setMonthlyBonus(remunerationDataInfo.monthlyBonus);
      setStipened(remunerationDataInfo.stipend);
    }
  }, [candidateData, getBonusByContractType]);
  useEffect(() => {
    console.log("candidateData remuneration1", createCandidateResponse);

    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.workInformation !== null &&
      candidateData.workInformation !== undefined
    ) {
      viewBonusByContarctType(
        candidateData.workInformation.contractType,
        candidateData.workInformation.department,
        candidateData.workInformation.position
      );
      // setFixedGross(candidateData.remuneration.fixedGross);
      // setStipened(candidateData.remuneration.stipend);
    }
    console.log("candidateData remuneration2", candidateData);

    // if (
    //   getBonusByContractType !== null &&
    //   getBonusByContractType !== undefined
    // ) {
    //   setMonthlyBonus(getBonusByContractType.bonus);
    // }
  }, [candidateData.workInformation, getBonusByContractType]);

  useEffect(() => {
    console.log("candidateData getBonusByContractType", getBonusByContractType);
    if (
      getBonusByContractType !== null &&
      getBonusByContractType !== undefined
    ) {
      setMonthlyBonus(getBonusByContractType.bonus);
    }
  }, [getBonusByContractType]);

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
      // viewCandidateId(candidateData.candidateInformation.candidateId);
      setViewApiCall(true);
      workInfoView(candidateData.candidateInformation.candidateId);
    } else {
      setViewApiCall(false);
    }
    let remunerationDataInfo =
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration;

    if (
      getBonusByContractType !== null &&
      getBonusByContractType !== undefined
    ) {
      setMonthlyBonus(getBonusByContractType.bonus);
    }
    if (remunerationDataInfo !== null && remunerationDataInfo !== undefined) {
      setFixedGross(remunerationDataInfo.fixedGross);
      setMonthlyBonus(remunerationDataInfo.monthlyBonus);
      setStipened(remunerationDataInfo.stipend);
    }
  }, [candidateData]);
  useEffect(() => {
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      candidateData.remuneration !== null &&
      candidateData.remuneration !== undefined &&
      Object.keys(candidateData.remuneration).length !== 0
    ) {
      setFixedGross(candidateData.remuneration.fixedGross);
      setStipened(candidateData.remuneration.stipend);
    }
    console.log("candidateData remuneration2", candidateData);
  }, [candidateData.remuneration]);

  const submitHandler = (e) => {
    console.log(saveclick);
    console.log("inside edit submit", candidateData);
    let remunerationinfo;
    let stipenedErrorCheck = false;
    let parmanentGrossLimitCheck = false;
    let fixedGrossErrorCheck = false;
    let partTimeGrossLimitCheck = false;
    let localExpatGrossLimitCheck = false;
    e.preventDefault();
    console.log(
      "remuneration Info1",
      fixedGross,
      monthlyBonus,
      stipened,
      user.role
    );
    if (
      candidateData !== null &&
      candidateData !== undefined &&
      Object.keys(candidateData).length !== 0
    ) {
      if (
        (candidateData.workInformation !== null &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType === "Internship") ||
        (workInfoViewData !== null &&
          workInfoViewData !== undefined &&
          workInfoViewData.contractType === "Internship")
      ) {
        if (stipened == undefined || stipened == "" || stipened == null) {
          setStipenedError(true);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = true;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        } else {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        }
        console.log("inside internship", fixedGross, stipened);
      }
      if (
        (candidateData.workInformation !== null &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType === "Permanent") ||
        (workInfoViewData !== null &&
          workInfoViewData !== undefined &&
          workInfoViewData.contractType === "Permanent")
      ) {
        if (
          fixedGross !== null &&
          fixedGross !== undefined &&
          fixedGross !== 0 &&
          fixedGross > 18000
        ) {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        } else if (
          fixedGross !== null &&
          fixedGross !== undefined &&
          fixedGross !== 0 &&
          fixedGross < 18000
        ) {
          setStipenedError(false);
          setParmanentGrossLimit(true);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = true;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        } else {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(true);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = true;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        }
        console.log("inside Permanent", fixedGross, stipened);
      }

      if (
        (candidateData.workInformation !== null &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType === "Parttime") ||
        (workInfoViewData !== null &&
          workInfoViewData !== undefined &&
          workInfoViewData.contractType === "Parttime")
      ) {
        if (
          fixedGross !== null &&
          fixedGross !== undefined &&
          fixedGross !== 0 &&
          fixedGross > 90 &&
          fixedGross < 400
        ) {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        } else if (
          (fixedGross !== null &&
            fixedGross !== undefined &&
            fixedGross !== 0 &&
            fixedGross < 90) ||
          fixedGross > 400
        ) {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(true);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = true;
          localExpatGrossLimitCheck = false;
        } else {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(true);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = true;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        }
        console.log("inside Parttime", fixedGross, stipened);
      }

      if (
        (candidateData.workInformation !== null &&
          candidateData.workInformation !== undefined &&
          candidateData.workInformation.contractType === "Local Expat") ||
        (workInfoViewData !== null &&
          workInfoViewData !== undefined &&
          workInfoViewData.contractType === "Local Expat")
      ) {
        if (
          fixedGross !== null &&
          fixedGross !== undefined &&
          fixedGross !== 0 &&
          fixedGross > 25000
        ) {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        } else if (
          fixedGross !== null &&
          fixedGross !== undefined &&
          fixedGross !== 0 &&
          fixedGross < 25000
        ) {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(true);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = false;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = true;
        } else {
          setStipenedError(false);
          setParmanentGrossLimit(false);
          setFixedGrossError(true);
          setPartTimeGrossLimit(false);
          stipenedErrorCheck = false;
          parmanentGrossLimitCheck = false;
          fixedGrossErrorCheck = true;
          partTimeGrossLimitCheck = false;
          localExpatGrossLimitCheck = false;
        }
        console.log("inside Permanent", fixedGross, stipened);
      }
      if (
        stipenedErrorCheck === false &&
        parmanentGrossLimitCheck === false &&
        fixedGrossErrorCheck === false &&
        partTimeGrossLimitCheck === false
        // saveclick === false
      ) {
        if (
          candidateData.remuneration == null ||
          candidateData.remuneration == undefined ||
          Object.keys(candidateData.remuneration).length === 0 ||
          ((remunerationViewData == null ||
            remunerationViewData == undefined ||
            Object.keys(remunerationViewData).length === 0) &&
            saveclick === false)
        ) {
          console.log("first click");
          setSaveclick(true);
          remunerationinfo = {
            candidateId: candidateData.candidateInformation.candidateId,
            fixedGross:
              fixedGross === undefined || fixedGross === null ? 0 : fixedGross,
            monthlyBonus:
              getBonusByContractType === undefined ||
              getBonusByContractType === null
                ? 0
                : getBonusByContractType.bonus,
            remunerationId: remunerationViewData
              ? remunerationViewData.remunerationId
              : 0,
            stipend: stipened === undefined || stipened === null ? 0 : stipened,
          };
        } else if (
          ((candidateData.remuneration !== null &&
            candidateData.remuneration !== undefined &&
            Object.keys(candidateData.remuneration).length !== 0) ||
            (remunerationViewData !== null &&
              remunerationViewData !== undefined &&
              Object.keys(remunerationViewData).length !== 0)) &&
          saveclick === true
        ) {
          remunerationinfo = {
            candidateId: candidateData.candidateInformation.candidateId,
            fixedGross: fixedGross,
            monthlyBonus:
              getBonusByContractType === undefined ||
              getBonusByContractType === null
                ? 0
                : getBonusByContractType.bonus,
            remunerationId: remunerationViewData
              ? remunerationViewData.remunerationId
              : remunerationData.remunerationId,
            stipend: stipened === undefined || stipened === null ? 0 : stipened,
          };
        }

        console.log(
          "validation check",
          fixedGrossError,
          stipenedError,
          partTimeGrossLimit,
          parmanentGrossLimit,
          remunerationinfo
        );

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
                        : (candidateData &&
                            candidateData.workInformation &&
                            candidateData.workInformation !== null &&
                            candidateData.workInformation !== undefined &&
                            candidateData.workInformation.contractType ===
                              "Local Expat") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Local Expat")
                        ? "($)"
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
                        placeholder="100"
                        disabled={disabled}
                      />
                      {fixedGrossError ? (
                        <p style={{ color: "red" }}>
                          This field cannot be empty
                        </p>
                      ) : partTimeGrossLimit ||
                        (((candidateData &&
                          candidateData.workInformation !== null &&
                          candidateData.workInformation !== undefined &&
                          candidateData.workInformation.contractType ===
                            "Parttime") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Parttime")) &&
                          (fixedGross < 90 || fixedGross > 400)) ? (
                        <p style={{ color: "red" }}>
                          Value should be between 90 - 400{" "}
                        </p>
                      ) : parmanentGrossLimit ||
                        (((candidateData &&
                          candidateData.workInformation &&
                          candidateData.workInformation !== null &&
                          candidateData.workInformation !== undefined &&
                          candidateData.workInformation.contractType ===
                            "Permanent") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Permanent")) &&
                          fixedGross < 18000) ? (
                        <p style={{ color: "red" }}>
                          Value should be greater than 18000{" "}
                        </p>
                      ) : (candidateData &&
                          candidateData.workInformation &&
                          candidateData.workInformation !== null &&
                          candidateData.workInformation !== undefined &&
                          candidateData.workInformation.contractType ===
                            "Local Expat") ||
                        (workInfoViewData !== null &&
                          workInfoViewData !== undefined &&
                          workInfoViewData.contractType === "Local Expat" &&
                          fixedGross < 25000) ? (
                        <p style={{ color: "red" }}>
                          Value should be greater than 25000{" "}
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
                Object.keys(candidateData.workInformation).length !== 0 &&
                candidateData.workInformation.contractType !== "Internship") ||
              (workInfoViewData &&
                Object.keys(workInfoViewData).length !== 0 &&
                workInfoViewData.contractType !== "Internship") ? (
                <Fragment>
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
                          readOnly
                        />
                        {/* {monthlyBonusError ? (
                              <p style={{ color: "red" }}>
                                This field cannot be empty
                              </p>
                            ) : monthlyBonus > 20 ? (
                              <p style={{ color: "red" }}>Maximum Bonus 20 %</p>
                            ) : (
                              ""
                            )} */}
                      </Col>
                    </Form.Group>
                  </Col>
                </Fragment>
              ) : (
                ""
              )}
            </Fragment>
          </Row>

          <Row>
            <Col sm={5}></Col>
            <Col sm={2}>
              <Button onClick={submitHandler} disabled={disabled}>
                Save
              </Button>
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
