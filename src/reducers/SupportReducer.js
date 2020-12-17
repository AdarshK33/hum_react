const SupportReducer = (state, action) => {

    switch (action.type) {

        case 'FETCH_ROLES':
            return { ...state, getRoles: action.payload };

        case 'FETCH_ISSUE_AND_CATEGORY':
            return { ...state, getIssueAndCategoryList: action.payload };

        case 'FETCH_URGENCY_LIST':
            return { ...state, urgencyList: action.payload };

        case 'FETCH_PRIORITY_LIST':
            return { ...state, priorityList: action.payload, priorityListId: state.priorityListId };


        default: return state;
    }
}

export default SupportReducer;