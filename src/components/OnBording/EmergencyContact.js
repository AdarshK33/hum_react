import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import './OnBoard.css'

const submitHandler = (e) => {
    e.preventDefault()
}

const EmergencyContact = () => {
    return(
        <Fragment>
            <Form onSubmit={submitHandler}>
            <Row style={{ marginBottom: '1rem' }}>
                <Col sm={6}>
                    <div>
                        <label><b>Present Address</b></label>
                    </div>
                </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col sm={2}>
                    <div className="inputField">
                    <input  type="text"  required="required" />
                    <label>Name</label>
                    </div>
                    </Col>
                    <Col sm={2}>
                    <div  className="select_box">
                    <select>
                    <option value=''>Relationship</option>
                    </select>
                    </div>
                    </Col>
                    <Col sm={2}>
                    <div className="inputFieldWithoutStar">
                    <input  type="text"  required="required" />
                    <label>Contact No</label>
                    </div>
                    </Col>
                    <Col sm={2}>
                    <div className="inputField">
                    <input  type="text"  required="required" />
                    <label>Address Line 1</label>
                    </div></Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                <Col sm={2}>
                    <div className="inputFieldWithoutStar">
                    <input  type="text"  required="required" />
                    <label>Locality</label>
                    </div>
                    </Col>
                    <Col sm={2}>
                    <div className="inputField">
                    <input  type="text"  required="required" />
                    <label>City</label>
                    </div>
                    </Col>
                    
                    <Col sm={2}>
                    <div  className="select_box">
                    <select>
                    <option value=''>Country</option>
                    </select>
                    </div>
                    </Col>
                    <Col sm={2}>
                    <div className="inputField">
                    <input  type="text"  required="required" />
                    <label>PinCode</label>
                    </div>
                    </Col>
                    
                    
                    </Row>
            </Form>
        </Fragment>
    );
}
export default EmergencyContact;