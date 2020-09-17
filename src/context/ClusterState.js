import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import ClusterReducer from '../reducers/ClusterReducer';
import {  toast } from "react-toastify";


const initial_state = {
  sportsNames: [],
  clusterLeaderNames: [],
  clusterList: [],
  getSingleCluster: [],
  getSingleCluster1: [],
  getClusterEmployees: [],
  salaryList: [],
  viewSalaryData: [],
  salaryStoreList:[]

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


  function selectEmployeeForCluster() {
    client.get('employee/view/IN1055/cluster_employees').then(function (response) {
      console.log("data==****>" + JSON.stringify(response));
      state.getClusterEmployees = response.data.data;
      console.log(JSON.stringify(state.getClusterEmployees))

      return dispatch({ type: 'FETCH_EMPLOYEE_FOR_CLUSTER', payload: state.getClusterEmployees });
    })
      .catch(function (error) {
        console.log(error);
      });

  }





  const viewSports = () => {

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
    client.get('cluster/' + id).then(function (response) {
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
    client.get('employee/view/IN1055/cluster_leader').then(function (response) {
      //    alert("Leaderes" + JSON.stringify(response));
      state.clusterLeaderNames = response.data.data;
      return dispatch({ type: 'FETCH_LEADERS_NAME', payload: state.clusterLeaderNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  // SALARY INPUT
  function viewSalary(month, year) {
    console.log(" in cluster" + month + " " + year)

    client.get('salary/view?month=' + month + '&year=' + year).then(function (response) {
      console.log("data==>" + JSON.stringify(response));
      console.log("data==>1", response);
      state.salaryList = response.data.data;

      return dispatch({ type: 'FETCH_SALARY_LIST', payload: state.salaryList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  // View Leave Data
  function viewSalaryData() {

    let empId1 = "DSI000035"
    client.get('salary/view' + empId1)
      .then((response) => {
        state.salaryList = response.data.data
        console.log("=====GET Leave Data API respone=====", state.salaryList)
        return dispatch({ type: 'FETCH_LEAVE_DATA_LIST', payload: state.salaryList })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Edit Salary

  function salaryEdit(salaryEdit) {
    console.log("salary edit api response", salaryEdit)
    return client.put('salary/update', salaryEdit)
      .then((response) => {
        state.message = response.data.message
        state.month = response.data.data.month
        state.year = response.data.data.year
        toast.info(state.message)
        viewSalary(state.month, state.year)
        console.log("salary edit response", response.data.data)
        console.log("salary edit message", state.message)
        return (
          dispatch({ type: 'EDIT_SALARY', payload: state.salaryList })
        )
      })
      .catch((error) => {
        console.log(error)
      })


  }

// View Admin Salary Input 

const viewStoreSalary = (month, year) => {
  console.log(" in cluster" + month + " " + year)
  let storeId = 'IN1055'

  client.get('salary/view/store?month=' + month + '&storeId=' + storeId + '&year=' + year)
  .then((response) => {
    console.log("slary data on store id", response);
    state.salaryStoreList = response.data.data;

    return dispatch({ type: 'FETCH_SALARY_STORE_LIST', payload: state.salaryStoreList });
  })
    .catch((error) => {
      console.log(error);
    });
}
//Approval salary input from admin

const salaryApproval = (salaryData) => {
  console.log("++++update salary approval api response+++++", salaryData)
  return client.put('salary/approve',salaryData)
    .then((response) => {
      state.message = response.data.message
      toast.info(state.message)
      console.log("salary approval list response===>", response.data.data)
      console.log("salary approval list message===>", state.message)
      return (
      dispatch({ type: 'SALARY_APPRROVAL_LIST', payload: state.salaryStoreList })
      )
    })
    .catch((error) => {
      console.log(error)
    })
}

  return (<ClusterContext.Provider value={{
    addCluster,
    viewSports,
    selectClusterLeader,
    viewCluster,
    getCluster,
    updateCluster,
    selectEmployeeForCluster,
    viewSalary,
    viewSalaryData,
    salaryEdit,
    viewStoreSalary,
    salaryApproval,
    getSingleCluster1: state.getSingleCluster1,
    clusterList: state.clusterList,
    clusterLeaderNames: state.clusterLeaderNames,
    sportsNames: state.sportsNames,
    getSingleCluster: state.getSingleCluster,
    getClusterEmployees: state.getClusterEmployees,
    salaryList: state.salaryList,
    viewSalaryData: state.viewSalaryData,
    salaryStoreList: state.salaryStoreList
  }}>
    {children}
  </ClusterContext.Provider>);
}
