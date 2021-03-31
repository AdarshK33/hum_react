import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { candidate } from "../utils/canditateLogin";
import { toast } from "react-toastify";

export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
  Infodata: [],
  candidateData: {},
  stateList: [],
  cityList: [],
  candidateViewInfo: {},
  candidateCountryData: [],
  candidateStateData: [],
  candidateCityData: [],
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

  const CandidateViewInformation = (candidateId) => {
    candidate
      .get("/api/v2/candidate/view/workInfo/" + candidateId)
      .then((response) => {
        state.candidateViewInfo = response.data.data;
        console.log("CandidateView Response ", state.candidateViewInfo);
        return dispatch({
          type: "CANDIDATE_VIEW_INFO",
          payload: state.candidateViewInfo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const candidateCountryList = () => {
    candidate
      .get("/api/v2/candidate/address/view/country")
      .then((response) => {
        state.candidateCountryData = response.data.data;
        console.log("candidateCountryData name", state.candidateCountryData);
        return dispatch({
          type: "CANDIDATE_COUNTRY_LIST",
          payload: state.candidateCountryData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CandidateStateList = (countryName) => {
    candidate
      .get("/api/v2/candidate/address/view/state/" + countryName)
      .then((response) => {
        state.candidateStateData = response.data.data;
        console.log("candidateStateData name", state.candidateStateData);
        return dispatch({
          type: "CANDIDATE_STATE_LIST",
          payload: state.candidateStateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const candidateCityList = (StateId) => {
    candidate
      .get("/api/v2/candidate/address/view/city/" + StateId)
      .then((response) => {
        state.candidateCityData = response.data.data;
        console.log("candidateCityData name", state.candidateCityData);
        return dispatch({
          type: "CANDIDATE_CITY_LIST",
          payload: state.candidateCityData,
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
        CandidateViewInformation,
        candidateCountryList,
        CandidateStateList,
        candidateCityList,
        name: state.name,
        Infodata: state.Infodata,
        candidateData: state.candidateData,
        stateList: state.stateList,
        cityList: state.cityList,
        candidateViewInfo: state.candidateViewInfo,
        candidateCountryData: state.candidateCountryData,
        candidateStateData: state.candidateStateData,
        candidateCityData: state.candidateCityData,
      }}
    >
      {props.children}
    </OnBoardContext.Provider>
  );
};
