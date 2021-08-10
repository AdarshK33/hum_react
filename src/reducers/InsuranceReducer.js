const InsuranceReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INSURANCE_LIST":
      return {
        ...state,
        insuranceList: action.payload,
        total: action.total,
      };
    case "FETCH_INSURANCE_LIST_ERR":
      return {
        ...state,
        insuranceList: [],
        total: 0,
      };
    case "CHANGE_ACTION_STATUS":
      return {
        ...state,
        actionStatus: false,
      };
    case "CREATE_INSURANCE":
      return {
        ...state,
        actionStatus: true,
      };
    case "CREATE_INSURANCE_ERR":
      return {
        ...state,
        actionStatus: false,
      };
    case "FETCH_INSURANCE_DETAILS":
      return {
        ...state,
        insuranceDetails: action.payload,
      };
    case "FETCH_INSURANCE_DETAILS_ERR":
      return {
        ...state,
        insuranceDetails: {},
      };
    default:
      return state;
  }
};

export default InsuranceReducer;
