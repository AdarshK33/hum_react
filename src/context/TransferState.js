import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import TransferReducer from "../reducers/TransferReducer";

const initialState = {
  transferList: [],
  total: 0,
  initiationEmpData: {},
  deptData: [],
  deptPositionData: [],
  costCentreData: [],
  costCentreManagersData: [],
  costCentreLocationData: {},
  initiationStatus: false,
  initiationTransferId: "",
  transferData: {},
  TRANSFERtype: "Regular Transfer",
  offerLetterData: {},
  countryDetails: [],
  designationDetails: [],
  regularResponse: ""
};

export const TransferContext = createContext();

export const TransferProvider = (props) => {
  const [state, dispatch] = useReducer(TransferReducer, initialState);
  const [loader, setLoader] = useState(false);
  const [letterView, setLetterView] = useState(false);
  const chnageTransferType = (val) => {
    console.log("changeInTransferType->", val);
    return dispatch({
      type: "TRANSFR_TYPE_CHANGE",
      payload: val,
    });
  };
  const setLetterViewing = (val) => {
    setLetterView(val);
  };
  const getTransferList = (apiUrl) => {
    setLoader(true);
    client
      .get(apiUrl)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_TRANSFER_LIST",
          payload: response.data.data.data,
          total: response.data.data.total,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_TRANSFER_LIST_ERR",
        });
      });
  };

  const getTransferInitiationEmpData = (empID) => {
    setLoader(true);
    client
      .get(`/api/v1/transfer/search?key=${empID}`)
      .then((response) => {
        setLoader(false);
        toast.info(response.data.message);
        return dispatch({
          type: "FETCH_INITIATION_EMP_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_INITIATION_EMP_DATA_ERR",
        });
      });
  };
  const getDepartmentDetails = (companyName) => {
    setLoader(true);
    client
      .get("/api/v1/department/view/company?company="+companyName)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_DEPT_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_DEPT_DATA_ERR",
        });
      });
  };

  const getDeptPositionDetails = (deptId) => {
    setLoader(true);
    client
      .get(`/api/v1/position/view/deptId?deptId=${deptId}`)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_DEPT_POSITION_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_DEPT_POSITION_DATA_ERR",
        });
      });
  };

  const getCostCentreDetails = (entity, dept) => {
    setLoader(true);
    entity = entity === "DSI" ? "Decathlon Sports India Pvt Ltd" : entity;
    client

      .get(
        `/api/v1/cost_centre/view/${entity}/${dept}`
      )
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COST_CENTRE_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COST_CENTRE_DATA_ERR",
        });
      });
  };

  const getCostCentreManagersDetails = (costCentreId) => {
    setLoader(true);
    client

      .get("/api/v1/employee/view/managers/" + costCentreId)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COST_CENTRE_MANAGERS_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COST_CENTRE_MANAGERS_DATA_ERR",
        });
      });
  };

  const getCostCentreLocationDetails = (costCentreId) => {
    setLoader(true);
    client
      .get(`/api/v1/state/view`)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COST_CENTRE_LOCATION_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COST_CENTRE_LOCATION_DATA_ERR",
        });
      });
  };

  const createTransferInitiation = (initiationData,history) => {
    setLoader(true);
    client
      .post("/api/v1/transfer/create", initiationData)
      .then((response) => {
        setLoader(false);
        if(response.data.message == "Employee transfer already exist"){
          toast.error(response.data.message);
          history.push('/transfers')
        }else{
          toast.info(response.data.message);
        }
        if (
          response.data.data.transferId !== null &&
          response.data.data.transferId !== 0 &&
          response.data.data.transferId !== undefined
        ) {
          getTransferData(response.data.data.transferId);
        }
        return dispatch({
          type: "INITIATION_CREATE",
          transferId: response.data.data.transferId,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "INITIATION_CREATE_ERR",
        });
      });
  };

  const getTransferData = (transferId) => {
    setLoader(true);
    client
      .get(`/api/v1/transfer/view/transferId?transferId=${transferId}`)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_TRANSFER_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_TRANSFER_DATA_ERR",
        });
      });
  };
  const getApointmentLetter = (EmployeeId) => {
    setLoader(true);
    client
      .get("/api/v1/transfer/offer/" + EmployeeId)
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_APOINTMENT_LETTER_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        console.log("apointment letter api error");
      });
  };

  const getCountryDetails = () => {
    setLoader(true);
    client
      .get("/api/v1/country/view")
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COUNTRY_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_COUNTRY_DATA_ERR",
        });
      });
  };

  const getDesignationDetails = () => {
    setLoader(true);
    client
      .get("api/v1/designation/view")
      .then((response) => {
        setLoader(false);
        return dispatch({
          type: "FETCH_DESIGNATION_DATA",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_DESIGNATION_DATA_ERR",
        });
      });
  };

  const ExportPDFandUploadRegular = (
    file,
    employeeId,
   
  ) => {
    const photoFile = file;
    const formData = new FormData();
    formData.append("file", photoFile, photoFile.name);
    formData.append("employeeId", employeeId);
    // formData.append("fileType",fileType);  
      uploadRegularTransferForm(formData,employeeId)
      // current selected ID
  };

  const uploadRegularTransferForm = (formData,employeeId) => {
    console.log("base64...........", formData);
    return (
      client.post(`api/v1/transfer/upload?empId=${employeeId}`,formData)
        .then((response) => {
          console.log(response);
          state.regularResponse = response.data.data;
          return dispatch({ type: "REGULAR_BASE64_UPLOAD", payload: state.regularResponse });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  return (
    <TransferContext.Provider
      value={{
        getTransferList,
        transferList: state.transferList,
        loader,
        total: state.total,
        getTransferInitiationEmpData,
        initiationEmpData: state.initiationEmpData,
        getDepartmentDetails,
        deptDetails: state.deptData,
        getDeptPositionDetails,
        deptPositionData: state.deptPositionData,
        getCostCentreDetails,
        costCentreData: state.costCentreData,
        getCostCentreManagersDetails,
        costCentreManagersData: state.costCentreManagersData,
        getCostCentreLocationDetails,
        costCentreLocationData: state.costCentreLocationData,
        createTransferInitiation,
        initiationStatus: state.initiationStatus,
        getTransferData,
        transferData: state.transferData,
        initiationTransferId: state.initiationTransferId,
        TRANSFERtype: state.TRANSFERtype,
        chnageTransferType,
        getApointmentLetter,
        offerLetterData: state.offerLetterData,
        getCountryDetails,
        countryDetails: state.countryDetails,
        getDesignationDetails,
        designationDetails: state.designationDetails,
        setLetterViewing,
        letterView: letterView,
        uploadRegularTransferForm,
        ExportPDFandUploadRegular,
        regularResponse: state.regularResponse
      }}
    >
      {props.children}
    </TransferContext.Provider>
  );
};
