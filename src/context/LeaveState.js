import React, { createContext, useReducer } from 'react';
import {client} from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import LeaveReducer from '../reducers/LeaveReducer'
import { Modal } from 'react-bootstrap';


const initialState = {
  leaveList: [],
  leaveType: [],
  message: '',
  leavesData: {},
  leaveDataList: {},
  holidayDataList:{},
  empData:[]
 
}

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LeaveReducer, initialState);

  
  //View Leave

  const viewList = () => {
    client.get('leave_transaction/view')
      .then((response) => {
        state.leaveList =  response.data.data
        getLeave();
        console.log("=====GET API respone=====", state.leaveList)
        return (
          dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList })
         /*  dispatch({ type: 'FETCH_LEAVE_TYPE', payload: state.leaveType }),
          dispatch({ type: 'FETCH_GRANT_LEAVE', payload: state.grantLeave }) */
        )
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
 /*  const viewGrantLeave = () => {

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
  } */

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
        alert(state.message + " " + ' ' + (state.leavesData !== null ? JSON.stringify(state.leavesData) :''))        
        console.log("Pop upresponse===>", JSON.stringify(state.leavesData))
        console.log("Pop upresponse===>", state.leavesData)
        console.log("Pop up message===>", state.message)
        return (
        dispatch({ type: 'ADD_POPUP_LEAVE', payload: state.leavesData })
        )
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
          getLeave()
          console.log("new create list response===>", response.data.data)
          console.log("new create list message===>", state.message)
          return (
          dispatch({ type: 'ADD_NEW_LEAVE', payload: state.leaveList })
         /*  dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList }),
          dispatch({ type: 'FETCH_LEAVE_TYPE', payload: state.leaveType }),
          dispatch({ type: 'FETCH_GRANT_LEAVE', payload: state.grantLeave }) */
          )
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
        getLeave()
        console.log("??????new edit list response????????", response.data.data)
        console.log("??????new edit list message????????", state.message)
        return ( 
        dispatch({ type: 'EDIT_LEAVE', payload: state.leaveList })
      /*   dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList }),
        dispatch({ type: 'FETCH_LEAVE_TYPE', payload: state.leaveType }),
        dispatch({ type: 'FETCH_GRANT_LEAVE', payload: state.grantLeave }) */
        )
        // return (<ToastContainer />)
      })
      .catch((error) => {
        console.log(error)
      })


  }

  // Delete Leave

  const deleteList = (leaveId) => {
      client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
      .then((response) => {
        toast.info(response.data.message)
        viewList()
        viewLeaveData();
        console.log("-----delete data-----", response)
        return (
          dispatch({ type: 'DELETE_LEAVE', payload: leaveId })
      /*     dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList }),
          dispatch({ type: 'FETCH_LEAVE_TYPE', payload: state.leaveType }),
          dispatch({ type: 'FETCH_GRANT_LEAVE', payload: state.grantLeave }) */

        )

      })
      .catch((error) => {
        console.log(error)
      })
     
    }
  

 
//Holiday List

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
  
// Emp data according to their EmpId
const viewEmpData = () => {

  let empId1 = "DSI000035"
  client.get('employee/view/{empId}' + '?empId='  + empId1)
    .then((response) => {
      state.empData = response.data.data
      console.log("=====GET Emp Data API respone=====", state.empData)
      return dispatch({ type: 'FETCH_EMP_DATA', payload: state.empData })
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
      viewEmpData,
      leaveList: state.leaveList,
      leaveType: state.leaveType,
      message: state.message,
      leavesData: state.leavesData,
      leaveDataList: state.leaveDataList,
      holidayDataList:state.holidayDataList,
      empData: state.empData
     
    }}>
      {children}
    </LeaveContext.Provider>
  );
}
