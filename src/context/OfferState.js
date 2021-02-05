import React, { createContext, useReducer, useState } from 'react'
import { client } from '../utils/axios';
import OfferReducer from '../reducers/OfferReducer';
import { toast } from "react-toastify";

const initial_state = {
    candidateList:[],
    total:{},
    data:[],
    searchData:[],
    departmentName:[],
    designationName:[],
    locationName:{}
}

export const OfferContext = createContext();

export const OfferProvider = (props) => {
    const [state, dispatch] = useReducer(OfferReducer, initial_state)
    const [loader, setLoader] = useState(false)

    // Offer List api 
    const candidateView = (key, page) => {
        setLoader(true)
        client.get('candidate/view?key='+ key + '&page=' + page + '&size=' + 10)
        .then((response) => {
            state.candidateList = response.data.data.data
            state.data = response.data.data
            state.total = state.data.total
            setLoader(false)
            console.log('candidateList response',state.candidateList)
            return dispatch({type:'CANDIDATE_LIST', payload: state.candidateList, 
            loader: loader, data: state.data, total: state.total})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //candidate create api
    const createCandidate = (createData) => {
        return client.post('candidate/create',createData)
        .then((response) => {
            toast.info(response.data.message)
            candidateView('all', 0)
            return dispatch({type: 'CREATE_CANDIDATE', payload: state.candidateList})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //Work Information create api
    const createCandidateWork = (createData) => {
        return client.post('candidate/work-information/create',createData)
        .then((response) => {
            toast.info(response.data.message)
            candidateView('all', 0)
            return dispatch({type: 'CREATE_CANDIDATE_WORK', payload: state.candidateList})
        })
        .catch((error) => {
            console.log(error)
        })
    }


    //Search by aadhar card/bank account
    const searchByAadhar = (number) => {
        client.get('candidate/search?number=' + number)
        .then((response) => {
            state.searchData = response.data
            console.log("search response", state.searchData)
            return dispatch({type:'SEARCH_AADHAR', payload: state.searchData})
        })
        .catch((error) => {
            console.log(error)
        })
    }

// Department api for work information
const departmentView = () => {
    client.get('department/view')
    .then((response) => {
        state.departmentName = response.data.data
        console.log('DEPARTMENT response',state.departmentName)
        return dispatch({type:'DEPARTMENT', payload: state.departmentName})
    })
    .catch((error) => {
        console.log(error)
    })
}

// Designation api for work information
const designationView = () => {
    client.get('designation/view')
    .then((response) => {
        state.designationName = response.data.data
        console.log('designationName response',state.designationName)
        return dispatch({type:'DESIGNATION', payload: state.designationName})
    })
    .catch((error) => {
        console.log(error)
    })
}
// location api for work information
const locationView = (costCenter) => {
    client.get('location/view/'+costCenter)
    .then((response) => {
        state.locationName = response.data.data
        console.log('locationName response',state.locationName)
        return dispatch({type:'LOCATION', payload: state.locationName})
    })
    .catch((error) => {
        console.log(error)
    })
}

    return (
        <OfferContext.Provider value={{
            searchByAadhar,
            departmentView,
            designationView,
            locationView,
            candidateView,
            createCandidate,
            createCandidateWork,
            searchData: state.searchData,
            departmentName: state.departmentName,
            designationName: state.designationName,
            locationName: state.locationName,
            candidateList: state.candidateList,
            loader: loader,
            total: state.total
        }}>
            {props.children}
        </OfferContext.Provider>
    )
}