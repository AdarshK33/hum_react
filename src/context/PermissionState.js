import React, { createContext, useReducer } from "react";
import { client } from '../utils/axios';
import PermissionReducer from '../reducers/PermissionReducer';
import { toast } from "react-toastify";


const initial_state = {
    permission: false,
    locationDetailsList: [],
    monthlyQtyDetailsList: [],
    permissionList: []
}

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {

    const [state, dispatch] = useReducer(PermissionReducer, initial_state);

    const editPermission = (val) => {
        // console.log("====================NAV================");
        // console.log(val)
        return client.post('/email/create', val)
            .then((response) => {
                toast.info(response.data.message);
                return (
                    dispatch({ type: 'SET_PERMISSION', payload: state.permission })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const locationDetails = () => {

        return client.get('/location/view')
            .then((response) => {

                if (response.data.data === null) {
                    state.locationDetailsList = []
                }
                else {
                    state.locationDetailsList = response.data.data;
                }

                return (
                    dispatch({ type: 'LOCATION_DETAILS_LIST', payload: state.locationDetailsList })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }




    const monthlyQtyDetails = (id, month, year) => {
        // console.log(id);
        // console.log(month);
        // console.log(year);

        return client.get('/monthly/view?' + '&month=' + month + '&storeId=' + id + '&year=' + year)
            .then((response) => {

                if (response.data.data === null) {
                    state.monthlyQtyDetailsList = []
                    toast.info("No Records Found")
                }
                else {
                    state.monthlyQtyDetailsList = response.data.data;
                }
                return (
                    dispatch({ type: 'MONTHLY_QTY_DETAILS_LIST', payload: state.monthlyQtyDetailsList })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const uploadMonthFile = (file) => {
        const formData = new FormData();
        formData.append('file', file)

        return client.post('/monthly/upload', formData)
            .then((response) => {
                console.log(response, "res")
                toast.info(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const viewPermission = () => {
        return client.get("/email/view")
            .then((response) => {
                console.log(response.data.data[0]);
                state.permissionList = response.data.data[0];
                return (
                    dispatch({ type: 'VIEW_PERMISSION', payload: state.permissionList })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (<PermissionContext.Provider value={{
        editPermission,
        locationDetails,
        monthlyQtyDetails,
        viewPermission,
        uploadMonthFile,
        permission: state.permission,
        locationDetailsList: state.locationDetailsList,
        monthlyQtyDetailsList: state.monthlyQtyDetailsList,
        permissionList: state.permissionList
    }}>
        {children}
    </PermissionContext.Provider>)
}