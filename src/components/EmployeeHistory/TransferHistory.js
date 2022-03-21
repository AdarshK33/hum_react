// import React, { Fragment, useState, useContext } from 'react';
// import { Table, Row,Col, Button } from 'react-bootstrap'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import { Edit2, Eye, Search } from "react-feather";
// import '../Leaves/Leaves.css'
// import '../AdminLeave/AdminLeaves.css'
// import Pagination from 'react-js-pagination'
// import moment from 'moment'
// import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";
// import { toast } from "react-toastify";

// const TransferHistory = (props) => {
//     const {
//         viewSportDataById,
//         sportData,
//         loader,
//         total,
//       } = useContext(EmployeeHistoryContext);    
// console.log("startDate", props.startDate)
// console.log("endDate", props.endDate)
//     const d1 = props.startDate,
//     d2 = props.endDate,
//     diff = (d2-d1)/864e5,
//     /* dateFormat = {weekday:'long',month:'short',day:'numeric'}, */
//     dates = Array.from(
//       {length: diff+1},
//       (_,i) => {
//         const date = new Date() 
//         date.setFullYear(d1.getFullYear(), d1.getMonth(), d1.getDate()+i)
//         // date.setDate(d1.getDate()+i+dateDiff ) 
//         const displayDate = moment(date).format("YYYY-MM-DD")
//         return displayDate
       
        
//       }
//     )
    
// console.log(dates)
//     /*-----------------Pagination------------------*/
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordPerPage = 10;
//     const totalRecords = sportData !== null && sportData !== undefined && sportData.length;
//     const pageRange = 10;

//     const indexOfLastRecord = currentPage * recordPerPage;
//     const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
//     const currentRecords = sportData !== null && sportData !== undefined ? sportData.slice(indexOfFirstRecord, indexOfLastRecord) : [];

//     const handlePageChange = pageNumber => {
//         setCurrentPage(pageNumber);
//     }

//     const getTdData =(data,item)=>{
//         console.log("getTdData item",item);
//         console.log("getTdData",data);
//         let date = "";
//         for(let i = 0 ; i < item.leaveReportWithDates.length;i++) {
            
//             if(data === item.leaveReportWithDates[i].leavedate){
//                 date = item.leaveReportWithDates[i].leaveType
//             }
//         }
//         return date
//     }
//     /*-----------------Pagination------------------*/
//     const disabledText = () => {
//         toast.error("No Records to be Export")
//       }
//     return (
//         <Fragment>
//             <div className="container-fluid">
//                 <Row style={{ marginTop: '2rem' }}>
//                     <div className="col-sm-12">
//                         <div className="card" style={{ overflowX: "auto" }}>

//                             <div className="title_bar" > <Row>
//                   {/* <Col sm={6}>
//                     <div
//                       style={{
//                         width: "65%",
//                         float: "left",

//                         marginTop: "10px",
//                         marginLeft: "8px",
//                       }}
//                       className="faq-form mr-2"
//                     >
//                       <input
//                         className="form-control searchButton"
//                         type="text"
//                         value={""}
//                         placeholder="Search.."
//                         // onChange={(e) => searchHandler(e)}
//                       />
//                       <Search
//                         className="search-icon"
//                         style={{ color: "#313131" }}
//                         // onClick={searchDataHandler}
//                       />
//                       <br></br>
//                     </div>
//                   </Col> */}
//                   <Col  style={{  textAlign:"center",marginTop: "5px" }}>
//                     <b>TRANSFER</b>
//                   </Col>
//                 </Row></div>

//                             <div className="table-responsive">
//                                 <Table  className="table table-hover" >
//                                     <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
//                                         <tr>
//                                             <th>S .No</th>
//                                             <th>sport Name</th>
                                        
//                                             <th>Created By</th>
//                                             <th>Created On</th>


