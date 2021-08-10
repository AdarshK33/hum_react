import React, { useReducer, createContext, useState } from "react";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import InsuranceReducer from "../reducers/InsuranceReducer";

const initialState = {
  insuranceList: [],
  total: 0,
  actionStatus: false,
  insuranceDetails: {},
};

export const InsuranceContext = createContext();

export const InsuranceProvider = (props) => {
  const [state, dispatch] = useReducer(InsuranceReducer, initialState);
  const [loader, setLoader] = useState(false);

  const changeActionStatus = () => {
    return dispatch({
      type: "CHANGE_ACTION_STATUS",
    });
  };

  const getInsuranceList = (apiUrl) => {
    setLoader(true);
    client
      .get(apiUrl)
      .then((response) => {
        setLoader(false);
        // toast.info(response.data.message);
        return dispatch({
          type: "FETCH_INSURANCE_LIST",
          payload: response.data.data.data,
          total: response.data.data.total,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_INSURANCE_LIST_ERR",
        });
      });
  };

  const createInsuranceNomination = (apiInfo) => {
    setLoader(true);
    client
      .post("/api/v1/insurance/create", apiInfo)
      .then((response) => {
        setLoader(false);
        // toast.info(response.data.message);
        return dispatch({
          type: "CREATE_INSURANCE",
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "CREATE_INSURANCE_ERR",
        });
      });
  };

  const getInsuranceNominationDetails = (insuranceNominationId) => {
    setLoader(true);
    client
      .get(`/api/v1/insurance/view/${insuranceNominationId}`)
      .then((response) => {
        setLoader(false);
        // toast.info(response.data.message);
        return dispatch({
          type: "FETCH_INSURANCE_DETAILS",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_INSURANCE_DETAILS_ERR",
        });
      });
  };

  const exportInsuranceNominations = () => {
    // setLoader(true);
    client
      .get("/api/v1/insurance/download", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        // setLoader(false);
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var fileName = "Insurance-Nominations.xlsx";
        saveAs(blob, fileName);
        toast.info("Insurance nominations exported successfully!");
        return true;
      })
      .catch(() => {
        // setLoader(false);
        console.log("Error");
        toast.error("No data found");
      });
  };

  return (
    <InsuranceContext.Provider
      value={{
        changeActionStatus,
        getInsuranceList,
        insuranceList: state.insuranceList,
        loader,
        total: state.total,
        actionStatus: state.actionStatus,
        createInsuranceNomination,
        getInsuranceNominationDetails,
        insuranceDetails: state.insuranceDetails,
        exportInsuranceNominations,
      }}
    >
      {props.children}
    </InsuranceContext.Provider>
  );
};
