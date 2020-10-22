import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeaveContext } from '../../context/LeaveState'
import { AppContext } from "../../context/AppState";
import moment from 'moment'

const ManagerLeaveEdit = (props) => {
    const [empId, setEmpId] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [startMaternityDate, setStartMaternityDate] = useState(new Date())
    const [endMaternityDate, setEndMaternityDate] = useState(new Date())
    const [leave, setLeave] = useState('')
    /* const [leaveTypeId] = useState(null)
    const [leaveName] = useState('') */
    const [ltId, setltId] = useState()
    const [reason, setReason] = useState()
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    const [editMsg, setEditMsg] = useState(false)
    let history = useHistory();

    const { getLeave, leaveType, editList, addPopup, editPopup, editLeavesData  } = useContext(LeaveContext);

    const { user } = useContext(AppContext);

    const today = new Date()
    
    let nextYear = new Date()
    nextYear.setFullYear(nextYear.getFullYear(), 11, 31)

    let currentYear = new Date()
    currentYear.setFullYear(currentYear.getFullYear(), 0, 1)

    useEffect(() => {
        setStartDate(new Date(props.fromDate))
        setStartMaternityDate(new Date(props.fromDate))
    }, [props.fromDate])

    useEffect(() => {
        setEndDate(new Date(props.toDate))
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
    
    useEffect(() => {
        setEmpId(props.empId)
     },[props.empId])

     useEffect(() => {
        getLeave(props.empId)
    }, [props.empId]);
   
    
    console.log("emp in edit", props.empId)

    const fromDateHandler = (date) => {

        let value = date
        console.log("fromDateHandler value", value)

        setStartDate(value);
        setEndDate()
        setEditMsg(false)

        /* var newData
        if(startDate > new Date()){
             newData = 'Planned'
        }
        else{
             newData = 'Unplanned'
        }
        const newPopup = {
            empId: empId,
            fromDate: moment(value).format("YYYY-MM-DD"),
           leaveCategory: newData,
            leaveTypeId: leave,
            ltId: ltId,
            numberOfDays: 0,
            reason: 'string',
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: new Date().getFullYear()
        }
        setEditMsg(true)
        editPopup(newPopup) */
       

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
        setEditMsg(false)

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
            empId: empId,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            /* leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
            leaveCategory: newData,
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: props.ltId,
            numberOfDays: 0,
            reason: 'string',
            status: 1,
            toDate: moment(value1).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: new Date().getFullYear()
        }
        editPopup(newPopup)
        setEditMsg(true)
    }

    const setStartMaternityDateHandler = (date) => {
        let value2 = date
        setStartMaternityDate(value2)

        var d1 = new Date(value2);
        var d2 = new Date(d1)
        var d3 = d2.setDate(d2.getDate() + 179)

        const editPopupData = {
            empId: empId,
            fromDate: moment(value2).format("YYYY-MM-DD"),
            /* leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
            leaveCategory: 'Planned',
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
            leaveTypeId: leave,
            ltId: props.ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: new Date().getFullYear()
        }
        console.log("editPopupData", editPopupData)
        editPopup(editPopupData)
        setEditMsg(true)
    }
    const setLeaveHandler = (e) => {
        const leave1 = e.target.value
        setLeave(leave1)

    }
     //Maternity Date validation
     let d1 = new Date(startMaternityDate);
     let d2 = new Date(d1)
     let d3 = d2.setDate(d2.getDate() + 179)


    // create api
    const onSubmit = e => {
        e.preventDefault()
        console.log("startMaternityDate",moment(startMaternityDate).format("YYYY-MM-DD"))
        console.log("d3",moment(d3).format("YYYY-MM-DD"))
        var newData
        if(startDate > new Date()){
             newData = 'Planned'
        }
        else{
             newData = 'Unplanned'
        }
        const editLeave = {
            empId: empId,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
          /*   leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
          leaveCategory: newData,
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: props.ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: new Date().getFullYear()
        }
        const editLeave1 = {
            empId: empId,
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: 'Planned',
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
            leaveTypeId: leave,
            ltId: props.ltId,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: new Date().getFullYear()
        }
        if (leave === 3) {
            console.log("edit leave data for maternity----", editLeave1)
              editList(editLeave1)
          }
          else {
            console.log("edit leave data for general----", editLeave)
              editList(editLeave)
          }
            history.push("/managerleaves");
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
        setEditMsg(false)

    }
    const onCloseModal = () => {
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
       /*  addPopup(resetValue) */
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
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Label>Employee Id:</Form.Label>
                                    <Form.Control size="sm" type="text" value={empId || ''} readOnly
                                     onChange={(e) => setEmpId(e)} />
                                </div>
                            </Row><br/>
                            {/* <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Employee Name</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control size="sm" type="text" value={name} onChange={(e) => setName(e)} />
                                </Col>
                            </Form.Group> */}
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Label>Leave Type:</Form.Label>
                                    <Form.Control as="select" size="sm"  value={leave}
                                        onChange={(e) => setLeaveHandler(e)} required>
                                            <option value="">Select</option>
                                        {leaveType !== undefined &&  leaveType !== null && 
                                        leaveType.map((item, i) => {
                                            return (
                                                <option key={item.leaveTypeId} value={item.leaveTypeId} 
                                                disabled={(item.paternity === 1 ? true : false) || (item.maternity === 1 ? true : false)}>
                                                    {item.leaveName}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                </div>
                            </Row><br/>
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
                                                    placeholderText="To Date" required /></div>
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
                                    <p className="leavesMsg" style={{color:'red', fontWeight:'bold'}}>{editLeavesData.Leave}</p> : ''}
                                </div>
                            </Row> :''
                            }
                           

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

export default ManagerLeaveEdit;