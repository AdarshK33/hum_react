const ClusterProductReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_CLUSTER_LIST':
            return { ...state, clusterList: action.payload };

        case 'FETCH_CLUSTERPRODUCTTARGET_LIST':
            return { ...state, clusterProductList: action.payload};

        case 'ADD_NEW_TARGET':
            return { ...state, NewTarget: action.payload }

        case 'EDIT_TARGET':
            return { ...state, clusterList: action.payload }

        case 'VIEW_SINGLE_CLUSTER_TARGET':
            return { ...state, singleClusterTarget: action.payload }

        case 'FETCH_LEADER_CLUSTER_LIST' :
            return {...state, leaderClusterList: action.payload}

        case 'FETCH_LEADERCLUSTERPRODUCTTARGET_LIST' :
            return {...state, leaderClusterProductList: action.payload}

        case 'FETCH_LEADER_CLUSTER_LIST' :
            return {...state, leaderClusterList : action.payload}

        default: return state;
    }
}


export default ClusterProductReducer;
