import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
/* import DatePicker from 'react-datepicker' */
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ClusterContext } from '../../context/ClusterState'
import moment from 'moment'


const EditSalary = (props) => {
    const [employeeId, setEmployeeId] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [numberOfHours, setNumberOfHours] = useState()
    const [lop, setLop] = useState()
    const [contractType, setContractType] = useState()
    const [extraHours, setExtraHours] = useState()
    const [reason, setReason] = useState()
    const [month, setMonth] = useState()
    const [salaryId, setSalaryId] = useState()
    const [status, setStatus] = useState()
    const [statusDesc, setStatusDesc] = useState()
    const [totalHours, setTotalHours] = useState()
    const [additionalHours, setadditionalHours] = useState()
    const [year, setYear] = useState()
    const [val, setValues] = useState([]);
    const [val2, setValues2] = useState([]);
    const [inputValue, setInputValue] = useState(null)
    const [inputDate, setInputDate] = useState()

    const { salaryEdit } = useContext(ClusterContext);

    useEffect(() => {
        setEmployeeId(props.employeeId)
    }, [props.employeeId])

    useEffect(() => {
        setFirstName(props.firstName)
    }, [props.firstName])

    useEffect(() => {
        setLastName(props.lastName)
    }, [props.lastName])

    useEffect(() => {
        setNumberOfHours(props.numberOfHours)
    }, [props.numberOfHours])

    useEffect(() => {
        setLop(props.lop)
    }, [props.lop])

    useEffect(() => {
        setContractType(props.contractType)
    }, [props.contractType])

    useEffect(() => {
        setExtraHours(props.extraHours)
    }, [props.extraHours])

    useEffect(() => {
        setReason(props.reason)
    }, [props.reason])

    useEffect(() => {
        setMonth(props.month)
    }, [props.month])

    useEffect(() => {
        setSalaryId(props.salaryId)
    }, [props.salaryId])

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    useEffect(() => {
        setStatusDesc(props.statusDesc)
    }, [props.statusDesc])

    useEffect(() => {
        setTotalHours(props.totalHours)
    }, [props.totalHours])

    useEffect(() => {
        setYear(props.year)
    }, [props.year])

    useEffect(() => {
        setadditionalHours(props.additionalHours)
    }, [props.additionalHours])


    function createInputs() {
        return val.map((el, i) =>
            <div key={i}>
                <label>Number of Hours</label>
                <input type="number" className='input form-control' value={el || ''} onChange={(e) => handleChange(e,i)} 
                style={{width:'80%', fontSize: "0.8rem" }} required placeholder="Enter Hours" min='0' max='8' /><br/>
            </div>
        );
    }
  let nowDate = new Date()
 let getMonth = props.month
 let getYear = props.year
  var firstDay =  new Date(getYear, getMonth-2, 21); 
                      
var lastDay =  new Date(getYear, getMonth - 1 , 20); 
var firstDate =  moment(firstDay).format("YYYY-MM-DD")
var lastDate =  moment(lastDay).format("YYYY-MM-DD")
console.log("firstDay",firstDate)
console.log("lastDay",lastDate)

        function createDate() {
            return val2.map((el, i) =>
                <div key={i}>
                    <label>Select Date</label>
                    <input type="date" style={{ fontSize: "0.8rem" }} className="form-control digit"
                  placeholder="Select Date" min={firstDate} max={lastDate}
                  required onChange={(e) => setSelectDateHandler(e,i)} value={el || ''} /><br/>
                </div>
            )
    }
function setSelectDateHandler(e,i) {
    setInputDate(e.target.value)
    let arrDate = [...val2]
    arrDate[i] = e.target.value
    setValues2(arrDate)
    console.log("input arrDate",arrDate)
}
function handleChange(e,i) {
    setInputValue(e.target.value)
    let arrGroup = [...val]
    arrGroup[i] = parseInt(e.target.value)
    setValues(arrGroup)
    console.log("input arrGroup",arrGroup)

    var total = props.extraHours;//
    console.log("before total", total)
    var list = document.getElementsByClassName("input");
    var item_values = [props.extraHours];
    console.log("item_values before",item_values)
    for(var i = 0; i < list.length; ++i) {
        item_values.push(parseFloat(list[i].value));
    }
    
    console.log("item_values",item_values)
    total = item_values.reduce(function(previousValue, currentValue, index, array){
        return previousValue + currentValue;
    });
    console.log("total", total)
    setExtraHours( total);  
}

const addClick = () => {
    setValues([...val, ''])
    setValues2([...val2, ''])
}

const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
//edit api
const onSubmit = e => {
    e.preventDefault()
    const duplicateElementa = toFindDuplicates(val2);
    if(Object.keys(duplicateElementa).length){
    toast.error("Please provide valid date")
    }else{
    const EditSalary = {
        additionalHours: additionalHours,
        contractType: contractType,
        dailyExtraHour: val,
        dates: val2,
        employeeId: employeeId,
        extraHours: extraHours,
        firstName: firstName,
        lastName: lastName,
        lop: lop,
        month: month,
        numberOfHours: numberOfHours,
        reason: reason,
        salaryId: salaryId,
        status: status,
        statusDesc: statusDesc,
        totalHours: totalHours,
        year: year

    }
    let flag = localStorage.getItem('flag')
    const salaryData = {
      cluster: flag,
      month: month,
      storeIds: [props.costCenter],
      year: year
    }
    salaryEdit(EditSalary, salaryData)

    // history.push("/salary/salaryView");
    const setModal = props.handleEditClose;
    setModal()
    setExtraHours(props.extraHours)
    setReason(props.reason)
    setValues([])
    setValues2([])
}
}
const onCloseModal = () => {
     const setModal = props.handleEditClose;
    setModal()
    setExtraHours(props.extraHours)
    setReason(props.reason)
    setValues([])
    setValues2([])

}

return (
    <React.Fragment>
        <ToastContainer />
        <Modal show={props.modal} onHide={props.handleEditClose} centered>
            <Container style={{ paddingBottom: '1rem' }}>
                <Modal.Header>
                    <Modal.Title >
                        <h5 className="modal-heading">Edit Salary</h5>
                    </Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Row} style={{ display: 'none' }}>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm="3" className="padding-right">Employee Id:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="input" size="sm" name="employeeId" value={employeeId}
                                    readOnly />
                            </Col>
                            <Form.Label column sm="3" className="padding-right">First Name:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="input" size="sm" name="firstName" value={firstName}
                                    readOnly />
                            </Col>
                            <Form.Label column sm="3" className="padding-right">Last Name:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="input" size="sm" name="lastName" value={lastName}
                                    readOnly />
                            </Col>
                            <Form.Label column sm="3" className="padding-right">Number of Hours:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="input" size="sm" name="numberOfHours" value={numberOfHours}
                                    readOnly />
                            </Col>
                            <Form.Label column sm="3" className="padding-right">LOP:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="input" size="sm" name="lop" value={lop}
                                    readOnly />
                            </Col>
                            <Form.Label column sm="3" className="padding-right">Contract Type:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="input" size="sm" name="contractType" value={contractType}
                                    readOnly />
                            </Col>
                            {contractType === 'Fulltime' ?
                                <Fragment>
                                    <Form.Label column sm="3" className="padding-right">Extra Hours:</Form.Label>
                                    <Col sm="9" className="padding-left">
                                        <Form.Control as="input" type="number" size="sm" name="extraHours" value={extraHours}
                                            onChange={(event) => setExtraHours(event.target.value)} />
                                    </Col>
                                </Fragment>
                                :
                                <Fragment>
                                    <Col sm='3' className="padding-right">
                                        <Button variant='outline-secondary' size='sm'
                                        onClick={addClick} >+</Button>
                                    </Col>
                                    <Col sm="9" className="padding-left">
                                        <Row>
                                            <Col sm='6'>{createDate()}</Col>
                                            <Col sm='6'>{createInputs()}</Col>
                                        </Row>
                                    </Col>
                                    <Form.Label column sm="3" className="padding-right">Extra Hours:</Form.Label>
                                    <Col sm="9" className="padding-left">
                                        <Form.Control as="input" type="number" size="sm" name="extraHours" value={extraHours === null ? 0 : extraHours}
                                            onChange={(event) => setExtraHours(event.target.value)}  readOnly
                                            id="total" />
                                            {extraHours>130?<p style={{color:"Red"}}>Extra Hours should not exceed 130 hrs</p>:""}
                                    </Col>

                                </Fragment>
                            }
                            <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="textarea" rows="3" size="sm" name="reason" required
                                    value={reason || ''} onChange={(event) => setReason(event.target.value)} />
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

export default EditSalary;