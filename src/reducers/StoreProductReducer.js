const StoreProductReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_STOREPRODUCTTARGET_LIST':
            return { ...state, storeProductList: action.payload };
        
        case 'FETCH_STATEDATA_LIST':
            return { ...state, StateData: action.payload };

        case 'ADD_NEW_TARGET':
            return { ...state, NewTarget: action.payload }
            
        case 'FETCH_VIEWTARGET_LIST':
                return { ...state, editTarget: action.payload }

        case 'EDIT_TARGET':
            return { ...state, updateTargetList: action.payload }

        case 'FETCH_STORELEADERPRODUCTTARGET_LIST' :
            return { ...state, storeLeaderProductList: action.payload }

        default: return state;
    }
}

export default StoreProductReducer;