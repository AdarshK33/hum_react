
const LeaveReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_LEAVE_LIST':
            return { ...state, leaveList: action.payload, loader: action.loader, adminTotal: action.adminTotal, adminData: action.adminData}

        case 'FETCH_MANAGER_LEAVE_LIST':
            return { ...state, leaveManagerList: action.payload, loader: action.loader, managerTotal: action.managerTotal, managerData: action.managerData }

        case 'FETCH_LEAVE_DATA_LIST':
            return { ...state, leaveDataList: action.payload }

        case 'FETCH_EMP_LEAVE_DATA_LIST':
                return { ...state, leaveEmpList: action.payload, loader: action.loader, total: action.total, data: action.data }

        case 'ADD_NEW_LEAVE':
            return { ...state, leaveList: action.payload }

        case 'ADD_EMP_NEW_LEAVE':
            return { ...state, leaveEmpList: action.payload }

        case 'ADD_POPUP_LEAVE':
            return { ...state, leavesData: action.payload }

        case 'Edit_POPUP_LEAVE':
            return { ...state, editLeavesData: action.payload }
    
        case 'EDIT_LEAVE':
            return { ...state, leaveList: action.payload }

        case 'EDIT_EMP_LEAVE':
            return { ...state, leaveEmpList: action.payload }

        case 'FETCH_LEAVE_TYPE':
            return ({ ...state, leaveType: action.payload })

        case 'FETCH_LEAVE_TYPE_REPORT':
            return ({ ...state, leaveTypeReport: action.payload })

        case 'FETCH_GRANT_LEAVE':
            return ({ ...state, grantLeave: action.payload })

        case 'FETCH_HOLIDAY_LIST':
                return { ...state, holiday: action.payload, loader: action.loader  };

        case 'DELETE_LEAVE':
            return {
                ...state,
                leaveList: state.leaveList !== null && state.leaveList.filter(leaveList => leaveList.leaveId !== action.payload)
            };
        case 'DELETE_EMP_LEAVE':
            return {
                ...state,
                leaveEmpList: state.leaveEmpList.filter(leaveEmpList => leaveEmpList.leaveId !== action.payload)
            };

        case 'FETCH_EMP_DATA':
            return ({ ...state, empData: action.payload })

        case 'REPORT_LEAVE':
            return { ...state, reportList: action.payload, loader: action.loader}

        case 'FETCH_EMPLOYEE_TYPE':
            return { ...state, employeeList: action.payload }

        case 'PRODUCTIVITY_REPORT':
            return { ...state, productivityList: action.payload, loader: action.loader }

        case 'CITY_LIST':
            return { ...state, cityList: action.payload };

        default: return state;
    }
}

export default LeaveReducer