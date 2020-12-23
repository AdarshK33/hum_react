import React, { createContext, useReducer, useState } from 'react'
import { client } from '../utils/axios';
import GroupReducer from '../reducers/GroupReducer';
import { toast } from "react-toastify";
import {
    GROUP_SERVICE_VIEW,
    CREATE_SERVICE_ROLE,
    UPDATE_SERVICE_ROLE
} from '../constant/actionTypes'

const initial_state = {
    serviceGroupList:[]
}

export const GroupContext = createContext();

export const GroupProvider = ({children}) => {
    const [state,dispatch] = useReducer(GroupReducer, initial_state)
    const [loader, setLoader] = useState(false)

    //view Service Group
    const serviceGroupView = async() => {
        setLoader(true)
        try {
            const result = await client.get('group/view')
            state.serviceGroupList = result.data.data
            console.log("service group response", state.serviceGroupList)
            setLoader(false)
            return dispatch({type: GROUP_SERVICE_VIEW, 
                payload: state.serviceGroupList, loader:loader})
        }
        catch(error){
            console.log(error)
        }
    }

     //Create the Service Role
     const createRole = async(createData) => {
        try {
            const result = await client.post('group/create',createData)
            toast.info(result.data.message)
            serviceGroupView()
            return dispatch({type: CREATE_SERVICE_ROLE, payload: state.serviceGroupList})
        }
        catch(error){
            console.log(error)
        }
    }

    //Update the Service Role
    const updateRole = async(updateData) => {
        try {
            const result = await client.post('group/create',updateData)
            toast.info(result.data.message)
            serviceGroupView()
            return dispatch({type: UPDATE_SERVICE_ROLE, payload: state.serviceGroupList})
        }
        catch(error){
            console.log(error)
        }
    }



    return (<GroupContext.Provider value={{
        serviceGroupView,
        createRole,
        updateRole,
        serviceGroupList: state.serviceGroupList,
        loader: loader
    }}>
        {children}
    </GroupContext.Provider>)
}