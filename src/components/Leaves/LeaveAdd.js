import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeaveContext } from '../../context/LeaveState'
import { format } from 'date-fns'
import moment from 'moment'

const LeaveAdd = (props) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [startMaternityDate, setMaternityDate] = useState(new Date())
    const [leave, setLeave] = useState('')
    const [leaveTypeId] = useState(null)
    const [leaveName] = useState(null)
    const [reason, setReason] = useState('')
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    let history = useHistory();


    const { addLeave, addPopup, leavesData, getLeave, leaveType, leaveList, message } = useContext(LeaveContext);

    const today = new Date()

    const endMaternityDate = new Date().setDate(startMaternityDate.getDate() + 179)

    const fromDateHandler = (date) => {
        let value = date
        setStartDate(value);

        //For disable the To Date initially
        setDisable(false)

        if (value <= new Date()) {
            setMax(true);
            setMin(false);
        }

        if (value > new Date()) {
            setMin(true);
            setMax(false);
        }

    }

    const toDateHandler = (date) => {
        let value1 = date
        setEndDate(value1);
    }

  /*   const handleSelectChenge = (e) => {
        const leaveData = e.target.value
        setLeave(leaveData)
        const ld = leaveType.filter(qa => qa.leaveName === leaveData)[0].leaveTypeId
        console.log("id",ld)
        console.log("leave", leave)
    } */
  
    // Fields validation
    const validation = (event) => {
        let flag = true

        if (reason == '') {
            toast.info("Reason is mandatory")
            flag = false;
            return;
        }
        return flag;
    }
    //get api for leave type
    useEffect(() => {
        getLeave();
    }, []);


    // create api
    const onSubmit = e => {
        e.preventDefault()
        const cflag = validation();

        if (cflag) {
            const setModal = props.handleClose;
            setModal()
            setReason('')
            setStartDate()
            setEndDate()
            setDisable(true)
            setMin(false)
            setMax(false)
        }
      
        const newLeave1 = {
            empId: 'DSI000035',
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 0,
            toDate: moment(endMaternityDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
      
        const newLeave = {
            empId: 'DSI000035',
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 0,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }

        if (leave == 'Maternity') {
            addLeave(newLeave1)
        }
        else {
            addLeave(newLeave)
        }
        history.push("/Leaves/LeaveView");

        
        const newPopup1 = {
            empId: 'DSI000035',
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 0,
            toDate: moment(endMaternityDate).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }

        const newPopup = {
            empId: 'DSI000035',
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 0,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
      
        if (leave == 'Maternity') {
            addPopup(newPopup1)
        }
        else {
            addPopup(newPopup)
        }

        history.push("/Leaves/LeaveView");
    }
console.log("leave", leave)
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
                        <Form onSubmit={onSubmit}>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm" required value={leave} 
                                        onChange={(e) => setLeave(e.target.value)}>
                                        {leaveType.length > 0 && leaveType.map((item, i) => {
                                            return (
                                                <option key={item.leaveTypeId} value={item.leaveName}>{item.leaveName}</option>
                                            )
                                        })
                                        }
                                      
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            {leave == 'Maternity' ?
                                <React.Fragment>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                        <Col sm="3" className="padding-left">
                                            <DatePicker selected={startMaternityDate} onChange={(date) => setMaternityDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                endDate={endMaternityDate}
                                                minDate={startMaternityDate}
                                                placeholderText="From Date" />
                                        </Col>

                                        <Form.Label column sm="3" className="padding-right"
                                            style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                        <Col sm="3" className="padding-left">
                                            <DatePicker selected={endMaternityDate} readOnly selectsEnd startDate={startMaternityDate}
                                                endDate={endMaternityDate}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                minDate={startMaternityDate}
                                                placeholderText="To Date" />
                                        </Col>
                                    </Form.Group>
                                </React.Fragment> :

                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={startDate} onChange={(e) => fromDateHandler(e)}
                                            className="input_date" dateFormat="yyyy-MM-dd"
                                            placeholderText="From Date" />
                                    </Col>
                                    {disable &&
                                        <React.Fragment>
                                            <Form.Label column sm="3" className="padding-right"
                                                style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                            <Col sm="3" className="padding-left">
                                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    /*  maxDate={maxToDate} */
                                                    placeholderText="To Date" disabled={true} />
                                            </Col>
                                        </React.Fragment>
                                    }

                                    {min &&
                                        <React.Fragment>
                                            <Form.Label column sm="3" className="padding-right"
                                                style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                            <Col sm="3" className="padding-left">
                                                <DatePicker selected={endDate} onChange={(e) => toDateHandler(e)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    minDate={startDate}
                                                    placeholderText="To Date" />
                                            </Col>
                                        </React.Fragment>

                                    }
                                    {max &&
                                        <React.Fragment>
                                            <Form.Label column sm="3" className="padding-right"
                                                style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                            <Col sm="3" className="padding-left">
                                                <DatePicker selected={endDate} onChange={(e) => toDateHandler(e)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    maxDate={today}
                                                    placeholderText="To Date" />
                                            </Col>
                                        </React.Fragment>}

                                </Form.Group>
                            }
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="textarea" rows="3" size="sm" name="reason" value={reason}
                                        onChange={(event) => setReason(event.target.value)} />
                                </Col>
                            </Form.Group>
                            
                            <Button type="submit" className="submit-button" size="sm">Submit</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>
        </React.Fragment>
    );
};

export default LeaveAdd;