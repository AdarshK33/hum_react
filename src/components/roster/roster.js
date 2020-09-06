import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import {RosterContext} from "../../context/RosterState";
import { X, Edit2, Trash2 } from 'react-feather'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShiftModal from "./shiftModal";
import DateFromEnd from "./dateFromEnd";
import moment from 'moment'

const Roster = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
 
  const [modal, setModal] = useState(false)
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)

  const { weekOffDataEmp,weekOffDataList } = useContext(RosterContext)

  let newStartDate = moment(startDate).format("YYYY-MM-DD");
  let newEndDate =  moment(endDate).format("YYYY-MM-DD")

  useEffect(() => {
    weekOffDataEmp(newStartDate, newEndDate)
  },[])

  const submitDate = (e) => {
    e.preventDefault();
    weekOffDataEmp(newEndDate,newStartDate)
    console.log("weekOff Data", newStartDate)
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
                    <div className="col-sm-4 pt-4">
                    <button className="btn btn-primary mb-2" type="button" onClick={(e) => submitDate(e)}>Submit</button> 
                    </div>
                </div>
                 
                 

                 
                </form>
              
              </div>
              <div>
                <table className="table">
                {weekOffDataList.length >0 &&
                  weekOffDataList.map((item,i) => {
                    return ( 
                  <thead key={i}>
                    <tr>
                      <th scope="col">{item.weekName}<br/> <span style={{color:'deepskyblue'}}>Mon</span></th>
                      <th scope="col">{item.weekName}<br/><span style={{color:'deepskyblue'}}> Tue</span></th>
                      <th scope="col">{item.weekName}<br/><span style={{color:'deepskyblue'}}> Wed</span></th>
                      <th scope="col">{item.weekName}<br/> <span style={{color:'deepskyblue'}}>Thr</span></th>
                      <th scope="col">{item.weekName}<br/> <span style={{color:'deepskyblue'}}>Fri</span></th>
                      <th scope="col">{item.weekName}<br/> <span style={{color:'deepskyblue'}}>Sat</span></th>
                      <th scope="col">{item.weekName}<br/> <span style={{color:'deepskyblue'}}>Sun</span></th>
                    </tr>
                  </thead>
                  )
                })}

                  {weekOffDataList.length >0 &&
                  weekOffDataList.map((item,i) => {
                    return(
                      <tbody key={i}>
                        <tr>
                        <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-info btn-sm" type="button">Holiday</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">{item.rosterDate}</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-danger btn-sm" type="button">Leave</button>
                      </td>
                        </tr>
                      </tbody>
                    )
                  })}
                 
                </table>
              </div>
            </div>
          </div>
        </div>
      <ShiftModal handleClose={handleClose} modal={modal} />
      </div>
    
    </Fragment>
  );
};

export default Roster;
