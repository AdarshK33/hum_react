const EmployeeHistoryReducer = (state, action) => {
    switch (action.type) {

                case 'EMPLOYEE_HISTORY_DATA':
                    return { ...state, employeeHistoryData: action.payload }; 
                case 'EMPLOYEE_CONTRACT_DETAILS_ID':
                    return { ...state,employeeContractDetailsByIdData:action.payload}
                case 'SALARY_DATA':
                    return {...state,salaryData:action.payload}
                case 'BONUS_DATA':
                    return { ...state,bonusData:action.payload}
                case 'COSTCENTER_DATA':
                    return {...state,costCenterData:action.payload}
                case 'BANK_DATA':
                    return {...state,bankData:action.payload}
                case 'AADHAAR_DATA':
                    return {...state,aadhaarData:action.payload}             
                case 'ACCESS_DATA':
                     return {...state,accessData:action.payload}   
                case 'MANAGER_DATA':
                    return {...state,managerData:action.payload} 
                case 'TAX_DATA':
                    return {...state,taxData:action.payload}  
                case 'EXIT_DATA':
                    return {...state,exitData:action.payload}        
                case 'INSURANCE_DATA':
                    return {...state,insuranceData:action.payload}  
                case 'SPORT_DATA':
                    return {...state,sportData:action.payload}      
                    case 'PROMOTION_DATA':
                        return {...state,promotionData:action.payload}                                     
            default: return state;
    }
}

export default EmployeeHistoryReducer;