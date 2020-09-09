import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Container, Row, Col, Button, Table} from 'react-bootstrap';
import {AdminContext} from '../../context/AdminState';
import Breadcrumb from '../common/breadcrumb';
import AdminLeaveAdd from './AdminLeaveAdd'
import '../Leaves/Leaves.css'
import './AdminLeaves.css'

const AdminLeaveView = (props) => {
    const [modal, setModal] = useState(false)
    const [employeeId, setEmployeeId] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const {viewAdminList, leaveAdminList} = useContext(AdminContext)

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    useEffect(() => {
        viewAdminList()
    },[])

    return (
        <Fragment>
            <Breadcrumb title="Admin" parent="Admin" />
            <Container>
                <Row className="heading-row">
                    <h4>Employee Listing</h4>
                </Row>
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Employees </Col>
                    <Col>
                        <Button className="apply-button" onClick={handleShow}>Apply</Button>
                    </Col>
                    <AdminLeaveAdd handleClose={handleClose} modal={modal} />
                </Row>
                <Row className="table">
                    <Table >
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        {leaveAdminList.length > 0 &&
                        leaveAdminList.map((item,i) => {
                            return(
                                <tbody key={i}>
                                    <tr>
                                        <th>{i+1}</th>
                                        <th>{item.employeeId}</th>
                                        <th>{item.firstName} {item.lastName}</th>
                                        <th>{item.gender}</th>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                </Row>
            </Container>
        </Fragment>
    );
};

export default AdminLeaveView;