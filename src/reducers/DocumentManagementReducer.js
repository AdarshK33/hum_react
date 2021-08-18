const DocumentManagementReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_MODULES_LIST":
      return {
        ...state,
        moduleList: action.payload,
      };
    case "FETCH_MODULES_LIST_ERR":
      return {
        ...state,
        moduleList: [],
      };
    default:
      return state;
  }
};

export default DocumentManagementReducer;
