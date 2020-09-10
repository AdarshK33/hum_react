import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { RosterContext } from "../../context/RosterState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShiftModal from "./shiftModal";
import DateFromEnd from "./dateFromEnd";
import moment from 'moment'

const Roster = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [modal, setModal] = useState(false)
  const [shiftDate, setshiftDate] = useState(false)
  const handleClose = () => setModal(false)
  const handleShow = (item) => {
    console.log(item, "ite")
    setshiftDate(item)
    setModal(true)
  }

  const { weekOffDataEmp, weekOffDataList } = useContext(RosterContext)

  let newStartDate = moment(startDate).format("YYYY-MM-DD");
  let newEndDate = moment(endDate).format("YYYY-MM-DD")

  useEffect(() => {
    weekOffDataEmp(newStartDate, newEndDate)
  }, [])
  console.log(weekOffDataList, "dasuua")

  const submitDate = (e) => {
    e.preventDefault();
    weekOffDataEmp(newEndDate, newStartDate)
    console.log("weekOff Data", newStartDate)
  }
  const checkCondition = (item) => {
    console.log(item, "che")
    if (item.roster == null) {
      return <button className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={() => handleShow(item)}>+</button>
    } else if (item.roster.holiday != "" && item.roster.holiday != null) {
      return <button className="btn btn-square btn-warning btn-sm" type="button">{item.roster.holiday}</button>
    } else if (item.roster.leave != "" && item.roster.leave != null) {
      return <button className="btn btn-square btn-danger btn-sm" type="button">Leave</button>
    } else if (item.roster.weekOff) {
      return <button className="btn btn-square btn-info btn-sm" type="button">Week Off</button>
    } else if (item.roster.shiftName != "" && item.roster.shiftName != null) {
      return <button className="btn btn-square btn-danger btn-sm" type="button">{item.roster.shiftName}</button>
    } else {
      return <button className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={() => handleShow(item)}>+</button>
    }
  }
  return (
    <Fragment>
      <Breadcrumb title="Roster" parent="Roster page" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card h-100" >
              <div className="card-header">
                {/* <DateFromEnd sendDate={sendDate}/> */}
                <form className="form-inline">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group mb-2">
                        <label className="name f-w-600">From Date &nbsp;</label>
                        <DatePicker
                          className="form-control"
                          selected={startDate}
                          required
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 pl-3">
                      <div className="form-group mb-2">
                        <label className="name f-w-600">To Date&nbsp; </label>
                        <DatePicker
                          className="form-control"
                          selected={endDate}
                          required
                          onChange={(date) => setEndDate(date)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <button className="myclass" style={{marginTop:"20px"}}type="button" onClick={(e) => submitDate(e)}>Submit</button>
                    </div>
                  </div>




                </form>

              </div>
              <div>
                <table className="table">

                  <thead >
                    <tr>

                      <th scope="col"><br /> <span style={{ color: 'deepskyblue' }}>Mon</span></th>
                      <th scope="col"><br /><span style={{ color: 'deepskyblue' }}> Tue</span></th>
                      <th scope="col"><br /><span style={{ color: 'deepskyblue' }}> Wed</span></th>
                      <th scope="col"><br /> <span style={{ color: 'deepskyblue' }}>Thr</span></th>
                      <th scope="col"><br /> <span style={{ color: 'deepskyblue' }}>Fri</span></th>
                      <th scope="col"><br /> <span style={{ color: 'deepskyblue' }}>Sat</span></th>
                      <th scope="col"><br /> <span style={{ color: 'deepskyblue' }}>Sun</span></th>

                    </tr>
                  </thead>

                  <tbody>
                    {weekOffDataList.length > 0 &&
                      weekOffDataList.map((item, i) => {
                        if (i == 0) {
                          return (
                            <tr>
                              {item.employeeRosters.map((data, ind) => {
                                if (ind == 0) {
                                  let newData = new Date(data.date)
                                  console.log(newData.getDay(), "day")
                                  return (
                                    <>
                                      {Array.from(Array(newData.getDay() - 1)).map(() => <td></td>)}
                                      <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                                    </>
                                  )
                                } else {
                                  return <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                                }

                              }
                              )}
                            </tr>
                          )
                        } else {
                          return (
                            <tr>
                              {item.employeeRosters.map(data => {
                                let newData = new Date(data.date)
                                console.log(newData.getDay(), "day")
                                return <td>{item.weekName}<br />{data.date}<br />{checkCondition(data)}</td>
                              })}
                            </tr>
                          )
                        }
                      })}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
        <ShiftModal handleClose={handleClose} modal={modal} shiftDate={shiftDate.date} />
      </div>

    </Fragment>
  );
};

export default Roster;
