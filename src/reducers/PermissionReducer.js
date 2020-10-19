const PermissionReducer = (state, action) =>{
    switch(action.type){
        case 'SET_PERMISSION': 
            return {...state, permission: action.payload};
        
        default: return state;
    }
}

export default PermissionReducer;