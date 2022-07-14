import React, { createContext, useReducer, useState } from "react";
import PartTimeSalaryInputReducer from "../reducers/PartTimeSalaryInputReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import moment from "moment";
import { saveAs } from "file-saver";

const initialState = {
    employeeData: {},
    createdData:{}
};

export const PartTimeSalaryInputContext = createContext();

export const PartTimeSalaryInputProvider = (props) => {
  const [state, dispatch] = useReducer(PartTimeSalaryInputReducer, initialState);
  const [loader, setLoader] = useState(false);

  const ViewEmployeeData = (key) => {
    // http://huminedev.theretailinsights.co/api/v1/employee/parttime_employee_search?key=all
    setLoader(true); 
    client
      .get("/api/v1/employee/parttime_employee_search?key=" + key)
      .then((response) => {
        // toast.info(response.data.message);
        
        // if(response.data&& Object.keys(response.data).length &&
        // response.data.data&& Object.keys(response.data.data).length){
        //   state.employeeData = response.data.data[0];
        // }else{
        // state.employeeData = null;
        // }
         state.employeeData = response.data.data;
        // console.log(response,"ViewEmployeeData")
        setLoader(false);
        return dispatch({
          type: "EMPLOYEE_DATA",
          payload: state.employeeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CreateSalaryInput = (create) => {
    setLoader(true);
    client
      .post("api/v1/employee/parttime/create/parttime",create)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response,"CreateSalaryInput")
        state.createdData = response.data.data;
        setLoader(false);
        return dispatch({
          type: "CREATED_DATA",
          payload: state.createdData,
        });
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <PartTimeSalaryInputContext.Provider
      value={{
        loader,
        ViewEmployeeData,
        CreateSalaryInput,
        employeeData:state.employeeData,
        createdData:state.createdData
      }}
    >
      {props.children}
    </PartTimeSalaryInputContext.Provider>
  );
};
