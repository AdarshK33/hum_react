import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Container, Row, Col, Button, Table} from 'react-bootstrap';
import {AdminContext} from '../../context/AdminState';
import Breadcrumb from '../common/breadcrumb';
import './AdminLeaves.css'

const AdminLeaveView = (props) => {

    const {viewAdminList, leaveAdminList} = useContext(AdminContext)

    useEffect(() => {
        viewAdminList()
    },[])

    return (
        <Fragment>
            <Breadcrumb title="Admin Leave View" parent="Admin Leave View" />
            <Container>
                <Row className="heading-row">
                    <h4>Admin Leaves</h4>
                </Row>
                <Row>
                    <Table className="adminTable">
                        <thead style={{background:'#006EBB', color:'white'}}>
                            <tr>
                                <th>Sr.</th>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Gender</th>
                                <th>Company</th>
                                <th>Department</th>
                                <th></th>
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
                                        <th>{item.company}</th>
                                        <th>{item.department}</th>
                                        <th><Button variant="primary">Apply</Button></th>
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