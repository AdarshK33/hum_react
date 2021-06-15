import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DisciplinaryReducer from "../reducers/DisciplinaryReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initial_state = {
  total: {},
  disciplinaryListData: {},
  disciplinarySearchData: {},
};

export const DisciplinaryContext = createContext();

export const DisciplinaryProvider = (props) => {
  const [state, dispatch] = useReducer(DisciplinaryReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const disciplinaryListView = (key, pageNumber) => {
    setLoader(true);
    client
      .get(
        "/api/v1/disciplinary/view?key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10"
      )
      .then((response) => {
        state.disciplinaryListData = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);

        return dispatch({
          type: "DISCIPLINARY_LISTING",
          payload: state.disciplinaryListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const disciplinaryEmployeeSearch = (key) => {
    setLoader(true);
    client
      .get("/api/v1/disciplinary/search?key=" + key)
      .then((response) => {
        state.disciplinarySearchData = response.data.data;
        setLoader(false);
        console.log(response);
        console.log("search data disc", state.disciplinarySearchData);

        return dispatch({
          type: "DISCIPLINARY_SEARCH",
          payload: state.disciplinarySearchData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DisciplinaryContext.Provider
      value={{
        disciplinaryListView,
        disciplinaryEmployeeSearch,
        disciplinarySearchData: state.disciplinarySearchData,
        total: state.total,
        disciplinaryListData: state.disciplinaryListData,
        loader: loader,
      }}
    >
      {props.children}
    </DisciplinaryContext.Provider>
  );
};
