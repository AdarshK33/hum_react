import React, { Fragment, useState, useRef,useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import './OnBoard.css'

const submitHandler = (e) => {
    e.preventDefault()
}

const InsuranceNomination = () => {
    const[isChecked, changeCheckState] = useState(false)
    const [count, setCount] = useState(0);


    const handleCheckboxChange =(e) =>{
        changeCheckState(e.target.checked)
        console.log(isChecked)
    }
    const handleNoCheckboxChange =(e) =>{
        changeCheckState(!e.target.checked)
        console.log(isChecked)
    }


    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
      console.log(count)
    };
  
    const handleDecrement = () => {
      setCount(prevCount => prevCount - 1);
    };
   
    return(
        <Fragment>
            <Form onSubmit={submitHandler}> 
            <Row style={{ marginBottom: '1rem' }} className="CheckBoxField">
                <Col sm={2}>
                    <div>
                        <label><b>Employee Name:</b></label>
                        <label><b></b></label>
                    </div>
                </Col>
                <Col sm={2}>
                    <div>
                        <label><b>Gender:</b></label>
                        <label><b></b></label>
                    </div>
                </Col>
                <Col sm={2}>
                    <div>
                        <label><b>Date Of Birth:</b></label>
                        <label><b></b></label>
                    </div>
                </Col>
                <Col sm={2}>
                    <div>
                        <label><b>Age:</b></label>
                        <label><b></b></label>
                    </div>
                </Col>
                <Col sm={2}>
                    <div>
                        <label><b>Blood Group:</b></label>
                        <label><b></b></label>
                    </div>
                </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                <Col sm={5}>
                    <div>
                        <label><b>Enroll Dependents for Insurance Nomination</b></label>
                        <label><b></b></label>
                    </div>
                </Col>
                </Row>
                <Row >
                <Col sm={2}  >
                        <Form.Group>
                        <div  className="boxField input" >
                     <input   type="checkbox"  value="No"  checked={!isChecked}  onChange={handleNoCheckboxChange} />
                         <label>Add New Nominee</label>
                            </div>
                            </Form.Group>
                    </Col>
                <Col  sm={2} style={{ marginLeft: '-6rem' }}>
                        <Form.Group>
                        <div className="boxField input" >
                        <input type="checkbox"  value="Yes"  checked={isChecked} onChange={handleCheckboxChange} />
                         <label>Edit Existing Nominees </label>
                         </div>
                        </Form.Group>
                    </Col>
                    
                </Row>
                {isChecked ? <div></div>
                :<div>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Nominee Name</label>
                    </div>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <div  className="large_select_box">
                            <select> 
                               <option value=''>Relationship</option>

                               </select>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Gender</label>
                    </div>
                    </Form.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Datte Of Birth</label>
                    </div>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Age</label>
                    </div>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <div  className="large_select_box">
                            <select> 
                               <option value=''>Blood Group</option>

                               </select>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <div>

                {(() => {
 
            switch (count) {
               case 1:
                  return ( 
                      <div>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Nominee Name</label>
                    </div>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <div  className="large_select_box">
                            <select> 
                               <option value=''>Relationship</option>

                               </select>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Gender</label>
                    </div>
                    </Form.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Datte Of Birth</label>
                    </div>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                    <Form.Group>
                    <div className="inputFieldLarge">
                    <input  type="text"  required="required" />
                    <label>Age</label>
                    </div>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <div  className="large_select_box">
                            <select> 
                               <option value=''>Blood Group</option>

                               </select>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col className="CenterButton" style={{ marginBottom: '1rem' }}  xs={{ order: 1 }} >
                        <Form.Group>
                            <div >
                                <button className="buttonField  button" onClick={handleDecrement} disabled={false} style={{width: '160px'}} >
                                    <b> Cancel Nominee </b></button>
                                {/* onClick={AddExtrReferenceClick} disabled={isClicked} */}
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                </div>
                       )
               case 2:

                      return (
                        <div>  
                        <Row style={{ marginBottom: '1rem' }}>
                            <Col sm={2}>
                            <Form.Group>
                            <div className="inputFieldLarge">
                            <input  type="text"  required="required" />
                            <label>Nominee Name</label>
                            </div>
                            </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group>
                                    <div  className="large_select_box">
                                    <select> 
                                       <option value=''>Relationship</option>
        
                                       </select>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                            <Form.Group>
                            <div className="inputFieldLarge">
                            <input  type="text"  required="required" />
                            <label>Gender</label>
                            </div>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '1rem' }}>
                            <Col sm={2}>
                            <Form.Group>
                            <div className="inputFieldLarge">
                            <input  type="text"  required="required" />
                            <label>Datte Of Birth</label>
                            </div>
                            </Form.Group>
                            </Col>
                            <Col sm={2}>
                            <Form.Group>
                            <div className="inputFieldLarge">
                            <input  type="text"  required="required" />
                            <label>Age</label>
                            </div>
                            </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group>
                                    <div  className="large_select_box">
                                    <select> 
                                       <option value=''>Blood Group</option>
        
                                       </select>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Col className="CenterButton" style={{ marginBottom: '1rem' }}  xs={{ order: 1 }} >
                                <Form.Group>
                                    <div >
                                        <button className="buttonField  button" onClick={handleDecrement} disabled={false} style={{width: '160px'}} >
                                            <b> Cancel Nominee {count+1} </b></button>
                                        {/* onClick={AddExtrReferenceClick} disabled={isClicked} */}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        </div>
                                          )
                default:
                     return (
                       <div>You are a User.</div>
                         )
                    }

            })()}
            </div>
                {/* Add new nominee button */}
                <Row>
                <Col className="CenterButton" style={{ marginBottom: '1rem' }}  xs={{ order: 1 }} >
                        <Form.Group>
                            <div >
                                <button className="buttonField  button" onClick={handleIncrement} disabled={false} style={{width: '160px'}} >
                                    <b> Add New Nominee +  </b></button>
                                {/* onClick={AddExtrReferenceClick} disabled={isClicked} */}
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                </div>}
                </Form>
                </Fragment>
    );
}
export default InsuranceNomination;