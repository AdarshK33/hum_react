import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { RosterContext } from "../../context/RosterState";
import "react-toastify/dist/ReactToastify.css";

const AdminShiftModal = (props) => {
  // console.log("MY PROPS " + JSON.stringify(props));
  // let date = moment(props.Date, 'YYYY-MM-DD').week();
  const [date, setdate] = useState();
  // let date = "";
  const [key, setKey] = useState("shift");

  // const shiftDateWeek = props.shiftDate;
  const [shiftDateWeek, setShiftDateWeek] = useState(props.shiftDate);
  console.log("=====" + props.employeId,shiftDateWeek);
  const [selectedWeeks, setSelectedWeeks] = useState();
  const [weekDay, setWeekDay] = useState();
  const [value, setValue] = useState();
  const [firstName, setFirstName] = useState("");
  const [showDay, setShowDay] = useState(false);
  const [weekDayList, setWeekDayList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [employee, setEmployee] = useState([{label:props.firstName+" "+props.lastName+"-"+props.employeId,value:props.employeId}]);
  
  const [days, setDays] = useState([{label: props.weekDAY,value: props.Date}]);
  const [daysList, setDaysList] = useState([{label: props.weekDAY,value: props.Date}]);
  const [assignShiftButton, setAShiftButton] = useState(true);
  const [assignWeekOffButton, setAssignWeekOffButton] = useState(true);
  const [contractType, setContractType] = useState([]);
  const [msg, setMsg] = useState(false);
  const [msg1, setMsg1] = useState(false);
  const [empData, setEmpData] = useState();
  const [weekNameData, setWeekNameData] = useState();
  
  console.log("weekDAY",props.weekDAY);
  const {
    weekDays,
    weekOffDays,
    availableShifts,
    availableShiftData,
    adminRosterAvailableShiftList,
    adminRosterAvailableShift,
    assignAdminShift,
    getallWeeks,
    weeksInYear,
    getEmployeeListForAdminRosterWeekOff,
    EmployeeListForAdminRosterWeekOff,
    adminAddWeekOff,
    adminWeekOffDataListHeader,
    adminCalculateWeek,
    adminCalculateWeekResult,
  } = useContext(RosterContext);
useEffect(() => {
  if(employee && shiftDateWeek && daysList && Object.keys(daysList).length){
    setAssignWeekOffButton(false)
  }else{
    setAssignWeekOffButton(true)
  }
  
}, [employee ,shiftDateWeek ,daysList])

  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(availableShiftData, "data");
  console.log(weeksInYear, "weeks");

  useEffect(() => {
    setFirstName(props.firstName);
  }, [props.firstName]);

  useEffect(() => {
    console.log("adminWeekOffDataListHeader",adminWeekOffDataListHeader);
    let selectedWeekName;
    if(selectedWeeks!==null && selectedWeeks!==undefined){
      selectedWeekName=selectedWeeks;
    }else{
      selectedWeekName=props.shiftDate;
    }
    for (let i = 0; i < adminWeekOffDataListHeader.length; i++) {
      if (selectedWeekName === adminWeekOffDataListHeader[i].weekId) {
        let weekNumber = adminWeekOffDataListHeader[i].weekName;
        //  date = weekNumber.split(' ')[0].trim();
        setdate(weekNumber.split("Week")[1].trim());
        // date = weekNumber.split('Week')[1].trim();
      }
    }
  }, [props.shiftDate,selectedWeeks]);
  useEffect(() => {
    setContractType(props.contractType);
    console.log("props.contractType", props.contractType);
  }, [props.contractType]);

  useEffect(() => {
    getEmployeeListForAdminRosterWeekOff(
      props.contractType,
      props.mystoreId,
      props.cid
    );
    if(weekDayList!== null &&weekDayList!==undefined){
      let selectedWeekDetails = weekDayList.filter(
        (item) => item.weekId == selectedWeeks 
      );
  
      if(selectedWeekDetails && selectedWeekDetails !== null &&
        selectedWeekDetails !== undefined && Object.keys(selectedWeekDetails).length){
      availableShifts(selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);  
    }}
    if (props.Date !== undefined) {
      getallWeeks(props.Date);
    }
    if (props.endDate !== undefined && props.startDate !== undefined) {
      console.log(
        "check dates",
        props.endDate.format("YYYY-MM-DD"),
        props.startDate.format("YYYY-MM-DD")
      );
      adminCalculateWeek(
        props.endDate.format("YYYY-MM-DD"),
        props.startDate.format("YYYY-MM-DD")
      );
    }

    if (props.empData !== "") {
      setEmpData(props.empData);
    }
    adminRosterAvailableShift(props.contractType, props.mystoreId);
  }, [
    props.contractType,
    props.mystoreId,
    props.empData,
    props.cid,
    props.endDate,
    props.startDate,
    selectedWeeks
  ]);
  //my store id

  useEffect(() => {
    // console.log('shiftDateWeek', shiftDateWeek)
    console.log("props my store ID ", props.mystoreId);
    console.log("props.shiftDate", props.shiftDate);

    console.log("props cluster id  ========" + props.cid);
   
    console.log("week number",selectedWeeks,weekDayList);
    if(weekDayList!== null &&weekDayList!==undefined){
    let selectedWeekDetails = weekDayList.filter(
      (item) => item.weekId == selectedWeeks 
    );
    
    console.log("selectedWeekDetails-->",selectedWeekDetails);
    if(selectedWeekDetails && selectedWeekDetails !== null &&
      selectedWeekDetails !== undefined && Object.keys(selectedWeekDetails).length){
    adminRosterAvailableShift(props.contractType, props.mystoreId,selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);
    availableShifts(selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);  
  }}
  
    weekOffDays(shiftDateWeek);
  }, [selectedWeeks]);

  useEffect(() => {
    let { Date } = props;
    let weeks = [];
    if (adminCalculateWeekResult !== null) {
      weeks = adminCalculateWeekResult.map((arr) => {
        let weekNumber = arr.weekId;
        return {
          ...arr,
          selected: parseInt(weekNumber) === shiftDateWeek,
        };
      });
    }
    if(weekDays && Object.keys(weekDays)){
      const days = weekDays.map((arr) => {
        console.log({ arr }, Date);
        return {
          ...arr,
          selected: arr.date === Date,
        };
      });
      setWeekDayList(weeks);
      setDayList(days);
    }

    // setWeekDay(Date);
    // setDaysList(Date);
    // console.log(weeks, 'Shift year');
    //  console.log(days, 'Shift day');
  }, [props.shiftDate, weekDays, adminCalculateWeekResult]);

  const onSubmit = (e) => {
    e.preventDefault();
    const validate = validation();
    let WeekDate = daysList;
    let weekNumber = date;
    if (weekNameData !== undefined) {
      weekNumber = weekNameData.split("-")[0].trim();
      weekNumber = weekNumber.split("Week")[1].trim();
    }
    var loIsDate = new Date(daysList);
    let day = Days[loIsDate.getDay()];
    if (
      adminWeekOffDataListHeader !== undefined &&
      adminWeekOffDataListHeader !== null
    ) {
      for (let i = 0; i < adminWeekOffDataListHeader.length; i++) {
        if (adminWeekOffDataListHeader[i].weekName.includes(weekNumber)) {
          // for (let j = 0; j < empData[i].employeeRosters.length; j++) {
          //   loIsDate = new Date(empData[i].employeeRosters[j].date);
          //   let changeDay = Days[loIsDate.getDay()];
          if (day === adminWeekOffDataListHeader[i].day) {
            // setWeekDay(empData[i].employeeRosters[j].date)
            WeekDate = adminWeekOffDataListHeader[i].date;
          }
          // }
        }
      }
    }

    const newWeekOffAdminRoster = {
      date: WeekDate.map((e, i) => WeekDate[i].value),
      employeeIds: employee.map((e, i) => employee[i].value),
    };
    console.log("newWeekOffAdminRoster",newWeekOffAdminRoster);
    if (validate) {
      adminAddWeekOff(newWeekOffAdminRoster);

      setSelectedWeeks(1);
      // setWeekDay("");
      setDaysList([]);
      setShowDay(false);
      props.handleClose();
      setAssignWeekOffButton(true);
    }
  };
  const validation = () => {
    let flag = true;
    if (employee.length === 0) {
      toast.info("Select employee is mandatory");
      flag = false;
      return;
    }

    return flag;
  };

  const handleWeeksChange = (e) => {
    let newValue = e.target.value;
    let idx = e.target.selectedIndex;
    if (e.target.options[idx].innerText !== "Select") {
      setWeekNameData(e.target.options[idx].innerText);
    } else {
      setWeekNameData("");
    }
    console.log("newValue", newValue);
    setSelectedWeeks(newValue);
    setShiftDateWeek(newValue);
    setShowDay(true);
    setDaysList([])
  };

  const handleEmployeeList = (options) => {
    setEmployee(options);
    if ((options !== null && days !== null && days !== undefined )|| 
      (!employee) ) {
      if (days.length !== 0) {
        setMsg(true);
        setAShiftButton(false);
        setMsg1(false);
      }
    } else {
      setMsg1("* Select Employee Is Required ");
      setAShiftButton(true);
      setMsg(false);
    }
  };

  const handleDayList = (options) => {
    setDays(options);
    if (options !== null && employee !== null && employee !== undefined) {
      if (employee.length !== 0) {
        setMsg1(true);
        setAShiftButton(false);
        setMsg(false);
      }
    } else {
      setMsg("* Select Day Is Required ");
      setAShiftButton(true);
      setMsg1(false);
    }
  };

  const setShiftAdminList = (event) => {
    console.log("setShiftAdminList",event.target.value);
    setValue(event.target.value);
    if (event.target.value) {
      setAShiftButton(false);
      setMsg(false);
  } else {
    setMsg("* Select Shift Is Required ");
    setAShiftButton(true);
  }
  };

  const handleDayList1 = (options) => {
    setDaysList(options);
    // if (options !== null && employee !== null && employee !== undefined) {
    //   if (employee.length !== 0) {
    //     setMsg1(true);
    //     setAShiftButton(false);
    //     setMsg(false);
    //   }
    // } else {
    //   setMsg("* Select Day Is Required ");
    //   setAShiftButton(true);
    //   setMsg1(false);
    // }
  };
  const handleEmployeeList1 = (options) => {
    setEmployee(options);
    if (options !== null) {
      setAssignWeekOffButton(false);
    } else {
      setAssignWeekOffButton(true);
    }
  };

  const setWeekDayHandler = (e) => {
    let newDay = e.target.value;
    setWeekDay(newDay);
    console.log("new Day", newDay);
  };

  const onSubmit1 = (event) => {
    event.preventDefault();
console.log("onSubmit1",days,employee,value,props.mystoreId);
    const adminAssignShift = {
      dates: days.map((e, i) => days[i].value),
      employeeIds: employee.map((e, i) => employee[i].value),
      shiftId: parseInt(value),
      storeId: props.mystoreId,
    };
    assignAdminShift(adminAssignShift);
    props.handleClose();
    // setAShiftButton(true);
  };

  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title> Team Roster</Modal.Title>
        </Modal.Header>
        <Container>
          <Modal.Body>
            <Tabs
              value="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="shift" title="Assign Shift">
                <form onSubmit={onSubmit1}>

                <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Week :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          value={selectedWeeks}
                          onChange={handleWeeksChange}
                        >
                          <option value="">Select Week</option>

                          {weekDayList !== null &&
                            weekDayList.map((item, i) => {
                              return (
                                <option
                                  key={item.weekId}
                                  selected={item.selected}
                                  value={item.weekId}
                                >
                                  {item.weekName + " - " + item.year}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <h6
                      style={{
                        color: "red",
                        fontFamily: "work-Sans, sans-serif",
                        fontSize: "12px",
                        marginLeft: "5px",
                      }}
                    >
                      {msg}
                    </h6>
                  </div>
                 
                  {/* SELECT EMPLOYEE */}
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Employees :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          required
                          name="filters"
                          placeholder="Select Employees"
                          defaultValue=""
                          value={employee}
                          style={{ fontSize: "0.8rem" }}
                          options={
                            EmployeeListForAdminRosterWeekOff !== null &&
                            EmployeeListForAdminRosterWeekOff.map((e) => ({
                              label:
                                e.firstName +
                                " " +
                                e.lastName +
                                " - " +
                                e.employeeId,
                              value: e.employeeId,
                            }))
                          }
                          onChange={handleEmployeeList}
                          isMulti
                        />
                      </div>
                    </div>
                    <h6
                      style={{
                        color: "red",
                        fontFamily: "work-Sans, sans-serif",
                        fontSize: "12px",
                        marginLeft: "5px",
                      }}
                    >
                      {msg1}
                    </h6>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Available Shifts :<span style={{ color: "red" }}>*</span>
                    </div>
                    {/* Name :<h1>{firstName}{contractType}</h1> */}
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select
                          className="form-control"
                          style={{ fontSize: "0.8rem" }}
                          required
                          onChange={setShiftAdminList}
                        >
                          <option value="">Select Shift</option>
                          {adminRosterAvailableShiftList !== null &&
                            adminRosterAvailableShiftList.map((item, i) => {
                              return (
                                <option
                                  key={item.value}
                                  value={item.shiftMasterId}
                                >
                                  {item.startTime +
                                    "-" +
                                    item.endTime +
                                    "(" +
                                    item.shiftType +
                                    ")"}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Day :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          required
                          placeholder="Select Day"
                          defaultValue=""
                          value={days}
                          style={{ fontSize: "0.8rem" }}
                          options={
                            dayList !== null &&
                            dayList.map((e) => ({
                              label: e.day,
                              value: e.date,
                            }))
                          }
                          onChange={handleDayList}
                          isMulti
                        />
                      </div>
                    </div>
                  </div>

                  <div className="note text-primary text-center py-1">
                    <button
                      className="btn btn-primary mb-2 mr-2"
                      disabled={assignShiftButton}
                      type="submit"
                      value="Submit"
                    >
                      Assign
                    </button>
                  </div>
                </form>

                <br />
                <h6
                  className="note text-danger text-center"
                  style={{ fontWeight: "700" }}
                >
                  * &nbsp;Note: Weekly off is mandatory to assign shift
                </h6>
              </Tab>
              <Tab eventKey="weekoff" title="Assign Week Off">
                <form onSubmit={onSubmit}>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Employees :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7">
                      <div className="form-group">
                        <Select
                          name="filters"
                          required={true}
                          placeholder="Select Employees"
                          defaultValue=""
                          value={employee}
                          style={{ fontSize: "0.8rem" }}
                          options={
                            EmployeeListForAdminRosterWeekOff !== null &&
                            EmployeeListForAdminRosterWeekOff.map((e) => ({
                              label:
                                e.firstName +
                                " " +
                                e.lastName +
                                "-" +
                                e.employeeId,
                              value: e.employeeId,
                            }))
                          }
                          onChange={handleEmployeeList1}
                          isMulti
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Week :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select
                          className="form-control"
                          value={selectedWeeks}
                          required
                          onChange={handleWeeksChange}
                        >
                          <option value="">select Week</option>
                          {weekDayList !== null &&
                            weekDayList.map((item, i) => {
                              return (
                                <option
                                  key={item.weekId}
                                  selected={item.selected}
                                  value={item.weekId}
                                >
                                  {item.weekName + " - " + item.year}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Day :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          required
                          placeholder="Select Day"
                          defaultValue=""
                          value={daysList}
                          style={{ fontSize: "0.8rem" }}
                          options={
                            dayList !== null &&
                            dayList.map((e) => ({
                              label: e.day,
                              value: e.date,
                            }))
                          }
                          onChange={handleDayList1}
                          isMulti
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row py-2">
                    <div className="col-sm-5 px-2">
                      Select Day :<span style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setWeekDayHandler(e)}
                        >
                          <option value="">select day</option>
                          {dayList !== null &&
                            dayList.map((item, i) => {
                              return (
                                <option
                                  key={item.date}
                                  selected={item.selected}
                                  value={item.date}
                                >
                                  {item.day}
                                  {item.selected}
                                </option>
                              );
                            })}
                        </select> 
                      </div>
                    </div>
                  </div>*/}
                  <div className="justify-content-center d-flex">
                    <button
                      className="btn btn-primary mb-2 mr-2"
                      disabled={assignWeekOffButton}
                      type="submit"
                      value="Submit"
                    >
                      Assign
                    </button>
                  </div>
                </form>
                <br />
                <h6
                  className="note text-danger text-center pb-2"
                  style={{ fontWeight: "700" }}
                >
                  * &nbsp; Note: Only same contract employees can be selected
                </h6>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Container>
      </Modal>
    </Fragment>
  );
};

export default AdminShiftModal;
