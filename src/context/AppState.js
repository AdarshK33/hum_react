import React, { createContext, useReducer } from "react";
import {client, setDefaultHeader} from "../utils/axios";
import AppReducer from "../reducers/AppReducer";
import { toast } from "react-toastify";

import { SET_ACCESS_TOKEN_FAIL, SET_ACCESS_TOKEN_SUCCESS } from "../constant/actionTypes";

// utils
import Cookies from '../utils/cookies';

const initialState = {
  sportsNames: [],
  clusterLeaderNames: [],
  clusterList: [],
  getSingleCluster: [],
  app: {
    loaded: false,
    isLoggedin: false
  },
};

export const AppContext = createContext();

export const AppProvider = ({ children, history }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const accessToken = (code) => {
    let config = {
      method: "get",
      url: "http://localhost:3000/accesstoken.json"
    };
    
    // let data = {
    //   grant_type: "authorization_code",
    //   client_id: process.env.REACT_APP_FEDID_CLIENTID,
    //   code: code,
    //   redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    // };
    // let config = {
    //   method: "post",
    //   url: "https://preprod.idpdecathlon.oxylane.com/as/token.oauth2",
    //   headers: {
    //     "cache-control": "no-cache",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: data,
    // };
    client(config)
      .then((resp) => {
        console.log({ resp });
        if (resp && resp.status === 200) {
          const { data, data: {refresh_token, access_token} } = resp;

          Cookies.set('APPSID', {refresh_token, access_token});
          setDefaultHeader(access_token)
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

  return (
    <AppContext.Provider
      value={{
        accessToken,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
