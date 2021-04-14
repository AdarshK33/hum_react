import React, { Fragment, useState, useContext, useEffect } from "react";

import { AppContext } from "../../context/AppState";
import "../CandidateVerification/ManageCandidate.css";

import VerificationDocsByAdmin from "./verificationDocsByAdmin";
import VerificationDocsByManager from "./verificationOfDocsByManager";

const VerifyCandidateDocs = () => {
  const { getUserInfo, user } = useContext(AppContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Fragment>
      {user.role === "ADMIN" && <VerificationDocsByAdmin />}
      {user.role === "MANAGER" && <VerificationDocsByManager />}
    </Fragment>
  );
};
export default VerifyCandidateDocs;
