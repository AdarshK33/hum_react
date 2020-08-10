import React from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'

const LeaveAdd = (props) => {
    
    return (
        <Modal show={props.modal} onHide={props.handleClose} centered>
            <Container style={{paddingBottom:'1rem'}}>
                     <Modal.Header closeButton>
                            <Modal.Title >
                                <h5 className="modal-heading">Apply For Leave</h5>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group as={Row} >
                            <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="select" size="sm">
                                    <option>Casual</option>
                                    <option>Sick</option>
                                    <option>Others</option>
                                    <option></option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                            <Col sm="3" className="padding-left">
                                <Form.Control type="date" size="sm" />
                            </Col>
                            <Form.Label column sm="3" className="padding-right" 
                            style={{display:'flex', justifyContent:'center'}}>To Date:</Form.Label>
                            <Col sm="3" className="padding-left">
                                <Form.Control type="date" size="sm" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">Balance leaves:</Form.Label>
                            <Col sm="9" className="padding-left">
                            <Form.Control type="text" size="sm" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="textarea" rows="3" size="sm" />
                            </Col>
                        </Form.Group>
                        <Button type="submit" className="submit-button" size="sm">Submit</Button>
                    </Form>
                    
                    </Modal.Body>
            </Container>
        </Modal>
    );
};

export default LeaveAdd;