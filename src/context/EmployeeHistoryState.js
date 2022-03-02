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
  employeeContractDetailsByIdData:[],
  salaryData:[],
  bankData:[],
  total: {},
  data: [],

};
export const EmployeeHistoryContext = createContext();
export const EmployeeHistoryProvider = (props) => {
  const [state, dispatch] = useReducer(EmployeeHistoryReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const ViewEmployeeHistoryData = (fromDate,toDate,key, page) => {
    setLoader(true);
    client
    .get(
      `/api/v1/employee_history/view/?fromDate=${0}&key=` +
        key +
        "&page=" +
        page +
        "&size=" +
        10 +
        "&toDate=" +
        0
    )
      .then((response) => {
        console.log("employee profile", response.data.data.data);
        state.employeeHistoryData = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        setLoader(false);
        return dispatch({
          type: "EMPLOYEE_HISTORY_DATA",
          payload: state.employeeHistoryData,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const viewEmployeeContractDetailsById=(employeeId)=>{
      setLoader(true);
      client
        .get("/api/v1/employee_history/employment_contract/" + employeeId)
        .then((response) => {
          state.employeeContractDetailsByIdData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->employeeContractDetailsByIdData", state.employeeContractDetailsByIdData);
          console.log(response);
  
          return dispatch({
            type: "EMPLOYEE_CONTRACT_DETAILS_ID",
            payload: state.employeeContractDetailsByIdData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const viewSalaryDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/salary/" + employeeId)
        .then((response) => {
          state.salaryData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->salaryData", state.salaryData);
          console.log(response);
  
          return dispatch({
            type: "SALARY_DATA",
            payload: state.salaryData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewBankDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/bank/" + employeeId)
        .then((response) => {
          state.bankData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->bankData", state.bankData);
          console.log(response);
  
          return dispatch({
            type: "BANK_DATA",
            payload: state.bankData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  return (
    <EmployeeHistoryContext.Provider
      value={{
        ViewEmployeeHistoryData,
        viewEmployeeContractDetailsById,
        viewSalaryDataById,
        viewBankDataById,
        bankData:state.bankData,
        salaryData:state.salaryData,
        employeeContractDetailsByIdData:state.employeeContractDetailsByIdData,
        loader: loader,
        employeeHistoryData:state.employeeHistoryData,
        total: state.total,

      }}
    >
      {props.children}
    </EmployeeHistoryContext.Provider>
  );
};
