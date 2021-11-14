const MitReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_MIT_REPORT":
      return {
        ...state,
        mitReportStatus: true,
      };
    case "FETCH_REPORT_ERR":
      return {
        ...state,
        mitReportStatus: true,
      };
    case "SET_MIT_REPORT_STATUS":
      return {
        ...state,
        mitReportStatus: false,
      };
      case "MIT_REPORT_DOWNLOAD":
        return {
          ...state,
          mitReport: action.payload,
        };
    default:
      return state;
  }
};

export default MitReducer;
