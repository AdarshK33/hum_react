import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import environmentVariables from '../components/common/environment';
import { ToastContainer, toast } from "react-toastify";

import RosterReducer from '../reducers/RosterReducer';
const baseUrl = "http://humine.theretailinsights.co/";


const initial_state = {
  shiftList: [],
  shiftListNames: [],
  shiftContractNames: [],
  shiftMasterId: null,
  weekDays:[],
  weekOffDataList:[],
  singleShiftList:[]
}


export const RosterContext = createContext();
export const RosterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RosterReducer, initial_state);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5MjI2NjI1LCJpYXQiOjE1OTkxOTA2MjV9.IYxs1PWOyi0ECnUSsmN5LSjJbboBPLXnwyBv7APecv0'
  }

  // VIEWSHIFT

  function viewShift() {
  
    axios.get(baseUrl + 'shift/view', {
      headers: headers
    }).then(function (response) {
       console.log("data==>" + JSON.stringify(response));
      state.shiftList = response.data.data;
      return dispatch({ type: 'FETCH_SHIFT_LIST', payload: state.shiftList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  // VIEW SHIFT TYPE LIST

  function viewShiftTypes() {
    axios.get(baseUrl + 'shift/types', {
      headers: headers
    }).then(function (response) {
       console.log("data==>" + JSON.stringify(response));
      state.shiftListNames = response.data.data;
      return dispatch({ type: 'FETCH_SHIFT_LIST_NAMES', payload: state.shiftListNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

//VIEW CONTRACT TYPE LIST

  function viewContractTypes() {
    axios.get(baseUrl + 'contract_type/view', {
      headers: headers
    }).then(function (response) {
      //console.log("data==>" + JSON.stringify(response));
      state.shiftContractNames = response.data.data;
    
      return dispatch({ type: 'FETCH_CONTRACT_LIST_NAMES', payload: state.shiftContractNames });
    })
      .catch(function (error) {
        console.log(error);

      });
  }




//EDIT SHIFT

  function editShift(shiftMasterId) {
    alert(shiftMasterId);
    axios.get(baseUrl + 'shift/' + shiftMasterId, {
      headers: headers
    }).then(function (response) {
      //console.log("single shift list" + JSON.stringify(response));
      state.singleShiftList = response.data.data;
      return dispatch({ type: 'EDIT_SHIFT_LIST', payload: state.singleShiftList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


//UPDATE
  function updateShift(newEditShift) {
    return axios.put(baseUrl + "shift/update", newEditShift, {
      headers: headers
    })
  }

  // ADD SHIFT

  function addShift(newShift) {
    return axios.post(baseUrl + "shift/create", newShift, {
      headers: headers
    })

  }


  // DELETE SHIFT

  function deleteShift(shiftMasterId) {
    alert("delete" + shiftMasterId)
    axios.delete(baseUrl + 'shift/delete' + "?shiftId=" + shiftMasterId, {
      headers: headers
    }).then(function (response) {
      console.log("data==>" + JSON.stringify(response));
      // let myresult = response.data.data.shiftMasterId;   
      return dispatch({ type: 'DELETE_SHIFT', payload: shiftMasterId });

    })
      .catch(function (error) {
        console.log(error);
      });
    viewShift();
  };

// Get View WeekOff Weeks according to days
const weekOffDays = (weekId) => {
  console.log("weelId", weekId)
  axios.get(baseUrl + 'weekoff/weeks/days' + '?weekId=' + weekId, {
    headers: headers
  })
    .then((response) => {
      state.weekDays = response.data.data
      console.log("=====GET Weeks Off API respone=====", state.weekDays)
      return dispatch({ type: 'WEEKOFF_WEEK_DAYS', payload: state.weekDays})
    })
    .catch((error) => {
      console.log(error)
    })
}


// view Week Off Data according to the emp id

const weekOffDataEmp = () => {
  let empId = 'DSI001282'
  axios.get(baseUrl + 'weekoff/employee/view' + '?employeeId=' + empId, {
    headers: headers
  })
    .then((response) => {
      state.weekOffDataList = response.data.data
      console.log("=====GET Weeks Off API respone=====", state.weekOffDataList)
      return dispatch({ type: 'WEEKOFF_WEEK_DATA_LIST', payload: state.weekOffDataList})
    })
    .catch((error) => {
      console.log(error)
    })
}

//Add week off Data according to the emp id
const addWeekOff = (newWeekOff) => {
    console.log("++++create weekOff api response+++++", newWeekOff)
    return axios.post(baseUrl + 'weekoff/employee/create', newWeekOff, {
      headers: headers
    })
      .then((response) => {
        state.message = response.data.message
        toast.info(state.message)
        weekOffDataEmp()
        console.log("new create list response===>", response.data.data)
        console.log("new create list message===>", state.message)
        return dispatch({ type: 'ADD_NEW_WEEKOFF_DATA', payload: state.weekOffDataList })
      })
      .catch((error) => {
        console.log(error)
      })
      
  }

  return (<RosterContext.Provider value={{
    addShift,
    viewShift,
    deleteShift,
    editShift,
    viewShiftTypes,
    updateShift,
    viewContractTypes,
    weekOffDays,
    weekOffDataEmp,
    addWeekOff,
    shiftList: state.shiftList,
    shiftMasterId: state.shiftMasterId,
    shiftListNames: state.shiftListNames,
    shiftContractNames: state.shiftContractNames,
    weekDays: state.weekDays,
    weekOffDataList: state.weekOffDataList,
    singleShiftList:state.singleShiftList,
  }}>
    {children}
  </RosterContext.Provider>);
}
