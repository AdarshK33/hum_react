const EmployeeHistoryReducer = (state, action) => {
    switch (action.type) {

        case 'EMPLOYEE_HISTORY_DATA':
            return { ...state, employeeHistoryData: action.payload }; 
            case 'EMPLOYEE_CONTRACT_DETAILS_ID':
                return { ...state,employeeContractDetailsByIdData:action.payload}
                case 'SALARY_DATA':
                    return {...state,salaryData:action.payload}
                    case 'BANK_DATA':
                        return {...state,bankData:action.payload}
                        case 'AADHAAR_DATA':
                            return {...state,aadhaarData:action.payload}                    
            default: return state;
    }
}

export default EmployeeHistoryReducer;