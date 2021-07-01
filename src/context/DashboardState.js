import React, { createContext, useReducer } from "react";
import { client } from "../utils/axios";
import DashboardReducer from "../reducers/DashboardReducer";
import { toast } from "react-toastify";

const initial_state = {
  cosCentreList: [],
  graphData: [],
  weekList: [],
  viewDateList: {},
};

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DashboardReducer, initial_state);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  function viewCostCentre() {
    client
      .get("/api/v1/cost_centre/view")
      .then(function (response) {
        console.log(response);
        state.cosCentreList = response.data.data;

        return dispatch({
          type: "FETCH_COSTCENTRE_LIST",
          payload: state.cosCentreList,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function viewData(startDate, endDate, store, clusterId) {
    let startDateValue = convert(startDate);
    console.log("startDate", startDateValue);

    let endDateValue = convert(endDate);
    console.log("endDate", endDateValue);

    client
      .get(
        "/api/v1/dashboard/view/" +
          startDateValue +
          "/" +
          endDateValue +
          "/" +
          store +
          "/" +
          clusterId
      )
      .then(function (response) {
        if (response.data.data != null) {
          state.graphData = response.data.data;
        } else {
          toast.info(response.data.message);
          state.graphData = null;
        }
        console.log("dashboard response", state.graphData);
        return dispatch({
          type: "FETCH_GRAPHDATA_LIST",
          payload: state.graphData,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const weekData = (year) => {
    client
      .get("/weekoff/weeks/" + year)
      .then((response) => {
        state.weekList = response.data.data;
        console.log("weekList", state.weekList);
        return dispatch({ type: "WEEK_LIST", payload: state.weekList });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewDates = (month, year, weekName) => {
    console.log("weekName in context", weekName);
    if (weekName !== undefined) {
      client
        .get(
          "dashboard/view/dates/" + month + "/" + year + "?weekName=" + weekName
        )
        .then((response) => {
          state.viewDateList = response.data.data;
          console.log("view list", state.viewDateList);
          return dispatch({ type: "VIEW_DATE", payload: state.viewDateList });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      client
        .get("dashboard/view/dates/" + month + "/" + year)
        .then((response) => {
          state.viewDateList = response.data.data;
          console.log("view list", state.viewDateList);
          return dispatch({ type: "VIEW_DATE", payload: state.viewDateList });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        viewCostCentre,
        viewData,
        weekData,
        viewDates,
        cosCentreList: state.cosCentreList,
        graphData: state.graphData,
        weekList: state.weekList,
        viewDateList: state.viewDateList,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
