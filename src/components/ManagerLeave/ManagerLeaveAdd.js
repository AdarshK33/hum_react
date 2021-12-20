import React, {useState, useEffect, useContext, Fragment} from 'react';
import { Container, Row, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LeaveContext } from '../../context/LeaveState'
import { AdminContext } from '../../context/AdminState'
import { AppContext } from "../../context/AppState";
/* import { format } from 'date-fns' */
import moment from 'moment'

const ManagerLeaveAdd = (props) => {
    const [employeeId, setEmployeeId] = useState()
    const [name, setName] = useState('')
    const [costCenter, setCostCenter] = useState()
    const [employeeCostCenter, setEmployeeCostCenter] = useState('')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState()
    const [startMaternityDate, setStartMaternityDate] = useState(new Date())
    const [endMaternityDate, setEndMaternityDate] = useState()
    const [leave, setLeave] = useState('')
    /* const [leaveTypeId, setLeaveTypeId] = useState(null)
    const [leaveName, setLeaveName] = useState('') */
    const [reason, setReason] = useState('')
    const [disable, setDisable] = useState(true)
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)
    const [editMsg, setEditMsg] = useState(false)
    let history = useHistory();

    const { addLeave, addPopup, leavesData, getLeave, leaveType}
     = useContext(LeaveContext);

     const {/* CostCenter,costCenterList, */ managerEmployeeId, managerEmployeeIdList } = useContext(AdminContext)

     const { user } = useContext(AppContext);

     const today = new Date()
     
     let nextYear = new Date()
     nextYear.setFullYear(nextYear.getFullYear()+1, 11, 31)
 
     let currentYear = new Date()
     currentYear.setFullYear(currentYear.getFullYear(), 0, 1)

     /* useEffect(() => {
         CostCenter()
     },[]) */

    /*  useEffect(() => {
        getLeave(user.employeeId)
    }, [user.employeeId]);  */
console.log("managerEmployeeIdList",managerEmployeeIdList)

     useEffect(() => {
        managerEmployeeId()
    },[])
    useEffect(() => {
        setCostCenter(user.costCentre)
    },[user.costCentre])

     useEffect(() => {
        setEmployeeId(props.employeeId)
     },[props.employeeId])

     useEffect(() => {
        setName(props.firstName, props.lastName)
     },[props.firstName, props.lastName])

    /*  useEffect(() => {
        if (user.loginType !== "1" && user.loginType !== "9" && 
        user.additionalRole !== '1' && user.additionalRole !== '9') {
              setCostCenter( user.costCentre)
              employeeIdData(user.costCentre)
              console.log("disabled costcenter", user.costCentre)
        }
    },[user.costCentre, user.loginType]) */
