const GroupReducer = (state, action) => {
  switch (action.type) {
    case "PAYSLIP_VIEW":
      return { ...state, payslipViewData: action.payload };
    case "PAYROLL_OTHER_DOC_VIEW":
      return { ...state, otherDocViewData: action.payload };
    case "EMP_SEARCH_BY_COST_DATA":
      return { ...state, empSearchByCostData: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
