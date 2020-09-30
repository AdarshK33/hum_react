import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import PendingRosterReducer from '../reducers/PendingRosterReducer';
import {  toast } from "react-toastify";



const initial_state = {
    pendingRosterList:[]
  }
 

  export const PendingRosterContext = createContext();
  export const PendingRosterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PendingRosterReducer, initial_state);


    const viewPendingRosterList = () => {

          client.get('/roster/view/pending/IN1055').then( (response) => {
          console.log("==========List of Pending Rosters==============");
          console.log(response.data.data);
          console.log("==========List of Pending Rosters==============");
          state.pendingRosterList = response.data.data;

          return dispatch({ type: 'FETCH_PENDINGROSTER_LIST', payload: state.pendingRosterList });
        })
          .catch(function (error) {
            console.log(error);
          });
      }



      const rosterApproval = (values) => {            
            return client.put('/roster/approve', values)
              .then((response) => {
                toast.info(response.data.message);
                console.log(response);
                viewPendingRosterList()
                return ( 
                  dispatch({ type: 'ROSTER_APPROVE', payload: state.pendingRosterList })
              )})
              .catch((error) => {
                console.log(error)
              })       
          }




      return (<PendingRosterContext.Provider value={{
        viewPendingRosterList,
        rosterApproval,
        pendingRosterList : state.pendingRosterList
      }}>
        {children}
      </PendingRosterContext.Provider>);
  }
