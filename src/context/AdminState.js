import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import AdminReducer from '../reducers/AdminReducer';
import { ToastContainer, toast } from "react-toastify";


const initial_state = {
 leaveAdminList:[],
 costCenterList:[],
 employeeIdList:[],
 getEmployeesName:[],
 grantLeaveView:[],
 leaveMasterList:[],
 ApprovalLeaveList:[]
}


export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initial_state);


 // view Leaves for Admin

 const viewAdminList = () => {
  client.get('employee/view/leave_view/{costCentre}')
    .then((response) => {
      state.leaveAdminList =  response.data.data
      console.log("=====GET Admin Leave API respone=====", state.leaveAdminList)
      
      return dispatch({ type: 'FETCH_ADMIN_LEAVE_LIST', payload: state.leaveAdminList })
    })
    .catch((error) => {
      console.log(error)
    })
}

// Cost Center List
const CostCenter = () => {
  client.get('cost_centre/view')
  .then((response) => {
    state.costCenterList = response.data.data
    console.log("cost center data", state.costCenterList)
    return dispatch({type: 'COST_CENTER_DATA', payload: state.costCenterList})
  })
  .catch((error) => {
    console.log(error)
  })
}

//employee id according to cost center

const employeeIdData = (costData) => {
  console.log("costData========", costData)
  client.get('employee/view/leave_view/{costCentre}' + '?costCentre=' + costData)
  .then((response) => {
    state.employeeIdList = response.data.data
    console.log("employee id data", state.employeeIdList)
    return dispatch({type: 'EMPLOYEE_ID_DATA', payload: state.employeeIdList})
  })
  .catch((error) => {
    console.log(error)
  })
}


function viewGrantLeave() {
  client.get('grant_leave/view', {
  }).then(function (response) {
      console.log("data==>" + JSON.stringify(response));
    state.grantLeaveView = response.data.data;
    return dispatch({ type: 'VIEW_GRANT_LEAVE', payload: state.grantLeaveView });
  })
    .catch(function (error) {
      console.log(error);
    });
}
function createGrantLeave(addGrantLeave) {
  return client.post("grant_leave/create", addGrantLeave, {
  })
}


//view leave master 
const leaveMasterView = () => {
  client.get('leave_master/view')
  .then((response) => {
    state.leaveMasterList = response.data.data
    console.log("leave master view", state.leaveMasterList)
    return dispatch({type: 'LEAVE_MASTER_VIEW', payload: state.leaveMasterList })
  })
}

//Upload leave file
const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file',file)

  return client.post('leave_master/upload', formData)
    .then((response) => {
      console.log(response.data,"leave upload response")
      leaveMasterView();
      toast.info(response.message)
      return dispatch({type: 'LEAVE_MASTER_UPLOAD', payload: state.leaveMasterList })
    })
    .catch((error) => {
      console.log(error)
    })
}

// Leave Approval List

const ApprovalView = () => {
  client.get('leave_transaction/approval_view')
  .then((response) => {
    state.ApprovalLeaveList = response.data.data
    console.log("Approval List data", state.ApprovalLeaveList)
    return dispatch({type: 'APPRROVAL_LEAVE_LIST', payload: state.ApprovalLeaveList})
  })
  .catch((error) => {
    console.log(error)
  })
}
  return (<AdminContext.Provider value={{
    viewAdminList,
    CostCenter,
    employeeIdData,
    viewGrantLeave,
    createGrantLeave,
    leaveMasterView,
    uploadFile,
    ApprovalView,
    grantLeaveView:state.grantLeaveView,
    getEmployeesName:state.getEmployeesName,
    leaveAdminList: state.leaveAdminList,
    costCenterList: state.costCenterList,
    employeeIdList: state.employeeIdList,
    leaveMasterList: state.leaveMasterList,
    ApprovalLeaveList: state.ApprovalLeaveList
  }}>
    {children}
  </AdminContext.Provider>);
}
