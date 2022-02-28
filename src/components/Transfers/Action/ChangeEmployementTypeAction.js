import React, { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { Search } from "react-feather";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import PartTimeToFullTimeLetter from "../Initiation/partTimeToFullTimeLetter";
import FullTimeToPartTimeLetter from "../Initiation/fullTimeToPartTimeLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory, useParams } from "react-router-dom";
import "../../Transfers/Transfers.css";

const ChangeEmployementTypeAction = () => {
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
    getApointmentLetter,
    transferData,
    getTransferData,
    setLetterViewing,
    letterView,
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
    if (transferId !== null && transferId !== undefined) {
      getTransferData(transferId);
    }
  }, [transferId]);
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

  const changeEmployementHandler = (e) => {
    setNewEmployement(e.target.value);
    setNewEmployementErrMsg("");
    setGrossErrMsg("");
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
    history.push("/transfers");
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
    const Valid = /^[0-9\b]+$/;

    if (searchInput === "") {
      validForm = false;
      setEmpErrMsg("Please enter employee id or employee name");
    }

    if (newEmployement === "") {
      validForm = false;
      setNewEmployementErrMsg("Please select new Employment");
    }
    // if (newCostCentre === "") {
    //   validForm = false;
    //   setCostCentreErrMsg("Please select cost centre");
    // }

    if (newGross === "") {
      validForm = false;

      setGrossErrMsg("Please enter fixed gross");
      console.log("validForm", validForm);
    } else if (
      newEmployement !== null &&
      newEmployement !== undefined &&
      newEmployement !== "" &&
      newEmployement === "From Part Time to Full Time"
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
      newEmployement !== null &&
      newEmployement !== undefined &&
      newEmployement !== "" &&
      newEmployement === "From Full Time to Part Time"
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

    // if (
    //   effectiveDate === "" ||
    //   effectiveDate === undefined ||
    //   effectiveDate === null
    // ) {
    //   validForm = false;
    //   setEffectiveDateErrMsg("Please enter effective date");
    // }

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
      promotedCompany: transferData.currentCompany,
      promotedContractType: transferData.promotedContractType,
      salaryType: transferData.salaryType,
      promotedCostCentre: transferData.promotedCostCentre,
      promotedCountry: transferData.promotedCountry,
      // promotedDateOfReturn: moment(DateOfTransfer).format("YYYY-MM-DD"),
      promotedDepartment: transferData.promotedDepartment,
      promotedDesignation: transferData.promotedDesignation,
      promotedEmployeeId: transferData.currentEmployeeId,
      promotedFixedGross: transferData.promotedFixedGross,
      promotedJoiningDate: transferData.promotedJoiningDate,
      promotedLocation: transferData.currentLocation,
      promotedManagerId: transferData.currentManagerId,
      promotedMonthlyBonus: transferData.currentMonthlyBonus,
      promotedPosition: transferData.currentPosition,
      promotedRelocationBonus: transferData.currentMonthlyBonus,
      promotedTermOfProject: transferData.promotedTermOfProject,
      status: 0,
      transferId: transferData.transferId,
      transferType: transferData.transferType,
    };
    console.log(InfoData);
    createTransferInitiation(InfoData);
    setFormValid(true);
    setLetterSent(true);
    setShowLetterSubmitModal(true);
    // setModalShow(true);
  };
  console.log(transferData, "transferData");
  return (
    <div className="transfer-initiation">
      <Breadcrumb title="TRANSFER VIEW" parent="TRANSFER VIEW" />
      <div className="container-fluid">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">TRANSFER ACTION </b>
          </div>
          <ToastContainer />
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
                  Transfer initiation letter details saved successfully
                </label>

                <div className="text-center mb-2">
                  <Button onClick={handleLetterSubmitModalClose}>Close</Button>
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
          {transferData !== null &&
          transferData !== undefined &&
          letterView &&
          Object.keys(transferData).length !== 0 &&
          transferData.promotedContractType !== null &&
          transferData.promotedContractType !== undefined &&
          transferData.promotedContractType !== "" &&
          (transferData.promotedContractType === "Fulltime" ||
            transferData.promotedContractType === "fulltime") ? (
            <PartTimeToFullTimeLetter />
          ) : transferData !== null &&
            transferData !== undefined &&
            letterView &&
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
          <Container className="ml-4 mt-4">
            <Row className="mb-4">
              <Col md={2}>Transfer Type: </Col>
              <Col md={8} className="text-primary">
                {transferData.transferType === "Employment Type Transfer"
                  ? "Change In Employment Type Transfer"
                  : transferData.transferType}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={2}>Employee Name: </Col>
              <Col md={8} className="text-primary">
                {transferData.employeeName} {transferData.currentEmployeeId}
              </Col>
            </Row>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="transferInitiationDept"
            >
              <Col className="font-weight-bold">
                <u>Work Information</u>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="transferInitiationDept"
            >
              <Col md={2}>Cost Center:</Col>
              <Col md={4} className="text-primary">
                {transferData.currentCostCentre}
              </Col>

              <Col md={2}>Contract Type:</Col>
              <Col md={4} className="text-primary">
                {transferData.currentContractType}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="transferInitiationDept"
            >
              <Col md={2} className="py-0">
                Change Employment:
              </Col>

              <Col md={4} className="text-primary">
                {transferData.promotedContractType}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="transferInitiationDept"
            >
              <Col className="font-weight-bold">
                <u>Remuneration Information</u>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="transferInitiationDept"
            >
              <Col md={2}>Salary Type:</Col>
              <Col md={4} className="text-primary">
                {transferData.salaryType}
              </Col>

              <Col md={2}>Fixed Gross:</Col>
              <Col md={4} className="text-primary">
                {transferData.promotedFixedGross}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="transferInitiationDept"
            >
              <Col md={2}>Effective Date:</Col>
              <Col md={4} className="text-primary">
                {transferData.promotedJoiningDate}
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
                  className={"LettersButtons"}
                  onClick={showTransferLetterModal}
                >
                  {previewTransferLetter
                    ? "Generate Transfer Letter"
                    : "Generate Transfer Letter"}
                </button>

                {/* {previewTransferLetter && (
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
                      onClick={submitHandler}
                      >
                      Submit
                    </button>
                  </div>
                )} */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmployementTypeAction;
