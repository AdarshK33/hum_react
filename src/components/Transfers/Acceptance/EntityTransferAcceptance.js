import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import ApointmentLetter from "./ApointmentLetter";
import PartTimeAppointmentLetter from "./partTimeApointmentLetter";
import LocalExpactAppointmentLetter from "./localExpactAppointmentLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory, useParams } from "react-router-dom";
import { Fragment } from "react";
import { AppContext } from "../../../context/AppState";
import LoaderIcon from "../../Loader/LoaderIcon";

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
    getApointmentLetter,
  } = useContext(TransferContext);
  const { user } = useContext(AppContext);
  const [transferType, setTransferType] = useState("Entity Transfer");
  const [newEntity, setNewEntity] = useState("");
  const [newEntityErrMsg, setNewEntityErrMsg] = useState("");
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
  const [newLocation, setNewLocation] = useState("");
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [relocationBonus, setRelocationBonus] = useState("");
  const [relocationBonusErrMsg, setRelocationBonusErrMsg] = useState("");
  const [newGross, setNewGross] = useState("");
  const [grossErrMsg, setGrossErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showInitiationLetter, setShowInitiationLetter] = useState(false);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showLetterSubmitModal, setShowLetterSubmitModal] = useState(false);
  const history = useHistory();
  console.log("user->", user);
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
  useEffect(() => {
    if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0
    ) {
      setEffectiveDate(new Date(transferData.promotedJoiningDate));
    } else {
      setEffectiveDate(new Date());
    }
  }, [transferData]);

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
    history.push("../transfers");
  };
  const departmentChangeHandler = (e) => {
    setNewDept(e.target.value);
    setNewDeptName(e.target.options[e.target.selectedIndex].text);
    setDeptErrMsg("");
  };
  const changePositionHandler = (e) => {
    setNewPosition(e.target.value);
    setNewPositionName(e.target.options[e.target.selectedIndex].text);
    setPositionErrMsg("");
  };
  const changeCostCentreHandler = (e) => {
    setNewCostCentre(e.target.value);
    setCostCentreErrMsg("");
  };
  const changeLocationHandler = (e) => {
    setNewLocation(e.target.value);
    setLocationErrMsg("");
  };
  const changeRelocationBonusHandler = (e) => {
    setRelocationBonus(e.target.value);
    setRelocationBonusErrMsg("");
  };
  const changeGrossHandler = (e) => {
    setNewGross(e.target.value);
    setGrossErrMsg("");
  };
  /* Validate form */
  const validateForm = () => {
    let validForm = true;
    console.log("newGross->", newGross);

    // if (searchInput === "") {
    //   validForm = false;
    //   setEmpErrMsg("Please enter employee id or employee name");
    // }

    // if (newEntity === "") {
    //   validForm = false;
    //   setNewEntityErrMsg("Please select new entity");
    // }
    if (newDept === "") {
      validForm = false;
      setDeptErrMsg("Please select department");
      console.log("newGross->", newGross);
      console.log("validForm", validForm);
    }
    if (newPosition === "") {
      validForm = false;
      setPositionErrMsg("Please select position");
      console.log("validForm", validForm);
    }
    if (newCostCentre === "") {
      validForm = false;
      setCostCentreErrMsg("Please select cost centre");
      console.log("validForm", validForm);
    }
    if (newLocation === "") {
      validForm = false;
      setLocationErrMsg("Please select location");
      console.log("validForm", validForm);
    }
    if (relocationBonus === "") {
      validForm = false;
      setRelocationBonusErrMsg("Please enter relocation bonus");
      console.log("validForm", validForm);
    }
    if (newGross === "") {
      validForm = false;

      setGrossErrMsg("Please enter fixed gross");
      console.log("validForm", validForm);
    }
    if (
      effectiveDate === "" ||
      effectiveDate === undefined ||
      effectiveDate === null
    ) {
      validForm = false;
      setEffectiveDateErrMsg("Please enter effective date");
      console.log("validFormRes", validForm);
    }

    return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
    console.log("validFormRes", validFormRes);
    if (validFormRes === true) {
      const InfoData = {
        currentCompany: transferData.currentCompany,
        currentContractType: transferData.currentContractType,
        currentCostCentre: transferData.currentCostCentre,
        currentCountry: transferData.currentCountry,
        currentDepartment: transferData.currentDepartment,
        currentDesignation: transferData.currentDesignation,
        currentEmployeeId: transferData.currentEmployeeId,
        currentFixedGross: transferData.currentFixedGross,
        currentJoiningDate: transferData.currentJoiningDate,
        currentLocation: transferData.currentLocation,
        currentManagerId: transferData.currentManagerId,
        currentMonthlyBonus: transferData.currentMonthlyBonus,
        currentPosition: transferData.currentPosition,
        promotedCompany: transferData.promotedCompany,
        promotedContractType: transferData.promotedContractType,
        promotedCostCentre: newCostCentre,
        promotedCountry: transferData.promotedCountry,
        promotedDateOfReturn: transferData.promotedDateOfReturn,
        promotedDepartment: newDeptName,
        promotedDesignation: transferData.promotedDesignation,
        promotedEmployeeId: transferData.promotedEmployeeId,
        promotedFixedGross: parseInt(newGross),
        promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
        promotedLocation: parseInt(newLocation),
        promotedManagerId: transferData.promotedManagerId,
        promotedMonthlyBonus: transferData.promotedMonthlyBonus,
        promotedPosition: newPositionName,
        promotedRelocationBonus: parseInt(relocationBonus),
        promotedTermOfProject: transferData.promotedTermOfProject,
        remark: null,
        status: 1,
        transferId: transferData.transferId,
        transferLetter: null,
        transferType: transferData.transferType,
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
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body>
          {loader ? (
            <LoaderIcon />
          ) : transferData !== null &&
            transferData !== undefined &&
            Object.keys(transferData).length !== 0 &&
            transferData.currentContractType !== null &&
            transferData.currentContractType !== undefined &&
            (transferData.currentContractType !== "Permanent" ||
              transferData.currentContractType !== "permanent") ? (
            <ApointmentLetter />
          ) : transferData !== null &&
            transferData !== undefined &&
            Object.keys(transferData).length !== 0 &&
            transferData.currentContractType !== null &&
            transferData.currentContractType !== undefined &&
            (transferData.currentContractType !== "parttime" ||
              transferData.currentContractType !== "Parttime") ? (
            <PartTimeAppointmentLetter />
          ) : transferData !== null &&
            transferData !== undefined &&
            Object.keys(transferData).length !== 0 &&
            transferData.currentContractType !== null &&
            transferData.currentContractType !== undefined &&
            (transferData.currentContractType !== "Local Expat" ||
              transferData.currentContractType !== "local expat") ? (
            <LocalExpactAppointmentLetter />
          ) : (
            ""
          )}
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
                {transferData &&
                transferData !== null &&
                transferData !== undefined &&
                Object.keys(transferData).length !== 0 ? (
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
                          <Col md={2}>Transfer Type: </Col>
                          <Col md={8} className="text-primary">
                            {transferData.transferType}
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col md={2}>Employee Name: </Col>
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
                            {transferData.currentCostCentre}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Contract Type:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData.currentContractType}
                          </Col>
                        </Form.Group>
                        <Row className="mb-4">
                          <Col md={2}>Manager Name</Col>
                          <Col md={8} className="text-primary">
                            {transferData.currentManagerName +
                              " " +
                              transferData.currentManagerId}
                          </Col>
                        </Row>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationDept"
                        >
                          <Col md={2}>
                            <Form.Label>Cost Center Name:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData.currentManagerCostCentre}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Contract Type:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData.currentManagerContractType}
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationDept"
                        >
                          <Col md={2}>
                            <Form.Label>UAN Number:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData !== null &&
                            transferData !== undefined &&
                            Object.keys(transferData).length !== 0 &&
                            transferData.internationalTransfer !== null &&
                            transferData.internationalTransfer !== undefined
                              ? transferData.internationalTransfer.uanNumber
                              : "(No Documents Available)"}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Bank Account Number:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData !== null &&
                            transferData !== undefined &&
                            Object.keys(transferData).length !== 0 &&
                            transferData.internationalTransfer !== null &&
                            transferData.internationalTransfer !== undefined
                              ? transferData.internationalTransfer
                                  .bankAccountNumber
                              : "(No Documents Available)"}
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationDept"
                        >
                          <Col md={2}>
                            <Form.Label>PAN Number:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData !== null &&
                            transferData !== undefined &&
                            Object.keys(transferData).length !== 0 &&
                            transferData.internationalTransfer !== null &&
                            transferData.internationalTransfer !== undefined
                              ? transferData.internationalTransfer.panNumber
                              : ""}
                            &nbsp;&nbsp;
                            {transferData !== null &&
                            transferData !== undefined &&
                            Object.keys(transferData).length !== 0 &&
                            transferData.internationalTransfer !== null &&
                            transferData.internationalTransfer !== undefined &&
                            transferData.internationalTransfer.panNumberDoc !==
                              null &&
                            transferData.internationalTransfer.panNumberDoc !==
                              undefined ? (
                              <a
                                href={
                                  "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                                  transferData.internationalTransfer
                                    .panNumberDoc
                                }
                                target="_blank"
                              >
                                {" "}
                                <u className="text-primary">View</u>
                              </a>
                            ) : (
                              "(No Documents Available)"
                            )}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Aadhaar Number:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData !== null &&
                            transferData !== undefined &&
                            Object.keys(transferData).length !== 0 &&
                            transferData.internationalTransfer !== null &&
                            transferData.internationalTransfer !== undefined
                              ? transferData.internationalTransfer.aadhaarNumber
                              : ""}
                            &nbsp;&nbsp;
                            {transferData !== null &&
                            transferData !== undefined &&
                            Object.keys(transferData).length !== 0 &&
                            transferData.internationalTransfer !== null &&
                            transferData.internationalTransfer !== undefined &&
                            transferData.internationalTransfer
                              .aadhaarNumberDoc !== null &&
                            transferData.internationalTransfer
                              .aadhaarNumberDoc !== undefined ? (
                              <a
                                href={
                                  "http://humine-application.s3-website.ap-south-1.amazonaws.com/" +
                                  transferData.internationalTransfer
                                    .aadhaarNumberDoc
                                }
                                target="_blank"
                              >
                                {" "}
                                <u className="text-primary">View</u>
                              </a>
                            ) : (
                              "(No Documents Available)"
                            )}
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
                            {transferData.currentCompany}
                          </Col>
                          <Col md={2}>
                            <Form.Label>New Entity:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData.promotedCompany}
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
                            {transferData.currentFixedGross}
                          </Col>
                          <Col md={2}>
                            <Form.Label>New Fixed Gross:</Form.Label>
                          </Col>
                          {transferData.promotedFixedGross ? (
                            <Col md={3} className="text-primary">
                              {transferData.promotedFixedGross}
                            </Col>
                          ) : (
                            <Col md={3} className="text-primary">
                              <Form.Control
                                type="text"
                                placeholder="New Fixed Gross"
                                value={newGross}
                                className="text-primary"
                                onChange={changeGrossHandler}
                              ></Form.Control>
                              {grossErrMsg !== "" && (
                                <span className="text-danger">
                                  {grossErrMsg}
                                </span>
                              )}
                            </Col>
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationCostCentre"
                        >
                          <Col md={2}>
                            <Form.Label>Effective Date:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData.promotedJoiningDate}
                          </Col>
                          <Col md={2}>
                            <Form.Label>Relocation Bonus:</Form.Label>
                          </Col>
                          {transferData.promotedRelocationBonus ? (
                            <Col md={3} className="text-primary">
                              {transferData.promotedRelocationBonus}
                            </Col>
                          ) : (
                            <Col md={3}>
                              <Form.Control
                                type="text"
                                placeholder="Relocation Bonus"
                                value={relocationBonus}
                                className="text-primary"
                                onChange={changeRelocationBonusHandler}
                              ></Form.Control>
                              {relocationBonusErrMsg !== "" && (
                                <span className="text-danger">
                                  {relocationBonusErrMsg}
                                </span>
                              )}
                            </Col>
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationCostCentre"
                        >
                          <Col md={2}>
                            <Form.Label>New Cost Center:</Form.Label>
                          </Col>
                          {/* {transferData.promotedCostCentre ? (
                            <Col md={3} className="text-primary">
                              {transferData.promotedCostCentre}
                            </Col>
                          ) : ( */}
                          <Col md={3}>
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
                              <span className="text-danger">
                                {costCentreErrMsg}
                              </span>
                            )}
                          </Col>
                          {/* )} */}
                          <Col md={2}>
                            <Form.Label>New Location:</Form.Label>
                          </Col>
                          {transferData.promotedLocation ? (
                            <Col md={3} className="text-primary">
                              {transferData.promotedLocation}
                            </Col>
                          ) : (
                            <Col md={3}>
                              <Form.Control
                                as="select"
                                className="text-primary"
                                aria-label="transferInitiationLocation"
                                value={newLocation}
                                placeholder="Select Location"
                                onChange={changeLocationHandler}
                              >
                                <option>Select Location</option>
                                {costCentreLocationData !== null &&
                                  costCentreLocationData !== undefined &&
                                  Object.keys(costCentreLocationData).length !==
                                    0 && (
                                    <option
                                      value={costCentreLocationData.locationId}
                                    >
                                      {costCentreLocationData.locationName}
                                    </option>
                                  )}
                              </Form.Control>
                              {locationErrMsg !== "" && (
                                <span className="text-danger">
                                  {locationErrMsg}
                                </span>
                              )}
                            </Col>
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationCostCentre"
                        >
                          <Col md={2}>
                            <Form.Label>Company:</Form.Label>
                          </Col>
                          <Col md={3} className="text-primary">
                            {transferData.promotedCompany}
                          </Col>
                          <Col md={2}>
                            <Form.Label>New Department:</Form.Label>
                          </Col>
                          {transferData.promotedDepartment ? (
                            <Col md={3} className="text-primary">
                              {transferData.promotedDepartment}
                            </Col>
                          ) : (
                            <Col md={3}>
                              <Form.Control
                                as="select"
                                className="text-primary"
                                aria-label="department"
                                value={newDept}
                                placeholder="Select Location"
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
                                <span className="text-danger">
                                  {deptErrMsg}
                                </span>
                              )}
                            </Col>
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationCostCentre"
                        >
                          <Col md={2}>
                            <Form.Label>Date Of Joining:</Form.Label>
                          </Col>

                          <Col md={3}>
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
                              <span className="text-danger">
                                {effectiveDateErrMsg}
                              </span>
                            )}
                          </Col>
                          <Col md={2}>
                            <Form.Label>New Position:</Form.Label>
                          </Col>
                          {transferData.promotedPosition ? (
                            <Col md={3} className="text-primary">
                              {transferData.promotedPosition}
                            </Col>
                          ) : (
                            <Col md={3}>
                              <Form.Control
                                as="select"
                                className="text-primary"
                                aria-label="transferInitiationPosition"
                                value={newPosition}
                                placeholder="Select Position"
                                onChange={changePositionHandler}
                              >
                                <option>Select Position</option>
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
                                <span className="text-danger">
                                  {positionErrMsg}
                                </span>
                              )}
                            </Col>
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
                              className={
                                formValid ? "confirmButton" : "stepperButtons"
                              }
                              onClick={submitHandler}
                            >
                              Save
                            </button>
                            {initiationStatus && (
                              <button
                                className={"LettersProbButtons"}
                                onClick={showTransferLetterModal}
                              >
                                {previewTransferLetter
                                  ? "Preview Appointment Letter"
                                  : "Generate Appointment Letter"}
                              </button>
                            )}

                            {initiationStatus && previewTransferLetter && (
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
                ) : (
                  ""
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
