
export default (state, action) => {
    switch(action.type){
        case 'APPLY_LEAVE':
            console.log("leave reducer")
        return {
            ...state,
            leave: action.payload
        };
        default: return state;
    }
}