import React, { createContext, useReducer, useContext, useState } from "react";
import Employee360Reducer from "../reducers/Employee360Reducer";
import { client } from "../utils/axios";
import { toast } from "react-toastify";
import moment from "moment";
// import { SeparationContext } from "./SepearationState";
const initial_state = {
  HolidaysList: [],
  MyDocList: [],
  WeeksList: [],
  WeeksInfoList: [],
  ClusterData: [],
  clusterDirect: [],
  employee360ListData: [],
  plannedLeaves: [],
  unPlannedLeaves: [],
  myPerformanceData: {},
  Manager360ListData: [],
  ClusterEmpList: [],
  YearsList:[],
  resignationConfirmationStatus: "",
  teamPlannedLeaves: [],
  teamUnPlannedLeaves: [],
  teamPerformanceData: {},
  employeeMyTeam:[],
  employeeAllTeam:[],
  total: {},
  totalManager360ListData:{}
};

export const Employee360Context = createContext();

export const Employee360Provider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [approvalsLoader, setApprovalsLoader] = useState(false);
  const [rosterLoader, setRosterLoader] = useState(false);
  const [clusterLoader, setClusterLoader] = useState(false);
  const [letterShow, setLetterShow] = useState(false);
  const [state, dispatch] = useReducer(Employee360Reducer, initial_state);

  const HolidaysView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view")
      .then((response) => {
        state.HolidaysList = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "HOLIDAY_VIEW",
          payload: state.HolidaysList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyDocView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/employee/documents?page=0&size=10")
      .then((response) => {
        state.MyDocList = response.data.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "MYDOC_VIEW",
          payload: state.MyDocList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SetLetterView = (val) => {
    setLetterShow(val);
  };
const RosterMonthSearchYear =()=>{
  setRosterLoader(true);
  let start= moment(new Date(new Date().getFullYear(),1,0)).format("YYYY-MM-DD")
  let end = moment(new Date(new Date().getFullYear(),11,31)).format("YYYY-MM-DD")
    client
      .get(
        "/api/v1/employee/360/view/weeks?endDate=" +
        end +
          "&startDate=" +
          start
      )
      .then((response) => {
        state.YearsList = response.data.data;
        //toast.info(response.data.message);
        setRosterLoader(false);
        return dispatch({
          type: "YEARS_LIST",
          payload: state.YearsList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  
}
  const RosterMonthSearch = (startDate, endDate) => {
    setRosterLoader(true);
    client
      .get(
        "/api/v1/employee/360/view/weeks?endDate=" +
          endDate +
          "&startDate=" +
          startDate
      )
      .then((response) => {
        state.WeeksList = response.data.data;
        //toast.info(response.data.message);
        setRosterLoader(false);
        return dispatch({
          type: "WEEKS_LIST",
          payload: state.WeeksList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SearchByWeekName = (WeekName) => {
    setRosterLoader(true);
    console.log("WeekNamw", WeekName);
    client
      .get("/api/v1/employee/360/view/roster?key=" + WeekName)
      .then((response) => {
        state.WeeksInfoList = response.data.data;
        //toast.info(response.data.message);
        setRosterLoader(false);
        return dispatch({
          type: "WEEKS_INFO_LIST",
          payload: state.WeeksInfoList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ClusterView = (key = "all") => {
    setClusterLoader(true);
    client
      .get("/api/v1/employee/360/view/cluster?key=" + key)
      .then((response) => {
        state.ClusterData = response.data.data;
        //toast.info(response.data.message);
        setClusterLoader(false);
        return dispatch({
          type: "CLUSTER_DATA",
          payload: state.ClusterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ClusterSearchByClusterName = (key) => {
    setClusterLoader(true);
    client
      .get("/api/v1/employee/360/view/cluster?key=" + key)
      .then((response) => {
        state.ClusterEmpList = response.data.data;
        //toast.info(response.data.message);
        setClusterLoader(false);
        return dispatch({
          type: "CLUSTER_EMP_DATA",
          payload: state.ClusterEmpList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ClusterSearchByEmployeeName = (cluster, key) => {
    //FOR ALL TEAM
    setClusterLoader(true);
    client
      .get(
        "/api/v1/employee/360/view/cluster/employee?key=" +
          cluster +
          "&searchKey=" +
          key
      )
      .then((response) => {
        state.ClusterEmpList = response.data.data;
        //toast.info(response.data.message);
        setClusterLoader(false);
        return dispatch({
          type: "CLUSTER_EMP_DATA",
          payload: state.ClusterEmpList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Employee360ListView = (key, EmpId) => {
    setApprovalsLoader(true);
    let api = "";
    if (key === "disciplinary") {
      api = "/api/v1/disciplinary/view/employee?employeeId=" + EmpId;
    } else {
      api = "/api/v1/employee/360/view/" + key;
    }
    client
      .get(api)
      .then((response) => {
        state.employee360ListData = response.data.data;
        //toast.info(response.data.message);
        setApprovalsLoader(false);
        return dispatch({
          type: "EMPLOYEE_360_APROVAL",
          payload: state.employee360ListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Manager360ListView = (key, roleCheck,page) => {
    let api = "";

    setApprovalsLoader(true);
    if (key === "transfer") {
      api =
        "/api/v1/employee/360/view/employee/transfer?page="+page+"&size=10&key=all";
    } else if (key === "promotion") {
      api =
        "/api/v1/employee/360/view/promotion/manager?key=all&page=0&size=5&superManager=0";
    } else if (key === "probation") {
      api = "/api/v1/probation/view/all?page="+page+"&size=10&key=all&superManager=0";
    } else if (key === "disciplinary") {
      api =
        "/api/v1/disciplinary/view/all?page="+page+"&size=10&key=all&superManager=0";
    } else if (key === "separation") {
      if (roleCheck === "costCenterManager") {
        api = "/api/v1/employee/360/view/exit?key=all&page=0&size=10&status=10";
      } else {
        api = "/api/v1/employee/360/view/exit?key=all&page=0&size=10&status=9";
      }
    }

    client
      .get(api)
      .then((response) => {
        state.Manager360ListData = response.data.data.data;
        if(response.data.data.total){
          console.log("rrrrrrrrrrrrr m",response.data.data.total)
        state.totalManager360ListData = response.data.data.total;
        }

        setApprovalsLoader(false);
        return dispatch({
          type: "MANAGER_360_APROVAL",
          payload: state.Manager360ListData,
          totalManager360ListData: state.totalManager360ListData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ClusterDirectTeam = (key) => {
    //MY TEAM
    setClusterLoader(true);
    client
      .get("/api/v1/employee/360/view/cluster/direct/employee?searchKey=" + key)
      .then((response) => {
        state.clusterDirect = response.data.data;
        setClusterLoader(false);
        return dispatch({
          type: "CLUSTER_DIRECT",
          payload: state.clusterDirect,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyLeavesViewPlanned = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/leaves?key=Planned")
      .then((response) => {
        state.plannedLeaves = response.data.data;
        //toast.info(response.data.message);
        let currentDate= new Date()
        let tempArray=[]
        state.plannedLeaves.map((item)=>{
          if(currentDate <= new Date(item.todate)){
            tempArray.push(item)
          }
        })
        state.plannedLeaves = tempArray
        
        setLoader(false);
        return dispatch({
          type: "PLANNED_LEAVES",
          payload: state.plannedLeaves,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const MyLeavesViewUnplanned = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/leaves?key=Unplanned")
      .then((response) => {
        state.unPlannedLeaves = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "UN_PLANNED_LEAVES",
          payload: state.unPlannedLeaves,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyPerformanceView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/performance")
      .then((response) => {
        state.myPerformanceData = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "MY_PERFORMANCE",
          payload: state.myPerformanceData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const TeamLeavesViewPlanned = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/leave/manager?key=Planned")
      .then((response) => {
        state.teamPlannedLeaves = response.data.data;
        //toast.info(response.data.message);
        //changes from -->
        let currentDate= new Date()
        let tempArray=[]
        state.teamPlannedLeaves.map((item)=>{
          if(currentDate <= new Date(item.todate)){
            tempArray.push(item)
          }
        })
        state.teamPlannedLeaves = tempArray
                //changes from -->
        setLoader(false);
        return dispatch({
          type: "TEAM_PLANNED_LEAVES",
          payload: state.teamPlannedLeaves,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const TeamLeavesViewUnplanned = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/leave/manager?key=Unplanned")
      .then((response) => {
        state.teamUnPlannedLeaves = response.data.data;
        //toast.info(response.data.message);
        setLoader(false);
        return dispatch({
          type: "TEAM_UN_PLANNED_LEAVES",
          payload: state.teamUnPlannedLeaves,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const TeamPerformanceView = () => {
    setLoader(true);
    client
      .get("/api/v1/employee/360/view/team/performance")
      .then((response) => {
        console.log("response",response.data.data);
        state.teamPerformanceData = response.data.data;
        //toast.info(response.data.message);
        // console.log("TeamPerformanceView",response.data.data.data[0]);
        setLoader(false);
        return dispatch({
          type: "TEAM_PERFORMANCE",
          payload: state.teamPerformanceData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getEmployeeMyTeam = (key) => {
    //MY TEAM //employeeID
    setClusterLoader(true);
    client
      .get(`/api/v1/employee/360/view/my_team/${key}`) 
      .then((response) => {
        // console.log("rrrrrrrrrrrrr",responsee)
        if (
          response.data.data!== null &&
          response.data.data !== undefined &&
        Object.keys(response.data.data).length !== 0
      ) {
        state.employeeMyTeam = response.data.data;
      }
        setClusterLoader(false);
        return dispatch({
          type: "EMPLOYEE_MY_TEAM",
          payload: state.employeeMyTeam,
        });
      })
      .catch((error) => {
        console.log(error,"Error in getEmployeeMyTeam ./context/Employee360state.js");
      });
  };
  const getEmployeeAllTeam = (page,key,size = 10) => {
    //All TEAM //employeeID
   
    //http://huminedev.theretailinsights.co/api/v1/employee/360/view/all-team/employeeId?page=0&size=10&key=DSI000771
    setClusterLoader(true);
    client
      .get(
        "/api/v1/employee/360/view/all-team/employeeId?page=" +
          page +
          "&size=" +
          size +
          "&key=" +
          key
      )
      .then((response) => {
        if (
                response.data.data.data!== null &&
               response.data.data.data !== undefined &&
              Object.keys( response.data.data.data).length !== 0
            ) {
        state.employeeAllTeam = response.data.data.data;
        state.total = response.data.data.total;
       
            }
        setClusterLoader(false);
        return dispatch({
          type: "EMPLOYEE_All_TEAM",
          payload: state.employeeAllTeam,
          loader: loader,
          total: state.total,
        });
      })
      .catch((error) => {
        console.log(error,"Error in getEmployeeAllTeam ./context/Employee360state.js");
      });
  };
 

  return (
    <Employee360Context.Provider
      value={{
        HolidaysView,
        MyDocView,
        SetLetterView,
        RosterMonthSearch,
        SearchByWeekName,
        ClusterView,
        Employee360ListView,
        MyLeavesViewPlanned,
        MyLeavesViewUnplanned,
        MyPerformanceView,
        Manager360ListView,
        ClusterSearchByClusterName,
        ClusterSearchByEmployeeName,
        ClusterDirectTeam,
        RosterMonthSearchYear,
        TeamLeavesViewPlanned,
        TeamLeavesViewUnplanned,
        TeamPerformanceView,
        getEmployeeMyTeam,
        getEmployeeAllTeam,
       
        YearsList: state.YearsList,
        clusterDirect: state.clusterDirect,
        ClusterEmpList: state.ClusterEmpList,
        Manager360ListData: state.Manager360ListData,
        totalManager360ListData: state.totalManager360ListData,
        myPerformanceData: state.myPerformanceData,
        unPlannedLeaves: state.unPlannedLeaves,
        plannedLeaves: state.plannedLeaves,
        employee360ListData: state.employee360ListData,
        ClusterData: state.ClusterData,
        WeeksInfoList: state.WeeksInfoList,
        WeeksList: state.WeeksList,
        letterShow: letterShow,
        MyDocList: state.MyDocList,
        HolidaysList: state.HolidaysList,
        resignationConfirmationStatus: state.resignationConfirmationStatus,
        approvalsLoader: approvalsLoader,
        rosterLoader: rosterLoader,
        clusterLoader: clusterLoader,
        teamPerformanceData: state.teamPerformanceData,
        teamUnPlannedLeaves: state.teamUnPlannedLeaves,
        teamPlannedLeaves: state.teamPlannedLeaves,
        employeeMyTeam: state.employeeMyTeam,
        employeeAllTeam: state.employeeAllTeam,
        total: state.total,
        data: state.total,
        first: state.first,
       
      }}
    >
      {children}
    </Employee360Context.Provider>
  );
};