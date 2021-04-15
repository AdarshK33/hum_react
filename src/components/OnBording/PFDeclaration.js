import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { OnBoardContext } from "../../context/OnBoardState";
import { ToastContainer, toast } from "react-toastify";
import { Document, Page } from "react-pdf";
import Form11 from "../../forms/Form_11_UAN.pdf";
import Form11View from "../../forms/Form_11_(PF_declaration)_Sample_copy.pdf";
import Form2 from "../../forms/Form_2_EPF_Nomination.pdf";
import Form2View from "../../forms/Form_2_(PF_nomination)_Sample_copy.pdf";
import FormF from "../../forms/Form_F_Gratuity.pdf";
import FormFView from "../../forms/Form_F_(Gratuity)_Sample_copy.pdf";
import "react-toastify/dist/ReactToastify.css";
import "./OnBoard.css";
const PFDeclaration = (props) => {
  const {
    PFDeclarationCreate,
    PFDeclarationUpdate,
    PFDeclarationView,
    pfDeclarationCreate,
    pfDeclarationUpdate,
    candidateProfileData,
    pfDeclarationView,
    documentView,
    documentViewData,
  } = useContext(OnBoardContext);
  const [dataExist, setDataExist] = useState({
    exist: false,
  });
  const [firstJobYes, setFirstJobYes] = useState(false);

  const [declarationIdValue, setDeclarationIdValue] = useState(0);
  const [firstJobNo, setFirstJobNo] = useState(false);
  const [contributingPrevOrgYes, setContributingPrevOrgYes] = useState(false);
  const [contributingPrevOrgNo, setContributingPrevOrgNo] = useState(false);
  const [memberOfPensionSchemeYes, setMemberOfPensionSchemeYes] = useState(
    false
  );
  const [memberOfPensionSchemeNo, setMemberOfPensionSchemeNo] = useState(false);
  const [pfNominationHoldDeathYes, setPfNominationHoldDeathYes] = useState(
    false
  );
  const [pfNominationHoldDeathNo, setPfNominationHoldDeathNo] = useState(false);
  const [state, setState] = useState({
    uanNumber: "",
  });
  const [uanNumber, setUanNumber] = useState("");
  const [epfPassbookCopy, setEpfPassbookCopy] = useState("");
  const [required, setRequired] = useState(true);
  const [firstJobError, setFirstJobError] = useState(false);
  const [contributingPrevError, setContributingPrevError] = useState(false);
  const [memberOfPensionSchemaError, setMemberOfPensionSchemaError] = useState(
    false
  );
  const [pfNominationHoldDeathError, setPfNominationHoldDeathError] = useState(
    false
  );
  const [uanNumberError, setUanNumberError] = useState(false);
  console.log(
    firstJobYes,
    contributingPrevOrgYes,
    memberOfPensionSchemeYes,
    pfNominationHoldDeathYes,
    uanNumber,
    epfPassbookCopy,
    dataExist,
    "pfDeclarationView"
  );

  useEffect(() => {
    PFDeclarationView(candidateProfileData.candidateId);
    console.log(pfDeclarationView, "pfDeclarationViewuse");
  }, []);
  const handleForm11 = () => {
    window.open(Form11);
  };
  const handleForm11View = () => {
    window.open(Form11View);
  };
  const handleForm2 = () => {
    window.open(Form2);
  };
  const handleForm2View = () => {
    window.open(Form2View);
  };
  const handleFormF = () => {
    window.open(FormF);
  };
  const handleFormFView = () => {
    window.open(FormFView);
  };
  useEffect(() => {
    console.log(pfDeclarationView, "pfDeclarationViewuse2");
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    if (
      pfDeclarationView !== null &&
      Object.keys(pfDeclarationView).length !== 0
    ) {
      if (
        pfDeclarationView.firstJob !== undefined &&
        pfDeclarationView.firstJob == true
      )
        setFirstJobYes(pfDeclarationView.firstJob);
      else if (
        pfDeclarationView.firstJob !== undefined &&
        pfDeclarationView.firstJob == false
      ) {
        setFirstJobNo(true);
      }
      if (
        pfDeclarationView.contributingPrevOrg !== undefined &&
        pfDeclarationView.contributingPrevOrg == true
      ) {
        setContributingPrevOrgYes(pfDeclarationView.contributingPrevOrg);
      } else if (
        pfDeclarationView.contributingPrevOrg !== undefined &&
        pfDeclarationView.contributingPrevOrg == false
      ) {
        setContributingPrevOrgNo(true);
      }
      if (
        pfDeclarationView.memberOfPensionScheme !== undefined &&
        pfDeclarationView.memberOfPensionScheme == true
      ) {
        setMemberOfPensionSchemeYes(pfDeclarationView.memberOfPensionScheme);
      } else if (
        pfDeclarationView.memberOfPensionScheme !== undefined &&
        pfDeclarationView.memberOfPensionScheme == false
      ) {
        setMemberOfPensionSchemeNo(true);
      }
      if (
        pfDeclarationView.pfNominationHoldDeath !== undefined &&
        pfDeclarationView.pfNominationHoldDeath == true
      ) {
        setPfNominationHoldDeathYes(pfDeclarationView.pfNominationHoldDeath);
        setPfNominationHoldDeathNo(false);
      } else if (
        pfDeclarationView.pfNominationHoldDeath !== undefined &&
        pfDeclarationView.pfNominationHoldDeath == false
      ) {
        setPfNominationHoldDeathNo(true);
        setPfNominationHoldDeathYes(false);
      } else if (pfDeclarationView.epfPassbookCopy !== undefined) {
        setEpfPassbookCopy(pfDeclarationView.epfPassbookCopy);
      }
      if (pfDeclarationView.declarationId !== undefined) {
        console.log(
          "pfDeclarationView.declarationId",
          pfDeclarationView.declarationId
        );
        setDeclarationIdValue(pfDeclarationView.declarationId);
      }
      if (pfDeclarationView.uanNumber !== undefined) {
        setUanNumber(pfDeclarationView.uanNumber);
      }
      setDataExist({ exist: true });
    }
    console.log(candidateProfileData.candidateId, "pfdeclaration");
  }, [pfDeclarationView]);
  console.log(
    firstJobYes,
    contributingPrevOrgYes,
    contributingPrevOrgNo,
    memberOfPensionSchemeYes,
    memberOfPensionSchemeNo,
    pfNominationHoldDeathYes,
    pfNominationHoldDeathNo,
    uanNumber,
    epfPassbookCopy,
    dataExist,
    "pfDeclarationView2"
  );
  const validateCheckBoxes = (itemYes, itemNo, setError) => {
    if ((itemYes === true) | (itemNo === true)) {
      setError(false);
      console.log(itemYes, itemNo);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const UanNumberValidation = () => {
    if (state.uanNumber !== "") {
      console.log("uan number");
      setUanNumberError(false);
      return true;
    } else {
      setUanNumberError(true);
      return false;
    }
  };
  const checkAllValidations = () => {
    if (
      validateCheckBoxes(firstJobYes, firstJobNo, setFirstJobError) === true
    ) {
      if (
        (validateCheckBoxes(
          pfNominationHoldDeathYes,
          pfNominationHoldDeathNo,
          setPfNominationHoldDeathError
        ) ===
          true) &
        (validateCheckBoxes(
          memberOfPensionSchemeYes,
          memberOfPensionSchemeNo,
          setMemberOfPensionSchemaError
        ) ===
          true) &
        (validateCheckBoxes(
          contributingPrevOrgYes,
          contributingPrevOrgNo,
          setContributingPrevError
        ) ===
          true)
      ) {
        if (firstJobNo === true) {
          console.log("i am hear");
          if (UanNumberValidation() === true) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const submitHandler = (e) => {
    // const nextPage = props.NextStep;
    // nextPage();
    e.preventDefault();

    const value = checkAllValidations();
    if (value === true) {
      // const nextPage = props.NextStep;
      // nextPage();
      // const PFInfo = {
      //   candidateId:
      //     candidateProfileData.candidateId !== undefined
      //       ? candidateProfileData.candidateId
      //       : "",
      //   contributingPrevOrg: contributingPrevOrgYes ? true : false,
      //   declarationId: declarationIdValue,
      //   epfPassbookCopy: " ",
      //   firstJob: firstJobYes ? true : false,
      //   memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
      //   pfNominationHoldDeath: pfNominationHoldDeathYes ? true : false,
      //   uanNumber: state.uanNumber,
      // };
      if (dataExist.exist == true) {
        const PFInfo = {
          candidateId:
            candidateProfileData.candidateId !== undefined
              ? candidateProfileData.candidateId
              : "",
          contributingPrevOrg: contributingPrevOrgYes ? true : false,
          declarationId: declarationIdValue,
          epfPassbookCopy: " ",
          firstJob: firstJobYes ? true : false,
          memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
          pfNominationHoldDeath: pfNominationHoldDeathYes ? true : false,
          uanNumber: state.uanNumber,
        };
        console.log(PFInfo, "update pf");
        PFDeclarationUpdate(PFInfo);
        const nextPage = props.NextStep;
        nextPage(true);
        documentView(candidateProfileData.candidateId);
      } else {
        const PFInfo = {
          candidateId:
            candidateProfileData.candidateId !== undefined
              ? candidateProfileData.candidateId
              : "",
          contributingPrevOrg: contributingPrevOrgYes ? true : false,
          declarationId: declarationIdValue,
          epfPassbookCopy: " ",
          firstJob: firstJobYes ? true : false,
          memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
          pfNominationHoldDeath: pfNominationHoldDeathYes ? true : false,
          uanNumber: state.uanNumber,
        };
        console.log(PFInfo, "create pf");
        PFDeclarationCreate(PFInfo);
        const nextPage = props.NextStep;
        nextPage(true);
        documentView(candidateProfileData.candidateId);
      }
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const handleFirstJobYesChange = (e) => {
    setFirstJobYes(e.target.checked);
    setFirstJobNo(!e.target.checked);
    setContributingPrevOrgNo(e.target.checked);
    setMemberOfPensionSchemeNo(e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleFirstJobNoChange = (e) => {
    setFirstJobNo(e.target.checked);
    setFirstJobYes(!e.target.checked);
    setContributingPrevOrgNo(!e.target.checked);
    setMemberOfPensionSchemeNo(!e.target.checked);
    setContributingPrevOrgYes(!e.target.checked);

    setMemberOfPensionSchemeYes(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleContributingPrevOrgYesChange = (e) => {
    setContributingPrevOrgYes(e.target.checked);
    setContributingPrevOrgNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleContributingPrevOrgNoChange = (e) => {
    setContributingPrevOrgNo(e.target.checked);
    setContributingPrevOrgYes(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleMemberOfPensionSchemeYesChange = (e) => {
    setMemberOfPensionSchemeYes(e.target.checked);
    setMemberOfPensionSchemeNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleMemberOfPensionSchemeNoChange = (e) => {
    setMemberOfPensionSchemeNo(e.target.checked);
    setMemberOfPensionSchemeYes(!e.target.checked);

    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handlePfNominationHoldDeathYesChange = (e) => {
    setPfNominationHoldDeathYes(e.target.checked);
    setPfNominationHoldDeathNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handlePfNominationHoldDeathNoChange = (e) => {
    setPfNominationHoldDeathNo(e.target.checked);
    setPfNominationHoldDeathYes(!e.target.checked);

    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  return (
    <Fragment>
      <Form>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Is this your first job ?</label>
              {firstJobError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please select one of the option
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="yes"
                  checked={firstJobYes}
                  required={required}
                  onChange={handleFirstJobYesChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="no"
                  checked={firstJobNo}
                  required={required}
                  onChange={handleFirstJobNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Were you contributing in your previous organization ?
                {contributingPrevError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    *Please select one of the option
                  </p>
                ) : (
                  <p></p>
                )}
              </label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  type="checkbox"
                  value="yes"
                  checked={contributingPrevOrgYes}
                  required={required}
                  onChange={handleContributingPrevOrgYesChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  type="checkbox"
                  value="no"
                  checked={contributingPrevOrgNo}
                  required={required}
                  onChange={handleContributingPrevOrgNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Provide your UAN number</label>
              {uanNumberError ? (
                <p style={{ color: "red" }}> *Please enter your UAN number</p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="UAN number"
                required
                name="uanNumber"
                value={state.uanNumber}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
          </Col>
          {/* <Col sm={2}>
            <div>
              <label>
                Fill{" "}
                <a href="" target="_blank" rel="noopener noreferrer" download>
                  <i className="fas fa-download" />
                  EPF Form
                </a>{" "}
                here
              </label>
            </div>
          </Col> */}
        </Row>

        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Are you a member of employer pension scheme in your previous
                employement ?
              </label>
              {memberOfPensionSchemaError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please select one of the option
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="yes"
                  checked={memberOfPensionSchemeYes}
                  required={required}
                  onChange={handleMemberOfPensionSchemeYesChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="yes"
                  checked={memberOfPensionSchemeNo}
                  required={required}
                  onChange={handleMemberOfPensionSchemeNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Does the PF nomination hold good in case of health ?
              </label>
              {pfNominationHoldDeathError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please select one of the option
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="yes"
                  checked={pfNominationHoldDeathYes}
                  required={required}
                  onChange={handlePfNominationHoldDeathYesChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="no"
                  checked={pfNominationHoldDeathNo}
                  required={required}
                  onChange={handlePfNominationHoldDeathNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
          {/* <Col sm={2}>
            <div>
              <label>
                <a href="~/address">Add</a> Details here
              </label>
            </div>
          </Col> */}

          <Col sm={5}>
            <label>Please fill the forms below</label>
            <br />
            <a href={require("../../forms/Form_11_UAN.pdf")} target="_blank">
              Download Form 11 Declaration
            </a>
            <br />
            <a
              href={require("../../forms/Form_2_EPF_Nomination.pdf")}
              target="_blank"
            >
              Download Form 2 EPF nomination
            </a>
            <br />
            <a
              href={require("../../forms/Form_F_Gratuity.pdf")}
              target="_blank"
            >
              Download Form F Gratuity
            </a>
            <br />
          </Col>
          <Col sm={5}>
            <label></label>
            <br />
            <a
              href={require("../../forms/Form_11_(PF_declaration)_Sample_copy.pdf")}
              target="_blank"
            >
              Sample Form 11 Declaration
            </a>
            <br />
            <a
              href={require("../../forms/Form_2_(PF_nomination)_Sample_copy.pdf")}
              target="_blank"
            >
              Sample Form 2 EPF nomination
            </a>
            <br />
            <a
              href={require("../../forms/Form_F_(Gratuity)_Sample_copy.pdf")}
              target="_blank"
            >
              Sample Form F Gratuity
            </a>
            <br />
          </Col>
        </Row>
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <button className="stepperButtons" onClick={PrevStep}>
            Back
          </button>
          <button className="stepperButtons" onClick={submitHandler}>
            Save & Next
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default PFDeclaration;
