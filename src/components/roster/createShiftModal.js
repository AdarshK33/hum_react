import React, { Fragment, useState, useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateShiftModal = (props) => {

  useEffect(() => {
    viewShiftTypes()
    viewContractTypes()
  }, [])

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workingHours, setWorkingHour] = useState('');
  const [contractType, setContractType] = useState('');
  const [breakStartTime, setStartBreakTime] = useState(null);
  const [shiftType, setShiftType] = useState('')
  const [breakEndTime, setEndBreakTIme] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [breakDuationMsg, setBreakDurationMsg] = useState(false);
  const [shiftButton, setShiftButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [invalidText, setInvalidText] = useState(false)
  const [warnMsg, setWrnMsg] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [costCenterName, setCostCenterName] = useState('');
  const { addShift, viewShift, viewShiftTypes, viewContractTypes, shiftContractNames, costCenterList, costCenter } = useContext(RosterContext);

  const { user } = useContext(AppContext);

  useEffect(() => {
    costCenter()
  }, []);


  useEffect(() => {
    setShiftType(props.shiftType)
  }, [props.shiftType])

  useEffect(() => {
    setContractType(props.contractType)
  }, [props.contractType])

  useEffect(() => {
    setStartTime(props.startTime)
  }, [props.startTime])

  useEffect(() => {
    setEndTime(props.endTime)
  }, [props.endTime])

  const setClear = () => {
    setStartTime('')
    setEndTime('')
    setWorkingHour('')
    setShiftButton('')
    setShiftType('')
    setCostCenterName('')
    setContractType('')
    setStartBreakTime('')
    setEndBreakTIme('');
    setSuccessMsg('');
    setErrorMsg('')
    props.handleClose()
  }
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
    setInvalidText(true)
  }

  const callTimer = () => {
    const setModal = props.handleClose;
    setClear()
    setModal()
  }

  const clearAndClose = () => {
    setClear();
    props.handleClose();
  }
  const onSubmit = e => {
    const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(endTime, ["h:mm A"]).format("HH:mm");
    let storeId = costCenterName;
    const workingHours = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss");
    // alert(workingHours);
    if (user.loginType !== "1" && user.loginType !== "9" && user.additionalRole !== "1" && user.additionalRole !== "9") {
      storeId = user.costCentre;
    }
    var result = parseInt(workingHours);
    if (result <= 5) {
      e.preventDefault();
      const newShift = {
        startTime: moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
        endTime: moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
        contractType,
        shiftMasterId: 0,
        shiftType,
        workingHours: 0,
        storeId: storeId,
        breakStartTime: 0,
        breakEndTime: 0,
        status: 0
      }
      setSuccessMsg(true);
      const result = addShift(newShift)
        .then((result) => {
          console.log("api response===", result.data.message);
          toast.info(result.data.message);
          setTimeout(() => {
            callTimer();
          }, 1000);
          viewShift();
        })
        .catch((error) => {
          alert(" In error catch ", error);
        })
      // console.log(result, "in competent");
    }
    else {


      e.preventDefault();
      const newShift = {
        startTime: moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
        endTime: moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
        contractType,
        shiftMasterId: 0,
        shiftType,
        workingHours: 0,
        storeId: storeId,
        breakStartTime: moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
        breakEndTime: moment(breakStartTime).add(1, 'hours').format('HH:mm:ss'),
        status: 0
      }
      setSuccessMsg(true);
      const result = addShift(newShift)
        .then((result) => {
          toast.info(result.data.message);
          setTimeout(() => {
            callTimer();
          }, 1000);
          viewShift();
        })

        .catch((error) => {
          alert(" In error catch ", error);
        })
      // console.log(result, "in competent");
    }
  }
  return (
    <Modal show={props.modal} onHide={props.handleClose} centered>
      <Fragment>
        <Modal.Header>
          <Modal.Title>Create Shift</Modal.Title>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"
            onClick={setClear}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Start Time</label>
                        <br />
                        <DatePicker
                          className="form-control"
                          selected={startTime}
                          onChange={date => setStartTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"
                          placeholderText="Select start time"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">EndTime</label>
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
                          timeIntervals={60}
                          timeCaption="Time"
                          dateFormat="HH:mm aa"

                          placeholderText="Select end time"
                        />
                      </div>
                    </div>
                    <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px", marginLeft: "16px" }}>{errormsg}</h6>
                  </div>
                  <h6 style={{ color: "black", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}> Total working hours {workingHours}</h6>

                  <h6 style={{ color: "red", fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>{warnMsg}</h6>
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

                            {invalidText &&
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="exampleFormControlInput1"></label>
                                  <input type="text" style={{ marginTop: "7px" }} className="form-control" placeholder={moment(breakStartTime).add(1, 'hours').format('HH:mm A')} />
                                </div>
                              </div>

                            }
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

                    <h6 style={{ fontFamily: "work-Sans, sans-serif", fontSize: "14px" }}>{breakDuationMsg && <div className="text-danger pl-3">Break Should be one hour</div>}</h6>
                  </div>


                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Shift Type</label>
                        <select
                          className="form-control"
                          required

                          value={shiftType}
                          onChange={(e) => setShiftType(e.target.value)}>

                          <option value="">Select Shift Type</option>
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
                          required
                          value={contractType}

                          defaultValue={shiftContractNames.contractType}
                          onChange={(e) => setContractType(e.target.value)}>

                          <option value="">Select Contract Type</option>
                          {shiftContractNames !== null &&
                            shiftContractNames.map((e, i) => {
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

                  {(() => {
                    if (user.loginType === "1" || user.loginType === "9" || user.additionalRole === "1" || user.additionalRole === "9") {
                      return (
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">Select cost center</label>
                              <select
                                isSearchable
                                required
                                value={costCenterName}
                                className="form-control"
                                onChange={(e) => setCostCenterName(e.target.value)}
                              >
                                <option value="">Select cost center</option>
                                {costCenterList !== null &&
                                  costCenterList.map((e, i) => {
                                    return (
                                      <option key={i + 1} value={e.costCentreName}>{e.costCentreName}</option>)
                                  })}

                              </select>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })()}
                  <button className="myclass mb-2 mr-2" type="submit" disabled={shiftButton} value="Submit">Save</button>
                  <button className="myclass mb-2 ml-2" onClick={() => { clearAndClose() }}>Close</button>
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