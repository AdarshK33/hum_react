import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";

// Context
import { AppContext } from "../context/AppState";

// components
import Loader from "../components/common/loader";
import { ToastContainer } from "react-toastify";

// css
import "react-toastify/dist/ReactToastify.css";

const Signin = ({ location, history }) => {
  const { accessToken, state } = useContext(AppContext);

  useEffect(() => {
      getAccessToken()
  }, []);

  useEffect(() => {
      console.log('state inside appstate changed', state)
      checkIsloggedIn(state)
  }, [state]);

  const checkIsloggedIn = (state) => {
    const {app: {isLoggedin} } = state
    if(isLoggedin) history.push('/roster/roster')
  }

  const getAccessToken = () => {
    const { search } = location;
    const [, code] = search.split("?code=");

    accessToken(code)
  }

  return (
    <div>
      <Loader />
      <ToastContainer />
    </div>
  );
};

export default withRouter(Signin);
