import React, { Fragment, useState } from 'react';
import { Table, Row } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'


const AdminReportView = (props) => {
    const reportList = props.AdminReportList

     /*-----------------Pagination------------------*/
     const [currentPage, setCurrentPage] = useState(1);
     const recordPerPage = 10;
     const totalRecords = reportList !== null && reportList.length;
     const pageRange = 10;
 
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = reportList !== null ? reportList.slice(indexOfFirstRecord, indexOfLastRecord) : [];
 
    const handlePageChange = pageNumber => {
     setCurrentPage(pageNumber);
    }
    /*-----------------Pagination------------------*/
    return (
        <Fragment>
            <div className="container-fluid">
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
                                            <th>S. No</th>
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
                                    {currentRecords !== undefined && currentRecords !== null && 
                                    currentRecords.length > 0 &&
                                        reportList.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1 + indexOfFirstRecord}</td>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.costCentre}</td>
                                                        <td>{item.workLocation}</td>
                                                        <td>{item.leaveEligible}</td>
                                                        <td>{item.planned === null ? 0 : item.planned}</td>
                                                        <td>{item.unPlanned === null ? 0 : item.unPlanned}</td>
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
            </div>
            {reportList !== null && reportList.length > 10 &&
                <Pagination
                    itemClass="page-item" 
                    linkClass="page-link"
                    activePage={currentPage}
                    itemsCountPerPage={recordPerPage}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={pageRange}
                    onChange={handlePageChange}
                />
                }
        </Fragment>
    );
};

export default AdminReportView;