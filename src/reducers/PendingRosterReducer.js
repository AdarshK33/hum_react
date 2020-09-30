const PendingRosterReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_PENDINGROSTER_LIST':
            return { ...state, pendingRosterList: action.payload };

        case 'ROSTER_APPROVE':
            return { ...state, pendingRosterList: action.payload };        

        default: return state;
    }
}


export default PendingRosterReducer;
