const PartTimeSalaryInputReducer = (state, action) => {
    switch (action.type) {
    
        case "EMPLOYEE_DATA":
          return {
            ...state,
            employeeData: action.payload,
            searchKey: action.searchKey
          };
          case "CREATED_DATA":
          return {
            ...state,
            createdData: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default PartTimeSalaryInputReducer;
  