/* 
     const setCostCenterHandler = (e) => {
         let data1 = e.target.value
        setCostCenter(data1)
        employeeIdData(data1)
        console.log("data1", data1)
        console.log("costCenter", data1)
     } */
     const setEmployeeCostCenterHandler = (e) => {
         let data2 = e.target.value
         getLeave(data2);
         setEmployeeCostCenter(data2)
         console.log("data2", data2)
     }
     const fromDateHandler = (date) => {
         let value = date
         setStartDate(value);
         setEndDate(null)
         setEditMsg(false)
 
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
         setEndDate(value1);
         var newData
         if(startDate > new Date()){
              newData = 'Planned'
         }
         else{
              newData = 'Unplanned'
         }
         const newPopup = {
            empId: employeeCostCenter,
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
            year: new Date(value1).getFullYear()
        }
        addPopup(newPopup)
        setEditMsg(true)
     }

     const setStartMaternityDateHandler = (date) => {
        let value2 = date
        setStartMaternityDate(value2)

        var d1 = new Date(value2);
        var d2 = new Date(d1)
        var d3 = d2.setDate(d2.getDate() + 179)

        const newPopup1 = {
            empId: employeeCostCenter,
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
            year: new Date(d3).getFullYear()
        }
        addPopup(newPopup1)
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

      //get api for leave type
    //   useEffect(() => {
    //     getLeave()
    // }, []);
   

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
            setEditMsg(false)
            setEmployeeCostCenter('')
            setCostCenter(costCenter)
           
        }
        var newData
        if(startDate > new Date()){
             newData = 'Planned'
        }
        else{
             newData = 'Unplanned'
        }
        const newLeave = {
            empId: employeeCostCenter,
            fromDate: moment(startDate).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: newData,
            /* leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
            leaveTypeId: leave,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(endDate).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            // year: new Date().getFullYear()
            year:new Date(endDate).getFullYear()
            
        }
        const newLeave1 = {
            empId: employeeCostCenter,
            fromDate: moment(startMaternityDate).format("YYYY-MM-DD"),
           /*  leaveCategory: leaveType.filter(qa => qa.leaveName === leave)[0].leaveName, */
           leaveCategory: 'Planned',
           /*  leaveTypeId: leaveType.filter(qa => qa.leaveName === leave)[0].leaveTypeId, */
           leaveTypeId: leave,
            ltId: 0,
            numberOfDays: 0,
            reason: reason,
            status: 1,
            toDate: moment(d3).format("YYYY-MM-DD"),
            viewLeavePopup: 1,
            // year: new Date().getFullYear()
            // year:moment(new Date(d3)).format("YYYY")
            year:new Date(d3).getFullYear()
        }
        if (leave === '3') {
            console.log("newLeave maternity---------", newLeave1)
            addLeave(newLeave1, props.pageNumber)
        }else{
            console.log("newLeave general---------", newLeave)
            addLeave(newLeave, props.pageNumber)
        }
            
        history.push("/managerleaves");
        setEditMsg(false)

    }
    const onCloseModal = () => {
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
        setEmployeeCostCenter('')
        setCostCenter(costCenter)
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>
            <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header >
                        <Modal.Title >
                            <h5 className="modal-heading">Apply For Leave</h5>
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
                                   <Form.Label>Cost Center Id</Form.Label>
                                     <Form.Control type="text" disabled value={costCenter} 
                                     onChange={(e) => setCostCenter(e.targrt.value)}  />
                                    
                                   </Form.Group>
                                </div>
                            </Row>

                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                    <Form.Label>Employee Id</Form.Label>
                                    <Form.Control as="select" required value={employeeCostCenter}
                                        onChange={(e) => setEmployeeCostCenterHandler(e)}>
                                            <option value="">Select Employee</option>
                                            
                                        {managerEmployeeIdList !== null && managerEmployeeIdList.length > 0 &&
                                         managerEmployeeIdList.map((item, i) => {
                                            return (
                                                <option key={item.employeeId} value={item.employeeId}>
                                                {item.firstName}-{item.employeeId}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                          
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Leave Type</Form.Label>
                                        <Form.Control as="select" required value={leave}
                                        onChange={(e) => setLeaveHandler(e)}>
                                            <option value="">Select Leave Type</option>
                                            
                                        {leaveType !== undefined && leaveType !== null && leaveType.map((item, i) => {
                                            return (
                                                <option key={item.leaveTypeId} value={item.leaveTypeId}
                                                disabled={(item.paternity === 1 ? true : false) || (item.maternity === 1 ? true : false)}>
                                                {item.leaveName}</option>
                                            )
                                        })
                                        }
                                    </Form.Control>
                                    </Form.Group>
                                </div>
                             </Row>
                             {leave === '3' ?
                                    <Row style={{margin:'0'}}>
                                        <div classNmae="col-sm-6">
                                            <Form.Group>
                                            <div><Form.Label >From Date</Form.Label></div>
                                            <div><DatePicker selected={startMaternityDate} onChange={(date) => setStartMaternityDateHandler(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd" selectsStart startDate={startMaternityDate}
                                                    endDate={d3}
                                                    minDate={new Date()}
                                                    placeholderText="From Date" required /></div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-sm-6" >
                                            <Form.Group>
                                            <div><Form.Label >To Date</Form.Label></div>
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
                                            <div><Form.Label>From Date</Form.Label></div>
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
                                            <div><Form.Label>To Date</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                /*  maxDate={maxToDate} */
                                                placeholderText="To Date" disabled={true} />
                                                </div>
                                        </div>
                                    }
                                    {min &&
                                        <div className="col-sm-6">
                                            <div><Form.Label>To Date</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(date) => toDateHandler(date)}
                                                className="input_date" dateFormat="yyyy-MM-dd"
                                                minDate={startDate} maxDate={nextYear}
                                                placeholderText="To Date" required /></div>
                                        </div>
                                    }
                                    {max &&

                                        <div className="col-sm-6">
                                           <div><Form.Label>To Date</Form.Label></div>
                                            <div><DatePicker selected={endDate} onChange={(date) => toDateHandler(date)}
                                                    className="input_date" dateFormat="yyyy-MM-dd"
                                                    maxDate={today}
                                                    minDate={startDate}
                                                    placeholderText="To Date" required/></div>
                                        </div>
                                        }

                                </Row>
                             
                            }
                            {editMsg === true ?
                            <Row>
                                <div className="col-sm-12">
                                    <p className="leavesMsg" style={{color:'red', fontWeight:'bold'}}>{leavesData ? leavesData.Leave : ''}</p>
                                </div>
                            </Row>
                            : ''}

                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                    <Form.Label>Reason</Form.Label>
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
        </Fragment>
    );
};

export default ManagerLeaveAdd;