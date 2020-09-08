

import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import AdminReducer from '../reducers/AdminReducer';


const initial_state = {
 
}


export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initial_state);


 


  return (<AdminContext.Provider value={{
   
  }}>
    {children}
  </AdminContext.Provider>);
}
