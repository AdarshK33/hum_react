import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Row,  Button, Table, Modal } from 'react-bootstrap';
import { LeaveContext } from '../../context/LeaveState';
import AdminLeaveEdit from './AdminLeaveEdit'
import AdminDeleteLeaves from './AdminDeleteLeaves'
import Breadcrumb from '../common/breadcrumb';
import './AdminLeaves.css'
import { Edit2, Trash2 } from 'react-feather'

const AdminLeavesList = (props) => {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    let [leaveTypeId, setLeaveTypeId] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ltId, setltId] = useState()
    const [empId, setEmpId] = useState()
    const [reason, setReason] = useState()

    const { viewList, leaveList } = useContext(LeaveContext)


    /* const handleClose = () => setModal(false)
    const handleShow = () => setModal(true) */

    const handleEditClose = () => setEditModal(false)
   /*  const handleEditShow = () => setEditModal(true) */

    const handleDeleteClose = () => setDeleteModal(false)
  /*   const handleDeleteShow = () => setDeleteModal(true) */

    useEffect(() => {
        viewList()
    }, [])

   /*  const deleteListcheck = (id) =>{
        deleteList(id)
        setDeleteModal(false)
        }
        {console.log("empId", empId)} */
    return (
        <Fragment>
            <Breadcrumb title="Admin " parent="Admin Leave" />
            <Container>
                <Row className="heading-row">
                    <h4 className="main-heading">Admin Leaves</h4>
                </Row>
                <Row>
                    <Table className="adminTable">
                        <thead style={{ background: '#006EBB', color: 'white' }}>
                            <tr>
                                <th>Sr No.</th>
                                <th>Emp Id</th>
                                <th>Leave Type</th>
                                <th>Total No. of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {leaveList.length > 0 &&
                            leaveList.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.empId}</td>
                                            {/* <td>{item.leaveCategory}</td> */}
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
                     <AdminDeleteLeaves handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} />
                    <AdminLeaveEdit handleEditClose={handleEditClose} modal={editModal}
                        leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                            leaveTypeId === 3 ? (leaveTypeId = 3):'')} fromDate={fromDate} toDate={toDate}
                        reason={reason} ltId={ltId} empId={empId} />
                </Row>
            </Container>
        </Fragment>
    );
};

export default AdminLeavesList;