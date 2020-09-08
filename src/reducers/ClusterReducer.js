const ClusterReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_SPORTS_NAME':
            return { ...state, sportsNames: action.payload };

            case 'FETCH_LEADERS_NAME':
                return { ...state, clusterLeaderNames: action.payload };

           case 'FETCH_ClUSTER_LIST':
                return { ...state, clusterList: action.payload };

           case 'GET_SINGLE_CLUSTER':
                    return { ...state, getSingleCluster: action.payload };

          case 'FETCH_EMPLOYEE_FOR_CLUSTER':
                        return { ...state, getClusterEmployees: action.payload };          
                    

        default: return state;
    }
}

export default ClusterReducer;