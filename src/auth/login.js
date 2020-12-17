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
  client_id: "C8e09d8bc792c0cd24b470d9e67f3ded5322882e1",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
const userManager = new UserManager(config);

const login = ({ location, history }) => {
  //   const { accessToken, state } = useContext(AppContext);

  
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
