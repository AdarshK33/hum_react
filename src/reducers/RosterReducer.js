const RosterReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_SHIFT_LIST':
            return { ...state, shiftList: action.payload };


        case 'DELETE_SHIFT':
            return {
                ...state,
                shiftList: state.shiftList.filter(shiftList => shiftList.shiftMasterId !== action.payload)
            };

            case 'EDIT_SHIFT_LIST':
                return { ...state, shiftList: action.payload };
    

        case 'FETCH_SHIFT_LIST_NAMES':
            return { ...state, shiftListNames: action.payload };

        case 'FETCH_CONTRACT_LIST_NAMES':
            return { ...state, shiftContractNames: action.payload };

        default: return state;
    }
}

export default RosterReducer;