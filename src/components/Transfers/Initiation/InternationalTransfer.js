import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";

const InternationalTransfer = () => {
  const history = useHistory();
  const {
    getTransferInitiationEmpData,
    initiationEmpData,
    createTransferInitiation,
    initiationStatus,
    getCountryDetails,
    countryDetails,
    getDesignationDetails,
    designationDetails,
    getCostCentreDetails,
    costCentreData,
    getCostCentreManagersDetails,
    costCentreManagersData,
  } = useContext(TransferContext);
  const transferType = "International Transfer";
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empErrMsg, setEmpErrMsg] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newCountryErrMsg, setNewCountryErrMsg] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newDesignationErrMsg, setNewDesignationErrMsg] = useState("");
  const [newGross, setNewGross] = useState("");
  const [newGrossErrMsg, setNewGrossErrMsg] = useState("");
  const [newBonus, setNewBonus] = useState("");
  const [newBonusErrMsg, setNewBonusErrMsg] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [returnDate, setReturnDate] = useState(new Date());
  const [returnDateErrMsg, setReturnDateErrMsg] = useState("");
  const [newCostCentre, setNewCostCentre] = useState("");
  const [costCentreErrMsg, setCostCentreErrMsg] = useState("");
  const [newManager, setNewManager] = useState("");
  const [managerErrMsg, setManagerErrMsg] = useState("");
  const [newMangerMailId, setNewMangerMailId] = useState("");
  const [managerMailIdErrMsg, setManagerMailIdErrMsg] = useState("");
  const [newCurrency, setNewCurrency] = useState("");
  const [newCurrencyErrMsg, setNewCurrencyErrMsg] = useState("");
  const [countryInsurance, setCountryInsurance] = useState(false);
  const [projectTerm, setProjectTerm] = useState("");
  const [projectTermErrMsg, setProjectTermErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (searchValue !== "") {
      getTransferInitiationEmpData(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length > 0 &&
      setSearchInput(
        `${initiationEmpData.employeeName} ${initiationEmpData.currentEmployeeId}`
      );
  }, [initiationEmpData]);

  useEffect(() => {
    getCountryDetails();
    getDesignationDetails();
    getCostCentreDetails();
  }, []);

  useEffect(() => {
    if (newCostCentre !== "") {
      getCostCentreManagersDetails(newCostCentre);
    }
  }, [newCostCentre]);

  useEffect(() => {
    if (formValid === true) {
      const initiationData = {
        currentCompany: initiationEmpData.currentCompany,
        currentContractType: initiationEmpData.currentContractType,
        currentCostCentre: initiationEmpData.currentCostCentre,
        currentCountry: initiationEmpData.currentCountry,
        currentDepartment: initiationEmpData.currentDepartment,
        currentDesignation: initiationEmpData.currentDesignation,
        currentEmployeeId: initiationEmpData.currentEmployeeId,
        currentFixedGross: initiationEmpData.currentFixedGross,
        currentJoiningDate: initiationEmpData.currentJoiningDate,
        currentLocation: initiationEmpData.currentLocation,
        currentManagerId: initiationEmpData.currentManagerId,
        currentMonthlyBonus: initiationEmpData.currentMonthlyBonus,
        currentPosition: initiationEmpData.currentPosition,
        promotedCostCentre: newCostCentre,
        promotedCountry: newCountry,
        promotedDateOfReturn: moment(returnDate).format("YYYY-MM-DD"),
        promotedDesignation: newDesignation,
        promotedFixedGross: newGross,
        promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
        promotedManagerId: newManager,
        promotedMonthlyBonus: newBonus,
        remark: null,
        status: 0,
        transferId: 0,
        transferLetter: null,
        transferType: transferType,
        isInsuranceCovered: countryInsurance,
        currency: newCurrency,
        promotedManagerEmailId: newMangerMailId,
        promotedTermOfProject: projectTerm,
      };
      createTransferInitiation(initiationData);
    }
  }, [formValid]);

  useEffect(() => {
    initiationStatus === true ? setModalShow(true) : setModalShow(false);
  }, [initiationStatus]);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    setEmpErrMsg("");
  };

  const searchValueHandler = () => {
    setSearchValue(searchInput);
  };

  const countryChangeHandler = (e) => {
    setNewCountry(e.target.value);
    setNewCountryErrMsg("");
  };

  const designationChangeHandler = (e) => {
    setNewDesignation(e.target.value);
    setNewDesignationErrMsg("");
  };

  const changeGrossHandler = (e) => {
    setNewGross(e.target.value);
    setNewGrossErrMsg("");
  };

  const changeBonusHandler = (e) => {
    setNewBonus(e.target.value);
    setNewBonusErrMsg("");
  };

  const changeEffectiveDateHandler = (date) => {
    setEffectiveDate(date);
    setEffectiveDateErrMsg("");
  };

  const changeReturnDateHandler = (date) => {
    setReturnDate(date);
    setReturnDateErrMsg("");
  };

  const changeCostCentreHandler = (e) => {
    setNewCostCentre(e.target.value);
    setCostCentreErrMsg("");
  };

  const changeManagerHandler = (e) => {
    setNewManager(e.target.value);
    setNewMangerMailId(e.target.dataset.email);
    setManagerErrMsg("");
  };

  const changeMangerMailIdHandler = (e) => {
    setNewMangerMailId(e.target.value);
    setManagerMailIdErrMsg("");
  };

  const countryInsuranceHandler = (e) => {
    e.target.value === "Yes"
      ? setCountryInsurance(true)
      : setCountryInsurance(false);
  };

  const changeCurrencyHandler = (e) => {
    setNewCurrency(e.target.value);
    setNewCurrencyErrMsg("");
  };

  const changeProjectTermHandler = (e) => {
    setProjectTerm(e.target.value);
    setProjectTermErrMsg("");
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;

    if (searchInput === "") {
      validForm = false;
      setEmpErrMsg("Please enter employee id");
    }

    if (newCountry === "") {
      validForm = false;
      setNewCountryErrMsg("Please select country");
    }

    if (newDesignation === "") {
      validForm = false;
      setNewDesignationErrMsg("Please select designation");
    }

    if (effectiveDate === "") {
      validForm = false;
      setEffectiveDateErrMsg("Please enter onward date");
    }

    if (returnDate === "") {
      validForm = false;
      setReturnDateErrMsg("Please enter return date");
    }

    if (newCostCentre === "") {
      validForm = false;
      setCostCentreErrMsg("Please select cost centre");
    }

    if (newManager === "") {
      validForm = false;
      setManagerErrMsg("Please select manager");
    }

    if (newMangerMailId === "") {
      validForm = false;
      setManagerMailIdErrMsg("Please enter manager email");
    }

    if (newGross === "") {
      validForm = false;
      setNewGrossErrMsg("Please enter fixed gross");
    }

    if (newCurrency === "") {
      validForm = false;
      setNewCurrencyErrMsg("Please enter currency");
    }

    if (newBonus === "") {
      validForm = false;
      setNewBonusErrMsg("Please enter bonus");
    }

    if (projectTerm === "") {
      validForm = false;
      setProjectTermErrMsg("Please enter project term");
    }

    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
    if (validFormRes === true) {
      setFormValid(true);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
    history.push("../transfers");
  };

  return (
    <div className="transfer-initiation">
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Tansfer Initiation done successfully!
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Form.Group as={Row} className="mb-3" controlId="employeeType">
        <Form.Label column md={2}>
          Employee Name
        </Form.Label>
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="search employee"
            value={searchInput}
            onChange={searchInputHandler}
          />
          <Search
            className="search-icon mr-1"
            style={{ color: "#313131" }}
            onClick={searchValueHandler}
          />
          {empErrMsg !== "" && <span className="text-danger">{empErrMsg}</span>}
        </Col>
      </Form.Group>
      {initiationEmpData !== null &&
        initiationEmpData !== undefined &&
        Object.keys(initiationEmpData).length > 0 && (
          <div className="int-transfer-initiation mt-5 mr-5">
            <Row className="mb-3">
              <Col md={6}>
                <Row>
                  <Col md={5}>Cost Centre Name</Col>
                  <Col md={7} className="text-primary">
                    {initiationEmpData.currentCostCentre}
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={5}>Contract Type:</Col>
                  <Col md={7} className="text-primary">
                    {initiationEmpData.currentContractType}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationCountry">
                  <Form.Label column md={5}>
                    Coutry Moving To:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      as="select"
                      className="text-primary"
                      aria-label="transferInitiationCountry"
                      value={newCountry}
                      placeholder="Select Country"
                      onChange={countryChangeHandler}
                    >
                      <option>Select Country</option>
                      {countryDetails !== null &&
                        countryDetails !== undefined &&
                        countryDetails.length > 0 &&
                        countryDetails.map((item) => {
                          return (
                            <option
                              key={`country_${item.countryId}`}
                              value={item.countryName}
                            >
                              {item.countryName}
                            </option>
                          );
                        })}
                    </Form.Control>
                    {newCountryErrMsg !== "" && (
                      <span className="text-danger">{newCountryErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationDesignation">
                  <Form.Label column md={5}>
                    Designation:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      as="select"
                      className="text-primary"
                      aria-label="transferInitiationDesignation"
                      value={newDesignation}
                      placeholder="Select Designation"
                      onChange={designationChangeHandler}
                    >
                      <option>Select Designation</option>
                      {designationDetails !== null &&
                        designationDetails !== undefined &&
                        designationDetails.length > 0 &&
                        designationDetails.map((item) => {
                          return (
                            <option
                              key={`design_${item.designationId}`}
                              value={item.designation}
                            >
                              {item.designation}
                            </option>
                          );
                        })}
                    </Form.Control>
                    {newDesignationErrMsg !== "" && (
                      <span className="text-danger">
                        {newDesignationErrMsg}
                      </span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group
                  as={Row}
                  controlId="transferInitiationEffectiveDate"
                >
                  <Form.Label column md={5}>
                    Onward Date:
                  </Form.Label>
                  <Col md={7}>
                    <div className="transfers-date">
                      <DatePicker
                        className="text-primary form-control"
                        selected={effectiveDate}
                        minDate={effectiveDate}
                        closeOnScroll={true}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => {
                          changeEffectiveDateHandler(date);
                        }}
                      />
                    </div>
                  </Col>
                  {effectiveDateErrMsg !== "" && (
                    <span className="text-danger">{effectiveDateErrMsg}</span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationReturnDate">
                  <Form.Label column md={5}>
                    Return Date:
                  </Form.Label>
                  <Col md={7}>
                    <div className="transfers-date">
                      <DatePicker
                        className="text-primary form-control"
                        selected={returnDate}
                        minDate={returnDate}
                        closeOnScroll={true}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => {
                          changeReturnDateHandler(date);
                        }}
                      />
                    </div>
                  </Col>
                  {returnDateErrMsg !== "" && (
                    <span className="text-danger">{returnDateErrMsg}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationCostCentre">
                  <Form.Label column md={5}>
                    Cost centre of the host country:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      as="select"
                      className="text-primary"
                      aria-label="transferInitiationCostCentre"
                      value={newCostCentre}
                      placeholder="Select Cost Centre"
                      onChange={changeCostCentreHandler}
                    >
                      <option>Select Cost Centre</option>
                      {costCentreData !== null &&
                        costCentreData !== undefined &&
                        costCentreData.length > 0 &&
                        costCentreData.map((item) => {
                          return (
                            <option
                              key={`cost_centre_${item.costCentreName}`}
                              value={item.costCentreName}
                            >
                              {item.costCentreName}
                            </option>
                          );
                        })}
                    </Form.Control>
                    {costCentreErrMsg !== "" && (
                      <span className="text-danger">{costCentreErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationManager">
                  <Form.Label column md={5}>
                    Name of global mobility manager:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      as="select"
                      className="text-primary"
                      aria-label="transferInitiationManager"
                      value={newManager}
                      placeholder="Select Manager"
                      onChange={changeManagerHandler}
                    >
                      <option>Select Manager</option>
                      {costCentreManagersData !== null &&
                        costCentreManagersData !== undefined &&
                        costCentreManagersData.length !== 0 &&
                        costCentreManagersData.map((item) => {
                          return (
                            <option
                              key={`manager_${item.employeeId}`}
                              value={item.employeeId}
                              data-email={item.email}
                            >{`${item.firstName} ${item.lastName}`}</option>
                          );
                        })}
                    </Form.Control>
                    {managerErrMsg !== "" && (
                      <span className="text-danger">{managerErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group
                  as={Row}
                  controlId="transferInitiationManagerMailId"
                >
                  <Form.Label column md={5}>
                    Email id of global mobility manager:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      type="text"
                      aria-label="transferInitiationManagerMailId"
                      placeholder="Email Id"
                      value={newMangerMailId}
                      className="text-primary"
                      onChange={changeMangerMailIdHandler}
                    ></Form.Control>
                    {managerMailIdErrMsg !== "" && (
                      <span className="text-danger">{managerMailIdErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={7}>
                    Are you covered under insurance in host country?
                  </Col>
                  <Col md={5} key="inline-checkbox">
                    <Form.Check inline type="checkbox">
                      <Form.Check.Input
                        type="checkbox"
                        name="insurence"
                        value="Yes"
                        id="insurence_yes"
                        className="largerCheckbox border-primary"
                        checked={countryInsurance === true ? true : false}
                        onChange={countryInsuranceHandler}
                      />
                      <Form.Check.Label className="text-primary">
                        Yes
                      </Form.Check.Label>
                    </Form.Check>
                    <Form.Check inline type="checkbox">
                      <Form.Check.Input
                        type="checkbox"
                        name="insurence"
                        value="No"
                        id="insurence_no"
                        className="largerCheckbox border-primary"
                        checked={countryInsurance === false ? true : false}
                        onChange={countryInsuranceHandler}
                      />
                      <Form.Check.Label className="text-primary">
                        No
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationProjectTerm">
                  <Form.Label column md={5}>
                    Term of the project:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      type="text"
                      placeholder="Project term"
                      value={projectTerm}
                      className="text-primary"
                      onChange={changeProjectTermHandler}
                    ></Form.Control>
                    {projectTermErrMsg !== "" && (
                      <span className="text-danger">{projectTermErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="font-weight-bold">Renumeration</Col>
            </Row>
            <Row className="my-3">
              <Col md={4}>
                <Form.Group as={Row} controlId="transferInitiationGrossPay">
                  <Form.Label column md={4}>
                    Fixed Gross:
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Gross Pay"
                      value={newGross}
                      className="text-primary"
                      onChange={changeGrossHandler}
                    ></Form.Control>
                    {newGrossErrMsg !== "" && (
                      <span className="text-danger">{newGrossErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group as={Row} controlId="transferInitiationCurrency">
                  <Form.Label column md={4}>
                    Different Currency:
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Currency"
                      value={newCurrency}
                      className="text-primary"
                      onChange={changeCurrencyHandler}
                    ></Form.Control>
                    {newCurrencyErrMsg !== "" && (
                      <span className="text-danger">{newCurrencyErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group as={Row} controlId="transferInitiationBonus">
                  <Form.Label column md={5}>
                    Bonus:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      type="text"
                      placeholder="Bonus"
                      value={newBonus}
                      className="text-primary"
                      onChange={changeBonusHandler}
                    ></Form.Control>
                    {newBonusErrMsg !== "" && (
                      <span className="text-danger">{newBonusErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-5">
              <Col className="text-center mr-5">
                <button
                  disabled={formValid}
                  className={`${
                    formValid ? "confirmButton" : "stepperButtons"
                  } ml-0`}
                  onClick={submitHandler}
                >
                  Save
                </button>
              </Col>
            </Row>
          </div>
        )}
    </div>
  );
};

export default InternationalTransfer;
