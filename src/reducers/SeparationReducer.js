const GroupReducer = (state, action) => {
  switch (action.type) {
    case "SEPARATION_LIST":
      return {
        ...state,
        separationList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
      };
      case "FETCH_SEPARATION_LIST":
         return { ...state, noDueClearanceList: action.payload };
     case "UPDATE_SEPARATION_LIST":
          return {...state,updateNoDueClearanceList:action.payload};
      case "SAVE_FINANCE_LIST":
         return { ...state, financeList: action.payload };
      case "FETCH_ADMIN_NODUECLEARANCE_LIST":
           return {...state,adminNoDueClearanceList:action.payload}
      case "FETCH_FINANCE_ADMIN_NODUECLEARANCE_LIST":
            return {...state,financeAdminNoDueClearanceList:action.payload}
      case "FINANCECLEARANCE_UPLOAD_SETTLEMENT":
              return {...state,financeClearanceUploadSettlement:action.payload}
      case "FINANCECLEARANCE_EXPORT":
                return {...state,financeClearanceExport:action.payload}
      case "UPDATE_ADMIN_FINANCE_SEPARATION":
        return {...state,updateAdminFinanceClearance:action.payload}
      default:
        return state;
  }
};
export default GroupReducer;
