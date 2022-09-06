import React, { createContext, useContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import DisciplinaryReducer from "../reducers/DisciplinaryReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";

const initial_state = {
  total: {},
  disciplinaryListData: {},
  disciplinarySearchData: {},
  disciplinaryResonsData: {},
  showCauseIssueCreateResponse: {},
  showCauseIssueCreateResponseMessage: {},
  issueShowCauseNoticeData: {},
  disciplinaryEmpSearchData: {},
};

export const DisciplinaryContext = createContext();

export const DisciplinaryProvider = (props,context) => {
  let history = useHistory();

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
    // http://humine.theretailinsights.co/api/v1/disciplinary/view?page=0&size=10&key=all&superManager=0
    client
      .get(
        "/api/v1/disciplinary/view?page=" +
        pageNumber +
        "&size=10&key="+
        key+
        "&superManager="+
        role
         )
      .then((response) => {
        state.disciplinaryListData = response.data.data.data;
        state.total = response.data.data.total;
        MakedisciplinaryEmployeeSearchNull();
        setLoader(false);
        console.log("hello state.total",state.total);
        console.log(response);
        return dispatch({
          type: "DISCIPLINARY_LISTING",
          payload: state.disciplinaryListData,
          loader: loader,
          total: state.total,
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
        "/api/v1/disciplinary/view/reason/disciplinary?disciplinaryType=" + key
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

  const createShowCauseIssue = (updatedInfo, empId,history) => {
    setLoader(true);
    console.log("updatedInfo", updatedInfo,context);
    client
      .post("/api/v1/disciplinary/create", updatedInfo)
      .then((response) => {
        state.showCauseIssueCreateResponse = response.data.data;
        state.showCauseIssueCreateResponseMessage = response.data
        console.log(response.data, "createDisciplinary");
        if(response.data.message == "DisciplinaryAction is already in the system."){
          toast.error(response.data.message);
          history.push("/disciplinary-action")
        }else{
          toast.info(response.data.message);
        }
        disciplinaryEmployeeSearch(response.data.data.disciplinaryId);
        
        // disciplinaryEmployeeSearch(empId);

        setLoader(false);
        console.log(state.showCauseIssueCreateResponse);
        console.log("showCauseIssueCreateResponse", response);

        return dispatch({
          type: "CREATE_SHOW_CAUSE_NOTICE",
          payload: {createData:state.showCauseIssueCreateResponse,messageData:state.showCauseIssueCreateResponseMessage},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showCauseIssueCreateResponseMessageNull = ()=>{
    state.showCauseIssueCreateResponseMessage = null
    return dispatch({
      type: "CREATE_SHOW_CAUSE_NOTICE",
      payload: [state.showCauseIssueCreateResponse,state.showCauseIssueCreateResponseMessage],
    });  
  }
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
        showCauseIssueCreateResponseMessageNull,
        disciplinaryEmpSearchData: state.disciplinaryEmpSearchData,
        issueShowCauseNoticeData: state.issueShowCauseNoticeData,
        showCauseIssueCreateResponse: state.showCauseIssueCreateResponse,
        showCauseIssueCreateResponseMessage:state.showCauseIssueCreateResponseMessage,
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
