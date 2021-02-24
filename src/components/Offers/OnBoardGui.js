import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

//import RehiredModal from './RehiredModal'
import './OnBoard.css'


const submitHandler = (e) => {
    e.preventDefault()
}

const OnBoarding = () => {
const[isClicked,setIsClicked]= useState(false)

const AddExtrReferenceClick =() =>{
    setIsClicked(true)
}
const CancelExtrReferenceClick =() =>{
    setIsClicked(false)
}
    return (
    <Fragment>
            <Form onSubmit={submitHandler}>
            <Row style={{ marginBottom: '1rem' }}>
            <Col sm={6}>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={4}>
                        <Form.Group>
                            <div className="inputField">
                                <input  type="text"  required="required" />
                                <label>Name as per Aadhaar</label>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <div className="inputField">
                                <input  type="text"  required="required" />
                                <label>Father's Name</label>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                        <div className="inputField">
                    <DatePicker  requireddateFormat="yyyy-MM-dd"  />
                            <label>Date Of Birth</label>
                            </div>
                            </Form.Group>
                    </Col>
                    
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                <Col sm={4}>
                        <Form.Group>
                            <div  className="ControlField">
                               <Form.Control   as ="select" type="text" placeholder="Blood Group" >
                               <option value=''>Blood Group</option> 
                               <option value='1'>O+</option>
                                <option value='2'>O-</option>
                                 <option value='3'>A+</option>
                                 <option value='4'>A-</option>
                                 <option value='5'>B+</option>
                                 <option value='6'>B+</option>
                                 <option value='7'>AB+</option>
                                 <option value='8'>AB-</option>

                                 </Form.Control>
                                {/* <input  type="text"  required="required" /> */}
                                {/* <label>Blood Group</label> */}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <div  className="inputField">
                                <input  type="text"  required="required"  />
                                <label>Aadhaar Number</label>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <div className="inputField">
                                <input  type="text"  required="required" />
                                <label>Pan Number</label>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                <Col sm={4}>
                        <Form.Group>
                            <div  className="ControlField">
                               <Form.Control   as ="select" type="text"> 
                               <option value=''>Natonality</option>

                                 </Form.Control>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <div  className="ControlField">
                               <Form.Control   as ="select" type="text" > 
                               <option value=''>Disability</option>

                                 </Form.Control>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group>
                            <div  className="ControlField">
                               <Form.Control   as ="select" type="text"  name='probation'  > 
                               <option value=''>LGBT</option>

                                 </Form.Control>
                            </div>
                        </Form.Group>
                    </Col>
               </Row>
               </Col>
               <Col sm={3}>
               <Row style={{ marginBottom: '1rem' }}>
               <Col sm={3} style={{ marginTop: '3rem' }}>
                        <Form.Group>
                        <div className="inputField">
                            <label><b>Gender</b></label>
                            </div>
                            </Form.Group>
                    </Col>
                    <Col sm={4} style={{ marginTop: '3.5rem' }}>
                        <Form.Group>
                        <div className="CheckBoxField" >
                            <label>Male </label>
                        <input  className="largerCheckbox" type="checkbox" value="Male"/>
                            </div>
                            </Form.Group>
                    </Col>
                    <Col sm={5} style={{ marginTop: '3.5rem' }}>
                        <Form.Group>
                        <div className="CheckBoxField" >
                            <label>Female</label>
                        <input  className="largerCheckbox" type="checkbox" value="Female"/>
                            </div>
                            </Form.Group>
                    </Col>

                    </Row>
                    <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={3}   >
                        <Form.Group>
                        <div className="inputField">
                            <label><b>  Marital<br></br>Status</b></label>
                            </div>
                            </Form.Group>
                    </Col>
                    <Col sm={4} >
                        <Form.Group>
                        <div className="CheckBoxField"  style={{ marginTop: '1rem' }}>
                            <label>Married </label>
                        <input  className="largerCheckbox" type="checkbox" value="Married"/>
                            </div>
                            </Form.Group>
                    </Col>
                    <Col sm={5} >
                        <Form.Group>
                        <div className="CheckBoxField" style={{ marginTop: '0.9rem' }}>
                            <label>UnMarried</label>
                            <input  className="largerCheckbox" type="checkbox" value="Unarried"/>
                            </div>
                            </Form.Group>
                    </Col>
                    </Row>
                    </Col>
               </Row>
               <Row style={{ marginBottom: '1rem' }}>
               <Col sm={5} >
                   <div>
                       <label><b>State References</b></label><br></br>
                       <label><b>(Max: Only 2)</b></label>
                           </div>
               </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={2}>
                        <Form.Group>
                            <div className="inputField">
                                <input  type="text"  required="required" />
                                <label>Emp Name/ID</label>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <div className="inputField">
                                <input  type="text"  required="required" placeholder="Email ID"/>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <div className="inputField">
                                <input  type="text"  required="required" placeholder="Designation" />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={1}>
                        <Form.Group>
                            <div >
                                <button className="buttonField  button" onClick={AddExtrReferenceClick} disabled={isClicked}><b> Add + </b></button>
                            </div>
                        </Form.Group>
                    </Col>

                </Row>
                {isClicked ?
                   <Row style={{ marginBottom: '1rem' }}>
                       <Col sm={2}>
                           <Form.Group>
                               <div className="inputField">
                                   <input  type="text"  required="required" />
                                   <label>Emp Name/ID</label>
                               </div>
                           </Form.Group>
                       </Col>
                       <Col sm={2}>
                           <Form.Group>
                               <div className="inputField">
                                   <input  type="text"  required="required" placeholder="Email ID"/>
                               </div>
                           </Form.Group>
                       </Col>
                       <Col sm={2}>
                           <Form.Group>
                               <div className="inputField">
                                   <input  type="text"  required="required" placeholder="Designation" />
                               </div>
                           </Form.Group>
                       </Col>
                       <Col sm={1}>
                        <Form.Group>
                            <div >
                                <button className="buttonField  button" onClick={CancelExtrReferenceClick} disabled={!isClicked}><b> Cancel </b></button>
                            </div>
                        </Form.Group>
                    </Col>
                   </Row>
                   :<div></div>}
                </Form>
        </Fragment>
    );

}
export default OnBoarding;