import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { ToastContainer, toast } from "react-toastify";
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
  const [internshipGrossLimit, setInternshipGrossLimit] = useState(false);
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

    // if (
    //   getBonusByContractType !== null &&
    //   getBonusByContractType !== undefined
    // ) {
    //   setMonthlyBonus(getBonusByContractType.bonus);
    // }
    if (remunerationDataInfo !== null && remunerationDataInfo !== undefined) {
      setFixedGross(remunerationDataInfo.fixedGross);
      setMonthlyBonus(remunerationDataInfo.monthlyBonus);
      setStipened(remunerationDataInfo.stipend);
    }
  }, [candidateData]);
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
  }, [candidateData.workInformation, getBonusByContractType]);

  useEffect(() => {
    console.log("candidateData getBonusByContractType", getBonusByContractType);
    if (
      getBonusByContractType !== null &&
      getBonusByContractType !== undefined &&
      getBonusByContractType !== "" &&
      Object.keys(getBonusByContractType).length !== 0
    ) {
      setMonthlyBonus(getBonusByContractType.bonus);
    } else {
      setMonthlyBonus(0);
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
  }, [candidateData]);
  // useEffect(() => {
  //   if (
  //     candidateData !== null &&
  //     candidateData !== undefined &&
  //     candidateData.remuneration !== null &&
  //     candidateData.remuneration !== undefined &&
  //     Object.keys(candidateData.remuneration).length !== 0
  //   ) {
  //     setFixedGross(candidateData.remuneration.fixedGross);
  //     setStipened(candidateData.remuneration.stipend);
  //   }
  //   console.log("candidateData remuneration2", candidateData);
  // }, [candidateData.remuneration]);

  const changeHandler = (e) => {
    console.log("changeHandler", e);
    console.log("contracttype", workInfoViewData.contractType);
    if (
      (candidateData !== null &&
        candidateData !== undefined &&
        Object.keys(candidateData).length !== 0 &&
        candidateData.workInformation !== null &&
        candidateData.workInformation !== undefined &&
        Object.keys(candidateData.workInformation).length !== 0 &&
        candidateData.workInformation.contractType === "Internship") ||
      (workInfoViewData !== null &&
        workInfoViewData !== undefined &&
        Object.keys(workInfoViewData).length !== 0 &&
        workInfoViewData.contractType === "Internship")
    ) {
      if (
        typeof e === "undefined" ||
        e === "" ||
        (e + "").includes(" ", "-", ".", "/", "+")
      ) {
        console.log("inside intern if", e);
        setStipened(e);
        setStipenedError(true);
        setFixedGross(0);
        setFixedGrossError(false);
        setInternshipGrossLimit(false);
        setParmanentGrossLimit(false);
        setPartTimeGrossLimit(false);
        setLocalExpatGrossLimit(false);
      } else {
        if (
          workInfoViewData.contractType === "Internship" &&
          workInfoViewData.nationality !== "Indian"
        ) {
          if (stipened < 7500) {
            setStipened(e);
            setStipenedError(false);
            setInternshipGrossLimit(true);
            setFixedGross(0);
            setFixedGrossError(false);
            setParmanentGrossLimit(false);
            setPartTimeGrossLimit(false);
            setLocalExpatGrossLimit(false);
          } else {
            setStipened(e);
            setStipenedError(false);
            setFixedGross(0);
            setFixedGrossError(false);
            setParmanentGrossLimit(false);
            setPartTimeGrossLimit(false);
            setLocalExpatGrossLimit(false);
            setInternshipGrossLimit(false);
          }
        } else {
          setStipened(e);
          setStipenedError(false);
          setFixedGross(0);
          setFixedGrossError(false);
          setParmanentGrossLimit(false);
          setPartTimeGrossLimit(false);
          setLocalExpatGrossLimit(false);
        }
      }
    }

    if (
      (candidateData !== null &&
        candidateData !== undefined &&
        Object.keys(candidateData).length !== 0 &&
        candidateData.workInformation !== null &&
        candidateData.workInformation !== undefined &&
        Object.keys(candidateData.workInformation).length !== 0 &&
        candidateData.workInformation.contractType === "Fulltime") ||
      (workInfoViewData !== null &&
        workInfoViewData !== undefined &&
        Object.keys(workInfoViewData).length !== 0 &&
        workInfoViewData.contractType === "Fulltime")
    ) {
      console.log("inside Fulltime", e);
      if (
        typeof e === "undefined" ||
        e === "" ||
        e.includes(" ", "-", ".", "/", "+")
      ) {
        console.log("inside Fulltime1", e);
        setFixedGross(e);
        setFixedGrossError(true);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
        setLocalExpatGrossLimit(false);
      } else if (e < 18000) {
        console.log("inside Fulltime2", e);
        setFixedGross(e);
        setFixedGrossError(false);
        setParmanentGrossLimit(true);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
        setLocalExpatGrossLimit(false);
      } else {
        console.log("inside Fulltime3", e);
        setFixedGross(e);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
        setLocalExpatGrossLimit(false);
      }
    }

    if (
      (candidateData !== null &&
        candidateData !== undefined &&
        Object.keys(candidateData).length !== 0 &&
        candidateData.workInformation !== null &&
        candidateData.workInformation !== undefined &&
        Object.keys(candidateData.workInformation).length !== 0 &&
        candidateData.workInformation.contractType === "Parttime") ||
      (workInfoViewData !== null &&
        workInfoViewData !== undefined &&
        Object.keys(workInfoViewData).length !== 0 &&
        workInfoViewData.contractType === "Parttime")
    ) {
      if (
        typeof e === "undefined" ||
        e === "" ||
        e.includes(" ", "-", ".", "/", "+")
      ) {
        console.log("inside part time1", e);
        setFixedGross(e);
        setFixedGrossError(true);
        setPartTimeGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setLocalExpatGrossLimit(false);
      } else if (e < 90 || e > 400) {
        console.log("inside part time2", e);
        setFixedGross(e);
        setFixedGrossError(false);
        setPartTimeGrossLimit(true);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setLocalExpatGrossLimit(false);
      } else {
        console.log("inside part time3", e);
        setFixedGross(e);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setLocalExpatGrossLimit(false);
      }
    }

    if (
      (candidateData !== null &&
        candidateData !== undefined &&
        Object.keys(candidateData).length !== 0 &&
        candidateData.workInformation !== null &&
        candidateData.workInformation !== undefined &&
        Object.keys(candidateData.workInformation).length !== 0 &&
        candidateData.workInformation.contractType === "Local Expat") ||
      (workInfoViewData !== null &&
        workInfoViewData !== undefined &&
        Object.keys(workInfoViewData).length !== 0 &&
        workInfoViewData.contractType === "Local Expat")
    ) {
      if (
        typeof e === "undefined" ||
        e === "" ||
        e.includes(" ", "-", ".", "/", "+")
      ) {
        console.log("inside local expat1", e);
        setFixedGross(e);
        setFixedGrossError(true);
        setLocalExpatGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
      } else if (e < 25000) {
        console.log("inside local expat2", e);
        setFixedGross(e);
        setFixedGrossError(false);
        setLocalExpatGrossLimit(true);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
      } else {
        console.log("inside local expat3", e);
        setFixedGross(e);
        setFixedGrossError(false);
        setLocalExpatGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
      }
    }
  };

  const submitHandler = (e) => {
    console.log(saveclick);
    console.log("inside edit submit", candidateData);
    let remunerationinfo;
    let fixedGrossEmpty = false;
    let stipendEmpty = false;
    e.preventDefault();
    console.log(
      "remuneration Info1",
      fixedGross,
      monthlyBonus,
      stipened,
      user.role,
      remunerationData,
      remunerationViewData,
      saveclick
    );
    console.log(
      "submit error check",
      fixedGrossError,
      stipenedError,
      parmanentGrossLimit,
      partTimeGrossLimit,
      localExpatGrossLimit,
      fixedGrossEmpty,
      stipendEmpty
    );

    if (
      workInfoViewData !== null &&
      workInfoViewData !== undefined &&
      Object.keys(workInfoViewData).length !== 0 &&
      workInfoViewData.contractType !== "Internship"
    ) {
      if (fixedGross === undefined || fixedGross === null || fixedGross === 0) {
        fixedGrossEmpty = true;
        toast.error("Please Enter the valid FixedGross");
      } else {
        fixedGrossEmpty = false;
      }
    }

    if (
      workInfoViewData !== null &&
      workInfoViewData !== undefined &&
      Object.keys(workInfoViewData).length !== 0 &&
      workInfoViewData.contractType === "Internship"
    ) {
      if (stipened === undefined || stipened === null || stipened === 0) {
        stipendEmpty = true;
        toast.error("Please Enter the valid Stipend");
      } else {
        if (
          workInfoViewData !== null &&
          workInfoViewData !== undefined &&
          Object.keys(workInfoViewData).length !== 0 &&
          workInfoViewData.contractType === "Internship" &&
          workInfoViewData.nationality !== "Indian"
        ) {
          if (stipened < 75000) {
            stipendEmpty = true;
            toast.error("Please Enter the valid Stipend");
          } else {
            stipendEmpty = false;
          }
        }
      }
    }

    if (
      fixedGrossEmpty === false &&
      stipendEmpty === false &&
      fixedGrossError === false &&
      stipenedError === false &&
      parmanentGrossLimit === false &&
      partTimeGrossLimit === false &&
      localExpatGrossLimit === false
    ) {
      if (
        (candidateData.candidateInformation !== null ||
          candidateData.candidateInformation !== undefined ||
          Object.keys(candidateData.candidateInformation).length !== 0) &&
        saveclick === false
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
        console.log("second click");
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
  };

  const editHandler = () => {
    console.log("view cadidate id ", createCandidateResponse.candidateId);
    setDisabled(false);
    console.log("remunerationViewData", remunerationViewData);
  };
  console.log(fixedGross, "check fixedGross");
  return (
    console.log(monthlyBonusError),
    (
      <Fragment>
        <ToastContainer />
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
                              "Fulltime") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Fulltime")
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
                        onChange={(event) => changeHandler(event.target.value)}
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
                            "Fulltime") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Fulltime")) &&
                          fixedGross < 18000) ? (
                        <p style={{ color: "red" }}>
                          Value should be greater than 18000{" "}
                        </p>
                      ) : ((candidateData &&
                          candidateData.workInformation &&
                          candidateData.workInformation !== null &&
                          candidateData.workInformation !== undefined &&
                          candidateData.workInformation.contractType ===
                            "Local Expat") ||
                          (workInfoViewData !== null &&
                            workInfoViewData !== undefined &&
                            workInfoViewData.contractType === "Local Expat")) &&
                        fixedGross < 25000 ? (
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
                        onChange={(event) => changeHandler(event.target.value)}
                        required
                        disabled={disabled}
                      />
                      {stipenedError ? (
                        <p style={{ color: "red" }}>
                          This field cannot be empty
                        </p>
                      ) : internshipGrossLimit ? (
                        <p style={{ color: "red" }}>
                          Stipend should be above 75000
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
