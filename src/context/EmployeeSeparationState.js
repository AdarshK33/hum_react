import React, { createContext, useReducer, useState } from "react";
import EmployeeSeparationReducer from "../reducers/EmployeeSeparationReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const EmployeeSeparationContext = createContext();

const initial_state = {
  EmployeeSeparationList: [],
  total: {},
  employeeData: {},
  ModeOfSeparationData: {},
  updateResponse: {},
  employeeId: "",
  employeeProfileData: {},
};

export const EmploeeSeparationProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(
    EmployeeSeparationReducer,
    initial_state
  );
  const changeEmployeeId = (employeeId) => {
    setLoader(true);
    state.employeeId = employeeId;
    setLoader(false);
    return dispatch({
      type: "EMPLOYEE_ID",
      payload: state.employeeId,
    });
  };

  const ViewEmployeeProfile = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile")
      .then((response) => {
        state.employeeProfileData = response.data.data;

        setLoader(false);
        console.log("--->", state.employeeProfileData);
        console.log("response of employee profile", response);

        return dispatch({
          type: "EMPLOYEE_PROFILE_DATA_BY_ID",
          payload: state.employeeProfileData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        ModeOfSeparationView();

        return dispatch({
          type: "EMPLOYEE_SEPARATION_LISTING",
          payload: state.EmployeeSeparationList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ModeOfSeparationView = () => {
    setLoader(true);
    client
      .get("/api/v1/mode-of-separation/view")
      .then((response) => {
        state.ModeOfSeparationData = response.data.data;
        setLoader(false);
        console.log("mode of separation", state.ModeOfSeparationData);
        console.log("response of mode of separartion", response);

        return dispatch({
          type: "MODE_OF_SEPARATION",
          payload: state.ModeOfSeparationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateEmplyoeeExist = (updateInfo) => {
    setLoader(true);
    client
      .post("/api/v1/separation/employee-exit/update", updateInfo)
      .then((response) => {
        state.updateResponse = response.data.data;
        toast.info(response.data.message);
        console.log("updated response", state.updateResponse);
        return dispatch({
          type: "UPDATE_EMPLOYEE_SEPARATION",
          payload: state.updateResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreateEmplyoeeExist = (createInfo) => {
    setLoader(true);
    console.log("INSIDE API CALL ");
    client
      .post("/api/v1/separation/employee-exit/create", createInfo)
      .then((response) => {
        state.updateResponse = response.data.data;
        toast.info(response.data.message);
        console.log("updated response", state.updateResponse);
        return dispatch({
          type: "UPDATE_EMPLOYEE_SEPARATION",
          payload: state.updateResponse,
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
        ModeOfSeparationView,
        UpdateEmplyoeeExist,
        changeEmployeeId,
        ViewEmployeeProfile,
        CreateEmplyoeeExist,
        employeeProfileData: state.employeeProfileData,
        employeeId: state.employeeId,
        updateResponse: state.updateResponse,
        ModeOfSeparationData: state.ModeOfSeparationData,
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
