import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import {Modal,ModalHeader} from 'reactstrap';
import {Button } from 'react-bootstrap'
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
  const handleShow = () => setModal(true)





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
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Employee</th>
                      <th scope="col">Mon 12</th>
                      <th scope="col">Tue 13</th>
                      <th scope="col">Wed 14</th>
                      <th scope="col">Thur 15</th>
                      <th scope="col">Fri 16</th>
                    </tr>
                  </thead>
                  <tbody>
                  <Fragment>
                <tr>
                      <td>
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
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-danger btn-sm pl-5 pr-5" type="button">Leave</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                      <button  className="btn btn-square btn-primary btn-sm pl-5 pr-5" onClick={handleShow}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-warning btn-sm" type="button">08:00 Am - 05:00 Pm</button>
                      </td>
                      <td>
                        <button className="btn btn-square btn-danger btn-sm pl-5 pr-5" type="button">Leave</button>
                      </td>
                    </tr>
                   </Fragment>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal}>
        <ModalHeader  style={{borderBottom:"0px solid #e9ecef",paddingTop:"10px"}} toggle={toggle}>Modal title</ModalHeader>
       <ShiftModal/>
       </Modal>
      
      </div>
    </Fragment>
  );
};

export default Roster;
