import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { AdminContext } from '../../context/AdminState';
import Breadcrumb from '../common/breadcrumb';
import AdminLeaveAdd from './AdminLeaveAdd'
import '../Leaves/Leaves.css'
import './AdminLeaves.css'

const AdminLeaveView = (props) => {
    const [modal, setModal] = useState(false)
    const [employeeId, setEmployeeId] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const { viewAdminList, leaveAdminList } = useContext(AdminContext)

    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)

    useEffect(() => {
        viewAdminList()
    }, [])

    return (
        <Fragment>
            <Breadcrumb title="Admin" parent="Admin" />
            <Container>
                <Row className="heading-row">
                    <h4 className="main-heading">Employee Listing</h4>
                </Row>
                <Row className="apply-button-row">
                    <Col className="leaveApplications">Employees </Col>
                    <Col>
                        <Button className="apply-button btn btn-light" onClick={handleShow}>Apply</Button>
                    </Col>
                    <AdminLeaveAdd handleClose={handleClose} modal={modal} />
                </Row>
                <div className="table-responsive">
                    <Table id="table-to-xls" className="table table-hover">
                        <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                            <tr>
                                <th>Sr.</th>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        {leaveAdminList.length > 0 &&
                            leaveAdminList.map((item, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.employeeId}</td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.gender}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                    </Table>
                </div>
            </Container>
        </Fragment>
    );
};

export default AdminLeaveView;