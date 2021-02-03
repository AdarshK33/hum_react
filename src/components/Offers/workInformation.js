import React, {Fragment, useState} from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap'
import './offers.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const WorkInformation = () => {
    const [state, setState] = useState({
        contractType:'',
        department:'',
        position:'',
        designation:'',
        costCenter:'',
        workLocation:'',
        company:'',
        probation:'',
        sports:'',
        cluster:'',
        recuritment:'',
        ngoDetail:''
    })
    const [lastDay, setLastDay] = useState()
    const [dateOfJoining, setDateOFJoining] = useState()

    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const lastDayHandler = (date) => {
        setLastDay(date)
    }

    const dateOfJoiningHandler = (date) => {
        setDateOFJoining(date)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(state,'state')
        setState({contractType:'',
        employmentType:'',
        department:'',
        position:'',
        designation:'',
        costCenter:'',
        workLocationState:'',
        workLocationCity:'',
        company:'',
        probation:'',
        sport:'',
        cluster:'',
        recuritment:''})
        setLastDay(null)

    }
    return (
        <Fragment>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control as='select' value={state.company} className='form-input'
                                name='company' onChange={changeHandler} >
                                    <option value=''>Select Company</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Type of Employment</Form.Label>
                            <Form.Control as='select' value={state.employmentType} className='form-input'
                                name='employmentType' onChange={changeHandler} >
                                    <option value=''>Select Employment Type</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Date of Joining</Form.Label>
                            <DatePicker className='form-control form-input' selected={dateOfJoining} required
                            onChange={(e) => dateOfJoiningHandler(e)} dateFormat="yyyy-MM-dd" placeholderText='Date of Joining' />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Department</Form.Label>
                            <Form.Control as='select' value={state.department} className='form-input'
                                name='department' onChange={changeHandler} >
                                    <option value=''>Select Department</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                    
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Position</Form.Label>
                            <Form.Control as='select' value={state.position} className='form-input'
                                name='position' onChange={changeHandler} >
                                    <option value=''>Select Position</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Designation</Form.Label>
                            <Form.Control as='select' value={state.designation} className='form-input'
                                name='designation' onChange={changeHandler} >
                                    <option value=''>Select Designation</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Cost Center</Form.Label>
                            <Form.Control as='select' value={state.costCenter} className='form-input'
                                name='costCenter' onChange={changeHandler} >
                                    <option value=''>Select Cost Center</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Sports</Form.Label>
                            <Form.Control as='select' value={state.sports} className='form-input'
                                name='sports' onChange={changeHandler} >
                                    <option value=''>Select Sports</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Work Location state</Form.Label>
                            <Form.Control as='select' value={state.workLocationState} className='form-input'
                                name='workLocationState' onChange={changeHandler} >
                                    <option value=''>Select Work Location State</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Work Location City</Form.Label>
                            <Form.Control as='select' value={state.workLocationCity} className='form-input'
                                name='workLocationCity' onChange={changeHandler} >
                                    <option value=''>Select Work Location City</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Probation Period</Form.Label>
                            <Form.Control as='select' value={state.probation} className='form-input'
                                name='probation' onChange={changeHandler} >
                                    <option value=''>Select Probation</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Recuritment Source</Form.Label>
                            <Form.Control as='select' value={state.recuritment} className='form-input'
                                name='recuritment' onChange={changeHandler} >
                                    <option value=''>Select Recuritment Source</option>
                                    <option>NGO</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                {state.recuritment === 'NGO' ?
                <Row>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label>Enter NGO Detail</Form.Label>
                            <Form.Control type='text' value={state.ngoDetail} className='form-input'
                            onChange={changeHandler} name='ngoDetail' placeholder='Enter NGO Detail' />
                        </Form.Group>
                    </Col>
                </Row>
                :''}
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

export default WorkInformation;