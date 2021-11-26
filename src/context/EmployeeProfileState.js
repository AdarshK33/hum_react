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
  documentsList: [],
  insuranceData: [],
  otherDocumentsList: [],
};

export const EmployeeProfileContext = createContext();

export const EmployeeProfileProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [letterShow, setLetterShow] = useState(false);
  const [state, dispatch] = useReducer(EmployeeProfileReducer, initial_state);

  const SetLetterView = (val) => {
    setLetterShow(val);
  };
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
  const UpdateEmployeeProfile = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/employee", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "PROFILE_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateHolidayWorkingBonus = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/holiday", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadFile = (fileInfo) => {
    console.log("uploadFile state", fileInfo);
    const photoFile = fileInfo.file;
    const formData = new FormData();
    formData.append("file", photoFile, photoFile.name);
    formData.append("employeeId", fileInfo.employeeId);
    formData.append("fileType", fileInfo.fileType);
    console.log("uploadFile", photoFile);
    return client
      .post("/api/v1/employee/profile/upload", formData)
      .then((response) => {
        console.log(response, "res uploadFile");
        toast.info(response.data.message);
        DocumentView();
      })
      .catch((error) => {
        // toast.info("Please upload a valid file");
        console.log(error);
      });
  };

  const uploadOtherFiles = (fileInfo) => {
    console.log("uploadFile state", fileInfo);
    const photoFile = fileInfo.file;
    const formData = new FormData();
    formData.append("file", photoFile, photoFile.name);
    formData.append("employeeId", fileInfo.employeeId);
    formData.append("fileName", fileInfo.fileName);
    console.log("uploadFile", photoFile);
    return client
      .post("/api/v1/employee/profile/upload/other", formData)
      .then((response) => {
        console.log(response, "res uploadFile");
        toast.info(response.data.message);
        OtherDocumentView();
      })
      .catch((error) => {
        // toast.info("Please upload a valid file");
        console.log(error);
      });
  };
  const DocumentView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/employee/document")
      .then((response) => {
        state.documentsList = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "DOCUMENTS_VIEW",
          payload: state.documentsList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OtherDocumentView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/employee/other/document")
      .then((response) => {
        state.otherDocumentsList = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "OTHER_DOCUMENTS_VIEW",
          payload: state.otherDocumentsList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InsuranceView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/insurance")
      .then((response) => {
        state.insuranceData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "INSURANCE_VIEW",
          payload: state.insuranceData,
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
        UpdateEmployeeProfile,
        BankUpdate,
        UpdateAddress,
        DocumentView,
        SetLetterView,
        uploadFile,
        uploadOtherFiles,
        UpdateHolidayWorkingBonus,
        InsuranceView,
        OtherDocumentView,
        otherDocumentsList: state.otherDocumentsList,
        insuranceData: state.insuranceData,
        letterShow: letterShow,
        documentsList: state.documentsList,
        costCentreSplitData: state.costCentreSplitData,
        remunerationData: state.remunerationData,
        bankViewData: state.bankViewData,
        addressViewData: state.addressViewData,
        emergencyContactView: state.emergencyContactView,
        emergencyUpdate: state.emergencyUpdate,
        loader: loader,
      }}
    >
      {children}
    </EmployeeProfileContext.Provider>
  );
};
