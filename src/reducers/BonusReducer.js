const GroupReducer = (state, action) => {
  switch (action.type) {
    case "BONUS_CREATE":
      return { ...state, bonusData: action.payload };
    case "VIEW_BONUS":
      return {
        ...state,
        bonusDetails: action.payload,
        total: action.total,
        loader: action.loader,
      };
  }
};
export default GroupReducer;
