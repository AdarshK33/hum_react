import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Container, Button, Form, Modal, Tabs, Tab, } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import './roster.css'
import moment from 'moment'



const ShiftModal = (props) => {
  // console.log(props)
  const [key, setKey] = useState('shift')

  const shiftDateWeek = moment(props.shiftDate, 'YYYY-MM-DD').week();
  const [selectedWeeks, setSelectedWeeks] = useState()
  const [weekDay, setWeekDay] = useState()
  const [value, setValue] = useState()
  const [showDay, setShowDay] = useState(false)
  const [weekDayList, setWeekDayList] = useState([])
  const [dayList, setDayList] = useState([])


  const { weekDays, weekOffDays, addWeekOff, availableShifts, availableShiftData, assignShift, getallWeeks, weeksInYear } = useContext(RosterContext)
  const { user } = useContext(AppContext);
  //console.log(availableShiftData, "data")
  //console.log(weeksInYear, "weeks")
  useEffect(() => {
    availableShifts()
    getallWeeks()

  }, [])
  useEffect(() => {
    console.log('shiftDateWeek', shiftDateWeek)
    weekOffDays(shiftDateWeek + 1)
  }, [selectedWeeks])

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

  const submitForm = (e) => {
    e.preventDefault();
    // console.log('Submit form', e.target.value);
    const setModal = props.handleClose
    setModal()

    const newWeekOff = {
      date: weekDay,
      employeeId: user.employeeId,
    }

    addWeekOff(newWeekOff)
    //  console.log("newWeekOff data", newWeekOff)
    // history.push("/roster/roster");
    setSelectedWeeks(1)
    setWeekDay('')
    setShowDay(false)
  }
  const handleChange = (event) => {
    // console.log(event.target.value)
    setValue(event.target.value)


  }
  const handleWeeksChange = (e) => {
    /*   setSelectedWeeks(Array.isArray(e) ? e.map(x => x.value) : []) */
    let newValue = e.target.value
    console.log("newValue", newValue)
    setSelectedWeeks(newValue)
    setShowDay(true)


  }
  const submitAssignShift = (event) => {
    event.preventDefault()
    const assindata =
    {
      "date": props.shiftDate,
      "employeeId": user.employeeId,
      "shiftId": value
    }
    // console.log(assindata)
    assignShift(assindata)
    props.handleClose()
    // console.log("Submit")

  }

  const setWeekDayHandler = (e) => {
    let newDay = e.target.value
    setWeekDay(newDay)
    //  console.log("new Day", newDay)
  }

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
              <Tab eventKey='shift' title="Assign Shift">
                <div className="row py-2 pt-4">
                  <div className="col-sm-6 px-2">Employee Name:</div>
                  <div className="col-sm-6 px-2">{user.firstName} - {user.employeeId}</div>
                </div>
                <div className="row py-2">
                  <div className="col-sm-5 px-2">Available Shifts :</div>
                  <div className="col-sm-7 ">
                    <div className="form-group">
                      <select className="form-control" onChange={handleChange}>
                        <option value="" >select shift</option>
                        {
                          availableShiftData.length !== null &&
                          <>{availableShiftData.map((item, i) => {
                            return (
                              <option key={item.value} value={item.shiftMasterId}>{item.startTime + '-' + item.endTime + '(' + item.shiftType + ')'}</option>
                            )
                          })}</>
                        }



                      </select>
                    </div>
                  </div>
                </div>
                <div className="note text-primary text-center py-1">
                  <button type="button" className="btn btn-square btn-primary btn-cm pl-5 pr-5"
                    onClick={submitAssignShift}
                  >Assign</button>
                </div>
                <br />
                <h6 className="note text-secondary text-center">Note: Weekly off is mandatory to assign shift</h6>
              </Tab>
              <Tab eventKey="weekoff" title="Assign Week Off">
                <Form className="mt-3" onSubmit={submitForm}>

                  <div className="row py-2">
                    <div className="col-sm-5 px-2">Select Week :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control"
                          required
                          value={selectedWeeks} onChange={(e) => handleWeeksChange(e)}>
                          <option value="" >Select Week</option>

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
                    <div className="col-sm-5 px-2">Select day :</div>
                    <div className="col-sm-7 ">
                      <div className="form-group">
                        <select className="form-control"
                          required
                          value={selectedWeeks} onChange={(e) => setWeekDayHandler(e)}>
                          <option value="" >Select Week</option>

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
                    <Button className="btn-primary btn-cm pl-5 pr-5" size="sm" type="submit">
                      Assign</Button>
                  </div>
                  <br />
                  <h6 className="note text-secondary text-center pb-2"> Note: Only same contract employees can be selected</h6>
                </Form>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Container>
      </Modal>

    </Fragment>
  );
};


export default ShiftModal
