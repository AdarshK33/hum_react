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
import { toast } from "react-toastify";

import { Search, PlusCircle, MinusCircle } from "react-feather";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./offers.css";
import "./OnBoard.css";
import "./Documents.css";
import { OnBoardContext } from "../../context/OnBoardState";
import countryList from "react-select-country-list";
import { candidate } from "../../utils/canditateLogin";
import moment from "moment";

const PersonalInformation = (props) => {
  const {
    updatePersonalInfo,
    CandidatePersonalInfo,
    candidatePersonalInfoData,
    PersonalInfoResponse,
    CandidateProfile,
    candidateData,
    searchForEmp1,
    searchEmpData1,
    searchForEmp2,
    searchEmpData2,
    CandidateViewInformation,
    candidateViewInfo,
    addressView,
  } = useContext(OnBoardContext);
  const options = useMemo(() => countryList().getData(), []);
  const [isClicked, setIsClicked] = useState(false);
  const [fullTime, setFullTime] = useState(true); //Permanent
  const [partTime, setParTime] = useState(false);
  const [localExpact, setLocalExpact] = useState(false);
  const [internship, setInternship] = useState(false);
  const [disabled, setDisableState] = useState(false);
  const [DOB, setDOB] = useState();

  const [empName1, setEmpName1] = useState("");
  const [empName2, setEmpName2] = useState("");
  const [refEmail1, setRefEmail1] = useState("");
  const [refEmail2, setRefEmail2] = useState("");
  const [desgination1, setDesignation1] = useState("");
  const [desgination2, setDesignation2] = useState("");

  const [genderCheckM, setGenderM] = useState(false);
  const [genderCheckF, setGenderF] = useState(false);
  const [married, setMarried] = useState(false);
  const [unMarried, setUnMarried] = useState(false);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [required, setRequired] = useState(true);
  const [statusRequired, setstatusRequired] = useState(true);
  const [disabilityDoc, setDocName] = useState("");
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
  useEffect(() => {
    CandidateProfile();
  }, []);
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

  console.log(candidateData);

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
    // console.log("personal information view candidate", candidateData);
    console.log(Object.keys(candidatePersonalInfoData).length);
    if (
      candidatePersonalInfoData !== null &&
      candidatePersonalInfoData !== undefined &&
      Object.keys(candidatePersonalInfoData).length !== 0
    ) {
      setState({
        aadhaarName: candidatePersonalInfoData.aadhaarName,
        fatherName: candidatePersonalInfoData.fatherName,
        aadhaarNumber:
          candidatePersonalInfoData.aadhaarNumber !== null
            ? candidatePersonalInfoData.aadhaarNumber
            : "",
        // passPortNo:
        //   candidatePersonalInfoData.passPortNo !== null
        //     ? candidatePersonalInfoData.passPortNo
        //     : "",
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
          : null
      );
      if (
        candidatePersonalInfoData.gender !== null &&
        candidatePersonalInfoData.gender !== undefined &&
        candidatePersonalInfoData.gender === "Male"
      ) {
        setGenderM(true);
        setGenderF(false);
        setGender("Male");
      } else {
        setGenderF(true);
        setGenderM(false);
        setGender("Female");
      }
      if (
        candidatePersonalInfoData.maritalStatus !== null &&
        candidatePersonalInfoData.maritalStatus !== undefined &&
        candidatePersonalInfoData.maritalStatus === "Married"
      ) {
        setMarried(true);
        setUnMarried(false);
        setMaritalStatus("Married");
      } else {
        setUnMarried(true);
        setMarried(false);
        setMaritalStatus("Unmarried");
      }
      if (
        candidateData !== undefined &&
        candidateData.candidateReferences !== null &&
        candidateData.candidateReferences !== undefined &&
        candidateData.candidateReferences[0].employeeName !== null &&
        candidateData.candidateReferences[0].employeeName !== undefined
      ) {
        setEmpName1(candidateData.candidateReferences[0].employeeName);
        setDesignation1(candidateData.candidateReferences[0].designation);
        setRefEmail1(candidateData.candidateReferences[0].email);
      }
    }
  }, [candidatePersonalInfoData]);
  console.log("datya of birth", candidatePersonalInfoData.dateOfBirth);

  var data1 =
    candidateData !== undefined &&
    candidateData.candidateReferences !== null &&
    candidateData.candidateReferences !== undefined &&
    candidateData.candidateReferences[0];
  // var data1 = 768;

  var data2 =
    candidateData !== undefined &&
    candidateData.candidateReferences !== null &&
    candidateData.candidateReferences !== undefined &&
    candidateData.candidateReferences[1];

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

    if (candidateViewInfo.contractType === "Permanent") {
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
      (candidateViewInfo.contractType === "Permanent") |
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
    if (candidateViewInfo.contractType === "Localexpact") {
      if (state.passPortNo !== "" && passPortValid.test(state.passPortNo)) {
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
      if (state.disabilityDoc === "") {
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
    if (
      PanNumberValidation() === true &&
      AadharNumberValidation() === true &&
      DOBValidation() === true &&
      AdharNameValidation() === true &&
      FatherNameValidation() === true &&
      disabilityValidation() === true &&
      nationalityValidation() === true &&
      bloodGroupValidation() === true &&
      empName1Validation() === true &&
      PassPortNumberValidations() === true &&
      disabilityDocValidation() === true &&
      validateCheckBoxes(genderCheckM, genderCheckF, setGenderError) === true &&
      validateCheckBoxes(married, unMarried, setMaritalStatusError) === true
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
    const submited = props.NextStep; //next component
    submited();
    e.preventDefault();
    const value = checkValidations();
    if (value === true) {
      if (saveClick === false) {
        const ReferenceData2 = [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId:
              candidateData.candidateReferences[0] !== null &&
              candidateData.candidateReferences[0] !== undefined
                ? candidateData.candidateReferences[0].referenceId
                : 0,
          },
          {
            designation: desgination2 !== null ? desgination2 : null,
            email: refEmail2 !== null ? refEmail2 : null,
            employeeName: empName2 !== null ? empName2 : null,
            referenceId:
              candidateData.candidateReferences[1] !== null &&
              candidateData.candidateReferences[1] !== undefined
                ? candidateData.candidateReferences[1].referenceId
                : 0,
          },
        ];
        const ReferenceData1 = [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId:
              candidateData.candidateReferences[1] !== null &&
              candidateData.candidateReferences[1] !== undefined
                ? candidateData.candidateReferences[1].referenceId
                : 0,
          },
        ];
        const ReferenceData3 = [
          {
            designation: desgination1 !== null ? desgination1 : null,
            email: refEmail1 !== null ? refEmail1 : null,
            employeeName: empName1 !== null ? empName1 : null,
            referenceId:
              candidateData.candidateReferences[0] !== null &&
              candidateData.candidateReferences[0] !== undefined
                ? candidateData.candidateReferences[0].referenceId
                : 0,
          },
        ];
        const InfoData = {
          aadhaarDoc: null,
          aadhaarName: state.aadhaarName,
          aadhaarNumber: state.aadhaarNumber,
          bloodGroup: state.bloodGroup,
          candidateId:
            candidateData.candidateId !== null ? candidateData.candidateId : 0,
          candidateReferences:
            !data2 && !data1 && empName2 !== null && empName1 !== null
              ? ReferenceData2
              : !data1 && empName1 !== null
              ? ReferenceData3
              : !data2 && empName2 !== null
              ? ReferenceData1
              : [],
          createdDate:
            candidateData.createdDate !== null
              ? candidateData.createdDate
              : null,
          dateOfBirth: DOB,
          disability: state.disability,
          disabilityDoc: disabilityDoc,
          fatherName: state.fatherName,
          firstName:
            candidateData.firstName !== null ? candidateData.firstName : null,
          gender: gender,
          lastName:
            candidateData.lastName !== null ? candidateData.lastName : null,
          lgbt: state.lgbt,
          maritalStatus: maritalStatus,
          nationality: state.nationality,
          panDoc: null,
          panNumber: state.panNumber !== null ? state.panNumber : null,
          personalEmail:
            candidateData.personalEmail !== null
              ? candidateData.personalEmail
              : null,
          photo: null,
          referred: true,
          status: candidateData.status !== null ? candidateData.status : 0,
          statusDesc: null,
          verificationStatus:
            candidateData.verificationStatus !== null
              ? candidateData.verificationStatus
              : 0,
          verificationStatusDesc: null,
        };
        console.log("onsubmit");
        console.log(InfoData);
        updatePersonalInfo(InfoData);

        // next page code should be here
        const submited = props.NextStep; //next component
        submited();
      }
      // if (saveClick === true) {
      //   const InfoData = {
      //     aadhaarDoc: null,
      //     aadhaarName: state.aadhaarName,
      //     aadhaarNumber: state.aadhaarNumber,
      //     bloodGroup: state.bloodGroup,
      //     candidateId:
      //       candidateData.candidateId !== null ? candidateData.candidateId : 0,
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
    console.log(state);
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
    setGenderM(e.target.checked);
    setGenderF(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
    {
      genderCheckM ? setGender("FeMale") : setGender("Male");
    }
    console.log(genderCheckM);
    console.log("---");
    console.log(gender);
  };
  const handleFemaleGenderCheckboxChange = (e) => {
    setGenderF(e.target.checked);
    setGenderM(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
    {
      genderCheckF ? setGender("Male") : setGender("FeMale");
    }
    console.log(genderCheckF);
    console.log("---");
    console.log(gender);
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
      {/* <ToastContainer /> */}
      <Form>
        <Row style={{ marginBottom: "1rem" }}>
          <Col sm={8}>
            <Row style={{ marginBottom: "2rem" }}>
              <div className="col-sm-4">
                <Form.Group>
                  <Form.Label>
                    Name as per Aadhaar<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="aadhaarName"
                    value={state.aadhaarName}
                    onChange={changeHandler}
                    required
                    style={adharNameError ? { borderColor: "red" } : {}}
                    placeholder="Name as per adhaar"
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
                    <p style={{ color: "red" }}>
                      Please enter valid father's name
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
                    className={DOBError ? "onBoard-date-error" : "onBoard-date"}
                  >
                    <DatePicker
                      style={DOBError ? { borderColor: "red" } : {}}
                      className="form-control onBoard-view"
                      selected={DOB}
                      required
                      onChange={(e) => dateOfBirthHandler(e)}
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
                    options={options}
                    onChange={changeHandler}
                    required
                    disabled={disabled}
                    style={nationalityError ? { borderColor: "red" } : {}}
                  >
                    <option value="">Nationality</option>
                    {options.map((item) => {
                      return <option key={item.value}>{item.label}</option>;
                    })}
                  </Form.Control>

                  {nationalityError ? (
                    <p style={{ color: "red" }}>
                      Please choose valid nationality
                    </p>
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
                    <p style={{ color: "red" }}>
                      Please choose disability option
                    </p>
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
                {(candidateViewInfo.contractType === "Parttime") |
                (candidateViewInfo.contractType === "Permanent") ? (
                  <Form.Group>
                    <Form.Label>
                      Aadhaar Number
                      <span style={{ color: "red" }}>
                        {candidateViewInfo.contractType === "Internship"
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
                {candidateViewInfo.contractType === "Localexpact" ? (
                  <Form.Group>
                    <Form.Label>
                      Pass Port Number<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="passPortNo"
                      value={state.passPortNo}
                      onChange={changeHandler}
                      required
                      maxLength="12"
                      placeholder="Pass Port No"
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
              <div className="col-sm-4">
                {(candidateViewInfo.contractType === "Parttime") |
                (candidateViewInfo.contractType === "Permanent") ? (
                  <Form.Group>
                    <Form.Label>
                      Pan Number
                      <span style={{ color: "red" }}>
                        {" "}
                        {candidateViewInfo.contractType === "Permanent"
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
                      <p style={{ color: "red" }}>
                        Please enter valid pan number
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                ) : (
                  ""
                )}
              </div>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm={3} style={{ marginTop: "1.8rem" }}>
                <Form.Group>
                  <div className="inputField">
                    <label>Gender</label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4} style={{ marginTop: "2rem" }}>
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
              <Col sm={5} style={{ marginTop: "2rem" }}>
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
            </Row>
            <Row style={{ marginTop: "4rem" }}>
              <Col sm={3}>
                <Form.Group>
                  <div className="inputField">
                    <label>
                      Marital<br></br>Status
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <div
                    className="boxField_1 input"
                    style={{ marginTop: "1rem" }}
                  >
                    <input
                      className="largerCheckbox"
                      type="checkbox"
                      style={maritalStatusError ? { borderColor: "red" } : {}}
                      value="Married"
                      required={statusRequired}
                      checked={married}
                      onChange={handleMarriedCheckboxChange}
                    />
                    <label style={maritalStatusError ? { color: "red" } : {}}>
                      Married{" "}
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group>
                  <div
                    className="boxField_1 input"
                    style={{ marginTop: "0.9rem" }}
                  >
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
            {state.disability === "Yes" ? (
              <Row style={{ marginTop: "2rem" }}>
                <Col sm={12}>
                  <div className="FileInput">
                    <label>Disability Document</label>
                  </div>
                  <div className="parentInput">
                    <input
                      className="fileInputField2"
                      placeholder="Choose File"
                      type="text"
                      name="disabilityDoc"
                      value={disabilityDoc}
                    />
                    <label
                      className="custom-file-upload"
                      style={{ fontSize: "16px" }}
                    >
                      <input
                        type="file"
                        className="custom_file_Upload_button"
                        onChange={disabilityDocument}
                      />
                      {/* <i className="fa fa-cloud-upload" />  */}
                      Upload
                      {/* <i
                      id="custom_file_upload_icon"
                      class="fa fa-upload"
                      aria-hidden="true"
                    ></i> */}
                    </label>
                  </div>

                  {disabilityDocError ? (
                    <p style={{ color: "red" }}>
                      &nbsp;&nbsp;&nbsp;&nbsp; Please upload the disability
                      document
                    </p>
                  ) : (
                    <p></p>
                  )}
                </Col>
              </Row>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        {!data2 ? (
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
              {!data1 ? (
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
          <button className="stepperButtons" onClick={PrevStep}>
            Back
          </button>

          <button className="stepperButtons" onClick={submitHandler}>
            Save & Next
          </button>
        </div>
      </Form>
    </Fragment>
  );
};
export default PersonalInformation;
