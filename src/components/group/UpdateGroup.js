import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Row, Button, Form, Modal, Col } from 'react-bootstrap'
import Select from 'react-select'
import { Multiselect } from 'multiselect-react-dropdown';
import { AdminContext } from '../../context/AdminState'
import { ClusterContext } from "../../context/ClusterState";
import { GroupContext} from '../../context/GroupState'
const UpdateGroup = (props) => {
    const [groupName, setGroupName] = useState('')
    let [costCenter, setCostCenter] = useState()
    const [employee, setEmployee] = useState([])
    const [status, setStatus] = useState()

    const statusList = [{ status: 'Active', value: 0, id: 1 },
    { status: 'Inactive', value: 1, id: 2 }]

    const { CostCenter, costCenterList} = useContext(AdminContext)
    const { callClusterEmployeesList,callClusterEmployees} = useContext(ClusterContext);
    const {createRole} = useContext(GroupContext)
    useEffect(() => {
        CostCenter()
    }, [])

  /*   useEffect(() => {
        setGroupName()
    },[])

    useEffect(() => {
        setCostCenter()
    },[])
    useEffect(() => {
        setEmployee()
    },[])
    useEffect(() => {
        setStatus()
    },[])
 */


    const groupNameHandler = (e) => {
        setGroupName(e.target.value)
    }

    const setCostCenterHandler = (options) => {
        let data = options !== null ? options.value : ''
        setCostCenter(options)
        callClusterEmployees(data)        
        console.log("costCenter", data)
    }
    const handleMultiChange = (options) => {
        setEmployee(options)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const createData = {
            employeeIds:  employee.map((e) => e.employeeId),
            groupId: 0,
            groupName: groupName,
            status: parseInt(status)
          }
          console.log("createData", createData)
          createRole(createData)

          const setModal = props.handleEditClose;
          setModal()
    }

    const onCloseModal = () => {
        const setModal = props.handleEditClose;
        setModal()
        setGroupName('')
        setStatus('')
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
                                    <Form.Label>Cost Center</Form.Label>
                                    <Select
                                        name="filters"
                                        placeholder="Select Cost Center"
                                        value={costCenter}
                                        style={{ fontSize: "0.8rem" }}
                                        options={costCenterList !== null ?
                                            costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
                                        onChange={setCostCenterHandler}
                                        required isSearchable />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.Label>Employee Id</Form.Label>
                                    <Multiselect
                                         placeholder="Select Employee"
                                         options={callClusterEmployeesList}
                                         value={employee}
                                         displayValue="employeeName"
                                         onSelect={handleMultiChange}
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

export default UpdateGroup;