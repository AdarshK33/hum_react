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
            return { ...state, salaryList: action.payload, loader: action.loader };

        case 'FETCH_SALARY_STORE_LIST':
            return { ...state, salaryStoreList: action.payload };

        case 'SALARY_APPRROVAL_LIST':
            return { ...state, salaryStoreList: action.payload };

        case 'CLUSTER_COST_CENTER':
            return { ...state, ...action.payload };

        case 'FETCH_ALL_LEADERS_NAME':
            return { ...state, clusterAllLeaderNames: action.payload };

        case 'FETCH_ADMIN_ClUSTER_LIST':
            return { ...state, adminClusterList: action.payload };

        case 'VIEW_COST_CENTER_EMPLOYEE_MANGER':
            return { ...state, costCenterEmpAndMgrList: action.payload };

        case 'VIEW_MANAGER_BY_COST_CENTER':
            return { ...state, viewManagerByCostCenterList: action.payload };

        case 'CLUSTER_EMP_LIST':
            return { ...state, callClusterEmployeesList: action.payload };


        case 'CLUSTER_LEADERS_LIST':
            return { ...state, callClusterLeadersList: action.payload };


        default: return state;
    }
}

export default ClusterReducer;