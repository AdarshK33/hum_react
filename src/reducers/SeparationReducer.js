const GroupReducer = (state, action) => {
  switch (action.type) {
    case "SEPARATION_LIST":
      return {
        ...state,
        separationList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
      };
      case "FETCH_SEPARATION_LIST":
        return { ...state, noDueClearanceList: action.payload };
        case "UPDATE_SEPARATION_LIST":
          return {...state,updateNoDueClearanceList:action.payload};
      default:
        return state;
  }
};
export default GroupReducer;
