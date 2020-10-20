const PermissionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PERMISSION':
            return { ...state, permission: action.payload };

        case 'LOCATION_DETAILS_LIST':
            return { ...state, locationDetailsList: action.payload };

        case 'MONTHLY_QTY_DETAILS_LIST':
            return { ...state, monthlyQtyDetailsList: action.payload };

        default: return state;
    }
}

export default PermissionReducer;