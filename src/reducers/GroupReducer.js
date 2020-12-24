
import {
    GROUP_SERVICE_VIEW,
    CREATE_SERVICE_ROLE,
    UPDATE_SERVICE_ROLE,
    SERVICE_GROUP_EMPLOYEES
} from '../constant/actionTypes'

const GroupReducer = (state,action) => {
    switch(action.type){

        case GROUP_SERVICE_VIEW:
            return {...state, serviceGroupList: action.payload, loader: action.loader}

        case CREATE_SERVICE_ROLE:
            return {...state, serviceGroupList: action.payload}

        case UPDATE_SERVICE_ROLE:
            return {...state, serviceGroupList: action.payload}

        case SERVICE_GROUP_EMPLOYEES:
            return {...state, empList: action.payload}

        default: return state;
    }
}

export default GroupReducer