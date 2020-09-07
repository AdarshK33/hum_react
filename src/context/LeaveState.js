import React, { createContext, useReducer, useEffect } from 'react';
import {client} from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import LeaveReducer from '../reducers/LeaveReducer'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const baseUrl = "http://humine.theretailinsights.co/";
const initialState = {
  leaveList: [],
  leaveType: [],
  message: '',
  leavesData: [],
  leaveDataList: {},
  holidayDataList:{},
  grantLeave: []
}

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LeaveReducer, initialState);

 /*  const headers = {
    'Content-Type': 'application/json',
<<<<<<< HEAD
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5MzQ1NTU2LCJpYXQiOjE1OTkzMDk1NTZ9.XahxYE-AaDeeVijikSN9wjM3htCe_F_p1ofKXmsrBt8'
=======
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQUkFKVkFMIFBBVUwgUkFZIiwiZXhwIjoxNTk5NDI2MTY0LCJpYXQiOjE1OTkzOTAxNjR9.glS3NIr7zI6421NxXKeiJfCVTh6PElI5HCVe1g802ww'
>>>>>>> e7e400c2f8b8447e9c71386bc305321fd63b5d4a
  }
    //View Leave */
  //View Leave

  const viewList = () => {
    client.get('leave_transaction/view')
      .then((response) => {
        state.leaveList =  response.data.data
        getLeave();
        console.log("=====GET API respone=====", state.leaveList)
        
        return dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // View Leave Data
  const viewLeaveData = () => {

    let empId1 = "DSI000035"
    client.get('leave_transaction/view/' + empId1)
      .then((response) => {
        state.leaveDataList = response.data.data
        console.log("=====GET Leave Data API respone=====", state.leaveDataList)
        return dispatch({ type: 'FETCH_LEAVE_DATA_LIST', payload: state.leaveDataList })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //view Grant Leave
  const viewGrantLeave = () => {

    let empId1 = "DSI000035"
    let year = '2020'
    client.get('grant_leave/view/' + empId1 + '/' + year)
      .then((response) => {
        state.grantLeave = response.data.data[0].numOfDays
        console.log("=====GET Grant Leave  API respone=====", response.data.data[0].numOfDays)
        return dispatch({ type: 'FETCH_GRANT_LEAVE', payload: state.grantLeave })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Get Leave Type

  const getLeave = () => {
    client.get('leave_type/view')
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

    return client.post('leave_transaction/create', newPopup)
      .then((response) => {
        state.message = response.data.message
        state.leavesData = response.data.data
        alert(state.message + " " + ' ' + (state.leavesData !== null ? JSON.stringify(state.leavesData):''))
        console.log("Pop upresponse===>", JSON.stringify(state.leavesData))
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
      return client.post('leave_transaction/create',newLeave)
        .then((response) => {
          state.message = response.data.message
          toast.info(state.message)
          viewList();
          viewLeaveData();
          console.log("new create list response===>", response.data.data)
          console.log("new create list message===>", state.message)
          return dispatch({ type: 'ADD_NEW_LEAVE', payload: state.leaveList })
          return (<ToastContainer />)
        })
        .catch((error) => {
          console.log(error)
        })

    }
    viewList()
  }



  //Edit Leave

  const editList = (editLeave) => {
    console.log("??????????????????edit api id response???????????????/", editLeave)
    return client.put('leave_transaction/update', editLeave)
      .then((response) => {
        state.message = response.data.message
        toast.info(state.message)
        viewList()
        viewLeaveData();
        console.log("??????new edit list response????????", response.data.data)
        console.log("??????new edit list message????????", state.message)
        return dispatch({ type: 'EDIT_LEAVE', payload: state.leaveList })
        // return (<ToastContainer />)
      })
      .catch((error) => {
        console.log(error)
      })


  }

  // Delete Leave

  const deleteList = (leaveId, leaveCategory) => {
    if (window.confirm('Are you sure to delete the item')) {
      if(leaveCategory == 'Maternity'){
        alert("Sent request for delete the maternity Leave")
     console.log("leaveCategory", leaveCategory)
      client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
        .then((response) => {
          toast.info(response.data.message)
          viewList()
          viewLeaveData();
          console.log("-----delete data-----", response)
          return dispatch({ type: 'DELETE_LEAVE', payload: leaveId });


        })
        .catch((error) => {
          console.log(error)
        })
       
    }
    else{
      client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
      .then((response) => {
        toast.info(response.data.message)
        viewList()
        viewLeaveData();
        console.log("-----delete data-----", response)
        return dispatch({ type: 'DELETE_LEAVE', payload: leaveId });


      })
      .catch((error) => {
        console.log(error)
      })
     
    }
  
  }
  }


  const getHoliday = () => {
    // const [state, updateStae] =uss
     client.get('holiday/view').then(function (response) {
       console.log(response)
      state.holidayDataList = response.data.data
     
      // state.holiday = response.data.data;
        return dispatch({ type: 'FETCH_HOLIDAY_LIST', payload: state.holidayDataList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file',file)

    return client.post('holiday/upload', formData)
      .then((response) => {
        console.log(response,"res")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  



  return (
    <LeaveContext.Provider value={{
      viewList,
      getHoliday,
      uploadFile,
      addLeave,
      addPopup,
      getLeave,
      editList,
      deleteList,
      viewLeaveData,
      viewGrantLeave,
      leaveList: state.leaveList,
      leaveType: state.leaveType,
      message: state.message,
      leavesData: state.leavesData,
      leaveDataList: state.leaveDataList,
      holidayDataList:state.holidayDataList,
      grantLeave: state.grantLeave
    }}>
      {children}
    </LeaveContext.Provider>
  );
}
