import React, { Fragment } from 'react';
import { Table, Container, Row } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'


const AdminReportView = (props) => {
    const reportList = props.AdminReportList
    return (
        <Fragment>
            <Container>
                {reportList.length > 0 &&
                <Row style={{ marginTop: '2rem' }}>
                    <div className="col-sm-12">
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
                                            <th>Employee Name</th>
                                            <th>Cost Center</th>
                                            <th>Work Location</th>
                                            <th>Eligible Leaves</th>
                                            <th>Planned Leaves</th>
                                            <th>Unplanned Leaves</th>
                                            <th>Leaves Remaining</th>
                                            <th>Leave Type</th>
                                            <th>Grant Leaves</th>
                                            <th>State Eligible Leaves</th>
                                            <th>LOP</th>
                                        </tr>
                                    </thead>
                                    {
                                        reportList.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.costCentre}</td>
                                                        <td>{item.workLocation}</td>
                                                        <td>{item.leaveEligible}</td>
                                                        <td>{item.planned}</td>
                                                        <td>{item.unPlanned}</td>
                                                        <td>{item.leaveremaining}</td>
                                                        <td>{item.leaveName}</td>
                                                        <td>{item.grantLeave}</td>
                                                        <td>{item.stateLeaveEligible}</td>
                                                        <td>{item.lop}</td>
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

export default AdminReportView;