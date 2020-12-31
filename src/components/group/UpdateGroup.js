import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Row, Button, Form, Modal, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Multiselect } from 'multiselect-react-dropdown';
import { GroupContext } from '../../context/GroupState'

const UpdateGroup = (props) => {
    const [groupName, setGroupName] = useState()
    const [employee, setEmployee] = useState([])
    const [status, setStatus] = useState()
    const [groupType, setGroupType] = useState()
    const [errormsg, setErrorMsg] = useState(false)

    const statusList = [{ status: 'Active', value: 0, id: 1 },
    { status: 'Inactive', value: 1, id: 2 }]

    const groupTypeList = [{ type: 'Payroll', value: 0, id: 1 },
    { type: 'Others', value: 1, id: 2 }]

    const { updateRole, empList, serviceEmp } = useContext(GroupContext)
    useEffect(() => {
        serviceEmp()
    }, [])

    useEffect(() => {
        setGroupName(props.groupName)
    }, [props.groupName])


    useEffect(() => {

        setEmployee(props.empIds)
        console.log("props.empIds", props.empIds)
    }, [props.empIds])

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    useEffect(() => {
        setGroupType(props.groupType)
    }, [props.groupType])



    const groupNameHandler = (e) => {
        setGroupName(e.target.value)
    }


    const handleMultiChange = (options) => {
        setEmployee(options)
        if(options === null){
            setErrorMsg(true)
        }else{
            setErrorMsg(false)
        }
        console.log("updated multiselect", options)
    }
    const onRemoveEmployee = (options) => {
        setEmployee(options)
        console.log('employee on remove function', employee);
    }

    const validation = () => {
        let flag = true
        if (employee.length === 0) {
           setErrorMsg(true)
            flag = false;
            return;
        }
        return flag;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const validate = validation()

        const updateData = {
            employeeIds: employee.map((e) => e.employeeId),
            groupId: props.groupId,
            groupName: groupName,
            status: parseInt(status)
        }
        console.log("updateData", updateData)
        if(validate){
            updateRole(updateData)

            const setModal = props.handleEditClose;
            setModal()
            setErrorMsg(false)
        }
        
    }

    const onCloseModal = () => {
        const setModal = props.handleEditClose;
        setModal()
        setErrorMsg(false)
    }
    return (
        <Fragment>
            <Modal show={props.modal} onHide={props.handleEditClose} centered>
                <Container>
                    <Modal.Header >
                        <Modal.Title >
                            <h5 className="modal-heading">Update Service Group</h5>
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
                                            //  defaultValue={props.empIds}
                                            selectedValues={props.emps}
                                            displayValue="employeeName"
                                            onRemove={onRemoveEmployee}
                                            onSelect={handleMultiChange}
                                            isMulti
                                        />
                                         {errormsg === true ? <p style={{color:'red',fontWeight:'bold'}}>*This field is Mandatory</p> : ''}
                                    </Form.Group>
                                   
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group>
                                        <Form.Label>Group Type</Form.Label>
                                        <Form.Control as='select' value={groupType} required
                                            onChange={(e) => setGroupType(e.target.value)}>
                                            <option value=''>Select Group Type</option>
                                            {groupTypeList.map((item, id) => {
                                                return (
                                                    <option key={id} value={item.value}>{item.type}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as='select' value={status} required
                                            onChange={(e) => setStatus(e.target.value)}>
                                            {statusList.map((item, id) => {
                                                return (
                                                    <option key={id} value={item.value}>{item.status}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type='submit'>Update</Button>
                        </Form>
                    </Modal.Body>
                </Container>
            </Modal>
        </Fragment>
    );
};

export default UpdateGroup;