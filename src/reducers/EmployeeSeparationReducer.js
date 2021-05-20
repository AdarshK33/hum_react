const GroupReducer = (state, action) => {
  switch (action.type) {
    case "EMPLOYEE_SEPARATION_LISTING":
      console.log("on reducer");
      return { ...state, EmployeeSeparationList: action.payload };

    case "EMPLOYEE_ID":
      return { ...state, employeeId: action.payload };
    case "EMPLOYEE_DATA_BY_ID":
      return { ...state, employeeData: action.payload };

    case "MODE_OF_SEPARATION":
      return { ...state, ModeOfSeparationData: action.payload };

    case "UPDATE_EMPLOYEE_SEPARATION":
      return { ...state, updateResponse: action.payload };

    case "EMPLOYEE_PROFILE_DATA_BY_ID":
      return { ...state, employeeProfileData: action.payload };
    case "FETCH_RELIEVING_LETTER_DATA":
      return { ...state, relievingLetterData: action.payload };
    case "TERMINATION_CONFIRMATION":
      return { ...state, terminationConfirmationStatus: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
