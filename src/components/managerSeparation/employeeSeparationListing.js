import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

const EmployeeSeparationListing = () => {
    return (
        <>
            <Container>
                <Row className='emp-heading'>
                    <h5>Employee Separation Listing</h5>
                    <Button>Initiate Exit</Button>
                </Row>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Emp ID</th>
                                <th>Employee Name</th>
                                <th>Position</th>
                                <th>Contract Type</th>
                                <th>Resignation Date</th>
                                <th>Last working Day</th>
                                <th>Reason for Resignation</th>
                                <th>Notice Period</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
};

export default EmployeeSeparationListing;