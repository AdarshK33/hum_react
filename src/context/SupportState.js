import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import SupportReducer from '../reducers/SupportReducer';
import { toast } from "react-toastify";

const initial_state = {
    getRoles: [],
    getIssueAndCategoryList: [],
    urgencyList: [],
    priorityList: '',
    priorityListId: ''
}

export const SupportContext = createContext();
export const SupportProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SupportReducer, initial_state);

    // SELECT ROLES
    const getRolesForSupport = () => {

        client.get('/ticket/roles').then(function (response) {

            if (response.data.data === null) {
                state.getRoles = []
            }
            else {
                state.getRoles = response.data.data;
            }
            return dispatch({ type: 'FETCH_ROLES', payload: state.getRoles });
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    // SELECT ISSUE AND category 

    const getIssueAndCategory = () => {

        client.get('/ticket_category/view').then(function (response) {

            if (response.data.data === null) {
                state.getIssueAndCategoryList = []
            }
            else {
                state.getIssueAndCategoryList = response.data.data;
            }
            return dispatch({ type: 'FETCH_ISSUE_AND_CATEGORY', payload: state.getIssueAndCategoryList });
        })
            .catch(function (error) {
                console.log(error);
            });
    }



    const selectUrgency = () => {
        client.get('/ticket_urgency/view').then(function (response) {
            if (response.data.data === null) {
                state.urgencyList = []
            }
            else {
                state.urgencyList = response.data.data;
            }
            return dispatch({ type: 'FETCH_URGENCY_LIST', payload: state.urgencyList });
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const selectPriority = (role, urgency) => {

        client.get('/ticket_priority?role=' + role + '&urgency=' + urgency).then(function (response) {

            state.priorityList = response.data.data.priorityName;
            state.priorityListId = response.data.data.priorityId;
            alert(state.priorityListId)

            console.log(state.priorityList)
            return dispatch({ type: 'FETCH_PRIORITY_LIST', payload: state.priorityList, priorityListId: state.priorityListId });
        })

            .catch(function (error) {
                console.log(error);
            });
    }
    const addCreateTicket = (newTicket) => {
        // alert(newTicket)
        return client.post("/ticket/create", newTicket).then(function (respone) {
            console.log("api response===", respone.data.message);
            toast.success(respone.data.message);

        })
            .catch((error) => {
                alert(" In error catch ", error);
            });
    }


    return (<SupportContext.Provider value={{
        getRolesForSupport,
        getIssueAndCategory,
        selectUrgency,
        selectPriority,
        addCreateTicket,
        priorityList: state.priorityList,
        priorityListId: state.priorityListId,
        getRoles: state.getRoles,
        getIssueAndCategoryList: state.getIssueAndCategoryList,
        urgencyList: state.urgencyList
    }}>
        {children}
    </SupportContext.Provider>);
}