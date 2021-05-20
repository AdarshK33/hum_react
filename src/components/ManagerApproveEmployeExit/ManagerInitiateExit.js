import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { OfferContext } from "../../context/OfferState";
import { PermissionContext } from "../../context/PermissionState";
import "./EmployeeExit.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { SeparationContext } from "../../context/SepearationState";
import { setGlobalCssModule } from "reactstrap/es/utils";

const ManagerInitiateExit = () => {
  const [modeOfSeparation, setModeOfSeparation] = useState("");
  const [changeInSeparation, setChangeInSeparation] = useState(0);
  const [RcryYes, setRcryYes] = useState(false);
  const [RcryNo, setRcryNo] = useState(false);
  const [RehireYes, setRehireYes] = useState(false);
  const [RehireNo, setRehireNo] = useState(false);
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

  const [dateOfResignation, setDateOfResignation] = useState("");
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [intern, setIntern] = useState(false);
  const [EmpName, setEmpName] = useState();

  const [modOfSepError, setModOfSepError] = useState(false);
  const [modOfSepReasonError, setModOfSepReasonError] = useState(false);
  const [dateOfResignError, setDateOfResignError] = useState(false);
  const [lastWorkingDateError, setLastWorkingDateError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [state, setState] = useState({
    empId: "",
    empContractType: "",
    empCostCenterName: "",
    empLocation: "",
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
  } = useContext(EmployeeSeparationContext);
  const { empResign, withdraw } = useContext(SeparationContext);
  const { searchForEmp1, searchEmpData1, makeSearchEmp1DataNull } = useContext(
    OfferContext
  );
  const { locationDetails, locationDetailsList } = useContext(
    PermissionContext
  );
  useEffect(() => {
    ViewEmployeeProfile();
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
        state.empLocation = "";
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
        setModeOfSeparation("");
        setRehireYes(false);
        setRehireNo(false);
        setRcryYes(false);
        setRcryNo(false);
        setDateOfResignation("");
        setLastWorkingDate("");
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
        if (withdrwaThis === false) {
          if (checkForExist === true || firstTimeUpdate === true) {
            if (state.empId === employeeData.employeeId) {
              console.log("********");
              setShowInfoModal(true);
              setCheckForExist(false);
              setFirstTimeUpdate(false);
              toast.info("Employe is in separation list");
            }
          }
        }
      }
    }
  }, [EmpName, employeeData, checkForExist]);

  useEffect(() => {
    if (
      searchEmpData1 &&
      searchEmpData1 &&
      searchEmpData1 !== null &&
      searchEmpData1 !== undefined &&
      Object.keys(searchEmpData1).length !== 0 &&
      locationDetailsList &&
      locationDetailsList &&
      locationDetailsList !== null &&
      locationDetailsList !== undefined &&
      Object.keys(locationDetailsList).length !== 0
    ) {
      locationDetailsList.map((item, i) => {
        if (item.locationId === searchEmpData1.locationId) {
          state.empLocation = item.locationName;
        }
      });
    }
  }, [locationDetailsList, searchEmpData1]);
  useEffect(() => {
    if (
      searchEmpData1 &&
      searchEmpData1 &&
      searchEmpData1 !== null &&
      searchEmpData1 !== undefined &&
      Object.keys(searchEmpData1).length !== 0
    ) {
      // state.empName = searchEmpData1.firstName;
      const temp =
        searchEmpData1.lastName !== null &&
        searchEmpData1.lastName !== undefined
          ? searchEmpData1.lastName
          : "";
      state.empId = searchEmpData1.employeeId;
      setEmpName(searchEmpData1.firstName + " " + temp);

      state.empContractType = searchEmpData1.contractType;
      state.empCostCenterName = searchEmpData1.costCentre;
      //   state.empLocation = searchEmpData1.location;
      state.empPosition = searchEmpData1.position;

      if (state.empContractType === "Internship") {
        setIntern(true);
      } else {
        setIntern(false);
      }
    }
  }, [searchEmpData1]);

  useEffect(() => {
    if (
      employeeProfileData &&
      employeeProfileData &&
      employeeProfileData !== null &&
      employeeProfileData !== undefined &&
      Object.keys(employeeProfileData).length !== 0
    ) {
      state.mngrName =
        employeeProfileData.lastName !== null &&
        employeeProfileData.lastName !== undefined
          ? employeeProfileData.firstName + " " + employeeProfileData.lastName
          : employeeProfileData.firstName;
      state.mngrId = employeeProfileData.employeeId;
      state.mngrCostCenterName = employeeProfileData.costCentre;
      state.mngrPosition = employeeProfileData.position;
    }
  }, [employeeProfileData]);
  console.log(ModeOfSeparationData);
  console.log("searchEmpData1", searchEmpData1);
  const searchDataHandler = () => {
    if (EmpName !== null) {
      searchForEmp1(EmpName);
      setCheckForExist(true);
      if (
        employeeData &&
        employeeData &&
        employeeData !== null &&
        employeeData !== undefined &&
        Object.keys(employeeData).length !== 0
      ) {
        employeeData.employeeId = 0;
      }
      //   setFirstClick(true);
    }
  };
  //   useEffect(() => {
  //     if (
  //       employeeData &&
  //       employeeData &&
  //       employeeData !== null &&
  //       employeeData !== undefined &&
  //       Object.keys(employeeData).length !== 0
  //     ) {
  //       //   state.empName = employeeData.employeeName;
  //       state.empId = employeeData.employeeId;
  //       state.empContractType = employeeData.contractType;
  //       state.empCostCenterName = employeeData.costCentreName;
  //       state.empLocation = employeeData.location;
  //       state.empPosition = employeeData.position;
  //       state.mngrName = employeeData.managerName;
  //       state.mngrId = employeeData.managerId;
  //       state.mngrCostCenterName = employeeData.managerCostCentre;
  //       state.mngrPosition = employeeData.managerPosition;
  //       // state.modeOfSeparationId = employeeData.modeOfSeparationId;
  //       // state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
  //       state.dateOfResignation = employeeData.dateOfResignation;
  //       state.noticePeriod = employeeData.noticePeriod;
  //       state.lastWorkingDate = employeeData.lastWorkingDate;
  //       state.emailId = employeeData.emailId;
  //       state.comments = employeeData.employeeComment;
  //       state.noticePeriodRcryDays =
  //         employeeData.noticePeriodRecoveryDays !== null &&
  //         employeeData.noticePeriodRecoveryDays !== undefined
  //           ? employeeData.noticePeriodRecoveryDays
  //           : "";

  //       if (
  //         employeeData.noticePeriodRecovery !== null &&
  //         employeeData.noticePeriodRecovery !== undefined
  //       ) {
  //         if (employeeData.noticePeriodRecovery === 2) {
  //           setRcryNo(true);
  //           setRcryYes(false);
  //         } else if (employeeData.noticePeriodRecovery === 1) {
  //           setRcryNo(false);
  //           setRcryYes(true);
  //         } else if (employeeData.noticePeriodRecovery === 0) {
  //           setRcryNo(false);
  //           setRcryYes(false);
  //         }
  //       } else {
  //         setRcryNo(false);
  //         setRcryYes(false);
  //       }
  //       if (employeeData.reHire !== null && employeeData.reHire !== undefined) {
  //         if (employeeData.reHire === 2) {
  //           setRehireNo(true);
  //           setRehireYes(false);
  //         } else if (employeeData.reHire === 1) {
  //           setRehireNo(false);
  //           setRehireYes(true);
  //         } else if (employeeData.reHire === 0) {
  //           setRehireNo(false);
  //           setRehireYes(false);
  //         }
  //       } else {
  //         setRehireNo(false);
  //         setRehireYes(false);
  //       }
  //     }
  //   }, [employeeData]);
  useEffect(() => {
    if (
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      let tempArr = [];
      //   ModeOfSeparationData.map((item, i) => {
      //     tempArr.push({
      //       label: ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation,
      //       value: ModeOfSeparationData[i].modeOfSeparation.separationId,
      //     });
      //   });
      tempArr.push({
        label: "Resignation",
        value: 1,
      });
      tempArr.push({
        label: "Termination",
        value: 2,
      });
      setModeOfSeparationList(tempArr);
    }
  }, [ModeOfSeparationData]);
  console.log("modeOfSeparationList", modeOfSeparationList);

  useEffect(() => {
    if (
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      let tempArray = [];
      ModeOfSeparationData.map((item, i) => {
        if (
          ModeOfSeparationData[i].modeOfSeparation.separationId ===
          changeInSeparation
        )
          ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
            tempArray.push({
              label:
                ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  .modeOfSeparationReason,
              value:
                ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  .separationReasonId,
            });
          });
      });
      setReasonOfSeparationList(tempArray);
    }
  }, [ModeOfSeparationData, changeInSeparation]);
  console.log("reasonOfSeparationList", reasonOfSeparationList);

  //   useEffect(() => {
  //     if (
  //       employeeData &&
  //       employeeData !== null &&
  //       employeeData !== undefined &&
  //       Object.keys(employeeData).length !== 0 &&
  //       ModeOfSeparationData &&
  //       ModeOfSeparationData !== null &&
  //       ModeOfSeparationData !== undefined &&
  //       Object.keys(ModeOfSeparationData).length !== 0
  //     ) {
  //       ModeOfSeparationData.map((item, i) => {
  //         if (
  //           employeeData.modeOfSeparationId ===
  //           ModeOfSeparationData[i].modeOfSeparation.separationId
  //         ) {
  //           setModeOfSeparation(
  //             ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation
  //           );

  //           ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
  //             if (
  //               employeeData.modeOfSeparationReasonId ===
  //               ModeOfSeparationData[i].modeOfSeparationReasonList[j]
  //                 .separationReasonId
  //             ) {
  //               state.modeOfSeparationReasonId =
  //                 ModeOfSeparationData[i].modeOfSeparationReasonList[
  //                   j
  //                 ].modeOfSeparationReason;
  //             }
  //           });
  //         }
  //       });
  //     }
  //   }, [employeeData, ModeOfSeparationData]);
  const handleNoticePeriodRcryYes = (e) => {
    setRcryYes(e.target.checked);
    setRcryNo(!e.target.checked);
  };
  const handleNoticePeriodRcryNo = (e) => {
    setRcryYes(!e.target.checked);
    setRcryNo(e.target.checked);
  };
  const handleRehireChangeYes = (e) => {
    setRehireYes(e.target.checked);
    setRehireNo(!e.target.checked);
  };
  const handleRehireChangeNo = (e) => {
    setRehireYes(!e.target.checked);
    setRehireNo(e.target.checked);
  };
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
    state.empLocation = "";
    state.empCostCenterName = "";
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
    const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
      (validateDropDown(modeOfSeparation, setModOfSepError) === true) &
      (validateDropDown(
        state.modeOfSeparationReasonId,
        setModOfSepReasonError
      ) ===
        true) &
      (lastWarkingDateValidate() === true) &
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
    // withdraw(state.empId);
    setWithdrawThis(true);
    ViewEmployeeDataById(state.empId);
    setSubmitted(false);
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
          var reasonId = 0;
          reasonOfSeparationList.map((item, i) => {
            if (
              reasonOfSeparationList[i].label === state.modeOfSeparationReasonId
            ) {
              reasonId = reasonOfSeparationList[i].value;
              console.log(reasonOfSeparationList[i].value);
            }
          });
          const data1 = {
            company: "string",
            contractType: "string",
            costCentreManagerEmailId: "string",
            costCentreManagerName: "string",
            costCentreName: "string",
            dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            emailId: state.emailId,
            empName: "string",
            employeeComment: "string",
            employeeId: state.empId,
            employeeName: "string",
            exitId: 0,
            hoursWorked: 0,
            lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location: "string",
            managerCostCentre: "string",
            managerEmailId: "string",
            managerId: "string",
            managerName: "string",
            managerPosition: "string",
            modeOfSeparationId: changeInSeparation,
            modeOfSeparationReasonId: reasonId,
            noticePeriod: 0,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            position: "string",
            reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
            reason: "string",
            reasonForResignation: "string",
            rehireRemark: "string",
            status: 2,
            withdraw: "string",
          };
          const data = {
            company: null,
            contractType: null,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            // dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            emailId: state.emailId,
            empName: null,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: null,
            exitId: 0,
            hoursWorked: 0,
            // lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location: null,
            managerCostCentre: null,
            managerEmailId: null,
            managerId: null,
            managerName: null,
            managerPosition: null,
            modeOfSeparationId: 1,
            modeOfSeparationReasonId: 1,
            noticePeriod: 0,
            noticePeriodRecovery: 0,
            noticePeriodRecoveryDays: 10,
            position: null,
            reHire: 1,
            reason: null,
            reasonForResignation: null,
            rehireRemark: null,
            status: 2,
            withdraw: null,
          };
          const createExitData = {
            emailId: state.emailId,
            employeeId: state.empId,
            exitId: 0,
            // dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            // lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            modeOfSeparationId: 1,
            // changeInSeparation,
            modeOfSeparationReasonId: 1,
            //  reasonId,
            noticePeriodRecovery: 1,
            //  RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: 10,
            // parseInt(state.noticePeriodRcryDays),
            reHire: 1,
            //  RehireYes ? 1 : RehireNo ? 2 : 0,
            // status: 0,
            // rehireRemark: state.remarks !== "" ? state.remarks : null,
          };
          console.log("createExitData", data1);
          setSubmitted(true);
          CreateEmplyoeeExist(data1);
          //   empResign(data1);
          setSuccessModal(true);
        } else if (intern === true) {
          const data1 = {
            company: "string",
            contractType: "string",
            costCentreManagerEmailId: "string",
            costCentreManagerName: "string",
            costCentreName: "string",
            // dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            emailId: state.emailId,
            empName: "string",
            employeeComment: "string",
            employeeId: state.empId,
            employeeName: "string",
            exitId: 0,
            hoursWorked: 0,
            // lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location: "string",
            managerCostCentre: "string",
            managerEmailId: "string",
            managerId: "string",
            managerName: "string",
            managerPosition: "string",
            modeOfSeparationId: 3,
            modeOfSeparationReasonId: 4,
            noticePeriod: 0,
            noticePeriodRecovery: 0,
            noticePeriodRecoveryDays: 10,
            position: "string",
            reHire: 0,
            reason: "string",
            reasonForResignation: "string",
            rehireRemark: "string",
            status: 2,
            withdraw: "string",
          };

          const createExitData = {
            emailId: state.emailId,
            employeeId: state.empId,
            exitId: 0,
            lastWorkingDate: lastWorkingDate,
            modeOfSeparationId: 3,
            modeOfSeparationReasonId: 4,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            reHire: 0,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
          };
          console.log("createExitData", data1);
          //   empResign(createExitData);
          CreateEmplyoeeExist(data1);
          setSuccessModal(true);
        }
      }
    }
  };

  return (
    <Fragment>
      <Modal show={showModal} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label className="itemResult">State remarks:</label>
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
            <label className="itemResult">
              Exit details saved successfully, the employee has been notified
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
                        <Col sm={2}>
                          <div>
                            <label>Emp Name/Id:</label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            {false ? (
                              <label className="itemResult">
                                {" "}
                                &nbsp;&nbsp; {EmpName} &nbsp;{state.empId}
                              </label>
                            ) : (
                              <Form.Group>
                                <div className="faq-form ">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="empName"
                                    // disabled={disabled}
                                    value={EmpName}
                                    style={{ borderRadius: "5px" }}
                                    // style={
                                    //   empName1Error ? { borderColor: "red" } : {}
                                    // }
                                    placeholder="Search.."
                                    onChange={(e) => changeHandler(e)}
                                    required
                                  />
                                  <Search
                                    className="search-icon"
                                    style={{ color: "#313131" }}
                                    onClick={searchDataHandler}
                                  />
                                </div>
                              </Form.Group>
                            )}
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
                                &nbsp;&nbsp; {state.empLocation}
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
                        <Col sm={2}>
                          <div>
                            <label>Mode of Separation:</label>
                          </div>
                        </Col>
                        {intern ? (
                          <Col sm={2}>
                            <div>
                              {false ? (
                                <label className="itemResult">
                                  &nbsp;&nbsp; {modeOfSeparation}
                                </label>
                              ) : (
                                <label className="itemResult">
                                  &nbsp;&nbsp; End Of Internship
                                </label>
                              )}
                            </div>
                          </Col>
                        ) : (
                          <Col sm={2}>
                            <div>
                              {false ? (
                                <label className="itemResult">
                                  &nbsp;&nbsp; {modeOfSeparation}
                                </label>
                              ) : (
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name="lgbt"
                                    options={modeOfSeparationList}
                                    value={modeOfSeparation}
                                    onChange={ModeOfSepchangeHandler}
                                    //   disabled={disabled}
                                    style={
                                      modOfSepError
                                        ? { borderColor: "red" }
                                        : {}
                                    }
                                  >
                                    <option value=""></option>
                                    {modeOfSeparationList.map((item) => {
                                      return (
                                        <option key={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                  </Form.Control>
                                  {modOfSepError ? (
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      &nbsp; *Please choose valid option
                                    </p>
                                  ) : (
                                    <p></p>
                                  )}
                                </Form.Group>
                              )}
                            </div>
                          </Col>
                        )}
                        {intern ? (
                          ""
                        ) : (
                          <Col sm={2}>
                            <div>
                              <label>Date of Resignation:</label>
                            </div>
                          </Col>
                        )}
                        {intern ? (
                          ""
                        ) : (
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
                        )}
                        <Col sm={2}>
                          <div>
                            <label>Preffered Last Working Date:</label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            {false ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {lastWorkingDate}
                              </label>
                            ) : (
                              <Form.Group>
                                <div
                                  className={
                                    lastWorkingDateError
                                      ? "onBoard-date-error"
                                      : "onBoard-date"
                                  }
                                >
                                  <DatePicker
                                    className="form-control onBoard-view"
                                    selected={lastWorkingDate}
                                    name="lastWorkingDate"
                                    minDate={moment().toDate()}
                                    // required
                                    onChange={(e) => dateOfBirthHandler1(e)}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="YYYY-MM-DD"
                                    // disabled={disabled}
                                  />
                                </div>
                                {lastWorkingDateError ? (
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
                        {intern ? (
                          <Col sm={2}>
                            <div>
                              <label>Notice Period Recovery Days</label>
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                        {intern ? (
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
                        ) : (
                          ""
                        )}
                      </Row>
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>Reason of Separation:</label>
                          </div>
                        </Col>
                        {intern ? (
                          <Col sm={2}>
                            <div>
                              {false ? (
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.modeOfSeparationReasonId}
                                </label>
                              ) : (
                                <label className="itemResult">
                                  &nbsp;&nbsp; End Of Internship
                                </label>
                              )}
                            </div>
                          </Col>
                        ) : (
                          <Col sm={2}>
                            <div>
                              {false ? (
                                <label className="itemResult">
                                  &nbsp;&nbsp; {state.modeOfSeparationReasonId}
                                </label>
                              ) : (
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name="modeOfSeparationReasonId"
                                    options={reasonOfSeparationList}
                                    value={state.modeOfSeparationReasonId}
                                    onChange={changeHandler}
                                    //   disabled={disabled}
                                    style={
                                      modOfSepReasonError
                                        ? { borderColor: "red" }
                                        : {}
                                    }
                                  >
                                    <option value=""></option>
                                    {reasonOfSeparationList.map((item) => {
                                      return (
                                        <option key={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                  </Form.Control>
                                  {modOfSepReasonError ? (
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      &nbsp; *Please choose valid option
                                    </p>
                                  ) : (
                                    <p></p>
                                  )}
                                </Form.Group>
                              )}
                            </div>
                          </Col>
                        )}

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
                                style={RcryError ? { borderColor: "red" } : {}}
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
                                style={RcryError ? { borderColor: "red" } : {}}
                                // required={required}
                                onChange={handleNoticePeriodRcryNo}
                              />
                              <label className="itemResult">No</label>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* <Row
                    style={{
                      marginLeft: "2rem",
                      marginTop: "1rem",
                      marginBottom: "3rem",
                    }}
                  >
                    <Col sm={2}>
                      <div>
                        <label>
                          <b>Exit Feedback Form:</b>
                          <label className="itemResult">
                          
                          </label>
                        </label>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div>
                        <label>
                          <a href="~/address">
                            <u>Exit Feedback Form</u>
                          </a>
                        </label>
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
                    <Col sm={12}>
                      <div>
                        <label>
                          <b>Comments:</b>
                          <label className="itemResult">
                            &nbsp;&nbsp; {state.comments}
                          </label>
                        </label>
                      </div>
                    </Col>
                  </Row> */}
                      {!intern ? (
                        <Row
                          style={{
                            marginTop: "2rem",
                            marginLeft: "2rem",
                            marginBottom: "2rem",
                          }}
                        >
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
                          {submitted === false ? (
                            <Button onClick={submitHandler}>Save</Button>
                          ) : (
                            <Button onClick={withdrawHandler}>
                              WithDraw Resignation
                            </Button>
                          )}
                        </Col>
                      </Row>

                      {/* <div
                        style={{
                          marginTop: "2rem",
                          marginBottom: "2rem",
                          textAlign: "center",
                        }}
                      >
                        <button
                          // style={
                          //   showModal | showSuccessModal
                          //     ? { borderColor: "#aaa" }
                          //     : ""
                          // }
                          disabled={showModal | showSuccessModal}
                          className="stepperButtons"
                          onClick={submitHandler}
                        >
                          Save
                        </button>
                      </div> */}
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

export default ManagerInitiateExit;
