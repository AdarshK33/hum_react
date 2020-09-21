import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import DashboardReducer from '../reducers/DashboardReducer';



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

      function viewData(date,store,clusterId) {
        
        let dateValue = convert(date);

        client.get('/dashboard/view/' + dateValue + '/' + store + '/' + clusterId).then(function (response) {
          
          state.graphData = response.data.data;
    
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