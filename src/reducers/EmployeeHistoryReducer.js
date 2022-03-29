const EmployeeHistoryReducer = (state, action) => {
    switch (action.type) {

                case 'EMPLOYEE_HISTORY_DATA':
                    return { ...state, employeeHistoryData: action.payload }; 
                case 'BANK_DATA':
                    return {...state,bankData:action.payload}
                case 'PAN_DATA':
                    return {...state,panData:action.payload}
                case 'PF_AND_UAN_DATA':
                    return {...state,PFAndUANData:action.payload}
                case 'SALARY_DATA':
                    return {...state,salaryData:action.payload}
                case 'BONUS_DATA':
                    return { ...state,bonusData:action.payload}
                    case 'SPORT_DATA':
                        return {...state,sportData:action.payload}      
                        case 'MANAGER_DATA':
                            return {...state,managerData:action.payload} 
                        case 'COSTCENTER_DATA':
                    return {...state,costCenterData:action.payload}
                    case 'INSURANCE_DATA':
                        return {...state,insuranceData:action.payload}  
                        case 'CONFIRMATION_DATA':
                            return {...state,confirmationData:action.payload}                               
                            case 'DSICIPLINARY_DATA':
                                return {...state,disciplinaryData:action.payload}   
                                case 'LEAVES_DATA':
                                    return {...state,leavesData:action.payload}
                                case 'PROMOTION_DATA':
                        return {...state,promotionData:action.payload}    
                case 'PROBATION_DATA':
                return {...state,probationData:action.payload} 
   
                case 'CONTRACT_FREEZE_DATA':
                return {...state,contractFreezeData:action.payload} 
                case 'CONTRACT_TYPE_CHANGE_DATA':
                    return {...state,contractTypeChangeData:action.payload} 
               
                case 'EXIT_DATA':
                    return {...state,exitData:action.payload}        
                    case 'EXITED_EMPLOYEE_DATA':
                        return {...state,exitedEmployeeData:action.payload}        
                        case 'CURRENT_MONTH_EXITED_DATA':
                    return {...state,currentMonthExitedData:action.payload}          
                    case 'EMPLOYEE_CONTACT_DETAILS_ID':
                        return { ...state,employeeContactDetailsByIdData:action.payload}                                                                  
                    case 'AADHAAR_DATA':
                    return {...state,aadhaarData:action.payload}             
                case 'ACCESS_DATA':
                     return {...state,accessData:action.payload}   
               
               
               

               
               
            default: return state;
    }
}

export default EmployeeHistoryReducer;