import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { LeaveContext } from '../../context/LeaveState'

const DeleteLeave = (props) => {
    const [ltId, setltId] = useState()
    
    const { deleteList  }  = useContext(LeaveContext);

    useEffect(() => {
        setltId(props.ltId)
    }, [props.ltId])

   const deleteModal = props.handleDeleteClose
  
    const deleteListcheck = (id) => {
        console.log("delete id", id)
        deleteList(id)
        deleteModal()
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleDeleteClose} centered>
                <Modal.Body style={{ marginTop: '1rem' }}>
                    <h5>Are you sure you want to delete leave ?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="deleteNoButton"
                        onClick={deleteModal}>No</Button>
                    <Button variant="primary" className="deleteYesButton"
                        onClick={() => deleteListcheck(ltId)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default DeleteLeave;