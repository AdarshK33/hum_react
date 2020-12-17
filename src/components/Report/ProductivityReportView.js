import React, { Fragment, useState, useContext } from 'react';
import { Table, Row, Button } from 'react-bootstrap'
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
    JsonToExcel
} from 'react-json-excel';
import { LeaveContext } from '../../context/LeaveState'
import { toast } from "react-toastify";
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ProductivityReportView = (props) => {
    const productivityList = props.productivityList
    const { loader } = useContext(LeaveContext)

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
   
   
    const disabledText = () => {
        toast.error("No Records to be Export")
    }


    return (
        <Fragment>
            <div className="container-fluid">
                <Row style={{ marginTop: '2rem' }}>
                    <div className="col-sm-12" style={{ padding: '0' }}>
                        <div className="card" style={{ overflowX: "auto" }}>

                            <div className="title_bar" >
                               
                                {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 ?
                                <ExcelFile filename='Productivity Report' element={ <Button className="btn btn-light mr-2"> Export excel</Button>}>
                                    <ExcelSheet data={productivityList} name="Productivity Report" style={{width:'500px'}}>
                                        <ExcelColumn label="Cost Center" value="costCentre" />
                                        <ExcelColumn label="Employee Id" value="employeeId" />
                                        <ExcelColumn label="Employee Name"
                                        value={(col) => col.firstName !== null && col.firstName+' '+ col.lastName} />
                                        <ExcelColumn label="Clusters" value="clusterName" />
                                        <ExcelColumn label="Sports" value="sports" />
                                        <ExcelColumn label="Payment Type"
                                        value={(col) => col.paymentType === null ? "N/A" : col.paymentType} />
                                        <ExcelColumn label="Type of Contract" value="contractType" />
                                        <ExcelColumn label="Hours for the month" value="workingHours" />
                                        <ExcelColumn label="Month" value="duration" />
                                    </ExcelSheet>
                                </ExcelFile>
                               
                                :
                                <Button className="btn btn-light mr-2" onClick={disabledText}>
                                Export excel</Button>
                            } 
                            </div>

                            <div className="table-responsive">
                                <Table className="table table-hover" >
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
                                    {loader === true && currentRecords !== null && currentRecords !== undefined ?
                                        <tbody>
                                            <tr>
                                                <td colspan='10'>
                                                    <div className="loader-box loader" style={{ width: "100% !important" }}>
                                                        <div className="loader">
                                                            <div className="line bg-primary"></div>
                                                            <div className="line bg-primary"></div>
                                                            <div className="line bg-primary"></div>
                                                            <div className="line bg-primary"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        :
                                        currentRecords !== null && currentRecords !== undefined
                                            && currentRecords.length > 0 ?
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
                                            })
                                            : <tbody>
                                                <tr>
                                                    <td colspan='10'>No Record Found</td>
                                                </tr>
                                            </tbody>}

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