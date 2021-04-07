import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { candidate } from "../utils/canditateLogin";
import { toast } from "react-toastify";

export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
  Infodata: [],
  emergencyContactData:{},
  emergencyContactCreate:{},
  emergencyContactView:{},
  pfDeclarationCreate:{},
  pfDeclarationUpdate:{},
  pfDeclarationView:{},
  candidateData: {},
  stateList: [],
  cityList: [],
};
export const OnBoardProvider = (props) => {
  const [state, dispatch] = useReducer(OnBoardReducer, initial_state);
  const updatePersonalInfo = (updateData) => {
    console.log("Info data -----");
    console.log(updateData);
    return candidate
      .post("/api/v2/candidate/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "UPDATE_PERSONAL_INFO",
          payload: state.Infodata,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactCreate = (createData) => {
    console.log("EmergencyContactCreate data -----");
    console.log(createData);
    return candidate
      .post("/api/v2/candidate/contact/create", createData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "EMERGENCY_CONTACT_CREATE",
          payload: state.emergencyContactCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactUpdate = (updateData) => {
    console.log("EmergencyContactUpdate data -----");
    console.log(updateData);
    return candidate
      .post("/api/v2/candidate/contact/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "EMERGENCY_CONTACT_UPDATE",
          payload: state.emergencyContactCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactView = (data) => {
    candidate
      .get(`/api/v2/candidate/contact/view/${data}`)
      .then((response) => {
        state.emergencyContactView = response.data.data;
        console.log("EmergencyContactView Response ",response, state.emergencyContactView);
        return dispatch({
          type: "EMERGENCY_CONTACT_VIEW",
          payload: state.emergencyContactView,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PFDeclarationCreate = (createData) => {
    console.log("PFDeclarationCreate data -----");
    console.log(createData);
    return candidate
      .post("/api/v2/candidate/pf/create", createData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "PFDECLARATION_CREATE",
          payload: state.pfDeclarationCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PFDeclarationUpdate = (updateData) => {
    console.log("PFDeclarationUpdate data -----");
    console.log(updateData);
    return candidate
      .post("/api/v2/candidate/pf/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "PFDECLARATION_UPDATE",
          payload: state.pfDeclarationUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PFDeclarationView = (data) => {
    candidate
      .get(`/api/v2/candidate/pf/view/${data}`)
      .then((response) => {
        state.pfDeclarationView = response.data.data;
        console.log("PFeclarationView Response ",response, state.pfDeclarationView);
        return dispatch({
          type: "PFDECLARATION_VIEW",
          payload: state.pfDeclarationView,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CandidateProfile = () => {
    candidate
      .get("/api/v2/candidate/profile")
      .then((response) => {
        state.candidateData = response.data.data;
        console.log("CandidateProfile Response ", state.candidateData);
        return dispatch({
          type: "CANDIDATE_PROFILE",
          payload: state.candidateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const StateList = (country) => {
    candidate
      .get("/api/v2/candidate/address/view/state/" + country)
      .then((response) => {
        state.stateList = response.data.data;
        console.log("CandidateProfile Response ", state.stateList);
        return dispatch({
          type: "STATE_LIST",
          payload: state.stateList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CityList = (stateItem) => {
    candidate
      .get("/api/v2/candidate/address/view/city/" + stateItem)
      .then((response) => {
        state.CityList = response.data.data;
        console.log("CandidateProfile Response ", state.cityList);
        return dispatch({
          type: "CITY_LIST",
          payload: state.cityList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <OnBoardContext.Provider
      value={{
        updatePersonalInfo,
        CandidateProfile,
        StateList,
        CityList,
        EmergencyContactCreate,
        EmergencyContactUpdate,
        EmergencyContactView,
        PFDeclarationCreate,
        PFDeclarationUpdate,
        PFDeclarationView,
        emergencyContactData:state.emergencyContactData,
        emergencyContactCreate: state.emergencyContactCreate,
        emergencyContactView: state.emergencyContactView,
        pfDeclarationCreate:state.pfDeclarationCreate,
        pfDeclarationUpdate:state.pfDeclarationUpdate,
        pfDeclarationView:state.pfDeclarationView,
        name: state.name,
        Infodata: state.Infodata,
        candidateData: state.candidateData,
        stateList: state.stateList,
        cityList: state.cityList,
      }}
    >
      {props.children}
    </OnBoardContext.Provider>
  );
};
