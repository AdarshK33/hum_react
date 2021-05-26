import React, { createContext, useReducer, useState } from "react";
import ProbationReducer from "../reducers/ProbationReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const ProbationContext = createContext();

const initial_state = {
  probationListData: [],
  probationListByDueDays: [],
  total: {},
  empId: "",
};

export const ProbationProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(ProbationReducer, initial_state);

  const ProbationListView = (key, pageNumber) => {
    setLoader(true);
    client
      .get(
        "/api/v1/probation/view?key=" + key + "&page=" + pageNumber + "&size=10"
      )
      .then((response) => {
        state.probationListData = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);

        return dispatch({
          type: "PROBATION_LISTING",
          payload: state.probationListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dueDaySearchByDays = (days) => {
    setLoader(true);
    client
      .get("/api/v1/probation/search?days=" + days)
      .then((response) => {
        state.probationListData = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.probationListData);
        console.log("duesearch", response);

        return dispatch({
          type: "PROBATION_LISTING",
          payload: state.probationListData,
        });

        // return dispatch({
        //   type: "PROBATION_LISTING_BY_DUE",
        //   payload: state.probationListByDueDays,
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeEmpId = (employeeId) => {
    setLoader(true);
    state.empId = employeeId;
    setLoader(false);
    return dispatch({
      type: "EMP_ID",
      payload: state.empId,
    });
  };
  return (
    <ProbationContext.Provider
      value={{
        ProbationListView,
        dueDaySearchByDays,
        changeEmpId,
        empId: state.empId,
        probationListByDueDays: state.probationListByDueDays,
        probationListData: state.probationListData,
        total: state.total,
        loader: loader,
      }}
    >
      {props.children}
    </ProbationContext.Provider>
  );
};
