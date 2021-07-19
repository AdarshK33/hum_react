import React, { Fragment, useState, useContext, useEffect } from "react";
import { Row, Col, Container, Modal, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import './OnBoard.css'
import "./Documents.css";
import { OnBoardContext } from "../../context/OnBoardState";
import { OfferContext } from "../../context/OfferState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
// File Type list:
// Photo = 0
// Aadhaar = 1
// PAN = 2
// Address = 3
// EPF = 4
// Cheque = 5
// Education = 6
// RelievingLetter = 7
// LatestPayslips = 8
// OfferLetter = 9

const Documents = (props) => {
  const {
    uploadFile,
    candidateProfileData,
    documentView,
    documentViewData,
    candidateViewInfo,
    CandidateViewInformation,
    pfDeclarationView,
    PFDeclarationView,
    completeDocumentUpload,
  } = useContext(OnBoardContext);
  const {
    candidateData,
    aadhaarNotificationData,
    adhaarVerificationNotification,
  } = useContext(OfferContext);
  const [fileName, setFileName] = useState("");
  const [fullTime, setFullTime] = useState(true);
  const [partTime, setParTime] = useState(false);
  const [localExpact, setLocalExpact] = useState(false);
  const [internship, setInternship] = useState(false);
  const [isChecked, changeState] = useState(false);
  const [photoIdError, setPhotoIdError] = useState(false);
  const [aadharIdError, setAadharIdError] = useState(false);
  const [panIdError, setPanIdError] = useState(false);
  const [addressProofError, setAddressProofError] = useState(false);
  const [cancelledChequeError, setCancelledChequeError] = useState(false);
  const [eduCertificatesError, setEduCertificatesError] = useState(false);
  const [relievingLetterError, setRelievingLetterError] = useState(false);
  const [EPFError, setEPFError] = useState(false);
  const [latestPaySlipsError, setLatestPaySlipsError] = useState(false);
  const [frroError, setFrroError] = useState(false);
  const [passportError, setPassPortError] = useState(false);
  const [collegeIdError, setCollegeError] = useState(false);
  const [collegeLetterError, setCollegeLetterError] = useState(false);
  const [CandidateFirstJob, setCandidateFirstJob] = useState(false);
  const [onDocumentPopup, setOnDocumentPopup] = useState(false);
  const [onDocumentProceed, setOnDocumentProceed] = useState(false);
  // const [fileUpload, setFileUpload] = useState();
  const [workInfoData, setWorkInfoData] = useState();
  useEffect(() => {
    console.log("candidateProfileData", candidateProfileData);
    console.log("candidateData", candidateData);
  }, [candidateProfileData]);

  useEffect(() => {
    console.log("personal information view candidate", candidateProfileData);
    if (candidateProfileData) {
      CandidateViewInformation(candidateProfileData.candidateId);
    }
  }, [candidateProfileData]);
  console.log("personal information candidateViewInfo-->", candidateViewInfo);
  useEffect(() => {
    if (
      candidateViewInfo !== null &&
      candidateViewInfo !== undefined &&
      candidateViewInfo
    ) {
      setWorkInfoData(candidateViewInfo);
    }
  }, [candidateViewInfo]);
  console.log("contractType", workInfoData);

  useEffect(() => {
    documentView(candidateProfileData.candidateId);
  }, [candidateProfileData]);
  console.log("documentViewData", documentViewData);

  useEffect(() => {
    PFDeclarationView(candidateProfileData.candidateId);
  }, [candidateProfileData]);
  // console.log(pfDeclarationView, "<------pfDeclarationViewuse");

  useEffect(() => {
    if (
      pfDeclarationView !== null &&
      pfDeclarationView !== undefined &&
      Object.keys(pfDeclarationView).length !== 0 &&
      pfDeclarationView.firstJob !== null &&
      pfDeclarationView.firstJob !== undefined
    ) {
      if (pfDeclarationView.firstJob === true) {
        setCandidateFirstJob(false);
      } else {
        setCandidateFirstJob(true);
      }
    }
  }, [candidateProfileData, pfDeclarationView]);

  useEffect(() => {
    if (
      workInfoData !== null &&
      workInfoData !== undefined &&
      Object.keys(workInfoData).length !== 0 &&
      workInfoData.contractType !== null
    ) {
      if (workInfoData.contractType === "Permanent") {
        console.log("permanent");
        setFullTime(true);
        setParTime(false);
        setInternship(false);
        setLocalExpact(false);
      } else if (workInfoData.contractType === "Parttime") {
        console.log("Parttime");
        setParTime(true);
        setFullTime(false);
        setInternship(false);
        setLocalExpact(false);
      } else if (workInfoData.contractType === "Internship") {
        setInternship(true);
        setParTime(false);
        setFullTime(false);
        setLocalExpact(false);
      } else if (workInfoData.contractType === "Local Expat") {
        setLocalExpact(true);
        setParTime(false);
        setFullTime(false);
        setInternship(false);
      }
      whichOneIsRequired();
    }
  }, [workInfoData]);
  const [state, setState] = useState({
    photoId: "",
    aadharId: "",
    panId: "",
    addressProof: "",
    passport: "",
    epfPassBook: "",
    cancelledCheque: "",
    educationCertificate: "",
    relievingLetter: "",
    latestPaySlips: "",
    frro: "",
    collegeId: "",
    collegeLetter: "",
    disabilityDocument: "",
    form11: "",
    form2epf: "",
    formf: "",
  });
  const [stateOfName, setStateOfNames] = useState({
    photoId: "",
    aadharId: "",
    panId: "",
    addressProof: "",
    passport: "",
    epfPassBook: "",
    cancelledCheque: "",
    educationCertificate: "",
    relievingLetter: "",
    latestPaySlips: "",
    frro: "",
    collegeId: "",
    collegeLetter: "",
  });
  const [stateOfDisable, setStateOfDisable] = useState({
    photoId: 0,
    aadharId: 0,
    panId: 0,
    addressProof: 0,
    passport: 0,
    epfPassBook: 0,
    cancelledCheque: 0,
    educationCertificate: 0,
    relievingLetter: 0,
    latestPaySlips: 0,
    frro: 0,
    collegeId: 0,
    collegeLetter: 0,
  });
  const [adminDocApprove, setAdminDocApprove] = useState({
    aadharId: 0,
    epfPassBook: 0,
    cancelledCheque: 0,
  });

  const [UploadedArray, setUploadedError] = useState([
    {
      ULPhotoId: false,
      ULAdharId: false,
      ULPanId: false,
      ULAddressProof: false,
      ULEpfPassBook: false,
      ULCancelledCheque: false,
      ULFrro: false,
      ULPassport: false,
      ULCollegeId: false,
      ULCollegeLetter: false,
      ULEducationCer: false,
      ULRelivingLetter: false,
      ULLatestPaySlip: false,
    },
  ]);

  useEffect(() => {
    if (documentViewData !== null && documentViewData !== undefined) {
      let photo = "";
      let aadhar = "";
      let pan = "";
      let address = "";
      let passportDoc = "";
      let epfPassBookDoc = "";
      let cancelledChequeDoc = "";
      let educationCertificateDoc = "";
      let relievingLetterDoc = "";
      let latestPaySlipsDoc = "";
      let frroDoc = "";
      let collegeIdDoc = "";
      let collegeLetterDoc = "";
      let photoStatus = 0;
      let aadharStatus = 0;
      let panStatus = 0;
      let addressStatus = 0;
      let passportDocStatus = 0;
      let epfPassBookDocStatus = 0;
      let cancelledChequeDocStatus = 0;
      let educationCertificateDocStatus = 0;
      let relievingLetterDocStatus = 0;
      let latestPaySlipsDocStatus = 0;
      let frroDocStatus = 0;
      let collegeIdDocStatus = 0;
      let collegeLetterDocStatus = 0;
      let adminAadharId = 0;
      let adminEpfPassBook = 0;
      let adminCancelledCheque = 0;

      let tempArray = [...UploadedArray];

      documentViewData.map((item) => {
        console.log("item.documentType", item.documentType, item);
        if (item.documentType === 0 && item.documentName) {
          console.log("photodoc", item.documentName, item.documentType);
          photo = item.documentName ? item.documentName : "";
          photoStatus = item.status ? item.status : 0;
          tempArray[0].ULPhotoId = true;
        }

        if (item.documentType === 1 && item.documentName) {
          aadhar = item.documentName ? item.documentName : "";
          aadharStatus = item.status ? item.status : 0;
          adminAadharId = item.adminStatus ? item.adminStatus : 0;
          tempArray[0].ULAdharId = true;
        }

        if (item.documentType === 2 && item.documentName) {
          pan = item.documentName ? item.documentName : "";
          panStatus = item.status ? item.status : 0;
          tempArray[0].ULPanId = true;
        }

        if (item.documentType === 3 && item.documentName) {
          address = item.documentName ? item.documentName : "";
          addressStatus = item.status ? item.status : 0;
          tempArray[0].ULAddressProof = true;
        }

        if (item.documentType === 14 && item.documentName) {
          passportDoc = item.documentName ? item.documentName : "";
          passportDocStatus = item.status ? item.status : 0;
          tempArray[0].ULPassport = true;
        }

        if (item.documentType === 17 && item.documentName) {
          frroDoc = item.documentName ? item.documentName : "";
          frroDocStatus = item.status ? item.status : 0;
          tempArray[0].ULFrro = true;
        }

        if (item.documentType === 4 && item.documentName) {
          epfPassBookDoc = item.documentName ? item.documentName : "";
          epfPassBookDocStatus = item.status ? item.status : 0;
          adminEpfPassBook = item.adminStatus ? item.adminStatus : 0;
          tempArray[0].ULEpfPassBook = true;
        }

        if (item.documentType === 5 && item.documentName) {
          cancelledChequeDoc = item.documentName ? item.documentName : "";
          cancelledChequeDocStatus = item.status ? item.status : 0;
          adminCancelledCheque = item.adminStatus ? item.adminStatus : 0;
          tempArray[0].ULCancelledCheque = true;
        }

        if (item.documentType === 15 && item.documentName) {
          collegeLetterDoc = item.documentName ? item.documentName : "";
          collegeLetterDocStatus = item.status ? item.status : 0;
          tempArray[0].ULCollegeLetter = true;
        }

        if (item.documentType === 16 && item.documentName) {
          collegeIdDoc = item.documentName ? item.documentName : "";
          collegeIdDocStatus = item.status ? item.status : 0;
          tempArray[0].ULCollegeId = true;
        }

        if (item.documentType === 6 && item.documentName) {
          educationCertificateDoc = item.documentName ? item.documentName : "";
          educationCertificateDocStatus = item.status ? item.status : 0;
          tempArray[0].ULEducationCer = true;
        }

        if (item.documentType === 7 && item.documentName) {
          relievingLetterDoc = item.documentName ? item.documentName : "";
          relievingLetterDocStatus = item.status ? item.status : 0;
          tempArray[0].ULRelivingLetter = true;
        }

        if (item.documentType === 8 && item.documentName) {
          latestPaySlipsDoc = item.documentName ? item.documentName : "";
          latestPaySlipsDocStatus = item.status ? item.status : 0;
          tempArray[0].ULLatestPaySlip = true;
        }
      });
      setStateOfNames({
        photoId: photo,
        aadharId: aadhar,
        panId: pan,
        addressProof: address,
        passport: passportDoc,
        epfPassBook: epfPassBookDoc,
        cancelledCheque: cancelledChequeDoc,
        educationCertificate: educationCertificateDoc,
        relievingLetter: relievingLetterDoc,
        latestPaySlips: latestPaySlipsDoc,
        frro: frroDoc,
        collegeId: collegeIdDoc,
        collegeLetter: collegeLetterDoc,
      });
      setStateOfDisable({
        photoId: photoStatus,
        aadharId: aadharStatus,
        panId: panStatus,
        addressProof: addressStatus,
        passport: passportDocStatus,
        epfPassBook: epfPassBookDocStatus,
        cancelledCheque: cancelledChequeDocStatus,
        educationCertificate: educationCertificateDocStatus,
        relievingLetter: relievingLetterDocStatus,
        latestPaySlips: latestPaySlipsDocStatus,
        frro: frroDocStatus,
        collegeId: collegeIdDocStatus,
        collegeLetter: collegeLetterDocStatus,
      });
      setAdminDocApprove({
        aadharId: adminAadharId,
        epfPassBook: adminEpfPassBook,
        cancelledCheque: adminCancelledCheque,
      });
      setUploadedError(tempArray);
    }
  }, [documentViewData]);

  console.log("state.photoId", state, state.photoId);
  const [FandP_Time_Required, setFandP_Required] = useState([
    {
      ReqPhotoId: false,
      ReqAdharId: false,
      ReqPanId: false,
      ReqAddressProof: false,
      ReqEpfPassBook: false,
      ReqCancelledCheque: false,
      ReqFrro: false,
      ReqPassport: false,
      ReqCollegeId: false,
      ReqCollegeLetter: false,
    },
  ]);

  const whichOneIsRequired = () => {
    if ((partTime === true) | (fullTime === true)) {
      let tempArray = [...FandP_Time_Required];
      tempArray[0].ReqPhotoId = true;
      tempArray[0].ReqAdharId = true;
      tempArray[0].ReqPanId = true;
      tempArray[0].ReqAddressProof = true;
      tempArray[0].ReqEpfPassBook = true;
      tempArray[0].ReqCancelledCheque = true;
      tempArray[0].ReqFrro = false;
      tempArray[0].ReqPassport = false;
      tempArray[0].ReqCollegeId = false;
      tempArray[0].ReqCollegeLetter = false;
      setFandP_Required(tempArray);
    }
    if (localExpact === true) {
      let tempArray = [...FandP_Time_Required];
      tempArray[0].ReqPhotoId = true;
      tempArray[0].ReqAdharId = false;
      tempArray[0].ReqPanId = false;
      tempArray[0].ReqAddressProof = false;
      tempArray[0].ReqEpfPassBook = false;
      tempArray[0].ReqCancelledCheque = false;
      tempArray[0].ReqFrro = true;
      tempArray[0].ReqPassport = true;
      tempArray[0].ReqCollegeId = false;
      tempArray[0].ReqCollegeLetter = false;
    }
    if (internship === true) {
      let tempArray = [...FandP_Time_Required];
      tempArray[0].ReqPhotoId = true;
      tempArray[0].ReqAdharId = false;
      tempArray[0].ReqPanId = false;
      tempArray[0].ReqAddressProof = true;
      tempArray[0].ReqEpfPassBook = false;
      tempArray[0].ReqCancelledCheque = true;
      tempArray[0].ReqFrro = false;
      tempArray[0].ReqPassport = false;
      tempArray[0].ReqCollegeId = true;
      tempArray[0].ReqCollegeLetter = true;
    }
  };
  // whichOneIsRequired();
  // console.log(FandP_Time_Required);
  const PhotoIdErrorValidation = () => {
    if (stateOfName.photoId !== "") {
      setPhotoIdError(false);
      console.log("photoSuccess");
      return true;
    } else {
      setPhotoIdError(true);
      console.log("photoFail");
      return false;
    }
  };
  const AadharIdErrorValidation = () => {
    if (stateOfName.aadharId !== "") {
      setAadharIdError(false);
      console.log("aadharSuccess");
      return true;
    } else {
      setAadharIdError(true);
      console.log("aadharFail");
      return false;
    }
  };
  const PanIdErrorValidation = () => {
    if (stateOfName.panId !== "") {
      setPanIdError(false);
      console.log("panSuccess");
      return true;
    } else {
      setPanIdError(true);
      console.log("panFail");
      return false;
    }
  };
  const AddressProofValidation = () => {
    if (stateOfName.addressProof !== "") {
      setAddressProofError(false);
      console.log("addressSuccess");
      return true;
    } else {
      setAddressProofError(true);
      console.log("addressFail");
      return false;
    }
  };

  const CancelledChequeValidation = () => {
    if (stateOfName.cancelledCheque !== "") {
      setCancelledChequeError(false);
      console.log("cancelledchequeSuccess");
      return true;
    } else {
      setCancelledChequeError(true);
      console.log("cancelledcheqFail");
      return false;
    }
  };
  const PassPortValidation = () => {
    if (stateOfName.passport !== "") {
      setPassPortError(false);
      console.log("passportSuccess");
      return true;
    } else {
      setPassPortError(true);
      console.log("passportFail");
      return false;
    }
  };
  const EPFValidation = () => {
    if (stateOfName.epfPassBook !== "") {
      setEPFError(false);
      console.log("passportSuccess");
      return true;
    } else {
      setEPFError(true);
      console.log("passportFail");
      return false;
    }
  };
  const FrroValidation = () => {
    if (stateOfName.frro !== "") {
      setFrroError(false);
      console.log("frroSuccess");
      return true;
    } else {
      setFrroError(true);
      console.log("frroFail");
      return false;
    }
  };
  const CollegeLetterValidation = () => {
    if (stateOfName.collegeLetter !== "") {
      setCollegeLetterError(false);
      console.log("collegeLetterSuccess");
      return true;
    } else {
      setCollegeLetterError(true);
      console.log("collegeLetterFail");
      return false;
    }
  };
  const CollegeIdValidation = () => {
    if (stateOfName.collegeId !== "") {
      setCollegeError(false);
      console.log("collegeIdSuccess");
      return true;
    } else {
      setCollegeError(true);
      console.log("collegeIdFail");
      return false;
    }
  };

  const EducationCertificatesValidation = () => {
    if (stateOfName.educationCertificate !== "") {
      setEduCertificatesError(false);
      console.log("eduSuccess");
      return true;
    } else {
      setEduCertificatesError(true);
      console.log("eduFail");
      return false;
    }
  };
  const RelievingLetterValidation = () => {
    if (stateOfName.relievingLetter !== "") {
      setRelievingLetterError(false);
      console.log("releivingSuccess");
      return true;
    } else {
      setRelievingLetterError(true);
      console.log("releivingFail");
      return false;
    }
  };
  const PaySlipsValidation = () => {
    if (stateOfName.latestPaySlips !== "") {
      console.log("in if Validation");
      setLatestPaySlipsError(false);
      console.log("payslipsSuccess");
      return true;
    } else {
      console.log("in else Validation");

      setLatestPaySlipsError(true);
      console.log("paySlipsFail");
      return false;
    }
  };

  // UPLOAD VALIDATIONS

  const PhotoIdUploadValidation = () => {
    if (FandP_Time_Required[0].ReqPhotoId === true) {
      if (UploadedArray[0].ULPhotoId === false) {
        if (PhotoIdErrorValidation() === true) {
          setPhotoIdError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const AadharIdUploadValidation = () => {
    if (FandP_Time_Required[0].ReqAdharId === true) {
      if (UploadedArray[0].ULAdharId === false) {
        if (AadharIdErrorValidation() === true) {
          setAadharIdError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const PanIdUploadValidation = () => {
    if (FandP_Time_Required[0].ReqPanId === true) {
      if (UploadedArray[0].ULPanId === false) {
        if (PanIdErrorValidation() === true) {
          setPanIdError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const AddressProfUploadValidation = () => {
    if (FandP_Time_Required[0].ReqAddressProof === true) {
      if (UploadedArray[0].ULAddressProof === false) {
        if (AddressProofValidation() === true) {
          setAddressProofError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const EpfPassBookUploadValidation = () => {
    if (
      pfDeclarationView !== null &&
      pfDeclarationView !== undefined &&
      Object.keys(pfDeclarationView).length !== 0 &&
      pfDeclarationView.memberOfPensionScheme === true &&
      pfDeclarationView.uanNumber !== ""
    ) {
      if (FandP_Time_Required[0].ReqEpfPassBook === true) {
        if (UploadedArray[0].ULEpfPassBook === false) {
          if (EPFValidation() === true) {
            setEPFError(true);
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const CancelledChequeUploadValidation = () => {
    if (FandP_Time_Required[0].ReqCancelledCheque === true) {
      if (UploadedArray[0].ULCancelledCheque === false) {
        if (CancelledChequeValidation() === true) {
          setCancelledChequeError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const FrroUploadValidation = () => {
    if (FandP_Time_Required[0].ReqFrro === true) {
      if (UploadedArray[0].ULFrro === false) {
        if (FrroValidation() === true) {
          setFrroError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const PassPortUploadValidation = () => {
    if (FandP_Time_Required[0].ReqPassport === true) {
      if (UploadedArray[0].ULPassport === false) {
        if (PassPortValidation() === true) {
          setPassPortError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const CollegeIdUploadValidation = () => {
    if (FandP_Time_Required[0].ReqCollegeId === true) {
      if (UploadedArray[0].ULCollegeId === false) {
        if (CollegeIdValidation() === true) {
          setCollegeError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const CollegeLetterUploadValidation = () => {
    if (FandP_Time_Required[0].ReqCollegeLetter === true) {
      if (UploadedArray[0].ULCollegeLetter === false) {
        if (CollegeLetterValidation() === true) {
          setCollegeLetterError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const EduCetificateUploadValidation = () => {
    if (UploadedArray[0].ULEducationCer === false) {
      if (EducationCertificatesValidation() === true) {
        setEduCertificatesError(true);
        return false;
      }
    } else {
      return true;
    }
  };
  const RelivingLetterUploadValidation = () => {
    if (CandidateFirstJob === true) {
      if (UploadedArray[0].ULRelivingLetter === false) {
        if (RelievingLetterValidation() === true) {
          setRelievingLetterError(true);
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const LatestPaySlipsUploadValidation = () => {
    if (CandidateFirstJob === true) {
      if (UploadedArray[0].ULLatestPaySlip === false) {
        console.log("Upload in if");

        if (PaySlipsValidation() === true) {
          console.log("Upload in nested if");

          setLatestPaySlipsError(true);
          return false;
        }
      } else {
        console.log("Upload in else");
        return true;
      }
    } else {
      return true;
    }
  };

  const isAllFilesUploaded1 = () => {
    if (
      (PhotoIdUploadValidation() === true) &
      (AadharIdUploadValidation() === true) &
      (PanIdUploadValidation() === true) &
      (AddressProfUploadValidation() === true) &
      (EpfPassBookUploadValidation() === true) &
      (CancelledChequeUploadValidation() === true) &
      (FrroUploadValidation() === true) &
      (PassPortUploadValidation() === true) &
      (CollegeIdUploadValidation() === true) &
      (CollegeLetterUploadValidation() === true) &
      (EduCetificateUploadValidation() === true) &
      (RelivingLetterUploadValidation() === true) &
      (LatestPaySlipsUploadValidation() === true)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isAllFilesUploaded = () => {
    if ((partTime === true) | (fullTime === true)) {
      console.log(
        "validation status",
        PhotoIdUploadValidation(),
        AadharIdUploadValidation(),
        PanIdUploadValidation(),
        AddressProfUploadValidation(),
        EpfPassBookUploadValidation(),
        CancelledChequeUploadValidation(),
        FrroUploadValidation(),
        PassPortUploadValidation(),
        CollegeIdUploadValidation(),
        CollegeLetterUploadValidation(),
        EduCetificateUploadValidation(),
        RelivingLetterUploadValidation(),
        LatestPaySlipsUploadValidation()
      );
      if (
        (PhotoIdUploadValidation() === true) &
        (AadharIdUploadValidation() === true) &
        (PanIdUploadValidation() === true) &
        (AddressProfUploadValidation() === true) &
        (EpfPassBookUploadValidation() === true) &
        (CancelledChequeUploadValidation() === true) &
        (FrroUploadValidation() === true) &
        (PassPortUploadValidation() === true) &
        (CollegeIdUploadValidation() === true) &
        (CollegeLetterUploadValidation() === true)
      ) {
        if (
          (EduCetificateUploadValidation() === true) &
          (RelivingLetterUploadValidation() === true) &
          (LatestPaySlipsUploadValidation() === true)
        ) {
          return true;
        } else {
          console.log("its came if statement");
          handleShifting();
          return false;
        }
      } else if (
        (EduCetificateUploadValidation() === true) &
        (RelivingLetterUploadValidation() === true) &
        (LatestPaySlipsUploadValidation() === true)
      )
        if (
          (PhotoIdUploadValidation() === true) &
          (AadharIdUploadValidation() === true) &
          (PanIdUploadValidation() === true) &
          (AddressProfUploadValidation() === true) &
          (EpfPassBookUploadValidation() === true) &
          (CancelledChequeUploadValidation() === true) &
          (FrroUploadValidation() === true) &
          (PassPortUploadValidation() === true) &
          (CollegeIdUploadValidation() === true) &
          (CollegeLetterUploadValidation() === true)
        ) {
          return true;
        } else {
          console.log("its came on else if statement");
          handleShifting();
          return false;
        }
      {
        return false;
      }
    } else {
      if (
        (PhotoIdUploadValidation() === true) &
        (AadharIdUploadValidation() === true) &
        (PanIdUploadValidation() === true) &
        (AddressProfUploadValidation() === true) &
        (EpfPassBookUploadValidation() === true) &
        (CancelledChequeUploadValidation() === true) &
        (FrroUploadValidation() === true) &
        (PassPortUploadValidation() === true) &
        (CollegeIdUploadValidation() === true) &
        (CollegeLetterUploadValidation() === true)
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const saveHandler = () => {
    const value = isAllFilesUploaded();
    console.log("ERROR-->", latestPaySlipsError, state.latestPaySlips);
    console.log(value);
    if (value === true) {
      completeDocumentUpload(candidateProfileData.candidateId);
      console.log(state);
      setOnDocumentProceed(true);
      const nextPage = props.NextStep;
      // nextPage(true);
    }
  };

  const PrevStep = () => {
    console.log("previous");
    const back = props.PrevStep;
    back();
  };

  const handleShifting = () => {
    changeState(!isChecked);
    console.log(!isChecked);
  };
  // const changeHandler = (e) => {
  //   let fileObj = e.target.files;
  // setState({
  //   ...state,
  //   [e.target.name]: fileObj[0].name,
  // });
  //   console.log(state);
  // };

  const changeHandler = (event) => {
    console.log("changeHandler", event.target.name);
    let fileObj = event.target.files[0];
    console.log("photoIdChangeHandler", fileObj);
    setState({
      ...state,
      [event.target.name]: fileObj,
    });
    setStateOfNames({
      ...stateOfName,
      [event.target.name]: fileObj.name,
    });

    if (event.target.name === "photoId") {
      UploadedArray[0].ULPhotoId = false;
    } else if (event.target.name === "aadharId") {
      UploadedArray[0].ULAdharId = false;
    } else if (event.target.name === "panId") {
      UploadedArray[0].ULPanId = false;
    } else if (event.target.name === "addressProof") {
      UploadedArray[0].ULAddressProof = false;
    } else if (event.target.name === "passport") {
      UploadedArray[0].ULPassport = false;
    } else if (event.target.name === "frro") {
      UploadedArray[0].ULFrro = false;
    } else if (event.target.name === "epfPassBook") {
      UploadedArray[0].ULEpfPassBook = false;
    } else if (event.target.name === "cancelledCheque") {
      UploadedArray[0].ULCancelledCheque = false;
    } else if (event.target.name === "collegeLetter") {
      UploadedArray[0].ULCollegeLetter = false;
    } else if (event.target.name === "collegeId") {
      UploadedArray[0].ULCollegeId = false;
    } else if (event.target.name === "educationCertificate") {
      UploadedArray[0].ULEducationCer = false;
    } else if (event.target.name === "relievingLetter") {
      UploadedArray[0].ULRelivingLetter = false;
    } else if (event.target.name === "latestPaySlips") {
      console.log("uploading payslip");
      UploadedArray[0].ULLatestPaySlip = false;
    }
  };

  const handleUpload = (event) => {
    console.log("changeHandler", event.target.name);
    let fileType;
    let fileUpload;

    if (event.target.name === "photoId") {
      if (PhotoIdErrorValidation() === true) {
        fileUpload = state.photoId;
        fileType = 0;
        UploadedArray[0].ULPhotoId = true;
      }
    } else if (event.target.name === "aadharId") {
      if (AadharIdErrorValidation() === true) {
        fileUpload = state.aadharId;
        fileType = 1;
        UploadedArray[0].ULAdharId = true;
      }
    } else if (event.target.name === "panId") {
      if (PanIdErrorValidation() === true) {
        fileUpload = state.panId;
        fileType = 2;
        UploadedArray[0].ULPanId = true;
      }
    } else if (event.target.name === "addressProof") {
      if (AddressProofValidation() === true) {
        fileUpload = state.addressProof;
        fileType = 3;
        UploadedArray[0].ULAddressProof = true;
      }
    } else if (event.target.name === "passport") {
      if (PassPortValidation() === true) {
        fileUpload = state.passport;
        fileType = 14;
        UploadedArray[0].ULPassport = true;
      }
    } else if (event.target.name === "frro") {
      if (FrroValidation() === true) {
        fileUpload = state.frro;
        fileType = 17;
        UploadedArray[0].ULFrro = true;
      }
    } else if (event.target.name === "epfPassBook") {
      if (EPFValidation() === true) {
        fileUpload = state.epfPassBook;
        fileType = 4;
        UploadedArray[0].ULEpfPassBook = true;
      }
    } else if (event.target.name === "cancelledCheque") {
      if (CancelledChequeValidation() === true) {
        fileUpload = state.cancelledCheque;
        fileType = 5;
        UploadedArray[0].ULCancelledCheque = true;
      }
    } else if (event.target.name === "collegeLetter") {
      if (CollegeLetterValidation() === true) {
        fileUpload = state.collegeLetter;
        fileType = 15;
        UploadedArray[0].ULCollegeLetter = true;
      }
    } else if (event.target.name === "collegeId") {
      if (CollegeIdValidation() === true) {
        fileUpload = state.collegeId;
        fileType = 16;
        UploadedArray[0].ULCollegeId = true;
      }
    } else if (event.target.name === "educationCertificate") {
      if (EducationCertificatesValidation() === true) {
        fileUpload = state.educationCertificate;
        fileType = 6;
        UploadedArray[0].ULEducationCer = true;
      }
    } else if (event.target.name === "relievingLetter") {
      if (RelievingLetterValidation() === true) {
        fileUpload = state.relievingLetter;
        fileType = 7;
        UploadedArray[0].ULRelivingLetter = true;
      }
    } else if (event.target.name === "latestPaySlips") {
      if (PaySlipsValidation() === true) {
        console.log("payslip true ");
        fileUpload = state.latestPaySlips;
        fileType = 8;
        UploadedArray[0].ULLatestPaySlip = true;
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
      toast.info("Something went wrong");
    }
  };
  const proceedHandler = () => {
    setOnDocumentProceed(false);
    setOnDocumentPopup(true);
  };
  return (
    <Fragment>
      <Row>
        <Modal
          show={onDocumentProceed}
          onHide={() => setOnDocumentProceed(false)}
          centered
          size="md"
        >
          <Container style={{ textAlign: "center", margin: "4rem 0 4rem 0" }}>
            <Modal.Body>
              <h3>Thank You</h3>
              <h6 style={{ marginBottom: "1rem" }}>
                Thank you for filling the onboarding details. Do you wish to
                proceed?
              </h6>{" "}
              <b style={{ color: "red" }}>
                Note: Once you click on Yes, no further editing will be allowed
              </b>
              <Button
                style={{ margin: "1rem 2rem 0", width: "100px" }}
                onClick={() => proceedHandler()}
              >
                Yes
              </Button>
              <Button
                style={{ margin: "1rem 0 0", width: "100px" }}
                onClick={() => setOnDocumentProceed(false)}
              >
                No
              </Button>
            </Modal.Body>
          </Container>
        </Modal>
        <Modal
          show={onDocumentPopup}
          onHide={() => setOnDocumentPopup(false)}
          centered
          size="md"
        >
          <Container style={{ textAlign: "center", margin: "4rem 0 4rem 0" }}>
            <Modal.Body>
              <h3>Thank You</h3>
              <h6 style={{ marginBottom: "1rem" }}>
                Your details have been sent to our verification team, please
                wait to hear from us
              </h6>{" "}
              <Link
                style={{
                  color: "#ffffff",
                  textDecoration: "none !important",
                }}
                to="/offer"
              >
                <Button
                  style={{ width: "100px" }}
                  onClick={() => setOnDocumentPopup(false)}
                >
                  Close
                </Button>
              </Link>
            </Modal.Body>
          </Container>
        </Modal>
        <ToastContainer />
        {localExpact !== true ? (
          <Col>
            <div className="parent">
              <button
                className="buttonField1 button"
                disabled={!isChecked}
                onClick={handleShifting}
              >
                Personal Documents
              </button>
              <button
                className="buttonField2 button"
                disabled={isChecked}
                onClick={handleShifting}
              >
                Education & Work Documents
              </button>
            </div>
          </Col>
        ) : (
          ""
        )}
      </Row>

      {/* personal documents */}
      <Form>
        {isChecked === false ? (
          // required in all contracts
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqPhotoId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Photo ID</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.photoId !== ""
                      ? stateOfName.photoId
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="photoId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      disabled={
                        (stateOfDisable.photoId === 2 ||
                          stateOfDisable.photoId === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                      readOnly
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.photoId === 2 ||
                        stateOfDisable.photoId === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      className="custom_file_Upload_button"
                      name="photoId"
                      disabled={
                        (stateOfDisable.photoId === 2 ||
                          stateOfDisable.photoId === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                      onClick={(e) => {
                        handleUpload(e);
                      }}
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
                {photoIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the photo id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) &
        ((localExpact === true) | (internship === false)) ? (
          //required in full, part time
          // not required for local expact
          //no need on intership
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqAdharId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>
                    Aadhaar ID
                    <span style={{ color: "#47ef47", fontStyle: "italic" }}>
                      (Upload the first and last page)
                    </span>
                  </label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.aadharId !== ""
                      ? stateOfName.aadharId
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="aadharId"
                      disabled={
                        (stateOfDisable.aadharId === 2 ||
                          stateOfDisable.aadharId === 0 ||
                          adminDocApprove.aadharId === 2 ||
                          adminDocApprove.aadharId === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.aadharId === 2 ||
                        stateOfDisable.aadharId === 0 ||
                        adminDocApprove.aadharId === 2 ||
                        adminDocApprove.aadharId === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="aadharId"
                      className="custom_file_Upload_button"
                      disabled={
                        (stateOfDisable.aadharId === 2 ||
                          stateOfDisable.aadharId === 0 ||
                          adminDocApprove.aadharId === 2 ||
                          adminDocApprove.aadharId === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                      onClick={(e) => {
                        handleUpload(e);
                      }}
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
                {aadharIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the aadhaar
                    id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) &
        ((localExpact === true) | (internship === false)) ? (
          //required in full, part time
          // not required for local expact
          //no need on intership
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqPanId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>PAN ID</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.panId !== ""
                      ? stateOfName.panId
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="panId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      disabled={
                        (stateOfDisable.panId === 2 ||
                          stateOfDisable.panId === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                      readOnly
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.panId === 2 ||
                        stateOfDisable.panId === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="panId"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.panId === 2 ||
                          stateOfDisable.panId === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {panIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the PAN id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) &
        ((localExpact === false) | (internship === true)) ? (
          // required in internshipp,  full, part time
          //no need on local expact
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqAddressProof
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Address Proof</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.addressProof !== ""
                      ? stateOfName.addressProof
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="addressProof"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.addressProof === 2 ||
                          stateOfDisable.addressProof === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.addressProof === 2 ||
                        stateOfDisable.addressProof === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="addressProof"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.addressProof === 2 ||
                          stateOfDisable.addressProof === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {addressProofError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the address
                    Proof
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) & (localExpact === true) ? (
          // only on locak Expact  and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqPassport
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Passport</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.passport !== ""
                      ? stateOfName.passport
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="passport"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.passport === 2 ||
                          stateOfDisable.passport === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.passport === 2 ||
                        stateOfDisable.passport === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="passport"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.passport === 2 ||
                          stateOfDisable.passport === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {passportError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the passport
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) & (localExpact === true) ? (
          // only on locak Expact  and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqFrro
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>FRRO</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.frro !== ""
                      ? stateOfName.frro
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="frro"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.frro === 2 ||
                          stateOfDisable.frro === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.frro === 2 ||
                        stateOfDisable.frro === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="frro"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.frro === 2 ||
                          stateOfDisable.frro === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {frroError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the FRRO
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) &
        (localExpact === false) &
        (internship === false) ? (
          // required in full time and part time
          //no need on localexact and internship
          <Row>
            <Col>
              <Form.Group>
                {/* <div
                  className={
                    FandP_Time_Required[0].ReqEpfPassBook
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                > */}
                <div
                  className={
                    pfDeclarationView !== null &&
                    pfDeclarationView !== undefined &&
                    pfDeclarationView.memberOfPensionScheme === true &&
                    pfDeclarationView.uanNumber !== ""
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>
                    EPF Passbook
                    <span style={{ color: "#47ef47", fontStyle: "italic" }}>
                      (First page of the book)
                    </span>
                  </label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.epfPassBook !== ""
                      ? stateOfName.epfPassBook
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="epfPassBook"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.epfPassBook === 2 ||
                          stateOfDisable.epfPassBook === 0 ||
                          adminDocApprove.epfPassBook === 2 ||
                          adminDocApprove.epfPassBook === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.epfPassBook === 2 ||
                        stateOfDisable.epfPassBook === 0 ||
                        adminDocApprove.epfPassBook === 2 ||
                        adminDocApprove.epfPassBook === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="epfPassBook"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.epfPassBook === 2 ||
                          stateOfDisable.epfPassBook === 0 ||
                          adminDocApprove.epfPassBook === 2 ||
                          adminDocApprove.epfPassBook === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {EPFError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the EPF Pass
                    book
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {isChecked === false ? (
          // not required for local expact
          // required in internship, full ,part time
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqCancelledCheque
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>Cancelled Cheque/Pass Book</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.cancelledCheque !== ""
                      ? stateOfName.cancelledCheque
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="cancelledCheque"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.cancelledCheque === 2 ||
                          stateOfDisable.cancelledCheque === 0 ||
                          adminDocApprove.cancelledCheque === 2 ||
                          adminDocApprove.cancelledCheque === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.cancelledCheque === 2 ||
                        stateOfDisable.cancelledCheque === 0 ||
                        adminDocApprove.cancelledCheque === 2 ||
                        adminDocApprove.cancelledCheque === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="cancelledCheque"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.cancelledCheque === 2 ||
                          stateOfDisable.cancelledCheque === 0 ||
                          adminDocApprove.cancelledCheque === 2 ||
                          adminDocApprove.cancelledCheque === 0) &&
                        candidateProfileData.documentUploaded === 0
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

                {cancelledChequeError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                    cancelled cheque
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {(isChecked === false) & (internship === true) ? (
          // only on internship and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqCollegeLetter
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>College Letter</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.collegeLetter !== ""
                      ? stateOfName.collegeLetter
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="collegeLetter"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.collegeLetter === 2 ||
                          stateOfDisable.collegeLetter === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.collegeLetter === 2 ||
                        stateOfDisable.collegeLetter === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="collegeLetter"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.collegeLetter === 2 ||
                          stateOfDisable.collegeLetter === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {collegeLetterError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the college
                    letter
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}

        {(isChecked === false) & (internship === true) ? (
          // only on internship and required
          <Row>
            <Col>
              <Form.Group>
                <div
                  className={
                    FandP_Time_Required[0].ReqCollegeId
                      ? "FileInput"
                      : "FileInputWithOutStar"
                  }
                >
                  <label>College Id</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.collegeId !== ""
                      ? stateOfName.collegeId
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="collegeId"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.collegeId === 2 ||
                          stateOfDisable.collegeId === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.collegeId === 2 ||
                        stateOfDisable.collegeId === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="collegeId"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.collegeId === 2 ||
                          stateOfDisable.collegeId === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {collegeIdError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the college
                    id
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Form>
      {isChecked ? (
        <Form>
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <Form.Group>
                <div className="FileInput">
                  <label>Highest education certification</label>
                </div>
                <div className="parentInput">
                  <label className="fileInputField">
                    &nbsp;&nbsp;
                    {stateOfName.educationCertificate !== ""
                      ? stateOfName.educationCertificate
                      : "Select File Here"}
                    <input
                      type="file"
                      accept="image/jpeg,.pdf"
                      name="educationCertificate"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      readOnly
                      disabled={
                        (stateOfDisable.educationCertificate === 2 ||
                          stateOfDisable.educationCertificate === 0) &&
                        candidateProfileData.documentUploaded === 0
                          ? false
                          : true
                      }
                    />
                  </label>

                  <label
                    className={
                      (stateOfDisable.educationCertificate === 2 ||
                        stateOfDisable.educationCertificate === 0) &&
                      candidateProfileData.documentUploaded === 0
                        ? "custom-file-upload"
                        : "custom-file-disable"
                    }
                  >
                    <input
                      type="button"
                      name="educationCertificate"
                      className="custom_file_Upload_button"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                      disabled={
                        (stateOfDisable.educationCertificate === 2 ||
                          stateOfDisable.educationCertificate === 0) &&
                        candidateProfileData.documentUploaded === 0
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
                {eduCertificatesError ? (
                  <p style={{ color: "red" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the highest
                    education certification
                  </p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </Col>
          </Row>
          {candidateProfileData.contractType !== "Internship" ? (
            <React.Fragment>
              <Row>
                <Col>
                  <Form.Group>
                    <div
                      className={
                        CandidateFirstJob ? "FileInput" : "FileInputWithOutStar"
                      }
                    >
                      <label>Relieving Letter</label>
                    </div>
                    <div className="parentInput">
                      <label className="fileInputField">
                        &nbsp;&nbsp;
                        {stateOfName.relievingLetter !== ""
                          ? stateOfName.relievingLetter
                          : "Select File Here"}
                        <input
                          type="file"
                          accept="image/jpeg,.pdf"
                          name="relievingLetter"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            changeHandler(e);
                          }}
                          readOnly
                          disabled={
                            (stateOfDisable.relievingLetter === 2 ||
                              stateOfDisable.relievingLetter === 0) &&
                            candidateProfileData.documentUploaded === 0
                              ? false
                              : true
                          }
                        />
                      </label>

                      <label
                        className={
                          (stateOfDisable.relievingLetter === 2 ||
                            stateOfDisable.relievingLetter === 0) &&
                          candidateProfileData.documentUploaded === 0
                            ? "custom-file-upload"
                            : "custom-file-disable"
                        }
                      >
                        <input
                          type="button"
                          name="relievingLetter"
                          className="custom_file_Upload_button"
                          onClick={(e) => {
                            handleUpload(e);
                          }}
                          disabled={
                            (stateOfDisable.relievingLetter === 2 ||
                              stateOfDisable.relievingLetter === 0) &&
                            candidateProfileData.documentUploaded === 0
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
                    {relievingLetterError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                        relieving letter
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <div
                      className={
                        CandidateFirstJob ? "FileInput" : "FileInputWithOutStar"
                      }
                    >
                      <label>Latest Payslips</label>
                    </div>
                    <div className="parentInput">
                      <label className="fileInputField">
                        &nbsp;&nbsp;
                        {stateOfName.latestPaySlips !== ""
                          ? stateOfName.latestPaySlips
                          : "Select File Here"}
                        <input
                          type="file"
                          accept="image/jpeg,.pdf"
                          name="latestPaySlips"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            changeHandler(e);
                          }}
                          readOnly
                          disabled={
                            (stateOfDisable.latestPaySlips === 2 ||
                              stateOfDisable.latestPaySlips === 0) &&
                            candidateProfileData.documentUploaded === 0
                              ? false
                              : true
                          }
                        />
                      </label>

                      <label
                        className={
                          (stateOfDisable.latestPaySlips === 2 ||
                            stateOfDisable.latestPaySlips === 0) &&
                          candidateProfileData.documentUploaded === 0
                            ? "custom-file-upload"
                            : "custom-file-disable"
                        }
                      >
                        <input
                          type="button"
                          name="latestPaySlips"
                          className="custom_file_Upload_button"
                          onClick={(e) => {
                            handleUpload(e);
                          }}
                          disabled={
                            (stateOfDisable.latestPaySlips === 2 ||
                              stateOfDisable.latestPaySlips === 0) &&
                            candidateProfileData.documentUploaded === 0
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
                    {latestPaySlipsError ? (
                      <p style={{ color: "red" }}>
                        {" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;*Please select & upload the
                        latest payslips
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            ""
          )}
        </Form>
      ) : (
        ""
      )}
      <div
        style={{ marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}
      >
        <button className="stepperButtons" onClick={PrevStep}>
          Back
        </button>
        <button className="stepperButtons" onClick={saveHandler}>
          Save & Next
        </button>
      </div>
    </Fragment>
  );
};
export default Documents;
