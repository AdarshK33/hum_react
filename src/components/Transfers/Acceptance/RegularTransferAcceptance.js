import React, { Fragment, useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import { TransferContext } from "../../../context/TransferState";
import { ToastContainer } from "react-toastify";
import TransferInitationLetter from "../Initiation/TransferInitiationLetter";
import calendarImage from "../../../assets/images/calendar-image.png";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";

const RegularTransferAcceptance = () => {
  const { transferId } = useParams();
  const {
    createTransferInitiation,
    initiationStatus,
    initiationTransferId,
    getTransferData,
    transferData,
    loader,
    getCostCentreLocationDetails,
    costCentreLocationData,
  } = useContext(TransferContext);

  // const [newLocation, setNewLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [locationErrMsg, setLocationErrMsg] = useState("");
  // const [newGross, setNewGross] = useState(transferData.promotedFixedGross);
  // const [newGross, setNewGross] = useState("");
  const [grossErrMsg, setGrossErrMsg] = useState("");
  // const [bonus, setBonus] = useState(
  //   transferData.promotedMonthlyBonus ? transferData.promotedMonthlyBonus : ""
  // );
  // const [relocationBonus, setRelocationBonus] = useState(
  //   transferData.promotedRelocationBonus
  // );
  // const [bonus, setBonus] = useState("");
  // const [relocationBonus, setRelocationBonus] = useState("");
  const [relocationBonusErrMsg, setRelocationBonusErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [reject, setReject] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showInitiationLetter, setShowInitiationLetter] = useState(false);
  const [previewTransferLetter, setPreviewTransferLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showLetterSubmitModal, setShowLetterSubmitModal] = useState(false);
  const [showModal, setModal] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const history = useHistory();
  const [state, setState] = useState({
    remarks: "",
    newGross: "",
    bonus: "",
    relocationBonus: "",
  });
  console.log("transferData", transferData);

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
    if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length !== 0
    ) {
      state.newGross = transferData.promotedFixedGross;
      state.bonus = transferData.promotedMonthlyBonus;
      state.relocationBonus = transferData.promotedRelocationBonus;
      if (
        transferData.promotedLocation !== null &&
        transferData.promotedLocation !== undefined
      ) {
        setNewLocation(transferData.promotedLocation);
      } else {
        setNewLocation("");
      }
      if (
        transferData.remark !== null &&
        transferData.remark !== undefined &&
        transferData.remark !== ""
      ) {
        state.remarks = transferData.remark;
      } else {
        state.remarks = "";
      }
    }
  }, [transferData]);

  useEffect(() => {
    initiationStatus === true ? setModalShow(true) : setModalShow(false);
  }, [initiationStatus]);

  const changeLocationHandler = (e) => {
    setNewLocation(e.target.value);
    setLocationErrMsg("");
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  const handleClose1 = () => {
    setModal(false);
    setReject(false);
    state.remarks = "";
  };
  const handleSaveRemarks = () => {
    if (
      state.remarks !== "" &&
      state.remarks !== null &&
      state.remarks !== undefined
    ) {
      setRemarkError(false);
      setModal(false);
      setReject(false);
    } else {
      setRemarkError(true);
      setReject(false);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
    if (reject === true) {
      history.push("../transfers");
    }
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
    history.push("../transfers");
  };

  /* Validate form */
  const validateLocation = () => {
    if (newLocation !== "") {
      console.log("new location");
      setLocationErrMsg("");
      return true;
    } else {
      setLocationErrMsg("Please select location");
      return false;
    }
  };
  const validateNewCross = () => {
    if (state.newGross !== "") {
      setGrossErrMsg("");
      return true;
    } else {
      setGrossErrMsg("Please enter fixed gross");
      return false;
    }
  };
  const validateRelocationBonus = () => {
    if (state.relocationBonus !== "") {
      setRelocationBonusErrMsg("");
      return true;
    } else {
      setRelocationBonusErrMsg("Please enter relocation bonus");
      return false;
    }
  };
  const validateForm = () => {
    if (
      (validateLocation() === true) &
      (validateNewCross() === true) &
      (validateRelocationBonus() === true)
    ) {
      console.log("true");
      return true;
    } else {
      return false;
    }

    // if (newLocation === "") {
    //   validForm = false;
    //   setLocationErrMsg("Please select location");
    // }

    // if (state.newGross === "") {
    //   validForm = false;
    //   setGrossErrMsg("Please enter fixed gross");
    // }

    // if (state.relocationBonus === "") {
    //   validForm = false;
    //   setRelocationBonusErrMsg("Please enter relocation bonus");
    // }

    // return validForm;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validFormRes = validateForm();
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
        promotedCostCentre: transferData.promotedCostCentre,
        promotedCountry: transferData.promotedCountry,
        promotedDateOfReturn: transferData.promotedDateOfReturn,
        promotedDepartment: transferData.promotedDepartment,
        promotedDesignation: transferData.promotedDesignation,
        promotedEmployeeId: transferData.promotedEmployeeId,
        promotedFixedGross: transferData.promotedFixedGross,
        promotedJoiningDate: transferData.promotedJoiningDate,
        promotedLocation: newLocation,
        promotedManagerId: transferData.promotedManagerId,
        promotedMonthlyBonus: transferData.promotedMonthlyBonus,
        promotedPosition: transferData.promotedPosition,
        promotedRelocationBonus: transferData.promotedRelocationBonus,
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
  const RejectHandler = (e) => {
    e.preventDefault();
    setReject(true);
    if (
      state.remarks !== "" &&
      state.remarks !== null &&
      state.remarks !== undefined
    ) {
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
        promotedCostCentre: transferData.promotedCostCentre,
        promotedCountry: transferData.promotedCountry,
        promotedDateOfReturn: transferData.promotedDateOfReturn,
        promotedDepartment: transferData.promotedDepartment,
        promotedDesignation: transferData.promotedDesignation,
        promotedEmployeeId: transferData.promotedEmployeeId,
        promotedFixedGross: transferData.promotedFixedGross,
        promotedJoiningDate: transferData.promotedJoiningDate,
        promotedLocation: transferData.promotedLocation,
        promotedManagerId: transferData.promotedManagerId,
        promotedMonthlyBonus: transferData.promotedMonthlyBonus,
        promotedPosition: transferData.promotedPosition,
        promotedRelocationBonus: transferData.promotedRelocationBonus,
        promotedTermOfProject: transferData.promotedTermOfProject,
        remark: state.remarks,
        status: 2,
        transferId: transferData.transferId,
        transferLetter: null,
        transferType: transferData.transferType,
      };
      console.log(InfoData);
      createTransferInitiation(InfoData);
    } else {
      setModal(true);
    }
  };

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Modal show={showModal} onHide={() => handleClose1()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            {/* <label className="itemResult">State remarks:</label> */}
            <label className="itemResult">
              Please state the reason for reject :
            </label>
            {/* <p>Please state the reason why this employee cannot be re-hired:</p> */}
            <textarea
              className="remarkText rounded"
              name="remarks"
              value={state.remarks}
              placeholder="Write here.."
              onChange={(e) => changeHandler(e)}
            />

            {remarkError && (
              <p style={{ color: "red" }}>Please add your remarks</p>
            )}
            <div className="text-center mb-2">
              <Button onClick={() => handleSaveRemarks()}>Save</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Modal show={modalShow} onHide={handleModalClose} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              {reject === true
                ? "Transfer rejected details saved successfully!"
                : "Transfer accepted details saved successfully"}
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
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <TransferInitationLetter transferId={initiationTransferId} />
            <br></br>
            <Row>
              {/* {showSignature ? (
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
              )} */}
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
        </Container>
      </Modal>

      <Modal
        show={showLetterSubmitModal}
        onHide={handleLetterSubmitModalClose}
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
              <Button variant="primary" onClick={handleLetterSubmitModalClose}>
                Close
              </Button>
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
                    <Row className="mx-5 mt-5">
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
                        <Row className="mb-4">
                          <Col
                            md={{ span: 4, offset: 2 }}
                            className="font-weight-bold my-2"
                          >
                            Current
                          </Col>
                          <Col
                            md={{ span: 4, offset: 2 }}
                            className="font-weight-bold my-2"
                          >
                            New
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col md={2}>Department</Col>
                          <Col md={4} className="text-primary">
                            {transferData.currentDepartment}
                          </Col>
                          <Col
                            md={{ span: 4, offset: 2 }}
                            className="text-primary"
                          >
                            {transferData.promotedDepartment}
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col md={2}>Cost Centre</Col>
                          <Col md={4} className="text-primary">
                            {transferData.currentCostCentre}
                          </Col>
                          <Col
                            md={{ span: 4, offset: 2 }}
                            className="text-primary"
                          >
                            {transferData.promotedCostCentre}
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col md={2}>Manager</Col>
                          <Col md={4} className="text-primary">
                            {transferData.currentManagerName}
                          </Col>
                          <Col
                            md={{ span: 4, offset: 2 }}
                            className="text-primary"
                          >
                            {transferData.promotedManagerName}
                          </Col>
                        </Row>

                        <Row className="mb-4">
                          <Col md={2}>Position</Col>
                          <Col md={4} className="text-primary">
                            {transferData.currentPosition}
                          </Col>
                          <Col
                            md={{ span: 4, offset: 2 }}
                            className="text-primary"
                          >
                            {transferData.promotedPosition}
                          </Col>
                        </Row>

                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="transferInitiationLocation"
                        >
                          <Form.Label column md={2}>
                            Location
                          </Form.Label>
                          <Col md={4} className="text-primary">
                            {transferData.currentLocationName}
                          </Col>
                          <Col md={{ span: 4, offset: 2 }}>
                            <Form.Control
                              as="select"
                              className="text-primary"
                              aria-label="transferAcceptanceLocation"
                              value={newLocation}
                              placeholder="Select Location"
                              onChange={changeLocationHandler}
                            >
                              <option>Select Location</option>
                              {costCentreLocationData !== null &&
                                costCentreLocationData !== undefined &&
                                Object.keys(costCentreLocationData).length !==
                                  0 &&
                                costCentreLocationData.map((item) => {
                                  return (
                                    <option value={item.stateId}>
                                      {item.stateName}
                                    </option>
                                  );
                                })}
                            </Form.Control>
                            {locationErrMsg !== "" && (
                              <span className="text-danger">
                                {locationErrMsg}
                              </span>
                            )}
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column md={2} className="py-0">
                            Bonus In Percent
                          </Form.Label>
                          <Col md={4} className="text-primary">
                            {transferData.promotedMonthlyBonus !== null &&
                            transferData.promotedMonthlyBonus !== undefined &&
                            transferData.promotedMonthlyBonus !== 0
                              ? transferData.promotedMonthlyBonus + "%"
                              : "NA"}
                          </Col>

                          <Col md={2} className="py-0">
                            Relocation Bonus
                          </Col>
                          <Col md={4} className="text-primary">
                            {transferData.promotedRelocationBonus !== null &&
                            transferData.promotedRelocationBonus !==
                              undefined &&
                            transferData.promotedRelocationBonus !== ""
                              ? transferData.promotedRelocationBonus
                              : "NA"}
                          </Col>
                        </Form.Group>
                        <Row className="mb-4">
                          <Col md={2} className="py-0">
                            Effective Date
                          </Col>
                          <Col md={4} className="text-primary">
                            {transferData.promotedJoiningDate}
                          </Col>
                        </Row>
                        {state.remarks !== "" &&
                        state.remarks !== null &&
                        state.remarks !== undefined ? (
                          <Row className="mb-4">
                            <Col md={2} className="py-0">
                              Reason for transfer rejection
                            </Col>
                            <Col md={4} className="text-primary">
                              {state.remarks}
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}

                        <Row>
                          <Col
                            style={{
                              marginTop: "2rem",
                              marginBottom: "2rem",
                              textAlign: "center",
                            }}
                          >
                            {reject === false && state.remarks === "" ? (
                              <button
                                disabled={formValid}
                                className={
                                  formValid ? "confirmButton" : "stepperButtons"
                                }
                                onClick={submitHandler}
                              >
                                Save & Accept
                              </button>
                            ) : (
                              ""
                            )}
                            {formValid === false ? (
                              <button
                                disabled={reject}
                                className={
                                  reject ? "confirmButton" : "stepperButtons"
                                }
                                onClick={RejectHandler}
                              >
                                {state.remarks !== "" &&
                                state.remarks !== null &&
                                state.remarks !== undefined
                                  ? "Submit"
                                  : "Reject"}
                              </button>
                            ) : (
                              ""
                            )}

                            {initiationStatus && reject === false && (
                              <button
                                className={"LettersButtons"}
                                onClick={showTransferLetterModal}
                              >
                                {previewTransferLetter
                                  ? "Preview Transfer Letter"
                                  : "View Transfer Letter"}
                              </button>
                            )}

                            {initiationStatus &&
                              previewTransferLetter &&
                              reject === false && (
                                <div className="preview-section">
                                  {/* <br></br>
                                  <br></br>
                                  <img
                                    src={calendarImage}
                                    alt="calendar"
                                    width="200px"
                                  /> */}
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

export default RegularTransferAcceptance;
