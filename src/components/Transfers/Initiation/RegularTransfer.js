import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import TransferInitationLetter from "./TransferInitiationLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory } from "react-router-dom";
import { BonusContext } from "../../../context/BonusState";

const RegularTransfer = () => {
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
  const [transferType, setTransferType] = useState("Regular Transfer");
  const [transferErrMsg, setTransferErrMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empErrMsg, setEmpErrMsg] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newDeptName, setNewDeptName] = useState("");
  const [deptErrMsg, setDeptErrMsg] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newPositionName, setNewPositionName] = useState("");
  const [positionErrMsg, setPositionErrMsg] = useState("");
  const [newCostCentre, setNewCostCentre] = useState("");
  const [costCentreErrMsg, setCostCentreErrMsg] = useState("");
  const [newManager, setNewManager] = useState("");
  const [managerErrMsg, setManagerErrMsg] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [newGross, setNewGross] = useState();
  const [grossErrMsg, setGrossErrMsg] = useState("");
  const [bonus, setBonus] = useState(0);
  const [relocationBonus, setRelocationBonus] = useState("");
  const [relocationBonusErrMsg, setRelocationBonusErrMsg] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalWarning, setModalWrong] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showInitiationLetter, setShowInitiationLetter] = useState(false);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showLetterSubmitModal, setShowLetterSubmitModal] = useState(false);
  const [depNoChange, setDepNoChange] = useState(false);
  const [positionNoChange, setPositionNoChange] = useState(false);
  const [costCentreNoChange, setCostCentreNoChange] = useState(false);
  const [managerNoChange, setManagerNoChange] = useState(false);
  const [locationNoChange, setLocationNoChange] = useState(false);
  const [grossNoChange, setGrossNoChange] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (
      initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length !== 0 &&
      newDeptName !== "" &&
      newDeptName !== null &&
      newDeptName !== undefined &&
      newPositionName !== "" &&
      newPositionName !== null &&
      newPositionName !== undefined
    ) {
      viewBonusByContarctType(
        initiationEmpData.currentContractType,
        newDeptName,
        newPositionName
      );
    }
  }, [newDeptName, newPositionName]);
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
  useEffect(() => {
    if (searchValue !== "") {
      getTransferInitiationEmpData(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    getDepartmentDetails();
  }, []);

  useEffect(() => {
    if (newDept !== "") {
      getDeptPositionDetails(newDept);
    }
  }, [newDept]);

  useEffect(() => {
    if (
      initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length !== 0 &&
      newDeptName !== "" &&
      newDeptName !== undefined &&
      newDeptName !== null
    ) {
      getCostCentreDetails(initiationEmpData.currentCompany, newDeptName);
    }
  }, [initiationEmpData, newDeptName]);
  console.log("costCentreData", costCentreData);

  useEffect(() => {
    if (newCostCentre !== "") {
      getCostCentreManagersDetails(newCostCentre);
      getCostCentreLocationDetails(newCostCentre);
    }
  }, [newCostCentre]);
  console.log("costCentreLocationData", costCentreLocationData);

  useEffect(() => {
    if (formValid === true) {
      const initiationData = {
        ...initiationEmpData,
        promotedCostCentre: newCostCentre,
        promotedDepartment: newDeptName,
        promotedFixedGross: parseInt(newGross),
        promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
        promotedLocation: parseInt(newLocation),
        promotedManagerId: newManager,
        promotedPosition: newPositionName,
        promotedMonthlyBonus:
          bonus !== "" && bonus !== null && bonus !== undefined
            ? parseInt(bonus)
            : 0,
        promotedRelocationBonus: parseInt(relocationBonus),
        status: 0,
        transferId: 0,
        transferType: transferType,
      };
      createTransferInitiation(initiationData);
    }
  }, [formValid]);

  useEffect(() => {
    searchValue !== "" && initiationStatus === true
      ? setModalShow(true)
      : setModalShow(false);
  }, [initiationStatus]);

  useEffect(() => {
    initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length > 0 &&
      setSearchInput(
        `${initiationEmpData.employeeName} ${initiationEmpData.currentEmployeeId}`
      );
  }, [initiationEmpData]);

  const transferTypeHandler = (e) => {
    setTransferType(e.target.value);
    setTransferErrMsg("");
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    setEmpErrMsg("");
  };

  const searchValueHandler = () => {
    setSearchValue(searchInput);
  };

  const departmentChangeHandler = (e) => {
    console.log(e.target.value);
    setNewDept(e.target.value);
    {
      e.target.value !== ""
        ? setNewDeptName(e.target.options[e.target.selectedIndex].text)
        : setNewDeptName("");
    }
    setDeptErrMsg("");
    MakeDepartmentDependienciesNull();
  };
  const MakeDepartmentDependienciesNull = () => {
    setNewPosition("");
    setNewPositionName("");
    setPositionErrMsg("");
    setNewCostCentre("");
    setCostCentreErrMsg("");
    setNewManager("");
    setManagerErrMsg("");
    setNewLocation("");
    setLocationErrMsg("");
    setPositionNoChange(false);
    setCostCentreNoChange(false);
    setManagerNoChange(false);
    setLocationNoChange(false);
  };

  const changeCostCentreHandler = (e) => {
    setNewCostCentre(e.target.value);
    setCostCentreErrMsg("");
    MakeCostCenterDependienciesNull();
  };
  const MakeCostCenterDependienciesNull = () => {
    setNewPosition("");
    setNewPositionName("");
    setPositionErrMsg("");
    setNewManager("");
    setManagerErrMsg("");
    setNewLocation("");
    setLocationErrMsg("");
    setPositionNoChange(false);
    setManagerNoChange(false);
    setLocationNoChange(false);
  };

  const changeManagerHandler = (e) => {
    setNewManager(e.target.value);
    setManagerErrMsg("");
    MakeManagerDependienciesNull();
  };
  const MakeManagerDependienciesNull = () => {
    setNewPosition("");
    setNewPositionName("");
    setPositionErrMsg("");
    setNewLocation("");
    setLocationErrMsg("");
    setPositionNoChange(false);
    setLocationNoChange(false);
  };
  const changePositionHandler = (e) => {
    setNewPosition(e.target.value);
    {
      e.target.value !== ""
        ? setNewPositionName(e.target.options[e.target.selectedIndex].text)
        : setNewPositionName("");
    }
    setPositionErrMsg("");
    MakePositionDependienciesNull();
  };
  const MakePositionDependienciesNull = () => {
    setNewLocation("");
    setLocationErrMsg("");
    setLocationNoChange(false);
  };

  const changeLocationHandler = (e) => {
    setNewLocation(e.target.value);
    setLocationErrMsg("");
  };

  // const changeGrossHandler = (e) => {
  //   setNewGross(e.target.value);
  //   setGrossErrMsg("");
  // };

  const changeBonusHandler = (e) => {
    setBonus(e.target.value);
  };

  const changeRelocationBonusHandler = (e) => {
    setRelocationBonus(e.target.value);
    setRelocationBonusErrMsg("");
  };

  const changeEffectiveDateHandler = (date) => {
    setEffectiveDate(date);
    setEffectiveDateErrMsg("");
  };

  const handleModalClose = () => {
    setModalWrong(false);
    setModalShow(false);
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

  const noChangeDeptHandler = (e) => {
    if (e.target.checked === true) {
      const department = deptDetails.find((dept) => {
        return (
          dept.departmentName.toLowerCase() ===
          initiationEmpData.currentDepartment.toLowerCase()
        );
      });
      if (department !== undefined && Object.keys(department).length > 0) {
        setDepNoChange(true);
        setNewDept(department.deptId);
        setNewDeptName(department.departmentName);
      }
    } else {
      setDepNoChange(false);
      setNewDept("");
      setNewDeptName("");
      MakeDepartmentDependienciesNull();
      // setPositionNoChange(false);
    }
  };

  const noChangePositionHandler = (e) => {
    if (e.target.checked === true) {
      const positions = deptPositionData.find((position) => {
        return (
          position.position.toLowerCase() ===
          initiationEmpData.currentPosition.toLowerCase()
        );
      });
      console.log("positions->", positions);
      if (positions !== undefined && Object.keys(positions).length > 0) {
        setPositionNoChange(true);
        setNewPosition(positions.positionId);
        setNewPositionName(positions.position);
      }
    } else {
      setPositionNoChange(false);
      setNewPosition("");
      setNewPositionName("");
      MakePositionDependienciesNull();
    }
  };

  const noChangeCostCentreHandler = (e) => {
    if (
      e.target.checked === true &&
      initiationEmpData.currentCostCentre !== null &&
      initiationEmpData.currentCostCentre !== undefined &&
      initiationEmpData.currentCostCentre !== ""
    ) {
      setCostCentreNoChange(true);
      setNewCostCentre(initiationEmpData.currentCostCentre);
    } else {
      setCostCentreNoChange(false);
      setNewCostCentre("");
      MakeCostCenterDependienciesNull();
    }
  };

  const noChangeManagerHandler = (e) => {
    if (
      e.target.checked === true &&
      initiationEmpData.currentManagerId !== null &&
      initiationEmpData.currentManagerId !== undefined &&
      initiationEmpData.currentManagerId !== ""
    ) {
      setManagerNoChange(true);
      setNewManager(initiationEmpData.currentManagerId);
    } else {
      MakeManagerDependienciesNull();
      setManagerNoChange(false);
      setNewManager("");
    }
  };

  const noChangeLocationHandler = (e) => {
    if (
      e.target.checked === true &&
      initiationEmpData.currentLocation !== null &&
      initiationEmpData.currentLocation !== undefined &&
      initiationEmpData.currentLocation !== ""
    ) {
      setLocationNoChange(true);
      setNewLocation(initiationEmpData.currentLocation);
    } else {
      setLocationNoChange(false);
      setNewLocation("");
    }
  };

  const noChangeGrossHandler = (e) => {
    if (
      e.target.checked === true &&
      initiationEmpData.currentFixedGross !== null &&
      initiationEmpData.currentFixedGross !== undefined &&
      initiationEmpData.currentFixedGross !== ""
    ) {
      setGrossNoChange(true);
      setNewGross(initiationEmpData.currentFixedGross);
    } else {
      setGrossNoChange(false);
    }
  };

  const handleLetterSubmitModalClose = () => {
    setShowLetterSubmitModal(false);
    history.push("./transfers");
    setBonus(0);
    setNewPositionName("");
    setNewDeptName("");
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;
    const Valid = /^[0-9\b]+$/;
    console.log("relocationBonus", relocationBonus);

    if (transferType === "") {
      validForm = false;
      setTransferErrMsg("Please select transfer type");
    }

    if (searchInput === "") {
      validForm = false;
      setEmpErrMsg("Please enter employee id");
    }

    if (newDept === "") {
      validForm = false;
      setDeptErrMsg("Please select department");
    }

    if (newPosition === "") {
      validForm = false;
      setPositionErrMsg("Please select position");
    }

    if (newCostCentre === "") {
      validForm = false;
      setCostCentreErrMsg("Please select cost centre");
    }

    if (newManager === "") {
      validForm = false;
      setManagerErrMsg("Please select manager");
    }

    if (newLocation === "") {
      validForm = false;
      setLocationErrMsg("Please select location");
    }

    // if (newGross === "") {
    //   validForm = false;
    //   setGrossErrMsg("Please enter fixed gross");
    // }

    if (relocationBonus === "") {
      validForm = false;
      setRelocationBonusErrMsg("Please enter relocation bonus");
    } else if (!Valid.test(relocationBonus)) {
      validForm = false;
      setRelocationBonusErrMsg("Please enter digits");
    }

    if (
      effectiveDate === "" ||
      effectiveDate === undefined ||
      effectiveDate === null
    ) {
      validForm = false;
      setEffectiveDateErrMsg("Please enter effective date");
    }

    return validForm;
  };
  const isAllNoChangesAreChecked = () => {
    if (
      depNoChange === true &&
      positionNoChange === true &&
      costCentreNoChange === true &&
      managerNoChange === true &&
      locationNoChange === true
    ) {
      setModalWrong(true);
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
    if (validFormRes === true && isAllNoChangesAreChecked() === false) {
      setFormValid(true);
    }
  };

  return (
    <div className="transfer-initiation">
      <ToastContainer />
      <Modal show={modalWarning} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Tansfer can't be proceed with out change
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Tansfer initiation details saved successfully
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
              Tansfer letter details saved successfully, manager has notified
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleLetterSubmitModalClose}>Close</Button>
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
      Object.keys(initiationEmpData).length > 0 ? (
        <div className="mr-5">
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationHeader"
          >
            <Col md={{ span: 4, offset: 2 }} className="font-weight-bold my-2">
              Current
            </Col>
            <Col md={2} className="font-weight-bold my-2 text-left">
              No Change
            </Col>
            <Col md={2} className="font-weight-bold my-2 text-center">
              New
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationDept"
          >
            <Form.Label column md={2}>
              Department
            </Form.Label>
            <Col md={4} className="text-primary">
              {initiationEmpData.currentDepartment}
            </Col>
            <Col md={2}>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  id="no-dept-change"
                  checked={depNoChange}
                  onChange={noChangeDeptHandler}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                className="text-primary"
                aria-label="transferInitiationDept"
                value={newDept}
                placeholder="Select Department"
                disabled={depNoChange}
                onChange={departmentChangeHandler}
              >
                <option value="">Select Department</option>
                {deptDetails !== null &&
                  deptDetails !== undefined &&
                  deptDetails.length > 0 &&
                  deptDetails.map((item) => {
                    return (
                      <option key={`dept_${item.deptId}`} value={item.deptId}>
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
            controlId="transferInitiationCostCentre"
          >
            <Form.Label column md={2}>
              Cost Centre
            </Form.Label>
            <Col md={4} className="text-primary">
              {initiationEmpData.currentCostCentre}
            </Col>
            <Col md={2}>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  id="no-costcentre-change"
                  disabled={newDeptName === "" ? true : false}
                  checked={costCentreNoChange}
                  onChange={noChangeCostCentreHandler}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                className="text-primary"
                aria-label="transferInitiationCostCentre"
                value={newCostCentre}
                placeholder="Select Cost Centre"
                disabled={
                  costCentreNoChange || newDeptName === "" ? true : false
                }
                onChange={changeCostCentreHandler}
              >
                <option value="">Select Cost Centre</option>
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
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationManager"
          >
            <Form.Label column md={2}>
              Manager
            </Form.Label>
            <Col md={4} className="text-primary">
              {initiationEmpData.currentManagerName}
            </Col>
            <Col md={2}>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  id="no-manager-change"
                  disabled={newCostCentre === "" ? true : false}
                  checked={managerNoChange}
                  onChange={noChangeManagerHandler}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                className="text-primary"
                aria-label="transferInitiationManager"
                value={newManager}
                placeholder="Select Manager"
                disabled={
                  managerNoChange || newCostCentre === "" ? true : false
                }
                onChange={changeManagerHandler}
              >
                <option value="">Select Manager</option>
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
            controlId="transferInitiationPosition"
          >
            <Form.Label column md={2}>
              Position
            </Form.Label>
            <Col md={4} className="text-primary">
              {initiationEmpData.currentPosition}
            </Col>
            <Col md={2}>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  id="no-position-change"
                  checked={positionNoChange}
                  disabled={newManager === "" ? true : false}
                  onChange={noChangePositionHandler}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                className="text-primary"
                aria-label="transferInitiationPosition"
                value={newPosition}
                placeholder="Select Position"
                disabled={positionNoChange || newManager === "" ? true : false}
                onChange={changePositionHandler}
              >
                <option value="">Select Position</option>
                {deptPositionData !== null &&
                  deptPositionData !== undefined &&
                  deptPositionData.length > 0 &&
                  deptPositionData.map((item) => {
                    return (
                      <option
                        key={`pos_${item.positionId}`}
                        value={item.positionId}
                      >
                        {item.position}
                      </option>
                    );
                  })}
              </Form.Control>
              {positionErrMsg !== "" && (
                <span className="text-danger">{positionErrMsg}</span>
              )}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationLocation"
          >
            <Form.Label column md={2}>
              Location
            </Form.Label>
            <Col md={4} className="text-primary">
              {initiationEmpData.currentLocationName}
            </Col>
            <Col md={2}>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  id="no-location-change"
                  checked={locationNoChange}
                  disabled={newPositionName === "" ? true : false}
                  onChange={noChangeLocationHandler}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                className="text-primary"
                aria-label="transferInitiationLocation"
                value={newLocation}
                placeholder="Select Location"
                disabled={
                  locationNoChange || newPositionName === "" ? true : false
                }
                onChange={changeLocationHandler}
              >
                <option value="">Select Location</option>
                {costCentreLocationData !== null &&
                  costCentreLocationData !== undefined &&
                  Object.keys(costCentreLocationData).length !== 0 &&
                  costCentreLocationData.map((item) => {
                    return (
                      <option value={item.stateId}>{item.stateName}</option>
                    );
                  })}
              </Form.Control>
              {/* <option value={costCentreLocationData.stateId}>
                      {costCentreLocationData.stateName}
                    </option> */}
              {locationErrMsg !== "" && (
                <span className="text-danger">{locationErrMsg}</span>
              )}
            </Col>
          </Form.Group>
          {/* <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationFixedGross"
          >
            <Form.Label column md={2}>
              Fixed Gross
            </Form.Label>
            <Col md={4} className="text-primary">
              {initiationEmpData.currentFixedGross}
            </Col>
            <Col md={2}>
              <div className="boxField input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  id="no-gross-change"
                  checked={grossNoChange}
                  onChange={noChangeGrossHandler}
                />
              </div>
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="New Fixed Gross"
                value={newGross}
                className="text-primary"
                disabled={grossNoChange}
                onChange={changeGrossHandler}
              ></Form.Control>
              {grossErrMsg !== "" && (
                <span className="text-danger">{grossErrMsg}</span>
              )}
            </Col>
          </Form.Group> */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={2} className="py-0">
              Bonus
            </Form.Label>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Bonus"
                value={bonus}
                className="text-primary"
                id="transferInitiationCurrentPercent"
                onChange={changeBonusHandler}
                disabled={true}
              ></Form.Control>
            </Col>
            <Col md={2} className="py-0">
              Relocation Bonus
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Relocation Bonus"
                value={relocationBonus}
                className="text-primary"
                id="transferInitiationBonus"
                onChange={changeRelocationBonusHandler}
              ></Form.Control>
              {relocationBonusErrMsg !== "" && (
                <span className="text-danger">{relocationBonusErrMsg}</span>
              )}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="transferInitiationEffectiveDate"
          >
            <Form.Label column md={2}>
              Effective Date
            </Form.Label>
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
            </Col>
            {effectiveDateErrMsg !== "" && (
              <span className="text-danger">{effectiveDateErrMsg}</span>
            )}
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
              {searchValue !== "" && initiationStatus && (
                <button
                  className={"LettersButtons"}
                  onClick={showTransferLetterModal}
                >
                  {previewTransferLetter
                    ? "Preview Transfer Letter"
                    : "Generate Transfer Letter"}
                </button>
              )}

              {searchValue !== "" && initiationStatus && previewTransferLetter && (
                <div className="preview-section">
                  <br></br>
                  <br></br>
                  <img src={calendarImage} alt="calendar" width="200px" />
                  <br></br>
                  <button
                    disabled={letterSent}
                    className={letterSent ? "confirmButton" : "stepperButtons"}
                    onClick={submitfinalTransferLetter}
                  >
                    Submit
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      {/* </div>
              </Container>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default RegularTransfer;
