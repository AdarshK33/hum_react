import React, {Fragment, useState} from 'react';
import {Button, Container, Modal} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

const AcceptModal = (props) => {
    let history = useHistory();

    const goToFom = () => {
        history.push('./manager-offer-release')
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