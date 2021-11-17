import React, { createContext, useReducer, useContext, useState } from "react";
import EmployeeProfileReducer from "../reducers/EmployeeProfileReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  addressViewData: [],
  emergencyContactView: [],
  bankViewData: [],
  remunerationData: [],
  costCentreSplitData: [],
  emergencyUpdate: [],
};

export const EmployeeProfileContext = createContext();

export const EmployeeProfileProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [approvalsLoader, setApprovalsLoader] = useState(false);
  const [rosterLoader, setRosterLoader] = useState(false);
  const [clusterLoader, setClusterLoader] = useState(false);
  const [letterShow, setLetterShow] = useState(false);
  const [state, dispatch] = useReducer(EmployeeProfileReducer, initial_state);

  const addressView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/address")
      .then((response) => {
        state.addressViewData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "ADDRESS_VIEW",
          payload: state.addressViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/emergency/contact")
      .then((response) => {
        state.emergencyContactView = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "EMERGENCY_CONTACT_VIEW",
          payload: state.emergencyContactView,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bankView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/bank")
      .then((response) => {
        state.bankViewData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "BANK",
          payload: state.bankViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RemunerationView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/remuneration")
      .then((response) => {
        state.remunerationData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "REMUNERATION_VIEW",
          payload: state.remunerationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CostCentreSplitView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/cost-centre-split")
      .then((response) => {
        state.costCentreSplitData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "COST_CENTRE_SPLIT",
          payload: state.costCentreSplitData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EmergencyContactUpdate = (updateData) => {
    setLoader(true);
    return client
      .post("/api/v1/employee/profile/update/emergency", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "EMERGENCY_CONTACT_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BankUpdate = (updateData) => {
    setLoader(true);
    return client
      .post("/api/v1/employee/profile/update/bank", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "BANK_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateAddress = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/address", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "ADDRESS_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <EmployeeProfileContext.Provider
      value={{
        addressView,
        EmergencyContactView,
        bankView,
        RemunerationView,
        CostCentreSplitView,
        EmergencyContactUpdate,
        BankUpdate,
        UpdateAddress,
        costCentreSplitData: state.costCentreSplitData,
        remunerationData: state.remunerationData,
        bankViewData: state.bankViewData,
        addressViewData: state.addressViewData,
        emergencyContactView: state.emergencyContactView,
        emergencyUpdate: state.emergencyUpdate,
      }}
    >
      {children}
    </EmployeeProfileContext.Provider>
  );
};
