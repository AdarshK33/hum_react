import React, { createContext, useReducer } from "react";
import axios from "axios";
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
  },
};

export const AppContext = createContext();

export const AppProvider = ({ children, history }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const accessToken = (code) => {
    // let data = {
    //   grant_type: "authorization_code",
    //   client_id: "C6a7b68d52ad21c0d5546fbef78c0903a55190480",
    //   code: code,
    //   redirect_uri: "https://preprod-humine.decathlonin.net/",
    // };
    let config = {
      method: "get",
      url: "http://localhost:3000/accesstoken.json",
      // headers: {
      //   "cache-control": "no-cache",
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
      // data: data,
    };
    axios(config)
      .then((resp) => {
        console.log({ resp });
        if (resp && resp.status === 200) {
          const { data, data: {refresh_token, access_token} } = resp;

          
          Cookies.set('APPSID', {refresh_token, access_token});
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
