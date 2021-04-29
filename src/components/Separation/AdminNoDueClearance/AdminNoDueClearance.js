// import React, { Fragment, useState, useContext, useEffect } from "react";
// import Breadcrumb from "../../common/breadcrumb";
// import { SeparationContext } from "../../../context/SepearationState";
// import {Button,Container, Modal, Row, Col, Form, Table} from "react-bootstrap";
// import Pagination from 'react-js-pagination';
// import Select from 'react-select'
// import { Edit2, Eye, Search } from "react-feather";
// import { AdminContext } from '../../../context/AdminState'
// import "../nodueclearance.css";
// import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// const AdminNoDueClearance = () => {
//   const { total,loader,viewAdminITClearanceList,adminNoDueClearanceList } = useContext(SeparationContext);
//   const { CostCenter, costCenterList } = useContext(AdminContext)
//   const [pageCount, setPageCount] = useState(0);
//   const [clearanceData, setCleranceData] = useState({
//     itclearanceId: "",
//     exitId: "",
//     itClearanceStatus: "",
//     itAmount: "",
//     itRemarks: "",
//     itClearanceUpdatedBy: "",
//     lastWorkingDay: "",
//     employeeId: "",
//     employeeName: "",
//     costCentreName: "",
//     joiningDate: "",
//     managerName: "",
//   });
//   const [gridApi, setGridApi] = useState(null);
//   const [gridColumnApi, setGridColumnApi] = useState(null);
//   const [costCenter, setCostCenter] = useState("all")
//   const [searchValue, setSearchValue] = useState("all");
// /*-----------------Pagination------------------*/
// const [currentPage, setCurrentPage] = useState(1);
// const recordPerPage = 10;
// const totalRecords = adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined && total;
// const pageRange = 10;
// const indexOfLastRecord = currentPage * recordPerPage;
// const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
// const [currentRecords, setCurrentRecords] = useState([]);


// useEffect(() => {
//   if (adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined) {
//     setCurrentRecords(adminNoDueClearanceList);
//   }
// }, [adminNoDueClearanceList, currentRecords]);

// const handlePageChange = (pageNumber) => {
//   setPageCount(pageNumber - 1);
//   console.log("page change",pageNumber,pageCount)

//     setCurrentPage(pageNumber);
//     if (searchValue !== "all") {
//       viewAdminITClearanceList(searchValue,pageNumber-1,costCenter);
//     } else {
//       viewAdminITClearanceList("all",pageNumber-1,"all");
//     }
//     setCurrentRecords(adminNoDueClearanceList);
// }
// /*-----------------Pagination------------------*/

//   useEffect(() => {
//     CostCenter();
//   }, []);
//   const searchHandler = (e) => {
//     setSearchValue(e.target.value)

//   }
//   const searchDataHandler = () => {
//     if (searchValue !== "" && searchValue !== "all") {
//       viewAdminITClearanceList(searchValue,pageCount,costCenter);
//     }else{
//       viewAdminITClearanceList("all",pageCount,"all");

//     }
//   }
 
// const handleCostCenter = (options) => {
//   let data2 = options !== null?options.value:''
//   console.log(data2)
//   setCostCenter(data2)
//   if (costCenter !== "" && costCenter !== "all") {
//     return viewAdminITClearanceList(searchValue,pageCount,costCenter);
//   }else{
//     return viewAdminITClearanceList("all",pageCount,"all");
//   }
// } 
// const renderStatusOptionTwo = (value) => {
//     return (
//       <div>
//         <select name="itClearanceStatus" value={value.data.financeClearanceStatus} onChange={(e) => statusRender(e,value)}>
//           <option value="0"> Due </option>
//           <option value="1"> No Due </option>
//           <option value="2"> On Hold </option>
//         </select>
//       </div>
//     );
//   };

//   const renderStatusOptions = (value) => {
//     return (
//       <div>
//         <select name="itClearanceStatus" value={value.data.itClearanceStatus} onChange={(e) => statusRender(e,value)}>
//           <option value="0"> Due </option>
//           <option value="1"> No Due </option>
//           <option value="2"> On Hold </option>
//         </select>
//       </div>
//     );
//   };
//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     setGridColumnApi(params.columnApi);
//   };

  
//   useEffect(() => {
//     console.log(pageCount,"pageCount")
//     viewAdminITClearanceList(searchValue, pageCount,costCenter);
//   }, [costCenter,searchValue,pageCount]);
//   const statusRender = (e,value) => {
//     const status = e.target.value
//     const clearanceStatus = value.data
//     clearanceStatus['itClearanceStatus']= status
//     clearanceStatus['disabled']= true
 
