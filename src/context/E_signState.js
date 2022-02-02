import React, { createContext, useReducer, useContext, useState } from "react";
import E_signReducer from "../reducers/E_signReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
const initial_state = {
  uploadResponse: [],
  referenceResponse: [],
};

export const E_signContext = createContext();

export const E_signProvider = ({ children }) => {
  const [state, dispatch] = useReducer(E_signReducer, initial_state);
  const [letterShow, setLetterShow] = useState(false);
  const [EsignLoader, setLoader] = useState(false);
  const [showinfo, setShowInfo] = useState(false);
  const settingInfo = (val) => {
    setShowInfo(val);
  };
  const UploadEsignDoc = (data, eSignDetails, blob) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", blob, blob.name);
    formData.append("data", JSON.stringify(data));
    formData.append("eSignDetails", JSON.stringify(eSignDetails));

    console.log("blob", blob);
    console.log("data", data);
    console.log("eSignDetails", eSignDetails);
    console.log("formData", formData);
    client
      .post("/api/v1/e-sign/initiateTest", formData)
      .then((response) => {
        state.uploadResponse = response.data;
        console.log("uploadResponse", response);
        console.log("uploadResponse.data", response.data.requests[0]);
        //toast.info(response.data.message);
        if (
          response.data &&
          response.data.requests[0] &&
          response.data.requests[0].refId
        ) {
          getReference(parseInt(response.data.requests[0].refId));
        }
        setLoader(false);
        // setSaveTheLetter(true);
        settingInfo(true);
        return dispatch({
          type: "UPLOAD_ESIGN",
          payload: state.uploadResponse,
        });
      })
      .catch((error) => {
        settingInfo(false);
        console.log(error);
      });
  };

  const getReference = (id, orgId = "6180cd3596d65ededc7d30f6") => {
    setLoader(true);
    client
      .get("/api/v1/e-sign/reference/" + orgId + "/" + id)
      .then((response) => {
        console.log("-->>>", response);
        state.referenceResponse = response.data;
        //toast.info(response.data.message);
        console.log("response.data", JSON.parse(response.data));
        setLoader(false);
        return dispatch({
          type: "REFERENCE_CHECK",
          payload: state.referenceResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <E_signContext.Provider
      value={{
        UploadEsignDoc,
        getReference,
        settingInfo,
        uploadResponse: state.uploadResponse,
        referenceResponse: state.referenceResponse,
        showinfo: showinfo,
        EsignLoader: EsignLoader,
      }}
    >
      {children}
    </E_signContext.Provider>
  );
};
