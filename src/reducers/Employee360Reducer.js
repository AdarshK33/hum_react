const GroupReducer = (state, action) => {
  switch (action.type) {
    case "HOLIDAY_VIEW":
      console.log("on reducer");
      return { ...state, HolidaysList: action.payload };
    case "MYDOC_VIEW":
      return { ...state, MyDocList: action.payload };
    case "WEEKS_LIST":
      return { ...state, WeeksList: action.payload };
    case "WEEKS_INFO_LIST":
      return { ...state, WeeksInfoList: action.payload };
    case "CLUSTER_DATA":
      return { ...state, ClusterData: action.payload };
    case "CLUSTER_EMP_DATA":
      return { ...state, ClusterEmpList: action.payload };
    case "EMPLOYEE_360_APROVAL":
      return { ...state, employee360ListData: action.payload };
    case "UN_PLANNED_LEAVES":
      return { ...state, unPlannedLeaves: action.payload };
    case "PLANNED_LEAVES":
      return { ...state, plannedLeaves: action.payload };
    case "MY_PERFORMANCE":
      return { ...state, myPerformanceData: action.payload };
    case "MANAGER_360_APROVAL":
      return { ...state, 
        Manager360ListData: action.payload,
        totalManager360ListData: action.totalManager360ListData, 
      };
    case "CLUSTER_DIRECT":
      return { ...state, clusterDirect: action.payload };
    case "YEARS_LIST":
        return { ...state, YearsList: action.payload };
    case "TEAM_UN_PLANNED_LEAVES":
          return { ...state, teamUnPlannedLeaves: action.payload };
    case "TEAM_PLANNED_LEAVES":
          return { ...state, teamPlannedLeaves: action.payload };
    case "TEAM_PERFORMANCE":
          return { ...state, teamPerformanceData: action.payload }; 
    case "EMPLOYEE_MY_TEAM":
            return { ...state, employeeMyTeam: action.payload };         
    case "EMPLOYEE_All_TEAM":
            return { 
              ...state, 
              employeeAllTeam: action.payload,
              loader: action.loader,
              total: action.total, 
               };    
    default:
      return state;
  }
};

export default GroupReducer;
