const NoticePeriodReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_NOTICE_PERIOD_LIST":
      return {
        ...state,
        noticePeriodList: action.payload,
        total: action.total,
      };
    case "FETCH_NOTICE_PERIOD_LIST_ERR":
      return {
        ...state,
        noticePeriodList: [],
        total: 0,
      };
    case "CHANGE_ACTION_STATUS":
      return {
        ...state,
        actionStatus: false,
      };
    case "CREATE_NOTICE_PERIOD":
      return {
        ...state,
        actionStatus: true,
      };
    case "CREATE_NOTICE_PERIOD_ERR":
      return {
        ...state,
        actionStatus: false,
      };
    case "FETCH_NOTICE_PERIOD_DETAILS":
      return {
        ...state,
        noticePeriodDetails: action.payload,
      };
    case "FETCH_NOTICE_PERIOD_DETAILS_ERR":
      return {
        ...state,
        noticePeriodDetails: {},
      };
    default:
      return state;
  }
};

export default NoticePeriodReducer;
