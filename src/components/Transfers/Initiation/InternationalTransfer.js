import React, { useState, useContext, useEffect,useRef } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import { Typeahead } from "react-bootstrap-typeahead"; //Auto search
import { PromotionContext } from "../../../context/PromotionState";
import { PermissionContext } from "../../../context/PermissionState";


const InternationalTransfer = () => {
  const history = useHistory();
  const employeeRef = useRef(null);

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
  const {  employeeDetails,getEmployeeDetails} = useContext(PromotionContext);
  // console.log("employeeDetails",employeeDetails)
const { rolePermission } = useContext(PermissionContext);
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
  const [projectTerm, setProjectTerm] = useState(0);
  const [projectTermErrMsg, setProjectTermErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchEmpSelected, setSearchEmpSelected] = useState("");
  useEffect(() => {
   
    if (
      rolePermission === "admin"
    ){
     getEmployeeDetails(1);
    }
    else if (
      rolePermission === "superCostCenterManager"
    ){
     getEmployeeDetails(9);
    }
    else if (
      rolePermission === "costCenterManager"
    ){
     getEmployeeDetails(7);
    }
    else if (
      rolePermission === "manager"
    ){
     getEmployeeDetails(2);
    }
  
  }, [searchEmpSelected]);

  useEffect(() => {
    if (searchValue !== "") {
      getTransferInitiationEmpData(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (
      initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length > 0
    ) {
      setSearchInput(
        `${initiationEmpData.employeeName} ${initiationEmpData.currentEmployeeId}`
      );
    } else {
      setSearchInput("");
    }
  }, [initiationEmpData]);

  useEffect(() => {
    getCountryDetails();
    getDesignationDetails();
    getCostCentreDetails();
  }, []);

  // useEffect(() => {
  //   if (newCostCentre !== "") {
  //     getCostCentreManagersDetails(newCostCentre);
  //   }
  // }, [newCostCentre]);

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
        // promotedManagerId: newManager,
        promotedManagerName: newManager,
        promotedMonthlyBonus: newBonus,
        remark: null,
        status: 0,
        transferId: 0,
        transferLetter: null,
        transferType: transferType,
        isInsuranceCovered: countryInsurance,
        currency: newCurrency,
        promotedManagerEmailId: newMangerMailId,
        promotedTermOfProject:
          projectTerm !== "0"
            ? parseInt(projectTerm) <= 10
              ? projectTerm === "1"
                ? projectTerm + " Year"
                : projectTerm + " Years"
              : parseInt(projectTerm) / 10 + " Months"
            : null,
      };
      createTransferInitiation(initiationData,history);
    }
  }, [formValid]);

  useEffect(() => {
    initiationStatus === true ? setModalShow(true) : setModalShow(false);
  }, [initiationStatus]);

  // const searchInputHandler = (e) => {
  //   const searchText = employeeRef.current.getInput();
   
  // };

  const searchValueHandler = () => {
    const searchText = employeeRef.current.getInput();
    setSearchInput(searchText.value);
    setEmpErrMsg("");
    setSearchValue(searchText.value);
    
  };

  const countryChangeHandler = (e) => {
    setNewCountry(e.target.value);
    setNewCountryErrMsg("");
    if (
      countryDetails !== null &&
      countryDetails !== undefined &&
      Object.keys(countryDetails).length !== 0 &&
      e.target.value !== "" &&
      e.target.value !== null &&
      e.target.value !== undefined
    ) {
      const countryItem = countryDetails.find((dept) => {
        return dept.countryName === e.target.value;
      });
      if (
        countryItem !== null &&
        countryItem !== undefined &&
        Object.keys(countryItem).length !== 0 &&
        countryItem.currency !== "" &&
        countryItem.currency !== null &&
        countryItem.currency !== undefined
      ) {
        setNewCurrency(countryItem.currency);
      } else {
        setNewCurrency("");
      }
    } else {
      setNewCurrency("");
    }
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

  const changeEffectiveDateHandler = (Val) => {
    setEffectiveDate(Val);
    setEffectiveDateErrMsg("");
    let date = Val;
    console.log(date);

    if (date !== "" && date !== null && date !== undefined) {
      if (parseInt(projectTerm) <= 10) {
        var fullDate = new Date(
          date.setFullYear(date.getFullYear() + parseInt(projectTerm))
        );
        ChangeReturnDate(fullDate);
        fullDate = new Date(
          date.setFullYear(date.getFullYear() - parseInt(projectTerm))
        );
      } else {
        var fullDate = new Date(
          date.setMonth(date.getMonth() + parseInt(projectTerm) / 10)
        );
        ChangeReturnDate(fullDate);
        fullDate = new Date(
          date.setMonth(date.getMonth() - parseInt(projectTerm) / 10)
        );
      }
    } else {
      setReturnDate(new Date());
    }
  };
  const ChangeReturnDate = (date) => {
    setReturnDate(date);
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
    if (
      effectiveDate !== null &&
      effectiveDate !== undefined &&
      effectiveDate !== "" &&
      e.target.value !== "0"
    ) {
      if (parseInt(e.target.value) <= 10) {
        console.log("year->", e.target.value);
        setReturnDate(
          new Date(
            returnDate.setFullYear(
              effectiveDate.getFullYear() + parseInt(e.target.value)
            )
          )
        );
        setReturnDate(new Date(returnDate.setMonth(effectiveDate.getMonth())));
      } else {
        console.log("month->", parseInt(e.target.value) / 10);
        setReturnDate(
          new Date(returnDate.setFullYear(effectiveDate.getFullYear()))
        );
        setReturnDate(
          new Date(
            returnDate.setMonth(
              effectiveDate.getMonth() + parseInt(e.target.value) / 10
            )
          )
        );
      }
    } else {
      setReturnDate(new Date());
    }
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;
    const Valid = /^[0-9\b]+$/;

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

    if (
      effectiveDate === "" ||
      effectiveDate === undefined ||
      effectiveDate === null
    ) {
      validForm = false;
      setEffectiveDateErrMsg("Please enter onward date");
    }

    if (returnDate === "" || returnDate === undefined || returnDate === null) {
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
    const emailValid =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (newMangerMailId !== "") {
      if(emailValid.test(newMangerMailId) && newMangerMailId.includes("@decathlon.com")){
        validForm = true;
      setManagerMailIdErrMsg("");
      }else{
        validForm = false;
        setManagerMailIdErrMsg("Please enter decathlon email");
      } 
    }else{
      validForm = false;
      setManagerMailIdErrMsg("Please Enter manager Email");
    }

    if (newGross === "") {
      validForm = false;

      setNewGrossErrMsg("Please enter fixed gross");
      console.log("validForm", validForm);
    } else if (
      initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length !== 0 &&
      (initiationEmpData.currentContractType === "Fulltime" ||
        initiationEmpData.currentContractType === "fulltime")
    ) {
      if (Valid.test(newGross)) {
        if (parseInt(newGross) < 18000) {
          validForm = false;
          setNewGrossErrMsg("Value should be greater than 18000");
          console.log("validForm", validForm);
        }
      } else {
        validForm = false;
        setNewGrossErrMsg("Value should be number");
      }
    } else if (
      initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length !== 0 &&
      (initiationEmpData.currentContractType === "Parttime" ||
        initiationEmpData.currentContractType === "parttime")
    ) {
      if (Valid.test(newGross)) {
        if (parseInt(newGross) < 90 || parseInt(newGross) > 400) {
          validForm = false;
          setNewGrossErrMsg("Value should be between 90 - 400");
          console.log("validForm", validForm);
        }
      } else {
        validForm = false;
        setNewGrossErrMsg("Value should be number");
      }
    }

    if (newCurrency === "") {
      validForm = false;
      setNewCurrencyErrMsg("Please enter currency");
    }

    if (newBonus === "") {
      validForm = false;
      setNewBonusErrMsg("Please enter relocation bonus");
    } else if (newBonus.length > 2 || !Valid.test(newBonus)) {
      validForm = false;
      setNewBonusErrMsg("Please enter two digits figure");
    }

    if (projectTerm === "" || projectTerm === "0" || projectTerm === 0) {
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
              Transfer initiation details saved successfully, Admin has been
              notified
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
          {/* <Form.Control
            type="text"
            placeholder="search employee"
            value={searchInput}
            onChange={searchInputHandler}
          />
          <Search
            className="search-icon mr-1"
            style={{ color: "#313131" }}
            onClick={searchValueHandler}
          /> */}
                                      <Typeahead
                                        id="_empSearchId"
                                        filterBy={['firstName', 'lastName', 'employeeId']}
                                        minLength={2}
                                        ref={employeeRef}
                                        // labelKey='firstName'
                                        // onChange={searchInputHandler}
                                        options={employeeDetails}
                                        labelKey={option => `${option.firstName} ${option.lastName}`}
                                        placeholder="Search.."
                                        onChange={setSearchEmpSelected}
                                        selected={searchEmpSelected}
                                        style={
                                          empErrMsg
                                            ? { borderColor: "red" }
                                            : { borderRadius: "5px" }
                                        }
                                      />
                                     {searchEmpSelected.length > 0  ? (

                                    <Search
                                    className="search-icon mr-1"
                                    style={{ color: "#313131" }}
                                    onClick={searchValueHandler}
                                    />

                                    ) : (
                                    ""
                                    )}
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
                  <Col md={5}>Cost Center Name</Col>
                  <Col md={7} className="text-primary">
                    {initiationEmpData.currentCostCentre}
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationCostCentre">
                  <Form.Label column md={5}>
                    Cost center of the host country:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      type="text"
                      placeholder="New Cost Center"
                      value={newCostCentre}
                      className="text-primary"
                      onChange={changeCostCentreHandler}
                    ></Form.Control>

                    {costCentreErrMsg !== "" && (
                      <span className="text-danger">{costCentreErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationCountry">
                  <Form.Label column md={5}>
                    Country Moving To:
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
                      type="text"
                      placeholder="New Designation"
                      value={newDesignation}
                      className="text-primary"
                      onChange={designationChangeHandler}
                    ></Form.Control>

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
                <Form.Group as={Row} controlId="transferInitiationManager">
                  <Form.Label column md={5}>
                    Name of global mobility manager:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      type="text"
                      placeholder="New Manager"
                      value={newManager}
                      className="text-primary"
                      onChange={changeManagerHandler}
                    ></Form.Control>

                    {managerErrMsg !== "" && (
                      <span className="text-danger">{managerErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
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
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationProjectTerm">
                  <Form.Label column md={5}>
                    Term of the project:
                  </Form.Label>
                  <Col md={7}>
                    <Form.Control
                      as="select"
                      className="text-primary"
                      value={projectTerm}
                      placeholder="Select Location"
                      onChange={changeProjectTermHandler}
                    >
                      <option value="0">Select Term Of Project</option>
                      <option value="30">3 Months</option>
                      <option value="60">6 Months</option>
                      <option value="1">1 Year</option>
                      <option value="2">2 Years</option>
                      <option value="3">3 Years</option>
                      <option value="4">4 Years</option>
                      <option value="5">5 Years</option>
                    </Form.Control>

                    {projectTermErrMsg !== "" && (
                      <span className="text-danger">{projectTermErrMsg}</span>
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
                        minDate={moment().toDate()}
                        closeOnScroll={true}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => {
                          changeEffectiveDateHandler(date);
                        }}
                      />
                      {effectiveDateErrMsg !== "" && (
                        <span className="text-danger">
                          {effectiveDateErrMsg}
                        </span>
                      )}
                    </div>
                  </Col>
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
                        minDate={moment().toDate()}
                        closeOnScroll={true}
                        dateFormat="yyyy-MM-dd"
                        disabled={true}
                        onChange={(date) => {
                          changeReturnDateHandler(date);
                        }}
                      />
                      {returnDateErrMsg !== "" && (
                        <span className="text-danger">{returnDateErrMsg}</span>
                      )}
                    </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
           
            <Row className="my-3">
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
              <Col className="font-weight-bold">
                <u>Remuneration</u>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={4}>
                <Form.Group as={Row} controlId="transferInitiationCurrency">
                  <Form.Label column md={4}>
                    Currency:
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Currency"
                      value={newCurrency}
                      className="text-primary"
                      disabled={true}
                      onChange={changeCurrencyHandler}
                    ></Form.Control>
                    {newCurrencyErrMsg !== "" && (
                      <span className="text-danger">{newCurrencyErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
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
                <Form.Group as={Row} controlId="transferInitiationBonus">
                  <Form.Label column md={5}>
                    Bonus (%):
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
