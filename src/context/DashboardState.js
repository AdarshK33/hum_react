import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import DashboardReducer from '../reducers/DashboardReducer';
import {  toast } from "react-toastify";



const initial_state = {
    cosCentreList: [],
    graphData:[]
  
  }



  export const DashboardContext = createContext();
  export const DashboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DashboardReducer, initial_state);

    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    function viewCostCentre() {
       
        client.get('/cost_centre/view').then(function (response) {
         console.log(response);
          state.cosCentreList = response.data.data;          
    
          return dispatch({ type: 'FETCH_COSTCENTRE_LIST', payload: state.cosCentreList });
        })
          .catch(function (error) {
            console.log(error);
          });
      }

      function viewData(startDate,endDate,store,clusterId) {
        
        let startDateValue = convert(startDate);
        console.log("startDate",startDateValue)
        
        let endDateValue = convert(endDate);
        console.log("endDate",endDateValue)

        client.get('/dashboard/view/'+startDateValue+'/'+endDateValue+'/'+store+'/'+clusterId).then(function (response) {

          if(response.data.data != null){
            state.graphData = response.data.data;
          }else{
            toast.info(response.data.message);
            state.graphData = null;
          }          
    console.log("dashboard response",state.graphData)
          return dispatch({ type: 'FETCH_GRAPHDATA_LIST', payload: state.graphData });
        })
          .catch(function (error) {
            console.log(error);
          });
      }

      return (<DashboardContext.Provider value={{        
        viewCostCentre, 
        viewData,       
        cosCentreList: state.cosCentreList, 
        graphData: state.graphData       
      }}>
        {children}
      </DashboardContext.Provider>);
  }