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
  editLeavesData: {},
  leaveDataList: {},
  holidayDataList:[],
  empData:[],
  reportList:[],
  employeeList:[],
  leaveEmpList:[],
  leaveTypeReport:[],
  leaveManagerList:[],
  cityList:[]
 
}

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LeaveReducer, initialState);
  const { user, getUserMenu } = useContext(AppContext);
 
  //View Leave

  const viewList = (empId1) => {
    client.get('leave_transaction/view')
      .then((response) => {
        state.leaveList =  response.data.data
        getLeave(empId1);
        console.log("=====GET API respone for Admin=====", state.leaveList)
        return (
          dispatch({ type: 'FETCH_LEAVE_LIST', payload: state.leaveList })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const viewManagerList = (empId1) => {
      client.get('/leave_transaction/view/manager')
      .then((response) => {
        state.leaveManagerList =  response.data.data
        getLeave(empId1);
        console.log("=====GET API respone for manager=====", state.leaveManagerList)
        return (
          dispatch({ type: 'FETCH_MANAGER_LEAVE_LIST', payload: state.leaveManagerList })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // View Leave Data
  const viewLeaveData = (empId1) => {
    console.log("data list for leave", empId1)
    if(empId1 !== null && empId1 !== undefined){
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
  }
  // View Leave Data
  const viewEmpLeaveData = (empId1) => {
    if(empId1 !== null && empId1 !== undefined){
     
    client.get('leave_transaction/view/' + empId1)
      .then((response) => {
        state.leaveEmpList = response.data.data.leaveTransactions
        console.log("=====GET Emp Leave Data API respone=====", state.leaveEmpList)
        return dispatch({ type: 'FETCH_EMP_LEAVE_DATA_LIST', payload: state.leaveEmpList })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  // Get Leave Type

  const getLeave = (empId1) => {
    // let empId1 = 'DSI000035'
    console.log("emp id in context", empId1)
    if(empId1 !== null && empId1 !== undefined){
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
  }
// get leave for report
  const getLeaveReport = () => {
    client.get('leave_type/view/')
  
      .then((response) => {
        state.leaveTypeReport = response.data.data
        console.log("get leave type", state.leaveTypeReport)
        return dispatch({ type: 'FETCH_LEAVE_TYPE_REPORT', payload: state.leaveTypeReport })
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
        console.log("NAV ????????????Pop upresponse===>", JSON.stringify(state.leavesData))
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

      console.log("++++create api response+++++", newLeave)
      return client.post('leave_transaction/create',newLeave)
        .then((response) => {
          state.message = response.data.message;
          toast.info(state.message)
          viewList();
          viewLeaveData(newLeave.empId);
          getLeave(newLeave.empId)
          viewManagerList()
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
    console.log("newLeave emp data++++", newLeave.empId)
        console.log("++++create api response+++++", newLeave)
        return client.post('leave_transaction/create',newLeave)
          .then((response) => {
            state.message = response.data.message;
            toast.info(state.message)
            viewEmpLeaveData(newLeave.empId)
            viewLeaveData(newLeave.empId);
            getLeave(newLeave.empId)
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
  const editPopup = (editPopup) => {
    console.log("edit data", editPopup)
    return client.put('leave_transaction/update', editPopup)
      .then((response) => {
        state.message = response.data.message
        state.editLeavesData = response.data.data 
        console.log("edit pop up response===>", JSON.stringify(state.editLeavesData))
        console.log("edit pop up response===>", state.editLeavesData)
        console.log("edit pop up response===>", state.message)
        return (
        dispatch({ type: 'Edit_POPUP_LEAVE', payload: state.editLeavesData })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editList = (editLeave) => {
    console.log("??????????????????edit api id response???????????????/", editLeave)
    return client.put('leave_transaction/update', editLeave)
      .then((response) => {
        state.message = response.data.message
        toast.info(state.message)
        viewList()
        viewLeaveData(editLeave.empId);
        getLeave(editLeave.empId)
        viewManagerList()
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
        viewEmpLeaveData(editLeave.empId)
        viewLeaveData(editLeave.empId);
        getLeave(editLeave.empId)
        console.log("??????new edit list response????????", response.data.data)
        console.log("??????new edit list message????????", state.message)
        return  dispatch({ type: 'EDIT_EMP_LEAVE', payload: state.leaveEmpList })
      })
      .catch((error) => {
        console.log(error)
      })


  }

  // Delete Leave

  const deleteList = (leaveId, empId) => {
    console.log("delete id------", leaveId)
    console.log("empId id------", empId)
      client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
      .then((response) => {
        toast.info(response.data.message)
        viewList()
        viewLeaveData(empId);
        viewManagerList()
        getLeave(empId)
        console.log("-----delete data-----", response)
        return  dispatch({ type: 'DELETE_LEAVE', payload: leaveId })
      })
      .catch((error) => {
        console.log(error)
      })
     
    }
    const deleteEmpList = (leaveId, empId) => {
      console.log("delete id------", leaveId)
      console.log("empId id------", empId)
        client.delete('leave_transaction/delete' + '?ltId=' + leaveId)
        .then((response) => {
          toast.info(response.data.message)
          console.log("response message for delete", response.data.message)
          viewEmpLeaveData(empId)
          viewLeaveData(empId);
          getLeave(empId)
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
    console.log(file);
    const formData = new FormData();
    formData.append('file',file, file.name)

    return client.post('holiday/upload', formData)
      .then((response) => {
        console.log(response,"res")
        toast.info(response.data.message)
        getHoliday()
        
      })
      .catch((error) => {
        toast.info("Please upload a valid file");
        console.log(error)
      })
  }
  
// Emp data according to their EmpId
/* const viewEmpData = (id) => {
  client.get('employee/view/{empId}' + '?empId='  + user.employeeId)
    .then((response) => {
      state.empData = response.data.data
      console.log("=====GET Emp Data API respone=====", state.empData)
      return dispatch({ type: 'FETCH_EMP_DATA', payload: state.empData })
    })
    .catch((error) => {
      console.log(error)
    })
} */

//Report Leave api
const reportLeave = (reportData) => {
      console.log("++++report api response+++++", reportData)
      return client.post('leave_transaction/view/report',reportData)
        .then((response) => {
          state.message = response.data.message
          state.reportList = response.data.data
          if(response.data.data === null){
            toast.info(state.message)
          }
          getLeaveReport()
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
    if( response.data.data === null){
      toast.info("Data" + " " +  response.data.message)
    }
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
   if( response.data.data === null){
     toast.info("Data" + " " + response.data.message)
   }
   return dispatch({type: 'PRODUCTIVITY_REPORT', payload: state.productivityList})
 })
 .catch((error) => {
   console.log(error)
 })
}
}
//City view Api
const getCity = () => {
  client.get('city/view')
  .then((response) => {
    console.log('city view api', response)
   state.cityList = response.data.data
     return dispatch({ type: 'CITY_LIST', payload: state.cityList });
 })
   .catch((error) => {
     console.log(error);
   });
}

const uploadMasterFile = (file) => {
 const formData = new FormData();
 formData.append('file',file)

 return client.post('city/upload', formData)
   .then((response) => {
     console.log(response,"city upload api")
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
      /* viewEmpData, */
      reportLeave,
      employeeType,
      productivityReport,
      addEmpLeave,
      editEmpList,
      deleteEmpList,
      viewEmpLeaveData,
      editPopup,
      getLeaveReport,
      viewManagerList,
      getCity,
      uploadMasterFile,
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
      leaveEmpList: state.leaveEmpList,
      editLeavesData: state.editLeavesData,
      leaveTypeReport: state.leaveTypeReport,
      leaveManagerList: state.leaveManagerList,
      cityList: state.cityList
     
    }}>
      {children}
    </LeaveContext.Provider>
  );
}
