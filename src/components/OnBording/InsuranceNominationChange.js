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
import { setSeconds } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InsuranceNomination = (props) => {
  const {
    CandidatePersonalInfo,
    candidatePersonalInfoData,
    candidateProfileData,
    CandidateViewInformation,
    candidateViewInfo,
    CreateNominee,
    CreateNomineeResponse,
    InsuranceNominationView,
    candidateInsuranceNominationData,
    InsuranceNominationDelete,
    deleteNomineeData,
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
  const [extra1Nominee1DOB, setExtra1Nominee1DOB] = useState();
  const [extra2Nominee1DOB, setExtra2Nominee1DOB] = useState();
  const [Nominee2DOB, setNominee2DOB] = useState();
  const [Nominee3DOB, setNominee3DOB] = useState();
  const [Nominee4DOB, setNominee4DOB] = useState();
  const [Nominee5DOB, setNominee5DOB] = useState();
  const [Nominee5DOB1, setNominee5DOB1] = useState();

  const [In_law_Nominee1DOB, setInLawNominee1Dob] = useState();
  const [In_law_Nominee2DOB, setInLawNominee2Dob] = useState();
  const [ageError_1, setageError_1] = useState(false);
  const [bloodGroupError_1, setBloodGroupError_1] = useState(false);
  const [genderError_1, setGenderError_1] = useState(false);
  const [nomineNameError_1, setNomineerror_1] = useState(false);
  const [relationshipError_1, setRelationshipError_1] = useState(false);
  const [DOBError_1, setDobError_1] = useState(false);

  const [extra1ageError_1, setExtra1ageError_1] = useState(false);
  const [extra1bloodGroupError_1, setExtra1BloodGroupError_1] = useState(false);
  const [extra1genderError_1, setExtra1GenderError_1] = useState(false);
  const [extra1nomineNameError_1, setExtra1Nomineerror_1] = useState(false);
  const [extra1relationshipError_1, setExtra1RelationshipError_1] = useState(
    false
  );
  const [extra1DOBError_1, setExtra1DobError_1] = useState(false);

  const [extra2ageError_1, setExtra2ageError_1] = useState(false);
  const [extra2bloodGroupError_1, setExtra2BloodGroupError_1] = useState(false);
  const [extra2genderError_1, setExtra2GenderError_1] = useState(false);
  const [extra2nomineNameError_1, setExtra2Nomineerror_1] = useState(false);
  const [extra2relationshipError_1, setExtra2RelationshipError_1] = useState(
    false
  );
  const [extra2DOBError_1, setExtra2DobError_1] = useState(false);

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

  const [In_law_ageError_1, setInLawAgeError_1] = useState(false);
  const [In_law_bloodGroupError_1, setInLawBloodGroupError_1] = useState(false);
  const [In_law_genderError_1, setInLawGenderError_1] = useState(false);
  const [In_law_nomineNameError_1, setInLawNomineerror_1] = useState(false);
  const [In_law_relationshipError_1, setInLawRelationshipError_1] = useState(
    false
  );
  const [In_law_DOBError_1, setInLawDobError_1] = useState(false);

  const [In_law_ageError_2, setInLawAgeError_2] = useState(false);
  const [In_law_bloodGroupError_2, setInLawBloodGroupError_2] = useState(false);
  const [In_law_genderError_2, setInLawGenderError_2] = useState(false);
  const [In_law_nomineNameError_2, setInLawNomineerror_2] = useState(false);
  const [In_law_relationshipError_2, setInLawRelationshipError_2] = useState(
    false
  );
  const [In_law_DOBError_2, setInLawDobError_2] = useState(false);

  const [ageError_5, setageError_5] = useState(false);
  const [bloodGroupError_5, setBloodGroupError_5] = useState(false);
  const [genderError_5, setGenderError_5] = useState(false);
  const [nomineNameError_5, setNomineerror_5] = useState(false);
  const [relationshipError_5, setRelationshipError_5] = useState(false);
  const [DOBError_5, setDobError_5] = useState(false);

  const [ageError_51, setageError_51] = useState(false);
  const [bloodGroupError_51, setBloodGroupError_51] = useState(false);
  const [genderError_51, setGenderError_51] = useState(false);
  const [nomineNameError_51, setNomineerror_51] = useState(false);
  const [relationshipError_51, setRelationshipError_51] = useState(false);
  const [DOBError_51, setDobError_51] = useState(false);

  const [relativeInLaw, setRelativeType] = useState(false);
  const [age, setAge] = useState("");
  const [parentsCheck, setParentCheck] = useState(false);
  const [InlawCheck, setInlawCheck] = useState(false);
  const [NAcheck, setNAcheck] = useState(false);
  const [addFirst, setAddFirst] = useState(false);
  const [addSecond, setAddSecond] = useState(false);
  const [addThird, setAddThird] = useState(false);
  const [addTwo, setAddTwo] = useState(false);
  const [addOne, setAddOne] = useState(false);
  const [addFirstInLaw, setAddFirstInLaw] = useState(false);
  const [addSecondInLaw, setAddSecondInLaw] = useState(false);
  const [marriedStatus, setMarriedStatus] = useState(false);
  const [addExtraFirst, setAddExtraFirst] = useState(false);
  const [addExtraSecond, setAddExtraSecond] = useState(false);
  const [addExtraThird, setAddExtraThird] = useState(false);

  const [buttonOne, setButtonOne] = useState(false);
  const [buttonTwo, setButtonTwo] = useState(false);
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

    In_law_nominee1Age: "",
    In_law_nominee1BloodGroup: "",
    In_law_nominee1Gender: "",
    In_law_nominee1NominiId: 0,
    In_law_nominee1NominiName: "",
    In_law_nominee1Relationship: "",

    In_law_nominee2Age: "",
    In_law_nominee2BloodGroup: "",
    In_law_nominee2Gender: "",
    In_law_nominee2NominiId: 0,
    In_law_nominee2NominiName: "",
    In_law_nominee2Relationship: "",

    nominee5Age: "",
    nominee5BloodGroup: "",
    nominee5Gender: "",
    nominee5NominiId: 0,
    nominee5NominiName: "",
    nominee5Relationship: "",

    nominee5Age1: "",
    nominee5BloodGroup1: "",
    nominee5Gender1: "",
    nominee5NominiId1: 0,
    nominee5NominiName1: "",
    nominee5Relationship1: "",

    extra1age: "",
    extra1bloodGroup: "",
    extra1gender: "",
    extra1nominiId: 0,
    extra1nominiName: "",
    extra1relationship: "",

    extra2age: "",
    extra2bloodGroup: "",
    extra2gender: "",
    extra2nominiId: 0,
    extra2nominiName: "",
    extra2relationship: "",
  });

  const [inLawRelativesList, setInLawList] = useState([
    { value: 1, label: "Father" },
    { value: 2, label: "Mother" },
    { value: 3, label: "Brother" },
    { value: 4, label: "Sister" },
    { value: 5, label: "Father In-law" },
    { value: 5, label: "Mother In-law" },
    { value: 7, label: "Brother In-law" },
    { value: 8, label: "Sister In-law" },
  ]);
  const [relativesList, setRelativeList] = useState([
    { value: 1, label: "Father" },
    { value: 2, label: "Mother" },
    { value: 3, label: "Brother" },
    { value: 4, label: "Sister" },
  ]);

  useEffect(() => {
    console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      CandidateViewInformation(candidateProfileData.candidateId);
    }
  }, [candidateProfileData]);
  console.log("personal information candidateViewInfo-->", candidateViewInfo);
  console.log("contract type-->", candidateViewInfo.contractType);

  useEffect(() => {
    // console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      CandidatePersonalInfo(candidateProfileData.candidateId);
    }
  }, [candidateProfileData]);

  console.log("Candiate personal information data", candidatePersonalInfoData);

  useEffect(() => {
    console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      InsuranceNominationView(candidateProfileData.candidateId);
    }
  }, [candidateProfileData, deleteNomineeData]);

  console.log(
    "Insurance nomination view candidate",
    candidateInsuranceNominationData
  );

  useEffect(() => {
    // console.log("personal information view candidate", candidateProfileData);
    if (
      candidatePersonalInfoData &&
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
      //   if (
      //     candidatePersonalInfoData &&
      //     candidatePersonalInfoData.maritalStatus !== null &&
      //     candidatePersonalInfoData.maritalStatus !== undefined &&
      //     (candidatePersonalInfoData.maritalStatus === "Unmarried") |
      //       (candidatePersonalInfoData.maritalStatus === "UnMarried")
      //   ) {
      //     setMarriedStatus(true);
      //     setRelativeType(false);
      //     setParentCheck(false);
      //     setInlawCheck(false);
      //     setNAcheck(false);
      //     // setAddOne(false);
      //     // setAddTwo(false);
      //     // setAddFirstInLaw(false);
      //     // setAddSecondInLaw(false);
      //     state.relationship = "Father";
      //     state.nominee2Relationship = "Mother";
      //   } else if (
      //     candidatePersonalInfoData &&
      //     candidatePersonalInfoData.maritalStatus !== null &&
      //     candidatePersonalInfoData.maritalStatus !== undefined &&
      //     (candidatePersonalInfoData.maritalStatus === "married") |
      //       (candidatePersonalInfoData.maritalStatus === "Married")
      //   ) {
      //     setRelativeType(true);
      //     setMarriedStatus(false);
      //     setParentCheck(false);
      //     setInlawCheck(true);
      //     setNAcheck(false);
      //     setAddFirstInLaw(true);
      //     setAddSecondInLaw(true);
      //     setAddOne(true);
      //     setAddTwo(true);
      //     state.relationship = "Spouse";
      //     state.nominee2Relationship = "Child 1";
      //   }
      // }

      // if (
      //   candidateInsuranceNominationData &&
      //   candidateInsuranceNominationData !== null &&
      //   candidateInsuranceNominationData !== undefined &&
      //   Object.keys(candidateInsuranceNominationData).length !== 0 &&
      //   candidatePersonalInfoData &&
      //   candidatePersonalInfoData !== null &&
      //   candidatePersonalInfoData !== undefined &&
      //   Object.keys(candidatePersonalInfoData).length !== 0
      // ) {
      //   console.log(candidateInsuranceNominationData);
      //   if (
      //     candidateInsuranceNominationData[0] &&
      //     candidateInsuranceNominationData[0] !== null &&
      //     candidateInsuranceNominationData[0] !== undefined &&
      //     candidateInsuranceNominationData[0].nomineeVariant > 0
      //   ) {
      //     if (
      //       candidatePersonalInfoData &&
      //       candidatePersonalInfoData.maritalStatus !== null &&
      //       candidatePersonalInfoData.maritalStatus !== undefined &&
      //       (candidatePersonalInfoData.maritalStatus === "married") |
      //         (candidatePersonalInfoData.maritalStatus === "Married")
      //     ) {
      //       if (candidateInsuranceNominationData[0].nomineeVariant === 1) {
      //         setParentCheck(true);
      //         setInlawCheck(false);
      //         setNAcheck(false);
      //       } else if (candidateInsuranceNominationData[0].nomineeVariant === 2) {
      //         setParentCheck(false);
      //         setInlawCheck(true);
      //         setNAcheck(false);
      //       } else if (candidateInsuranceNominationData[0].nomineeVariant === 3) {
      //         setParentCheck(false);
      //         setInlawCheck(false);
      //         setNAcheck(true);
      //       }
      //     }
      //   }
    }
  }, [candidatePersonalInfoData]);

  useEffect(() => {
    if (
      candidateInsuranceNominationData &&
      candidateInsuranceNominationData !== null &&
      candidateInsuranceNominationData !== undefined &&
      Object.keys(candidateInsuranceNominationData).length !== 0 &&
      candidatePersonalInfoData &&
      candidatePersonalInfoData !== null &&
      candidatePersonalInfoData !== undefined &&
      Object.keys(candidatePersonalInfoData).length !== 0
    ) {
      console.log(candidateInsuranceNominationData);
      // if (
      //   candidateInsuranceNominationData[0] &&
      //   candidateInsuranceNominationData[0] !== null &&
      //   candidateInsuranceNominationData[0] !== undefined &&
      //   candidateInsuranceNominationData[0].nomineeVariant > 0
      // ) {
      //   if (candidateInsuranceNominationData[0].nomineeVariant === 1) {
      //     setParentCheck(true);
      //     setInlawCheck(false);
      //     setNAcheck(false);
      //   } else if (candidateInsuranceNominationData[0].nomineeVariant === 2) {
      //     setParentCheck(false);
      //     setInlawCheck(true);
      //     setNAcheck(false);
      //   } else if (candidateInsuranceNominationData[0].nomineeVariant === 3) {
      //     setParentCheck(false);
      //     setInlawCheck(false);
      //     setNAcheck(true);
      //   }
      // }
      candidateInsuranceNominationData.map((item, i) => {
        console.log(item.nomineeType);
        if (
          item.nomineeType === 1 &&
          item.relationship === "Father" &&
          candidatePersonalInfoData &&
          candidatePersonalInfoData.maritalStatus !== null &&
          candidatePersonalInfoData.maritalStatus !== undefined &&
          (candidatePersonalInfoData.maritalStatus === "Unmarried") |
            (candidatePersonalInfoData.maritalStatus === "UnMarried")
        ) {
          console.log(candidatePersonalInfoData.maritalStatus);
          setAddFirst(false);
          state.extra1age = item.age;
          state.extra1bloodGroup = item.bloodGroup;
          state.extra1gender = item.gender;
          state.extra1nominiId = item.nominiId;
          state.extra1nominiName = item.nominiName;
          state.extra1relationship = item.relationship;
          setExtra1Nominee1DOB(new Date(item.dateOfBirth));
          setButtonTwo(false);
          setAddExtraFirst(true);
          setMarriedStatus(true);
          setRelativeType(false);
          setButtonOne(true);
        }
        if (
          item.nomineeType === 2 &&
          item.relationship === "Mother" &&
          candidatePersonalInfoData &&
          candidatePersonalInfoData.maritalStatus !== null &&
          candidatePersonalInfoData.maritalStatus !== undefined &&
          (candidatePersonalInfoData.maritalStatus === "Unmarried") |
            (candidatePersonalInfoData.maritalStatus === "UnMarried")
        ) {
          setAddSecond(false);
          state.extra2age = item.age;
          state.extra2bloodGroup = item.bloodGroup;
          state.extra2gender = item.gender;
          state.extra2nominiId = item.nominiId;
          state.extra2nominiName = item.nominiName;
          state.extra2relationship = item.relationship;
          setExtra2Nominee1DOB(new Date(item.dateOfBirth));
          setButtonTwo(false);
          setAddExtraSecond(true);
          setMarriedStatus(true);
          setRelativeType(false);
          setButtonOne(true);
        }

        if (item.nomineeType === 3) {
          state.nominee3Age = item.age;
          state.nominee3BloodGroup = item.bloodGroup;
          state.nominee3Gender = item.gender;
          state.nominee3NominiId = item.nominiId;
          state.nominee3NominiName = item.nominiName;
          state.nominee3Relationship = item.relationship;
          setNominee3DOB(new Date(item.dateOfBirth));
          setAddOne(true);
        }
        if (item.nomineeType === 4) {
          state.nominee4Age = item.age;
          state.nominee4BloodGroup = item.bloodGroup;
          state.nominee4Gender = item.gender;
          state.nominee4NominiId = item.nominiId;
          state.nominee4NominiName = item.nominiName;
          state.nominee4Relationship = item.relationship;
          setNominee4DOB(new Date(item.dateOfBirth));
          setAddTwo(true);
        }
        if (item.nomineeType === 5) {
          state.nominee5Age = item.age;
          state.nominee5BloodGroup = item.bloodGroup;
          state.nominee5Gender = item.gender;
          state.nominee5NominiId = item.nominiId;
          state.nominee5NominiName = item.nominiName;
          state.nominee5Relationship = item.relationship;
          setNominee5DOB(new Date(item.dateOfBirth));
          setAddThird(true);
        }
        if (item.nomineeType === 6) {
          state.In_law_nominee1Age = item.age;
          state.In_law_nominee1BloodGroup = item.bloodGroup;
          state.In_law_nominee1Gender = item.gender;
          state.In_law_nominee1NominiId = item.nominiId;
          state.In_law_nominee1NominiName = item.nominiName;
          state.In_law_nominee1Relationship = item.relationship;
          setInLawNominee1Dob(new Date(item.dateOfBirth));
          setAddFirstInLaw(true);
        }
        if (item.nomineeType === 7) {
          state.In_law_nominee2Age = item.age;
          state.In_law_nominee2BloodGroup = item.bloodGroup;
          state.In_law_nominee2Gender = item.gender;
          state.In_law_nominee2NominiId = item.nominiId;
          state.In_law_nominee2NominiName = item.nominiName;
          state.In_law_nominee2Relationship = item.relationship;
          setInLawNominee2Dob(new Date(item.dateOfBirth));
          setAddSecondInLaw(true);
        }
        if (
          item.nomineeType === 8 &&
          item.relationship === "Spouse" &&
          candidatePersonalInfoData &&
          candidatePersonalInfoData.maritalStatus !== null &&
          candidatePersonalInfoData.maritalStatus !== undefined &&
          (candidatePersonalInfoData.maritalStatus === "married") |
            (candidatePersonalInfoData.maritalStatus === "Married")
        ) {
          console.log("-----------");
          setAddExtraFirst(false);
          state.age = item.age;
          state.bloodGroup = item.bloodGroup;
          state.gender = item.gender;
          state.nominiId = item.nominiId;
          state.nominiName = item.nominiName;
          state.relationship = item.relationship;
          setNominee1DOB(new Date(item.dateOfBirth));
          setButtonOne(false);
          setAddFirst(true);
          setMarriedStatus(false);
          setRelativeType(true);
          setButtonTwo(true);
        }
        if (
          item.nomineeType === 9 &&
          item.relationship === "Child 1" &&
          candidatePersonalInfoData &&
          candidatePersonalInfoData.maritalStatus !== null &&
          candidatePersonalInfoData.maritalStatus !== undefined &&
          (candidatePersonalInfoData.maritalStatus === "married") |
            (candidatePersonalInfoData.maritalStatus === "Married")
        ) {
          setAddExtraSecond(false);
          state.nominee2Age = item.age;
          state.nominee2BloodGroup = item.bloodGroup;
          state.nominee2Gender = item.gender;
          state.nominee2NominiId = item.nominiId;
          state.nominee2NominiName = item.nominiName;
          state.nominee2Relationship = item.relationship;
          setNominee2DOB(new Date(item.dateOfBirth));
          setButtonOne(false);
          setAddSecond(true);
          setMarriedStatus(false);
          setRelativeType(true);
          setButtonTwo(true);
        } else {
          console.log("came in else");
          setButtonOne(false);
          setAddSecond(false);
          setButtonTwo(true);
        }
        if (item.nomineeType === 10) {
          state.nominee5Age1 = item.age;
          state.nominee5BloodGroup1 = item.bloodGroup;
          state.nominee5Gender1 = item.gender;
          state.nominee5NominiId1 = item.nominiId;
          state.nominee5NominiName1 = item.nominiName;
          state.nominee5Relationship1 = item.relationship;
          setNominee5DOB1(new Date(item.dateOfBirth));
          setAddExtraThird(true);
        }
      });

      if (
        candidateInsuranceNominationData &&
        candidateInsuranceNominationData !== null &&
        candidateInsuranceNominationData !== undefined &&
        Object.keys(candidateInsuranceNominationData).length !== 0 &&
        candidatePersonalInfoData &&
        candidatePersonalInfoData !== null &&
        candidatePersonalInfoData !== undefined &&
        Object.keys(candidatePersonalInfoData).length !== 0
      ) {
        console.log(candidateInsuranceNominationData);
        if (
          candidateInsuranceNominationData[0] &&
          candidateInsuranceNominationData[0] !== null &&
          candidateInsuranceNominationData[0] !== undefined &&
          candidateInsuranceNominationData[0].nomineeVariant > 0
        ) {
          if (
            candidatePersonalInfoData &&
            candidatePersonalInfoData.maritalStatus !== null &&
            candidatePersonalInfoData.maritalStatus !== undefined &&
            (candidatePersonalInfoData.maritalStatus === "married") |
              (candidatePersonalInfoData.maritalStatus === "Married")
          ) {
            if (candidateInsuranceNominationData[0].nomineeVariant === 1) {
              setParentCheck(true);
              setInlawCheck(false);
              setNAcheck(false);
            } else if (
              candidateInsuranceNominationData[0].nomineeVariant === 2
            ) {
              setParentCheck(false);
              setInlawCheck(true);
              setNAcheck(false);
            } else if (
              candidateInsuranceNominationData[0].nomineeVariant === 3
            ) {
              setParentCheck(false);
              setInlawCheck(false);
              setNAcheck(true);
            }
          }
        }
      }
      candidateInsuranceNominationData.map((item, i) => {
        console.log(item.nomineeType);
        if (item.nomineeType === 9) {
          setAddSecond(true);
        }
      });
    } else {
      setMarriedStatus(true);
      setRelativeType(false);
      setParentCheck(false);
      setInlawCheck(false);
      setNAcheck(false);
      setAddExtraFirst(true);
      setAddExtraSecond(true);
      setAddFirstInLaw(false);
      setAddSecondInLaw(false);
      setAddFirst(false);
      setAddSecond(false);
      setAddOne(false);
      setAddTwo(false);
      state.relationship = "Father";
      state.nominee2Relationship = "Mother";
      setButtonTwo(false);
      setButtonOne(true);
    }

    if (
      candidateInsuranceNominationData &&
      candidateInsuranceNominationData !== null &&
      candidateInsuranceNominationData !== undefined &&
      Object.keys(candidateInsuranceNominationData).length !== 0 &&
      candidatePersonalInfoData &&
      candidatePersonalInfoData !== null &&
      candidatePersonalInfoData !== undefined &&
      Object.keys(candidatePersonalInfoData).length !== 0
    ) {
      if (
        candidatePersonalInfoData &&
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        (candidatePersonalInfoData.maritalStatus === "Unmarried") |
          (candidatePersonalInfoData.maritalStatus === "UnMarried")
      ) {
        setMarriedStatus(true);
        setRelativeType(false);
        setParentCheck(false);
        setInlawCheck(false);
        setNAcheck(false);
        setAddExtraFirst(true);
        setAddExtraSecond(true);
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        setAddFirst(false);
        setAddSecond(false);
        setAddOne(false);
        setAddTwo(false);
        setButtonTwo(false);
        setButtonOne(true);
        setAddOne(false);
        setAddTwo(false);
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        state.relationship = "Father";
        state.nominee2Relationship = "Mother";
      } else if (
        candidatePersonalInfoData &&
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        (candidatePersonalInfoData.maritalStatus === "married") |
          (candidatePersonalInfoData.maritalStatus === "Married")
      ) {
        setRelativeType(true);
        setMarriedStatus(false);
        // setParentCheck(false);
        // setInlawCheck(true);
        // setNAcheck(false);
        setAddFirstInLaw(true);
        setAddSecondInLaw(true);
        // setAddFirst(true);
        // setAddSecond(true);
        setAddOne(true);
        setAddTwo(true);
        setAddExtraFirst(false);
        setAddExtraSecond(false);
        setButtonOne(false);
        setButtonTwo(true);
        state.relationship = "Spouse";
        state.nominee2Relationship = "Child 1";
      } else {
        setMarriedStatus(true);
        setRelativeType(false);
        // setParentCheck(false);
        // setInlawCheck(false);
        // setNAcheck(false);
        setAddExtraFirst(true);
        setAddExtraSecond(true);
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        setAddFirst(false);
        setAddSecond(false);
        setAddOne(false);
        setAddTwo(false);
        state.relationship = "Father";
        state.nominee2Relationship = "Mother";
        setButtonTwo(false);
        setButtonOne(true);
      }
    } else {
      if (
        candidatePersonalInfoData &&
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        (candidatePersonalInfoData.maritalStatus === "Unmarried") |
          (candidatePersonalInfoData.maritalStatus === "UnMarried")
      ) {
        setMarriedStatus(true);
        setRelativeType(false);
        setParentCheck(false);
        setInlawCheck(false);
        setNAcheck(false);
        setAddExtraFirst(true);
        setAddExtraSecond(true);
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        setAddFirst(false);
        setAddSecond(false);
        setAddOne(false);
        setAddTwo(false);
        setButtonTwo(false);
        setButtonOne(true);
        setAddOne(false);
        setAddTwo(false);
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        state.relationship = "Father";
        state.nominee2Relationship = "Mother";
      } else if (
        candidatePersonalInfoData &&
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        (candidatePersonalInfoData.maritalStatus === "married") |
          (candidatePersonalInfoData.maritalStatus === "Married")
      ) {
        setRelativeType(true);
        setMarriedStatus(false);
        setParentCheck(false);
        setInlawCheck(true);
        setNAcheck(false);
        setAddFirstInLaw(true);
        setAddSecondInLaw(true);
        setAddFirst(true);
        setAddSecond(true);
        setAddOne(true);
        setAddTwo(true);
        setAddExtraFirst(false);
        setAddExtraSecond(false);
        setButtonOne(false);
        setButtonTwo(true);
        state.relationship = "Spouse";
        state.nominee2Relationship = "Child 1";
      } else {
        setMarriedStatus(true);
        setRelativeType(false);
        setParentCheck(false);
        setInlawCheck(false);
        setNAcheck(false);
        setAddExtraFirst(true);
        setAddExtraSecond(true);
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        setAddFirst(false);
        setAddSecond(false);
        setAddOne(false);
        setAddTwo(false);
        state.relationship = "Father";
        state.nominee2Relationship = "Mother";
        setButtonTwo(false);
        setButtonOne(true);
      }
    }
  }, [
    candidateInsuranceNominationData,
    candidatePersonalInfoData,
    deleteNomineeData,
  ]);

  // useEffect(() => {
  //   if (
  //     candidateInsuranceNominationData &&
  //     candidateInsuranceNominationData !== null &&
  //     candidateInsuranceNominationData !== undefined &&
  //     Object.keys(candidateInsuranceNominationData).length !== 0
  //   ) {
  //     console.log("12345678");

  //     if (
  //       candidateInsuranceNominationData[0] &&
  //       candidateInsuranceNominationData[0] !== null &&
  //       candidateInsuranceNominationData[0] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[0]).length !== 0
  //     ) {
  //       setAddFirst(true);
  //       setNomineeCount(0);
  //     } else {
  //       setAddFirst(false);
  //     }
  //     if (
  //       candidateInsuranceNominationData[1] &&
  //       candidateInsuranceNominationData[1] !== null &&
  //       candidateInsuranceNominationData[1] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[1]).length !== 0
  //     ) {
  //       setAddSecond(true);
  //       setNomineeCount(1);
  //     } else {
  //       setAddSecond(false);
  //     }
  //     if (
  //       candidateInsuranceNominationData[2] &&
  //       candidateInsuranceNominationData[2] !== null &&
  //       candidateInsuranceNominationData[2] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //       candidateInsuranceNominationData[2].relationship !== null &&
  //       candidateInsuranceNominationData[2].relationship !== undefined &&
  //       candidateInsuranceNominationData[2].relationship === "Father"
  //     ) {
  //       setAddOne(true);
  //       setNomineeCount(2);
  //     } else {
  //       setAddOne(false);
  //     }
  //     if (
  //       candidateInsuranceNominationData[3] &&
  //       candidateInsuranceNominationData[3] !== null &&
  //       candidateInsuranceNominationData[3] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //       candidateInsuranceNominationData[3].relationship !== null &&
  //       candidateInsuranceNominationData[3].relationship !== undefined &&
  //       candidateInsuranceNominationData[3].relationship === "Mother"
  //     ) {
  //       setAddTwo(true);
  //       setNomineeCount(3);
  //     } else {
  //       setAddTwo(false);
  //     }
  //     if (
  //       candidateInsuranceNominationData[2] &&
  //       candidateInsuranceNominationData[2] !== null &&
  //       candidateInsuranceNominationData[2] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //       candidateInsuranceNominationData[2].relationship !== null &&
  //       candidateInsuranceNominationData[2].relationship !== undefined &&
  //       candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //     ) {
  //       setAddFirstInLaw(true);
  //       setNomineeCount(2);
  //     } else {
  //       setAddFirstInLaw(false);
  //     }
  //     if (
  //       candidateInsuranceNominationData[3] &&
  //       candidateInsuranceNominationData[3] !== null &&
  //       candidateInsuranceNominationData[3] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //       candidateInsuranceNominationData[3].relationship !== null &&
  //       candidateInsuranceNominationData[3].relationship !== undefined &&
  //       candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //     ) {
  //       setAddSecondInLaw(true);
  //       setNomineeCount(3);
  //     } else {
  //       setAddSecondInLaw(false);
  //     }
  //     if (
  //       candidateInsuranceNominationData[4] &&
  //       candidateInsuranceNominationData[4] !== null &&
  //       candidateInsuranceNominationData[4] !== undefined &&
  //       Object.keys(candidateInsuranceNominationData[4]).length !== 0
  //     ) {
  //       setAddThird(true);
  //       setNomineeCount(4);
  //     } else {
  //       setAddThird(false);
  //     }
  //     setState({
  //       age:
  //         candidateInsuranceNominationData[0] &&
  //         candidateInsuranceNominationData[0].age !== null &&
  //         candidateInsuranceNominationData[0].age !== undefined
  //           ? candidateInsuranceNominationData[0].age
  //           : "",
  //       bloodGroup:
  //         candidateInsuranceNominationData[0] &&
  //         candidateInsuranceNominationData[0].bloodGroup !== null &&
  //         candidateInsuranceNominationData[0].bloodGroup !== undefined
  //           ? candidateInsuranceNominationData[0].bloodGroup
  //           : "",
  //       gender:
  //         candidateInsuranceNominationData[0] &&
  //         candidateInsuranceNominationData[0].gender !== null &&
  //         candidateInsuranceNominationData[0].gender !== undefined
  //           ? candidateInsuranceNominationData[0].gender
  //           : "",
  //       nominiName:
  //         candidateInsuranceNominationData[0] &&
  //         candidateInsuranceNominationData[0].nominiName !== null &&
  //         candidateInsuranceNominationData[0].nominiName !== undefined
  //           ? candidateInsuranceNominationData[0].nominiName
  //           : "",
  //       relationship:
  //         candidateInsuranceNominationData[0] &&
  //         candidateInsuranceNominationData[0].relationship !== null &&
  //         candidateInsuranceNominationData[0].relationship !== undefined
  //           ? candidateInsuranceNominationData[0].relationship
  //           : "",

  //       nominee2Age:
  //         candidateInsuranceNominationData[1] &&
  //         candidateInsuranceNominationData[1].age !== null &&
  //         candidateInsuranceNominationData[1].age !== undefined
  //           ? candidateInsuranceNominationData[1].age
  //           : "",
  //       nominee2BloodGroup:
  //         candidateInsuranceNominationData[1] &&
  //         candidateInsuranceNominationData[1].bloodGroup !== null &&
  //         candidateInsuranceNominationData[1].bloodGroup !== undefined
  //           ? candidateInsuranceNominationData[1].bloodGroup
  //           : "",
  //       nominee2Gender:
  //         candidateInsuranceNominationData[1] &&
  //         candidateInsuranceNominationData[1].gender !== null &&
  //         candidateInsuranceNominationData[1].gender !== undefined
  //           ? candidateInsuranceNominationData[1].gender
  //           : "",
  //       nominee2NominiName:
  //         candidateInsuranceNominationData[1] &&
  //         candidateInsuranceNominationData[1].nominiName !== null &&
  //         candidateInsuranceNominationData[1].nominiName !== undefined
  //           ? candidateInsuranceNominationData[1].nominiName
  //           : "",
  //       nominee2Relationship:
  //         candidateInsuranceNominationData[1] &&
  //         candidateInsuranceNominationData[1].relationship !== null &&
  //         candidateInsuranceNominationData[1].relationship !== undefined
  //           ? candidateInsuranceNominationData[1].relationship
  //           : "",

  //       nominee3Age:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].age !== null &&
  //         candidateInsuranceNominationData[2].age !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father"
  //           ? candidateInsuranceNominationData[2].age
  //           : "",
  //       nominee3BloodGroup:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].bloodGroup !== null &&
  //         candidateInsuranceNominationData[2].bloodGroup !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father"
  //           ? candidateInsuranceNominationData[2].bloodGroup
  //           : "",
  //       nominee3Gender:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].gender !== null &&
  //         candidateInsuranceNominationData[2].gender !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father"
  //           ? candidateInsuranceNominationData[2].gender
  //           : "",
  //       nominee3NominiName:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].nominiName !== null &&
  //         candidateInsuranceNominationData[2].nominiName !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father"
  //           ? candidateInsuranceNominationData[2].nominiName
  //           : "",
  //       nominee3Relationship:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father"
  //           ? candidateInsuranceNominationData[2].relationship
  //           : "",

  //       nominee4Age:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].age !== null &&
  //         candidateInsuranceNominationData[3].age !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother"
  //           ? candidateInsuranceNominationData[3].age
  //           : "",
  //       nominee4BloodGroup:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].bloodGroup !== null &&
  //         candidateInsuranceNominationData[3].bloodGroup !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother"
  //           ? candidateInsuranceNominationData[3].bloodGroup
  //           : "",
  //       nominee4Gender:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].gender !== null &&
  //         candidateInsuranceNominationData[3].gender !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother"
  //           ? candidateInsuranceNominationData[3].gender
  //           : "",
  //       nominee4NominiName:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].nominiName !== null &&
  //         candidateInsuranceNominationData[3].nominiName !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother"
  //           ? candidateInsuranceNominationData[3].nominiName
  //           : "",
  //       nominee4Relationship:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother"
  //           ? candidateInsuranceNominationData[3].relationship
  //           : "",

  //       In_law_nominee1Age:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].age !== null &&
  //         candidateInsuranceNominationData[2].age !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //           ? candidateInsuranceNominationData[2].age
  //           : "",
  //       In_law_nominee1BloodGroup:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].bloodGroup !== null &&
  //         candidateInsuranceNominationData[2].bloodGroup !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //           ? candidateInsuranceNominationData[2].bloodGroup
  //           : "",
  //       In_law_nominee1Gender:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].gender !== null &&
  //         candidateInsuranceNominationData[2].gender !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //           ? candidateInsuranceNominationData[2].gender
  //           : "",
  //       In_law_nominee1NominiName:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].nominiName !== null &&
  //         candidateInsuranceNominationData[2].nominiName !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //           ? candidateInsuranceNominationData[2].nominiName
  //           : "",
  //       In_law_nominee1Relationship:
  //         candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //           ? candidateInsuranceNominationData[2].relationship
  //           : "",

  //       In_law_nominee2Age:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].age !== null &&
  //         candidateInsuranceNominationData[3].age !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //           ? candidateInsuranceNominationData[3].age
  //           : "",
  //       In_law_nominee2BloodGroup:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].bloodGroup !== null &&
  //         candidateInsuranceNominationData[3].bloodGroup !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //           ? candidateInsuranceNominationData[3].bloodGroup
  //           : "",
  //       In_law_nominee2Gender:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].gender !== null &&
  //         candidateInsuranceNominationData[3].gender !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //           ? candidateInsuranceNominationData[3].gender
  //           : "",
  //       In_law_nominee2NominiName:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].nominiName !== null &&
  //         candidateInsuranceNominationData[3].nominiName !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //           ? candidateInsuranceNominationData[3].nominiName
  //           : "",
  //       In_law_nominee2Relationship:
  //         candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //           ? candidateInsuranceNominationData[3].relationship
  //           : "",

  //       nominee5Age:
  //         candidateInsuranceNominationData[4] &&
  //         candidateInsuranceNominationData[4].age !== null &&
  //         candidateInsuranceNominationData[4].age !== undefined
  //           ? candidateInsuranceNominationData[4].age
  //           : "",
  //       nominee5BloodGroup:
  //         candidateInsuranceNominationData[4] &&
  //         candidateInsuranceNominationData[4].bloodGroup !== null &&
  //         candidateInsuranceNominationData[4].bloodGroup !== undefined
  //           ? candidateInsuranceNominationData[4].bloodGroup
  //           : "",
  //       nominee5Gender:
  //         candidateInsuranceNominationData[4] &&
  //         candidateInsuranceNominationData[4].gender !== null &&
  //         candidateInsuranceNominationData[4].gender !== undefined
  //           ? candidateInsuranceNominationData[4].gender
  //           : "",
  //       nominee5NominiName:
  //         candidateInsuranceNominationData[4] &&
  //         candidateInsuranceNominationData[4].nominiName !== null &&
  //         candidateInsuranceNominationData[4].nominiName !== undefined
  //           ? candidateInsuranceNominationData[4].nominiName
  //           : "",
  //       nominee5Relationship:
  //         candidateInsuranceNominationData[4] &&
  //         candidateInsuranceNominationData[4].relationship !== null &&
  //         candidateInsuranceNominationData[4].relationship !== undefined
  //           ? candidateInsuranceNominationData[4].relationship
  //           : "",
  //     });
  //     setNominee1DOB(
  //       candidateInsuranceNominationData[0] &&
  //         candidateInsuranceNominationData[0].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[0].dateOfBirth !== undefined
  //         ? new Date(candidateInsuranceNominationData[0].dateOfBirth)
  //         : ""
  //     );
  //     setNominee2DOB(
  //       candidateInsuranceNominationData[1] &&
  //         candidateInsuranceNominationData[1].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[1].dateOfBirth !== undefined
  //         ? new Date(candidateInsuranceNominationData[1].dateOfBirth)
  //         : ""
  //     );
  //     setNominee3DOB(
  //       candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[2].dateOfBirth !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father"
  //         ? new Date(candidateInsuranceNominationData[2].dateOfBirth)
  //         : ""
  //     );
  //     setNominee4DOB(
  //       candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[3].dateOfBirth !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother"
  //         ? new Date(candidateInsuranceNominationData[3].dateOfBirth)
  //         : ""
  //     );

  //     setInLawNominee1Dob(
  //       candidateInsuranceNominationData[2] &&
  //         candidateInsuranceNominationData[2].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[2].dateOfBirth !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[2]).length !== 0 &&
  //         candidateInsuranceNominationData[2].relationship !== null &&
  //         candidateInsuranceNominationData[2].relationship !== undefined &&
  //         candidateInsuranceNominationData[2].relationship === "Father In-Law"
  //         ? new Date(candidateInsuranceNominationData[2].dateOfBirth)
  //         : ""
  //     );
  //     setInLawNominee2Dob(
  //       candidateInsuranceNominationData[3] &&
  //         candidateInsuranceNominationData[3].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[3].dateOfBirth !== undefined &&
  //         Object.keys(candidateInsuranceNominationData[3]).length !== 0 &&
  //         candidateInsuranceNominationData[3].relationship !== null &&
  //         candidateInsuranceNominationData[3].relationship !== undefined &&
  //         candidateInsuranceNominationData[3].relationship === "Mother In-Law"
  //         ? new Date(candidateInsuranceNominationData[3].dateOfBirth)
  //         : ""
  //     );
  //     setNominee5DOB(
  //       candidateInsuranceNominationData[4] &&
  //         candidateInsuranceNominationData[4].dateOfBirth !== null &&
  //         candidateInsuranceNominationData[4].dateOfBirth !== undefined
  //         ? new Date(candidateInsuranceNominationData[4].dateOfBirth)
  //         : null
  //     );
  //   }
  // }, [candidateInsuranceNominationData]);

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
    console.log("Relatio nshipItem---->", itemState);
    if ((itemState !== "") & (itemState !== "Relationship")) {
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
      console.log("sucess-->", dateItem);
      return true;
    } else {
      setError(true);
      console.log("sucess-->", dateItem);
      return false;
    }
  };
  const CheckValidationsNomine_1 = () => {
    if (addFirst === true) {
      if (
        (AgeErrorValidation(state.age, setageError_1) === true) &
        (NomineeNameValidation(state.nominiName, setNomineerror_1) === true) &
        DOBValidation(Nominee1DOB, setDobError_1) &
        (validateSelectInput(state.gender, setGenderError_1, "Gender") ===
          true) &
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
    } else {
      return true;
    }
  };

  const CheckValidationsNomine_extra1 = () => {
    if (addExtraFirst === true) {
      if (
        (AgeErrorValidation(state.extra1age, setExtra1ageError_1) === true) &
        (NomineeNameValidation(
          state.extra1nominiName,
          setExtra1Nomineerror_1
        ) ===
          true) &
        DOBValidation(extra1Nominee1DOB, setExtra1DobError_1) &
        (validateSelectInput(
          state.extra1gender,
          setExtra1GenderError_1,
          "Gender"
        ) ===
          true) &
        (validateSelectInput(
          state.extra1relationship,
          setExtra1RelationshipError_1,
          "Relationship"
        ) ===
          true) &
        (validateSelectInput(
          state.extra1bloodGroup,
          setExtra1BloodGroupError_1,
          "Blood Group"
        ) ===
          true)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const CheckValidationsNomine_2 = () => {
    if (addSecond === true) {
      if (
        (AgeErrorValidation(state.nominee2Age, setageError_2) === true) &
        (NomineeNameValidation(state.nominee2NominiName, setNomineerror_2) ===
          true) &
        (validateSelectInput(
          state.nominee2Gender,
          setGenderError_2,
          "Gender"
        ) ===
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
    } else {
      return true;
    }
  };

  const CheckValidationsNomine_extra2 = () => {
    if (addExtraSecond === true) {
      if (
        (AgeErrorValidation(state.extra2age, setExtra2ageError_1) === true) &
        (NomineeNameValidation(
          state.extra2nominiName,
          setExtra2Nomineerror_1
        ) ===
          true) &
        DOBValidation(extra2Nominee1DOB, setExtra2DobError_1) &
        (validateSelectInput(
          state.extra2gender,
          setExtra2GenderError_1,
          "Gender"
        ) ===
          true) &
        (validateSelectInput(
          state.extra2relationship,
          setExtra2RelationshipError_1,
          "Relationship"
        ) ===
          true) &
        (validateSelectInput(
          state.extra2bloodGroup,
          setExtra2BloodGroupError_1,
          "Blood Group"
        ) ===
          true)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const CheckValidationsNomine_3 = () => {
    if (
      addOne === true &&
      NAcheck === false &&
      InlawCheck === false &&
      parentsCheck === true
    ) {
      console.log("AddONEEEEEEEEEEEEEEE", addOne);
      if (
        (AgeErrorValidation(state.nominee3Age, setageError_3) === true) &
        (NomineeNameValidation(state.nominee3NominiName, setNomineerror_3) ===
          true) &
        (validateSelectInput(
          state.nominee3Gender,
          setGenderError_3,
          "Gender"
        ) ===
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
    } else {
      return true;
    }
  };
  const CheckValidationsNomine_4 = () => {
    if (
      addTwo === true &&
      NAcheck === false &&
      InlawCheck === false &&
      parentsCheck === true
    ) {
      if (
        (AgeErrorValidation(state.nominee4Age, setageError_4) === true) &
        (NomineeNameValidation(state.nominee4NominiName, setNomineerror_4) ===
          true) &
        (validateSelectInput(
          state.nominee4Gender,
          setGenderError_4,
          "Gender"
        ) ===
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
    } else {
      return true;
    }
  };
  const CheckValidationsNomine_5 = () => {
    if (addThird === true) {
      if (
        (AgeErrorValidation(state.nominee5Age, setageError_5) === true) &
        (NomineeNameValidation(state.nominee5NominiName, setNomineerror_5) ===
          true) &
        (validateSelectInput(
          state.nominee5Gender,
          setGenderError_5,
          "Gender"
        ) ===
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
    } else {
      return true;
    }
  };
  const CheckValidationsNomine_51 = () => {
    if (addExtraThird === true) {
      if (
        (AgeErrorValidation(state.nominee5Age1, setageError_51) === true) &
        (NomineeNameValidation(state.nominee5NominiName1, setNomineerror_51) ===
          true) &
        (validateSelectInput(
          state.nominee5Gender1,
          setGenderError_51,
          "Gender"
        ) ===
          true) &
        DOBValidation(Nominee5DOB1, setDobError_51) &
        (validateSelectInput(
          state.nominee5Relationship1,
          setRelationshipError_51,
          "Relationship"
        ) ===
          true) &
        (validateSelectInput(
          state.nominee5BloodGroup1,
          setBloodGroupError_51,
          "Blood Group"
        ) ===
          true)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const CheckValidationsNomine_6 = () => {
    if (
      addFirstInLaw === true &&
      NAcheck === false &&
      parentsCheck === false &&
      InlawCheck === true
    ) {
      if (
        (AgeErrorValidation(state.In_law_nominee1Age, setInLawAgeError_1) ===
          true) &
        (NomineeNameValidation(
          state.In_law_nominee1NominiName,
          setInLawNomineerror_1
        ) ===
          true) &
        (validateSelectInput(
          state.In_law_nominee1Gender,
          setInLawGenderError_1,
          "Gender"
        ) ===
          true) &
        DOBValidation(In_law_Nominee1DOB, setInLawDobError_1) &
        (validateSelectInput(
          state.In_law_nominee1Relationship,
          setInLawRelationshipError_1,
          "Relationship"
        ) ===
          true) &
        (validateSelectInput(
          state.In_law_nominee1BloodGroup,
          setInLawBloodGroupError_1,
          "Blood Group"
        ) ===
          true)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const CheckValidationsNomine_7 = () => {
    if (
      addFirstInLaw === true &&
      NAcheck === false &&
      parentsCheck === false &&
      InlawCheck === true
    ) {
      if (
        (AgeErrorValidation(state.In_law_nominee2Age, setInLawAgeError_2) ===
          true) &
        (NomineeNameValidation(
          state.In_law_nominee2NominiName,
          setInLawNomineerror_2
        ) ===
          true) &
        (validateSelectInput(
          state.In_law_nominee2Gender,
          setInLawGenderError_2,
          "Gender"
        ) ===
          true) &
        DOBValidation(In_law_Nominee2DOB, setInLawDobError_2) &
        (validateSelectInput(
          state.In_law_nominee2Relationship,
          setInLawRelationshipError_2,
          "Relationship"
        ) ===
          true) &
        (validateSelectInput(
          state.In_law_nominee2BloodGroup,
          setInLawBloodGroupError_2,
          "Blood Group"
        ) ===
          true)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const checkAllValidations = () => {
    if (
      (CheckValidationsNomine_1() === true) &
      (CheckValidationsNomine_2() === true) &
      (CheckValidationsNomine_3() === true) &
      (CheckValidationsNomine_4() === true) &
      (CheckValidationsNomine_5() === true) &
      (CheckValidationsNomine_6() === true) &
      (CheckValidationsNomine_7() === true) &
      (CheckValidationsNomine_extra1() === true) &
      (CheckValidationsNomine_extra2() === true) &
      (CheckValidationsNomine_51() === true)
    ) {
      return true;
    } else {
      console.log("All errors");
      return false;
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
    // if (nominee5Relationship !== "") {
    //   state.nominee3Relationship = "Brother";
    // }

    state.extra1relationship = "Father";
    state.extra2relationship = "Mother";

    // state.relationship = "Father";
    // state.nominee2Relationship = "Mother";
    state.nominee3Relationship = "Father";
    state.nominee4Relationship = "Mother";

    state.In_law_nominee1Relationship = "Father In-Law";
    state.In_law_nominee2Relationship = "Mother In-Law";

    if (marriedStatus === true) {
      state.extra1relationship = "Father";
      state.extra2relationship = "Mother";
    } else {
      state.relationship = "Spouse";
      state.nominee2Relationship = "Child 1";
    }

    if (checkAllValidations() === true) {
      const CountOFNominees = NomineeCount;
      const first_nomine_info = {
        age: state.age !== null ? state.age : null,
        bloodGroup: state.bloodGroup !== null ? state.bloodGroup : null,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: Nominee1DOB !== null ? Nominee1DOB : null,
        gender: state.gender !== null ? state.gender : null,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 8,
        nominiId: state.nominiId,
        nominiName: state.nominiName !== null ? state.nominiName : null,
        relationship: state.relationship !== null ? state.relationship : null,
      };
      const second_nomine_info = {
        age: state.nominee2Age,
        bloodGroup: state.nominee2BloodGroup,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: Nominee2DOB,
        gender: state.nominee2Gender,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 9,
        nominiId: state.nominee2NominiId,
        nominiName: state.nominee2NominiName,
        relationship: state.nominee2Relationship,
      };
      const third_nomine_info = {
        age: state.nominee3Age,
        bloodGroup: state.nominee3BloodGroup,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: Nominee3DOB,
        gender: state.nominee3Gender,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 3,
        nominiId: state.nominee3NominiId,
        nominiName: state.nominee3NominiName,
        relationship: state.nominee3Relationship,
      };
      const fourth_nomine_info = {
        age: state.nominee4Age,
        bloodGroup: state.nominee4BloodGroup,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: Nominee4DOB,
        gender: state.nominee2Gender,

        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 4,
        nominiId: state.nominee4NominiId,
        nominiName: state.nominee4NominiName,
        relationship: state.nominee4Relationship,
      };
      const fifth_nomine_info = {
        age: state.nominee5Age,
        bloodGroup: state.nominee5BloodGroup,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: Nominee5DOB,
        gender: state.nominee5Gender,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 5,
        nominiId: state.nominee5NominiId,
        nominiName: state.nominee5NominiName,
        relationship: state.nominee5Relationship,
      };

      const sixth_nomine_info = {
        age: state.In_law_nominee1Age,
        bloodGroup: state.In_law_nominee1BloodGroup,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: In_law_Nominee1DOB,
        gender: state.In_law_nominee1Gender,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 6,
        nominiId: state.In_law_nominee1NominiId,
        nominiName: state.In_law_nominee1NominiName,
        relationship: state.In_law_nominee1Relationship,
      };
      const seventh_nomine_info = {
        age: state.In_law_nominee2Age,
        bloodGroup: state.In_law_nominee2BloodGroup,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: In_law_Nominee2DOB,
        gender: state.In_law_nominee2Gender,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 7,
        nominiId: state.In_law_nominee2NominiId,
        nominiName: state.In_law_nominee2NominiName,
        relationship: state.In_law_nominee2Relationship,
      };

      const Eight_nomine_info = {
        age: state.extra1age !== null ? state.extra1age : null,
        bloodGroup:
          state.extra1bloodGroup !== null ? state.extra1bloodGroup : null,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: extra1Nominee1DOB !== null ? extra1Nominee1DOB : null,
        gender: state.extra1gender !== null ? state.extra1gender : null,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 1,
        nominiId: state.extra1nominiId,
        nominiName:
          state.extra1nominiName !== null ? state.extra1nominiName : null,
        relationship:
          state.extra1relationship !== null ? state.extra1relationship : null,
      };
      const Ninenth_nomine_info = {
        age: state.extra2age !== null ? state.extra2age : null,
        bloodGroup:
          state.extra2bloodGroup !== null ? state.extra2bloodGroup : null,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: extra2Nominee1DOB !== null ? extra2Nominee1DOB : null,
        gender: state.extra2gender !== null ? state.extra2gender : null,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 2,
        nominiId: state.extra2nominiId,
        nominiName:
          state.extra2nominiName !== null ? state.extra2nominiName : null,
        relationship:
          state.extra2relationship !== null ? state.extra2relationship : null,
      };

      const tenth_nomine_info = {
        age: state.nominee5Age1,
        bloodGroup: state.nominee5BloodGroup1,
        candidateId:
          candidateProfileData &&
          candidateProfileData !== null &&
          candidateProfileData !== undefined &&
          candidateProfileData.candidateId !== null
            ? candidateProfileData.candidateId
            : 0,
        dateOfBirth: Nominee5DOB1,
        gender: state.nominee5Gender1,
        nomineeVariant: marriedStatus
          ? 0
          : parentsCheck
          ? 1
          : InlawCheck
          ? 2
          : 3,
        nomineeType: 10,
        nominiId: state.nominee5NominiId1,
        nominiName: state.nominee5NominiName1,
        relationship: state.nominee5Relationship1,
      };

      const NominiInfo = [{}, {}, {}, {}, {}];
      var itemIncrease = 0;

      if (addFirst === true) {
        console.log("one", NominiInfo);
        NominiInfo[itemIncrease] = first_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if (addSecond === true) {
        console.log("two", NominiInfo);
        NominiInfo[itemIncrease] = second_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if (addThird === true) {
        console.log("three", NominiInfo);
        NominiInfo[itemIncrease] = fifth_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if ((addOne === true) & (NAcheck === false) & (parentsCheck === true)) {
        console.log("four", NominiInfo);
        NominiInfo[itemIncrease] = third_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if ((addTwo === true) & (NAcheck === false) & (parentsCheck === true)) {
        console.log("five", NominiInfo);
        NominiInfo[itemIncrease] = fourth_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if (
        (addFirstInLaw === true) &
        (NAcheck === false) &
        (InlawCheck === true)
      ) {
        console.log("five", NominiInfo);
        NominiInfo[itemIncrease] = sixth_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if (
        (addFirstInLaw === true) &
        (NAcheck === false) &
        (InlawCheck === true)
      ) {
        console.log("five", NominiInfo);
        NominiInfo[itemIncrease] = seventh_nomine_info;
        itemIncrease = itemIncrease + 1;
      }

      if (addExtraFirst === true) {
        console.log("eigth");
        NominiInfo[itemIncrease] = Eight_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if (addExtraSecond === true) {
        console.log("eigth");
        NominiInfo[itemIncrease] = Ninenth_nomine_info;
        itemIncrease = itemIncrease + 1;
      }
      if (addExtraThird === true) {
        console.log("eigth");
        NominiInfo[itemIncrease] = tenth_nomine_info;
        itemIncrease = itemIncrease + 1;
      }

      //   const NominiInfo =
      //     CountOFNominees === 0
      //       ? [first_nomine_info]
      //       : CountOFNominees === 1
      //       ? [first_nomine_info, second_nomine_info]
      //       : CountOFNominees === 2
      //       ? [first_nomine_info, second_nomine_info, third_nomine_info]
      //       : CountOFNominees === 3
      //       ? [
      //           first_nomine_info,
      //           second_nomine_info,
      //           third_nomine_info,
      //           fourth_nomine_info,
      //         ]
      //       : CountOFNominees === 4
      //       ? [
      //           first_nomine_info,
      //           second_nomine_info,
      //           third_nomine_info,
      //           fourth_nomine_info,
      //           fifth_nomine_info,
      //         ]
      //       : [];

      if (NominiInfo.length < 5) {
        console.log("nominee length", NominiInfo.length);
        let len = 5 - NominiInfo.length;
        console.log("nominee adjust length", len);
        // for (let i = 0; i <= len; i++) {
        //   console.log("------>", len);
        //   NominiInfo[NominiInfo.length + i] = {};
        // }
      }
      console.log(NominiInfo);
      CreateNominee(NominiInfo);
      const nextPage = props.NextStep;
      nextPage(true);
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };

  const dateOfBirthHandler = (date, key) => {
    if (date !== null) {
      var AdjusteddateValue = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      var ageDifMs = Date.now() - new Date(AdjusteddateValue).getTime();
      var ageDate = new Date(ageDifMs);
      var finalAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      console.log("_________>>", finalAge);
    } else {
      var AdjusteddateValue = "";
      var finalAge = "";
    }
    switch (key) {
      case "1":
        setNominee1DOB(AdjusteddateValue);
        state.age = finalAge;
        console.log("Nomineee1Dob");
        break;
      case "2":
        setNominee2DOB(AdjusteddateValue);
        state.nominee2Age = finalAge;
        console.log("Nomineee2Dob");
        break;
      case "3":
        setNominee3DOB(AdjusteddateValue);
        console.log("Nomineee3Dob");
        state.nominee3Age = finalAge;
        break;
      case "4":
        setNominee4DOB(AdjusteddateValue);
        console.log("Nomineee4Dob");
        state.nominee4Age = finalAge;
        break;
      case "5":
        setNominee5DOB(AdjusteddateValue);
        console.log("Nomineee5Dob");
        state.nominee5Age = finalAge;
        break;
      case "6":
        setInLawNominee1Dob(AdjusteddateValue);
        console.log("setInLawNominee1Dob");
        state.In_law_nominee1Age = finalAge;
        break;
      case "7":
        setInLawNominee2Dob(AdjusteddateValue);
        console.log("Nomineee5Dob");
        state.In_law_nominee2Age = finalAge;
        break;
      case "11":
        setExtra1Nominee1DOB(AdjusteddateValue);
        state.extra1age = finalAge;
        console.log("Nomineee11Dob");
        break;
      case "12":
        setExtra2Nominee1DOB(AdjusteddateValue);
        state.extra2age = finalAge;
        console.log("Nomineee11Dob");
        break;
      case "51":
        setNominee5DOB1(AdjusteddateValue);
        console.log("Nomineee5Dob");
        state.nominee5Age1 = finalAge;
        break;

      default:
        break;
    }
  };
  const DeleteFirst = () => {
    setAddFirst(false);
  };
  const DeleteSecond = () => {
    setAddSecond(false);
    if (
      state.nominee2NominiId !== 0 &&
      state.nominee2NominiId !== "" &&
      state.nominee2NominiId !== null &&
      state.nominee2NominiId !== undefined
    ) {
      console.log("deleting", state.nominee2NominiId);
      InsuranceNominationDelete(state.nominee2NominiId);
      state.nominee2Age = "";
      state.nominee2BloodGroup = "";
      state.nominee2Gender = "";
      state.nominee2NominiId = "";
      state.nominee2NominiName = "";
      state.nominee2Relationship = "";
      setNominee2DOB("");
    }
  };
  const DeleteThird = () => {
    setAddThird(false);
  };
  const DeleteOne = () => {
    setAddOne(false);
  };
  const DeleteTwo = () => {
    setAddTwo(false);
  };
  const AddOneMore = () => {
    if (addFirst === false) {
      setAddFirst(true);
    } else if (addSecond === false) {
      setAddSecond(true);
    } else {
      setAddThird(true);
    }
  };
  const addOneMoreExtra = () => {
    if (addExtraFirst === false) {
      setAddExtraFirst(true);
    } else if (addExtraSecond === false) {
      setAddExtraSecond(true);
    } else {
      setAddExtraThird(true);
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
  const RelChangeHandler = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  console.log("----------->", NominForm1);

  const handleParentCheckboxChange = (e) => {
    if (parentsCheck === true) {
      setParentCheck(false);
    }
    if (InlawCheck === true) {
      setInlawCheck(false);
    }
    if (NAcheck === true) {
      setNAcheck(false);
    }
    setParentCheck(true);
    // setAddFirstInLaw(false);
    // setAddSecondInLaw(false);
    // setAddOne(true);
    // setAddTwo(true);
  };
  const handleInLawCheckboxChange = (e) => {
    if (parentsCheck === true) {
      setParentCheck(false);
    }
    if (InlawCheck === true) {
      setInlawCheck(false);
    }
    if (NAcheck === true) {
      setNAcheck(false);
    }
    setInlawCheck(true);
    // setAddOne(false);
    // setAddTwo(false);
    // setAddFirstInLaw(true);
    // setAddSecondInLaw(true);
  };
  const handleNACheckboxChange = (e) => {
    if (parentsCheck === true) {
      setParentCheck(false);
    }
    if (InlawCheck === true) {
      setInlawCheck(false);
    }
    if (NAcheck === true) {
      setNAcheck(false);
    }
    setNAcheck(true);
    // setAddOne(false);
    // setAddTwo(false);
    // setAddFirstInLaw(false);
    // setAddSecondInLaw(false);
  };

  return (
    <Fragment>
      {/* <Form onSubmit={submitHandler}>  */}
      <ToastContainer />
      <Row style={{ marginBottom: "2rem" }} className="CheckBoxField">
        <Col sm={3}>
          <div>
            <label>
              <b>Candidate Name:</b>
              &nbsp;&nbsp; {InfoState.empName}
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Gender:</b>
              &nbsp;&nbsp; {InfoState.gender}
            </label>
          </div>
        </Col>
        <Col sm={3}>
          <div>
            <label>
              <b>Date Of Birth:</b>
              &nbsp;&nbsp; {InfoState.dateOfBirth}
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Age:</b>
              &nbsp;&nbsp;{age}
            </label>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label>
              <b>Blood Group:</b>
              &nbsp;&nbsp; {InfoState.bloodGroup}
            </label>
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
      {addFirst === true ? (
        <div>
          {/* first Nominee */}
          <label>
            <b>First Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominiName"
                      value={state.nominiName}
                      onChange={changeHandler}
                      required
                      style={nomineNameError_1 ? { borderColor: "red" } : {}}
                      placeholder="Dependent Name"
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
                      defaultValue={"Spouse"}
                      //   onChange={}
                      onChange={changeHandler}
                      style={relationshipError_1 ? { borderColor: "red" } : {}}
                    >
                      {relativeInLaw === true ? (
                        <option value="Spouse">Spouse</option>
                      ) : (
                        <option value="Father">Father</option>
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
            {/* {relativeInLaw === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteFirst();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
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

      {/* In-laws extra one */}
      {addExtraFirst === true ? (
        <div>
          {/* first Nominee */}
          <label>
            <b>First Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="extra1nominiName"
                      value={state.extra1nominiName}
                      onChange={changeHandler}
                      required
                      style={
                        extra1nomineNameError_1 ? { borderColor: "red" } : {}
                      }
                      placeholder="Dependent Name"
                    />
                    {extra1nomineNameError_1 ? (
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
                      name="extra1relationship"
                      value={state.extra1relationship}
                      defaultValue={"Spouse"}
                      //   onChange={}
                      onChange={changeHandler}
                      style={
                        extra1relationshipError_1 ? { borderColor: "red" } : {}
                      }
                    >
                      <option value="Father">Father</option>
                    </Form.Control>
                    {extra1relationshipError_1 ? (
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
                      name="extra1gender"
                      value={state.extra1gender}
                      onChange={changeHandler}
                      style={extra1genderError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                    {extra1genderError_1 ? (
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
            {/* {relativeInLaw === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteFirst();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        extra1DOBError_1 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={extra1Nominee1DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "11")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={extra1DOBError_1 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {extra1DOBError_1 ? (
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
                      name="extra1age"
                      value={state.extra1age}
                      onChange={changeHandler}
                      style={extra1ageError_1 ? { borderColor: "red" } : {}}
                    />
                    {extra1ageError_1 ? (
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
                      name="extra1bloodGroup"
                      value={state.extra1bloodGroup}
                      onChange={changeHandler}
                      style={
                        extra1bloodGroupError_1 ? { borderColor: "red" } : {}
                      }
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
                    {extra1bloodGroupError_1 ? (
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

      {addSecond === true ? (
        <div>
          <label>
            <b>Second Dependent</b>
          </label>
          {/* second Nominee */}
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Second Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee2NominiName"
                      value={state.nominee2NominiName}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
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
                      {relativeInLaw === true ? (
                        <option value="">Child 1</option>
                      ) : (
                        <option value="">Mother</option>
                      )}
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
            {/* {isChecked === false ? ( */}
            {relativeInLaw === true ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteSecond();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
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

      {/* In-laws extra two */}
      {addExtraSecond === true ? (
        <div>
          {/* first Nominee */}
          <label>
            <b>Second Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="extra2nominiName"
                      value={state.extra2nominiName}
                      onChange={changeHandler}
                      required
                      style={
                        extra2nomineNameError_1 ? { borderColor: "red" } : {}
                      }
                      placeholder="Dependent Name"
                    />
                    {extra2nomineNameError_1 ? (
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
                      name="extra2relationship"
                      value={state.extra2relationship}
                      defaultValue={"Spouse"}
                      //   onChange={}
                      onChange={changeHandler}
                      style={
                        extra2relationshipError_1 ? { borderColor: "red" } : {}
                      }
                    >
                      <option value="Mother">Mother</option>
                    </Form.Control>
                    {extra2relationshipError_1 ? (
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
                      name="extra2gender"
                      value={state.extra2gender}
                      onChange={changeHandler}
                      style={extra2genderError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                    {extra2genderError_1 ? (
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
            {/* {relativeInLaw === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteFirst();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        extra2DOBError_1 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={extra2Nominee1DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "12")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={extra2DOBError_1 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {extra2DOBError_1 ? (
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
                      name="extra2age"
                      value={state.extra2age}
                      onChange={changeHandler}
                      style={extra2ageError_1 ? { borderColor: "red" } : {}}
                    />
                    {extra2ageError_1 ? (
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
                      name="extra2bloodGroup"
                      value={state.extra2bloodGroup}
                      onChange={changeHandler}
                      style={
                        extra2bloodGroupError_1 ? { borderColor: "red" } : {}
                      }
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
                    {extra2bloodGroupError_1 ? (
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

      {addThird === true ? (
        <div>
          {/* Fifth Nominee */}
          <label>
            <b>Third Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee5NominiName"
                      value={state.nominee5NominiName}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
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

                      {relativeInLaw === true ? (
                        <option value="Child 2">Child 2</option>
                      ) : (
                        <option value="Brother">Brother</option>
                      )}
                      {relativeInLaw === true ? (
                        <option value="Child 3">Child 3</option>
                      ) : (
                        <option value="Sister">Sister</option>
                      )}
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
            {/* {isChecked === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteThird();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
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

      {addExtraThird === true ? (
        <div>
          {/* Fifth Nominee */}
          <label>
            <b>Third Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee5NominiName1"
                      value={state.nominee5NominiName1}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
                      required="required"
                      style={nomineNameError_51 ? { borderColor: "red" } : {}}
                    />
                    {nomineNameError_51 ? (
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
                      name="nominee5Relationship1"
                      value={state.nominee5Relationship1}
                      options={relativesList}
                      onChange={changeHandler}
                      style={relationshipError_51 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>

                      {relativeInLaw === true ? (
                        <option value="Child 2">Child 2</option>
                      ) : (
                        <option value="Brother">Brother</option>
                      )}
                      {relativeInLaw === true ? (
                        <option value="Child 3">Child 3</option>
                      ) : (
                        <option value="Sister">Sister</option>
                      )}
                    </Form.Control>

                    {relationshipError_51 ? (
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
                      name="nominee5Gender1"
                      value={state.nominee5Gender1}
                      onChange={changeHandler}
                      style={genderError_51 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                    {genderError_51 ? (
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
            {/* {isChecked === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteThird();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        DOBError_51 ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={Nominee5DOB1}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "51")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={DOBError_51 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {DOBError_51 ? (
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
                      name="nominee5Age1"
                      value={state.nominee5Age1}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={ageError_51 ? { borderColor: "red" } : {}}
                    />
                    {ageError_51 ? (
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
                      name="nominee5BloodGroup1"
                      value={state.nominee5BloodGroup1}
                      onChange={changeHandler}
                      style={bloodGroupError_51 ? { borderColor: "red" } : {}}
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
                    {bloodGroupError_51 ? (
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
      {buttonOne === true &&
      (addExtraSecond === false) | (addExtraThird === false) ? (
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={() => {
                    addOneMoreExtra();
                  }}
                  disabled={false}
                  style={{ width: "175px" }}
                >
                  <b> Add New Dependent + </b>
                </button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {buttonTwo === true && (addSecond === false) | (addThird === false) ? (
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={() => {
                    AddOneMore();
                  }}
                  disabled={false}
                  style={{ width: "175px" }}
                >
                  <b> Add New Dependent + </b>
                </button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {marriedStatus === false ? (
        <Row>
          <Col sm={3} style={{ marginTop: "2rem" }}>
            <label>Do you want to add dependent as</label>
          </Col>
          <Col sm={2} style={{ marginTop: "2rem" }}>
            <Form.Group>
              <div className="boxField_1 input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  //   style={genderError ? { borderColor: "red" } : {}}
                  value="Male"
                  checked={parentsCheck}
                  //required={required}
                  onChange={handleParentCheckboxChange}
                />
                <label>Parents</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2} style={{ marginTop: "2rem" }}>
            <Form.Group>
              <div className="boxField_1 input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  //   style={genderError ? { borderColor: "red" } : {}}
                  value="Female"
                  //   required={required}
                  checked={InlawCheck}
                  onChange={handleInLawCheckboxChange}
                />
                <label>In-Laws</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2} style={{ marginTop: "2rem" }}>
            <Form.Group>
              <div className="boxField_1 input">
                <input
                  className="largerCheckbox"
                  type="checkbox"
                  //   style={genderError ? { borderColor: "red" } : {}}
                  value="Other"
                  //   required={required}
                  checked={NAcheck}
                  onChange={handleNACheckboxChange}
                />
                <label>NA</label>
              </div>
            </Form.Group>
          </Col>
        </Row>
      ) : (
        ""
      )}

      {parentsCheck === true && addOne === true && marriedStatus === false ? (
        <div>
          {/* Third Nominee  */}
          <label>
            <b>First Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee3NominiName"
                      value={state.nominee3NominiName}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
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
                      <option value="">Father</option>
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
            {/* {isChecked === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteOne();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
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
      {parentsCheck === true && addTwo === true && marriedStatus === false ? (
        <div>
          {/* fourth Nominee Name */}
          <label>
            <b>Second Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nominee4NominiName"
                      value={state.nominee4NominiName}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
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
                      <option value="">Mother</option>
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
            {/* {isChecked === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteTwo();
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
                      &nbsp; Date Of Birth
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

      {/* In- law component */}

      {InlawCheck === true &&
      addFirstInLaw === true &&
      marriedStatus === false ? (
        <div>
          {/* Third Nominee  */}
          <label>
            <b>First Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="In_law_nominee1NominiName"
                      value={state.In_law_nominee1NominiName}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
                      required="required"
                      style={
                        In_law_nomineNameError_1 ? { borderColor: "red" } : {}
                      }
                    />
                    {In_law_nomineNameError_1 ? (
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
                      name="In_law_nominee1Relationship"
                      value={state.In_law_nominee1Relationship}
                      options={relativesList}
                      onChange={changeHandler}
                      style={
                        In_law_relationshipError_1 ? { borderColor: "red" } : {}
                      }
                    >
                      <option value="">Father In-Law</option>
                    </Form.Control>
                    {In_law_relationshipError_1 ? (
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
                      name="In_law_nominee1Gender"
                      value={state.In_law_nominee1Gender}
                      onChange={changeHandler}
                      style={In_law_genderError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>

                    {In_law_genderError_1 ? (
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
            {/* {isChecked === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteOne();
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        In_law_DOBError_1
                          ? "onBoard-date-error"
                          : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={In_law_Nominee1DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "6")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={In_law_DOBError_1 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {In_law_DOBError_1 ? (
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
                      name="In_law_nominee1Age"
                      value={state.In_law_nominee1Age}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={In_law_ageError_1 ? { borderColor: "red" } : {}}
                    />
                    {In_law_ageError_1 ? (
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
                      name="In_law_nominee1BloodGroup"
                      value={state.In_law_nominee1BloodGroup}
                      onChange={changeHandler}
                      style={
                        In_law_bloodGroupError_1 ? { borderColor: "red" } : {}
                      }
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
                    {In_law_bloodGroupError_1 ? (
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
      {InlawCheck === true &&
      addSecondInLaw === true &&
      marriedStatus === false ? (
        <div>
          {/* fourth Nominee Name */}
          <label>
            <b>Second Dependent</b>
          </label>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={11}>
              <Row>
                <div className="col-sm-4">
                  <Form.Group>
                    <Form.Label>
                      Dependent Name
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="In_law_nominee2NominiName"
                      value={state.In_law_nominee2NominiName}
                      onChange={changeHandler}
                      placeholder="Dependent Name"
                      required="required"
                      style={
                        In_law_nomineNameError_2 ? { borderColor: "red" } : {}
                      }
                    />
                    {In_law_nomineNameError_2 ? (
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
                      name="In_law_nominee2Relationship"
                      value={state.In_law_nominee2Relationship}
                      options={relativesList}
                      onChange={changeHandler}
                      style={
                        In_law_relationshipError_2 ? { borderColor: "red" } : {}
                      }
                    >
                      <option value="">Mother In-Law</option>
                    </Form.Control>

                    {In_law_relationshipError_2 ? (
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
                      name="In_law_nominee2Gender"
                      value={state.In_law_nominee2Gender}
                      onChange={changeHandler}
                      style={In_law_genderError_2 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>

                    {In_law_genderError_2 ? (
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
            {/* {isChecked === false ? ( */}
            {false ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteTwo();
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
                      &nbsp; Date Of Birth
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        In_law_DOBError_2
                          ? "onBoard-date-error"
                          : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={In_law_Nominee2DOB}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "7")}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={In_law_DOBError_2 ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {In_law_DOBError_2 ? (
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
                      name="In_law_nominee2Age"
                      value={state.In_law_nominee2Age}
                      onChange={changeHandler}
                      placeholder="Age"
                      required="required"
                      style={In_law_ageError_2 ? { borderColor: "red" } : {}}
                    />
                    {In_law_ageError_2 ? (
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
                      name="In_law_nominee2BloodGroup"
                      value={state.In_law_nominee2BloodGroup}
                      onChange={changeHandler}
                      style={
                        In_law_bloodGroupError_2 ? { borderColor: "red" } : {}
                      }
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
                    {In_law_bloodGroupError_2 ? (
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
