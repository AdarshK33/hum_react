import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Search, PlusCircle, MinusCircle } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./offers.css";
import "./OnBoard.css";
import "./Documents.css";
import { OnBoardContext } from "../../context/OnBoardState";
import countryList from "react-select-country-list";
import {
  candidate,
  candidateGetRefreshToken,
} from "../../utils/canditateLogin";
import moment from "moment";

const PersonalInformation = (props) => {
  const {
    updatePersonalInfo,
    CandidatePersonalInfo,
    candidatePersonalInfoData,
    PersonalInfoResponse,
    CandidateProfile,
    candidateProfileData,
    searchForEmp1,
    searchEmpData1,
    searchForEmp2,
    searchEmpData2,
    CandidateViewInformation,
    candidateViewInfo,
    addressView,
    uploadFile,
    documentView,
    documentViewData,
    DeleteAllInsuranceNominations,
    UpdateNomineeStatus,
    candidateCountryList,
    candidateCountryData,
  } = useContext(OnBoardContext);
  const options = useMemo(() => countryList().getData(), []);
  const [isClicked, setIsClicked] = useState(false);
  const [fullTime, setFullTime] = useState(true); //Permanent
  const [partTime, setParTime] = useState(false);
  const [localExpact, setLocalExpact] = useState(false);
  const [internship, setInternship] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const [DOB, setDOB] = useState();
  const [nationlArray, setNationlArray] = useState([]);
  const [empName1, setEmpName1] = useState("");
  const [empName2, setEmpName2] = useState("");
  const [refEmail1, setRefEmail1] = useState("");
  const [refEmail2, setRefEmail2] = useState("");
  const [desgination1, setDesignation1] = useState("");
  const [desgination2, setDesignation2] = useState("");

  const [genderCheckM, setGenderM] = useState(false);
  const [genderCheckF, setGenderF] = useState(false);
  const [genderCheckOther, setGenderOther] = useState(false);
  const [married, setMarried] = useState(false);
  const [unMarried, setUnMarried] = useState(false);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [required, setRequired] = useState(true);
  const [statusRequired, setstatusRequired] = useState(true);
  const [disabilityDoc, setDocName] = useState("");
  const [disabilityDocObj, setDisabilityDocObj] = useState("");
  const [isDisabilityUploaded, setDisabilityUploaded] = useState(false);
  const [panNumberError, setPanNumberError] = useState(false);
  const [aadharNumberError, setAdharNumberError] = useState(false);
  const [passPortNoError, setPassPortError] = useState(false);
  const [DOBError, setDOBError] = useState(false);
  const [adharNameError, setAdharNameError] = useState(false);
  const [fatherName, setFatherNameError] = useState(false);
  const [disabilityError, setDisabilityError] = useState(false);
  const [disabilityDocError, setDisabilityDocError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [bloodGroupError, setBloodGroupError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [empName1Error, setEmpNam1Error] = useState(false);
  const [empName2Error, setEmpNam2Error] = useState(false);
  const [emp1EmailError, setEmp1EmailError] = useState(false);
  const [emp2EmailError, setEmp2EmailError] = useState(false);
  const [saveClick, setSaveClick] = useState(false);
  const [disabilityStatus, setDisabilityStatus] = useState(false);
  const [dateOfIssue, setDateOfIssue] = useState(null);
  const [dateOfValidity, setDateOfValidity] = useState(null);
  const [state, setState] = useState({
    aadhaarName: "",
    fatherName: "",
    aadhaarNumber: "",
    passPortNo: "",
    panNumber: "",
    bloodGroup: "",
    nationality: "",
    disability: "",
    lgbt: "",
  });
  let history = useHistory();

  useEffect(() => {
    CandidateProfile();

    if (
      localStorage.getItem("candidate_access_token") !== null &&
      localStorage.getItem("candidate_access_token") !== undefined
    ) {
      console.log(
        "inside refresh token",
        localStorage.getItem("candidate_access_token")
      );
      candidateGetRefreshToken()
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("candidate_access_token", token);
        })
        .catch((error) => {
          if (error.message == "Cannot read property 'data' of undefined") {
            localStorage.removeItem("candidate_access_token");
            history.push("/onboard-offer");
          }
        });
    }
  }, []);

  useEffect(() => {
  candidateCountryList();
}, []);

  useEffect(() => {
    console.log("candidateProfileData1",candidateProfileData,candidateCountryData);

    if (
      candidateProfileData !== null &&
      candidateProfileData !== undefined &&
      Object.keys(candidateProfileData).length !== 0
    ) {
      console.log("inside if");
      if (candidateProfileData.contractType === "Local Expat") {
        let nationList = candidateCountryData.filter(
          (item) => item.nationality !== "Indian"
        );
        console.log("options list", options);
        console.log("contract list", nationList);
        setNationlArray(nationList);
      } else {
        console.log("inside else");
        setNationlArray(candidateCountryData);
      }
    }
  }, [candidateProfileData,candidateCountryData]);

  useEffect(() => {
    CandidateProfile();
  }, [candidateProfileData]);
  useEffect(() => {
    setRefEmail1(
      searchEmpData1 !== null
        ? searchEmpData1.email !== undefined && searchEmpData1.email !== null
          ? searchEmpData1.email
          : ""
        : ""
    );
    setDesignation1(
      searchEmpData1 !== null
        ? searchEmpData1.position !== undefined &&
          searchEmpData1.position !== null
          ? searchEmpData1.position
          : ""
        : ""
    );
  }, [searchEmpData1]);

  useEffect(() => {
    setRefEmail2(
      searchEmpData2 !== null
        ? searchEmpData2.email !== undefined && searchEmpData2.email !== null
          ? searchEmpData2.email
          : ""
        : ""
    );
    setDesignation2(
      searchEmpData2 !== null
        ? searchEmpData2.position !== undefined &&
          searchEmpData2.position !== null
          ? searchEmpData2.position
          : ""
        : ""
    );
  }, [searchEmpData2]);

  useEffect(() => {
    if (empName1 === "") {
      setRefEmail1("");
      setDesignation1("");
    }
    if (empName2 === "") {
      setRefEmail2("");
      setDesignation2("");
    }
  }, []);

  console.log(candidateProfileData);

  const empName1Handler = (e) => {
    setEmpName1(e.target.value);
    console.log(empName1);
    if (e.target.value === "") {
      setRefEmail1("");
      setDesignation1("");
    }
  };
  const empName2Handler = (e) => {
    setEmpName2(e.target.value);
    if (e.target.value === "") {
      setRefEmail2("");
      setDesignation2("");
    }
  };

  const empName1Search = () => {
    if (empName1 !== "") {
      console.log("emp1");
      searchForEmp1(empName1);
    }
  };
  const empName2Search = () => {
    if (empName2 !== "") {
      console.log("emp2");
      searchForEmp2(empName2);
    }
  };
  useEffect(() => {
    console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      CandidateViewInformation(candidateProfileData.candidateId);
    }
  }, [candidateProfileData]);
  console.log("personal information candidateViewInfo-->", candidateViewInfo);
  // console.log("contract type-->", candidateViewInfo.contractType);

  useEffect(() => {
    // console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      CandidatePersonalInfo(candidateProfileData.candidateId);
    }
  }, [candidateProfileData]);

  console.log("Candiate personal information data", candidatePersonalInfoData);

  useEffect(() => {
    // console.log("personal information view candidate", candidateProfileData);

    if (
      candidatePersonalInfoData !== null &&
      candidatePersonalInfoData !== undefined &&
      Object.keys(candidatePersonalInfoData).length !== 0 &&
      candidatePersonalInfoData.aadhaarName !== null
    ) {
      console.log("rajsekhar", candidatePersonalInfoData);
      setState({
        aadhaarName: candidatePersonalInfoData.aadhaarName,
        fatherName: candidatePersonalInfoData.fatherName,
        aadhaarNumber:
          candidatePersonalInfoData.aadhaarNumber !== null
            ? candidatePersonalInfoData.aadhaarNumber
            : "",
        passPortNo:
          candidatePersonalInfoData.passportNumber !== null
            ? candidatePersonalInfoData.passportNumber
            : "",
        panNumber:
          candidatePersonalInfoData.panNumber !== null
            ? candidatePersonalInfoData.panNumber
            : "",
        bloodGroup: candidatePersonalInfoData.bloodGroup,
        nationality: candidatePersonalInfoData.nationality,
        disability: candidatePersonalInfoData.disability,
        lgbt:
          candidatePersonalInfoData.lgbt !== null
            ? candidatePersonalInfoData.lgbt
            : "",
      });
      setDOB(
        candidatePersonalInfoData.dateOfBirth !== null &&
          candidatePersonalInfoData.dateOfBirth !== undefined
          ? new Date(candidatePersonalInfoData.dateOfBirth)
          : ""
      );
      setDateOfIssue(
        candidatePersonalInfoData.passportIssuedDate !== null &&
          candidatePersonalInfoData.passportIssuedDate !== undefined
          ? new Date(candidatePersonalInfoData.passportIssuedDate)
          : null
      );
      setDateOfValidity(
        candidatePersonalInfoData.passportExpiryDate !== null &&
          candidatePersonalInfoData.passportExpiryDate !== undefined
          ? new Date(candidatePersonalInfoData.passportExpiryDate)
          : null
      );
      if (
        candidatePersonalInfoData.gender !== null &&
        candidatePersonalInfoData.gender !== undefined &&
        candidatePersonalInfoData.gender === "Male"
      ) {
        setGenderM(true);
        setGenderF(false);
        setGenderOther(false);
        setGender("Male");
      } else if (
        candidatePersonalInfoData.gender !== null &&
        candidatePersonalInfoData.gender !== undefined &&
        (candidatePersonalInfoData.gender === "Female") |
          (candidatePersonalInfoData.gender === "FeMale")
      ) {
        setGenderF(true);
        setGenderM(false);
        setGender("Female");
        setGenderOther(false);
      } else if (
        candidatePersonalInfoData.gender !== null &&
        candidatePersonalInfoData.gender !== undefined &&
        candidatePersonalInfoData.gender === "Other"
      ) {
        setGenderOther(true);
        setGenderM(false);
        setGenderF(false);

        setGender("Male");
      } else {
        setGenderF(false);
        setGenderM(false);
        setGenderOther(false);
      }
      if (
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        candidatePersonalInfoData.maritalStatus === "Married"
      ) {
        setMarried(true);
        setUnMarried(false);
        setMaritalStatus("Married");
      } else if (
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        (candidatePersonalInfoData.maritalStatus === "Unmarried") |
          (candidatePersonalInfoData.maritalStatus === "UnMarried")
      ) {
        setUnMarried(true);
        setMarried(false);
        setMaritalStatus("Unmarried");
      } else {
        setUnMarried(false);
        setMarried(false);
      }

      // if (
      //   candidateProfileData !== undefined &&
      //   candidateProfileData.candidateReferences !== null &&
      //   candidateProfileData.candidateReferences !== undefined &&
      //   candidateProfileData.candidateReferences[0].employeeName !== null &&
      //   candidateProfileData.candidateReferences[0].employeeName !== undefined
      // ) {
      //   setEmpName1(candidateProfileData.candidateReferences[0].employeeName);
      //   setDesignation1(
      //     candidateProfileData.candidateReferences[0].designation
      //   );
      //   setRefEmail1(candidateProfileData.candidateReferences[0].email);
      // }
    }
  }, [candidatePersonalInfoData]);
  useEffect(() => {
    documentView(candidateProfileData.candidateId);
  }, [candidateProfileData]);
  console.log("documentViewData", documentViewData);

  useEffect(() => {
    if (documentViewData !== null && documentViewData !== undefined) {
      documentViewData.map((item) => {
        console.log("item.documentType", item.documentType, item);
        if (item.documentType === 13 && item.documentName) {
          setDocName(item.documentName ? item.documentName : "");
          setDisabilityStatus(item.status ? item.status : 0);
          setDisabilityUploaded(true);
        }
      });
    }
  }, [documentViewData]);

  var data1 =
    candidateProfileData !== undefined &&
    candidateProfileData.candidateReferences !== null &&
    candidateProfileData.candidateReferences !== undefined &&
    candidateProfileData.candidateReferences[0];
  // var data1 = 768;

  var data2 =
    candidateProfileData !== undefined &&
    candidateProfileData.candidateReferences !== null &&
    candidateProfileData.candidateReferences !== undefined &&
    candidateProfileData.candidateReferences[1];

  console.log("data1-->", data1);
  console.log("data2-->", data2);

  const AdharNameValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;

    if (
      state.aadhaarName !== "" &&
      state.aadhaarName !== null &&
      state.aadhaarName !== undefined
    ) {
      if (nameValid.test(state.aadhaarName.replace(/ +/g, ""))) {
        setAdharNameError(false);
        console.log("adharNAmeSuccess");
        return true;
      } else {
        setAdharNameError(true);
        console.log("AdharnameError");
        return false;
      }
    } else {
      setAdharNameError(true);
      console.log("AdharnameError");
      return false;
    }
  };
  const FatherNameValidation = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.fatherName !== "" &&
      state.fatherName !== null &&
      state.fatherName !== undefined
    ) {
      if (nameValid.test(state.fatherName.replace(/ +/g, ""))) {
        setFatherNameError(false);
        console.log("fatherNAmeSuccess");
        return true;
      } else {
        setFatherNameError(true);
        console.log("fathernameError");
        return false;
      }
    } else {
      setFatherNameError(true);
      console.log("fathernameError");
      return false;
    }
  };
  const PanNumberValidation = () => {
    const panValid = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (
      candidateViewInfo !== null &&
      candidateViewInfo !== undefined &&
      Object.keys(candidateViewInfo).length !== 0 &&
      candidateViewInfo.contractType === "Fulltime"
    ) {
      if ((state.panNumber !== "") & panValid.test(state.panNumber)) {
        var tempVar = state.panNumber.split("");
        console.log(tempVar[3]);
        if (tempVar[3].toLocaleLowerCase() === "p") {
          setPanNumberError(false);
          console.log("pansucess");
          return true;
        } else {
          setPanNumberError(true);
          console.log("panerror");
          return false;
        }
      } else {
        setPanNumberError(true);
        console.log("panerror");
        return false;
      }
    } else {
      return true;
    }
  };
  const AadharNumberValidation = () => {
    const aadharValid = /^[0-9\b]+$/;
    console.log("adhar");
    if (
      candidateViewInfo !== null &&
      candidateViewInfo !== undefined &&
      Object.keys(candidateViewInfo).length !== 0 &&
      (candidateViewInfo.contractType === "Fulltime") |
        (candidateViewInfo.contractType === "Parttime")
    ) {
      if (
        state.aadhaarNumber !== "" &&
        aadharValid.test(state.aadhaarNumber) &&
        state.aadhaarNumber.length === 12
      ) {
        setAdharNumberError(false);
        console.log("adharsucess");
        return true;
      } else {
        setAdharNumberError(true);
        console.log("adhaerror");
        return false;
      }
    } else {
      return true;
    }
  };
  const PassPortNumberValidations = () => {
    const passPortValid = /^[0-9\b]+$/;
    console.log("passPort");
    if (
      candidateViewInfo !== null &&
      candidateViewInfo !== undefined &&
      Object.keys(candidateViewInfo).length !== 0 &&
      candidateViewInfo.contractType === "Local Expat"
    ) {
      // if (state.passport !== "" && passPortValid.test(state.passport)) {
      if (state.passPortNo !== "") {
        setPassPortError(false);
        console.log("passPortsucess");
        return true;
      } else {
        setPassPortError(true);
        console.log("passPorterror");
        return false;
      }
    } else {
      return true;
    }
  };
  const dateOfIssueHandler = (date) => {
    setDateOfIssue(date);
  };
  const validityHandler = (date) => {
    setDateOfValidity(date);
  };
  const DOBValidation = () => {
    console.log("Dob");
    let dob = new Date(DOB);
    let now = new Date();
    console.log(now - dob);
    if (now - dob > 568024668000) {
      console.log("DOBSuccess");
      setDOBError(false);
      setDOB(DOB);
      console.log(DOB);
      return true;
    } else {
      setDOBError(true);
      console.log("DOBerror");
      return false;
    }
  };
  const disabilityValidation = () => {
    if (state.disability !== "" && state.disability !== "Disability") {
      setDisabilityError(false);
      console.log("disabilitySucess");
      return true;
    } else {
      setDisabilityError(true);
      console.log("disabilityFaill");
      return false;
    }
  };
  const disabilityDocValidation = () => {
    if (state.disability === "Yes") {
      if (disabilityDoc !== "") {
        console.log("------------->", disabilityDoc);
        setDisabilityDocError(false);
        console.log("disabilityDocSucess");
        return true;
      } else {
        setDisabilityDocError(true);
        console.log("disabilityDocFaill");
        return false;
      }
    } else {
      return true;
    }
  };

  const disabilityDocUploadValidation = () => {
    if (state.disability === "Yes") {
      if (isDisabilityUploaded === false) {
        if (disabilityDocValidation() === true) {
          setDisabilityDocError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const nationalityValidation = () => {
    if (state.nationality !== "" && state.nationality !== "Nationality") {
      setNationalityError(false);
      console.log("nationalitySucess");
      return true;
    } else {
      setNationalityError(true);
      console.log("nationalityFaill");
      return false;
    }
  };

  const bloodGroupValidation = () => {
    if (state.bloodGroup !== "" && state.bloodGroup !== "Select Blood Group") {
      setBloodGroupError(false);
      console.log("nationalitySucess");
      return true;
    } else {
      setBloodGroupError(true);
      console.log("nationalityFaill");
      return false;
    }
  };
  const validateCheckBoxesForGender = (
    itemOne,
    itemTwo,
    itemThree,
    setError
  ) => {
    if ((itemOne === true) | (itemTwo === true) | (itemThree === true)) {
      setError(false);
      console.log(itemOne, itemTwo, itemThree);
      return true;
    } else {
      setError(true);
      return false;
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
  const empName1Validation = () => {
    if (!data2) {
      if (empName1 !== "" && desgination1 !== "") {
        setEmpNam1Error(false);
        console.log("emp1Success");
        return true;
      } else {
        setEmpNam1Error(true);
        console.log("emp1NameFailure");
        return false;
      }
    } else {
      return true;
    }
  };
  const empName2Validation = () => {
    if (!data1) {
      if (empName2 !== "" && desgination2 !== "") {
        setEmpNam2Error(false);
        console.log("emp2Success");
        return true;
      } else {
        setEmpNam2Error(true);
        console.log("emp2NameFailure");
        return false;
      }
    } else {
      return true;
    }
  };

  const checkValidations = () => {
    console.log("checkValidations");
    if (
      (PanNumberValidation() === true) &
      (AadharNumberValidation() === true) &
      (DOBValidation() === true) &
      (AdharNameValidation() === true) &
      (FatherNameValidation() === true) &
      (disabilityValidation() === true) &
      (nationalityValidation() === true) &
      (bloodGroupValidation() === true) &
      (PassPortNumberValidations() === true) &
      (disabilityDocValidation() === true) &
      (validateCheckBoxesForGender(
        genderCheckM,
        genderCheckF,
        genderCheckOther,
        setGenderError
      ) ===
        true) &
      (validateCheckBoxes(married, unMarried, setMaritalStatusError) === true) &
      (disabilityDocUploadValidation() === true)
    ) {
      if (isClicked === true) {
        console.log("------");
        if (empName2Validation() === true) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const submitHandler = (e) => {
    // const submited = props.NextStep; //next component
    // submited();
    e.preventDefault();

    const value = checkValidations();
    console.log("insidelog", value);
    if (value === true) {
      if (saveClick === false) {
        const ReferenceData2 = [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId:
              candidateProfileData.candidateReferences[0] !== null &&
              candidateProfileData.candidateReferences[0] !== undefined
                ? candidateProfileData.candidateReferences[0].referenceId
                : 0,
          },
          {
            designation: desgination2 !== null ? desgination2 : null,
            email: refEmail2 !== null ? refEmail2 : null,
            employeeName: empName2 !== null ? empName2 : null,
            referenceId:
              candidateProfileData.candidateReferences[1] !== null &&
              candidateProfileData.candidateReferences[1] !== undefined
                ? candidateProfileData.candidateReferences[1].referenceId
                : 0,
          },
        ];
        const ReferenceData1 = [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId:
              candidateProfileData.candidateReferences[1] !== null &&
              candidateProfileData.candidateReferences[1] !== undefined
                ? candidateProfileData.candidateReferences[1].referenceId
                : 0,
          },
        ];
        const ReferenceData3 = [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId:
              candidateProfileData.candidateReferences[0] !== null &&
              candidateProfileData.candidateReferences[0] !== undefined
                ? candidateProfileData.candidateReferences[0].referenceId
                : 0,
          },
        ];
        const InfoData = {
          aadhaarDoc: null,
          aadhaarName: state.aadhaarName,
          aadhaarNumber: state.aadhaarNumber,
          bloodGroup: state.bloodGroup,
          candidateId:
            candidateProfileData.candidateId !== null
              ? candidateProfileData.candidateId
              : 0,
          candidateReferences:
            !data2 && !data1 && empName2 !== null && empName1 !== null
              ? ReferenceData2
              : !data1 && empName1 !== null
              ? ReferenceData3
              : !data2 && empName2 !== null
              ? ReferenceData1
              : [],
          createdDate:
            candidateProfileData.createdDate !== null
              ? candidateProfileData.createdDate
              : null,
          dateOfBirth: DOB,
          disability: state.disability,
          disabilityDoc: null,
          fatherName: state.fatherName,
          firstName:
            candidateProfileData.firstName !== null
              ? candidateProfileData.firstName
              : null,
          gender:
            genderCheckF === true
              ? "Female"
              : genderCheckM === true
              ? "Male"
              : "Other",
          lastName:
            candidateProfileData.lastName !== null
              ? candidateProfileData.lastName
              : null,
          lgbt: state.lgbt,
          maritalStatus: maritalStatus,
          nationality: state.nationality,
          panDoc: null,
          panNumber: state.panNumber !== null ? state.panNumber : null,
          personalEmail:
            candidateProfileData.personalEmail !== null
              ? candidateProfileData.personalEmail
              : null,
          photo: null,
          passportNumber: state.passPortNo !== null ? state.passPortNo : null,
          passportExpiryDate: dateOfValidity !== null ? dateOfValidity : null,
          passportIssuedDate: dateOfIssue !== null ? dateOfIssue : null,
          referred: true,
          status:
            candidateProfileData.status !== null
              ? candidateProfileData.status
              : 0,
          statusDesc: null,
          verificationStatus:
            candidateProfileData.verificationStatus !== null
              ? candidateProfileData.verificationStatus
              : 0,
          verificationStatusDesc: null,
        };
        if (
          candidateProfileData.maritalStatus !== null &&
          candidateProfileData.maritalStatus !== undefined &&
          candidateProfileData.maritalStatus !== ""
        ) {
          if (candidateProfileData.maritalStatus !== maritalStatus) {
            DeleteAllInsuranceNominations(candidateProfileData.candidateId);
            UpdateNomineeStatus(candidateProfileData.candidateId, false);
            const doInsuranceNomineeFalse = props.MakeFalse;
            doInsuranceNomineeFalse(false);
          }
        }
        console.log("onsubmit");
        console.log(InfoData);
        updatePersonalInfo(InfoData);

        // next page code should be here
        const submited = props.NextStep; //next component
        submited(true);
      }
      // if (saveClick === true) {
      //   const InfoData = {
      //     aadhaarDoc: null,
      //     aadhaarName: state.aadhaarName,
      //     aadhaarNumber: state.aadhaarNumber,
      //     bloodGroup: state.bloodGroup,
      //     candidateId:
      //       candidateProfileData.candidateId !== null ? candidateProfileData.candidateId : 0,
      //     candidateReferences: [
      //       {
      //         designation: desgination1 !== null ? desgination1 : null,
      //         email: refEmail1 !== null ? refEmail1 : null,
      //         employeeName: empName1 !== null ? empName1 : null,
      //         referenceId: PersonalInfoResponse.referenceId,
      //       },

      //       {
      //         designation: desgination2 !== null ? desgination2 : null,
      //         email: refEmail2 !== null ? refEmail2 : null,
      //         employeeName: empName2 !== null ? empName2 : null,
      //         referenceId: PersonalInfoResponse.referenceId,
      //       },
      //     ],
      //     createdDate: null,
      //     dateOfBirth: DOB,
      //     disability: state.disability,
      //     disabilityDoc: disabilityDoc,
      //     fatherName: state.fatherName,
      //     firstName: null,
      //     gender: gender,
      //     lastName: null,
      //     lgbt: state.lgbt,
      //     maritalStatus: maritalStatus,
      //     nationality: state.nationality,
      //     panDoc: null,
      //     panNumber: state.panNumber !== null ? state.panNumber : null,
      //     personalEmail: null,
      //     photo: null,
      //     referred: true,
      //     status: 0,
      //     statusDesc: null,
      //     verificationStatus: 0,
      //     verificationStatusDesc: null,
      //   };
      //   console.log("onsubmit");
      //   console.log(InfoData);
      //   updatePersonalInfo(InfoData);
      // }
    }
  };
  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };

  const disabilityDocument = (e) => {
    var files = e.target.files;
    console.log(files[0].name);
    setDocName(files[0].name);

    console.log("---------->", disabilityDoc);
  };
  const handleUpload = (event) => {
    if (disabilityDocValidation() === true) {
      let fileType = 13;
      let fileUpload = disabilityDocObj;
      setDisabilityUploaded(true);
      if (fileUpload) {
        console.log("inside file info", fileUpload, fileType);
        const fileInfo = {
          candidateId: candidateProfileData.candidateId,
          file: fileUpload,
          fileType: fileType,
        };
        console.log("handleUpload", fileInfo);
        uploadFile(fileInfo);
      } else {
        toast.info("Please select file");
      }
    }
  };

  const DisabilityDocChange = (e) => {
    console.log("changeHandler");
    let fileObj = e.target.files[0];
    console.log("fileObject", fileObj);
    console.log("photoIdChangeHandler", fileObj);
    if (
      fileObj.type === "image/jpeg" ||
      fileObj.type === "image/jpg" ||
      fileObj.type === "image/png" ||
      fileObj.type === "application/pdf"
    ) {
      if (fileObj.size <= 512000) {
        setDocName(fileObj.name);
        setDisabilityUploaded(false);
        setDisabilityDocObj(fileObj);
      } else {
        toast.error("File size should not exceed 500kb");
      }
    } else {
      toast.error("Please select jpg, jpeg, png and pdf formats");
    }
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const dateOfBirthHandler = (date) => {
    var AdjusteddateValue = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setDOB(AdjusteddateValue);
  };

  const handleMaleGenderCheckboxChange = (e) => {
    if (genderCheckF === true) {
      setGenderF(false);
    }
    if (genderCheckM === true) {
      setGenderM(false);
    }
    if (genderCheckOther === true) {
      setGenderOther(false);
    }
    setGenderM(true);
  };
  const handleFemaleGenderCheckboxChange = (e) => {
    if (genderCheckF === true) {
      setGenderF(false);
    }
    if (genderCheckM === true) {
      setGenderM(false);
    }
    if (genderCheckOther === true) {
      setGenderOther(false);
    }
    setGenderF(true);
  };
  const handleOtherGenderCheckboxChange = (e) => {
    if (genderCheckF === true) {
      setGenderF(false);
    }
    if (genderCheckM === true) {
      setGenderM(false);
    }
    if (genderCheckOther === true) {
      setGenderOther(false);
    }
    setGenderOther(true);
  };

  const handleMarriedCheckboxChange = (e) => {
    setMarried(e.target.checked);
    setUnMarried(!e.target.checked);
    {
      statusRequired
        ? setstatusRequired(!statusRequired)
        : setstatusRequired(statusRequired);
    }
    {
      married ? setMaritalStatus("UnMarried") : setMaritalStatus("Married");
    }
    console.log(married);
    console.log(maritalStatus);
  };
  const handleUnMarriedCheckboxChange = (e) => {
    setUnMarried(e.target.checked);
    setMarried(!e.target.checked);
    {
      statusRequired
        ? setstatusRequired(!statusRequired)
        : setstatusRequired(statusRequired);
    }
    {
      unMarried ? setMaritalStatus("Married") : setMaritalStatus("UnMarried");
    }
    console.log(unMarried);
    console.log(maritalStatus);
  };
  const AddExtrReferenceClick = () => {
    setIsClicked(true);
  };
  const CancelExtrReferenceClick = () => {
    setIsClicked(false);
  };
  return (
    <Fragment>
      <ToastContainer />
      <Form>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                {candidateViewInfo !== null &&
                candidateViewInfo !== undefined &&
                Object.keys(candidateViewInfo).length !== 0 &&
                candidateViewInfo.contractType === "Local Expat"
                  ? "Name as per Passport"
                  : "Name as per Aadhaar"}{" "}
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="aadhaarName"
                value={state.aadhaarName}
                onChange={changeHandler}
                required
                style={adharNameError ? { borderColor: "red" } : {}}
                placeholder={
                  candidateViewInfo !== null &&
                  candidateViewInfo !== undefined &&
                  Object.keys(candidateViewInfo).length !== 0 &&
                  candidateViewInfo.contractType === "Local Expat"
                    ? "Name as per Passport"
                    : "Name as per Aadhaar"
                }
                disabled={disabled}
              />

              {adharNameError ? (
                <p style={{ color: "red" }}> Please enter valid name</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Father's Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="fatherName"
                value={state.fatherName}
                onChange={changeHandler}
                required
                placeholder="Father's Name"
                disabled={disabled}
                style={fatherName ? { borderColor: "red" } : {}}
              />
              {fatherName ? (
                <p style={{ color: "red" }}>Please enter valid father's name</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Date Of Birth<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <div className={DOBError ? "onBoard-date-error" : "onBoard-date"}>
                <DatePicker
                  style={DOBError ? { borderColor: "red" } : {}}
                  className="form-control onBoard-view"
                  selected={DOB}
                  required
                  onChange={(e) => dateOfBirthHandler(e)}
                  maxDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="YYYY-MM-DD"
                  disabled={disabled}
                />
              </div>
              {DOBError ? (
                <p style={{ color: "red" }}>Age should be above 18</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Natonality<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="nationality"
                value={state.nationality}
                options={nationlArray}
                onChange={changeHandler}
                required
                disabled={disabled}
                style={nationalityError ? { borderColor: "red" } : {}}
              >
                <option value="">Nationality</option>
                {nationlArray !== null &&
                  nationlArray !== undefined &&
                  nationlArray.length > 0 &&
                  nationlArray.map((item) => {
                    return (
                      <option key={item.countryId}>{item.nationality}</option>
                    );
                  })}
              </Form.Control>

              {nationalityError ? (
                <p style={{ color: "red" }}>Please choose valid nationality</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Disability<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="disability"
                value={state.disability}
                onChange={changeHandler}
                required
                disabled={disabled}
                style={disabilityError ? { borderColor: "red" } : {}}
              >
                <option value="">Disability</option>
                <option> Yes</option>
                <option> No</option>
              </Form.Control>

              {disabilityError ? (
                <p style={{ color: "red" }}>Please choose disability option</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>

          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>LGBT</Form.Label>
              <Form.Control
                as="select"
                name="lgbt"
                value={state.lgbt}
                onChange={changeHandler}
                disabled={disabled}
              >
                <option value="">LGBT</option>
                <option> Yes</option>
                <option> No</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Row>

        <Row style={{ marginBottom: "2rem" }}>
          <div className="col-sm-4">
            <Form.Group>
              <Form.Label>
                Blood Group<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="bloodGroup"
                value={state.bloodGroup}
                onChange={changeHandler}
                required
                disabled={disabled}
                style={bloodGroupError ? { borderColor: "red" } : {}}
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </Form.Control>

              {bloodGroupError ? (
                <p style={{ color: "red" }}>Please choose blood group</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-4">
            {candidateViewInfo !== null &&
            candidateViewInfo !== undefined &&
            Object.keys(candidateViewInfo).length !== 0 &&
            (candidateViewInfo.contractType === "Parttime") |
              (candidateViewInfo.contractType === "Fulltime") ? (
              <Form.Group>
                <Form.Label>
                  Aadhaar Number
                  <span style={{ color: "red" }}>
                    {candidateViewInfo !== null &&
                    candidateViewInfo !== undefined &&
                    Object.keys(candidateViewInfo).length !== 0 &&
                    candidateViewInfo.contractType === "Internship"
                      ? ""
                      : "*"}
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="aadhaarNumber"
                  value={state.aadhaarNumber}
                  onChange={changeHandler}
                  required
                  maxLength="12"
                  placeholder="Aadhaar Number"
                  disabled={disabled}
                  style={aadharNumberError ? { borderColor: "red" } : {}}
                />
                {aadharNumberError ? (
                  <p style={{ color: "red" }}>
                    Please enter valid aadhar number
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            ) : (
              ""
            )}
            {candidateViewInfo !== null &&
            candidateViewInfo !== undefined &&
            Object.keys(candidateViewInfo).length !== 0 &&
            candidateViewInfo.contractType === "Local Expat" ? (
              <Form.Group>
                <Form.Label>
                  Passport Number<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="passPortNo"
                  value={state.passPortNo}
                  onChange={changeHandler}
                  required
                  maxLength="12"
                  placeholder="Passport Number"
                  disabled={disabled}
                  style={passPortNoError ? { borderColor: "red" } : {}}
                />
                {passPortNoError ? (
                  <p style={{ color: "red" }}>
                    Please enter valid passport number
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            ) : (
              ""
            )}{" "}
          </div>
          {candidateViewInfo !== null &&
          candidateViewInfo !== undefined &&
          Object.keys(candidateViewInfo).length !== 0 &&
          (candidateViewInfo.contractType === "Parttime") |
            (candidateViewInfo.contractType === "Fulltime") ? (
            <div className="col-sm-4">
              <Form.Group>
                <Form.Label>
                  Pan Number
                  <span style={{ color: "red" }}>
                    {" "}
                    {candidateViewInfo !== null &&
                    candidateViewInfo !== undefined &&
                    Object.keys(candidateViewInfo).length !== 0 &&
                    candidateViewInfo.contractType === "Fulltime"
                      ? "*"
                      : ""}
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="panNumber"
                  value={state.panNumber}
                  onChange={changeHandler}
                  maxLength="10"
                  required
                  placeholder="Pan Number"
                  disabled={disabled}
                  style={panNumberError ? { borderColor: "red" } : {}}
                />

                {panNumberError ? (
                  <p style={{ color: "red" }}>Please enter valid pan number</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          ) : (
            ""
          )}
          <div className="col-sm-4">
            {candidateViewInfo !== null &&
            candidateViewInfo !== undefined &&
            Object.keys(candidateViewInfo).length !== 0 &&
            candidateViewInfo.contractType === "Local Expat" ? (
              <Form.Group className="reactDate">
                <Form.Label>
                  Date of Issue<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <DatePicker
                  className="form-control form-input"
                  selected={dateOfIssue}
                  required
                  onChange={(e) => dateOfIssueHandler(e)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Issue"
                  disabled={disabled}
                />
                {/* {passDOIError ? (
                  <p style={{ color: "red" }}>
                    Please enter valid passport number
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            ) : (
              ""
            )}
          </div>
        </Row>
        <Row>
          <div className="col-sm-4">
            {candidateViewInfo !== null &&
            candidateViewInfo !== undefined &&
            Object.keys(candidateViewInfo).length !== 0 &&
            candidateViewInfo.contractType === "Local Expat" ? (
              <Form.Group className="reactDate">
                <Form.Label>Date Of Validity</Form.Label>
                <DatePicker
                  className="form-control form-input"
                  selected={dateOfValidity}
                  required
                  onChange={(e) => validityHandler(e)}
                  minDate={dateOfIssue}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Date of Validity"
                  disabled={disabled}
                />

                {/* {passDOVError ? (
                  <p style={{ color: "red" }}>
                    Please enter valid passport number
                  </p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            ) : (
              ""
            )}
          </div>
        </Row>
        <div style={{ width: "105%" }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <Col sm={1} style={{ marginTop: "1.4rem" }}>
              <Form.Group>
                <div className="inputField">
                  <label>
                    <b>Gender</b>
                  </label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2} style={{ marginTop: "2rem" }}>
              <Form.Group>
                <div className="boxField_1 input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    style={genderError ? { borderColor: "red" } : {}}
                    value="Male"
                    checked={genderCheckM}
                    required={required}
                    onChange={handleMaleGenderCheckboxChange}
                  />
                  <label style={genderError ? { color: "red" } : {}}>
                    Male{" "}
                  </label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2} style={{ marginTop: "2rem" }}>
              <Form.Group>
                <div className="boxField_1 input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    style={genderError ? { borderColor: "red" } : {}}
                    value="Female"
                    required={required}
                    checked={genderCheckF}
                    onChange={handleFemaleGenderCheckboxChange}
                  />
                  <label style={genderError ? { color: "red" } : {}}>
                    Female
                  </label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2} style={{ marginTop: "2rem" }}>
              <Form.Group>
                <div className="boxField_1 input">
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    style={genderError ? { borderColor: "red" } : {}}
                    value="Other"
                    required={required}
                    checked={genderCheckOther}
                    onChange={handleOtherGenderCheckboxChange}
                  />
                  <label style={genderError ? { color: "red" } : {}}>
                    Other
                  </label>
                </div>
              </Form.Group>
            </Col>

            <Col sm={1} style={{ marginTop: "1rem" }}>
              <Form.Group>
                <div className="inputField">
                  <label>
                    <b>
                      Marital<br></br>Status
                    </b>
                  </label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <div className="boxField_1 input" style={{ marginTop: "2rem" }}>
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    style={maritalStatusError ? { borderColor: "red" } : {}}
                    value="Married"
                    required={statusRequired}
                    checked={married}
                    onChange={handleMarriedCheckboxChange}
                  />
                  <label
                    style={
                      maritalStatusError
                        ? { marginLeft: "2px", color: "red" }
                        : { marginLeft: "2px" }
                    }
                  >
                    Married{" "}
                  </label>
                </div>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <div className="boxField_1 input" style={{ marginTop: "2rem" }}>
                  <input
                    className="largerCheckbox"
                    type="checkbox"
                    style={maritalStatusError ? { borderColor: "red" } : {}}
                    value="Unmarried"
                    required={statusRequired}
                    checked={unMarried}
                    onChange={handleUnMarriedCheckboxChange}
                  />
                  <label style={maritalStatusError ? { color: "red" } : {}}>
                    Unmarried
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <Row>
          {state.disability === "Yes" ? (
            <div style={{ width: "100%" }}>
              <Row>
                <Col>
                  <Form.Group>
                    <div className={"FileInput"}>
                      <label>Disability Document</label>
                    </div>
                    <div className="parentInput">
                      <label className="fileInputField">
                        &nbsp;&nbsp;
                        {disabilityDoc !== ""
                          ? disabilityDoc
                          : "Select File Here"}
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          style={{ display: "none" }}
                          disabled={
                            (candidateProfileData.documentUploaded === 1 &&
                              candidateProfileData.verificationStatus === 2 &&
                              (disabilityStatus === 0 ||
                                disabilityStatus === 2)) ||
                            (candidateProfileData.verificationStatus === 0 &&
                              candidateProfileData.documentUploaded === 0)
                              ? false
                              : true
                          }
                          onChange={(e) => {
                            DisabilityDocChange(e);
                          }}
                          readOnly
                        />
                      </label>

                      <label
                        className={
                          (candidateProfileData.documentUploaded === 1 &&
                            candidateProfileData.verificationStatus === 2 &&
                            (disabilityStatus === 0 ||
                              disabilityStatus === 2)) ||
                          (candidateProfileData.verificationStatus === 0 &&
                            candidateProfileData.documentUploaded === 0)
                            ? "custom-file-upload"
                            : "custom-file-disable"
                        }
                      >
                        <input
                          type="button"
                          name="disabilityDocument"
                          className="custom_file_Upload_button"
                          onClick={(e) => {
                            handleUpload(e);
                          }}
                          disabled={
                            (candidateProfileData.documentUploaded === 1 &&
                              candidateProfileData.verificationStatus === 2 &&
                              (disabilityStatus === 0 ||
                                disabilityStatus === 2)) ||
                            (candidateProfileData.verificationStatus === 0 &&
                              candidateProfileData.documentUploaded === 0)
                              ? false
                              : true
                          }
                        />
                        {/* <i className="fa fa-cloud-upload" />  */}
                        Upload File{" "}
                        <i
                          id="custom_file_upload_icon"
                          className="fa fa-upload"
                          aria-hidden="true"
                        ></i>
                      </label>
                    </div>

                    {disabilityDocError ? (
                      <p style={{ color: "red" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp; Please select & upload the
                        disability document
                      </p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ) : (
            " "
          )}
        </Row>

        {/* {!data2 ? ( */}
        {false ? (
          <div>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={5}>
                <div>
                  {/* style={{ backgroundColor: "#006ebb" }} */}
                  <label>
                    <b>State References:</b>
                    <b>(Max: Only 2)</b>
                  </label>
                </div>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={8}>
                <Row style={{ marginBottom: "2rem" }}>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>
                        Emp Name/ID<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <div className="faq-form">
                        <input
                          className="form-control"
                          type="text"
                          disabled={disabled}
                          value={empName1}
                          style={{ borderRadius: "5px" }}
                          style={empName1Error ? { borderColor: "red" } : {}}
                          placeholder="Search Emp Name/Id"
                          onChange={(e) => empName1Handler(e)}
                          required
                        />
                        <Search
                          className="search-icon"
                          style={{ color: "#313131" }}
                          onClick={empName1Search}
                        />
                      </div>
                      {empName1Error ? (
                        <p style={{ color: "red" }}>Please enter valid name</p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="emp1Eamil"
                        // value={refEmail1}
                        onChange={changeHandler}
                        placeholder="Email ID"
                        disabled={disabled}
                        value={empName1 === "" ? "" : refEmail1}
                        onChange={(e) => setRefEmail1(e.target.value)}
                        readOnly
                        style={emp1EmailError ? { borderColor: "red" } : {}}
                      />
                      {emp1EmailError ? (
                        <p style={{ color: "red" }}>Please enter valid email</p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-4">
                    <Form.Group>
                      <Form.Label>Designation</Form.Label>
                      <Form.Control
                        type="text"
                        value={desgination1}
                        placeholder="Designation"
                        readOnly
                      />
                    </Form.Group>
                  </div>
                </Row>
              </Col>
              {false ? (
                <Col sm={3} style={{ marginTop: "2rem" }}>
                  <Form.Group>
                    <div>
                      <button
                        className="buttonField  button"
                        onClick={AddExtrReferenceClick}
                        disabled={isClicked}
                      >
                        <b> Add + </b>
                      </button>
                    </div>
                  </Form.Group>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </div>
        ) : (
          ""
        )}
        {isClicked ? (
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={8}>
              <Row style={{ marginBottom: "1rem" }}>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Emp Name/ID<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div className="faq-form">
                      <input
                        className="form-control"
                        type="text"
                        disabled={disabled}
                        value={empName2}
                        style={{ borderRadius: "5px" }}
                        placeholder="Search Emp Name/Id"
                        onChange={(e) => empName2Handler(e)}
                        required
                      />
                      <Search
                        className="search-icon"
                        style={{ color: "#313131" }}
                        onClick={empName2Search}
                      />
                    </div>
                    {empName2Error ? (
                      <p style={{ color: "red" }}>Please enter valid name</p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp2Eamil"
                      value={refEmail2}
                      onChange={changeHandler}
                      placeholder="Email ID"
                      disabled={disabled}
                      readOnly
                      style={emp2EmailError ? { borderColor: "red" } : {}}
                    />
                    {emp2EmailError ? (
                      <p style={{ color: "red" }}>Please enter valid email</p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp2Designation"
                      value={desgination2}
                      onChange={changeHandler}
                      placeholder="Designation"
                      readOnly
                      disabled={disabled}
                    />
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={3} style={{ marginTop: "2rem" }}>
              <Form.Group>
                <div>
                  <button
                    className="buttonField  button"
                    onClick={CancelExtrReferenceClick}
                    disabled={!isClicked}
                  >
                    <b> Cancel </b>
                  </button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}

        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {/* <button className="stepperButtons" onClick={PrevStep}>
            Back
          </button> */}

          <button className="stepperButtons" onClick={submitHandler}>
            Save & Next
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default PersonalInformation;
