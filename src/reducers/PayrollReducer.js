const GroupReducer = (state, action) => {
  switch (action.type) {
    case "PAYSLIP_VIEW":
      return { ...state, payslipViewData: action.payload };
    case "PAYROLL_OTHER_DOC_VIEW":
      return { ...state, otherDocViewData: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
