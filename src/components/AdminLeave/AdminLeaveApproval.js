import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Table, Modal } from 'react-bootstrap'
import Breadcrumb from '../common/breadcrumb';
import { AdminContext } from '../../context/AdminState';
import { useHistory } from "react-router-dom";
import '../Leaves/Leaves.css'
import './AdminLeaves.css'
import Pagination from 'react-js-pagination'

const AdminLeaveApproval = () => {
    const [deleteModal, setDeleteModal] = useState(false)
    let history = useHistory();


    const { ApprovalView, ApprovalLeaveList, cancelLeaveList, approvedUpdate } = useContext(AdminContext)

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = ApprovalLeaveList !== null && ApprovalLeaveList.length;
    const pageRange = 10;

   const indexOfLastRecord = currentPage * recordPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
   const currentRecords = ApprovalLeaveList !== null ? ApprovalLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

   const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
   }
   /*-----------------Pagination------------------*/

    const handleDeleteClose = () => setDeleteModal(false)

    useEffect(() => {
        ApprovalView()
    }, [])

    const cancelLeave = (id) => {
        console.log("id-----", id)
        cancelLeaveList(id)
        setDeleteModal(false)
    }

    const approvedButton = (empId, startDate, endDate, leaveCategory,
        leaveTypeId, ltId, numberOfDays, reason, status, year) => {

        const approvalData = {
            empId: empId,
            fromDate: startDate,
            leaveCategory: leaveCategory,
            leaveTypeId: leaveTypeId,
            ltId: ltId,
            numberOfDays: numberOfDays,
            reason: reason,
            status: status,
            toDate: endDate,
            viewLeavePopup: 1,
            year: year
        }
        console.log("approval data=====", approvalData)
        approvedUpdate(approvalData)
        history.push("/AdminLeaves/AdminLeaveApproval");

    }


    return (
        <Fragment>
            <Breadcrumb title="Admin" parent=" Leave Approval" />
            <div className="container-fluid">
                <div className="row">
                    <Table className="adminTable">
                        <thead style={{ background: '#006EBB', color: 'white' }}>
                            <tr>
                                <th>Sr.</th>
                                <th>Employee Id</th>
                                <th>Leave Type</th>
                                <th>Total No. of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                                
                            </tr>
                        </thead>
                        {currentRecords !== null && currentRecords !== undefined &&
                            currentRecords.map((item, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td>{i + 1 + indexOfFirstRecord}</td>
                                            <td>{item.empId}</td>
                                            <td>{item.leaveCategory}</td>
                                            <td>{item.numberOfDays}</td>
                                            <td>{item.fromDate}</td>
                                            <td>{item.toDate}</td>
                                            <td>{item.isApproved === 0 ? "Approved" : (item.isApproved === 1 ? 'Pending' : 
                                             (item.isApproved === 2 ? 'Rejected' : ''))  }</td>
  
                                            <td>{item.isApproved === 0 ?
                                             <Button size="sm" className="disable-button" disabled>
                                                 Approved</Button> :
                                                <Button size="sm" style={{backgroundColor:'#006EBB'}} 
                                            onClick={(e) => 
                                                approvedButton(item.empId, item.fromDate,
                                                    item.toDate, item.leaveCategory, item.leaveTypeId,
                                                    item.ltId, item.numberOfDays, item.reason, item.status,
                                                    item.year)
                                            
                                                }>Approved</Button> }</td> 

                                             
                                            <td>{item.isApproved === 2 ? 
                                             <Button size="sm" className="disable-button" disabled>
                                             Cancel</Button> :
                                                <Button variant="danger" size="sm" onClick={() => {
                                                setDeleteModal(true)
                                                }}>Cancel</Button>}</td>
                                            

                                            <Modal show={deleteModal} onHide={handleDeleteClose} centered>
                                                <Modal.Body style={{ marginTop: '1rem' }}>
                                                    <h5>Are you sure to cancel the leave ?</h5>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" className="deleteNoButton"
                                                        onClick={() => handleDeleteClose()}>No</Button>
                                                    <Button variant="primary" className="deleteYesButton"
                                                        onClick={() => cancelLeave(item.ltId)}>Yes</Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </tr>

                                    </tbody>
                                )
                            })}
                    </Table>
                </div>
            </div>
            {ApprovalLeaveList !== null && ApprovalLeaveList.length > 10 &&
                <Pagination
                    itemClass="page-item" 
                    linkClass="page-link"
                    activePage={currentPage}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={pageRange}
                    onChange={handlePageChange}
                />
                }
        </Fragment>
    );
};

export default AdminLeaveApproval;