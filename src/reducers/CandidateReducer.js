// const state = [];
const CandidateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        candidateLoginValue: action.payload.candidateLoginValue,
        candidateLoginResponse: action.payload.candidateLoginResponse,
      };
    case "OFFER_ACCEPT_DATA":
      return { ...state, offerAcceptData: action.payload };
    default:
      return state;
  }
};
export default CandidateReducer;
