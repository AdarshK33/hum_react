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
    case "SEARCH_EMP1":
      return { ...state, searchEmpData1: action.payload };

    case "SEARCH_EMP2":
      return { ...state, searchEmpData2: action.payload };
    default:
      return state;
  }
};
export default GroupReducer;
