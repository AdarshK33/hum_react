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

        case 'MANAGER_EMPLOYEE_ID_DATA':
             return { ...state, managerEmployeeIdList: action.payload }

        case 'LEAVE_MASTER_VIEW':
            return { ...state, leaveMasterList: action.payload }

        case 'LEAVE_MASTER_UPLOAD':
            return { ...state, leaveMasterList: action.payload }

        case 'APPRROVAL_LEAVE_LIST':
            return { ...state, ApprovalLeaveList: action.payload }

        case 'UPDATED_APPRROVAL_LEAVE_LIST':
            return { ...state, ApprovalLeaveList: action.payload }

        case 'CANCEL_ADMIN_LEAVE':
            return {
                ...state,
                ApprovalLeaveList: state.ApprovalLeaveList.filter(ApprovalLeaveList => ApprovalLeaveList.ltId !== action.payload)
            };
          
               
        default: return state;
    }
}

export default AdminReducer;