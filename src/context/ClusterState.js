import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import ClusterReducer from '../reducers/ClusterReducer';
const baseUrl = "http://humine.theretailinsights.co/";


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
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk5Mzk1ODU1LCJpYXQiOjE1OTkzNTk4NTV9.o5uoyF4LAaDLTewBjoPma7tI3uGexynaP1_D1nOxtJA'
  }
 // ADD SHIFT

 function addCluster(addCluster) {
    return axios.post(baseUrl + "cluster/create", addCluster, {
      headers: headers
    })

  }

  function updateCluster(updateCluter) {
    return axios.put(baseUrl + "cluster/update", updateCluter, {
      headers: headers
    })
  }

  function viewCluster() {
   // alert("called");
    axios.get(baseUrl + 'cluster/view', {
      headers: headers
    }).then(function (response) {
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
      
    axios.get(baseUrl + 'sport/view', {
      headers: headers
    }).then(function (response) {
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
   
    alert("cluster" + id)
    axios.get(baseUrl + 'cluster/'+id, {
      headers: headers
    }).then(function (response) {
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
    axios.get(baseUrl + 'employee/view/IN1055', {
      headers: headers
  }).then(function (response) {
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
