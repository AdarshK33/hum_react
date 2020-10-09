import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { LeaveContext } from '../../context/LeaveState'

const DeleteLeave = (props) => {
    const [ltId, setltId] = useState()
    
    const { deleteEmpList  }  = useContext(LeaveContext);

    useEffect(() => {
        setltId(props.ltId)
    }, [props.ltId])

   const deleteModal = props.handleDeleteClose
  let empId = props.empid
  console.log("emp id in delete", empId)
    const deleteListcheck = (id, empId) => {
        console.log("delete id", id)
        deleteEmpList(id, empId)
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
                    <Button variant="primary" className="submitButton"
                        onClick={() => deleteListcheck(ltId, empId)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default DeleteLeave;