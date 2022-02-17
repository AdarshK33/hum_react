import React, { createContext, useReducer, useState } from "react";
import { client } from "../utils/axios";
import OfferReducer from "../reducers/OfferReducer";
import { toast } from "react-toastify";

const initial_state = {
  candidateList: [],
  createCandidateResponse: {},
  total: {},
  data: [],
  searchData: {},
  departmentName: [],
  designationName: [],
  locationName: {},
  searchEmpData1: [],
  searchEmpData2: [],
  candidateData: {},
  workInformationData: {},
  remunerationData: {},
  remunerationViewData: {},
  offerLetterData: {},
  submitOfferLetter: {},
  workInfoViewData: {},
  stateList: [],
  cityList: [],
  managerList: [],
  allManagerList: [],
  aadhaarNotificationData: {},
  submitAppointmentLetter: {},
  noticePeriodViewData: {},
  costcenterByDepartmentData:[],
  allCostCenterList:[]
};

export const OfferContext = createContext();

export const OfferProvider = (props) => {
  const [state, dispatch] = useReducer(OfferReducer, initial_state);
  const [loader, setLoader] = useState(false);

  // Offer List api
  const candidateView = (key, page, status = 5) => {
    setLoader(true);
    client
      .get(
        "/api/v1/candidate/view?key=" +
          key +
          "&overAllStatus=" +
          status +
          "&page=" +
          page +
          "&size=" +
          10 +
          "&superManager=" +
          0
      )
      .then((response) => {
        state.candidateList = response.data.data.data;
        state.data = response.data.data;
        state.total = state.data.total;
        setLoader(false);
        console.log("candidateList response", state.candidateList);
        return dispatch({
          type: "CANDIDATE_LIST",
          payload: state.candidateList,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //candidate create api
  const createCandidate = (createData) => {
    return client
      .post("/api/v1/candidate/create", createData)
      .then((response) => {
        state.createCandidateResponse = response.data.data;
        toast.info(response.data.message);
        console.log(
          "create candidate response data",
          state.createCandidateResponse
        );
        return dispatch({
          type: "CREATE_CANDIDATE",
          payload: state.createCandidateResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //take candidate id
  const viewCandidateId = (id) => {
    console.log("viewCandidateData id", id);
    client
      .get("/api/v1/candidate/" + id)
      .then((response) => {
        if (id !== 0) {
          state.candidateData = response.data.data;
          console.log("viewCandidateData response", state.candidateData);
        } else {
          state.candidateData = {};
          console.log("viewCandidateData response 0", state.candidateData);
        }
        return dispatch({
          type: "VIEW_CANDIDATE_ID",
          payload: state.candidateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //edit candidate api
  const editCandidate = (updateData) => {
    return client
      .post("/api/v1/candidate/update", updateData)
      .then((response) => {
        toast.info(response.data.message);
        return dispatch({
          type: "UPDATE_CANDIDATE",
          payload: state.createCandidateResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Work Information create api
  const createCandidateWork = (createData) => {
    return client
      .post("/api/v1/candidate/work-information/create", createData)
      .then((response) => {
        toast.info(response.data.message);
        state.workInformationData = response.data.data;
        return dispatch({
          type: "CREATE_CANDIDATE_WORK",
          payload: state.workInformationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Work Information update api
  const updateCandidateWork = (updateData) => {
    return client
      .post("/api/v1/candidate/work-information/create", updateData)
      .then((response) => {
        toast.info(response.data.message);
        state.workInformationData = response.data.data;
        return dispatch({
          type: "UPDATE_CANDIDATE_WORK",
          payload: state.workInformationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Search by aadhar card/bank account
  const searchByAadhar = (number) => {
    client
      .get("/api/v1/employee/exit/search?number=" + number)
      .then((response) => {
        if (response.data.data === null) {
          toast.info(response.data.message);
          console.log("search response null", response.data.data);
        } else {
          state.searchData = response.data.data;
          console.log("search response in search data", state.searchData);
        }

        return dispatch({ type: "SEARCH_AADHAR", payload: state.searchData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Search by reference emp name1 or emp id
  const searchForEmp1 = (key) => {
    client
      .get("/api/v1/employee/search?key=" + key)
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

  const makeSearchEmp1DataNull = () => {
    state.searchEmpData1 = [];
    return dispatch({ type: "SEARCH_EMP1", payload: state.searchEmpData1 });
  };
  //Search by reference emp name2 or emp id
  const searchForEmp2 = (key) => {
    client
      .get("/api/v1/employee/search?key=" + key)
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

  // Department api for work information
  const departmentView = () => {
    client
      .get("/api/v1/department/view")
      .then((response) => {
        state.departmentName = response.data.data;
        console.log("DEPARTMENT response", state.departmentName);
        return dispatch({ type: "DEPARTMENT", payload: state.departmentName });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Designation api for work information
  const designationView = () => {
    client
      .get("/api/v1/designation/view")
      .then((response) => {
        state.designationName = response.data.data;
        console.log("designationName response", state.designationName);
        return dispatch({
          type: "DESIGNATION",
          payload: state.designationName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // location api for work information
  const locationView = async (costCenter) => {
    console.log("locationView",costCenter);
    const result1 = await client.get("/api/v1/location/view/" + costCenter);
    const result2 = await client.get(
      `api/v1/employee/view/${costCenter}/managers`
    );
    const result3 = await client.get(
      `api/v1/employee/view/managers/${costCenter}`
    );
    state.locationName = result1.data.data;
    state.managerList = result2.data.data;
    state.allManagerList = result3.data.data;
    console.log("locationName response", state.locationName,state.managerList,state.allManagerList);
    return dispatch({
      type: "LOCATION",
      payload: (state.locationName, state.managerList,state.allManagerList),
    });

    /* .get("/api/v1/location/view/" + costCenter)
      .then((response) => {
        state.locationName = response.data.data;
        console.log("locationName response", state.locationName);
        return dispatch({ type: "LOCATION", payload: state.locationName });
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  const remunerationSave = (createData) => {
    console.log("remuneration offerstate", createData);
    return client
      .post("/api/v1/candidate/remuneration/create", createData)
      .then((response) => {
        if (response.status === 200) {
          state.remunerationData = response.data.data;
          toast.info(response.data.message);
          console.log("remuneration.message", state.remunerationData);
        } else {
          toast.info("Something went wrong");
        }

        return dispatch({
          type: "REMUNERATION_DATA",
          payload: state.remunerationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const remunerationUpdate = (updateData) => {
    console.log("edit data", updateData);
    return client
      .post("/api/v1/candidate/remuneration/create", updateData)
      .then((response) => {
        state.remunerationData = response.data.data;
        toast.info(response.data.message);
        console.log("state.message", state.remunerationData);
        return dispatch({
          type: "REMUNERATION_UPDATE_DATA",
          payload: state.remunerationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const remunerationView = (id) => {
    console.log("view data", id);
    return client
      .get("/api/v1/candidate/remuneration/view/" + id)
      .then((response) => {
        state.remunerationViewData = response.data.data;
        console.log("state.message", state.remunerationViewData);
        return dispatch({
          type: "REMUNERATION_VIEW_DATA",
          payload: state.remunerationViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateOfferLetter = (id) => {
    console.log("state offer id", id);
    return (
      client
        // .get("/api/v1/candidate/offer/54")
        .get("/api/v1/candidate/offer/" + id)
        .then((response) => {
          state.offerLetterData = response.data.data;
          console.log("offer.message", state.offerLetterData);
          return dispatch({
            type: "OFFER_LETTER_DATA",
            payload: state.offerLetterData,
          });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const finalSubmitOfferLetter = (id) => {
    console.log("state submit id", id);
    return (
      client
        // .get("/api/v1/candidate/notification/54")
        .get("/api/v1/candidate/notification/" + id)
        .then((response) => {
          state.submitOfferLetter = response.data.data;
          console.log("offer.message", state.submitOfferLetter);
          return dispatch({
            type: "SUBMIT_OFFER_LETTER",
            payload: state.submitOfferLetter,
          });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const workInfoView = (id) => {
    console.log("work info id", id);
    return client
      .get("/api/v1/candidate/work-information/view/" + id)
      .then((response) => {
        state.workInfoViewData = response.data.data;
        console.log("workInfoViewData.message", state.workInfoViewData);
        return dispatch({
          type: "WORK_INFO_VIEW",
          payload: state.workInfoViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //State api
  const stateData = () => {
    client
      .get("/api/v1/city/view")
      .then((response) => {
        state.stateList = response.data.data;
        console.log("state name", state.stateList);
        return dispatch({ type: "STATE", payload: state.stateList });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //City api
  const cityData = (stateId) => {
    if (stateId !== undefined) {
      client
        .get("/api/v1/location/view/stateId?stateId=" + stateId)
        .then((response) => {
          state.cityList = response.data.data;
          console.log("city name", state.cityList);
          return dispatch({ type: "CITY", payload: state.cityList });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const adhaarVerificationNotification = (id) => {
    console.log("state aadhaarNotificationData id", id);
    return (
      client
        // .get("/api/v1/candidate/offer/54")
        .get("/api/v1/candidate/verification/complete?candidateId=" + id)
        .then((response) => {
          state.aadhaarNotificationData = response.data.data;
          console.log(
            "aadhaarNotificationData.message",
            state.aadhaarNotificationData
          );
          toast.info(response.data.message);
          return dispatch({
            type: "ADHAAR_NOTIFICATION_DATA",
            payload: state.aadhaarNotificationData,
          });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const finalSubmitAppointmentLetter = (id) => {
    console.log("state appoint submit id", id);
    return client
      .get("/api/v1/candidate/" + id + "/appointment")
      .then((response) => {
        state.submitAppointmentLetter = response.data.data;
        console.log("appoint.message", state.submitAppointmentLetter);
        return dispatch({
          type: "SUBMIT_APPOINTMENT_LETTER",
          payload: state.submitAppointmentLetter,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const noticePeriodView = (contractType, department) => {
    console.log("contractType,department", contractType, department);
    return client
      .get(
        "/api/v1/notice/view/department?contractType=" +
          contractType +
          "&department=" +
          department
      )
      .then((response) => {
        state.noticePeriodViewData = response.data.data;
        console.log("noticePeriodViewData.message", state.noticePeriodViewData);
        return dispatch({
          type: "NOTICE_PERIOD_VIEW",
          payload: state.noticePeriodViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const noShowCandidate = (candidateId, searchValue, pageCount) => {
    setLoader(true);
    return client
      .get("/api/v1/candidate/" + candidateId + "/noShow")
      .then((response) => {
        console.log("NoShow", response.data);
        candidateView(searchValue, pageCount);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const costcenterByDepartment = (department,superMangerFlag) => {
    console.log("department,superMangerFlag",  department,superMangerFlag);
    return client
      .get("/api/v1/cost_centre/view/department?department="+department+"&superManager="+superMangerFlag
      )
      .then((response) => {
        state.costcenterByDepartmentData = response.data.data;
        console.log("costcenterByDepartmentData.message", state.costcenterByDepartmentData);
        return dispatch({
          type: "COSTCENTER_BY_DEPARTMENT",
          payload: state.costcenterByDepartmentData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

    // All Cost Center List
    const AllCostCenter = (superMangerFlag) => {
      client
        .get("/api/v1/cost_centre/view-all-costcentre?superManager="+superMangerFlag)
        .then((response) => {
          state.allCostCenterList = response.data.data;
          console.log("cost center data", state.allCostCenterList);
          return dispatch({
            type: "ALL_COST_CENTER_DATA",
            payload: state.allCostCenterList,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const number2text=(value)=> {
      var fraction = Math.round(frac(value)*100);
      var f_text  = "";
      if(fraction > 0) {
          f_text = "AND "+convert_number(fraction)+" PAISE";
      }
      return convert_number(value)+" RUPEE "+f_text+" ONLY";
  }
  const frac=(f)=> {
      return f % 1;
  }
  const convert_number=(number)=>
  {
      if ((number < 0) || (number > 999999999))
      {
          return "NUMBER OUT OF RANGE!";
      }
      var Gn = Math.floor(number / 10000000);  /* Crore */
      number -= Gn * 10000000;
      var kn = Math.floor(number / 100000);     /* lakhs */
      number -= kn * 100000;
      var Hn = Math.floor(number / 1000);      /* thousand */
      number -= Hn * 1000;
      var Dn = Math.floor(number / 100);       /* Tens (deca) */
      number = number % 100;               /* Ones */
      var tn= Math.floor(number / 10);
      var one=Math.floor(number % 10);
      var res = "";
      if (Gn>0)
      {
          res += (convert_number(Gn) + " CRORE");
      }
      if (kn>0)
      {
              res += (((res=="") ? "" : " ") +
              convert_number(kn) + " LAKH");
      }
      if (Hn>0)
      {
          res += (((res=="") ? "" : " ") +
              convert_number(Hn) + " THOUSAND");
      }
  
      if (Dn)
      {
          res += (((res=="") ? "" : " ") +
              convert_number(Dn) + " HUNDRED");
      }
      var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN");
  var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY");
  
      if (tn>0 || one>0)
      {
          if (!(res==""))
          {
              res += " AND ";
          }
          if (tn < 2)
          {
              res += ones[tn * 10 + one];
          }
          else
          {
  
              res += tens[tn];
              if (one>0)
              {
                  res += ("-" + ones[one]);
              }
          }
      }
  
      if (res=="")
      {
          res = "zero";
      }
      return res;
  }
  
  return (
    <OfferContext.Provider
      value={{
        searchByAadhar,
        departmentView,
        designationView,
        locationView,
        candidateView,
        createCandidate,
        createCandidateWork,
        searchForEmp1,
        searchForEmp2,
        viewCandidateId,
        editCandidate,
        updateCandidateWork,
        remunerationSave,
        remunerationUpdate,
        remunerationView,
        generateOfferLetter,
        finalSubmitOfferLetter,
        workInfoView,
        stateData,
        cityData,
        adhaarVerificationNotification,
        finalSubmitAppointmentLetter,
        makeSearchEmp1DataNull,
        noticePeriodView,
        noShowCandidate,
        costcenterByDepartment,
        AllCostCenter,
        number2text,
        searchData: state.searchData,
        departmentName: state.departmentName,
        designationName: state.designationName,
        locationName: state.locationName,
        candidateList: state.candidateList,
        loader: loader,
        total: state.total,
        searchEmpData1: state.searchEmpData1,
        searchEmpData2: state.searchEmpData2,
        candidateData: state.candidateData,
        createCandidateResponse: state.createCandidateResponse,
        remunerationData: state.remunerationData,
        remunerationViewData: state.remunerationViewData,
        offerLetterData: state.offerLetterData,
        submitOfferLetter: state.submitOfferLetter,
        workInfoViewData: state.workInfoViewData,
        stateList: state.stateList,
        cityList: state.cityList,
        managerList: state.managerList,
        allManagerList:state.allManagerList,
        workInformationData: state.workInformationData,
        aadhaarNotificationData: state.aadhaarNotificationData,
        submitAppointmentLetter: state.submitAppointmentLetter,
        noticePeriodViewData: state.noticePeriodViewData,
        costcenterByDepartmentData:state.costcenterByDepartmentData,
        allCostCenterList:state.allCostCenterList
      }}
    >
      {props.children}
    </OfferContext.Provider>
  );
};
