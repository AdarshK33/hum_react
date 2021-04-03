// const state = [];
const GroupReducer = (state, action) => {
  switch (action.type) {
    case "UPDATING":
      console.log("on reducer");
      return { ...state, name: action.payload };
    case "UPDATE_PERSONAL_INFO":
      console.log("info");
      return { ...state, Infodata: action.payload };
    case "CANDIDATE_PROFILE":
      console.log("profile");
      return { ...state, candidateData: action.payload };
    case "STATE_LIST":
      console.log("stateList");
      return { ...state, stateList: action.payload };
    case "CITY_LIST":
      console.log("CityList");
      return { ...state, cityList: action.payload };
      case "EMERGENCY_CONTACT_UPDATE":
        console.log("EMERGENCY_CONTACT_UPDATE");
      return { ...state, emergencyContactData: action.payload };
      case "EMERGENCY_CONTACT_UPDATE":
        console.log("EMERGENCY_CONTACT_UPDATE");
      return { ...state,emergencyContactCreate:action.payload};
      case "EMERGENCY_CONTACT_VIEW":
      console.log("EMERGENCY_CONTACT_VIEW reducer",action.payload);
      return { ...state,emergencyContactView:action.payload};
    default:
      return state;
  }
};
export default GroupReducer;
