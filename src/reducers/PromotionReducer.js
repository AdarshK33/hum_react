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
     
    }
  };
  export default PromotionReducer;
  