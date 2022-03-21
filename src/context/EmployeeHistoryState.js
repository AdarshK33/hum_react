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
  bonusData:[],
  costCenterData:[],
  bankData:[],
  aadhaarData:[],
  accessData:[],
  managerData:[],
  taxData:[],
  exitData:[],
  insuranceData:[],
  sportData:[],
  promotionData:[],
  probationData:[],
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
    const viewBonusDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("/api/v1/employee_history/bonus/" + employeeId)
        .then((response) => {
          state.bonusData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->bonusData", state.bonusData);
          console.log(response);
  
          return dispatch({
            type: "BONUS_DATA",
            payload: state.bonusData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewCostCenterDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/cost_centre/" + employeeId)
        .then((response) => {
          state.costCenterData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->costCenterData", state.costCenterData);
          console.log(response);
  
          return dispatch({
            type: "COSTCENTER_DATA",
            payload: state.costCenterData,
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
    const viewAadhaarDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/aadhaar/" + employeeId)
        .then((response) => {
          state.aadhaarData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->aadhaarData", state.aadhaarData);
          console.log(response);
  
          return dispatch({
            type: "AADHAAR_DATA",
            payload: state.aadhaarData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewAccessDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/access/" + employeeId)
        .then((response) => {
          state.accessData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->accessData", state.accessData);
          console.log(response);
  
          return dispatch({
            type: "ACCESS_DATA",
            payload: state.accessData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const viewManagerDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/manager/" + employeeId)
        .then((response) => {
          state.managerData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->managerData", state.managerData);
          console.log(response);
  
          return dispatch({
            type: "MANAGER_DATA",
            payload: state.managerData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
   
    const viewTaxDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/tax/" + employeeId)
        .then((response) => {
          state.taxData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->taxData", state.taxData);
          console.log(response);
  
          return dispatch({
            type: "TAX_DATA",
            payload: state.taxData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    const viewExitDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/exit/" + employeeId)
        .then((response) => {
          state.exitData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->exitData", state.exitData);
          console.log(response);
  
          return dispatch({
            type: "EXIT_DATA",
            payload: state.exitData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    const viewInsuranceDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/insurance/" + employeeId)
        .then((response) => {
          state.insuranceData = response.data.data
  
          setLoader(false);
          console.log("--->insuranceData", state.insuranceData);
          console.log(response);
  
          return dispatch({
            type: "INSURANCE_DATA",
            payload: state.insuranceData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewSportDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/sport/" + employeeId)
        .then((response) => {
          state.sportData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->sportData", state.sportData);
          console.log(response);
  
          return dispatch({
            type: "SPORT_DATA",
            payload: state.sportData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewPromotionDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/PromotionHistory/" + employeeId)
        .then((response) => {
          state.promotionData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->promotionData", state.promotionData);
          console.log(response);
  
          return dispatch({
            type: "PROMOTION_DATA",
            payload: state.promotionData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewProbationDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/probation/" + employeeId)
        .then((response) => {
          state.probationData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->probationData", state.probationData);
          console.log(response);
  
          return dispatch({
            type: "PROBATION_DATA",
            payload: state.probationData,
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
        viewBonusDataById,
        viewCostCenterDataById,
        viewBankDataById,
        viewAadhaarDataById,
        viewAccessDataById,
        viewManagerDataById,
        viewTaxDataById,
        viewExitDataById,
        viewInsuranceDataById,  
        viewSportDataById,
        viewPromotionDataById,
        viewProbationDataById,
        loader: loader,
        total: state.total,
        employeeHistoryData:state.employeeHistoryData,
        employeeContractDetailsByIdData:state.employeeContractDetailsByIdData,
        salaryData:state.salaryData,
        bonusData:state.bonusData,
        costCenterData:state.costCenterData,
        bankData:state.bankData,
        aadhaarData:state.aadhaarData,
        accessData:state.accessData,
        managerData:state.managerData,
        taxData:state.taxData,
        exitData:state.exitData,
        insuranceData:state.insuranceData,
        sportData:state.sportData,
        promotionData:state.promotionData,
        probationData:state.probationData
      }}
    >
      {props.children}
    </EmployeeHistoryContext.Provider>
  );
};
