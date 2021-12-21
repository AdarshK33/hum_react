import React, { createContext, useReducer, useContext, useState } from "react";
import PayrollReducer from "../reducers/PayrollReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  addressViewData: [],
  emergencyContactView: [],
  bankViewData: [],
  remunerationData: [],
  costCentreSplitData: [],
  emergencyUpdate: [],
  documentsList: [],
  insuranceData: [],
  otherDocumentsList: [],
  insuranceTopUpData: [],
  premiumViewData: [],
  holidayWorkingBonusList: [],
  EmployeesList: [],
  total: 0,
  EmpProfile: [],
  EmployeesDocsVerifyList: [],
  EmpDocsData: [],
};

export const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [letterShow, setLetterShow] = useState(false);
  const [state, dispatch] = useReducer(PayrollReducer, initial_state);
  const [currentEmpId, setCurrentEmpId] = useState(0);
  const [managerFlag, setMANAGERFlag] = useState(false);

  const setEmployeeId = (val) => {
    setCurrentEmpId(val);
  };
  const setManagerFlag = (val) => {
    setMANAGERFlag(val);
  };

  const SetLetterView = (val) => {
    setLetterShow(val);
  };
  const addressView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/address?employeeId=" + empId)
      .then((response) => {
        state.addressViewData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "ADDRESS_VIEW",
          payload: state.addressViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PayrollContext.Provider
      value={{
        setEmployeeId,
        addressView,
        SetLetterView,
        setManagerFlag,
        managerFlag: managerFlag,
        letterShow: letterShow,
        loader: loader,
        currentEmpId: currentEmpId,
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};
