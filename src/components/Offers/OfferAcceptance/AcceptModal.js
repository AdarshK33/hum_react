import React, {Fragment, useState, useContext} from 'react';
import {Button, Container, Modal} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import {OfferContext} from '../../../context/OfferState'

const AcceptModal = (props) => {
    const {createCandidateResponse} = useContext(OfferContext)
    let history = useHistory();

    const goToFom = () => {
        
        history.push('./onboard')
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container style={{textAlign:'center', margin:'4rem 0 4rem 0'}}>
                    <Modal.Body>
                        <h6 style={{marginBottom:'1rem'}}>Thank you for Accepting the Offer Letter</h6>
                        <Button onClick={goToFom}>Let's get Started</Button>
                    </Modal.Body>
                </Container>
            </Modal>
        </Fragment>
    );
};

export default AcceptModal;