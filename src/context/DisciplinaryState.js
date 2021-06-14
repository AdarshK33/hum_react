import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DisciplinaryReducer from "../reducers/DisciplinaryReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initial_state = {

  total: {},
  data: [],

};

export const DisciplinaryContext = createContext();

export const DisciplinaryProvider = (props) => {
  const [state, dispatch] = useReducer(DisciplinaryReducer, initial_state);
  const [loader, setLoader] = useState(false);

 

  return (
    <DisciplinaryContext.Provider
      value={{
  
        total: state.total,
     
        loader: loader,
     
      }}
    >
      {props.children}
    </DisciplinaryContext.Provider>
  );
};
