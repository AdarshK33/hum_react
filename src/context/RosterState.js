/* eslint-disable no-useless-concat */
import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import { toast } from "react-toastify";
import RosterReducer from '../reducers/RosterReducer';
import moment from 'moment'


const initial_state = {
  shiftList: [],
  shiftListNames: [],
  shiftContractNames: [],
  shiftMasterId: null,
  weekDays: [],
  weekOffDataList: [],
  singleShiftList: [],
  availableShiftData: [],
  weeksInYear: [],
  selectedRosterRange: {},
  adminSelectedRosterRange: {},
  adminWeekOffDataList: [],
  adminWeekOffDataListHeader: [],
  adminWeeksInYear: [],
  adminCalculateWeekResult: [],
  EmployeeListForAdminRosterWeekOff: [],
  adminRosterWeekOffDataList: [],
  adminRosterAvailableShiftList: [],
  costCenterList: [],
  masterWeeks: []

}


export const RosterContext = createContext();
export const RosterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RosterReducer, initial_state);

  // VIEWSHIFT

  const viewShift = () => {

    client.get('shift/view').then(function (response) {
      // console.log("data==>" + JSON.stringify(response));
      state.shiftList = response.data.data;
      return dispatch({ type: 'FETCH_SHIFT_LIST', payload: state.shiftList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  // VIEW SHIFT TYPE LIST

  function viewShiftTypes() {
    client.get('shift/types').then(function (response) {
      // console.log("data==>" + JSON.stringify(response));
      state.shiftListNames = response.data.data;
      return dispatch({ type: 'FETCH_SHIFT_LIST_NAMES', payload: state.shiftListNames });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  //VIEW CONTRACT TYPE LIST

  function viewContractTypes() {
    client.get('contract_type/view').then(function (response) {
      //console.log("data==>" + JSON.stringify(response));
      state.shiftContractNames = response.data.data;

      return dispatch({ type: 'FETCH_CONTRACT_LIST_NAMES', payload: state.shiftContractNames });
    })
      .catch(function (error) {
        console.log(error);

      });
  }




  //EDIT SHIFT

  function editShift(shiftMasterId) {
    // alert(shiftMasterId);
    client.get('shift/' + shiftMasterId).then(function (response) {
      //console.log("single shift list" + JSON.stringify(response));
      state.singleShiftList = response.data.data;
      return dispatch({ type: 'EDIT_SHIFT_LIST', payload: state.singleShiftList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateShift(newEditShift) {
    return client.put("shift/update", newEditShift).then(function (respone) {
      console.log("api response===", respone.data.message);
      toast.info(respone.data.message);
      viewShift()
    })
      .catch((error) => {
        alert(" In error catch ", error);
      });
  }

  // ADD SHIFT

  function addShift(newShift) {
    //   alert(JSON.stringify(newShift) );

    return client.post("shift/create", newShift)

  }


  // DELETE SHIFT

  function deleteShift(shiftMasterId) {
    // alert("delete" + shiftMasterId)
    // eslint-disable-next-line no-useless-concat
    client.delete('shift/delete' + "?shiftId=" + shiftMasterId).then(function (response) {

      console.log("data==>" + JSON.stringify(response));
      // let myresult = response.data.data.shiftMasterId;   
      return dispatch({ type: 'DELETE_SHIFT', payload: shiftMasterId });

    })
      .catch(function (error) {
        console.log(error);
      });
    viewShift();
  };

  // Get View WeekOff Weeks according to days
  const weekOffDays = (weekId) => {

    // eslint-disable-next-line no-useless-concat
    client.get('weekoff/weeks/days' + '?weekId=' + weekId)
      .then((response) => {
        state.weekDays = response.data.data
        console.log("SELECT WEEK ========== ", weekId, JSON.stringify(state.weekDays))
        return dispatch({ type: 'WEEKOFF_WEEK_DAYS', payload: state.weekDays })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  // view Week Off Data in roster table

  const weekOffDataEmp = (endDate, startDate, empId) => {
    // const empId = 'DSI000035'  
    client.get('roster/employee/view' + '?employeeId=' + empId +
      '&' + 'endDate=' + endDate + '&' + 'startDate=' + startDate)
      .then((response) => {
        const weekOffDataList = response.data.data
        const selectedRosterRange = { endDate, startDate, empId }
        //  console.log("=====GET weekOff Data API respone=====", state.weekOffDataList)

        return dispatch({
          type: 'WEEKOFF_WEEK_DATA_LIST', payload: {
            weekOffDataList,
            selectedRosterRange
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Add week off Data according to the emp id
  const addWeekOff = (newWeekOff) => {
    console.log("++++create weekOff api response+++++", newWeekOff)
    return client.post("weekoff/employee/create", newWeekOff)
      .then((response) => {
        const {
          selectedRosterRange: { endDate, startDate, empId },
        } = state;
        state.weekOffDataList = response.data.data;
        state.message = response.data.message;
        toast.info(state.message);
        weekOffDataEmp(endDate, startDate, empId);
        console.log("new create list response===>", response.data.data);
        console.log("new create list message===>", state.message);
        // return dispatch({ type: 'ADD_NEW_WEEKOFF_DATA', payload: state.weekOffDataList })
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const availableShifts = () => {

    client.get('/shift/view/employee')
      .then((response) => {
        // console.log(response,"ava")
        state.availableShiftData = response.data.data

        //   console.log("=====GET ava=====", state.availableShiftData)
        return dispatch({ type: 'AVAILABLE_SHIFTS', payload: state.availableShiftData })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const assignShift = (assignData) => {

    return client.post('shift/assign/employee', assignData)
      .then((response) => {
        const {
          selectedRosterRange: { endDate, startDate, empId },
        } = state;
        toast.info(response.data.message)
        console.log(response, "cre")
        weekOffDataEmp(endDate, startDate, empId);
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const getallWeeks = (date) => {
    let year = new Date(date).getFullYear();
    client.get('/weekoff/weeks?year=' + year)
      .then((response) => {
        state.weeksInYear = response.data.data
        console.log("=====GET ALL WEEK =====", JSON.stringify(state.weeksInYear))
        return dispatch({ type: 'AVAILABLE_WEEKS', payload: state.weeksInYear })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const getMasterWeeks = (year) => {
    // let year = new Date().getFullYear()  
    console.log(year);
    client.get('/weekoff/weeks/' + year)
      .then((response) => {
        console.log("===================NAVANEETHA=========");
        console.log(response.data.data);
        state.masterWeeks = response.data.data
        return dispatch({ type: 'MASTER_WEEKS', payload: state.masterWeeks })
      })
      .catch((error) => {
        console.log(error)
      })
  }



  const uploadWeeks = (file) => {
    const formData = new FormData();
    formData.append('file', file)
    console.log(formData)
    return client.post('/weekoff/weeks/upload', formData)
      .then((response) => {
        console.log(response, "res")
        toast.info(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  //ADMIN ROSTER

  const adminWeekOffDataEmp = (endDate, startDate, contract, weekid, empId) => {
    // alert("in admin week off "+empId);
    if (contract === "") {
      contract = "permanent"
    }
    if (weekid === undefined) {
      weekid = 0
    }
    let flag = localStorage.getItem('flag')

    // eslint-disable-next-line no-useless-concat
    client.get('roster/view' + '?contractType=' + contract + '&' + 'endDate=' + endDate + '&' + 'startDate=' + startDate + '&' + 'storeId=' + empId + '&' + 'weekId=' + weekid + '&' + 'flag=' + flag)
      .then((response) => {
        const adminWeekOffDataListHeader = response.data.data.rosterDates;
        const adminWeekOffDataList = response.data.data.rosterResponses;
        const adminSelectedRosterRange = { endDate, startDate, contract, weekid, empId }

        console.log("=====  table header =", state.adminWeekOffDataListHeader)
        console.log("=====  table body data =", state.adminWeekOffDataList)
        return dispatch({
          type: 'ADMIN_WEEKOFF_WEEK_DATA_LIST', payload: {
            adminWeekOffDataListHeader,
            adminWeekOffDataList,
            adminSelectedRosterRange
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //ADMIN GET ALL WEEKS
  const adminCalculateWeek = (endDate, startDate) => {
    //  alert(endDate,endDate);
    // eslint-disable-next-line no-useless-concat
    client.get('roster/view/weeks?' + 'endDate=' + endDate + '&' + 'startDate=' + startDate)
      .then((response) => {
        state.adminCalculateWeekResult = response.data.data;
        console.log("admin calculate week ", state.adminCalculateWeekResult)
        return dispatch({ type: 'ADMIN_CALCULATE_AVAILABLE_WEEKS', payload: state.adminCalculateWeekResult })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //ADMIN EMPLOYEE LIST FOR ROSTER WEEKOFF
  const getEmployeeListForAdminRosterWeekOff = (contractType, storeId) => {
    // const contractType="Parttime";
    console.log("=============NAV============", contractType)
    client.get('employee/view?contract_type=' + contractType + '&storeId=' + storeId)
      .then((response) => {
        state.EmployeeListForAdminRosterWeekOff = response.data.data;
        console.log("admin calculate week for store id  ", state.EmployeeListForAdminRosterWeekOff)
        return dispatch({ type: 'GET_ADMIN_EMPLOYEE_ROSTER_WEEK_OFF', payload: state.EmployeeListForAdminRosterWeekOff })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const adminAddWeekOff = (newWeekOff) => {
    //  alert(newWeekOff);
    console.log("++++create weekOff api response+++++", newWeekOff)
    return client.post("weekoff/manager/create", newWeekOff)
      .then((response) => {
        const {
          adminSelectedRosterRange: { endDate, startDate, contract, weekid, empId },
        } = state;
        state.adminRosterWeekOffDataList = response.data.data;
        state.message = response.data.message;
        toast.info(state.message);
        adminWeekOffDataEmp(endDate, startDate, contract, weekid, empId);
        console.log("new create list response===>", response.data.data);
        console.log("new create list message===>", state.message);
        // return dispatch({ type: 'ADD_NEW_WEEKOFF_DATA', payload: state.weekOffDataList })
      })
      .catch((error) => {
        console.log(error);
      });

  }




  const adminRosterAvailableShift = (contractType, costCenter1) => {

    if (contractType === undefined) {
      contractType = "Permanent"
    }


    client.get('/shift/view/store/active?contract_type=' + contractType + '&storeId=' + costCenter1)
      .then((response) => {
        state.adminRosterAvailableShiftList = response.data.data;
        console.log("admin calculate week ", state.adminRosterAvailableShiftList)
        //   alert(state.adminRosterAvailableShiftList);
        return dispatch({ type: 'ADMIN_ROSTER_AVAILABLE_SHIFT', payload: state.adminRosterAvailableShiftList })
      })
      .catch((error) => {
        console.log(error)
      })
  }







  const assignAdminShift = (assignData) => {
    return client.post('shift/assign', assignData)
      .then((response) => {
        const {
          adminSelectedRosterRange: { endDate, startDate, contract, weekid, empId },
        } = state;
        toast.info(response.data.message)
        console.log("==========NAVANEETHA===================")
        console.log(response, "cre")
        adminWeekOffDataEmp(endDate, startDate, contract, weekid, empId);
      })
      .catch((error) => {
        console.log(error)
      })

  }

  //Cost Center List
  const costCenter = () => {

    client.get('/cost_centre/view').then(function (response) {

      state.costCenterList = response.data.data;

      return dispatch({ type: 'COST_CENTER_DATA', payload: state.costCenterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }





  return (<RosterContext.Provider value={{
    addShift,
    assignShift,
    availableShifts,
    viewShift,
    deleteShift,
    editShift,
    viewShiftTypes,
    updateShift,
    viewContractTypes,
    weekOffDays,
    weekOffDataEmp,
    addWeekOff,
    getallWeeks,
    adminWeekOffDataEmp,
    adminCalculateWeek,
    getEmployeeListForAdminRosterWeekOff,
    adminAddWeekOff,
    adminRosterAvailableShift,
    assignAdminShift,
    costCenter,
    uploadWeeks,
    getMasterWeeks,
    masterWeeks: state.masterWeeks,
    costCenterList: state.costCenterList,
    shiftList: state.shiftList,
    shiftMasterId: state.shiftMasterId,
    shiftListNames: state.shiftListNames,
    shiftContractNames: state.shiftContractNames,
    weekDays: state.weekDays,
    weekOffDataList: state.weekOffDataList,
    singleShiftList: state.singleShiftList,
    availableShiftData: state.availableShiftData,
    weeksInYear: state.weeksInYear,
    selectedRosterRange: state.selectedRosterRange,
    adminWeekOffDataList: state.adminWeekOffDataList,
    adminWeekOffDataListHeader: state.adminWeekOffDataListHeader,
    adminWeeksInYear: state.adminWeeksInYear,
    adminCalculateWeekResult: state.adminCalculateWeekResult,
    adminRosterAvailableShiftList: state.adminRosterAvailableShiftList,
    EmployeeListForAdminRosterWeekOff: state.EmployeeListForAdminRosterWeekOff
  }}>
    {children}
  </RosterContext.Provider>);
}
// /roster/view?contractType=Permanent&endDate=2020-09-10&startDate=2020-08-10&storeId=IN1055&weekId=0
