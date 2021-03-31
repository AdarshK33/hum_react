import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import PersonalInformation from "../OnBording/PersonalInformation";
import Address from "../OnBording/Address";
import EmergencyContact from "../OnBording/EmergencyContact";
import BankDetails from "../OnBording/BankDetails";
import InsuranceNomination from "../OnBording/InsuranceNomination";
import PFDeclaration from "../OnBording/PFDeclaration";
import DocVerification from "./DocVerification";
import Breadcrumb from "../common/breadcrumb";

const Verification = () => {
  const personalInfoRef = useRef();
  const checkOk = "OkCheckStep";
  const currStep = "CurrentCheckStep";
  const defaultStep = "CheckStep";
  const lineOk = "OkConnectLine";
  const defaultLine = "ConnectLine";
  const defaultLabel = "defaultLabelColour";
  const labelOk = "OkLabbelColour";
  const currLabel = "CurrentLabelColour";
  const [stepCount, setStepNumber] = useState(6);
  const [stepArray, setStep] = useState([
    { step: checkOk, line: defaultLine, label: defaultLabel },
    { step: checkOk, line: defaultLine, label: defaultLabel },
    { step: checkOk, line: defaultLine, label: defaultLabel },
    { step: checkOk, line: defaultLine, label: defaultLabel },
    { step: checkOk, line: defaultLine, label: defaultLabel },
    { step: checkOk, line: defaultLine, label: defaultLabel },
    { step: currStep, line: defaultLine, label: defaultLabel },
  ]);

  const handleClick = (data) => {
    switch (data) {
      case 0:
        setStepNumber(0);
        break;
      case 1:
        setStepNumber(1);
        break;
      case 2:
        setStepNumber(2);
        break;
      case 3:
        setStepNumber(3);
        break;
      case 4:
        setStepNumber(4);
        break;
      case 5:
        setStepNumber(5);
        break;
      case 6:
        setStepNumber(6);
        break;
      default:
        setStepNumber(6);
    }
  };
  return (
    <Fragment>
      <Breadcrumb
        title="Candidate Verification"
        parent="Candidate Verification"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b> Verification</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row style={{ marginTop: "1rem" }}>
          <Col sm={1} style={{ marginTop: "1rem" }}>
            <div>
              <div className={stepArray[0].step}>
                <div style={{ paddingTop: "1px", fontSize: "28px" }}>
                  <i class="fa fa-user" onClick={() => handleClick(0)}></i>
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

              <div className={stepArray[1].step}>
                <div style={{ paddingTop: "4px", fontSize: "24px" }}>
                  <i
                    class="fa fa-address-card-o"
                    aria-hidden="true"
                    onClick={() => handleClick(1)}
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

              <div className={stepArray[2].step}>
                <div style={{ paddingTop: "4px", fontSize: "23px" }}>
                  <i
                    class="fa fa-address-book"
                    onClick={() => handleClick(2)}
                  ></i>
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

              <div className={stepArray[3].step}>
                <div style={{ paddingTop: "0px", fontSize: "31px" }}>
                  <i class="fa fa-lock" onClick={() => handleClick(3)}></i>
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

              <div className={stepArray[4].step}>
                <div style={{ paddingTop: "4px", fontSize: "27px" }}>
                  <i class="fa fa-shield" onClick={() => handleClick(4)}></i>
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

              <div className={stepArray[5].step}>
                <div style={{ paddingTop: "5px", fontSize: "22px" }}>
                  <i
                    class="fa fa-credit-card-alt"
                    onClick={() => handleClick(5)}
                  ></i>
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

              <div className={stepArray[6].step}>
                <div style={{ paddingTop: "2px", fontSize: "26px" }}>
                  <i class="fa fa-book" onClick={() => handleClick(6)}></i>
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
          <Col sm={10} style={{ marginTop: "1rem", marginLeft: "2rem" }}>
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
                  return <DocVerification />;

                default:
                  return <div>OnBoarding</div>;
              }
            })()}
          </Col>
        </Row>

        {/* <DocVerification /> */}
      </div>
    </Fragment>
  );
};
export default Verification;
