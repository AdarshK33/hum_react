import React, { useEffect, Fragment, useContext, useState } from 'react'
import { SeparationContext } from "../../../context/SepearationState";
import { AdminContext } from '../../../context/AdminState'
import Select from 'react-select'
import Breadcrumb from "../../common/breadcrumb";
import "../nodueclearance.css"
import Pagination from 'react-js-pagination';
import { Button ,Container, Modal, Row, Col, Form, Table} from 'react-bootstrap'
import { Edit2, Search } from 'react-feather';
import { toast } from "react-toastify";
const AdminNoDueClearance =()=> {
  const { total,loader,viewAdminITClearanceList,adminNoDueClearanceList,NoDueClearanceAdminClearanceExport } = useContext(SeparationContext);
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
  console.log(pageCount,"pageCount")
  viewAdminITClearanceList(searchValue, pageCount,costCenter);
  if (adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined) {
    setCurrentRecords(adminNoDueClearanceList);
  }
}, [costCenter,searchValue,pageCount]);

useEffect(() => {
  CostCenter();
}, []);

// useEffect(() => {
//   if (adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined) {
//     setCurrentRecords(adminNoDueClearanceList);
//   }
// }, [adminNoDueClearanceList]);


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
 
  const handleExport = (e) =>{
    const value = e.target.value
    NoDueClearanceAdminClearanceExport(value)

  }
const handleCostCenter = (options) => {
  let data2 = options !== null?options.value:''
  console.log(data2)
  setCostCenter(data2)
  if (costCenter !== "" && costCenter !== "all") {
    return viewAdminITClearanceList(searchValue,0,costCenter);
  }else{
    return viewAdminITClearanceList("all",pageCount,"all");
  }
} 

 
  return (
    <Fragment>
      <Breadcrumb title="No Due Clearance - Admin" parent="No Due Clearance - Admin" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
          <Row className="mt-4 mainWrapper">
          <div className="col-sm-3">
            {" "}
            <input
              className="form-control searchButton"
              type="text"
              placeholder="Search.."
              onChange={(e) => searchHandler(e)}
            />
            <Search
              className="search-icon mr-2"
              style={{ color: "#313131" }}
              onClick={searchDataHandler}
            />
          </div>
          <div className="col-sm-4">
          <Col className="selectList">
            <br/>
            <label className="title" style={{padding:"6px"}}>Select Cost Center</label> &nbsp;&nbsp;
             
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
              <div className="nodue_title_admin" >
           <b >ADMIN NO DUE CLEARANCE LISTING </b>            
           <Button style={{float:'right',marginTop: '5px'}} className="btn btn-light mr-2" onClick={handleExport}> Export excel</Button>
              </div>
              <div className="table-responsive">

              <Table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{tableLayout:'fixed',width:"200px", backgroundColor: "#2f3c4e" }}>
                    <tr >
                      <th className="rowStyle" >S. No</th>
                      <th className="rowStyle">Employee Id</th>
                      <th className="rowStyle">Employee Name</th>
                      <th className="rowStyle">Cost Center Name</th>
                      <th className="rowStyle" >Manager Name</th>
                      <th className="rowStyle">Joining Date</th>
                      <th className="rowStyle">Last Working Day</th>
                      <th className="rowStyle">IT Amount To Be Recovered</th>
                      <th className="rowStyle"> IT Clearance</th>
                      <th className="rowStyle">IT Clearance Remarks</th>
                      <th className="rowStyle">IT Clearance UpdatedBy</th>
                      <th className="rowStyle">Finance Amount To Be Recovered</th>
                      <th className="rowStyle">Finance Clearance</th>
                      <th className="rowStyle">Finance Clearance Remarks</th>
                      <th className="rowStyle">Finance Clearance UpdatedBy</th>
                    </tr>
                  </thead>

                  {adminNoDueClearanceList !== undefined && adminNoDueClearanceList !== null &&
                    adminNoDueClearanceList.map((e, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td className="rowStyle">{i + 1 + indexOfFirstRecord}</td>
                            <td className="rowStyle">{e.employeeId}</td>
                            <td className="rowStyle">{e.employeeName}</td>
                            <td className="rowStyle">{e.costCentreName}</td>
                            <td className="rowStyle">{e.managerName}</td>
                            <td className="rowStyle">{e.joiningDate}</td>
                            <td className="rowStyle">{e.lastWorkingDay}</td>
                            <td className="rowStyle">{e.itAmount}</td>
                            <td className="rowStyle">{e.itClearanceStatus == 0?"Due":e.itClearanceStatus == 1?"No Due":"On Hold"}</td>
                            <td className="rowStyle">{e.itClearanceRemarks}</td>
                            <td className="rowStyle">{e.itClearanceUpdatedBy}</td>
                            <td className="rowStyle">{e.financeAmount}</td>
                            <td className="rowStyle">{e.financeClearanceStatus == 0?"Due":e.financeClearanceStatus == 1?"No Due":"On Hold"}</td>
                            <td className="rowStyle">{e.financeClearanceRemarks}</td>
                            <td className="rowStyle">{e.financeClearanceUpdatedBy}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                </Table>
                {(adminNoDueClearanceList === null) ?
                  <p style={{ textAlign: "center" }}>No Record Found</p> : null}

                {adminNoDueClearanceList !== undefined && adminNoDueClearanceList !== null && adminNoDueClearanceList.length === 0 ?

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
                {adminNoDueClearanceList !== null && adminNoDueClearanceList !== undefined &&
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

