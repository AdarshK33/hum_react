const GroupReducer = (state, action) => {
  switch (action.type) {
    case "EMPLOYEE_SEPARATION_LISTING":
      console.log("on reducer");
      return { ...state, EmployeeSeparationList: action.payload };
    case "EMPLOYEE_DATA_BY_ID":
      return { ...state, employeeData: action.payload };

    case "MODE_OF_SEPARATION":
      return { ...state, ModeOfSeparationData: action.payload };

    default:
      return state;
  }
};

export default GroupReducer;
