import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button, Modal, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { InsuranceContext } from "../../context/InsuranceState";
import LoaderIcon from "../Loader/LoaderIcon";

const InsuranceForm = (props) => {
  const history = useHistory();
  const {
    changeActionStatus,
    actionStatus,
    getInsuranceNominationDetails,
    insuranceDetails,
    loader,
    createInsuranceNomination,
    getRange,
    yearRange,
  } = useContext(InsuranceContext);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState({
    value: "",
    errMsg: "",
  });
  const [insuredSum, setInsuredSum] = useState({
    value: "",
    errMsg: "",
  });
  const [premiumAmount, setPremiumAmount] = useState({
    value: "",
    errMsg: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    changeActionStatus();
    getRange(currentYear, currentYear + 10, 1);
  }, []);

  useEffect(() => {
    if (
      props.insuranceNominationId !== null &&
      props.insuranceNominationId !== undefined
    ) {
      getInsuranceNominationDetails(props.insuranceNominationId);
    }
  }, [props.insuranceNominationId]);

  useEffect(() => {
    if (
      props.type !== "add" &&
      insuranceDetails !== null &&
      insuranceDetails !== undefined &&
      Object.keys(insuranceDetails).length > 0
    ) {
      setYear({
        ...year,
        value: insuranceDetails.year,
      });
      setInsuredSum({
        ...insuredSum,
        value: insuranceDetails.sum,
      });
      setPremiumAmount({
        ...premiumAmount,
        value: insuranceDetails.premiumAmt,
      });
    }
  }, [insuranceDetails]);

  useEffect(() => {
    if (formValid === true) {
      const apiInfo = {
        year: parseInt(year.value),
        sum: parseInt(insuredSum.value),
        premiumAmt: parseInt(premiumAmount.value),
        insuranceNominationId:
          props.type === "add" ? 0 : insuranceDetails.insuranceNominationId,
        status: props.type === "add" ? 0 : insuranceDetails.status,
      };
      createInsuranceNomination(apiInfo);
    }
  }, [formValid]);

  useEffect(() => {
    actionStatus === true ? setModalShow(true) : setModalShow(false);
  }, [actionStatus]);

  const handleModalClose = () => {
    setModalShow(false);
    history.push("/master/insurance");
  };

  const changeYearHandler = (e) => {
    setYear({
      ...year,
      value: e.target.value,
      errMsg: "",
    });
  };

  const changeInsuredSumHandler = (e) => {
    setInsuredSum({
      ...insuredSum,
      value: e.target.value,
      errMsg: "",
    });
  };

  const changePremiumAmountHandler = (e) => {
    setPremiumAmount({
      ...premiumAmount,
      value: e.target.value,
      errMsg: "",
    });
  };

  const checkValidation = () => {
    let validForm = true;

    if (year.value === "") {
      validForm = false;
      setYear({
        ...year,
        errMsg: "Please select year",
      });
    }

    if (insuredSum.value === "") {
      validForm = false;
      setInsuredSum({
        ...insuredSum,
        errMsg: "Please enter insured sum",
      });
    }

    if (premiumAmount.value === "") {
      validForm = false;
      setPremiumAmount({
        ...premiumAmount,
        errMsg: "Please enter premium amount",
      });
    }
    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validForm = checkValidation();
    if (validForm === true) {
      setFormValid(true);
    }
  };

  const viewStyles = {
    marginLeft: "30%",
  };

  return (
    <div className="insurance-form m-5">
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {props.type === "add"
                ? "Insurance nomination added successfully!"
                : "Insurance nomination updated successfully!"}
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      {loader ? (
        <LoaderIcon />
      ) : (
        <Form style={props.type === "view" ? viewStyles : {}}>
          <Form.Group as={Row} className="mb-4" controlId="insuranceYear">
            <Form.Label column sm={props.type === "view" ? 4 : 3}>
              Year
            </Form.Label>
            <Col sm={props.type === "view" ? 3 : 6}>
              {props.type === "view" ? (
                <div className="text-primary pt-2">{year.value}</div>
              ) : (
                <Form.Control
                  as="select"
                  className="text-primary"
                  aria-label="insuranceYear"
                  value={year.value}
                  placeholder="Select Year"
                  onChange={changeYearHandler}
                >
                  <option>Select Year</option>
                  {yearRange.length > 0 &&
                    yearRange.map((item) => <option key={item}>{item}</option>)}
                </Form.Control>
              )}
              {year.errMsg !== "" && (
                <div className="text-danger">{year.errMsg}</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4" controlId="insuranceSum">
            <Form.Label column sm={props.type === "view" ? 4 : 3}>
              Sum to be insured
            </Form.Label>
            <Col sm={props.type === "view" ? 3 : 6}>
              {props.type === "view" ? (
                <div className="text-primary pt-2">{insuredSum.value}</div>
              ) : (
                <Form.Control
                  type="number"
                  className="text-primary"
                  aria-label="insuranceSum"
                  value={insuredSum.value}
                  placeholder="Insured Sum"
                  onChange={changeInsuredSumHandler}
                ></Form.Control>
              )}
              {insuredSum.errMsg !== "" && (
                <div className="text-danger">{insuredSum.errMsg}</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-4"
            controlId="insurancePremiumAmount"
          >
            <Form.Label column sm={props.type === "view" ? 4 : 3}>
              Premium Amount
            </Form.Label>
            <Col sm={props.type === "view" ? 3 : 6}>
              {props.type === "view" ? (
                <div className="text-primary pt-2">{premiumAmount.value}</div>
              ) : (
                <Form.Control
                  type="number"
                  className="text-primary"
                  aria-label="insurancePremiumAmount"
                  value={premiumAmount.value}
                  placeholder="Premium Amount"
                  onChange={changePremiumAmountHandler}
                ></Form.Control>
              )}
              {premiumAmount.errMsg !== "" && (
                <div className="text-danger">{premiumAmount.errMsg}</div>
              )}
            </Col>
          </Form.Group>
          {props.type !== "view" && (
            <Row className="mt-5">
              <Col className="text-center">
                <Button
                  type="button"
                  className="px-4"
                  onClick={submitHandler}
                  disabled={formValid}
                >
                  Save
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      )}
    </div>
  );
};

export default InsuranceForm;
