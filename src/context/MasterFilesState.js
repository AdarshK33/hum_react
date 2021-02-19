import React, { createContext, useReducer, useState } from "react";
import { client } from '../utils/axios';
import MasterFilesReducer from '../reducers/MasterFilesReducer';
import { toast } from "react-toastify";


const initial_state = {
    countryList: [],
    stateList: [],
    dailyQty: []
}

export const MasterFilesContext = createContext();

export const MasterFilesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(MasterFilesReducer, initial_state);
    const [loader, setLoader] = useState(false)

    const viewCountries = () => {
        return client.get("api/v1/country/view")
            .then((response) => {
                console.log(response);
                state.countryList = response.data.data;
                return (
                    dispatch({ type: 'VIEW_COUNTRIES', payload: state.countryList })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const viewStates = () => {
        return client.get("api/v1/state/view")
            .then((response) => {
                console.log(response.data.data);
                state.stateList = response.data.data;
                return (
                    dispatch({ type: 'VIEW_STATES', payload: state.stateList })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const viewDailyQty = (id, date) => {
        // console.log(id);
        // console.log(date);
        setLoader(true)
        return client.get('api/v1/daily/view?' + '&storeId=' + id + '&date=' + date)
            .then((response) => {
                console.log(response.data.data);
                state.dailyQty = response.data.data;
                setLoader(false)
                return (
                    dispatch({ type: 'VIEW_DAILY_QTY', payload: state.dailyQty })
                )
            })

            .catch((error) => {
                console.log(error)
            })
    }

    const uploadStateFile = (file) => {
        const formData = new FormData();
        formData.append('file', file)

        return client.post('api/v1/state/upload', formData)
            .then((response) => {
                console.log(response, "res")
                toast.info(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const uploadDailyQty = (file) => {
        const formData = new FormData();
        formData.append('file', file)

        return client.post('api/v1/daily/upload', formData)
            .then((response) => {
                console.log(response, "res")
                toast.info(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const uploadMonthlyQty = (file) => {
        const formData = new FormData();
        formData.append('file', file)

        return client.post('api/v1/monthly/upload', formData)
            .then((response) => {
                console.log(response, "res")
                toast.info(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const uploadMasterLocation = (file) => {
        const formData = new FormData();
        formData.append('file', file)

        return client.post('api/v1/location/upload', formData)
            .then((response) => {
                console.log(response, "res")
                toast.info(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }







    return (<MasterFilesContext.Provider value={{
        viewCountries,
        viewStates,
        uploadStateFile,
        viewDailyQty,
        uploadDailyQty,
        uploadMonthlyQty,
        uploadMasterLocation,
        countryList: state.countryList,
        stateList: state.stateList,
        dailyQty: state.dailyQty,
        loader: loader
    }}>
        {children}
    </MasterFilesContext.Provider>)
}