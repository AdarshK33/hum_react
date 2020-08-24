import React, { createContext, useReducer} from 'react';
import axios from 'axios';
import environmentVariables from '../components/common/environment';

import RosterReducer from '../reducers/RosterReducer';
const baseUrl = "http://humine.theretailinsights.co/";
const initial_state = {
  shiftList:[]
}


export const RosterContext = createContext();
export const RosterProvider = ({ children }) => {
 const [state, dispatch] = useReducer(RosterReducer,initial_state);
 const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk4Mjc3Mjk0LCJpYXQiOjE1OTgyNDEyOTR9.bBPKvuWMCcUgmsJ6937t9tcEd7GIhwVwEbmZfovKFCU'
}


// VIEWSHIFT

function viewShift(){
  axios.get(baseUrl+'shift/view',{
    headers: headers
  }).then(function (response) {
 // console.log("data==>" + JSON.stringify(response));
  state.shiftList=response.data.data;
  return dispatch({ type: 'FETCH_SHIFT_LIST', payload: state.shiftList });
  })
  .catch(function (error) {
    console.log(error);
  });
}

//EDIT SHIFT


function editShift(shiftMasterId){
  alert(shiftMasterId);
  axios.get(baseUrl+'shift/view/'+shiftMasterId,{
    headers: headers
  }).then(function (response) {
  console.log("data==>" + JSON.stringify(response));
   state.shiftList=response.data.data;
   return dispatch({ type: 'EDIT_SHIFT_LIST', payload: state.shiftList });
  })
  .catch(function (error) {
    console.log(error);
  });
}

function updateShift(newEditShift) {
  return axios.put(baseUrl+"shift/update", newEditShift, {
    headers: headers
  }).then(function (response) {
  console.log("data==>" + JSON.stringify(response));
   state.shiftList=response.data.data;
   return dispatch({ type: 'EDIT_SHIFT_LIST', payload: state.shiftList });
  })
  .catch(function (error) {
    console.log(error);
  });
}





// ADD SHIFT

  function addShift(newShift) {
    return axios.post(baseUrl+"shift/create", newShift, {
      headers: headers
    })
  }


// DELETE SHIFT

  function deleteShift(shiftMasterId) {
    axios.delete(baseUrl+'shift/delete'+"?shiftId="+ shiftMasterId,{
      headers: headers
    }).then(function (response) {
      console.log("data==>" + JSON.stringify(response));
     // let myresult = response.data.data.shiftMasterId;
     

    return dispatch({ type: 'DELETE_SHIFT', payload:shiftMasterId });
    
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
    updateShift,
   shiftList:state.shiftList
  }}>
    {children}
  </RosterContext.Provider>);
}
