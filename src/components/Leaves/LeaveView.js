import React, { Fragment, useState, useContext, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Trash2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import EditLeave from './EditLeave'
import DeleteLeave from './DeleteLeave'

import 'react-confirm-alert/src/react-confirm-alert.css';
import { LeaveContext } from '../../context/LeaveState'
import './Leaves.css'

const LeaveView = () => {

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    let [leaveTypeId, setLeaveTypeId] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ltId, setltId] = useState()
    const [reason, setReason] = useState()

    const { leaveList, viewList, leaveDataList, viewLeaveData, viewEmpLeaveData, leaveEmpList  }
        = useContext(LeaveContext);

    const handleClose = () => setModal(false)

    const handleEditClose = () => setEditModal(false)

    const handleDeleteClose = () => setDeleteModal(false)

console.log("leave data list", leaveDataList.leaveTransactions)
    useEffect(() => {
        viewList()   
        viewLeaveData()
        viewEmpLeaveData()
    }, [])
  /*
    if(leaveTypeId === 0 || leaveTypeId === 1){
        var newLeaveTypeId = 1
       setLeaveTypeId(newLeaveTypeId)
       console.log("newLeaveTypeId", newLeaveTypeId)
    } */
    return (
        <Fragment>
            <Breadcrumb title="Leave View" parent="Leave View" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 main-heading-row">
                        <h4 className="main-heading">Leaves</h4>
                    </div>
                </div>
                <Row className="row">
                    <Col className="col-12 col-md-2"></Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold' }}>General Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="calendar" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Available:{leaveDataList.eligibleLeave ?
                                                (leaveDataList.leaveApplied.General == null ? leaveDataList.eligibleLeave.General :
                                                    ((leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General) <= 0 ? '0' :
                                                        (leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General))) :
                                                ''}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.General == null ? '0' : leaveDataList.leaveApplied.General) :
                                                0}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'red' }}>LOP</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="calendar-image" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.LOP == null ? '0' : leaveDataList.leaveApplied.LOP) :
                                                ''}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{ marginBottom: '3rem' }}>
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'green' }}>Other Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0 30px 0' }}>
                                    <img src={calendarImage} alt="calendar-image" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                        <p>Available:{leaveDataList.eligibleLeave ?
                                                (leaveDataList.leaveApplied.GrantLeave == null ? leaveDataList.eligibleLeave.GrantLeave :
                                                        (leaveDataList.eligibleLeave.GrantLeave - leaveDataList.leaveApplied.GrantLeave)) :
                                                ''}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken: {leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.GrantLeave == null ? '0' : leaveDataList.leaveApplied.GrantLeave) :
                                                ''}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-1"></Col>
                </Row>

                <Row className="apply-button-row">
                    <Col className="leaveApplications">Leave Applications</Col>
                    <Col>
                        <Button className="apply-button btn btn-light"
                        onClick={() => {setModal(true) }}>Apply</Button>
                    </Col>
                    <LeaveAdd handleClose={handleClose} modal={modal} />
                </Row>

                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>Sr No.</th>
                                <th>Leave Type</th>
                                <th>Total No. of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {leaveEmpList.length > 0 && 
                            leaveEmpList.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
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
                                                setltId(item.ltId)
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
                    <DeleteLeave handleDeleteClose={handleDeleteClose} modal={deleteModal} ltId={ltId} />
                    <EditLeave handleEditClose={handleEditClose} modal={editModal}
                        leaveTypeId={leaveTypeId === 0 || leaveTypeId === 1 ? (leaveTypeId = 1) : (leaveTypeId === 2 ? (leaveTypeId = 2) :
                            leaveTypeId === 3 ? (leaveTypeId = 3):'')} fromDate={fromDate} toDate={toDate}
                        reason={reason} ltId={ltId} />
                </div>

            </div>
        </Fragment>
    );
};

export default LeaveView;
