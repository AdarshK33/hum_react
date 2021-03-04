import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./OnBoard.css";
import Breadcrumb from "../common/breadcrumb";
import PersonalInformation from "./PersonalInformation";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import BankDetails from "./BankDetails";
import InsuranceNomination from "./InsuranceNomination";
import PFDeclaration from "./PFDeclaration";
import Documents from "./Documents";

const OnBoardingStepper = () => {
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

  const NextStep = () => {
    console.log(stepCount);
    if (stepCount >= 0 && stepCount < 6) {
      let tempArray = [...stepArray];
      tempArray[stepCount].step = checkOk;
      tempArray[stepCount].line = lineOk;
      tempArray[stepCount + 1].step = currStep;
      setStepNumber(stepCount + 1);

      setStep(tempArray);
    }
  };
  const PrevStep = () => {
    console.log(stepCount);
    if (stepCount > 0 && stepCount <= 6) {
      let tempArray = [...stepArray];
      tempArray[stepCount].step = defaultStep;
      tempArray[stepCount - 1].line = defaultLine;
      tempArray[stepCount - 1].step = currStep;
      setStep(tempArray);
      setStepNumber(stepCount - 1);
    }
  };

  return (
    <Fragment>
      <Breadcrumb title="onboard" parent="onboard" />
      <div className="container-fluid"></div>
      <div>
        <div className="OnBoardHeading">
          <b>ONBOARDING</b>
        </div>
        <div>
          <Row style={{ marginTop: "1rem" }}>
            <Col sm={1}>
              <div>
                <div className={stepArray[0].step}>
                  <i class="fa fa-user"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  {" "}
                  Personal Information
                </label>
                <br></br>
                <span className={stepArray[0].line}></span>

                <div className={stepArray[1].step}>
                  <i class="fa fa-address-card-o" aria-hidden="true"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  {" "}
                  Address
                </label>
                <br></br>
                <span className={stepArray[1].line}></span>

                <div className={stepArray[2].step}>
                  <i className="insideIcon" class="fa fa-address-book"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  {" "}
                  Emergency Contact
                </label>
                <br></br>
                <span className={stepArray[2].line}></span>

                <div className={stepArray[3].step}>
                  <i className="insideIcon" class="fa fa-lock"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  {" "}
                  Bank Details
                </label>
                <br></br>
                <span className={stepArray[3].line}></span>

                <div className={stepArray[4].step}>
                  <i class="fa fa-shield"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  {" "}
                  Insurance Nomination
                </label>
                <br></br>
                <span className={stepArray[4].line}></span>

                <div className={stepArray[5].step}>
                  <i class="fa fa-credit-card-alt"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  {" "}
                  Provident Fund Declaration
                </label>
                <br></br>
                <span className={stepArray[5].line}></span>

                <div className={stepArray[6].step}>
                  <i class="fa fa-book"></i>
                </div>
                <label style={{ marginLeft: "15px", textAlign: "center" }}>
                  Documents
                </label>
              </div>
            </Col>
            <Col sm={10} style={{ marginTop: "2rem", marginLeft: "2rem" }}>
              {(() => {
                switch (stepCount) {
                  case 0:
                    return <PersonalInformation />;
                  case 1:
                    return <Address />;
                  case 2:
                    return <EmergencyContact />;
                  case 3:
                    return <BankDetails />;
                  case 4:
                    return <InsuranceNomination />;
                  case 5:
                    return <PFDeclaration />;
                  case 6:
                    return <Documents />;
                  default:
                    return <div>OnBoarding</div>;
                }
              })()}

              <div style={{ marginLeft: "300px", marginTop: "30px" }}>
                <button className="stepperButtons" onClick={PrevStep}>
                  Back
                </button>
                <button className="stepperButtons" onClick={NextStep}>
                  Save & Next
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};
export default OnBoardingStepper;
