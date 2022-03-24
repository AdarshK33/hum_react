const ModuleReportReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REPORT":
      return {
        ...state,
        reportStatus: true,
      };
    case "FETCH_REPORT_ERR":
      return {
        ...state,
        reportStatus: true,
      };
    case "SET_REPORT_STATUS":
      return {
        ...state,
        reportStatus: false,
      };
    default:
      return state;
  }
};

export default ModuleReportReducer;
