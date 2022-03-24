import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import ApointmentLetter from "../Acceptance/ApointmentLetter";
import PartTimeAppointmentLetter from "../Acceptance/partTimeApointmentLetter";
import LocalExpactAppointmentLetter from "../Acceptance/localExpactAppointmentLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory, useParams } from "react-router-dom";
import { Fragment } from "react";
import { AppContext } from "../../../context/AppState";
import LoaderIcon from "../../Loader/LoaderIcon";
import { BonusContext } from "../../../context/BonusState";

const EntityTransferAction = () => {
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
    setLetterViewing,
    letterView,
  } = useContext(TransferContext);
  const { viewBonusByContarctType, getBonusByContractType } =
    useContext(BonusContext);
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
  const [bonus, setBonus] = useState(0);
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
      Object.keys(transferData).length !== 0 &&
      newDeptName !== "" &&
      newDeptName !== null &&
      newDeptName !== undefined &&
      newPositionName !== "" &&
      newPositionName !== null &&
      newPositionName !== undefined
    ) {
      viewBonusByContarctType(
        transferData.currentContractType,
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
    if (
      newCostCentre !== null &&
      newCostCentre !== undefined &&
      newCostCentre !== ""
    ) {
      getCostCentreLocationDetails(newCostCentre);
    }
  }, [newCostCentre]);
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
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0 &&
      newDeptName !== "" &&
      newDeptName !== undefined &&
      newDeptName !== null
    ) {
      getCostCentreDetails(transferData.promotedCompany, newDeptName);
    }
  }, [initiationEmpData, newDeptName]);

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
    console.log("generate letter", transferData);
    if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0
      //   &&
      //   transferData.promotedEmployeeId !== null &&
      //   transferData.promotedEmployeeId !== undefined &&
      //   transferData.promotedEmployeeId !== ""
    ) {
      getApointmentLetter(transferData.promotedEmployeeId);
      setShowInitiationLetter(true);
      setLetterViewing(true);
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
    const Valid = /^[0-9\b]+$/;

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
    } else if (!Valid.test(relocationBonus)) {
      validForm = false;
      setRelocationBonusErrMsg("Please enter  digits");
    }
    if (newGross === "") {
      validForm = false;

      setGrossErrMsg("Please enter fixed gross");
      console.log("validForm", validForm);
    } else if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0 &&
      (transferData.currentContractType === "Fulltime" ||
        transferData.currentContractType === "fulltime")
    ) {
      if (Valid.test(newGross)) {
        if (parseInt(newGross) < 18000) {
          validForm = false;
          setGrossErrMsg("Value should be greater than 18000");
          console.log("validForm", validForm);
        }
      } else {
        validForm = false;
        setGrossErrMsg("Value should be number");
      }
    } else if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0 &&
      (transferData.currentContractType === "Parttime" ||
        transferData.currentContractType === "parttime")
    ) {
      if (Valid.test(newGross)) {
        if (parseInt(newGross) < 90 || parseInt(newGross) > 400) {
          validForm = false;
          setGrossErrMsg("Value should be between 90 - 400");
          console.log("validForm", validForm);
        }
      } else {
        validForm = false;
        setGrossErrMsg("Value should be number");
      }
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
      currentLocation:
        transferData.currentLocation !== null &&
        transferData.currentLocation !== undefined
          ? transferData.currentLocation
          : 0,
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
      promotedMonthlyBonus:
        bonus !== "" && bonus !== null && bonus !== undefined
          ? parseInt(bonus)
          : 0,
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
    setLetterSent(true);
    setShowLetterSubmitModal(true);
  };

  return (
    <Fragment>
      <ToastContainer />

      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        {/* <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body className="mx-auto">
          <label className="text-center">
            Transfer Initiation done successfully!
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
              Transfer Approved details saved successfully
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      {/* <Modal
        show={showInitiationLetter}
        onHide={handleTransferLetterModalClose}
        size="md"
      >
        <Modal.Header closeButton className="modal-line"></Modal.Header>
        <Modal.Body> */}
      {loader ? (
        <LoaderIcon />
      ) : transferData !== null &&
        transferData !== undefined &&
        letterView &&
        Object.keys(transferData).length !== 0 &&
        transferData.currentContractType !== null &&
        transferData.currentContractType !== undefined &&
        (transferData.currentContractType === "Fulltime" ||
          transferData.currentContractType === "fulltime") ? (
        <ApointmentLetter />
      ) : transferData !== null &&
        transferData !== undefined &&
        letterView &&
        Object.keys(transferData).length !== 0 &&
        transferData.currentContractType !== null &&
        transferData.currentContractType !== undefined &&
        (transferData.currentContractType === "parttime" ||
          transferData.currentContractType === "Parttime") ? (
        <PartTimeAppointmentLetter />
      ) : transferData !== null &&
        transferData !== undefined &&
        letterView &&
        Object.keys(transferData).length !== 0 &&
        transferData.currentContractType !== null &&
        transferData.currentContractType !== undefined &&
        (transferData.currentContractType === "Local Expat" ||
          transferData.currentContractType === "local expat") ? (
        <LocalExpactAppointmentLetter />
      ) : (
        ""
      )}
      {/* <br></br>

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
      </Modal> */}

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
              Transfer letter details saved successfully, employee has been
              notified
            </label>

            <div className="text-center mb-2">
              <Button onClick={handleLetterSubmitModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Breadcrumb title="TRANSFER ACTION" parent="TRANSFER ACTION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>TRANSFER ACTION </b>
                </div>
                <Container className="ml-4 mt-4">
                  {transferData &&
                  transferData !== null &&
                  transferData !== undefined &&
                  Object.keys(transferData).length !== 0 ? (
                    <Form>
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
                          <Form.Label>Cost Center:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentCostCentre}
                        </Col>
                        <Col md={2}>
                          <Form.Label>Contract Type:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentContractType}
                        </Col>
                      </Form.Group>
                      <Row className="mb-4">
                        <Col md={2}>Manager Name</Col>
                        <Col md={10} className="text-primary">
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
                          <Form.Label>Cost Center:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentManagerCostCentre}
                        </Col>
                        <Col md={2}>
                          <Form.Label>Contract Type:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentManagerContractType}
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationDept"
                      ></Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationDept"
                      >
                        <Col className="font-weight-bold">
                          <u>Documents</u>
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
                        <Col md={4} className="text-primary">
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
                        <Col md={4} className="text-primary">
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
                        <Col md={4} className="text-primary">
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
                                process.env.REACT_APP_S3_URL +
                                transferData.internationalTransfer.panNumberDoc
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
                        <Col md={4} className="text-primary">
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
                                process.env.REACT_APP_S3_URL +
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
                      <Row style={{ marginTop: "3rem" }}></Row>
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
                          <Form.Label> Entity:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentCompany}
                        </Col>
                        <Col md={2}>
                          <Form.Label> Entity:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedCompany}
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationCostCentre"
                      >
                        <Col md={2}>
                          <Form.Label> Department:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentDepartment}
                        </Col>
                        <Col md={2}>
                          <Form.Label> Department:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedDepartment}
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationCostCentre"
                      >
                        <Col md={2}>
                          <Form.Label> Cost Center:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentCostCentre}
                        </Col>
                        <Col md={2}>
                          <Form.Label> Cost Center:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedCostCentre}
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationCostCentre"
                      >
                        <Col md={2}>
                          <Form.Label>Manager:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentManagerName}
                        </Col>
                        <Col md={2}>
                          <Form.Label> Manager:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedManagerName}
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationCostCentre"
                      >
                        <Col md={2}>
                          <Form.Label> Location:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentLocationName}
                        </Col>

                        <Col md={2}>
                          <Form.Label> Location:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedLocationName}
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationCostCentre"
                      >
                        <Col md={2}>
                          <Form.Label> Position:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.currentPosition}
                        </Col>
                        <Col md={2}>
                          <Form.Label> Position:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedPosition}
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
                          {transferData.currentFixedGross}
                        </Col>
                        <Col md={2}>
                          <Form.Label> Fixed Gross:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedFixedGross}
                        </Col>
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
                          {transferData.promotedMonthlyBonus}
                        </Col>
                        <Col md={2}>
                          <Form.Label>Relocation Bonus:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedRelocationBonus}
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="transferInitiationCostCentre"
                      >
                        <Col md={2}>
                          <Form.Label>Effective Date:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedJoiningDate}
                        </Col>
                        <Col md={2}>
                          <Form.Label>Date Of Joining:</Form.Label>
                        </Col>
                        <Col md={4} className="text-primary">
                          {transferData.promotedJoiningDate}
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
                        <Col md={4} className="text-primary">
                          {transferData.currentJoiningDate}
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
                          <button disabled={true} className={"confirmButton"}>
                            Save
                          </button>
                          <button
                            className={"LettersProbButtons"}
                            onClick={showTransferLetterModal}
                          >
                            {previewTransferLetter
                              ? "Generate Appointment Letter"
                              : "Generate Appointment Letter"}
                          </button>

                          {/* { previewTransferLetter && (
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
                                  onClick={submitHandler}
                                >
                                  Submit
                                </button>
                              </div>
                            )} */}
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    ""
                  )}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EntityTransferAction;
