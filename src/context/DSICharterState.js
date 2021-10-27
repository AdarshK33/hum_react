import React, { createContext, useReducer, useState ,useContext} from "react";
import { client } from "../utils/axios";
import DSICharterReducer from "../reducers/DSICharterReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
// import { EmployeeSeparationContext } from "./EmployeeSeparationState";
const initial_state = {
  employeeProfileData: {},
  dsiCharterData: [],
  dsiCharterUpdateData:{},
  charterEnable:{},
  charterData: [],
  charterDataAll:[],
  total: {},
  data: [],
  getBonusDetailsById: [],
};
export const DSICharterContext = createContext();
export const DSICharterProvider = (props) => {
  const [state, dispatch] = useReducer(DSICharterReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const [charterIdValue, setCharterIdValue] = useState(0);
  // const { ViewEmployeeProfile,employeeProfileData } = useContext(EmployeeSeparationContext);

  const ViewEmployeeProfile = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile")
      .then((response) => {
        state.employeeProfileData = response.data.data;
        setCharterIdValue(response.data.data.charterId)
        setLoader(false);
        console.log("--->", state.employeeProfileData);
        console.log("response of employee profile", response);

        return dispatch({
          type: "EMPLOYEE_PROFILE",
          payload: state.employeeProfileData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*----------Api to create charter ------------*/
  const dsiCharterCreate = (data,value) => {
    setLoader(true);
    client
      .post("/api/v1/dsi_charter/create", data)
      .then((response) => {
        state.dsiCharterData = response.data.data;
        setCharterIdValue(response.data.data.charterId)
        console.log(response,"createDataDsi")
        toast.info(response.data.message);
        if(response.data.message === "SUCCESS"){
          value.history.push("/itcharter")
          setLoader(false);
          viewCharterAll()
          viewCharter("all",0);
          ViewEmployeeProfile()
        }
        return dispatch({
          type: "DSICHARTER_CREATE",
          payload: state.dsiCharterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
   /*----------Api to update charter ------------*/
   const dsiCharterUpdate = (data) => {
    setLoader(true);
    client
      .post("/api/v1/dsi_charter/update", data)
      .then((response) => {
        state.dsiCharterUpdateData = response.data.data;
        console.log(response,"updateDataDsi")
        toast.info(response.data.message);
        viewCharterAll()
        ViewEmployeeProfile()
        setLoader(false);
        return dispatch({
          type: "DSICHARTER_UPDATE",
          payload: state.dsiCharterUpdateData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
    /*----------Api to enable charter ------------*/
    const dsiCharterEnable = (data) => {
      setLoader(true);
      client
        .get("/api/v1/dsi_charter/enable?closingDate="+data.closingDate + "&startingDate=" + data.startingDate +"&status=" + data.status)
        .then((response) => {
          state.charterEnable = response.data.data;
          toast.info(response.data.message);
          
          viewCharterAll()
          ViewEmployeeProfile()
          setLoader(false);
          return dispatch({
            type: "DSICHARTER_ENABLE",
            payload: state.charterEnable,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  /*--------------View list of created charter structures -------------*/
  const viewCharter = (key, page) => {
    setLoader(true);
    client 
      .get("api/v1/dsi_charter/view?key=" + key + "&page=" + page + "&size=" + 10)
      .then((response) => {
        console.log(response.data.data.data);
        state.charterData = response.data.data.data;
        state.total = response.data.data.total;
        state.data = response.data.data;
        setLoader(false);

        return dispatch({
          type: "VIEW_CHARTER",
          payload: state.charterData,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
    /*--------------View list of created charter structures -------------*/
  const viewCharterAll = () => {
    setLoader(true);
    client 
      .get("api/v1/dsi_charter/view/dsi-charter")
      .then((response) => {
        console.log(response.data.data,"allcharter");
        state.charterDataAll = response.data.data;
     
        setLoader(false);

        return dispatch({
          type: "VIEW_CHARTER_ALL",
          payload: state.charterDataAll,
          loader: loader,
          data: state.data,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*-----------------get charter data using bonusId-----------------*/
  // const viewBonusById = (id) => {
  //   setLoader(true);
  //   client.get("/api/v1/bonus/" + id).then((response) => {
  //     state.getBonusDetailsById = response.data.data;
  //     setLoader(false);
  //     return dispatch({
  //       type: "VIEW_BONUS_BY_ID",
  //       payload: state.getBonusDetailsById,
  //     });
  //   });
  // };
 
  return (
    <DSICharterContext.Provider
      value={{
        dsiCharterCreate,
        dsiCharterUpdate,
        viewCharter,
        viewCharterAll,
        setLoader,
        dsiCharterEnable,
        ViewEmployeeProfile,
        employeeProfileData:state.employeeProfileData,
        charterEnable:state.charterEnable,
        loader: loader,
        charterIdValue:charterIdValue,
        dsiCharterData: state.dsiCharterData,
        dsiCharterUpdateData:state.dsiCharterUpdateData,
        charterData: state.charterData,
        charterDataAll:state.charterDataAll,
        total: state.total,
        // viewBonusById,
        // getBonusDetailsById: state.getBonusDetailsById,
      }}
    >
      {props.children}
    </DSICharterContext.Provider>
  );
};
