import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import PartTimeToFullTimeLetter from "./partTimeToFullTimeLetter";
import FullTimeToPartTimeLetter from "./fullTimeToPartTimeLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory } from "react-router-dom";
import "../../Transfers/Transfers.css";

const ChangeEmployementType = () => {
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
    getApointmentLetter,
    transferData,
  } = useContext(TransferContext);
  const [transferType, setTransferType] = useState("Entity Transfer");
  const [newEmployement, setNewEmployement] = useState("");
  const [newEmployementErrMsg, setNewEmployementErrMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empErrMsg, setEmpErrMsg] = useState("");
  const [newDept, setNewDept] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [DateOfTransfer, setDateOfTransfer] = useState(new Date());
  const [DateOfTransferErrMsg, setDateOfTransferErrMsg] = useState("");
  const [newCostCentre, setNewCostCentre] = useState("");
  const [costCentreErrMsg, setCostCentreErrMsg] = useState("");
  const [newManager, setNewManager] = useState("");
  const [managerErrMsg, setManagerErrMsg] = useState("");
  const [newGross, setNewGross] = useState("");
  const [grossErrMsg, setGrossErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
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
    getDepartmentDetails();
  }, []);

  useEffect(() => {
    if (newDept !== "") {
      getDeptPositionDetails(newDept);
    }
  }, [newDept]);

  useEffect(() => {
    getCostCentreDetails();
  }, []);

  useEffect(() => {
    if (newCostCentre !== "") {
      getCostCentreManagersDetails(newCostCentre);
      getCostCentreLocationDetails(newCostCentre);
    }
  }, [newCostCentre]);

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
    initiationEmpData !== null &&
      initiationEmpData !== undefined &&
      Object.keys(initiationEmpData).length > 0 &&
      setSearchInput(
        `${initiationEmpData.employeeName} ${initiationEmpData.currentEmployeeId}`
      );
  }, [initiationEmpData]);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    setEmpErrMsg("");
  };

  const searchValueHandler = () => {
    setSearchValue(searchInput);
  };

  const changeEmployementHandler = (e) => {
    setNewEmployement(e.target.value);
    setNewEmployementErrMsg("");
  };

  const changeEffectiveDateHandler = (date) => {
    setEffectiveDate(date);
    setEffectiveDateErrMsg("");
  };
  const changeDateOfTransferHandler = (date) => {
    setDateOfTransfer(date);
    setDateOfTransferErrMsg("");
  };

  const handleModalClose = () => {
    setModalShow(false);
    setInfoModalShow(false);
  };

  const addDigitalSignature = () => setShowSignature(true);

  const handleTransferLetterModalClose = () => {
    setShowInitiationLetter(false);
    setPreviewTransferLetter(true);
  };

  const showTransferLetterModal = (e) => {
    e.preventDefault();
    // getApointmentLetter("DSI003877");
    // setShowInitiationLetter(true);
    if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0 &&
      transferData.promotedEmployeeId !== null &&
      transferData.promotedEmployeeId !== undefined &&
      transferData.promotedEmployeeId !== ""
    ) {
      getApointmentLetter(transferData.promotedEmployeeId);
      setShowInitiationLetter(true);
    }
  };

  const submitfinalTransferLetter = (e) => {
    e.preventDefault();
    setLetterSent(true);
    setShowLetterSubmitModal(true);
  };

  const handleLetterSubmitModalClose = () => {
    setShowLetterSubmitModal(false);
    history.push("./transfers");
  };
  const changeCostCentreHandler = (e) => {
    setNewCostCentre(e.target.value);
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

    if (searchInput === "") {
      validForm = false;
      setEmpErrMsg("Please enter employee id or employee name");
    }

    if (newEmployement === "") {
      validForm = false;
      setNewEmployementErrMsg("Please select new Employement");
    }
    // if (newCostCentre === "") {
    //   validForm = false;
    //   setCostCentreErrMsg("Please select cost centre");
    // }
    if (newGross === "") {
      validForm = false;
      setGrossErrMsg("Please enter fixed gross");
    }

    if (
      effectiveDate === "" ||
      effectiveDate === undefined ||
      effectiveDate === null
    ) {
      validForm = false;
      setEffectiveDateErrMsg("Please enter effective date");
    }

    if (
      DateOfTransfer === "" ||
      DateOfTransfer === undefined ||
      DateOfTransfer === null
    ) {
      validForm = false;
      setDateOfTransferErrMsg("Please enter effective date");
    }
    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      initiationEmpData.currentContractType === "internship" ||
      initiationEmpData.currentContractType === "Internship"
    ) {
      setInfoModalShow(true);
    } else {
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
          promotedCompany: initiationEmpData.currentCompany,
          promotedContractType:
            newEmployement !== null && newEmployement !== ""
              ? newEmployement === "From Part Time to Full Time"
                ? "permanent"
                : "parttime"
              : null,
          salaryType:
            newEmployement !== null && newEmployement !== ""
              ? newEmployement === "From Part Time to Full Time"
                ? "Monthly"
                : "Hourly"
              : null,
          promotedCostCentre: initiationEmpData.promotedCostCentre,
          promotedCountry: initiationEmpData.promotedCountry,
          promotedDateOfReturn: moment(DateOfTransfer).format("YYYY-MM-DD"),
          promotedDepartment: initiationEmpData.promotedDepartment,
          promotedDesignation: initiationEmpData.promotedDesignation,
          promotedEmployeeId: initiationEmpData.currentEmployeeId,
          promotedFixedGross: parseInt(newGross),
          promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
          promotedLocation: initiationEmpData.currentLocation,
          promotedManagerId: initiationEmpData.currentManagerId,
          promotedMonthlyBonus: initiationEmpData.currentMonthlyBonus,
          promotedPosition: initiationEmpData.currentPosition,
          promotedRelocationBonus: initiationEmpData.currentMonthlyBonus,
          promotedTermOfProject: initiationEmpData.promotedTermOfProject,
          remark: null,
          status: 0,
          transferId: 0,
          transferLetter: null,
          transferType: "Employment Type Transfer",
        };
        console.log(InfoData);
        createTransferInitiation(InfoData);
        setFormValid(true);
        // setModalShow(true);
      }
    }
  };

  return (
    <div className="transfer-initiation">
      <ToastContainer />
      <Modal show={infoModalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              The employee is intern, employement change transfer is not
              available for interns
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        {/* <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label className="text-center">
            Tansfer Initiation done successfully!
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer> */}
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Tansfer initiation details saved successfully!
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
          {transferData !== null &&
          transferData !== undefined &&
          Object.keys(transferData).length !== 0 &&
          transferData.promotedContractType !== null &&
          transferData.promotedContractType !== undefined &&
          transferData.promotedContractType !== "" &&
          (transferData.promotedContractType === "Permanent" ||
            transferData.promotedContractType === "permanent") ? (
            <PartTimeToFullTimeLetter />
          ) : transferData !== null &&
            transferData !== undefined &&
            Object.keys(transferData).length !== 0 &&
            transferData.promotedContractType !== null &&
            transferData.promotedContractType !== undefined &&
            transferData.promotedContractType !== "" &&
            (transferData.promotedContractType === "parttime" ||
              transferData.promotedContractType === "Parttime") ? (
            <FullTimeToPartTimeLetter />
          ) : (
            ""
          )}

          {/* <TransferInitationLetter transferId={initiationTransferId} /> */}
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
              Tansfer initiation letter details saved successfully
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleLetterSubmitModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      {/* <Form.Group as={Row} className="mb-3" controlId="chooseTransferType">
          <Form.Label column md={2}>
            Transfer Type
          </Form.Label>
          <Col md={8}>
            <Form.Control
              as="select"
              aria-label="chooseTransferType"
              value={transferType}
              placeholder="Select Transfer Type"
              onChange={transferTypeHandler}
            >
              <option>Select Transfer Type</option>
              <option value="Regular Transfer">Regular Transfer</option>
              <option value="Employement Transfer">Entity Transfer</option>
              <option value="International Transfer">
                International Transfer
              </option>
              <option value="Employment Type Transfer">
                Employment Type Transfer
              </option>
            </Form.Control>
            {transferErrMsg !== "" && (
              <span className="text-danger">{transferErrMsg}</span>
            )}
          </Col>
        </Form.Group> */}
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
      {
        // searchValue !== "" &&
        initiationEmpData !== null &&
        initiationEmpData !== undefined &&
        Object.keys(initiationEmpData).length > 0 ? (
          <div className="mt-5 mr-5">
            <Row className="my-3">
              <Col className="font-weight-bold">
                <u>Work Information</u>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Row>
                  <Col md={5}>Cost Center Name:</Col>
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
                <Form.Group as={Row} controlId="transferInitiationCostCentre">
                  <Form.Label column md={5} className="py-0">
                    Change Employement:
                  </Form.Label>

                  <Col md={7}>
                    <Form.Control
                      as="select"
                      className="text-primary"
                      aria-label="transferInitiationPosition"
                      value={newEmployement}
                      placeholder="Select Position"
                      onChange={changeEmployementHandler}
                    >
                      <option value="">Select Change Employement</option>

                      <option value="From Part Time to Full Time">
                        From Part Time to Full Time
                      </option>
                      <option value="From Temporary to Permanent Full Time">
                        From Full Time to Part Time
                      </option>
                    </Form.Control>
                    {newEmployementErrMsg !== "" && (
                      <span className="text-danger">
                        {newEmployementErrMsg}
                      </span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationCostCentre">
                  <Form.Label column md={5}>
                    Effective Date:
                  </Form.Label>

                  <Col md={7}>
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
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="font-weight-bold">
                <u>Remuneration Information</u>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationMonthlyType">
                  <Form.Label column md={5}>
                    Salary Type:
                  </Form.Label>
                  <Col md={7} className="text-primary">
                    <Form.Control
                      type="text"
                      placeholder="Salary Type"
                      value={
                        newEmployement !== null && newEmployement !== ""
                          ? newEmployement === "From Part Time to Full Time"
                            ? "Monthly"
                            : "Hourly"
                          : ""
                      }
                      className="text-primary"
                      disabled={true}
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} controlId="transferInitiationFixedGross">
                  <Form.Label column md={5}>
                    Fixed Gross:
                  </Form.Label>
                  <Col md={7} className="text-primary">
                    <Form.Control
                      type="text"
                      placeholder="Fixed Gross"
                      value={newGross}
                      className="text-primary"
                      onChange={changeGrossHandler}
                    ></Form.Control>
                    {grossErrMsg !== "" && (
                      <span className="text-danger">{grossErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-3">
              <Col md={6}>
                <Form.Group
                  as={Row}
                  controlId="transferInitiationRenumerationDate"
                >
                  <Form.Label column md={5}>
                    Effective Date:
                  </Form.Label>
                  <Col md={7}>
                    <div className="transfers-date">
                      <DatePicker
                        className="text-primary form-control"
                        selected={DateOfTransfer}
                        closeOnScroll={true}
                        minDate={moment().toDate()}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => {
                          changeDateOfTransferHandler(date);
                        }}
                      />
                    </div>
                    {DateOfTransferErrMsg !== "" && (
                      <span className="text-danger">{effectiveDateErrMsg}</span>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

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

                {initiationStatus && (
                  <button
                    className={"LettersButtons"}
                    onClick={showTransferLetterModal}
                  >
                    {previewTransferLetter
                      ? "Preview Transfer Letter"
                      : "Generate Transfer Letter"}
                  </button>
                )}

                {initiationStatus && previewTransferLetter && (
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
                )}
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
};

export default ChangeEmployementType;
