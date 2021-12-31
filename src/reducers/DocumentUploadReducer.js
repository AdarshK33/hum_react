const DocumentUploadReducer = (state, action) => {
    switch (action.type) {
    
        case "MIT_REPORT_DOWNLOAD":
          return {
            ...state,
            documentUploadData: action.payload,
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
  