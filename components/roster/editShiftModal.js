import React, { Fragment, useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";


const EditShiftModal = (props) => {

  useEffect(() => {
    viewShiftTypes()
    viewContractTypes()
  }, [])



  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workingHours, setWorkingHour] = useState('');
  const [contractType, setContractType] = useState('');
  const [breakStartTime, setStartBreakTime] = useState(null);
  const [breakEndTime, setEndBreakTIme] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [shiftType, setShiftType] = useState('');
  const [breakDuationMsg,] = useState(false);
  const [shiftButton, setShiftButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [invalidText, setInvalidText] = useState(false)
  const [showBreakDuration, setShowBreakDuration] = useState(true)
  // const [workingHoursText, setWorkingHoursText] = useState(false);
  const [warnMsg, setWrnMsg] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [status, setStatus] = useState(0)
  const [breakDurationErrrorMsg, setBreakDurationErrrorMsg] = useState(false);
  // const [showBreakDuration1, setshowBreakDuration1] = useState(false)
  // const [showBreakDuration2, setshowBreakDuration2] = useState(true)
  const { updateShift, viewShift, singleShiftList, viewShiftTypes, viewContractTypes, shiftContractNames } = useContext(RosterContext);
  const setClear = () => {
    setShiftType('')
    setStartTime('')
    setEndTime('')
    setWorkingHour('')
    setContractType('')
    setStartBreakTime('')
    setEndBreakTIme('');
    setSuccessMsg('');
  }


  useEffect(() => {
    setStartTime(singleShiftList.startTime)
    setEndTime(singleShiftList.endTime)
    setShiftType(singleShiftList.shiftType)
    setContractType(singleShiftList.contractType)
    setWorkingHour(singleShiftList.workingHours)
    setEndBreakTIme(singleShiftList.breakEndTime)
    setStartBreakTime(singleShiftList.breakStartTime)
    setStatus(singleShiftList.status)

    //console.log("1---->"+getSingleCluster.employeeIds);
    // console.log("2---->"+JSON.stringify(clusterLeaderNames));
  }, [props])




  const calcTime = () => {
    const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(endTime, ["h:mm A"]).format("HH:mm");

    var ctime = stime.replace(/:/g, ".");
    var dtime = etime.replace(/:/g, ".");
    //  alert(ctime+ " "+dtime);
    if (stime === etime || dtime < ctime) {
      setErrorMsg("Invalid input");
      setShiftButton(true)
    }
    else {
      setShiftButton(false)
      setErrorMsg(false)
    }

    const result = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss")
    var workingHours = result.replace(/:/g, ".");

    setWorkingHour(workingHours);
    checkTimeValidation();

    function checkTimeValidation() {

      if (parseFloat(workingHours) > 9) {
        setShiftButton(true)
        setWrnMsg("Shift should be only for 9 hours")

      }
      else {
        setWrnMsg(false)

      }
    }
    // break duation 
    setShowBreakDuration(false)
    // setshowBreakDuration1(true)
    // setshowBreakDuration2(false)

  }
  const callShowMethod = () => {
    setShowText(true);
    setInvalidText(true)

  }

  const callTimer = () => {

    const setEditModal = props.handleEditClose;
    setClear()
    setEditModal()
  }




  const calcBreakDuration = (date) => {
    let value2 = date
    // alert("hi");
    setEndBreakTIme(value2)
    if (breakEndTime < breakStartTime || breakEndTime === breakStartTime) {
      // alert(breakStartTime+ " "+breakEndTime)
      // alert("false");
      setBreakDurationErrrorMsg("Enter valid input")
      setShiftButton(true)
    }
    else {
      // alert("true")
      setShiftButton(false)
      setBreakDurationErrrorMsg(false)
    }
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
        contractType,
        shiftType,
        shiftMasterId: singleShiftList.shiftMasterId,
        workingHours: 0,
        storeId: "IN1055",
        breakStartTime: 0,
        breakEndTime: 0,
        status: status
      }
      setSuccessMsg(true);
      const result = updateShift(newShift)
        .then((result) => {
          console.log("api response===", result.data.message);

          setSuccessMsg(result.data.message);
          setTimeout(() => {
            callTimer();
          }, 3000);
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
        contractType,
        shiftType,
        shiftMasterId: singleShiftList.shiftMasterId,
        workingHours: 0,
        storeId: "IN1055",
        breakStartTime: moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
        breakEndTime:moment(breakEndTime, ["h:mm A"]).format("HH:mm:ss"),
        status: status
      }
      // alert(JSON.stringify(newShift));
      setSuccessMsg(true);
      const result = updateShift(newShift)
        .then((result) => {
          console.log("api response===", result.data.message);

          setSuccessMsg(result.data.message);

          setTimeout(() => {
            callTimer();
          }, 4000);
          viewShift();

        })

        .catch((error) => {
          alert(" In error catch ", error);
        })
      console.log(result, "in competent");
    }
  }
  //console.log("shift list names " + shiftListNames)
  // console.log("======== " + shiftContractNames)
  return (
    <Modal show={props.modal} onHide={props.handleEditClose} centered>
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Edit Shift</Modal.Title>
        </Modal.Header>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        {/* <h1>{moment(singleShiftList.startTime,["HH:mm:ss"]).format("HH:mm A")}</h1>  */}

                        <label htmlFor="exampleFormControlInput1">From Time</label>
                        <br />
                        <DatePicker
                          className="form-control"
                          // selected={startTime}

                          onChange={date => setStartTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"
                          value={moment(startTime, ["HH:mm:ss"]).format("HH:mm A")}

                          defaultValue={moment(singleShiftList.startTime, ["HH:mm:ss"]).format("HH:mm A")}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">End Time</label>

                        <DatePicker
                          // selected={endTime}
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
                          value={moment(endTime, ["HH:mm:ss"]).format("HH:mm A")}
                          defaultValue={moment(singleShiftList.endTime, ["HH:mm:ss"]).format("HH:mm A")}
                        />
                      </div>
                    </div>

                  </div>

                  <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>{errormsg}</h6>

                  <h6 style={{ color: "black", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}> Total working hours: {workingHours}&nbsp;Hrs</h6>

                  <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>{warnMsg}</h6>

                  {showBreakDuration &&
                    <div className="row">
                      <div className="col-sm-5">
                        <h6 style={{ color: "text-secondary", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>Working Hours :{singleShiftList.workingHours}&nbsp;Hrs</h6>
                      </div>
                      <div className="col-sm-7">
                        <h6 style={{ color: "text-secondary", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>Break duration :{singleShiftList.breakStartTime}-{singleShiftList.breakEndTime}</h6>
                        <br />
                      </div>

                    </div>
                  }


                  {/* {showBreakDuration1&&
                            <div className="row">
                                <div className="col-sm-12">
                      {parseFloat(workingHours) > 5 ?
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Break Duration</label>
                                <br />
                                <DatePicker
                                  className="form-control"
                                 // selected={breakStartTime}
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
                                  defaultValue={moment(singleShiftList.breakStartTime,["HH:mm:ss"]).format("HH:mm A")}
                                  value={moment(breakStartTime,["HH:mm:ss"]).format("HH:mm A")}
                              
                                />  
                              </div>
                            </div>
                   
                      
                              {invalidText && 
                              <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1"></label>
                                <input type="text" style={{marginTop:"7px"}} className="form-control"    value={moment(breakStartTime).add(1, 'hours').format('HH:mm A')} />
                              </div> 
                              
                            </div>

                            }  



                          </div>
                      
                        
                        </div> :
                        null
                      }
                    </div>
                               
                            </div>
                            } */}



                  {/* {showBreakDuration2 && */}
                    <div className="row">
                      <div className="col-sm-12">
                        {parseFloat(workingHours) > 5 ?
                          <div>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="exampleFormControlInput1">Break Duration</label>
                                  <br />
                                  <DatePicker
                                    className="form-control"
                                    // selected={breakStartTime}
                                    onChange={date => setStartBreakTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    // minTime={startTime}
                                    // maxTime={endTime}
                                    dateFormat="HH:mm aa"
                                    // onCalendarClose={() => { callShowMethod() }}
                                    defaultValue={moment(singleShiftList.breakStartTime, ["HH:mm:ss"]).format("HH:mm A")}
                                    value={moment(breakStartTime, ["HH:mm:ss"]).format("HH:mm A")}

                                  />
                                </div>
                              </div>
                              <div className="col-sm-6 mt-2">
                                <div className="form-group">

                                  <br />
                                  <DatePicker
                                    className="form-control"
                                    // selected={breakStartTime}
                                    onChange={date => calcBreakDuration(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    // minTime={startTime}
                                    // maxTime={endTime}
                                    dateFormat="HH:mm aa"
                                    value={moment(breakEndTime, ["HH:mm:ss"]).format("HH:mm A")}
                                    defaultValue={moment(singleShiftList.breakEndTime, ["HH:mm:ss"]).format("HH:mm A")}
                                  />
                                  <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>{breakDurationErrrorMsg}</h6>
                                </div>
                              </div>
                              {/* break duration msg */}
                              {/* {invalidText && 
                              <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1"></label>
                                <input type="text" style={{marginTop:"7px"}} className="form-control"  defaultValue={singleShiftList.breakEndTime}   value={moment(breakStartTime).add(1, 'hours').format('HH:mm A')} />
                              </div> 
                              
                            </div>

                            }  */}



                            </div>

                            {/* {showText &&
                            <div className="row">
                              <div className="col-sm-12">
                                Break Hour: &nbsp;&nbsp;{moment(breakStartTime, ["h:mm A"]).format("HH:mm")}--
                            {moment(breakStartTime).add(1, 'hours').format('HH:mm')}
                              </div>
                            </div>
                          } */}
                          </div> :
                          null
                        }
                      </div>

                      <h6>{breakDuationMsg && <div className="text-danger pl-3">Break Should be one hour</div>}</h6>
                    </div>
            







                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Shift Type</label>
                        <select
                          className="form-control"
                          defaultValue={singleShiftList.shiftType}
                          onChange={(e) => setShiftType(e.target.value)}
                          value={shiftType}>
                          <option>Captain</option>
                          <option>On Duty</option>
                          <option>General</option>
                        </select>
                      </div>
                    </div>
                  </div>





                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Select Contract Type</label>
                        <select
                          className="form-control"
                          defaultValue={singleShiftList.contractType}
                          onChange={(e) => setContractType(e.target.value)}
                          value={contractType}>


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


                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Shift Status</label>
                        <select
                          className="form-control"
                          value={status}
                          defaultValue={singleShiftList.status}
                          onChange={(e) => setStatus(e.target.value)}>
                          <option value="0">Active</option>
                          <option value="1">Inactive</option>

                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="myclass mb-2 mr-2" type="submit" disabled={shiftButton} value="Submit">Save</button>

                  <button className="myclass mb-2 mr-2" onClick={props.handleEditClose}>Close
                  </button>

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
export default EditShiftModal;