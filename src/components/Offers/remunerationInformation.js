import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./offers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from "../../context/OfferState";
import { AppContext } from "../../context/AppState";
import { candidate } from "../../utils/canditateLogin";
import { BonusContext } from "../../context/BonusState";
import { ToastContainer, toast } from "react-toastify";
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
  const [internshipGrossLimit, setInternshipGrossLimit] = useState(false);
  const [bonusLimit, setBonusLimit] = useState(false);
  const [localExpatGrossLimit, setLocalExpatGrossLimit] = useState(false);
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
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);

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
      // viewCandidateId(createCandidateResponse.candidateId);
      workInfoView(createCandidateResponse.candidateId);

      setViewApiCall(true);
    } else {
      setViewApiCall(false);
    }
    console.log("candidateData remuneration2", candidateData);
    console.log("workInformationData remuneration", workInformationData);
    console.log("workInfoViewData", workInfoViewData);
    console.log("user profile", user);
  }, [candidateData.workInformation, getBonusByContractType]);

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
    }
    console.log("candidateData remuneration2", candidateData);
    console.log("workInformationData remuneration", workInformationData);
  }, [candidateData.workInformation]);

  useEffect(() => {
    console.log("getBonusByContractType", getBonusByContractType);
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
    console.log("candidateData remuneration1", createCandidateResponse);
    console.log(
      "candidateData",
      candidateData,
      "workInfoViewData",
      workInfoViewData
    );
    if (
      (candidateData !== null &&
        candidateData !== undefined &&
        Object.keys(candidateData).length !== 0 &&
        candidateData.workInformation !== null &&
        candidateData.workInformation !== undefined &&
        Object.keys(candidateData.workInformation).length !== 0) ||
      (workInfoViewData !== null &&
        workInfoViewData !== undefined &&
        Object.keys(workInfoViewData).length !== 0)
    ) {
      // if (workInfoViewData.contractType === "Internship") {
      //   if (
      //     typeof stipened === "undefined" ||
      //     stipened === "" ||
      //     (stipened + "").includes(" ", "-", ".", "/", "+")
      //   ) {
      //     setStipenedError(true);
      //   } else {
      //     setStipenedError(false);
      //   }
      // }

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
        if (fixedGross <= 18000) {
          setFixedGrossError(false);
          setParmanentGrossLimit(true);
        } else {
          setFixedGrossError(false);
          setParmanentGrossLimit(false);
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
        if (fixedGross < 90 || fixedGross > 400) {
          setFixedGrossError(false);
          setPartTimeGrossLimit(true);
        } else {
          setFixedGrossError(false);
          setPartTimeGrossLimit(false);
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
        if (fixedGross < 25000) {
          setFixedGrossError(false);
          setLocalExpatGrossLimit(true);
        } else {
          setFixedGrossError(false);
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
          candidateData.workInformation.contractType === "Internship" &&
          candidateData.workInformation.nationality !== "Indian") ||
        (workInfoViewData !== null &&
          workInfoViewData !== undefined &&
          Object.keys(workInfoViewData).length !== 0 &&
          workInfoViewData.contractType === "Internship" &&
          workInfoViewData.nationality !== "Indian")
      ) {
        if (stipened) {
          if (stipened < 75000) {
            setStipenedError(false);
            setInternshipGrossLimit(true);
          } else {
            setStipenedError(false);
            setInternshipGrossLimit(false);
          }
        } else {
          setStipenedError(true);
          setInternshipGrossLimit(false);
        }
      }
    }
  }, [candidateData.workInformation, workInfoViewData]);

  const changeHandler = (e) => {
    console.log("changeHandler", e);
    console.log("contracttype", workInfoViewData.contractType);
    if (workInfoViewData.contractType === "Internship") {
      if (
        typeof e === "undefined" ||
        e === "" ||
        (e + "").includes(" ", "-", ".", "/", "+")
      ) {
        console.log("remuneration Info5", fixedGross, monthlyBonus, stipened);
        setStipened(e);
        setStipenedError(true);
        setInternshipGrossLimit(false);
        setFixedGross(0);
        setFixedGrossError(false);
        setParmanentGrossLimit(false);
        setPartTimeGrossLimit(false);
        setLocalExpatGrossLimit(false);
      } else {
        if (
          workInfoViewData.contractType === "Internship" &&
          workInfoViewData.nationality !== "Indian"
        ) {
          if (stipened < 75000) {
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
          setInternshipGrossLimit(false);
        }
      }
    }

    if (workInfoViewData.contractType === "Fulltime") {
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
      } else if (e < 18000 || e == 18000) {
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

    if (workInfoViewData.contractType === "Parttime") {
      if (
        typeof e === "undefined" ||
        e === "" ||
        e.includes(" ", "-", ".", "/", "+")
      ) {
        setFixedGross(e);
        setFixedGrossError(true);
        setPartTimeGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setLocalExpatGrossLimit(false);
      } else if ((e < 90 || e > 400) ) {
        setFixedGross(e);
        setFixedGrossError(false);
        setPartTimeGrossLimit(true);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setLocalExpatGrossLimit(false);
      } else {
        setFixedGross(e);
        setFixedGrossError(false);
        setPartTimeGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setLocalExpatGrossLimit(false);
      }
    }

    if (workInfoViewData.contractType === "Local Expat") {
      if (
        typeof e === "undefined" ||
        e === "" ||
        e.includes(" ", "-", ".", "/", "+")
      ) {
        setFixedGross(e);
        setFixedGrossError(true);
        setLocalExpatGrossLimit(false);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
      } else if (e < 25000) {
        setFixedGross(e);
        setFixedGrossError(false);
        setLocalExpatGrossLimit(true);
        setParmanentGrossLimit(false);
        setStipened(0);
        setStipenedError(false);
        setPartTimeGrossLimit(false);
      } else {
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
    // alert("in sumbit handler");
    console.log("inside submit", candidateData);
    let remunerationinfo;
    e.preventDefault();
    console.log(
      "remuneration Info1",
      fixedGross,
      monthlyBonus,
      stipened,
      typeof stipened,
      workInfoViewData
    );

    let fixedGrossEmpty = false;
    let stipendEmpty = false;
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
      if (stipened === undefined || stipened === null || stipened === 0 || stipened < 0) {
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
      fixedGrossEmpty === false &&
      stipendEmpty === false &&
      fixedGrossError === false &&
      stipenedError === false &&
      parmanentGrossLimit === false &&
      partTimeGrossLimit === false &&
      localExpatGrossLimit === false
    ) {
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
      {/* <ToastContainer /> */}
      <Form>
        <Row>
          <Fragment>
            {workInfoViewData &&
            workInfoViewData.contractType === "Internship" ? (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Col sm={2}></Col>
                  <Form.Label column sm={3}>
                  Monthly Stipend
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      className="form-input"
                      type="number"
                      name="stipend"
                      placeholder="1000"
                      value={stipened}
                      onChange={(event) => changeHandler(event.target.value)}
                      required
                      disabled={disabled}
                    />
                    {stipenedError ? (
                      <p style={{ color: "red" }}>This field cannot be empty</p>
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
            ) : (
              <Col sm={6}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  {/* <Col sm={2}></Col> */}
                  <Form.Label column sm={3}>
                    Monthly Fixed Gross{" "}
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
                      name="fixedGross"
                      placeholder="100"
                      value={fixedGross}
                      onChange={(event) => changeHandler(event.target.value)}
                      disabled={disabled}
                      required
                    />
                    {fixedGrossError ? (
                      <p style={{ color: "red" }}>
                        Please Enter the valid Input
                      </p>
                    ) : partTimeGrossLimit ? (
                      <p style={{ color: "red" }}>
                        Value should be between 90 - 400{" "}
                      </p>
                    ) : parmanentGrossLimit ? (
                      <p style={{ color: "red" }}>
                        Value should be greater than 18000{" "}
                      </p>
                    ) : localExpatGrossLimit ? (
                      <p style={{ color: "red" }}>
                        Value should not be less than  $ 25000{" "}
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
                {/* {user ? (
                  user.role === "ADMIN" ? (
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="formHorizontalEmail"> */}
                {/* <Form.Label column sm={3}> */}
                {/* Monthly Bonus ( % )</Form.Label> */}
                {/* <Col sm={6}>
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
                            readOnly
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
                  ) : ( */}
                <Col sm={6}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    {/* <Form.Label column sm={3}> */}
                    Monthly Bonus ( % ){/* </Form.Label> */}
                    <Col sm={6}>
                      <Form.Control
                        className="form-input"
                        value={monthlyBonus}
                        type="number"
                        name="monthlyBonus"
                        placeholder="0"
                        readOnly
                        disabled="true"
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
              </Fragment>
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
  );
};

export default RemunerationInformation;
