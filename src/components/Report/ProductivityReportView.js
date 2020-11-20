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

    console.log("PRODUCTVITY LIST " + productivityList)

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }
    /*-----------------Pagination------------------*/
    // export excel start
    const filename = 'productvityreport';
    let fields = {
        "productId": "S. No",
        "costCentre": "Cost Center",
        "employeeId": "Employee Id",
        "firstName": "Name",
        "clusterName": "Cluster",
        "sports": "Sports",
        "paymentType": "Payment Type",
        "contractType": "Type of Contract",
        "workingHours": "Hours for the month",
        "duration": "Month"
    }

    let data = [];
    if (productivityList !== undefined && productivityList !== null) {
        for (let i = 0; i < productivityList.length; i++) {
            data.push({
                productId: i + 1,
                costCentre: productivityList[i].costCentre,
                employeeId: productivityList[i].employeeId,
                firstName: productivityList[i].firstName,
                clusterName: productivityList[i].clusterName,
                sports: productivityList[i].sports,
                paymentType: productivityList[i].paymentType,
                contractType: productivityList[i].contractType,
                workingHours: productivityList[i].workingHours,
                duration: productivityList[i].duration
            })
        }

    }
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
                               {/*  {data.length > 0 ?
                                    <JsonToExcel
                                        data={data}
                                        className="btn btn-light mr-2"
                                        filename={filename}
                                        fields={fields}
                                        text="Export excel"

                                    /> :
                                    <Button className="btn btn-light mr-2" onClick={disabledText}>
                                    Export excel</Button>} */}
                                     {currentRecords !== null && currentRecords !== undefined && currentRecords.length > 0 ?
                                    <ReactHTMLTableToExcel
                                    className="btn btn-light mr-2"
                                    table="table-to-xls"
                                    filename="productivity report"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                                    :
                                    <Button className="btn btn-light mr-2" onClick={disabledText}>
                                    Export excel</Button>
                                }
                            </div>

                            <div className="table-responsive">
                                <Table  className="table table-hover" >
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

                   {/*  ================== other table for export the data  =============================== */}
                            <div className="table-responsive" style={{display:'none'}}>
                                <Table id="table-to-xls" className="table table-hover" >
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
                                    {productivityList !== null && productivityList !== undefined
                                            && productivityList.length > 0 &&
                                            productivityList.map((item, i) => {
                                                return (
                                                    <tbody key={i + 1}>
                                                        <tr>
                                                            <td>{i + 1 }</td>
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