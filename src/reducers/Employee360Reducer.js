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

    default:
      return state;
  }
};

export default GroupReducer;
