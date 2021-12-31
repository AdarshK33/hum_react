import React, { createContext, useReducer, useState } from "react";
import DocumentUploadReducer from "../reducers/DocumentUploadReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initialState = {
    documentUploadData: {},
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
        var documentUploadData =response.data.data
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



  return (
    <DocumentUploadContext.Provider
      value={{
        loader,
        getDocumentUpload,
        documentUploadData:state.documentUploadData,
      }}
    >
      {props.children}
    </DocumentUploadContext.Provider>
  );
};
