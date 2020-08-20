import React, { createContext,useReducer,useEffect } from 'react';
import axios from 'axios';
import RosterReducer from '../reducers/RosterReducer';

export const RosterContext = createContext();
export const RosterProvider = ({ children }) => {
const [state,dispatch] = useReducer(RosterReducer);



function addShift(newShift)
{
  const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3ODU0NTIwLCJpYXQiOjE1OTc4MTg1MjB9.AbByjOUE55L3Ya5wmwiqOkbkLbLQ2pjepZ-E5ACTqPE'   
    }
    return axios.post("http://humine.theretailinsights.co/shift/create", newShift, {
         headers: headers
      }) 
    }
   




   
    return (<RosterContext.Provider value={{
       addShift
      
    }}>
        {children}
    </RosterContext.Provider>);
}
