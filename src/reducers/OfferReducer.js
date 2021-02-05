
  const GroupReducer = (state,action) => {
    switch(action.type){

        case 'CANDIDATE_LIST':
            return {...state, candidateList: action.payload, loader: action.loader,
                 data: action.data, total: action.total}

        case 'CREATE_CANDIDATE':
            return {...state, candidateList: action.payload}

        case 'CREATE_WORK_CANDIDATE':
            return {...state, candidateList: action.payload}
            
        case 'SEARCH_AADHAR':
            return {...state, searchData: action.payload}

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