//   };


//   return (
//     <div>
//       <Fragment>
//         <Container fluid>
//       <Breadcrumb title="No Due Clearance" parent="No Due Clearance" />
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-sm-12">
//             <Row className="mt-4 mainWrapper">
//           <Col className="searchBox">
//             <input
//               className="form-control inputWrapper"
//               type="text"
//               placeholder="Search.."
//               onChange={(e) => searchHandler(e)}
//             />
//             <Search
//               className="search-icon"
//               style={{ color: "#313131", marginRight: "17rem" }}
//               onClick={searchDataHandler} 
//                           />
//           </Col>
//           <div className="col-sm-6">
//           <Col className="selectList">
//             <br/>
//             <label className="title">Select Cost Center</label> &nbsp;&nbsp;
             
//           <Select
//           className="selectInputWrapper"
//            name="filters"
//           placeholder="Cost Center"
//           options={costCenterList !== null ?costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
//             onChange={handleCostCenter}
//                required isSearchable />
//           </Col>
//           </div>
//         </Row>
//             <div className="card" style={{ overflowX: "auto" }}>
//               <div className="nodue_title" >
//               <b >ADMIN NO DUE CLEARANCE LISTING </b>            
//               </div>
         

//         <div className="ag-theme-alpine" style={{ align:"center",height: 495, width: 1400 }}>
          
//           <AgGridReact 
//             rowData={adminNoDueClearanceList}
//             rowSelection="single"
            
//             onGridReady={onGridReady}
//             defaultColDef={{
//               width: 150,
//               editable: true,
//               resizable: true,
//             }}
            
//           >
//           <AgGridColumn className="columnColor" editable="false" headerName="S No" pinned="left" lockPinned="true" valueGetter={`node.rowIndex+1 + ${indexOfFirstRecord}`}></AgGridColumn>
//             <AgGridColumn className="columnColor" editable="false" headerName="Employee Id" field="employeeId"></AgGridColumn>
//             <AgGridColumn className="columnColor" editable="false" headerName="Employee Name" field="employeeName"></AgGridColumn>
//             <AgGridColumn className="columnColor" editable="false" headerName="Cost Center Name" field="costCentreName"></AgGridColumn>
//             <AgGridColumn className="columnColor" editable="false" headerName="Manager Name" field="managerName"></AgGridColumn>
//             <AgGridColumn  className="columnColor" editable="false" headerName="Joining Date" field="joiningDate"></AgGridColumn>
//             <AgGridColumn className="columnColor" editable="false" headerName="Last Working Day" field="lastWorkingDay"></AgGridColumn>
//             <AgGridColumn className="columnColor" editable="false"  headerName="IT Amount To Be Recovered" field="itAmount"></AgGridColumn>

//                     <AgGridColumn
//                       className="columnColor"
//                       field="itClearanceStatus"
//                       headerName="IT Clearance"
//                       editable="false" 
//                         colId="status"
//                       cellRendererFramework={renderStatusOptions}
//                       cellEditorParams={{
//                         values: ["0","1","2"],
//                         cellRenderer: { statusRender },
//                       }}
//                     ></AgGridColumn>
//                     <AgGridColumn
//                     editable="false" 
//                       className="columnColor"
//                       headerName="IT Clearance Remarks"
//                       field="itClearanceRemarks"
//                     ></AgGridColumn>
//                     <AgGridColumn
//                     editable="false" 
//                       className="columnColor"
//                       headerName="IT Clearance UpdatedBy"
//                       field="itClearanceUpdatedBy"
//                     ></AgGridColumn>
//   <AgGridColumn className="columnColor" editable="false" headerName="Finance Amount To Be Recovered" field="financeAmount"></AgGridColumn>

