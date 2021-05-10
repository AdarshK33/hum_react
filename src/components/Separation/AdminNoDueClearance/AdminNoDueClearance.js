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
             
              </div>
              <div className="table-responsive">

              <Table id="table-to-xls" className="table table-hover">
                  <thead className="thead-light" style={{tableLayout:'fixed',width:"200px", backgroundColor: "#2f3c4e" }}>
                    <tr className="rowStyle">
                      <th >S. No</th>
                      <th >Employee Id</th>
                      <th >Employee Name</th>
                      <th >Cost Center Name</th>
                      <th >Manager Name</th>
                      <th >Joining Date</th>
                      <th >Last Working Day</th>
                      <th >IT Amount To Be Recovered</th>
                      <th > IT Clearance</th>
                      <th >IT Clearance Remarks</th>
                      <th >IT Clearance UpdatedBy</th>
                      <th >Finance Amount To Be Recovered</th>
                      <th >Finance Clearance</th>
                      <th >Finance Clearance Remarks</th>
                      <th >Finance Clearance UpdatedBy</th>
                    </tr>
                  </thead>

                  {adminNoDueClearanceList !== undefined && adminNoDueClearanceList !== null &&
                    adminNoDueClearanceList.map((e, i) => {
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
                            <td>{e.itClearanceStatus == 0?"Due":e.itClearanceStatus == 1?"No Due":"On Hold"}</td>
                            <td>{e.itClearanceRemarks}</td>
                            <td>{e.itClearanceUpdatedBy}</td>
                            <td>{e.financeAmount}</td>
                            <td>{e.financeClearanceStatus == 0?"Due":e.financeClearanceStatus == 1?"No Due":"On Hold"}</td>
                            <td>{e.financeClearanceRemarks}</td>
                            <td>{e.financeClearanceUpdatedBy}</td>
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

