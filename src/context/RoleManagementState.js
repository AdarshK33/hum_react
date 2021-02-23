import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import RoleManagementReducer from '../reducers/RoleManagementReducer';
import { toast } from "react-toastify";



const initial_state = {
  RoleList: [],
  MenuList: [],
  RoleListData: [],
  AddNewRole: [],
  GetRolePermission: [],
  EditRolePermission: [],
  EditMenuList: []

}



export const RoleManagementContext = createContext();
export const RoleManagementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoleManagementReducer, initial_state);


  function viewMenu() {

    client.get('/menu/view').then(function (response) {
      //  console.log(response);
      if (response.data.data !== null) {
        state.MenuList = response.data.data;
      } else {
        state.MenuList = [];
      }

      return dispatch({ type: 'FETCH_MENU_LIST', payload: state.MenuList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function viewRole() {

    client.get('/menu/roles/view').then(function (response) {
      //  console.log(response);
      state.RoleList = response.data.data;

      return dispatch({ type: 'FETCH_ROLE_LIST', payload: state.RoleList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function viewRoleListData() {

    client.get('/menu/permission/view').then(function (response) {
      //  console.log(response);
      state.RoleListData = response.data.data;

      return dispatch({ type: 'FETCH_ROLEDATA_LIST', payload: state.RoleListData });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function AddRole(values) {

    client.post('/menu/permission/create', values).then(function (response) {
      //  console.log(response);
      toast.info(response.data.message);
      state.AddNewRole = response.data.data;
      viewRoleListData();
      return dispatch({ type: 'FETCH_ADDDATA_LIST', payload: state.AddNewRole });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function GetRoleData(role) {

    client.get('/menu/permission/view/' + role).then(function (response) {
      //  console.log(response);
      state.GetRolePermission = response.data.data;
      viewMenu();
      state.EditMenuList = [];

      //   console.log(state.MenuList);
      for (let j = 0; j < response.data.data.length; j++) {
        for (let i = 0; i < state.MenuList.length; i++) {
          if (response.data.data[j].menuId === state.MenuList[i].menuId) {
            state.EditMenuList.push({label: state.MenuList[i].menuName, value: state.MenuList[i].menuId} );
           
          }
        }
      }
      //   console.log(state.EditMenuList);

      return dispatch({ type: 'FETCH_GETROLEDATA_LIST', payload: state.GetRolePermission, EditMenuList: state.EditMenuList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function EditRole(values) {

    client.post('/menu/permission/update', values).then(function (response) {
      //  console.log(response);
      toast.info(response.data.message);
      state.EditRolePermission = response.data.data;
      viewRoleListData();
      return dispatch({ type: 'FETCH_EDITROLEDATA_LIST', payload: state.EditRolePermission });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  //   function EmptyMenuList() {

  //     state.EditMenuList= [];                  

  //     return dispatch({ type: 'EMPTY_MENU_LIST' });

  //   }



  return (<RoleManagementContext.Provider value={{
    viewMenu,
    viewRole,
    viewRoleListData,
    AddRole,
    GetRoleData,
    EditRole,
    // EmptyMenuList,
    MenuList: state.MenuList,
    RoleList: state.RoleList,
    RoleListData: state.RoleListData,
    AddNewRole: state.AddNewRole,
    GetRolePermission: state.GetRolePermission,
    EditRolePermission: state.EditRolePermission,
    EditMenuList: state.EditMenuList
  }}>
    {children}
  </RoleManagementContext.Provider>);
}