import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DocsVerificationReducer from "../reducers/DocVerificationReducer";
import { toast } from "react-toastify";

const initial_state = {
  docsToVerify: [],
  personalInfoData: [],
  addressInfoData: {},
  emergencyInfo: {},
  bankDetails: {},
  nominationDetails: [],
  pfDetails: {},
};
export const DocsVerifyContext = createContext();
export const DocsVerificationProvider = (props) => {
  const [state, dispatch] = useReducer(DocsVerificationReducer, initial_state);
  const [loader, setLoader] = useState(false);

  // fetching candidate documents for verification
  const verificationDocsView = (candidateId) => {
    console.log("in state", candidateId);
    setLoader(true);
    client
      .get("/api/v1/candidate/document?candidateId=" + candidateId)
      .then((response) => {
        console.log("response", response.data.data);
        state.docsToVerify = response.data.data;
        console.log("Documents", response.data.data);
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
        console.log("address...", response.data.data);
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
        state.nominationDetails = response.data.data;
        console.log(response.data.data);
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
        console.log(response.data.data);
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
        docsToVerify: state.docsToVerify,
        personalInfoData: state.personalInfoData,
        addressInfoData: state.addressInfoData,
        emergencyInfo: state.emergencyInfo,
        bankDetails: state.bankDetails,
        nominationDetails: state.nominationDetails,
        pfDetails: state.pfDetails,
        loader: loader,
      }}
    >
      {" "}
      {props.children}
    </DocsVerifyContext.Provider>
  );
};
