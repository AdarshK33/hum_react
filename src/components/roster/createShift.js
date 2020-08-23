import React, { Fragment, useState,useContext } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DatePicker from "react-datepicker";
import Dropdown from "../common/dropDown";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {RosterContext} from "../../context/RosterState";


const CreateShift = () => {
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
  const { addShift,shiftResult} = useContext(RosterContext);

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
    alert(workingHours);
    setWorkingHour(workingHours);
  }
  const calcBreaktime = () => {
     const stime = moment(breakStartTime).add(1,'hours').format('HH:mm');
    // alert(stime);
    // const etime = moment(breakEndTime, ["h:mm A"]).format("HH:mm");
    // const breakHours = moment.utc(moment(etime, "HH:mm").diff(moment(stime, "HH:mm"))).format("HH:mm")
    // console.log(breakHours + typeof (breakHours));
    // var res = breakHours.replace(/:/g, ".");
    // if (parseFloat(res) <= 1) {
    //   setBreakDurationMsg(false)
    //   setShiftButton(false)
    // }
    // else {
    //   setBreakDurationMsg(true)
    //   setShiftButton(true)
    // }
    
  }

  const handleShiftDropdown = (shiftName) => {
    setShiftName(shiftName)
  };
  const handleContractDropdown = (contractType) => {
    setContractType(contractType)
  };

  const onSubmit = e => {
    // const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    // const etime = moment(endTime, ["h:mm A"]).format("HH:mm");
    // const workingHours = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss");
    // alert(workingHours);
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
      breakEndTime: moment(breakStartTime).add(1,'hours').format('HH:mm:ss'),
      status:0
    }
    setSuccessMsg(true);
       const result = addShift(newShift)
      .then((result) => {     
        console.log("api response===",result.data.message);
        console.log("api response===",result.data);
        console.log("api response===",result.data.status);
        console.log("api response===",result.data.length);
        setSuccessMsg(result.data.message);
   })
     .catch((error) => {
       alert(" In error catch ",error);
     })
      console.log(result, "in competent");
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
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"
                          placeholderText="Select end time"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                      <div className="col-sm-3">
                      Total working Hours:
                      </div>
                      <div className="col-sm-3">
                        Break Hour:
                      </div>
                    </div> */}
                  <div className="row">
                    <div className="col-sm-12">
                      {parseFloat(workingHours) > 5 ?
                        <div>
                          <div className="row">
                            <div className="col-sm-3">
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
                                  placeholderText="Select start time"
                                 
                                  required
                                />
                              </div>
                            </div>
                           <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">End Break Time</label>
                                <br />
 

                                 <input type="text" className="form-control"  placeholder={moment(breakStartTime).add(1,'hours').format('HH:mm A')} /> 
                                {/* <DatePicker
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
                                  minTime={setStartBreakTime}
                                  maxTime={setStartBreakTime+1}
                                  dateFormat="HH:mm aa"
                                  placeholderText="Select end time"
                                /> */}
                                
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
                        <h5>{successMsg.length!==0 && <div className="text-success">{successMsg}</div>}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateShift;