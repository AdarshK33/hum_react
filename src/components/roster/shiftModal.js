import React, { Fragment, useState, useContext, useEffect } from "react";
import { Container, Form, Modal, Tabs, Tab } from "react-bootstrap";
import Select from "react-select";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import "./roster.css";
import moment from "moment";

const ShiftModal = (props) => {
  const [key, setKey] = useState("shift");
  // const date = moment(props.Date, 'YYYY-MM-DD').week();
  const date = parseInt(props.weekName.split("Week")[1].trim());
  // const [date, setdate] = useState()

  // const shiftDateWeek = props.shiftDate;
  const [shiftDateWeek, setShiftDateWeek] = useState(props.shiftDate);
  const [selectedWeeks, setSelectedWeeks] = useState();
  const [weekDay, setWeekDay] = useState();
  const [value, setValue] = useState();
  const [showDay, setShowDay] = useState(false);
  const [weekDayList, setWeekDayList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [assignShiftButton, setAShiftButton] = useState(true);
  const [empData, setEmpData] = useState();
  const [weekNameData, setWeekNameData] = useState();

  const {
    weekDays,
    weekOffDays,
    addWeekOff,
    availableShifts,
    availableShiftData,
    assignShift,
    getallWeeks,
    weeksInYear,
    adminCalculateWeek,
    adminCalculateWeekResult,
  } = useContext(RosterContext);
  const { user, fetchemployeeData } = useContext(AppContext);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //console.log(availableShiftData, "data")
  //console.log(weeksInYear, "weeks")
  let dt = moment(props.Date, "YYYY-MM-DD HH:mm:ss")
  const [daysList, setDaysList] = useState([{label: dt.format('dddd'),value: props.Date}]);
  console.log("setDaysList",dt.format('dddd'),daysList);
  useEffect(() => {
    if(weekDayList!== null &&weekDayList!==undefined){
      let selectedWeekDetails = weekDayList.filter(
        (item) => item.weekId == selectedWeeks 
      );
      console.log("selectedWeekDetails-->",selectedWeekDetails);
      if(selectedWeekDetails && selectedWeekDetails !== null &&
        selectedWeekDetails !== undefined && Object.keys(selectedWeekDetails).length){
          availableShifts(selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);
      }}
    getallWeeks(props.Date);
    if (props.empData !== "") {
      setEmpData(props.empData);
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
    setWeekDay(props.Date);
    // setDaysList(props.Date)
  }, [props.empData, props.Date, props.endDate, props.startDate]);
  useEffect(() => {
    console.log("shiftDateWeek", shiftDateWeek);
    console.log("week number",selectedWeeks,weekDayList);
    if(weekDayList!== null &&weekDayList!==undefined){

    
    let selectedWeekDetails = weekDayList.filter(
      (item) => item.weekId == selectedWeeks 
    );
    console.log("selectedWeekDetails-->",selectedWeekDetails);
    if(selectedWeekDetails && selectedWeekDetails !== null &&
      selectedWeekDetails !== undefined && Object.keys(selectedWeekDetails).length){
        availableShifts(selectedWeekDetails[0].weekName,selectedWeekDetails[0].year);
    }}
    weekOffDays(shiftDateWeek);
  }, [selectedWeeks]);
  // useEffect(() => {
  //   setSelectedWeeks("")
  // }, [])
  // useEffect(() => {
  //   setdate(props.weekName.split('Week')[1].trim())
  //   // setSelectedWeeks(props.weekName)
  // }, [props.weekName])

  console.log("***" + props.Date);
  useEffect(() => {
    let { Date } = props;
    const weeks = adminCalculateWeekResult.map((arr) => {
      let weekNumber = arr.weekName.split("Week")[1].trim();
      return {
        ...arr,
        selected: parseInt(weekNumber) === date,
      };
    });
    const days = weekDays.map((arr) => {
      console.log({ arr }, Date);
      return {
        ...arr,
        selected: arr.date === Date,
      };
    });

    setWeekDayList(weeks);
    setDayList(days);
    // setWeekDay(shiftDate)
    // console.log(weeks, 'Shift year');
    //  console.log(days, 'Shift day');
  }, [props.shiftDate, weekDays, adminCalculateWeekResult]);

  const submitForm = (e) => {
    e.preventDefault();
    // console.log('Submit form', e.target.value);
    // let WeekDate = weekDay;
    let WeekDate = daysList
    let weekNumber = date;
    if (weekNameData !== undefined) {
      weekNumber = weekNameData.split("-")[0].trim();
      weekNumber = weekNumber.split("Week")[1].trim();
    }
    // var loIsDate = new Date(weekDay);
    var loIsDate = new Date(daysList);
    let day = days[loIsDate.getDay()];
    for (let i = 0; i < empData.length; i++) {
      if (empData[i].weekName.includes(weekNumber)) {
        for (let j = 0; j < empData[i].employeeRosters.length; j++) {
          loIsDate = new Date(empData[i].employeeRosters[j].date);
          let changeDay = days[loIsDate.getDay()];
          if (day === changeDay) {
            // setWeekDay(empData[i].employeeRosters[j].date)
            WeekDate = empData[i].employeeRosters[j].date;
          }
        }
      }
    }
    const setModal = props.handleClose;
    setModal();

    const newWeekOff = {
      date: WeekDate.map((e, i) => WeekDate[i].value),
      employeeId: fetchemployeeData.employeeId,
    };
console.log("roaster weekoff",WeekDate,daysList);
    addWeekOff(newWeekOff);
    console.log("newWeekOff data", newWeekOff);
    setSelectedWeeks(1);
    setDaysList([]);
    setWeekDay("");
    setShowDay(false);
  };
  // const submitForm = (e) => {
  //   e.preventDefault();
  //   // console.log('Submit form', e.target.value);
  //   const setModal = props.handleClose
  //   setModal()

  //   const newWeekOff = {
  //     date: weekDay,
  //     employeeId: user.employeeId,
  //   }

  //   addWeekOff(newWeekOff)
  //   //  console.log("newWeekOff data", newWeekOff)
  //   // history.push("/roster/roster");
  //   setSelectedWeeks(1)
  //   setWeekDay('')
  //   setShowDay(false)
  // }
  const handleChange = (event) => {
    // console.log(event.target.value)
    setValue(event.target.value);
    setAShiftButton(false);
  };
  const handleWeeksChange = (e) => {
    /*   setSelectedWeeks(Array.isArray(e) ? e.map(x => x.value) : []) */
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
  };
  const submitAssignShift = (event) => {
    event.preventDefault();
    const assindata = {
      date: props.Date,
      employeeId: fetchemployeeData.employeeId,
      shiftId: value,
    };
    console.log("roaster shift",props.Date);
    assignShift(assindata);
    props.handleClose();
    setAShiftButton(true);
    // console.log("Submit")
  };

  // const setWeekDayHandler = (e) => {
  //   let newDay = e.target.value;
  //   setWeekDay(newDay);
  //    console.log("new Day", newDay)
  // };

  const handleDayList1 = (options) => {
    setDaysList(options);
  };

  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Roster</Modal.Title>
        </Modal.Header>
        <Container>
          <Modal.Body>
            <Tabs
              value="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="shift" title="Assign Shift">
              <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Week :</div>
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
                  </div>
                <div className="row py-2 ">
                  <div className="col-sm-6 px-2">Employee Name:</div>
                  <div className="col-sm-6 px-2">
                    {fetchemployeeData.firstName} - {fetchemployeeData.employeeId}
                  </div>
                </div>
                
                <div className="row py-2">
                  <div className="col-sm-5 px-2">
                    Available Shifts :
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>{" "}
                    &nbsp;
                  </div>
                  <div className="col-sm-7 ">
                    <div className="form-group">
                      <select className="form-control" onChange={handleChange}>
                        <option value="">select shift</option>

                        {availableShiftData !== null &&
                          availableShiftData.map((item, i) => {
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
                <div className="note text-primary text-center py-1">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={assignShiftButton}
                    onClick={submitAssignShift}
                  >
                    Assign
                  </button>
                </div>
                <br />
                <h6
                  className="note text-danger text-center"
                  style={{ fontWeight: "700" }}
                >
                  * &nbsp;Note: Weekly off is mandatory to assign shift
                </h6>
              </Tab>
              <Tab eventKey="weekoff" title="Assign Week Off">
                <Form className="mt-3" onSubmit={submitForm}>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Week :</div>
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
                  </div>

                  {/* <div className="row py-2">
                    <div className="col-sm-5 px-2">Select day :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setWeekDayHandler(e)}
                        >
                          <option value="">Select Day</option>

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
                  </div> */}
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
                  <div className="justify-content-center d-flex">
                    <button className="btn btn-primary" size="sm" type="submit">
                      Assign
                    </button>
                  </div>
                  <br />
                  <h6
                    className="note text-danger text-center pb-2"
                    style={{ fontWeight: "700" }}
                  >
                    *&nbsp; Note: Only same contract employees can be selected
                  </h6>
                </Form>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Container>
      </Modal>
    </Fragment>
  );
};

export default ShiftModal;
