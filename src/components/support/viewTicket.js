import React, { Fragment, useContext, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import '../common/style.css'
import { SupportContext } from '../../context/SupportState'
import { GroupContext } from '../../context/GroupState'

const ViewTicket = () => {
    const { completeStatus, completeStatusView, ticketStatus,
        ticketStatusView, ticketIdList, updateTicket, loader, ticketIdView,downloadFile } = useContext(SupportContext)
    const { serviceGroupView, serviceGroupList } = useContext(GroupContext)

    const [compStatus, setCompStatus] = useState()
    const [tickStatus, setTickStatus] = useState()
    const [resolution, setResolution] = useState()
    const [serviceGroup, setServiceGroup] = useState()
    const [fileName, setFileName] = useState('')

    let history = useHistory();

    useEffect(() => {
        serviceGroupView()
    }, [])


    const submitHandler = (e) => {
        e.preventDefault();

        const updateData = {
            categoryId: ticketIdList.categoryId,
            completionStatus: compStatus,
            description: ticketIdList.description,
            email: ticketIdList.email,
            employeeId: ticketIdList.employeeId,
            fedId: ticketIdList.fedId,
            firstName: ticketIdList.firstName,
            groupId: serviceGroup,
            lastName: ticketIdList.lastName,
            position: ticketIdList.position,
            priorityId: ticketIdList.priorityId,
            resolution: resolution,
            role: ticketIdList.role,
            storeId: ticketIdList.storeId,
            ticketFiles: null,
            ticketId: ticketIdList.ticketId,
            ticketResolutions: null,
            ticketStatus: tickStatus,
            title: ticketIdList.title,
            urgencyId: ticketIdList.urgencyId
        }
        updateTicket(updateData,ticketIdList.ticketId)
        setResolution('')

    }

    const downloadFileButton = (e) => {
        e.preventDefault();
        downloadFile(fileName)
    }

    const downloadFileHandler = (e) => {
        setFileName(e.target.value)
        console.log("file name",e.target.value)
    }

    useEffect(() => {
        setCompStatus(ticketIdList.completionStatus)
    }, [ticketIdList.completionStatus])

    useEffect(() => {
        setTickStatus(ticketIdList.ticketStatus)
    }, [ticketIdList.ticketStatus])

    useEffect(() => {
        setServiceGroup(ticketIdList.groupId)
    }, [ticketIdList.groupId])

    useEffect(() => {
        setFileName(ticketIdList.fileName)
        console.log("ticketIdList.fileName",ticketIdList.fileName)
    },[ticketIdList.fileName])

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
    }

    const serviceGroupHandler = (e) => {
        setServiceGroup(e.target.value)
        console.log("e.target.value of service group", e.target.value)
    }


    return (
        <Fragment>
            <Breadcrumb title="View Ticket" parent="View Ticket" />
            <Container fluid>
                {loader === true ?
                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                        <div className="loader">
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                            <div className="line bg-primary"></div>
                        </div>
                    </div> :
                    <Form style={{ backgroundColor: 'white', padding: '3rem' }} >
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm='4' className='labels'>Ticket Number:</Form.Label>
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
                                        <Form.Control type='text' value={ticketIdList.firstName + ' ' + ticketIdList.lastName} readOnly className='disabledValue blueText' />
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
                                    <Form.Label column sm='4' className='labels'>Email Id :</Form.Label>
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
                                                        (ticketIdList.role === 3 ? 'Sports Leader' : '')))} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Selected Issue :</Form.Label>
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
                                                                                (ticketIdList.categoryId === 10 ? 'Clarification/Queries' : '')))))))))} />
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
                            {ticketIdList.ticketFiles !== undefined &&
                            ticketIdList.ticketFiles.length===0 ? '' :
                            <Col sm={8}>
                           <Form.Group as={Row}>
                            <Form.Label column sm='3'></Form.Label>
                            <Col sm='9'>
                            {ticketIdList.ticketFiles != null &&
                                ticketIdList.ticketFiles !== undefined &&
                                ticketIdList.ticketFiles.length > 0 &&
                                ticketIdList.ticketFiles.map((item, i) => {
                                    return(
                                       
                                           <input className="fileButton" type='button' onClick={downloadFileHandler} value={item.fileName} 
                                      />
                                       
                                    )
                                })}
                               &nbsp; &nbsp; <span>(Select File to download {fileName})</span><br/>
                                <Button type='submit' size='sm' onClick={downloadFileButton}>Download</Button>
                                </Col>
                           </Form.Group>
                                
                            </Col>}
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
                                                        (ticketIdList.urgencyId === 4 ? 'I can continue work' : '')))} />
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
                                                                                                        (ticketIdList.priorityId === 16 ? 'Low' : '')))))))))))))))} />
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
                                            {serviceGroupList.map((item, i) => {
                                                return (
                                                    <option key={item.groupId} value={item.groupId}>{item.groupName}</option>
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
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='3' className='labels'>Resolution :</Form.Label>
                                    <Col sm='9' style={{padding:'0 2rem'}}>
                                        <Row>
                                            <Table style={{ margin: '0 1rem' }}>
                                                {ticketIdList.ticketResolutions !== null &&
                                                    ticketIdList.ticketResolutions !== undefined &&
                                                    ticketIdList.ticketResolutions.length > 0 &&
                                                    ticketIdList.ticketResolutions.map((item, id) => {
                                                        return (
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ textAlign: 'center', padding: '4px 0', 
                                                                    border: 'none',fontWeight:'bolder' }}>
                                                                        {item.date}</td>
                                                                </tr>
                                                               
                                                                    {item.resolutions.map((i,j) => {
                                                                        return(
                                                                            <Fragment>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'left', padding: '4px 0', 
                                                                                border: 'none',fontWeight:'bolder',textDecoration:'underline' }}>
                                                                                {i.employeeName}</td>
                                                                            </tr>
                                                                                {i.comments.map(a => {
                                                                                return(
                                                                                    <tr>
                                                                                        <td style={{ textAlign: 'left', padding: '4px 0', 
                                                                                        border: 'none',backgroundColor:'aliceblue' }}>{a}</td>
                                                                                    </tr>
                                                                                    )
                                                                                })}
                                                                            
                                                                            </Fragment>
                                                                            
                                                                            
                                                                            
                                                                        )
                                                                    })}
                                                              
                                                            </tbody>
                                                        )
                                                    })}

                                            </Table>
                                        </Row>
                                        <Row>
                                            <Form.Control as='textarea' row='3' value={resolution || ''}
                                                onChange={resolutionHandler} />
                                        </Row>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}></Col>
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