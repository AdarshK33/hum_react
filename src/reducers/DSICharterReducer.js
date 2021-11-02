const DSICharterReducer = (state, action) => {
    switch (action.type) {

        case 'DSICHARTER_CREATE':
            return { ...state, dsiCharterData: action.payload }; 
            case 'DSICHARTER_UPDATE':
                return { ...state, dsiCharterUpdateData: action.payload }; 
            case 'VIEW_CHARTER':
                return { ...state, charterData: action.payload };
            case "VIEW_CHARTER_ALL":
                return { ...state, charterDataAll: action.payload };
            case "DSICHARTER_ENABLE":
                return { ...state, charterEnable: action.payload };
            case "EMPLOYEE_PROFILE":
                return { ...state, employeeProfileData: action.payload };
            default: return state;
    }
}

export default DSICharterReducer;