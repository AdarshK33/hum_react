import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DocsVerificationReducer from "../reducers/DocVerificationReducer";
import { toast } from "react-toastify";
import Axios from "axios";
import { access_token } from "../auth/signin";
import html2canvas from "html2canvas";
import { candidate } from "../utils/canditateLogin";
import * as jspdf from 'jspdf';

import codeBase64 from "../components/DSICharter/CharterFile/codeofconduct"
var fileDownload = require("js-file-download");

const initial_state = {
  docsToVerify: [],
  personalInfoData: {},
  addressInfoData: {},
  emergencyInfo: {},
  bankDetails: {},
  nominationDetails: {},
  pfDetails: {},
  acceptStatus: "",
  rejectStatus: "",
  downloadedFile: [],
  uanUpdate: "",
  costCenter: "",
  createStatus: "",
  onBoardData: {},
  empData: {},
  rejectMessage: "",
  step5Status: false,
  step6Status: false,
  aadharStatus: "",
  disApproveAadhar: "",
  verificationStateList: [],
  verificationCityList: [],
  verificationPermanentCityList: [],
  imageData: "",
  insuranceResponse:"",
  itCharterResponse:"",
  rejectUpdate: [],
  adminRejectUpdate: [],
  candidateVerificationList:[]
};
export const DocsVerifyContext = createContext();
export const DocsVerificationProvider = (props) => {
  const [state, dispatch] = useReducer(DocsVerificationReducer, initial_state);
  const [loader, setLoader] = useState(false);

  // fetching candidate documents for verification
  const verificationDocsView = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/document?candidateId=" + candidateId)
      .then((response) => {
        state.docsToVerify = response.data.data;
        setLoader(false);

        return dispatch({
          type: "DOCUMENSTS_TO_VERIFY",
          payload: state.docsToVerify,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetching candidate personalInfo based on candidateId

  const personalInfo = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/view/" + candidateId)
      .then((response) => {
        state.personalInfoData = response.data.data;
        setLoader(false);
        return dispatch({
          type: "PERSONAL_INFO_TO_VERIFY",
          payload: state.personalInfoData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MakePersonalInfoNull = () => {
    state.personalInfoData = {};
    return dispatch({
      type: "PERSONAL_INFO_TO_VERIFY",
      payload: state.personalInfoData,
    });
  };
  // fetching addressInformation of candidate based on candidateId
  const addressInfo = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/" + candidateId + "/address")
      .then((response) => {
        state.addressInfoData = response.data.data;
        setLoader(false);
        return dispatch({
          type: "ADDRESS_INFO_TO_VERIFY",
          payload: state.addressInfoData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // fetching emergencyContact information based on candidateId
  const contactInformation = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/" + candidateId + "/contact")
      .then((response) => {
        state.emergencyInfo = response.data.data;
        setLoader(false);
        return dispatch({
          type: "CONTACT_INFO_TO_VERIFY",
          payload: state.emergencyInfo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bankDetailsData = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/" + candidateId + "/bank")
      .then((response) => {
        state.bankDetails = response.data.data;
        setLoader(false);
        return dispatch({
          type: "BANK_DETAILS_TO_VERIFY",
          payload: state.bankDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNominationDetails = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/" + candidateId + "/nomination")
      .then((response) => {
        console.log(response.data.data);
        state.nominationDetails = response.data.data;
        setLoader(false);
        return dispatch({
          type: "NOMINATION_DETAILS_TO_VERIFY",
          payload: state.nominationDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPfDetails = (candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/" + candidateId + "/pf")
      .then((response) => {
        state.pfDetails = response.data.data;
        setLoader(false);
        return dispatch({
          type: "PF_DETAILS_TO_VERIFY",
          payload: state.pfDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const approveDocument = (docId, candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/document/" + docId + "/accept")
      .then((response) => {
        state.acceptStatus = response.data.status;
        console.log(response.data.status);
        toast.info(response.data.message);

        setLoader(false);
        verificationDocsView(candidateId);
        personalInfo(candidateId);

        return dispatch({
          type: "GET_ACCEPT_STATUS",
          payload: state.acceptStatus,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const approveAadharByAdmin = (docId, candidateId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/document/" + docId + "/approve")
      .then((response) => {
        state.aadharStatus = response.data.message;
        toast.info(response.data.message);
        setLoader(false);
        verificationDocsView(candidateId);
        personalInfo(candidateId);

        return dispatch({
          type: "AADHAR_ACCEPT",
          payload: state.aadharStatus,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const disapproveAadharByAdmin = (docId, candidateId, remarks) => {
    setLoader(true);
    client
      .get(
        "/api/v1/candidate/document/" +
          docId +
          "/disapprove?candidateId=" +
          candidateId +
          "&remark=" +
          remarks
      )
      .then((response) => {
        setLoader(false);
        state.disApproveAadhar = response.data.status;
        toast.info(response.data.message);
        verificationDocsView(candidateId);
        personalInfo(candidateId);
        return dispatch({
          type: "AADHAR_REJECT",
          payload: state.disApproveAadhar,
        });
      });
  };
  const disApproveDocument = (docId, candidateId, remarks) => {
    setLoader(true);
    client
      .get(
        "/api/v1/candidate/document/" +
          docId +
          "/reject?candidateId=" +
          candidateId +
          "&remark=" +
          remarks
      )
      .then((response) => {
        state.rejectStatus = response.data.status;
        toast.info(response.data.message);
        state.rejectMessage = response.data.message;
        setLoader(false);
        verificationDocsView(candidateId);
        personalInfo(candidateId);

        return dispatch({
          type: "GET_REJECT_STATUS",
          payload: state.rejectStatus,
          rejectMessage: state.rejectMessage,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateUANNumber = (candidateId, uan) => {
    setLoader(true);
    client
      .get(
        "/api/v1/candidate/update/uan?candidateId=" +
          candidateId +
          "&uan=" +
          uan
      )
      .then((response) => {
        state.uanUpdate = response.data.message;
        toast.info(response.data.message);
        return dispatch({
          type: "UPDATE_UAN",
          payload: state.uanUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const documentRejectComplete = (candidateId) => {
    client
      .get(
        "/api/v1/candidate/document/reject/complete?candidateId=" + candidateId
      )
      .then((response) => {
        state.rejectUpdate = response.data.message;
        toast.info(response.data.message);
        return dispatch({
          type: "UPDATE_REJECT",
          payload: state.rejectUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const adminRejectComplete = (candidateId) => {
    client
      .get(
        "/api/v1/candidate/document/disapprove/complete?candidateId=" +
          candidateId
      )
      .then((response) => {
        state.adminRejectUpdate = response.data.message;
        toast.info(response.data.message);
        return dispatch({
          type: "ADMIN_UPDATE_REJECT",
          payload: state.adminRejectUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const costCenterSplit = (costCenterData) => {
    setLoader(true);
    client
      .post("/api/v1/cost_centre/split/create", costCenterData)
      .then((response) => {
        console.log(response.data.status);
        state.costCenter = response.data.message;
        // toast.info(response.data.message);
        return dispatch({
          type: "COST_CENTER_CREATE",
          payload: state.costCenter,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewEmployee = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/" + empId)
      .then((response) => {
        state.empData = response.data.data;
        return dispatch({
          type: "VIEW_EMPLOYEE",
          payload: state.empData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createEmployee = (employeData) => {
    setLoader(true);
    client
      .post("/api/v1/employee/create", employeData)
      .then((response) => {
        state.createStatus = response.data.status;
        toast.info(response.data.message);
        // state.empData = response.data.data;
        return dispatch({
          type: "CREATE_EMPLOYEE",
          payload: state.createStatus,
          // payload: state.empData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const candidateOnBoard = (candidateId) => {
    console.log("onboard candidate id",candidateId);
    setLoader(true);
    client
      .get("/api/v1/candidate/onboard?candidateId=" + candidateId)
      .then((response) => {
        state.onBoardData = response.data.data;
        console.log("onboard response",response.data.data,state.onBoardData);
        return dispatch({
          type: "CANDIDATE_ONBOARD",
          payload: state.onBoardData,
        });
      });
  };
  const downloadDocument = (name,employeeId) => {
    Axios({
      url: `${process.env.REACT_APP_BASEURL}api/v1/candidate/document/download/${employeeId}?name=${name}`,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      console.log(response);
      fileDownload(response.data, name);
    });
  };
  const downloadFile = (name,employeeId) => {
    Axios({
      url: `${process.env.REACT_APP_BASEURL}api/v1/document/download/${employeeId}?name=${name}`,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      console.log(response);
      fileDownload(response.data, name);
    });
  };
  const downloadFileOnboard = (name) => {
    Axios({
      url: `${process.env.REACT_APP_BASEURL}api/v2/candidate/documents/download?name=${name}`,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.candidate_access_token}`,
      },
    }).then((response) => {
      console.log(response);
      fileDownload(response.data, name);
    });
  };

  const step5suscessStatus = (val) => {
    state.step5Status = val;
    return dispatch({
      type: "STEP5_STATUS",
      payload: state.step5Status,
    });
  };
  const step6suscessStatus = (val) => {
    state.step6Status = val;
    return dispatch({
      type: "STEP6_STATUS",
      payload: state.step5Status,
    });
  };

  const viewStatesVerification = (country) => {
    return client
      .get("/api/v1/state/view/state/country?country=" + country)
      .then((response) => {
        console.log(response);
        state.verificationStateList = response.data.data;
        return dispatch({
          type: "VIEW_VERIFICATION_STATE",
          payload: state.verificationStateList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewCityVerification = (stateId) => {
    return client
      .get("/api/v1/city/view/city/stateId?stateId=" + stateId)
      .then((response) => {
        console.log(response);
        state.verificationCityList = response.data.data;
        return dispatch({
          type: "VIEW_VERIFICATION_CITY",
          payload: state.verificationCityList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewPermanentCityVerification = (stateId) => {
    return client
      .get("/api/v1/city/view/city/stateId?stateId=" + stateId)
      .then((response) => {
        console.log(response);
        state.verificationPermanentCityList = response.data.data;
        return dispatch({
          type: "VIEW_PERMANENT_VERIFICATION_CITY",
          payload: state.verificationPermanentCityList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadBase64Image = (base64Data) => {
    console.log("base64...........", base64Data);
    return (
      client

        .post("/api/v1/document/file/upload", base64Data)
        // .post("/api/v1/candidate/file/upload", base64Data)
        .then((response) => {
          console.log(response);
          state.imageData = response.data.data;
          return dispatch({ type: "BASE64_UPLOAD", payload: state.imageData });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };
  const ExportPDFandUpload = (
    RefData,
    employeeId = 0,
    fileType = 0,
    candidateId = 0,
    exitId = 0,
    disciplinaryId = 0,
    promotionId = 0,
    transferId = 0
  ) => {
    html2canvas(RefData).then((canvas) => {
      // document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      var imageData = imgData;
      imageData = imgData.slice(22) + imgData.slice(23);
      var data = {
        base64String: imageData,
        candidateId: candidateId,
        fileType: fileType,
      };
      var data = {
        base64String: imageData,
        candidateId: candidateId,
        disciplinaryId: disciplinaryId,
        employeeId: employeeId,
        exitId: exitId,
        fileType: fileType,
        promotionId: promotionId,
        transferId: transferId,
      };
      uploadBase64Image(data);
      console.log("base64 data", imageData);
    });
  };


  // const ExportPDFandUploadInsurance = (
  //   RefData,
  //   employeeId = 0,
  //   fileType = 0,
  //   candidateId = 0,
  //   exitId = 0,
  //   disciplinaryId = 0,
  //   promotionId = 0,
  //   transferId = 0
  // ) => {
  //   html2canvas(RefData).then((canvas) => {
  //     // document.body.appendChild(canvas); 
  //     // if you want see your screenshot in body.
  //     const imgData = canvas.toDataURL("image/png");
  //     var imageData = imgData;
  //     imageData = imgData.slice(22) + imgData.slice(23);
  //     var data = {
  //       base64String: imageData,
  //       candidateId: candidateId,
  //       fileType: fileType,
  //     };
  //     var data = {
  //       base64String: imageData,
  //       candidateId: candidateId,
  //       disciplinaryId: disciplinaryId,
  //       employeeId: employeeId,
  //       exitId: exitId,
  //       fileType: fileType,
  //       promotionId: promotionId,
  //       transferId: transferId,
  //     };
  //     uploadInsurranceNominationForm(data);
  //     console.log("base64 data", imageData);
  //   });
  // };
  // const uploadInsurranceNominationForm = (base64Data) => {
  //   console.log("base64...........", base64Data);
  //   return (
  //     candidate.post("/api/v2/candidate/documents/file/upload", base64Data)
  //       .then((response) => {
  //         console.log(response);
  //         state.insuranceResponse = response.data.data;
  //         return dispatch({ type: "INSURANCE_BASE64_UPLOAD", payload: state.insuranceResponse });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //   );
  // };
  
  const ExportPDFandUploadInsurance = (
    file,
    employeeId = 0,
    fileType = 0,
    candidateId = 0,
    exitId = 0,
    disciplinaryId = 0,
    promotionId = 0,
    transferId = 0
  ) => {
    const photoFile = file;
    const formData = new FormData();
    formData.append("file", photoFile, photoFile.name);
    // formData.append("candidateId", candidateId);
    // formData.append("fileType",fileType);  
      uploadInsurranceNominationForm(formData,fileType,candidateId)
  };

  const uploadInsurranceNominationForm = (formData,fileType,candidateId) => {
    console.log("base64...........", formData);
    return (
      candidate.post(`api/v2/candidate/documents/pfd/upload?fileType=${fileType}&candidateId=${candidateId}`, formData)
        .then((response) => {
          console.log(response);
          state.insuranceResponse = response.data.data;
          return dispatch({ type: "INSURANCE_BASE64_UPLOAD", payload: state.insuranceResponse });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const verificationMailSend = (candidateId) => {
    client
      .get("/api/v1/candidate/sendEmail?candidateId="+candidateId)
      .then((response) => {
        toast.info(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const ExportPDFITCharter = (
    RefData,
   charterId = 0,
   fileType = 0,
   employeeId = 0,
   candidateId = 0,
   exitId = 0,
   disciplinaryId = 0,
   promotionId = 0,
   transferId = 0
 ) => {
   html2canvas(RefData).then((canvas) => {
     // document.body.appendChild(canvas); // if you want see your screenshot in body.
     const imgData = canvas.toDataURL("image/png");
     var imageData = imgData;
     imageData = imgData.slice(22) + imgData.slice(23);
     var data = {
       base64String: imageData,
       charterId: charterId,
       employeeId: employeeId,
       fileType: fileType,
     };
     uploadITCharter(data);
     console.log("base64 data", imageData);
  
   });
 };

 const uploadITCharter = (base64Data) => {
  console.log("base64...........", base64Data);
  return (
    client.post("/api/v1/document/file/upload", base64Data)
      .then((response) => {
        console.log(response,"charterupload");
        state.itCharterResponse = response.data.data;
        return dispatch({ type: "ITCHARTER_BASE64_UPLOAD", payload: state.itCharterResponse });
      })
      .catch((error) => {
        console.log(error);
      })
  );
};

  // Offer List api
  const candidateVerificationView = (key, page, status = 5) => {
    setLoader(true);
    client
      .get(
        "/api/v1/candidate/view/verification?key=" +
          key +
          "&overAllStatus=" +
          status +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&superManager=" +
          0
      )
      .then((response) => {
        state.candidateVerificationList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        setLoader(false);
        console.log("candidateList response", state.candidateVerificationList);
        return dispatch({
          type: "CANDIDATE_VERIFICATION_LIST",
          payload: state.candidateVerificationList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    console.log(state),
    (
      <DocsVerifyContext.Provider
        value={{
          verificationDocsView,
          personalInfo,
          addressInfo,
          contactInformation,
          bankDetailsData,
          fetchNominationDetails,
          fetchPfDetails,
          approveDocument,
          disApproveDocument,
          downloadDocument,
          updateUANNumber,
          costCenterSplit,
          createEmployee,
          candidateOnBoard,
          viewEmployee,
          step5suscessStatus,
          step6suscessStatus,
          approveAadharByAdmin,
          disapproveAadharByAdmin,
          viewStatesVerification,
          viewCityVerification,
          viewPermanentCityVerification,
          ExportPDFandUpload,
          uploadBase64Image,
          documentRejectComplete,
          adminRejectComplete,
          downloadFile,
          downloadFileOnboard,
          uploadInsurranceNominationForm,
          ExportPDFandUploadInsurance,
          ExportPDFITCharter,
          uploadITCharter,
          candidateVerificationView,
          MakePersonalInfoNull,
          verificationMailSend,
          itCharterResponse:state.itCharterResponse,
          disApproveAadhar: state.disApproveAadhar,
          imageData: state.imageData,
          insuranceResponse:state.insuranceResponse,
          step5Status: state.step5Status,
          aadharStatus: state.aadharStatus,
          step6Status: state.step6Status,
          empData: state.empData,
          onBoardData: state.onBoardData,
          docsToVerify: state.docsToVerify,
          createStatus: state.createStatus,
          costCenter: state.costCenter,
          personalInfoData: state.personalInfoData,
          addressInfoData: state.addressInfoData,
          emergencyInfo: state.emergencyInfo,
          bankDetails: state.bankDetails,
          nominationDetails: state.nominationDetails,
          pfDetails: state.pfDetails,
          acceptStatus: state.acceptStatus,
          rejectStatus: state.rejectStatus,
          loader: loader,
          downloadedFile: state.downloadedFile,
          uanUpdate: state.uanUpdate,
          verificationStateList: state.verificationStateList,
          verificationCityList: state.verificationCityList,
          verificationPermanentCityList: state.verificationPermanentCityList,
          rejectUpdate: state.rejectUpdate,
          adminRejectUpdate: state.adminRejectUpdate,
          total:state.total,
          candidateVerificationList:state.candidateVerificationList
        }}
      >
        {" "}
        {props.children}
      </DocsVerifyContext.Provider>
    )
  );
};
