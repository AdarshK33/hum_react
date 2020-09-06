const HolidayReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_HOLIDAY_LIST':
            return { ...state, holiday: action.payload };
        default: return state;
    }
}

export default HolidayReducer;