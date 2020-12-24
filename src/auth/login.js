/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useEffect,
  // useContext
} from "react";
import { withRouter } from "react-router";
import { UserManager } from 'oidc-client';

// Context
// import { AppContext } from "../context/AppState";

// components
import Loader from "../components/common/loader";
import { ToastContainer } from "react-toastify";

// css
import "react-toastify/dist/ReactToastify.css";

const config = {
  authority: process.env.REACT_APP_AUTHORITY,
  client_id: process.env.REACT_APP_FEDID_CLIENTID,
  redirect_uri: window.location.origin + "/signin",
  response_type: "code",
  scope: "openid profile",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
console.log("CONFIG " + JSON.stringify(config))
const userManager = new UserManager(config);
console.log("USER MANAGER", userManager)

const login = ({ location, history }) => {
  //   const { accessToken, state } = useContext(AppContext);

  console.log("=== INSIDE LOGIN ", login)

  useEffect(() => {
    userManager.signinRedirect();
    //   userManager.signinRedirectCallback().then(user => {
    //     console.log(user, 'found user');
    //   }).catch(e => console.log(e));
    // getAccessToken()
  }, []);

  useEffect(() => {
  }, [userManager]);


  return (
    <div>
      <Loader />
      <ToastContainer />
    </div>
  );
};

export default withRouter(login);
