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
    authority: "https://preprod.idpdecathlon.oxylane.com",
    client_id: "C6a7b68d52ad21c0d5546fbef78c0903a55190480",
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