import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import WeekOffReducer from "../reducers/WeekOffReducer";
import { toast } from "react-toastify";

const initial_state = {
  weekoffData: [],
  weekOffDetails: [],
  total: {},
  data: [],
  weekOffById:[],
  weekoffEditData:[]
};

export const WeekOffContext = createContext();
export const WeekOffProvider = (props) => {
  const [state, dispatch] = useReducer(WeekOffReducer, initial_state);
  const [loader, setLoader] = useState(false);
  /*----------Api to create WeekOff ------------*/
  const weekOffCreate = (data) => {
    setLoader(true);
    client
      .post("/week_off/create", data)
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
        "/week_off/view?contractType=" +
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
  const viewWeekOffById = (id) => {
    console.log("weekOffViewid", id);
    client
      .get(
        "/week_off/view/id?id="+id
      )
      .then((response) => {
        console.log("response", response.data.data);
        state.weekOffById = response.data.data;
        return dispatch({
          type: "VIEW_WEEKOFF_BY_ID",
          payload: state.weekOffById
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const weekOffEdit = (data) => {
    setLoader(true);
    client
      .post("/week_off/update", data)
      .then((response) => {
        state.weekoffEditData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        weekOffView("all", 0);
        return dispatch({
          type: "WEEKOFF_UPDATE",
          payload: state.weekoffEditData,
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
        viewWeekOffById,
        weekOffEdit,
        loader: loader,
        weekoffData: state.weekoffData,
        weekOffDetails: state.weekOffDetails,
        total: state.total,
        weekOffById:state.weekOffById,
        weekoffEditData:state.weekoffEditData
      }}
    >
      {props.children}
    </WeekOffContext.Provider>
  );
};
