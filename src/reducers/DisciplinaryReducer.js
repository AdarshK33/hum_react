const DisciplinaryReducer = (state, action) => {
    switch (action.type) {
      case "DISCIPLINARY_MANAGER_LIST":
        return {
          ...state,
          promotionList: action.payload,
          loader: action.loader,
          data: action.data,
          total: action.total,
        };
  
    }
  };
  export default DisciplinaryReducer;
  