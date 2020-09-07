import React, { useEffect, Fragment, useContext, useState } from 'react'
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Breadcrumb from "../common/breadcrumb";
import "./roster.css";
import CreateShiftModal from "./createShiftModal";
import EditShiftModal from "./editShiftModal";
import { Button} from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import {Edit2} from 'react-feather'

function ViewShift() {
  useEffect(() => {
    viewShift()
  }, [])
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)

  const [editModal, setEditModal] = useState(false)
  const handleEditClose = () => setEditModal(false)
  const handleEditShow = () => setEditModal(true)

  // variables
 const { shiftList,editShift, viewShift, } = useContext(RosterContext);
  //console.log(shiftList, "in viewShift");
  return (
    <Fragment>
      <Breadcrumb title="View Shift" parent="View Shift" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
                <Button className="btn btn-light mr-2" onClick={handleShow}>Create</Button>
                <ReactHTMLTableToExcel
                  className="btn btn-light mr-2"
                  table="table-to-xls"
                  filename="viewshift"
                  sheet="Sheet"
                  buttonText="Export excel" />
              </div>
              <CreateShiftModal handleClose={handleClose} modal={modal} />
              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>No</th>
                      <th scope="col">Shift Timings</th>
                      <th scope="col">Break Time</th>
                      <th scope="col">Working Hours</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Shift Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  {shiftList.length > 0 &&
                    shiftList.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                            <td> {moment(e.startTime, ["h:mm A"]).format("HH:mm")}-{moment(e.endTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{moment(e.breakStartTime, ["h:mm A"]).format("HH:mm")}-{moment(e.breakEndTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{e.workingHours}</td>
                            <td>{e.contractType}</td>
                            <td>{e.shiftType}</td>                        
                            <td>{e.status === 0 ? "Active" : "Inactive"} </td>
                            <td><Edit2 onClick={() => {
                                                setEditModal(true);
                                                editShift(e.shiftMasterId);
                                        }} />
                                            </td>             
                         
                            {/* <td>  <Link to={{ pathname: `EditShift/${e.shiftMasterId}`, data: { id: e.shiftMasterId } }}><Edit2 onClick={() => editShift(e.shiftMasterId)} /></Link></td> */}
                          </tr>

                        </tbody>
                      );
                    })}
                </table>
                <EditShiftModal handleEditClose={handleEditClose} 

                modal={editModal} /> 
              </div>

            </div>
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default ViewShift

