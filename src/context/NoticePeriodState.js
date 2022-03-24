import React, { useReducer, createContext, useState } from "react";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import NoticePeriodReducer from "../reducers/NoticePeriodReducer";

const initialState = {
  noticePeriodList: [],
  total: 0,
  actionStatus: false,
  noticePeriodDetails: {},
};

export const NoticePeriodContext = createContext();

export const NoticePeriodProvider = (props) => {
  const [state, dispatch] = useReducer(NoticePeriodReducer, initialState);
  const [loader, setLoader] = useState(false);

  const changeActionStatus = () => {
    return dispatch({
      type: "CHANGE_ACTION_STATUS",
    });
  };

  const getNoticePeriodList = (apiUrl) => {
    setLoader(true);
    client
      .get(apiUrl)
      .then((response) => {
        setLoader(false);
        // toast.info(response.data.message);
        return dispatch({
          type: "FETCH_NOTICE_PERIOD_LIST",
          payload: response.data.data.data,
          total: response.data.data.total,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_NOTICE_PERIOD_LIST_ERR",
        });
      });
  };

  const getNoticePeriodDetails = (noticePeriodId) => {
    setLoader(true);
    client
      .get(`/api/v1/notice/view/${noticePeriodId}`)
      .then((response) => {
        setLoader(false);
        // toast.info(response.data.message);
        return dispatch({
          type: "FETCH_NOTICE_PERIOD_DETAILS",
          payload: response.data.data,
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "FETCH_NOTICE_PERIOD_DETAILS_ERR",
        });
      });
  };

  const createNoticePeriod = (apiInfo) => {
    setLoader(true);
    client
      .post("/api/v1/notice/create", apiInfo)
      .then((response) => {
        setLoader(false);
        // toast.info(response.data.message);
        return dispatch({
          type: "CREATE_NOTICE_PERIOD",
        });
      })
      .catch(() => {
        setLoader(false);
        return dispatch({
          type: "CREATE_NOTICE_PERIOD_ERR",
        });
      });
  };

  return (
    <NoticePeriodContext.Provider
      value={{
        changeActionStatus,
        getNoticePeriodList,
        noticePeriodList: state.noticePeriodList,
        loader,
        total: state.total,
        actionStatus: state.actionStatus,
        createNoticePeriod,
        getNoticePeriodDetails,
        noticePeriodDetails: state.noticePeriodDetails,
      }}
    >
      {props.children}
    </NoticePeriodContext.Provider>
  );
};
