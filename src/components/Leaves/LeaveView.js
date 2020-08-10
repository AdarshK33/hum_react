import React, { Fragment, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { X, Edit2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import './Leaves.css'

const LeaveView = () => {
    const [modal, setModal] = useState(false)

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

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
                    <Col className="col-12 col-md-3">
                        <Card>
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold' }}>General Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0' }}>
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
                    <Col className="col-12 col-md-3">
                        <Card>
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'red' }}>Unplanned Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0' }}>
                                    <img src={calendarImage} alt="calendar-image" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <Card.Text>Available:6</Card.Text>
                                        </Row>
                                        <Row className="text-center">
                                            <Card.Text>Taken:2</Card.Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3">
                        <Card>
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'green' }}>Planned Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0' }}>
                                    <img src={calendarImage} alt="calendar-image" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <Card.Text>Available:10</Card.Text>
                                        </Row>
                                        <Row className="text-center">
                                            <Card.Text>Taken:5</Card.Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-md-3">
                        <Card>
                            <Card.Body>
                                <Row className="text-center">
                                    <h6 style={{ fontWeight: 'bold', color: 'blue' }}>Others Leaves</h6>
                                </Row>
                                <Row className="text-center" style={{ margin: '15px 0' }}>
                                    <img src={calendarImage} alt="calendar-image" width='50px' />
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="text-center">
                                            <Card.Text>Available:3</Card.Text>
                                        </Row>
                                        <Row className="text-center">
                                            <Card.Text>Taken:1</Card.Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
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
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>General Leave</td>
                                <td>1</td>
                                <td>06-07-2020</td>
                                <td>07-07-2020</td>
                                <td><Edit2 /></td>
                                <td><X /></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>
        </Fragment>
    );
};

export default LeaveView;