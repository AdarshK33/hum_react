import React, { useReducer, createContext, useState } from "react";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import DocumentManagementReducer from "../reducers/DocumentManagementReducer";

const initialState = {
  moduleList: [],
};

export const DocumentManagementContext = createContext();

export const DocumentManagementProvider = (props) => {
  const [state, dispatch] = useReducer(DocumentManagementReducer, initialState);
  const [loader, setLoader] = useState(false);

  const getModuleList = () => {
    setLoader(true);
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
        setLoader(false);
        return dispatch({
          type: "FETCH_MODULES_LIST_ERR",
        });
      });
  };

  return (
    <DocumentManagementContext.Provider
      value={{
        loader,
        getModuleList,
        moduleList: state.moduleList,
      }}
    >
      {props.children}
    </DocumentManagementContext.Provider>
  );
};
