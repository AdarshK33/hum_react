import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import DashboardReducer from '../reducers/DashboardReducer';



const initial_state = {
    cosCentreList: []
  
  }



  export const DashboardContext = createContext();
  export const DashboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DashboardReducer, initial_state);

    function viewCostCentre() {
        // alert("called");
        client.get('/cost_centre/view').then(function (response) {
        //   console.log("data==>" + response);
          state.cosCentreList = response.data.data;
          console.log(JSON.stringify(state.cosCentreList))
    
          return dispatch({ type: 'FETCH_COSTCENTRE_LIST', payload: state.cosCentreList });
        })
          .catch(function (error) {
            console.log(error);
          });
      }

    //   function viewData(month, year) {
    //     // console.log(" in cluster" + month + " " + year)
    
    //     client.get('salary/view?month=' + month + '&year=' + year).then(function (response) {
    //     //   console.log("data==>" + JSON.stringify(response));
    //     //   console.log("data==>1", response);
    //       state.graphData = response.data.data;
    
    //       return dispatch({ type: 'FETCH_SALARY_LIST', payload: state.salaryList });
    //     })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }

      return (<DashboardContext.Provider value={{        
        viewCostCentre,        
        cosCentreList: state.cosCentreList,        
      }}>
        {children}
      </DashboardContext.Provider>);
  }