import React, { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import {RosterContext} from "../../context/RosterState";
import { X, Edit2, Trash2 } from 'react-feather'
import ShiftModal from "./shiftModal";
import DateFromEnd from "./dateFromEnd";

const Roster = () => {
  const sendDate = (sdate, edate) => {
    alert(sdate + " " + edate);
  }
  const toggle = () => {
    setModal(!modal)
  }
  const [modal, setModal] = useState(false)
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)

  const { weekOffDataEmp,weekOffDataList } = useContext(RosterContext)

  useEffect(() => {
    weekOffDataEmp()
  },[])

  return (
    <Fragment>
      <Breadcrumb title="Roster" parent="Roster page" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="card-header">
              <DateFromEnd sendDate={sendDate}/>
              
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                     {/*  <th scope="col">Employee</th> */}
                      <th scope="col">Week 37 <br/> <span style={{color:'deepskyblue'}}>31st Aug</span></th>
                      <th scope="col">Week 37 <br/><span style={{color:'deepskyblue'}}> 1st Sept</span></th>
                      <th scope="col">Week 37 <br/><span style={{color:'deepskyblue'}}> 2nd Sept</span></th>
                      <th scope="col">Week 37 <br/> <span style={{color:'deepskyblue'}}>3rd Sept</span></th>
                      <th scope="col">Week 37 <br/> <span style={{color:'deepskyblue'}}>4th Sept</span></th>
                    </tr>
                  </thead>
                  <tbody>
                  <Fragment>
                <tr>
                     {/*  <td>
                        <div className="row">
                          <div className="box" style={{ display: "flex", flexDirection: "row", width: "250px" }}>
                            <i
                              className="box fa fa-user-circle fa-4x m-r-10 m-l-10 py-1" aria-hidden="true"></i>
                            <div className="box name f-w-600">Pavithra Anand
                              <br />
                              <span className="text-danger d-block">DSI000174{" "}
                                <span className="text-primary">Permanent</span>
                              </span>
                              <p>Legal Partner Coach</p>
                            </div>
                          </div>
                        </div>
                      </td> */}
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">Week Off</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                    </tr>
                   
                   </Fragment>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
       {/*  <Modal isOpen={modal}>
        <ModalHeader  style={{borderBottom:"0px solid #e9ecef",paddingTop:"10px"}} toggle={toggle}>Modal title</ModalHeader>
       <ShiftModal/>
       </Modal> */}
      <ShiftModal handleClose={handleClose} modal={modal} />
      </div>
     {/*  <Row>
        <Table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Roster Id</th>
              <th>Employee Id</th>
              <th>Roster Date</th>
              <th>Shift Name</th>
              <th>WeekOff</th>
              <th></th>
            </tr>
          </thead>
          {weekOffDataList.length>0 &&
          weekOffDataList.map((item,i) => {
            return(
              <tbody key={i}>
                <tr>
                  <td>{i+1}</td>
                  <td>{item.rosterId}</td>
                  <td>{item.employeeId}</td>
                  <td>{item.rosterDate}</td>
                  <td>{item.shiftName}</td>
                  <td>{item.weekOff}</td>
                  <td><Edit2 /></td>
                </tr>
              </tbody>
            )
          })}
        </Table>
      </Row>
     */}
    </Fragment>
  );
};

export default Roster;
