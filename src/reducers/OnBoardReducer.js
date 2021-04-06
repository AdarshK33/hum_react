// const state = [];
const GroupReducer = (state, action) => {
  switch (action.type) {
    case "UPDATING":
      console.log("on reducer");
      return { ...state, name: action.payload };
    case "UPDATE_PERSONAL_INFO":
      console.log("info");
      return { ...state, PersonalInfoResponse: action.payload };
    case "CANDIDATE_PROFILE":
      console.log("profile");
      return { ...state, candidateData: action.payload };
    case "STATE_LIST":
      console.log("stateList");
      return { ...state, stateList: action.payload };
    case "CITY_LIST":
      console.log("CityList");
      return { ...state, cityList: action.payload };
    case "SEARCH_EMP1":
      return { ...state, searchEmpData1: action.payload };

    case "SEARCH_EMP2":
      return { ...state, searchEmpData2: action.payload };
    case "CANDIDATE_VIEW_INFO":
      return { ...state, candidateViewInfo: action.payload };
    case "CANDIDATE_PERSONAL_INFODATA":
      return { ...state, candidatePersonalInfoData: action.payload };
    case "CREATE_NOMINEE_DATA":
      return { ...state, CreateNomineeResponse: action.payload };
    case "CANDIDATE_INSURANCE_NOMINEE_DATA":
      return { ...state, candidateInsuranceNominationData: action.payload };
    case "CANDIDATE_COUNTRY_LIST":
      return { ...state, candidateCountryData: action.payload };
    case "CANDIDATE_STATE_LIST":
      return { ...state, candidateStateData: action.payload };
    case "CANDIDATE_CITY_LIST":
      return { ...state, candidateCityData: action.payload };
    default:
      return state;
  }
};
export default GroupReducer;
