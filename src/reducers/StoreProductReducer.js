const StoreProductReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_STOREPRODUCTTARGET_LIST':
            return { ...state, storeProductList: action.payload };
        
        case 'FETCH_STATEDATA_LIST':
            return { ...state, StateData: action.payload };

        case 'ADD_NEW_TARGET':
            return { ...state, NewTarget: action.payload }
               
        default: return state;
    }
}

export default StoreProductReducer;