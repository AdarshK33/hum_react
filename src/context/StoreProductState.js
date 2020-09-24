import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import StoreProductReducer from '../reducers/StoreProductReducer';
import {  toast } from "react-toastify";



const initial_state = {
    storeProductList: [],
    StateData:[],
    NewTarget:[]
  
  }



  export const StoreProductContext = createContext();
  export const StoreProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StoreProductReducer, initial_state);

    // function convert(str) {
    //   var date = new Date(str),
    //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    //     day = ("0" + date.getDate()).slice(-2);
    //   return [date.getFullYear(), mnth, day].join("-");
    // }

    function viewStoreProduct() {
       
        client.get('/store/view').then(function (response) {
         console.log(response);
          state.storeProductList = response.data.data;          
    
          return dispatch({ type: 'FETCH_STOREPRODUCTTARGET_LIST', payload: state.storeProductList });
        })
          .catch(function (error) {
            console.log(error);
          });
      }

      function getStateData(store) {
             
        client.get('/cost_centre/view/'+store).then(function (response) {

          state.StateData = response.data.data;
         
          return dispatch({ type: 'FETCH_STATEDATA_LIST', payload: state.StateData });
        })
          .catch(function (error) {
            console.log(error);
          });
      }

      const addTarget = (values) => {
        
            return client.post('/store/create',values)
              .then((response) => {
                // state.message = response.data.message
                toast.info(response.data.message);
                viewStoreProduct();
                return (
                dispatch({ type: 'ADD_NEW_TARGET', payload: state.NewTarget })
                )
              })
              .catch((error) => {
                console.log(error)
              })
      
        }

    //   function getStateData(store) {
             
    //     client.get('/cost_centre/view/'+store).then(function (response) {

    //       state.NewTarget = response.data.data;
         
    //       return dispatch({ type: 'ADD_NEW_TARGET', payload: state.NewTarget });
    //     })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }

      return (<StoreProductContext.Provider value={{        
        viewStoreProduct, 
         getStateData,  
         addTarget,     
        storeProductList: state.storeProductList, 
        StateData: state.StateData, 
        NewTarget: state.NewTarget      
      }}>
        {children}
      </StoreProductContext.Provider>);
  }