
  const GroupReducer = (state,action) => {
    switch(action.type){

        case 'CANDIDATE_LIST':
            return {...state, candidateList: action.payload, loader: action.loader,
                 data: action.data, total: action.total}

        case 'CREATE_CANDIDATE':
            return {...state, createCandidateResponse: action.payload}

        case 'UPDATE_CANDIDATE':
            return {...state, createCandidateResponse: action.payload}

        case 'VIEW_CANDIDATE_ID':
                return {...state, candidateData: action.payload}

        case 'CREATE_WORK_CANDIDATE':
            return {...state, workInformationData: action.payload}

        case 'UPDATE_WORK_CANDIDATE':
            return {...state, workInformationData: action.payload}
            
        case 'SEARCH_AADHAR':
            return {...state, searchData: action.payload}

        case 'SEARCH_EMP1':
            return {...state, searchEmpData1: action.payload}

        case 'SEARCH_EMP2':
            return {...state, searchEmpData2: action.payload}

        case 'DEPARTMENT':
            return {...state, departmentName: action.payload}

        case 'DESIGNATION':
            return {...state, designationName: action.payload}

        case 'LOCATION':
            return {...state, locationName: action.payload}

        default:
            return state;
    }
}

export default GroupReducer