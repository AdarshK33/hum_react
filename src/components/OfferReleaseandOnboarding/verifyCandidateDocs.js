import React, { Fragment, useState, useContext, useEffect } from "react";

import { AppContext } from "../../context/AppState";
import "../CandidateVerification/ManageCandidate.css";

import VerificationDocsByAdmin from "./verificationDocsByAdmin";
import VerificationDocsByManager from "./verificationOfDocsByManager";
import { PermissionContext } from "../../context/PermissionState";

const VerifyCandidateDocs = () => {
  const { getUserInfo,fetchEmployeeProfile, user } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
  useEffect(() => {
    getUserInfo();
    fetchEmployeeProfile();
  }, []);

  return (
    <Fragment>
      {rolePermission == "admin" && <VerificationDocsByAdmin />}
      {(rolePermission == "superCostCenterManager" ||
        rolePermission == "costCenterManager" ||
        rolePermission == "manager") && <VerificationDocsByManager />}
    </Fragment>
  );
};
export default VerifyCandidateDocs;
