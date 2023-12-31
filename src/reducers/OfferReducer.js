const GroupReducer = (state, action) => {
  switch (action.type) {
    case "CANDIDATE_LIST":
      return {
        ...state,
        candidateList: action.payload,
        loader: action.loader,
        data: action.data,
        total: action.total,
      };

    case "CREATE_CANDIDATE":
      return { ...state, createCandidateResponse: action.payload };

    case "UPDATE_CANDIDATE":
      return { ...state, createCandidateResponse: action.payload };

    case "VIEW_CANDIDATE_ID":
      return { ...state, candidateData: action.payload };

    case "CREATE_WORK_CANDIDATE":
      return { ...state, workInformationData: action.payload };

    case "UPDATE_WORK_CANDIDATE":
      return { ...state, workInformationData: action.payload };

    case "SEARCH_AADHAR":
      return { ...state, searchData: action.payload };

    case "SEARCH_EMP1":
      return { ...state, searchEmpData1: action.payload };

    case "SEARCH_EMP2":
      return { ...state, searchEmpData2: action.payload };

    case "DEPARTMENT":
      return { ...state, departmentName: action.payload };

    case "DESIGNATION":
      return { ...state, designationName: action.payload };

    case "LOCATION":
      return { ...state,locationName:action.payload,
        allManagerList:action.allManagerList,
        managerList:action.managerList 
      };

    case "REMUNERATION_DATA":
      return { ...state, remunerationData: action.payload };

    case "REMUNERATION_UPDATE_DATA":
      return { ...state, remunerationData: action.payload };

    case "REMUNERATION_VIEW_DATA":
      return { ...state, remunerationViewData: action.payload };

    case "OFFER_LETTER_DATA":
      return { ...state, offerLetterData: action.payload };

    case "SUBMIT_OFFER_LETTER":
      return { ...state, submitOfferLetter: action.payload };
    case "WORK_INFO_VIEW":
      return { ...state, workInfoViewData: action.payload };

    case "STATE":
      return { ...state, stateList: action.payload };

    case "CITY":
      return { ...state, cityList: action.payload };
    case "ADHAAR_NOTIFICATION_DATA":
      return { ...state, aadhaarNotificationData: action.payload };
    case "SUBMIT_APPOINTMENT_LETTER":
      return { ...state, submitAppointmentLetter: action.payload };
    case "NOTICE_PERIOD_VIEW":
      return { ...state, noticePeriodViewData: action.payload };
      case "COSTCENTER_BY_DEPARTMENT":
      return { ...state, costcenterByDepartmentData: action.payload };
      case "POSITION_BY_DEPARTMENT":
        return { ...state, positionByDepartmentData: action.payload };
      case "ALL_COST_CENTER_DATA":
        return { ...state, allCostCenterList: action.payload };
        case "DEPARTMENTCOMPANY":
      return { ...state, companyDepartment: action.payload };
    default:
      return state;
  }
};

export default GroupReducer;
