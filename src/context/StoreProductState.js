import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import StoreProductReducer from "../reducers/StoreProductReducer";
import { toast } from "react-toastify";

const initial_state = {
  storeProductList: [],
  StateData: [],
  NewTarget: [],
  editTarget: [],
  updateTargetList: [],
  storeLeaderProductList: [],
};

export const StoreProductContext = createContext();
export const StoreProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreProductReducer, initial_state);
  const [loader, setLoader] = useState(false);

  function viewStoreProduct() {
    setLoader(true);
    client
      .get("/api/v1/store/view")
      .then(function (response) {
        state.storeProductList = response.data.data;
        setLoader(false);
        return dispatch({
          type: "FETCH_STOREPRODUCTTARGET_LIST",
          payload: state.storeProductList,
          loader: loader,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getStateData(store) {
    client
      .get("/api/v1/cost_centre/view/" + store)
      .then(function (response) {
        state.StateData = response.data.data;

        return dispatch({
          type: "FETCH_STATEDATA_LIST",
          payload: state.StateData,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editTargetHandler(id) {
    client
      .get("/api/v1/store/" + id)
      .then(function (response) {
        state.editTarget = response.data.data;

        return dispatch({
          type: "FETCH_VIEWTARGET_LIST",
          payload: state.editTarget,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const addTarget = (values) => {
    return client
      .post("/api/v1/store/create", values)
      .then((response) => {
        toast.info(response.data.message);
        viewStoreProduct();
        LeaderTargetList(values.costCenter);
        return dispatch({ type: "ADD_NEW_TARGET", payload: state.NewTarget });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateTarget = (Target) => {
    return client
      .post("/api/v1/store/update", Target)
      .then((response) => {
        toast.info(response.data.message);
        viewStoreProduct();
        LeaderTargetList(Target.costCenter);
        return dispatch({
          type: "EDIT_TARGET",
          payload: state.updateTargetList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const LeaderTargetList = (storeId) => {
    setLoader(true);
    return client
      .get("/api/v1/store/view/" + storeId)
      .then((response) => {
        state.storeLeaderProductList = response.data.data;
        setLoader(false);
        return dispatch({
          type: "FETCH_STORELEADERPRODUCTTARGET_LIST",
          payload: state.storeLeaderProductList,
          loader: loader,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <StoreProductContext.Provider
      value={{
        viewStoreProduct,
        getStateData,
        addTarget,
        editTargetHandler,
        UpdateTarget,
        LeaderTargetList,
        storeProductList: state.storeProductList,
        StateData: state.StateData,
        NewTarget: state.NewTarget,
        editTarget: state.editTarget,
        updateTargetList: state.updateTargetList,
        storeLeaderProductList: state.storeLeaderProductList,
        loader: loader,
      }}
    >
      {children}
    </StoreProductContext.Provider>
  );
};
