import React, { createContext, useReducer } from "react";
import { client, setDefaultHeader } from "../utils/axios";
import axios from 'axios';
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
  const getRefreshToken = () => {
    console.log("INSIDE THE GET_REFRESH_TOKEN")
    let refreshToken = Cookies.get('APPRT');
    let config = (
      client.get('auth/token/refresh?refresh_token=' + refreshToken)
    );
    return client(config)
  }


  // let authTokenRequest;

  // const resetAuthTokenRequest = () => {
  //     authTokenRequest = null;
  // };

  client.interceptors.request.use((config) => {
    const token = Cookies.get("APPAT");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const {
        config,
        response: { status },
      } = error;
      console.log(status, "status in interceptorrrrr");
      if (status === 401) {
        return getRefreshToken()
          .then((response) => {
            console.log("INSIDE THE INTERSECPECTOR ", response)
            const { data: {
              data: {
                access_token, refresh_token
              }
            } } = response;
            Cookies.set("APPAT", access_token);
            Cookies.set("APPRT", refresh_token, { expires: 0.5 });
            console.log(axios.defaults);
            config.headers.Authorization = `Bearer ${access_token}`;
            config.__isRetryRequest = true;
            return axios(config);
          })
          .catch((error) => {
            // console.log(error?.response);
            // console.log(error?.data);
            // const errorData = {
            //     status: error?.response?.status,
            //     ...error?.response?.data,
            // };
            return error;
          });
      } else if (!error.response.data) {
        let error = {};
        error.status = 501;
        error.error_description = "Please check internet connectivity.";
        return error;
      } else {
        return error.response;
      }
    }
  );







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
        // getRefreshToken,
        user: state.user,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


/// for setting base url 
// const getRefreshToken = () => {
//   console.log("INSIDE THE GET_REFRESH_TOKEN")
//   let refreshToken = Cookies.get('APPRT');
//   // let config = {
//   //   method: "get",
//   //   url: "http://humine.theretailinsights.co/auth/token/refresh?refresh_token=" + refreshToken,
//   // };
// for base url from axios.js 
//   let config = client.get('/auth/token/refresh?refresh_token=' + refreshToken)
//   return client(config)
// }


// client.interceptors.request.use((config) => {
//   const token = Cookies.get("APPAT");
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     console.log(status, "status in interceptorrrrr");
//     if (status === 401) {
//       return getRefreshToken()
//         .then((response) => {
//           console.log("INSIDE THE INTERSECPECTOR ", response)
//           const { data: {
//             data: {
//               access_token, refresh_token
//             }
//           } } = response;
//           Cookies.set("APPAT", access_token);
//           Cookies.set("APPRT", refresh_token, { expires: 0.5 });
//           console.log(axios.defaults);
//           config.headers.Authorization = `Bearer ${access_token}`;
//           config.__isRetryRequest = true;
//           return axios(config);
//         })
//         .catch((error) => {
//           // console.log(error?.response);
//           // console.log(error?.data);
//           // const errorData = {
//           //     status: error?.response?.status,
//           //     ...error?.response?.data,
//           // };
//           return error;
//         });
//     } else if (!error.response.data) {
//       let error = {};
//       error.status = 501;
//       error.error_description = "Please check internet connectivity.";
//       return error;
//     } else {
//       return error.response;
//     }
//   }
// );
