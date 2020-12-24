import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Row, Button, Form, Modal, Col } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import { GroupContext } from '../../context/GroupState'

const CreateGroup = (props) => {
    const [groupName, setGroupName] = useState('')
    const [employee, setEmployee] = useState([])
    const [status, setStatus] = useState()

    const statusList = [{ status: 'Active', value: 0, id: 1 },
    { status: 'Inactive', value: 1, id: 2 }]

    // const { callClusterEmployeesList,callClusterEmployees} = useContext(ClusterContext);
    const { createRole, empList, serviceEmp } = useContext(GroupContext)

    const groupNameHandler = (e) => {
        setGroupName(e.target.value)
    }
    useEffect(() => {
        serviceEmp()
    }, [])
    // const setCostCenterHandler = (options) => {
    //     let data = options !== null ? options.value : ''
    //     setCostCenter(options)
    //     callClusterEmployees(data)        
    //     console.log("costCenter", data)
    // }
    const handleMultiChange = (options) => {
        setEmployee(options)
        console.log("multiselect options", options)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const createData = {
            employeeIds: employee.map((e) => e.employeeId),
            groupId: 0,
            groupName: groupName,
            status: parseInt(status)
        }
        console.log("createData", createData)
        createRole(createData)

        const setModal = props.handleClose;
        setModal()
    }

    const onCloseModal = () => {
        const setModal = props.handleClose;
        setModal()
        setGroupName('')
        setStatus('')
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleClose} centered>
                <Container>
                    <Modal.Header >
                        <Modal.Title >
                            <h5 className="modal-heading">Create Service Group</h5>
                        </Modal.Title>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group>
                                        <Form.Label>Group Name</Form.Label>
                                        <Form.Control type='text' value={groupName} required
                                            onChange={groupNameHandler} placeholder="Group Name" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group>
                                        <Form.Label>Employee Id</Form.Label>
                                        <Multiselect
                                            placeholder="Select Employee"
                                            options={empList}
                                            value={employee}
                                            displayValue="employeeName"
                                            onSelect={handleMultiChange}
                                            selectionLimit='10'
                                            isMulti
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as='select' value={status} required
                                            onChange={(e) => setStatus(e.target.value)}>
                                            <option value=''>Select Status</option>
                                            {statusList.map((item, id) => {
                                                return (
                                                    <option key={id} value={item.value}>{item.status}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type='submit'>Create</Button>
                        </Form>
                    </Modal.Body>
                </Container>
            </Modal>
        </Fragment>
    );
};

export default CreateGroup;