import React, { Fragment, useState, useEffect } from 'react';
import { Table, Row } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import moment from 'moment'


const AdminReportView = (props) => {
    const reportList = props.AdminReportList
   

    const d1 = props.startDate,
    d2 = props.endDate,
    diff = (d2-d1)/864e5,
    /* dateFormat = {weekday:'long',month:'short',day:'numeric'}, */
    dates = Array.from(
      {length: diff+1},
      (_,i) => {
        const date = new Date() 
        date.setDate(d1.getDate()+i) 
        const displayDate = moment(date).format("YYYY-MM-DD")
        return displayDate
       
        
      }
    )
    
console.log(dates)
    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = reportList !== null && reportList !== undefined && reportList.length;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = reportList !== null && reportList !== undefined ? reportList.slice(indexOfFirstRecord, indexOfLastRecord) : [];

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const getTdData =(data,item)=>{
        let date = "";
        for(let i = 0 ; i < item.leaveReportWithDates.length;i++) {
            
            if(data === item.leaveReportWithDates[i].leavedate){
                date = item.leaveReportWithDates[i].leaveType
            }
        }
        return date
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
                                            {dates.map((date,key) => 
                                                <th {...{key}} >{date} </th>
                                            )}
                                        </tr>
                                    </thead>
                                    {currentRecords !== undefined && currentRecords !== null &&
                                        currentRecords.length > 0 &&
                                        currentRecords.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1 + indexOfFirstRecord}</td>
                                                        <td>{item.leaveReports.employeeId}</td>
                                                        <td>{item.leaveReports.username}</td>
                                                        <td>{item.leaveReports.costCentre}</td>
                                                        <td>{item.leaveReports.workLocation}</td>
                                                        <td>{item.leaveReports.leaveEligible}</td>
                                                        <td>{item.leaveReports.planned === null ?
                                                            0 : item.leaveReports.planned}</td>
                                                        <td>{item.leaveReports.unPlanned === null ?
                                                            0 : item.leaveReports.unPlanned}</td>
                                                        <td>{item.leaveReports.leaveremaining}</td>
                                                        <td>{item.leaveReports.leaveName}</td>
                                                        <td>{item.leaveReports.grantLeave}</td>
                                                        <td>{item.leaveReports.stateLeaveEligible}</td>
                                                        <td>{item.leaveReports.lop}</td>
                                                        {
                                                            dates.map((date,b) => {
                                                                return (
                                                                    <td>{ getTdData(date,item)                                                                  
                                                                }</td> 
                                                                )
                                                            })
                                                       
                                                    }
                                                    </tr>
                                                </tbody>
                                            )
                                        })}

                                </Table>
                                {(reportList !== null && reportList.length <= 0) ? 
                                <p style={{ textAlign: "center" }}>No Record Found</p> : null}
                            </div>
                         
                        </div>
                    </div>
                </Row>
            </div>
            {reportList !== null && reportList !== undefined && reportList.length > 10 &&
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