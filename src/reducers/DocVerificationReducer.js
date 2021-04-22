const GroupReducer = (state, action) => {
  switch (action.type) {
    case "DOCUMENSTS_TO_VERIFY":
      return { ...state, docsToVerify: action.payload };
    case "PERSONAL_INFO_TO_VERIFY":
      return { ...state, personalInfoData: action.payload };
    case "ADDRESS_INFO_TO_VERIFY":
      return { ...state, addressInfoData: action.payload };
    case "CONTACT_INFO_TO_VERIFY":
      return { ...state, emergencyInfo: action.payload };
    case "BANK_DETAILS_TO_VERIFY":
      return { ...state, bankDetails: action.payload };
    case "NOMINATION_DETAILS_TO_VERIFY":
      return { ...state, nominationDetails: action.payload };
    case "PF_DETAILS_TO_VERIFY":
      return { ...state, pfDetails: action.payload };
    case "GET_ACCEPT_STATUS":
      return { ...state, acceptStatus: action.payload };
    case "GET_REJECT_STATUS":
      return { ...state, rejectStatus: action.payload };
    case "DOWNLOAD_DOCU":
      return { ...state, downloadedFile: action.payload };
    case "UPDATE_UAN":
      return { ...state, uanUpdate: action.payload };
    case "COST_CENTER_CREATE":
      return { ...state, costCenter: action.payload };
    case "CANDIDATE_ONBOARD":
      return { ...state, onBoardData: action.payload };
    case "CREATE_EMPLOYEE":
      return { ...state, createStatus: action.payload };
    case "VIEW_EMPLOYEE":
      return { ...state, empData: action.payload };
  }
};
export default GroupReducer;
