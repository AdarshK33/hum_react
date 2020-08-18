

export default (state, action) => {
 
    switch (action.type) {

        case 'CREATE_SHIFT':
            console.log("App reducer")

            return {
                ...state,
                shift:action.payload
            };
        default: return state;
    }
}