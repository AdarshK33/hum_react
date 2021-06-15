const DisciplinaryReducer = (state, action) => {
  switch (action.type) {
    case "DISCIPLINARY_LISTING":
      return { ...state, extensionLetterData: action.disciplinaryListData };

    case "DISCIPLINARY_SEARCH":
      return { ...state, extensionLetterData: action.disciplinarySearchData };
    case "DISCIPLINARY_REASONS":
      return { ...state, extensionLetterData: action.disciplinaryResonsData };

    case "CREATE_SHOW_CAUSE_NOTICE":
      return {
        ...state,
        extensionLetterData: action.showCauseIssueCreateResponse,
      };

    default:
      return state;
  }
};
export default DisciplinaryReducer;
