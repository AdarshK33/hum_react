const DisciplinaryReducer = (state, action) => {
  switch (action.type) {
    case "DISCIPLINARY_LISTING":
      return { ...state, disciplinaryListData: action.payload };

    case "DISCIPLINARY_SEARCH":
      return { ...state, disciplinarySearchData: action.payload };
    case "DISCIPLINARY_REASONS":
      return { ...state, disciplinaryResonsData: action.payload };

    case "CREATE_SHOW_CAUSE_NOTICE":
      return {
        ...state,
        showCauseIssueCreateResponse: action.payload,
      };

    case "ISSUE_SHOW_CAUSE_LETTER":
      return {
        ...state,
        issueShowCauseNoticeData: action.payload,
      };
    default:
      return state;
  }
};
export default DisciplinaryReducer;
