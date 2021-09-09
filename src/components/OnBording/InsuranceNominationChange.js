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
import moment from "moment";
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
    DeleteAllInsuranceNominations,
    UpdateNomineeStatus,
    deleteAllNomineeData,
    documentView,
    documentViewData,
    uploadFile,
    insuranceTopUpView,
    insuranceTopUpData,
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
  const [relationshipError_11, setRelationshipError_11] = useState(false);
  const [relationshipError_12, setRelationshipError_12] = useState(false);
  const [DOBError_1, setDobError_1] = useState(false);

  const [extra1ageError_1, setExtra1ageError_1] = useState(false);
  const [extra1bloodGroupError_1, setExtra1BloodGroupError_1] = useState(false);
  const [extra1genderError_1, setExtra1GenderError_1] = useState(false);
  const [extra1nomineNameError_1, setExtra1Nomineerror_1] = useState(false);
  const [extra1relationshipError_1, setExtra1RelationshipError_1] =
    useState(false);
  const [extra1relationshipError_11, setExtra1RelationshipError_11] =
    useState(false);
  const [extra1relationshipError_12, setExtra1RelationshipError_12] =
    useState(false);
  const [extra1DOBError_1, setExtra1DobError_1] = useState(false);

  const [extra2ageError_1, setExtra2ageError_1] = useState(false);
  const [extra2bloodGroupError_1, setExtra2BloodGroupError_1] = useState(false);
  const [extra2genderError_1, setExtra2GenderError_1] = useState(false);
  const [extra2nomineNameError_1, setExtra2Nomineerror_1] = useState(false);
  const [extra2relationshipError_1, setExtra2RelationshipError_1] =
    useState(false);
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
  const [relationshipError_31, setRelationshipError_31] = useState(false);
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
  const [In_law_relationshipError_1, setInLawRelationshipError_1] =
    useState(false);
  const [In_law_relationshipError_11, setInLawRelationshipError_11] =
    useState(false);
  const [In_law_DOBError_1, setInLawDobError_1] = useState(false);

  const [In_law_ageError_2, setInLawAgeError_2] = useState(false);
  const [In_law_bloodGroupError_2, setInLawBloodGroupError_2] = useState(false);
  const [In_law_genderError_2, setInLawGenderError_2] = useState(false);
  const [In_law_nomineNameError_2, setInLawNomineerror_2] = useState(false);
  const [In_law_relationshipError_2, setInLawRelationshipError_2] =
    useState(false);
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
  const [NAcheck2, setNAcheck2] = useState(false);
  const [disable, setDisable] = useState(false);
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
  const [topupYes, setTopupYes] = useState(true);
  const [topupNo, setTopupNo] = useState(false);
  const [topupError, setTopupError] = useState(false);
  const [sumInsured, setSumInsured] = useState("");
  const [topupValueError, setTopupValueError] = useState(false);
  const [insuranceHoldDeathYes, setInsuranceHoldDeathYes] = useState(true);
  const [insuranceHoldDeathNo, setInsuranceHoldDeathNo] = useState(false);
  const [required, setRequired] = useState(true);
  const [insuranceHoldDeathError, setInsuranceHoldDeathError] = useState(false);
  const [nomineeValue, setNomineeValue] = useState(0);
  const [nomineeNameError, setNomineeNameError] = useState(false);

  const [nomineeRelationshipError, setNomineeRelationshipError] =
    useState(false);
  const [nomineeDocStatus, setNomineeDocStatus] = useState(false);
  const [nomineeDOBError, setNomineeDOBError] = useState(false);
  const [nomineeDOB, setNomineeDOB] = useState();

  const [nomineeAddressError, setNomineeAddressError] = useState(false);
  const [stateNomine, setStateNomine] = useState({
    insurenceForm: "",
  });
  const [ObjNomineState, setObjNomineState] = useState({
    insurenceForm: "",
  });
  const [nomineuploade, setNomineUploade] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);
  const [premiumAmnt, setPremiumAmnt] = useState("");
  const [nominee, setNominee] = useState({
    nomineeName: "",
    nomineeRelationship: "",
    nomineeAddress: "",
  });
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
    relationship: "Spouse",

    NAnominiId: 0,

    nominee2Age: "",
    nominee2BloodGroup: "",
    nominee2Gender: "",
    nominee2NominiId: 0,
    nominee2NominiName: "",
    nominee2Relationship: "",

    nominee3Age: "",
    nominee3BloodGroup: "",
    nominee3Gender: "Male",
    nominee3NominiId: 0,
    nominee3NominiName: "",
    nominee3Relationship: "Father",

    nominee4Age: "",
    nominee4BloodGroup: "",
    nominee4Gender: "",
    nominee4NominiId: 0,
    nominee4NominiName: "",
    nominee4Relationship: "",

    In_law_nominee1Age: "",
    In_law_nominee1BloodGroup: "",
    In_law_nominee1Gender: "Male",
    In_law_nominee1NominiId: 0,
    In_law_nominee1NominiName: "",
    In_law_nominee1Relationship: "Father In-Law",

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
    extra1gender: "Male",
    extra1nominiId: 0,
    extra1nominiName: "",
    extra1relationship: "Father",

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

  // console.log("contract type-->", candidateViewInfo.contractType);
  useEffect(() => {
    console.log("current year", moment().format("YYYY"));
    let currentYear = moment().format("YYYY");
    if (currentYear !== "") {
      insuranceTopUpView(currentYear);
    }
  }, [candidateProfileData]);

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
      if (
        candidatePersonalInfoData &&
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined
      ) {
        console.log(
          "disabledInsuranceNominee",
          candidatePersonalInfoData.disabledInsuranceNominee
        );
        // if (candidatePersonalInfoData.disabledInsuranceNominee !== NAcheck2) {
        if (
          candidatePersonalInfoData.disabledInsuranceNominee === true &&
          NAcheck2 === false
        ) {
          handleNACheckboxChange2(
            candidatePersonalInfoData.disabledInsuranceNominee
          );
          // setNAcheck2(true);
          // setDisable(true);
          console.log("If-loop");

          state.extra1age = "";
          state.extra1bloodGroup = "";
          state.extra1gender = "Male";
          state.extra1nominiId = 0;
          state.extra1nominiName = "";
          state.extra1relationship = "Father";

          state.extra2age = "";
          state.extra2bloodGroup = "";
          state.extra2gender = "";
          state.extra2nominiId = 0;
          state.extra2nominiName = "";
          state.extra2relationship = "";
          setExtra1Nominee1DOB("");
          setExtra2Nominee1DOB("");
          console.log("NAAAAAAAAAAA1");
        } else if (
          candidatePersonalInfoData.disabledInsuranceNominee === false &&
          NAcheck2 === true
        ) {
          console.log("NAAAAAAAAAAA2");
          handleNACheckboxChange2(
            candidatePersonalInfoData.disabledInsuranceNominee
          );
          // setNAcheck2(false);
          // setDisable(false);
        }
        // }
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
      documentViewData &&
      documentViewData !== null &&
      documentViewData !== undefined &&
      candidateInsuranceNominationData &&
      candidateInsuranceNominationData !== null &&
      candidateInsuranceNominationData !== undefined &&
      Object.keys(candidateInsuranceNominationData).length !== 0 &&
      Object.keys(documentViewData).length !== 0
    ) {
      console.log("inside condition 1", candidateInsuranceNominationData);
      let insuranceDoc = "";

      if (
        candidateInsuranceNominationData[0].insuranceNominationHoldDeath ===
        true
      ) {
        console.log("inside condition 2", documentViewData);
        documentViewData.map((item) => {
          console.log("item.documentType", item.documentType, item);
          if (item.documentType === 24 && item.documentName) {
            insuranceDoc = item.documentName ? item.documentName : "";
            setNomineUploade(true);
            setNomineeDocStatus(item.status ? item.status : 0);
          }

          setStateNomine({
            insurenceForm: insuranceDoc,
          });
        });
        console.log("documents prefill", insuranceDoc);
      } else {
        setNomineUploade(false);
        setStateNomine({
          insurenceForm: "",
        });
      }
    }
  }, [documentViewData, candidateInsuranceNominationData]);

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

      state.age = "";
      state.bloodGroup = "";
      state.gender = "";
      state.nominiId = 0;
      state.nominiName = "";
      state.relationship = "Spouse";

      state.NAnominiId = 0;

      state.nominee2Age = "";
      state.nominee2BloodGroup = "";
      state.nominee2Gender = "";
      state.nominee2NominiId = 0;
      state.nominee2NominiName = "";
      state.nominee2Relationship = "";

      state.nominee3Age = "";
      state.nominee3BloodGroup = "";
      state.nominee3Gender = "Male";
      state.nominee3NominiId = 0;
      state.nominee3NominiName = "";
      state.nominee3Relationship = "Father";

      state.nominee4Age = "";
      state.nominee4BloodGroup = "";
      state.nominee4Gender = "";
      state.nominee4NominiId = 0;
      state.nominee4NominiName = "";
      state.nominee4Relationship = "";

      state.In_law_nominee1Age = "";
      state.In_law_nominee1BloodGroup = "";
      state.In_law_nominee1Gender = "Male";
      state.In_law_nominee1NominiId = 0;
      state.In_law_nominee1NominiName = "";
      state.In_law_nominee1Relationship = "Father In-Law";

      state.In_law_nominee2Age = "";
      state.In_law_nominee2BloodGroup = "";
      state.In_law_nominee2Gender = "";
      state.In_law_nominee2NominiId = 0;
      state.In_law_nominee2NominiName = "";
      state.In_law_nominee2Relationship = "";

      state.nominee5Age = "";
      state.nominee5BloodGroup = "";
      state.nominee5Gender = "";
      state.nominee5NominiId = 0;
      state.nominee5NominiName = "";
      state.nominee5Relationship = "";

      state.nominee5Age1 = "";
      state.nominee5BloodGroup1 = "";
      state.nominee5Gender1 = "";
      state.nominee5NominiId1 = 0;
      state.nominee5NominiName1 = "";
      state.nominee5Relationship1 = "";

      state.extra1age = "";
      state.extra1bloodGroup = "";
      state.extra1gender = "Male";
      state.extra1nominiId = 0;
      state.extra1nominiName = "";
      state.extra1relationship = "Father";

      state.extra2age = "";
      state.extra2bloodGroup = "";
      state.extra2gender = "";
      state.extra2nominiId = 0;
      state.extra2nominiName = "";
      state.extra2relationship = "";
      setExtra1Nominee1DOB("");
      setExtra2Nominee1DOB("");
      setNominee1DOB("");
      setNominee2DOB("");
      setNominee3DOB("");
      setNominee4DOB("");
      setNominee5DOB("");
      setNominee5DOB1("");
      setInLawNominee1Dob("");
      setInLawNominee2Dob("");
      setAddExtraSecond(false);
      setAddExtraThird(false);
      setAddThird(false);
      // setNAcheck2(false);
      setAddSecondInLaw(false);
      setAddSecond(false);
      setAddTwo(false);

      candidateInsuranceNominationData.map((item, i) => {
        console.log(item.nomineeType);

        if (item.nomineeType === 20) {
          state.NAnominiId = item.nominiId;
        }
        if (
          item.nomineeType === 1 &&
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
          // setDisable(false);
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
              console.log("inside parent");
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
      // setAddExtraFirst(true);
      // setAddExtraSecond(true);
      setAddFirstInLaw(false);
      setAddSecondInLaw(false);
      setAddFirst(false);
      setAddSecond(false);
      setAddOne(false);
      setAddTwo(false);
      // state.relationship = "Father";
      // state.nominee2Relationship = "Mother";
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
        // setParentCheck(false);
        // setInlawCheck(false);
        // setNAcheck(false);
        setAddExtraFirst(true);
        // setAddExtraSecond(true);
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
        // state.relationship = "Father";
        // state.nominee2Relationship = "Mother";
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
        //setAddSecondInLaw(true);
        setAddFirst(true); //Raz
        // setAddSecond(true);
        setAddOne(true);
        // setAddTwo(true);
        setAddExtraFirst(false);
        setAddExtraSecond(false);
        setButtonOne(false);
        setButtonTwo(true);
        // state.relationship = "Spouse";
        // state.nominee2Relationship = "Child 1";
      } else {
        setMarriedStatus(true);
        setRelativeType(false);
        setParentCheck(false);
        setInlawCheck(false);
        setNAcheck(false);
        console.log("e3");
        setAddExtraFirst(true); //Raz
        setAddExtraSecond(true); //Raz
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        setAddFirst(false);
        setAddSecond(false);
        setAddOne(false);
        setAddTwo(false);
        // state.relationship = "Father";
        // state.nominee2Relationship = "Mother";
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
        console.log("e2");
        setAddExtraSecond(true); //raz
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
        // state.relationship = "Father";
        // state.nominee2Relationship = "Mother";
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
        // state.relationship = "Spouse";
        // state.nominee2Relationship = "Child 1";
      } else {
        setMarriedStatus(true);
        setRelativeType(false);
        setParentCheck(false);
        setInlawCheck(false);
        setNAcheck(false);
        setAddExtraFirst(true);
        console.log("e1");
        setAddExtraSecond(true); //raz
        setAddFirstInLaw(false);
        setAddSecondInLaw(false);
        setAddFirst(false);
        setAddSecond(false);
        setAddOne(false);
        setAddTwo(false);
        // state.relationship = "Father";
        // state.nominee2Relationship = "Mother";
        setButtonTwo(false);
        setButtonOne(true);
      }
    }
  }, [
    candidateInsuranceNominationData,
    candidatePersonalInfoData,
    candidateProfileData,
    deleteNomineeData,
  ]);

  useEffect(() => {
    documentView(candidateProfileData.candidateId);
  }, [candidateProfileData]);
  console.log("documentViewData", documentViewData);
  useEffect(() => {
    if (
      insuranceTopUpData !== null &&
      insuranceTopUpData !== undefined &&
      Object.keys(insuranceTopUpData).length !== 0
    ) {
      console.log("insuranceTopUpData", insuranceTopUpData);
      if (sumInsured !== "") {
        var premiumValue = insuranceTopUpData.filter(
          (item) => item.sum == sumInsured
        );
        console.log("premiumAmnt", premiumValue[0]);
        setPremiumAmnt(premiumValue[0].premiumAmt);
      }
    }
  }, [insuranceTopUpData, sumInsured]);
  useEffect(() => {
    if (
      candidateInsuranceNominationData !== undefined &&
      candidateInsuranceNominationData !== null &&
      Object.keys(candidateInsuranceNominationData).length !== 0
    ) {
      candidateInsuranceNominationData.map((item) => {
        console.log("TopupYesChange", item.topUpInsured);
        if (item.topUpInsured == true) {
          setTopupYes(true);
          setTopupNo(false);
          setSumInsured(item.sumInsured);
          setPremiumAmnt(item.premiumAmount);
        } else {
          setTopupYes(false);
          setTopupNo(true);
          setSumInsured("");
          setPremiumAmnt("");
        }
      });
    }
  }, [candidateInsuranceNominationData]);
  useEffect(() => {
    // if (
    //   candidateInsuranceNominationData !== undefined &&
    //   candidateInsuranceNominationData !== null &&
    //   Object.keys(candidateInsuranceNominationData).length !== 0 &&
    //   candidateInsuranceNominationData[0].insuranceNominationHoldDeath !==
    //     undefined &&
    //   candidateInsuranceNominationData[0].insuranceNominationHoldDeath == true
    // ) {
    //   setInsuranceHoldDeathYes(
    //     candidateInsuranceNominationData[0].insuranceNominationHoldDeath
    //   );
    //   setInsuranceHoldDeathNo(false);
    // } else if (
    //   candidateInsuranceNominationData !== undefined &&
    //   candidateInsuranceNominationData !== null &&
    //   Object.keys(candidateInsuranceNominationData).length !== 0 &&
    //   candidateInsuranceNominationData[0].insuranceNominationHoldDeath !==
    //     undefined &&
    //   candidateInsuranceNominationData[0].insuranceNominationHoldDeath == false
    // ) {
    //   setInsuranceHoldDeathNo(true);
    //   setInsuranceHoldDeathYes(false);
    // }

    // if (
    //   candidateInsuranceNominationData !== undefined &&
    //   candidateInsuranceNominationData !== null &&
    //   Object.keys(candidateInsuranceNominationData).length !== 0 &&
    //   candidateInsuranceNominationData[0].insuranceNominationHoldDeath ===
    //     true &&
    //   candidateInsuranceNominationData[0].candidateInsuranceDeathNomination !==
    //     null &&
    //   candidateInsuranceNominationData[0].candidateInsuranceDeathNomination !==
    //     undefined &&
    //   candidateInsuranceNominationData[0].candidateInsuranceDeathNomination
    //     .nomineeId !== undefined
    // ) {
    //   console.log(
    //     "candidateInsuranceNominationData.nomineeId",
    //     candidateInsuranceNominationData[0].candidateInsuranceDeathNomination
    //       .nomineeId
    //   );
    //   setNomineeValue(
    //     candidateInsuranceNominationData[0].candidateInsuranceDeathNomination
    //       .nomineeId
    //   );
    // }

    if (
      candidateInsuranceNominationData !== undefined &&
      candidateInsuranceNominationData !== null &&
      Object.keys(candidateInsuranceNominationData).length !== 0
    ) {
      candidateInsuranceNominationData.map((item) => {
        if (
          item.insuranceNominationHoldDeath === true &&
          item.candidateInsuranceDeathNomination !== null &&
          item.candidateInsuranceDeathNomination !== undefined &&
          Object.keys(item.candidateInsuranceDeathNomination) !== 0
        ) {
          setInsuranceHoldDeathYes(item.insuranceNominationHoldDeath);
          setInsuranceHoldDeathNo(false);
          setNomineeValue(item.candidateInsuranceDeathNomination.nomineeId);
          setNomineeDOB(
            new Date(item.candidateInsuranceDeathNomination.dateOfBirth)
          );
          setNominee({
            nomineeAddress: item.candidateInsuranceDeathNomination.address,
            nomineeName: item.candidateInsuranceDeathNomination.nomineeName,
            nomineeRelationship:
              item.candidateInsuranceDeathNomination.relationship,
          });
        }
      });
    }
  }, [candidateInsuranceNominationData]);

  const TopupYesChange = () => {
    console.log("TopupYesChange");
    setTopupYes(true);
    setTopupNo(false);
  };

  const TopupNoChange = () => {
    console.log("TopupNoChange");
    setTopupNo(true);
    setTopupYes(false);
    setSumInsured("");
    setPremiumAmnt("");
  };

  const nomineeHandler = (e) => {
    console.log("inside nominee handler");
    setNominee({
      ...nominee,
      [e.target.name]: e.target.value,
    });
    console.log("nominee", nominee);
  };

  const nomineeNameValidation = () => {
    if (insuranceHoldDeathYes === true) {
      if (
        nominee.nomineeName !== null &&
        nominee.nomineeName !== undefined &&
        nominee.nomineeName !== ""
      ) {
        setNomineeNameError(false);
        return true;
      } else {
        setNomineeNameError(true);
        return false;
      }
    } else {
      return true;
    }
  };

  const nomineeDobValidation = () => {
    if (insuranceHoldDeathYes === true) {
      if (
        nomineeDOB !== null &&
        nomineeDOB !== undefined &&
        nomineeDOB !== ""
      ) {
        console.log("uan number");
        setNomineeDOBError(false);
        return true;
      } else {
        setNomineeDOBError(true);
        return false;
      }
    } else {
      return true;
    }
  };

  const nomineeRelationValidation = () => {
    if (insuranceHoldDeathYes === true) {
      if (
        nominee.nomineeRelationship !== null &&
        nominee.nomineeRelationship !== undefined &&
        nominee.nomineeRelationship !== ""
      ) {
        console.log("uan number");
        setNomineeRelationshipError(false);
        return true;
      } else {
        setNomineeRelationshipError(true);
        return false;
      }
    } else {
      return true;
    }
  };

  const nomineeAddressValidation = () => {
    if (insuranceHoldDeathYes === true) {
      if (
        nominee.nomineeAddress !== null &&
        nominee.nomineeAddress !== undefined &&
        nominee.nomineeAddress !== ""
      ) {
        setNomineeAddressError(false);
        return true;
      } else {
        setNomineeAddressError(true);
        return false;
      }
    } else {
      return true;
    }
  };

  const nomineeDateOfBirthHandler = (e) => {
    console.log("selected date", e);
    let minAge = moment().subtract(18, "years");
    console.log("minAge1", minAge);
    if (moment(e).isBefore(minAge)) {
      console.log("birth date is above 18 years");
      setNomineeDOB(e);
      setNomineeDOBError(false);
    } else {
      console.log("birth date is below 18 years");
      setNomineeDOB(e);
      setNomineeDOBError(true);
    }
  };

  const DocChangeHandler = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    setStateNomine({
      ...stateNomine,
      [event.target.name]: fileObj.name,
    });
    setObjNomineState({
      ...ObjNomineState,
      [event.target.name]: fileObj,
    });
    if (event.target.name === "insurenceForm") {
      setNomineUploade(false);
    }
  };

  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    console.log("upload image", ObjNomineState, stateNomine);
    let fileType;
    let fileUpload;
    if (event.target.name === "insurenceForm") {
      if (insuranceValidation() === true) {
        setNomineUploade(true);
        fileUpload = ObjNomineState.insurenceForm;
        fileType = 24;
      }
    }

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
  };
  const sumInsuredChange = (e) => {
    console.log("sumInsuredChange", e.target.value);
    setSumInsured(e.target.value);
  };
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
  const DOBValidation = (dateItem, setError, relationItem) => {
    let dob = new Date(dateItem);
    let now = new Date();
    if (
      relationItem === "Child 1" ||
      relationItem === "Child 2" ||
      relationItem === "Child 3" ||
      relationItem === "Brother" ||
      relationItem === "Sister"
    ) {
      if (dateItem !== "") {
        setError(false);
        console.log("sucess-->", dateItem);
        return true;
      } else {
        setError(true);
        console.log("sucess-->", dateItem);
        return false;
      }
    } else {
      if ((now - dob > 568024668000) & (dateItem !== "")) {
        setError(false);
        console.log("sucess-->", dateItem);
        return true;
      } else {
        setError(true);
        console.log("sucess-->", dateItem);
        return false;
      }
    }
  };

  const insuranceValidation = () => {
    if (stateNomine.insurenceForm !== "") {
      setInsuranceError(false);
      console.log("insurenceFormSucess");
      return true;
    } else {
      setInsuranceError(true);
      console.log("insurenceFormFail");
      return false;
    }
  };

  const insuranceUploadValidation = () => {
    if (insuranceHoldDeathYes === true) {
      if (nomineuploade === false) {
        if (insuranceValidation() === true) {
          setInsuranceError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const CheckValidationsNomine_1 = () => {
    if (addFirst === true) {
      if (
        (AgeErrorValidation(state.age, setageError_1) === true) &
        (NomineeNameValidation(state.nominiName, setNomineerror_1) === true) &
        DOBValidation(Nominee1DOB, setDobError_1, state.relationship) &
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
        DOBValidation(
          extra1Nominee1DOB,
          setExtra1DobError_1,
          state.extra1relationship
        ) &
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
        DOBValidation(Nominee2DOB, setDobError_2, state.nominee2Relationship) &
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
        DOBValidation(
          extra2Nominee1DOB,
          setExtra2DobError_1,
          state.extra2relationship
        ) &
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
        DOBValidation(Nominee3DOB, setDobError_3, state.nominee3Relationship) &
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
        DOBValidation(Nominee4DOB, setDobError_4, state.nominee4Relationship) &
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
        DOBValidation(Nominee5DOB, setDobError_5, state.nominee5Relationship) &
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
        DOBValidation(
          Nominee5DOB1,
          setDobError_51,
          state.nominee5Relationship1
        ) &
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
        DOBValidation(
          In_law_Nominee1DOB,
          setInLawDobError_1,
          state.In_law_nominee1Relationship
        ) &
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
      InlawCheck === true &&
      addSecondInLaw === true
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
        DOBValidation(
          In_law_Nominee2DOB,
          setInLawDobError_2,
          state.In_law_nominee2Relationship
        ) &
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

  const relCompareSecondInLaw = () => {
    if (addSecondInLaw === true) {
      state.In_law_nominee2Relationship = "Mother In-Law";
      console.log(
        "comparing the",
        state.In_law_nominee1Relationship,
        state.In_law_nominee2Relationship
      );
      if (
        state.In_law_nominee1Relationship === state.In_law_nominee2Relationship
      ) {
        setInLawRelationshipError_11(true);
        return false;
      } else {
        setInLawRelationshipError_11(false);
        return true;
      }
    } else {
      setInLawRelationshipError_11(false);
      return true;
    }
  };
  const relCompareChild1 = () => {
    if (addSecond === true) {
      state.nominee2Relationship = "Child 1";
      console.log("compare-", state.relationship, state.nominee2Relationship);
      if (state.relationship === state.nominee2Relationship) {
        setRelationshipError_11(true);
        return false;
      } else {
        setRelationshipError_11(false);
        return true;
      }
    } else {
      setRelationshipError_11(false);
      return true;
    }
  };
  const relCompareChild2 = () => {
    if (addThird === true) {
      console.log("compare-", state.relationship, state.nominee5Relationship);
      if (state.relationship === state.nominee5Relationship) {
        setRelationshipError_12(true);
        return false;
      } else {
        setRelationshipError_12(false);
        return true;
      }
    } else {
      setRelationshipError_12(false);
      return true;
    }
  };

  const relCompareParent2 = () => {
    if (addTwo === true) {
      state.nominee4Relationship = "Mother";
      console.log(
        "compare-",
        state.nominee4Relationship,
        state.nominee3Relationship
      );
      if (state.nominee3Relationship === state.nominee4Relationship) {
        setRelationshipError_31(true);
        return false;
      } else {
        setRelationshipError_31(false);
        return true;
      }
    } else {
      setRelationshipError_31(false);
      return true;
    }
  };

  const relCompareExtra2 = () => {
    if (addExtraSecond === true) {
      state.extra2relationship = "Mother";
      if (state.extra2relationship === state.extra1relationship) {
        setExtra1RelationshipError_11(true);
        return false;
      } else {
        setExtra1RelationshipError_11(false);
        return true;
      }
    } else {
      setRelationshipError_11(false);
      return true;
    }
  };
  const relCompareExtra3 = () => {
    if (addExtraThird === true) {
      if (state.nominee5Relationship1 === state.extra1relationship) {
        setExtra1RelationshipError_12(true);
        return false;
      } else {
        setExtra1RelationshipError_12(false);
        return true;
      }
    } else {
      setExtra1RelationshipError_12(false);
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
      (CheckValidationsNomine_51() === true) &
      (relCompareSecondInLaw() === true) &
      (relCompareChild1() === true) &
      (relCompareChild2() === true) &
      (relCompareParent2() === true) &
      (relCompareExtra2() === true) &
      (relCompareExtra3() === true) &
      (nomineeNameValidation() === true) &
      (nomineeDobValidation() === true) &
      (nomineeAddressValidation() === true) &
      (nomineeRelationValidation() === true) &
      (insuranceUploadValidation() === true)
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
  const insuranceHoldDeathYesChange = (e) => {
    console.log("insuranceHoldDeathYesChange");
    setInsuranceHoldDeathYes(true);
    setInsuranceHoldDeathNo(false);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const insuranceHoldDeathNoChange = (e) => {
    console.log("insuranceHoldDeathNoChange");
    setInsuranceHoldDeathNo(true);
    setInsuranceHoldDeathYes(false);

    {
      required ? setRequired(!required) : setRequired(required);
    }
    setNomineUploade(false);
    setStateNomine({
      insurenceForm: "",
    });
    setNomineeDOB();
    setNominee({
      nomineeAddress: "",
      nomineeName: "",
      nomineeRelationship: "",
    });
  };
  const submitHandler = (e) => {
    // const nextPage = props.NextStep;
    // nextPage();
    // if (nominee5Relationship !== "") {
    //   state.nominee3Relationship = "Brother";
    // }

    // for unmarried
    console.log("submit", insuranceHoldDeathYes, insuranceHoldDeathNo);
    if (NAcheck2 === true) {
      if (
        (nomineeNameValidation() === true) &
        (nomineeDobValidation() === true) &
        (nomineeAddressValidation() === true) &
        (nomineeRelationValidation() === true) &
        (insuranceUploadValidation() === true)
      ) {
        if (
          candidateInsuranceNominationData &&
          candidateInsuranceNominationData !== null &&
          candidateInsuranceNominationData !== undefined &&
          Object.keys(candidateInsuranceNominationData).length !== 0
        ) {
          DeleteAllInsuranceNominations(candidateProfileData.candidateId);
        }
        UpdateNomineeStatus(candidateProfileData.candidateId, NAcheck2);
        // updating the one object if na checked
        const NAInfo = {
          age: 0,
          bloodGroup: null,
          candidateId:
            candidateProfileData &&
            candidateProfileData !== null &&
            candidateProfileData !== undefined &&
            candidateProfileData.candidateId !== null
              ? candidateProfileData.candidateId
              : 0,
          dateOfBirth: null,
          gender: null,
          nomineeVariant: 20,
          nomineeType: 20,
          nominiId: state.NAnominiId,
          nominiName: null,
          relationship: null,
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
        };
        CreateNominee([NAInfo]);
        const nextPage = props.NextStep;
        nextPage(true);
      }
    } else {
      state.extra2relationship = "Mother";
      state.extra2gender = "Female";
      // for married
      state.nominee2Relationship = "Child 1";

      state.nominee4Relationship = "Mother";
      state.nominee4Gender = "Female";
      state.In_law_nominee2Relationship = "Mother In-Law";
      state.In_law_nominee2Gender = "Female";

      if (checkAllValidations() === true) {
        if (
          state.NAnominiId !== 0 &&
          state.NAnominiId !== null &&
          state.NAnominiId !== undefined
        ) {
          InsuranceNominationDelete(state.NAnominiId);
        }
        if (parentsCheck === true) {
          if (
            state.In_law_nominee1NominiId !== 0 &&
            state.In_law_nominee1NominiId !== null &&
            state.In_law_nominee1NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.In_law_nominee1NominiId);
          }
          if (
            state.In_law_nominee2NominiId !== 0 &&
            state.In_law_nominee2NominiId !== null &&
            state.In_law_nominee2NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.In_law_nominee2NominiId);
          }
        } else if (InlawCheck === true) {
          if (
            state.nominee3NominiId !== 0 &&
            state.nominee3NominiId !== null &&
            state.nominee3NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.nominee3NominiId);
          }
          if (
            state.nominee4NominiId !== 0 &&
            state.nominee4NominiId !== null &&
            state.nominee4NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.nominee4NominiId);
          }
        } else if (NAcheck === true) {
          if (
            state.nominee3NominiId !== 0 &&
            state.nominee3NominiId !== null &&
            state.nominee3NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.nominee3NominiId);
          }
          if (
            state.nominee4NominiId !== 0 &&
            state.nominee4NominiId !== null &&
            state.nominee4NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.nominee4NominiId);
          }
          if (
            state.In_law_nominee1NominiId !== 0 &&
            state.In_law_nominee1NominiId !== null &&
            state.In_law_nominee1NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.In_law_nominee1NominiId);
          }
          if (
            state.In_law_nominee2NominiId !== 0 &&
            state.In_law_nominee2NominiId !== null &&
            state.In_law_nominee2NominiId !== undefined
          ) {
            InsuranceNominationDelete(state.In_law_nominee2NominiId);
          }
        }

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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          premiumAmount: premiumAmnt,
          sumInsured: sumInsured,
          topUpInsured: topupYes === true ? true : false,
          insuranceNominationHoldDeath:
            insuranceHoldDeathYes === true ? true : false,
          candidateInsuranceDeathNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
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
          console.log("addOne", NominiInfo);
          NominiInfo[itemIncrease] = third_nomine_info;
          itemIncrease = itemIncrease + 1;
        }
        if ((addTwo === true) & (NAcheck === false) & (parentsCheck === true)) {
          console.log("addTwo", NominiInfo);
          NominiInfo[itemIncrease] = fourth_nomine_info;
          itemIncrease = itemIncrease + 1;
        }
        if (
          (addFirstInLaw === true) &
          (NAcheck === false) &
          (InlawCheck === true)
        ) {
          console.log("addFirstInlaw", NominiInfo);
          NominiInfo[itemIncrease] = sixth_nomine_info;
          itemIncrease = itemIncrease + 1;
        }
        if (
          (addSecondInLaw === true) &
          (NAcheck === false) &
          (InlawCheck === true)
        ) {
          console.log("addSecondInLaw", NominiInfo);
          NominiInfo[itemIncrease] = seventh_nomine_info;
          itemIncrease = itemIncrease + 1;
        }

        if (addExtraFirst === true) {
          console.log("addExtraFirst");
          NominiInfo[itemIncrease] = Eight_nomine_info;
          itemIncrease = itemIncrease + 1;
        }
        if (addExtraSecond === true) {
          console.log("addExtraSecond");
          NominiInfo[itemIncrease] = Ninenth_nomine_info;
          itemIncrease = itemIncrease + 1;
        }
        if (addExtraThird === true) {
          console.log("addExtraThird");
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
        UpdateNomineeStatus(candidateProfileData.candidateId, NAcheck2);
        const nextPage = props.NextStep;
        nextPage(true);
      }
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

  const DeleteExtra2 = () => {
    setAddExtraSecond(false);
    console.log("at delete", state.In_law_nominee2NominiId);
    if (
      state.extra2nominiId !== 0 &&
      state.extra2nominiId !== null &&
      state.extra2nominiId !== undefined
    ) {
      console.log("deleting", state.extra2nominiId);
      InsuranceNominationDelete(state.extra2nominiId);
    }
  };
  const DeleteExtra3 = () => {
    setAddExtraThird(false);
    console.log("at delete", state.nominee5NominiId1);
    if (
      state.nominee5NominiId1 !== 0 &&
      state.nominee5NominiId1 !== null &&
      state.nominee5NominiId1 !== undefined
    ) {
      console.log("deleting", state.nominee5NominiId1);
      InsuranceNominationDelete(state.nominee5NominiId1);
    }
  };
  const DeleteInLaw2 = () => {
    setAddSecondInLaw(false);
    if (
      state.In_law_nominee2NominiId !== 0 &&
      state.In_law_nominee2NominiId !== null &&
      state.In_law_nominee2NominiId !== undefined
    ) {
      console.log("deleting", state.In_law_nominee2NominiId);
      InsuranceNominationDelete(state.In_law_nominee2NominiId);
    }
  };
  const DeleteParent2 = () => {
    setAddTwo(false);
    if (
      state.nominee4NominiId !== 0 &&
      state.nominee4NominiId !== null &&
      state.nominee4NominiId !== undefined
    ) {
      console.log("deleting", state.nominee4NominiId);
      InsuranceNominationDelete(state.nominee4NominiId);
    }
  };
  const DeleteThird = () => {
    setAddThird(false);
    if (
      state.nominee5NominiId !== 0 &&
      state.nominee5NominiId !== null &&
      state.nominee5NominiId !== undefined
    ) {
      console.log("deleting", state.nominee5NominiId);
      InsuranceNominationDelete(state.nominee5NominiId);
    }
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
  const addingInLaw2 = () => {
    setAddSecondInLaw(true);
  };
  const addingParent2 = () => {
    setAddTwo(true);
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
    console.log("change handler", e.target.name, e.target.value);

    if (
      e.target.name === "extra1relationship" &&
      (e.target.value === "Father" || e.target.value === "Brother")
    ) {
      setState({
        ...state,
        extra1gender: "Male",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "extra1relationship" &&
      (e.target.value === "Mother" || e.target.value === "Sister")
    ) {
      setState({
        ...state,
        extra1gender: "Female",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "extra2relationship" &&
      e.target.value === "Mother"
    ) {
      setState({
        ...state,
        extra2gender: "Female",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "nominee5Relationship1" &&
      e.target.value === "Brother"
    ) {
      setState({
        ...state,
        nominee5Gender1: "Male",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "nominee5Relationship1" &&
      e.target.value === "Sister"
    ) {
      setState({
        ...state,
        nominee5Gender1: "Female",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "nominee3Relationship" &&
      e.target.value === "Father"
    ) {
      setState({
        ...state,
        nominee3Gender: "Male",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "nominee3Relationship" &&
      e.target.value === "Mother"
    ) {
      setState({
        ...state,
        nominee3Gender: "Female",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "nominee4Relationship" &&
      e.target.value === "Mother"
    ) {
      setState({
        ...state,
        nominee4Gender: "Female",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "In_law_nominee1Relationship" &&
      e.target.value === "Father In-Law"
    ) {
      setState({
        ...state,
        In_law_nominee1Gender: "Male",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "In_law_nominee1Relationship" &&
      e.target.value === "Mother In-Law"
    ) {
      setState({
        ...state,
        In_law_nominee1Gender: "Female",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "In_law_nominee2Relationship" &&
      e.target.value === "Mother In-Law"
    ) {
      setState({
        ...state,
        In_law_nominee2Gender: "Female",
        [e.target.name]: e.target.value,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }

    console.log("complete state", state);
  };

  // const changeHandler = (e) => {
  //   console.log("change handler", e.target.name, e.target.value);
  //   if (
  //    ((e.target.name==="gender" || e.target.name==="extra1relationship" || e.target.name==="nominee2Gender"||e.taget.name==="nominee5Relationship1"||e.target.name==="nominee3Relationship"||e.target.name==="In_law_nominee1Relationship") && e.target.value === "Father" ||
  //     e.target.value === "Brother" ||
  //     e.target.value === "Father In-Law"
  //   ) {
  //     setState({
  //       ...state,
  //       [e.target.name]: "Male",
  //     });
  //   } else if (
  //    e.target.name==="extra2relationship"||e.target.name==="nominee5Relationship1"||e.target.name==="nominee3Relationship"||e.target.name==="nominee4Relationship"||e.target.name==="In_law_nominee1Relationship"||e.target.name==="In_law_nominee2Relationship" ||e.target.name==="extra1relationship" e.target.value === "Mother" ||
  //     e.target.value === "Sister" ||
  //     e.target.value === "Mother In-Law"
  //   ) {
  //     setState({
  //       ...state,
  //       [e.target.name]: "Female",
  //     });
  //   }else{
  //     setState({
  //       ...state,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  //   console.log(state);
  // };

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
  const handleNACheckboxChange2 = (val) => {
    if (val === true || val === false) {
      console.log("val", val);
      setDisable(val);
      setNAcheck2(val);
    } else {
      setDisable(!disable);
      setNAcheck2(!NAcheck2);
    }
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
      <Row>
        <Col sm={5}>
          <Form.Group>
            <label> If you don't have any one of these please check this</label>
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <div className="boxField_1 input">
              <input
                className="largerCheckbox"
                type="checkbox"
                //   style={genderError ? { borderColor: "red" } : {}}
                value="Other1"
                //   required={required}
                checked={NAcheck2}
                onChange={handleNACheckboxChange2}
              />
              <label>NA</label>
            </div>
          </Form.Group>
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
                      disabled={disable}
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
                      disabled={disable}
                      defaultValue={"Spouse"}
                      //   onChange={}
                      onChange={changeHandler}
                      style={
                        relationshipError_1 |
                        relationshipError_11 |
                        relationshipError_12
                          ? { borderColor: "red" }
                          : {}
                      }
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Myself">Myself</option>
                      <option value="Child 1">Child 1</option>
                      <option value="Child 2">Child 2</option>
                      <option value="Child 3">Child 3</option>
                    </Form.Control>
                    {relationshipError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relationship
                      </p>
                    ) : relationshipError_11 | relationshipError_12 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select another relationship
                      </p>
                    ) : (
                      ""
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
                      disabled={disable}
                      style={genderError_1 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
                        disabled={disable}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "1")}
                        maxDate={new Date()}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      //   onChange={}
                      disabled={disable}
                      onChange={changeHandler}
                      style={
                        extra1relationshipError_1 |
                        extra1relationshipError_11 |
                        extra1relationshipError_12
                          ? { borderColor: "red" }
                          : {}
                      }
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Myself">Myself</option>
                    </Form.Control>
                    {extra1relationshipError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relationship
                      </p>
                    ) : extra1relationshipError_11 |
                      extra1relationshipError_12 ? (
                      <p style={{ color: "red" }}>
                        &nbsp; *Please select another relationship
                      </p>
                    ) : (
                      ""
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
                      disabled={disable}
                      style={extra1genderError_1 ? { borderColor: "red" } : {}}
                    >
                      {/* <option value="">Gender</option> */}
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
                      disabled={disable}
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
                        maxDate={new Date()}
                        placeholderText="YYYY-MM-DD"
                        disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      onChange={changeHandler}
                      style={relationshipError_2 ? { borderColor: "red" } : {}}
                    >
                      <option value="Child 1">Child 1</option>
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
                      disabled={disable}
                      onChange={changeHandler}
                      style={genderError_2 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
                        maxDate={new Date()}
                        disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      style={extra2genderError_1 ? { borderColor: "red" } : {}}
                    >
                      {/* <option value="">Gender</option>
                      <option value="Male">Male</option> */}
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
            {true ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteExtra2();
                      }}
                      type="cancel"
                      disabled={disable}
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
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      style={relationshipError_5 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>
                      <option value="Child 2">Child 2</option>
                      <option value="Child 3">Child 3</option>
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
                      disabled={disable}
                      style={genderError_5 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
            {true ? (
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
                        disabled={disable}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "5")}
                        maxDate={new Date()}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      style={relationshipError_51 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Relationship</option>

                      <option value="Brother">Brother</option>

                      <option value="Sister">Sister</option>
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
                      disabled={disable}
                      onChange={changeHandler}
                      style={genderError_51 ? { borderColor: "red" } : {}}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
            {true ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteExtra3();
                      }}
                      type="cancel"
                      disabled={disable}
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
                        disabled={disable}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "51")}
                        maxDate={new Date()}
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
                      disabled={disable}
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
                      disabled={disable}
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
                  disabled={disable}
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
                  disabled={disable}
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
                  disabled={disable}
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
                  disabled={disable}
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
                  disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      style={
                        relationshipError_3 | relationshipError_31
                          ? { borderColor: "red" }
                          : {}
                      }
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                    </Form.Control>
                    {relationshipError_3 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relation ship
                      </p>
                    ) : relationshipError_31 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select another relation ship
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
                      disabled={disable}
                      style={genderError_3 ? { borderColor: "red" } : {}}
                    >
                      {/* <option value="">Gender</option> */}
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
                        maxDate={new Date()}
                        disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      onChange={changeHandler}
                      style={relationshipError_4 ? { borderColor: "red" } : {}}
                    >
                      <option value="Mother">Mother</option>
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
                      disabled={disable}
                      style={genderError_4 ? { borderColor: "red" } : {}}
                    >
                      {/* <option value="">Gender</option>
                      <option value="Male">Male</option> */}
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
            {true ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteParent2();
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
                        disabled={disable}
                        onChange={(e) => dateOfBirthHandler(e, "4")}
                        maxDate={new Date()}
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
                      disabled={disable}
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
                      disabled={disable}
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

      {parentsCheck === true && addTwo === false && marriedStatus === false ? (
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={() => {
                    addingParent2();
                  }}
                  disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      onChange={changeHandler}
                      style={
                        In_law_relationshipError_1 | In_law_relationshipError_11
                          ? { borderColor: "red" }
                          : {}
                      }
                    >
                      <option value="Father In-Law">Father In-Law</option>
                      <option value="Mother In-Law">Mother In-Law</option>
                    </Form.Control>
                    {In_law_relationshipError_1 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select relation ship
                      </p>
                    ) : In_law_relationshipError_11 ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select another relation ship
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
                      disabled={disable}
                      value={state.In_law_nominee1Gender}
                      onChange={changeHandler}
                      style={In_law_genderError_1 ? { borderColor: "red" } : {}}
                    >
                      {/* <option value="">Gender</option> */}
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
                        maxDate={new Date()}
                        disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
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
                      disabled={disable}
                      options={relativesList}
                      onChange={changeHandler}
                      style={
                        In_law_relationshipError_2 ? { borderColor: "red" } : {}
                      }
                    >
                      <option value="Mother In-Law">Mother In-Law</option>
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
                      disabled={disable}
                      onChange={changeHandler}
                      style={In_law_genderError_2 ? { borderColor: "red" } : {}}
                    >
                      {/* <option value="">Gender</option>
                      <option value="Male">Male</option> */}
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
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
            {true ? (
              <Col sm={1} style={{ marginLeft: "-2rem" }}>
                <Form.Group>
                  <div>
                    <button
                      onClick={() => {
                        DeleteInLaw2();
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
                        disabled={disable}
                        required
                        onChange={(e) => dateOfBirthHandler(e, "7")}
                        maxDate={new Date()}
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
                      disabled={disable}
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
                      disabled={disable}
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
      {InlawCheck === true &&
      addSecondInLaw === false &&
      marriedStatus === false ? (
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ padding: "0px 0px 0px 35px" }}>
            <Form.Group>
              <div>
                <button
                  className="buttonField  button"
                  onClick={() => {
                    addingInLaw2();
                  }}
                  disabled={disable}
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
      <Row style={{ marginTop: "2rem" }}>
        <Col sm={5}>
          <div>
            <label>Dependent for insurance hold good in case of Death </label>
          </div>
        </Col>
      </Row>

      {/* <Row style={{ marginTop: "2rem" }}>
        <Col sm={5}>
          <div>
            <label>Does the Insurance hold good in case of Death ?</label>
            {insuranceHoldDeathError ? (
              <p style={{ color: "red" }}> *Please select one of the option</p>
            ) : (
              <p></p>
            )}
          </div>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <div className="boxField input">
              <input
                className="largerCheckbox"
                type="checkbox"
                value="yes"
                checked={insuranceHoldDeathYes}
                required={required}
                onChange={insuranceHoldDeathYesChange}
              />
              <label>Yes</label>
            </div>
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <div className="boxField input">
              <input
                className="largerCheckbox"
                type="checkbox"
                value="no"
                checked={insuranceHoldDeathNo}
                required={required}
                onChange={insuranceHoldDeathNoChange}
              />
              <label>No </label>
            </div>
          </Form.Group>
        </Col>
      </Row> */}
      {insuranceHoldDeathYes === true ? (
        <div>
          {/* first Nominee */}
          <label>
            <b>Dependent</b>
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
                      name="nomineeName"
                      value={nominee.nomineeName}
                      onChange={nomineeHandler}
                      required
                      style={nomineeNameError ? { borderColor: "red" } : {}}
                      placeholder="Dependent Name"
                    />
                    {nomineeNameError ? (
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
                      name="nomineeRelationship"
                      value={nominee.nomineeRelationship}
                      onChange={nomineeHandler}
                      style={
                        nomineeRelationshipError ? { borderColor: "red" } : {}
                      }
                    >
                      <option value="">--Select--</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Father-inlaw">Father-In-Law</option>
                      <option value="Mother-Inlaw">Mother-In-Law</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child1">Child 1</option>
                      <option value="Child2">Child 2</option>
                    </Form.Control>
                    {nomineeRelationshipError ? (
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
                      Date Of Birth<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        nomineeDOBError ? "onBoard-date-error" : "onBoard-date"
                      }
                    >
                      <DatePicker
                        className="form-control onBoard-view"
                        selected={nomineeDOB}
                        required
                        onChange={(e) => nomineeDateOfBirthHandler(e, "1")}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        style={nomineeDOBError ? { borderColor: "red" } : {}}
                      />
                    </div>
                    {nomineeDOBError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please select valid date
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
                      Address<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div
                      className={
                        nomineeAddressError
                          ? "onBoard-date-error"
                          : "onBoard-date"
                      }
                    >
                      <Form.Control
                        type="text"
                        name="nomineeAddress"
                        value={nominee.nomineeAddress}
                        onChange={nomineeHandler}
                        required
                        style={
                          nomineeAddressError ? { borderColor: "red" } : {}
                        }
                        placeholder="Dependent Address"
                      />
                    </div>
                    {nomineeAddressError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp; *Please Enter valid address
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
          <Row>
            <Col sm={5}>
              <label>Please fill the forms below</label>
              <br />
              <a
                href={require("../../forms/Nomine_Nomination.pdf")}
                target="_blank"
              >
                Download Insurance Nomination Form
              </a>
              <br />
            </Col>
          </Row>

          <Row style={{ marginLeft: "-2rem", marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Insurance Nomination Form</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {stateNomine.insurenceForm !== "" &&
                    stateNomine.insurenceForm !== null &&
                    stateNomine.insurenceForm !== undefined
                      ? stateNomine.insurenceForm
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="insurenceForm"
                      style={{ display: "none" }}
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (nomineeDocStatus === 2 || nomineeDocStatus === 0)) ||
                        (candidateProfileData.verificationStatus === 0 &&
                          candidateProfileData.documentUploaded === 0)
                          ? false
                          : true
                      }
                      onChange={(e) => {
                        DocChangeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label
                    className={
                      (candidateProfileData.documentUploaded === 1 &&
                        candidateProfileData.verificationStatus === 2 &&
                        (nomineeDocStatus === 2 || nomineeDocStatus === 0)) ||
                      (candidateProfileData.verificationStatus === 0 &&
                        candidateProfileData.documentUploaded === 0)
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="insurenceForm"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (nomineeDocStatus === 2 || nomineeDocStatus === 0)) ||
                        (candidateProfileData.verificationStatus === 0 &&
                          candidateProfileData.documentUploaded === 0)
                          ? false
                          : true
                      }
                    />
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {insuranceError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                    Insurance Form
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      <Row style={{ marginBottom: "2rem" }}>
        <Col sm={5}>
          <div>
            <label>Do you want Topup ?</label>
            {topupError ? (
              <p style={{ color: "red" }}> *Please select one of the option</p>
            ) : (
              <p></p>
            )}
          </div>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <div className="boxField input">
              <input
                className="largerCheckbox"
                type="checkbox"
                value="yes"
                checked={topupYes}
                onChange={TopupYesChange}
              />
              <label>Yes</label>
            </div>
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <div className="boxField input">
              <input
                className="largerCheckbox"
                type="checkbox"
                value="no"
                checked={topupNo}
                onChange={TopupNoChange}
              />
              <label>No </label>
            </div>
          </Form.Group>
        </Col>
      </Row>

      {topupYes == true ? (
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={3}>
            <div>
              <label>
                Top Up Sum Insured<span style={{ color: "red" }}>*</span>
              </label>
            </div>
          </Col>
          <Col sm={5}>
            <Form.Group>
              <Form.Control
                as="select"
                name="insuredAmount"
                value={sumInsured}
                onChange={sumInsuredChange}
                required
                style={topupValueError ? { borderColor: "red" } : {}}
              >
                <option value="">--Select--</option>
                {insuranceTopUpData !== null &&
                  insuranceTopUpData !== undefined &&
                  insuranceTopUpData.length > 0 &&
                  insuranceTopUpData.map((item) => {
                    return (
                      <option key={item.insuranceNominationId}>
                        {item.sum}
                      </option>
                    );
                  })}
              </Form.Control>

              {topupValueError ? (
                <p style={{ color: "red" }}> &nbsp; *Please select Value</p>
              ) : (
                <p></p>
              )}
            </Form.Group>
          </Col>
          <Col sm={11}>
            <div>
              <label>* Premium amount to be changed = {premiumAmnt}</label>
            </div>
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
