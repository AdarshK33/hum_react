const AdminReducer = (state, action) => {
    switch (action.type) {

        case 'CREATE_GRANT_LEAVE':
            return { ...state, createGrantLeaveResponse: action.payload };

        case 'VIEW_GRANT_LEAVE':
            return { ...state, grantLeaveView: action.payload };

        case 'FETCH_ADMIN_LEAVE_LIST':
            return { ...state, leaveAdminList: action.payload }

        case 'COST_CENTER_DATA':
            return { ...state, costCenterList: action.payload }

        case 'EMPLOYEE_ID_DATA':
            return { ...state, employeeIdList: action.payload }
          
               
        default: return state;
    }
}

export default AdminReducer;