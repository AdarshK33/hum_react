import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import SepationReducer from "../reducers/SeparationReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

import Axios from "axios";
import { access_token } from "../auth/signin";
var FileSaver = require("file-saver");

const initial_state = {
  financeAdminNoDueClearanceList: [],
  adminNoDueClearanceList: [],
  noDueClearanceList: [],
  updateNoDueClearanceList: [],

  separationList: [],
  total: {},
  data: [],
  clearanceList: [],
  financeClearanceUpload: {},
  financeAdminClearanceExport: {},
  noDueClearanceAdminClearanceExport: {},
  noDueClearanceClearanceExport: {},
  financeClearanceExport: {},
  updateAdminFinanceClearanceList: [],
  empResignData: [],
  managerList: [],
  promotioManagerList:[],
  allManagerList:[],
  modeOfResponse: [],
  reason: {},
  searchByCostData: [],
  managersByCostcenterList:[]
};

export const SeparationContext = createContext();
export const SeparationProvider = (props) => {
  const [state, dispatch] = useReducer(SepationReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const separationListView = (key, page, actionStatus, costCenter) => {
    console.log(key, page, actionStatus, costCenter, "finance state");
    setLoader(true);
    client
      .get(
        "/api/v1/separation/finance-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&status=" +
          actionStatus +
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
  const viewFinanceAdminClearanceList = (key, page, costCenter) => {
    setLoader(true);
    client
      .post(
        `/api/v1/separation/full-and-final/view?page=${page}&size=10&storeId=${costCenter}&key=${key}`
      )
      .then((response) => {
        state.financeAdminNoDueClearanceList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        console.log(
          "=====GET financeAdminNoDueClearanceList API response=====",
          response.data.data
        );
        setLoader(false);
        return dispatch({
          type: "FETCH_FINANCE_ADMIN_NODUECLEARANCE_LIST",
          payload: state.financeAdminNoDueClearanceList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateAdminFinanceClearanceList = (value, key, page, costCenter) => {
    console.log(value, "value in update ");
    // const formData = {
    //   costCenterName: value.costCenterName,
    //   deactivateProfile: value.deactivateProfile,
    //   disabled: value.disabled,
    //   employeeId: value.employeeId,
    //   employeeName: value.employeeName,
    //   exitId: value.exitId,
    //   fullAndFinalAmount: parseInt(value.fullAndFinalAmount),
    //   fullAndFinalCompleteStatus: value.fullAndFinalCompleteStatus,
    //   fullAndFinalId: value.fullAndFinalId,
    //   fullAndFinalProcessDate: value.fullAndFinalProcessDate,
    //   joiningDate: value.joiningDate,
    //   lastWorkingDate:value.lastWorkingDate,

    //   managerName: value.managerName,
    //   modeOfSeparation:value.modeOfSeparation
    // };

    // console.log(formData, "updateAdminFinanceClearanceList separation context");
    setLoader(true);
    return client
      .post("/api/v1/separation/full-and-final/edit", value)
      .then((response) => {
        toast.info(response.data.message);
        viewFinanceAdminClearanceList(key, page, costCenter);
        setLoader(false);
        return dispatch({
          type: "UPDATE_ADMIN_FINANCE_SEPARATION",
          payload: state.updateAdminFinanceClearance,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const viewAdminITClearanceList = (finalStatus, key, page, costCenter) => {
    // financeStatus +
    // "&finalStatus=" +
    console.log(finalStatus, key, page, costCenter, "viewAdminIt");
    client
      .get(
        "/api/v1/separation/full-and-final/view/no-due-clearance?finalStatus=" +
          finalStatus +
          "&key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&storeId=" +
          costCenter
      )
      .then((response) => {
        state.adminNoDueClearanceList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        console.log(
          key,
          page,
          costCenter,
          "=====GET FETCH_ADMIN_NODUECLEARANCE_LIST API response=====",
          response.data.data
        );
        return dispatch({
          type: "FETCH_ADMIN_NODUECLEARANCE_LIST",
          payload: state.adminNoDueClearanceList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewITClearanceList = (key, page, actionStatus, costCenter) => {
    console.log(actionStatus, key, page, costCenter, "viewIt");
    console.log(key, page, client.defaults.headers, "promotion ");

    setLoader(true);
    client
      .get(
        "/api/v1/separation/it-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&status=" +
          actionStatus +
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
        setLoader(false);
        return dispatch({
          type: "FETCH_SEPARATION_LIST",
          payload: state.noDueClearanceList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FinanceClearanceUploadSettlement = (file, key, page, costCenter) => {
    console.log(file, "file in update FinanceClearanceUploadSettlement");
    const formData = new FormData();
    formData.append("file", file, file.name);
    console.log(
      formData,
      "FinanceClearanceUploadSettlement separation context"
    ); 
    return client
      .post(
       `/api/v1/separation/full-and-final/view?page=${page}&size=10&storeId=${costCenter}&key=${key}`
            ,
        formData
      )
      .then((response) => {
        console.log(response, "upload");
        state.financeAdminNoDueClearanceList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        console.log(
          "=====GET financeAdminNoDueClearanceList API response=====",
          response.data.data
        );
        toast.info(response.data.message);
        // viewFinanceAdminClearanceList(key, page, costCenter);

        return dispatch({
          type: "FETCH_FINANCE_ADMIN_NODUECLEARANCE_LIST",
          payload: state.financeAdminNoDueClearanceList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const NoDueClearanceAdminClearanceExport = () => {
    console.log("NoDueClearanceAdminClearanceExport separation context");
    return client
      .get("/api/v1/separation/full-and-final/no-due-clearance/download", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        console.log(response, "export excel ");
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = "AdminNoDueClearanceListing.xlsx";
        saveAs(blob, fileName);

        toast.info(response.data.message);
        return dispatch({
          type: "NO_DUE_CLEARANCE_ADMIN_EXPORT",
          payload: state.noDueClearanceAdminClearanceExport,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FinanceAdminClearanceExport = () => {
    console.log("FinanceAdminClearanceExport separation context");
    return client
      .get("/api/v1/separation/full-and-final/download", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = "F&FListing.xlsx";
        saveAs(blob, fileName);

        toast.info(response.data.message);
        return dispatch({
          type: "FINANCECLEARANCE_ADMIN_EXPORT",
          payload: state.financeAdminClearanceExport,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const NoDueClearanceClearanceExport = () => {
    console.log("NoDueClearanceClearanceExport separation context");
    setLoader(true);
    return client
      .get("/api/v1/separation/it-clearance/download", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        console.log(response, "export excel ");
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = "NoDueClearanceListing.xlsx";
        saveAs(blob, fileName);

        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "NO_DUE_CLEARANCE_EXPORT",
          payload: state.noDueClearanceClearanceExport,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FinanceClearanceExport = () => {
    console.log("FinanceClearanceExport separation context");
    setLoader(true);
    return client
      .get("/api/v1/separation/finance-clearance/download", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = "FinanceClearnace.xlsx";
        saveAs(blob, fileName);

        toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "FINANCECLEARANCE_EXPORT",
          payload: state.financeClearanceExport,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateITClearanceList = (
    value,
    key,
    page,
    actionStatus,
    costCenter
  ) => {
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
      disabled: value.disabled,
    };
    console.log(formData, "updateClearanceList separation context");
    setLoader(true);
    return client
      .post("/api/v1/separation/it-clearance/edit", formData)
      .then((response) => {
        toast.info(response.data.message);
        viewITClearanceList(key, page, actionStatus, costCenter);
        setLoader(false);
        return dispatch({
          type: "UPDATE_SEPARATION_LIST",
          payload: state.updateNoDueClearanceList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveFinanceClearanceData = (
    value,
    key,
    page,
    actionStatus,
    costCenter
  ) => {
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
      disabled: value.disabled,
    };
    console.log(formData, "saveFinanceClearanceData");
    setLoader(true);
    return client
      .post("/api/v1/separation/finance-clearance/create", formData)
      .then((response) => {
        state.clearanceList = response.data.data;
        console.log(response.data.data);
        separationListView(key, page, actionStatus, costCenter);
        setLoader(false);
        dispatch({
          type: "SAVE_FINANCE_LIST",
          payload: state.clearanceList,
        });

        return dispatch;
      });
  };

  const empResign = (create) => {
    console.log("response of loader outside-----", loader);
    return client
      .post("api/v1/separation/employee-exit/create", create)
      .then((response) => {
        toast.info(response.data.message);
        console.log("response of loader -----", loader);
        return dispatch({
          type: "EMP_RESIGN",
          payload: state.empResignData,
          loader: loader,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const managerData = (costCenter) => {
    return client
      .get(`api/v1/employee/view/${costCenter}/managers`)
      .then((response) => {
        console.log(response, "managerData response");
        state.managerList = response.data.data;
        return dispatch({ type: "MANAGER_LIST", payload: state.managerList });
      });
  };

  const promotionManagerData = (costCenter,department) => {
    return client
      .get(`api/v1/employee/view/managers/costCentre/${department}?storeId=${costCenter}`)
      .then((response) => {
        console.log(response, "managerData response");
        state.promotioManagerList = response.data.data;
        return dispatch({ type: "PROMOTION_MANAGER_LIST", payload: state.promotioManagerList });
      });
  };

  const allPromotionManager = () => {
    return client
      .get("api/v1/employee/view/managers")
      .then((response) => {
        console.log(response, "managerData response");
        state.allManagerList = response.data.data;
        return dispatch({ type: "ALL_MANAGERS_LIST", payload: state.allManagerList });
      });
  };

  const managersByCostcenter = (costCenter) => {
    return client
      .get(`api/v1/employee/view/managers/${costCenter}`)
      .then((response) => {
        console.log(response, "managerData response");
        state.managersByCostcenterList = response.data.data;
        return dispatch({ type: "MANAGERS_BY_COSTCENTER_LIST", payload: state.managersByCostcenterList });
      });
  };

  const modeOfSeparation = () => {
    return client
      .get("api/v1/mode-of-separation/view")
      .then((response) => {
        const reason = response.data.data[0].modeOfSeparation.modeOfSeparation;
        const modeOfResponse = response.data.data[0].modeOfSeparationReasonList;
        console.log("state.modeOfResponse", state.modeOfResponse);
        console.log("state.reason", state.reason);
        return dispatch({
          type: "MODE_OF_SEPARATION",
          payload: { modeOfResponse, reason },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const withdraw = (empId) => {
    return client
      .get(`/api/v1/separation/employee-exit/withdraw?exitId=${empId}`)
      .then((response) => {
        toast.info(response.data.message);
        console.log("response of withdraw", response.data);
        return dispatch({ type: "WITHDRAW_RESIGNATION" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
//search by employee name and id and search for disciplianary action is taken or not 
const searchByEmployee =(key)=>{
  client
  .get("/api/v1/separation/employee-exit/search?key=" + key)
  .then((response) => {
    console.log(response,"response88")
    if (response.data.data === null) {
      state.searchByCostData = response.data.data;
      console.log("response.data.data", response.data.data);
      toast.info(response.data.message);
    } else {
      state.searchByCostData = response.data.data;
      console.log("response.data.data[0]", response.data.data);
    }
    console.log("response", response);
    console.log("search Emp response", state.searchEmpData1);
    return dispatch({
      type: "SEARCH_BY_COST_DATA",
      payload: state.searchByCostData,
    });
  })
  .catch((error) => {
    console.log(error);
  });
}
const searchByEmployeeNull =()=>{
  state.searchByCostData = null
    return dispatch({
      type: "SEARCH_BY_COST_DATA",
      payload: state.searchByCostData,
    });
}
  //Search by reference emp name1 or emp id
  const searchByCostCenter = (key) => {
    client
      .get("/api/v1/employee/role_based_search?key=" + key)
      .then((response) => {
        if (response.data.data === null) {
          state.searchByCostData = response.data.data;
          console.log("response.data.data", response.data.data);
          toast.info(response.data.message);
        } else {
          state.searchByCostData = response.data.data[0];
          console.log("response.data.data[0]", response.data.data[0]);
        }
        console.log("response", response);
        console.log("search Emp response", state.searchEmpData1);
        return dispatch({
          type: "SEARCH_BY_COST_DATA",
          payload: state.searchByCostData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MakeCostCenterDataNull = () => {
    state.searchByCostData = {};
    return dispatch({
      type: "SEARCH_BY_COST_DATA",
      payload: state.searchByCostData,
    });
  };
  
  return (
    <SeparationContext.Provider
      value={{
        separationListView,
        viewITClearanceList,
        MakeCostCenterDataNull,
        setLoader,
        updateITClearanceList,
        viewAdminITClearanceList,
        viewFinanceAdminClearanceList,
        FinanceClearanceUploadSettlement,
        FinanceAdminClearanceExport,
        UpdateAdminFinanceClearanceList,
        NoDueClearanceAdminClearanceExport,
        NoDueClearanceClearanceExport,
        searchByEmployee,
        FinanceClearanceExport,
        searchByCostCenter,
        promotionManagerData,
        searchByEmployeeNull,
        allPromotionManager,
        saveFinanceClearanceData,
        empResign,
        managerData,
        modeOfSeparation,
        withdraw,
        managersByCostcenter,
        promotioManagerList:state.promotioManagerList,
        allManagerList:state.allManagerList,
        financeClearanceExport: state.financeClearanceExport,
        updateAdminFinanceClearance: state.updateAdminFinanceClearance,
        financeAdminClearanceExport: state.financeAdminClearanceExport,
        noDueClearanceAdminClearanceExport:
          state.noDueClearanceAdminClearanceExport,
        financeClearanceUpload: state.financeClearanceUpload,
        adminNoDueClearanceList: state.adminNoDueClearanceList,
        financeAdminNoDueClearanceList: state.financeAdminNoDueClearanceList,
        updateNoDueClearanceList: state.updateNoDueClearanceList,
        noDueClearanceList: state.noDueClearanceList,
        noDueClearanceClearanceExport: state.noDueClearanceClearanceExport,
        total: state.total,
        separationList: state.separationList,
        loader: state.loader,
        clearanceList: state.clearanceList,
        managerList: state.managerList,
        modeOfResponse: state.modeOfResponse,
        reason: state.reason,
        searchByCostData: state.searchByCostData,
        managersByCostcenterList:state.managersByCostcenterList
      }}
    >
      {props.children}
    </SeparationContext.Provider>
  );
};
