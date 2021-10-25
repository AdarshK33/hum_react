import React, { Fragment, useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import { RosterContext } from "../../context/RosterState";
import Select from "react-select";
import { AppContext } from "../../context/AppState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermissionContext } from "../../context/PermissionState";

const CreateShiftModal = (props) => {
  useEffect(() => {
    viewShiftTypes();
    viewContractTypes();
  }, []);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [workingHours, setWorkingHour] = useState("");
  const [contractType, setContractType] = useState("");
  const [breakStartTime, setStartBreakTime] = useState(null);
  const [shiftType, setShiftType] = useState("");
  const [breakEndTime, setEndBreakTIme] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const [shiftButton, setShiftButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [invalidText, setInvalidText] = useState(false);
  const [warnMsg, setWrnMsg] = useState(false);
  const [timeError, setTimeErrorMsg] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [nineHourWarnMsg, setNineHourWarnMsg] = useState(false);
  const [oneToFiveWarnMsg, setOneFiveWarnMsg] = useState(false);
  const [oneToEightWarnMsg, setOneToEightWarnMsg] = useState(false);
  const [costCenterName, setCostCenterName] = useState("");
  const [costCenterRequireMsg, setCostCenterRequireMsg] = useState(false);
  const {
    addShift,
    viewShiftTypes,
    viewContractTypes,
    shiftContractNames,
    costCenterList,
    costCenter,
  } = useContext(RosterContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);

  useEffect(() => {
    costCenter();
  }, []);

  const setClear = () => {
    setStartTime("");
    setEndTime("");
    setWorkingHour("");
    setShiftButton("");
    setShiftType("");
    setCostCenterName("");
    setContractType("");
    setStartBreakTime("");
    setEndBreakTIme("");
    setSuccessMsg("");
    setErrorMsg("");
    setNineHourWarnMsg("");
    setTimeErrorMsg("");
    setOneFiveWarnMsg("");
    setOneToEightWarnMsg("");
    props.handleClose();
  };
  const calcTime = () => {
    const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(endTime, ["h:mm A"]).format("HH:mm");

    var ctime = stime.replace(/:/g, ".");
    var dtime = etime.replace(/:/g, ".");
    //alert(ctime+ " "+dtime);
    if (ctime === 0.0 || dtime === 0.0) {
      /* setWorkingHour('00.00'); */
      setShiftButton(false);
      setErrorMsg("");
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
    console.log("workingHours", workingHours);
    setWorkingHour(workingHours);
    checkTimeValidation();
    setInvalidText(false);
    setShowText(false);
    function checkTimeValidation() {
      if (contractType === "Fulltime" || contractType === "Internship") {
        if (parseFloat(workingHours) === 9 || parseFloat(workingHours) === 0) {
          setShiftButton(false);
          setNineHourWarnMsg(true);
        } else {
          setNineHourWarnMsg(false);
          setNineHourWarnMsg("* Shift should be 9 hours only");
          setShiftButton(true);
          setOneFiveWarnMsg(true);
          setOneToEightWarnMsg(true);
        }
      } else if (
        ctime != 0.0 &&
        dtime != 0.0 &&
        contractType === "Internship (young persons)"
      ) {
        if (
          (parseFloat(workingHours) >= 1 && parseFloat(workingHours) <= 5) ||
          parseFloat(workingHours) === 0
        ) {
          setShiftButton(false);
          setOneFiveWarnMsg(true);
        } else {
          setOneFiveWarnMsg(false);
          setOneFiveWarnMsg("* Shift should be 1 to 5 hours");
          setShiftButton(true);
          setOneToEightWarnMsg(true);
          setNineHourWarnMsg(true);
        }
      } else if (
        (ctime != 0.0 && dtime != 0.0 && contractType === "Parttime") ||
        contractType === "Temporary"
      ) {
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
  };
  const callShowMethod = () => {
    setShowText(true);
    setInvalidText(true);
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

  const setShiftTypeHandler = (e) => {
    setShiftType(e.target.value);
    console.log("shift type value", e.target.value);
  };

  const callTimer = () => {
    const setModal = props.handleClose;
    setClear();
    setModal();
  };

  const handleCostCenter = (options) => {
    let data = options !== null ? options.value : "";
    setCostCenterName(data);
  };

  const getContractType = (e) => {
    let data = e.target.value;
    console.log(data);
    setContractType(data);
    setStartBreakTime("");
    setEndBreakTIme("");
    setWorkingHour("");
    setStartTime("");
    setEndTime("");
    setErrorMsg("");
    setNineHourWarnMsg("");
    setOneFiveWarnMsg("");
    setOneToEightWarnMsg("");
    setShiftType("");
  };

  const clearAndClose = () => {
    setClear();
    props.handleClose();
  };

  const onSubmit = (e) => {
    const stime = moment(startTime, ["h:mm A"]).format("HH:mm");
    const etime = moment(endTime, ["h:mm A"]).format("HH:mm");
    let storeId = costCenterName;
    const workingHours = moment
      .utc(moment(etime, "HH:mm:ss").diff(moment(stime, "HH:mm:ss")))
      .format("HH:mm:ss");
    // alert(workingHours);
    if (
      rolePermission !== "admin" &&
      rolePermission !== "superCostCenterManager"
    ) {
      storeId = user.costCentre;
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
          shiftMasterId: 0,
          shiftType,
          workingHours: 0,
          storeId: storeId,
          breakStartTime: 0,
          breakEndTime: 0,
          status: 0,
        };
        console.log("new shift data", newShift);
        addShift(newShift);
        setClear();
      } else {
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
          shiftMasterId: 0,
          shiftType,
          workingHours: 0,
          storeId: storeId,
          breakStartTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
          breakEndTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime).add(1, "hours").format("HH:mm:ss"),
          status: 0,
        };
        console.log("new shift data else", newShift);
        addShift(newShift);
        setClear();
      }
    } else {
      // validate the cost center required condition
      var result = parseInt(workingHours);
      if (result <= 5) {
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
          shiftMasterId: 0,
          shiftType,
          workingHours: 0,
          storeId: storeId,
          breakStartTime: 0,
          breakEndTime: 0,
          status: 0,
        };
        if (validate) {
          addShift(newShift);
          setClear();
        }
      } else {
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
          shiftMasterId: 0,
          shiftType,
          workingHours: 0,
          storeId: storeId,
          breakStartTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime, ["h:mm A"]).format("HH:mm:ss"),
          breakEndTime:
            shiftType === "NA"
              ? 0
              : moment(breakStartTime).add(1, "hours").format("HH:mm:ss"),
          status: 0,
        };

        if (validate) {
          addShift(newShift);
          setClear();
        }
      }
    }
  };

  const validation = () => {
    let flag = true;
    if (costCenterName === "") {
      toast.error("Cost center is required");
      flag = false;
      return;
    }
    return flag;
  };
  return (
    <Modal show={props.modal} onHide={props.handleClose} centered>
      <Fragment>
        <Modal.Header>
          <Modal.Title>Create Shift</Modal.Title>
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

                        <select
                          className="form-control"
                          required
                          value={contractType}
                          defaultValue={shiftContractNames.contractType}
                          onChange={(e) => getContractType(e)}
                        >
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
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          {" "}
                          Shift Type
                        </label>
                        <select
                          className="form-control"
                          required
                          value={shiftType}
                          onChange={setShiftTypeHandler}
                        >
                          <option value="">Select Shift Type</option>
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
                        <label htmlFor="exampleFormControlInput1">
                          Start Time
                        </label>
                        <br />
                        {shiftType === "NA" ? (
                          <input
                            type="text"
                            onChange={(e) => setStartTime(e.target.value)}
                            value="00:00"
                            disabled
                            className="form-control"
                          />
                        ) : (
                          <DatePicker
                            className="form-control"
                            selected={startTime}
                            onChange={(date) => {
                              setStartTime(date);
                              console.log("date", date);
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            // onCalendarClose={endTime === null ? () => { call() } : () => { calcTime() }}
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm "
                            placeholderText="Select start time"
                            required
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
                            selected={endTime}
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
                            dateFormat="HH:mm "
                            placeholderText="Select end time"
                          />
                        )}
                      </div>
                    </div>
                    <h6
                      style={{
                        color: "red",
                        fontFamily: "work-Sans, sans-serif",
                        fontSize: "14px",
                        marginLeft: "16px",
                      }}
                    >
                      {errormsg}
                    </h6>
                  </div>
                  <h6
                    style={{
                      color: "black",
                      fontFamily: "work-Sans, sans-serif",
                      fontSize: "14px",
                      display: "overhidden",
                    }}
                  >
                    Total no. of working hours{" "}
                    {workingHours
                      .substring(0, workingHours.length - 3)
                      .replace(".", ":")}
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
                    {oneToEightWarnMsg}
                  </h6>
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
                                  selected={breakStartTime}
                                  onChange={(date) => setStartBreakTime(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  minTime={startTime}
                                  maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => {
                                    callShowMethod();
                                  }}
                                  placeholderText="Select start time"
                                  required
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
                          {showText && (
                            <div className="row">
                              <div className="col-sm-12 py-1">
                                Break Hour: &nbsp;&nbsp;
                                {moment(breakStartTime, ["h:mm A"]).format(
                                  "HH:mm"
                                )}
                                --
                                {moment(breakStartTime)
                                  .add(1, "hours")
                                  .format("HH:mm")}
                              </div>
                            </div>
                          )}
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
                                  selected={breakStartTime}
                                  onChange={(date) => setStartBreakTime(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  minTime={startTime}
                                  maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => {
                                    callShowMethod();
                                  }}
                                  placeholderText="Select start time"
                                  required
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
                          {showText && (
                            <div className="row">
                              <div className="col-sm-12 py-1">
                                Break Hour: &nbsp;&nbsp;
                                {moment(breakStartTime, ["h:mm A"]).format(
                                  "HH:mm"
                                )}
                                --
                                {moment(breakStartTime)
                                  .add(1, "hours")
                                  .format("HH:mm")}
                              </div>
                            </div>
                          )}
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
                                  selected={breakStartTime}
                                  onChange={(date) => setStartBreakTime(date)}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="Time"
                                  minTime={startTime}
                                  maxTime={endTime}
                                  dateFormat="HH:mm aa"
                                  onCalendarClose={() => {
                                    callShowMethod();
                                  }}
                                  placeholderText="Select start time"
                                  required
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
                          {showText && (
                            <div className="row">
                              <div className="col-sm-12 py-1">
                                Break Hour: &nbsp;&nbsp;
                                {moment(breakStartTime, ["h:mm A"]).format(
                                  "HH:mm"
                                )}
                                --
                                {moment(breakStartTime)
                                  .add(1, "hours")
                                  .format("HH:mm")}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })()}

                  <br />
                  {/*  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"> Shift Type</label>
                        <select
                          className="form-control"
                          required

                          value={shiftType}
                          onChange={setShiftTypeHandler}>

                          <option value="">Select Shift Type</option>
                          <option value='NA'>N/A</option>
                          <option>Captain</option>
                          <option>On Duty</option>
                          <option>General</option>
                        </select>
                      </div>
                    </div>
                  </div> */}

                  {(() => {
                    if (
                      rolePermission == "admin" ||
                      rolePermission == "superCostCenterManager"
                    ) {
                      return (
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">
                                Select cost center
                              </label>
                              <Select
                                name="filters"
                                placeholder="Cost Center"
                                style={{ fontSize: "0.9rem", height: "0px" }}
                                options={
                                  costCenterList !== null &&
                                  costCenterList !== undefined
                                    ? costCenterList.map((e) => ({
                                        label: e.costCentreName,
                                        value: e.costCentreName,
                                      }))
                                    : []
                                }
                                onChange={handleCostCenter}
                                required
                                isSearchable
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })()}

                  <button
                    className="myclass mb-2 ml-2"
                    type="submit"
                    disabled={shiftButton}
                    value="Submit"
                  >
                    Save
                  </button>
                  <button
                    className="myclass mb-2 ml-2"
                    onClick={() => {
                      clearAndClose();
                    }}
                  >
                    Close
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
export default CreateShiftModal;
