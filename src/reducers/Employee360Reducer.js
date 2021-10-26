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
      return { ...state, Manager360ListData: action.payload };

    default:
      return state;
  }
};

export default GroupReducer;
