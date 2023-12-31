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
    case "VIEW_BONUS_BY_ID":
      return { ...state, getBonusDetailsById: action.payload };
    case "BONUS_UPDATE":
      return { ...state, bonusData: action.payload };
    case "EXPORT_BONUS_LIST":
      return { ...state, bonusListExport: action.payload };
    case "VIEW_BONUS_BY_CONTRACT":
      return { ...state, getBonusByContractType: action.payload };
  }
};
export default GroupReducer;
