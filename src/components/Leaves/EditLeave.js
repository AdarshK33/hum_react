import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {LeaveContext} from '../../context/LeaveState'
import {format} from 'date-fns'
import moment from 'moment'

const EditLeave = (props) => {
    const [startDate, setStartDate] = useState(new Date(props.fromdate));
    const [endDate, setEndDate] = useState(new Date(props.todate))
    const [leave, setLeave] = useState(props.leavecategory)
    const [reason, setReason] = useState(props.reason)
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    let history = useHistory();
   

    const {getLeave, leaveType, leaveList, editList, viewList, message} = useContext(LeaveContext);
    
const today = new Date()

    const fromDateHandler = (date) => {
        let value = date
        setStartDate(value);

        //For disable the To Date initially
        setDisable(false)

        if (value <= new Date() ){
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
    //get api for leave type
    useEffect(() => { 
        getLeave();  
      }, []); 
      
    // create api
    const onSubmit =  e => {
        e.preventDefault()
        
        const editLeave = {
            empId: 'DSI000035',
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveCategory: leave,
            leaveTypeId: 1,
            ltId: props.leaveid,
            numberOfDays: 0,
            reason: reason,
            status:0,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup:1,
            year:'2020'
        }
         editList(editLeave)
         console.log("editList for edit api", editLeave)
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
                        <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Leave Id:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control type="text"  size="sm" name="leave_id" 
                                        disabled defaultValue={props.leaveid} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm" required defaultValue={props.leavecategory} value={leave}
                                    onChange={(e) => setLeave(e.target.value)}>
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
        
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="textarea" rows="3" size="sm" name="reason" defaultValue={props.reason}
                                      value={reason}  onChange={(event) => setReason(event.target.value)} />
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