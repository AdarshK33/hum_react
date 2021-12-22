const GroupReducer = (state, action) => {
  switch (action.type) {
    case "WEEKOFF_CREATE":
      return { ...state, weekoffData: action.payload };
    case "VIEW_WEEKOFF":
      return {
        ...state,
        weekOffDetails: action.payload,
        total: action.total,
        loader: action.loader,
      };
      case "VIEW_WEEKOFF_BY_ID":
      return {
        ...state,
        weekOffById: action.payload
      };
      case "WEEKOFF_UPDATE":
      return {
        ...state,
        weekoffEditData: action.payload
      };
  }
};
export default GroupReducer;
