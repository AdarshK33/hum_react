import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Search, PlusCircle, MinusCircle } from 'react-feather';
import './offers.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { OfferContext } from '../../context/OfferState'
import { useHistory } from "react-router-dom";

const EmployeeForm = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        empName1: '',
        empName2: ''
    })
    const [yesChecked, setYesChecked] = useState(true)
    const [noChecked, setNoChecked] = useState(false)
    const [secondRef, setSecondRef] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    let history = useHistory();

    const { searchByAadhar, searchData, createCandidate } = useContext(OfferContext)


    const searchHandler = (e) => {
        setSearchValue(e.target.value)

    }
    const searchDataHandler = () => {
        if (searchValue !== "") {
            searchByAadhar(searchValue);
        }

    }

    const showOneMoreRefer = () => {
        setSecondRef(true)
    }
    const hideOneMoreRefer = () => {
        setSecondRef(false)
    }

    const checkedYesHandler = () => {
        setYesChecked(!yesChecked)
        setNoChecked(yesChecked)
    }
    const checkedNoHandler = () => {
        setNoChecked(!noChecked)
        setYesChecked(noChecked)
        setSecondRef(false)
    }
    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        const CandidateInfo = {
            adharDoc: null,
            adharName: null,
            adharNumber: null,
            bloodGroup: null,
            candidateId: 0,
            dateOfBirth: null,
            disability: null,
            disabilityDoc: null,
            fatherName: null,
            firstName: state.firstName,
            gender: null,
            lastName: state.lastName,
            lgbt: null,
            maritalStatus: null,
            nationality: null,
            panDoc: null,
            panNumber: null,
            personalEmail: state.email,
            photo: null,
            refered: true,
            status: 1,
            verificationStatus: 0
        }
        createCandidate(CandidateInfo)
        setState({ firstName: '', lastName: '', email: '', empName1: '', empName2: '' })

    }
    return (
        <Fragment>
            <Form onSubmit={submitHandler}>
                <Row style={{marginBottom:'1rem'}}>
                    <Col sm={4}>
                        <Form.Group>
                             {/* <div className="job-filter" style={{marginBottom:'1rem',float:'left'}}>
                             <Form.Label>Search by Account Number/Aadhar Number</Form.Label>
                                    <div className="faq-form">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                    </div>
                                </div> */}
                                 <Form.Label>Search by Account Number/Aadhar Number</Form.Label>
                                 <div className="faq-form">
                                        <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                    </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='form-input' type='text' name='firstName'
                                value={state.firstName} onChange={changeHandler} required
                                placeholder='First Name' />
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='form-input' type='text' name='lastName'
                                value={state.lastName} onChange={changeHandler} required
                                placeholder='Last Name' />
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Personal Email ID</Form.Label>
                            <Form.Control type='email' className='form-input' name='email'
                                value={state.email} onChange={changeHandler} required placeholder='Personal Email ID' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <p>Were you referred for this position?</p>
                    </Col>
                    <Col sm={4}>
                        Yes &nbsp; <input type='checkbox' name='refrence' checked={yesChecked}
                            onChange={checkedYesHandler} />&nbsp; &nbsp;&nbsp; &nbsp;
                        No &nbsp; <input type='checkbox' name='refrence' checked={noChecked}
                            onChange={checkedNoHandler} />
                    </Col>
                </Row>
                {yesChecked === true ?
                    <Fragment>
                        <p>State two reference(max two are allowed)<span style={{ color: 'red' }}>*</span></p>
                        <Row>
                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>Emp Name/Emp ID</Form.Label>
                                    <Form.Control className='form-input' type='text' name='empName1'
                                        value={state.empName1} onChange={changeHandler} required placeholder='Emp Name/Emp Id' />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className='form-input' type='text'  readOnly />
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Form.Group>
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control className='form-input' type="text" readOnly />
                                </Form.Group>
                            </Col>
                            <PlusCircle style={{ color: '#376ebb' }} onClick={showOneMoreRefer}
                                style={{ marginTop: '2rem', color: '#006EBB' }} />
                        </Row>
                    </Fragment>
                    : ''}
                {secondRef === true && yesChecked === true ?
                    <Row>
                        <Col sm={4}>
                            <Form.Group>
                                <Form.Label>Emp Name/Emp ID</Form.Label>
                                <Form.Control className='form-input' type='text' name='empName2'
                                    value={state.empName2} onChange={changeHandler} required placeholder='Emp Name/ Emp ID' />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control className='form-input' type='text'  readOnly />
                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group>
                                <Form.Label>Designation</Form.Label>
                                <Form.Control className='form-input' type="text" readOnly />
                            </Form.Group>
                        </Col>
                        <MinusCircle style={{ color: '#376ebb' }} onClick={hideOneMoreRefer}
                            style={{ marginTop: '2rem', color: '#006EBB' }} />
                    </Row>
                    : ''}
                <Row>
                    <Col sm={5}></Col>
                    <Col sm={2}>
                        <Button type='submit'>Save</Button>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default EmployeeForm;