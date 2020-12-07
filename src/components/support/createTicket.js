import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import '../common/style.css'

const CreateTicket = () => {
    return (
        <Fragment>
            <Breadcrumb title="Create Ticket" parent="Create Ticket" />
            <Container fluid>
                <Form style={{ backgroundColor: 'white', padding: '3rem' }} >
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
                                <Form.Label column sm='4' className='labels'>Select Role :<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Col sm='8'>
                                    <select
                                        className="form-control"
                                        required
                                    // value={contractType}

                                    // defaultValue={shiftContractNames.contractType}
                                    // onChange={(e) => getContractType(e)}
                                    >

                                        <option value="">Select Role</option>
                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                        </option>
                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                        {/* );
                                                    })} */}
                                    </select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='labels'>Select Issue and Category :</Form.Label>
                                <Col sm='8'>
                                    <select
                                        className="form-control"
                                        required
                                    // value={contractType}

                                    // defaultValue={shiftContractNames.contractType}
                                    // onChange={(e) => getContractType(e)}
                                    >

                                        <option value="">Select Issue and Category</option>
                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                        </option>
                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                        {/* );
                                                    })} */}
                                    </select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='labels'>Title :<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Col sm='8'>
                                    <select
                                        className="form-control"
                                        required
                                    // value={contractType}

                                    // defaultValue={shiftContractNames.contractType}
                                    // onChange={(e) => getContractType(e)}
                                    >

                                        <option value="">Select Title</option>
                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                        </option>
                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                        {/* );
                                                    })} */}
                                    </select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='labels'>Description :</Form.Label>
                                <Col sm='8'>
                                    <textarea className="form-control" rows="3" placeholder="Description.."></textarea>

                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='labels'>Urgency:<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Col sm='8'>
                                    <select
                                        className="form-control"
                                        required
                                    // value={contractType}

                                    // defaultValue={shiftContractNames.contractType}
                                    // onChange={(e) => getContractType(e)}
                                    >

                                        <option value="">Select Urgency</option>
                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                        </option>
                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                        {/* );
                                                    })} */}
                                    </select>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Form.Group as={Row} >
                                <Form.Label column sm='4' className='labels'>Priority:</Form.Label>
                                <Col sm='8'>
                                    <select
                                        className="form-control"
                                        required
                                    // value={contractType}

                                    // defaultValue={shiftContractNames.contractType}
                                    // onChange={(e) => getContractType(e)}
                                    >

                                        <option value="">Select Priority</option>
                                        {/* {shiftContractNames !== null &&
                                                    shiftContractNames.map((e, i) => { */}
                                                        return (
                                                            <option >

                                        </option>
                                        {/* <option key={e.typeId} value={e.contractType}>
                                                                {e.contractType}
                                                            </option> */}
                                        {/* );
                                                    })} */}
                                    </select>
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

export default CreateTicket;