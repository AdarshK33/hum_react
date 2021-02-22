import React, { createContext, useReducer } from "react";
import { client } from "../utils/axios";
import AppReducer from "../reducers/AppReducer";
import { toast } from "react-toastify";
import {
  File,


} from 'react-feather';
import { SET_ACCESS_TOKEN_FAIL, SET_ACCESS_TOKEN_SUCCESS, AUTHENTICATE_USER } from "../constant/actionTypes";

// utils
import Cookies from '../utils/cookies';

const initialState = {
  sportsNames: [],
  clusterLeaderNames: [],
  clusterList: [],
  getSingleCluster: [],
  userInfoDetails: [],
  app: {
    loaded: false,
    isLoggedin: false
  },
  MENUITEMS: [],
  user: {},
  flag: 0,
  MenuPermissionsRoute: []
};
// const loginUrl = `${process.env.REACT_APP_FEDID_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_FEDID_CLIENTID}&scope=openid%20profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
export const AppContext = createContext();

export const AppProvider = ({ children, history }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const authenticateUser = (result) => {

    return dispatch({ type: AUTHENTICATE_USER, payload: result });
  }

  const accessToken = (code) => {

    let data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_FEDID_CLIENTID,
      code: code,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    };

    client.get('auth/token?code=' + code)

      .then((resp) => {

        const { status, data: { data: { access_token, refresh_token, id_token } } } = resp;
        // console.log('GOt resp', resp)
        if (status === 200) {
          localStorage.setItem('APPID', id_token)
          Cookies.set('APPAT', access_token)
          Cookies.set('APPRT', refresh_token)

          // const { data, data: { refresh_token, access_token } } = resp;

          //  console.log("=== ID toKEN ", id_token);
          // setTimeout(() => { }, 1000)

          // Cookies.set('APPSID', {refresh_token, access_token});
          // setDefaultHeader(resp.data.data.access_token)

          return dispatch({ type: SET_ACCESS_TOKEN_SUCCESS, payload: data });
        }
        else {
          toast.error("Unable to process the request. Please try again later")
          setTimeout(function () { userLogout(); }, 4000);
        }
      })
      .catch((err) => {

        setTimeout(() => {
          toast.error("Unable to process the request. Please try again later");
        }, 200);
        return dispatch({ type: SET_ACCESS_TOKEN_FAIL, payload: err });
      });
  };



  //GET USER INFO

  const getUserInfo = () => {
    // state.MENUITEMS = [];
    client.get('api/v1/employee/profile')
      .then((response) => {
        state.user = response.data.data
        if (response.data.data === {}) {
          toast.error("User does not exist");
        }
        else if (response.data.data === null) {
          toast.error("This user is not active")
          setTimeout(function () { userLogout(); }, 4000);
        }
        else {
          return dispatch({ type: 'FETCH_USER_INFO', payload: state.user });
        }
      })
      .catch((error) => {
        console.log(error)
        setTimeout(function () { userLogout(); }, 4000);
        toast.error("User does not exist");
        //4 sec
      })
  }


  const userLogout = () => {
    console.log("*********** ", localStorage.getItem('APPID'));
    const logOutUrl = `${process.env.REACT_APP_FEDID_LOGOUT_URL}?id_token_hint=${localStorage.getItem('APPID')}&post_logout_redirect_uri=${process.env.REACT_APP_LOGOUTREDIRECT_URL}`;
    // client.get('/auth/logout?id_token=' + localStorage.getItem('APPID'))
    //   .then((response) => {
    //     console.log(response)
    //     if (response.status === 201) {
    Cookies.remove('APPAT')
    Cookies.remove('APPRT')
    localStorage.removeItem('APPID')
    localStorage.removeItem('type')
    localStorage.removeItem('flag')
    window.location.href = logOutUrl
    localStorage.removeItem('URL')
    // window.open(
    //   loginUrl,
    //   '_blank' // <- This is what makes it open in a new window.
    // );

    //   }
    //   else {
    //     toast.info("Something went Wrong..!")
    //   }
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  }






  const getUserMenu = (menus, type, user) => {
    state.MENUITEMS = [];
    state.MenuPermissionsRoute = [];
    if (menus !== null && menus !== undefined) {
      state.flag = 1;
      for (let i = 0; i < menus.length; i++) {
        if (type === "profile" && user.department !== "Retail") {
          if (menus[i].hasChild === true && menus[i].menuUrl !== "api/v1/leaves/viewleave" && menus[i].menuUrl !== "api/v1/roster/teamroster") {
            state.MENUITEMS.push({ title: menus[i].menuName, icon: File, type: 'link', path: menus[i].menuUrl, active: false, children: [] })

          } else if (menus[i].child === false && menus[i].menuUrl !== "api/v1/leaves/viewleave" && menus[i].menuUrl !== "api/v1/roster/teamroster") {
            state.MENUITEMS.push({ path: menus[i].menuUrl, title: menus[i].menuName, icon: File, type: 'link', active: false })
          }
        } else {
          if (menus[i].hasChild === true) {
            state.MENUITEMS.push({ title: menus[i].menuName, icon: File, type: 'link', path: menus[i].menuUrl, active: false, children: [] })

          } else if (menus[i].child === false) {
            state.MENUITEMS.push({ path: menus[i].menuUrl, title: menus[i].menuName, icon: File, type: 'link', active: false })
          }
        }

        state.MenuPermissionsRoute.push({ path: menus[i].menuUrl });
      }
      for (let i = 0; i < state.MENUITEMS.length; i++) {
        for (let j = 0; j < menus.length; j++) {
          if (state.MENUITEMS[i].path === menus[j].parentUrl) {
            state.MENUITEMS[i].children.push({ path: menus[j].menuUrl, title: menus[j].menuName, type: 'link' })
          }

        }
      }
    }

  }




  return (
    <AppContext.Provider
      value={{
        accessToken,
        authenticateUser,
        getUserInfo,
        getUserMenu,
        userLogout,
        user: state.user,
        state,
        MENUITEMS: state.MENUITEMS,
        flag: state.flag,
        app: state.app,
        MenuPermissionsRoute: state.MenuPermissionsRoute
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

