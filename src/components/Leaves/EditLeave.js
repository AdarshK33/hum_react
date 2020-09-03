import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { LeaveContext } from '../../context/LeaveState'
import { format } from 'date-fns'
import moment from 'moment'

const EditLeave = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [startMaternityDate, setStartMaternityDate] = useState(new Date())
    const [endMaternityDate, setEndMaternityDate] = useState(new Date())
    const [leave, setLeave] = useState('')
    const [leaveTypeId] = useState(null)
    const [leaveName] = useState('')
    const [ltId, setltId] = useState()
    const [reason, setReason] = useState()
=======
import {LeaveContext} from '../../context/LeaveState'
import {format} from 'date-fns'
import moment from 'moment'

const EditLeave = (props) => {
    const [startDate, setStartDate] = useState(new Date(props.fromdate));
    const [endDate, setEndDate] = useState(new Date(props.todate))
    const [startMaternityDate, setMaternityDate] = useState(new Date(props.fromdate))
    const [leave, setLeave] = useState(props.leavecategory)
    const [leaveTypeId] = useState(null)
    const [leaveName] = useState(null)
    const [reason, setReason] = useState(props.reason)
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    let history = useHistory();

<<<<<<< HEAD
    const { getLeave, leaveType, leaveList, editList, viewList, message } = useContext(LeaveContext);

    const today = new Date()
    console.log("fromDate", new Date(props.fromDate))

    useEffect(() => {
        setStartDate(new Date(props.fromDate))
        setStartMaternityDate(new Date(props.fromDate))
    }, [props.fromDate])

    useEffect(() => {
        setEndDate(new Date(props.toDate))
    }, [props.toDate])

    useEffect(() => {
        setLeave(props.leaveCategory)
    }, [props.leaveCategory])

    useEffect(() => {
        setltId(props.ltId)
    }, [props.ltId])


    const fromDateHandler = (date) => {

        let value = date
        console.log("fromDateHandler value", value)

=======
    const {getLeave, leaveType, leaveList, editList, viewList, message} = useContext(LeaveContext);
    
const today = new Date()

const endMaternityDate = new Date().setDate(startMaternityDate.getDate() + 179)

    const fromDateHandler = (date) => {
        let value = date
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
        setStartDate(value);

        //For disable the To Date initially
        setDisable(false)

<<<<<<< HEAD
        if (value <= new Date()) {
            setMax(true);
            setMin(false);
        }

        if (value > new Date()) {
            setMin(true);
            setMax(false);
        }
=======
        if (value <= new Date() ){
            setMax(true);
            setMin(false);
        }
        
         if (value > new Date()) {
             setMin(true);
             setMax(false);
         }
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e

    }

    const toDateHandler = (date) => {
        let value1 = date
<<<<<<< HEAD
        console.log("toDateHandler value", value1)
        setEndDate(value1);
    }

    const setLeaveHandler = (e) => {
        const leave1 = e.target.value
        setLeave(leave1)

        const test1 = leaveType.filter(qa => qa.leaveName === leave1)[0].leaveName
        const test2 = leaveType.filter(qa => qa.leaveName === leave1)[0].leaveTypeId
        console.log("test1 as leave name", test1)
        console.log("test2 as leave id", test2)
    }
    //Maternity Date validation
    let d1 = new Date(startMaternityDate);
    let d2 = new Date(d1)
    let d3 = d2.setDate(d2.getDate() + 179)


    //get api for leave type
    useEffect(() => {
        getLeave();
    }, []);

    // create api
    const onSubmit = e => {
        e.preventDefault()

        const editLeave = {
            empId: 'DSI000035',
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endMaternityDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
=======
        setEndDate(value1);
    }
    //get api for leave type
    useEffect(() => { 
        getLeave();  
      }, []); 
      
    // create api
    const onSubmit =  e => {
        e.preventDefault()
        
        const editLeave = {
            empId: 'DSI000035',
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: leave,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: props.leaveltId,
            numberOfDays: 0,
            reason: reason,
            status:0,
            toDate: moment(endMaternityDate).format("YYYY-MM-DD"),
            viewLeavePopup:1,
            year:'2020'
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
        }
        const editLeave1 = {
            empId: 'DSI000035',
            fromDate: moment(startDate).format("YYYY-MM-DD"),
<<<<<<< HEAD
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
        if (leave == 'Maternity') {
            editList(editLeave)
        }
        else {
            editList(editLeave1)
        }

        history.push("/Leaves/LeaveView");


        const setModal = props.handleEditClose;
        setModal()
        setLeave(leave)
        setReason(reason)
        setStartDate(startDate)
        setEndDate(endDate)
        setDisable(true)
        setMin(false)
        setMax(false)

=======
            leaveCategory: leave,
            leaveTypeId:  leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: props.leaveltId,
            numberOfDays: 0,
            reason: reason,
            status:0,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup:1,
            year:'2020'
        }
        if(leave == 'Maternity'){
            editList(editLeave)
           }
           else{
            editList(editLeave1)
           }
        
         history.push("/Leaves/LeaveView");

        
         const setModal = props.handleEditClose;
         setModal()
         setLeave(leave)
         setReason(reason)
         setStartDate(startDate)
         setEndDate(endDate)
         setDisable(true)
         setMin(false)
         setMax(false)
        
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleEditClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header closeButton>
                        <Modal.Title >
                            <h5 className="modal-heading">Edit Leave</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
<<<<<<< HEAD
                            <Form.Group as={Row} style={{display:'none'}}>
                                <Form.Control type="text" value={ltId} onChange={(e) => setltId(e)} />
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm"  value={leave}
                                        onChange={(e) => setLeaveHandler(e)} required>
                                        {leaveType.length > 0 && leaveType.map((item, i) => {
                                            return (
                                                <option key={item.leaveTypeId} value={item.leaveName} >{item.leaveName}</option>
                                            )
                                        })
                                        }
=======
                            {/* <Form.Group as= {Row}>
                                <Form.Control type="text" defaultValue={props.leaveltId} />
                            </Form.Group> */}
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm" defaultValue={props.leavecategory} value={leave}
                                    onChange={(e) => setLeave(e.target.value)}>
                                    {leaveType.length > 0 && leaveType.map((item, i) => {
                                        return (
                                            <option key={item.leaveTypeId} value={item.leaveName} >{item.leaveName}</option>
                                        )
                                    })
                                    }
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            {leave == 'Maternity' ?
                                <React.Fragment>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                        <Col sm="3" className="padding-left">
<<<<<<< HEAD
                                            <DatePicker selected={startMaternityDate} onChange={(date) => setStartMaternityDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                endDate={d3}
=======
                                            <DatePicker selected={startMaternityDate} onChange={(date) => setMaternityDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                endDate={endMaternityDate}
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
                                                minDate={startMaternityDate}
                                                placeholderText="From Date" />
                                        </Col>

                                        <Form.Label column sm="3" className="padding-right"
                                            style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                        <Col sm="3" className="padding-left">
<<<<<<< HEAD
                                            <DatePicker  /* {...props.toDate} selected={new Date(props.toDate)} */
                                                selected={d3} readOnly selectsEnd startDate={startMaternityDate}
                                                endDate={d3} onChange={(date) => setEndMaternityDate(date)}
=======
                                            <DatePicker selected={endMaternityDate} readOnly selectsEnd startDate={startMaternityDate}
                                                endDate={endMaternityDate}
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                minDate={startMaternityDate}
                                                placeholderText="To Date" />
                                        </Col>
                                    </Form.Group>
<<<<<<< HEAD
                                </React.Fragment> :
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={startDate}
                                            onChange={(e) => fromDateHandler(e)}
                                            className="input_date" dateFormat="yyyy-MM-dd"
                                        />
                                    </Col>
                                    {disable &&
                                        <React.Fragment>
                                            <Form.Label column sm="3" className="padding-right"
                                                style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                            <Col sm="3" className="padding-left">
                                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    /*  maxDate={maxToDate} */
                                                    disabled={true} />
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
                                                />
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
                                                    maxDate={today} />
                                            </Col>
                                        </React.Fragment>}

                                </Form.Group>
=======
                                </React.Fragment>: 
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                <Col sm="3" className="padding-left">
                                    <DatePicker selected={startDate} onChange={(e) => fromDateHandler(e)}
                                        className="input_date" dateFormat="yyyy-MM-dd"
                                          />
                                </Col>
                                {disable &&
                                    <React.Fragment>
                                        <Form.Label column sm="3" className="padding-right"
                                            style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                        <Col sm="3" className="padding-left">
                                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                /*  maxDate={maxToDate} */
                                                 disabled={true} />
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
                                                />
                                        </Col>
                                    </React.Fragment>

                                }
                                {max &&
                                 <React.Fragment>
                                 <Form.Label column sm="3" className="padding-right"
                                     style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                 <Col sm="3" className="padding-left">
                                     <DatePicker selected={endDate}  onChange={(e) => toDateHandler(e)}
                                         className="input_date" dateFormat="yyyy-MM-dd"
                                         maxDate={today} />
                                 </Col>
                             </React.Fragment>}
                                
                            </Form.Group>
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
                            }
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                                <Col sm="9" className="padding-left">
<<<<<<< HEAD
                                    <Form.Control as="textarea" rows="3" size="sm" name="reason"
                                        defaultValue={props.reason} onChange={(event) => setReason(event.target.value)} />
=======
                                    <Form.Control as="textarea" rows="3" size="sm" name="reason" defaultValue={props.reason}
                                     value={reason} onChange={(event) => setReason(event.target.value)} />
>>>>>>> d302768cf7119a47aa3199219628ed09a3be895e
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

export default EditLeave;