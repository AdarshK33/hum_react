const SearchReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_EMPID_LIST':
            return { ...state, empIdSearchList: action.payload };

        case 'FETCH_EMPIDMANAGER_LIST':
            return { ...state, graphData: action.payload };

        case 'FETCH_SHIFT_LIST':
            return { ...state, searchShiftList: action.payload };

        case 'FETCH_CLUSTER_SEARCH_LIST':
            return { ...state, searchClusterList: action.payload };

        case 'SEARCH_HOLIDAY_LIST':
            return { ...state, searchHolidayList: action.payload }

        case 'VIEW_GRANT_LEAVE':
            return { ...state, searchGrantLeaveView: action.payload }

        default: return state;
    }
}

export default SearchReducer;