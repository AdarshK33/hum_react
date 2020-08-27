import React, { useEffect, Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Breadcrumb from "../common/breadcrumb";
import CreateClusterModal from "./createClusterModal";
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import { Delete, Edit2 } from 'react-feather'

function ViewCluster() {

  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)







  return (
    <Fragment>
      <Breadcrumb title="View Cluster" parent="View Cluster" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>


              <div className="title_bar">
                <Button className="btn btn-light mr-2" onClick={handleShow}>create</Button>
               
              </div>
              <CreateClusterModal handleClose={handleClose} modal={modal} />
              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>No</th>
                      <th scope="col">Shift Name</th>
                      <th scope="col">Shift Timeings</th>
                      <th scope="col">Break Time</th>
                      <th scope="col">Working Hours</th>
                      <th scope="col">Product Target</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  {/* {shiftList.length > 0 &&
                    shiftList.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{e.shiftName}</td>
                            <td>{moment(e.startTime, ["h:mm A"]).format("HH:mm")}-{moment(e.endTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{e.workingHours}</td>
                            <td>{e.productTarget}</td>
                            <td>{moment(e.breakStartTime, ["h:mm A"]).format("HH:mm")}-{moment(e.breakEndTime, ["h:mm A"]).format("HH:mm")}</td>
                            <td>{e.contractType}</td>
                            <td>{e.status === 0 ? "active" : "inactive"} </td>
                            <td>  <Link to={{ pathname: `EditShift/${e.shiftMasterId}`, data: { id: e.shiftMasterId } }}><Edit2 onClick={() => editShift(e.shiftMasterId)} /></Link></td>
                          </tr>

                        </tbody>
                      );
                    })} */}
                </table>
              </div>

            </div>
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default ViewCluster

