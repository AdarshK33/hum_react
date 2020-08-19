import React, { createContext,useReducer,useEffect } from 'react';
 import axios from 'axios';
 import LeaveReducer from '../reducers/LeaveReducer'

 export const LeaveContext = createContext();
 export const LeaveProvider = ({children}) => {
     const [state, dispatch] = useReducer(LeaveReducer);
 

 function applyLeave(newLeave)
 {
     console.log(JSON.stringify(newLeave));
   const headers = {
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
       'Content-Type': 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3Nzg4Njk2LCJpYXQiOjE1OTc3NTI2OTZ9.drYvc0vOPLQJkzKvYXJZHyGZYJFukyiYITEYItn15_A'   
     }
     
     axios.get("http://humine.theretailinsights.co/leave_transaction/view", {
        headers: headers
      })
       .then((response) => {
        alert("successfully fetched",response)
       })
       .catch((error) => {
         alert("something error ",error);
       })
 }

 return(
     <LeaveContext.Provider value={{applyLeave}}>
         {children}
     </LeaveContext.Provider>
 );
 }
