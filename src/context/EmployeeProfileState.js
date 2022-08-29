import React, { createContext, useReducer, useContext, useState } from "react";
import EmployeeProfileReducer from "../reducers/EmployeeProfileReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import { AppContext } from "./AppState";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  addressViewData: [],
  emergencyContactView: [],
  bankViewData: [],
  remunerationData: [],
  costCentreSplitData: [],
  emergencyUpdate: [],
  documentsList: [],
  insuranceData: [],
  otherDocumentsList: [],
  insuranceTopUpData: [],
  premiumViewData: [],
  holidayWorkingBonusList: [],
  EmployeesList: [],
  total: 0,
  EmpProfile: [],
  EmployeesDocsVerifyList: [],
  EmpDocsData: [],
};

export const EmployeeProfileContext = createContext();

export const EmployeeProfileProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [letterShow, setLetterShow] = useState(false);
  const [state, dispatch] = useReducer(EmployeeProfileReducer, initial_state);
  const [currentEmpId, setCurrentEmpId] = useState(0);
  const { getUserInfo,fetchEmployeeProfile, user } = useContext(AppContext);

  const setEmployeeId = (val) => {
    setCurrentEmpId(val);
  };

  const SetLetterView = (val) => {
    setLetterShow(val);
  };
  const addressView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/address?employeeId=" + empId)
      .then((response) => {
        state.addressViewData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "ADDRESS_VIEW",
          payload: state.addressViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmergencyContactView = (empId) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/profile/view/emergency/contact?employeeId=" + empId
      )
      .then((response) => {
        state.emergencyContactView = response.data.data;
        console.log("emergencyContactView",state.emergencyContactView);
        //toast.info(response.data.message);
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

  const bankView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/bank?employeeId=" + empId)
      .then((response) => {
        state.bankViewData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "BANK",
          payload: state.bankViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RemunerationView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/remuneration?employeeId=" + empId)
      .then((response) => {
        state.remunerationData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "REMUNERATION_VIEW",
          payload: state.remunerationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CostCentreSplitView = (empId) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/profile/view/cost-centre-split?employeeId=" + empId
      )
      .then((response) => {
        state.costCentreSplitData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "COST_CENTRE_SPLIT",
          payload: state.costCentreSplitData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EmergencyContactUpdate = (updateData) => {
    setLoader(true);
    return client
      .post("/api/v1/employee/profile/update/emergency", updateData)
      .then((response) => {
        getUserInfo()
        fetchEmployeeProfile()
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "EMERGENCY_CONTACT_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BankUpdate = (updateData) => {
    setLoader(true);
    return client
      .post("/api/v1/employee/profile/update/bank", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "BANK_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateAddress = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/address", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "ADDRESS_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateEmployeeProfile = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/employee", updateData)
      .then((response) => {
        getUserInfo()
        fetchEmployeeProfile()
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
        return dispatch({
          type: "PROFILE_UPDATE",
          payload: state.emergencyUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateHolidayWorkingBonus = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/holiday-bonus", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        HolidayWorkingBonusView(updateData.employeeId);

        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const HolidayWorkingBonusView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/holiday-bonus?employeeId=" + empId)
      .then((response) => {
        state.holidayWorkingBonusList = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "HOLIDAY_WORKING_BONUS_VIEW",
          payload: state.holidayWorkingBonusList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateRemuneration = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/update/remuneration", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateInsurance = (updateData) => {
    setLoader(true);
    console.log("updateAddress", updateData);
    return client
      .post("/api/v1/employee/profile/create", updateData)
      .then((response) => {
        toast.info(response.data.message);
        console.log(response.data.message);
        setLoader(false);
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
    formData.append("employeeId", fileInfo.employeeId);
    formData.append("fileType", fileInfo.fileType);
    console.log("uploadFile", photoFile);
    return client
      .post("/api/v1/employee/documents/verification/upload/document", formData)
      .then((response) => {
        console.log(response, "res uploadFile");
        toast.info(response.data.message);
        DocumentView(fileInfo.employeeId);
      })
      .catch((error) => {
        // toast.info("Please upload a valid file");
        console.log(error);
      });
  };

  const uploadOtherFiles = (fileInfo) => {
    console.log("uploadFile state", fileInfo);
    const photoFile = fileInfo.file;
    const formData = new FormData();
    formData.append("file", photoFile, photoFile.name);
    formData.append("employeeId", fileInfo.employeeId);
    formData.append("fileName", fileInfo.fileName);
    console.log("uploadFile", photoFile);
    return client
      .post("/api/v1/employee/profile/upload/other", formData)
      .then((response) => {
        console.log(response, "res uploadFile");
        toast.info(response.data.message);
        OtherDocumentView(fileInfo.employeeId);
      })
      .catch((error) => {
        // toast.info("Please upload a valid file");
        console.log(error);
      });
  };
  const DocumentView = (empId) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/profile/view/employee/document?employeeId=" + empId
      )
      .then((response) => {
        state.documentsList = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "DOCUMENTS_VIEW",
          payload: state.documentsList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OtherDocumentView = (empId) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/profile/view/employee/other/document?employeeId=" +
          empId
      )
      .then((response) => {
        state.otherDocumentsList = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "OTHER_DOCUMENTS_VIEW",
          payload: state.otherDocumentsList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InsuranceView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/view/insurance?employeeId=" + empId)
      .then((response) => {
        state.insuranceData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "INSURANCE_VIEW",
          payload: state.insuranceData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const insuranceTopUpView = (year) => {
    console.log("insuranceTopUpView", year);
    client
      .get("/api/v1/employee/profile/view/premium?page=0&size=10&year=" + year)
      .then((response) => {
        state.insuranceTopUpData = response.data.data.data;
        console.log("insuranceTopUpData", state.insuranceTopUpData);
        return dispatch({
          type: "EMP_INSURANCE_TOPUP_DATA",
          payload: state.insuranceTopUpData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const premiumView = (insuranceId, EmpId) => {
    console.log("premiumView", insuranceId, EmpId);
    client
      .get("/api/v1/employee/profile/view/premium/" + insuranceId + "/" + EmpId)
      .then((response) => {
        state.premiumViewData = response.data.data;
        console.log("premiumViewData", state.premiumViewData);
        return dispatch({
          type: "EMP_PREMIUM_DATA",
          payload: state.premiumViewData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // manager profile

  const EmpProfileView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile/profile?employeeId=" + empId)
      .then((response) => {
        state.EmpProfile = response.data.data;
        setLoader(false);
        console.log("Employeee ID=======>", empId);
        console.log(response);

        return dispatch({
          type: "EMP_PROFILE",
          payload: state.EmpProfile,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EmpDocsView = (empId) => {
    setLoader(true);
    client
      .get("/api/v1/employee/documents/verification/view?employeeId=" + empId)
      .then((response) => {
        state.EmpDocsData = response.data.data;
        setLoader(false);
        console.log("Employeee ID=======>", empId);
        console.log(response);

        return dispatch({
          type: "EMP_DOCS_DATA",
          payload: state.EmpDocsData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EmployeesDocsVerifyListView = (key, pageNumber) => {
    setLoader(true);
    client
      .get(
        "/api/v1/employee/profile/view/pending?key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10"
      )
      .then((response) => {
        state.EmployeesDocsVerifyList = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);

        return dispatch({
          type: "EMP_DOCS_VERIFY_LISTING",
          payload: state.EmployeesDocsVerifyList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EmployeesListView = (key, pageNumber, role = 0) => {
    setLoader(true);
    // http://humine.theretailinsights.co/api/v1/employee/profile/view?page=0&size=10&key=Aditya%20&superManager=0
    client
      .get(
        "/api/v1/employee/profile/view?page="
          +pageNumber
          +"&size=10&key=" +
          key
          +"&superManager=" +
          role
      )
      .then((response) => {
        if (
          response.data.data.data!== null &&
         response.data.data.data !== undefined &&
        Object.keys( response.data.data.data).length !== 0
      ) {
        state.EmployeesList = response.data.data.data;
        state.total = response.data.data.total;
      }
        setLoader(false);
        return dispatch({
          type: "MANAGER_EMP_LISTING",
          payload: state.EmployeesList,
          loader: loader,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DocApprove = (Id) => {
    client
      .get(
        "/api/v1/employee/documents/verification/approve?documentVerificationId=" +
          Id
        // +
        // "&remarks=" +
        // remarks
      )
      .then((response) => {
        console.log("response", response);
        toast.info(response.data.message);
        EmpDocsView(currentEmpId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DocDisapprove = (Id, remarks) => {
    client
      .get(
        "/api/v1/employee/documents/verification/reject?documentVerificationId=" +
          Id +
          "&remarks=" +
          remarks
      )
      .then((response) => {
        console.log("response", response);
        toast.info(response.data.message);
        EmpDocsView(currentEmpId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <EmployeeProfileContext.Provider
      value={{
        setEmployeeId,
        addressView,
        EmergencyContactView,
        bankView,
        RemunerationView,
        CostCentreSplitView,
        EmergencyContactUpdate,
        UpdateEmployeeProfile,
        BankUpdate,
        UpdateAddress,
        DocumentView,
        SetLetterView,
        uploadFile,
        uploadOtherFiles,
        UpdateHolidayWorkingBonus,
        InsuranceView,
        OtherDocumentView,
        UpdateRemuneration,
        insuranceTopUpView,
        premiumView,
        UpdateInsurance,
        HolidayWorkingBonusView,
        EmployeesListView,
        EmpProfileView,
        EmployeesDocsVerifyListView,
        DocApprove,
        DocDisapprove,
        EmpDocsView,
        EmpDocsData: state.EmpDocsData,
        EmployeesDocsVerifyList: state.EmployeesDocsVerifyList,
        EmpProfile: state.EmpProfile,
        EmployeesList: state.EmployeesList,
        total: state.total,
        holidayWorkingBonusList: state.holidayWorkingBonusList,
        insuranceTopUpData: state.insuranceTopUpData,
        premiumViewData: state.premiumViewData,
        otherDocumentsList: state.otherDocumentsList,
        insuranceData: state.insuranceData,
        letterShow: letterShow,
        documentsList: state.documentsList,
        costCentreSplitData: state.costCentreSplitData,
        remunerationData: state.remunerationData,
        bankViewData: state.bankViewData,
        addressViewData: state.addressViewData,
        emergencyContactView: state.emergencyContactView,
        emergencyUpdate: state.emergencyUpdate,
        loader: loader,
        currentEmpId: currentEmpId,
      }}
    >
      {children}
    </EmployeeProfileContext.Provider>
  );
};
