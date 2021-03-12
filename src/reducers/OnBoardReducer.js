const state = [];
const GroupReducer = (state, action) => {
  switch (action.type) {
    case "UPDATING":
      console.log("on reducer");
      return { ...state, name: action.payload };

    default:
      return state;
  }
};
export default GroupReducer;
