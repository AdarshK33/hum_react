const GroupReducer = (state, action) => {
  switch (action.type) {
    case "ADDRESS_VIEW":
      return { ...state, addressViewData: action.payload };

    default:
      return state;
  }
};

export default GroupReducer;
