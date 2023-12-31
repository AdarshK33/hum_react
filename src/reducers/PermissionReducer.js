const PermissionReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERMISSION":
      return { ...state, permissionList: action.payload };

    case "LOCATION_DETAILS_LIST":
      return { ...state, locationDetailsList: action.payload };

    case "MONTHLY_QTY_DETAILS_LIST":
      return {
        ...state,
        monthlyQtyDetailsList: action.payload,
        loader: action.loader,
      };
    case "IMAGE_VIEW":
    return{ ...state,imageViewData:action.payload};
    
    case "VIEW_PERMISSION":
      return { ...state, permissionList: action.payload };

    case "GROUP_LIST":
      return { ...state, groupList: action.payload };

    case "CREATE_GROUP":
      return { ...state, groupList: action.payload };
    case "ROLE_ACCESS_PERMISSION":
      return { ...state, rolePermission: action.payload };

    default:
      return state;
  }
};

export default PermissionReducer;
