

import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import AdminReducer from '../reducers/AdminReducer';


const initial_state = {
 leaveAdminList:[]
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


  return (<AdminContext.Provider value={{
    viewAdminList,
    leaveAdminList: state.leaveAdminList
  }}>
    {children}
  </AdminContext.Provider>);
}
