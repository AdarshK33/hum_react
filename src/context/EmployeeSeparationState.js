import React, { createContext, useReducer, useState } from "react";
import EmployeeSeparationReducer from "../reducers/EmployeeSeparationReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const EmployeeSeparationContext = createContext();

const initial_state = {
  EmployeeSeparationList: [],
  total: {},
};

export const EmploeeSeparationProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(
    EmployeeSeparationReducer,
    initial_state
  );
  const EmployeeSeparationListView = (key, pageNumber) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/employee-exit/view?key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10"
      )
      .then((response) => {
        state.EmployeeSeparationList = response.data.data;
        state.total = state.EmployeeSeparationList.total;
        setLoader(false);

        return dispatch({
          type: "EMPLOYEE_SEPARATION_LISTING",
          payload: state.EmployeeSeparationList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <EmployeeSeparationContext.Provider
      value={{
        EmployeeSeparationListView,
        EmployeeSeparationList: state.EmployeeSeparationList,
        loader: loader,
        total: state.total,
      }}
    >
      {props.children}
    </EmployeeSeparationContext.Provider>
  );
};
