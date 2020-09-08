import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { X, Edit2, Trash2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import EditLeave from './EditLeave'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { LeaveContext } from '../../context/LeaveState'
import './Leaves.css'

const LeaveView = () => {

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [leaveCategory, setLeaveCategory] = useState()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ltId, setltId] = useState()
    const [reason, setReason] = useState()

    const { leaveList, viewList, deleteList, editList, viewLeaveData, leaveDataList, viewGrantLeave, grantLeave, deleteData }
        = useContext(LeaveContext);

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    const handleEditClose = () => setEditModal(false)
    const handleEditShow = () => setEditModal(true)

    const handleDeleteClose = () => setDeleteModal(false)
    const handleDeleteShow = () => setDeleteModal(true)


    useEffect(() => {
        viewList()
        viewLeaveData()
        viewGrantLeave()
    
    }, [])
   /*  const newLeaveList = leaveList.sort((a, b) => b.fromDate - a.fromDate) */
    /* const setFromDateHandler = (date) => {
        var newDate = new Date(date)
        setFromDate(newDate)
        console.log("from date in leave view", newDate)
        console.log("from date in leave view", fromDate)
    } */
   const deleteListcheck = (id) =>{
    deleteList(id)
    setDeleteModal(false)
    }
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
                                    <img src={calendarImage} alt="calendar-image" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <p>Available:{leaveDataList.eligibleLeave ? (leaveDataList.eligibleLeave.General &&
                                                ((leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General) <= 0 ? '0' : (leaveDataList.eligibleLeave.General - leaveDataList.leaveApplied.General))) :
                                                10}</p>
                                        </Row>
                                        <Row className="text-center">
                                            <p>Taken:{leaveDataList.leaveApplied ? (leaveDataList.leaveApplied.General === null ? '0' : leaveDataList.leaveApplied.General) :
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
                                            <p>Available: {grantLeave}</p>

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
                        <Button className="apply-button" onClick={handleShow}>Apply</Button>
                    </Col>
                    <LeaveAdd handleClose={handleClose} modal={modal} />
                </Row>

                <Row className="table">
                    <Table>
                        <thead>
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

                        {leaveList.length > 0 &&
                            leaveList.map((item, i) => {
                                return (
                                    <tbody key={i + 1}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.leaveCategory}</td>
                                            <td>{item.numberOfDays}</td>
                                            <td>{item.fromDate}</td>
                                            <td>{item.toDate}</td>
                                            <td><Edit2 onClick={() => {
                                                setEditModal(true); setLeaveCategory(item.leaveCategory);
                                                setFromDate(item.fromDate); setToDate(item.toDate); setReason(item.reason)
                                                setltId(item.ltId)
                                            }} />
                                            </td>
                                            <td><Trash2 onClick={() =>{
                                                 setDeleteModal(true) }  }/>
                                            </td>
                                            
                                            <Modal show={deleteModal} onHide={handleDeleteClose} centered>
                                                <Modal.Body style={{marginTop:'1rem'}}>
                                                    <h5>Are you sure to delete the item ?</h5>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" className="deleteNoButton"
                                                     onClick={() => handleDeleteClose()}>No</Button>
                                                    <Button variant="primary" className="deleteYesButton"
                                                     onClick={() => deleteListcheck(item.ltId)}>Yes</Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </tr>
                                    </tbody>
                                )
                            })}
                    </Table>
                    <EditLeave handleEditClose={handleEditClose} modal={editModal}
                        leaveCategory={leaveCategory} fromDate={fromDate} toDate={toDate}
                        reason={reason} ltId={ltId} />
                </Row>
               
            </div>
        </Fragment>
    );
};

export default LeaveView;