import React, {createContext, useReducer} from "react";
import { client } from '../utils/axios';
import MasterFilesReducer from '../reducers/MasterFilesReducer';
import {toast} from "react-toastify";


const initial_state = {
    countryList: [],
    stateList: [],
    dailyQty : []
}

export const MasterFilesContext = createContext();

export const MasterFilesProvider = ({children}) =>{

    const [state, dispatch] = useReducer(MasterFilesReducer, initial_state);


    const viewCountries = () =>{
        return client.get("/country/view")
            .then((response) => {
                console.log(response);
                state.countryList = response.data.data;
                return(
                    dispatch({type:'VIEW_COUNTRIES', payload: state.countryList})
                )
            })
            .catch((error) =>{
                console.log(error)
            })
    }


    const viewStates = () =>{
        return client.get("/state/view")
            .then((response) => {
                console.log(response.data.data);
                state.stateList = response.data.data;
                return(
                    dispatch({type:'VIEW_STATES', payload: state.stateList})
                )
            })
            .catch((error) =>{
                console.log(error)
            })
    }


    const viewDailyQty = () =>{
        return client.get("/daily/view")
            .then((response) => {
                console.log(response.data.data);
                state.dailyQty = response.data.data;
                return(
                    dispatch({type:'VIEW_DAILY_QTY', payload: state.dailyQty})
                )
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    const uploadStateFile = (file) =>{
        const formData = new FormData();
        formData.append('file',file)
    
        return client.post('/state/upload', formData)
          .then((response) => {
            console.log(response,"res")
            toast.info(response.data.message)
          })
          .catch((error) => {
            console.log(error)
          })
      }

      const uploadDailyQty = (file) =>{
        const formData = new FormData();
        formData.append('file',file)
    
        return client.post('/daily/upload', formData)
          .then((response) => {
            console.log(response,"res")
            toast.info(response.data.message)
          })
          .catch((error) => {
            console.log(error)
          })
      }

    return ( <MasterFilesContext.Provider value={{
        viewCountries,       
        viewStates,
        uploadStateFile,
        viewDailyQty,
        uploadDailyQty,
        countryList: state.countryList,
        stateList: state.stateList,
        dailyQty : state.dailyQty
    }}>
        {children}
        </MasterFilesContext.Provider>)
}