import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import '../common/style.css'

const ViewTicket = () => {
    return (
        <Fragment>
            <Breadcrumb title="View Ticket" parent="View Ticket" />
            <Container fluid>
                <Form style={{backgroundColor:'white', padding:'3rem'}} >
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Ticket Number :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='1001' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Cost Center :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='IN 1305' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Name :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='Garima Singh' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>FED ID :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='AXP 012' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Emai Id :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='Garima.singh@decathlon.in' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group as={Row}>
                                <Form.Label column sm='4' className='labels'>Position :</Form.Label>
                                <Col sm='6'>
                                    <Form.Control type='text' value='Store Leader' readOnly className='disabledValue blueText' />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Select Role :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control type='text' value='Store Leader' readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                           <Col sm={8}>
                            <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Selected Issue Category :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control type='text' value='Feature Issue' readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Title :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control type='text' value='Unable to assign shifts' readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Description :</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control type='text' value='I was not able to assign shifts as the dropdown was not working'
                                        readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Urgency :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control type='text' value='This Issue partially blocks my work' readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>     
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Priority :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control type='text' value='High' readOnly className='disabledValue' />
                                    </Col>
                                </Form.Group>
                            </Col>    
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Service Groups :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control as='select' > 
                                            <option>PYR_Humine V2_LR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>     
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Resolution :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control as='textarea' row='3' value='This issue has been assigned to payroll team' />
                                    </Col>
                                </Form.Group>
                            </Col>  
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Completion Status :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control as='select' > 
                                            <option>Fullfilled online</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>     
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Form.Group as={Row} >
                                    <Form.Label column sm='4' className='labels'>Ticket Status :</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control as='select' > 
                                            <option>In Progress</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>   
                        </Row>
                        <Row>
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <Button type='submit'>Submit</Button>
                            </Col>
                        </Row>
                </Form>
            </Container>
        </Fragment>
    );
};

export default ViewTicket;