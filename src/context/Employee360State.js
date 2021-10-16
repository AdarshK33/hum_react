import React, { createContext, useReducer, useContext, useState } from "react";
import Employee360Reducer from "../reducers/Employee360Reducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  HolidaysList: [],
  MyDocList: [],
  WeeksList: [],
  WeeksInfoList: [],
  ClusterData: [],
  updateResponse: {},
  employeeId: "",
  employeeProfileData: {},
  relivingLetterData: [],
  terminationLetterData: [],
  terminationConfirmationStatus: "",
  resignationConfirmationStatus: "",
};

export const Employee360Context = createContext();

export const Employee360Provider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [letterShow, setLetterShow] = useState(false);
  const [state, dispatch] = useReducer(Employee360Reducer, initial_state);

  const HolidaysView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view")
      .then((response) => {
        state.HolidaysList = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "HOLIDAY_VIEW",
          payload: state.HolidaysList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyDocView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/employee/documents?page=0&size=10")
      .then((response) => {
        state.MyDocList = response.data.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "MYDOC_VIEW",
          payload: state.MyDocList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SetLetterView = (val) => {
    setLetterShow(val);
  };

  const RosterMonthSearch = (startDate, endDate) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/360/view/weeks?endDate=" +
          endDate +
          "&startDate=" +
          startDate
      )
      .then((response) => {
        state.WeeksList = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "WEEKS_LIST",
          payload: state.WeeksList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SearchByWeekName = (WeekName) => {
    setLoader(true);
    console.log("WeekNamw", WeekName);
    client
      .get("/api/v1/employee/360/view/roster?key=" + WeekName)
      .then((response) => {
        state.WeeksInfoList = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "WEEKS_INFO_LIST",
          payload: state.WeeksInfoList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ClusterView = (key = "all") => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/cluster?key=" + key)
      .then((response) => {
        state.ClusterData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "CLUSTER_DATA",
          payload: state.ClusterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Employee360Context.Provider
      value={{
        HolidaysView,
        MyDocView,
        SetLetterView,
        RosterMonthSearch,
        SearchByWeekName,
        ClusterView,
        ClusterData: state.ClusterData,
        WeeksInfoList: state.WeeksInfoList,
        WeeksList: state.WeeksList,
        letterShow: letterShow,
        MyDocList: state.MyDocList,
        HolidaysList: state.HolidaysList,
        resignationConfirmationStatus: state.resignationConfirmationStatus,
      }}
    >
      {children}
    </Employee360Context.Provider>
  );
};
