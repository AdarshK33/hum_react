import React, { createContext, useReducer } from 'react';
import CandidateReducer from '../reducers/CandidateReducer';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { setDefaultCandidiateHeader,candidate } from "../utils/canditateLogin";
const initial_state = {
  candidateData:{}

}

export const CandidateContext = createContext();

export const CandidateProvider = ({ children  }) => {
  const [state, dispatch] = useReducer(CandidateReducer, initial_state);
  const candidateOnBoardLogin =(data)=>{
    const formData = {username:data.username,password:data.password}
    candidate.post('/auth/candidate/login',formData).then((response)=> {
      console.log(response,"login candidate")
      let accessTokenExist = localStorage.getItem('candidate_access_token')
      const token = response.data.token
      state.candidateData =response.data
      if (token !== "") {
      setDefaultCandidiateHeader(token);
      dispatch({ type: 'LOGIN', payload: state.candidateData });
       localStorage.setItem('candidate_access_token', token)
       if(accessTokenExist!==null||accessTokenExist!==undefined){
        data.history.push('/onboard')
       }
      }
    }).catch((error) =>{
        console.log(error);
      });
  }


  return (<CandidateContext.Provider value={{
    candidateOnBoardLogin,
    candidateData:state.candidateData,
  }}>
    {children}
  </CandidateContext.Provider>);
}