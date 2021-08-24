const GroupReducer = (state, action) => {
  switch (action.type) {
    case "PROBATION_LISTING":
      console.log("on reducer");
      return { ...state, probationListData: action.payload };

    case "UPDATE_PROBATION":
      console.log("on reducer");
      return { ...state, probUpdateResponse: action.payload };

    case "PROBATION_DATA_BY_ID":
      console.log("on reducer");
      return { ...state, probationData: action.payload };

    case "CONFIRMATION_LETTER":
      console.log("on reducer");
      return { ...state, cnfLetterData: action.payload };
    case "EXTENSION_LETTER":
      console.log("on reducer");
      return { ...state, extensionLetterData: action.payload };

    case "PROBATION_END_LETTER":
      console.log("on reducer");
      return { ...state, endLetterData: action.payload };
    case "LETTER_VIEW":
      console.log("on reducer");
      return { ...state, ShowViewLetterModel: action.payload };
    case "LETTER_PREVIEW":
      console.log("on reducer");
      return { ...state, ShowPreViewLetterModel: action.payload };

    case "LETTER_SAVE":
      console.log("on reducer");
      return { ...state, LetterSaved: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
