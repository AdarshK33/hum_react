import {
    VIEW_TICKET_LISTING,
     COMPLETE_STATUS,
     TICKET_STATUS,
     VIEW_TICKET_ID_INFO,
     UPDATE_TICKET
} from '../constant/actionTypes'

const SupportReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_ROLES':
            return { ...state, getRoles: action.payload };

        case VIEW_TICKET_LISTING:
            return {...state, ticketListing: action.payload, loader: action.loader,
                 data: action.data, total: action.total}

        case COMPLETE_STATUS:
            return {...state, completeStatusView: action.payload}

        case TICKET_STATUS:
            return {...state, ticketStatusView: action.payload}

        case  VIEW_TICKET_ID_INFO:
            return {...state, ticketIdList: action.payload, loader: action.loader}

        case  UPDATE_TICKET:
            return {...state, ticketListing: action.payload}

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

export default SupportReducer