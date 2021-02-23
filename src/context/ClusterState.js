import React, { createContext, useReducer, useContext, useState } from 'react';
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
  const [loader, setLoader] = useState(false)


  // ADD SHIFT

  const updateCluster = (updateCluter) => {
    return client.post("/cluster/create", updateCluter).then(function (respone) {
      console.log("api response===", respone.data.message);
      viewCluster()
      toast.info(respone.data.message);

    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }

  const updateAdminEditCluster = (updateCluter) => {
    return client.post("/cluster/create", updateCluter).then(function (respone) {
      // const {
      //   clusterCostCenter: { costCenter },
      // } = state;
      // viewClusterCostCenter(costCenter)
      viewCluster()
      //  console.log("api response===", respone.data.message);
      toast.info(respone.data.message);

    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }


  const addCluster = (addCluster) => {
    return client.post("/cluster/create", addCluster).then(function (respone) {
      console.log("api response===", respone.data.message);
      viewCluster()
      toast.info(respone.data.message);

    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }

  const updateAdminaddCluster = (addCluster) => {

    return client.post("/cluster/create", addCluster).then(function (respone) {
      // const {
      //   clusterCostCenter: { costCenter },
      // } = state;
      viewCluster()

      console.log("api response===", respone.data.message);
      toast.info(respone.data.message);

    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }




  const viewCluster = () => {
    setLoader(true)
    let flag = localStorage.getItem('flag')
    console.log("=== Flag set" + flag)

    client.get('/cluster/view?leader=' + flag).then(function (response) {
      state.clusterList = response.data.data;
      setLoader(false)
      return dispatch({ type: 'FETCH_ClUSTER_LIST', payload: state.clusterList, loader: loader });

    })
      .catch(function (error) {
        console.log(error);
      });
  }


  function selectEmployeeForCluster(storeId) {
    client.get('/employee/view/' + storeId + '/cluster_employees').then(function (response) {
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

    client.get('/sport/view').then(function (response) {
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

    client.get('/cluster/' + id).then(function (response) {
      const getSingleCluster = response.data.data;
      const getSingleCluster1 = response.data.data.sports;
      const getEmployeesNames = response.data.data.employees;
      // console.log("get Employee Names)) " + JSON.stringify(state.getEmployeesNames));
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
    client.get('/employee/view/' + storeId + '/cluster_leader').then(function (response) {
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
    client.get('/employee/view/' + storeId).then(function (response) {
      state.clusterAllLeaderNames = response.data.data;
      return dispatch({ type: 'FETCH_ALL_LEADERS_NAME', payload: state.clusterAllLeaderNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }




  // SALARY INPUT
  const viewSalary = (salaryData) => {
    setLoader(true)
    /* console.log(" in cluster" + month + " " + year)
    let flag = localStorage.getItem('flag') */

    return client.post('/salary/view/store',salaryData)
      .then(function (response) {
        console.log("data message==>", response.data.message);
        console.log("data==>1", response);
        state.salaryList = response.data.data;
        if (response.data.data === null) {
          toast.info(response.data.message)
        }
        setLoader(false)
        return dispatch({ type: 'FETCH_SALARY_LIST', payload: state.salaryList, loader: loader });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // View Leave Data
  function viewSalaryData() {

    let empId1 = "DSI000035"
    client.get('/salary/view' + empId1)
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

  function salaryEdit(salaryEdit, salaryData) {
    console.log("/salary edit api response", salaryEdit)
    return client.post('salary/update', salaryEdit)
      .then((response) => {
        if(response.data === null) {
          toast.info(response.message)
          console.log("response.message", response.message)
        }else{
          state.message = response.data.message
          /* state.month = response.data.data.month
          state.year = response.data.data.year */
          toast.info(state.message)
          viewSalary(salaryData)
           
        console.log("salary edit response", response.data.data)
        console.log("salary edit message", state.message)
        }
       
        return (
          dispatch({ type: 'EDIT_SALARY', payload: state.salaryList })
        )
      })
      .catch((error) => {
        console.log(error)
      })


  }

  // View Admin Salary Input 
//not used
  const viewStoreSalary = (month, costCentre, year) => {
    console.log(" in cluster" + month + " " + costCentre + '' + year)

    client.get('/salary/view/store?month=' + month + '&storeId=' + costCentre + '&year=' + year)
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
  //Approval salary input from admin.

  const salaryApproval = (approvalData, salaryData) => {
    console.log("++++update salary approval api response+++++", approvalData)
    return client.post('/salary/approve', approvalData)
      .then((response) => {
        state.message = response.data.message
        toast.info(state.message)
        viewSalary(salaryData)
        /*  viewStoreSalary(month, year, storeId) */
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

    let flag = localStorage.getItem('flag')

    console.log("=== Flag set" + flag)
    if (flag === "0") {
      console.log("MY FLAGE VALUE" + flag)
      return client.get('/cluster/view/' + costCenter)
        .then((response) => {
          const clusterCostCenterList = response.data.data

          const clusterCostCenter = { costCenter }
          //  console.log("cluster based on cost center list", state.clusterCostCenterList)
          //  console.log("cluster based on cost center message", response.data.message)
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
    else {
      console.log("MY FLAGE VALUE" + flag)
      client.get('/cluster/view?leader=' + flag).then(function (response) {
        const clusterCostCenterList = response.data.data
        const clusterCostCenter = { costCenter }
        //  console.log("cluster based on cost center list", state.clusterCostCenterList)
        //  console.log("cluster based on cost center message", response.data.message)
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

  }

  const viewClusterForAdmin = (storeId) => {
    client.get('/cluster/view', storeId).then(function (response) {
      //  console.log("data==>" + JSON.stringify(response));
      state.adminClusterList = response.data.data;
      console.log("==== ADMIN_CLUSTER LIST====")
      return dispatch({ type: 'FETCH_ADMIN_ClUSTER_LIST', payload: state.adminClusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  const viewCostCenterEmployeeByManger = (storeId) => {
    client.get('/employee/view/' + storeId + '/cluster_employee').then(function (response) {
      if (response.data.data === null) {
        state.costCenterEmpAndMgrList = []
      }
      else {
        state.costCenterEmpAndMgrList = response.data.data;
      }
      //  console.log("VIEW_COST_CENTER_EMPLOYEE_MANGER==== " + JSON.stringify(state.costCenterEmpAndMgrList));
      return dispatch({ type: 'VIEW_COST_CENTER_EMPLOYEE_MANGER', payload: state.costCenterEmpAndMgrList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const viewManagerByCostCenter = (storeId) => {
    client.get('/employee/manager/' + storeId).then(function (response) {
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

  const callClusterEmployees = (storeId) => {
    // alert("callClusterEmloyees " + storeId)
    client.get('/employee/view/' + storeId + '/cluster').then(function (response) {
      if (response.data.data === null) {
        state.callClusterEmployeesList = []
      }
      else {
        state.callClusterEmployeesList = response.data.data;
      }
      console.log("CLUSTER_EMP_LIST" , state.callClusterEmployeesList);
      return dispatch({ type: 'CLUSTER_EMP_LIST', payload: state.callClusterEmployeesList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const callClusterLeaders = (storeId) => {
    // alert("callClusterEmloyees " + storeId)
    client.get('/employee/view/' + storeId + '/cluster').then(function (response) {
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
    updateAdminaddCluster,
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
    loader: loader

  }}>
    {children}
  </ClusterContext.Provider>);
}

