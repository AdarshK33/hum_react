const DocumentUploadReducer = (state, action) => {
    switch (action.type) {
    
        case "DOCUMENT_UPLOAD_LIST":
          return {
            ...state,
            documentUploadData: action.payload,
          };
          case "DOWNLOAD_DOCUMENT_UPLOAD":
          return {
            ...state,
            downloadDocumentUploadData: action.payload,
          };
          case "EMPLOYEE_UPLOAD":
          return {
            ...state,
            employeeUploadData: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default DocumentUploadReducer;
  