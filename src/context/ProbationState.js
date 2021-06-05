import React, { createContext, useReducer, useState } from "react";
import ProbationReducer from "../reducers/ProbationReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";

export const ProbationContext = createContext();

const initial_state = {
  probationListData: [],
  probUpdateResponse: {},
  total: {},
  empId: "",
  probationData: {},
  extensionLetterData: {},
  cnfLetterData: {},
};

export const ProbationProvider = (props) => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(ProbationReducer, initial_state);

  const ProbationListView = (days, key, pageNumber, status = 3) => {
    setLoader(true);
    client
      .get(
        "/api/v1/probation/view?days=" +
          days +
          "&key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10&status=" +
          status
        // "/api/v1/probation/view?key=" + key + "&page=" + pageNumber + "&size=10"
        // " /api/v1/promotion/view?key=all&page=0&size=10"
      )
      .then((response) => {
        state.probationListData = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);

        return dispatch({
          type: "PROBATION_LISTING",
          payload: state.probationListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewProbationDataById = (employeeId) => {
    setLoader(true);
    client
      .get("/api/v1/probation/view/" + employeeId)
      .then((response) => {
        state.probationData = response.data.data;

        setLoader(false);
        console.log("--->", state.probationData);
        console.log(response);

        return dispatch({
          type: "PROBATION_DATA_BY_ID",
          payload: state.probationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProbation = (updatedInfo, empId) => {
    setLoader(true);
    console.log("updatedInfo", updatedInfo);
    client
      .post("/api/v1/probation/update", updatedInfo)
      .then((response) => {
        state.probUpdateResponse = response.data.data;
        toast.info(response.data.message);
        ViewProbationDataById(empId);
        setLoader(false);
        console.log(state.probUpdateResponse);
        console.log("duesearch", response);

        return dispatch({
          type: "UPDATE_PROBATION",
          payload: state.probUpdateResponse,
        });

        // return dispatch({
        //   type: "PROBATION_LISTING_BY_DUE",
        //   payload: state.probationListByDueDays,
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ViewExtensionLetter = (employeeId) => {
    setLoader(true);
    client
      .get("/api/v1/probation/send/extension/letter/" + employeeId)
      .then((response) => {
        state.extensionLetterData = response.data.data;
        setLoader(false);
        console.log(state.extensionLetterData);
        console.log("duesearch", response);

        return dispatch({
          type: "EXTENSION_LETTER",
          payload: state.extensionLetterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ViewConfirmationLetter = (employeeId) => {
    setLoader(true);
    client
      .get("/api/v1/probation/send/confirmation/letter/" + employeeId)
      .then((response) => {
        state.cnfLetterData = response.data.data;
        setLoader(false);
        console.log(state.cnfLetterData);
        console.log("duesearch", response);

        return dispatch({
          type: "CONFIRMATION_LETTER",
          payload: state.cnfLetterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeEmpId = (employeeId) => {
    setLoader(true);
    state.empId = employeeId;
    setLoader(false);
    return dispatch({
      type: "EMP_ID",
      payload: state.empId,
    });
  };
  return (
    <ProbationContext.Provider
      value={{
        ProbationListView,
        updateProbation,
        changeEmpId,
        ViewProbationDataById,
        ViewExtensionLetter,
        ViewConfirmationLetter,
        extensionLetterData: state.extensionLetterData,
        cnfLetterData: state.cnfLetterData,
        probationData: state.probationData,
        empId: state.empId,
        probUpdateResponse: state.probUpdateResponse,
        probationListData: state.probationListData,
        total: state.total,
        loader: loader,
      }}
    >
      {props.children}
    </ProbationContext.Provider>
  );
};
