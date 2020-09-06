import React, { createContext, useReducer, useState } from 'react';
import {client} from '../utils/axios';
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

  // VIEWSHIFT

  function viewShift() {
  
    client.get('shift/view').then(function (response) {
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
    client.get('shift/types').then(function (response) {
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
    client.get('contract_type/view').then(function (response) {
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
   // alert(shiftMasterId);
    client.get('shift/' + shiftMasterId).then(function (response) {
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
    return client.put("shift/update")
  }

  // ADD SHIFT

  function addShift(newShift) {
    return client.post("shift/create")

  }


  // DELETE SHIFT

  function deleteShift(shiftMasterId) {
    alert("delete" + shiftMasterId)
    client.delete('shift/delete' + "?shiftId=" + shiftMasterId).then(function (response) {
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
  client.get('weekoff/weeks/days' + '?weekId=' + weekId)
    .then((response) => {
      state.weekDays = response.data.data
      console.log("=====GET Weeks Off API respone=====", state.weekDays)
      return dispatch({ type: 'WEEKOFF_WEEK_DAYS', payload: state.weekDays})
    })
    .catch((error) => {
      console.log(error)
    })
}


// view Week Off Data in roster table

const weekOffDataEmp = (endDate, startDate) => {
  const empId = 'DSI000035'
    client.get('roster/employee/view' + '?employeeId=' + empId + 
    '&' + 'endDate=' + endDate + '&' + 'startDate=' + startDate)
      .then((response) => {
        state.weekOffDataList =  response.data.data
        console.log("=====GET weekOff Data API respone=====", state.weekOffDataList)
        
        return dispatch({ type: 'WEEKOFF_WEEK_DATA_LIST', payload: state.weekOffDataList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

//Add week off Data according to the emp id
const addWeekOff = (newWeekOff) => {
    console.log("++++create weekOff api response+++++", newWeekOff)
    return client.post('weekoff/employee/create', newWeekOff)
      .then((response) => {
        state.weekOffDataList =  response.data.data
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
