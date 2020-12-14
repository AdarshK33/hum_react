import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import SupportReducer from '../reducers/SupportReducer';
import { toast } from "react-toastify";



const initial_state = {


}

export const SupportContext = createContext();
export const SupportProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SupportReducer, initial_state);







    return (<SupportContext.Provider value={{

    }}>
        {children}
    </SupportContext.Provider>);
}