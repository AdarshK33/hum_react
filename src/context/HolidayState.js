import React, { createContext, useReducer } from 'react';
import {client} from 'axios';
import HolidayReducer from '../reducers/HoildayReducer'
const baseUrl = "http://humine.theretailinsights.co/";


const initial_state = {
  holidayList: []

}


export const HolidayContext = createContext();
export const HolidayrProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HolidayReducer, initial_state);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5MzMxMjkyLCJpYXQiOjE1OTkyOTUyOTJ9.IYBMKAtpakrJj7R1hwbXKYu2Q7F_CMbwmyS6sAOcJZ0'
  }
  
  const getHoliday = () => {
    // const [state, updateStae] =uss
     client.get('holiday/view', {
      headers: headers
    }).then(function (response) {
      console.log(response)
      state.holiday = response;
      return dispatch({ type: 'FETCH_HOLIDAY_LIST', payload: state.holiday });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (<HolidayContext.Provider value={{
    getHoliday
  }}>
    {children}
  </HolidayContext.Provider>);
}
