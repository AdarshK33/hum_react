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
  bankData:[],
  panData:[],
  PFAndUANData:[],
  salaryData:[],

  bonusData:[],
  sportData:[],
  managerData:[],
  costCenterData:[],

  insuranceData:[],
  DISP:[],
  confirmationData:[],
  disciplinaryData:[],

  leavesData:[],
  promotionData:[],
  probationData:[],
  contractFreezeData:[],

  contractTypeChangeData:[],
  internationalTransferData:[],
  entityTransferData:[],
  exitData:[],

  payrollData:[],
  exitedEmployeeData:[],
  currentMonthExitedData:[],
  employeeContactDetailsByIdData:[],

  aadhaarData:[],
  accessData:[],

  total: {},
  data: [],

};
export const EmployeeHistoryContext = createContext();
export const EmployeeHistoryProvider = (props) => {
  const [state, dispatch] = useReducer(EmployeeHistoryReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const ViewEmployeeHistoryData = (fromDate,toDate,key, page,role,active) => {
    setLoader(true);
    client
    .get(
      `/api/v1/employee_history/view/?fromDate=${0}`+
        "&toDate=" +
        0 +
        "&active="+
        active +
        "&page=" +
        page +
        "&size=" +
        10 +
        "&key="+
        key
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

  const viewBankDataById=(employeeId)=>{
    setLoader(true);
    client
      .get("api/v1/employee_history/bank/" + employeeId)
      .then((response) => {
        state.bankData = response.data.data

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
  const viewPanDataById=(employeeId)=>{
    setLoader(true);
    client
      .get("api/v1/employee_history/pan_details/" + employeeId)
      .then((response) => {
        state.panData = new Array(response.data.data)

        setLoader(false);
        console.log("--->panData", state.panData);
        console.log(response);

        return dispatch({
          type: "PAN_DATA",
          payload: state.panData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const viewPFAndUANDataById=(employeeId)=>{
    setLoader(true);
    client
      .get("api/v1/employee_history/pfAndUanNumber/" + employeeId)
      .then((response) => {
        state.PFAndUANData = new Array(response.data.data)

        setLoader(false);
        console.log("--->PFAndUANData", state.PFAndUANData);
        console.log(response);

        return dispatch({
          type: "PF_AND_UAN_DATA",
          payload: state.PFAndUANData,
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
        .get("api/v1/employee_history/bonus/" + employeeId)
        .then((response) => {
          state.bonusData = response.data.data
  
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
    
    const viewManagerDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/manager/" + employeeId)
        .then((response) => {
          state.managerData = response.data.data
  
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
    const viewCostCenterDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/positionAndLocationAndCostCentre/" + employeeId)
        .then((response) => {
          state.costCenterData = response.data.data
  
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
    const viewConfirmationDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/confirmation/" + employeeId)
        .then((response) => {
          state.confirmationData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->confirmationData", state.confirmationData);
          console.log(response);
  
          return dispatch({
            type: "CONFIRMATION_DATA",
            payload: state.confirmationData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } 
    const viewDisciplinaryDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/disciplinaryAction/" + employeeId)
        .then((response) => {
          state.disciplinaryData = response.data.data
  
          setLoader(false);
          console.log("--->disciplinaryData", state.disciplinaryData);
          console.log(response);
  
          return dispatch({
            type: "DSICIPLINARY_DATA",
            payload: state.disciplinaryData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const viewLeavesDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/leave/" + employeeId)
        .then((response) => {
          state.leavesData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->leavesData", state.leavesData);
          console.log(response);
  
          return dispatch({
            type: "LEAVES_DATA",
            payload: state.leavesData,
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
          state.promotionData = response.data.data
  
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

    const viewcontractFreezeDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/contractFreezeSubbatical/" + employeeId)
        .then((response) => {
          state.contractFreezeData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->contractFreezeData", state.contractFreezeData);
          console.log(response);
  
          return dispatch({
            type: "CONTRACT_FREEZE_DATA",
            payload: state.contractFreezeData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewContractTypeChangeDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/contractTypeChange/" + employeeId)
        .then((response) => {
          state.contractTypeChangeData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->contractTypeChangeData", state.contractTypeChangeData);
          console.log(response);
  
          return dispatch({
            type: "CONTRACT_TYPE_CHANGE_DATA",
            payload: state.contractTypeChangeData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewInternationalTransferDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/empInternationalTransfer/" + employeeId)
        .then((response) => {
          state.internationalTransferData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->internationalTransferData", state.internationalTransferData);
          console.log(response);
  
          return dispatch({
            type: "INTERNATIONAL_TRANSFER_DATA",
            payload: state.internationalTransferData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewEntityTransferDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/entity_to_entity_transfer/" + employeeId)
        .then((response) => {
          state.entityTransferData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->entityTransferData", state.entityTransferData);
          console.log(response);
  
          return dispatch({
            type: "ENTITIY_TRANSFER_DATA",
            payload: state.entityTransferData,
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
    const viewExitEmployeeDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/exitEmployee/" + employeeId)
        .then((response) => {
          state.exitedEmployeeData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->exitedEmployeeData", state.exitedEmployeeData);
          console.log(response);
  
          return dispatch({
            type: "EXITED_EMPLOYEE_DATA",
            payload: state.exitedEmployeeData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewCurrentMonthExitDataById=(employeeId)=>{
      setLoader(true);
      client
        .get("api/v1/employee_history/currentMonthExit/" + employeeId)
        .then((response) => {
          state.currentMonthExitedData = new Array(response.data.data)
  
          setLoader(false);
          console.log("--->currentMonthExitedData", state.currentMonthExitedData);
          console.log(response);
  
          return dispatch({
            type: "CURRENT_MONTH_EXITED_DATA",
            payload: state.currentMonthExitedData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const viewEmployeeContactDetailsById=(employeeId)=>{
      setLoader(true);
      client
        .get("/api/v1/employee_history/employment_contract/" + employeeId)
        .then((response) => {
          state.employeeContactDetailsByIdData = response.data.data
  
          setLoader(false);
          console.log("--->employeeContactDetailsByIdData", state.employeeContactDetailsByIdData);
          console.log(response);
  
          return dispatch({
            type: "EMPLOYEE_CONTRACT_DETAILS_ID",
            payload: state.employeeContactDetailsByIdData,
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
  
  return (
    <EmployeeHistoryContext.Provider
      value={{
        ViewEmployeeHistoryData,
        viewBankDataById,
        viewPanDataById,
        viewPFAndUANDataById,
        viewSalaryDataById,

        viewBonusDataById,
        viewSportDataById,
        viewManagerDataById,
        viewCostCenterDataById,

        viewInsuranceDataById,  
        viewConfirmationDataById,
        viewDisciplinaryDataById,
        
        viewLeavesDataById,
        viewPromotionDataById,
        viewProbationDataById,
        viewcontractFreezeDataById,

        viewContractTypeChangeDataById,
        viewInternationalTransferDataById,
        viewEntityTransferDataById,
        viewExitDataById,
        viewExitEmployeeDataById,
        viewCurrentMonthExitDataById,
        viewEmployeeContactDetailsById,
        viewAadhaarDataById,
        viewAccessDataById,
        loader: loader,
        total: state.total,
        employeeHistoryData:state.employeeHistoryData,
        bankData:state.bankData,
        panData:state.panData,
        PFAndUANData:state.PFAndUANData,
        employeeContactDetailsByIdData:state.employeeContactDetailsByIdData,
        salaryData:state.salaryData,
        confirmationData:state.confirmationData,
        bonusData:state.bonusData,
        costCenterData:state.costCenterData,
        aadhaarData:state.aadhaarData,
        accessData:state.accessData,
        managerData:state.managerData,
        contractTypeChangeData:state.contractTypeChangeData,
        exitData:state.exitData,
        insuranceData:state.insuranceData,
        sportData:state.sportData,
        promotionData:state.promotionData,
        probationData:state.probationData,
        disciplinaryData:state.disciplinaryData,
        transferData:state.transferData,
        contractFreezeData:state.contractFreezeData,
        leavesData:state.leavesData,
        currentMonthExitedData:state.currentMonthExitedData,
        exitedEmployeeData:state.exitedEmployeeData,
      }}
    >
      {props.children}
    </EmployeeHistoryContext.Provider>
  );
};