// <AgGridColumn
//   className="columnColor"
//   field="financeClearanceStatus"
//   headerName="Finance Clearance"
//   pinned="right"
//   editable="false" 
//     colId="status"
//   cellRendererFramework={renderStatusOptionTwo}
//   cellEditorParams={{
//     values: ["0","1","2"],
//     cellRenderer: { statusRender },
//   }}
// ></AgGridColumn>
// <AgGridColumn
// editable="false" 
// pinned="right"
//   className="columnColor"
//   headerName="Finance Clearance Remarks"
//   field="financeClearanceRemarks"
// ></AgGridColumn>
// <AgGridColumn
// editable="false" 
// pinned="right"
//   className="columnColor"
//   headerName="Finance Clearance UpdatedBy"
//   field="financeClearanceUpdatedBy"
// ></AgGridColumn>
//                   </AgGridReact>
//                 </div>

//                 {adminNoDueClearanceList === null ? (
//                   <p style={{ textAlign: "center" }}>No Record Found</p>
//                 ) : null}

                
//               </div>
//               <div>
//        {adminNoDueClearanceList == null && adminNoDueClearanceList == undefined ? (
//                   <div
//                     className="loader-box loader"
//                     style={{ width: "100% !important" }}
//                   >
//                     <div className="loader">
//                       <div className="line bg-primary"></div>
//                       <div className="line bg-primary"></div>
//                       <div className="line bg-primary"></div>
//                       <div className="line bg-primary"></div>
//                     </div>
//                   </div>
//                 ) 
//                 :
//          <Pagination
//            itemClass="page-item"
//            linkClass="page-link"
//            activePage={currentPage}
//            itemsCountPerPage={recordPerPage}
//            totalItemsCount={totalRecords}
//            pageRangeDisplayed={pageRange}
//            onChange={handlePageChange}
//          />}
//      </div>
//               </div>
//               </div>
//               </div>   
//               </Container>     
//     </Fragment> 
//      </div>
//   );
// };
// export default AdminNoDueClearance;

import React, { useEffect, Fragment, useContext, useState } from 'react'
import { SeparationContext } from "../../../context/SepearationState";
import { AdminContext } from '../../../context/AdminState'
import Select from 'react-select'

import moment from 'moment';
import {
  JsonToExcel
} from 'react-json-excel';
import Breadcrumb from "../../common/breadcrumb";
import "../../roster/roster.css";
import '../../../assets/css/search.css'

