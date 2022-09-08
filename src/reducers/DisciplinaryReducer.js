const DisciplinaryReducer = (state, action) => {
  console.log(action,"hello action DisciplinaryReducer")
  switch (action.type) {
    case "DISCIPLINARY_LISTING":
      return {
         ...state,
         disciplinaryListData: action.payload,
         loader: action.loader,
         total: action.total, 
         };

    case "DISCIPLINARY_SEARCH":
      return { ...state, disciplinarySearchData: action.payload };
    case "DISCIPLINARY_REASONS":
      return { ...state, disciplinaryResonsData: action.payload };

    case "CREATE_SHOW_CAUSE_NOTICE":
      return {
        ...state,
        showCauseIssueCreateResponse: action.payload.createData,
        showCauseIssueCreateResponseMessage:action.payload.messageData
      };

    case "ISSUE_SHOW_CAUSE_LETTER":
      return {
        ...state,
        issueShowCauseNoticeData: action.payload,
      };
    case "DISCIPLINARY_SEARCH_WITH_KEY":
      return { ...state, disciplinaryEmpSearchData: action.payload };
    default:
      return state;
  }
};
export default DisciplinaryReducer;
