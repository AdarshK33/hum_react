import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveAdd = (props) => {
    const [empId, setEmpId] = useState('DSI000035')
    const [ltId, setLtId] = useState()
    const [numberOfDays, setNumberOfDays] = useState()
    const [status, setStatus] = useState()
    const [viewLeavePopup, setViewLeavePopup] = useState()
    const [year, setYear] = useState('2020')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [leaveType, setLeaveType] = useState()
    const [reason, setReason] = useState('')
    const [disable, setDisable] = useState(true)

    /*  const isWeekDay = date => {
         if (date.getDay() === 0 || date.getDay() === 6) {
             return false;
         } else {
             return true;
         }
     } */

    const today = new Date();
    today.setDate(today.getDate() + 1);

    const fromDateHandler = (date) => {
        let value = date
        console.log("value of datepicker-----------", value)
        setStartDate(value);

        //For disable the To Date initially
        setDisable(false)
            console.log("disable value===", disable)
        
        if(startDate == value){
            console.log("StartDate======", startDate)
        }
    }
   

    const maxFromDate = new Date();
    maxFromDate.setDate(maxFromDate.getDate() - 1);

   

    const validation = (event) => {
        let flag = true

        if (reason == '') {
            toast.info("Reason is mandatory")
            flag = false;
            return;
        }
        return flag;
    }

    const applyLeaves = async (event) => {
        event.preventDefault()
        const cflag = validation();

        if (cflag) {
            toast.info("Leave applied successfully")
            const setModal = props.handleClose;
            setModal()
            setReason('')
            setStartDate(new Date())
            setEndDate(new Date())
            setLeaveType('')
        }
        const applyLeave = {
            empId,
            startDate,
            leaveType,
            ltId,
            numberOfDays,
            status,
            endDate,
            viewLeavePopup,
            year
        }
        axios.post('http://humine.theretailinsights.co/leave_transaction/create', applyLeave, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3ODg3NDk1LCJpYXQiOjE1OTc4NTE0OTV9.HEgvqgeA6QLVoooPhjLSi6jozdMwn-KvPqujkFsWUe4'
            }
        })
            .then((result) => {
                console.log("Create API response======", result)
            });
        /*  fetch('http://humine.theretailinsights.co/leave_transaction/create',{
             method: 'Post',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3ODQ5NzgwLCJpYXQiOjE1OTc4MTM3ODB9.ijcUbY1vIrT2AiLRgKPxEA2PLHKb-5HPUAFmeWBZAEk'   
             },
             body: JSON.stringify(applyLeave)
         }).then((result) => {
             result.json().then((response) => {
                 console.log("create api response=======",response)
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
                        <Form onSubmit={applyLeaves}>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm"
                                        onChange={(e) => setLeaveType(e.target.value)} required>
                                        <option value="planned" >General Leaves</option>
                                        <option value="unplanned">Maternity Leaves</option>
                                        <option value="unplanned">Paternity Leaves</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                <Col sm="3" className="padding-left">
                                    <DatePicker selected={startDate} onChange={(e) => fromDateHandler(e)}
                                        className="input_date"
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="From Date" required />
                                </Col>
                                {disable ?
                                    <React.Fragment>
                                        <Form.Label column sm="3" className="padding-right"
                                        style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                            className="input_date"
                                            dateFormat="MM/dd/yyyy"
                                            /*  maxDate={maxToDate} */
                                            placeholderText="To Date" disabled={true} />
                                    </Col>
                                    </React.Fragment>
                                 :
                                   <React.Fragment>
                                        <Form.Label column sm="3" className="padding-right"
                                        style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                            className="input_date"
                                            dateFormat="MM/dd/yyyy"
                                            /*  maxDate={maxToDate} */
                                            placeholderText="To Date"  />
                                    </Col> 
                                   </React.Fragment>   
                                }

                            </Form.Group>

                            {/* {leaveType == 'unplanned' ?
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                            className="input_date"
                                            dateFormat="MM/dd/yyyy"  maxDate={maxFromDate}
                                            placeholderText="MM/dd/yyy" required />
                                    </Col>
                                    <Form.Label column sm="3" className="padding-right"
                                        style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                            className="input_date"
                                            dateFormat="MM/dd/yyyy"
                                            maxDate={maxToDate}
                                            placeholderText="MM/dd/yyy" required />
                                    </Col>
                                </Form.Group>
                                :
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" className="padding-right">From Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                            className="input_date"
                                            dateFormat="MM/dd/yyyy" minDate={today}
                                            placeholderText="MM/dd/yyy" required />
                                    </Col>
                                    <Form.Label column sm="3" className="padding-right"
                                        style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                    <Col sm="3" className="padding-left">
                                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                            className="input_date"
                                            dateFormat="MM/dd/yyyy" 
                                            minDate={startDate}
                                            placeholderText="MM/dd/yyy" required />
                                    </Col>
                                </Form.Group>
                            }
 */}

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