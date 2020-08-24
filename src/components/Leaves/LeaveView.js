import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios'
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { X, Edit2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import {LeaveContext} from '../../context/LeaveState'
import './Leaves.css'

const LeaveView = () => {
    const [modal, setModal] = useState(false);

    const {leaveList, viewList, deleteList} = useContext(LeaveContext);

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

        useEffect(() => {
            viewList()
            
        },[])

   
  /*   useEffect(() => {

        const GetData = async () => {

            const result = await axios('http://humine.theretailinsights.co/leave_transaction/view', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk4MTg5MTM2LCJpYXQiOjE1OTgxNTMxMzZ9.6sXI_un5_zPkC6rFfwy7ZOYdl6Nr81TzFl3EMJ9Hkaw'
                }
            });
            const viewList = result.data.data
            setViewList(viewList);
            console.log("API respone=====", viewList)

        };

        GetData();
    }, []); */
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
                            
                                {leaveList.length > 0 && 
                                    leaveList.map((item, i) => {
                                    return (
                                        <tbody>
                                        <tr key={i+1}>
                                            <td>{i+1}</td>
                                            <td>{item.leaveCategory}</td>
                                            <td>{item.numberOfDays}</td>
                                            <td>{item.fromDate}</td>
                                            <td>{item.toDate}</td>
                                            <td><Edit2 /></td>
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