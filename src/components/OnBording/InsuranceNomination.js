import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./OnBoard.css";
import NomineeForm from "./NominForm";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { OnBoardContext } from "../../context/OnBoardState";

const InsuranceNomination = (props) => {
  const {
    CandidatePersonalInfo,
    candidatePersonalInfoData,
    candidateData,
    CandidateViewInformation,
    candidateViewInfo,
    CreateNominee,
    CreateNomineeResponse,
    InsuranceNominationView,
    candidateInsuranceNominationData,
  } = useContext(OnBoardContext);
  const [isChecked, changeCheckState] = useState(false);
  const [showEdit, SetShowEdit] = useState(false);
  const [defaultNominee, setDefaultNominee] = useState(true);
  const [count, setCount] = useState(0);
  const [NomineeCount, setNomineeCount] = useState(0);
  const [AddNewCount, setAddNewCount] = useState(0);
  const [NominForm1, setNominForm1] = useState(false);
  const [NominForm2, setNominForm2] = useState(false);
  const [NominForm3, setNominForm3] = useState(false);
  const [NominForm4, setNominForm4] = useState(false);
  const [Nominee1DOB, setNominee1DOB] = useState();
  const [Nominee2DOB, setNominee2DOB] = useState();
  const [Nominee3DOB, setNominee3DOB] = useState();
  const [Nominee4DOB, setNominee4DOB] = useState();
  const [Nominee5DOB, setNominee5DOB] = useState();
  const [ageError_1, setageError_1] = useState(false);
  const [bloodGroupError_1, setBloodGroupError_1] = useState(false);
  const [genderError_1, setGenderError_1] = useState(false);
  const [nomineNameError_1, setNomineerror_1] = useState(false);
  const [relationshipError_1, setRelationshipError_1] = useState(false);
  const [DOBError_1, setDobError_1] = useState(false);

  const [ageError_2, setageError_2] = useState(false);
  const [bloodGroupError_2, setBloodGroupError_2] = useState(false);
  const [genderError_2, setGenderError_2] = useState(false);
  const [nomineNameError_2, setNomineerror_2] = useState(false);
  const [relationshipError_2, setRelationshipError_2] = useState(false);
  const [DOBError_2, setDobError_2] = useState(false);

  const [ageError_3, setageError_3] = useState(false);
  const [bloodGroupError_3, setBloodGroupError_3] = useState(false);
  const [genderError_3, setGenderError_3] = useState(false);
  const [nomineNameError_3, setNomineerror_3] = useState(false);
  const [relationshipError_3, setRelationshipError_3] = useState(false);
  const [DOBError_3, setDobError_3] = useState(false);

  const [ageError_4, setageError_4] = useState(false);
  const [bloodGroupError_4, setBloodGroupError_4] = useState(false);
  const [genderError_4, setGenderError_4] = useState(false);
  const [nomineNameError_4, setNomineerror_4] = useState(false);
  const [relationshipError_4, setRelationshipError_4] = useState(false);
  const [DOBError_4, setDobError_4] = useState(false);

  const [ageError_5, setageError_5] = useState(false);
  const [bloodGroupError_5, setBloodGroupError_5] = useState(false);
  const [genderError_5, setGenderError_5] = useState(false);
  const [nomineNameError_5, setNomineerror_5] = useState(false);
  const [relationshipError_5, setRelationshipError_5] = useState(false);
  const [DOBError_5, setDobError_5] = useState(false);
  const [relativeInLaw, setRelativeType] = useState(false);
  const [age, setAge] = useState("");
  const [InfoState, setInfoState] = useState({
    empName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
  });
  const [state, setState] = useState({
    age: "",
    bloodGroup: "",
    gender: "",
    nominiId: 0,
    nominiName: "",
    relationship: "",

    nominee2Age: "",
    nominee2BloodGroup: "",
    nominee2Gender: "",
    nominee2NominiId: 0,
    nominee2NominiName: "",
    nominee2Relationship: "",

    nominee3Age: "",
    nominee3BloodGroup: "",
    nominee3Gender: "",
    nominee3NominiId: 0,
    nominee3NominiName: "",
    nominee3Relationship: "",

    nominee4Age: "",
    nominee4BloodGroup: "",
    nominee4Gender: "",
    nominee4NominiId: 0,
    nominee4NominiName: "",
    nominee4Relationship: "",

    nominee5Age: "",
    nominee5BloodGroup: "",
    nominee5Gender: "",
    nominee5NominiId: 0,
    nominee5NominiName: "",
    nominee5Relationship: "",
  });

  const inLawRelativesList = [
    { value: 1, label: "Father" },
    { value: 2, label: "Mother" },
    { value: 3, label: "Brother" },
    { value: 4, label: "Sister" },
    { value: 5, label: "Father In-law" },
    { value: 5, label: "Mother In-law" },
    { value: 7, label: "Brother In-law" },
    { value: 8, label: "Sister In-law" },
  ];
  const relativesList = [
    { value: 1, label: "Father" },
    { value: 2, label: "Mother" },
    { value: 3, label: "Brother" },
    { value: 4, label: "Sister" },
  ];

  useEffect(() => {
    console.log("personal information view candidate", candidateData);
    if (candidateData) {
      CandidateViewInformation(candidateData.candidateId);
    }
  }, [candidateData]);
  console.log("personal information candidateViewInfo-->", candidateViewInfo);
  console.log("contract type-->", candidateViewInfo.contractType);

  useEffect(() => {
    // console.log("personal information view candidate", candidateData);
    if (candidateData) {
      CandidatePersonalInfo(candidateData.candidateId);
    }
  }, [candidateData]);

  console.log("Candiate personal information data", candidatePersonalInfoData);

  useEffect(() => {
    console.log("personal information view candidate", candidateData);
    if (candidateData) {
      InsuranceNominationView(candidateData.candidateId);
    }
  }, [candidateData]);

  console.log(
    "Insurance nomination view candidate",
    candidateInsuranceNominationData
  );

  useEffect(() => {
    // console.log("personal information view candidate", candidateData);
    if (
      candidatePersonalInfoData !== null &&
      candidatePersonalInfoData !== undefined &&
      Object.keys(candidatePersonalInfoData).length !== 0
    ) {
      console.log(
        "----------------------------------------------",
        candidatePersonalInfoData.aadhaarName
      );
      setInfoState({
        empName: candidatePersonalInfoData.aadhaarName,
        gender: candidatePersonalInfoData.gender,
        dateOfBirth: candidatePersonalInfoData.dateOfBirth,
        bloodGroup: candidatePersonalInfoData.bloodGroup,
      });

      if (
        candidatePersonalInfoData.dateOfBirth !== null &&
        candidatePersonalInfoData.dateOfBirth !== undefined
      ) {
        var ageDifMs =
          Date.now() -
          new Date(candidatePersonalInfoData.dateOfBirth).getTime();
        var ageDate = new Date(ageDifMs);
        var finalAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        setAge(finalAge !== null && finalAge !== undefined ? finalAge : "");
      }
      if (
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        candidatePersonalInfoData.maritalStatus === "Married"
      ) {
        setRelativeType(true);
      } else {
        setRelativeType(false);
      }
    }
  }, [candidatePersonalInfoData]);

  useEffect(() => {
    if (
      candidateInsuranceNominationData &&
      candidateInsuranceNominationData !== null &&
      candidateInsuranceNominationData !== undefined &&
      Object.keys(candidateInsuranceNominationData).length !== 0
    ) {
      console.log("12345678");
      if (
        candidateInsuranceNominationData[0] &&
        candidateInsuranceNominationData[0] !== null &&
        candidateInsuranceNominationData[0] !== undefined &&
        Object.keys(candidateInsuranceNominationData[0]).length !== 0
      ) {
        setDefaultNominee(true);
        setNomineeCount(0);
      } else {
        setDefaultNominee(false);
      }
      if (
        candidateInsuranceNominationData[1] &&
        candidateInsuranceNominationData[1] !== null &&
        candidateInsuranceNominationData[1] !== undefined &&
        Object.keys(candidateInsuranceNominationData[1]).length !== 0
      ) {
        setNominForm1(true);
        setNomineeCount(1);
      } else {
        setNominForm1(false);
      }
      if (
        candidateInsuranceNominationData[2] &&
        candidateInsuranceNominationData[2] !== null &&
        candidateInsuranceNominationData[2] !== undefined &&
        Object.keys(candidateInsuranceNominationData[2]).length !== 0
      ) {
        setNominForm2(true);
        setNomineeCount(2);
      } else {
        setNominForm2(false);
      }
      if (
        candidateInsuranceNominationData[3] &&
        candidateInsuranceNominationData[3] !== null &&
        candidateInsuranceNominationData[3] !== undefined &&
        Object.keys(candidateInsuranceNominationData[3]).length !== 0
      ) {
        setNominForm3(true);
        setNomineeCount(3);
      } else {
        setNominForm3(false);
      }
      if (
        candidateInsuranceNominationData[4] &&
        candidateInsuranceNominationData[4] !== null &&
        candidateInsuranceNominationData[4] !== undefined &&
        Object.keys(candidateInsuranceNominationData[4]).length !== 0
      ) {
        setNominForm4(true);
        setNomineeCount(4);
      } else {
        setNominForm4(false);
      }
      setState({
        age:
          candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0].age !== null &&
          candidateInsuranceNominationData[0].age !== undefined
            ? candidateInsuranceNominationData[0].age
            : "",
        bloodGroup:
          candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0].bloodGroup !== null &&
          candidateInsuranceNominationData[0].bloodGroup !== undefined
            ? candidateInsuranceNominationData[0].bloodGroup
            : "",
        gender:
          candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0].gender !== null &&
          candidateInsuranceNominationData[0].gender !== undefined
            ? candidateInsuranceNominationData[0].gender
            : "",
        nominiName:
          candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0].nominiName !== null &&
          candidateInsuranceNominationData[0].nominiName !== undefined
            ? candidateInsuranceNominationData[0].nominiName
            : "",
        relationship:
          candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0].relationship !== null &&
          candidateInsuranceNominationData[0].relationship !== undefined
            ? candidateInsuranceNominationData[0].relationship
            : "",

        nominee2Age:
          candidateInsuranceNominationData[1] &&
          candidateInsuranceNominationData[1].age !== null &&
          candidateInsuranceNominationData[1].age !== undefined
            ? candidateInsuranceNominationData[1].age
            : "",
        nominee2BloodGroup:
          candidateInsuranceNominationData[1] &&
          candidateInsuranceNominationData[1].bloodGroup !== null &&
          candidateInsuranceNominationData[1].bloodGroup !== undefined
            ? candidateInsuranceNominationData[1].bloodGroup
            : "",
        nominee2Gender:
          candidateInsuranceNominationData[1] &&
          candidateInsuranceNominationData[1].gender !== null &&
          candidateInsuranceNominationData[1].gender !== undefined
            ? candidateInsuranceNominationData[1].gender
            : "",
        nominee2NominiName:
          candidateInsuranceNominationData[1] &&
          candidateInsuranceNominationData[1].nominiName !== null &&
          candidateInsuranceNominationData[1].nominiName !== undefined
            ? candidateInsuranceNominationData[1].nominiName
            : "",
        nominee2Relationship:
          candidateInsuranceNominationData[1] &&
          candidateInsuranceNominationData[1].relationship !== null &&
          candidateInsuranceNominationData[1].relationship !== undefined
            ? candidateInsuranceNominationData[1].relationship
            : "",

        nominee3Age:
          candidateInsuranceNominationData[2] &&
          candidateInsuranceNominationData[2].age !== null &&
          candidateInsuranceNominationData[2].age !== undefined
            ? candidateInsuranceNominationData[2].age
            : "",
        nominee3BloodGroup:
          candidateInsuranceNominationData[2] &&
          candidateInsuranceNominationData[2].bloodGroup !== null &&
          candidateInsuranceNominationData[2].bloodGroup !== undefined
            ? candidateInsuranceNominationData[2].bloodGroup
            : "",
        nominee3Gender:
          candidateInsuranceNominationData[2] &&
          candidateInsuranceNominationData[2].gender !== null &&
          candidateInsuranceNominationData[2].gender !== undefined
            ? candidateInsuranceNominationData[2].gender
            : "",
        nominee3NominiName:
          candidateInsuranceNominationData[2] &&
          candidateInsuranceNominationData[2].nominiName !== null &&
          candidateInsuranceNominationData[2].nominiName !== undefined
            ? candidateInsuranceNominationData[2].nominiName
            : "",
        nominee3Relationship:
          candidateInsuranceNominationData[2] &&
          candidateInsuranceNominationData[2].relationship !== null &&
          candidateInsuranceNominationData[2].relationship !== undefined
            ? candidateInsuranceNominationData[2].relationship
            : "",

        nominee4Age:
          candidateInsuranceNominationData[3] &&
          candidateInsuranceNominationData[3].age !== null &&
          candidateInsuranceNominationData[3].age !== undefined
            ? candidateInsuranceNominationData[3].age
            : "",
        nominee4BloodGroup:
          candidateInsuranceNominationData[3] &&
          candidateInsuranceNominationData[3].bloodGroup !== null &&
          candidateInsuranceNominationData[3].bloodGroup !== undefined
            ? candidateInsuranceNominationData[3].bloodGroup
            : "",
        nominee4Gender:
          candidateInsuranceNominationData[3] &&
          candidateInsuranceNominationData[3].gender !== null &&
          candidateInsuranceNominationData[3].gender !== undefined
            ? candidateInsuranceNominationData[3].gender
            : "",
        nominee4NominiName:
          candidateInsuranceNominationData[3] &&
          candidateInsuranceNominationData[3].nominiName !== null &&
          candidateInsuranceNominationData[3].nominiName !== undefined
            ? candidateInsuranceNominationData[3].nominiName
            : "",
        nominee4Relationship:
          candidateInsuranceNominationData[3] &&
          candidateInsuranceNominationData[3].relationship !== null &&
          candidateInsuranceNominationData[3].relationship !== undefined
            ? candidateInsuranceNominationData[3].relationship
            : "",

        nominee5Age:
          candidateInsuranceNominationData[4] &&
          candidateInsuranceNominationData[4].age !== null &&
          candidateInsuranceNominationData[4].age !== undefined
            ? candidateInsuranceNominationData[4].age
            : "",
        nominee5BloodGroup:
          candidateInsuranceNominationData[4] &&
          candidateInsuranceNominationData[4].bloodGroup !== null &&
          candidateInsuranceNominationData[4].bloodGroup !== undefined
            ? candidateInsuranceNominationData[4].bloodGroup
            : "",
        nominee5Gender:
          candidateInsuranceNominationData[4] &&
          candidateInsuranceNominationData[4].gender !== null &&
          candidateInsuranceNominationData[4].gender !== undefined
            ? candidateInsuranceNominationData[4].gender
            : "",
        nominee5NominiName:
          candidateInsuranceNominationData[4] &&
          candidateInsuranceNominationData[4].nominiName !== null &&
          candidateInsuranceNominationData[4].nominiName !== undefined
            ? candidateInsuranceNominationData[4].nominiName
            : "",
        nominee5Relationship:
          candidateInsuranceNominationData[4] &&
          candidateInsuranceNominationData[4].relationship !== null &&
          candidateInsuranceNominationData[4].relationship !== undefined
            ? candidateInsuranceNominationData[4].relationship
            : "",
      });
      setNominee1DOB(
        candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0].dateOfBirth !== null &&
          candidateInsuranceNominationData[0].dateOfBirth !== undefined
          ? new Date(candidateInsuranceNominationData[0].dateOfBirth)
          : ""
      );
      setNominee2DOB(
        candidateInsuranceNominationData[1] &&
          candidateInsuranceNominationData[1].dateOfBirth !== null &&
          candidateInsuranceNominationData[1].dateOfBirth !== undefined
          ? new Date(candidateInsuranceNominationData[1].dateOfBirth)
          : ""
      );
      setNominee3DOB(
        candidateInsuranceNominationData[2] &&
          candidateInsuranceNominationData[2].dateOfBirth !== null &&
          candidateInsuranceNominationData[2].dateOfBirth !== undefined
          ? new Date(candidateInsuranceNominationData[2].dateOfBirth)
          : ""
      );
      setNominee4DOB(
        candidateInsuranceNominationData[3] &&
          candidateInsuranceNominationData[3].dateOfBirth !== null &&
          candidateInsuranceNominationData[3].dateOfBirth !== undefined
          ? new Date(candidateInsuranceNominationData[3].dateOfBirth)
          : ""
      );
      setNominee5DOB(
        candidateInsuranceNominationData[4] &&
          candidateInsuranceNominationData[4].dateOfBirth !== null &&
          candidateInsuranceNominationData[4].dateOfBirth !== undefined
          ? new Date(candidateInsuranceNominationData[4].dateOfBirth)
          : null
      );
    }
  }, [candidateInsuranceNominationData]);

  const NomineeNameValidation = (itemState, setError) => {
    const nameValid = /^[a-zA-Z\b]+$/;

    if (state.itemState !== "") {
      if (nameValid.test(itemState.replace(/ +/g, ""))) {
        setError(false);
        console.log("nomineeNameSucess");
        return true;
      } else {
        setError(true);
        console.log("nomineeNameFail");
        return false;
      }
    } else {
      setError(true);
      console.log("nomineeNameFail");
      return false;
    }
  };
  const AgeErrorValidation = (itemState, setError) => {
    const numValid = /^[0-9\b]+$/;

    if (state.itemState !== "") {
      if (numValid.test(itemState)) {
        setError(false);
        console.log("ageNumberSucess");
        return true;
      } else {
        setError(true);
        console.log("ageNumberFail");
        return false;
      }
    } else {
      setError(true);
      console.log("ageNumberFail");
      return false;
    }
  };

  const validateInput = (itemState, setError) => {
    if (itemState !== "") {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const validateSelectInput = (itemState, setError, condition) => {
    if ((itemState !== "") & (itemState !== condition)) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const DOBValidation = (dateItem, setError) => {
    let dob = new Date(dateItem);
    let now = new Date();
    if ((now - dob > 568024668000) & (dateItem !== "")) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const CheckValidationsNomine_1 = () => {
    if (
      (AgeErrorValidation(state.age, setageError_1) === true) &
      (NomineeNameValidation(state.nominiName, setNomineerror_1) === true) &
      DOBValidation(Nominee1DOB, setDobError_1) &
      (validateSelectInput(state.gender, setGenderError_1, "Gender") === true) &
      (validateSelectInput(
        state.relationship,
        setRelationshipError_1,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.bloodGroup,
        setBloodGroupError_1,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_2 = () => {
    if (
      (AgeErrorValidation(state.nominee2Age, setageError_2) === true) &
      (NomineeNameValidation(state.nominee2NominiName, setNomineerror_2) ===
        true) &
      (validateSelectInput(state.nominee2Gender, setGenderError_2, "Gender") ===
        true) &
      DOBValidation(Nominee2DOB, setDobError_2) &
      (validateSelectInput(
        state.nominee2Relationship,
        setRelationshipError_2,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee2BloodGroup,
        setBloodGroupError_2,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_3 = () => {
    if (
      (AgeErrorValidation(state.nominee3Age, setageError_3) === true) &
      (NomineeNameValidation(state.nominee3NominiName, setNomineerror_3) ===
        true) &
      (validateSelectInput(state.nominee3Gender, setGenderError_3, "Gender") ===
        true) &
      DOBValidation(Nominee3DOB, setDobError_3) &
      (validateSelectInput(
        state.nominee3Relationship,
        setRelationshipError_3,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee3BloodGroup,
        setBloodGroupError_3,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_4 = () => {
    if (
      (AgeErrorValidation(state.nominee4Age, setageError_4) === true) &
      (NomineeNameValidation(state.nominee4NominiName, setNomineerror_4) ===
        true) &
      (validateSelectInput(state.nominee4Gender, setGenderError_4, "Gender") ===
        true) &
      DOBValidation(Nominee4DOB, setDobError_4) &
      (validateSelectInput(
        state.nominee4Relationship,
        setRelationshipError_4,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee4BloodGroup,
        setBloodGroupError_4,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const CheckValidationsNomine_5 = () => {
    if (
      (AgeErrorValidation(state.nominee5Age, setageError_5) === true) &
      (NomineeNameValidation(state.nominee5NominiName, setNomineerror_5) ===
        true) &
      (validateSelectInput(state.nominee5Gender, setGenderError_5, "Gender") ===
        true) &
      DOBValidation(Nominee5DOB, setDobError_5) &
      (validateSelectInput(
        state.nominee5Relationship,
        setRelationshipError_5,
        "Relationship"
      ) ===
        true) &
      (validateSelectInput(
        state.nominee5BloodGroup,
        setBloodGroupError_5,
        "Blood Group"
      ) ===
        true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checkAllValidations = () => {
    switch (NomineeCount) {
      case 0:
        if (CheckValidationsNomine_1() === true) {
          return true;
        } else {
          console.log("error 1");
          return false;
          break;
        }
      case 1:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true)
        ) {
          return true;
        } else {
          console.log("error 2");
          return false;
          break;
        }
      case 2:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true) &
          (CheckValidationsNomine_3() === true)
        ) {
          return true;
        } else {
          console.log("error 3");
          return false;
          break;
        }
      case 3:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true) &
          (CheckValidationsNomine_3() === true) &
          (CheckValidationsNomine_4() === true)
        ) {
          return true;
        } else {
          console.log("error 4");
          return false;
          break;
        }
      case 4:
        if (
          (CheckValidationsNomine_1() === true) &
          (CheckValidationsNomine_2() === true) &
          (CheckValidationsNomine_3() === true) &
          (CheckValidationsNomine_4() === true) &
          (CheckValidationsNomine_5() === true)
        ) {
          return true;
        } else {
          console.log("error 5");
          return false;
          break;
        }
      default:
        break;
    }
  };
  if (
    candidateInsuranceNominationData !== null &&
    candidateInsuranceNominationData !== undefined &&
    Object.keys(candidateInsuranceNominationData).length !== 0
  ) {
    var Data1_nominiId =
      candidateInsuranceNominationData[0] &&
      candidateInsuranceNominationData[0].nominiId !== null &&
      candidateInsuranceNominationData[0].nominiId !== undefined
        ? candidateInsuranceNominationData[0].nominiId
        : 0;
    var Data2_nominiId =
      candidateInsuranceNominationData[1] &&
      candidateInsuranceNominationData[1].nominiId !== null &&
      candidateInsuranceNominationData[1].nominiId !== undefined
        ? candidateInsuranceNominationData[1].nominiId
        : 0;
    var Data3_nominiId =
      candidateInsuranceNominationData[2] &&
      candidateInsuranceNominationData[2].nominiId !== null &&
      candidateInsuranceNominationData[2].nominiId !== undefined
        ? candidateInsuranceNominationData[2].nominiId
        : 0;
    var Data4_nominiId =
      candidateInsuranceNominationData[3] &&
      candidateInsuranceNominationData[3].nominiId !== null &&
      candidateInsuranceNominationData[3].nominiId !== undefined
        ? candidateInsuranceNominationData[3].nominiId
        : 0;
    var Data5_nominiId =
      candidateInsuranceNominationData[4] &&
      candidateInsuranceNominationData[4].nominiId !== null &&
      candidateInsuranceNominationData[4].nominiId !== undefined
        ? candidateInsuranceNominationData[4].nominiId
        : 0;
  } else {
    var Data1_nominiId = 0;
    var Data2_nominiId = 0;
    var Data3_nominiId = 0;
    var Data4_nominiId = 0;
    var Data5_nominiId = 0;
  }

  const submitHandler = (e) => {
    // const nextPage = props.NextStep;
    // nextPage();
    if (checkAllValidations() === true) {
      const CountOFNominees = NomineeCount;
      const first_nomine_info = {
        age: state.age !== null ? state.age : null,
        bloodGroup: state.bloodGroup !== null ? state.bloodGroup : null,
        candidateId:
          candidateData.candidateId !== null ? candidateData.candidateId : 0,
        dateOfBirth: Nominee1DOB !== null ? Nominee1DOB : null,
        gender: state.gender !== null ? state.gender : null,
        nominiId: Data1_nominiId,
        nominiName: state.nominiName !== null ? state.nominiName : null,
        relationship: state.relationship !== null ? state.relationship : null,
      };
      const second_nomine_info = {
        age: state.nominee2Age,
        bloodGroup: state.nominee2BloodGroup,
        candidateId:
          candidateData.candidateId !== null ? candidateData.candidateId : 0,
        dateOfBirth: Nominee2DOB,
        gender: state.nominee2Gender,
        nominiId: Data2_nominiId,
        nominiName: state.nominee2NominiName,
        relationship: state.nominee2Relationship,
      };
      const third_nomine_info = {
        age: state.nominee3Age,
        bloodGroup: state.nominee3BloodGroup,
        candidateId:
          candidateData.candidateId !== null ? candidateData.candidateId : 0,
        dateOfBirth: Nominee3DOB,
        gender: state.nominee3Gender,
        nominiId: Data3_nominiId,
        nominiName: state.nominee3NominiName,
        relationship: state.nominee3Relationship,
      };
      const fourth_nomine_info = {
        age: state.nominee4Age,
        bloodGroup: state.nominee4BloodGroup,
        candidateId:
          candidateData.candidateId !== null ? candidateData.candidateId : 0,
        dateOfBirth: Nominee4DOB,
        gender: state.nominee2Gender,
        nominiId: Data4_nominiId,
        nominiName: state.nominee4NominiName,
        relationship: state.nominee4Relationship,
      };
      const fifth_nomine_info = {
        age: state.nominee5Age,
        bloodGroup: state.nominee5BloodGroup,
        candidateId:
          candidateData.candidateId !== null ? candidateData.candidateId : 0,
        dateOfBirth: Nominee5DOB,
        gender: state.nominee5Gender,
        nominiId: Data5_nominiId,
        nominiName: state.nominee5NominiName,
        relationship: state.nominee5Relationship,
      };

      const NominiInfo =
        CountOFNominees === 0
          ? [first_nomine_info]
          : CountOFNominees === 1
          ? [first_nomine_info, second_nomine_info]
          : CountOFNominees === 2
          ? [first_nomine_info, second_nomine_info, third_nomine_info]
          : CountOFNominees === 3
          ? [
              first_nomine_info,
              second_nomine_info,
              third_nomine_info,
              fourth_nomine_info,
            ]
          : CountOFNominees === 4
          ? [
              first_nomine_info,
              second_nomine_info,
              third_nomine_info,
              fourth_nomine_info,
              fifth_nomine_info,
            ]
          : [];
      console.log(NominiInfo);
      CreateNominee(NominiInfo);
      const nextPage = props.NextStep;
      nextPage();
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  // const handleCheckboxChange = (e) => {
  //   if (isChecked === false) {
  //     changeCheckState(true);
  //     if (
  //       (candidateInsuranceNominationData !== null) &
  //       (candidateInsuranceNominationData !== undefined) &
  //       (Object.keys(candidateInsuranceNominationData).length !== 0)
  //     ) {
  //       if (
  //         (candidateInsuranceNominationData[0] !== null) &
  //         (candidateInsuranceNominationData[0] !== undefined) &
  //         (Object.keys(candidateInsuranceNominationData[0]).length !== 0)
  //       ) {
  //         setDefaultNominee(true);
  //         setNomineeCount(0);
  //       } else {
  //         setDefaultNominee(false);
  //       }
  //       if (
  //         (candidateInsuranceNominationData[1] !== null) &
  //         (candidateInsuranceNominationData[1] !== undefined) &
  //         (Object.keys(candidateInsuranceNominationData[1]).length !== 0)
  //       ) {
  //         setNominForm1(true);
  //         setNomineeCount(1);
  //       } else {
  //         setNominForm1(false);
  //       }
  //       if (
  //         (candidateInsuranceNominationData[2] !== null) &
  //         (candidateInsuranceNominationData[2] !== undefined) &
  //         (Object.keys(candidateInsuranceNominationData[2]).length !== 0)
  //       ) {
  //         setNominForm2(true);
  //         setNomineeCount(2);
  //       } else {
  //         setNominForm2(false);
  //       }
  //       if (
  //         (candidateInsuranceNominationData[3] !== null) &
  //         (candidateInsuranceNominationData[3] !== undefined) &
  //         (Object.keys(candidateInsuranceNominationData[3]).length !== 0)
  //       ) {
  //         setNominForm3(true);
  //         setNomineeCount(3);
  //       } else {
  //         setNominForm3(false);
  //       }
  //       if (
  //         (candidateInsuranceNominationData[4] !== null) &
  //         (candidateInsuranceNominationData[4] !== undefined) &
  //         (Object.keys(candidateInsuranceNominationData[4]).length !== 0)
  //       ) {
  //         setNominForm4(true);
  //         setNomineeCount(4);
  //       } else {
  //         setNominForm4(false);
  //       }
  //       setState({
  //         age:
  //           (candidateInsuranceNominationData[0].age !== null) &
  //           (candidateInsuranceNominationData[0].age !== undefined)
  //             ? candidateInsuranceNominationData[0].age
  //             : "",
  //         bloodGroup:
  //           (candidateInsuranceNominationData[0].bloodGroup !== null) &
  //           (candidateInsuranceNominationData[0].bloodGroup !== undefined)
  //             ? candidateInsuranceNominationData[0].bloodGroup
  //             : "",
  //         gender:
  //           (candidateInsuranceNominationData[0].gender !== null) &
  //           (candidateInsuranceNominationData[0].gender !== undefined)
  //             ? candidateInsuranceNominationData[0].gender
  //             : "",
  //         nominiName:
  //           (candidateInsuranceNominationData[0].nominiName !== null) &
  //           (candidateInsuranceNominationData[0].nominiName !== undefined)
  //             ? candidateInsuranceNominationData[0].nominiName
  //             : "",
  //         relationship:
  //           (candidateInsuranceNominationData[0].relationship !== null) &
  //           (candidateInsuranceNominationData[0].relationship !== undefined)
  //             ? candidateInsuranceNominationData[0].relationship
  //             : "",

  //         nominee2Age:
  //           (candidateInsuranceNominationData[1].age !== null) &
  //           (candidateInsuranceNominationData[1].age !== undefined)
  //             ? candidateInsuranceNominationData[1].age
  //             : "",
  //         nominee2BloodGroup:
  //           (candidateInsuranceNominationData[1].bloodGroup !== null) &
  //           (candidateInsuranceNominationData[1].bloodGroup !== undefined)
  //             ? candidateInsuranceNominationData[1].bloodGroup
  //             : "",
  //         nominee2Gender:
  //           (candidateInsuranceNominationData[1].gender !== null) &
  //           (candidateInsuranceNominationData[1].gender !== undefined)
  //             ? candidateInsuranceNominationData[1].gender
  //             : "",
  //         nominee2NominiName:
  //           (candidateInsuranceNominationData[1].nominiName !== null) &
  //           (candidateInsuranceNominationData[1].nominiName !== undefined)
  //             ? candidateInsuranceNominationData[1].nominiName
  //             : "",
  //         nominee2Relationship:
  //           (candidateInsuranceNominationData[1].relationship !== null) &
  //           (candidateInsuranceNominationData[1].relationship !== undefined)
  //             ? candidateInsuranceNominationData[1].relationship
  //             : "",

  //         nominee3Age:
  //           (candidateInsuranceNominationData[2].age !== null) &
  //           (candidateInsuranceNominationData[2].age !== undefined)
  //             ? candidateInsuranceNominationData[2].age
  //             : "",
  //         nominee3BloodGroup:
  //           (candidateInsuranceNominationData[2].bloodGroup !== null) &
  //           (candidateInsuranceNominationData[2].bloodGroup !== undefined)
  //             ? candidateInsuranceNominationData[2].bloodGroup
  //             : "",
  //         nominee3Gender:
  //           (candidateInsuranceNominationData[2].gender !== null) &
  //           (candidateInsuranceNominationData[2].gender !== undefined)
  //             ? candidateInsuranceNominationData[2].gender
  //             : "",
  //         nominee3NominiName:
  //           (candidateInsuranceNominationData[2].nominiName !== null) &
  //           (candidateInsuranceNominationData[2].nominiName !== undefined)
  //             ? candidateInsuranceNominationData[2].nominiName
  //             : "",
  //         nominee3Relationship:
  //           (candidateInsuranceNominationData[2].relationship !== null) &
  //           (candidateInsuranceNominationData[2].relationship !== undefined)
  //             ? candidateInsuranceNominationData[2].relationship
  //             : "",

  //         nominee4Age:
  //           (candidateInsuranceNominationData[3].age !== null) &
  //           (candidateInsuranceNominationData[3].age !== undefined)
  //             ? candidateInsuranceNominationData[3].age
  //             : "",
  //         nominee4BloodGroup:
  //           (candidateInsuranceNominationData[3].bloodGroup !== null) &
  //           (candidateInsuranceNominationData[3].bloodGroup !== undefined)
  //             ? candidateInsuranceNominationData[3].bloodGroup
  //             : "",
  //         nominee4Gender:
  //           (candidateInsuranceNominationData[3].gender !== null) &
  //           (candidateInsuranceNominationData[3].gender !== undefined)
  //             ? candidateInsuranceNominationData[3].gender
  //             : "",
  //         nominee4NominiName:
  //           (candidateInsuranceNominationData[3].nominiName !== null) &
  //           (candidateInsuranceNominationData[3].nominiName !== undefined)
  //             ? candidateInsuranceNominationData[3].nominiName
  //             : "",
  //         nominee4Relationship:
  //           (candidateInsuranceNominationData[3].relationship !== null) &
  //           (candidateInsuranceNominationData[3].relationship !== undefined)
  //             ? candidateInsuranceNominationData[3].relationship
  //             : "",

  //         nominee5Age:
  //           (candidateInsuranceNominationData[4].age !== null) &
  //           (candidateInsuranceNominationData[4].age !== undefined)
  //             ? candidateInsuranceNominationData[4].age
  //             : "",
  //         nominee5BloodGroup:
  //           (candidateInsuranceNominationData[4].bloodGroup !== null) &
  //           (candidateInsuranceNominationData[4].bloodGroup !== undefined)
  //             ? candidateInsuranceNominationData[4].bloodGroup
  //             : "",
  //         nominee5Gender:
  //           (candidateInsuranceNominationData[4].gender !== null) &
  //           (candidateInsuranceNominationData[4].gender !== undefined)
  //             ? candidateInsuranceNominationData[4].gender
  //             : "",
  //         nominee5NominiName:
  //           (candidateInsuranceNominationData[4].nominiName !== null) &
  //           (candidateInsuranceNominationData[4].nominiName !== undefined)
  //             ? candidateInsuranceNominationData[4].nominiName
  //             : "",
  //         nominee5Relationship:
  //           (candidateInsuranceNominationData[4].relationship !== null) &
  //           (candidateInsuranceNominationData[4].relationship !== undefined)
  //             ? candidateInsuranceNominationData[4].relationship
  //             : "",
  //       });
  //       setNominee1DOB(
  //         (candidateInsuranceNominationData[0].dateOfBirth !== null) &
  //           (candidateInsuranceNominationData[0].dateOfBirth !== undefined)
  //           ? new Date(candidateInsuranceNominationData[0].dateOfBirth)
  //           : ""
  //       );
  //       setNominee2DOB(
  //         (candidateInsuranceNominationData[1].dateOfBirth !== null) &
  //           (candidateInsuranceNominationData[1].dateOfBirth !== undefined)
  //           ? new Date(candidateInsuranceNominationData[1].dateOfBirth)
  //           : ""
  //       );
  //       setNominee3DOB(
  //         (candidateInsuranceNominationData[2].dateOfBirth !== null) &
  //           (candidateInsuranceNominationData[2].dateOfBirth !== undefined)
  //           ? new Date(candidateInsuranceNominationData[2].dateOfBirth)
  //           : ""
  //       );
  //       setNominee4DOB(
  //         (candidateInsuranceNominationData[3].dateOfBirth !== null) &
  //           (candidateInsuranceNominationData[3].dateOfBirth !== undefined)
  //           ? new Date(candidateInsuranceNominationData[3].dateOfBirth)
  //           : ""
  //       );
  //       setNominee5DOB(
  //         (candidateInsuranceNominationData[4].dateOfBirth !== null) &
  //           (candidateInsuranceNominationData[4].dateOfBirth !== undefined)
  //           ? new Date(candidateInsuranceNominationData[4].dateOfBirth)
  //           : null
  //       );
  //     }
  //     console.log(isChecked);
  //   } else {
  //     console.log("rajj");
  //   }
  // };
  // const handleNoCheckboxChange = (e) => {
  //   if (isChecked === true) {
  //     changeCheckState(!e.target.checked);
  //     setNominForm1(false);
  //     setNominForm2(false);
  //     setNominForm3(false);
  //     setNominForm4(false);
  //     console.log(isChecked);
  //     setState({
  //       age: "",
  //       bloodGroup: "",
  //       gender: "",
  //       nominiId: 0,
  //       nominiName: "",
  //       relationship: "",

  //       nominee2Age: "",
  //       nominee2BloodGroup: "",
  //       nominee2Gender: "",
  //       nominee2NominiId: 0,
  //       nominee2NominiName: "",
  //       nominee2Relationship: "",

  //       nominee3Age: "",
  //       nominee3BloodGroup: "",
  //       nominee3Gender: "",
  //       nominee3NominiId: 0,
  //       nominee3NominiName: "",
  //       nominee3Relationship: "",

  //       nominee4Age: "",
  //       nominee4BloodGroup: "",
  //       nominee4Gender: "",
  //       nominee4NominiId: 0,
  //       nominee4NominiName: "",
  //       nominee4Relationship: "",

  //       nominee5Age: "",
  //       nominee5BloodGroup: "",
  //       nominee5Gender: "",
  //       nominee5NominiId: 0,
  //       nominee5NominiName: "",
  //       nominee5Relationship: "",
  //     });
  //     setNominee1DOB("");
  //     setNominee2DOB("");
  //     setNominee3DOB("");
  //     setNominee4DOB("");
  //     setNominee5DOB("");
  //   }
  // };
  const dateOfBirthHandler = (date, key) => {
    if (date !== null) {
      var AdjusteddateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
    } else {
      var AdjusteddateValue = "";
    }
    switch (key) {
      case "1":
        setNominee1DOB(AdjusteddateValue);
        console.log("Nomineee1Dob");
        break;
      case "2":
        setNominee2DOB(AdjusteddateValue);
        console.log("Nomineee2Dob");
        break;
      case "3":
        setNominee3DOB(AdjusteddateValue);
        console.log("Nomineee3Dob");
        break;
      case "4":
        setNominee4DOB(AdjusteddateValue);
        console.log("Nomineee4Dob");
        break;
      case "5":
        setNominee5DOB(AdjusteddateValue);
        console.log("Nomineee5Dob");
        break;

      default:
        break;
    }
  };
  const cancel = (num) => {
    if (NomineeCount >= 0) {
      console.log(NomineeCount);
      console.log(num);
      switch (NomineeCount) {
        case 1:
          console.log(" cancel-11111");
          setNominForm1(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 2:
          console.log("cancel-22222");
          setNominForm2(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 3:
          console.log("cancel-3333");
          setNominForm3(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;
        case 4:
          console.log("cancel-4444");
          setNominForm4(false);
          setNomineeCount(NomineeCount - 1);
          return;
          break;

        default:
          break;
      }
    }
    console.log(NomineeCount);
  };

  // const cancel = (num) => {
  //   if (num == 1) {
  //     setNominForm1(false);
  //     setNomineeCount(NomineeCount - 1);
  //     setAddNewCount(AddNewCount - num);
  //   }
  //   if (num == 2) {
  //     setNominForm2(false);
  //     setNomineeCount(NomineeCount - 1);
  //     setAddNewCount(AddNewCount - num);
  //   }
  //   if (num == 3) {
  //     setNominForm3(false);
  //     setNomineeCount(NomineeCount - 1);
  //     setAddNewCount(AddNewCount - num);
  //   }
  //   if (num == 4) {
  //     setNominForm4(false);
  //     setNomineeCount(NomineeCount - 1);
  //     setAddNewCount(AddNewCount - num);
  //   }
  //   console.log("nominee Count", NomineeCount);
  // };
  // const handleIncrement = (num) => {
  //   if (num == 0) {
  //     setNominForm1(true);
  //     setNomineeCount(NomineeCount + 1);
  //     setAddNewCount(AddNewCount + 1);
  //   }
  //   if (num == 1) {
  //     setNominForm2(true);
  //     setNomineeCount(NomineeCount + 1);
  //     setAddNewCount(AddNewCount + 1);
  //   }
  //   if (num == 2) {
  //     setNominForm3(true);
  //     setNomineeCount(NomineeCount + 1);
  //     setAddNewCount(AddNewCount + 1);
  //   }
  //   if (num == 3) {
  //     setNominForm4(true);
  //     setNomineeCount(NomineeCount + 1);
  //     setAddNewCount(AddNewCount + 1);
  //   }
  //   console.log("nominee Count", NomineeCount);
  // };

  const handleIncrement = (num) => {
    if (NomineeCount <= 4) {
      console.log(NomineeCount);

      switch (NomineeCount) {
        case 0:
          // need to implement on another cases alse
          if (checkAllValidations() === true) {
            console.log("11111");
            setNominForm1(true);
            setNomineeCount(NomineeCount + 1);
            return;
          }
          break;
        case 1:
          if (checkAllValidations() === true) {
            console.log("22222");
            setNominForm2(true);
            setNomineeCount(NomineeCount + 1);
            return;
          }
          break;
        case 2:
          if (checkAllValidations() === true) {
            console.log("3333");
            setNominForm3(true);
            setNomineeCount(NomineeCount + 1);
            return;
          }
          break;
        case 3:
          if (checkAllValidations() === true) {
            console.log("4444");
            setNominForm4(true);
            setNomineeCount(NomineeCount + 1);
            return;
          }
          break;

        default:
          break;
      }
    }
    console.log(NomineeCount);
  };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };
  console.log("----------->", NominForm1);
  return (
    <Fragment>
      {/* <Form onSubmit={submitHandler}>  */}
      <Row style={{ marginBottom: "2rem" }} className="CheckBoxField">
        <Col sm={3}>
          <div>
            <label>
              <b>Employee Name:</b>
              {InfoState.empName}
            </label>
          </div>
        </Col>
        {/* <div className="col-sm-2">
          <Form.Group>
            <Form.Label>Employee Name:</Form.Label>
            <Form.Control
              type="text"
              value={InfoState.empName}
              placeholder="Employee Name"
              readOnly
            />
          </Form.Group>
        </div> */}
        <Col sm={2}>
          <div>
            <label>
              <b>Gender:</b>
              {InfoState.gender}
            </label>
          </div>
        </Col>
        <Col sm={3}>
          <div>
            <label>
              <b>Date Of Birth:</b>
              {InfoState.dateOfBirth}
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Age:</b>
            </label>
            <label>{age}</label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Blood Group:</b>
            </label>
            <label>{InfoState.bloodGroup}</label>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col sm={5}>
          <div>
            <label>
              <b>Enroll Dependents for Insurance Nomination</b>
            </label>
            <label>
              <b></b>
            </label>
          </div>
        </Col>
      </Row>
      {/* <Row style={{ marginBottom: "2rem" }}>
        <Col sm={3}>
          <Form.Group>
            <div className="boxField input">
              <input
                type="checkbox"
                value="No"
                checked={!isChecked}
                onChange={handleNoCheckboxChange}
              />
              <label>Add New Nominee</label>
            </div>
          </Form.Group>
        </Col>
        <Col sm={3} style={{ marginLeft: "-6rem" }}>
          <Form.Group>
            <div className="boxField input">
              <input
                type="checkbox"
                value="Yes"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>Edit Existing Nominees </label>
            </div>
          </Form.Group>
        </Col>
      </Row> */}
      {defaultNominee === true ? (
        <div>
          {/* first Nominee */}
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Nominee Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominiName"
                      value={state.nominiName}
                      onChange={changeHandler}
                      required
                      style={nomineNameError_1 ? { borderColor: "red" } : {}}
                      placeholder="Nominee Name"
                    />
                    {nomineNameError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid name
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Relationship <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="relationship"
                      value={state.relationship}
                      options={
                        relativeInLaw ? inLawRelativesList : relativesList
                      }
                      onChange={changeHandler}
                      style={relationshipError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>
                      {(relativeInLaw ? inLawRelativesList : relativesList).map(
                        (item) => {
                          return <option key={item.value}>{item.label}</option>;
                        }
                      )}
                    </Form.Control>
                    {relationshipError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relationship
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Gender<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={state.gender}
                      onChange={changeHandler}
                      style={genderError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                    {genderError_1 ? (
                      <p style={{ color: "red" }}>
                        &nbsp; * Please select the gender
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Datte Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        DOBError_1 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={Nominee1DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "1")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={DOBError_1 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {DOBError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid date
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Age<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Age"
                      required="required"
                      name="age"
                      value={state.age}
                      onChange={changeHandler}
                      style={ageError_1 ? { borderColor: "red" } : {}}
                    />
                    {ageError_1 ? (
                      <p style={{ color: "red" }}>
                        &nbsp; * Please enter valid age
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Blood Group <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="bloodGroup"
                      value={state.bloodGroup}
                      onChange={changeHandler}
                      style={bloodGroupError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Blood Group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Control>
                    {bloodGroupError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select blood group
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </div>
      ) : (
        ""
      )}

      {NominForm1 === true ? (
        <div>
          {/* second Nominee */}
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Second Nominee Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee2NominiName"
                      value={state.nominee2NominiName}
                      onChange={changeHandler}
                      placeholder="Nominee Name"
                      required="required"
                      style={nomineNameError_2 ? { borderColor: "red" } : {}}
                    />
                    {nomineNameError_2 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid name
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Relationship <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee2Relationship"
                      value={state.nominee2Relationship}
                      options={relativesList}
                      onChange={changeHandler}
                      style={relationshipError_2 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>
                      {relativesList.map((item) => {
                        return <option key={item.value}>{item.label}</option>;
                      })}
                    </Form.Control>

                    {relationshipError_2 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relationship
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Gender<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee2Gender"
                      value={state.nominee2Gender}
                      onChange={changeHandler}
                      style={genderError_2 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>

                    {genderError_2 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select the gender
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            {isChecked === false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        cancel(1);
                      }}
                      type="cancel"
                      style={{ color: "white", border: " 2px solid#4466f2" }}
                    >
                      <i
                        class="fa fa-close"
                        style={{ fontSize: "20px", color: "red" }}
                      ></i>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            ) : (
              ""
            )}
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Datte Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        DOBError_2 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={Nominee2DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "2")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={DOBError_2 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {DOBError_2 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid date
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Age<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee2Age"
                      value={state.nominee2Age}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={ageError_2 ? { borderColor: "red" } : {}}
                    />
                    {ageError_2 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid age
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Blood Group <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee2BloodGroup"
                      value={state.nominee2BloodGroup}
                      onChange={changeHandler}
                      style={bloodGroupError_2 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Blood Group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Control>
                    {bloodGroupError_2 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid blood group
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      {NominForm2 === true ? (
        <div>
          {/* Third Nominee  */}
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Third Nominee Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee3NominiName"
                      value={state.nominee3NominiName}
                      onChange={changeHandler}
                      placeholder="Nominee Name"
                      required="required"
                      style={nomineNameError_3 ? { borderColor: "red" } : {}}
                    />
                    {nomineNameError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid name
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Relationship <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee3Relationship"
                      value={state.nominee3Relationship}
                      options={relativesList}
                      onChange={changeHandler}
                      style={relationshipError_3 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>
                      {relativesList.map((item) => {
                        return <option key={item.value}>{item.label}</option>;
                      })}
                    </Form.Control>
                    {relationshipError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relation ship
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Gender<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee3Gender"
                      value={state.nominee3Gender}
                      onChange={changeHandler}
                      style={genderError_3 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>

                    {genderError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select the gender
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            {isChecked === false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        cancel(2);
                      }}
                      type="cancel"
                      style={{ color: "white", border: " 2px solid#4466f2" }}
                    >
                      <i
                        class="fa fa-close"
                        style={{ fontSize: "20px", color: "red" }}
                      ></i>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            ) : (
              ""
            )}
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Datte Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        DOBError_3 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={Nominee3DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "3")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={DOBError_3 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {DOBError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid date
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Age<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee3Age"
                      value={state.nominee3Age}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={ageError_3 ? { borderColor: "red" } : {}}
                    />
                    {ageError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid age
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Blood Group <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee3BloodGroup"
                      value={state.nominee3BloodGroup}
                      onChange={changeHandler}
                      style={bloodGroupError_3 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Blood Group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Control>
                    {bloodGroupError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid blood group
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      {NominForm3 === true ? (
        <div>
          {/* fourth Nominee Name */}
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Fourth Nominee Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee4NominiName"
                      value={state.nominee4NominiName}
                      onChange={changeHandler}
                      placeholder="Nominee Name"
                      required="required"
                      style={nomineNameError_4 ? { borderColor: "red" } : {}}
                    />
                    {nomineNameError_4 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid name
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Relationship <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee4Relationship"
                      value={state.nominee4Relationship}
                      options={relativesList}
                      onChange={changeHandler}
                      style={relationshipError_4 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>
                      {relativesList.map((item) => {
                        return <option key={item.value}>{item.label}</option>;
                      })}
                    </Form.Control>

                    {relationshipError_4 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relationship
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Gender<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee4Gender"
                      value={state.nominee4Gender}
                      onChange={changeHandler}
                      style={genderError_4 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>

                    {genderError_4 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select the gender
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            {isChecked === false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        cancel(3);
                      }}
                      type="cancel"
                      style={{ color: "white", border: " 2px solid#4466f2" }}
                    >
                      <i
                        class="fa fa-close"
                        style={{ fontSize: "20px", color: "red" }}
                      ></i>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            ) : (
              ""
            )}
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      &nbsp; *Datte Of Birth
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        DOBError_4 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={Nominee4DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "4")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={DOBError_4 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {DOBError_4 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid date
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Age<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee4Age"
                      value={state.nominee4Age}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={ageError_4 ? { borderColor: "red" } : {}}
                    />
                    {ageError_4 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid age
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Blood Group <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee4BloodGroup"
                      value={state.nominee4BloodGroup}
                      onChange={changeHandler}
                      style={bloodGroupError_4 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Blood Group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Control>
                    {bloodGroupError_4 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select blood group
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      {NominForm4 === true ? (
        <div>
          {/* Fifth Nominee */}
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Fifth Nominee Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee5NominiName"
                      value={state.nominee5NominiName}
                      onChange={changeHandler}
                      placeholder="Nominee Name"
                      required="required"
                      style={nomineNameError_5 ? { borderColor: "red" } : {}}
                    />
                    {nomineNameError_5 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid name
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Relationship <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee5Relationship"
                      value={state.nominee5Relationship}
                      options={relativesList}
                      onChange={changeHandler}
                      style={relationshipError_5 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>
                      {relativesList.map((item) => {
                        return <option key={item.value}>{item.label}</option>;
                      })}
                    </Form.Control>

                    {relationshipError_5 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relationship
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Gender<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee5Gender"
                      value={state.nominee5Gender}
                      onChange={changeHandler}
                      style={genderError_5 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                    {genderError_5 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select the gender
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            {isChecked === false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        cancel(4);
                      }}
                      type="cancel"
                      style={{ color: "white", border: " 2px solid#4466f2" }}
                    >
                      <i
                        class="fa fa-close"
                        style={{ fontSize: "20px", color: "red" }}
                      ></i>
                    </button>
                  </div>
                </Form.Group>
              </Col>
            ) : (
              ""
            )}
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Datte Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        DOBError_5 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={Nominee5DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "5")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={DOBError_5 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {DOBError_5 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid date
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Age<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee5Age"
                      value={state.nominee5Age}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={ageError_5 ? { borderColor: "red" } : {}}
                    />
                    {ageError_5 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please enter valid age
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Blood Group <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="nominee5BloodGroup"
                      value={state.nominee5BloodGroup}
                      onChange={changeHandler}
                      style={bloodGroupError_5 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Blood Group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Control>
                    {bloodGroupError_5 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select blood group
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </div>
      ) : (
        ""
      )}

      {/* {(() => {
            switch (NomineeCount) {
              case 1:
                return <NomineeForm />;
              case 2:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />{" "}
                  </div>
                );
              case 3:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              case 4:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              case 5:
                return (
                  <div>
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                    <NomineeForm />
                  </div>
                );
              default:
                return <div>Nominees.</div>;
            }
          })()} */}
      {isChecked === false && NomineeCount <= 3 ? (
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={() => {
                    handleIncrement(AddNewCount);
                  }}
                  disabled={false}
                  style={{ width: "160px" }}
                >
                  <b> Add New Nominee + </b>
                </button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      ) : (
        ""
      )}
      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <button className="stepperButtons" onClick={PrevStep}>
          Back
        </button>
        <button className="stepperButtons" onClick={submitHandler}>
          Save & Next
        </button>
      </div>
    </Fragment>
  );
};
export default InsuranceNomination;
