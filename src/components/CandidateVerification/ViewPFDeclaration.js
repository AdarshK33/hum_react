import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "../OnBording/OnBoard.css";
import { DocsVerifyContext } from "../../context/DocverificationState";
import { useParams } from "react-router-dom";

const EditPFDeclaration = (props) => {
  const params = useParams();
  const candidateId = params["candidateId"];
  const { pfDetails, fetchPfDetails } = useContext(DocsVerifyContext);
  const [disable, setDisable] = useState(false);
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
  const [state, setState] = useState({
    uanNumber: "",
  });
  const [uanNumber, setUanNumber] = useState("");

  const [required, setRequired] = useState(true);
  const [firstJobError, setFirstJobError] = useState(false);
  const [contributingPrevError, setContributingPrevError] = useState(false);
  const [memberOfPensionSchemaError, setMemberOfPensionSchemaError] = useState(
    false
  );
  const [
    pfNominationHoldHealthError,
    setPfNominationHoldHealthError,
  ] = useState(false);
  const [uanNumberError, setUanNumberError] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("verification")) {
      fetchPfDetails(candidateId);
      setDisable(true);
      if (pfDetails !== undefined) {
        if (pfDetails.uanNumber !== undefined) {
          setState(pfDetails.uanNumber);
        }
        if (pfDetails.firstJob === true) {
          setFirstJobYes(true);
          setFirstJobNo(false);
        } else {
          setFirstJobYes(false);
          setFirstJobNo(true);
        }
        if (pfDetails.contributingPrevOrg === false) {
          setContributingPrevOrgYes(false);
          setContributingPrevOrgNo(true);
        } else {
          setContributingPrevOrgYes(true);
          setContributingPrevOrgNo(false);
        }
        if (pfDetails.memberOfPensionScheme === false) {
          setMemberOfPensionSchemeYes(false);
          setMemberOfPensionSchemeNo(true);
        } else {
          setMemberOfPensionSchemeYes(true);
          setMemberOfPensionSchemeNo(false);
        }
        if (pfDetails.pfNominationHoldHealth === false) {
          setPfNominationHoldHealthYes(false);
          setPfNominationHoldHealthNo(true);
        } else {
          setPfNominationHoldHealthYes(true);
          setPfNominationHoldHealthNo(false);
        }
      }
    }
  }, []);

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
          pfNominationHoldHealthYes,
          pfNominationHoldHealthNo,
          setPfNominationHoldHealthError
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
    const nextPage = props.NextStep;
    nextPage();
    e.preventDefault();

    const value = checkAllValidations();
    if (value === true) {
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

      // const nextPage = props.NextStep;
      // nextPage();
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
      {pfDetails !== null && pfDetails !== undefined ? (
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
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
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
                  disabled={disable}
                  onChange={(e) => changeHandler(e)}
                />
              </Form.Group>
            </Col>
            {!candidateId && (
              <Col sm={2}>
                <div>
                  <label>
                    Fill <a href="~/address">EPF Form</a> here
                  </label>
                </div>
              </Col>
            )}
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
                    disabled={disable}
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
                    disabled={disable}
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
                {pfNominationHoldHealthError ? (
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
                    checked={pfNominationHoldHealthYes}
                    required={required}
                    disabled={disable}
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
                    disabled={disable}
                    required={required}
                    onChange={handlePfNominationHoldHealthNoChange}
                  />
                  <label>No </label>
                </div>
              </Form.Group>
            </Col>
            {!candidateId && (
              <Col sm={2}>
                <div>
                  <label>
                    <a href="~/address">Add</a> Details here
                  </label>
                </div>
              </Col>
            )}
          </Row>
        </Form>
      ) : (
        <div className="text-center">No Data Found</div>
      )}
    </Fragment>
  );
};
export default EditPFDeclaration;
