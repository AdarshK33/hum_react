import React, { createContext, useReducer, useState ,useContext} from "react";
import { client } from "../utils/axios";
import DSICharterReducer from "../reducers/DSICharterReducer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { access_token } from "../auth/signin";
import Axios from "axios";
import codeBase64 from "../components/DSICharter/CharterFile/codeofconduct"
// import { EmployeeSeparationContext } from "./EmployeeSeparationState";
var fileDownload = require("js-file-download");

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
  charterAllResponse:{}
};
export const DSICharterContext = createContext();
export const DSICharterProvider = (props) => {
  const [state, dispatch] = useReducer(DSICharterReducer, initial_state);
  const [loader, setLoader] = useState(false);
  const [charterIdValue, setCharterIdValue] = useState(0);
  const [ITCHARTER, setItCharter]= useState(null)
  const [CODEOFCONDUCT, setCodeOfConduct]= useState(null)
  const [letterShow, setLetterShow] = useState(false);

  // const { ViewEmployeeProfile,employeeProfileData } = useContext(EmployeeSeparationContext);
  const handleDate = (data)=>{
    let current = new Date(data)
  let cDate = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
  let hours = current.getHours();
  let am_pm = (hours >= 12) ? "PM" : "AM";
  let minutes = current.getMinutes()<10?("0"+current.getMinutes()):current.getMinutes()
  if(hours >= 12){
      hours -=12;
  }
  
  let cTime = hours==0?("12" + ":" + minutes +"  "+ am_pm):(hours + ":" + minutes +"  "+ am_pm)
  let dateTime =
  cDate + '   ' + cTime;
  return dateTime
  }
  const downloadFile = (name,data) => {
    Axios({
      url: `${process.env.REACT_APP_BASEURL}api/v1/document/download?name=${name}`,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      console.log(response);
      fileDownload(response.data,`${data.employeeId +"_"+handleDate(data.auditField.updatedDate)+".pdf"}` );
    });
  };
  const SetLetterView = (val) => {
    setLetterShow(val);
  };
  const ViewEmployeeProfile = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/profile")
      .then((response) => {
        state.employeeProfileData = response.data.data;
        setCharterIdValue(response.data.data.charterId)
        setLoader(false);
        console.log("employee profile", response);

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
  const dsiCharterCreate = (infoData,value,data,blob) => {
    setLoader(true);
    client
      .post("/api/v1/dsi_charter/create", infoData)
      .then((response) => {
        state.dsiCharterData = response.data.data;
        setCharterIdValue(response.data.data.charterId)
        console.log(response,"createDataDsi")
        toast.info(response.data.message);
        uploadAllCharter(data,blob)
        viewCharterAll()
        viewCharter("all",0);
        ViewEmployeeProfile()
        if(response.data.message === "SUCCESS"){
          value.history.push("/itcharter")
          setLoader(false);
        
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
   const dsiCharterUpdate = (infoData,data,blob) => {
     console.log(infoData,data,blob,"dsiCharterUpdate")
    setLoader(true);
    client
      .post("/api/v1/dsi_charter/update", infoData)
      .then((response) => {
        state.dsiCharterUpdateData = response.data.data;
        console.log(response,"updateDataDsi")
        toast.info(response.data.message);
        uploadAllCharter(data,blob)
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
        response.data.data.map((item)=>{
          if(item.employeeId == state.employeeProfileData.employeeId){
            setCharterIdValue(item.charterId)
          }
        })
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
    /*-----------------post charter upload-----------------*/
  const uploadAllCharter = (data,blob) => {
    console.log("base64...........", data,blob);
    const formData = new FormData()
    formData.append("file",blob,blob.name)
    
    return (
      client.post("api/v1/dsi_charter/document/upload?dsiType="+data.dsiType +
      "&employeeId=" + data.employeeId +"&fileType="+data.fileType,formData)
        .then((response) => {
          console.log(response,data,"charterupload");
          state.charterAllResponse = response.data.data;

          {data.fileType === 25?setCodeOfConduct(response.data.data) : setItCharter(response.data.data)}
          return dispatch({ type: "CHARTER_ALL_UPLOAD", payload: state.charterAllResponse });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };
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
        uploadAllCharter,
        downloadFile,
        SetLetterView,
        letterShow: letterShow,
        charterAllResponse:state.charterAllResponse,
        employeeProfileData:state.employeeProfileData,
        charterEnable:state.charterEnable,
        loader: loader,
        ITCHARTER:ITCHARTER,
        CODEOFCONDUCT:CODEOFCONDUCT,
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
