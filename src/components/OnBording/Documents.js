import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
// import './OnBoard.css'
import './Documents.css'

const submitHandler = (e) => {
    e.preventDefault()
}
const Documents = () => {
    return(
        <div className="parent"  >
            <button className="buttonField1 button" >Personal Documents</button>
            <button  className="buttonField2 button" disabled={true} >Education & Work Documents</button>
        </div>
    );
}
export default Documents;