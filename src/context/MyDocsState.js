import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import MyDocsReducer from "../reducers/MyDocsReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initial_state = {
  total: {},
  myDocsListData: {},
  myDiscilinaryListData: {},
};

export const MyDocsContext = createContext();

export const MyDocsProvider = (props) => {
  const [state, dispatch] = useReducer(MyDocsReducer, initial_state);
  const [loader, setLoader] = useState(false);

  const MyDocsListView = (key, pageNumber) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/documents/view/documents?employeeId=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10"
      )
      .then((response) => {
        console.log("docslist", response);
        state.myDocsListData = response.data.data.data;
        if (response.data.data !== null) {
          state.total = response.data.data.total;
        }
        setLoader(false);
        console.log(state.total);
        console.log(response);

        return dispatch({
          type: "DOCUMENTS_LISTING",
          payload: state.myDocsListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const MyDisciplinaryActionListView = (key, pageNumber) => {
    setLoader(true);
    client
      .get("/api/v1/disciplinary/view/employee?employeeId=" + key)
      .then((response) => {
        console.log("docslist", response);
        state.myDiscilinaryListData = response.data.data;
        if (response.data.data !== null) {
          state.total = 1;
        }
        setLoader(false);
        console.log(state.total);
        console.log(response);

        return dispatch({
          type: "MY_DISCIPLINARY_LISTING",
          payload: state.myDiscilinaryListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MyDocsContext.Provider
      value={{
        MyDocsListView,
        MyDisciplinaryActionListView,
        total: state.total,
        myDiscilinaryListData: state.myDiscilinaryListData,
        myDocsListData: state.myDocsListData,
        loader: loader,
      }}
    >
      {props.children}
    </MyDocsContext.Provider>
  );
};
