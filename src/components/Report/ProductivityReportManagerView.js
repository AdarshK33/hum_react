import React, { Fragment } from 'react';
import { Table, Container, Row } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'


const ProductivityReportManagerView = (props) => {
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
                                <Table id="table-to-xls" className="table table-hover" style={{tableLayout:'fixed'}}>
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Employee Id</th>
                                            <th>Name</th>
                                            <th>Cluster</th>
                                            <th>Sports</th>
                                            <th>Payment Type</th>
                                            <th>Type of Contract</th>
                                            <th>Hours for the month</th>
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
                                                        <td>{item.firstName} {item.lastName}</td>
                                                        <td>{item.clusterName}</td>
                                                        <td>{item.sports}</td>
                                                        <td>{item.paymentType}</td>
                                                        <td>{item.contractType}</td>
                                                        <td>{item.workingHours}</td>
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

export default ProductivityReportManagerView;