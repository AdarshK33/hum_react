import React, { createContext, useReducer, useState } from "react";
import EmployeeSeparationReducer from "../reducers/EmployeeSeparationReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const EmployeeSeparationContext = createContext();

const initial_state = {
  EmployeeSeparationList: [],
  total: {},
  employeeData: {},
};

export const EmploeeSeparationProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(
    EmployeeSeparationReducer,
    initial_state
  );

  const ViewEmployeeDataById = (employeeId) => {
    setLoader(true);
    client
      .get("/api/v1/separation/employee-exit/view/" + employeeId)
      .then((response) => {
        state.employeeData = response.data.data;
        setLoader(false);
        console.log("--->", state.employeeData);
        console.log(response);

        return dispatch({
          type: "EMPLOYEE_DATA_BY_ID",
          payload: state.employeeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        state.EmployeeSeparationList = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);

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
        ViewEmployeeDataById,
        EmployeeSeparationList: state.EmployeeSeparationList,
        employeeData: state.employeeData,
        loader: loader,
        total: state.total,
      }}
    >
      {props.children}
    </EmployeeSeparationContext.Provider>
  );
};
