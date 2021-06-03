const PromotionReducer = (state, action) => {
    switch (action.type) {
      case "PROMOTION_LIST":
        return {
          ...state,
          promotionList: action.payload,
          loader: action.loader,
          data: action.data,
          total: action.total,
        };
        case "PROMOTION_ID":
          return {
            ...state,
            promotionIdData: action.payload,
          };
          case "PROMOTION_CREATE":
            return {
              ...state,
              promotionCreate: action.payload,
            };
            case "POSITION_NEW":
            return {
              ...state,
              positionNew: action.payload,
            };
    case "PROMOTION_LETTER_DATA":
      return { ...state, promotionLetterData: action.payload };
  }
};
export default PromotionReducer;
