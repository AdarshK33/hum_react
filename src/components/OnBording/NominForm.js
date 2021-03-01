import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Search, PlusCircle, MinusCircle } from 'react-feather';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



const NomineeForm = (props) => {
    const [Valuestate, setValueState] = useState("")
    const[cancelState, setCancelState]= useState(true)

    const cancel=() =>{
        setCancelState(false);
    }

    return (
        
        <Fragment>
            <Form >
            {cancelState ? <div>
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
                    <Col sm={2} style={{marginLeft:"-4rem",marginTop:"-1rem"}}>
                    <Form.Group>
                    <div >
                    <button  onClick ={cancel}  type="cancel" style={{color:"white" ,border:" 2px solid#4466f2"}}>
                    <i class="fa fa-close" style={{fontSize:"20px",color:"red"}}></i>
                        </button>
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
                </div>
                :<div> </div>}
                </Form>
        </Fragment>
        
    );
};

export default NomineeForm;