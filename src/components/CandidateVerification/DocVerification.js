import React, { Fragment, useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppState";
import "./ManageCandidate.css";

import DocVerificationAdmin from "./DocVerificationAdmin";
import DocVerificationManager from "./DocVerificationManager";

// import { handleInputChange } from "react-select/src/utils";

const DocVerification = () => {
  const { getUserInfo, user } = useContext(AppContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Fragment>
      {user.role === "ADMIN" && <DocVerificationAdmin />}
      {(user.role === "MANAGER" || user.role === "COST_CENTER_MANAGER") && (
        <DocVerificationManager />
      )}
    </Fragment>
  );
};
export default DocVerification;
