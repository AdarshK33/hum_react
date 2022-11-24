import React, { createContext, useReducer, useState } from "react";
import DocumentUploadReducer from "../reducers/DocumentUploadReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import moment from "moment";
import { saveAs } from "file-saver";

const initialState = {
    documentUploadData: {},
    employeeProfileData: {},
    downloadDocumentUploadData:{}
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
        toast.info(response.data.message);
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

  const downloadDocumentUpload = (formData,documentName) => {
    console.log(documentName,formData,"downloadDocumentUpload")
    setLoader(true);
    // let formData = {
    // "fromDate":moment(new Date(fromDate)).format("YYYY-MM-DD"),
    // "moduleName":moduleName - 1,
    // "toDate": moment(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)).format("YYYY-MM-DD") 
    // }
    console.log(formData,"formDataDocument")
    client
      .post(
        "/api/v1/admin/uploads/download",formData,{
          responseType: "arraybuffer",
        })
      .then((response) => {
        console.log(response, "reponse excel");
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        
        const fileName = `${documentName}.xls`;
        saveAs(blob, fileName);
        toast.info(response.data.message);
        setLoader(false);
         state.downloadDocumentUploadData =response.data.data
        return dispatch({
          type: "DOWNLOAD_DOCUMENT_UPLOAD",
          payload: state.downloadDocumentUploadData,
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
       downloadDocumentUpload,
        documentUploadData:state.documentUploadData,
        employeeUploadData:state.employeeUploadData,
        downloadDocumentUploadData:state.downloadDocumentUploadData
      }}
    >
      {props.children}
    </DocumentUploadContext.Provider>
  );
};
