import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
  Infodata: "",
};
export const OnBoardProvider = (props) => {
  const [state, dispatch] = useReducer(OnBoardReducer, initial_state);
  const updateName = () => {
    state.name = "First Reducer Implemented";
    console.log("on statefile");
    return dispatch({ type: "UPDATING", payload: state.name });
  };

  // const updatePersonalInfo = (data) => {
  //   console.log("on update personal Info");
  //   // state.Infodata: data;
  //   console.log(data);
  // };

  // Personal Information update api
  const updatePersonalInfo = (updateData) => {
    console.log("Info data -----");
    console.log(updateData);
    return client
      .post("/api/v2/candidate/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        return dispatch({
          type: "UPDATE_PERSONAL_INFO",
          payload: state.Infodata,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <OnBoardContext.Provider
      value={{
        updateName,
        updatePersonalInfo,
        name: state.name,
        Infodata: state.Infodata,
      }}
    >
      {props.children}
    </OnBoardContext.Provider>
  );
};
