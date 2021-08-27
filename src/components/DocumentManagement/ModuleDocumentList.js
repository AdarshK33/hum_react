import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "../common/breadcrumb";
import { DocumentManagementContext } from "../../context/DocumentManagementState";
import { AppContext } from "../../context/AppState";
import DocsModuleInfo from "./DocsModuleInfo";
import DocsModuleList from "./DocsModuleList";
import LoaderIcon from "../Loader/LoaderIcon";

const ModuleDocumentList = () => {
  const { getLoginRole, loginRole, moduleDocsList, loader } = useContext(
    DocumentManagementContext
  );
  const { user } = useContext(AppContext);

  /* Get Login User Role */
  useEffect(() => {
    getLoginRole(user);
  }, [user]);

  return (
    <div className="document_management_container">
      <Breadcrumb title="DOCUMENTS" parent="DOCUMENTS" />
      <Container fluid>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="OnBoardHeading">
            <b className="align-middle">DOCUMENTS </b>
          </div>
          {loader ? (
            <LoaderIcon />
          ) : (
            <div className="m-5">
              <DocsModuleInfo
                loginRole={loginRole}
                costCentre={moduleDocsList.costCentre}
                module={moduleDocsList.moduleName}
                employee={moduleDocsList.employeeName}
              />
              <DocsModuleList docsList={moduleDocsList.documents} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ModuleDocumentList;
