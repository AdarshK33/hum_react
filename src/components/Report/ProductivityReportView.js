import React, { Fragment } from 'react';
import { Table, Container, Row } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'


const ProductivityReportView = (props) => {
    const productivityList = props.productivityList
    return (
        <Fragment>
            <Container>
                {productivityList &&
                <Row style={{ marginTop: '2rem' }}>
                    <div className="col-sm-12" style={{padding:'0'}}>
                        <div className="card" style={{ overflowX: "auto" }}>

                            <div className="title_bar" >
                                <ReactHTMLTableToExcel
                                    className="btn btn-light mr-2"
                                    table="table-to-xls"
                                    filename="report"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                            </div>

                            <div className="table-responsive">
                                <Table id="table-to-xls" className="table table-hover">
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Employee Id</th>
                                            <th>Sports</th>
                                            <th>Cluster</th>
                                            <th>Type of Contract</th>
                                            <th>Month</th>
                                        </tr>
                                    </thead>
                                    {
                                        productivityList.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.sports}</td>
                                                        <td>{item.clusterName}</td>
                                                        <td>{item.contractType}</td>
                                                        <td>{item.duration}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}

                                </Table>
                            </div>
                        </div>
                    </div>
                </Row>
                }
            </Container>
        </Fragment>
    );
};

export default ProductivityReportView;