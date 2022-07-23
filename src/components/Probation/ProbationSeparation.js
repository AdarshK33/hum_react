import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { OfferContext } from "../../context/OfferState";
import { PermissionContext } from "../../context/PermissionState";
import { ProbationContext } from "../../context/ProbationState";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { SeparationContext } from "../../context/SepearationState";
import { setGlobalCssModule } from "reactstrap/es/utils";
// import RelievingLetter from "../ManagerApproveEmployeExit/RelivingLetter";
import EndOfProbationLetter from "../Probation/EndOfProbationLetter";
import calendarImage from "../../assets/images/calendar-image.png";
import { DisciplinaryContext } from "../../context/DisciplinaryState";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppState";

const ProbationSeparation = () => {
  const [modeOfSeparation, setModeOfSeparation] = useState("End of Probation");
  const [changeInSeparation, setChangeInSeparation] = useState(5);
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(true);
  const [RcryError, setRcryError] = useState(false);
  const [RehireError, setRehireError] = useState(false);
  const [rcryDaysError, setRcryDaysError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [checkForExist, setCheckForExist] = useState(false);
  const [firstTimeUpdate, setFirstTimeUpdate] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [withdrwaThis, setWithdrawThis] = useState(false);

  const [dateOfResignation, setDateOfResignation] = useState(new Date());
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [intern, setIntern] = useState(false);
  const [EmpName, setEmpName] = useState();

  const [modOfSepError, setModOfSepError] = useState(false);
  const [modOfSepReasonError, setModOfSepReasonError] = useState(false);
  const [dateOfResignError, setDateOfResignError] = useState(false);
  const [lastWorkingDateError, setLastWorkingDateError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [showRelivingModal, setShow] = useState(false);
  //   const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [empLocation, setEmpLocation] = useState("");
  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const history = useHistory();

  const [state, setState] = useState({
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empPosition: "",
    mngrName: "",
    mngrId: "",
    mngrCostCenterName: "",
    mngrPosition: "",
    modeOfSeparationReasonId: "",
    noticePeriod: "",
    emailId: "",
    comments: "",
    noticePeriodRcryDays: "",
    remarks: "",
  });
  const [modeOfSeparationList, setModeOfSeparationList] = useState([]);
  const [reasonOfSeparationList, setReasonOfSeparationList] = useState([]);

  const {
    employeeData,
    ModeOfSeparationData,
    ViewEmployeeProfile,
    employeeProfileData,
    ViewEmployeeDataById,
    CreateEmplyoeeExist,
    makeEmployeeDataNull,
    fetchRelievingLetterData,
    relivingLetterData,
    terminationConfirmation,
    resignationConfirmation,
    TerminationFromDesciplinary,
    DisciplinaryTermination,
    UpdateEmplyoeeExist,
    lettterview,
    setViewLetter,
  } = useContext(EmployeeSeparationContext);
  const { getUserInfo,fetchEmployeeProfile,fetchemployeeData, user } = useContext(AppContext);
  const { probationData, ViewProbationEndLetter, endLetterData } =
    useContext(ProbationContext);
  const { disciplinarySearchData } = useContext(DisciplinaryContext);
  const { empResign, withdraw, searchByCostCenter, searchByCostData } =
    useContext(SeparationContext);
  const { searchForEmp1, searchEmpData1, makeSearchEmp1DataNull } =
    useContext(OfferContext);
  const { locationDetails, locationDetailsList } =
    useContext(PermissionContext);

  useEffect(() => {
    ViewEmployeeProfile();
    fetchEmployeeProfile();
  }, []);

  useEffect(() => {
    locationDetails();
  }, []);
  console.log("locationDetailsList", locationDetailsList);
  useEffect(() => {
    console.log("state.empI", state.empId);
    if (
      state.empId !== "" &&
      state.empId !== null &&
      state.empId !== undefined
    ) {
      console.log("state.empId", state.empId);
      ViewEmployeeDataById(state.empId);
    }
  }, [EmpName]);
  console.log("employeeData", employeeData);

  useEffect(() => {
    console.log("state.empI", state.empId);
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      if (withdrwaThis === true) {
        console.log("state.empId", employeeData.exitId);
        withdraw(employeeData.exitId);
        setWithdrawThis(false);
        setEmpName("");
        state.empId = "";
        state.empContractType = "";
        state.empCostCenterName = "";
        state.empPosition = "";
        state.mngrName = "";
        state.mngrId = "";
        state.mngrCostCenterName = "";
        state.mngrPosition = "";
        state.modeOfSeparationReasonId = "";
        state.noticePeriod = "";
        state.emailId = "";
        state.comments = "";
        state.noticePeriodRcryDays = "";
        state.remarks = "";
        setEmpLocation("");
        setModeOfSeparation("");
        setRehireYes(false);
        setRehireNo(false);
        setRcryYes(false);
        setRcryNo(false);
        setDateOfResignation("");
        setLastWorkingDate("");
        setPreview(false);
      }
    }
  }, [employeeData]);

  useEffect(() => {
    if (
      employeeData &&
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0
    ) {
      if (
        state.empId !== "" &&
        state.empId !== null &&
        state.empId !== undefined &&
        employeeData.employeeId !== null &&
        employeeData.employeeId !== undefined
      ) {
        if (withdrwaThis === false && submitted === false) {
          if (checkForExist === true || firstTimeUpdate === true) {
            if (state.empId === employeeData.employeeId) {
              console.log("********");
              setShowInfoModal(true);
              setCheckForExist(false);
              setFirstTimeUpdate(false);
              toast.info("Employee is in separation list");
            }
          }
        }
      }
    }
  }, [EmpName, employeeData, checkForExist]);

  useEffect(() => {
    if (
      probationData &&
      probationData &&
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0 &&
      locationDetailsList &&
      locationDetailsList &&
      locationDetailsList !== null &&
      locationDetailsList !== undefined &&
      Object.keys(locationDetailsList).length !== 0
    ) {
      locationDetailsList.map((item, i) => {
        if (item.locationId === probationData.location) {
          setEmpLocation(item.locationName);
        }
      });
    }
  }, [locationDetailsList, probationData]);
  useEffect(() => {
    if (
      probationData &&
      probationData &&
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0
    ) {
      state.empId = probationData.empId;
      setEmpName(probationData.empName);

      state.empContractType = probationData.contractType;
      state.empCostCenterName = probationData.costCentre;
      //   state.empLocation = searchEmpData1.location;
      state.empPosition = probationData.position;
      state.emailId = probationData.personalEmailId;

      if (
        state.empContractType === "internship" ||
        state.empContractType === "Internship"
      ) {
        setIntern(true);
      } else {
        setIntern(false);
      }
    }
  }, [probationData]);

  useEffect(() => {
    if (
      fetchemployeeData &&
      fetchemployeeData &&
      fetchemployeeData !== null &&
      fetchemployeeData !== undefined &&
      Object.keys(fetchemployeeData).length !== 0
    ) {
      state.mngrName =
      fetchemployeeData.lastName !== null &&
      fetchemployeeData.lastName !== undefined
          ? fetchemployeeData.firstName + " " + fetchemployeeData.lastName
          : fetchemployeeData.firstName;
      state.mngrId = fetchemployeeData.employeeId;
      state.mngrCostCenterName = fetchemployeeData.costCentre;
      state.mngrPosition = fetchemployeeData.position;
    }
  }, [fetchemployeeData]);
  console.log(ModeOfSeparationData);
  console.log("probationData", probationData);

  const handleNoticePeriodRcryYes = (e) => {
    setRcryYes(e.target.checked);
    setRcryNo(!e.target.checked);
  };
  const handleNoticePeriodRcryNo = (e) => {
    setRcryYes(!e.target.checked);
    setRcryNo(e.target.checked);
    state.noticePeriodRcryDays = "";
  };
  const handleRehireChangeYes = (e) => {
    setRehireYes(e.target.checked);
    setRehireNo(!e.target.checked);
  };
  const handleRehireChangeNo = (e) => {
    setRehireYes(!e.target.checked);
    setRehireNo(e.target.checked);
  };

  //   reliving letter
  const handleRelivingClose = () => setShow(false);
  const handleRelivingClose2 = () => {
    history.push("./employee-separation-listing");
    setShow(false);
  };

  const saveOfferLetter = () => {
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };

  const submitfinalRelivingLetter = (e) => {
    e.preventDefault();
    if (
      employeeData.employeeId !== null &&
      employeeData.employeeId !== undefined
    ) {
      const data2 = {
        company: employeeData.company,
        contractType: employeeData.contractType,
        costCentreManagerEmailId: employeeData.costCentreManagerEmailId,
        costCentreManagerName: employeeData.costCentreManagerName,
        costCentreName: employeeData.costCentreName,
        dateOfResignation: employeeData.dateOfResignation,
        emailId: employeeData.emailId,
        empName: employeeData.empName,
        employeeComment: employeeData.employeeComment,
        employeeId: employeeData.employeeId,
        employeeName: employeeData.employeeName,
        exitId: employeeData.exitId,
        hoursWorked: employeeData.hoursWorked,
        lastWorkingDate: employeeData.lastWorkingDate,
        location: employeeData.location,
        managerCostCentre: employeeData.managerCostCentre,
        managerEmailId: employeeData.managerEmailId,
        managerId: employeeData.managerId,
        managerName: employeeData.managerName,
        managerPosition: employeeData.managerPosition,
        modeOfSeparationId: employeeData.modeOfSeparationId,
        modeOfSeparationReasonId: employeeData.modeOfSeparationReasonId,
        noticePeriod: employeeData.noticePeriod,
        noticePeriodRecovery: employeeData.noticePeriodRecovery,
        noticePeriodRecoveryDays: employeeData.noticePeriodRecoveryDays,
        personalEmailId:state.emailId,
        position: employeeData.position,
        reHire: employeeData.reHire,
        reason: employeeData.reason,
        reasonForResignation: employeeData.reasonForResignation,
        rehireRemark: employeeData.rehireRemark,
        status: 7,
      };

      console.log("createExitData", data2);
      UpdateEmplyoeeExist(data2);
      setSubmitLetter(true);
      setLetterSent(true);
      setShow(true);

      // finalSubmitOfferLetter(employeeData.employeeId);
    }
  };

  const previewRelivingLetter = (e) => {
    e.preventDefault();
    if (
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0
    ) {
      ViewProbationEndLetter(probationData.empId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const relivingLetterClick = (e) => {
    e.preventDefault();
    if (
      probationData !== null &&
      probationData !== undefined &&
      Object.keys(probationData).length !== 0
    ) {
      ViewProbationEndLetter(probationData.empId);
      setViewLetter(true);
      handleShow();
      setPreviewGeneratedLetter(true);
    }
  };
  const handleShow = () => {
    console.log("inside show moodal");
    setShow(true);
  };
  // reliving letter end
  const handleClose = () => {
    setModal(false);
    setSuccessModal(false);
  };
  const handleInfoClose = () => {
    setShowInfoModal(false);
    setEmpName("");
    state.empId = "";
    state.empContractType = "";
    state.empPosition = "";

    state.empCostCenterName = "";
    setEmpLocation("");
    makeEmployeeDataNull();
    makeSearchEmp1DataNull();
  };
  const handleSaveRemarks = () => {
    if (
      state.remarks !== "" &&
      state.remarks !== null &&
      state.remarks !== undefined
    ) {
      setRemarkError(false);
      setModal(false);
    } else {
      setRemarkError(true);
    }
  };
  const changeHandler = (e) => {
    if (e.target.name === "empName") {
      setEmpName(e.target.value);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
    console.log(state);
  };
  const ModeOfSepchangeHandler = (e) => {
    setModeOfSeparation(e.target.value);
    modeOfSeparationList.map((item, i) => {
      if (modeOfSeparationList[i].label === e.target.value) {
        setChangeInSeparation(modeOfSeparationList[i].value);
        console.log(modeOfSeparationList[i].value);
      }
    });

    console.log(e.target.value);
  };

  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    // console.log("AdjusteddateValue");
    setDateOfResignation(AdjusteddateValue);
  };

  const dateOfBirthHandler1 = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setLastWorkingDate(AdjusteddateValue);
  };

  const validateEmpDetails = () => {
    if (
      state.empContractType !== "" &&
      state.empContractType !== null &&
      state.empContractType !== undefined
    ) {
      return true;
    } else {
      toast.info("Please Provide the Employee details");
      return false;
    }
  };

  const validateDropDown = (item, setError) => {
    if (intern === false) {
      if (item !== "" && item !== null && item !== undefined) {
        setError(false);
        return true;
      } else {
        setError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const emailValidation = () => {
    const emailValid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      state.emailId !== "" &&
      state.emailId !== null &&
      state.emailId !== undefined &&
      emailValid.test(state.emailId)
    ) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true);
      return false;
    }
  };
  const lastWarkingDateValidate = () => {
    if (DisciplinaryTermination === false) {
      if (
        lastWorkingDate !== "" &&
        lastWorkingDate !== null &&
        lastWorkingDate !== undefined
      ) {
        setLastWorkingDateError(false);
        return true;
      } else {
        setLastWorkingDateError(true);
        return false;
      }
    } else {
      setLastWorkingDateError(false);
      return true;
    }
  };

  const dateOfresignationValidate = () => {
    if (intern === false) {
      if (
        dateOfResignation !== "" &&
        dateOfResignation !== null &&
        dateOfResignation !== undefined
      ) {
        setDateOfResignError(false);
        return true;
      } else {
        setDateOfResignError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const validateCheckBoxes = (itemYes, itemNo, setError) => {
    if ((itemYes === true) | (itemNo === true)) {
      setError(false);
      console.log(itemYes, itemNo);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const validateCheckBoxes1 = (itemYes, itemNo, setError) => {
    if (intern === false) {
      if ((itemYes === true) | (itemNo === true)) {
        setError(false);
        console.log(itemYes, itemNo);
        return true;
      } else {
        setError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const validateRcryDays = () => {
    const Valid = /^[0-9\b]+$/;
    if (RcryYes === true) {
      if (
        state.noticePeriodRcryDays !== "" &&
        state.noticePeriodRcryDays !== null &&
        state.noticePeriodRcryDays !== undefined &&
        Valid.test(state.noticePeriodRcryDays)
      ) {
        setRcryDaysError(false);
        return true;
      } else {
        setRcryDaysError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const checkValidations = () => {
    console.log("on validation");
    if (
      (validateEmpDetails() === true) &
      (validateCheckBoxes(RcryYes, RcryNo, setRcryError) === true) &
      (validateCheckBoxes1(RehireYes, RehireNo, setRehireError) === true) &
      (validateRcryDays() === true) &
      //   (lastWarkingDateValidate() === true) &
      (dateOfresignationValidate() === true) &
      (emailValidation() === true)
    ) {
      console.log("on true");
      return true;
    } else {
      console.log("on falsae");
      return false;
    }
  };
  const withdrawHandler = () => {
    console.log("exitId", employeeData.exitId);
    // withdraw(employeeData.exitId);
    setWithdrawThis(true);
    ViewEmployeeDataById(state.empId);
    setSubmitted(false);
    setPreview(false);
  };

  const submitHandler = (e) => {
    console.log("submit handler");

    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      console.log("INSIDE");
      if (
        (intern === false && RehireNo === true && state.remarks === "") ||
        state.remarks === null ||
        state.remarks === undefined
      ) {
        setModal(true);
      } else {
        if (intern === false) {
          const data2 = {
            company: null,
            contractType: state.empContractType,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            emailId: state.emailId,
            empName: EmpName,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: EmpName,
            exitId: 0,
            hoursWorked: null,
            lastWorkingDate: null,
            location: probationData.locationId,
            managerCostCentre: state.managerCostCentre,
            managerEmailId: null,
            managerId: state.mngrId ? state.mngrId : "",
            managerName: state.mngrName,
            managerPosition: state.mngrPosition,
            modeOfSeparationId: 5,
            modeOfSeparationReasonId: 23,
            noticePeriod: 0,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            personalEmailId:state.emailId,
            position: state.empPosition,
            reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
            reason: null,
            reasonForResignation: null,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
            status: 8,
          };

          console.log("createExitData", data2);
          setSubmitted(true);
          CreateEmplyoeeExist(data2, state.empId);
          setPreview(true);
          //   empResign(data1);
          setSuccessModal(true);
          //  TerminationFromDesciplinary(false);
        } else if (intern === true) {
          const data1 = {
            company: null,
            contractType: state.empContractType,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            dateOfResignation: null,
            emailId: state.emailId,
            empName: EmpName,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: EmpName,
            exitId: 0,
            hoursWorked: null,
            lastWorkingDate: null,
            location: probationData.locationId,
            managerCostCentre: state.managerCostCentre,
            managerEmailId: null,
            managerId: state.mngrId ? state.mngrId : "",
            managerName: state.mngrName,
            managerPosition: state.mngrPosition,
            modeOfSeparationId: 5,
            modeOfSeparationReasonId: 23,
            noticePeriod: 0,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            personalEmailId:state.emailId,
            position: state.empPosition,
            reHire: 0,
            reason: null,
            reasonForResignation: null,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
            status: 7,
          };
          console.log("createExitData", data1);
          //   empResign(createExitData);
          CreateEmplyoeeExist(data1, state.empId);
          // setPreview(true);
          // setSuccessModal(true);
          setSubmitted(true);
          // CreateEmplyoeeExist(data2, state.empId);
          setPreview(true);
          setSuccessModal(true);
          // TerminationFromDesciplinary(false);
        }
      }
    }
  };

  return (
    <Fragment>
      {/* reliving letter */}

      {submitLetter ? (
        <Modal
          show={showRelivingModal}
          onHide={handleRelivingClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              The details have been saved successfully <br />
              The Termination of Probationary Period letter will be sent to the
              employee on{" "}
              {endLetterData !== null &&
              endLetterData !== undefined &&
              Object.keys(endLetterData).length !== 0 &&
              endLetterData.exitDate !== null &&
              endLetterData.exitDate !== undefined &&
              endLetterData.exitDate !== ""
                ? moment(endLetterData.exitDate, "YYYY-MM-DD")
                    .add(1, "days")
                    .format("YYYY-MM-DD")
                : ""}
            </label>
            <div className="text-center">
              <Button onClick={handleRelivingClose2}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      {lettterview ? (
        <div>
          {endLetterData &&
          endLetterData !== undefined &&
          endLetterData !== null ? (
            <EndOfProbationLetter />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {/* reliving letter end */}
      <Modal show={showModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            {/* <label className="itemResult">State remarks:</label> */}
            <label className="itemResult">
              Please state the reason why this employee cannot be re-hired :
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

      <Modal show={showSuccessModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label>
              Exit details saved successfully the employee has been notified
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Modal show={showInfoModal} onHide={() => handleInfoClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">
              Resignation for this employee {EmpName} has already been initiated
            </label>

            <div className="text-center mb-2">
              <Button onClick={() => handleInfoClose()}>Close</Button>
            </div>
          </Modal.Body>
        </Container>
      </Modal>

      <Breadcrumb title="EMPLOYEE SEPARATION" parent="EMPLOYEE SEPARATION" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div>
                <div className="OnBoardHeading">
                  <b>EMPLOYEE SEPARATION </b>
                </div>
                <Form>
                  <Row
                    style={{
                      marginRight: "2rem",
                    }}
                  >
                    <Col>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Emp Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {EmpName} &nbsp;{state.empId}
                              </label>
                            </label>
                          </div>
                        </Col>

                        <Col sm={4}>
                          <div>
                            <label>
                              Contract Type:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empContractType}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empCostCenterName}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Location:
                              <label className="itemResult">
                                &nbsp;&nbsp; {empLocation}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.empPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Manager Name/Id:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrName}
                                &nbsp; {state.mngrId}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Position:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrPosition}
                              </label>
                            </label>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div>
                            <label>
                              Cost Center Name:
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrCostCenterName}
                              </label>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Mode of Separation:
                              <label className="itemResult">
                                &nbsp;&nbsp; {modeOfSeparation}
                              </label>
                            </label>
                          </div>
                        </Col>

                        <Col sm={2}>
                          <div>
                            <label>
                              Date of{" "}
                              {changeInSeparation === 5
                                ? "End of Probation:"
                                : "Termination:"}
                            </label>
                          </div>
                        </Col>

                        <Col sm={2}>
                          <div>
                            {false ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {dateOfResignation}
                              </label>
                            ) : (
                              <Form.Group>
                                <div
                                  className={
                                    dateOfResignError
                                      ? "onBoard-date-error"
                                      : "onBoard-date"
                                  }
                                >
                                  <DatePicker
                                    className="form-control onBoard-view"
                                    selected={dateOfResignation}
                                    name="dateOfResignation"
                                    minDate={moment().toDate()}
                                    // required
                                    onChange={(e) => dateOfBirthHandler(e)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="YYYY-MM-DD"
                                    minDate={new Date()}
                                    // disabled={disabled}
                                  />
                                </div>
                                {dateOfResignError ? (
                                  <p style={{ color: "red" }}>
                                    {" "}
                                    &nbsp; *Please select valid date
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={4}>
                          <div>
                            <label>
                              Reason of Separation:
                              <label className="itemResult">
                                &nbsp;&nbsp; {modeOfSeparation}
                              </label>
                            </label>
                          </div>
                        </Col>

                        <Col sm={2}>
                          <div>
                            <label>Personal Email Id:</label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            {false ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.emailId}
                              </label>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  placeholder=""
                                  required
                                  style={{
                                    borderColor: "#006ebb",
                                  }}
                                  //   disabled={!RcryYes}
                                  name="emailId"
                                  value={state.emailId}
                                  onChange={(e) => changeHandler(e)}
                                  style={
                                    emailError ? { borderColor: "red" } : {}
                                  }
                                />

                                {emailError ? (
                                  <p style={{ color: "red" }}>
                                    {" "}
                                    &nbsp; *Please provide valid email
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                      </Row>

                      {!intern ? (
                        <Row
                          style={{
                            marginTop: "2rem",
                            marginLeft: "2rem",
                            marginBottom: "2rem",
                          }}
                        >
                          {" "}
                          <Col sm={2}>
                            <div>
                              <label>Notice Period Recovery</label>
                              {RcryError ? (
                                <p style={{ color: "red" }}>
                                  {" "}
                                  *Please select one of the option
                                </p>
                              ) : (
                                <p></p>
                              )}
                            </div>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.5rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  checked={RcryYes}
                                  style={
                                    RcryError ? { borderColor: "red" } : {}
                                  }
                                  // required={required}
                                  onChange={handleNoticePeriodRcryYes}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.5rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  checked={RcryNo}
                                  style={
                                    RcryError ? { borderColor: "red" } : {}
                                  }
                                  // required={required}
                                  onChange={handleNoticePeriodRcryNo}
                                />
                                <label className="itemResult">No</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>Notice Period Recovery Days</label>
                            </div>
                          </Col>
                          <Col sm={2} style={{ marginTop: "0.5rem" }}>
                            {false ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.noticePeriodRcryDays}
                              </label>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  placeholder=""
                                  required
                                  style={{
                                    borderColor: "#006ebb",
                                  }}
                                  disabled={!RcryYes}
                                  name="noticePeriodRcryDays"
                                  value={state.noticePeriodRcryDays}
                                  onChange={(e) => changeHandler(e)}
                                  style={
                                    rcryDaysError ? { borderColor: "red" } : {}
                                  }
                                />

                                {rcryDaysError ? (
                                  <p style={{ color: "red" }}>
                                    {" "}
                                    &nbsp; *Please enter valid days
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </Form.Group>
                            )}
                          </Col>
                          <Col sm={2}>
                            <div>
                              <label>
                                Eligible <br />
                                For Rehire
                              </label>
                              {RehireError ? (
                                <p style={{ color: "red" }}>
                                  {" "}
                                  *Please select one of the option
                                </p>
                              ) : (
                                <p></p>
                              )}
                            </div>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.5rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="yes"
                                  checked={RehireYes}
                                  // required={required}
                                  disabled={true}
                                  style={
                                    RehireError ? { borderColor: "red" } : {}
                                  }
                                  onChange={handleRehireChangeYes}
                                />
                                <label className="itemResult">Yes</label>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col sm={1} style={{ marginTop: "0.5rem" }}>
                            <Form.Group>
                              <div className="boxField_2 input">
                                <input
                                  className="largerCheckbox"
                                  type="checkbox"
                                  value="no"
                                  checked={RehireNo}
                                  // required={required}
                                  disabled={true}
                                  style={
                                    RehireError ? { borderColor: "red" } : {}
                                  }
                                  onChange={handleRehireChangeNo}
                                />
                                <label className="itemResult">No</label>
                              </div>
                            </Form.Group>
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
                          <button
                            disabled={
                              submitted ||
                              (employeeData &&
                                employeeData !== null &&
                                employeeData !== undefined &&
                                Object.keys(employeeData).length !== 0 &&
                                employeeData.status === 8)
                            }
                            className={
                              submitted ||
                              (employeeData &&
                                employeeData !== null &&
                                employeeData !== undefined &&
                                Object.keys(employeeData).length !== 0 &&
                                employeeData.status === 8)
                                ? "confirmButton"
                                : "stepperButtons"
                            }
                            onClick={submitHandler}
                          >
                            Save
                          </button>
                          {submitted ||
                          (employeeData &&
                            employeeData !== null &&
                            employeeData !== undefined &&
                            Object.keys(employeeData).length !== 0 &&
                            employeeData.status === 8) ? (
                            <button
                              disabled={!submitted || letterSent}
                              className={
                                !submitted || letterSent
                                  ? "LetterCnfButton"
                                  : "LettersButtons"
                              }
                              onClick={withdrawHandler}
                            >
                              Withdraw
                            </button>
                          ) : (
                            ""
                          )}

                          {(!saveLetter &&
                            !previewGeneratedLetter &&
                            employeeData &&
                            employeeData &&
                            employeeData !== null &&
                            employeeData !== undefined &&
                            Object.keys(employeeData).length !== 0 &&
                            (employeeData.status === 7 ||
                              employeeData.status === 8)) ||
                          (!previewGeneratedLetter &&
                            showPreview === true &&
                            submitted === true) ? (
                            <button
                              // disabled={!submitted}
                              className={"LettersButtons"}
                              onClick={relivingLetterClick}
                            >
                              Generate Letter
                            </button>
                          ) : (
                            ""
                          )}
                          {/* {saveLetter && previewGeneratedLetter ? (
                            <button
                              className={"LettersButtons"}
                              onClick={previewRelivingLetter}
                            >
                              Preview Letter
                            </button>
                          ) : (
                            ""
                          )} */}

                          {/* {saveLetter && previewGeneratedLetter && (
                            <div className="preview-section">
                              <br></br>
                              <br></br>
                              <img
                                src={calendarImage}
                                alt="calendar"
                                width="200px"
                              />
                              <br></br>
                              <br></br>

                              {true ? (
                                <button
                                  disabled={letterSent}
                                  className={
                                    letterSent
                                      ? " confirmButton "
                                      : "stepperButtons"
                                  }
                                  onClick={submitfinalRelivingLetter}
                                >
                                  Submit
                                </button>
                              ) : (
                                // <Button
                                //   type="button"
                                //   onClick={submitfinalRelivingLetter}
                                //   style={{
                                //     marginTop: "2rem",
                                //     marginBottom: "2rem",
                                //     textAlign: "center",
                                //   }}
                                // >
                                //   Submit
                                // </Button>
                                ""
                              )} 
                            </div>
                          )}*/}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProbationSeparation;
