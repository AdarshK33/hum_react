const GroupReducer = (state, action) => {
  switch (action.type) {
    case "WORKHOUR_CREATE":
      return { ...state, workHourData: action.payload };
    case "VIEW_WORKHOUR":
      return {
        ...state,
        workHourDetails: action.payload,
        total: action.total,
        loader: action.loader,
      };
  }
};
export default GroupReducer;
