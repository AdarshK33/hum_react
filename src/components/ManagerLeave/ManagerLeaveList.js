import React, { useState, useEffect, useContext, Fragment } from 'react';
import {  Row,  Button, Table, Modal } from 'react-bootstrap';
import { LeaveContext } from '../../context/LeaveState';
import ManagerLeaveEdit from './ManagerLeaveEdit'
import Breadcrumb from '../common/breadcrumb';
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import { Edit2, Trash2 } from 'react-feather'
import ManagerLeaveAdd from './ManagerLeaveAdd'
import ManagerDeleteLeaves from './ManagerDeleteLeaves';

const ManagerLeaveList = (props) => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    let [leaveTypeId, setLeaveTypeId] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ltId, setltId] = useState()
    const [empId, setEmpId] = useState()
    const [reason, setReason] = useState()

    const { viewManagerList, leaveManagerList } = useContext(LeaveContext)

    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = leaveManagerList !== null && leaveManagerList.length;
    const pageRange = 10;

   const indexOfLastRecord = currentPage * recordPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
   const currentRecords = leaveManagerList !== null ? leaveManagerList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

   const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
   }
   /*-----------------Pagination------------------*/

   const handleClose = () => setModal(false)
   const handleShow = () => setModal(true)

    const handleEditClose = () => setEditModal(false)
    const handleDeleteClose = () => setDeleteModal(false)

    useEffect(() => {
        viewManagerList()
    }, [])
    

    return (
        <Fragment>
            <Breadcrumb title="Manager" parent="Manager Leave" />
            <div className="container-fluid">
                <Row className="heading-row">
                    <h4 className="main-heading">Manager Leaves</h4>
                </Row>
                <Row>
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                <Button className="apply-button btn btn-light mr-2" onClick={handleShow}>Apply</Button>
                            </div>
                            <ManagerLeaveAdd handleClose={handleClose} modal={modal} />
                            <div className="table-responsive">
                            <Table id="table-to-xls" className="table table-hover">
                                <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                    <tr>
                                        <th>S. No</th>
                                        <th>Emp Id</th>
                                        <th>Leave Type</th>
                                        <th>Total No. of Days</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {currentRecords !== undefined &&  currentRecords !== null &&
                                    currentRecords.map((item, i) => {
                                        return (
                                            <tbody key={i + 1}>
                                                <tr>
                                                    <td>{i + 1 + indexOfFirstRecord}</td>
                                                    <td>{item.empId}</td>
                                                    <td>{item.leaveTypeId === 1 ? 'General' : (item.leaveTypeId === 2 ? 'Paternity' : (item.leaveTypeId === 3 ? 'Maternity' : 
                                                    (item.leaveTypeId === 0 ? 'LOP' : '')))}
                                                    </td>
                                                    <td>{item.numberOfDays}</td>
                                                    <td>{item.fromDate}</td>
                                                    <td>{item.toDate}</td>
                                                    <td><Edit2 onClick={() => {
                                                        setEditModal(true); setLeaveTypeId(item.leaveTypeId);
                                                        setFromDate(item.fromDate); setToDate(item.toDate); setReason(item.reason)
                                                        setltId(item.ltId); setEmpId(item.empId)
                                                        
                                                    }} />
                                                    </td>
                                                    <td><Trash2 onClick={() => {
                                                        setDeleteModal(true);  setltId(item.ltId)
                                                    }} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                            </Table>
                        </div>
                        </div>
                    </div>
                     <ManagerDeleteLeaves handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} />
                    <ManagerLeaveEdit handleEditClose={handleEditClose} modal={editModal}
                        leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                            leaveTypeId === 3 ? (leaveTypeId = 3):'')} fromDate={fromDate} toDate={toDate}
                        reason={reason} ltId={ltId} empId={empId} />
                </Row>
            </div>
            {leaveManagerList !== null && leaveManagerList.length > 10 &&
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

 export default ManagerLeaveList;