import React, { Fragment, useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { X, Edit2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import EditLeave from './EditLeave'
import {LeaveContext} from '../../context/LeaveState'
import './Leaves.css'

const LeaveView = () => {

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)

    const {leaveList, viewList, deleteList, editList} = useContext(LeaveContext);

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    const handleEditClose = () => setEditModal(false)
    const handleEditShow = () => setEditModal(true)

        useEffect(() => {
            viewList()
        }, [])

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
                    <Col className="col-12 col-md-3" style={{marginBottom:'3rem'}}>
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
                                            <Card.Text>Available:5</Card.Text>
                                        </Row>
                                        <Row className="text-center">
                                            <Card.Text>Taken:4</Card.Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{marginBottom:'3rem'}}>
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
                                            <Card.Text>Taken:2</Card.Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3" style={{marginBottom:'3rem'}}>
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
                                            <Card.Text>Taken:5</Card.Text>
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
                                        <tbody key={i+1}>
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{item.leaveCategory}</td>
                                            <td>{item.numberOfDays}</td>
                                            <td>{item.fromDate}</td>
                                            <td>{item.toDate}</td>
                                            <td><Edit2 onClick={handleEditShow} />
                                            </td>
                                            {/* <td><Edit2 onClick={handleEditShow} /></td> */}
                                            <EditLeave handleEditClose={handleEditClose} modal={editModal} 
                                            leaveid={item.ltId} leavecategory={item.leaveCategory} fromdate={item.fromDate}
                                             todate={item.toDate} reason={item.reason} />
                                            <td><X onClick={() => deleteList(item.ltId)} /></td>
                                        </tr>
                                        </tbody>
                                    )
                                })}
                        </Table>
                </Row>
            </div>
        </Fragment>
    );
};

export default LeaveView;