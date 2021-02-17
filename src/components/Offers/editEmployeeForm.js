import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Search, PlusCircle, MinusCircle } from 'react-feather';
import './offers.css'
import { OfferContext } from '../../context/OfferState'
import { useHistory } from "react-router-dom";


const EditEmployeeForm = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [yesChecked, setYesChecked] = useState(true)
    const [noChecked, setNoChecked] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [editButton, setEditButton] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [empName1, setEmpName1] = useState('')
    const [empName2, setEmpName2] = useState('')
    const [refEmail1, setRefEmail1] = useState()
    const [refEmail2, setRefEmail2] = useState()
    const [desgination1, setDesignation1] = useState()
    const [desgination2, setDesignation2] = useState()

    const {   candidateData, searchForEmp1, editCandidate, searchForEmp2 } = useContext(OfferContext)


    useEffect(() => {
        let candidateRefData = candidateData !== null && candidateData !== undefined && candidateData.candidateInformation
        console.log("candidateData outside",candidateRefData)
        if(candidateRefData !== null && candidateRefData !== undefined  ){
            console.log("candidateData",candidateRefData)
            setFirstName(candidateRefData.firstName)
            setLastName(candidateRefData.lastName)
            setEmail(candidateRefData.personalEmail)
    
            candidateRefData.candidateReferences !== null && candidateRefData.candidateReferences !== undefined &&
            candidateRefData.candidateReferences.length > 0 ?
           (()=>{setYesChecked(true); setNoChecked(false)})()  : (()=>{setYesChecked(false); setNoChecked(true)})()
    
         const data1 = candidateRefData.candidateReferences !== null && candidateRefData.candidateReferences !== undefined &&
         candidateRefData.candidateReferences[0]
                        setEmpName1(data1.employeeName)
                        setRefEmail1(data1.email)
               setDesignation1(data1.designation)
           const data2 = candidateRefData.candidateReferences !== null && candidateRefData.candidateReferences !== undefined &&
           candidateRefData.candidateReferences[1]
                        setEmpName2(data2.employeeName)
                        setRefEmail2(data2.email)
               setDesignation2(data2.designation)
               
        }
      
    },[candidateData])
    

   const firstNameChangeHandler = (e) => {
       setFirstName(e.target.value)
   }
   const lastNameChangeHandler = (e) => {
    setLastName(e.target.value)
}
const emailChangeHandler = (e) => {
    setEmail(e.target.value)
}
    const empName1Handler = (e) => {
        setEmpName1(e.target.value)
    }
    const empName2Handler = (e) => {
        setEmpName2(e.target.value)
    }
    const empName1Search = () => {
        if (empName1 !== "") {
            searchForEmp1(empName1)
        }

    }
    const empName2Search = () => {
        if (empName2 !== "") {
            searchForEmp2(empName2)
        }

    }

    const submitHandler = (e) => {
        e.preventDefault()

      const updateData = {
        adharDoc: null,
        adharName: null,
        adharNumber: candidateData.candidateInformation.adharNumber,
        bloodGroup: null,
        candidateId: candidateData.candidateInformation.candidateId,
        candidateReferences: [
            {
                designation: desgination1 !== null ? desgination1 : null,
                email: refEmail1 !== null ? refEmail1 : null,
                employeeName: empName1 !== null ? empName1 : null
              },
          {
            designation: desgination2 !== null ? desgination2 : null,
            email: refEmail2 !== null ? refEmail2 : null,
            employeeName: empName2 !== null ? empName2 : null
          }
        ],
        createdDate: candidateData.candidateInformation.createdDate,
        dateOfBirth: null,
        disability: null,
        disabilityDoc: null,
        fatherName: null,
        firstName: firstName,
        gender: null,
        lastName: lastName,
        lgbt: null,
        maritalStatus: null,
        nationality: null,
        panDoc: null,
        panNumber: null,
        personalEmail: email,
        photo: null,
        referred: candidateData.candidateInformation.referred,
        status: candidateData.candidateInformation.status,
        statusDesc: candidateData.candidateInformation.statusDesc,
        verificationStatus: candidateData.candidateInformation.verificationStatus,
        verificationStatusDesc: candidateData.candidateInformation.verificationStatusDesc
      }
      editCandidate(updateData)
        setDisabled(true)
        setEditButton(true)

    }
    const editHandler = () => {
        setDisabled(false)
    }
    return (
        <Fragment>
            <Form onSubmit={submitHandler}>
           {/*  <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Search by Account Number/Aadhar Number</Form.Label>
                            <div className="faq-form">
                                <input className="form-control searchButton" type="text" readOnly
                                value={ candidateData.candidateInformation.adharNumber || ''} />
                            </div>
                        </Form.Group>
                    </Col>
                </Row> */}
                <Row>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='form-input' type='text' name='firstName'
                                value={firstName} onChange={firstNameChangeHandler} required
                                placeholder='First Name' disabled={disabled} />
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='form-input' type='text' name='lastName'
                                value={lastName} onChange={lastNameChangeHandler} required
                                placeholder='Last Name' disabled={disabled} />
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label>Personal Email ID</Form.Label>
                            <Form.Control type='email' className='form-input' name='email'
                                value={email} onChange={emailChangeHandler} required
                                placeholder='Personal Email ID' disabled={disabled} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <p>Were you referred for this position?</p>
                    </Col>
                    <Col sm={4}>
                        Yes &nbsp; <input type='checkbox' name='refrence' checked={yesChecked} />&nbsp; &nbsp;&nbsp; &nbsp;
                        No &nbsp; <input type='checkbox' name='refrence' checked={noChecked} />
                    </Col>
                </Row>
                {yesChecked === true ?
                    <Fragment>
                        <Row>
                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>Emp Name/Emp ID</Form.Label>
                                    <div className="faq-form">
                                        <input className="form-control searchButton" type="text" disabled={disabled}
                                        value={empName1}  placeholder="Search by Emp Name/Emp Id" 
                                        onChange={(e) => empName1Handler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} 
                                        onClick={empName1Search} />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className='form-input' type='text' value={refEmail1}
                                        readOnly />
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Form.Group>
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control className='form-input' type="text" 
                                    value={desgination1} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                    
                    <Row>
                        <Col sm={4}>
                            <Form.Group>
                                <Form.Label>Emp Name/Emp ID</Form.Label>
                                    <div className="faq-form">
                                        <input className="form-control searchButton" type="text" disabled={disabled}
                                        value={empName2}  placeholder="Search by Emp Name/Emp Id" 
                                        onChange={(e) => empName2Handler(e)} />
                                        <Search className="search-icon" style={{ color: "#313131" }} onClick={empName2Search} />
                                    </div>
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control className='form-input' type='text' readOnly 
                                value={empName2 === '' ? '' : refEmail2} />
                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group>
                                <Form.Label>Designation</Form.Label>
                                <Form.Control className='form-input' type="text" 
                                value={empName2 === '' ? '': desgination2} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    </Fragment>
                    :''}
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={2}>
                        <Button type='submit'>Save</Button>
                    </Col>
                    {editButton === true ?
                        <Col sm={2}>
                            <Button onClick={editHandler}>Edit</Button>
                        </Col> : ''
                    }
                </Row>
            </Form>
        </Fragment>
    );
};

export default EditEmployeeForm;