//                                         </tr>
//                                     </thead>
//                                     {loader === true && currentRecords !== null && currentRecords !== undefined ? 
//                                         <tbody>
//                                         <tr>
//                                             <td colSpan='12'>
//                                                 <div className="loader-box loader" style={{ width: "100% !important"}}>
//                                                     <div className="loader">
//                                                         <div className="line bg-primary"></div>
//                                                         <div className="line bg-primary"></div>
//                                                         <div className="line bg-primary"></div>
//                                                         <div className="line bg-primary"></div>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </tbody>:
//                                     currentRecords !== undefined && currentRecords !== null &&
//                                     !currentRecords.includes(null) &&
//                                         currentRecords.length > 0 ?
//                                         currentRecords.map((item, i) => {
//                                             return (
//                                                 <tbody key={i + 1}>
//                                                     <tr>
//                                                         <td>{i + 1 + indexOfFirstRecord}</td>
//                                                         <td>{item.leaveReports.employeeId}</td>
//                                                         <td>{item.leaveReports.username}</td>
//                                                         <td>{item.leaveReports.costCentre}</td>
//                                                         <td>{item.leaveReports.workLocation}</td>
//                                                         <td>{i + 1 + indexOfFirstRecord}</td>
//                                                     </tr>
//                                                 </tbody>
//                                             )
//                                         }) :
//                                         <tbody>
//                                             <tr>
//                                                 <td colspan='12'>No Record Found</td>
//                                             </tr>
//                                         </tbody>
//                                         }

//                                 </Table>
//                             </div>
//                         </div>
//                     </div>
//                 </Row>
//             </div>
//             {sportData !== null && sportData !== undefined && sportData.length > 10 &&
//                 <Pagination
//                     itemClass="page-item"
//                     linkClass="page-link"
//                     activePage={currentPage}
//                     itemsCountPerPage={recordPerPage}
//                     totalItemsCount={totalRecords}
//                     pageRangeDisplayed={pageRange}
//                     onChange={handlePageChange}
//                 />
//             }
//         </Fragment>
//     );
// };

// export default TransferHistory;



import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Breadcrumb from "../common/breadcrumb";
import { TransferContext } from "../../context/TransferState";
import TRANSFER_TABLE_HEADERS from "./TableHeaders";
import TableComponent from "../table/Table.component";
import LoaderIcon from "../Loader/LoaderIcon";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";
 import { toast } from "react-toastify";
