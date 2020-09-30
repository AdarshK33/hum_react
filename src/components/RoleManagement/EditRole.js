import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from 'multiselect-react-dropdown';


const EditRole = (props) => {
    
    
    const onSubmit = e => {
    
       
        
      }
      const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
        { label: "Watermelon 🍉", value: "watermelon" },
        { label: "Pear 🍐", value: "pear" },
        { label: "Apple 🍎", value: "apple" },
        { label: "Tangerine 🍊", value: "tangerine" },
        { label: "Pineapple 🍍", value: "pineapple" },
        { label: "Peach 🍑", value: "peach" },
      ];

     
        
      const onCloseModal = () => {
        const setModal = props.handleEditClose;
        setModal();
   
        }
    
   
   
    return (
        <React.Fragment>
            <ToastContainer />
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container style={{ paddingBottom: '1rem' }}>
                    <Modal.Header >
                        <Modal.Title >
                            <h4>Screen Permissions</h4>
                        </Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" 
                        onClick={onCloseModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <div className="col-sm-12">
                                <Form.Group>
                                        <Form.Label>Role Name :</Form.Label>
                                        <Form.Control as="input" required value = "Administrator"/>                                           
                                    </Form.Group>
                                </div>
                            </Row>
                           
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Role Description :</Form.Label>
                                        <Form.Control as="input" required value = ""/>                                           
                                    </Form.Group>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-sm-12">
                                    <Form.Group>
                                        <Form.Label>Screen Permissions :</Form.Label>
                                       <Multiselect
                                            required
                                            placeholder="Select Permissions"
                                            options={options}
                                            value={options}
                                            displayValue="firstName"
                                            // onSelect={handleMultiChange1}
                                            isMulti
                                        />
                                                    
                                    </Form.Group>
                                </div>
                            </Row>
                
                            <Button  className="mb-2 mr-2" type="submit" >Submit</Button>
                            <Button className="mb-2 mr-2"  onClick={props.handleClose}>close</Button>
                        </Form>

                    </Modal.Body>
                </Container>
            </Modal>

        </React.Fragment>
    
    );
};

export default EditRole;