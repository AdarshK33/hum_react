import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import ClusterReducer from '../reducers/ClusterReducer';


const initial_state = {
  sportsNames:[],
  clusterLeaderNames:[],
  clusterList:[],
  getSingleCluster:[],
  getSingleCluster1:[],
}


export const ClusterContext = createContext();
export const ClusterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClusterReducer, initial_state);
 // ADD SHIFT

 function addCluster(addCluster) {
    return client.post("cluster/create", addCluster)

  }

  function updateCluster(updateCluter) {
    return client.put("cluster/update", updateCluter)
  }

  function viewCluster() {
   // alert("called");
    client.get('cluster/view').then(function (response) {
    //  console.log("data==>" + JSON.stringify(response));
      state.clusterList = response.data.data;
      console.log(JSON.stringify(state.clusterList))
    
      return dispatch({ type: 'FETCH_ClUSTER_LIST', payload: state.clusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }





 

  const viewSports=()=> {
      
    client.get('sport/view').then(function (response) {
      // console.log("data==>" + JSON.stringify(response));
      state.sportsNames = response.data.data;

     // alert("---"+state.sportsNames)
      return dispatch({ type: 'FETCH_SPORTS_NAME', payload: state.sportsNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

 

  function getCluster(id) {
   
   // alert("cluster" + id)
    client.get('cluster/'+id).then(function (response) {
    //  console.log("data==Clusteer>" + JSON.stringify(response));
       state.getSingleCluster = response.data.data; 
       console.log(JSON.stringify(state.getSingleCluster));
       state.getSingleCluster1 = response.data.data.sports  
      //  alert(JSON.stringify(state.getSingleCluster1));
      return dispatch({ type: 'GET_SINGLE_CLUSTER', payload: state.getSingleCluster });

    })
      .catch(function (error) {
        console.log(error);
      });
      viewCluster();
  };





  function selectClusterLeader() {        
    client.get('employee/view/IN1055').then(function (response) {
    // alert("Leaderes" + JSON.stringify(response));
    state.clusterLeaderNames = response.data.data;
    return dispatch({ type: 'FETCH_LEADERS_NAME', payload: state.clusterLeaderNames });
  })
    .catch(function (error) {
      console.log(error);
    });
}






  return (<ClusterContext.Provider value={{
    addCluster,
    viewSports,
    selectClusterLeader,
    viewCluster,  
    getCluster, 
    updateCluster,
    getSingleCluster1:state.getSingleCluster1,
    clusterList:state.clusterList, 
    clusterLeaderNames:state.clusterLeaderNames,
    sportsNames: state.sportsNames,
    getSingleCluster:state.getSingleCluster
  }}>
    {children}
  </ClusterContext.Provider>);
}
