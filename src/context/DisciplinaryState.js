import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DisciplinaryReducer from "../reducers/DisciplinaryReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const initial_state = {
  total: {},
  disciplinaryListData: {},
  disciplinarySearchData: {},
  disciplinaryResonsData: {},
  showCauseIssueCreateResponse: {},
  issueShowCauseNoticeData: {},
  disciplinaryEmpSearchData: {},
};

export const DisciplinaryContext = createContext();

export const DisciplinaryProvider = (props) => {
  const [state, dispatch] = useReducer(DisciplinaryReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const [lettterview, setLetterView] = useState(false);
  const [lettterviewShow, setLetterViewShow] = useState(false);

  const [modalView, setModalView] = useState(false);
  const [modalViewLetter, setModalViewletter] = useState(false);

  const setViewLetter = (val) => {
    setLetterView(val);
  };
  const setShowValue = (val)=>{
    setLetterViewShow(val)
  }
  const setModal = (val) => {
    setModalView(val);
  };
  const setModalLetter = (val) => {
    setModalViewletter(val);
  };
  const disciplinaryListView = (key, pageNumber, role) => {
    setLoader(true);
    client
      .get(
        "/api/v1/disciplinary/view?key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10&superManager=" +
          role
        // +"$super"
      )
      .then((response) => {
        state.disciplinaryListData = response.data.data.data;
        state.total = response.data.data.total;
        MakedisciplinaryEmployeeSearchNull();
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
      .get("/api/v1/disciplinary/view/" + key)
      .then((response) => {
        state.disciplinarySearchData = response.data.data;
        setLoader(false);
        // toast.info(response.data.message);
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
  const EmployeeSearchWithKey = (key) => {
    setLoader(true);
    client
      .get("/api/v1/disciplinary/search?key=" + key)
      .then((response) => {
        state.disciplinaryEmpSearchData = response.data.data;
        setLoader(false);
        toast.info(response.data.message);
        console.log(response);
        console.log("search data emp", state.disciplinaryEmpSearchData);

        return dispatch({
          type: "DISCIPLINARY_SEARCH_WITH_KEY",
          payload: state.disciplinaryEmpSearchData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const MakedisciplinaryEmployeeSearchNull = () => {
    state.disciplinaryEmpSearchData = {};

    return dispatch({
      type: "DISCIPLINARY_SEARCH_WITH_KEY",
      payload: state.disciplinaryEmpSearchData,
    });
  };

  const disciplinaryResonsView = (key) => {
    setLoader(true);
    client
      .get(
        "/api/v1/disciplinary/view/reason/disciplinary?disciplinaryType= " + key
      )
      .then((response) => {
        state.disciplinaryResonsData = response.data.data;
        setLoader(false);
        console.log(response);
        console.log("disciplinaryResonsData", state.disciplinaryResonsData);

        return dispatch({
          type: "DISCIPLINARY_REASONS",
          payload: state.disciplinaryResonsData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createShowCauseIssue = (updatedInfo, empId) => {
    setLoader(true);
    console.log("updatedInfo", updatedInfo);
    client
      .post("/api/v1/disciplinary/create", updatedInfo)
      .then((response) => {
        state.showCauseIssueCreateResponse = response.data.data;
        console.log(response.data, "createDisciplinary");

        disciplinaryEmployeeSearch(response.data.data.disciplinaryId);
        toast.info(response.data.message);
        // disciplinaryEmployeeSearch(empId);

        setLoader(false);
        console.log(state.showCauseIssueCreateResponse);
        console.log("showCauseIssueCreateResponse", response);

        return dispatch({
          type: "CREATE_SHOW_CAUSE_NOTICE",
          payload: state.showCauseIssueCreateResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const IssueShowCauseNoticeLetter = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/disciplinary/letter/" + empId)
      .then((response) => {
        state.issueShowCauseNoticeData = response.data.data;
        setLoader(false);
        console.log(response);
        console.log("issueShowCauseNoticeData", state.issueShowCauseNoticeData);

        return dispatch({
          type: "ISSUE_SHOW_CAUSE_LETTER",
          payload: state.issueShowCauseNoticeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SubmitDisciplinaryLetter = (key) => {
    setLoader(true);
    client
      .get("/api/v1/disciplinary/send/" + key)
      .then((response) => {
        console.log(response);
        toast.info(response.data.message);
        setLoader(false);
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
        disciplinaryResonsView,
        createShowCauseIssue,
        IssueShowCauseNoticeLetter,
        MakedisciplinaryEmployeeSearchNull,
        EmployeeSearchWithKey,
        SubmitDisciplinaryLetter,
        disciplinaryEmpSearchData: state.disciplinaryEmpSearchData,
        issueShowCauseNoticeData: state.issueShowCauseNoticeData,
        showCauseIssueCreateResponse: state.showCauseIssueCreateResponse,
        disciplinaryResonsData: state.disciplinaryResonsData,
        disciplinarySearchData: state.disciplinarySearchData,
        total: state.total,
        disciplinaryListData: state.disciplinaryListData,
        loader: loader,
        lettterview: lettterview,
        lettterviewShow:lettterviewShow,
        setViewLetter,
        setModal,
        setShowValue,
        modalView: modalView,
        setModalLetter,
        modalViewLetter: modalViewLetter,
      }}
    >
      {props.children}
    </DisciplinaryContext.Provider>
  );
};
