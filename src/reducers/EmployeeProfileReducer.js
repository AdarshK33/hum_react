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
    default:
      return state;
  }
};

export default GroupReducer;