import Pagination from 'react-js-pagination';
import { Button ,Container, Modal, Row, Col, Form, Table} from 'react-bootstrap'
import { RosterContext } from "../../../context/RosterState";
import { Edit2, Search } from 'react-feather';
import { SearchContext } from '../../../context/SearchState';
import { toast } from "react-toastify";
const AdminNoDueClearance =()=> {
  const { total,loader,viewAdminITClearanceList,adminNoDueClearanceList } = useContext(SeparationContext);
  const { CostCenter, costCenterList } = useContext(AdminContext)
const [pageCount, setPageCount] = useState(0);

const [costCenter, setCostCenter] = useState("all")
const [searchValue, setSearchValue] = useState("all");
/*-----------------Pagination------------------*/
const [currentPage, setCurrentPage] = useState(1);
const recordPerPage = 10;
const totalRecords = adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined && total;
const pageRange = 10;
const indexOfLastRecord = currentPage * recordPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
const [currentRecords, setCurrentRecords] = useState([]);

useEffect(() => {
  if (adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined) {
    setCurrentRecords(adminNoDueClearanceList);
  }
}, [adminNoDueClearanceList, currentRecords]);

const handlePageChange = (pageNumber) => {
  setPageCount(pageNumber - 1);
  console.log("page change",pageNumber,pageCount)

    setCurrentPage(pageNumber);
    if (searchValue !== "all") {
      viewAdminITClearanceList(searchValue,pageNumber-1,costCenter);
    } else {
      viewAdminITClearanceList("all",pageNumber-1,"all");
    }
    setCurrentRecords(adminNoDueClearanceList);
}
/*-----------------Pagination------------------*/

  useEffect(() => {
    CostCenter();
  }, []);
  const searchHandler = (e) => {
    setSearchValue(e.target.value)

  }
  const searchDataHandler = () => {
    if (searchValue !== "" && searchValue !== "all") {
      viewAdminITClearanceList(searchValue,pageCount,costCenter);
    }else{
      viewAdminITClearanceList("all",pageCount,"all");

    }
  }
 
const handleCostCenter = (options) => {
  let data2 = options !== null?options.value:''
  console.log(data2)
  setCostCenter(data2)
  if (costCenter !== "" && costCenter !== "all") {
    return viewAdminITClearanceList(searchValue,pageCount,costCenter);
  }else{
    return viewAdminITClearanceList("all",pageCount,"all");
  }
} 
const renderStatusOptionTwo = (value) => {
    return (
      <div>
        <select name="itClearanceStatus" value={value.data.financeClearanceStatus} onChange={(e) => statusRender(e,value)}>
          <option value="0"> Due </option>
          <option value="1"> No Due </option>
          <option value="2"> On Hold </option>
        </select>
      </div>
    );
  };

  const renderStatusOptions = (value) => {
    return (
      <div>
        <select name="itClearanceStatus" value={value.data.itClearanceStatus} onChange={(e) => statusRender(e,value)}>
          <option value="0"> Due </option>
          <option value="1"> No Due </option>
          <option value="2"> On Hold </option>
        </select>
      </div>
    );
  };

  
  useEffect(() => {
    console.log(pageCount,"pageCount")
    viewAdminITClearanceList(searchValue, pageCount,costCenter);
  }, [costCenter,searchValue,pageCount]);
  const statusRender = (e,value) => {
    const status = e.target.value
    const clearanceStatus = value.data
    clearanceStatus['itClearanceStatus']= status
    clearanceStatus['disabled']= true
 
  };


 
  return (
    <Fragment>
      <Breadcrumb title="View Shift" parent="View Shift" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
          <Row className="mt-4 mainWrapper">
        <Col className="searchBox">
            <input
              className="form-control inputWrapper"
              type="text"
              placeholder="Search.."
              onChange={(e) => searchHandler(e)}
            />
            <Search
              className="search-icon"
              style={{ color: "#313131", marginRight: "17rem" }}
              onClick={searchDataHandler} 
                          />
          </Col>
          <div className="col-sm-6">
          <Col className="selectList">
            <br/>
            <label className="title">Select Cost Center</label> &nbsp;&nbsp;
             
          <Select
          className="selectInputWrapper"
           name="filters"
          placeholder="Cost Center"
          options={costCenterList !== null ?costCenterList.map(e => ({ label: e.costCentreName, value: e.costCentreName })) : []}
            onChange={handleCostCenter}
               required isSearchable />
          </Col>
          </div>
        </Row>
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar" >
           <b className="title">ADMIN NO DUE CLEARANCE LISTING </b>            
             
              </div>
              <div className="table-responsive">

                <table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{ backgroundColor: "#2f3c4e" }}>
                    <tr>
                      <th>S. No</th>
                      <th>Employee Id</th>
                      <th>Employee Name</th>
                      <th>Cost Center Name</th>
                      <th>Manager Name</th>
                      <th>Joining Date</th>
                      <th>Last Working Day</th>
                      <th>IT Amount To Be Recovered</th>
                      <th>IT Clearance</th>
                      <th>IT Clearance Remarks</th>
                      <th>IT Clearance UpdatedBy</th>
                      <th>Finance Amount To Be Recovered</th>
                      <th>Finance Clearance</th>
                      <th>Finance Clearance Remarks</th>
                      <th>Finance Clearance UpdatedBy</th>
                    </tr>
                  </thead>

                  {currentRecords !== undefined && currentRecords !== null &&
                    currentRecords.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{e.employeeId}</td>
                            <td>{e.employeeName}</td>
                            <td>{e.costCentreName}</td>
                            <td>{e.managerName}</td>
                            <td>{e.joiningDate}</td>
                            <td>{e.lastWorkingDay}</td>
                            <td>{e.itAmount}</td>
                            <td>{e.itClearanceStatus}</td>
                            <td>{e.itClearanceRemarks}</td>
                            <td>{e.itClearanceUpdatedBy}</td>
                            <td>{e.financeAmount}</td>
                            <td>{e.financeClearanceStatus}</td>
                            <td>{e.financeClearanceRemarks}</td>
                            <td>{e.financeClearanceUpdatedBy}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
                {(adminNoDueClearanceList === null) ?
                  <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                {adminNoDueClearanceList !== undefined && adminNoDueClearanceList !== null && currentRecords.length === 0 ?

                  <div className="loader-box loader" style={{ width: "100% !important" }}>
                    <div className="loader">
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                      <div className="line bg-primary"></div>
                    </div>
                  </div>
                  :
                  null}

              </div>

              <div>
                {adminNoDueClearanceList !== null && adminNoDueClearanceList !== null &&
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
              </div>




            </div>
          </div>
        </div>


      </div>
    </Fragment >

  )
}

export default AdminNoDueClearance

