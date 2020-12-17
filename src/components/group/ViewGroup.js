import React, {Fragment} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

const ViewGroup = () => {
    return (
        <Fragment>
            <Breadcrumb title="View Group" parent="View Group" />
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="card" style={{ overflowX: "auto" }}>
                            <div className="title_bar" >
                                    {/* <div className="job-filter">
                                        <div className="faq-form mr-2">
                                            <input className="form-control searchButton" type="text" placeholder="Search.." onChange={(e) => searchHandler(e)} />
                                            <Search className="search-icon" style={{ color: "#313131" }} onClick={searchDataHandler} />
                                        </div>
                                    </div> */}
                                <Button className="apply-button btn btn-light mr-2">Create</Button>
                            </div>
                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Employee Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>DSI50013</td>
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

export default ViewGroup;