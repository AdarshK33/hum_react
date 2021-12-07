const GroupReducer = (state, action) => {
  switch (action.type) {
    case "ADDRESS_VIEW":
      console.log("on reducer");
      return { ...state, addressViewData: action.payload };
    case "EMERGENCY_CONTACT_VIEW":
      return { ...state, emergencyContactView: action.payload };
    case "BANK":
      return { ...state, bankViewData: action.payload };
    case "REMUNERATION_VIEW":
      return { ...state, remunerationData: action.payload };
    case "COST_CENTRE_SPLIT":
      return { ...state, costCentreSplitData: action.payload };
    case "EMERGENCY_CONTACT_UPDATE":
      return { ...state, emergencyUpdate: action.payload };
    case "DOCUMENTS_VIEW":
      return { ...state, documentsList: action.payload };
    case "INSURANCE_VIEW":
      return { ...state, insuranceData: action.payload };
    case "OTHER_DOCUMENTS_VIEW":
      return { ...state, otherDocumentsList: action.payload };
    case "EMP_INSURANCE_TOPUP_DATA":
      return { ...state, insuranceTopUpData: action.payload };
    case "EMP_PREMIUM_DATA":
      return { ...state, premiumViewData: action.payload };
    case "HOLIDAY_WORKING_BONUS_VIEW":
      return { ...state, holidayWorkingBonusList: action.payload };
    case "MANAGER_EMP_LISTING":
      return { ...state, EmployeesList: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
