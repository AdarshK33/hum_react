import React, { Fragment, useState, useRef,useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import './OnBoard.css'
import NomineeForm from './NominForm';
import EmployeeForm from '../Offers/employeeForm'

const submitHandler = (e) => {
    e.preventDefault()
}
var NomineeArray = [0,0,0,0,0];

const InsuranceNomination = () => {
    const[isChecked, changeCheckState] = useState(false)
    const [count, setCount] = useState(0);
    const[NomineeCount,setNomineeCount]= useState(1)

    
    
    const handleCheckboxChange =(e) =>{
        changeCheckState(e.target.checked)
        console.log(isChecked)
    }
    const handleNoCheckboxChange =(e) =>{
        changeCheckState(!e.target.checked)
        console.log(isChecked)
    }


    const handleIncrement = () => {
        setNomineeCount(NomineeCount + 1);
        NomineeArray[NomineeCount]= 1;
        console.log(NomineeArray)
      console.log(NomineeCount)
    };
  
    const handleDecrement = () => {
      setCount(prevCount => prevCount - 1);
    };

   
    return(
        <Fragment>
            {/* <Form onSubmit={submitHandler}>  */}
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
                    {(() => {switch (NomineeCount) {
                    case 1:
                        return (<NomineeForm /> )
                    case 2:
                        return (<div><NomineeForm /> 
                        <NomineeForm /> </div>)
                    case 3:
                        return (<div><NomineeForm /> 
                            <NomineeForm />
                            <NomineeForm /></div>)
                    default:
                        return (
                            <div>Nominees.</div>
                            )
                     }

                })()}
                     
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
                </Fragment>

    );
}
export default InsuranceNomination;
