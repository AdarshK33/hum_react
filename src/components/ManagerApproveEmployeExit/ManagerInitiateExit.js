import React, { Fragment, useState, useContext, useEffect ,useRef} from "react";
import { Row, Col, Form, Button, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import Breadcrumb from "../common/breadcrumb";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { OfferContext } from "../../context/OfferState";
import { PermissionContext } from "../../context/PermissionState";
import "./EmployeeExit.css";
import moment, { months } from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { SeparationContext } from "../../context/SepearationState";
import { DisciplinaryContext } from "../../context/DisciplinaryState";
import { setGlobalCssModule } from "reactstrap/es/utils";
import RelievingLetter from "./RelivingLetter";
import InternShipLetter from "./InternShipLetter";
import TerminationLetter from "./TerminationLetter";
import calendarImage from "../../assets/images/calendar-image.png";
import { setDate } from "date-fns";
import { AppContext } from "../../context/AppState";
import { Typeahead } from "react-bootstrap-typeahead"; //Auto search
import { PromotionContext } from "../../context/PromotionState";

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
  const [showSuccessModalDemise, setShowSuccessModalDemise] = useState(false);


  const [showInfoModal, setShowInfoModal] = useState(false);
  const [checkForExist, setCheckForExist] = useState(false);
  const [firstTimeUpdate, setFirstTimeUpdate] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [withdrwaThis, setWithdrawThis] = useState(false);

  const [dateOfResignation, setDateOfResignation] = useState(new Date());
  const [lastWorkingDate, setLastWorkingDate] = useState(new Date());
  const [intern, setIntern] = useState(false);
  const [EmpName, setEmpName] = useState();

  const [modOfSepError, setModOfSepError] = useState(false);
  const [modOfSepReasonError, setModOfSepReasonError] = useState(false);
  const [dateOfResignError, setDateOfResignError] = useState(false);
  const [lastWorkingDateError, setLastWorkingDateError] = useState(false);
  const [iamStatusError,SetIamStatusError] = useState(false)
  const [emailError, setEmailError] = useState(false);

  const [showRelivingModal, setShow] = useState(false);
  //   const [showSuccessModal, setSuccessModal] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [saveLetter, setSaveLetter] = useState(false);
  const [submitLetter, setSubmitLetter] = useState(false);
  const [previewLetter, setPreviewLetter] = useState(false);
  const [letterSent, setLetterSent] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [termination, setTermination] = useState(false);
  const [searchEmpSelected, setSearchEmpSelected] = useState("");


  const [previewGeneratedLetter, setPreviewGeneratedLetter] = useState(false);
  const [lastDateSelection, setLastDateSelection] = useState(new Date());

  const [showAddModal, setShowAddModal] = useState(false);
  const history = useHistory();
    // const employeeRef = React.createRef();
    const employeeRef = useRef(null);

  const [state, setState] = useState({
    exitId: "",
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
    modeOfSeparationReasonLabel: "",
    noticePeriod: "",
    emailId: "",
    comments: "",
    noticePeriodRcryDays: "",
    remarks: "",
    iamStatus:"",
  });
  const [modeOfSeparationList, setModeOfSeparationList] = useState([]);
  const [reasonOfSeparationList, setReasonOfSeparationList] = useState([]);

  const {
    employeeData,
    ModeOfSeparationData,
    ViewEmployeeProfile,
    employeeId,
    employeeProfileData,
    ViewEmployeeDataById,
    CreateEmplyoeeExist,
    makeEmployeeDataNull,
    fetchRelievingLetterData,
    relivingLetterData,
    terminationLetterData,
    UpdateEmplyoeeExist,
    fetchTerminationLetterData,
    terminationConfirmation,
    resignationConfirmation,
    TerminationFromDesciplinary,
    DisciplinaryTermination,
    lettterview,
    setViewLetter,
  } = useContext(EmployeeSeparationContext);
  const { getUserInfo,fetchEmployeeProfile,fetchemployeeData, user } = useContext(AppContext);
  const { EmployeeSearchWithKey } = useContext(DisciplinaryContext);
  const {
    empResign,
    withdraw,
    searchByCostCenter,
    searchByEmployee,
    searchByCostData,
  } = useContext(SeparationContext);
  const { searchForEmp1, searchEmpData1, makeSearchEmp1DataNull } =
    useContext(OfferContext);
  const { locationDetails, locationDetailsList ,rolePermission} =
    useContext(PermissionContext);
  console.log(employeeData, "state", state, "7795");

  const {  employeeDetails,getEmployeeDetails} = useContext(PromotionContext);
  // console.log("employeeDetails",employeeDetails)
  useEffect(() => {
   
    if (
      rolePermission === "admin"
    ){
     getEmployeeDetails(1);
    }
    else if (
      rolePermission === "superCostCenterManager"
    ){
     getEmployeeDetails(9);
    }
    else if (
      rolePermission === "costCenterManager"
    ){
     getEmployeeDetails(7);
    }
    else if (
      rolePermission === "manager"
    ){
     getEmployeeDetails(2);
    }
  }, []);
  useEffect(() => {
    ViewEmployeeProfile();
    fetchEmployeeProfile();
  }, []);
//   useEffect(()=>{
// if(rolePermission == "manager"){
//   state.iamStatus = "inProgress"
// }
//   },[rolePermission])
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
    if (
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length
    ) {
      state.empName = employeeData.employeeName;
      state.exitId = employeeData.exitId;

      state.empId = employeeData.employeeId;
      state.empContractType = employeeData.contractType;
      state.empCostCenterName = employeeData.costCentreName;
      state.empLocation = employeeData.location;
      state.empPosition = employeeData.position;
      state.mngrName = employeeData.managerName;
      state.mngrId = employeeData.managerId ? employeeData.managerId : "";
      state.mngrCostCenterName = employeeData.managerCostCentre;
      state.mngrPosition = employeeData.managerPosition;
      // state.modeOfSeparationId = employeeData.modeOfSeparationId;
      // state.modeOfSeparationReasonId = employeeData.modeOfSeparationReasonId;
      state.dateOfResignation = employeeData.dateOfResignation;
      if (
        employeeData.department == "AFS" ||
        employeeData.department == "IT" ||
        employeeData.department == "Legal" ||
        employeeData.department == "Finance"
      ) {
        state.noticePeriod = 2;
      } else {
        state.noticePeriod = 1;
      }
      if (
        state.empContractType === "internship" ||
        state.empContractType === "Internship"
      ) {
        state.lastWorkingDate = new Date(employeeData.joiningDate).setMonth(
          new Date(employeeData.joiningDate).getMonth() +
            (employeeData.internshipPeriod !== null &&
            employeeData.internshipPeriod !== undefined
              ? employeeData.internshipPeriod
              : 0)
        );
      } else if (
        state.empContractType === "Fulltime" ||
        state.empContractType === "fulltime" ||
        state.empContractType === "parttime" ||
        state.empContractType === "PartTime" ||
        state.empContractType === "Parttime" ||
        state.empContractType ===  "local expat"||
        state.empContractType === "Local Expat"

      ) {
        var dateValue = new Date(
          new Date().setMonth(
            new Date().getMonth() + parseInt(state.noticePeriod)
          )
        );
        let aboveDateValue = new Date(
          new Date().setMonth(
            new Date().getMonth() + (parseInt(state.noticePeriod) + 1)
          )
        );
        setLastWorkingDate(dateValue);

        setLastDateSelection(aboveDateValue);
        state.lastWorkingDate = dateValue;
      } else {
        state.lastWorkingDate = "";
      }
      state.lastWorkingDate =
        employeeData.lastWorkingDate !== null &&
        employeeData.lastWorkingDate !== undefined
          ? new Date(employeeData.lastWorkingDate)
          : new Date();
      state.personalEmailId = employeeData.personalEmailId;
      state.comments = employeeData.employeeComment;
      state.noticePeriodRcryDays =
        employeeData.noticePeriodRecoveryDays !== null &&
        employeeData.noticePeriodRecoveryDays !== undefined
          ? employeeData.noticePeriodRecoveryDays
          : "";
      if (employeeData.status === 8) {
        setSuccessModal(true);
        setPreview(true);
      }

      if (
        employeeData.noticePeriodRecovery !== null &&
        employeeData.noticePeriodRecovery !== undefined
      ) {
        if (employeeData.noticePeriodRecovery === 2) {
          setRcryNo(true);
          setRcryYes(false);
        } else if (employeeData.noticePeriodRecovery === 1) {
          setRcryNo(false);
          setRcryYes(true);
        } else if (employeeData.noticePeriodRecovery === 0) {
          setRcryNo(false);
          setRcryYes(false);
        }
      } else {
        setRcryNo(false);
        setRcryYes(false);
      }
      if (employeeData.reHire !== null && employeeData.reHire !== undefined) {
        if (employeeData.reHire === 2) {
          setRehireNo(true);
          setRehireYes(false);
        } else if (employeeData.reHire === 1) {
          setRehireNo(false);
          setRehireYes(true);
        } else if (employeeData.reHire === 0) {
          setRehireNo(false);
          setRehireYes(false);
        }
      } else {
        setRehireNo(false);
        setRehireYes(false);
      }
    }
  }, [employeeData, ModeOfSeparationData, employeeId]);
  useEffect(() => {
    if (
      employeeData &&
      employeeData !== null &&
      employeeData !== undefined &&
      Object.keys(employeeData).length !== 0 &&
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      if (employeeData.modeOfSeparationId === 1) {
        console.log(ModeOfSeparationData[0].modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      ModeOfSeparationData.map((item, i) => {
        if (
          employeeData.modeOfSeparationId ===
          ModeOfSeparationData[i].modeOfSeparation.separationId
        ) {
          setModeOfSeparation(
            ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation
          );

          ModeOfSeparationData[i].modeOfSeparationReasonList.map((item1, j) => {
            if (
              employeeData.modeOfSeparationReasonId ===
              ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                .separationReasonId
            ) {
              state.modeOfSeparationReasonId =
                ModeOfSeparationData[i].modeOfSeparationReasonList[
                  j
                ].modeOfSeparationReason;
            }
          });
        }
      });
    }
  }, [employeeData, ModeOfSeparationData, employeeId]);
  console.log(state);
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
        setDateOfResignation(new Date());
        setLastWorkingDate(new Date());
        setPreview(false);
        ViewEmployeeDataById(state.empId);
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
    console.log(searchByCostData, "searchByCostData");
    if (
      searchByCostData &&
      searchByCostData &&
      searchByCostData !== null &&
      searchByCostData !== undefined &&
      Object.keys(searchByCostData).length !== 0 &&
      locationDetailsList &&
      locationDetailsList &&
      locationDetailsList !== null &&
      locationDetailsList !== undefined &&
      Object.keys(locationDetailsList).length !== 0
    ) {
      locationDetailsList.map((item, i) => {
        if (item.locationId === searchByCostData.locationId) {
          state.empLocation = item.locationName;
        }
      });
    }
  }, [locationDetailsList, searchByCostData]);
  useEffect(() => {
    if (
      searchByCostData &&
      searchByCostData &&
      searchByCostData !== null &&
      searchByCostData !== undefined &&
      Object.keys(searchByCostData).length !== 0
    ) {
      //  state.empName = searchEmpData1.firstName;
      const temp =
        searchByCostData.lastName !== null &&
        searchByCostData.lastName !== undefined
          ? searchByCostData.lastName
          : "";
      state.empId = searchByCostData.employeeId;
      setEmpName(searchByCostData.firstName + " " + temp);

      state.empContractType = searchByCostData.contractType;
      state.empCostCenterName = searchByCostData.costCentre;
      if (
        searchByCostData.department == "AFS" ||
        searchByCostData.department == "IT" ||
        searchByCostData.department == "Legal" ||
        searchByCostData.department == "Finance"
      ) {
        state.noticePeriod = searchByCostData.noticePeriod;
      } else {
        state.noticePeriod = searchByCostData.noticePeriod;
      }
      // state.noticePeriod = searchByCostData.noticePeriod
      //   state.empLocation = searchEmpData1.location;
      state.empPosition = searchByCostData.position;
      state.emailId = searchByCostData.personalEmail;
      state.mngrName = searchByCostData.managerName;
      state.mngrId = searchByCostData.managerId;
      state.mngrCostCenterName = searchByCostData.managerCostCentre;
      state.mngrPosition = searchByCostData.managerPosition;
      console.log(searchByCostData);
      if (
        state.empContractType === "internship" ||
        state.empContractType === "Internship"
      ) {
        state.noticePeriod = searchByCostData.internshipPeriod;
        // setDateOfResignation(new Date(searchByCostData.joiningDate))
        setIntern(true);
        var data = new Date(searchByCostData.joiningDate).setMonth(
          new Date(searchByCostData.joiningDate).getMonth() +
            (searchByCostData.internshipPeriod !== null &&
            searchByCostData.internshipPeriod !== undefined
              ? searchByCostData.internshipPeriod
              : 0)
        );
        setLastWorkingDate(new Date(data));
      } else if (
        state.empContractType === "Fulltime" ||
        state.empContractType === "fulltime" ||
        state.empContractType === "parttime" ||
        state.empContractType === "Parttime" ||
        state.empContractType ===  "local expat"||
        state.empContractType === "Local Expat"

      ) {
        var dateValue = new Date(
          new Date().setMonth(
            new Date().getMonth() + parseInt(state.noticePeriod)
          )
        );
        setLastWorkingDate(dateValue);
        let aboveDateValue = new Date(
          new Date().setMonth(
            new Date().getMonth() + (parseInt(state.noticePeriod) + 1)
          )
        );
        setIntern(false);
        setLastDateSelection(aboveDateValue);

        //         if(dateValue.getDate()>=1 &&  dateValue.getDate()<=20
        //           && searchByCostData.noticePeriod == 0){
        //           setLastDateSelection(dateValue.setDate("20"))
        //           setLastWorkingDate(dateValue)
        //         }else {
        //           var aboveDateValue =  new Date(new Date().setMonth(new Date().getMonth() + (parseInt(searchByCostData.noticePeriod) + 1)))
        //           setLastDateSelection(aboveDateValue.setDate(20))
        //           setLastWorkingDate(aboveDateValue.setDate(dateValue.getDate()-20))
        //         }
        // console.log(dateValue.setDate("20"),aboveDateValue,searchByCostData)
      } else {
        setIntern(false);
        setLastWorkingDate(new Date());
      }
    } else {
      state.empName = "";
      state.exitId = "";
      state.emailId = "";
      state.empContractType = "";
      state.empCostCenterName = "";
      state.empLocation = "";
      state.empPosition = "";
      state.mngrName = "";
      state.mngrId = "";
      state.mngrCostCenterName = "";
      state.mngrPosition = "";
      state.dateOfResignation = "";
      // setDateOfResignation("")
      // setLastWorkingDate("")
      setEmpName("");
    }
  }, [searchByCostData]);
  // useEffect(() => {
  //   if (
  //     fetchemployeeData &&
  //     fetchemployeeData &&
  //     fetchemployeeData !== null &&
  //     fetchemployeeData !== undefined &&
  //     Object.keys(fetchemployeeData).length !== 0
  //   ) {
  //     state.mngrName =
  //     fetchemployeeData.lastName !== null &&
  //     fetchemployeeData.lastName !== undefined
  //         ? fetchemployeeData.firstName + " " + fetchemployeeData.lastName
  //         : fetchemployeeData.firstName;
  //     state.mngrId = fetchemployeeData.employeeId;
  //     state.mngrCostCenterName = fetchemployeeData.costCentre;
  //     state.mngrPosition = fetchemployeeData.position;
  //   }
  // }, [fetchemployeeData]);

  const searchDataHandler = () => {
    const searchText = employeeRef.current.getInput();
    setEmpName(searchText.value);
    setState({
      ...state,
      EmpName: searchText.value,
    });

   if (searchText.value !== null) {
    // if (EmpName !== null) {
      // searchText.value or EmpName
      searchByEmployee(searchText.value);
      setCheckForExist(true);
      //   setFirstClick(true);
    }
  };

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
      tempArr.push({
        label: "End of Contract",
        value: 6,
      });
      tempArr.push({
        label:"Employee Demise",
        value:7
      })
      setModeOfSeparationList(tempArr);
    }
  }, [ModeOfSeparationData]);
  console.log(
    ModeOfSeparationData,
    "modeOfSeparationList",
    modeOfSeparationList
  );

  useEffect(() => {
    if (
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      let tempArray = [];
      ModeOfSeparationData.map((item, i) => {
        console.log(
          ModeOfSeparationData[i].modeOfSeparation.separationId,
          changeInSeparation,
          "separation"
        );
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

  const saveOfferLetter = () => {
    setPreviewGeneratedLetter(true);
    setSaveLetter(true);
    setShow(false);
  };

  const digitalSignature = () => {
    setShowSignature(true);
  };
  const handleTermination = () => {
    setTermination(false);
    setModeOfSeparation("");
  };
  const handleShowAddModalClose = () => setShowAddModal(false);

  const submitfinalRelivingLetter = (e) => {
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

          const data2 = {
            company: null,
            contractType: state.empContractType,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            personalEmailId: state.emailId,
            empName: EmpName,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: EmpName,
            exitId: state.exitId,
            hoursWorked: null,
            lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location:
              searchByCostData.locationId !== null
                ? searchByCostData.locationId
                : null,
            managerCostCentre: state.managerCostCentre,
            managerEmailId: null,
            managerId: state.mngrId ? state.mngrId : "",
            managerName: state.mngrName,
            managerPosition: state.mngrPosition,
            modeOfSeparationId: changeInSeparation,
            modeOfSeparationReasonId: reasonId,
            noticePeriod: state.noticePeriod,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            position: state.empPosition,
            reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
            reason: null,
            reasonForResignation: null,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
            status: 9,
            // status:employeeData.status === 3 ? 3 :
            // (modeOfSeparation == 1 || modeOfSeparation == "Resignation")?2:4,
          };

          console.log("createExitData", data2);
          // setSubmitted(true);

          UpdateEmplyoeeExist(data2, state.empId);
          setSubmitLetter(true);
          setLetterSent(true);
          setShow(true);
        } else if (intern === true) {
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
            company: null,
            contractType: state.empContractType,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            personalEmailId: state.emailId,
            empName: EmpName,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: EmpName,
            exitId: state.exitId,
            hoursWorked: null,
            lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location:
              searchByCostData.locationId !== null
                ? searchByCostData.locationId
                : null,
            managerCostCentre: state.managerCostCentre,
            managerEmailId: null,
            managerId: state.mngrId ? state.mngrId : "",
            managerName: state.mngrName,
            managerPosition: state.mngrPosition,
            modeOfSeparationId: 6,
            modeOfSeparationReasonId: reasonId,
            noticePeriod: state.noticePeriod,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            position: state.empLocation,
            reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
            reason: null,
            reasonForResignation: null,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
            status: 6,
          };
          console.log("createExitData", data1);
          UpdateEmplyoeeExist(data1, state.empId);
          setSubmitLetter(true);
          setLetterSent(true);
          setShow(true);
        }
      }
    }
    // if (
    //   employeeData.employeeId !== null &&
    //   employeeData.employeeId !== undefined
    // ) {
    //   setSubmitLetter(true);
    //   setLetterSent(true);
    //   setShow(true);

    //// finalSubmitOfferLetter(employeeData.employeeId);
    // }
  };

  const previewRelivingLetter = (e) => {
    e.preventDefault();
    if (employeeData !== null && employeeData !== undefined) {
      fetchRelievingLetterData(employeeData.employeeId);
      setSubmitLetter(false);
      setPreviewLetter(true);
      setShow(true);
    }
  };
  const handleDisciplinary = () => {
    EmployeeSearchWithKey(state.empId);
    history.push("../issue-show-cause-notice");
  };
  const relivingLetterClick = (e) => {
    console.log(e.target.value, "999");
    e.preventDefault();
    if (e.target.value == "1" || e.target.value == "Resignation") {
      fetchRelievingLetterData(employeeData.employeeId);
      handleShow();
      console.log("resignation");
    } else if (e.target.value == "2" || e.target.value == "Termination") {
      fetchTerminationLetterData(employeeData.employeeId);
      handleShow();
      console.log("termination");
    } else if (intern == true) {
      fetchRelievingLetterData(employeeData.employeeId);
      handleShow();
    }

    // setPreviewGeneratedLetter(true);
  };
  const handleShow = () => {
    console.log("inside show moodal");
    setViewLetter(true);
    setShow(true);
  };
  // reliving letter end
  const handleClose = () => {
    setModal(false);
    setSuccessModal(false);
  };
  const handleCloseDemise = () =>{
    setShowSuccessModalDemise(false)
  }
  const handleInfoClose = () => {
    setShowInfoModal(false);
    setEmpName("");
    state.empId = "";
    state.empContractType = "";
    state.empPosition = "";
    state.empLocation = "";
    state.empCostCenterName = "";
    state.emailId = "";
    state.noticePeriod = "";
    setLastWorkingDate(new Date());
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
  const changeHandler1 = (e) => {
    var data = e.target.value;
    console.log(e.target.name, data, "changeHandler1");
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
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
    console.log("",e.target.value)
    setModeOfSeparation(e.target.value);
    modeOfSeparationList.map((item, i) => {
      console.log(item, e.target.value, "item");
      if (
        e.target.value == "Termination" &&
        (state.empContractType !== "internship" ||
          state.empContractType !== "Internship")
      ) {
        setTermination(true);
      } else {
        if (modeOfSeparationList[i].label === e.target.value) {
          setChangeInSeparation(modeOfSeparationList[i].value);
          console.log(modeOfSeparationList[i].value);

        }
      }
    });

    console.log(e.target.value);
  };

  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    // console.log("AdjusteddateValue");
    var AdjusteddateValue1 = new Date(AdjusteddateValue);
    setLastWorkingDate(
      AdjusteddateValue1.setMonth(
        AdjusteddateValue1.getMonth() + parseInt(state.noticePeriod)
      )
    );
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
  console.log(rolePermission,"rolePermission")
  // const iamStatusValidate = () => {
  //   var status = state.iamStatus
  //   if (
  //     (status !== "" &&
  //     status !== null &&
  //     status !== undefined) && 
  //     (rolePermission == "admin"||
  //     rolePermission == "superCostCenterManager"||
  //      rolePermission == "costCenterManager"||
  //      rolePermission == "manager")
  //   ) {
  //     SetIamStatusError(false);
  //     return true;
  //   } else {
  //     SetIamStatusError(true);
  //     return false;
  //   }
  // };
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
    var noticeDays = state.noticePeriod * 30;
    if (RcryYes === true && intern === false) {
      if (
        state.noticePeriodRcryDays !== "" &&
        state.noticePeriodRcryDays !== null &&
        state.noticePeriodRcryDays !== undefined &&
        Valid.test(state.noticePeriodRcryDays) &&
        state.noticePeriodRcryDays <= noticeDays
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
      // (iamStatusValidate() === true) &
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
          var reasonId = 0;
          reasonOfSeparationList.map((item, i) => {
            if (
              reasonOfSeparationList[i].label === state.modeOfSeparationReasonId
            ) {
              reasonId = reasonOfSeparationList[i].value;
              console.log(reasonOfSeparationList[i].value);
            }
          });

          const data2 = {
            company: null,
            contractType: state.empContractType,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            dateOfResignation:changeInSeparation === 7?null:moment(dateOfResignation).format("YYYY-MM-DD"),
            personalEmailId: state.emailId,
            empName: EmpName,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: EmpName,
            exitId: 0,
            hoursWorked: null,
            lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location:
              searchByCostData.locationId !== null
                ? searchByCostData.locationId
                : null,
            managerCostCentre: state.managerCostCentre,
            managerEmailId: null,
            managerId: state.mngrId ? state.mngrId : "",
            managerName: state.mngrName,
            managerPosition: state.mngrPosition,
            modeOfSeparationId: changeInSeparation,
            modeOfSeparationReasonId: reasonId,
            noticePeriod: state.noticePeriod,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            position: state.empPosition,
            reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
            reason: null,
            reasonForResignation: null,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
            status: changeInSeparation === 7?10:8,
            // iamStatus:state.iamStatus
          };

          console.log("createExitData", data2);
          CreateEmplyoeeExist(data2, state.empId,history);
          if(changeInSeparation === 7){
            setSubmitted(true);
            setShowSuccessModalDemise(true);
          }else{
            setSubmitted(true);
            setPreview(true);
            setSuccessModal(true);
          }
         
          //   empResign(data1);
          //  TerminationFromDesciplinary(false);
        } else if (intern === true) {
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
            company: null,
            contractType: state.empContractType,
            costCentreManagerEmailId: null,
            costCentreManagerName: null,
            costCentreName: null,
            dateOfResignation: moment(dateOfResignation).format("YYYY-MM-DD"),
            personalEmailId: state.emailId,
            empName: EmpName,
            employeeComment: null,
            employeeId: state.empId,
            employeeName: EmpName,
            exitId: 0,
            hoursWorked: null,
            lastWorkingDate: moment(lastWorkingDate).format("YYYY-MM-DD"),
            location:
              searchByCostData.locationId !== null
                ? searchByCostData.locationId
                : null,
            managerCostCentre: state.managerCostCentre,
            managerEmailId: null,
            managerId: state.mngrId ? state.mngrId : "",
            managerName: state.mngrName,
            managerPosition: state.mngrPosition,
            modeOfSeparationId: 6,
            modeOfSeparationReasonId: reasonId,
            noticePeriod: state.noticePeriod,
            noticePeriodRecovery: RcryYes ? 1 : RcryNo ? 2 : 0,
            noticePeriodRecoveryDays: parseInt(state.noticePeriodRcryDays),
            position: state.empLocation,
            reHire: RehireYes ? 1 : RehireNo ? 2 : 0,
            reason: null,
            reasonForResignation: null,
            rehireRemark: state.remarks !== "" ? state.remarks : null,
            status: 8,
            iamStatus:state.iamStatus
          };
          console.log("createExitData", data1);
          //   empResign(createExitData);
          CreateEmplyoeeExist(data1, state.empId);
          setSubmitted(true);
          setPreview(true);
          setSuccessModal(true);
          // TerminationFromDesciplinary(false);
        }
      }
    }
  };
  console.log(
    "employeeData","-->",
    employeeProfileData,"-->",
    fetchemployeeData,
    searchByCostData,"-->",
    employeeData
  );
  return (
    <Fragment>
      {termination ? (
        <Modal show={termination} onHide={handleTermination} size="md" centered>
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Disciplinary action has to be taken before termination.
              <br />
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleTermination}>Close</Button>
              <Button
                onClick={handleDisciplinary}
                style={{ marginLeft: "1rem" }}
              >
                Next
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
      {/* reliving letter */}
      {employeeData !== null &&
      employeeData !== undefined &&
      employeeData.status === 8 ? (
        <Modal
          show={showAddModal}
          onHide={handleShowAddModalClose}
          size="md"
          centered
        >
          <Modal.Header closeButton className="modal-line"></Modal.Header>
          <Modal.Body className="mx-auto">
            <label className="text-center">
              Please Add the Digital Signature.
              <br />
            </label>
            <div className="text-center mb-2">
              <Button onClick={handleShowAddModalClose}>Close</Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
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
              The relieving letter will be sent to the employee on{" "}
              {moment(
                terminationLetterData !== null &&
                  terminationLetterData !== undefined &&
                  (modeOfSeparation == "Termination" || modeOfSeparation == 2)
                  ? terminationLetterData.lastWorkingDate
                  : relivingLetterData !== null &&
                    relivingLetterData !== undefined &&
                    (modeOfSeparation == "Resignation" || modeOfSeparation == 1)
                  ? relivingLetterData.lastWorkingDate
                  : modeOfSeparation === "End of Contract"
                  ? relivingLetterData.lastWorkingDate
                  : new Date(),
                "YYYY-MM-DD"
              )
                .add(1, "days")
                .format("YYYY-MM-DD")}
            </label>
            <div className="text-center">
              <Link to={"/employee-separation-listing"}>
                <Button onClick={handleRelivingClose}>Close</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
      {lettterview ? (
        <div>
          {relivingLetterData &&
          relivingLetterData !== undefined &&
          relivingLetterData !== null &&
          intern === false &&
          (modeOfSeparation == "1" || modeOfSeparation == "Resignation") ? (
            <RelievingLetter anotherPath={true} />
          ) : terminationLetterData &&
            terminationLetterData !== undefined &&
            terminationLetterData !== null &&
            intern === false &&
            (modeOfSeparation == "2" || modeOfSeparation == "Termination") ? (
            <TerminationLetter />
          ) : terminationLetterData &&
            terminationLetterData !== undefined &&
            terminationLetterData !== null ? (
            <InternShipLetter anotherPath={true} />
          ) : null}
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

      <Modal show={showSuccessModalDemise} onHide={() => handleClose()} centered>
        <Container>
          <Modal.Header closeButton className="modalHeader">
            {/* <Modal.Title>State remarks for disapproval</Modal.Title> */}
          </Modal.Header>{" "}
          <Modal.Body className="mx-auto">
            <label>
              Exit details saved successfully the employee has been notified
            </label>

            <div className="text-center mb-2">
            <Link to={"/employee-separation-listing"}>
              <Button onClick={() => handleCloseDemise()}>Close</Button>
              </Link>
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
                                {/* <div className="faq-form ">
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
                                </div> */}
                                  <Typeahead
                                        id="_empSearchId"
                                        filterBy={['firstName', 'lastName', 'employeeId']}
                                        minLength={2}
                                       
                                        // labelKey='firstName'
                                        ref={employeeRef}
                                        options={employeeDetails}
                                        labelKey={option => `${option.firstName  ?? ''} ${option.lastName ?? ''}`}
                                        placeholder="Search.."
                                        onChange={setSearchEmpSelected}
                                        selected={searchEmpSelected}
                                      
                                      />
                                    
                                            
                                    {searchEmpSelected.length > 0  ? (

                                    <Search
                                    className="search-icon"
                                    style={{ color: "#313131" }}
                                    onClick={searchDataHandler}
                                    />
                                    ) : (
                                    ""
                                    )}
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
                        {state.empContractType !== "internship" ? (
                          <Col sm={4}>
                            <div>
                              <label>
                                Notice Period:
                                <label className="itemResult">
                                  &nbsp;&nbsp;{" "}
                                  {state.noticePeriod === 1
                                    ? `${state.noticePeriod} Month`
                                    : state.noticePeriod > 1
                                    ? `${state.noticePeriod} Months`
                                    : state.noticePeriod}
                                </label>
                              </label>
                            </div>
                          </Col>
                        ) : (
                          <Col sm={4}>
                            <div>
                              <label>
                                Internship contract end date:
                                <label className="itemResult">
                                  &nbsp;&nbsp;{" "}
                                  {state.noticePeriod === 1
                                    ? `${state.noticePeriod} Month`
                                    : state.noticePeriod > 1
                                    ? `${state.noticePeriod} Months`
                                    : state.noticePeriod}
                                </label>
                              </label>
                            </div>
                          </Col>
                        )}
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
                            <label>Type of Separation:</label>
                          </div>
                        </Col>
                        {/* {intern ? (
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
                        ) : ( */}
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
                                    modOfSepError ? { borderColor: "red" } : {}
                                  }
                                >
                                  <option value=""></option>
                                  {modeOfSeparationList.map((item) => {
                                    console.log(
                                      state.empContractType,
                                      "state.empContractType"
                                    );
                                    if (
                                      (state.empContractType == "internship" ||
                                        state.empContractType ==
                                          "Internship") &&
                                      item.label !== "Termination" &&
                                      item.label !== "Resignation" && item.label !== "Employee Demise"
                                    ) {
                                      return (
                                        <option key={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    } else if (
                                     ( state.empContractType == "fulltime" ||
                                      state.empContractType == "Fulltime" ||
                                      state.empContractType == "Parttime" ||
                                      state.empContractType == "parttime" ||
                                      state.empContractType =="Local Expat" ||
                                      state.empContractType == "local expat"
                                      ) &&
                                      item.label !== "End of Contract" 
                                    ) {
                                      return (
                                        <option key={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    }
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

                        {/* } */}
                        {/* {intern ? (
                          ""
                        ) : ( */}
                       {changeInSeparation === 7?<></>:<> <Col sm={2}>
                          <div>
                            <label>
                              Date of{" "}
                              {changeInSeparation === 2
                                ? "Termination:"
                                : "Resignation:"}
                            </label>
                          </div>
                        </Col>
                        {/* )}
                        {intern ? (
                          ""
                        ) : ( */}
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
                                    value={moment(dateOfResignation).format(
                                      "YYYY-MM-DD"
                                    )}
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
                        </Col></>}
                        {/* )} */}

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
                                    value={
                                      new Date(
                                        moment(lastWorkingDate).format(
                                          "YYYY-MM-DD"
                                        )
                                      )
                                    }
                                    popperPlacement="bottom-end"
                                    selected={lastWorkingDate}
                                    name="lastWorkingDate"
                                    minDate={new Date()}
                                    popperPlacement="bottom-end"
                                    minDate={moment().toDate()}
                                    //maxDate={intern === true?"":lastDateSelection}
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
                                    &nbsp; *Please enter valid date
                                  </p>
                                ) : (
                                  <p></p>
                                )}
                              </Form.Group>
                            )}
                          </div>
                        </Col>
                        {/* 
                        {intern === false ? (
                          <Col sm={2}>
                            <div>
                              <label>Notice Period Recovery Days</label>
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                        {intern === false ? (
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
                        )} */}
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
                        {/* {intern ? (
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
                        ) :
                         ( */}
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
                                  onChange={changeHandler1}
                                  //   disabled={disabled}
                                  style={
                                    modOfSepReasonError
                                      ? { borderColor: "red" }
                                      : {}
                                  }
                                >
                                  <option value=""></option>
                                  {reasonOfSeparationList.map((item) => {
                                    console.log(item, "item");
                                    if (intern == true) {
                                      if (item.label !== "Termination") {
                                        return (
                                          <option
                                            name={item.value}
                                            key={item.value}
                                          >
                                            {item.label}
                                          </option>
                                        );
                                      }
                                    } else {
                                      return (
                                        <option
                                          name={item.value}
                                          key={item.value}
                                        >
                                          {item.label}
                                        </option>
                                      );
                                    }
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

                        {/* } */}

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
                        {intern === false ? (
                          <>
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
                          </>
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
                        {" "}
                        <Col sm={4}>
                          <div>
                            <label>
                              <b>Approver:</b>
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.mngrName}
                                &nbsp; {state.mngrId}
                              </label>
                            </label>
                          </div>
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
                          <a  target="_blank" href="~/address">
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
                      <Row
                        style={{
                          marginTop: "2rem",
                          marginLeft: "2rem",
                          marginBottom: "2rem",
                        }}
                      >
                        {intern === false ? (
                          <>
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
                                      rcryDaysError
                                        ? { borderColor: "red" }
                                        : {}
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
                          </>
                        ) : (
                          ""
                        )}

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
                      {state.remarks !== "" &&
                    state.remarks !== null &&
                    state.remarks !== undefined ? (
                      <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={12}>
                        <div className="newRemarks">
                            <p className="ItemRemarks">
                              <b>Remarks:</b>
                              <span className="itemResultSeparation">
                               
                                &nbsp;&nbsp; {state.remarks}
                              
                              </span>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                     {/* <Row
                        style={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                          marginBottom: "3rem",
                        }}
                      >
                        <Col sm={2}>
                          <div>
                            <label>Identity Profile Active :</label>
                          </div>
                        </Col>
                        <Col sm={2}>
                          <div>
                            {false ? (
                              <label className="itemResult">
                                &nbsp;&nbsp; {state.iamStatus}
                              </label>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  name="iamStatus"
                                  value={state.iamStatus}
                                  onChange={changeHandler1}
                                  style={
                                    iamStatusError
                                      ? { borderColor: "red" }
                                      : {}
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="Delete">Delete</option>
                                  <option value="Suspend">Suspend</option>
                                  <option value="Keep the account active">Keep the account active</option>

                                </Form.Control>
                                {iamStatusError ? (
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
                        </Row> */}
                     {changeInSeparation === 7?<>
                      <Row>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          <button
                            disabled={submitted}
                            className={
                              submitted ? "confirmButton" : "stepperButtons"
                            }
                            onClick={submitHandler}
                          >
                            Save
                          </button>
                          </Col>
                          </Row>
                     </>
                      :<Row>
                        <Col
                          style={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                          }}
                        >
                          <button
                            disabled={submitted}
                            className={
                              submitted ? "confirmButton" : "stepperButtons"
                            }
                            onClick={submitHandler}
                          >
                            Save
                          </button>
                          {submitted === false ||
                          modeOfSeparation == "Termination" ||
                          modeOfSeparation == 2 ? (
                            ""
                          ) : (
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
                          )}

                          {!saveLetter &&
                          employeeData &&
                          employeeData &&
                          employeeData !== null &&
                          employeeData !== undefined &&
                          Object.keys(employeeData).length !== 0 &&
                          (employeeData.status === 3 ||
                            employeeData.status === 2 ||
                            employeeData.status === 8 ||
                            employeeData.status === 6) &&
                          showPreview === true &&
                          submitted === true ? (
                            <button
                              // disabled={!submitted}
                              value={modeOfSeparation}
                              className={"LettersButtons"}
                              onClick={relivingLetterClick}
                            >
                              Generate Letter
                            </button>
                          ) : (
                            ""
                          )}
                          {/* {saveLetter &&
                          previewGeneratedLetter &&
                          showPreview ? (
                            <button
                              className={"LettersButtons"}
                              onClick={previewRelivingLetter}
                            >
                              Preview Letter
                            </button>
                          ) : (
                            ""
                          )} */}
                          {/* {employeeData !== null &&
        employeeData !== undefined && employeeData.status === 8?<label style={{color:'red'}}>{"Please Add the Digital signature"}</label>:''} */}
                          {/* {saveLetter && previewGeneratedLetter && showPreview && (
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
                                ""
                              )}
                            </div>
                          )} */}
                        </Col>
                      </Row>}
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
