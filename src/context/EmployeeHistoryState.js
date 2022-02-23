import React, { createContext, useReducer, useState ,useContext} from "react";
import { client } from "../utils/axios";
import EmployeeHistoryReducer from "../reducers/EmployeeHistoryReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { access_token } from "../auth/signin";
import Axios from "axios";
var fileDownload = require("js-file-download");

const initial_state = {
  employeeHistoryData: {},
  total: {},
  data: [],

};
export const EmployeeHistoryContext = createContext();
export const EmployeeHistoryProvider = (props) => {
  const [state, dispatch] = useReducer(EmployeeHistoryReducer, initial_state);
  const [loader, setLoader] = useState(false);


  const ViewEmployeeHistoryData = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile")
      .then((response) => {
        state.employeeHistoryData = response.data.data;
        setLoader(false);
        console.log("employee profile", response);

        return dispatch({
          type: "EMPLOYEE_HISTORY_DATA",
          payload: state.employeeHistoryData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <EmployeeHistoryContext.Provider
      value={{
        ViewEmployeeHistoryData,
        loader: loader,
        employeeHistoryData:state.employeeHistoryData,
        total: state.total,

      }}
    >
      {props.children}
    </EmployeeHistoryContext.Provider>
  );
};
