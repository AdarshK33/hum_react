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
  }
};
export default GroupReducer;
