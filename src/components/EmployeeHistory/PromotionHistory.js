import React, { Fragment, useState, useContext } from 'react';
import { Table, Row,Col, Button } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Edit2, Eye, Search } from "react-feather";
import '../Leaves/Leaves.css'
import '../AdminLeave/AdminLeaves.css'
import Pagination from 'react-js-pagination'
import moment from 'moment'
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";
import { toast } from "react-toastify";

const PromotionHistory = (props) => {
    const {
        viewPromotionDataById,
        promotionData,
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
    
console.log(dates)
    /*-----------------Pagination------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const totalRecords = promotionData !== null && promotionData !== undefined && promotionData.length;
    const pageRange = 10;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = promotionData !== null && promotionData !== undefined ? promotionData.slice(indexOfFirstRecord, indexOfLastRecord) : [];

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
                  {/* <Col sm={6}>
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
                  </Col> */}
                  <Col  style={{  textAlign:"center",marginTop: "5px" }}>
                    <b>PROMOTION HISTORY</b>
                  </Col>
                </Row></div>

                            <div className="table-responsive">
                                <Table  className="table table-hover" >
                                    <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                                        <tr>
                                            <th>S .NO</th>
                                            <th>EMPLOYEE ID</th>
                                            <th>EMPLOYEE NAME</th>
                                             <th>POSITION</th> 
                                             <th>POSITION PROMOTED TO</th>
                                             <th>PROMOTION DATE</th>
                                             {/* <th>VALIDATED BY COSTCENTERMANAGER</th>
                                             <th>DATE</th>
                                             <th>VALIDATED BY HR/ADMIN</th>
                                            <th>DATE</th>
                                            <th>STATUS</th> */}
                                        </tr>
                                    </thead>
                                    {loader === true && currentRecords !== null &&
                                      currentRecords !== undefined ? 
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
                                    currentRecords !== undefined && currentRecords !== null &&
                                    !currentRecords.includes(null) &&
                                        currentRecords.length > 0 ?
                                        currentRecords.map((item, i) => {
                                            return (
                                                <tbody key={i + 1}>
                                                    <tr>
                                                        <td>{i + 1 + indexOfFirstRecord}</td>
                                                        <td>{item.employeeId}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.oldPosition}</td>
                                                        <td>{item.promotedPosition}</td>
                                                        <td>{ item.promotedDate !== null && 
                                                        item.promotedDate !== undefined 
                                                         && item.promotedDate !== ""?
                                                        moment(new Date(item.promotedDate)).format("DD-MM-YYYY"):""}</td>

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
            {promotionData !== null && promotionData !== undefined && promotionData.length > 10 &&
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

export default PromotionHistory;