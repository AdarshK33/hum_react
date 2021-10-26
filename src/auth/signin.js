import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import { UserManager } from 'oidc-client';
import { AppContext } from "../context/AppState";
import Loader from "../components/common/loader";
import { setDefaultHeader } from "../utils/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let access_token = "";

// const initial_state = {
//   idTokenState: "",
//   access_tokenState: "",
//   refresh_tokenState: "",

// }
const Signin = ({ location, history }) => {
  const { accessToken, state } = useContext(AppContext);

  useEffect(() => {
    // getAccessToken()
  }, []);

  useEffect(() => {
    console.log('state inside appstate changed', state)
    //checkIsloggedIn(state)

  }, [state]);
  const config = {
    authority: process.env.REACT_APP_AUTHORITY,
    client_id: process.env.REACT_APP_FEDID_CLIENTID,
    redirect_uri: window.location.origin + "/signin",
    response_type: "code",
    scope: "openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true,
  };
  const userManager = new UserManager(config);





  useEffect(() => {
    //  checkTokenExists()
    // setFlagValue(flag)
    // let access_tokenState= "";
    console.log("APP JSX USE EFFECT.")
    userManager.signinRedirectCallback().then(user => {
      console.log(user, 'found user TOKEN GENRATED');
      const idTokenState = user.id_token;
      access_token = user.access_token;
      const refresh_tokenState = user.refresh_token;
      if (access_token !== "") {
        // let location = window.location.pathname;
        // localStorage.setItem('URL', location)
        // localStorage.setItem('URL', "/dashboard/storedashboard")
        setDefaultHeader(access_token, user.refresh_token);
        if (localStorage.getItem("URL") === null) {
          history.push('/dashboard/storedashboard');
          //history.push('/codeofconduct');
        } else {
          let url = localStorage.getItem('URL');
          history.push(url);
          // history.push('/dashboard/storedashboard');
        }

        // setDefaultHeader(access_token);
      }

      // setDefaultHeader(user.access_token);
    }).catch(e => console.log("INSIDE USE EFFECT ERROR " + e));
    // history.push('/dashboard/storedashboard')

  }, []);


  // const checkIsloggedIn = (state) => {
  //   const { app: { isLoggedin } } = state
  //   if (isLoggedin) history.push('/dashboard/storedashboard')
  // }

  // const getAccessToken = () => {
  //   const { search } = location;
  //   const [, code] = search.split("?code=");

  //   accessToken(code)
  //   //console.log(accessToken);
  // }

  return (
    <div>
      <Loader />
      <ToastContainer />
    </div>
  );
};
export { access_token };
export default withRouter(Signin);
