import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Search, PlusCircle, MinusCircle } from 'react-feather';
import './offers.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {OfferContext} from '../../context/OfferState'
import { useHistory } from "react-router-dom";

const EmployeeForm = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        refEmail1: '',
        phoneNo1: '',
        designation1: '',
        refEmail2: '',
        phoneNo2: '',
        designation2: ''
    })
    const [dateOfJoining, setDateOfJoining] = useState()
    const [yesChecked, setYesChecked] = useState(true)
    const [noChecked, setNoChecked] = useState(false)
    const [secondRef, setSecondRef] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    let history = useHistory();

    const {searchByAadhar, searchData, createCandidate} = useContext(OfferContext)


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

    const dateOfJoiningHandler = (date) => {
        setDateOfJoining(date)
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
            adharNumber : null,
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
        setState({ firstName: '', lastName: '', email: '', refEmail: '', phoneNo: '', designation: '' })
        setDateOfJoining(null)

    }
    return (
        <Fragment>
            <Form onSubmit={submitHandler}>
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

                            {/* <Form.Control className='form-input' type="text" placeholder="Search.." required />
                            <Search style={{ color: "#313131",position:'absolute', top:'35px',right:'30px' }} /> */}
                            <div className="job-filter" style={{float:'initial', textAlign:'initial'}}>
                                <Form.Label>Search by Account Number/<br />Aadhar Number</Form.Label>
                                <div className="faq-form mr-2">

                                    <input className="form-control searchButton" type="text" placeholder="Search.."
                                    onChange={(e) => searchHandler(e)} />
                                    <Search className="search-icon" style={{ color: "#313131" }} 
                                    onClick={searchDataHandler} />
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Date of Joining</Form.Label><br />
                            <DatePicker className='form-control form-input' selected={dateOfJoining} required
                                onChange={(e) => dateOfJoiningHandler(e)} dateFormat="yyyy-MM-dd" placeholderText='Date Of Joining' />
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
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control className='form-input' type='email' name='refEmail1'
                                        value={state.refEmail1} onChange={changeHandler} required placeholder='Email ID' />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>Phone No</Form.Label>
                                    <Form.Control className='form-input' type='tel' name='phoneNo1'
                                        value={state.phoneNo1} onChange={changeHandler} required placeholder='Phone No' />
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Form.Group>
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control className='form-input' type="text" name='designation1'
                                        value={state.designation1} onChange={changeHandler} required placeholder='Designation' />
                                </Form.Group>
                            </Col>
                                <PlusCircle style={{ color: '#376ebb' }} onClick={showOneMoreRefer} 
                                style={{marginTop:'2rem', color:'#006EBB'}} />
                        </Row>
                    </Fragment>
                    : ''}
                    {secondRef === true && yesChecked === true ?
                     <Row>
                     <Col sm={4}>
                         <Form.Group>
                             <Form.Label>Email ID</Form.Label>
                             <Form.Control className='form-input' type='email' name='refEmail2'
                                 value={state.refEmail2} onChange={changeHandler} required placeholder='Email ID' />
                         </Form.Group>
                     </Col>
                     <Col sm={4}>
                         <Form.Group>
                             <Form.Label>Phone No</Form.Label>
                             <Form.Control className='form-input' type='tel' name='phoneNo2'
                                 value={state.phoneNo2} onChange={changeHandler} required placeholder='Phone No' />
                         </Form.Group>
                     </Col>
                     <Col sm={3}>
                         <Form.Group>
                             <Form.Label>Designation</Form.Label>
                             <Form.Control className='form-input' type="text" name='designation2'
                                 value={state.designation2} onChange={changeHandler} required placeholder='Designation' />
                         </Form.Group>
                     </Col>
                     <MinusCircle style={{ color: '#376ebb' }} onClick={hideOneMoreRefer}
                      style={{marginTop:'2rem', color:'#006EBB'}} />
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