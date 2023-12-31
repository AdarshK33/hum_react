import React, { createContext, useReducer, useContext, useState } from "react";
import PayrollReducer from "../reducers/PayrollReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  payslipViewData: {},
  otherDocViewData: {},
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
  const PayrollOtherDocView = (docName, empId, year) => {
    setLoader(true);
    client
      .get(
        "/api/v1/payroll/documents/view/other?documentName=" +
          docName +
          "&employeeId=" +
          empId +
          "&year=" +
          year
      )
      .then((response) => {
        state.otherDocViewData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "PAYROLL_OTHER_DOC_VIEW",
          payload: state.otherDocViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PayrollPayslipsView = (data) => {
    setLoader(true);
    client
      .post("/api/v1/payroll/documents/view", data)
      .then((response) => {
        console.log(response.data.data);
        state.payslipViewData = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "PAYSLIP_VIEW",
          payload: state.payslipViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const makePayslipViewDataNull = () => {
    state.payslipViewData = null;
    return dispatch({
      type: "PAYSLIP_VIEW",
      payload: state.payslipViewData,
    });
  };
  const makePayrollOtherDocDataNull = () => {
    state.otherDocViewData = null;
    return dispatch({
      type: "PAYROLL_OTHER_DOC_VIEW",
      payload: state.otherDocViewData,
    });
  };
  const empSearchByCostCenter = (key) => {
    client
      .get("/api/v1/employee/role_based_search?key=" + key)
      .then((response) => {
        if (
          response.data.data &&
          response.data.data !== null &&
          response.data.data !== undefined 
          ) {
          state.empSearchByCostData = response.data.data;
          console.log("response.data.data", response.data.data);
          // toast.info(response.data.message);
         } 
        //else {
        //   state.empSearchByCostData = response.data.data;
        //   console.log("response.data.data[0]", response.data.data[0]);
        // }
        // console.log("response", response);
        // console.log("search Emp response", state.searchEmpData1);
        return dispatch({
          type: "EMP_SEARCH_BY_COST_DATA",
          payload: state.empSearchByCostData,
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
        SetLetterView,
        setManagerFlag,
        PayrollPayslipsView,
        makePayslipViewDataNull,
        PayrollOtherDocView,
        makePayrollOtherDocDataNull,
        empSearchByCostCenter,
        empSearchByCostData: state.empSearchByCostData,
        otherDocViewData: state.otherDocViewData,
        payslipViewData: state.payslipViewData,
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
