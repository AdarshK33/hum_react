const DocumentUploadReducer = (state, action) => {
    switch (action.type) {
    
        case "MIT_REPORT_DOWNLOAD":
          return {
            ...state,
            documentUploadData: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default DocumentUploadReducer;
  