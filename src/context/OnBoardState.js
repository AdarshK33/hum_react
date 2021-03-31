import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
  Infodata: [],
  candidateData: {},
  stateList: [],
  cityList: [],
};
export const OnBoardProvider = (props) => {
  const [state, dispatch] = useReducer(OnBoardReducer, initial_state);
  const updatePersonalInfo = (updateData) => {
    console.log("Info data -----");
    console.log(updateData);
    return client
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
    console.log("profile....");
    client
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
    client
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
    client
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
