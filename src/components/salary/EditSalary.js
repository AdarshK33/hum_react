import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClusterContext } from '../../context/ClusterState'
import { format } from 'date-fns'
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
    const [year, setYear] = useState()

    let history = useHistory();

    const { viewSalaryData, salaryEdit } = useContext(ClusterContext);

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


    //get api for leave type
    // useEffect(() => {
    //     viewSalaryData();
    // }, []);

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
            year: year

        }
        salaryEdit(EditSalary)

        history.push("/salary/salaryView");
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
                                <Form.Label column sm="3" className="padding-right">Extra Hours:</Form.Label>
                                <Col sm="9" className="padding-left">
                                    <Form.Control as="input" type="number" size="sm" name="extraHours" value={extraHours}
                                        onChange={(event) => setExtraHours(event.target.value)} />
                                </Col>
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