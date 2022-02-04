const GroupReducer = (state, action) => {
  switch (action.type) {
    case "UPLOAD_ESIGN":
      console.log("on reducer");
      return { ...state, uploadResponse: action.payload };
    case "REFERENCE_CHECK":
      return { ...state, referenceResponse: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
