import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";

const PFDeclaration = (props) => {
  const [firstJobYes, setFirstJobYes] = useState(false);
  const [firstJobNo, setFirstJobNo] = useState(false);
  const [contributingPrevOrgYes, setContributingPrevOrgYes] = useState(false);
  const [contributingPrevOrgNo, setContributingPrevOrgNo] = useState(false);
  const [memberOfPensionSchemeYes, setMemberOfPensionSchemeYes] = useState(
    false
  );
  const [memberOfPensionSchemeNo, setMemberOfPensionSchemeNo] = useState(false);
  const [pfNominationHoldHealthYes, setPfNominationHoldHealthYes] = useState(
    false
  );
  const [pfNominationHoldHealthNo, setPfNominationHoldHealthNo] = useState(
    false
  );

  const [required, setRequired] = useState(true);

  const [state, setState] = useState({
    uanNumber: "",
  });
  const submitHandler = (e) => {
    const nextPage = props.NextStep;
    nextPage();
    const PFInfo = {
      candidateId: 0,
      contributingPrevOrg: contributingPrevOrgYes ? true : false,
      declarationId: 0,
      epfPassbookCopy: " ",
      firstJob: firstJobYes ? true : false,
      memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
      pfNominationHoldHealth: pfNominationHoldHealthYes ? true : false,
      uanNumber: state.uanNumber,
    };
    console.log(PFInfo);
    e.preventDefault();

    // const nextPage = props.NextStep;
    // nextPage();
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const handleFirstJobYesChange = (e) => {
    setFirstJobYes(e.target.checked);
    setFirstJobNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleFirstJobNoChange = (e) => {
    setFirstJobNo(e.target.checked);
    setFirstJobYes(!e.target.checked);
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
  const handlePfNominationHoldHealthYesChange = (e) => {
    setPfNominationHoldHealthYes(e.target.checked);
    setPfNominationHoldHealthNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handlePfNominationHoldHealthNoChange = (e) => {
    setPfNominationHoldHealthNo(e.target.checked);
    setPfNominationHoldHealthYes(!e.target.checked);

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
                onChange={changeHandler}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <div>
              <label for=" ">
                Fill <a href="~/address">EPF Form</a> here
              </label>
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Are you a member of employer pension scheme in your previous
                employement ?
              </label>
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
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  value="yes"
                  checked={pfNominationHoldHealthYes}
                  required={required}
                  onChange={handlePfNominationHoldHealthYesChange}
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
                  checked={pfNominationHoldHealthNo}
                  required={required}
                  onChange={handlePfNominationHoldHealthNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <div>
              <label for=" ">
                <a href="~/address">Add</a> Details here
              </label>
            </div>
          </Col>
        </Row>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
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
