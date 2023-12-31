const RosterReducer = (state, action) => {

    switch (action.type) {

        case 'FETCH_SHIFT_LIST':
            return { ...state, shiftList: action.payload, loader: action.loader };


        case 'DELETE_SHIFT':
            return {
                ...state,
                shiftList: state.shiftList.filter(shiftList => shiftList.shiftMasterId !== action.payload)
            };

        case 'EDIT_SHIFT_LIST':
            return { ...state, singleShiftList: action.payload };


        case 'FETCH_SHIFT_LIST_NAMES':
            return { ...state, shiftListNames: action.payload };

        case 'FETCH_CONTRACT_LIST_NAMES':
            return { ...state, shiftContractNames: action.payload };

        case 'WEEKOFF_WEEK_DAYS':
            return { ...state, weekDays: action.payload };


        case 'WEEKOFF_WEEK_DATA_LIST':
            return { ...state, ...action.payload };

        case 'ADD_NEW_WEEKOFF_DATA':
            return { ...state, weekOffDataList: action.payload };

        case 'AVAILABLE_SHIFTS':
            return { ...state, availableShiftData: action.payload };

        case 'AVAILABLE_WEEKS':
            return { ...state, weeksInYear: action.payload };

        case 'ADMIN_AVAILABLE_WEEKS':
            return { ...state, ...action.payload };

        case 'ADMIN_WEEKOFF_WEEK_DATA_LIST':
            return { ...state, ...action.payload };

        case 'ADMIN_CALCULATE_AVAILABLE_WEEKS':
            return { ...state, adminCalculateWeekResult: action.payload };

        case 'ADMIN_CALCULATE_UTILISATION':
            return { ...state, adminRosterCalculateUtilisationList: action.payload };
            
        case 'ADMIN_UTILISATION_SCHEDULE':
            return { ...state, adminRosterUtilisationScheduleResult: action.payload };    

        case 'GET_ADMIN_EMPLOYEE_ROSTER_WEEK_OFF':
            return { ...state, EmployeeListForAdminRosterWeekOff: action.payload };

        case 'ADMIN_ROSTER_AVAILABLE_SHIFT':
            return { ...state, adminRosterAvailableShiftList: action.payload };

        case 'MASTER_WEEKS':
            return { ...state, masterWeeks: action.payload };


        case 'COST_CENTER_DATA':
            return { ...state, costCenterList: action.payload };

        case 'FETCH_PAGESHIFT_LIST':
            return { ...state, pageData: action.payload };

        case 'ROSTER_EXPORT':
            return {
                ...state
                // , ...action.payload
            };

        default: return state;
    }
}

export default RosterReducer;