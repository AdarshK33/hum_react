const MyDocsReducer = (state, action) => {
  switch (action.type) {
    case "DOCUMENTS_LISTING":
      return { ...state, myDocsListData: action.payload };

    default:
      return state;
  }
};
export default MyDocsReducer;
