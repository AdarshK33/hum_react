import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import SepationReducer from "../reducers/SeparationReducer";
import { toast } from "react-toastify";
import Axios from "axios";
import { access_token } from "../auth/signin";

const initial_state = {
  financeAdminNoDueClearanceList:[],
  adminNoDueClearanceList:[],
  noDueClearanceList: [],
  updateNoDueClearanceList: [],
  separationList: [],
  total: {},
  data: [],
  clearanceList: [],
  financeClearanceUploadSettlement:{},
  financeClearanceExport:{},
  updateAdminFinanceClearanceList:[]
};

export const SeparationContext = createContext();
export const SeparationProvider = (props) => {
  const [state, dispatch] = useReducer(SepationReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const separationListView = (key, page, costCenter) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/finance-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&storeId=" +
          costCenter
      )
      .then((response) => {
        console.log("response", response.data.data.data);
        state.separationList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        setLoader(false);
        return dispatch({
          type: "SEPARATION_LIST",
          payload: state.separationList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewFinanceAdminClearanceList = (key, page,costCenter) => {
    client.get( "/api/v1/separation/full-and-final/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&storeId=" +
          costCenter
          )
      .then((response) => {
        state.financeAdminNoDueClearanceList = response.data.data.data
        state.data = response.data.data;
        state.total = response.data.data.total;
        console.log("=====GET financeAdminNoDueClearanceList API response=====", response.data.data)
        return dispatch({
          type: "FETCH_FINANCE_ADMIN_NODUECLEARANCE_LIST",
          payload: state.financeAdminNoDueClearanceList
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const UpdateAdminFinanceClearanceList = (value, key, page, costCenter) => {
    console.log(value, "value in update ");
    const formData = {
      costCenterName: value.costCenterName,
      deactivateProfile: value.deactivateProfile,
      disabled: value.disabled,
      employeeId: value.employeeId,
      employeeName: value.employeeName,
      exitId: value.exitId,
      fullAndFinalAmount: parseInt(value.fullAndFinalAmount),
      fullAndFinalCompleteStatus: value.fullAndFinalCompleteStatus,
      fullAndFinalId: value.fullAndFinalId,
      fullAndFinalProcessDate: value.fullAndFinalProcessDate,
      joiningDate: value.joiningDate,
      lastWorkingDate:value.lastWorkingDate,

      managerName: value.managerName,
      modeOfSeparation:value.modeOfSeparation
    };
    
    console.log(formData, "updateAdminFinanceClearanceList separation context");
    return client
      .post("/api/v1/separation/full-and-final/edit", formData)
      .then((response) => {
        toast.info(response.data.message);
        viewFinanceAdminClearanceList(key, page, costCenter);
        return dispatch({
          type: "UPDATE_ADMIN_FINANCE_SEPARATION",
          payload: state.updateAdminFinanceClearance,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewAdminITClearanceList = (key, page,costCenter) => {
    client.get( "/api/v1/separation/full-and-final/view/no-due-clearance?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&storeId=" +
          costCenter
          )
      .then((response) => {
        state.adminNoDueClearanceList = response.data.data.data
        state.data = response.data.data;
        state.total = response.data.data.total;
        console.log(key, page,costCenter,"=====GET FETCH_ADMIN_NODUECLEARANCE_LIST API response=====", response.data.data)
        return dispatch({
          type: "FETCH_ADMIN_NODUECLEARANCE_LIST",
          payload: state.adminNoDueClearanceList
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const viewITClearanceList = (key, page,costCenter) => {
    client.get( "/api/v1/separation/it-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&storeId=" +
          costCenter
      )
      .then((response) => {
        state.noDueClearanceList = response.data.data.data;
        state.data = response.data.data;
        state.total = response.data.data.total;
        console.log(
          "=====GET Admin separation API response=====",
          response.data.data
        );

        return dispatch({
          type: "FETCH_SEPARATION_LIST",
          payload: state.noDueClearanceList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FinanceClearanceUploadSettlement = (value) => {
    console.log(value, "value in update ");
    const formData = new FormData();
    formData.append('file', value, value.name)
    console.log(formData, "FinanceClearanceUploadSettlement separation context");
    return client
      .post("/api/v1/separation/full-and-final/upload", formData)
      .then((response) => {
        toast.info(response.data.message);
        return dispatch({
          type: "FINANCECLEARANCE_UPLOAD_SETTLEMENT",
          payload: state.financeClearanceUploadSettlement,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FinanceClearanceExport = () => {
    console.log( "FinanceClearanceExport separation context");
    return client
      .get("/api/v1/separation/full-and-final/download")
      .then((response) => {
        toast.info(response.data.message);
        return dispatch({
          type: "FINANCECLEARANCE_EXPORT",
          payload: state.financeClearanceExport,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateITClearanceList = (value, key, page, costCenter) => {
    console.log(value, "value in update ");
    const formData = {
      itclearanceId: value.itclearanceId,
      exitId: value.exitId,
      itClearanceStatus: value.itClearanceStatus,
      itAmount: value.itAmount,
      itRemarks: value.itRemarks,
      itClearanceUpdatedBy: value.itClearanceUpdatedBy,
      lastWorkingDay: value.lastWorkingDay,
      employeeId: value.employeeId,
      employeeName: value.employeeName,
      costCentreName: value.costCentreName,
      joiningDate: value.joiningDate,
      managerName: value.managerName,
    };
    console.log(formData, "updateClearanceList separation context");
    return client
      .post("/api/v1/separation/it-clearance/edit", formData)
      .then((response) => {
        toast.info(response.data.message);
        viewITClearanceList(key, page, costCenter);
        return dispatch({
          type: "UPDATE_SEPARATION_LIST",
          payload: state.updateNoDueClearanceList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveFinanceClearanceData = (value, key, page, costCenter) => {
    const formData = {
      financeClearanceId: value.financeClearanceId,
      exitId: value.exitId,
      financeClearanceStatus: value.financeClearanceStatus,
      financeAmount: value.financeAmount,
      financeRemarks: value.financeRemarks,
      financeClearanceUpdatedBy: value.financeClearanceUpdatedBy,
      lastWorkingDate: value.lastWorkingDate,
      employeeId: value.employeeId,
      empName: value.empName,
      costCentre: value.costCentre,
      joiningDate: value.joiningDate,
      managerName: value.managerName,
    };
    setLoader(true);
    return client
      .post("/api/v1/separation/finance-clearance/create", formData)
      .then((response) => {
        state.clearanceList = response.data.data;
        console.log(response.data.data);
        separationListView(key, page, costCenter)
        dispatch({
          type: "SAVE_FINANCE_LIST",
          payload: state.clearanceList,
        });

        return dispatch;
      });
  };
  return (
    <SeparationContext.Provider
      value={{
        separationListView,
        viewITClearanceList,
        setLoader,
        updateITClearanceList,
        viewAdminITClearanceList,
        viewFinanceAdminClearanceList,
        FinanceClearanceUploadSettlement,
        FinanceClearanceExport,
        UpdateAdminFinanceClearanceList,
        updateAdminFinanceClearance:state.updateAdminFinanceClearance,
        financeClearanceExport:state.financeClearanceExport,
        financeClearanceUploadSettlement:state.financeClearanceUploadSettlement,
        adminNoDueClearanceList:state.adminNoDueClearanceList,
        financeAdminNoDueClearanceList:state.financeAdminNoDueClearanceList,
        updateNoDueClearanceList:state.updateNoDueClearanceList,
        noDueClearanceList:state.noDueClearanceList,
        total:state.total,
        saveFinanceClearanceData,
        separationList: state.separationList,
        loader: state.loader,
        clearanceList: state.clearanceList,
      }}
    >
      {props.children}
    </SeparationContext.Provider>
  );
};
