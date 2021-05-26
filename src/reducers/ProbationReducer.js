const GroupReducer = (state, action) => {
  switch (action.type) {
    case "PROBATION_LISTING":
      console.log("on reducer");
      return { ...state, probationListData: action.payload };

    case "PROBATION_LISTING_BY_DUE":
      console.log("on reducer");
      return { ...state, probationListByDueDays: action.payload };

    default:
      return state;
  }
};

export default GroupReducer;
