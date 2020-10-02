import React, { createContext, useReducer,useContext } from 'react';
import { client } from '../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import LeaveReducer from '../reducers/LeaveReducer'
import { AppContext } from "../context/AppState";


const initialState = {
  leaveList: [],
  leaveType: [],
  message: '',
  leavesData: {},
  leaveDataList: {},
  holidayDataList:{},
  empData:[],
  reportList:[],
  employeeList:[],
  leaveEmpList:[]
 
}

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LeaveReducer, initialState);
  const { user } = useContext(AppContext);
  
  //View Leave

  const viewList = () => {
    client.get('leave_transaction/view')
      .then((response) => {
        state.leaveList =  response.data.data
        getLeave(user.employeeId);
        console.log("=====GET API respone=====", state.leaveList)
        return (
          dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // View Leave Data
  const viewLeaveData = (empId1) => {
    // let empId1 = 'DSI000035'
    client.get('leave_transaction/view/' + user.employeeId)
      .then((response) => {
        state.leaveDataList = response.data.data
        console.log("=====GET Leave Data API respone=====", state.leaveDataList)
        return dispatch({ type: 'FETCH_LEAVE_DATA_LIST', payload: state.leaveDataList })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // View Leave Data
  const viewEmpLeaveData = (empId1) => {
    client.get('leave_transaction/view/' + user.employeeId)
      .then((response) => {
        state.leaveEmpList = response.data.data.leaveTransactions
        console.log("=====GET Leave Data API respone=====", state.leaveEmpList)
        return dispatch({ type: 'FETCH_EMP_LEAVE_DATA_LIST', payload: state.leaveEmpList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Get Leave Type

  const getLeave = (empId1) => {
    // let empId1 = 'DSI000035'
    client.get('leave_type/view/' + empId1)
  
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
    console.log("newPopup data", newPopup)
    return client.post('leave_transaction/create', newPopup)
      .then((response) => {
        state.message = response.data.message
        state.leavesData = response.data.data 
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
  /*   if (newLeave) { */
      console.log("++++create api response+++++", newLeave)
      return client.post('leave_transaction/create',newLeave)
        .then((response) => {
          state.message = response.data.message;
          toast.info(state.message)
          viewList();
          viewLeaveData();
          getLeave(user.employeeId)
          console.log("new create list response===>", response.data.data)
          console.log("new create list message===>", state.message)
          return  dispatch({ type: 'ADD_NEW_LEAVE', payload: state.leaveList })
          return (<ToastContainer />)
        })
        .catch((error) => {
          console.log(error)
        })

  }

  const addEmpLeave = (newLeave) => {
    /*   if (newLeave) { */
        console.log("++++create api response+++++", newLeave)
        return client.post('leave_transaction/create',newLeave)
          .then((response) => {
            state.message = response.data.message;
            toast.info(state.message)
            viewEmpLeaveData()
            viewLeaveData();
            getLeave(user.employeeId)
            console.log("new create list response===>", response.data.data)
            console.log("new create list message===>", state.message)
            return  dispatch({ type: 'ADD_EMP_NEW_LEAVE', payload: state.leaveEmpList })
            return (<ToastContainer />)
          })
          .catch((error) => {
            console.log(error)
          })
  
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
        getLeave(user.employeeId)
        console.log("??????new edit list response????????", response.data.data)
        console.log("??????new edit list message????????", state.message)
        return  dispatch({ type: 'EDIT_LEAVE', payload: state.leaveList })
      })
      .catch((error) => {
        console.log(error)
      })


  }
  const editEmpList = (editLeave) => {
    console.log("??????????????????edit api id response???????????????/", editLeave)
    return client.put('leave_transaction/update', editLeave)
      .then((response) => {
        state.message = response.data.message
        toast.info(state.message)
        viewEmpLeaveData()
        viewLeaveData();
        getLeave(user.employeeId)
        console.log("??????new edit list response????????", response.data.data)
        console.log("??????new edit list message????????", state.message)
        return  dispatch({ type: 'EDIT_EMP_LEAVE', payload: state.leaveEmpList })
      })
      .catch((error) => {
        console.log(error)
      })


  }

  // Delete Leave

  const deleteList = (leaveId) => {
    console.log("delete id------", leaveId)
      client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
      .then((response) => {
        toast.info(response.data.message)
        viewList()
        viewLeaveData();
        console.log("-----delete data-----", response)
        return  dispatch({ type: 'DELETE_LEAVE', payload: leaveId })
      })
      .catch((error) => {
        console.log(error)
      })
     
    }
    const deleteEmpList = (leaveId) => {
      console.log("delete id------", leaveId)
        client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
        .then((response) => {
          toast.info(response.data.message)
          viewEmpLeaveData()
          viewLeaveData();
          console.log("-----delete data-----", response)
          return  dispatch({ type: 'DELETE_EMP_LEAVE', payload: leaveId })
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
const viewEmpData = (id) => {
  // let empId1 = 'DSI000035'
  client.get('employee/view/{empId}' + '?empId='  + user.employeeId)
    .then((response) => {
      state.empData = response.data.data
      console.log("=====GET Emp Data API respone=====", state.empData)
      return dispatch({ type: 'FETCH_EMP_DATA', payload: state.empData })
    })
    .catch((error) => {
      console.log(error)
    })
}

//Report Leave api
const reportLeave = (reportData) => {
      console.log("++++report api response+++++", reportData)
      return client.post('leave_transaction/view/report',reportData)
        .then((response) => {
          state.message = response.data.message
          state.reportList = response.data.data
          toast.info(state.message)
          getLeave(user.employeeId)
          console.log("new report list response===>", response.data.data)
          console.log("new report list message===>", state.message)
          return dispatch({ type: 'REPORT_LEAVE', payload: state.reportList })
        })
        .catch((error) => {
          console.log(error)
        })

  }

  //api for employee dropdown

  const employeeType = () => {
    client.get('employee/view/leave/employee')
  
      .then((response) => {
        state.employeeList = response.data.data
        console.log("employee type", state.employeeList)
        return dispatch({ type: 'FETCH_EMPLOYEE_TYPE', payload: state.employeeList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

//productivity report api
const productivityReport = (clusterId, contractType, employeeId, month, sportId, storeId, year ) => {
  console.log("month storeId year",clusterId, contractType, employeeId, month, sportId, storeId, year)

  if(clusterId !== null && employeeId !== null && sportId !== null && contractType !== '' ){
  return client.get('report/productivity?' + 'clusterId=' + clusterId +  '&contractType=' + contractType + 
   '&employeeId=' + employeeId + '&month=' + month + '&sportId=' + sportId + '&storeId=' + storeId + '&year=' + year)
  
  .then((response) => {
    state.productivityList = response.data.data
    console.log("productivity list api++++++", state.productivityList)
    console.log("productivity list api message", response.data.message)
    return dispatch({type: 'PRODUCTIVITY_REPORT', payload: state.productivityList})
  })
  .catch((error) => {
    console.log(error)
  })
}
else {
  return client.get('report/productivity?' +  '&month=' + month + '&storeId=' + storeId + '&year=' + year)
 
 .then((response) => {
   state.productivityList = response.data.data
   console.log("productivity list api-------", state.productivityList)
   console.log("productivity list api message", response.data.message)
   return dispatch({type: 'PRODUCTIVITY_REPORT', payload: state.productivityList})
 })
 .catch((error) => {
   console.log(error)
 })
}
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
      reportLeave,
      employeeType,
      productivityReport,
      addEmpLeave,
      editEmpList,
      deleteEmpList,
      viewEmpLeaveData,
      leaveList: state.leaveList,
      leaveType: state.leaveType,
      message: state.message,
      leavesData: state.leavesData,
      leaveDataList: state.leaveDataList,
      holidayDataList:state.holidayDataList,
      empData: state.empData,
      reportList: state.reportList,
      employeeList: state.employeeList,
      productivityList: state.productivityList,
      leaveEmpList: state.leaveEmpList
     
    }}>
      {children}
    </LeaveContext.Provider>
  );
}
