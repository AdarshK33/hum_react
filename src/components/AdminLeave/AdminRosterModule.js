import React, { useEffect, Fragment, useContext, useState } from 'react';
import Breadcrumb from "../common/breadcrumb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import {PendingRosterContext} from "../../context/PendingRosterState";

function AdminRosterModule() {

    const [deleteModal, setDeleteModal] = useState(false);
    const [checked, setChecked] = useState([]);

    const {pendingRosterList, viewPendingRosterList, rosterApproval} = useContext(PendingRosterContext);

    useEffect(() => {
        viewPendingRosterList()
    }, [])
 
    const handleDeleteClose = () => setDeleteModal(false);

    const approveRoster = () => {
        const approveData = {
          rosterIds: checked,
          status: 1,
        };
        console.log("=======approval data=====");
        console.log(approveData)
        rosterApproval(approveData);
        setChecked([])      
      }

      const rejectRoster = () => {
        const approveData = {
          rosterIds: checked,
          status: 2,
        };
        console.log("=======rejected data=====");
        console.log(approveData)
        rosterApproval(approveData);
        setChecked([])      
      }


      const checkboxHandler = (rosterLogId) => {
        console.log("Roster log Id in checkbox", rosterLogId);
        setChecked((checked) => {
          const indexOfRosterLogId = checked.indexOf(rosterLogId);
          if (indexOfRosterLogId < 0) {
            return [...checked, rosterLogId];
          } else {
            return [
              ...checked.slice(0, indexOfRosterLogId),
              ...checked.slice(indexOfRosterLogId + 1),
            ];
          }
        });
      };

    return (
        <div>
            <Fragment>                
                <Breadcrumb title="Roster" parent="Admin" />
                <div className="container-fluid">
                    {/* Table */}
                    <br />
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="title_bar">
                                <Button
                                    className="btn btn-light mr-2"
                                    onClick={approveRoster}
                                >
                                    Approve
                                </Button>
                                <Button 
                                    variant="danger"
                                    onClick={() => {
                                    setDeleteModal(true);
                                    }}
                                >Reject </Button>
                            </div>

                            <Modal show={deleteModal} onHide={handleDeleteClose} centered>
                                <Modal.Body style={{ marginTop: "1rem" }}>
                                    <h5>Are you sure to reject the item ?</h5>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                    variant="secondary"
                                    className="deleteNoButton"
                                    onClick={() => handleDeleteClose()}
                                    >
                                    No
                                    </Button>
                                    <Button
                                    variant="primary"
                                    className="deleteYesButton"
                                    onClick={() => {
                                        handleDeleteClose()
                                        rejectRoster()
                                    }}
                                    >
                                    Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card" style={{ overflowX: "auto" }}>
                                <div className="table-responsive">
                                    <table id="table-to-xls1" className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Sr No.</th>
                                                <th scope="col">Employee Id</th>
                                                <th scope="col">Employee Name</th>
                                                <th scope="col">Previous Shift Duration</th>
                                                <th scope="col">New Shift Duration</th>
                                                <th scope="col">Date</th>
                                                <th></th>                                    
                                            </tr>
                                        </thead> 
                                         
                                        {pendingRosterList.length > 0 &&  pendingRosterList.map((item, i) => {
                                            return (
                                            <tbody key={i + 1}>
                                                    <tr>
                                                        <td>
                                                            
                                                            {item.status === 0 ? (
                                                            <input
                                                                type="checkbox"
                                                                checked={checked.indexOf(item.rosterLogId) >= 0}
                                                                onChange={() => checkboxHandler(item.rosterLogId)}
                                                                name="selectCheckbox"
                                                            />
                                                            ) : (
                                                            <input type="checkbox" disabled />
                                                            )}
                                                        </td>
                                                        <td>{i + 1}</td>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.previousShift}</td>
                                                        <td>{item.newShift}</td>
                                                        <td>{item.rosterDate}</td>
                                                        
                                                        
                                                    </tr>
                                                </tbody>
                                            )
                                        })}                               
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Fragment>
        </div>
    )
}

export default AdminRosterModule
