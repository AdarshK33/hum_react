import React, { createContext, useReducer, useState } from 'react'
import { client } from '../utils/axios';
import OfferReducer from '../reducers/OfferReducer';
import { toast } from "react-toastify";

const initial_state = {
    candidateList:[],   
    createCandidateResponse:{},
    total:{},
    data:[],
    searchData:{},
    departmentName:[],
    designationName:[],
    locationName:{},
    searchEmpData1:[],
    searchEmpData2:[],
    candidateData:{},
    workInformationData:{}
}

export const OfferContext = createContext();

export const OfferProvider = (props) => {
    const [state, dispatch] = useReducer(OfferReducer, initial_state)
    const [loader, setLoader] = useState(false)

    // Offer List api 
    const candidateView = (key, page) => {
        setLoader(true)
        client.get('api/v1/candidate/view?key='+ key + '&page=' + page + '&size=' + 10)
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
        return client.post('api/v1/candidate/create',createData)
        .then((response) => {
            state.createCandidateResponse = response.data.data
            toast.info(response.data.message)
            console.log("create candidate response data", state.createCandidateResponse)
            return dispatch({type: 'CREATE_CANDIDATE', payload: state.createCandidateResponse})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //take candidate id
    const viewCandidateId = (id) => {
        client.get('api/v1/candidate/'+id)
        .then((response) => {
            state.candidateData = response.data.data
            console.log("viewCandidateData response", state.candidateData)
            return dispatch({type:'VIEW_CANDIDATE_ID',payload: state.candidateData})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //edit candidate api
    const editCandidate = (updateData) => {
        return client.post('api/v1/candidate/update', updateData)
        .then((response) => {
            toast.info(response.data.message)
            return dispatch({type:'UPDATE_CANDIDATE', payload: state.createCandidateResponse})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //Work Information create api
    const createCandidateWork = (createData) => {
        return client.post('api/v1/candidate/work-information/create',createData)
        .then((response) => {
            toast.info(response.data.message)
            return dispatch({type: 'CREATE_CANDIDATE_WORK', payload: state.workInformationData})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //Work Information update api
    const updateCandidateWork = (updateData) => {
        return client.post('api/v1/candidate/work-information/create',updateData)
        .then((response) => {
            toast.info(response.data.message)
            return dispatch({type: 'UPDATE_CANDIDATE_WORK', payload: state.workInformationData})
        })
        .catch((error) => {
            console.log(error)
        })
    }


    //Search by aadhar card/bank account
    const searchByAadhar = (number) => {
        client.get('api/v1/candidate/search?number=' + number)
        .then((response) => {
            
            if(response.data.data === null){
                toast.info(response.data.message)
                console.log("search response null", response.data.data)
            }else{
                state.searchData = response.data.data
                console.log("search response in search data", state.searchData)
            }
            
            return dispatch({type:'SEARCH_AADHAR', payload: state.searchData})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //Search by reference emp name1 or emp id
    const searchForEmp1 = (key) => {
        client.get('api/v1/employee/search?key=' + key)
        .then((response) => {
            if(response.data.data === null){
            state.searchEmpData1 = response.data.data
            console.log("response.data.data",response.data.data)
            toast.info(response.data.message)
            }
            else{
                state.searchEmpData1 = response.data.data[0]
                console.log("response.data.data[0]",response.data.data[0])
            }            
            console.log("response", response)
            console.log("search Emp response", state.searchEmpData1)
            return dispatch({type:'SEARCH_EMP1', payload: state.searchEmpData1})
        })
        .catch((error) => {
            console.log(error)
        })
    }
    //Search by reference emp name2 or emp id
    const searchForEmp2 = (key) => {
        client.get('api/v1/employee/search?key=' + key)
        .then((response) => {
            if(response.data.data === null){
            state.searchEmpData2 = response.data.data
            console.log("response.data.data",response.data.data)
            toast.info(response.data.message)
            }
            else{
                state.searchEmpData2 = response.data.data[0]
                console.log("response.data.data[0]",response.data.data[0])
            }            
            console.log("response", response)
            console.log("search Emp response", state.searchEmpData2)
            return dispatch({type:'SEARCH_EMP2', payload: state.searchEmpData2})
        })
        .catch((error) => {
            console.log(error)
        })
    }

// Department api for work information
const departmentView = () => {
    client.get('api/v1/department/view')
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
    client.get('api/v1/designation/view')
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
    client.get('api/v1/location/view/'+costCenter)
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
            searchForEmp1,
            searchForEmp2,
            viewCandidateId,
            editCandidate,
            updateCandidateWork,
            searchData: state.searchData,
            departmentName: state.departmentName,
            designationName: state.designationName,
            locationName: state.locationName,
            candidateList: state.candidateList,
            loader: loader,
            total: state.total,
            searchEmpData1: state.searchEmpData1,
            searchEmpData2: state.searchEmpData2,
            candidateData: state.candidateData,
            createCandidateResponse: state.createCandidateResponse
        }}>
            {props.children}
        </OfferContext.Provider>
    )
}