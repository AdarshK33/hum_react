const TransferReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRANSFER_LIST":
      return {
        ...state,
        transferList: action.payload,
        total: action.total,
      };
    case "FETCH_TRANSFER_LIST_ERR":
      return {
        ...state,
        transferList: [],
        total: 0,
      };
    case "FETCH_INITIATION_EMP_DATA":
      return {
        ...state,
        initiationEmpData: action.payload,
      };
    case "FETCH_INITIATION_EMP_DATA_ERR":
      return {
        ...state,
        initiationEmpData: {},
      };
    case "FETCH_DEPT_DATA":
      return {
        ...state,
        deptData: action.payload,
      };
    case "FETCH_DEPT_DATA_ERR":
      return {
        ...state,
        deptData: [],
      };
    case "FETCH_DEPT_POSITION_DATA":
      return {
        ...state,
        deptPositionData: action.payload,
      };
    case "FETCH_DEPT_POSITION_DATA_ERR":
      return {
        ...state,
        deptPositionData: [],
      };
    case "FETCH_COST_CENTRE_DATA":
      return {
        ...state,
        costCentreData: action.payload,
      };
    case "FETCH_COST_CENTRE_DATA_ERR":
      return {
        ...state,
        costCentreData: [],
      };
    case "FETCH_COST_CENTRE_MANAGERS_DATA":
      return {
        ...state,
        costCentreManagersData: action.payload,
      };
    case "FETCH_COST_CENTRE_MANAGERS_DATA_ERR":
      return {
        ...state,
        costCentreManagersData: [],
      };
    case "FETCH_COST_CENTRE_LOCATION_DATA":
      return {
        ...state,
        costCentreLocationData: action.payload,
      };
    case "FETCH_COST_CENTRE_LOCATION_DATA_ERR":
      return {
        ...state,
        costCentreLocationData: {},
      };
    case "INITIATION_CREATE":
      return {
        ...state,
        initiationStatus: true,
      };
    case "INITIATION_CREATE_ERR":
      return {
        ...state,
        initiationStatus: false,
      };
    default:
      return state;
  }
};

export default TransferReducer;
