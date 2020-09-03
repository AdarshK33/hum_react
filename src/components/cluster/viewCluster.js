import React, { useEffect, Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Breadcrumb from "../common/breadcrumb";
import CreateClusterModal from "./createClusterModal";
import EditClusterModal from "./editClusterModal";
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { RosterContext } from "../../context/RosterState";
import { Delete, Edit2 } from 'react-feather'
import { ClusterContext } from "../../context/ClusterState";

function ViewCluster() {

  useEffect(() => {
    viewCluster()
  }, [])

  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false)
  const handleShow = () => setModal(true)

  const [editModal, setEditModal] = useState(false)
  const handleEditClose = () => setEditModal(false)
  const handleEditShow = () => setEditModal(true)


  //variable
  const { clusterList,viewCluster,getCluster} = useContext(ClusterContext);


//console.log("&&&&&&"+clusterList);



  return (
    <Fragment>
      <Breadcrumb title="View Cluster" parent="View Cluster" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>


              <div className="title_bar">
                <Button className="btn btn-light mr-2" onClick={handleShow}>create</Button>
                {/* <Button className="btn btn-light mr-2" onClick={handleEditShow}>edit</Button> */}
               
              </div>
              <CreateClusterModal handleClose={handleClose} modal={modal} />
              <div className="table-responsive">
                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>No</th>
                      <th scope="col">Sports Id</th>
                      <th scope="col">Cluster Name</th>
                      <th scope="col">Cluster Details</th>
                      <th scope="col">Cluster Leader</th>
                      <th scope="col">Product Target</th>
                      <th scope="col">Team Count</th>
                      <th scope="col">Create Date</th>                    
                      <th scope="col">Status</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  {clusterList.length > 0 &&
                    clusterList.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1}</td>
                           <td>{e.sportName}</td>
                            <td>{e.clusterName}</td>
                            <td>{e.description}</td>
                            <td>{e.clusterLeaderName}</td>
                            <td>{e.productTarget}</td>
                            <td>{e.teamCount}</td>
                            <td>{e.createdDate}</td>
                            <td>{e.status === 0 ? "active" : "inactive"} </td>
                            <td><Edit2 onClick={() => {
                                                setEditModal(true);
                                           
                                                getCluster(e.clusterId);
                                               
                                            }} />
                                            </td>
                           
                          </tr>

                        </tbody>
                      );
                    })}
           
                </table>
                <EditClusterModal handleEditClose={handleEditClose}
                
               
                modal={editModal}
              /> 
              </div>

            </div>
          </div>
        </div>


      </div>
    </Fragment>

  )
}

export default ViewCluster
