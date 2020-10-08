import React, { Fragment, useState } from 'react';
import { Table, Row } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'


const ProductivityReportView = (props) => {
    const productivityList = props.productivityList

     /*-----------------Pagination------------------*/
     const [currentPage, setCurrentPage] = useState(1);
     const recordPerPage = 10;
     const totalRecords = productivityList !== null && productivityList !== undefined && productivityList.length;
     const pageRange = 10;
 
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = productivityList !== null && productivityList !== undefined ?
     productivityList.slice(indexOfFirstRecord, indexOfLastRecord) : [];
 
    const handlePageChange = pageNumber => {
     setCurrentPage(pageNumber);
    }
    /*-----------------Pagination------------------*/
    return (
        <Fragment>
            <div className="container-fluid">
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
                                            <th>S. No</th>
                                            <th>Cost Center</th>
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
                                    {currentRecords !== null && currentRecords !== undefined &&
                                        currentRecords.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1 + indexOfFirstRecord}</td>
                                                        <td>{item.costCentre}</td>
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
            </div>
            {productivityList !== null && productivityList !== undefined && productivityList.length > 10 &&
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

export default ProductivityReportView;