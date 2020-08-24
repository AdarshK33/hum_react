import React, { Fragment, useState,useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DatePicker from "react-datepicker";
import Dropdown from "../common/dropDown";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {RosterContext} from "../../context/RosterState";


const EditShift = (props) => {
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
  const [shiftMasterId, setShiftMasterId] = useState(null);
  const { updateShift,shiftResult,shiftList} = useContext(RosterContext);

  useEffect(() => {
    console.log(props);
    const { id } = props.location.data;
    setShiftMasterId(id);
  }, [])

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
    const newEditShift = {
      startTime: moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
      endTime: moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
      shiftName,
      contractType,
      shiftMasterId,
      productTarget: parseInt(productTarget),
      workingHours: parseInt(workingHours),
      breakStartTime: moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
      breakEndTime: moment(breakEndTime, ["h:mm A"]).format("HH:mm:ss"),
      status:0
    }
    setSuccessMsg(true);
       const result = updateShift(newEditShift)
      .then((result) => {     
        console.log("api response===",result.data.message);
        console.log("api response===",result.data);
        console.log("api response===",result.data.status);
        setSuccessMsg(result.data.message);
   })
     .catch((error) => {
       alert(" In error catch ",error);
     })
      
   
  }
  // console.log(shiftList, "in editshit screen");
  // console.log("edit shift screen "+JSON.stringify(shiftList));
  // console.log(shiftList.shiftName);
  return (
    <Fragment>
      <Breadcrumb title="Edit Shift" parent="edit Shift" />
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
                        
                          placeholder={shiftList.shiftName}
                         
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
                          placeholderText={shiftList.startTime}
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
                          placeholderText={shiftList.endTime}
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
                                  placeholderText={shiftList.breakStartTime}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">End Break Time</label>
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
                                  dateFormat="HH:mm aa"
                                  placeholderText="Select end time"
                                />
                              
                              {/* <input type="number" className="form-control" placeholder={moment(shiftList.breakStartTime).add(1,'hours').format('HH:mm A')} />    */}
                              
                            
                              </div>
                            </div>
                          </div>
                        </div> :
                        null
                      }
                    </div>
                    <h6>{breakDuationMsg && <div className="text-danger pl-3">Break Should be one hour</div>}</h6>
                  </div>
                    <h1>{shiftResult}</h1>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Target</label>
                        {/* min="1" max="5" */}
                        <input type="number" className="form-control digit"    placeholder={shiftList.productTarget}   onChange={(e) => setProductTarget(e.target.value)} />
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
                          placeholder={shiftList.contractType}
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

export default EditShift;