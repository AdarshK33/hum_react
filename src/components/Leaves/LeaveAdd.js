import React, { useState, useContext, useEffect } from 'react';
import { Container, Row,  Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeaveContext } from '../../context/LeaveState'
import { AppContext } from "../../context/AppState";
import moment from 'moment'

const LeaveAdd = (props) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [startMaternityDate, setStartMaternityDate] = useState(new Date())
    const [endMaternityDate, setEndMaternityDate] = useState()
    const [leave, setLeave] = useState('')
   /*  const [leaveName, setLeaveName] = useState('')
    const [leaveTypeId, setLeaveTypeId] = useState(null) */
    const [reason, setReason] = useState('')
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    const [editMsg, setEditMsg] = useState(false)
   /*  const [modal, setModal] = useState(false) */
    
    let history = useHistory();


    const { addEmpLeave, addPopup, leavesData, getLeave, leaveType, viewLeaveData, viewEmpData }
        = useContext(LeaveContext);

    const { user } = useContext(AppContext);
    
   /*  useEffect(() => {
        viewEmpData(props.empid)
        getLeave(props.empid)
    },[props.empid])
    console.log("props.empid", props.empid) */

      //get api for leave type
      useEffect(() => {
        viewLeaveData(user.employeeId)
        /* viewEmpData(user.employeeId) */
    }, [user.employeeId]);

    useEffect(() => {
        getLeave(props.empid)
    }, [props.empid]);

    const today = new Date()
    const currentYear = new Date('2020-01-01')
    const nextYear = new Date('2021-12-31')
    
    const fromDateHandler = (date) => {
        let value = date
        console.log("fromDate", value)
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
        console.log("toDate", value1)
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
            ltId: 0,
            numberOfDays: 0,
            reason: 'string',
            status: 1,
            toDate: moment(value1).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
        
        addPopup(newPopup)
        setEditMsg(true)
    }

    const setStartMaternityDateHandler = (date) => {
        let value2 = date
        console.log("MATERNITY=======")
        console.log(value2)
        setStartMaternityDate(value2)

        var d1 = new Date(value2);
        var d2 = new Date(d1)
        var d3 = d2.setDate(d2.getDate() + 179)

        const newPopup1 = {
            empId: user.employeeId,
            fromDate: moment(value2).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: 'Planned',
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
        addPopup(newPopup1)
        setEditMsg(true)
    }
    //Maternity Date validation
    let d1 = new Date(startMaternityDate);
    let d2 = new Date(d1)
    let d3 = d2.setDate(d2.getDate() + 179)
  

    const setLeaveHandler = (e) => {
        const leave1 = e.target.value
        console.log("LEAVE TYPE===================")
        console.log(leave1)
        setLeave(leave1)
    }
    console.log("leave data",leave)
    // Fields validation
    const validation = (event) => {
        let flag = true
        if (leave === '') {
            toast.info("Select Leave Type")
            flag = false;
            return;
        }

        if (reason === '') {
            toast.info("Reason is mandatory")
            flag = false;
            return;
        }
        return flag;
    }
  

    // create api
    const onSubmit = e => {
        e.preventDefault()
        const cflag = validation();
        /* const resetValue = {
            empId: user.employeeId,
            fromDate: '',
            leaveCategory: '',
            leaveTypeId: 0,
            ltId: 0,
            numberOfDays: 0,
            reason: 'string',
            status: 0,
            toDate: '',
            viewLeavePopup: 0,
            year: ''
        } */
      

        if (cflag) {
            const setModal = props.handleClose;
            setModal()
            setReason('')
            setLeave('')
            setStartDate()
            setEndDate()
            setDisable(true)
            setMin(false)
            setMax(false)
            setEditMsg(false)
           /*  addPopup(resetValue) */
         
        }

        const newLeave1 = {
            empId: user.employeeId,
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: 'Planned',
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: 0,
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

        const newLeave = {
            empId: user.employeeId,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            /* leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
            leaveCategory: newData,
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
        console.log("newLeave empId-----", newLeave.empId)
        if (leave === '3') {
            console.log("newLeave maternity---------", newLeave1)
            addEmpLeave(newLeave1)
        }
        else {
            console.log("newLeave general---------", newLeave)
            addEmpLeave(newLeave, newLeave.empId)
        }
        history.push("/leaves/leaveview");
        setEditMsg(false)

    }
const onCloseModal = () => {
   /*  const resetValue = {
       
    } */
    const setModal = props.handleClose;
    setModal()
    setReason('')
    setLeave('')
    setStartDate()
    setEndDate()
    setDisable(true)
    setMin(false)
    setMax(false)
    setEditMsg(false)
   /*  addPopup(resetValue) */
}
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header >
                        <Modal.Title >
                            <h4>Apply For Leave</h4>
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
                                            }): ""
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                            {leave === '3' ?
                                    <Row style={{margin:'0'}}>
                                        <div classNmae="col-sm-6">
                                            <Form.Group>
                                            <div><Form.Label >From Date:</Form.Label></div>
                                            <div><DatePicker selected={startMaternityDate} onChange={(e) => setStartMaternityDateHandler(e)}
                                                    className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                    endDate={d3}
                                                    minDate={new Date()}
                                                    placeholderText="From Date" required /></div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-sm-6" >
                                            <Form.Group>
                                            <div><Form.Label >To Date:</Form.Label></div>
                                            <div>  <DatePicker selected={d3} selectsEnd startDate={startMaternityDate} readOnly
                                                    endDate={d3} onChange={(date) => setEndMaternityDate(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    minDate={startMaternityDate}
                                                    placeholderText="To Date" /></div>
                                            </Form.Group>
                                        </div>
                                    </Row> :

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
                                            <div><DatePicker selected={endDate} onChange={(e) => toDateHandler(e)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                minDate={startDate} maxDate={nextYear}
                                                placeholderText="To Date" required /></div>
                                        </div>
                                    }
                                    {max &&

                                        <div className="col-sm-6">
                                           <div><Form.Label>To Date:</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(e) => toDateHandler(e)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    maxDate={today}
                                                    minDate={startDate}
                                                    placeholderText="To Date" /></div>
                                        </div>
                                        }

                                </Row>
                             
                            }
                           
                        {editMsg === true ?
                         <Row>
                         <div className="col-sm-12">
                            {/*  <p className="leavesMsg">{leavesData ? leavesData.Leave : ''}</p> */}
                             {leavesData ? 
                             <p className="leavesMsg">{leavesData.Leave}</p> : ''}
                         </div>
                     </Row>
                        : ''}
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                    <Form.Label>Reason:</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="reason" value={reason}
                                        onChange={(event) => setReason(event.target.value)} required />
                                    </Form.Group>
                                </div>
                            </Row>

                            <Button type="submit" className="submitButton" >Submit</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>

        </React.Fragment>
    );
};

export default LeaveAdd;
