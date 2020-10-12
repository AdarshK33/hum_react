import React, { createContext, useReducer } from "react";
import { client, setDefaultHeader } from "../utils/axios";
import AppReducer from "../reducers/AppReducer";
import { toast } from "react-toastify";
import {
  Home,
  File,
  Calendar,
  Package,
  
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
  MENUITEMS : [],
  user: {},
  flag : 0
};

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

        const { status, data: { data: { access_token, refresh_token } } } = resp;
       
        if (status === 200) {
          Cookies.set('APPAT', access_token)
          Cookies.set('APPRT', refresh_token)
          // const { data, data: { refresh_token, access_token } } = resp;

          setTimeout(() => { }, 1000)
        
          // Cookies.set('APPSID', {refresh_token, access_token});
          setDefaultHeader(resp.data.data.access_token)

          return dispatch({ type: SET_ACCESS_TOKEN_SUCCESS, payload: data });
        }
      })
      .catch((err) => {

        setTimeout(() => {
          toast.error("Oppss.. Something went wrong");
        }, 200);
        return dispatch({ type: SET_ACCESS_TOKEN_FAIL, payload: err });
      });
  };



  //GET USER INFO

  const getUserInfo = () => {
    // state.MENUITEMS = [];
    client.get('/employee/profile')
      .then((response) => {
        state.user = response.data.data
       
      
        return dispatch({ type: 'FETCH_USER_INFO', payload: state.user });
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getUserMenu = (menus) => {
    state.MENUITEMS = [];
    
        if( menus !== null && menus !== undefined ){
          state.flag = 1;
              for(let i = 0; i<menus.length; i++){
                if(menus[i].hasChild === true){
                  state.MENUITEMS.push({title: menus[i].menuName, icon: File, type: 'link', path: menus[i].menuUrl, active: false,children:[]})
                  for(let j = 0; j<menus.length; j++){
                    if(menus[j].child === true && menus[i].menuUrl === menus[j].parentUrl){
                      state.MENUITEMS[i].children.push({ path: menus[j].menuUrl, title: menus[j].menuName, type: 'link' })
                    }

                  }
                }else if(menus[i].child === false){
                  state.MENUITEMS.push({ path: menus[i].menuUrl, title: menus[i].menuName, icon: File, type: 'link', active: false})
                }
              }
          }
          console.log("*****************************",state.MENUITEMS);
       
  }




  return (
    <AppContext.Provider
      value={{
        accessToken,
        authenticateUser,
        getUserInfo,
        getUserMenu,
        user: state.user,
        state,
        MENUITEMS:  state.MENUITEMS,
        flag : state.flag
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


