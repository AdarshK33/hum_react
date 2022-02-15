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
      case "VIEW_WORKHOUR_BY_ID":
      return {
        ...state,
        workHourById: action.payload
      };
      case "WORKHOUR_UPDATE":
      return {
        ...state,
        workHourEditData: action.payload
      };
  }
};
export default GroupReducer;
