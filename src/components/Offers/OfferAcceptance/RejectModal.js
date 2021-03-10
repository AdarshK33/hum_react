import React, {Fragment, useState} from 'react';
import {Button, Container, Modal} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

const RejectModal = (props) => {
    let history = useHistory();

   
    return (
        <Fragment>
            <Modal show={props.rejectModal} onHide={props.handleRejectClose} centered>
                <Container style={{textAlign:'center', margin:'4rem 0 4rem 0'}}>
                    <Modal.Body>
                        <h6 style={{marginBottom:'1rem'}}>You have declined your Offer Letter, returning back to the portal</h6>
                        <Button onClick={props.handleRejectClose}>Close</Button>
                    </Modal.Body>
                </Container>
            </Modal>
        </Fragment>
    );
};

export default RejectModal;