

import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import AdminReducer from '../reducers/AdminReducer';


const initial_state = {
 leaveAdminList:[],
 costCenterList:[],
 employeeIdList:[]
}


export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initial_state);


 // view Leaves for Admin

 const viewAdminList = () => {
  client.get('employee/view/leave_view')
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

  return (<AdminContext.Provider value={{
    viewAdminList,
    CostCenter,
    employeeIdData,
    leaveAdminList: state.leaveAdminList,
    costCenterList: state.costCenterList,
    employeeIdList: state.employeeIdList
  }}>
    {children}
  </AdminContext.Provider>);
}
