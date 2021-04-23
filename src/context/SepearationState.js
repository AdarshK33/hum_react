import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import SepationReducer from "../reducers/SeparationReducer";
import { toast } from "react-toastify";
import Axios from "axios";
import { access_token } from "../auth/signin";

const initial_state = {
  noDueClearanceList:[],
  updateNoDueClearanceList:[],
  separationList: [],
  total: {},
  data: [],
  clearanceList: [],
};

export const SeparationContext = createContext();
export const SeparationProvider = (props) => {
  const [state, dispatch] = useReducer(SepationReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const separationListView = (key, page) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/finance-clearance/view?key=" +
          key +
          "&page=" +
          page +
          "&size=" +
          10
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
        state.noDueClearanceList = response.data.data.data
        state.data = response.data.data;
        state.total = response.data.data.total;
        console.log("=====GET Admin separation API response=====", response.data.data)

        return dispatch({ type: 'FETCH_SEPARATION_LIST', payload: state.noDueClearanceList })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const updateITClearanceList = (value,key,page,costCenter) => {
    console.log(value,"value in update ")
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
      managerName: value.managerName
    }
    console.log(formData,"updateClearanceList separation context")
    return client.post('/api/v1/separation/it-clearance/edit', formData)
      .then((response) => {
        toast.info(response.data.message);
        viewITClearanceList(key,page,costCenter)
        return (
          dispatch({ type: 'UPDATE_SEPARATION_LIST', payload: state.updateNoDueClearanceList })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const saveFinanceClearanceData = (data) => {
    setLoader(true);
    return client
      .post("/api/v1/separation/finance-clearance/create", data)
      .then((response) => {
        state.clearanceList = response.data.data;
        console.log(response.data.data);
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
