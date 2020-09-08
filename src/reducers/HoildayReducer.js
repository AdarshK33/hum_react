const HolidayReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_HOLIDAY_LIST':
            return { ...state, holiday: action.payload };

        
            case 'FETCH_SALARY_LIST':
                return { ...state, salaryList: action.payload };

        default: return state;
    }
}

export default HolidayReducer;