import React, { createContext, useReducer } from "react";
import { client, setDefaultHeader } from "../utils/axios";
import AppReducer from "../reducers/AppReducer";
import { toast } from "react-toastify";

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
  user: {}
};

export const AppContext = createContext();

export const AppProvider = ({ children, history }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const authenticateUser = (result) => {
    console.log("IN AUTHENTICATE USER " + result)
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
        console.log("1 " + resp.data.data.access_token);
        console.log("2 " + resp.data.data.refresh_token);
        console.log({ resp });
        if (status === 200) {
          Cookies.set('APPAT', access_token)
          Cookies.set('APPRT', refresh_token)
          // const { data, data: { refresh_token, access_token } } = resp;

          setTimeout(() => { }, 1000)
          console.log("===" + access_token);
          console.log("===" + refresh_token);
          // Cookies.set('APPSID', {refresh_token, access_token});
          setDefaultHeader(resp.data.data.access_token)

          return dispatch({ type: SET_ACCESS_TOKEN_SUCCESS, payload: data });
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
        setTimeout(() => {
          toast.error("Oppss.. Something went wrong");
        }, 200);
        return dispatch({ type: SET_ACCESS_TOKEN_FAIL, payload: err });
      });
  };



  //GET USER INFO

  const getUserInfo = () => {
    client.get('/employee/profile')
      .then((response) => {
        state.user = response.data.data
        console.log("=====GET API respone=====", state.user)
        console.log("=====GET API respone=====", state.user.firstName)
        return dispatch({ type: 'FETCH_USER_INFO', payload: state.user });
      })
      .catch((error) => {
        console.log(error)
      })
  }




  return (
    <AppContext.Provider
      value={{
        accessToken,
        authenticateUser,
        getUserInfo,
        user: state.user,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


