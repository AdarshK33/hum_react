import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import StoreProductReducer from '../reducers/StoreProductReducer';
import { toast } from "react-toastify";



const initial_state = {
  storeProductList: [],
  StateData: [],
  NewTarget: [],
  editTarget: [],
  updateTargetList: [],
  storeLeaderProductList: []

}



export const StoreProductContext = createContext();
export const StoreProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreProductReducer, initial_state);



  function viewStoreProduct() {

    client.get('/store/view').then(function (response) {

      state.storeProductList = response.data.data;

      return dispatch({ type: 'FETCH_STOREPRODUCTTARGET_LIST', payload: state.storeProductList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getStateData(store) {

    client.get('/cost_centre/view/' + store).then(function (response) {

      state.StateData = response.data.data;

      return dispatch({ type: 'FETCH_STATEDATA_LIST', payload: state.StateData });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editTargetHandler(id) {
    client.get('/store/' + id).then(function (response) {

      state.editTarget = response.data.data;

      return dispatch({ type: 'FETCH_VIEWTARGET_LIST', payload: state.editTarget });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const addTarget = (values) => {

    return client.post('/store/create', values)
      .then((response) => {

        toast.info(response.data.message);
        viewStoreProduct();
        LeaderTargetList(values.costCenter);
        return (
          dispatch({ type: 'ADD_NEW_TARGET', payload: state.NewTarget })
        )
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const UpdateTarget = (Target) => {

    return client.post('/store/update', Target)
      .then((response) => {
        toast.info(response.data.message);
        viewStoreProduct();
        LeaderTargetList(Target.costCenter);
        return (
          dispatch({ type: 'EDIT_TARGET', payload: state.updateTargetList }))

      })
      .catch((error) => {
        console.log(error)
      })


  }


  const LeaderTargetList = (storeId) => {

    return client.get('/store/view/' + storeId)
      .then((response) => {
        state.storeLeaderProductList = response.data.data;

        return dispatch({ type: 'FETCH_STORELEADERPRODUCTTARGET_LIST', payload: state.storeLeaderProductList });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (<StoreProductContext.Provider value={{
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
    storeLeaderProductList: state.storeLeaderProductList
  }}>
    {children}
  </StoreProductContext.Provider>);
}