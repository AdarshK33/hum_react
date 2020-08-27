import React, { Fragment, useState,useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DatePicker from "react-datepicker";
import Dropdown2 from "../common/dropDown2";
import moment from 'moment';
import { useHistory, Link } from "react-router-dom";
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
  const [showText, setShowText] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const { updateShift,shiftResult,shiftList,viewContractTypes,shiftListNames,viewShiftTypes,shiftContractNames} = useContext(RosterContext);

  useEffect(() => {
    console.log(props);
    const { id } = props.location.data;
    setShiftMasterId(id);
    viewShiftTypes();
    viewContractTypes();
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
  const callShowMethod=()=>{
    setShowText(true);
  }
  // const handleShiftDropdown = (shiftName) => {
  //   setShiftName(shiftName)
  // };
  // const handleContractDropdown = (contractType) => {
  //   setContractType(contractType)
  // };


  const onSubmit = e => {
    var resultwork = parseInt(workingHours);
      if(resultwork<=5)
      {
        e.preventDefault();
        const newEditShift = {
          startTime: moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
          endTime: moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
          shiftName,
          contractType,
          shiftMasterId,
          productTarget: parseInt(productTarget),
          workingHours: parseInt(workingHours),
          breakStartTime: 0,
          breakEndTime: 0,
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
      else
      {
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
          breakEndTime:  moment(breakStartTime).add(1,'hours').format('HH:mm:ss'),
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
   
      
   
  }
  // console.log(shiftList, "in editshit screen");
  // console.log("edit shift screen "+JSON.stringify(shiftList));
   console.log("--------------"+shiftList.contractType+" "+" "+shiftList.shiftName);
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
                      <label htmlFor="exampleFormControlInput1">Shift Name</label>
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setShiftName(e.target.value)} value={shiftName}
                          
                        >
                        
                          <option value="">Select Shift Type</option>
                          {shiftListNames.map((e,i) => {
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
                      <h6 style={{ color: "red", marginLeft: "20px" }}>{errormsg}</h6>
                    </div>
                  </div>
                
                      Total working Hours 9 hours
                   
                
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
                                  onCalendarClose={()=>{callShowMethod()}}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">End Break Time</label>
                                <br />
                                <input type="text" className="form-control" placeholder={moment(breakStartTime).add(1,'hours').format('HH:mm A')} />                             
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
              
                  </div>
                    <h1>{shiftResult}</h1>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Target</label>
                        {/* min="1" max="5" */}
                        <input type="number" className="form-control digit"  required  placeholder={shiftList.productTarget}   onChange={(e) => setProductTarget(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Select Contract Type</label>
                        <select
                                 className="form-control" 
                                 required     
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