import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { OnBoardContext } from "../../context/OnBoardState";
import { ToastContainer, toast } from "react-toastify";
import { Document, Page } from "react-pdf";
import Form11 from "../../forms/Form_11_UAN.pdf";
import Form11View from "../../forms/Form_11_(PF_declaration)_Sample_copy.pdf";
import Form2 from "../../forms/Form_2_EPF_Nomination.pdf";
import Form2View from "../../forms/Form_2_(PF_nomination)_Sample_copy.pdf";
import FormF from "../../forms/Form_F_Gratuity.pdf";
import FormFView from "../../forms/Form_F_(Gratuity)_Sample_copy.pdf";
import "react-toastify/dist/ReactToastify.css";
import "./OnBoard.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

const PFDeclaration = (props) => {
  const {
    PFDeclarationCreate,
    PFDeclarationUpdate,
    PFDeclarationView,
    pfDeclarationCreate,
    pfDeclarationUpdate,
    candidateProfileData,
    pfDeclarationView,
    uploadFile,
    documentView,
    documentViewData,
  } = useContext(OnBoardContext);
  const [dataExist, setDataExist] = useState({
    exist: false,
  });
  const [firstJobYes, setFirstJobYes] = useState(false);
  const [Form11Error, setForm11Error] = useState(false);
  const [Form2EpfError, setForm2EpfError] = useState(false);
  const [FormFError, setFormFError] = useState(false);
  const [Form11uploade, setForm11Uploade] = useState(false);
  const [Form2Epfuploade, setForm2EpfUploade] = useState(false);
  const [FormFuploade, setFormFUploade] = useState(false);

  const [declarationIdValue, setDeclarationIdValue] = useState(0);
  const [firstJobNo, setFirstJobNo] = useState(false);
  const [contributingPrevOrgYes, setContributingPrevOrgYes] = useState(false);
  const [contributingPrevOrgNo, setContributingPrevOrgNo] = useState(false);
  const [memberOfPensionSchemeYes, setMemberOfPensionSchemeYes] =
    useState(false);
  const [memberOfPensionSchemeNo, setMemberOfPensionSchemeNo] = useState(false);
  const [pfNominationHoldDeathYes, setPfNominationHoldDeathYes] =
    useState(true);
  const [pfNominationHoldDeathNo, setPfNominationHoldDeathNo] = useState(false);

  const [nomineeNameError, setNomineeNameError] = useState(false);

  const [nomineeRelationshipError, setNomineeRelationshipError] =
    useState(false);

  const [nomineeDOBError, setNomineeDOBError] = useState(false);
  const [nomineeDOB, setNomineeDOB] = useState();

  const [nomineeAddressError, setNomineeAddressError] = useState(false);
  const [form11DocStatus, setForm11DocStatus] = useState(false);
  const [form2epfDocStatus, setForm2epfDocStatus] = useState(false);
  const [formfDocStatus, setFormfDocStatus] = useState(false);
  const [state, setState] = useState({
    form11: "",
    form2epf: "",
    formf: "",
  });
  const [ObjState, setObjState] = useState({
    form11: "",
    form2epf: "",
    formf: "",
  });

  const [nominee, setNominee] = useState({
    nomineeName: "",
    nomineeRelationship: "",
    nomineeAddress: "",
  });
  const [uanNumber, setUanNumber] = useState();
  const [epfPassbookCopy, setEpfPassbookCopy] = useState("");
  const [required, setRequired] = useState(true);
  const [firstJobError, setFirstJobError] = useState(false);
  const [contributingPrevError, setContributingPrevError] = useState(false);
  const [memberOfPensionSchemaError, setMemberOfPensionSchemaError] =
    useState(false);
  const [pfNominationHoldDeathError, setPfNominationHoldDeathError] =
    useState(false);
  const [nomineeValue, setNomineeValue] = useState(0);

  const [uanNumberError, setUanNumberError] = useState(false);

  useEffect(() => {
    documentView(candidateProfileData.candidateId);
  }, [candidateProfileData]);
  console.log("documentViewData", documentViewData);

  useEffect(() => {
    if (
      documentViewData &&
      documentViewData !== null &&
      documentViewData !== undefined &&
      pfDeclarationView &&
      pfDeclarationView !== null &&
      pfDeclarationView !== undefined &&
      Object.keys(pfDeclarationView).length !== 0 &&
      Object.keys(documentViewData).length !== 0
    ) {
      console.log("inside condition 1", pfDeclarationView);
      let form11Doc = "";
      let form2epfDoc = "";
      let formFDoc = "";
      // if (pfDeclarationView.pfNominationHoldDeath === true) {
      console.log("inside condition 2", documentViewData);
      documentViewData.map((item) => {
        console.log("item.documentType", item.documentType, item);
        if (item.documentType === 10 && item.documentName) {
          form11Doc = item.documentName ? item.documentName : "";
          setForm11DocStatus(item.status ? item.status : 0);
          setForm11Uploade(true);
        }
        if (item.documentType === 11 && item.documentName) {
          form2epfDoc = item.documentName ? item.documentName : "";
          setForm2epfDocStatus(item.status ? item.status : 0);
          setForm2EpfUploade(true);
        }
        if (item.documentType === 12 && item.documentName) {
          formFDoc = item.documentName ? item.documentName : "";
          setFormfDocStatus(item.status ? item.status : 0);
          setFormFUploade(true);
        }
        setState({
          form11: form11Doc,
          form2epf: form2epfDoc,
          formf: formFDoc,
        });
        // setNomineeDOB();
        // setNominee({
        //   nomineeAddress: "",
        //   nomineeName: "",
        //   nomineeRelationship: "",
        // });
      });
      console.log("documents prefill", form11Doc, form2epfDoc, formFDoc, state);
      // }
    }
  }, [documentViewData, pfDeclarationView]);
  console.log("---->", documentViewData);

  useEffect(() => {
    PFDeclarationView(candidateProfileData.candidateId);
    console.log(pfDeclarationView, "pfDeclarationViewuse");
  }, [candidateProfileData]);

  useEffect(() => {
    console.log(pfDeclarationView, "pfDeclarationViewuse2");
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    if (
      pfDeclarationView !== null &&
      Object.keys(pfDeclarationView).length !== 0
    ) {
      if (
        pfDeclarationView.firstJob !== undefined &&
        pfDeclarationView.firstJob == true
      ) {
        setFirstJobYes(pfDeclarationView.firstJob);
        setFirstJobNo(false);
      } else if (
        pfDeclarationView.firstJob !== undefined &&
        pfDeclarationView.firstJob == false
      ) {
        setFirstJobNo(true);
        setFirstJobYes(false);
      }
      if (
        pfDeclarationView.contributingPrevOrg !== undefined &&
        pfDeclarationView.contributingPrevOrg == true
      ) {
        setContributingPrevOrgYes(pfDeclarationView.contributingPrevOrg);
        setContributingPrevOrgNo(false);
      } else if (
        pfDeclarationView.contributingPrevOrg !== undefined &&
        pfDeclarationView.contributingPrevOrg == false
      ) {
        setContributingPrevOrgNo(true);
        setContributingPrevOrgYes(false);
      }
      if (
        pfDeclarationView.memberOfPensionScheme !== undefined &&
        pfDeclarationView.memberOfPensionScheme == true
      ) {
        setMemberOfPensionSchemeYes(pfDeclarationView.memberOfPensionScheme);
        setMemberOfPensionSchemeNo(false);
      } else if (
        pfDeclarationView.memberOfPensionScheme !== undefined &&
        pfDeclarationView.memberOfPensionScheme == false
      ) {
        setMemberOfPensionSchemeYes(false);
        setMemberOfPensionSchemeNo(true);
      }
      if (
        pfDeclarationView.pfNominationHoldDeath !== undefined &&
        pfDeclarationView.pfNominationHoldDeath == true
      ) {
        setPfNominationHoldDeathYes(pfDeclarationView.pfNominationHoldDeath);
        setPfNominationHoldDeathNo(false);
        setNomineeValue(pfDeclarationView.pfNomination.nomineeId);
      } else if (
        pfDeclarationView.pfNominationHoldDeath !== undefined &&
        pfDeclarationView.pfNominationHoldDeath == false
      ) {
        setPfNominationHoldDeathNo(true);
        setPfNominationHoldDeathYes(false);
        setNomineeDOB();
        setNomineeValue(0);
        setNominee({
          nomineeAddress: "",
          nomineeName: "",
          nomineeRelationship: "",
        });
      } else if (pfDeclarationView.epfPassbookCopy !== undefined) {
        setEpfPassbookCopy(pfDeclarationView.epfPassbookCopy);
      }
      if (pfDeclarationView.declarationId !== undefined) {
        console.log(
          "pfDeclarationView.declarationId",
          pfDeclarationView.declarationId
        );
        setDeclarationIdValue(pfDeclarationView.declarationId);
      }
      // if (
      //   pfDeclarationView.pfNomination !== null &&
      //   pfDeclarationView.pfNomination !== undefined &&
      //   pfDeclarationView.pfNomination.nomineeId !== undefined
      // ) {
      //   console.log(
      //     "pfDeclarationView.pfNomination.nomineeId",
      //     pfDeclarationView.pfNomination.nomineeId
      //   );
      //   setNomineeValue(pfDeclarationView.pfNomination.nomineeId);
      // }

      if (
        pfDeclarationView.pfNomination !== null &&
        pfDeclarationView.pfNomination !== undefined &&
        pfDeclarationView.pfNominationHoldDeath === true
      ) {
        setNomineeDOB(new Date(pfDeclarationView.pfNomination.dateOfBirth));
        setNominee({
          nomineeAddress: pfDeclarationView.pfNomination.address,
          nomineeName: pfDeclarationView.pfNomination.nomineeName,
          nomineeRelationship: pfDeclarationView.pfNomination.relationship,
        });
        // setState({
        //   form11: "",
        //   form2epf: "",
        //   formf: "",
        // });
      }

      if (
        pfDeclarationView !== null &&
        pfDeclarationView !== undefined &&
        pfDeclarationView.uanNumber !== undefined
      ) {
        console.log("pfDeclarationView.uanNumber", pfDeclarationView.uanNumber);
        setUanNumber(pfDeclarationView.uanNumber);
      }

      // if (pfDeclarationView.uanNumber !== undefined) {
      //   console.log("uab number");
      //   setState({ uanNumber: pfDeclarationView.uanNumber });
      // }
      setDataExist({ exist: true });
    }
    console.log(candidateProfileData.candidateId, "pfdeclaration");
  }, [pfDeclarationView]);

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
  const UanNumberValidation = () => {
    if (contributingPrevOrgYes === true) {
      if (
        uanNumber !== null &&
        uanNumber !== undefined &&
        uanNumber !== "" &&
        uanNumber.length == 12
      ) {
        console.log("uan number");
        setUanNumberError(false);
        return true;
      } else {
        setUanNumberError(true);
        return false;
      }
    } else {
      setUanNumberError(false);
      return true;
    }
  };

  const nomineeNameValidation = () => {
    if (pfNominationHoldDeathYes === true) {
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
    if (pfNominationHoldDeathYes === true) {
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
    if (pfNominationHoldDeathYes === true) {
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
    if (pfNominationHoldDeathYes === true) {
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

  const checkAllValidations = () => {
    if (
      validateCheckBoxes(firstJobYes, firstJobNo, setFirstJobError) === true
    ) {
      if (
        (validateCheckBoxes(
          pfNominationHoldDeathYes,
          pfNominationHoldDeathNo,
          setPfNominationHoldDeathError
        ) ===
          true) &
        (validateCheckBoxes(
          memberOfPensionSchemeYes,
          memberOfPensionSchemeNo,
          setMemberOfPensionSchemaError
        ) ===
          true) &
        (validateCheckBoxes(
          contributingPrevOrgYes,
          contributingPrevOrgNo,
          setContributingPrevError
        ) ===
          true) &
        (Form11UploadValidation() === true) &
        (Form2EpfUploadValidation() === true) &
        (FormFUploadValidation() === true) &
        (nomineeNameValidation() === true) &
        (nomineeDobValidation() === true) &
        (nomineeAddressValidation() === true) &
        (nomineeRelationValidation() === true)
      ) {
        if (firstJobNo === true) {
          console.log("i am hear");
          if (UanNumberValidation() === true) {
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
    } else {
      return false;
    }
  };

  const nomineeHandler = (e) => {
    console.log("inside nominee handler");
    setNominee({
      ...nominee,
      [e.target.name]: e.target.value,
    });
    console.log("nominee", nominee);
  };

  const dateOfBirthHandler = (e) => {
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

  const submitHandler = (e) => {
    // const nextPage = props.NextStep;
    // nextPage();
    e.preventDefault();
    console.log("inside subimit", nomineeValue);

    const value = checkAllValidations();
    if (value === true) {
      // const nextPage = props.NextStep;
      // nextPage();
      // const PFInfo = {
      //   candidateId:
      //     candidateProfileData.candidateId !== undefined
      //       ? candidateProfileData.candidateId
      //       : "",
      //   contributingPrevOrg: contributingPrevOrgYes ? true : false,
      //   declarationId: declarationIdValue,
      //   epfPassbookCopy: " ",
      //   firstJob: firstJobYes ? true : false,
      //   memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
      //   pfNominationHoldDeath: pfNominationHoldDeathYes ? true : false,
      //   uanNumber: state.uanNumber,
      // };
      if (dataExist.exist == true) {
        const PFInfo = {
          candidateId:
            candidateProfileData.candidateId !== undefined
              ? candidateProfileData.candidateId
              : "",
          contributingPrevOrg: contributingPrevOrgYes ? true : false,
          declarationId: declarationIdValue,
          epfPassbookCopy: " ",
          firstJob: firstJobYes ? true : false,
          memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
          pfNominationHoldDeath: pfNominationHoldDeathYes ? true : false,
          uanNumber: uanNumber,
          pfNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: nomineeValue,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
        };
        console.log(PFInfo, "update pf");
        PFDeclarationUpdate(PFInfo);
        const nextPage = props.NextStep;
        nextPage(true);
        documentView(candidateProfileData.candidateId);
      } else {
        const PFInfo = {
          candidateId:
            candidateProfileData.candidateId !== undefined
              ? candidateProfileData.candidateId
              : "",
          contributingPrevOrg: contributingPrevOrgYes ? true : false,
          declarationId: declarationIdValue,
          epfPassbookCopy: " ",
          firstJob: firstJobYes ? true : false,
          memberOfPensionScheme: memberOfPensionSchemeYes ? true : false,
          pfNominationHoldDeath: pfNominationHoldDeathYes ? true : false,
          uanNumber: uanNumber,
          pfNomination: {
            address: nominee.nomineeAddress,
            dateOfBirth: moment(nomineeDOB).format("YYYY-MM-DD"),
            nomineeId: 0,
            nomineeName: nominee.nomineeName,
            relationship: nominee.nomineeRelationship,
          },
        };
        console.log(PFInfo, "create pf");
        PFDeclarationCreate(PFInfo);
        const nextPage = props.NextStep;
        nextPage(true);
        documentView(candidateProfileData.candidateId);
      }
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };
  const handleFirstJobYesChange = (e) => {
    setFirstJobYes(e.target.checked);
    setFirstJobNo(!e.target.checked);
    setContributingPrevOrgNo(e.target.checked);
    setMemberOfPensionSchemeNo(e.target.checked);
    setContributingPrevOrgYes(!e.target.checked);
    // setState({ uanNumber: "" });
    setUanNumber("");
    setMemberOfPensionSchemeYes(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleFirstJobNoChange = (e) => {
    setFirstJobNo(e.target.checked);
    setFirstJobYes(!e.target.checked);
    setContributingPrevOrgNo(!e.target.checked);
    setMemberOfPensionSchemeNo(!e.target.checked);
    setContributingPrevOrgYes(false);

    setMemberOfPensionSchemeYes(false);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleContributingPrevOrgYesChange = (e) => {
    setContributingPrevOrgYes(e.target.checked);
    setContributingPrevOrgNo(!e.target.checked);
    setMemberOfPensionSchemeNo(false);
    setMemberOfPensionSchemeYes(false);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleContributingPrevOrgNoChange = (e) => {
    setContributingPrevOrgNo(e.target.checked);
    setContributingPrevOrgYes(!e.target.checked);
    setMemberOfPensionSchemeNo(e.target.checked);
    setMemberOfPensionSchemeYes(!e.target.checked);
    // setState({ uanNumber: "" });
    setUanNumber("");
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleMemberOfPensionSchemeYesChange = (e) => {
    setMemberOfPensionSchemeYes(e.target.checked);
    setMemberOfPensionSchemeNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handleMemberOfPensionSchemeNoChange = (e) => {
    setMemberOfPensionSchemeNo(e.target.checked);
    setMemberOfPensionSchemeYes(!e.target.checked);

    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handlePfNominationHoldDeathYesChange = (e) => {
    setPfNominationHoldDeathYes(e.target.checked);
    setPfNominationHoldDeathNo(!e.target.checked);
    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const handlePfNominationHoldDeathNoChange = (e) => {
    setPfNominationHoldDeathNo(e.target.checked);
    setPfNominationHoldDeathYes(!e.target.checked);

    {
      required ? setRequired(!required) : setRequired(required);
    }
  };
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const uanHandler = (e) => {
    setUanNumber(e.target.value);
  };

  const Form11Validation = () => {
    if (state.form11 !== "") {
      setForm11Error(false);
      console.log("Form11Sucess");
      return true;
    } else {
      setForm11Error(true);
      console.log("Form11Fail");
      return false;
    }
  };
  const Form2EpfValidation = () => {
    if (state.form2epf !== "") {
      setForm2EpfError(false);
      console.log("Form2Sucess");
      return true;
    } else {
      setForm2EpfError(true);
      console.log("Form2Fail");
      return false;
    }
  };

  const FormFValidation = () => {
    if (state.formf !== "") {
      setFormFError(false);
      console.log("FormFSucess");
      return true;
    } else {
      setFormFError(true);
      console.log("FormFFail");
      return false;
    }
  };
  const Form11UploadValidation = () => {
    if (
      pfNominationHoldDeathYes === true ||
      pfNominationHoldDeathYes === false
    ) {
      if (Form11uploade === false) {
        if (Form11Validation() === true) {
          setForm11Error(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const Form2EpfUploadValidation = () => {
    if (
      pfNominationHoldDeathYes === true ||
      pfNominationHoldDeathYes === false
    ) {
      if (Form2Epfuploade === false) {
        if (Form2EpfValidation() === true) {
          setForm2EpfError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const FormFUploadValidation = () => {
    if (
      pfNominationHoldDeathYes === true ||
      pfNominationHoldDeathYes === false
    ) {
      if (FormFuploade === false) {
        if (FormFValidation() === true) {
          setFormFError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const DocChangeHandler = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    setState({
      ...state,
      [event.target.name]: fileObj.name,
    });
    setObjState({
      ...ObjState,
      [event.target.name]: fileObj,
    });
    if (event.target.name === "form11") {
      setForm11Uploade(false);
    } else if (event.target.name === "form2epf") {
      setForm2EpfUploade(false);
    } else if (event.target.name === "formf") {
      setFormFUploade(false);
    }
  };

  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;
    if (event.target.name === "form11") {
      if (Form11Validation() === true) {
        setForm11Uploade(true);
        fileUpload = ObjState.form11;
        fileType = 10;
      }
    } else if (event.target.name === "form2epf") {
      if (Form2EpfValidation() === true) {
        setForm2EpfUploade(true);
        fileUpload = ObjState.form2epf;
        fileType = 11;
      }
    } else if (event.target.name === "formf") {
      if (FormFValidation() === true) {
        setFormFUploade(true);
        fileUpload = ObjState.formf;
        fileType = 12;
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
  return (
    <Fragment>
      <ToastContainer />
      <Form>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Is this your first job ?</label>
              {firstJobError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please select one of the option
                </p>
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
                  checked={firstJobYes}
                  required={required}
                  onChange={handleFirstJobYesChange}
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
                  checked={firstJobNo}
                  required={required}
                  onChange={handleFirstJobNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Were you contributing in your previous organization ?
                {contributingPrevError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    *Please select one of the option
                  </p>
                ) : (
                  <p></p>
                )}
              </label>
            </div>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  type="checkbox"
                  value="yes"
                  checked={contributingPrevOrgYes}
                  required={required}
                  disabled={contributingPrevOrgNo}
                  onChange={handleContributingPrevOrgYesChange}
                />
                <label>Yes</label>
              </div>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <div className="boxField input">
                <input
                  type="checkbox"
                  value="no"
                  checked={contributingPrevOrgNo}
                  required={required}
                  onChange={handleContributingPrevOrgNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Provide your UAN number</label>
              {uanNumberError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please enter your 12 digit UAN number
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
          <Col sm={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="UAN number"
                required
                disabled={contributingPrevOrgNo}
                name="uanNumber"
                value={uanNumber}
                onChange={(e) => uanHandler(e)}
              />
            </Form.Group>
          </Col>
          {/* <Col sm={2}>
            <div>
              <label>
                Fill{" "}
                <a href="" target="_blank "" rel="noopener noreferrer" download>
                  <i className="fas fa-download" />
                  EPF Form
                </a>{" "}
                here
              </label>
            </div>
          </Col> */}
        </Row>

        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>
                Are you a member of employer pension scheme in your previous
                employement ?
              </label>
              {memberOfPensionSchemaError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please select one of the option
                </p>
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
                  checked={memberOfPensionSchemeYes}
                  required={required}
                  disabled={memberOfPensionSchemeNo}
                  onChange={handleMemberOfPensionSchemeYesChange}
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
                  checked={memberOfPensionSchemeNo}
                  required={required}
                  onChange={handleMemberOfPensionSchemeNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm={5}>
            <div>
              <label>Does the PF nomination hold good in case of Death ?</label>
              {pfNominationHoldDeathError ? (
                <p style={{ color: "red" }}>
                  {" "}
                  *Please select one of the option
                </p>
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
                  checked={pfNominationHoldDeathYes}
                  required={required}
                  onChange={handlePfNominationHoldDeathYesChange}
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
                  checked={pfNominationHoldDeathNo}
                  required={required}
                  onChange={handlePfNominationHoldDeathNoChange}
                />
                <label>No </label>
              </div>
            </Form.Group>
          </Col>
          {/* <Col sm={2}>
            <div>
              <label>
                <a href="~/address">Add</a> Details here
              </label>
            </div>
          </Col> */}
        </Row>
        {pfNominationHoldDeathYes === true ? (
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
                          nomineeDOBError
                            ? "onBoard-date-error"
                            : "onBoard-date"
                        }
                      >
                        <DatePicker
                          className="form-control onBoard-view"
                          selected={nomineeDOB}
                          required
                          onChange={(e) => dateOfBirthHandler(e, "1")}
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
          </div>
        ) : (
          ""
        )}
        <Row>
          <Col sm={5}>
            <label>Please fill the forms below</label>
            <br />
            <a href={require("../../forms/Form_11_UAN.pdf")} target="_blank">
              Download Form 11 Declaration
            </a>
            <br />
            <a
              href={require("../../forms/Form_2_EPF_Nomination.pdf")}
              target="_blank"
            >
              Download Form 2 EPF nomination
            </a>
            <br />
            <a
              href={require("../../forms/Form_F_Gratuity.pdf")}
              target="_blank"
            >
              Download Form F Gratuity
            </a>
            <br />
          </Col>
          <Col sm={5}>
            <label></label>
            <br />
            <a
              href={require("../../forms/Form_11_(PF_declaration)_Sample_copy.pdf")}
              target="_blank"
            >
              Sample Form 11 Declaration
            </a>
            <br />
            <a
              href={require("../../forms/Form_2_(PF_nomination)_Sample_copy.pdf")}
              target="_blank"
            >
              Sample Form 2 EPF nomination
            </a>
            <br />
            <a
              href={require("../../forms/Form_F_(Gratuity)_Sample_copy.pdf")}
              target="_blank"
            >
              Sample Form F Gratuity
            </a>
            <br />
          </Col>
        </Row>
        <React.Fragment>
          <Row style={{ marginLeft: "-2rem", marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form 11 Declaration</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.form11 !== "" &&
                    state.form11 !== null &&
                    state.form11 !== undefined
                      ? state.form11
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="form11"
                      style={{ display: "none" }}
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (form11DocStatus === 0 || form11DocStatus === 2)) ||
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
                        (form11DocStatus === 0 || form11DocStatus === 2)) ||
                      (candidateProfileData.verificationStatus === 0 &&
                        candidateProfileData.documentUploaded === 0)
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="form11"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (form11DocStatus === 0 || form11DocStatus === 2)) ||
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
                {Form11Error ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the Form 11
                    Declaration
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginLeft: "-2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form 2 EPF Nomination</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.form2epf !== "" &&
                    state.form2epf !== null &&
                    state.form2epf !== undefined
                      ? state.form2epf
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="form2epf"
                      style={{ display: "none" }}
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (form2epfDocStatus === 0 ||
                            form2epfDocStatus === 2)) ||
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
                        (form2epfDocStatus === 0 || form2epfDocStatus === 2)) ||
                      (candidateProfileData.verificationStatus === 0 &&
                        candidateProfileData.documentUploaded === 0)
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="form2epf"
                      className="custom_file_Upload_button"
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (form2epfDocStatus === 0 ||
                            form2epfDocStatus === 2)) ||
                        (candidateProfileData.verificationStatus === 0 &&
                          candidateProfileData.documentUploaded === 0)
                          ? false
                          : true
                      }
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {Form2EpfError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the Form 2
                    EPF Nomination
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginLeft: "-2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Form F Gratuity</label>
                </div>
                <div className="parentInput">
                  <label
                    className="fileInputField"
                    style={{ marginTop: "0.5rem" }}
                  >
                    &nbsp;&nbsp;
                    {state.formf !== "" &&
                    state.formf !== null &&
                    state.formf !== undefined
                      ? state.formf
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="formf"
                      style={{ display: "none" }}
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (formfDocStatus === 0 || formfDocStatus === 2)) ||
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
                        (formfDocStatus === 0 || formfDocStatus === 2)) ||
                      (candidateProfileData.verificationStatus === 0 &&
                        candidateProfileData.documentUploaded === 0)
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="formf"
                      className="custom_file_Upload_button"
                      disabled={
                        (candidateProfileData.documentUploaded === 1 &&
                          candidateProfileData.verificationStatus === 2 &&
                          (formfDocStatus === 0 || formfDocStatus === 2)) ||
                        (candidateProfileData.verificationStatus === 0 &&
                          candidateProfileData.documentUploaded === 0)
                          ? false
                          : true
                      }
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    />
                    Upload File{" "}
                    <i
                      id="custom_file_upload_icon"
                      className="fa fa-upload"
                      aria-hidden="true"
                    ></i>
                  </label>
                </div>
                {FormFError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the Form F
                    Gratuity
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </React.Fragment>

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
export default PFDeclaration;
