// const state = [];
const CandidateReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, candidate: action.payload };
      default:
        return state;
    }
  };
  export default CandidateReducer;
  