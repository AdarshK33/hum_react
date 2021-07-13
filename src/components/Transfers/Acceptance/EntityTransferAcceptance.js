import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
// import TransferInitationLetter from "./TransferInitiationLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory, useParams } from "react-router-dom";
import { Fragment } from "react";

const EntityTransferAcceptance = () => {
  const { transferId } = useParams();
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
    loader,
    getTransferData,
    transferData,
  } = useContext(TransferContext);
  const [transferType, setTransferType] = useState("Entity Transfer");
  const [newEntity, setNewEntity] = useState("");
  const [newEntityErrMsg, setNewEntityErrMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [empErrMsg, setEmpErrMsg] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newCostCentre, setNewCostCentre] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showInitiationLetter, setShowInitiationLetter] = useState(false);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showLetterSubmitModal, setShowLetterSubmitModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (transferId !== null && transferId !== undefined) {
      getTransferData(transferId);
    }
  }, [transferId]);

  useEffect(() => {
    if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0
    ) {
      getCostCentreLocationDetails(transferData.promotedCostCentre);
    }
  }, [transferData]);
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

  const handleModalClose = () => setModalShow(false);

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
    history.push("./transfers");
  };

  /* Validate form */
  const validateForm = () => {
    let validForm = true;

    if (searchInput === "") {
      validForm = false;
      setEmpErrMsg("Please enter employee id or employee name");
    }

    if (newEntity === "") {
      validForm = false;
      setNewEntityErrMsg("Please select new entity");
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
        promotedCompany: newEntity,
        promotedContractType: initiationEmpData.promotedContractType,
        promotedCostCentre: initiationEmpData.promotedCostCentre,
        promotedCountry: initiationEmpData.promotedCountry,
        promotedDateOfReturn: initiationEmpData.promotedDateOfReturn,
        promotedDepartment: initiationEmpData.promotedDepartment,
        promotedDesignation: initiationEmpData.promotedDesignation,
        promotedEmployeeId: initiationEmpData.promotedEmployeeId,
        promotedFixedGross: initiationEmpData.promotedFixedGross,
        promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
        promotedLocation: initiationEmpData.promotedLocation,
        promotedManagerId: initiationEmpData.promotedManagerId,
        promotedMonthlyBonus: initiationEmpData.promotedMonthlyBonus,
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
    }
  };

  return (
    <Fragment>
      <ToastContainer />
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
              Tansfer Initiation done successfully!
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
              Tansfer Initiation letter generated successfully!
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleLetterSubmitModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Breadcrumb title="TRANSFER ACCEPTANCE" parent="TRANSFER ACCEPTANCE" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>TRANSFER ACCEPTANCE </b>
                </div>
                {loader === true ? (
                  <div
                    className="loader-box loader"
                    style={{ width: "100% !important" }}
                  >
                    <div className="loader">
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                    </div>
                  </div>
                ) : (
                  <Form>
                    <Row
                      style={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                        marginBpottom: "2rem",
                      }}
                    >
                      <Col>
                        <Row className="mb-4">
                          <Col md={2}>Transfer Type</Col>
                          <Col md={8} className="text-primary">
                            {transferData.transferType}
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col md={2}>Employee Name</Col>
                          <Col md={8} className="text-primary">
                            {transferData.employeeName}{" "}
                            {transferData.currentEmployeeId}
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "2rem" }}></Row>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationDept"
                        >
                          <Col md={2}>
                            <Form.Label>Cost Center Name:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {initiationEmpData.currentCostCentre}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Contract Type:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {initiationEmpData.currentContractType}
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationPosition"
                        >
                          <Col md={2}>
                            <Form.Label>Old Entity:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {initiationEmpData.currentCompany}
                          </Col>
                          <Col md={2}>
                            <Form.Label>New Entity:</Form.Label>
                          </Col>
                          <Col md={3}>
                            <Form.Control
                              as="select"
                              className="text-primary"
                              aria-label="transferInitiationPosition"
                              value={newEntity}
                              placeholder="Select Position"
                              onChange={changeEntityHandler}
                            >
                              <option value="">Select New Entity</option>
                              <option value="INDECA">INDECA</option>
                              <option value="DSI">DSI</option>
                              <option value="PRODIN">PRODIN</option>
                            </Form.Control>
                            {newEntityErrMsg !== "" && (
                              <span className="text-danger">
                                {newEntityErrMsg}
                              </span>
                            )}
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationCostCentre"
                        >
                          <Col md={2}>
                            <Form.Label>Old Fixed Gross:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {initiationEmpData.currentFixedGross}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Effective Date:</Form.Label>
                          </Col>
                          <Col md={3}>
                            <DatePicker
                              className="text-primary form-control"
                              selected={effectiveDate}
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
                              className={
                                formValid ? "confirmButton" : "stepperButtons"
                              }
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

                            {searchValue !== "" &&
                              initiationStatus &&
                              previewTransferLetter && (
                                <div className="preview-section">
                                  <br></br>
                                  <br></br>
                                  <img
                                    src={calendarImage}
                                    alt="calendar"
                                    width="200px"
                                  />
                                  <br></br>
                                  <button
                                    disabled={letterSent}
                                    className={
                                      letterSent
                                        ? "confirmButton"
                                        : "stepperButtons"
                                    }
                                    onClick={submitfinalTransferLetter}
                                  >
                                    Submit
                                  </button>
                                </div>
                              )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EntityTransferAcceptance;
