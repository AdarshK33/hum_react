import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import LeaveReducer from '../reducers/LeaveReducer'

const baseUrl = "http://humine.theretailinsights.co/";
const initialState = {
  leaveList: [],
  leaveType: [],
  message: '',
  leavesData: [],
  leaveDataList:{}
}

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LeaveReducer, initialState);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk4NTcxNDExLCJpYXQiOjE1OTg1MzU0MTF9.W1d6kVsWDrht6emtL2y_geKqVYAPkopIIHJuYpJ1FdM'
  }
  //View Leave

  const viewList = () => {
    axios.get(baseUrl + 'leave_transaction/view', {
      headers: headers
    })
      .then((response) => {
        state.leaveList = response.data.data
        console.log("=====GET API respone=====", state.leaveList)
        return dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // View Leave Data
  const viewLeaveData = () => {
    
    let empId1="DSI000035"
    axios.get(baseUrl + 'leave_transaction/view/{empId}?empId='+empId1, {
      headers: headers
    })
      .then((response) => {
        state.leaveDataList = response.data.data
        console.log("=====GET Leave Data API respone=====", response.data.data)
        console.log("=====GET Leave Data API respone=====", state.leaveDataList)
        return dispatch({ type: 'FETCH_LEAVE_DATA_LIST', payload: state.leaveDataList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Get Leave Type

  const getLeave = () => {
    axios.get(baseUrl + 'leave_type/view', {
      headers: headers
    })
      .then((response) => {
        state.leaveType = response.data.data
        console.log("get leave type", state.leaveType)
        return dispatch({ type: 'FETCH_LEAVE_TYPE', payload: state.leaveType })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Add new Leave 
  const addPopup = (newPopup) => {

    console.log("++++pop up response+++++", newPopup)
    return axios.post(baseUrl + 'leave_transaction/create', newPopup, {
      headers: headers
    })
      .then((response) => {
        state.message = response.data.message
        state.leavesData = response.data.data
        alert(state.message + "=>" + JSON.stringify(state.leavesData))
        console.log("Pop upresponse===>", state.leavesData)
        console.log("Pop up message===>", state.message)
        return dispatch({ type: 'ADD_POPUP_LEAVE', payload: state.leavesData })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addLeave = (newLeave) => {
    if (newLeave) {
      console.log("++++create api response+++++", newLeave)
      return axios.post(baseUrl + 'leave_transaction/create', newLeave, {
        headers: headers
      })
        .then((response) => {
          state.message = response.data.message
          toast.info(state.message)
          if (state.message) {
            viewList()
          }
          console.log("new create list response===>", response.data.data)
          console.log("new create list message===>", state.message)
          return dispatch({ type: 'ADD_NEW_LEAVE', payload: state.leaveList })
          return (<ToastContainer />)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }



  //Edit Leave

  const editList = (editLeave) => {
    console.log("??????????????????edit api id response???????????????/", editLeave)
    return axios.put(baseUrl + 'leave_transaction/update', editLeave, {
      headers: headers
    })
      .then((response) => {
        state.message = response.data.message
        toast.info(state.message)
        if (state.message) {
          viewList()
        }
        console.log("??????new edit list response????????", response.data.data)
        console.log("??????new edit list message????????", state.message)
        return dispatch({ type: 'EDIT_LEAVE', payload: state.leaveList })
        return (<ToastContainer />)
      })
      .catch((error) => {
        console.log(error)
      })


  }

  // Delete Leave

  const deleteList = (leaveId) => {
    if (window.confirm('Are you sure to delete the item')) {
      axios.delete(baseUrl + 'leave_transaction/delete' + '?ltId=' + leaveId, {
        headers: headers
      })
        .then((response) => {
          toast.info(response.data.message)
        
          console.log("-----delete data-----", response)
          return dispatch({ type: 'DELETE_LEAVE', payload: leaveId });


        })
        .catch((error) => {
          console.log(error)
        })
        viewList()
    }
    viewList()
  }

  return (
    <LeaveContext.Provider value={{
      viewList,
      addLeave,
      addPopup,
      getLeave,
      editList,
      deleteList,
      viewLeaveData,
      leaveList: state.leaveList,
      leaveType: state.leaveType,
      message: state.message,
      leavesData: state.leavesData,
      leaveDataList: state.leaveDataList
    }}>
      {children}
    </LeaveContext.Provider>
  );
}
