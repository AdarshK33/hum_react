import React, {useState, useEffect, useContext, Fragment} from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeaveContext } from '../../context/LeaveState'
import { AdminContext } from '../../context/AdminState'
import { format } from 'date-fns'
import moment from 'moment'

const AdminLeaveAdd = (props) => {
    const [employeeId, setEmployeeId] = useState()
    const [name, setName] = useState('')
    const [costCenter, setCostCenter] = useState()
    const [employeeCostCenter, setEmployeeCostCenter] = useState('')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [startMaternityDate, setStartMaternityDate] = useState(new Date())
    const [endMaternityDate, setEndMaternityDate] = useState()
    const [leave, setLeave] = useState('')
    const [leaveTypeId, setLeaveTypeId] = useState(null)
    const [leaveName, setLeaveName] = useState('')
    const [reason, setReason] = useState('')
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    let history = useHistory();

    const { addLeave, addPopup, leavesData, getLeave, leaveType, leaveList, message }
     = useContext(LeaveContext);

     const {CostCenter,costCenterList, employeeIdData, employeeIdList } = useContext(AdminContext)

     const today = new Date()

     useEffect(() => {
         CostCenter()
     },[])

     useEffect(() => {
        employeeIdData(costCenter)
    },[costCenter])

     useEffect(() => {
        setEmployeeId(props.employeeId)
     },[props.employeeId])

     useEffect(() => {
        setName(props.firstName, props.lastName)
     },[props.firstName, props.lastName])

     const setCostCenterHandler = (e) => {
         let data1 = e.target.value
        setCostCenter(data1)
        console.log("data1", data1)
     }
     const setEmployeeCostCenterHandler = (e) => {
         let data2 = e.target.value
         setEmployeeCostCenter(data2)
         console.log("data2", data2)
     }
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

    // Fields validation
    const validation = (event) => {
        let flag = true
        if (leave == '') {
            toast.info("Select Leave Type")
            flag = false;
            return;
        }

        if (reason == '') {
            toast.info("Reason is mandatory")
            flag = false;
            return;
        }
        return flag;
    }

      //get api for leave type
      useEffect(() => {
        getLeave()
    }, []);

    // create api
    const onSubmit = e => {
        e.preventDefault()
        const cflag = validation();

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
        }

        const newLeave = {
            empId: employeeCostCenter,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
        const newLeave1 = {
            empId: employeeCostCenter,
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            year: '2020'
        }
        if (leave == 'Maternity') {
            addLeave(newLeave1)
        }else{
            addLeave(newLeave)
        }
            
        history.push("/AdminLeaves/AdminLeavesList");


        const newPopup = {
            empId: employeeCostCenter,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
        const newPopup1 = {
            empId: employeeCostCenter,
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
            leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName,
            leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 0,
            year: '2020'
        }
     
        if (leave == 'Maternity') {
            addPopup(newPopup1)
        }else{
            addPopup(newPopup)
        }
            
        history.push("/AdminLeaves/AdminLeavesList");
       
    } 


    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>
            <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header closeButton>
                        <Modal.Title >
                            <h5 className="modal-heading">Apply For Leave</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Cost Center Id:</Form.Label>
                                <Col sm="9" className="padding-left">
                                <Form.Control as="select" size="sm" required value={costCenter}
                                        onChange={(e) => setCostCenterHandler(e)}>
                                            <option value="">Select Cost Center</option>
                                            
                                        {costCenterList.length > 0 && costCenterList.map((item, i) => {
                                            return (
                                                <option key={item.costCenterId} value={item.costCentreName}>
                                                {item.costCentreName}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="padding-right">Employee Id:</Form.Label>
                                <Col sm="9" className="padding-left">
                                <Form.Control as="select" size="sm" required value={employeeCostCenter}
                                        onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                            <option value="">Select Employee</option>
                                            
                                        {employeeIdList.length > 0 && employeeIdList.map((item, i) => {
                                            return (
                                                <option key={item.employeeId} value={item.employeeId}>
                                                {item.firstName}-{item.employeeId}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" className="padding-right">Leave Type:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="select" size="sm" required value={leave}
                                        onChange={(e) => setLeaveHandler(e)}>
                                            <option value="">Select Leave Type</option>
                                            
                                        {leaveType.length > 0 && leaveType.map((item, i) => {
                                            return (
                                                <option key={item.leaveTypeId} value={item.leaveName}>
                                                {item.leaveName}</option>
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
                                            <DatePicker selected={startMaternityDate} onChange={(date) => setStartMaternityDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                endDate={d3}
                                                minDate={startMaternityDate}
                                                placeholderText="From Date" required />
                                        </Col>

                                        <Form.Label column sm="3" className="padding-right"
                                            style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                        <Col sm="3" className="padding-left">
                                            <DatePicker selected={d3} selectsEnd startDate={startMaternityDate} readOnly
                                                endDate={d3} onChange={(date) => setEndMaternityDate(date)}
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
                                            placeholderText="From Date" required/>
                                    </Col>
                                    {disable &&
                                        <React.Fragment>
                                            <Form.Label column sm="3" className="padding-right"
                                                style={{ display: 'flex', justifyContent: 'center' }}>To Date:</Form.Label>
                                            <Col sm="3" className="padding-left">
                                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
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
                                                    placeholderText="To Date" required/>
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
                                        onChange={(event) => setReason(event.target.value)} required />
                                </Col>
                            </Form.Group>
                            <Button type="submit" className="submit-button" size="sm">Submit</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>
        </Fragment>
    );
};

export default AdminLeaveAdd;