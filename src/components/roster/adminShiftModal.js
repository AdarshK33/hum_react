import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Container, Button, Modal, Tabs, Tab } from 'react-bootstrap'
import Select from 'react-select';
import { RosterContext } from "../../context/RosterState";
import './roster.css'
import moment from 'moment'



const AdminShiftModal = (props) => {
  //console.log(props)
  const [key, setKey] = useState('shift')
  const shiftDateWeek = moment(props.shiftDate, 'YYYY-MM-DD').isoWeek() + 1
  const [selectedWeeks, setSelectedWeeks] = useState()
  const [weekDay, setWeekDay] = useState()
  const [value, setValue] = useState()
  const [adminShiftList, setAdminShiftList] = useState([])
  const [firstName, setFirstName] = useState('')
  const [showDay, setShowDay] = useState(false)
  const [weekDayList, setWeekDayList] = useState([])
  const [dayList, setDayList] = useState([])
  const [employee, setEmployee] = useState([])
  const [days, setDays] = useState([])
  const [contractType, setContractType] = useState([])

  const { weekDays, weekOffDays, addWeekOff, availableShifts, availableShiftData, adminRosterAvailableShiftList, adminRosterAvailableShift,
    assignShift, getallWeeks, weeksInYear, getEmployeeListForAdminRosterWeekOff, EmployeeListForAdminRosterWeekOff, adminAddWeekOff } = useContext(RosterContext)



  console.log(availableShiftData, "data")
  console.log(weeksInYear, "weeks")

  useEffect(() => {
    setFirstName(props.firstName)
  }, [props.firstName])

  useEffect(() => {
    setContractType(props.contractType)
  }, [props.contractType])

  useEffect(() => {
    getEmployeeListForAdminRosterWeekOff(props.contractType)
    availableShifts()
    getallWeeks()
    adminRosterAvailableShift()
  }, [])


  useEffect(() => {
    // console.log('shiftDateWeek', shiftDateWeek)
    console.log('props.shiftDate', props.shiftDate)
    weekOffDays(shiftDateWeek)
  }, [selectedWeeks])





  useEffect(() => {

    let { shiftDate } = props
    const weeks = weeksInYear.map(arr => {
      return {
        ...arr,
        selected: arr.weekId === shiftDateWeek
      }
    })
    const days = weekDays.map(arr => {
      return {
        ...arr,
        selected: arr.date === shiftDate
      }
    })
    setWeekDayList(weeks)
    setDayList(days)
    setWeekDay(shiftDate)
    //  console.log(weeks, 'Shift year');
    //  console.log(days, 'Shift day');
  }, [props.shiftDate, weekDays])


  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('Submit form', e.target.value);
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
  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)


  }
  const handleWeeksChange = (e) => {
    let newValue = e.target.value
    console.log("newValue", newValue)
    setSelectedWeeks(newValue)
    setShowDay(true)
  }

  const handleEmployeeList = (options) => {
    setEmployee(options)
  }


  const handleDayList = (options) => {
    setDays(options)
  }



  const setWeekDayHandler = (e) => {
    let newDay = e.target.value
    setWeekDay(newDay)
    console.log("new Day", newDay)
  }

  const setShiftAdminList = (e) => {
    let data1 = e.target.value
    setAdminShiftList(data1)
    console.log("data1", data1)
  }





  // const submitAssignShift = (event) => {
  //   event.preventDefault()
  //   const assindata =
  //   {
  //     "date": props.shiftDate,
  //     "employeeId": "DSI000035",
  //     "shiftId": value
  //   }
  //   console.log(assindata)
  //   assignShift(assindata)
  //   props.handleClose()
  //   console.log("Submit")

  // }



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
                <form onSubmit={onSubmit}>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Available Shifts :</div>
                    {/* Name :<h1>{firstName}{contractType}</h1> */}
                    <div className="col-sm-7 ">
                      <div className="form-group">

{/* slect shifi list  */}
                        {/* <select
                          className="form-control"
                          style={{ fontSize: "0.8rem" }}
                          required
                          onChange={setShiftAdminList}>
                          <option value="">Select Cost Center</option>
                          {adminRosterAvailableShiftList.map((item, i) => {
                            return (
                              <option>
                                {item.startTime}
                              </option>

                            );
                          })}
                        </select> */}





                      </div>
                    </div>
                  </div>
                  {/* SELECT EMPLOYEE */}
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Employees :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          placeholder="Filters"
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
                    <div className="col-sm-5 px-2">Select Week :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control" value={selectedWeeks} onChange={handleWeeksChange}>
                          <option value="" >select Week</option>
                          {weekDayList.map((item, i) => {
                            return (
                              <option key={item.weekId} selected={item.selected} value={item.weekId}>{item.weekName + " - " + item.year}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Day :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          placeholder="Filters"
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
                    <button type="button" className="btn btn-square btn-primary btn-cm pl-5 pr-5"
                    // onClick={submitAssignShift}
                    >Assign</button>
                  </div>
                </form>

                <br />
                <h6 className="note text-secondary text-center">Note: Weekly off is mandatory to assign shift</h6>
              </Tab>
              <Tab eventKey="weekoff" title="Assign Week Off">
                <form onSubmit={onSubmit}>
                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Employees :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <Select
                          name="filters"
                          placeholder="Filters"
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
                    <div className="col-sm-5 px-2">Select Week :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control" value={selectedWeeks} onChange={handleWeeksChange}>
                          <option value="" >select Week</option>
                          {weekDayList.map((item, i) => {
                            return (
                              <option key={item.weekId} selected={item.selected} value={item.weekId}>{item.weekName + " - " + item.year}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Day :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control" onChange={(e) => setWeekDayHandler(e)}>
                          <option value="" >select shift</option>
                          {dayList.map((item, i) => {
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
                    <button className="btn btn-primary mb-2 mr-2" type="submit" value="Submit">Assign</button>
                    {/* <Button className="btn-primary btn-cm pl-5 pr-5" size="sm" type="submit">
                    Assign</Button> */}
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
