import React, { useState, useContext, useEffect } from 'react';

import { Container, Row, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeaveContext } from '../../context/LeaveState'
import { AppContext } from "../../context/AppState";

import moment from 'moment'

const EditLeave = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [startMaternityDate, setStartMaternityDate] = useState(new Date())
    const [endMaternityDate, setEndMaternityDate] = useState()
    const [leave, setLeave] = useState('')
   /*  const [leaveTypeId] = useState(null)
    const [leaveName] = useState('') */
    const [ltId, setltId] = useState(null)
    const [reason, setReason] = useState()
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    const [editMsg, setEditMsg] = useState(false)
    let history = useHistory();

    const { getLeave, leaveType, addPopup, editEmpList, editPopup, editLeavesData} = useContext(LeaveContext);

    const { user } = useContext(AppContext);

    const today = new Date()
    const currentYear = new Date('2020-01-01')
    const nextYear = new Date('2020-12-31')

    useEffect(() => {
        setStartDate(new Date(props.fromDate))
        setStartMaternityDate(new Date(props.fromDate))
    }, [props.fromDate])

    useEffect(() => {
        setEndDate(new Date(props.toDate))
        setEndMaternityDate(new Date(props.toDate))
    }, [props.toDate])

    useEffect(() => {
        setLeave(props.leaveTypeId)
    }, [props.leaveTypeId])

    useEffect(() => {
        setReason(props.reason)
    }, [props.reason])

    useEffect(() => {
        setltId(props.ltId)
    }, [props.ltId])

    const fromDateHandler = (date) => {

        let value = date
        console.log("fromDateHandler value", value)

        setStartDate(value);
        var newData
        if(startDate > new Date()){
             newData = 'Planned'
        }
        else{
             newData = 'Unplanned'
        }
        const newPopup = {
            empId: user.employeeId,
            fromDate: moment(value).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: newData,
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: ltId,
            numberOfDays: 0,
            reason: 'string',
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
        setEditMsg(true)
        editPopup(newPopup)
        
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
       /*  setEditLeavesMsg(true) */

    }

    const toDateHandler = (date) => {
        let value1 = date
        console.log("toDateHandler value", value1)
        setEndDate(value1);
        var newData
        if(startDate > new Date()){
             newData = 'Planned'
        }
        else{
             newData = 'Unplanned'
        }
        const newPopup = {
            empId: user.employeeId,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: newData,
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
            leaveTypeId: leave,
            ltId: ltId,
            numberOfDays: 0,
            reason: 'string',
            status: 1,
            toDate: moment(value1).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
        editPopup(newPopup)
        setEditMsg(true)
        /* setEditLeavesMsg(true) */
    }
    
    const setStartMaternityDateHandler = (date) => {
        let value2 = date
        setStartMaternityDate(value2)
console.log("value 2", value2)
        var d1 = new Date(value2);
        var d2 = new Date(d1)
        var d3 = d2.setDate(d2.getDate() + 179)
        console.log("d3", moment(d3).format("YYYY-MM-DD"))

        const editPopupData = {
            empId: user.employeeId,
            fromDate: moment(value2).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory:'Planned',
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: ltId,
            numberOfDays: 0,
            reason: 'string',
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
        console.log("editPopupData", editPopupData)
        editPopup(editPopupData)
        setEditMsg(true)
        /* setEditLeavesMsg(true) */
    }

    const setLeaveHandler = (e) => {
        const leave1 = e.target.value
        setLeave(leave1)
        console.log("leave1++++++", leave1)
    }
    //Maternity Date validation
    let d1 = new Date(startMaternityDate);
    let d2 = new Date(d1)
    let d3 = d2.setDate(d2.getDate() + 179)


    //get api for leave type
    useEffect(() => {
        getLeave(user.employeeId);
    }, [user.employeeId]);

    // create api
    const onSubmit = e => {
        e.preventDefault()
console.log("startMaternityDate",moment(startMaternityDate).format("YYYY-MM-DD"))
console.log("d3",moment(d3).format("YYYY-MM-DD"))

        const editLeave = {
            empId: user.employeeId,
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: 'Planned',
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
            leaveTypeId: leave,
            ltId: ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
        var newData
        if(startDate > new Date()){
             newData = 'Planned'
        }
        else{
             newData = 'Unplanned'
        }
        const editLeave1 = {
            empId: user.employeeId,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: newData,
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
            leaveTypeId: leave,
            ltId: ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
        if (leave === 3) {
          console.log("edit leave data for maternity----", editLeave)
          editEmpList(editLeave)
        }
        else {
            console.log("edit leave data for general----", editLeave1)
            editEmpList(editLeave1)
        }

        history.push("/Leaves/LeaveView");
        setEditMsg(false)


        const setModal = props.handleEditClose;
        setModal()
        setDisable(true)
        setMin(false)
        setMax(false)
        setEndDate(new Date(props.toDate))
        setStartDate(new Date(props.fromDate))
        setLeave(props.leaveTypeId)
        setReason(props.reason)
        setStartMaternityDate(new Date(props.fromDate))
        setltId(null)
        setEditMsg(false)

    }
    const onCloseModal = () => {
       /*  const resetValue = {
            empId: user.employeeId,
            fromDate: '',
            leaveCategory: '',
            leaveTypeId: 0,
            ltId: null,
            numberOfDays: 0,
            reason: 'string',
            status: 0,
            toDate: '',
            viewLeavePopup: 0,
            year: '',
            editMsg: false
        } */
        const setModal = props.handleEditClose;
        setModal()
        setDisable(true)
        setMin(false)
        setMax(false)
        setEndDate(new Date(props.toDate))
        setStartDate(new Date(props.fromDate))
        setLeave(props.leaveTypeId)
        setReason(props.reason)
        setStartMaternityDate(new Date(props.fromDate))
        setEndMaternityDate(new Date(props.toDate))
       /*  addPopup(resetValue) */
        setltId(null)
        setEditMsg(false)
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleEditClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header>
                        <Modal.Title >
                            <h5 className="modal-heading">Edit Leave</h5>
                        </Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" 
                        onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group as={Row} style={{display:'none'}}>
                                <Form.Control type="text" value={ltId} onChange={(e) => setltId(e)} />
                            </Form.Group>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Leave Type:</Form.Label>
                                        <Form.Control as="select" required value={leave}
                                            onChange={(e) => setLeaveHandler(e)}>
                                            <option value="">Select</option>

                                            {leaveType!==undefined? leaveType.map((item, i) => {
                                                return (
                                                    <option key={item.leaveTypeId} value={item.leaveTypeId}
                                                        disabled={(item.paternity === 1 ? true : false) || (item.maternity === 1 ? true : false)} >
                                                        {item.leaveName}</option>
                                                )
                                            }) : ""
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                            {leave === 3 ?
                                    <Row style={{margin:'0'}}>
                                        <div classNmae="col-sm-6">
                                            <Form.Group>
                                                <div><Form.Label >From Date:</Form.Label></div>
                                                <div><DatePicker selected={startMaternityDate} onChange={(date) => setStartMaternityDateHandler(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                    endDate={d3}
                                                    minDate={new Date()}
                                                    placeholderText="From Date" required /></div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Group>
                                            <div> <Form.Label >To Date:</Form.Label></div>
                                                <div><DatePicker selected={d3} selectsEnd startDate={startMaternityDate} readOnly
                                                    endDate={d3} onChange={(date) => setEndMaternityDate(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    minDate={startMaternityDate}
                                                    placeholderText="To Date" /></div>
                                            </Form.Group>
                                        </div>
                                    </Row>:

                                <Row>
                                    <div className="col-sm-6">
                                        <Form.Group>
                                            <div><Form.Label>From Date:</Form.Label></div>
                                            <div>
                                            <DatePicker selected={startDate} onChange={(e) => fromDateHandler(e)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                minDate={currentYear} maxDate={nextYear}
                                                placeholderText="From Date" required />
                                                </div>
                                        </Form.Group>
                                    </div>
                                    {disable &&
                                        <div className="col-sm-6">
                                            <div><Form.Label>To Date:</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                /*  maxDate={maxToDate} */
                                                placeholderText="To Date" disabled={true} />
                                                </div>
                                        </div>
                                    }
                                    {min &&
                                        <div className="col-sm-6">
                                            <div><Form.Label>To Date:</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(date) => toDateHandler(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                minDate={startDate} maxDate={nextYear}
                                                placeholderText="To Date" required /></div>
                                        </div>
                                    }
                                    {max &&

                                        <div className="col-sm-6">
                                           <div><Form.Label>To Date:</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(date) => toDateHandler(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    maxDate={today}
                                                    minDate={startDate}
                                                    placeholderText="To Date" /></div>
                                        </div>
                                        }

                                </Row>
                             
                            }
                          {
                                editMsg === true ? 
                            <Row>
                                <div className="col-sm-12">
                                   {/*  <p className="leavesMsg">{leavesData ? leavesData.Leave : ''}</p> */}
                                    {editLeavesData ?
                                    <p className="leavesMsg">{editLeavesData.Leave}</p> :'' }
                                </div>
                            </Row> : ''}

                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                    <Form.Label>Reason:</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="reason" value={reason}
                                        onChange={(event) => setReason(event.target.value)} required />
                                    </Form.Group>
                                </div>
                            </Row>

                            <Button type="submit" className="submitButton">Submit</Button>
                           
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>
        </React.Fragment>
    );
};

export default EditLeave;