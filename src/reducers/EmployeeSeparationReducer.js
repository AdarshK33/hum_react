const GroupReducer = (state, action) => {
  switch (action.type) {
    case "EMPLOYEE_SEPARATION_LISTING":
      console.log("on reducer");
      return { ...state, EmployeeSeparationList: action.payload };

    default:
      return state;
  }
};

export default GroupReducer;
