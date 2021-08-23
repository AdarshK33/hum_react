const DocumentManagementReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_DOCS_STATUS":
      return {
        ...state,
        moduleDocsList: [],
        docsStatus: false,
      };
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
    case "GET_LOGIN_ROLE":
      return {
        ...state,
        loginRole: action.payload,
      };
    case "FETCH_MODULES_DOCS":
      return {
        ...state,
        moduleDocsList: action.payload,
        docsStatus: true,
      };
    case "FETCH_MODULES_DOCS_ERR":
      return {
        ...state,
        moduleDocsList: {},
        docsStatus: false,
      };
    default:
      return state;
  }
};

export default DocumentManagementReducer;
