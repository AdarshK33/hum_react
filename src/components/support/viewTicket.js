import React, { Fragment, useContext, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import '../common/style.css'
import { SupportContext } from '../../context/SupportState'

const ViewTicket = () => {
    const { completeStatus, completeStatusView, ticketStatus,
         ticketStatusView, ticketIdList, updateTicket, loader,ticketIdView } = useContext(SupportContext)
   
    const [compStatus, setCompStatus] = useState()
    const [tickStatus, setTickStatus] = useState()
    const [resolution, setResolution] = useState()
    const [serviceGroup, setServiceGroup] = useState('')
    
     let history = useHistory();


    const submitHandler = (e) => {
        e.preventDefault();

        const updateData= {
            categoryId: ticketIdList.categoryId,
            completionStatus: compStatus,
            description: ticketIdList.description,
            email: ticketIdList.email,
            employeeId: ticketIdList.employeeId,
            fedId: ticketIdList.fedId,
            firstName: ticketIdList.firstName,
            lastName: ticketIdList.lastName,
            position: ticketIdList.position,
            priorityId: ticketIdList.priorityId,
            resolution: resolution,
            role: ticketIdList.role,
            serviceGroup: ticketIdList.serviceGroup,
            storeId: ticketIdList.storeId,
            ticketFiles: null,
            ticketId: ticketIdList.ticketId,
            ticketResolutions: null,
            ticketStatus: tickStatus,
            title: ticketIdList.title,
            urgencyId: ticketIdList.urgencyId
        }
        updateTicket(updateData)

        history.push("./ticketListingPage")
    }

  /*   useEffect(() => {
        setCompStatus(ticketIdList.completionStatus === 0 ? 'Fulfilled Offline' :
                    (ticketIdList.completionStatus === 1 ? 'Fulfilled by live suppor' :
                    (ticketIdList.completionStatus === 2 ? 'Abandoned by User' :
                    (ticketIdList.completionStatus === 3 ? 'Enhancement request' : 
                    (ticketIdList.completionStatus === 4 ? 'Resolved by Workaround' : 
                    (ticketIdList.completionStatus === 5 ? 'Training' : ''))))))
                    console.log("completionStatus status in useEffect",ticketIdList.completionStatus)

    },[ticketIdList.completionStatus])

    useEffect(() => {
        setTickStatus(ticketIdList.ticketStatus === 0 ? 'Open' :
                    (ticketIdList.ticketStatus === 1 ? 'In Progress' :
                    (ticketIdList.ticketStatus === 2 ? 'On Hold' :
                    (ticketIdList.ticketStatus === 3 ? 'Closed' : ''))))
                    console.log("ticket status in useEffect",ticketIdList.ticketStatus)

    },[ticketIdList.ticketStatus]) */

    useEffect(() => {
        setCompStatus(ticketIdList.completionStatus)
    },[ticketIdList.completionStatus])

    useEffect(() => {
        setTickStatus(ticketIdList.ticketStatus)
    },[ticketIdList.ticketStatus])

    useEffect(() => {
        setResolution(ticketIdList.resolution)
        console.log("resolution ticketIdList value",ticketIdList.resolution)
    },[ticketIdList.resolution])

    useEffect(() => {
        completeStatus()
        ticketStatus()
    }, [])

    const compStatusHandler = (e) => {
        setCompStatus(e.target.value)
        console.log("compStatus value", e.target.value)
    }

    const tickStatusHandler = (e) => {
        setTickStatus(e.target.value)
        console.log("ticket value", e.target.value)
    } 

    const resolutionHandler = (e) => {
        setResolution(e.target.value)
        console.log("resolution target value",e.target.value)
    }

    const serviceGroupHandler = (e) => {
        setServiceGroup(e.target.value)
        console.log("e.target.value of service group",e.target.value)
    }
   
    return (
        <Fragment>
            <Breadcrumb title="View Ticket" parent="View Ticket" />
            <Container fluid>
                {loader ===true ?
                 <div className="loader-box loader" style={{ width: "100% !important" }}>
                 <div className="loader">
                     <div className="line bg-primary"></div>
                     <div className="line bg-primary"></div>
                     <div className="line bg-primary"></div>
                     <div className="line bg-primary"></div>
                 </div>
             </div>:
                 <Form style={{ backgroundColor: 'white', padding: '3rem' }} >
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Ticket Number :</Form.Label>
                                <Col sm='8'>
                                    <Form.Control type='text' value={ticketIdList.ticketId} readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Cost Center :</Form.Label>
                                <Col sm='8'>
                                    <Form.Control type='text' value={ticketIdList.storeId} readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Name :</Form.Label>
                                <Col sm='8'>
                                    <Form.Control type='text' value={ticketIdList.firstName + ' '+ ticketIdList.lastName} readOnly className='disabledValue blueText' />
                                </Col> 
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>FED ID :</Form.Label>
                                <Col sm='8'>
                                    <Form.Control type='text' value={ticketIdList.fedId} readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Emai Id :</Form.Label>
                                <Col sm='8'>
                                    <Form.Control type='text' value={ticketIdList.email} readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Position :</Form.Label>
                                <Col sm='8'>
                                    <Form.Control type='text' value={ticketIdList.position} readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Select Role :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control type='text' readOnly className='disabledValue'
                                    value={ticketIdList.role === 0 ? 'Super Cost Center' :
                                            (ticketIdList.role === 1 ? 'Store Leader' :
                                            (ticketIdList.role === 2 ? 'Coach' :
                                            (ticketIdList.role === 3 ? 'Sports Leader' : '')))   }  />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Selected Issue Category :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control type='text' readOnly className='disabledValue'
                                    value={ticketIdList.categoryId === 1 ? 'User Interface Issue' :
                                    (ticketIdList.categoryId === 2 ? 'Performance Issue' :
                                    (ticketIdList.categoryId === 3 ? 'Leave Functionality/Feature Issue' :
                                    (ticketIdList.categoryId === 4 ? 'Enhancement suggestions' : 
                                    (ticketIdList.categoryId === 5 ? 'Data mismatch' : 
                                    (ticketIdList.categoryId === 6 ? 'Roster Functionality/Feature Issue' : 
                                    (ticketIdList.categoryId === 7 ? 'Report Extract Issue' : 
                                    (ticketIdList.categoryId === 8 ? 'Salary Calculation Issue' : 
                                    (ticketIdList.categoryId === 9 ? 'Leave Calculation Issue' : 
                                    (ticketIdList.categoryId === 10 ? 'Clarification/Queries' : '')))))))))   }  />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Title :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control type='text' value={ticketIdList.title} readOnly className='disabledValue' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Description :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control type='text' value={ticketIdList.description}
                                        readOnly className='disabledValue' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Urgency :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control type='text' readOnly className='disabledValue'
                                     value={ticketIdList.urgencyId === 1 ? 'I am blocked from doing my work' :
                                     (ticketIdList.urgencyId === 2 ? 'The issue partially blocks my work' :
                                     (ticketIdList.urgencyId === 3 ? 'This issue disrupts my work' :
                                     (ticketIdList.urgencyId === 4 ? 'I can continue work' : '')))   }  />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Priority :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control type='text' readOnly className='disabledValue'
                                      value={ticketIdList.priorityId === 1 ? 'Critical' :
                                      (ticketIdList.priorityId === 2 ? 'High' :
                                      (ticketIdList.priorityId === 3 ? 'High' :
                                      (ticketIdList.priorityId === 4 ? 'Medium' : 
                                      (ticketIdList.priorityId === 5 ? 'High' : 
                                      (ticketIdList.priorityId === 6 ? 'High' : 
                                      (ticketIdList.priorityId === 7 ? 'Medium' : 
                                      (ticketIdList.priorityId === 8 ? 'Medium' : 
                                      (ticketIdList.priorityId === 9 ? 'High' : 
                                      (ticketIdList.priorityId === 10 ? 'Medium' : 
                                      (ticketIdList.priorityId === 11 ? 'Medium' : 
                                      (ticketIdList.priorityId === 12 ? 'Low' :
                                      (ticketIdList.priorityId === 13 ? 'Medium' :
                                      (ticketIdList.priorityId === 14 ? 'Medium' :
                                      (ticketIdList.priorityId === 15 ? 'Low' :
                                      (ticketIdList.priorityId === 16 ? 'Low' : '')))))))))))))))   }  />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Service Groups :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control as='select' value={serviceGroup} onChange={serviceGroupHandler} >
                                        <option>{ticketIdList.serviceGroup}</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Resolution :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control as='textarea' row='3' value={resolution || ''} 
                                    onChange={resolutionHandler} />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Completion Status :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control as='select' value={compStatus}
                                        onChange={compStatusHandler} >
                                        {completeStatusView !== null &&
                                            completeStatusView !== undefined &&
                                            completeStatusView.length > 0 &&
                                            completeStatusView.map((item, i) => {
                                                return (
                                                    <option key={i} value={item.value}>{item.name}</option>
                                                )
                                            })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='3' className='labels'>Ticket Status :</Form.Label>
                                <Col sm='9'>
                                    <Form.Control as='select' value={tickStatus}
                                        onChange={tickStatusHandler} >
                                        {ticketStatusView !== null &&
                                            ticketStatusView !== undefined &&
                                            ticketStatusView.length > 0 &&
                                            ticketStatusView.map((item, i) => {
                                                return (
                                                    <option key={i} value={item.value}>{item.name}</option>
                                                )
                                            })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button type='submit' onClick={submitHandler}>Submit</Button>
                        </Col>
                    </Row>
                </Form> 
                }
            </Container>
        </Fragment>
    );
};

export default ViewTicket;