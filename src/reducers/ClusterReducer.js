const ClusterReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_SPORTS_NAME':
            return { ...state, sportsNames: action.payload };

            case 'FETCH_LEADERS_NAME':
                return { ...state, clusterLeaderNames: action.payload };

           case 'FETCH_ClUSTER_LIST':
                return { ...state, clusterList: action.payload };

           case 'GET_SINGLE_CLUSTER':
            return { ...state, ...action.payload };

          case 'FETCH_EMPLOYEE_FOR_CLUSTER':
                        return { ...state, getClusterEmployees: action.payload };          
                    
         case 'FETCH_SALARY_LIST':
               return { ...state, salaryList: action.payload };

        case 'FETCH_SALARY_STORE_LIST':
               return { ...state, salaryStoreList: action.payload };

        case 'SALARY_APPRROVAL_LIST':
            return { ...state, salaryStoreList: action.payload };

        case 'CLUSTER_COST_CENTER':
            return { ...state, clusterCostCenterList: action.payload };
               
        default: return state;
    }
}

export default ClusterReducer;