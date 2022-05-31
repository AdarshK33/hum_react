import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Graph from "./graph/Graph";
import DatePicker from "react-datepicker";
import "./dashboard.css";
import { ClusterContext } from "../../context/ClusterState";
import { DashboardContext } from "../../context/DashboardState";
import Select from "react-select";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import Breadcrumb from '../common/breadcrumb';


function Dashboard() {
  const {
    cosCentreList,
    viewCostCentre,
    viewData,
    graphData,
    weekData,
    weekList,
    viewDateList,
    viewDates,
  } = useContext(DashboardContext);
  const { rolePermission } = useContext(PermissionContext);

  const { user } = useContext(AppContext);
  const [startDate, setStartDate] = useState();
  const [StoreType, setStoreType] = useState("");
  const [ClusterType, setClusterType] = useState("");
  const [ClusterName, setClusterName] = useState("");
  const [year, setYear] = useState();
  const [dayWeekMonth, setDayWeekMonth] = useState("Day");
  const [weekName, setWeekName] = useState("");
  const [month, setMonth] = useState();
  var monthList = [
    { month: 1, monthName: "January" },
    { month: 2, monthName: "February" },
    { month: 3, monthName: "March" },
    { month: 4, monthName: "April" },
    { month: 5, monthName: "May" },
    { month: 6, monthName: "June" },
    { month: 7, monthName: "July" },
    { month: 8, monthName: "August" },
    { month: 9, monthName: "September" },
    { month: 10, monthName: "October" },
    { month: 11, monthName: "November" },
    { month: 12, monthName: "December" },
  ];

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  let dateValue = new Date();
  const endDateValue = dateValue.setDate(dateValue.getDate() + 30);
  console.log("graphData0----------", graphData);

  const setYearHandler = (e) => {
    setYear(e.target.value);
    console.log("year", e.target.value);
    weekData(e.target.value);
  };
  const fromDateHandler = (e) => {
    setStartDate(e);

    if (StoreType !== "" && ClusterType !== "") {
      viewData(e, e, StoreType, ClusterType);
    }
  };

  function week_no(dt) {
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  const fromStoreHandler = (e) => {
    console.log("========", e);
    setStoreType(e.value);
    viewClusterCostCenter(e.value);
    setClusterName("");
    setClusterType("");
    // if (startDate !== undefined && ClusterType !== "") {
    //     // viewData(startDate, e, ClusterType)
    // }
  };
  const fromClusterHandler = (e) => {
    setClusterType(e.target.value);
    let idx = e.target.selectedIndex;

    if (e.target.options[idx].innerHTML !== "Select") {
      setClusterName(e.target.options[idx].innerHTML);
    } else {
      setClusterName("");
    }
    // if (startDate !== undefined && StoreType !== "") {
    //     // viewData(startDate, StoreType, e.target.value);

    // }
  };

  const { viewClusterCostCenter, clusterCostCenterList } =
    useContext(ClusterContext);

  useEffect(() => {
    setStartDate(today);
    console.log("endDateValue", endDateValue);
    viewCostCentre();
  }, []);

  useEffect(() => {
    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager"
    ) {
      setStoreType(user.costCentre);
      if (user.costCentre !== undefined) {
        viewClusterCostCenter(user.costCentre);
      }
    }
  }, [user]);

  useEffect(() => {
    // if(user.loginType === '1' && user.loginType === '9' && user.additionalRole === "1" && user.additionalRole === "9"){
    if (
      clusterCostCenterList !== undefined &&
      clusterCostCenterList !== null &&
      clusterCostCenterList.length > 0 &&
      (ClusterType === "" || ClusterType === undefined)
    ) {
      setClusterName(clusterCostCenterList[0].clusterName);
      setClusterType(clusterCostCenterList[0].clusterId);
    }
    //  }

    // console.log(clusterList)

    if (
      cosCentreList !== undefined &&
      cosCentreList !== null &&
      cosCentreList.length > 0 &&
      (StoreType === "" || StoreType === undefined)
    ) {
      // setStartDate(today)

      setStoreType(cosCentreList[0].costCentreName);
      // viewData(today, cosCentreList[0].costCentreName, clusterList[0].clusterId);
    }
  }, [user.costCentre, cosCentreList, clusterCostCenterList]);

  useEffect(() => {
    // viewClusterCostCenter(StoreType)

    if (
      viewDateList !== null &&
      viewDateList !== undefined &&
      Object.keys(viewDateList).length !== 0 &&
      StoreType !== undefined &&
      StoreType !== "" &&
      ClusterType !== undefined &&
      ClusterType !== ""
    ) {
      viewData(
        viewDateList.startDate,
        viewDateList.endDate,
        StoreType,
        ClusterType
      );
    } else if (
      StoreType !== undefined &&
      StoreType !== "" &&
      ClusterType !== undefined &&
      ClusterType !== ""
    ) {
      viewData(startDate, startDate, StoreType, ClusterType);
    }
  }, [StoreType, ClusterType, viewDateList]);
  useEffect(() => {
    if (StoreType !== undefined && StoreType !== null && StoreType !== "") {
      viewClusterCostCenter(StoreType);
    }
  }, [StoreType]);

  let dpsQtyStore = [];
  let dpsQtyCluster = [];
  let dpshoursCluster = [];
  let dpshoursStore = [];
  let roasterHour = [];
  let clusterHours = [];

  let FTcluster = 0,
    PPTcluster = 0,
    INTcluster = 0,
    TPTcluster = 0,
    FTstore = 0,
    PPTstore = 0,
    INTstore = 0;
  if (graphData !== null && graphData[0] !== undefined && ClusterName !== "") {
    for (let i = 1; i <= 24; i++) {
      for (let x in graphData[0].graphData) {
        if (i === graphData[0].graphData[x].id) {
          dpsQtyStore.push({ label: x, y: graphData[0].graphData[x].qtyStore });
          dpsQtyCluster.push({
            label: x,
            y: graphData[0].graphData[x].qtyCluster,
          });
          dpshoursStore.push({
            label: x,
            y: graphData[0].graphData[x].hoursStore,
          });
          dpshoursCluster.push({
            label: x,
            y: graphData[0].graphData[x].hoursCluster,
          });
        }
      }
    }

    for (let item in graphData[0].rosterCluster) {
      if (
        graphData[0].rosterCluster[item].contractType === "Fulltime" ||
        graphData[0].rosterCluster[item].contractType === "fulltime"
      ) {
        FTcluster = FTcluster + graphData[0].rosterCluster[item].workingHours;
      }
      if (
        graphData[0].rosterCluster[item].contractType === "parttime" ||
        graphData[0].rosterCluster[item].contractType === "Parttime"
      ) {
        PPTcluster = PPTcluster + graphData[0].rosterCluster[item].workingHours;
      }
      if (
        graphData[0].rosterCluster[item].contractType === "Internship" ||
        graphData[0].rosterCluster[item].contractType === "internship"
      ) {
        INTcluster = INTcluster + graphData[0].rosterCluster[item].workingHours;
      }
      if (
        graphData[0].rosterCluster[item].contractType === "temporary" ||
        graphData[0].rosterCluster[item].contractType === "Temporary"
      ) {
        TPTcluster = TPTcluster + graphData[0].rosterCluster[item].workingHours;
      }
    }
    clusterHours.push({ permanent: FTcluster });
    clusterHours.push({ parttime: PPTcluster });
    clusterHours.push({ internship: INTcluster });
    clusterHours.push({ temporary: TPTcluster });

    for (let item in graphData[0].rosterStore) {
      if (
        graphData[0].rosterStore[item].contractType === "Fulltime" ||
        graphData[0].rosterStore[item].contractType === "fulltime"
      ) {
        FTstore = FTstore + graphData[0].rosterStore[item].workingHours;
      }
      if (
        graphData[0].rosterStore[item].contractType === "Parttime" ||
        graphData[0].rosterStore[item].contractType === "parttime"
      ) {
        PPTstore = PPTstore + graphData[0].rosterStore[item].workingHours;
      }
      if (
        graphData[0].rosterStore[item].contractType === "Internship" ||
        graphData[0].rosterStore[item].contractType === "internship"
      ) {
        INTstore = INTstore + graphData[0].rosterStore[item].workingHours;
      }
    }
    roasterHour.push({ permanent: FTstore });
    roasterHour.push({ parttime: PPTstore });
    roasterHour.push({ internship: INTstore });
  } else {
    dpsQtyStore.splice(0, dpsQtyStore.length);
    dpsQtyCluster.splice(0, dpsQtyCluster.length);
    dpshoursStore.splice(0, dpshoursStore.length);
    dpshoursCluster.splice(0, dpshoursCluster.length);
  }

  console.log("clusterHours cal", clusterHours);

  return (
    <div>   
                  <Breadcrumb parent="Dashboard" title="Dashboard" />
                  <div>
      <Row className="Row2">
        <Col sm={6}>
          <Row>
            <Col sm={4}>
              <div className="form-group">
                {/*  <label className="name f-w-600">Week no</label>
                                <div>
                                {startDate !== undefined ? week_no(startDate) : 0}
                                </div> */}
                <label className="name f-w-600">Year</label>
                <select
                  value={year}
                  className="form-control"
                  onChange={setYearHandler}
                >
                  <option value="">Select Year</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                </select>
              </div>
            </Col>
            <Col sm={4}>
              <div className="form-group">
                {/* <label className="name f-w-600">Day</label>
                                <div>
                                {startDate !== undefined ? days[startDate.getDay()] : 0}
                                </div> */}
                <label className="name f-w-600">Day/Week/Month</label>
                <select
                  value={dayWeekMonth}
                  className="form-control"
                  onChange={(e) => setDayWeekMonth(e.target.value)}
                >
                  <option>Day</option>
                  <option>Week</option>
                  <option>Month</option>
                </select>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={6}>
          <Row>
            {dayWeekMonth === "Day" ? (
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="name f-w-600">
                    {" "}
                    Date<span style={{ color: "red" }}>*</span> &nbsp;
                  </label>
                  <DatePicker
                    className="form-control Value"
                    selected={startDate}
                    dateFormat="yyyy-MM-dd"
                    // readOnly
                    required
                    onChange={(e) => fromDateHandler(e)}
                  />
                </div>
              </div>
            ) : dayWeekMonth === "Week" ? (
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="name f-w-600">Week Name</label>
                  <select
                    value={weekName}
                    className="form-control"
                    onChange={(e) => {
                      setWeekName(e.target.value);
                      viewDates(0, year, e.target.value);
                    }}
                  >
                    <option value="">Select Week Name</option>
                    {weekList !== null &&
                      weekList !== undefined &&
                      weekList.map((item, i) => {
                        return (
                          <option key={i} value={item.weekName}>
                            {item.weekName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            ) : dayWeekMonth === "Month" ? (
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="name f-w-600">Month</label>
                  <select
                    value={month}
                    className="form-control"
                    onChange={(e) => {
                      setMonth(e.target.value);
                      viewDates(e.target.value, year);
                    }}
                  >
                    <option value="">Select Month</option>
                    {monthList.map((item, i) => {
                      return (
                        <option key={i} value={item.month}>
                          {item.monthName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="col-sm-4">
              <div className="form-group">
                <label className="name f-w-600">
                  Select Store<span style={{ color: "red" }}>*</span>&nbsp;{" "}
                </label>
                {/* <h1> {StoreType} </h1> */}
                {rolePermission == "admin" ||
                rolePermission == "superCostCenterManager" ? (
                  <Select
                    name="filters"
                    placeholder={StoreType}
                    value={StoreType}
                    style={{ fontSize: "0.8rem" }}
                    options={
                      cosCentreList !== null && cosCentreList !== undefined
                        ? cosCentreList.map((e) => ({
                            label: e.costCentreName,
                            value: e.costCentreName,
                          }))
                        : []
                    }
                    onChange={fromStoreHandler}
                    required
                    isSearchable
                  />
                ) : (
                  // <select
                  //     className="form-control Value"
                  //     onChange={(e) => fromStoreHandler(e.target.value)}
                  // >
                  //     {/* <option value="">Select</option> */}
                  //     {cosCentreList !== null && cosCentreList !== undefined && cosCentreList.map((e, i) => {
                  //         return (
                  //             <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                  //     })}

                  // </select>
                  <input
                    type="text"
                    className="form-control Value"
                    required
                    readOnly
                    value={user.costCentre}
                  />
                )}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="name f-w-600">
                  Select Cluster<span style={{ color: "red" }}>*</span>&nbsp;{" "}
                </label>
                {/* {user.loginType === "1" || user.loginType === "9" || user.additionalRole === "1" || user.additionalRole === "9" ?


                                    <select
                                        className="form-control Value"
                                        onChange={(e) => fromClusterHandler(e)}
                                    >
                                        

                                        {clusterList !== null &&
                                            clusterList.map((e, i) => {
                                                return (
                                                    <option key={i + 1} value={e.clusterId} >{e.clusterName}</option>)
                                            })}


                                    </select> : */}

                <select
                  className="form-control Value"
                  onChange={(e) => fromClusterHandler(e)}
                >
                  {clusterCostCenterList == null ? (
                    <option value="">No Options</option>
                  ) : (
                    clusterCostCenterList.map((e, i) => {
                      return (
                        <option key={i + 1} value={e.clusterId}>
                          {e.clusterName}
                        </option>
                      );
                    })
                  )}
                </select>
                {/* } */}
              </div>
            </div>
          </Row>
        </Col>
      </Row>
      <Row className="Row3"> Cluster : {ClusterName} </Row>
      <Row className="container-fluid">
        <table
          style={{
            width: "100%",
            textAlign: "left",
            margin: "0 2%",
            borderBottom: "1px solid #dee2e6",
          }}
          className="table"
        >
          <tbody>
            <tr className="Border">
              <td className="Tdwidth Border">Target productivity of cluster</td>
              <td className="Tdwidth Border">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].clusterProductivityTarget
                  : "0"}
              </td>
              <td className="Tdwidth Border">Target productivity of store</td>
              <td className="Tdwidth Border">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].storeProductivityTarget
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Quantity Target of cluster</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].clusterQtyTarget
                  : "0"}
              </td>
              <td className="Tdwidth">Quantity Piloted of store</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].storeQtyPiloted.toFixed(2)
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Planned Hours of cluster</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].clusterPlannedHours
                  : "0"}
              </td>
              <td className="Tdwidth">Quantity Target of store</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].storeQtYTarget
                  : "0"}
              </td>
            </tr>
          </tbody>
        </table>
      </Row>
      <Row className="container-fluid">
        <Col></Col>
        <Col xs={6}>
          <table
            className="table"
            style={{
              width: "100%",
              textAlign: "left",
              backgroundColor: "#376ebb",
              color: "white",
              margin: "3% 0%",
            }}
          >
            <tbody>
              <tr>
                <td className="Tdwidth Border">Gap</td>
                <td className="Tdwidth Border">
                  {graphData !== null &&
                  graphData[0] !== undefined &&
                  ClusterName !== ""
                    ? (
                        graphData[0].hoursData[0].storeQtYTarget -
                        graphData[0].hoursData[0].storeQtyPiloted
                      ).toFixed(2)
                    : "0"}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="container-fluid">
        <table
          style={{
            width: "100%",
            textAlign: "left",
            margin: "0 2%",
            borderBottom: "1px solid #dee2e6",
          }}
          className="table"
        >
          <tbody>
            <tr>
              <td className="Tdwidth">Planned Hours FT</td>
              <td className="Tdwidth">
                {clusterHours.length !== 0 && ClusterName !== ""
                  ? clusterHours[0].permanent
                  : 0}
              </td>
              <td className="Tdwidth">Planned Hours Store</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].storePlannedHours
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Planned Hours PPT</td>
              <td className="Tdwidth">
                {clusterHours.length !== 0 && ClusterName !== ""
                  ? clusterHours[1].parttime
                  : 0}
              </td>
              <td className="Tdwidth">Planned Hours FT</td>
              <td className="Tdwidth">
                {roasterHour.length !== 0 && ClusterName !== ""
                  ? roasterHour[0].permanent
                  : 0}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Planned Hours TPT</td>
              <td className="Tdwidth">
                {clusterHours.length !== 0 && ClusterName !== ""
                  ? clusterHours[3].temporary
                  : 0}
              </td>
              <td className="Tdwidth">Planned Hours PPT</td>
              <td className="Tdwidth">
                {roasterHour.length !== 0 && ClusterName !== ""
                  ? roasterHour[1].parttime
                  : 0}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Planned Hours INT</td>
              <td className="Tdwidth">
                {clusterHours.length !== 0 && ClusterName !== ""
                  ? clusterHours[2].internship
                  : 0}
              </td>
              <td className="Tdwidth">Planned Hours INT</td>
              <td className="Tdwidth">
                {roasterHour.length !== 0 && ClusterName !== ""
                  ? roasterHour[2].internship
                  : 0}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Cluster OnDuty Hours</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].clusterOnDutyHours
                  : "0"}
              </td>
              <td className="Tdwidth">Store OnDuty Hours</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].storeOnDutyHours
                  : "0"}
              </td>
            </tr>
            <tr>
              <td className="Tdwidth">Cluster Captain Hours</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].clusterCaptainHours
                  : "0"}
              </td>
              <td className="Tdwidth">Store Captain Hours</td>
              <td className="Tdwidth">
                {graphData !== null &&
                graphData[0] !== undefined &&
                ClusterName !== ""
                  ? graphData[0].hoursData[0].storeCaptainHours
                  : "0"}
              </td>
            </tr>
          </tbody>
        </table>
      </Row>

      <div>
        <Row style={{ margin: "7% 0%" }}>
          <Col>
            <Graph
              name="Cluster - Daily Qty vs No. of hours Planned"
              hours={dpshoursCluster}
              Qty={dpsQtyCluster}
              dayWeekMonth={dayWeekMonth}
            />
          </Col>
        </Row>
        <Row style={{ margin: "7% 0%", textAlign: "center" }}>
          <Col>
            <Graph
              name="Store - Daily Qty vs No. of hours Planned"
              hours={dpshoursStore}
              Qty={dpsQtyStore}
              dayWeekMonth={dayWeekMonth}
            />
          </Col>
        </Row>
      </div>

      {/* <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <table className="table table-bordered">
                            <tbody>
                                    <tr>
                                        <th></th>
                                        <th>This Year</th>
                                        <th>Last Year</th>
                                    </tr>
                                
                                
                                    <tr>
                                        <td>Planned Hours</td>
                                        <td>232</td>
                                        <td>280</td>
                                    </tr>
                                    <tr>
                                        <td>Target Quantity</td>
                                        <td>3248</td>
                                        <td>3916</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col></Col>
                    </Row> */}
                    </div>
    </div>
  );
}

export default Dashboard;
