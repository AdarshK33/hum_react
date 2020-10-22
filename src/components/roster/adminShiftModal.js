import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Container, Modal, Tabs, Tab } from 'react-bootstrap'
import Select from 'react-select';
import { RosterContext } from "../../context/RosterState";
import './roster.css'
import moment from 'moment'



const AdminShiftModal = (props) => {
  console.log("MY PROPS " + JSON.stringify(props));
  const [key, setKey] = useState('shift')
  const shiftDateWeek = moment(props.shiftDate, 'YYYY-MM-DD').week();
  const [selectedWeeks, setSelectedWeeks] = useState()
  const [weekDay, setWeekDay] = useState()
  const [value, setValue] = useState()
  const [firstName, setFirstName] = useState('')
  const [showDay, setShowDay] = useState(false)
  const [weekDayList, setWeekDayList] = useState([])
  const [dayList, setDayList] = useState([])
  const [employee, setEmployee] = useState([])
  const [days, setDays] = useState([])
  const [assignShiftButton, setAShiftButton] = useState(true);
  const [assignWeekOffButton, setAssignWeekOffButton] = useState(true);
  const [contractType, setContractType] = useState([])

  const { weekDays, weekOffDays, availableShifts, availableShiftData, adminRosterAvailableShiftList, adminRosterAvailableShift,
    assignAdminShift, getallWeeks, weeksInYear, getEmployeeListForAdminRosterWeekOff, EmployeeListForAdminRosterWeekOff, adminAddWeekOff } = useContext(RosterContext)



  console.log(availableShiftData, "data")
  console.log(weeksInYear, "weeks")

  useEffect(() => {
    setFirstName(props.firstName)
  }, [props.firstName])

  useEffect(() => {
    setContractType(props.contractType)
  }, [props.contractType])



  useEffect(() => {
    getEmployeeListForAdminRosterWeekOff(props.mystoreId)
    availableShifts()
    getallWeeks()
    adminRosterAvailableShift(props.contractType, props.mystoreId)
  }, [props.contractType, props.mystoreId])
  //my store id

  useEffect(() => {
    // console.log('shiftDateWeek', shiftDateWeek)
    console.log("props my store ID ", props.mystoreId)
    console.log('props.shiftDate', props.shiftDate)
    weekOffDays(shiftDateWeek + 1)
  }, [selectedWeeks])



  //  console.log("i am here"+JSON.stringify(weekDayList));

  useEffect(() => {

    let { shiftDate } = props
    const weeks = weeksInYear.map(arr => {
      let weekNumber = arr.weekName.split('Week')[1].trim();
      return {
        ...arr,
        selected: parseInt(weekNumber) === shiftDateWeek
      }
    })
    const days = weekDays.map(arr => {
      console.log({ arr }, shiftDate);
      return {
        ...arr,
        selected: arr.date === shiftDate
      }
    })
    setWeekDayList(weeks)
    setDayList(days)
    setWeekDay(shiftDate)
    // console.log(weeks, 'Shift year');
    //  console.log(days, 'Shift day');
  }, [props.shiftDate, weekDays])

  const onSubmit = (e) => {
    e.preventDefault();
    const setModal = props.handleClose
    setModal()

    const newWeekOffAdminRoster = {
      date: weekDay,
      employeeIds: employee.map((e, i) => employee[i].value)
    }


    adminAddWeekOff(newWeekOffAdminRoster)
    // console.log("newWeekOff data", newWeekOffAdminRoster)
    // history.push("/roster/roster");
    setSelectedWeeks(1)
    setWeekDay('')
    setShowDay(false)
  }

  const handleWeeksChange = (e) => {
    let newValue = e.target.value
    console.log("newValue", newValue)
    setSelectedWeeks(newValue)
    setShowDay(true)
  }

  const handleEmployeeList = (options) => {
    setEmployee(options)
    setAssignWeekOffButton(false)
  }

  const handleDayList = (options) => {
    setDays(options)
    setAShiftButton(false)
  }

  const setWeekDayHandler = (e) => {
    let newDay = e.target.value
    setWeekDay(newDay)
    console.log("new Day", newDay)
  }

  const setShiftAdminList = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)

  }



  const onSubmit1 = (event) => {
    event.preventDefault()
    const adminAssignShift =
    {
      dates: days.map((e, i) => days[i].value),
      employeeIds: employee.map((e, i) => employee[i].value),
      shiftId: parseInt(value),
      storeId: props.mystoreId
    }
    // alert(JSON.stringify(adminAssignShift));
    assignAdminShift(adminAssignShift)
    props.handleClose()

  }


  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title> Admin Roster</Modal.Title>
        </Modal.Header>
        <Container>

          <Modal.Body>
            <Tabs
              value="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey='shift' title="Assign Shift">
                <form onSubmit={onSubmit1}>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Available Shifts :<span style={{ color: 'red' }}>*</span></div>
                    {/* Name :<h1>{firstName}{contractType}</h1> */}
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select
                          className="form-control"
                          style={{ fontSize: "0.8rem" }}
                          required

                          onChange={setShiftAdminList}>
                          <option value="">Select Shift</option>
                          {adminRosterAvailableShiftList !== null && adminRosterAvailableShiftList.map((item, i) => {
                            return (
                              <option key={item.value} value={item.shiftMasterId}>{item.startTime + '-' + item.endTime + '(' + item.shiftType + ')'}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* SELECT EMPLOYEE */}
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Employees :<span style={{ color: 'red' }}>*</span></div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          required
                          name="filters"
                          placeholder="Select Employees"
                          defaultValue=""
                          value={employee}
                          style={{ fontSize: "0.8rem" }}
                          options={EmployeeListForAdminRosterWeekOff.map(e => ({ label: e.firstName + " " + e.employeeId, value: e.employeeId }))}
                          onChange={handleEmployeeList}
                          isMulti
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Week :<span style={{ color: 'red' }}>*</span></div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control"
                          required
                          value={selectedWeeks} onChange={handleWeeksChange}>
                          <option value="" >Select Week</option>

                          {weekDayList !== null && weekDayList.map((item, i) => {
                            return (
                              <option key={item.weekId} selected={item.selected} value={item.weekId}>{item.weekName + " - " + item.year}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Day :<span style={{ color: 'red' }}>*</span></div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          required
                          placeholder="Select Day"
                          defaultValue=""
                          value={days}
                          style={{ fontSize: "0.8rem" }}
                          options={dayList.map(e => ({ label: e.day, value: e.date }))}
                          onChange={handleDayList}
                          isMulti
                        />

                      </div>
                    </div>
                  </div>


                  <div className="note text-primary text-center py-1">

                    <button className="btn btn-primary mb-2 mr-2" disabled={assignShiftButton} type="submit" value="Submit">Assign</button>
                  </div>
                </form>

                <br />
                <h6 className="note text-secondary text-center">Note: Weekly off is mandatory to assign shift</h6>
              </Tab>
              <Tab eventKey="weekoff" title="Assign Week Off">
                <form onSubmit={onSubmit}>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Employees :<span style={{ color: 'red' }}>*</span></div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          placeholder="Select Employees"
                          defaultValue=""
                          value={employee}
                          style={{ fontSize: "0.8rem" }}
                          options={EmployeeListForAdminRosterWeekOff.map(e => ({ label: e.firstName + " " + e.employeeId, value: e.employeeId }))}
                          onChange={handleEmployeeList}
                          isMulti
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Week :<span style={{ color: 'red' }}>*</span></div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control" value={selectedWeeks} onChange={handleWeeksChange}>
                          <option value="" >select Week</option>
                          {weekDayList !== null && weekDayList.map((item, i) => {
                            return (
                              <option key={item.weekId} selected={item.selected} value={item.weekId}>{item.weekName + " - " + item.year}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Day :<span style={{ color: 'red' }}>*</span></div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control" onChange={(e) => setWeekDayHandler(e)}>
                          <option value="" >select shift</option>
                          {dayList !== null && dayList.map((item, i) => {
                            return (
                              <option key={item.date} selected={item.selected} value={item.date}>{item.day}{item.selected}</option>
                            )
                          })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="justify-content-center d-flex">
                    <button className="btn btn-primary mb-2 mr-2" disabled={assignWeekOffButton} type="submit" value="Submit">Assign</button>
                  </div>
                </form>
                <br />
                <h6 className="note text-secondary text-center pb-2"> Note: Only same contract employees can be selected</h6>

              </Tab>
            </Tabs>
          </Modal.Body>
        </Container>
      </Modal>

    </Fragment>
  );
};


export default AdminShiftModal
