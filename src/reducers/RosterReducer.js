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
            
        default: return state;
    }
}

export default RosterReducer