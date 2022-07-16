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
      return {
        ...state,
        noDueClearanceList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
      };
    case "UPDATE_SEPARATION_LIST":
      return { ...state, updateNoDueClearanceList: action.payload };
    case "SAVE_FINANCE_LIST":
      return { ...state, financeList: action.payload };
    case "FETCH_ADMIN_NODUECLEARANCE_LIST":
      return {
        ...state,
        adminNoDueClearanceList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
      };
    case "FETCH_FINANCE_ADMIN_NODUECLEARANCE_LIST":
      return {
        ...state,
        financeAdminNoDueClearanceList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
      };
    case "FINANCECLEARANCE_UPLOAD_SETTLEMENT":
      return { ...state, financeClearanceUpload: action.payload };
    case "FINANCECLEARANCE_ADMIN_EXPORT":
      return { ...state, financeAdminClearanceExport: action.payload };
    case "UPDATE_ADMIN_FINANCE_SEPARATION":
      return { ...state, updateAdminFinanceClearance: action.payload };
    case "NO_DUE_CLEARANCE_ADMIN_EXPORT":
      return { ...state, noDueClearanceAdminClearanceExport: action.payload };
    case "FINANCECLEARANCE_EXPORT":
      return { ...state, financeClearanceExport: action.payload };
    case "NO_DUE_CLEARANCE_EXPORT":
      return { ...state, noDueClearanceClearanceExport: action.payload };
    default:
      return state;
    case "SAVE_FINANCE_LIST":
      return { ...state, financeList: action.payload };

    case "EMP_RESIGN":
      return { ...state, empResignData: action.payload, loader: action.loader };
      
    case "MANAGER_LIST":
      return { ...state, managerList: action.payload };
      case "PROMOTION_MANAGER_LIST":
        return { ...state, promotioManagerList: action.payload };
    case "MODE_OF_SEPARATION":
      return { ...state, ...action.payload };
      case "ALL_MANAGERS_LIST":
        return { ...state, allManagerList: action.payload };
    case "WITHDRAW_RESIGNATION":
      return { ...state };
      case "MANAGERS_BY_COSTCENTER_LIST":
        return { ...state, managersByCostcenterList: action.payload };
    case "SEARCH_BY_COST_DATA":
      return { ...state, searchByCostData: action.payload };
  }
};
export default GroupReducer;
