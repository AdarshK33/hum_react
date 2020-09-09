

import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import AdminReducer from '../reducers/AdminReducer';


const initial_state = {
 getEmployeesName:[],
 grantLeaveView:[],
 costCenterList:[],
 employeeIdList:[]
}


export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initial_state);


  function createGrantLeave(addGrantLeave) {
    return client.post("grant_leave/create", addGrantLeave, {
    })
  }

  function selectEmployeeForLeave(costCenterId) {        
   // alert("state"+JSON.stringify(costCenterId));
    client.get('employee/view/leave_view', {  
  }).then(function (response) {
     console.log("Leaderes..." + JSON.stringify(response));
    state.getEmployeesName = response.data.data;
    return dispatch({ type: 'FETCH_EMPLOYEES_NAMES', payload: state.getEmployeesName });
  })
    .catch(function (error) {
      console.log(error);
    });
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


const employeeIdData = (costData) => {
  console.log("costData========", costData)
  client.get('employee/view/leave_view/{costCentre}' + '?costCentre=' + costData)
  .then((response) => {
    state.employeeIdList = response.data.data
    console.log("employee id data", state.employeeId)
    return dispatch({type: 'EMPLOYEE_ID_DATA', payload: state.employeeIdList})
  })
  .catch((error) => {
    console.log(error)
  })
}
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





  return (<AdminContext.Provider value={{
    createGrantLeave,
    selectEmployeeForLeave,
    viewGrantLeave,
    employeeIdData,
    CostCenter,
    grantLeaveView:state.grantLeaveView,
    getEmployeesName:state.getEmployeesName,
    costCenterList:state.costCenterList,
    employeeIdList:state.employeeIdList
  }}>
    {children}
  </AdminContext.Provider>);
}
