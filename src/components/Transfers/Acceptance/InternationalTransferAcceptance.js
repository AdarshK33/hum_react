import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Breadcrumb from "../../common/breadcrumb";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TransferContext } from "../../../context/TransferState";
import LoaderIcon from "../../Loader/LoaderIcon";
import NoDataComp from "../../no-data/NoData.component";

const InternationalTransferAcceptance = () => {
  const { transferId } = useParams();
  const history = useHistory();
  const {
    createTransferInitiation,
    initiationStatus,
    getTransferData,
    transferData,
    loader,
  } = useContext(TransferContext);

  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [effectiveDateErrMsg, setEffectiveDateErrMsg] = useState("");
  const [returnDate, setReturnDate] = useState(new Date());
  const [returnDateErrMsg, setReturnDateErrMsg] = useState("");
  const [countryInsurance, setCountryInsurance] = useState(false);
  const [contractStatus, setContractStatus] = useState("");
  const [contractStatusErrMsg, setContractStatusErrMsg] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [projectTerm, setProjectTerm] = useState(0);
  const [projectTermErrMsg, setProjectTermErrMsg] = useState("");

  useEffect(() => {
    if (transferId !== null && transferId !== undefined) {
      getTransferData(transferId);
    }
  }, [transferId]);

  useEffect(() => {
    if (
      transferData !== null &&
      transferData !== undefined &&
      Object.keys(transferData).length > 0
    ) {
      setEffectiveDate(new Date(transferData.promotedJoiningDate));
      setReturnDate(new Date(transferData.promotedDateOfReturn));
      setProjectTerm(
        transferData.promotedTermOfProject !== null &&
          transferData.promotedTermOfProject !== "" &&
          transferData.promotedTermOfProject !== undefined
          ? transferData.promotedTermOfProject === "1 Year"
            ? 1
            : transferData.promotedTermOfProject === "2 Years"
            ? 2
            : transferData.promotedTermOfProject === "3 Years"
            ? 3
            : transferData.promotedTermOfProject === "4 Years"
            ? 4
            : transferData.promotedTermOfProject === "5 Years"
            ? 5
            : 0
          : 0
      );
      setCountryInsurance(transferData.isInsuranceCovered);
    }
  }, [transferData]);

  useEffect(() => {
    initiationStatus === true ? setModalShow(true) : setModalShow(false);
  }, [initiationStatus]);

  useEffect(() => {
    if (formValid === true) {
      const initiationData = {
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
        promotedCostCentre: transferData.promotedCostCentre,
        promotedCountry: transferData.promotedCountry,
        promotedDateOfReturn: moment(returnDate).format("YYYY-MM-DD"),
        promotedDesignation: transferData.promotedDesignation,
        promotedFixedGross: transferData.promotedFixedGross,
        promotedJoiningDate: moment(effectiveDate).format("YYYY-MM-DD"),
        promotedManagerId: transferData.promotedManagerId,
        promotedManagerName: transferData.promotedManagerName,
        promotedMonthlyBonus: transferData.promotedMonthlyBonus,
        remark: null,
        status: 1,
        transferId: transferData.transferId,
        transferLetter: null,
        transferType: transferData.transferType,
        isInsuranceCovered: countryInsurance,
        currency: transferData.currency,
        promotedManagerEmailId: transferData.promotedManagerEmailId,
        promotedTermOfProject:
          projectTerm !== "0" && projectTerm === "1"
            ? projectTerm + " Year"
            : projectTerm + " Years",
        contractStatus: contractStatus,
      };
      createTransferInitiation(initiationData);
    }
  }, [formValid]);
  const changeEffectiveDateHandler = (Val) => {
    setEffectiveDate(Val);
    setEffectiveDateErrMsg("");
    let date = Val;
    console.log(date);
    // console.log("i am here", date.length);
    if (date !== "" && date !== null && date !== undefined) {
      ChangeReturnDate(date);
      var fullDate = new Date(
        date.setFullYear(date.getFullYear() - parseInt(projectTerm))
      );
    } else {
      setReturnDate(new Date());
    }
  };
  const ChangeReturnDate = (date) => {
    var fullDate = new Date(
      date.setFullYear(date.getFullYear() + parseInt(projectTerm))
    );
    setReturnDate(fullDate);
  };
  const changeReturnDateHandler = (date) => {
    setReturnDate(date);
    setReturnDateErrMsg("");
  };

  const countryInsuranceHandler = (e) => {
    e.target.value === "Yes"
      ? setCountryInsurance(true)
      : setCountryInsurance(false);
  };

  const changeContractStatusHandler = (e) => {
    setContractStatus(e.target.value);
    setContractStatusErrMsg("");
  };
  const changeProjectTermHandler = (e) => {
    setProjectTerm(e.target.value);
    console.log("year->", e.target.value);
    setProjectTermErrMsg("");
    if (
      effectiveDate !== null &&
      effectiveDate !== undefined &&
      effectiveDate !== "" &&
      e.target.value !== "0"
    ) {
      setReturnDate(
        new Date(
          returnDate.setFullYear(
            effectiveDate.getFullYear() + parseInt(e.target.value)
          )
        )
      );
    } else {
      setReturnDate(new Date());
    }
  };
  /* Validate form */
  const validateForm = () => {
    let validForm = true;

    if (effectiveDate === "") {
      validForm = false;
      setEffectiveDateErrMsg("Please enter onward date");
    }

    if (returnDate === "") {
      validForm = false;
      setReturnDateErrMsg("Please enter return date");
    }

    if (contractStatus === "") {
      validForm = false;
      setContractStatusErrMsg("Please select contract status");
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
    <div className="international-transfer-acceptance">
      <ToastContainer />
      <Modal show={modalShow} onHide={handleModalClose} size="md" centered>
        <Container>
          <Modal.Header closeButton className="modalHeader"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Tansfer Approved details saved successfully, employee has notified
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      <Breadcrumb title="TRANSFER ACCEPTANCE" parent="TRANSFER ACCEPTANCE" />
      <div className="container-fluid">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">TRANSFER ACCEPTANCE </b>
          </div>
          {loader ? (
            <LoaderIcon />
          ) : (
            <>
              {transferData !== null &&
              transferData !== undefined &&
              Object.keys(transferData).length > 0 ? (
                <Container className="ml-4 mt-4">
                  <Row className="mb-3">
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Transfer Type:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.transferType}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Employee Name:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.employeeName}
                          {" - "}
                          {transferData.currentEmployeeId}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "2rem" }}></Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Cost Centre Name:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.currentCostCentre}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Cost centre of the host country:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.promotedCostCentre}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Coutry Moving To:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.promotedCountry}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Designation:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.promotedDesignation}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Name of global mobility manager:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.promotedManagerName}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={5}>Email id of global mobility manager:</Col>
                        <Col md={7} className="text-primary">
                          {transferData.promotedManagerEmailId}
                        </Col>
                      </Row>
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
                              onChange={(e) => changeEffectiveDateHandler(e)}
                            />
                          </div>
                        </Col>
                        {effectiveDateErrMsg !== "" && (
                          <span className="text-danger">
                            {effectiveDateErrMsg}
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        as={Row}
                        controlId="transferInitiationReturnDate"
                      >
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
                              disabled={true}
                              onChange={(date) => {
                                changeReturnDateHandler(date);
                              }}
                            />
                          </div>
                        </Col>
                        {returnDateErrMsg !== "" && (
                          <span className="text-danger">
                            {returnDateErrMsg}
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col md={6}>
                      <Form.Group
                        as={Row}
                        controlId="transferInitiationProjectTerm"
                      >
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
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="4">4 Years</option>
                            <option value="5">5 Years</option>
                          </Form.Control>

                          {projectTermErrMsg !== "" && (
                            <span className="text-danger">
                              {projectTermErrMsg}
                            </span>
                          )}
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "2rem" }}></Row>
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
                              checked={
                                countryInsurance === false ? true : false
                              }
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
                      {" "}
                      <u>Remuneration</u>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col md={4}>
                      <Row>
                        <Col md={4}> Currency:</Col>
                        <Col md={8} className="text-primary">
                          {transferData.currency}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col md={4}>Fixed Gross:</Col>
                        <Col md={8} className="text-primary">
                          {transferData.promotedFixedGross}
                        </Col>
                      </Row>
                    </Col>

                    <Col md={4}>
                      <Row>
                        <Col md={5}>Bonus (%):</Col>
                        <Col md={7} className="text-primary">
                          {transferData.promotedMonthlyBonus}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "2rem" }}></Row>
                  <Row className="my-5">
                    <Col md={6}>
                      <Form.Group
                        as={Row}
                        controlId="transferInitiationContractStatus"
                      >
                        <Form.Label column md={5}>
                          Contract Status:
                        </Form.Label>
                        <Col md={7}>
                          <Form.Control
                            as="select"
                            className="text-primary"
                            aria-label="transferInitiationContractStatus"
                            value={contractStatus}
                            placeholder="Select Status"
                            onChange={changeContractStatusHandler}
                          >
                            <option>Select Status</option>
                            <option value="Freeze">Freeze</option>
                            <option value="Un Freeze">Un Freeze</option>
                          </Form.Control>
                          {contractStatusErrMsg !== "" && (
                            <span className="text-danger">
                              {contractStatusErrMsg}
                            </span>
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
                </Container>
              ) : (
                <NoDataComp />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternationalTransferAcceptance;
