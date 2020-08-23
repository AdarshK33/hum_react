import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {format} from 'date-fns'
import moment from 'moment'

const LeaveAdd = (props) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [leaveType, setLeaveType] = useState([])
    const [reason, setReason] = useState('')
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
const today = new Date()
/* 
    const tomorrow = new Date();
    const tomorrowDate = format(tomorrow, "dd-MM-yyyy")
    tomorrowDate.setDate(tomorrowDate.getDate() + 1); */
    /* const today = new Date();
   const todayDate = format(today, 'yyyy-MM-dd')
   console.log("new Date==================",todayDate) */

    /* const newDate = moment(startDate).format('YYYY-MM-DD')
    const newEndDate = moment(endDate).format('YYYY-MM-DD') */
    /* const newDate = format(startDate, 'yyyy-MM-dd')
    const newEndDate = format(endDate, 'yyyy-MM-dd')
    console.log("new Date==================",newDate) */

    const fromDateHandler = (date) => {
        let value = date
        console.log("value of From datepicker-----------", value)
        setStartDate(value);

        //For disable the To Date initially
        setDisable(false)
        console.log("disable value===", disable)

        if (value <= new Date() ){
            console.log("=============unplanned")
            setMax(true);
            setMin(false);
        }
        
         if (value > new Date()) {
             console.log("=============planned")
             setMin(true);
             setMax(false);
         }

    }

    const toDateHandler = (date) => {
        let value1 = date
        console.log("value of To datepicker-----------", value1)
        setEndDate(value1);
    }
    
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

        const GetLeave = async () => {  
      
          const result = await axios('http://humine.theretailinsights.co/leave_type/view',{
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk4MTg5MTM2LCJpYXQiOjE1OTgxNTMxMzZ9.6sXI_un5_zPkC6rFfwy7ZOYdl6Nr81TzFl3EMJ9Hkaw'   
              }
          });  
          const leaveType = result.data.data
          setLeaveType(leaveType);  
          console.log("GET API Leave type respone=====",result.data.data.leaveName)
      
        }; 
      
        GetLeave();  
      }, []); 

    // create api
    const applyLeaves = async (event) => {
        event.preventDefault()
        const cflag = validation();

        if (cflag) {
            toast.info("Leave applied successfully")
            const setModal = props.handleClose;
            setModal()
            setReason('')
            setStartDate()
            setEndDate()
            setDisable(true)
            setMin(false)
            setMax(false)
        }
        const applyLeave = {
            empId: 'DSI000035',
            startDate:'2020-08-23',
            leaveTypeId:1,
            leaveType:'general',
            ltId: 0,
            numberOfDays: 0,
            reason,
            status:0,
            endDate:'2020-08-25',
            viewLeavePopup:0,
            year:'2020'
        }
        axios.post('http://humine.theretailinsights.co/leave_transaction/create', applyLeave, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk4MTg5MTM2LCJpYXQiOjE1OTgxNTMxMzZ9.6sXI_un5_zPkC6rFfwy7ZOYdl6Nr81TzFl3EMJ9Hkaw'
            }
        })
            .then((result) => {
                console.log("Create API response======", result)
            });
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
                        <Form onSubmit={applyLeaves}>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm" required>
                                        {leaveType.length>0 && leaveType.map((item, i) => {
                                            return(
                                                <option key={item.leaveTypeId} value={item.leaveName}>{item.leaveName}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                <Col sm="3" className="padding-left">
                                    <DatePicker selected={startDate} onChange={(e) => fromDateHandler(e)}
                                        className="input_date" dateFormat="yyyy-MM-dd"
                                        placeholderText="From Date"/>
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

                            <Form.Group as={Row}>
                                <Col sm="3"></Col>
                                <Col sm="9" className="padding-left">
                                    <p></p>
                                </Col>
                            </Form.Group>
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