import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { RosterContext } from "../../context/RosterState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShiftModal from "./shiftModal";
import { AppContext } from "../../context/AppState";
import moment from "moment";
import "./roster.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Roster = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add("30", "d"));
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState();
  const [shiftDate, setshiftDate] = useState(false);
  const [weekName, setweekName] = useState(false);
  const { weekOffDataEmp, weekOffDataList, availableShifts } =
    useContext(RosterContext);
  const { user } = useContext(AppContext);
  const handleClose = () => setModal(false);
  const handleShow = (item, weekId, weekName) => {
    // if(moment(item.date).format("YYYY-MM-DD")<moment().format("YYYY-MM-DD")){
    //   toast.error("Please select future date");
    // }else{

    setDate(item);
    setweekName(weekName);
    setshiftDate(weekId);
    setModal(true);
    availableShifts(weekName,moment(item.date).format("YYYY"));
    
    // }
  };

  useEffect(() => {
    console.log(user.employeeId, weekOffDataList, "weekOffDataList");
    weekOffDataEmp(
      endDate.format("YYYY-MM-DD"),
      startDate.format("YYYY-MM-DD"),
      user.employeeId
    );
  }, [user.employeeId]);
  //use effect

  const submitDate = (e) => {
    e.preventDefault();
    weekOffDataEmp(
      endDate.format("YYYY-MM-DD"),
      startDate.format("YYYY-MM-DD"),
      user.employeeId
    );
    console.log("weekOff Data", startDate);
  };
  const checkCondition = (item, weekId, weekName) => {
    //console.log(item, "che")
    if (item.roster == null) {
      return (
        <button
          className="btn btn-square bg-secondary btn-sm pl-5 pr-5"
          onClick={() => handleShow(item, weekId, weekName)}
        >
          +
        </button>
      );
    } else if (item.roster.leave !== "" && item.roster.leave !== null) {
      return (
        <button
          className="btn btn-square btn-danger btn-sm"
          onClick={() => handleShow(item, weekId, weekName)}
          type="button"
        >
          Leave
        </button>
      );
    } else if (item.roster.holiday !== "" && item.roster.holiday !== null) {
      return (
        <button
          className="btn btn-square btn-warning btn-sm"
          onClick={() => handleShow(item, weekId, weekName)}
        >
          {item.roster.holiday}
        </button>
      );
    } else if (item.roster.weekOff) {
      return (
        <button
          className="btn btn-square btn-info btn-sm"
          onClick={() => handleShow(item, weekId, weekName)}
          type="button"
        >
          Week Off
        </button>
      );
    } else if (item.roster.shiftName !== "" && item.roster.shiftName !== null) {
      return (
        <button
          className="btn btn-square btn-success  btn-sm"
          type="button"
          onClick={() => handleShow(item, weekId, weekName)}
        >
          {item.roster.shiftName}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-square bg-secondary btn-sm pl-5 pr-5"
          onClick={() => handleShow(item, weekId, weekName)}
        >
          +
        </button>
      );
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Roster" parent="Roster page" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card h-100">
              <div className="card-header">
                {/* <DateFromEnd sendDate={sendDate}/> */}
                <form className="form-inline">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group mb-2">
                        <label className="name f-w-600">From Date &nbsp;</label>
                        <DatePicker
                          className="form-control"
                          selected={startDate.toDate()}
                          dateFormat="yyyy-MM-dd"
                          required
                          onChange={(date) =>
                            setStartDate(moment(date, "YYYY-MM-DD"))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 pl-3">
                      <div className="form-group mb-2">
                        <label className="name f-w-600">To Date&nbsp; </label>
                        <DatePicker
                          className="form-control"
                          selected={endDate.toDate()}
                          dateFormat="yyyy-MM-dd"
                          required
                          onChange={(date) =>
                            setEndDate(moment(date, "YYYY-MM-DD"))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <button
                        className="myclass"
                        style={{ marginTop: "20px" }}
                        type="button"
                        onClick={(e) => submitDate(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="table-responsive">
                <table className="table" id="table-to-xls">
                  <thead style={{ background: "#006EBB", color: "white" }}>
                    <tr>
                      <th scope="col">
                        <br /> Sunday
                      </th>
                      <th scope="col">
                        <br />
                        Monday
                      </th>
                      <th scope="col">
                        <br /> Tuesday
                      </th>
                      <th scope="col">
                        <br /> Wednesday
                      </th>
                      <th scope="col">
                        <br /> Thursday
                      </th>
                      <th scope="col">
                        <br /> Friday
                      </th>
                      <th scope="col">
                        <br /> Saturday
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {weekOffDataList !== null &&
                      weekOffDataList.length > 0 &&
                      weekOffDataList.map((item, i) => {
                        if (i === 0) {
                          return (
                            <tr>
                              {item.employeeRosters.map((data, ind) => {
                                if (ind === 0) {
                                  let newData = new Date(data.date);
                                  // console.log(newData.getDay(), "day")
                                  if (newData.getDay() === 0) {
                                    return (
                                      <>
                                        {/* {Array.from(Array(newData.getDay() - 1)).map(() => <td></td>)} */}
                                        <td>
                                          {item.weekName}
                                          <br />
                                          {data.date}
                                          <br />
                                          {checkCondition(
                                            data,
                                            item.weekId,
                                            item.weekName
                                          )}
                                        </td>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        {Array.from(
                                          Array(newData.getDay())
                                        ).map(() => (
                                          <td></td>
                                        ))}
                                        <td>
                                          {item.weekName}
                                          <br />
                                          {data.date}
                                          <br />
                                          {checkCondition(
                                            data,
                                            item.weekId,
                                            item.weekName
                                          )}
                                        </td>
                                      </>
                                    );
                                  }
                                } else {
                                  return (
                                    <td>
                                      {item.weekName}
                                      <br />
                                      {data.date}
                                      <br />
                                      {checkCondition(
                                        data,
                                        item.weekId,
                                        item.weekName
                                      )}
                                    </td>
                                  );
                                }
                              })}
                            </tr>
                          );
                        } else {
                          return (
                            <tr>
                              {item.employeeRosters.map((data) => {
                                // let newData = new Date(data.date)
                                //console.log(newData.getDay(), "day")
                                return (
                                  <td>
                                    {item.weekName}
                                    <br />
                                    {data.date}
                                    <br />
                                    {checkCondition(
                                      data,
                                      item.weekId,
                                      item.weekName
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
                {weekOffDataList === null ? (
                  <p style={{ textAlign: "center" }}>No Record Found</p>
                ) : null}

                {weekOffDataList !== undefined &&
                weekOffDataList !== null &&
                weekOffDataList.length === 0 ? (
                  <div
                    className="loader-box loader"
                    style={{ width: "100% !important" }}
                  >
                    <div className="loader">
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {modal && (
          <ShiftModal
            handleClose={handleClose}
            modal={modal}
            shiftDate={shiftDate}
            Date={date.date}
            empData={weekOffDataList}
            weekName={weekName}
            endDate={endDate}
            startDate={startDate}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Roster;
