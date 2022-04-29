import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import TransferInitationLetter from "./TransferInitiationLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory } from "react-router-dom";
import { BonusContext } from "../../../context/BonusState";

const EntityTransfer = () => {
  const {
    getTransferInitiationEmpData,
    initiationEmpData,
    getDepartmentDetails,
    deptDetails,
    getDeptPositionDetails,
    deptPositionData,
    getCostCentreDetails,
    costCentreData,
    getCostCentreManagersDetails,
    costCentreManagersData,
    getCostCentreLocationDetails,
    costCentreLocationData,
    createTransferInitiation,
    initiationStatus,
    initiationTransferId,
  } = useContext(TransferContext);
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);
  const [transferType, setTransferType] = useState("Entity Transfer");
  const [newEntity, setNewEntity] = useState("");
  const [newEntityErrMsg, setNewEntityErrMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empErrMsg, setEmpErrMsg] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newDeptName, setNewDeptName] = useState("");
  const [deptErrMsg, setDeptErrMsg] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [effectiveJoinigDate, setEffectiveJoinigDate] = useState(new Date());
  const [effectiveJoinigDateErrMsg, setEffectiveJoinigDateErrMsg] =
    useState("");
  const [newCostCentre, setNewCostCentre] = useState("");
  const [newGross, setNewGross] = useState("");
  const [grossErrMsg, setGrossErrMsg] = useState("");
  const [bonus, setBonus] = useState(0);
  const [costCentreErrMsg, setCostCentreErrMsg] = useState("");
  const [newManager, setNewManager] = useState("");
  const [managerErrMsg, setManagerErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showInitiationLetter, setShowInitiationLetter] = useState(false);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showLetterSubmitModal, setShowLetterSubmitModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (searchValue !== "") {
      getTransferInitiationEmpData(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (
      newEntity !== null &&
      newEntity !== "" &&
      newEntity !== undefined){
    getDepartmentDetails();
      }
  }, [newEntity]);

  useEffect(() => {
    if (newDept !== "") {
      getDeptPositionDetails(newDept);
    }
  }, [newDept]);

  useEffect(() => {
    if (
      newEntity !== null &&
      newEntity !== "" &&
      newEntity !== undefined &&
      newDeptName !== null &&
      newDeptName !== "" &&
      newDeptName !== undefined
    ) {
      getCostCentreDetails(newEntity, newDeptName);
    }
  }, [newEntity, newDeptName]);
  console.log("costCentreData", costCentreData);

  useEffect(() => {
    if (newCostCentre !== "") {
      getCostCentreManagersDetails(newCostCentre);
      getCostCentreLocationDetails(newCostCentre);
    }
  }, [newCostCentre]);

  useEffect(() => {
    if (
      initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length !== 0 &&
      initiationEmpData.currentDepartment !== "" &&
      initiationEmpData.currentDepartment !== null &&
      initiationEmpData.currentDepartment !== undefined &&
      initiationEmpData.currentPosition !== "" &&
      initiationEmpData.currentPosition !== null &&
      initiationEmpData.currentPosition !== undefined
    ) {
      viewBonusByContarctType(
        initiationEmpData.currentContractType,
        initiationEmpData.currentDepartment,
        initiationEmpData.currentPosition
      );
    }
  }, [initiationEmpData]);
  console.log("getBonusByContractType->", getBonusByContractType);
  useEffect(() => {
    if (
      getBonusByContractType !== null &&
      getBonusByContractType !== undefined &&
      Object.keys(getBonusByContractType).length !== 0
    ) {
      setBonus(getBonusByContractType.bonus);
    } else {
      setBonus(0);
    }
  }, [getBonusByContractType]);

  //   useEffect(() => {
  //     if (formValid === true) {
  //       const initiationData = {
  //         ...initiationEmpData,
  //         // promotedCostCentre: newCostCentre,
  //         // promotedDepartment: newDeptName,
  //         // promotedFixedGross: parseInt(newGross),
  //         // promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
  //         // promotedLocation: parseInt(newLocation),
  //         // promotedManagerId: newManager,
  //         // promotedPosition: newPositionName,
  //         // promotedMonthlyBonus:
  //         //   bonus !== "" && bonus !== null && bonus !== undefined
  //         //     ? parseInt(bonus)
  //         //     : 0,
  //         // promotedRelocationBonus: parseInt(relocationBonus),
  //         // status: 0,
  //         // transferId: 0,
  //         // transferType: transferType,
  //       };
  //       //   createTransferInitiation(initiationData);
  //     }
  //   }, [formValid]);

  useEffect(() => {
    initiationStatus === true ? setModalShow(true) : setModalShow(false);
  }, [initiationStatus]);

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

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    setEmpErrMsg("");
  };

  const searchValueHandler = () => {
    setSearchValue(searchInput);
  };

  const changeEntityHandler = (e) => {
    setNewEntity(e.target.value);
    setNewEntityErrMsg("");
  };

  const changeEffectiveDateHandler = (date) => {
    setEffectiveDate(date);
    setEffectiveDateErrMsg("");
  };
  const changeEffectiveDateHandler1 = (date) => {
    setEffectiveJoinigDate(date);
    setEffectiveJoinigDateErrMsg("");
  };

  const handleModalClose = () => {
    setModalShow(false);
    history.push("./transfers");
  };

  const addDigitalSignature = () => setShowSignature(true);

  const handleTransferLetterModalClose = () => {
    setShowInitiationLetter(false);
    setPreviewTransferLetter(true);
  };

  const showTransferLetterModal = (e) => {
    e.preventDefault();
    setShowInitiationLetter(true);
  };

  const submitfinalTransferLetter = (e) => {
    e.preventDefault();
    setLetterSent(true);
    setShowLetterSubmitModal(true);
  };

  const handleLetterSubmitModalClose = () => {
    setShowLetterSubmitModal(false);
  };
  const departmentChangeHandler = (e) => {
    setNewDept(e.target.value);
    setNewDeptName(e.target.options[e.target.selectedIndex].text);
    setDeptErrMsg("");
  };

  const changeCostCentreHandler = (e) => {
    setNewCostCentre(e.value);
    setCostCentreErrMsg("");
  };
  const changeManagerHandler = (e) => {
    setNewManager(e.target.value);
    setManagerErrMsg("");
  };
  const changeGrossHandler = (e) => {
    setNewGross(e.target.value);
    setGrossErrMsg("");
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;
    if (newDept === "") {
      validForm = false;
      setDeptErrMsg("Please enter employee id or employee name");
    }

    if (searchInput === "") {
      validForm = false;
      setEmpErrMsg("Please enter employee id or employee name");
    }

    if (newEntity === "") {
      validForm = false;
      setNewEntityErrMsg("Please select new entity");
    }
    if (newCostCentre === "") {
      validForm = false;
      setCostCentreErrMsg("Please select cost centre");
    }
    if (newManager === "") {
      validForm = false;
      setManagerErrMsg("Please select manager");
    }
    // if (newGross === "") {
    //   validForm = false;

    //   setGrossErrMsg("Please enter fixed gross");
    //   console.log("validForm", validForm);
    // } else if (
    //   initiationEmpData !== null &&
    //   initiationEmpData !== undefined &&
    //   Object.keys(initiationEmpData).length !== 0 &&
    //   (initiationEmpData.currentContractType === "Permanent" ||
    //     initiationEmpData.currentContractType === "permanent")
    // ) {
    //   if (parseInt(newGross) < 18000) {
    //     validForm = false;
    //     setGrossErrMsg("Value should be greater than 18000");
    //     console.log("validForm", validForm);
    //   } else {
    //     console.log("elseee");
    //   }
    // } else if (
    //   initiationEmpData !== null &&
    //   initiationEmpData !== undefined &&
    //   Object.keys(initiationEmpData).length !== 0 &&
    //   (initiationEmpData.currentContractType === "Parttime" ||
    //     initiationEmpData.currentContractType === "parttime")
    // ) {
    //   if (parseInt(newGross) < 90 || parseInt(newGross) > 200) {
    //     setGrossErrMsg("Value should be between 90 - 200");
    //     console.log("validForm", validForm);
    //   }
    // }

    if (
      effectiveDate === "" ||
      effectiveDate === undefined ||
      effectiveDate === null
    ) {
      validForm = false;
      setEffectiveDateErrMsg("Please enter effective date");
    }
    if (
      effectiveJoinigDate === "" ||
      effectiveJoinigDate === undefined ||
      effectiveJoinigDate === null
    ) {
      validForm = false;
      setEffectiveJoinigDate("Please enter effective date");
    }

    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
    if (validFormRes === true) {
      const InfoData = {
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
        promotedCompany:
          newEntity.toLowerCase() === "dsi"
            ? "Decathlon Sports India Pvt Ltd"
            : newEntity.toLowerCase() === "prodin"
            ? "Prodin Sporting Pvt Ltd"
            : newEntity.toLowerCase() === "indeca"
            ? "Indeca Sporting Goods Pvt Ltd"
            : newEntity,
        promotedContractType: initiationEmpData.promotedContractType,
        promotedCostCentre: newCostCentre,
        promotedCountry: initiationEmpData.promotedCountry,
        promotedDateOfReturn: initiationEmpData.promotedDateOfReturn,
        promotedDepartment: newDeptName,
        promotedDesignation: initiationEmpData.promotedDesignation,
        promotedEmployeeId: initiationEmpData.promotedEmployeeId,
        promotedFixedGross: initiationEmpData.promotedFixedGross,
        promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
        promotedLocation: initiationEmpData.promotedLocation,
        promotedManagerId: newManager,
        promotedMonthlyBonus:
          bonus !== "" && bonus !== null && bonus !== undefined
            ? parseInt(bonus)
            : 0,
        promotedPosition: initiationEmpData.promotedPosition,
        promotedRelocationBonus: initiationEmpData.promotedRelocationBonus,
        promotedTermOfProject: initiationEmpData.promotedTermOfProject,
        remark: null,
        status: 0,
        transferId: 0,
        transferLetter: null,
        transferType: transferType,
      };
      console.log(InfoData);
      createTransferInitiation(InfoData);
      setFormValid(true);
      // setModalShow(true);
    }
  };

  return (
    <div className="transfer-initiation">
      <ToastContainer />
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Transfer initiation details saved successfully, manager has been
              notified
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal
        show={showInitiationLetter}
        onHide={handleTransferLetterModalClose}
        size="md"
        centered
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          <TransferInitationLetter transferId={initiationTransferId} />
          <br></br>
          <Row>
            {showSignature ? (
              <>
                <br></br>
                <img
                  src={calendarImage}
                  alt="calendar"
                  width="50px"
                  className="digital-signature"
                />
              </>
            ) : (
              <>
                <br></br>
                <button
                  className={"stepperButtons"}
                  onClick={addDigitalSignature}
                >
                  Add digital signature
                </button>
              </>
            )}
          </Row>
          {showSignature && !previewTransferLetter && (
            <Row>
              <Col sm={{ span: 5, offset: 4 }}>
                <br></br>
                <br></br>
                <Button
                  variant="primary"
                  onClick={handleTransferLetterModalClose}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showLetterSubmitModal}
        onHide={handleLetterSubmitModalClose}
        size="md"
        centered
      >
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Transfer Initiation letter generated successfully!
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleLetterSubmitModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Form>
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
            {empErrMsg !== "" && (
              <span className="text-danger">{empErrMsg}</span>
            )}
          </Col>
        </Form.Group>
        {
          // searchValue !== "" &&
          initiationEmpData !== null &&
          initiationEmpData !== undefined &&
          Object.keys(initiationEmpData).length > 0 ? (
            <div className="mt-5 mr-5">
              <Row className="mb-4">
                <Col
                  md={{ span: 4, offset: 2 }}
                  className="font-weight-bold my-2"
                >
                  Current
                </Col>
                <Col
                  md={{ span: 3, offset: 2 }}
                  className="font-weight-bold my-2"
                >
                  New
                </Col>
              </Row>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationPosition"
              >
                <Col md={2}>
                  <Form.Label>Entity:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  {initiationEmpData.currentCompany}
                </Col>
                <Col md={2}>
                  <Form.Label>Entity:</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="transferInitiationPosition"
                    value={newEntity}
                    placeholder="Select Position"
                    onChange={changeEntityHandler}
                  >
                    <option value="">Select New Entity</option>

                    {initiationEmpData !== null &&
                    initiationEmpData !== undefined &&
                    Object.keys(initiationEmpData).length !== 0 &&
                    (initiationEmpData.currentCompany.charAt(0) === "D" ||
                      initiationEmpData.currentCompany.charAt(0) === "d") ? (
                      ""
                    ) : (
                      <option value="DSI">DSI</option>
                    )}
                    {initiationEmpData !== null &&
                    initiationEmpData !== undefined &&
                    Object.keys(initiationEmpData).length !== 0 &&
                    (initiationEmpData.currentCompany.charAt(0) === "I" ||
                      initiationEmpData.currentCompany.charAt(0) === "i") ? (
                      ""
                    ) : (
                      <option value="Indeca Sporting Goods Pvt Ltd">INDECA</option>
                    )}
                    {initiationEmpData !== null &&
                    initiationEmpData !== undefined &&
                    Object.keys(initiationEmpData).length !== 0 &&
                    (initiationEmpData.currentCompany.charAt(0) === "P" ||
                      initiationEmpData.currentCompany.charAt(0) === "p") ? (
                      ""
                    ) : (
                      <option value="Prodin Sporting Pvt Ltd">PRODIN</option>
                    )}
                  </Form.Control>
                  {newEntityErrMsg !== "" && (
                    <span className="text-danger">{newEntityErrMsg}</span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationDept"
              >
                <Col md={2}>
                  <Form.Label>Department:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  {initiationEmpData.currentDepartment}
                </Col>
                <Col md={2}>
                  <Form.Label>Department:</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    as="select"
                    className="text-primary"
                    aria-label="transferInitiationDept"
                    value={newDept}
                    placeholder="Select Department"
                    onChange={departmentChangeHandler}
                  >
                    <option>Select Department</option>
                    {deptDetails !== null &&
                      deptDetails !== undefined &&
                      deptDetails.length > 0 &&
                      deptDetails.map((item) => {
                        return (
                          <option
                            key={`dept_${item.deptId}`}
                            value={item.deptId}
                          >
                            {item.departmentName}
                          </option>
                        );
                      })}
                  </Form.Control>
                  {deptErrMsg !== "" && (
                    <span className="text-danger">{deptErrMsg}</span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationDept"
              >
                <Col md={2}>
                  <Form.Label>Cost Center:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  {initiationEmpData.currentCostCentre}
                </Col>
                <Col md={2}>
                  <Form.Label>Cost Center:</Form.Label>
                </Col>
                <Col md={4}>
                  {/* <Form.Control
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
                  </Form.Control> */}
                  <Select
                  name="filters"
                  as="select"
                  defaultValue={newCostCentre}
                  className="text-primary"
                  aria-label="transferInitiationCostCentre"
                  placeholder="Select Cost Center"
                  onChange={changeCostCentreHandler}
                  // isDisabled={
                  //   costCentreNoChange || newDeptName === "" ? true : false
                  // }
                  options={
                    costCentreData !== null
                      ? costCentreData.map((item) => ({
                          key: `cost_centre_${item.costCentreName}`,
                          label: item.costCentreName,
                          value: item.costCentreName,
                        }))
                      : []
                  }
                  required
                  isSearchable
                />
                  {costCentreErrMsg !== "" && (
                    <span className="text-danger">{costCentreErrMsg}</span>
                  )}
                </Col>
                {/* <Col md={2}>
                  <Form.Label>Contract Type:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  {initiationEmpData.currentContractType}
                </Col> */}
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationPosition"
              >
                <Col md={2}>
                  <Form.Label>Manager:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  {initiationEmpData.currentManagerName}
                </Col>
                <Col md={2}>
                  <Form.Label> Manager:</Form.Label>
                </Col>
                <Col md={4}>
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
                          >{`${item.firstName} ${item.lastName}`}</option>
                        );
                      })}
                  </Form.Control>
                  {managerErrMsg !== "" && (
                    <span className="text-danger">{managerErrMsg}</span>
                  )}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationCostCentre"
              >
                <Col md={2}>
                  <Form.Label> Fixed Gross:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  {initiationEmpData.currentFixedGross}
                </Col>
                {/* <Col md={2}>
                  <Form.Label> Fixed Gross:</Form.Label>
                </Col>
                {initiationEmpData.promotedFixedGross ? (
                  <Col md={3} className="text-primary">
                    {initiationEmpData.promotedFixedGross}
                  </Col>
                ) : (
                  <Col md={4} className="text-primary">
                    <Form.Control
                      type="text"
                      placeholder="New Fixed Gross"
                      value={newGross}
                      className="text-primary"
                      onChange={changeGrossHandler}
                    ></Form.Control>
                    {grossErrMsg !== "" && (
                      <span className="text-danger">{grossErrMsg}</span>
                    )}
                  </Col>
                )} */}
              </Form.Group>
              <Row style={{ marginTop: "3rem" }}></Row>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationCostCentre"
              >
                <Col md={2}>
                  <Form.Label>Bonus:</Form.Label>
                </Col>
                <Col md={4} className="text-primary">
                  <Form.Control
                    type="text"
                    placeholder="Bonus"
                    value={bonus}
                    className="text-primary"
                    id="transferInitiationBonusPercent"
                    // onChange={changeBonusHandler}
                    disabled={true}
                  ></Form.Control>
                </Col>
                <Col md={2}>
                  <Form.Label>Effective Date:</Form.Label>
                </Col>
                <Col md={4}>
                  <div className="transfers-date">
                    <DatePicker
                      className="text-primary form-control"
                      selected={effectiveDate}
                      closeOnScroll={true}
                      minDate={moment().toDate()}
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) => {
                        changeEffectiveDateHandler(date);
                      }}
                    />
                  </div>
                  {effectiveDateErrMsg !== "" && (
                    <span className="text-danger">{effectiveDateErrMsg}</span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transferInitiationCostCentre"
              >
                <Col md={2}>
                  <Form.Label>Date Of Joining The Group:</Form.Label>
                </Col>
                <Col md={4}>
                  <div className="transfers-date">
                    <DatePicker
                      className="text-primary form-control"
                      selected={
                        initiationEmpData !== null &&
                        initiationEmpData !== undefined &&
                        Object.keys(initiationEmpData).length !== 0
                          ? new Date(initiationEmpData.currentJoiningDate)
                          : new Date()
                      }
                      closeOnScroll={true}
                      minDate={moment().toDate()}
                      dateFormat="yyyy-MM-dd"
                      disabled={true}
                      onChange={(date) => {
                        changeEffectiveDateHandler1(date);
                      }}
                    />
                  </div>
                  {effectiveJoinigDateErrMsg !== "" && (
                    <span className="text-danger">
                      {effectiveJoinigDateErrMsg}
                    </span>
                  )}
                </Col>
              </Form.Group>
              <Row>
                <Col
                  style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    textAlign: "center",
                  }}
                >
                  <button
                    disabled={formValid}
                    className={formValid ? "confirmButton" : "stepperButtons"}
                    onClick={submitHandler}
                  >
                    Save
                  </button>
                  {/* {searchValue !== "" && initiationStatus && (
                    <button
                      className={"LettersButtons"}
                      onClick={showTransferLetterModal}
                    >
                      {previewTransferLetter
                        ? "Preview Transfer Letter"
                        : "Generate Transfer Letter"}
                    </button>
                  )} */}

                  {/* {searchValue !== "" &&
                    initiationStatus &&
                    previewTransferLetter && (
                      <div className="preview-section">
                        <br></br>
                        <br></br>
                        <img src={calendarImage} alt="calendar" width="200px" />
                        <br></br>
                        <button
                          disabled={letterSent}
                          className={
                            letterSent ? "confirmButton" : "stepperButtons"
                          }
                          onClick={submitfinalTransferLetter}
                        >
                          Submit
                        </button>
                      </div>
                    )} */}
                </Col>
              </Row>
            </div>
          ) : (
            ""
          )
        }
      </Form>
      {/* </div>
              </Container>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default EntityTransfer;
