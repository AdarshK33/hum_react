import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import WeekOffReducer from "../reducers/WeekOffReducer";
import { toast } from "react-toastify";

const initial_state = {
  weekoffData: [],
  weekOffDetails: [],
  total: {},
  data: [],
};

export const WeekOffContext = createContext();
export const WeekOffProvider = (props) => {
  const [state, dispatch] = useReducer(WeekOffReducer, initial_state);
  const [loader, setLoader] = useState(false);
  /*----------Api to create WeekOff ------------*/
  const weekOffCreate = (data) => {
    setLoader(true);
    client
      .post("/api/v1/week_off/create", data)
      .then((response) => {
        state.weekoffData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        weekOffView("all", 0);
        return dispatch({
          type: "WEEKOFF_CREATE",
          payload: state.weekoffData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const weekOffView = (contractType, page) => {
    console.log("weekOffView", contractType, page);
    setLoader(true);
    client
      .get(
        "/api/v1/week_off/view?contractType=" +
          contractType +
          "&page=" +
          page +
          "&size=" +
          10
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.weekOffDetails = response.data.data.data;
        state.total = response.data.data.total;
        state.data = response.data.data;
        setLoader(false);

        return dispatch({
          type: "VIEW_WEEKOFF",
          payload: state.weekOffDetails,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <WeekOffContext.Provider
      value={{
        weekOffCreate,
        weekOffView,
        setLoader,
        loader: loader,
        weekoffData: state.weekoffData,
        weekOffDetails: state.weekOffDetails,
        total: state.total,
      }}
    >
      {props.children}
    </WeekOffContext.Provider>
  );
};
