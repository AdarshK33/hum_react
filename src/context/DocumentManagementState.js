import React, { useReducer, createContext, useState } from "react";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import DocumentManagementReducer from "../reducers/DocumentManagementReducer";
var fileDownload = require("js-file-download");

const initialState = {
  moduleList: [],
  loginRole: "",
  moduleDocsList: [],
  docsStatus: false,
  documentEmployeeData:[]
};

export const DocumentManagementContext = createContext();

export const DocumentManagementProvider = (props) => {
  const [state, dispatch] = useReducer(DocumentManagementReducer, initialState);
  const [loader, setLoader] = useState(false);

  const changeDocsStatus = () => {
    return dispatch({
      type: "CHANGE_DOCS_STATUS",
    });
  };

  const getLoginRole = (user) => {
    let userRole = "";
    const loginType = parseInt(user.loginType);
    const additionalRole = parseInt(user.additionalRole);

    if (localStorage.getItem("type")=== "admin") {
      userRole = "Admin";
    } else if (localStorage.getItem("type")=== "profile") {
      userRole = "Employee";
    } else if (
      localStorage.getItem("loginRole")=== "superCostCenterManager"
    ) {
      userRole = "SuperCostCentreManager";
    } else if (
      localStorage.getItem("loginRole")=== "costCenterManager"
    ) {
      userRole = "CostCentreManager";
    } else if (localStorage.getItem("loginRole")=== "manager") {
      userRole = "Manager";
    } else {
      userRole = "";
    }

    return dispatch({
      type: "GET_LOGIN_ROLE",
      payload: userRole,
    });
  };

  const documentEmployeeList = (costData) => {
    client
      .get(
        "/api/v1/employee/view/costCentre/employee?costCentre=" + costData)
      .then((response) => {
        state.documentEmployeeData = response.data.data;
        if (response.data.data === null) {
          state.documentEmployeeData = [];
        } else {
          state.documentEmployeeData = response.data.data;
        }
        console.log("employee id data", state.documentEmployeeData);
        return dispatch({
          type: "DOCUMENT_EMPLOYEE_DATA",
          payload: state.documentEmployeeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getModuleList = () => {
    // setLoader(truee);
    client
      .get("/api/v1/document/modules")
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_MODULES_LIST",
          payload: response.data.data,
        });
      })
      .catch(() => {
        // setLoader(false);
        return dispatch({
          type: "FETCH_MODULES_LIST_ERR",
        });
      });
  };

  const getModuleDocuments = (apiInfo) => {
    setLoader(true);
    client
      .post("/api/v1/document", apiInfo)
      .then((response) => {
        setLoader(false);
        toast.info(response.data.message);
        return dispatch({
          type: "FETCH_MODULES_DOCS",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_MODULES_DOCS_ERR",
        });
      });
  };

  const downloadModuleDoc = (empId,docName) => {
    client
      .get(`/api/v1/document/download/${empId}?name=${docName}`, {
        responseType: "blob",
      })
      .then((response) => {
        fileDownload(response.data, docName);
        return true;
      })
      .catch(() => {
        console.log("Error");
      });
  };

  return (
    <DocumentManagementContext.Provider
      value={{
        changeDocsStatus,
        loader,
        getModuleList,
        moduleList: state.moduleList,
        getLoginRole,
        loginRole: state.loginRole,
        getModuleDocuments,
        moduleDocsList: state.moduleDocsList,
        docsStatus: state.docsStatus,
        downloadModuleDoc,
        documentEmployeeList,
        documentEmployeeData:state.documentEmployeeData 
      }}
    >
      {props.children}
    </DocumentManagementContext.Provider>
  );
};
