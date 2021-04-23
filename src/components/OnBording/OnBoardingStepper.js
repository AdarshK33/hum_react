import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./OnBoard.css";
import Breadcrumb from "../common/breadcrumb";
import PersonalInformation from "./PersonalInformation";
import Address from "./Address";
import EmergencyContact from "./EmergencyContact";
import BankDetails from "./BankDetails";
// import InsuranceNomination from "./InsuranceNomination";
import InsuranceNomination from "./InsuranceNominationChange";
import PFDeclaration from "./PFDeclaration";
import Documents from "./Documents";
import { toast } from "react-toastify";
import DocVerification from "../../components/CandidateVerification/DocVerification";
import { OnBoardContext } from "../../context/OnBoardState";
import { OfferContext } from "../../context/OfferState";

const OnBoardingStepper = (props) => {
  const { CandidateProfile, candidateProfileData } = useContext(OnBoardContext);
  const { viewCandidateId, candidateData } = useContext(OfferContext);
  const personalInfoRef = useRef();
  const checkOk = "OkCheckStep";
  const currStep = "CurrentCheckStep";
  const defaultStep = "CheckStep";
  const lineOk = "OkConnectLine";
  const defaultLine = "ConnectLine";
  const defaultLabel = "defaultLabelColour";
  const labelOk = "OkLabbelColour";
  const currLabel = "CurrentLabelColour";
  const [stepCount, setStepNumber] = useState(0);
  const [stepArray, setStep] = useState([
    {
      step: currStep,
      line: defaultLine,
      label: currLabel,
      idValue: 0,
      fileSaved: false,
    },
    {
      step: defaultStep,
      line: defaultLine,
      label: defaultLabel,
      idValue: 1,
      fileSaved: false,
    },
    {
      step: defaultStep,
      line: defaultLine,
      label: defaultLabel,
      idValue: 2,
      fileSaved: false,
    },
    {
      step: defaultStep,
      line: defaultLine,
      label: defaultLabel,
      idValue: 3,
      fileSaved: false,
    },
    {
      step: defaultStep,
      line: defaultLine,
      label: defaultLabel,
      idValue: 4,
      fileSaved: false,
    },
    {
      step: defaultStep,
      line: defaultLine,
      label: defaultLabel,
      idValue: 5,
      fileSaved: false,
    },
    {
      step: defaultStep,
      line: defaultLine,
      label: defaultLabel,
      idValue: 6,
      fileSaved: false,
    },
  ]);
  console.log(stepArray);
  // const handleIconChange1 = (data) => {
  //   let tempArray = [...stepArray];
  //   tempArray.forEach((value, index) => {
  //     if (index < data) {
  //       tempArray[index].step = checkOk;
  //       tempArray[index].label = labelOk;
  //       tempArray[index].line = lineOk;
  //     } else if (data >= index) {
  //       tempArray[index].line = defaultLine;
  //       tempArray[index].label = currLabel;
  //       tempArray[index].step = currStep;
  //       setStepNumber(index);
  //     }
  //     if (index > data) {
  //       tempArray[index].line = defaultLine;
  //       tempArray[index].step = defaultStep;
  //       tempArray[index].label = defaultLabel;
  //     } else if (data <= index) {
  //       tempArray[index].line = defaultLine;
  //       tempArray[index].step = currStep;
  //       tempArray[index].label = currLabel;
  //       setStepNumber(index);
  //     }
  //   });
  //   setStep(tempArray);
  // };

  const handleIconChange = (num) => {
    if (num >= 0 && num <= 6) {
      let tempArray = [...stepArray];
      console.log("---------------------------", num);
      tempArray.forEach((value, index) => {
        if (tempArray[index].fileSaved === true) {
          tempArray[index].step = checkOk;
          tempArray[index].label = labelOk;
          if (index > 0) {
            tempArray[index - 1].line = lineOk;
          }
        } else {
          tempArray[index].step = defaultStep;
          tempArray[index].label = defaultLabel;
          if (index > 0) {
            tempArray[index - 1].line = defaultLine;
          }
        }
        tempArray[num].step = currStep;
        tempArray[num].label = currLabel;
      });
      setStepNumber(num);
      setStep(tempArray);
    }
  };

  useEffect(() => {
    CandidateProfile();
  }, [candidateProfileData]);
  useEffect(() => {
    viewCandidateId(candidateProfileData.candidateId);
  }, []);
  console.log("stepper candidate data", candidateProfileData);
  console.log("candidate data", candidateData);

  const NextStep = (value) => {
    console.log(stepCount, "NEXTSTEP");
    if (stepCount >= 0 && stepCount < 6) {
      let tempArray = [...stepArray];
      tempArray[stepCount].fileSaved = value;
      tempArray[stepCount].step = checkOk;
      tempArray[stepCount].label = labelOk;
      tempArray[stepCount].line = lineOk;
      tempArray[stepCount + 1].label = currLabel;
      tempArray[stepCount + 1].step = currStep;
      setStepNumber(stepCount + 1);

      setStep(tempArray);
    }
  };
  const PrevStep = () => {
    console.log("prevStep");
    console.log(stepCount);
    if (stepCount > 0 && stepCount <= 6) {
      let tempArray = [...stepArray];
      if (tempArray[stepCount].fileSaved === true) {
        tempArray[stepCount].step = checkOk;
        tempArray[stepCount].label = labelOk;
        tempArray[stepCount].line = lineOk;
        tempArray[stepCount - 1].line = defaultLine;
        tempArray[stepCount - 1].step = currStep;
        tempArray[stepCount - 1].label = currLabel;
      } else {
        tempArray[stepCount].step = defaultStep;
        tempArray[stepCount].label = defaultLabel;
        tempArray[stepCount - 1].line = defaultLine;
        tempArray[stepCount - 1].step = currStep;
        tempArray[stepCount - 1].label = currLabel;
      }
      setStep(tempArray);
      setStepNumber(stepCount - 1);
    }
  };
  // const PrevStep1 = () => {
  //   console.log("prevStep");
  //   console.log(stepCount);
  //   if (stepCount > 0 && stepCount <= 6) {
  //     let tempArray = [...stepArray];
  //     tempArray[stepCount].step = defaultStep;
  //     tempArray[stepCount].label = defaultLabel;
  //     tempArray[stepCount - 1].line = defaultLine;
  //     tempArray[stepCount - 1].step = currStep;
  //     tempArray[stepCount - 1].label = currLabel;
  //     setStep(tempArray);
  //     setStepNumber(stepCount - 1);
  //   }
  // };
  console.log(stepCount, stepArray, "stepArray");
  return (
    <Fragment>
      <Breadcrumb title="OnBoard" parent="Candidate OnBoard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>ONBOARDING </b>
                </div>
                <div>
                  <Row style={{ marginTop: "1rem" }}>
                    <Col sm={1} style={{ marginTop: "1rem" }}>
                      <div>
                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[0].idValue);
                          }}
                          className={stepArray[0].step}
                        >
                          <div style={{ paddingTop: "1px", fontSize: "28px" }}>
                            <i className="fa fa-user"></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[0].label}
                          style={{ marginLeft: "10px", textAlign: "center" }}
                        >
                          {" "}
                          Personal Information
                        </label>
                        <br></br>
                        <span className={stepArray[0].line}></span>

                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[1].idValue);
                          }}
                          className={stepArray[1].step}
                        >
                          <div style={{ paddingTop: "4px", fontSize: "24px" }}>
                            <i
                              className="fa fa-address-card-o"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[1].label}
                          style={{ marginLeft: "21px", textAlign: "center" }}
                        >
                          {" "}
                          Address
                        </label>
                        <br></br>
                        <span className={stepArray[1].line}></span>

                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[2].idValue);
                          }}
                          className={stepArray[2].step}
                        >
                          <div style={{ paddingTop: "4px", fontSize: "23px" }}>
                            <i className="fa fa-address-book"></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[2].label}
                          style={{ marginLeft: "15px", textAlign: "center" }}
                        >
                          {" "}
                          Emergency Contact
                        </label>
                        <br></br>
                        <span className={stepArray[2].line}></span>

                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[3].idValue);
                          }}
                          className={stepArray[3].step}
                        >
                          <div style={{ paddingTop: "0px", fontSize: "31px" }}>
                            <i className="fa fa-lock"></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[3].label}
                          style={{ marginLeft: "15px", textAlign: "center" }}
                        >
                          {" "}
                          Bank Details
                        </label>
                        <br></br>
                        <span className={stepArray[3].line}></span>

                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[4].idValue);
                          }}
                          className={stepArray[4].step}
                        >
                          <div style={{ paddingTop: "4px", fontSize: "27px" }}>
                            <i className="fa fa-shield"></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[4].label}
                          style={{ marginLeft: "15px", textAlign: "center" }}
                        >
                          {" "}
                          Insurance Nomination
                        </label>
                        <br></br>
                        <span className={stepArray[4].line}></span>

                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[5].idValue);
                          }}
                          className={stepArray[5].step}
                        >
                          <div style={{ paddingTop: "5px", fontSize: "22px" }}>
                            <i className="fa fa-credit-card-alt"></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[5].label}
                          style={{ marginLeft: "15px", textAlign: "center" }}
                        >
                          {" "}
                          Provident Fund Declaration
                        </label>
                        <br></br>
                        <span className={stepArray[5].line}></span>

                        <div
                          type="button"
                          onClick={() => {
                            handleIconChange(stepArray[6].idValue);
                          }}
                          className={stepArray[6].step}
                        >
                          <div style={{ paddingTop: "2px", fontSize: "26px" }}>
                            <i className="fa fa-book"></i>
                          </div>
                        </div>
                        <label
                          className={stepArray[6].label}
                          style={{ marginLeft: "15px", textAlign: "center" }}
                        >
                          Documents
                        </label>
                      </div>
                    </Col>
                    <Col
                      sm={10}
                      style={{ marginTop: "1rem", marginLeft: "2rem" }}
                    >
                      {(() => {
                        switch (stepCount) {
                          case 0:
                            return (
                              <PersonalInformation
                                NextStep={NextStep}
                                PrevStep={PrevStep}
                              />
                            );

                          case 1:
                            return (
                              <Address
                                NextStep={NextStep}
                                PrevStep={PrevStep}
                              />
                            );
                          case 2:
                            return (
                              <EmergencyContact
                                NextStep={NextStep}
                                PrevStep={PrevStep}
                              />
                            );
                          case 3:
                            return (
                              <BankDetails
                                NextStep={NextStep}
                                PrevStep={PrevStep}
                              />
                            );
                          case 4:
                            return (
                              <InsuranceNomination
                                NextStep={NextStep}
                                PrevStep={PrevStep}
                              />
                            );
                          case 5:
                            return (
                              <PFDeclaration
                                NextStep={NextStep}
                                PrevStep={PrevStep}
                              />
                            );
                          case 6:
                            if (window.location.href.includes("verification")) {
                              return <DocVerification />;
                            } else {
                              return (
                                <Documents
                                  NextStep={NextStep}
                                  PrevStep={PrevStep}
                                />
                              );
                            }
                          default:
                            return <div>OnBoarding</div>;
                        }
                      })()}

                      {/* <div style={{ marginTop: "2rem", textAlign: "center" }}>
                        <button className="stepperButtons" onClick={PrevStep}>
                          Back
                        </button>
                        <button
                          className="stepperButtons"
                          type="submit"
                          onClick={NextStep}
                        >
                          Save & Next
                        </button>
                      </div> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default OnBoardingStepper;
