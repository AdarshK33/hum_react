import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClusterContext } from '../../context/ClusterState'

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
    const [values, setValues] = useState({ val: [] });
    const [values2, setValues2] = useState({ val2: [] });
    const [extraMonth, setExtraMonth] = useState()
    const [extraWorkingHrs, setExtraWorkingHrs] = useState(0)

    let history = useHistory();

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


    useEffect(() => {
        setExtraMonth(props.month)
    }, [props.month])

    function createInputs() {
        return values.val.map((el, i) =>
            <div key={i}>
                <input type="text" value={el || ''} onChange={handleChange.bind(i)} />
            </div>
        );
    }
  let nowDate = new Date()
  let nowMonth = nowDate.getMonth()+1
 let getMonth = new Date(props.month)
  var firstDay =  new Date(nowDate.getFullYear(), nowDate.getMonth(), 21); 
                      
var lastDay =  new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 20); 
   console.log("firstDay---", firstDay)
   console.log("lastDay---", lastDay)
  console.log("getYear---", props.year)
  console.log("getMonth---", getMonth)

        function createDate() {
            return values2.val2.map((el, i) =>
                <div key={i}>
                    <input type="date" style={{ fontSize: "0.8rem" }} className="form-control digit" min="2020-08"
                  placeholder="Select Date"
                  required onChange={setSelectDateHandler.bind(i)} value={el || ''} />
                </div>
            )
    }
function setSelectDateHandler(event) {
    let vals2 = [...values2.val2];
    vals2[this] = event.target.value;
    setValues2({ val2: vals2 });
    console.log("date select",vals2)
}
function handleChange(event) {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({ val: vals });
    console.log("input select",vals)
}

const addClick = () => {
    setValues({ val: [...values.val, ''] })
    setValues2({ val2: [...values2.val2, ''] })
}
const setExtraWorkingHrsHandler = (e) => {
    let data1 = e.target.value
    let data2 = values.val * values2.val2
    setExtraWorkingHrs(data2)
    console.log("data2", data2)
}
//edit api
const onSubmit = e => {
    e.preventDefault()

    const EditSalary = {
        employeeId: employeeId,
        firstName: firstName,
        lastName: lastName,
        numberOfHours: numberOfHours,
        lop: lop,
        contractType: contractType,
        reason: reason,
        extraHours: extraHours,
        month: month,
        salaryId: salaryId,
        status: status,
        statusDesc: statusDesc,
        totalHours: totalHours,
        year: year,
        additionalHours: additionalHours

    }
    salaryEdit(EditSalary)

    // history.push("/salary/salaryView");
    const setModal = props.handleEditClose;
    setModal()
}


return (
    <React.Fragment>
        <ToastContainer />
        <Modal show={props.modal} onHide={props.handleEditClose} centered>
            <Container style={{ paddingBottom: '1rem' }}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        <h5 className="modal-heading">Edit Salary</h5>
                    </Modal.Title>
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
                            {contractType === 'permanent' ?
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
                                        <Button onClick={addClick} >+</Button>
                                    </Col>
                                    <Col sm="9" className="padding-left">
                                        <Row>
                                            <Col>{createDate()}</Col>
                                            <Col>{createInputs()}</Col>
                                        </Row>
                                    </Col>
                                    <Form.Label column sm="3" className="padding-right">Extra Hours:</Form.Label>
                                    <Col sm="9" className="padding-left">
                                        <Form.Control as="input" type="number" size="sm" name="extraWorkingHrs" value={extraWorkingHrs}
                                            onChange={(e) => setExtraWorkingHrsHandler(e)} />
                                    </Col>

                                </Fragment>
                            }
                            <Form.Label column sm="3" className="padding-right">Reason:</Form.Label>
                            <Col sm="9" className="padding-left">
                                <Form.Control as="textarea" rows="3" size="sm" name="reason"
                                    value={reason} onChange={(event) => setReason(event.target.value)} />
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