import React, { createContext, useReducer } from "react";
import CandidateReducer from "../reducers/CandidateReducer";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { setDefaultCandidiateHeader, candidate } from "../utils/canditateLogin";
import { OnBoardContext } from "./OnBoardState";
const initial_state = {
  candidateData: {},
};

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CandidateReducer, initial_state);
  const candidateOnBoardLogin = (data) => {
    const formData = { username: data.username, password: data.password };
    candidate
      .post("/auth/candidate/login", formData)
      .then((response) => {
        console.log(response, "login candidate");
        let accessTokenExist = localStorage.getItem("candidate_access_token");
        const token = response.data.token;
        state.candidateData = response.data;
        if (token == null) {
          toast.error(response.data.message);
        } else if (token !== "" || token !== null) {
          setDefaultCandidiateHeader(token);
          dispatch({ type: "LOGIN", payload: state.candidateData });
          localStorage.setItem("candidate_access_token", token);
          if (accessTokenExist !== null || accessTokenExist !== undefined) {
            data.history.push("/offer");
          } else {
            toast.error("Bad Credentials");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const candidateRejectOffer = (data) => {
    candidate
      .get(`/api/v2/candidate/${data.Id}/offer/reject`)
      .then((response) => {
        localStorage.removeItem("candidate_access_token");
        console.log(response.config, data, "reject");
        data.history.push("/onboard-offer");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CandidateContext.Provider
      value={{
        candidateOnBoardLogin,
        candidateRejectOffer,
        candidateData: state.candidateData,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
