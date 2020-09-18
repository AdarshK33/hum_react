const DashboardReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_COSTCENTRE_LIST':
            return { ...state, cosCentreList: action.payload };
               
        default: return state;
    }
}

export default DashboardReducer;