import React, { Fragment, useState, useContext } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DatePicker from "react-datepicker";
import Dropdown from "../common/dropDown";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {RosterContext} from "../../context/RosterState";
import { add } from 'date-fns';


const CreateShift = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workingHours, setWorkingHour] = useState('');
  const [shiftName, setShiftName] = useState('');
  const [contractType, setContractType] = useState('');
  const [productTarget, setProductTarget] = useState('');
  const [breakStartTime, setStartBreakTime] = useState(null);
  const [breakEndTime, setEndBreakTIme] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);
  const [breakDuationMsg, setBreakDurationMsg] = useState(false);
  const [shiftButton, setShiftButton] = useState(false);
  const { addShift} = useContext(RosterContext);

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
    const result = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss")
    var workingHours = result.replace(/:/g, ".");
    setWorkingHour(workingHours);
  }
  const calcBreaktime = () => {
    const stime = moment(breakStartTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(breakEndTime, ["h:mm A"]).format("HH:mm");
    const breakHours = moment.utc(moment(etime, "HH:mm").diff(moment(stime, "HH:mm"))).format("HH:mm")
    console.log(breakHours + typeof (breakHours));
    var res = breakHours.replace(/:/g, ".");
    if (parseFloat(res) <= 1) {
      setBreakDurationMsg(false)
      setShiftButton(false)
    }
    else {
      setBreakDurationMsg(true)
      setShiftButton(true)
    }
  }

  const handleShiftDropdown = (shiftName) => {
    setShiftName(shiftName)
  };
  const handleContractDropdown = (contractType) => {
    setContractType(contractType)
  };

  const onSubmit = e => {
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
      breakEndTime: moment(breakEndTime, ["h:mm A"]).format("HH:mm:ss"),
      status:0
    }
    setSuccessMsg(true);
     // console.log("======" + JSON.stringify(newShift));
    addShift(newShift);
    // const result = addShift(newShift)
    // console.log(result);
  }

  return (
    <Fragment>
      <Breadcrumb title="Create Shift" parent="create Shift" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Select Shift</label>
                        <Dropdown
                          data={[
                            { value: 'Morning' },
                            { value: 'Afternoon' },
                            { value: 'Night' },
                          ]}
                          value={shiftName}
                          placeholder='Select Shift'
                          onChange={handleShiftDropdown}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
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
                    <div className="col-sm-3">
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
                          timeFormat="HH:mm aa"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"
                          placeholderText="Select end time"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      {parseFloat(workingHours) > 5 ?
                        <div>
                          <div className="row">
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">From Time</label>
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
                                  dateFormat="h:mm aa"
                                  placeholderText="Select start time"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">End Time</label>
                                <br />
                                <DatePicker
                                  selected={breakEndTime}
                                  className="form-control"
                                  required
                                  onChange={date => setEndBreakTIme(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  onCalendarClose={() => { calcBreaktime() }}
                                  minTime={startTime}
                                  maxTime={endTime}
                                  dateFormat="h:mm aa"
                                  placeholderText="Select end time"
                                />
                              </div>
                            </div>
                          </div>
                        </div> :
                        null
                      }
                    </div>
                    <h6>{breakDuationMsg && <div className="text-danger pl-3">Break Should be one hour</div>}</h6>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Target</label>
                        {/* min="1" max="5" */}
                        <input type="number" className="form-control digit" required value={productTarget} onChange={(e) => setProductTarget(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Select Contract Type</label>
                        <Dropdown
                          data={[
                            { value: 'Permanent' },
                            { value: 'Temperory' },
                            { value: 'Contract' },
                          ]}
                          value={contractType}
                          placeholder='Select Contract Type'
                          onChange={handleContractDropdown}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary mb-2 mr-2" type="submit" disabled={shiftButton} value="Submit">Save</button>
                  <button className="btn btn-primary mb-2 ml-2" value="reset" onClick={setClear}>Clear</button>
                </form>
                <h5>{successMsg && <div className="text-success">Shift Create successfully</div>}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateShift;