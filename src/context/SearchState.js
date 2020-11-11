import React, { createContext, useReducer } from 'react';
import { client } from '../utils/axios';
import SearchReducer from '../reducers/SearchReducer';
import { toast } from "react-toastify";



const initial_state = {
  empIdSearchList: [],
  empIdManagerSearchList: [],
  searchShiftList: [],
  searchClusterList: []
}

export const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initial_state);


  function searchByEmpId(Id) {

    client.get('/leave_transaction/view?empId=' + Id).then(function (response) {
      console.log(response);
      state.empIdSearchList = response.data.data;

      return dispatch({ type: 'FETCH_EMPID_LIST', payload: state.empIdSearchList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function searchByEmpIdManager(Id) {

    client.get('/leave_transaction/view/manager?empId=' + Id).then(function (response) {
      console.log(response);
      state.empIdManagerSearchList = response.data.data;

      return dispatch({ type: 'FETCH_EMPIDMANAGER_LIST', payload: state.empIdManagerSearchList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function viewSearchSiftList(Id) {

    client.get('/shift/search?key=' + Id).then(function (response) {
      console.log(response);
      state.searchShiftList = response.data.data;

      return dispatch({ type: 'FETCH_SHIFT_LIST', payload: state.searchShiftList });
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  function viewSearchClusterList(Id) {

    client.get('/cluster/search?key=' + Id).then(function (response) {

      state.searchClusterList = response.data.data;
      console.log(state.searchClusterList);
      return dispatch({ type: 'FETCH_CLUSTER_SEARCH_LIST', payload: state.searchClusterList });
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
    empIdSearchList: state.empIdSearchList,
    empIdManagerSearchList: state.empIdManagerSearchList,
    searchShiftList: state.searchShiftList,
    searchClusterList: state.searchClusterList
  }}>
    {children}
  </SearchContext.Provider>);
}