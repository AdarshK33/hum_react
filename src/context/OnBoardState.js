import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
};
export const OnBoardProvider = (props) => {
  const [state, dispatch] = useReducer(OnBoardReducer, initial_state);
  const updateName = () => {
    state.name = "First Reducer Implemented";
    console.log("on statefile");
    return dispatch({ type: "UPDATING", payload: state.name });
  };
  return (
    <OnBoardContext.Provider value={{ updateName, name: state.name }}>
      {props.children}
    </OnBoardContext.Provider>
  );
};
