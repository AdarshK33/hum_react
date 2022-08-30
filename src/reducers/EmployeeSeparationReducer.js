const GroupReducer = (state, action) => {
  console.log("adarsh separation",action)
  switch (action.type) {
    case "EMPLOYEE_SEPARATION_LISTING":
      return {
         ...state,
          EmployeeSeparationList: action.payload,
          loader: action.loader,
          total: action.total,
         };

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
      return { ...state, relivingLetterData: action.payload };
    case "TERMINATION_CONFIRMATION":
      return { ...state, terminationConfirmationStatus: action.payload };
    case "RESIGNATION_CONFIRMATION":
      return { ...state, resignationConfirmationStatus: action.payload };

    case "DISCIPLINARY_TERMINATION":
      return { ...state, DisciplinaryTermination: action.payload };
      case "FETCH_TERMINATION_LETTER_DATA":
        return { ...state, terminationLetterData: action.payload };   

    default:
      return state;
  }
};

export default GroupReducer;
