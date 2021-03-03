import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./OnBoard.css";
// const defaultStepArray = ["step1", "", "", "", "", "", ""];

const OnBoardingStepper = () => {
  const [current, setCurrent] = useState(false);
  const checkOk = "OkCheckStep";
  const currStep = "CurrentCheckStep";
  const defaultStep = "CheckStep";
  const lineOk = "OkConnectLine";
  const defaultLine = "ConnectLine";
  const [stepCount, setStepNumber] = useState(0);
  const [stepArray, setStep] = useState([
    { step: currStep, line: defaultLine },
    { step: defaultStep, line: defaultLine },
    { step: defaultStep, line: defaultLine },
    { step: defaultStep, line: defaultLine },
    { step: defaultStep, line: defaultLine },
    { step: defaultStep, line: defaultLine },
    { step: defaultStep, line: defaultLine },
  ]);
  console.log(stepArray);

  const NextStep = (stepNumber) => {
    console.log(stepNumber);
    if (stepNumber < 6) {
      let tempArray = [...stepArray];
      tempArray[stepNumber].step = checkOk;
      tempArray[stepNumber].line = lineOk;
      tempArray[stepNumber + 1].step = currStep;
      setStepNumber(stepCount + 1);

      setStep(tempArray);
    }
  };
  const PrevStep = (stepNumber) => {
    console.log(stepCount);
    let tempArray = [...stepArray];
    tempArray[stepNumber].step = defaultStep;
    tempArray[stepNumber].line = defaultLine;
    // tempArray[stepNumber + 1].step = currStep;
    // setStepNumber(stepCount + 1);
    setStepNumber(stepCount - 1);

    setStep(tempArray);
  };

  return (
    <div>
      <div className="OnBoardHeading">
        <b>ONBOARDING</b>
      </div>
      <div>
        <Row>
          <Col sm={1}>
            <div>
              <div className={stepArray[0].step}>
                <i class="fa fa-user"></i>
              </div>
              <label style={{ marginLeft: "15px" }}>
                {" "}
                Personal Information
              </label>
              <br></br>
              <span className={stepArray[0].line}></span>

              <div className={stepArray[1].step}>
                <i class="fa fa-address-card-o" aria-hidden="true"></i>
              </div>
              <label style={{ marginLeft: "15px" }}> Address</label>
              <br></br>
              <span className={stepArray[1].line}></span>

              <div className={stepArray[2].step}>
                <i className="insideIcon" class="fa fa-address-book"></i>
              </div>
              <label style={{ marginLeft: "15px" }}> Emergency Contact</label>
              <br></br>
              <span className={stepArray[2].line}></span>

              <div className={stepArray[3].step}>
                <i className="insideIcon" class="fa fa-lock"></i>
              </div>
              <label style={{ marginLeft: "15px" }}> Bank Details</label>
              <br></br>
              <span className={stepArray[3].line}></span>

              <div className={stepArray[4].step}>
                <i class="fa fa-shield"></i>
              </div>
              <label style={{ marginLeft: "15px" }}>
                {" "}
                Insurance Nomination
              </label>
              <br></br>
              <span className={stepArray[4].line}></span>

              <div className={stepArray[5].step}>
                <i class="fa fa-credit-card-alt"></i>
              </div>
              <label style={{ marginLeft: "15px" }}>
                {" "}
                Provident Fund Declaration
              </label>
              <br></br>
              <span className={stepArray[5].line}></span>

              <div className={stepArray[6].step}>
                <i class="fa fa-book"></i>
              </div>
              <label style={{ marginLeft: "15px" }}>Documents</label>
            </div>
          </Col>
          <Col>
            <button
              className="buttonField  button"
              onClick={() => NextStep(stepCount)}
            >
              <b> Next </b>
            </button>
            <button
              className="buttonField  button"
              onClick={() => PrevStep(stepCount)}
            >
              <b> Back</b>
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default OnBoardingStepper;
