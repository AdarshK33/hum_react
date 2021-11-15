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
  }
};
export default GroupReducer;
