import React, { createContext, useReducer, useState } from 'react';
import { client } from '../utils/axios';
import SupportReducer from '../reducers/SupportReducer';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
    VIEW_TICKET_LISTING,
     COMPLETE_STATUS,
     TICKET_STATUS,
     VIEW_TICKET_ID_INFO,
     UPDATE_TICKET
} from '../constant/actionTypes'



const initial_state = {
    ticketListing:[],
    completeStatusView:[],
    ticketStatusView:[],
    total:{},
    data:[],
    ticketIdList:{},
    getRoles: [],
    getIssueAndCategoryList: [],
    urgencyList: [],
    priorityList: '',
    priorityListId: ''



}

 export const SupportContext = createContext();

export const SupportProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SupportReducer, initial_state);
    const [loader, setLoader] = useState(false)

    let history = useHistory();

    //view ticket listing
    const ticketView = async(key,page) => {
        console.log("pageCount", page)
        setLoader(true)
        try {
            const result = await client.get('/ticket?key='+ key +
             '&page=' + page + '&size='+10)
            state.ticketListing = result.data.data.data
            state.data = result.data.data
            state.total = state.data.total
            setLoader(false)
            console.log("ticket response", state.ticketListing)
            console.log("total response", state.total)
            return dispatch({type: VIEW_TICKET_LISTING, payload: state.ticketListing,
            loader: loader, data: state.data, total: state.total })
        }
        catch(error) {
            console.log(error)
        }

    }
    //view ticket info based on ticket Id
    const ticketIdView = async(id) => {
        setLoader(true)
            try {
                const result = await client.get('/ticket/'+id)
                state.ticketIdList = result.data.data
                console.log("ticket id response",state.ticketIdList)
                setLoader(false)
                return dispatch({type: VIEW_TICKET_ID_INFO, 
                    payload: state.ticketIdList, loader: loader})
            }
            catch(error) {
                console.log(error)
            }
        
    }


    //conpletion status
    const completeStatus = async() => {

       try {
        const result = await client.get('ticket/completion/status')
        state.completeStatusView = result.data.data
        console.log("somplete status", state.completeStatusView)
        return dispatch({type: COMPLETE_STATUS, payload: state.completeStatusView})
       }
       catch(error){
           console.log(error)
       }
    }

    //Ticket status
    const ticketStatus = async() => {

        try {
         const result = await client.get('ticket/status')
         state.ticketStatusView = result.data.data
         console.log("ticket status", state.ticketStatusView)
         return dispatch({type: TICKET_STATUS, payload: state.ticketStatusView})
        }
        catch(error){
            console.log(error)
        }
     }

    //Update the tickets
    const updateTicket = async(updateData) => {
        try {
            const result = await client.post('ticket/update',updateData)
            state.ticketListing = result.data.data
            console.log("updated response",state.ticketListing)
            ticketView('all',0)
            toast.info(result.data.message)
            return dispatch({type: UPDATE_TICKET, payload: state.ticketListing})
        }
        catch(error){
            console.log(error)
        }
    }

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
            ticketView('all',0)

        })
            .catch((error) => {
                alert(" In error catch ", error);
            });
    }


    return (<SupportContext.Provider value={{
        ticketView,
        completeStatus,
        ticketStatus,
        ticketIdView,
        updateTicket,
        ticketListing: state.ticketListing,
        completeStatusView: state.completeStatusView,
        ticketStatusView: state.ticketStatusView,
        loader: loader,
        total: state.total,
        ticketIdList: state.ticketIdList,
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
