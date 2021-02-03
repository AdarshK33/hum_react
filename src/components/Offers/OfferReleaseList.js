import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import {Container, Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Edit2, Eye } from 'react-feather';

const OfferReleaseList = () => {
    return (
        <Fragment>
            <Breadcrumb title="Offers" parent="Offer Release" />
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                <Link to='/managerOfferRelease'><Button className="apply-button btn btn-light mr-2">Initate Offer</Button></Link>
                            </div>
                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th scope="col">S. No</th>
                                            <th scope="col">Candidate ID</th>
                                            <th scope="col">Candidate Name</th>
                                            <th scope="col">Application Date</th>
                                            <th scope="col">Document Verification Status</th>
                                            <th scope="col">Overall Status</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">View</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        <tr>
                                            <td>1</td>
                                            <td>1305</td>
                                            <td>Garima</td>
                                            <td>12/12/2020</td>
                                            <td>Approved</td>
                                            <td>Onboard</td>
                                            <td><Edit2 /></td>
                                            <td><Eye /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default OfferReleaseList;