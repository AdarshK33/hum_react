import React, { Fragment, useState, useEffect } from 'react';
import { Button, Modal, Container } from 'react-bootstrap'

import ReactSpinner from 'react-bootstrap-spinner'

const RehiredModal = (props) => {
    const [loading, setLoading] = useState(false)

    const onCloseModal = () =>{
        const setModal = props.handleClose
        setModal()
    }
    const closeModal = props.handleClose
    const noClickHandler = () => {
            setLoading(true)
        setTimeout(() => {
            setLoading(false)
            closeModal()
        },5000)        
    }
    const yesClickHandler = () => {
         props.callback(true)
         setTimeout(() => {
            closeModal()
        },1000)  
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container>
                    <Modal.Header style={{border:'none'}} >
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    {loading ? 
                     <Modal.Body style={{ paddingTop: '0px' }}>
                     <div style={{ textAlign: 'center' }}>
                         <p style={{ marginBottom: '6px' }}>
                             Offer declined, the candidate cannot be rehired.
                         </p>
                     </div>
                     <div style={{ textAlign: 'center' }}>
                         <ReactSpinner type="border" color="primary" size="2" /> 
                     </div>
                     <div style={{ textAlign: 'center' }}>
                         <p>Returning back to the portal</p>
                     </div>
                 </Modal.Body>:
                    <Modal.Body style={{paddingTop:'0px'}}>
                        <div style={{textAlign:'center'}}>
                            <p style={{marginBottom:'6px'}}>The Candidate was already employed with us.</p>
                            <p>Previous remarks: Can be rehired in future.</p>
                        </div>
                        <div style={{textAlign:'center'}}>
                            <p> IS the candidate eligible for rehire</p>
                        </div>
                        <div style={{textAlign:'center'}}>
                        <Button size='sm' className="mr-3" onClick={yesClickHandler}>Yes</Button>
                        <Button size='sm' onClick={noClickHandler}>No</Button>
                        </div>
                       
                        
                </Modal.Body>
                }
                    
                </Container>
            </Modal>
        </Fragment>
    );
};

export default RehiredModal;