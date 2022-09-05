const PromotionReducer = (state, action) => {
  switch (action.type) {
    case "PROMOTION_LIST":
      return {
        ...state,
        promotionList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
        createdPromotion: action.createdPromotion,     
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
        createdPromotion: action.createdPromotion,
      };
    case "POSITION_NEW":
      return {
        ...state,
        positionNew: action.payload,
      };
    case "PROMOTION_LETTER_DATA":
      return { ...state, promotionLetterData: action.payload };
    case "PROMOTION_VIEW_EMPLOYEE":
      return { ...state, promotionByEmployee: action.payload };
    case "APPROVE_PROMOTION_DATA":
      return {
        ...state,
        approvePromotionData: action.payload,
        createdPromotion: action.createdPromotion,
      };
    case "REJECT_PROMOTION_DATA":
      return { ...state, rejectPromotionData: action.payload };
    case "EMPLOYEE_DATA":
        return {
          ...state,
          employeeDetails: action.payload
        
        };
    case "PROMOTION_EMPLOYEE_DATA":
        return {
        ...state,
        promotionEmployeeDetails: action.payload
          
          };
  }
};
export default PromotionReducer;
