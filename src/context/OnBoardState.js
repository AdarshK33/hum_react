import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { candidate } from "../utils/canditateLogin";
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
  const updatePersonalInfo = (updateData) => {
    console.log("Info data -----");
    console.log(updateData);
    return candidate
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
