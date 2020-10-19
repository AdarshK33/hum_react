import React, {createContext, useReducer} from "react";
import { client } from '../utils/axios';
import PermissionReducer from '../reducers/PermissionReducer';
import {toast} from "react-toastify";


const initial_state = {
    permission: false
}

export const PermissionContext = createContext();

export const PermissionProvider = ({children}) =>{

    const [state, dispatch] = useReducer(PermissionReducer, initial_state);

    const editPermission = (val) =>{
        // console.log("====================NAV================");
        // console.log(val)
        return client.post('/email/create', val)
            .then((response) => {
                toast.info(response.data.message);
                return(
                    dispatch({type:'SET_PERMISSION', payload: state.permission})
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return ( <PermissionContext.Provider value={{
        editPermission,
        permission: state.permission
    }}>
        {children}
        </PermissionContext.Provider>)
}