
const LeaveReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_LEAVE_LIST':
            return { ...state, leaveList: action.payload }

        case 'FETCH_LEAVE_DATA_LIST':
            return { ...state, leaveDataList: action.payload }

        case 'ADD_NEW_LEAVE':
            return { ...state, leaveType: action.payload }

        case 'ADD_POPUP_LEAVE':
            return { ...state, leavesData: action.payload }

        case 'EDIT_LEAVE':
            return { ...state, leaveType: action.payload }

        case 'FETCH_LEAVE_TYPE':
            return ({ ...state, leaveType: action.payload })

        case 'FETCH_GRANT_LEAVE':
            return ({ ...state, grantLeave: action.payload })
        case 'FETCH_HOLIDAY_LIST':
                return { ...state, holiday: action.payload };

        case 'DELETE_LEAVE':
            return {
                ...state,
                leaveList: state.leaveList.filter(leaveList => leaveList.leaveId !== action.payload)
            };

        default: return state;
    }
}

export default LeaveReducer