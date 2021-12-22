import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import WorkHourReducer from "../reducers/WorkHourReducer";
import { toast } from "react-toastify";

const initial_state = {
  workHourData: [],
  workHourDetails: [],
  total: {},
  data: [],
  workHourById:[],
  workHourEditData:[]
};

export const WorkHourContext = createContext();
export const WorkHourProvider = (props) => {
  const [state, dispatch] = useReducer(WorkHourReducer, initial_state);
  const [loader, setLoader] = useState(false);
  /*----------Api to create WeekOff ------------*/
  const workHourCreate = (data) => {
    setLoader(true);
    client
      .post("/working_hours/create", data)
      .then((response) => {
        state.workHourData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        workHourView("all", 0);
        return dispatch({
          type: "WORKHOUR_CREATE",
          payload: state.workHourData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const workHourView = (contractType, page) => {
    console.log("workHourView", contractType, page);
    setLoader(true);
    client
      .get(
        "/working_hours/view?contractType=" +
          contractType +
          "&page=" +
          page +
          "&size=" +
          10
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.workHourDetails = response.data.data.data;
        state.total = response.data.data.total;
        state.data = response.data.data;
        setLoader(false);

        return dispatch({
          type: "VIEW_WORKHOUR",
          payload: state.workHourDetails,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewWorkHourById = (id) => {
    console.log("weekHourViewid", id);
    client
      .get(
        "/working_hours/view/id?id="+id
      )
      .then((response) => {
        console.log("response", response.data.data);
        state.workHourById = response.data.data;
        return dispatch({
          type: "VIEW_WORKHOUR_BY_ID",
          payload: state.workHourById
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const workHourEdit = (data) => {
    setLoader(true);
    client
      .post("/working_hours/update", data)
      .then((response) => {
        state.workHourEditData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        workHourView("all", 0);
        return dispatch({
          type: "WORKHOUR_UPDATE",
          payload: state.workHourEditData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <WorkHourContext.Provider
      value={{
        workHourCreate,
        workHourView,
        setLoader,
        workHourEdit,
        viewWorkHourById,
        loader: loader,
        workHourData: state.workHourData,
        workHourDetails: state.workHourDetails,
        total: state.total,
        workHourEditData:state.workHourEditData,
        workHourById:state.workHourById
      }}
    >
      {props.children}
    </WorkHourContext.Provider>
  );
};
