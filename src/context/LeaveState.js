import React, { createContext,useReducer,useEffect } from 'react';
 import axios from 'axios';
 import LeaveReducer from '../reducers/LeaveReducer'

 const baseUrl = "http://humine.theretailinsights.co/";
 const initialState = {
   leaveList :[],
   leaveType:[]
 }

 export const LeaveContext = createContext();

 export const LeaveProvider = ({children}) => {
     const [state, dispatch] = useReducer(LeaveReducer, initialState);

     const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk4Mjc3Mjk0LCJpYXQiOjE1OTgyNDEyOTR9.bBPKvuWMCcUgmsJ6937t9tcEd7GIhwVwEbmZfovKFCU'
    }
 
    //View Leave

    const viewList = () => {
      axios.get(baseUrl+'leave_transaction/view',{
        headers: headers
      })
      .then((response) => {
        state.leaveList = response.data.data
        console.log("=====GET API respone=====", state.leaveList)
        return dispatch({type:'FETCH_LEAVE_LIST', payload: state.leaveList})
      })
      .catch((error) => {
        console.log(error)
      })
    }
    // Get Leave Type

    const getLeave = () => {
      axios.get(baseUrl+'leave_type/view',{
        headers: headers
      })
      .then((response) => {
          state.leaveType = response.data.data
          console.log("get leave type", state.leaveType)
          return dispatch({type: 'FETCH_LEAVE_TYPE', payload: state.leaveType})
      })
      .catch((error) => {
        console.log(error)
      })
    }

    // Add LeaveProvider

    const addLeave = (newLeave) => {
      axios.post(baseUrl+'leave_transaction/create', newLeave, {
        headers: headers
      })
    }

    // Delete Leave

    const deleteList = (leaveId) => {
        axios.delete(baseUrl+'leave_transaction/delete'+'?ltId='+leaveId,{
          headers: headers
        })
        .then((response) => {
          console.log("-----delete data-----",response)
          return dispatch({ type: 'DELETE_LEAVE', payload:leaveId });
        })
        .catch((error) => {
          console.log(error)
        })
        viewList();
    }

 return(
     <LeaveContext.Provider value={{
       viewList,
       addLeave,
       getLeave,
       deleteList,
       leaveList: state.leaveList,
       leaveType: state.leaveType
     }}>
         {children}
     </LeaveContext.Provider>
 );
 }
