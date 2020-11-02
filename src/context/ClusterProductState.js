import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import ClusterProductReducer from '../reducers/ClusterProductReducer';
import { toast } from "react-toastify";



const initial_state = {
  clusterProductList: [],
  leaderClusterProductList: [],
  clusterList: [],
  NewTarget: [],
  singleClusterTarget: [],
  leaderClusterList: []
}


export const ClusterProductContext = createContext();
export const ClusterProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClusterProductReducer, initial_state);


  const viewClusterList = (id) => {

    client.get('/cluster/view/' + id).then((response) => {
      console.log("==========List of Clusters==============");
      console.log(response.data.data);
      console.log("==========List of Clusters==============");
      state.clusterList = response.data.data;

      return dispatch({ type: 'FETCH_CLUSTER_LIST', payload: state.clusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const viewLeaderClusterList = () => {

    client.get('/cluster/view/').then((response) => {
      console.log("==========List of Clusters==============");
      console.log(response.data.data);
      console.log("==========List of Clusters==============");
      state.leaderClusterList = response.data.data;

      return dispatch({ type: 'FETCH_LEADER_CLUSTER_LIST', payload: state.leaderClusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }




  function viewClusterTarget() {

    client.get('/cluster/product_target/view').then(function (response) {

      state.clusterProductList = response.data.data;
      return dispatch({ type: 'FETCH_CLUSTERPRODUCTTARGET_LIST', payload: state.clusterProductList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  function viewLeaderClusterTarget(id) {

    client.get('/cluster/product_target/view/' + id).then(function (response) {
      console.log("============NAV==============");
      console.log(id);
      console.log(response.data.data);
      state.leaderClusterProductList = response.data.data;
      return dispatch({ type: 'FETCH_LEADERCLUSTERPRODUCTTARGET_LIST', payload: state.leaderClusterProductList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }



  function viewSingleClusterTarget(id) {
    client.get('/cluster/product_target/' + id).then(function (response) {

      // console.log("========Single Cluster==========")
      //  console.log(response.data.data)
      //  console.log("========Single Cluster==========")

      state.singleClusterTarget = response.data.data;
      return dispatch({ type: 'VIEW_SINGLE_CLUSTER_TARGET', payload: state.singleClusterTarget });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  const addTarget = (values) => {
    return client.post('/cluster/product_target/create', values)
      .then((response) => {
        toast.info(response.data.message);
        viewClusterTarget();
        viewLeaderClusterTarget(values.storeName);
        return (
          dispatch({ type: 'ADD_NEW_TARGET', payload: state.NewTarget })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }


  //Edit target
  const editTarget = (values) => {

    return client.post('/cluster/product_target/update', values)
      .then((response) => {
        toast.info(response.data.message)
        viewClusterTarget();
        viewLeaderClusterTarget(values.storeName);
        return (
          dispatch({ type: 'EDIT_TARGET', payload: state.clusterList })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (<ClusterProductContext.Provider value={{
    viewClusterList,
    viewClusterTarget,
    addTarget,
    editTarget,
    viewSingleClusterTarget,
    viewLeaderClusterTarget,
    viewLeaderClusterList,

    singleClusterTarget: state.singleClusterTarget,
    clusterList: state.clusterList,
    clusterProductList: state.clusterProductList,
    leaderClusterProductList: state.leaderClusterProductList,
    leaderClusterList: state.leaderClusterList

  }}>
    {children}
  </ClusterProductContext.Provider>);
}
