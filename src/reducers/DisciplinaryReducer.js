const DisciplinaryReducer = (state, action) => {
  switch (action.type) {
    case "DISCIPLINARY_LISTING":
      return { ...state, extensionLetterData: action.disciplinaryListData };

    case "DISCIPLINARY_SEARCH":
      return { ...state, extensionLetterData: action.disciplinarySearchData };

    default:
      return state;
  }
};
export default DisciplinaryReducer;
