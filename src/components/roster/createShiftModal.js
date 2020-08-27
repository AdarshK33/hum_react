import React, { Fragment, useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";


const CreateShiftModal = (props) => {

  useEffect(() => {
    viewShiftTypes()
    viewContractTypes()
  }, [])

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workingHours, setWorkingHour] = useState('');
  const [shiftName, setShiftName] = useState('');
  const [contractType, setContractType] = useState('');
  const [productTarget, setProductTarget] = useState('');
  const [breakStartTime, setStartBreakTime] = useState(null);
  const [breakEndTime, setEndBreakTIme] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [breakDuationMsg, setBreakDurationMsg] = useState(false);
  const [shiftButton, setShiftButton] = useState(false);
  const [showText, setShowText] = useState(false);
 // const [workingHoursText, setWorkingHoursText] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const { addShift, viewShift, shiftListNames, viewShiftTypes, viewContractTypes, shiftContractNames } = useContext(RosterContext);

  const setClear = () => {
    setStartTime('')
    setEndTime('')
    setShiftName('')
    setWorkingHour('')
    setContractType('')
    setProductTarget('')
    setStartBreakTime('')
    setEndBreakTIme('');
    setSuccessMsg('');
  }
  const calcTime = () => {
    const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(endTime, ["h:mm A"]).format("HH:mm");

    var ctime = stime.replace(/:/g, ".");
    var dtime = etime.replace(/:/g, ".");
    //  alert(ctime+ " "+dtime);
    if (stime === etime||dtime < ctime) {
      setErrorMsg("Invalid input");
      setShiftButton(true)
    }
    else 
    {
      setShiftButton(false)
      setErrorMsg(false)
    }





    const result = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss")
    var workingHours = result.replace(/:/g, ".");

    setWorkingHour(workingHours);
   
    

    // if(parseInt(workingHours) >9)
    // {
    //   setWorkingHour(true)
    //   setShiftButton(true)
    // }
    // else{
    //   setWorkingHour(false)
    //  setWorkingHoursText(false)
    //   setShiftButton(false)
    // }
  }
  const callShowMethod = () => {
    setShowText(true);
  }
  const onSubmit = e => {
    // const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    // const etime = moment(endTime, ["h:mm A"]).format("HH:mm");
    // const workingHours = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss");
    // alert(workingHours);
    var result = parseInt(workingHours);
    if (result <= 5) {
      // alert("less than 5");
      e.preventDefault();
      const newShift = {
        startTime: moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
        endTime: moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
        shiftName,
        contractType,
        shiftMasterId: 0,
        productTarget: parseInt(productTarget),
        workingHours: parseInt(workingHours),
        breakStartTime: 0,
        breakEndTime: 0,
        status: 0
      }
      setSuccessMsg(true);
      const result = addShift(newShift)
        .then((result) => {
          console.log("api response===", result.data.message);
          console.log("api response===", result.data);
          console.log("api response===", result.data.status);
          console.log("api response===", result.data.length);
          setSuccessMsg(result.data.message);
          viewShift();
        })
        .catch((error) => {
          alert(" In error catch ", error);
        })
      console.log(result, "in competent");
    }
    else {


      e.preventDefault();
      const newShift = {
        startTime: moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
        endTime: moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
        shiftName,
        contractType,
        shiftMasterId: 0,
        productTarget: parseInt(productTarget),
        workingHours: parseInt(workingHours),
        breakStartTime: moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
        breakEndTime: moment(breakStartTime).add(1, 'hours').format('HH:mm:ss'),
        status: 0
      }
      setSuccessMsg(true);
      const result = addShift(newShift)
        .then((result) => {
          console.log("api response===", result.data.message);
          console.log("api response===", result.data);
          console.log("api response===", result.data.status);
          console.log("api response===", result.data.length);
          setSuccessMsg(result.data.message);
          viewShift();
        })
        .catch((error) => {
          alert(" In error catch ", error);
        })
      console.log(result, "in competent");
    }
  }
  //console.log("shift list names " + shiftListNames)
  console.log("======== " + shiftContractNames)
  return (
    <Modal show={props.modal} onHide={props.handleClose} centered>
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Apply For Shift</Modal.Title>
        </Modal.Header>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Shift Name</label>
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setShiftName(e.target.value)} value={shiftName}
                        >
                          <option value="">Select Shift Type</option>
                          {shiftListNames.map((e, i) => {
                            return (
                              <option key={e.i} value={e}>
                                {e}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">From Time</label>
                        <br />
                        <DatePicker
                          className="form-control"
                          selected={startTime}
                          onChange={date => setStartTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"
                          placeholderText="Select start time"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">End Time</label>
                        <br />
                        <DatePicker
                          selected={endTime}
                          className="form-control"
                          required
                          onChange={date => setEndTime(date)}
                          onCalendarClose={() => { calcTime() }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"
                          placeholderText="Select end time"
                        />
                      </div>
                    </div>
                    <h6 style={{ color: "red", marginLeft: "20px" }}>{errormsg}</h6>
                  </div>
             
                        <h6> Total Working Hours 9 Hours </h6>
                       
                
                  <div className="row">
                    <div className="col-sm-12">
                      {parseFloat(workingHours) > 5 ?
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">From Break Time</label>
                                <br />
                                <DatePicker
                                  className="form-control"
                                  selected={breakStartTime}
                                  onChange={date => setStartBreakTime(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  minTime={startTime}
                                  maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => { callShowMethod() }}
                                  placeholderText="Select start time"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">End Break Time</label>
                                <br />
                                <input type="text" className="form-control" placeholder={moment(breakStartTime).add(1, 'hours').format('HH:mm A')} />
                              </div>
                            </div>
                          </div>
                          {showText &&
                            <div className="row">
                              <div className="col-sm-12">
                                Break Hour: &nbsp;&nbsp;{moment(breakStartTime, ["h:mm A"]).format("HH:mm")}--
                            {moment(breakStartTime).add(1, 'hours').format('HH:mm')}
                              </div>
                            </div>
                          }
                        </div> :
                        null
                      }
                    </div>
                     
                    <h6>{breakDuationMsg && <div className="text-danger pl-3">Break Should be one hour</div>}</h6>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Target</label>
                        {/* min="1" max="5" */}
                        <input type="number" className="form-control digit" required value={productTarget} onChange={(e) => setProductTarget(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Select Contract Type</label>
                        <select
                          className="form-control"
                          required
                          defaultValue={shiftContractNames.contractType}
                          onChange={(e) => setContractType(e.target.value)} value={contractType}>

                          <option value="">Select Contract Type</option>
                          {shiftContractNames.map((e, i) => {
                            return (
                              <option key={e.typeId} value={e.contractType}>
                                {e.contractType}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary mb-2 mr-2" type="submit" disabled={shiftButton} value="Submit">Save</button>
                  {/* <button className="btn btn-primary mb-2 ml-2" value="reset" onClick={setClear}>Clear</button> */}
                  <Button className="btn btn-primary mb-2 ml-2" onClick={props.handleClose}>Close
          </Button>
                </form>
                <h5>{successMsg.length !== 0 && <div className="text-success">{successMsg}</div>}</h5>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Modal>
  );
};
export default CreateShiftModal;