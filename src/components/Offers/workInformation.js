import React, {Fragment, useState, useContext, useEffect} from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap'
import './offers.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {ClusterContext} from '../../context/ClusterState'
import {AdminContext} from '../../context/AdminState'
import {OfferContext} from '../../context/OfferState'
import {RosterContext} from '../../context/RosterState'

const WorkInformation = () => {
    const [state, setState] = useState({
        company:'',
        employmentType:'',
        department:'',
        position:'',
        designation:'',
        sports:'',
        probation:'',
        recuritment:'',
        ngoDetail:''
    })
    const [dateOfJoining, setDateOFJoining] = useState()
    const [costCenter, setCostCenter] = useState('')

    const {viewSports, sportsNames} = useContext(ClusterContext)
    const {CostCenter, costCenterList} = useContext(AdminContext)
    const {departmentView, departmentName, designationView, designationName,
            locationView, locationName, createCandidateWork} = useContext(OfferContext)
    const {viewContractTypes, shiftContractNames} = useContext(RosterContext)

    useEffect(() => {
        viewSports()
        CostCenter()
        departmentView()
        viewContractTypes()
        designationView()
    },[])
   
    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const costCenterChangeHandler = (e) => {
        setCostCenter(e.target.value)
        locationView(e.target.value)
console.log("locationView",e.target.value)
    }

    const dateOfJoiningHandler = (date) => {
        setDateOFJoining(date)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(state,'state')
        const createData = {
            candidateId: 0,
            cityId: locationName.cityId,
            companyName: state.company,
            contractType: state.employmentType,
            costCentre: costCenter,
            dateOfJoin: dateOfJoining,
            dateOfLeaving: null,
            department: state.department,
            designation: state.designation,
            educationCertificate: null,
            locationId: 0,
            managerId: null,
            paySlip: null,
            position: state.position,
            probationPeriod: state.probation,
            recruitmentSource: state.recuritment,
            relievingLetter: null,
            workId: 0
          }
        createCandidateWork(createData)
        setState({
            company:'',
            employmentType:'',
            department:'',
            position:'',
            designation:'',
            sports:'',
            probation:'',
            recuritment:'',
            ngoDetail:''})
            setDateOFJoining(null)
            setCostCenter('')

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
                                    <option>DSI</option>
                                    <option>Indeca</option>
                                    <option>Prodin</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Type of Employment</Form.Label>
                            <Form.Control as='select' value={state.employmentType} className='form-input'
                                name='employmentType' onChange={changeHandler} >
                                    <option value=''>Select Employment Type</option>
                                    {shiftContractNames !== null && shiftContractNames !== undefined &&
                                    shiftContractNames.length > 0 &&
                                    shiftContractNames.map(item => {
                                        return (
                                            <option key={item.typeId}>{item.contractType}</option>
                                        )
                                    })}
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
                                    {departmentName !== null && departmentName !== undefined &&
                                    departmentName.length>0 &&
                                    departmentName.map(item => {
                                        return(
                                            <option key={item.deptId}>{item.departmentName}</option>
                                        )
                                    })}
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
                                    {designationName !== null && designationName !== undefined &&
                                    designationName.length>0 &&
                                    designationName.map(item => {
                                        return(
                                            <option key={item.designationId}>{item.designation}</option>
                                        )
                                    })}
                                    
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Designation</Form.Label>
                            <Form.Control as='select' value={state.designation} className='form-input'
                                name='designation' onChange={changeHandler} >
                                    <option value=''>Select Designation</option>
                                    {designationName !== null && designationName !== undefined &&
                                    designationName.length>0 &&
                                    designationName.map(item => {
                                        return(
                                            <option key={item.designationId}>{item.designation}</option>
                                        )
                                    })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Cost Center</Form.Label>
                            <Form.Control as='select' value={costCenter} className='form-input'
                                name='costCenter' onChange={costCenterChangeHandler} >
                                    <option value=''>Select Cost Center</option>
                                    {costCenterList !== null && costCenterList !== undefined &&
                                    costCenterList.length > 0 &&
                                    costCenterList.map(item => {
                                        return(
                                            <option key={item.costCenterId}>{item.costCentreName}</option>
                                        )
                                    })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Sports</Form.Label>
                            <Form.Control as='select' value={state.sports} className='form-input'
                                name='sports' onChange={changeHandler} >
                                    <option value=''>Select Sports</option>
                                    {sportsNames !== null && sportsNames !== undefined &&
                                    sportsNames.length > 0 &&
                                    sportsNames.map(item => {
                                        return(
                                            <option key={item.sportId} value={item.sportId}>{item.sportName}</option>
                                        )
                                    }) }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Work Location state</Form.Label>
                            <Form.Control type='text' value={locationName.stateName} className='form-input' readOnly />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Work Location City</Form.Label>
                            <Form.Control type='text' value={locationName.cityName} className='form-input' readOnly />
                        </Form.Group>
                    </Col>
                    
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Probation Period</Form.Label>
                            <Form.Control as='select' value={state.probation} className='form-input'
                                name='probation' onChange={changeHandler} >
                                    <option value=''>Select Probation</option>
                                    <option value='1' >1 Month</option>
                                    <option value='2'>2 Month</option>
                                    <option value='3'>3 Month</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label>Recuritment Source</Form.Label>
                            <Form.Control as='select' value={state.recuritment} className='form-input'
                                name='recuritment' onChange={changeHandler} >
                                    <option value=''>Select Recuritment Source</option>
                                    <option>Employee Referral</option>
                                    <option>LinkedIn</option>
                                    <option>Monster</option>
                                    <option>Naukri</option>
                                    <option>Others</option>
                                    <option>Recruitment Agency</option>
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