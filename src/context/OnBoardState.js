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
  searchEmpData1: [],
  searchEmpData2: [],
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
  //Search by reference emp name1 or emp id
  const searchForEmp1 = (key) => {
    candidate
      .get("/api/v2/candidate/reference/search?key=" + key)
      .then((response) => {
        if (response.data.data === null) {
          state.searchEmpData1 = response.data.data;
          console.log("response.data.data", response.data.data);
          toast.info(response.data.message);
        } else {
          state.searchEmpData1 = response.data.data[0];
          console.log("response.data.data[0]", response.data.data[0]);
        }
        console.log("response", response);
        console.log("search Emp response", state.searchEmpData1);
        return dispatch({ type: "SEARCH_EMP1", payload: state.searchEmpData1 });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Search by reference emp name2 or emp id
  const searchForEmp2 = (key) => {
    candidate
      .get("/api/v2/candidate/reference/search?key=" + key)
      .then((response) => {
        if (response.data.data === null) {
          state.searchEmpData2 = response.data.data;
          console.log("response.data.data", response.data.data);
          toast.info(response.data.message);
        } else {
          state.searchEmpData2 = response.data.data[0];
          console.log("response.data.data[0]", response.data.data[0]);
        }
        console.log("response", response);
        console.log("search Emp response", state.searchEmpData2);
        return dispatch({ type: "SEARCH_EMP2", payload: state.searchEmpData2 });
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
        searchForEmp1,
        searchForEmp2,
        searchEmpData1: state.searchEmpData1,
        searchEmpData2: state.searchEmpData2,
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
