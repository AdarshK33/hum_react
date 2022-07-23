import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import { ClusterContext } from "../../context/ClusterState";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import AdminShiftModal from "./adminShiftModal";
import "./roster.css";
import moment from "moment";
import { PermissionContext } from "../../context/PermissionState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRoster = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add("30", "d"));
  const [adminModal, setAdminModal] = useState(false);
  const [shiftDate, setshiftDate] = useState(false);
  const [contractType, setContractType] = useState("");
  // const [contract] = useState('permanent');
  // const [weekid] = useState(0);
  const [singleWeek, getSingleWeek] = useState();
  const [clusterId, setClusterId] = useState();
  const [firstName, setFirstName] = useState("");
  const [costCenter1, setCostCenter1] = useState();
  const [tableShow, setTableShow] = useState(false);
  const [adminRosterButton, setadminRosterButton] = useState(true);
  const [storecostCenterName, setstorecostCenterName] = useState("");
  const [date, setDate] = useState();
  const [employeId, setEmployeId] = useState("");
  const [lastName, setlastName] = useState("");
  const { user,fetchemployeeData } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
  const [weekDAY,setWeekDAY]= useState("")

  const {
    adminWeekOffDataEmp,
    viewContractTypes,
    shiftContractNames,
    costCenterList,
    adminWeekOffDataListHeader,
    adminWeekOffDataList,
    adminCalculateWeek,
    adminCalculateWeekResult,
    adminRosterAvailableShift,
    costCenter,
    rosterExport,
    availableShifts,
  } = useContext(RosterContext);
  const { viewClusterCostCenter, clusterCostCenterList } =
    useContext(ClusterContext);

  const setWeekCalc = (e) => {
    let data1 = e.target.value;
    getSingleWeek(data1);
  };
  const handleCostCenter = (options) => {
    let data2 = options !== null ? options.value : "";
    setCostCenter1(data2);
    setstorecostCenterName(data2);
    setadminRosterButton(false);
    viewClusterCostCenter(data2);
  };

  const setClusterIdForAdmin = (e) => {
    let data = e.target.value;
    setClusterId(data);
  };
  useEffect(() => {
    viewContractTypes();
    setContractType("all");
    costCenter();
    calcWeek();

    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager" &&
      rolePermission !== "costCenterManager"
    ) {
      setCostCenter1(fetchemployeeData.costCenter);
      setstorecostCenterName(fetchemployeeData.costCenter);
      viewClusterCostCenter(fetchemployeeData.costCentre);
    }
  }, [fetchemployeeData.costCenter, user.loginType]);

  const handleClose = () => setAdminModal(false);
  const handleShow = (item, employeId,lastName,name, ctype, weekId,index) => {
    console.log("contract type", item,ctype,index);
    // if(moment(item.date).format("YYYY-MM-DD")<moment().format("YYYY-MM-DD")){
    //   toast.error("Please select future date");
    // }else{
      {adminWeekOffDataListHeader !== null &&
        adminWeekOffDataListHeader.map((e, i) => {
         if(parseInt(i)===parseInt(index)){
           setWeekDAY(e.day)
         }
        })}

    setshiftDate(item.weekId);
    setAdminModal(true);
    setDate(item);
    setFirstName(name);
    setEmployeId(employeId)
    setlastName(lastName)

    setContractType(ctype);
    if(adminCalculateWeekResult!== null &&adminCalculateWeekResult!==undefined){
      let selectedWeekDetails = adminCalculateWeekResult.filter(
        (item) => item.weekId == item.weekId 
      );
  
      console.log("selectedWeekDetails-->",selectedWeekDetails);
      if(selectedWeekDetails && selectedWeekDetails !== null &&
        selectedWeekDetails !== undefined && Object.keys(selectedWeekDetails).length){
          adminRosterAvailableShift(ctype, costCenter1,selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);
      availableShifts(selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);  
    }}
    
    // }
    // getallWeeks()
  };

  // const handleCostCenter = (options) => {
  //     let data2 = options !== null ? options.value : ''
  //     setCostCenter1(options)
  //     alert(options);
  //     setstorecostCenterName(data2)
  //     setadminRosterButton(false)
  // }

  // data for next page  setstorecostCenterName

  const submitDate = (e) => {
    e.preventDefault();
    adminWeekOffDataEmp(
      endDate.format("YYYY-MM-DD"),
      startDate.format("YYYY-MM-DD"),
      contractType,
      singleWeek,
      costCenter1,
      clusterId
    );
    checkAdminListLength();
  };
  const checkAdminListLength = () => {
    if (checkAdminListLength.length === 0) {
      setTableShow(true);
    }
  };
  const calcWeek = () => {
    adminCalculateWeek(
      endDate.format("YYYY-MM-DD"),
      startDate.format("YYYY-MM-DD")
    );
  };

  const exportSheet = (e) => {
    e.preventDefault();
    rosterExport(
      endDate.format("YYYY-MM-DD"),
      startDate.format("YYYY-MM-DD"),
      contractType,
      singleWeek,
      costCenter1,
      clusterId
    );
  };

  const checkCondition = (item, employeId,lastName, name, ctype, costCentreName, weekId,index) => {
    if (item.roster == null) {
      return (
        <button
          className="btn btn-square bg-secondary btn-sm pl-5 pr-5"
          onClick={() => handleShow(item,employeId,lastName,name, ctype, costCentreName, weekId,index)}
        >
          +
        </button>
      );
    } else if (item.roster.leave !== "" && item.roster.leave !== null) {
      return (
        <button
          className="btn btn-square btn-danger btn-sm"
          onClick={() => handleShow(item, employeId,lastName,name, ctype, costCentreName, weekId,index)}
          type="button"
        >
          Leave
        </button>
      );
    } else if (item.roster.holiday !== "" && item.roster.holiday !== null) {
      return (
        <button
          className="btn btn-square btn-warning btn-sm"
          onClick={() => handleShow(item, employeId,lastName,name, ctype, costCentreName, weekId,index)}
        >
          {item.roster.holiday}
        </button>
      );
    } else if (item.roster.weekOff) {
      return (
        <button
          className="btn btn-square btn-info btn-sm"
          onClick={() => handleShow(item,employeId,lastName, name, ctype, costCentreName, weekId,index)}
          type="button"
        >
          Week Off
        </button>
      );
    } else if (item.roster.shiftName !== "" && item.roster.shiftName !== null) {
      return (
        <button
          className="btn btn-square btn-success  btn-sm"
          onClick={() => handleShow(item, employeId,lastName,name, ctype, costCentreName, weekId,index)}
          type="button"
        >
          {item.roster.shiftName}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-square bg-secondary btn-sm pl-5 pr-5"
          onClick={() => handleShow(item,employeId,lastName, name, ctype, costCentreName, weekId,index)}
        >
          +
        </button>
      );
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Team Roster" parent="Team Roster" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card h-100">
              <div className="card-header">
                <div className="form">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="name f-w-600">From Date</label>

                        <div className="shift-date">
                          <DatePicker
                            className="form-control shift-view"
                            selected={startDate.toDate()}
                            dateFormat="yyyy-MM-dd"
                            required
                            onChange={(date) =>
                              setStartDate(moment(date, "YYYY-MM-DD"))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="name f-w-600">To Date</label>

                        <div className="shift-date">
                          <DatePicker
                            className="form-control shift-view"
                            selected={endDate.toDate()}
                            minDate={new Date(startDate)}
                            dateFormat="yyyy-MM-dd"
                            required
                            onCalendarClose={() => {
                              calcWeek();
                            }}
                            onChange={(date) =>
                              setEndDate(moment(date, "YYYY-MM-DD"))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {(() => {
                      if (
                        rolePermission !== "admin" ||
                        rolePermission !== "superCostCenterManager"
                      ) {
                        return (
                          <div className="col-sm-4">
                            <label className="name f-w-600">
                              Select Cost Center&nbsp;
                              <span style={{ color: "red" }}>*</span> &nbsp;
                            </label>

                            <Select
                              name="filters"
                              placeholder="Cost Center"
                              options={
                                costCenterList !== null
                                  ? costCenterList.map((e) => ({
                                      label: e.costCentreName,
                                      value: e.costCentreName,
                                    }))
                                  : []
                              }
                              onChange={handleCostCenter}
                              required
                              isSearchable
                            />
                          </div>
                        );
                      }
                    })()}
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="name f-w-600">Select Week </label>

                        <select
                          className="form-control shift-view"
                          value={singleWeek}
                          onChange={(e) => setWeekCalc(e)}
                        >
                          <option value="">
                            Select Week
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </option>
                          {adminCalculateWeekResult !== null &&
                            adminCalculateWeekResult.map((e, i) => {
                              return (
                                <option key={e.weekId} value={e.weekId}>
                                  {e.weekName}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="name f-w-600">
                          Select Employee Type
                        </label>

                        <select
                          className="form-control shift-view"
                          // value={contractType}
                          onChange={(e) => {
                            setContractType(e.target.value);
                            console.log(contractType);
                          }}
                        >
                          <option value="">Select Employee Type</option>
                          <option value="all">All</option>
                          {shiftContractNames !== null &&
                            shiftContractNames.map((e, i) => {
                              return (
                                <option key={e.typeId} value={e.contractType}>
                                  {e.contractType}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="name f-w-600">Select Cluster</label>

                        <select
                          className="form-control shift-view"
                          onChange={(e) => setClusterIdForAdmin(e)}
                        >
                          {/* {clusterCostCenterList == null ?

                                                        <option value="">No Options</option> :

                                                        clusterCostCenterList.map((e, i) => {
                                                            return (
                                                                <option key={i + 1} value={e.clusterId} >{e.clusterName}</option>)
                                                        })
                                                    } */}
                          <option value="">Select Cluster</option>
                          <option value="0">All</option>
                          {clusterCostCenterList !== null &&
                            clusterCostCenterList.map((e, i) => {
                              return (
                                <option key={i + 1} value={e.clusterId}>
                                  {e.clusterName}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <button
                        className="myclass"
                        style={{
                          marginTop: "5px",
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          fontWeight: "bold",
                        }}
                        disabled={adminRosterButton}
                        type="button"
                        onClick={(e) => submitDate(e)}
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-sm-4">
                      <button
                        className="myclass"
                        style={{
                          marginTop: "5px",
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          fontWeight: "bold",
                        }}
                        type="button"
                        onClick={(e) => exportSheet(e)}
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {tableShow && (
                <div className="table-responsive">
                  <table className="table table-fixed">
                    <thead
                      style={{
                        background: "#006EBB",
                        color: "white",
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            fontWeight: "bold",
                            paddingLeft: "70px",
                            paddingTop: "10px",
                            paddingRight: "70px",
                          }}
                        >
                          Employee
                        </th>
                        {adminWeekOffDataListHeader !== null &&
                          adminWeekOffDataListHeader.map((e, i) => {
                            return (
                              <th scope="col" key={e.date}>
                                {e.day}
                                <br />
                                {e.weekName}{" "}
                              </th>
                            );
                          })}
                      </tr>
                    </thead>

                    <tbody>
                      {adminWeekOffDataListHeader !== null &&
                        adminWeekOffDataListHeader.map((e, i) => {
                          // return (
                          //     <th scope="col" key={e.date}>{e.day}<br />{e.weekName} </th>
                          // )
                        })}
                      {adminWeekOffDataList !== null &&
                        adminWeekOffDataList.length > 0 &&
                        adminWeekOffDataList.map((item, i) => {
                          return (
                            <tr>
                              <td>
                                <div className="row">
                                  <div className="col-sm-3">
                                    <i
                                      className="fa fa-user-circle fa-4x py-2"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="col-sm-9">
                                    <p>
                                      {item.firstName}&nbsp;{item.lastName}
                                    </p>
                                    <p
                                      style={{
                                        lineHeight: "0.8",
                                        color: "red",
                                      }}
                                    >
                                      {item.employeeId}
                                    </p>
                                    <p
                                      style={{
                                        lineHeight: "0.8",
                                        color: "blue",
                                      }}
                                    >
                                      {item.contractType}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              {item.employeeRosters.map(
                                (data, index) => {
                                  // let newData = new Date(data.date)

                                  //  console.log(newData.getDay(), "day")

                                  return (
                                    <td>
                                      {item.weekName}
                                      <br />
                                      {data.date}
                                      <br />{" "}
                                      {checkCondition(
                                        data,
                                        item.employeeId,
                                        item.lastName,
                                        item.firstName,
                                        item.contractType,
                                        item.costCentreName,
                                        index
                                      )}
                                    </td>
                                  );
                                }
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {adminWeekOffDataList === null ? (
                    <p style={{ textAlign: "center" }}>No Record Found</p>
                  ) : null}

                  {adminWeekOffDataList !== undefined &&
                  adminWeekOffDataList !== null &&
                  adminWeekOffDataList.length === 0 ? (
                    <div
                      className="loader-box loader"
                      style={{ width: "100% !important" }}
                    >
                      <div className="loader">
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                        <div className="line bg-primary"></div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        {adminModal && (
          <AdminShiftModal
            handleClose={handleClose}
            contractType={contractType}
            firstName={firstName}
            lastName={lastName}
            employeId={employeId}
            modal={adminModal}
            shiftDate={shiftDate}
            mystoreId={storecostCenterName}
            Date={date.date}
            empData={adminWeekOffDataList}
            cid={clusterId}
            endDate={endDate}
            startDate={startDate}
            weekDAY={weekDAY}
          />
        )}
      </div>
    </Fragment>
  );
};

export default AdminRoster;
