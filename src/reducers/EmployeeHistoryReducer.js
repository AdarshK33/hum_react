const EmployeeHistoryReducer = (state, action) => {
    switch (action.type) {

        case 'EMPLOYEE_HISTORY_DATA':
            return { ...state, employeeHistoryData: action.payload }; 
            default: return state;
    }
}

export default EmployeeHistoryReducer;