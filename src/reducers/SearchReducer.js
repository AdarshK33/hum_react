const SearchReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_EMPID_LIST':
            return { ...state, empIdSearchList: action.payload };
        
        case 'FETCH_EMPIDMANAGER_LIST':
            return { ...state, graphData: action.payload };

        case 'FETCH_SHIFT_LIST':
            return { ...state, searchShiftList: action.payload };
               
        default: return state;
    }
}

export default SearchReducer;