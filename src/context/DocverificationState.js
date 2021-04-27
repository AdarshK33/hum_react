import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DocsVerificationReducer from "../reducers/DocVerificationReducer";
import { toast } from "react-toastify";
import Axios from "axios";
import { access_token } from "../auth/signin";
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

  const approveDocument = (docId) => {
    setLoader(true);
    client
      .get("/api/v1/candidate/document/" + docId + "/accept")
      .then((response) => {
        state.acceptStatus = response.data.status;
        console.log(response.data.status);
        toast.info(response.data.message);

        setLoader(false);
        return dispatch({
          type: "GET_ACCEPT_STATUS",
          payload: state.acceptStatus,
        });
      })
      .catch((error) => {
        console.log(error);
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
  const costCenterSplit = (costCenterData) => {
    setLoader(true);
    client
      .post("/api/v1/cost_centre/split/create", costCenterData)
      .then((response) => {
        console.log(response.data.status);
        state.costCenter = response.data.message;
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
    setLoader(true);
    client
      .get("/api/v1/candidate/onboard?candidateId=" + candidateId)
      .then((response) => {
        state.onBoardData = response.data.data;
        return dispatch({
          type: "CANDIDATE_ONBOARD",
          payload: state.onBoardData,
        });
      });
  };
  const downloadDocument = (name) => {
    Axios({
      url: `${process.env.REACT_APP_BASEURL}api/v1/candidate/document/download?name=${name}`,
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

  return (
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
        step5Status: state.step5Status,
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
      }}
    >
      {" "}
      {props.children}
    </DocsVerifyContext.Provider>
  );
};