const TransferPage = () => {
  const recordsPerPage = 10;
  const pageRange = 10;
  const {
    getTransferList,
    transferList,
    chnageTransferType,
    TRANSFERtype,
  } = useContext(TransferContext);
  const { rolePermission } = useContext(PermissionContext);
  const { makeBonusByContractTypeEmpty } = useContext(BonusContext);
  const { user } = useContext(AppContext);
  const [transferType, setTransferType] = useState(TRANSFERtype);
  const [searchValue, setSearchValue] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [listHeading, setListHeading] = useState(`${transferType} `);
  const [apiUrl, setApiUrl] = useState(
    `/api/v1/transfer/view?key=${searchValue}&page=${
      activePage - 1
    }&size=${recordsPerPage}&status=${status}&transferType=${transferType}`
  );
  const {
            viewSportDataById,
            sportData,
            loader,
            total,
          } = useContext(EmployeeHistoryContext);    
  const isDateBeforeToday = (date) => {
    console.log("yes");
    if (date !== null && date !== undefined && date !== "") {
      console.log("oooooo", new Date(date) < new Date());
      return new Date(date) < new Date();
    } else {
      console.log("no");
      return false;
    }
  };
  const TableHeaders =
    transferType === "Regular Transfer"
      ? TRANSFER_TABLE_HEADERS.regular
      : transferType === "Entity Transfer"
      ? TRANSFER_TABLE_HEADERS.entity
      : transferType === "International Transfer"
      ? TRANSFER_TABLE_HEADERS.international
      : TRANSFER_TABLE_HEADERS.employment;
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    getTransferList(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    makeBonusByContractTypeEmpty();
  }, []);
  /* Creating Table Body Data */
  useEffect(() => {
    if (
      transferList !== null &&
      transferList !== undefined &&
      transferList.length > 0
    ) {
      if (transferType === "Regular Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            curDept: item.currentDepartment,
            curPos: item.currentPosition,
            curCostCent: item.currentCostCentre,
            curManager: item.currentManagerName,
            curLocation: item.currentLocationName,
            newDept: item.promotedDepartment,
            newPos: item.promotedPosition,
            newCostCent: item.promotedCostCentre,
            newManager: item.promotedManagerName,
            newLocation: item.promotedLocationName,
            status: item.statusDesc,
         
          };
        });
        setTableBody(tableData);
      } else if (transferType === "Entity Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldEntity: item.currentCompany,
            newEmpId: item.promotedEmployeeId,
            newEntity: item.promotedCompany,
            newManager: item.promotedManagerName,
            effectiveDate: item.promotedJoiningDate,
            status: item.statusDesc,
            alert: {
              active: item.refId ? true : false,
              link: item.refId ? "link" : "",
              refId: item.refId ? parseInt(item.refId) : null,
            },
          };
        });
        setTableBody(tableData);
      } else if (transferType === "Employment Type Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldEmpContractType: item.currentContractType,
            newEmpContractType: item.promotedContractType,
            effectiveDate: item.promotedJoiningDate,
            status: item.status === 0 ? "Completed" : item.statusDesc,
            alert: {
              active: item.refId ? true : false,
              link: item.refId ? "link" : "",
              refId: item.refId ? parseInt(item.refId) : null,
            },
          };
        });
        setTableBody(tableData);
      } else if (transferType === "International Transfer") {
        let tableData = transferList.map((item, index) => {
          return {
            sno: index + 1,
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            oldCountry: item.currentCountry,
            oldDesignation: item.currentPosition,
            newCountry: item.promotedCountry,
            newDesignation: item.promotedDesignation,
            effDate: item.promotedJoiningDate,
            dateOfReturn: item.promotedDateOfReturn,
            termOfProject: item.promotedTermOfProject,
            contractStatus:
              item.contractStatus !== "" &&
              item.contractStatus !== null &&
              item.contractStatus !== undefined
                ? item.contractStatus
                : "NA",
            status:
              item.status === 0 ? "Request Sent To Admin" : item.statusDesc,
          };
        });
        setTableBody(tableData);
      } else {
        setTableBody([]);
      }
    } else {
      setTableBody([]);
    }
  }, [transferList]);

  const handlePageChange = (page) => {
    setActivePage(page);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchValue}&page=${
        page - 1
      }&size=${recordsPerPage}&status=${status}&transferType=${transferType}`
    );
  };

  const changeInTransferType = (e) => {
    const transfer = e.target.value;
    setTransferType(transfer);
    setListHeading(`${transfer} Listings`);
    setActivePage(1);
    chnageTransferType(transfer);
    setApiUrl(
      `/api/v1/transfer/view?key=${searchValue}&page=${
        activePage - 1
      }&size=${recordsPerPage}&status=${status}&transferType=${transfer}`
    );
  };

  
  console.log("user->", user);
 
  return (
    <Fragment>
                <div className="container-fluid">   
            <Row style={{ marginTop: '2rem' }}>
             <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="transfer-list-page">
                <div
                  className="title_bar"
                >
                  <Row
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  >
                    <Col md={2} style={{ marginTop: "-3px" }}>
                      <Form.Control
                        as="select"
                        aria-label="Select Transfer Type"
                        value={transferType}
                        onChange={changeInTransferType}
                        className="probation_status_search"
                      >
                        <option disabled>Select Transfer Type</option>
                        <option value="Regular Transfer">
                          Regular Transfer
                        </option>
                        <option value="Entity Transfer">Entity Transfer</option>
                        <option value="International Transfer">
                          International Transfer
                        </option>
                        <option value="Employment Type Transfer">
                          Change In Employment Type Transfer
                        </option>
                      </Form.Control>
                    </Col>
                    <Col  style={{  textAlign:"center",marginTop: "5px" }}
                      className="font-weight-bold text-uppercase text-center my-auto"
                    >
                      {transferType === "Employment Type Transfer"
                        ? "Change In Employment Type Transfer"
                        : listHeading}
                    </Col>
                   
                   
                  </Row>
                </div>
                <div className="table-list">
                  {loader ? (
                    <LoaderIcon />
                  ) : (
                    <TableComponent
                      tableHeaders={TableHeaders}
                      tableBody={tableBody}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {loader === false && tableBody.length > 0 && (
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          itemsCountPerPage={recordsPerPage}
          totalItemsCount={total}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
          firstPageText="First"
          lastPageText="Last"
        />
      )}
    </Fragment>
  );
};

export default TransferPage;
