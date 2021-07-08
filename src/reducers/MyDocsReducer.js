const MyDocsReducer = (state, action) => {
  switch (action.type) {
    case "DOCUMENTS_LISTING":
      return { ...state, myDocsListData: action.payload };

    case "MY_DISCIPLINARY_LISTING":
      return { ...state, myDiscilinaryListData: action.payload };

    default:
      return state;
  }
};
export default MyDocsReducer;
