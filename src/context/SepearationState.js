import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import SepationReducer from "../reducers/SeparationReducer";
import { toast } from "react-toastify";
import Axios from "axios";
import { access_token } from "../auth/signin";

const initial_state = {
  noDueClearanceList:[],
  separationList: [],
  total: {},
  data: [],
};

export const SeparationContext = createContext();
export const SeparationProvider = (props) => {
  const [state, dispatch] = useReducer(SepationReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const separationListView = (key, page) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/finance-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.separationList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        setLoader(false);
        return dispatch({
          type: "SEPARATION_LIST",
          payload: state.separationList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewITClearanceList = (key, page) => {
    client.get( "/api/v1/separation/it-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10)
      .then((response) => {
        state.noDueClearanceList = response.data.data.data
        console.log("=====GET Admin separation API response=====", state.noDueClearanceList)

        return dispatch({ type: 'FETCH_SEPARATION_LIST', payload: state.noDueClearanceList })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <SeparationContext.Provider
      value={{
        separationListView,
        viewITClearanceList,
        setLoader,
        noDueClearanceList:state.noDueClearanceList,
        separationList: state.separationList,
        loader: state.loader,
      }}
    >
      {props.children}
    </SeparationContext.Provider>
  );
};
