import React, { createContext, useReducer, useContext } from 'react';
import { client } from '../utils/axios';
import ClusterReducer from '../reducers/ClusterReducer';
import { toast } from "react-toastify";
import { AppContext } from "../context/AppState";


const initial_state = {
  sportsNames: [],
  clusterLeaderNames: [],
  clusterList: [],
  getSingleCluster: [],
  getSingleCluster1: [],
  getClusterEmployees: [],
  salaryList: [],
  viewSalaryData: [],
  salaryStoreList: [],
  clusterCostCenterList: [],
  clusterAllLeaderNames: [],
  getEmployeesNames: [],
  adminClusterList: [],
  costCenterEmpAndMgrList: [],
  viewManagerByCostCenterList: [],
  callClusterEmployeesList: [],
  callClusterLeadersList: [],
  clusterCostCenter: {},
}


export const ClusterContext = createContext();
export const ClusterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClusterReducer, initial_state);
  const { user } = useContext(AppContext);
  // ADD SHIFT

  function addCluster(addCluster) {
    return client.post("cluster/create", addCluster)

  }

  const updateCluster = (updateCluter) => {
    return client.put("cluster/update", updateCluter).then(function (respone) {
      console.log("api response===", respone.data.message);
      viewCluster()
      toast.info(respone.data.message);

    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }

  const updateAdminEditCluster = (updateCluter) => {
    return client.put("cluster/update", updateCluter).then(function (respone) {
      const {
        clusterCostCenter: { costCenter },
      } = state;
      viewClusterCostCenter(costCenter)
      //  console.log("api response===", respone.data.message);
      toast.info(respone.data.message);

    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }






  function viewCluster() {
    client.get('cluster/view').then(function (response) {
      state.clusterList = response.data.data;
      // console.log("====CLUSTER LIST====")
      // console.log(JSON.stringify(state.clusterList))

      return dispatch({ type: 'FETCH_ClUSTER_LIST', payload: state.clusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  function selectEmployeeForCluster(storeId) {
    client.get('employee/view/' + storeId + '/cluster_employees').then(function (response) {
      if (response.data.data === null) {
        state.getClusterEmployees = []
      }
      else {
        state.getClusterEmployees = response.data.data;
      }
      return dispatch({ type: 'FETCH_EMPLOYEE_FOR_CLUSTER', payload: state.getClusterEmployees });
    })
      .catch(function (error) {
        console.log(error);
      });

  }





  const viewSports = () => {

    client.get('sport/view').then(function (response) {
      // console.log("data==>" + JSON.stringify(response));
      if (response.data.data === null) {
        state.sportsNames = []
      }
      else {
        state.sportsNames = response.data.data;
      }
      // alert("---"+state.sportsNames)
      return dispatch({ type: 'FETCH_SPORTS_NAME', payload: state.sportsNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }



  const getCluster = (id) => {
    client.get('cluster/' + id).then(function (response) {
      const getSingleCluster = response.data.data;
      const getSingleCluster1 = response.data.data.sports;
      const getEmployeesNames = response.data.data.employees;
      console.log("get single cluster " + JSON.stringify(state.getSingleCluster));
      // console.log("^^^^"+JSON.stringify(state.getSingleCluster1));
      return dispatch({
        type: 'GET_SINGLE_CLUSTER', payload: {
          getSingleCluster1,
          getSingleCluster,
          getEmployeesNames
        }
      })

    })
      .catch(function (error) {
        console.log(error);
      });
    viewCluster();
  };





  const selectClusterLeader = (storeId) => {
    //console.log("in cluster state", storeId)
    client.get('employee/view/' + storeId + '/cluster_leader').then(function (response) {
      //    alert("Leaderes" + JSON.stringify(response));
      state.clusterLeaderNames = response.data.data;
      return dispatch({ type: 'FETCH_LEADERS_NAME', payload: state.clusterLeaderNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  // EDIT CLUSTER LEADER NAMES

  const selectAllClusterLeaderForEdit = (storeId) => {
    client.get('employee/view/' + storeId).then(function (response) {
      state.clusterAllLeaderNames = response.data.data;
      return dispatch({ type: 'FETCH_ALL_LEADERS_NAME', payload: state.clusterAllLeaderNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }




  // SALARY INPUT
  function viewSalary(month, year, id) {
    console.log(" in cluster" + month + " " + year)

    client.get('salary/view?month=' + month + '&year=' + year + '&storeId=' + id)
      .then(function (response) {
        console.log("data message==>", response.data.message);
        console.log("data==>1", response);
        state.salaryList = response.data.data;
        if (response.data.data === null) {
          toast.info(response.data.message)
        }
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

  const viewStoreSalary = (month, costCentre, year) => {
    console.log(" in cluster" + month + " " + costCentre + '' + year)

    client.get('salary/view/store?month=' + month + '&storeId=' + costCentre + '&year=' + year)
      .then((response) => {
        console.log("slary data on store id", response);
        state.salaryStoreList = response.data.data;
        if (response.data.data === null) {
          toast.info(response.data.message)
        }

        return dispatch({ type: 'FETCH_SALARY_STORE_LIST', payload: state.salaryStoreList });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Approval salary input from admin

  const salaryApproval = (salaryData) => {
    console.log("++++update salary approval api response+++++", salaryData)
    return client.put('salary/approve', salaryData)
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
  //view cluster by coster center
  const viewClusterCostCenter = (costCenter) => {

    return client.get('cluster/view/' + costCenter)
      .then((response) => {
        const clusterCostCenterList = response.data.data
        const clusterCostCenter = { costCenter }
        console.log("cluster based on cost center list", state.clusterCostCenterList)
        console.log("cluster based on cost center message", response.data.message)
        return dispatch({
          type: 'CLUSTER_COST_CENTER', payload: {
            clusterCostCenterList,
            clusterCostCenter,

          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const viewClusterForAdmin = (storeId) => {
    client.get('cluster/view', storeId).then(function (response) {
      //  console.log("data==>" + JSON.stringify(response));
      state.adminClusterList = response.data.data;
      console.log("==== ADMIN_CLUSTER LIST====")
      return dispatch({ type: 'FETCH_ADMIN_ClUSTER_LIST', payload: state.adminClusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  const viewCostCenterEmployeeByManger = (storeId, managerId) => {
    client.get('employee/view/' + storeId + '/' + managerId).then(function (response) {
      if (response.data.data === null) {
        state.costCenterEmpAndMgrList = []
      }
      else {
        state.costCenterEmpAndMgrList = response.data.data;
      }
      console.log("VIEW_COST_CENTER_EMPLOYEE_MANGER " + state.costCenterEmpAndMgrList);
      return dispatch({ type: 'VIEW_COST_CENTER_EMPLOYEE_MANGER', payload: state.costCenterEmpAndMgrList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const viewManagerByCostCenter = (storeId) => {
    client.get('employee/manager/' + storeId).then(function (response) {
      if (response.data.data === null) {
        state.viewManagerByCostCenterList = []
      }
      else {
        state.viewManagerByCostCenterList = response.data.data;
      }
      // console.log("VIEW_MANAGER_BY_COST_CENTER" + JSON.stringify(state.viewManagerByCostCenterList));
      return dispatch({ type: 'VIEW_MANAGER_BY_COST_CENTER', payload: state.viewManagerByCostCenterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const callClusterEmployees = (storeId, managerId) => {
    client.get('employee/view/' + storeId + '/' + managerId + '/cluster_employees').then(function (response) {
      if (response.data.data === null) {
        state.callClusterEmployeesList = []
      }
      else {
        state.callClusterEmployeesList = response.data.data;
      }
      console.log("CLUSTER_EMP_LIST" + state.callClusterEmployeesList);
      return dispatch({ type: 'CLUSTER_EMP_LIST', payload: state.callClusterEmployeesList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const callClusterLeaders = (storeId, managerId) => {
    client.get('employee/view/' + storeId + '/' + managerId + '/cluster_leader').then(function (response) {
      if (response.data.data === null) {
        state.callClusterLeadersList = []
      }
      else {
        state.callClusterLeadersList = response.data.data;
      }
      //console.log("CLUSTER_LEADERS_LIST" + state.callClusterLeadersList);
      return dispatch({ type: 'CLUSTER_LEADERS_LIST', payload: state.callClusterLeadersList });
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
    selectEmployeeForCluster,
    viewSalary,
    viewSalaryData,
    salaryEdit,
    viewStoreSalary,
    salaryApproval,
    viewClusterCostCenter,
    selectAllClusterLeaderForEdit,
    viewClusterForAdmin,
    viewCostCenterEmployeeByManger,
    viewManagerByCostCenter,
    callClusterEmployees,
    callClusterLeaders,
    updateAdminEditCluster,
    clusterList: state.clusterList,
    clusterLeaderNames: state.clusterLeaderNames,
    sportsNames: state.sportsNames,
    getSingleCluster: state.getSingleCluster,
    getClusterEmployees: state.getClusterEmployees,
    salaryList: state.salaryList,
    salaryStoreList: state.salaryStoreList,
    getSingleCluster1: state.getSingleCluster1,
    clusterCostCenterList: state.clusterCostCenterList,
    clusterAllLeaderNames: state.clusterAllLeaderNames,
    getEmployeesNames: state.getEmployeesNames,
    adminClusterList: state.adminClusterList,
    costCenterEmpAndMgrList: state.costCenterEmpAndMgrList,
    viewManagerByCostCenterList: state.viewManagerByCostCenterList,
    callClusterEmployeesList: state.callClusterEmployeesList,
    callClusterLeadersList: state.callClusterLeadersList,
  }}>
    {children}
  </ClusterContext.Provider>);
}

