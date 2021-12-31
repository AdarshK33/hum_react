import React, { createContext, useReducer, useState } from "react";
import DocumentUploadReducer from "../reducers/DocumentUploadReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initialState = {
    documentUploadData: {},
    employeeProfileData: {},
};

export const DocumentUploadContext = createContext();

export const DocumentUploadProvider = (props) => {
  const [state, dispatch] = useReducer(DocumentUploadReducer, initialState);
  const [loader, setLoader] = useState(false);

  const getDocumentUpload = (moduleName,file) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file, file.name);
    client
      .post(
        "/api/v1/admin/uploads/upload?moduleName=" + moduleName,formData)
      .then((response) => {
        console.log(response, "reponse excel");
        setLoader(false);
        ViewEmployeeUpload()
         state.documentUploadData =response.data.data
        return dispatch({
          type: "DOCUMENT_UPLOAD_LIST",
          payload: state.documentUploadData,
        });
      })
      .catch(() => {
        setLoader(false);
        toast.error(`No data found`);
      });
  };

  const ViewEmployeeUpload = () => {
    setLoader(true);
    client
      .get("/api/v1/admin/uploads/view")
      .then((response) => {
        console.log(response,"ViewEmployeeUpload")
        state.employeeUploadData = response.data.data;
        setLoader(false);
        console.log("employee profile", response);

        return dispatch({
          type: "EMPLOYEE_UPLOAD",
          payload: state.employeeUploadData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DocumentUploadContext.Provider
      value={{
        loader,
        getDocumentUpload,
        ViewEmployeeUpload,
        documentUploadData:state.documentUploadData,
        employeeUploadData:state.employeeUploadData
      }}
    >
      {props.children}
    </DocumentUploadContext.Provider>
  );
};
