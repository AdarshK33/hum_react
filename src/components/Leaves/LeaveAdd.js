import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveAdd = (props) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [leaveType, setLeaveType] = useState("")
    const [plannedLeave, setPlannedLeave] = useState('')
    const [unplannedLeave, setUnplannedLeave] = useState('')
    const [balanceLeave, setBalanceLeave] = useState('')
    const [reason, setReason] = useState('')

    const isWeekDay = date => {
        if (date.getDay() === 0 || date.getDay() === 6) {
            return false;
        } else {
            return true;
        }
    }
    
    const today = new Date();
    today.setDate(today.getDate() + 1);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1);

    const validation = (event) => {
        let flag = true

        if(balanceLeave == ''){
            toast.info("Enter balance leave")
            flag = false;
            return;
        }

        if(reason == ''){
            toast.info("Reason is mandatory")
            flag = false;
            return;
        }
        return flag;
    }
    const applyLeaves = async (event) => {
        event.preventDefault()
        const cflag = validation();
        
        if(cflag){
            console.log("submitted successfully")
            const setModal = props.handleClose;
            setModal()
            setBalanceLeave('')
            setReason('')
            setStartDate('')
            setEndDate('')
        }

        /* fetch('/leave_transaction/create',{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(balanceLeave)
        }).then((result) => {
            result.json().then((response) => {
                console.log("api response",response)
            })
        }) */
    }

    return (
       <React.Fragment>
            <ToastContainer />
        <Modal show={props.modal} onHide={props.handleClose} centered>
            <Container style={{ paddingBottom: '1rem' }}>
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
                                <Form.Control as="select" size="sm" 
                                onChange={(e) => setLeaveType(e.target.value)}>
                                    <option value=''>Select</option>
                                    <option value="planned">Planned Leaves</option>
                                    <option value="unplanned">Unplanned Leaves</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {leaveType == 'select' && ''}
                       {leaveType == 'planned' ? 
                        <React.Fragment>
                            <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">Sub Leave Type:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="select" size="sm" value={plannedLeave}
                                onChange={(e) => setPlannedLeave(e.target.value)}>
                                    <option value="general">General</option>
                                    <option value="maternity">Maternity</option>
                                    <option value="paternity">Paternity</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                         <Form.Group as={Row}>
                         <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                         <Col sm="3" className="padding-left">
                             <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                 dateFormat="MM/dd/yyyy" filterDate={isWeekDay} minDate={today}
                                 placeholderText ="MM/dd/yyy" showMonthYearDropdown />
                         </Col>
                         <Form.Label column sm="3" className="padding-right"
                             style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                         <Col sm="3" className="padding-left">
                             <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                 dateFormat="MM/dd/yyyy" filterDate={isWeekDay} 
                                 minDate={startDate}
                                 placeholderText ="MM/dd/yyy" showMonthYearDropdown />
                         </Col>
                     </Form.Group>
                     </React.Fragment>
                       : ''}
                       {leaveType == 'unplanned' ? 
                        <React.Fragment>
                            <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">Sub Leave Type:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="select" size="sm" value={unplannedLeave}
                                onChange={(e) => setUnplannedLeave(e.target.value)}>
                                    <option value="general">General</option>
                                    <option value="paternity">Paternity</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                         <Form.Group as={Row}>
                         <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                         <Col sm="3" className="padding-left">
                             <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                 dateFormat="MM/dd/yyyy" filterDate={isWeekDay} maxDate={maxDate}
                                 placeholderText ="MM/dd/yyy" showMonthYearDropdown />
                         </Col>
                         <Form.Label column sm="3" className="padding-right"
                             style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                         <Col sm="3" className="padding-left">
                             <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                 dateFormat="MM/dd/yyyy" filterDate={isWeekDay} 
                                 maxDate={startDate}
                                 placeholderText ="MM/dd/yyy" showMonthYearDropdown />
                         </Col>
                     </Form.Group>
                     </React.Fragment>
                       : ''}
                        
                       
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">Balance leaves:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control type="number" size="sm" name="balanceLeave" value={balanceLeave}
                                onChange={(event) => {setBalanceLeave(event.target.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="textarea" rows="3" size="sm" name="reason" value={reason}
                                onChange={(event) => setReason(event.target.value)} />
                            </Col>
                        </Form.Group>
                        <Button onClick={(e) => applyLeaves(e)} type="submit" className="submit-button" size="sm">Submit</Button>
                    </Form>

                </Modal.Body>
            </Container>
        </Modal>
       </React.Fragment>
    );
};

export default LeaveAdd;