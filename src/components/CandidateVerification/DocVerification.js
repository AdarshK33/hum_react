import React, { Fragment, useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppState";
import "./ManageCandidate.css";
import { PermissionContext } from "../../context/PermissionState";

import DocVerificationAdmin from "./DocVerificationAdmin";
import DocVerificationManager from "./DocVerificationManager";

// import { handleInputChange } from "react-select/src/utils";

const DocVerification = () => {
  const { getUserInfo,fetchEmployeeProfile, user } = useContext(AppContext);

  const { rolePermission } = useContext(PermissionContext);
  useEffect(() => {
    getUserInfo();
    fetchEmployeeProfile()
  }, []);

  return (
    <Fragment>
      {rolePermission === "admin" && <DocVerificationAdmin />}
      {(rolePermission == "superCostCenterManager" ||
        rolePermission == "costCenterManager" ||
        rolePermission == "manager") && <DocVerificationManager />}
    </Fragment>
  );
};
export default DocVerification;
