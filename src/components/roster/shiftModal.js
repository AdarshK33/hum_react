import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Modal, Tabs, Tab } from 'react-bootstrap'
import Select from 'react-select';
import {RosterContext} from "../../context/RosterState";
import './roster.css'
import { useHistory } from "react-router-dom";

const weeksOption = [
  {value: 1, label: 'Week1'}, {value: 2, label: 'Week2'}, {value: 3, label: 'Week3'}, {value: 4, label: 'Week4'}, {value: 5, label: 'Week5'}, {value: 6, label: 'Week6'}, {value: 7, label: 'Week7'},{value: 8, label: 'Week8'},
  {value: 9, label: 'Week9'}, {value: 10, label: 'Week10'}, {value: 11, label: 'Week11'},{value: 12, label: 'Week12'}, {value: 13, label: 'Week13'}, {value: 14, label: 'Week14'}, {value: 15, label: 'Week15'}, {value: 16, label: 'Week16'},
  {value: 17, label: 'Week17'}, {value: 18, label: 'Week18'}, {value: 19, label: 'Week19'}, {value: 20, label: 'Week20'}, {value: 21, label: 'Week21'}, {value: 22, label: 'Week22'}, {value: 23, label: 'Week23'}, {value: 24, label: 'Week24'},
  {value: 25, label: 'Week25'}, {value: 26, label: 'Week26'}, {value: 27, label: 'Week27'}, {value: 28, label: 'Week28'}, {value: 29, label: 'Week29'}, {value: 30, label: 'Week30'}, {value: 31, label: 'Week31'}, {value: 32, label: 'Week32'},
  {value: 33, label: 'Week33'}, {value: 34, label: 'Week34'}, {value: 35, label: 'Week35'}, {value: 36, label: 'Week36'}, {value: 37, label: 'Week37'}, {value: 38, label: 'Week38'}, {value: 39, label: 'Week39'}, {value: 40, label: 'Week40'},
  {value: 41, label: 'Week41'}, {value: 42, label: 'Week42'}, {value: 43, label: 'Week43'}, {value: 44, label: 'Week44'}, {value: 45, label: 'Week45'}, {value: 46, label: 'Week46'}, {value: 47, label: 'Week47'}, {value: 48, label: 'Week48'},
  {value: 49, label: 'Week49'}, {value: 50, label: 'Week50'}, {value: 51, label: 'Week51'}, {value: 52, label: 'Week52'} 
]

const ShiftModal = (props) => {

  const [key, setKey] = useState('shift')
 
  const [selectedWeeks, setSelectedWeeks] = useState(1)
  const [weekDay, setWeekDay] = useState()
  let history = useHistory();

  const {weekDays, weekOffDays, addWeekOff} = useContext(RosterContext)
  

  useEffect(() => {
    weekOffDays(parseInt(selectedWeeks))
  },[selectedWeeks])

  const submitForm = (e) => {
        e.preventDefault();
        setSelectedWeeks(1)
        setWeekDay('')
        const setModal = props.handleClose
        setModal()

        const newWeekOff = {
          dates: [weekDay],
          employeeId: 'DSI000035'
        }

        addWeekOff(newWeekOff)
        console.log("newWeekOff data", newWeekOff)
        history.push("/roster/roster");
  }
  
const handleWeeksChange = (e) => {
/*   setSelectedWeeks(Array.isArray(e) ? e.map(x => x.value) : []) */
let newValue  = e.target.value
console.log("newValue", newValue)
setSelectedWeeks(newValue) 
}
console.log("selected value",selectedWeeks )

const setWeekDayHandler = (e) => {
  let newDay = e.target.value
  setWeekDay(newDay)
  console.log("new Day", newDay)
}
  return (
    <Fragment>
      <Modal show={props.modal} onHide={props.handleClose} centered>
        <Container>
         
          <Modal.Body>
            <Tabs
              value="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey='shift' title="Assign Shift">
              <div className="row py-2 pt-4">
                  <div className="col-sm-6 px-2 font-weight-bold">Pavithra Anand - DSC100023</div>
                  <div className="col-sm-6 px-4 text-danger font-weight-bold">Legal Partner Coach</div>
                </div>
                <div className="row py-2">
                  <div className="col-sm-5 px-2 font-weight-bold">Available Shifts :</div>
                  <div className="col-sm-7 ">
                    <div className="form-group">
                      <select className="form-control" value="exampleFormControlSelect1">
                        <option>8:00 AM- 5:00 PM(Genral Shifts )</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="note text-primary text-center">
                 <button type="button" className="btn btn-square btn-primary btn-cm pl-5 pr-5">Assign</button>
              </div>
              <h6 className="note text-secondary text-center">Note: Weekly off is mandatory to assign shift</h6> 
              </Tab>
              <Tab eventKey="weekoff" title="Assign Week Off">
                <Form className="mt-3" onSubmit={submitForm}>
               
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="padding-right">Select Week</Form.Label>
                    <Col sm="8" className="padding-left">
                   {/*  <Select
                      name='weeks'
                      pplaceholder='Select Weeks'
                      value={weeksOption.filter(obj => selectedWeeks.includes(obj.value))}
                      options={weeksOption}
                      onChange={handleWeeksChange}
                      isMulti
                      isClearable
                     />
                     <div><b>Selected Value: </b> {JSON.stringify(selectedWeeks, null, 2)}</div> */}
                     <Form.Control as='select' size="sm" value={selectedWeeks} className="darkBackground"
                     onChange={(e) => handleWeeksChange(e)}  >
                     {weeksOption.map((item,i) => {
                       return(
                         <option key={item.value} value={item.value}>{item.label}</option>
                       )
                     })}
                     </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="padding-right">Select Day:</Form.Label>
                    <Col sm="8" className="padding-left">
                      <Form.Control as="select" size="sm" value={weekDay} className="darkBackground"
                      onChange={(e) => setWeekDayHandler(e)}>
                             {weekDays.length > 0 && weekDays.map((item, i) => {
                                            return (
                                                <option key={item.date} value={item.date}>{item.day}</option>
                                            )
                                        })
                                        }

                        </Form.Control>
                    </Col>
                  </Form.Group>
                  <Button variant="secondary" className="assign-button" size="sm" block type="submit">
                    Assign</Button>
                  <Form.Text muted>
                    Note: Only same contract employees can be selected
                  </Form.Text>
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
