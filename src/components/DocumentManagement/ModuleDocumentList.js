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

  console.log("moduleDocsList",moduleDocsList);
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
                costCentre={moduleDocsList!==null&&moduleDocsList!==undefined&& Object.keys(moduleDocsList).length!==0?moduleDocsList[0].costCentre:null}
                module={moduleDocsList!==null&&moduleDocsList!==undefined&& Object.keys(moduleDocsList).length!==0?moduleDocsList[0].moduleName:null}
                employee={moduleDocsList!==null&&moduleDocsList!==undefined&& Object.keys(moduleDocsList).length!==0?moduleDocsList[0].employeeName:null}
              />
              <DocsModuleList docsList={moduleDocsList} EmployeeId={moduleDocsList!==null&&moduleDocsList!==undefined&& Object.keys(moduleDocsList).length!==0?moduleDocsList[0].employeeId:null}/>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ModuleDocumentList;
