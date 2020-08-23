import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios'
import Breadcrumb from '../common/breadcrumb';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { X, Edit2 } from 'react-feather'
import calendarImage from '../../assets/images/calendar-image.png'
import LeaveAdd from './LeaveAdd'
import './Leaves.css'

const LeaveView = () => {
    const [modal, setModal] = useState(false);
    const [viewList, setViewList] = useState([]);

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    /*  useEffect(() => {
      fetch('http://humine.theretailinsights.co/leave_transaction/view',{
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3ODg5MTcyLCJpYXQiOjE1OTc4NTMxNzJ9.h0AhfPcd65AyoG-KOaQotvB-xSDL4XY99AM2JFpQ5xk'   
          }
      }).then((result) => {
          result.json().then((response) => {
              console.log("api response",response.message)
          })
      })
     }, []) */

    /* useEffect(() => {
     axios('http://humine.theretailinsights.co/leave_transaction/view',{
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3Nzg4Njk2LCJpYXQiOjE1OTc3NTI2OTZ9.drYvc0vOPLQJkzKvYXJZHyGZYJFukyiYITEYItn15_A'   
         }
     }).then((response) => {
         console.log("API response=====",response)
     })
    }, [])  */

    useEffect(() => {

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
    }, []);
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
                    {viewList &&
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
                                {viewList.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i}</td>
                                            <td>{item.leaveCategory}</td>
                                            <td>{item.numberOfDays}</td>
                                            <td>{item.fromDate}</td>
                                            <td>{item.toDate}</td>
                                            <td><Edit2 /></td>
                                            <td><X /></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    }
                </Row>
            </div>
        </Fragment>
    );
};

export default LeaveView;