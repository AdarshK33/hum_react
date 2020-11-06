const MasterFilesReducer = (state, action) => {
    switch (action.type) {
        case 'VIEW_COUNTRIES':
            return { ...state, countryList: action.payload }

        case 'VIEW_STATES':
            return { ...state, stateList: action.payload }

        case 'VIEW_DAILY_QTY':
            return { ...state, dailyQty: action.payload, loader: action.loader }

        default: return state;
    }
}

export default MasterFilesReducer