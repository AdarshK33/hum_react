import React, { Fragment, useState, useContext } from 'react';
import { Table, Row,Col, Button } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Edit2, Eye, Search } from "react-feather";
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import moment from 'moment'
import { LeaveContext } from '../../context/LeaveState'
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";

import { toast } from "react-toastify";

const EmployeeContractDetails = (props) => {
   // const employeeContractDetailsByIdData = props.EmployeeContractDetailList
    const {
        ViewEmployeeHistoryData,
        employeeHistoryData,
        viewEmployeeContractDetailsById,
        employeeContractDetailsByIdData,
        loader,
        total,
      } = useContext(EmployeeHistoryContext);
console.log("startDate", props.startDate)
console.log("endDate", props.endDate)
    const d1 = props.startDate,
    d2 = props.endDate,
    diff = (d2-d1)/864e5,
    /* dateFormat = {weekday:'long',month:'short',day:'numeric'}, */
    dates = Array.from(
      {length: diff+1},
      (_,i) => {
        const date = new Date() 
        date.setFullYear(d1.getFullYear(), d1.getMonth(), d1.getDate()+i)
        // date.setDate(d1.getDate()+i+dateDiff ) 
        const displayDate = moment(date).format("YYYY-MM-DD")
        return displayDate
       
        
      }
    )
    
console.log(employeeContractDetailsByIdData,"employeeContractDetailsByIdData")
    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = employeeContractDetailsByIdData !== null && employeeContractDetailsByIdData !== undefined && employeeContractDetailsByIdData.length;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = employeeContractDetailsByIdData !== null && employeeContractDetailsByIdData !== undefined ? employeeContractDetailsByIdData.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const getTdData =(data,item)=>{
        console.log("getTdData item",item);
        console.log("getTdData",data);
        let date = "";
        for(let i = 0 ; i < item.leaveReportWithDates.length;i++) {
            
            if(data === item.leaveReportWithDates[i].leavedate){
                date = item.leaveReportWithDates[i].leaveType
            }
        }
        return date
    }
    /*-----------------Pagination------------------*/
    const disabledText = () => {
        toast.error("No Records to be Export")
      }
    return (
        <Fragment>
            <div className="container-fluid">
                <Row style={{ marginTop: '2rem' }}>
                    <div className="col-sm-12">
                        <div className="card" style={{ overflowX: "auto" }}>

                            <div className="title_bar" > <Row>
                  <Col sm={6}>
                    <div
                      style={{
                        width: "65%",
                        float: "left",

                        marginTop: "10px",
                        marginLeft: "8px",
                      }}
                      className="faq-form mr-2"
                    >
                      <input
                        className="form-control searchButton"
                        type="text"
                        value={""}
                        placeholder="Search.."
                        // onChange={(e) => searchHandler(e)}
                      />
                      <Search
                        className="search-icon"
                        style={{ color: "#313131" }}
                        // onClick={searchDataHandler}
                      />
                      <br></br>
                    </div>
                  </Col>
                  <Col sm={3} style={{  textAlign:"center",marginTop: "5px" }}>
                    <b>EMPLOYEE CONTRACT DETAILS</b>
                  </Col>
                </Row></div>

                            <div className="table-responsive">
                                <Table  className="table table-hover" >
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>Emp Id</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Joining Date</th>
                                            <th>Created By</th>
                                            <th>Created On</th>
                                            <th>User Role</th>
                                            <th>Is Active</th>
                                            <th>Last Updated On</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Pin Code</th>
                                            <th>Phone</th>
                                            <th>Address Type</th>
                                            <th>Updated By</th>
                                            <th>Updated On</th>


                                        </tr>
                                    </thead>
                                    {loader === true && employeeContractDetailsByIdData !== null && employeeContractDetailsByIdData !== undefined ? 
                                        <tbody>
                                        <tr>
                                            <td colSpan='12'>
                                                <div className="loader-box loader" style={{ width: "100% !important"}}>
                                                    <div className="loader">
                                                        <div className="line bg-primary"></div>
                                                        <div className="line bg-primary"></div>
                                                        <div className="line bg-primary"></div>
                                                        <div className="line bg-primary"></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>:
                                    employeeContractDetailsByIdData !== undefined &&
                                     employeeContractDetailsByIdData !== null &&
                                     !employeeContractDetailsByIdData.includes(null) &&
                                        employeeContractDetailsByIdData.length > 0 ?
                                        employeeContractDetailsByIdData.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.position}</td>
                                                        <td>{
                                                        item.joiningDate !== null && 
                                                        item.joiningDate !== undefined 
                                                         && item.joiningDate !== ""?
                                                        moment(new Date(item.joiningDate)).format("DD-MM-YYYY"):""}</td>
                                                        <td>{item.createdBy}</td>
                                                        <td>{
                                                         item.createdOn !== null && 
                                                         item.createdOn !== undefined 
                                                          && item.createdOn !== ""?
                                                         moment(new Date(item.createdOn)).format("DD-MM-YYYY"):""}</td>
                                                        <td>{item.userRole}</td>
                                                        <td>{item.isActive}</td>
                                                        <td>{
                                                        item.updatedOn !== null && 
                                                        item.updatedOn !== undefined 
                                                         && item.updatedOn !== ""?
                                                        moment(new Date(item.updatedOn)).format("DD-MM-YYYY"):""}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>{item.pinCode}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.addressType}</td>
                                                        <td>{item.updatedBy}</td>
                                                        <td>{ item.updatedOn !== null && 
                                                        item.updatedOn !== undefined 
                                                         && item.updatedOn !== ""?
                                                        moment(new Date(item.updatedOn)).format("DD-MM-YYYY"):""}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }) :
                                        <tbody>
                                            <tr>
                                                <td colspan='12'>No Record Found</td>
                                            </tr>
                                        </tbody>
                                        }

                                </Table>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
            {employeeContractDetailsByIdData !== null && employeeContractDetailsByIdData !== undefined && employeeContractDetailsByIdData.length > 10 &&
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

export default EmployeeContractDetails;