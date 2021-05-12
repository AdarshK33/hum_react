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
    case "EMERGENCY_CONTACT_CREATE":
      console.log("EMERGENCY_CONTACT_CREATE");
      return { ...state, emergencyContactData: action.payload };
    case "EMERGENCY_CONTACT_UPDATE":
      console.log("EMERGENCY_CONTACT_UPDATE");
      return { ...state, emergencyContactCreate: action.payload };
    case "EMERGENCY_CONTACT_VIEW":
      console.log("EMERGENCY_CONTACT_VIEW reducer", action.payload);
      return { ...state, emergencyContactView: action.payload };
    case "PFDECLARATION_CREATE":
      console.log("PFDECLARATION_CREATE");
      return { ...state, emergencyContactData: action.payload };
    case "PFDECLARATION_UPDATE":
      console.log("PFDECLARATION_UPDATE");
      return { ...state, emergencyContactCreate: action.payload };
    case "PFDECLARATION_VIEW":
      console.log("PFDECLARATION_VIEW reducer", action.payload);
      return { ...state, pfDeclarationView: action.payload };
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
    case "DELETE_NOMINEE_DATA":
      return { ...state, deleteNomineeData: action.payload };
    case "DELETE_ALL_NOMINEE_DATA":
      return { ...state, deleteAllNomineeData: action.payload };
    case "CANDIDATE_INSURANCE_NOMINEE_DATA":
      return { ...state, candidateInsuranceNominationData: action.payload };
    case "CANDIDATE_COUNTRY_LIST":
      return { ...state, candidateCountryData: action.payload };
    case "CANDIDATE_STATE_LIST":
      return { ...state, candidateStateData: action.payload };
    case "CANDIDATE_PERMANENT_CITY_LIST":
      return { ...state, candidatePermanentCityData: action.payload };
    case "CANDIDATE_PRESENT_CITY_LIST":
      return { ...state, candidatePresentCityData: action.payload };
    case "CANDIDATE_ADDRESS_DATA":
      return { ...state, addressSaveData: action.payload };
    case "CANDIDATE_ADDRESS_VIEW_DATA":
      return { ...state, addressViewData: action.payload };
    case "CANDIDATE_BANK_DATA":
      return { ...state, bankSaveData: action.payload };
    case "CANDIDATE_BANK_VIEW_DATA":
      return { ...state, bankViewData: action.payload };
    case "CANDIDATE_BANK_UPDATE_DATA":
      return { ...state, bankUpdateData: action.payload };
    case "CANDIDATE_DOCUMENT_VIEW_DATA":
      return { ...state, documentViewData: action.payload };
    case "DOCUMENT_UPLOAD_DATA":
      return { ...state, documentUploadData: action.payload };
    default:
      return state;
  }
};
export default GroupReducer;
