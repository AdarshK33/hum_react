import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { candidate } from "../utils/canditateLogin";
import { toast } from "react-toastify";

export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
  PersonalInfoResponse: {},
  CreateNomineeResponse: {},
  candidateInsuranceNominationData: {},
  candidateData: {},
  candidatePersonalInfoData: {},
  searchEmpData1: [],
  searchEmpData2: [],
  stateList: [],
  cityList: [],
  candidateViewInfo: {},
  candidateCountryData: [],
  candidateStateData: [],
  candidateCityData: [],
  addressSaveData: {},
  addressViewData: [],
  bankSaveData: {},
  bankViewData: [],
  bankUpdateData: {},
};
// git
export const OnBoardProvider = (props) => {
  const [state, dispatch] = useReducer(OnBoardReducer, initial_state);
  const updatePersonalInfo = (updateData) => {
    console.log("Info data -----");
    console.log(updateData);
    return candidate
      .post("/api/v2/candidate/update", updateData)
      .then((response) => {
        state.PersonalInfoResponse = response.data.data;
        console.log(
          "personal Information response--->",
          state.PersonalInfoResponse
        );
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "UPDATE_PERSONAL_INFO",
          payload: state.PersonalInfoResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CandidatePersonalInfo = (candidateId) => {
    candidate
      .get("/api/v2/candidate/" + candidateId)
      .then((response) => {
        state.candidatePersonalInfoData = response.data.data;
        console.log(
          "Candidate Personal information  Response ",
          state.candidatePersonalInfoData
        );
        return dispatch({
          type: "CANDIDATE_PERSONAL_INFODATA",
          payload: state.candidatePersonalInfoData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CandidateProfile = () => {
    candidate
      .get("/api/v2/candidate/profile")
      .then((response) => {
        state.candidateData = response.data.data;
        console.log("CandidateProfile Response ", state.candidateData);
        return dispatch({
          type: "CANDIDATE_PROFILE",
          payload: state.candidateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Search by reference emp name1 or emp id
  const searchForEmp1 = (key) => {
    candidate
      .get("/api/v2/candidate/reference/search?key=" + key)
      .then((response) => {
        if (response.data.data === null) {
          state.searchEmpData1 = response.data.data;
          console.log("response.data.data", response.data.data);
          toast.info(response.data.message);
        } else {
          state.searchEmpData1 = response.data.data[0];
          console.log("response.data.data[0]", response.data.data[0]);
        }
        console.log("response", response);
        console.log("search Emp response", state.searchEmpData1);
        return dispatch({ type: "SEARCH_EMP1", payload: state.searchEmpData1 });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Search by reference emp name2 or emp id
  const searchForEmp2 = (key) => {
    candidate
      .get("/api/v2/candidate/reference/search?key=" + key)
      .then((response) => {
        if (response.data.data === null) {
          state.searchEmpData2 = response.data.data;
          console.log("response.data.data", response.data.data);
          toast.info(response.data.message);
        } else {
          state.searchEmpData2 = response.data.data[0];
          console.log("response.data.data[0]", response.data.data[0]);
        }
        console.log("response", response);
        console.log("search Emp response", state.searchEmpData2);
        return dispatch({ type: "SEARCH_EMP2", payload: state.searchEmpData2 });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CreateNominee = (createDate) => {
    console.log("create nominee data -----");
    console.log(createDate);
    return candidate
      .post("/api/v2/candidate/insurance-nomination/create", createDate)
      .then((response) => {
        state.CreateNomineeResponse = response.data.data;
        console.log(response);
        console.log("create nominee response--->", state.CreateNomineeResponse);
        toast.info(response.data.message);
        console.log(response.data.message);
        return dispatch({
          type: "CREATE_NOMINEE_DATA",
          payload: state.CreateNomineeResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const InsuranceNominationView = (candidateId) => {
    candidate
      .get("/api/v2/candidate/insurance-nomination/view/" + candidateId)
      .then((response) => {
        state.candidateInsuranceNominationData = response.data.data;
        console.log(
          "Candidate Insurance Nomination Data ",
          state.candidateInsuranceNominationData
        );
        return dispatch({
          type: "CANDIDATE_INSURANCE_NOMINEE_DATA",
          payload: state.candidateInsuranceNominationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const StateList = (country) => {
    candidate
      .get("/api/v2/candidate/address/view/state/" + country)
      .then((response) => {
        state.stateList = response.data.data;
        console.log("CandidateProfile Response ", state.stateList);
        return dispatch({
          type: "STATE_LIST",
          payload: state.stateList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CityList = (stateItem) => {
    candidate
      .get("/api/v2/candidate/address/view/city/" + stateItem)
      .then((response) => {
        state.CityList = response.data.data;
        console.log("CandidateProfile Response ", state.cityList);
        return dispatch({
          type: "CITY_LIST",
          payload: state.cityList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CandidateViewInformation = (candidateId) => {
    candidate
      .get("/api/v2/candidate/view/workInfo/" + candidateId)
      .then((response) => {
        state.candidateViewInfo = response.data.data;
        console.log("CandidateView Response ", state.candidateViewInfo);
        return dispatch({
          type: "CANDIDATE_VIEW_INFO",
          payload: state.candidateViewInfo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const candidateCountryList = () => {
    candidate
      .get("/api/v2/candidate/address/view/country")
      .then((response) => {
        state.candidateCountryData = response.data.data;
        console.log("candidateCountryData name", state.candidateCountryData);
        return dispatch({
          type: "CANDIDATE_COUNTRY_LIST",
          payload: state.candidateCountryData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CandidateStateList = (countryName) => {
    console.log("CandidateStateList", countryName);
    candidate
      .get("/api/v2/candidate/address/view/state/" + countryName)
      // candidate
      //   .get("/api/v2/candidate/address/view/state/India")
      .then((response) => {
        state.candidateStateData = response.data.data;
        console.log("candidateStateData name", state.candidateStateData);
        return dispatch({
          type: "CANDIDATE_STATE_LIST",
          payload: state.candidateStateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const candidateCityList = (StateId) => {
    console.log("candidateCityList", StateId);
    candidate
      .get("/api/v2/candidate/address/view/city/" + StateId)
      // candidate
      //   .get("/api/v2/candidate/address/view/city/1")
      .then((response) => {
        state.candidateCityData = response.data.data;
        console.log("candidateCityData name", state.candidateCityData);
        return dispatch({
          type: "CANDIDATE_CITY_LIST",
          payload: state.candidateCityData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addressCreate = (AddressInfo) => {
    console.log("addressCreate", AddressInfo);
    candidate
      .post("/api/v2/candidate/address/create", AddressInfo)
      .then((response) => {
        state.addressSaveData = response.data.data;
        toast.info(response.data.message);
        console.log("addressSaveData name", state.addressSaveData);
        return dispatch({
          type: "CANDIDATE_ADDRESS_DATA",
          payload: state.addressSaveData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addressView = (candidateId) => {
    console.log("addressView" + candidateId);
    candidate
      .get("/api/v2/candidate/address/view/" + candidateId)
      .then((response) => {
        state.addressViewData = response.data.data;
        console.log("addressViewData name", state.addressViewData);
        return dispatch({
          type: "CANDIDATE_ADDRESS_VIEW_DATA",
          payload: state.addressViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bankCreate = (bankInfo) => {
    console.log("bankCreate", bankInfo);
    candidate
      .post("/api/v2/candidate/bank/create", bankInfo)
      .then((response) => {
        state.bankSaveData = response.data.data;
        toast.info(response.data.message);
        console.log("bankSaveData name", state.bankSaveData);
        return dispatch({
          type: "CANDIDATE_BANK_DATA",
          payload: state.bankSaveData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bankUpdate = (bankInfo) => {
    console.log("bankUpdate", bankInfo);
    candidate
      .post("/api/v2/candidate/bank/update", bankInfo)
      .then((response) => {
        state.bankUpdateData = response.data.data;
        console.log("bankUpdateData", state.bankUpdateData);
        return dispatch({
          type: "CANDIDATE_BANK_UPDATE_DATA",
          payload: state.bankUpdateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bankView = (candidateId) => {
    console.log("bankView", candidateId);
    candidate
      .get("/api/v2/candidate/bank/view/" + candidateId)
      .then((response) => {
        state.bankViewData = response.data.data;
        console.log("bankViewData name", state.bankViewData);
        return dispatch({
          type: "CANDIDATE_BANK_VIEW_DATA",
          payload: state.bankViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <OnBoardContext.Provider
      value={{
        updatePersonalInfo,
        CandidateProfile,
        StateList,
        CityList,
        searchForEmp1,
        searchForEmp2,
        CandidateViewInformation,
        CandidatePersonalInfo,
        CreateNominee,
        InsuranceNominationView,
        searchEmpData1: state.searchEmpData1,
        searchEmpData2: state.searchEmpData2,
        candidateCountryList,
        CandidateStateList,
        candidateCityList,
        addressCreate,
        addressView,
        bankCreate,
        bankView,
        bankUpdate,
        name: state.name,
        PersonalInfoResponse: state.PersonalInfoResponse,
        CreateNomineeResponse: state.CreateNomineeResponse,
        candidateInsuranceNominationData:
          state.candidateInsuranceNominationData,
        candidatePersonalInfoData: state.candidatePersonalInfoData,
        candidateData: state.candidateData,
        stateList: state.stateList,
        cityList: state.cityList,
        candidateViewInfo: state.candidateViewInfo,
        candidateCountryData: state.candidateCountryData,
        candidateStateData: state.candidateStateData,
        candidateCityData: state.candidateCityData,
        addressSaveData: state.addressSaveData,
        addressViewData: state.addressViewData,
        bankSaveData: state.bankSaveData,
        bankViewData: state.bankViewData,
        bankUpdateData: state.bankUpdateData,
      }}
    >
      {props.children}
    </OnBoardContext.Provider>
  );
};
