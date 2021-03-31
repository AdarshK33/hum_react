import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DocsVerificationReducer from "../reducers/DocVerificationReducer";
import { toast } from "react-toastify";

const initial_state = {
  docsToVerify: [],
};
export const DocsVerifyContext = createContext();
export const DocsVerificationProvider = (props) => {
  const [state, dispatch] = useReducer(DocsVerificationReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const verificationDocsView = () => {
    console.log("in state");
    setLoader(true);
    client
      .get("/api/v1/candidate/document")
      .then((response) => {
        console.log("response", response);
        state.docsToVerify = response.data.data;
        console.log("Documents", response.data.data);
        setLoader(false);

        return dispatch({
          type: "DOCUMENSTS_TO_VERIFY",
          payload: state.docsToVerify,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DocsVerifyContext.Provider
      value={{ verificationDocsView, docsToVerify: state.docsToVerify }}
    >
      {" "}
      {props.children}
    </DocsVerifyContext.Provider>
  );
};
