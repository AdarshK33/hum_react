import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import SearchReducer from '../reducers/SearchReducer';
import { toast } from "react-toastify";



const initial_state = {
  empIdSearchList: [],
  empIdManagerSearchList: [],
  searchShiftList: [],
  searchClusterList: [],
  searchHolidayList: [],
  searchGrantLeaveView: []

}

export const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initial_state);


  function searchByEmpId(Id) {

    client.get('/leave_transaction/view?empId=' + Id).then(function (response) {
      console.log(response);
      if (response.data.data.data === null) {
        toast.error("No Data Found")
      }
      else {
        state.empIdSearchList = response.data.data.data;
        console.log("searchEmpId----",response.data.data.data)
      }

      return dispatch({ type: 'FETCH_EMPID_LIST', payload: state.empIdSearchList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function searchByEmpIdManager(Id) {

    client.get('/leave_transaction/view/manager?empId=' + Id).then(function (response) {
      console.log(response);
      if (response.data.data === null) {
        toast.error("No Data Found")
      }
      else {
        state.empIdManagerSearchList = response.data.data;
      }


      return dispatch({ type: 'FETCH_EMPIDMANAGER_LIST', payload: state.empIdManagerSearchList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function viewSearchSiftList(Id) {

    client.get('/shift/search?key=' + Id).then(function (response) {
      if (response.data.data === null) {
        toast.error("No Data Found")
      }
      else {
        state.searchShiftList = response.data.data;
      }


      return dispatch({ type: 'FETCH_SHIFT_LIST', payload: state.searchShiftList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  //search api for holiday
  const searchHoliday = (key) => {
    console.log("key value", key)
    client.get('/holiday/search' + '?key=' + key)
      .then((response) => {
          state.searchHolidayList = response.data.data;
        console.log('holiday search api response', state.searchHolidayLis);
        return dispatch({ type: 'SEARCH_HOLIDAY_LIST', payload: state.searchHolidayList });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function viewSearchClusterList(Id) {

    client.get('/cluster/search?key=' + Id).then(function (response) {
      if (response.data.data === null) {
        toast.error("No Data Found")
      }
      else {
        state.searchClusterList = response.data.data;
      }
      console.log(state.searchClusterList);
      return dispatch({ type: 'FETCH_CLUSTER_SEARCH_LIST', payload: state.searchClusterList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function searchGrantLeave(key) {
    client.get('/grant_leave/view' + '?key=' + key)
      .then(function (response) {
        if (response.data.data === null) {
          toast.error("No Data Found")
        }
        else {
          state.searchGrantLeaveView = response.data.data;
        }

        return dispatch({ type: 'VIEW_GRANT_LEAVE', payload: state.searchGrantLeaveView });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  return (<SearchContext.Provider value={{
    searchByEmpId,
    searchByEmpIdManager,
    viewSearchSiftList,
    viewSearchClusterList,
    searchGrantLeave,
    empIdSearchList: state.empIdSearchList,
    empIdManagerSearchList: state.empIdManagerSearchList,
    searchShiftList: state.searchShiftList,
    searchClusterList: state.searchClusterList,
    searchHoliday,
    searchHolidayList: state.searchHolidayList,
    searchGrantLeaveView: state.searchGrantLeaveView
  }}>
    {children}
  </SearchContext.Provider>);
}