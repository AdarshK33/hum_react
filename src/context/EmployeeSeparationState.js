import React, { createContext, useReducer,useContext,useState } from "react";
import EmployeeSeparationReducer from "../reducers/EmployeeSeparationReducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  EmployeeSeparationList: [],
  EmployeeSeparationExitList:[],
  total: {},
  employeeData: {},
  ModeOfSeparationData: {},
  updateResponse: {},
  employeeId: "",
  employeeProfileData: {},
  relivingLetterData: [],
  terminationLetterData:[],
  terminationConfirmationStatus: "",
  resignationConfirmationStatus: "",
};

export const EmployeeSeparationContext = createContext();


export const EmploeeSeparationProvider = ({children}) => {
  const [loader, setLoader] = useState(false);
  const [DisciplinaryTermination, setDisciplinarytermination] = useState(false);
  const [state, dispatch] = useReducer(
    EmployeeSeparationReducer,
    initial_state
  );
  // const {MakeCostCenterDataNull} = useContext(SeparationContext)

  const changeEmployeeId = (employeeId) => {
    setLoader(true);
    state.employeeId = employeeId;
    setLoader(false);
    return dispatch({
      type: "EMPLOYEE_ID",
      payload: state.employeeId,
    });
  };

  const ViewEmployeeProfile = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile")
      .then((response) => {
        state.employeeProfileData = response.data.data;

        setLoader(false);
        console.log("--->", state.employeeProfileData);
        console.log("response of employee profile", response);

        return dispatch({
          type: "EMPLOYEE_PROFILE_DATA_BY_ID",
          payload: state.employeeProfileData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewEmployeeDataById = (employeeId) => {
    setLoader(true);
    client
      .get("/api/v1/separation/employee-exit/view/" + employeeId)
      .then((response) => {
        state.employeeData = response.data.data;

        setLoader(false);
        console.log("--->", state.employeeData);
        console.log(response);

        return dispatch({
          type: "EMPLOYEE_DATA_BY_ID",
          payload: state.employeeData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const makeEmployeeDataNull = () => {
    state.employeeData = {};
    return dispatch({
      type: "EMPLOYEE_DATA_BY_ID",
      payload: state.employeeData,
    });
  };
  
  const EmployeeSeparationListView = (key, pageNumber,status) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/employee-exit/view/exit-initiate?key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10" +
          "&status=" + status
      )
      .then((response) => {
        state.EmployeeSeparationList = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);
        ModeOfSeparationView();
        // makeEmployeeDataNull()
        // MakeCostCenterDataNull()
        return dispatch({
          type: "EMPLOYEE_SEPARATION_LISTING",
          payload: state.EmployeeSeparationList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EmployeeSeparationListExitView = (key, pageNumber,status) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/employee-exit/view?key=" +
          key +
          "&page=" +
          pageNumber +
          "&size=10" +
          "&status=" + status
      )
      .then((response) => {
        state.EmployeeSeparationExitList = response.data.data.data;
        state.total = response.data.data.total;
        setLoader(false);
        console.log(state.total);
        console.log(response);
        ModeOfSeparationView();
        makeEmployeeDataNull()
        return dispatch({
          type: "EMPLOYEE_SEPARATION_LISTING_EXIT",
          payload: state.EmployeeSeparationExitList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ModeOfSeparationView = () => {
    setLoader(true);
    client
      .get("/api/v1/mode-of-separation/view")
      .then((response) => {
        state.ModeOfSeparationData = response.data.data;
        setLoader(false);
        console.log("mode of separation", state.ModeOfSeparationData);
        console.log("response of mode of separartion", response);

        return dispatch({
          type: "MODE_OF_SEPARATION",
          payload: state.ModeOfSeparationData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateEmplyoeeExist = (updateInfo) => {
    // setLoader(true);
    client
      .post("/api/v1/separation/employee-exit/update", updateInfo)
      .then((response) => {
        state.updateResponse = response.data.data;
        toast.info(response.data.message);
        setLoader(false);
        console.log("updated response", state.updateResponse);
        return dispatch({
          type: "UPDATE_EMPLOYEE_SEPARATION",
          payload: state.updateResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchRelievingLetterData = (empId) => {
    setLoader(true);
    console.log(empId, "empId000000777");
    client
      .get("/api/v1/separation/employee-exit/letter/" + empId)
      .then((response) => {
        console.log(response.data.data);
        state.relivingLetterData = response.data.data;
        setLoader(false);
        return dispatch({
          type: "FETCH_RELIEVING_LETTER_DATA",
          payload: state.relivingLetterData,
        });
      }) .catch((error) => {
        console.log(error);
      });
  };
  const fetchTerminationLetterData = (empId) => {
    setLoader(true);
    console.log(empId, "empId000000777");
    client
      .get("/api/v1/separation/employee-exit/termination/" + empId)
      .then((response) => {
        console.log(response.data.data);
        state.terminationLetterData = response.data.data;
        setLoader(false);
        return dispatch({
          type: "FETCH_TERMINATION_LETTER_DATA",
          payload: state.terminationLetterData,
        });
      }) .catch((error) => {
        console.log(error);
      });
  };

  const CreateEmplyoeeExist = (createInfo, id) => {
    setLoader(true);
    console.log("INSIDE API CALL ");
    client
      .post("/api/v1/separation/employee-exit/create", createInfo)
      .then((response) => {
        state.updateResponse = response.data.data;
        toast.info(response.data.message);
        ViewEmployeeDataById(id);
        setLoader(false);
        console.log("updated response", state.updateResponse);
        return dispatch({
          type: "UPDATE_EMPLOYEE_SEPARATION",
          payload: state.updateResponse,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const terminationConfirmation = (exitId, empId) => {
    setLoader(true);
    client
      .get(
        "/api/v1/separation/employee-exit/termination-confirmation?exitId=" +
          exitId
      )
      .then((response) => {
        state.terminationConfirmationStatus = response.data.data;
        toast.info(response.data.message);
        ViewEmployeeDataById(empId);
        setLoader(false);
        return dispatch({
          type: "TERMINATION_CONFIRMATION",
          payload: state.terminationConfirmationStatus,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resignationConfirmation = (exitId, empId) => {
    setLoader(true);
    client
      .get(
        "api/v1/separation/employee-exit/resignation-confirmation?exitId=" +
          exitId
      )
      .then((response) => {
        state.resignationConfirmationStatus = response.data.data;
        toast.info(response.data.message);
        ViewEmployeeDataById(empId);
        setLoader(false);
        return dispatch({
          type: "RESIGNATION_CONFIRMATION",
          payload: state.resignationConfirmationStatus,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const TerminationFromDesciplinary = (VAL) => {
    setDisciplinarytermination(VAL);
    return dispatch({
      type: "DISCIPLINARY_TERMINATION",
      payload: DisciplinaryTermination,
    });
  };

  return (
    <EmployeeSeparationContext.Provider
      value={{
        EmployeeSeparationListView,
        ViewEmployeeDataById,
        ModeOfSeparationView,
        UpdateEmplyoeeExist,
        changeEmployeeId,
        ViewEmployeeProfile,
        CreateEmplyoeeExist,
        fetchRelievingLetterData,
        fetchTerminationLetterData,
        makeEmployeeDataNull,
        terminationConfirmation,
        resignationConfirmation,
        TerminationFromDesciplinary,
        EmployeeSeparationListExitView,
        employeeProfileData: state.employeeProfileData,
        resignationConfirmationStatus: state.resignationConfirmationStatus,
        employeeId: state.employeeId,
        updateResponse: state.updateResponse,
        ModeOfSeparationData: state.ModeOfSeparationData,
        EmployeeSeparationExitList:state.EmployeeSeparationExitList,
        EmployeeSeparationList: state.EmployeeSeparationList,
        terminationConfirmationStatus: state.terminationConfirmationStatus,
        employeeData: state.employeeData,
        relivingLetterData: state.relivingLetterData,
        terminationLetterData:state.terminationLetterData,
        loader: loader,
        DisciplinaryTermination: DisciplinaryTermination,
        total: state.total,
      }}
    >
      {children}
    </EmployeeSeparationContext.Provider>
  );
};
