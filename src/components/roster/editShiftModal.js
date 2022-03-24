import React, { Fragment, useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { RosterContext } from "../../context/RosterState";
import { AppContext } from "../../context/AppState";
import "react-toastify/dist/ReactToastify.css";
import { PermissionContext } from "../../context/PermissionState";

const EditShiftModal = (props) => {
  useEffect(() => {
    viewShiftTypes();
    viewContractTypes();
  }, []);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [workingHours, setWorkingHour] = useState("");
  const [contractType, setContractType] = useState("");
  const [breakStartTime, setStartBreakTime] = useState(null);
  const [breakEndTime, setEndBreakTIme] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [breakDuationMsg] = useState(false);
  const [shiftButton, setShiftButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [invalidText, setInvalidText] = useState(false);
  const [showBreakDuration, setShowBreakDuration] = useState(true);
  const [errormsg, setErrorMsg] = useState(false);
  const [status, setStatus] = useState(0);
  const [costCenterName, setCostCenterName] = useState("");
  const [breakNumber, setBreakNumber] = useState();
  const [timeError, setTimeErrorMsg] = useState(false);
  const [nineHourWarnMsg, setNineHourWarnMsg] = useState(false);
  const [oneToEightWarnMsg, setOneToEightWarnMsg] = useState(false);
  const [oneToFiveWarnMsg, setOneFiveWarnMsg] = useState(false);

  const {
    updateShift,
    singleShiftList,
    viewShiftTypes,
    costCenter,
    viewContractTypes,
    shiftContractNames,
  } = useContext(RosterContext);
  const { user } = useContext(AppContext);
  const { rolePermission } = useContext(PermissionContext);
  const setClear = () => {
    setInvalidText(false);
    setShiftType("");
    setStartTime("");
    setEndTime("");
    setWorkingHour("");
    setContractType("");
    setStartBreakTime("");
    setEndBreakTIme("");
    setSuccessMsg("");
    setErrorMsg("");
    setNineHourWarnMsg("");
    setOneToEightWarnMsg("");
    setOneFiveWarnMsg("");
    setTimeErrorMsg("");
    props.handleEditClose();
  };

  useEffect(() => {
    setStartTime(singleShiftList.startTime);
    setEndTime(singleShiftList.endTime);
    setShiftType(singleShiftList.shiftType);
    setContractType(singleShiftList.contractType);
    setWorkingHour(singleShiftList.workingHours);
    setEndBreakTIme(singleShiftList.breakEndTime);
    setStartBreakTime(singleShiftList.breakStartTime);
    setStatus(singleShiftList.status);
    setCostCenterName(props.shiftData.storeId);
  }, [props]);

  useEffect(() => {
    costCenter();
    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager"
    ) {
      setCostCenterName(user.costCentre);
    }
  }, [user.costCentre, user.loginType]);

  useEffect(() => {
    if (shiftType === "NA") {
      setErrorMsg("");
      setWorkingHour(0);
      setTimeErrorMsg("");
      setShowBreakDuration(false);
      setBreakNumber(0);
      setInvalidText(false);
      setStartBreakTime("");
      setEndBreakTIme("");
      setNineHourWarnMsg("");
      setOneToEightWarnMsg("");
      setOneFiveWarnMsg("");
    }
  }, [shiftType]);

  const getContractType = (e) => {
    let data = e.target.value;
    console.log(data);
    setContractType(data);
  };
  const calcTime = () => {
    const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(endTime, ["h:mm A"]).format("HH:mm");

    var ctime = stime.replace(/:/g, ".");
    var dtime = etime.replace(/:/g, ".");
    if (ctime === 0.0 || dtime === 0.0 || shiftType === "NA") {
      setShiftButton(false);
      setErrorMsg("");
      setWorkingHour(0);
      setTimeErrorMsg("");
      setShowBreakDuration(false);
      setBreakNumber(0);
    } else {
      if ((ctime != 0.0 && dtime != 0.0 && ctime === dtime) || dtime < ctime) {
        setErrorMsg("Invalid Shift Time");
        setShiftButton(true);
      } else {
        setShiftButton(false);
        setErrorMsg(false);
      }
    }

    const result = moment
      .utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss")))
      .format("HH:mm:ss");
    var workingHours = result.replace(/:/g, ".");
    console.log("workingHours in edit", workingHours);
    setWorkingHour(workingHours);
    checkTimeValidation();

    function checkTimeValidation() {
      if (contractType === "Fulltime" || contractType === "Internship") {
        if (parseFloat(workingHours) === 10 || parseFloat(workingHours) === 0) {
          setShiftButton(false);

          setNineHourWarnMsg(true);
        } else {
          setNineHourWarnMsg(false);
          setNineHourWarnMsg("* Shift should be 9 hours only");
          setShiftButton(true);
          setOneFiveWarnMsg(true);
          setOneToEightWarnMsg(true);
        }
      } else if (contractType === "Internship (young persons)") {
        if (
          (parseFloat(workingHours) >= 1 && parseFloat(workingHours) <= 5) ||
          parseFloat(workingHours) === 0
        ) {
          setShiftButton(false);
          setOneFiveWarnMsg(true);
        } else {
          setOneFiveWarnMsg(false);
          setOneFiveWarnMsg("* Shift should be between 1 to 5 hours only");
          setShiftButton(true);
          setNineHourWarnMsg(true);
          setOneToEightWarnMsg(true);
        }
      } else if (contractType === "Parttime" || contractType === "Temporary") {
        if (
          (parseFloat(workingHours) >= 1 && parseFloat(workingHours) <= 8) ||
          parseFloat(workingHours) === 0
        ) {
          setShiftButton(false);
          setOneToEightWarnMsg(true);
        } else {
          setOneToEightWarnMsg(false);
          setOneToEightWarnMsg("* Shift should be 1 to 8 hours");
          setShiftButton(true);
          setNineHourWarnMsg(true);
          setOneFiveWarnMsg(true);
        }
      }
    }
    // break duation
    setShowBreakDuration(false);
    // setshowBreakDuration1(true)
    // setshowBreakDuration2(false)
    setBreakNumber(0);
  };
  const callShowMethod = () => {
    setShowText(true);
    setInvalidText(true);
    setBreakNumber(1);

    var endTime1 = moment(endTime, ["h:mm A"]).format("HH:mm:ss");
    var startTime1 = moment(startTime, ["h:mm A"]).format("HH:mm:ss");
    var breakStartTime1 = moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss");
    var breakEndTime1 = moment(breakStartTime)
      .add(1, "hours")
      .format("HH:mm:ss");
    if (breakEndTime1 > endTime1 || breakStartTime1 < startTime1) {
      setShiftButton(true);
      setTimeErrorMsg("* Invalid Break Time");
    } else {
      setShiftButton(false);
      setTimeErrorMsg(false);
    }
  };

  const onSubmit = (e) => {
    // const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    // const etime = moment(endTime, ["h:mm A"]).format("HH:mm");
    // const workingHours = moment.utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss"))).format("HH:mm:ss");
    // alert(workingHours);
    var result = parseInt(workingHours);

    if (result <= 5) {
      e.preventDefault();
      const newShift = {
        startTime:
          shiftType === "NA"
            ? "00:00:00"
            : moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
        endTime:
          shiftType === "NA"
            ? "00:00:00"
            : moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
        contractType,
        shiftType,
        shiftMasterId: singleShiftList.shiftMasterId,
        workingHours: 0,
        storeId: costCenterName,
        breakStartTime: 0,
        breakEndTime: 0,
        status: status,
      };
      setSuccessMsg(true);
      updateShift(newShift);
      props.handleEditClose();
      console.log(result, "in competent");
    } else {
      //==========
      if (breakNumber === 1) {
        console.log("break number 1");

        e.preventDefault();
        const newShift = {
          startTime:
            shiftType === "NA"
              ? "00:00:00"
              : moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
          endTime:
            shiftType === "NA"
              ? "00:00:00"
              : moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
          contractType,
          shiftType,
          shiftMasterId: singleShiftList.shiftMasterId,
          workingHours: 0,
          storeId: costCenterName,
          breakStartTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
          breakEndTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime).add(1, "hours").format("HH:mm:ss"),
          status: status,
        };
        // alert(JSON.stringify(newShift));
        setBreakNumber(false);
        setSuccessMsg(true);
        updateShift(newShift);
        props.handleEditClose();
        setInvalidText(false);
      } else {
        console.log("break number 2");

        e.preventDefault();
        const validate = validation();
        const newShift = {
          startTime:
            shiftType === "NA"
              ? "00:00:00"
              : moment(startTime, ["h:mm A"]).format("HH:mm:ss"),
          endTime:
            shiftType === "NA"
              ? "00:00:00"
              : moment(endTime, ["h:mm A"]).format("HH:mm:ss"),
          contractType,
          shiftType,
          shiftMasterId: singleShiftList.shiftMasterId,
          workingHours: 0,
          storeId: costCenterName,
          breakStartTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
          breakEndTime:
            shiftType === "NA"
              ? 0
              : moment(breakEndTime, ["h:mm A"]).format("HH:mm:ss"),
          status: status,
        };
        // alert(JSON.stringify(newShift));
        if (validate) {
          setSuccessMsg(true);
          updateShift(newShift);
          props.handleEditClose();
          console.log(result, "in competent");
        }
      }
    }
  };
  const validation = () => {
    console.log("hi" + breakStartTime + " " + typeof breakStartTime);
    let flag = true;
    if (breakStartTime === "0" || breakStartTime === "00:00:00") {
      toast.error("Please enter break time");
      flag = false;
      return;
    }
    return flag;
  };

  return (
    <Modal show={props.modal} onHide={props.handleEditClose} centered>
      <Fragment>
        <Modal.Header>
          <Modal.Title>Edit Shift</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={setClear}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          {" "}
                          Select Contract Type
                        </label>
                        {/* <select
                          className="form-control"
                          defaultValue={singleShiftList.contractType}
                          onChange={(e) => getContractType(e)}
                          value={contractType}>
                          {shiftContractNames.map((e, i) => {
                            return (
                              <option key={e.typeId} value={e.contractType}>
                                {e.contractType}
                              </option>
                            );
                          })}
                        </select> */}
                        <input
                          type="text"
                          placeholder={singleShiftList.contractType}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          {" "}
                          Shift Type
                        </label>
                        <select
                          className="form-control"
                          defaultValue={singleShiftList.shiftType}
                          onChange={(e) => setShiftType(e.target.value)}
                          value={shiftType}
                        >
                          <option value="NA">N/A</option>
                          <option>Captain</option>
                          <option>On Duty</option>
                          <option>General</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        {/* <h1>{moment(singleShiftList.startTime,["HH:mm:ss"]).format("HH:mm A")}</h1>  */}
                        <label htmlFor="exampleFormControlInput1">
                          From Time
                        </label>
                        <br />
                        {shiftType === "NA" ? (
                          <input
                            type="text"
                            onChange={(e) => setEndTime(e.target.value)}
                            value="00:00"
                            disabled
                            className="form-control"
                          />
                        ) : (
                          <DatePicker
                            className="form-control"
                            // selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            onCalendarClose={() => {
                              calcTime();
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            value={moment(startTime, ["HH:mm:ss"]).format(
                              "HH:mm "
                            )}
                            defaultValue={moment(singleShiftList.startTime, [
                              "HH:mm:ss",
                            ]).format("HH:mm ")}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          End Time
                        </label>
                        <br />
                        {shiftType === "NA" ? (
                          <input
                            type="text"
                            onChange={(e) => setEndTime(e.target.value)}
                            value="00:00"
                            disabled
                            className="form-control"
                          />
                        ) : (
                          <DatePicker
                            // selected={endTime}
                            className="form-control"
                            required
                            onChange={(date) => setEndTime(date)}
                            onCalendarClose={() => {
                              calcTime();
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            value={moment(endTime, ["HH:mm:ss"]).format(
                              "HH:mm "
                            )}
                            defaultValue={moment(singleShiftList.endTime, [
                              "HH:mm:ss",
                            ]).format("HH:mm ")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <h6
                    style={{
                      color: "black",
                      fontFamily: "work-Sans, sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    Total no. of working hours {workingHours}
                  </h6>
                  <h6
                    style={{
                      color: "red",
                      fontFamily: "work-Sans, sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {nineHourWarnMsg}
                  </h6>
                  <h6
                    style={{
                      color: "red",
                      fontFamily: "work-Sans, sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {oneToFiveWarnMsg}
                  </h6>
                  <h6
                    style={{
                      color: "red",
                      fontFamily: "work-Sans, sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {errormsg}
                  </h6>
                  <h6
                    style={{
                      color: "red",
                      fontFamily: "work-Sans, sans-serif",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    {oneToEightWarnMsg}
                  </h6>

                  {showBreakDuration && (
                    <div className="row">
                      <div className="col-sm-5 py-2">
                        <h6
                          style={{
                            color: "text-secondary",
                            fontFamily: "work-Sans, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Working Hours :{singleShiftList.workingHours}&nbsp;Hrs
                        </h6>
                      </div>
                      <div className="col-sm-7 py-2">
                        <h6
                          style={{
                            color: "text-secondary",
                            fontFamily: "work-Sans, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Break duration :{singleShiftList.breakStartTime}-
                          {singleShiftList.breakEndTime}
                        </h6>
                        <br />
                      </div>
                    </div>
                  )}

                  {(() => {
                    if (
                      parseFloat(workingHours) > 5 &&
                      nineHourWarnMsg === true &&
                      (contractType === "Fulltime" ||
                        contractType === "Internship")
                    ) {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                  Break Duration
                                </label>
                                <br />
                                <DatePicker
                                  className="form-control"
                                  // selected={breakStartTime}
                                  onChange={(date) => setStartBreakTime(date)}
                                  showTimeSelect
                                  required
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  // minTime={startTime}
                                  // maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => {
                                    callShowMethod();
                                  }}
                                  defaultValue={moment(
                                    singleShiftList.breakStartTime,
                                    ["HH:mm:ss"]
                                  ).format("HH:mm A")}
                                  value={moment(breakStartTime, [
                                    "HH:mm:ss",
                                  ]).format("HH:mm A")}
                                />
                              </div>
                            </div>
                            {invalidText && (
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="exampleFormControlInput1"></label>
                                  <input
                                    type="text"
                                    style={{ marginTop: "7px" }}
                                    className="form-control"
                                    placeholder="Enter break end time"
                                    defaultValue={singleShiftList.breakEndTime}
                                    value={moment(breakStartTime)
                                      .add(1, "hours")
                                      .format("HH:mm A")}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <h6
                            style={{
                              color: "red",
                              fontFamily: "work-Sans, sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            {timeError}
                          </h6>
                        </div>
                      );
                    } else if (
                      parseFloat(workingHours) > 5 &&
                      oneToEightWarnMsg === true &&
                      (contractType === "Parttime" ||
                        contractType === "Temporary")
                    ) {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                  Break Duration
                                </label>
                                <br />
                                <DatePicker
                                  className="form-control"
                                  // selected={breakStartTime}
                                  onChange={(date) => setStartBreakTime(date)}
                                  showTimeSelect
                                  required
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  // minTime={startTime}
                                  // maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => {
                                    callShowMethod();
                                  }}
                                  defaultValue={moment(
                                    singleShiftList.breakStartTime,
                                    ["HH:mm:ss"]
                                  ).format("HH:mm A")}
                                  value={moment(breakStartTime, [
                                    "HH:mm:ss",
                                  ]).format("HH:mm A")}
                                />
                              </div>
                            </div>

                            {invalidText && (
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="exampleFormControlInput1"></label>
                                  <input
                                    type="text"
                                    style={{ marginTop: "7px" }}
                                    className="form-control"
                                    placeholder={moment(breakStartTime)
                                      .add(1, "hours")
                                      .format("HH:mm A")}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <h6
                            style={{
                              color: "red",
                              fontFamily: "work-Sans, sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            {timeError}
                          </h6>
                        </div>
                      );
                    } else if (
                      parseFloat(workingHours) > 5 &&
                      oneToFiveWarnMsg === true &&
                      contractType === "Internship (young persons)"
                    ) {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                  Break Duration
                                </label>
                                <br />
                                <DatePicker
                                  className="form-control"
                                  // selected={breakStartTime}
                                  onChange={(date) => setStartBreakTime(date)}
                                  showTimeSelect
                                  required
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  // minTime={startTime}
                                  // maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => {
                                    callShowMethod();
                                  }}
                                  defaultValue={moment(
                                    singleShiftList.breakStartTime,
                                    ["HH:mm:ss"]
                                  ).format("HH:mm A")}
                                  value={moment(breakStartTime, [
                                    "HH:mm:ss",
                                  ]).format("HH:mm A")}
                                />
                              </div>
                            </div>

                            {invalidText && (
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="exampleFormControlInput1"></label>
                                  <input
                                    type="text"
                                    style={{ marginTop: "7px" }}
                                    className="form-control"
                                    placeholder={moment(breakStartTime)
                                      .add(1, "hours")
                                      .format("HH:mm A")}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <h6
                            style={{
                              color: "red",
                              fontFamily: "work-Sans, sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            {timeError}
                          </h6>
                        </div>
                      );
                    }
                  })()}

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Cost Center
                        </label>
                        <input
                          type="text"
                          placeholder={singleShiftList.storeId}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  {/*  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Shift Type</label>
                        <select
                          className="form-control"
                          defaultValue={singleShiftList.shiftType}
                          onChange={(e) => setShiftType(e.target.value)}
                          value={shiftType}>
                          <option value='NA'>N/A</option>
                          <option>Captain</option>
                          <option>On Duty</option>
                          <option>General</option>
                        </select>
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          {" "}
                          Shift Status
                        </label>
                        <select
                          className="form-control"
                          value={status}
                          defaultValue={singleShiftList.status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="0">Active</option>
                          <option value="1">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    className="myclass mb-2 mr-2"
                    type="submit"
                    disabled={shiftButton}
                    value="Submit"
                  >
                    Save
                  </button>
                </form>
                <h5>
                  {successMsg.length !== 0 && (
                    <div className="text-success">{successMsg}</div>
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Modal>
  );
};
export default EditShiftModal;
