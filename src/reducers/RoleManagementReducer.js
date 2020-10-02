const RoleManagementReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_MENU_LIST':
            return { ...state, MenuList: action.payload };
        
        case 'FETCH_ROLE_LIST':
            return { ...state, RoleList: action.payload };

        case 'FETCH_ROLEDATA_LIST':
            return { ...state, RoleListData: action.payload };

        case 'FETCH_ADDDATA_LIST':
            return { ...state, AddNewRole: action.payload };

        case 'FETCH_GETROLEDATA_LIST':
            return { ...state, GetRolePermission: action.payload ,EditMenuList : action.EditMenuList};

        case 'FETCH_EDITROLEDATA_LIST':
            return { ...state, EditRolePermission: action.payload };
            
        // case 'EMPTY_MENU_LIST':
        //     return { ...state };
               
        default: return state;
    }
}

export default RoleManagementReducer;