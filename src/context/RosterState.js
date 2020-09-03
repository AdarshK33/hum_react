import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import environmentVariables from '../components/common/environment';

import RosterReducer from '../reducers/RosterReducer';
const baseUrl = "http://humine.theretailinsights.co/";


const initial_state = {
  shiftList: [],
  shiftListNames: [],
  shiftContractNames: [],
  shiftMasterId: null,
  singleShiftList:[]
}


export const RosterContext = createContext();
export const RosterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RosterReducer, initial_state);
  const headers = {
    'Content-Type': 'application/json',

    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5MTcyMzE5LCJpYXQiOjE1OTkxMzYzMTl9.aWe2mllnjt3SsCA5FXBM1Y9xZdJb06RbpVEbOgZXSqU'

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




  return (<RosterContext.Provider value={{
    addShift,
    viewShift,
    deleteShift,
    editShift,
    viewShiftTypes,
    updateShift,
    viewContractTypes,
    shiftList: state.shiftList,
    shiftMasterId: state.shiftMasterId,
    shiftListNames: state.shiftListNames,
    shiftContractNames: state.shiftContractNames,
    singleShiftList:state.singleShiftList,
  }}>
    {children}
  </RosterContext.Provider>);
}
