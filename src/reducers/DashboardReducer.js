const DashboardReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_COSTCENTRE_LIST':
            return { ...state, cosCentreList: action.payload };
        
        case 'FETCH_GRAPHDATA_LIST':
            return { ...state, graphData: action.payload };
        
        case 'WEEK_LIST':
            return {...state, weekList: action.payload};

        case 'VIEW_DATE':
            return {...state, viewDateList: action.payload}
               
        default: return state;
    }
}

export default DashboardReducer;