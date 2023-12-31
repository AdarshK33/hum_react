import React, { createContext, useReducer, useState } from "react";
import StateManager from "react-select";
import OnBoardReducer from "../reducers/OnBoardReducer";
import { candidate } from "../utils/canditateLogin";
import { toast } from "react-toastify";

export const OnBoardContext = createContext();
const initial_state = {
  name: " ",
  Infodata: [],
  emergencyContactData: {},
  emergencyContactCreate: {},
  emergencyContactView: {},
  pfDeclarationCreate: {},
  pfDeclarationUpdate: {},
  pfDeclarationView: {},
  PersonalInfoResponse: {},
  CreateNomineeResponse: {},
  candidateInsuranceNominationData: {},
  candidateProfileData: {},
  candidatePersonalInfoData: {},
  searchEmpData1: [],
  searchEmpData2: [],
  stateList: [],
  cityList: [],
  candidateViewInfo: {},
  candidateCountryData: [],
  candidateStateData: [],
  candidatePresentCityData: [],
  candidatePermanentCityData: [],
  addressSaveData: {},
  addressViewData: [],
  bankSaveData: {},
  bankViewData: [],
  bankUpdateData: {},
  documentViewData: [],
  docViewData:[],
  documentUploadData: {},
  deleteNomineeData: {},
  deleteAllNomineeData: {},
  insuranceTopUpData: [],
  candidateLetterData: {},
  premiumViewData: [],
};
// git
export const OnBoardProvider = (props) => {
  const [state, dispatch] = useReducer(OnBoardReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const updatePersonalInfo = (updateData) => {
    console.log("Info data -----");
    console.log(updateData);
    setLoader(true);
    return candidate
      .post("/api/v2/candidate/update", updateData)
      .then((response) => {
        console.log("personal Information message", response.data);
        state.PersonalInfoResponse = response.data.data;
        console.log(
          "personal Information response--->",
          state.PersonalInfoResponse
        );
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
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
    setLoader(true);
    candidate
      .get("/api/v2/candidate/" + candidateId)
      .then((response) => {
        state.candidatePersonalInfoData = response.data.data;
        console.log(
          "Candidate Personal information  Response ",
          state.candidatePersonalInfoData
        );
        // toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "CANDIDATE_PERSONAL_INFODATA",
          payload: state.candidatePersonalInfoData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactCreate = (createData) => {
    console.log("EmergencyContactCreate data -----");
    console.log(createData);
    setLoader(true);
    return candidate
      .post("/api/v2/candidate/contact/create", createData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "EMERGENCY_CONTACT_CREATE",
          payload: state.emergencyContactCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactUpdate = (updateData) => {
    console.log("EmergencyContactUpdate data -----");
    console.log(updateData);
    setLoader(true);
    return candidate
      .post("/api/v2/candidate/contact/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "EMERGENCY_CONTACT_UPDATE",
          payload: state.emergencyContactCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactView = (data) => {
    setLoader(true);
    candidate
      .get(`/api/v2/candidate/contact/view/${data}`)
      .then((response) => {
        state.emergencyContactView = response.data.data;
        console.log(
          "EmergencyContactView Response ",
          response,
          state.emergencyContactView
        );
        setLoader(false);
        return dispatch({
          type: "EMERGENCY_CONTACT_VIEW",
          payload: state.emergencyContactView,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PFDeclarationCreate = (createData) => {
    console.log("PFDeclarationCreate data -----");
    console.log(createData);
    return candidate
      .post("/api/v2/candidate/pf/create", createData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        PFDeclarationView(response.data.data.candidateId);
        return dispatch({
          type: "PFDECLARATION_CREATE",
          payload: state.pfDeclarationCreate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PFDeclarationUpdate = (updateData) => {
    console.log("PFDeclarationUpdate data -----");
    console.log(updateData);
    return candidate
      .post("/api/v2/candidate/pf/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        PFDeclarationView(response.data.data.candidateId);
        return dispatch({
          type: "PFDECLARATION_UPDATE",
          payload: state.pfDeclarationUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PFDeclarationView = (data) => {
    candidate
      .get(`/api/v2/candidate/pf/view/${data}`)
      .then((response) => {
        state.pfDeclarationView = response.data.data;
        console.log(
          "PFeclarationView Response ",
          response,
          state.pfDeclarationView
        );
        return dispatch({
          type: "PFDECLARATION_VIEW",
          payload: state.pfDeclarationView,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CandidateProfile = () => {
    setLoader(true);
    candidate
      .get("/api/v2/candidate/profile")
      .then((response) => {
        state.candidateProfileData = response.data.data;
        console.log("CandidateProfile Response ", state.candidateProfileData);
        setLoader(false);
        return dispatch({
          type: "CANDIDATE_PROFILE",
          payload: state.candidateProfileData,
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

  const InsuranceNominationDelete = (nomineeId) => {
    setLoader(true);
    candidate
      .get("/api/v2/candidate/insurance-nomination/delete/" + nomineeId)
      .then((response) => {
        // toast.info(response.data.message);
        state.deleteNomineeData = response.data;
        console.log(
          "Candidate Insurance Nomination delete ",
          state.deleteNomineeData
        );
        setLoader(false);
        return dispatch({
          type: "DELETE_NOMINEE_DATA",
          payload: state.deleteNomineeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteAllInsuranceNominations = (candidteId) => {
    setLoader(true);
    candidate
      .get(
        "/api/v2/candidate/insurance-nomination/delete?candidateId=" +
          candidteId
      )
      .then((response) => {
        toast.info(response.data.message);
        state.deleteAllNomineeData = response.data;
        console.log(
          "Candidate Insurance Nomination delete All ",
          state.deleteAllNomineeData
        );
        setLoader(false);
        InsuranceNominationView(candidteId);
        return dispatch({
          type: "DELETE_ALL_NOMINEE_DATA",
          payload: state.deleteAllNomineeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateNomineeStatus = (candidateId, status) => {
    candidate
      .get(
        "/api/v2/candidate/" +
          candidateId +
          "/change/nomination-status?status=" +
          status
      )
      .then((response) => {
        // toast.info(response.data.message);
        // state.deleteNomineeData = response.data;
        console.log("Candidate Insurance Nomination status ", response);
        // return dispatch({
        //   type: "DELETE_NOMINEE_DATA",
        //   payload: state.deleteNomineeData,
        // });
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

  const candidatePermanentCityList = (StateId) => {
    console.log("candidatePermanentCityList", StateId);
    candidate
      .get("/api/v2/candidate/address/view/city/" + StateId)
      .then((response) => {
        state.candidatePermanentCityData = response.data.data;
        console.log(
          "candidatePermanentCityData name",
          state.candidatePermanentCityData
        );
        return dispatch({
          type: "CANDIDATE_PERMANENT_CITY_LIST",
          payload: state.candidatePermanentCityData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const candidatePresentCityList = (StateId) => {
    console.log("candidatePresentCityList", StateId);
    candidate
      .get("/api/v2/candidate/address/view/city/" + StateId)
      .then((response) => {
        state.candidatePresentCityData = response.data.data;
        console.log(
          "candidatePresentCityData name",
          state.candidatePresentCityData
        );
        return dispatch({
          type: "CANDIDATE_PRESENT_CITY_LIST",
          payload: state.candidatePresentCityData,
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
        toast.info(response.data.message);
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

  const documentView = (candidateId) => {
    console.log("documentView", candidateId);
    candidate
      .get("/api/v2/candidate/documents/view/" + candidateId)
      .then((response) => {
        state.documentViewData = response.data.data;
        console.log("documentViewData", state.documentViewData);
        return dispatch({
          type: "CANDIDATE_DOCUMENT_VIEW_DATA",
          payload: state.documentViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CandidateDocView = (candidateId, fileName) => {
    console.log("documentView", candidateId);
    candidate
      .get("/api/v2/candidate/documents/view/file/" + candidateId +"?fileName=" + fileName)
      .then((response) => {
        state.docViewData = response.data.data;
        console.log("docViewData", state.docViewData);
        return dispatch({
          type: "CANDIDATE_DOC_VIEW_DATA",
          payload: state.docViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const uploadFile = (fileInfo) => {
    console.log("uploadFile state", fileInfo);
    const photoFile = fileInfo.file;
    const formData = new FormData();
    formData.append("file", photoFile, photoFile.name);
    formData.append("candidateId", fileInfo.candidateId);
    formData.append("fileType", fileInfo.fileType);
    console.log("uploadFile", photoFile);
    return candidate
      .post("/api/v2/candidate/documents/upload", formData)
      .then((response) => {
        console.log(response, "res uploadFile");
        toast.info(response.data.message);
      })
      .catch((error) => {
        // toast.info("Please upload a valid file");
        console.log(error);
      });
  };

  const completeDocumentUpload = (id) => {
    console.log(" document id", id);
    return candidate
      .get("/api/v2/candidate/documents/complete?candidateId=" + id)
      .then((response) => {
        state.documentUploadData = response.data.data;
        console.log("documentUploadData.message", state.documentUploadData);
        toast.info(response.data.message);
        return dispatch({
          type: "DOCUMENT_UPLOAD_DATA",
          payload: state.documentUploadData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const insuranceTopUpView = (year) => {
    console.log("insuranceTopUpView", year);
    candidate
      .get(
        "/api/v2/candidate/insurance-nomination/view/premium?page=0&size=10&year=" +
          year
      )
      .then((response) => {
        state.insuranceTopUpData = response.data.data.data;
        console.log("insuranceTopUpData", state.insuranceTopUpData);
        return dispatch({
          type: "INSURANCE_TOPUP_DATA",
          payload: state.insuranceTopUpData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const premiumView = (insuranceId, candidateId) => {
    console.log("premiumView", insuranceId, candidateId);
    candidate
      .get(
        "/api/v2/candidate/insurance-nomination/view/" +
          insuranceId +
          "/" +
          candidateId
      )
      .then((response) => {
        state.premiumViewData = response.data.data;
        console.log("premiumViewData", state.premiumViewData);
        return dispatch({
          type: "PREMIUM_DATA",
          payload: state.premiumViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateCandidateLetter = (id) => {
    console.log("state offer id", id);
    return (
      candidate
        // .get("/api/v1/candidate/offer/54")
        .get("/api/v2/candidate/offer/" + id)
        .then((response) => {
          state.candidateLetterData = response.data.data;
          console.log("offer.message", state.candidateLetterData);
          return dispatch({
            type: "CANDIDATE_LETTER_DATA",
            payload: state.candidateLetterData,
          });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const number2text = (value) => {
    var fraction = Math.round(frac(value) * 100);
    var f_text = "";
    if (fraction > 0) {
      f_text = "AND " + convert_number(fraction) + " PAISE";
    }
    return convert_number(value) + " RUPEE " + f_text + " ONLY";
  };
  const frac = (f) => {
    return f % 1;
  };
  const convert_number = (number) => {
    if (number < 0 || number > 999999999) {
      return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000); /* Crore */
    number -= Gn * 10000000;
    var kn = Math.floor(number / 100000); /* lakhs */
    number -= kn * 100000;
    var Hn = Math.floor(number / 1000); /* thousand */
    number -= Hn * 1000;
    var Dn = Math.floor(number / 100); /* Tens (deca) */
    number = number % 100; /* Ones */
    var tn = Math.floor(number / 10);
    var one = Math.floor(number % 10);
    var res = "";
    if (Gn > 0) {
      res += convert_number(Gn) + " CRORE";
    }
    if (kn > 0) {
      res += (res == "" ? "" : " ") + convert_number(kn) + " LAKH";
    }
    if (Hn > 0) {
      res += (res == "" ? "" : " ") + convert_number(Hn) + " THOUSAND";
    }

    if (Dn) {
      res += (res == "" ? "" : " ") + convert_number(Dn) + " HUNDRED";
    }
    var ones = Array(
      "",
      "ONE",
      "TWO",
      "THREE",
      "FOUR",
      "FIVE",
      "SIX",
      "SEVEN",
      "EIGHT",
      "NINE",
      "TEN",
      "ELEVEN",
      "TWELVE",
      "THIRTEEN",
      "FOURTEEN",
      "FIFTEEN",
      "SIXTEEN",
      "SEVENTEEN",
      "EIGHTEEN",
      "NINETEEN"
    );
    var tens = Array(
      "",
      "",
      "TWENTY",
      "THIRTY",
      "FOURTY",
      "FIFTY",
      "SIXTY",
      "SEVENTY",
      "EIGHTY",
      "NINETY"
    );

    if (tn > 0 || one > 0) {
      if (!(res == "")) {
        res += " AND ";
      }
      if (tn < 2) {
        res += ones[tn * 10 + one];
      } else {
        res += tens[tn];
        if (one > 0) {
          res += "-" + ones[one];
        }
      }
    }

    if (res == "") {
      res = "zero";
    }
    return res;
  };

  return (
    <OnBoardContext.Provider
      value={{
        updatePersonalInfo,
        CandidateProfile,
        StateList,
        CityList,
        EmergencyContactCreate,
        EmergencyContactUpdate,
        EmergencyContactView,
        PFDeclarationCreate,
        PFDeclarationUpdate,
        PFDeclarationView,
        searchForEmp1,
        searchForEmp2,
        CandidateViewInformation,
        CandidatePersonalInfo,
        CreateNominee,
        InsuranceNominationView,
        candidateCountryList,
        CandidateStateList,
        candidatePermanentCityList,
        candidatePresentCityList,
        addressCreate,
        addressView,
        bankCreate,
        bankView,
        bankUpdate,
        uploadFile,
        documentView,
        completeDocumentUpload,
        InsuranceNominationDelete,
        DeleteAllInsuranceNominations,
        UpdateNomineeStatus,
        insuranceTopUpView,
        generateCandidateLetter,
        premiumView,
        number2text,
        CandidateDocView,
        deleteAllNomineeData: state.deleteAllNomineeData,
        deleteNomineeData: state.deleteNomineeData,
        emergencyContactData: state.emergencyContactData,
        emergencyContactCreate: state.emergencyContactCreate,
        emergencyContactView: state.emergencyContactView,
        pfDeclarationCreate: state.pfDeclarationCreate,
        pfDeclarationUpdate: state.pfDeclarationUpdate,
        pfDeclarationView: state.pfDeclarationView,
        searchEmpData1: state.searchEmpData1,
        searchEmpData2: state.searchEmpData2,
        name: state.name,
        PersonalInfoResponse: state.PersonalInfoResponse,
        CreateNomineeResponse: state.CreateNomineeResponse,
        candidateInsuranceNominationData:
          state.candidateInsuranceNominationData,
        candidatePersonalInfoData: state.candidatePersonalInfoData,
        candidateProfileData: state.candidateProfileData,
        stateList: state.stateList,
        cityList: state.cityList,
        candidateViewInfo: state.candidateViewInfo,
        candidateCountryData: state.candidateCountryData,
        candidateStateData: state.candidateStateData,
        candidatePermanentCityData: state.candidatePermanentCityData,
        candidatePresentCityData: state.candidatePresentCityData,
        addressSaveData: state.addressSaveData,
        addressViewData: state.addressViewData,
        bankSaveData: state.bankSaveData,
        bankViewData: state.bankViewData,
        bankUpdateData: state.bankUpdateData,
        documentViewData: state.documentViewData,
        documentUploadData: state.documentUploadData,
        insuranceTopUpData: state.insuranceTopUpData,
        candidateLetterData: state.candidateLetterData,
        premiumViewData: state.premiumViewData,
        docViewData:state.docViewData
      }}
    >
      {props.children}
    </OnBoardContext.Provider>
  );
};
