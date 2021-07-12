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
};

export const TransferContext = createContext();

export const TransferProvider = (props) => {
  const [state, dispatch] = useReducer(TransferReducer, initialState);
  const [loader, setLoader] = useState(false);

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

  const getDepartmentDetails = () => {
    setLoader(true);
    client
      .get("/api/v1/department/view")
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

  const getCostCentreDetails = () => {
    setLoader(true);
    client
      .get("/api/v1/cost_centre/view")
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
      .get(`/api/v1/employee/view/${costCentreId}/managers`)
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
      .get(`/api/v1/location/view/${costCentreId}`)
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

  const createTransferInitiation = (initiationData) => {
    setLoader(true);
    client
      .post("/api/v1/transfer/create", initiationData)
      .then((response) => {
        setLoader(false);
        toast.info(response.data.message);
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
      }}
    >
      {props.children}
    </TransferContext.Provider>
  );
};
