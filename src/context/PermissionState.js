import React, { createContext, useReducer, useState } from "react";
import { client } from '../utils/axios';
import PermissionReducer from '../reducers/PermissionReducer';
import { toast } from "react-toastify";


const initial_state = {
    permission: false,
    locationDetailsList: [],
    monthlyQtyDetailsList: [],
    permissionList: [],
    groupList: []
}

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {

    const [state, dispatch] = useReducer(PermissionReducer, initial_state);
    const [loader, setLoader] = useState(false)

    const editPermission = (val) => {
        // console.log("====================NAV================");
        // console.log(val)
        return client.post('/email/create', val)
            .then((response) => {
                toast.info(response.data.message);
                return (
                    dispatch({ type: 'SET_PERMISSION', payload: state.permissionList })
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
        setLoader(true)
        return client.get('/monthly/view?' + '&month=' + month + '&storeId=' + id + '&year=' + year)
            .then((response) => {

                if (response.data.data === null) {
                    state.monthlyQtyDetailsList = []
                    // toast.info("No Records Found")
                }
                else {
                    state.monthlyQtyDetailsList = response.data.data;
                }
                setLoader(false)
                return (
                    dispatch({ type: 'MONTHLY_QTY_DETAILS_LIST', payload: state.monthlyQtyDetailsList, loader: loader })
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
                if(response.data.data !== null){
                    state.permissionList = response.data.data[0];
                    console.log("service permission list if", state.permissionList)
                }else{
                    state.permissionList = response.data.data
                    console.log("service permission list else", state.permissionList)
                }

                console.log("service permission list", state.permissionList)
                return (
                    dispatch({ type: 'VIEW_PERMISSION', payload: state.permissionList })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

        //Service group permission get api
        const viewServiceGroup = async() => {
            try {
                const result = await client.get('/service_group/view')
                if(result.data.data !== null){
                    state.groupList = result.data.data[0]
                    console.log("service group list if", state.groupList)
                }else{
                    state.groupList = result.data.data
                    console.log("service group list else", state.groupList)
                }

                console.log("service group list", state.groupList)
                return dispatch({type:'GROUP_LIST', payload: state.groupList})
            }
            catch(error){
                console.log(error)
            }
        }

        //Service group permission post api
        const createServiceGroup = async(values) => {
            console.log("values in state", values)
            try {
                const result = await client.post('/service_group/create',values)
                toast.info(result.data.message)
                viewServiceGroup()
                return dispatch({type:'CREATE_GROUP', payload: state.groupList})
            }
            catch(error){
                console.log(error)
            }
        }


    return (<PermissionContext.Provider value={{
        editPermission,
        locationDetails,
        monthlyQtyDetails,
        viewPermission,
        uploadMonthFile,
        viewServiceGroup,
        createServiceGroup,
        permission: state.permission,
        locationDetailsList: state.locationDetailsList,
        monthlyQtyDetailsList: state.monthlyQtyDetailsList,
        permissionList: state.permissionList,
        loader: loader,
        groupList: state.groupList
    }}>
        {children}
    </PermissionContext.Provider>)
}