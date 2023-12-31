import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle,LogOut } from "react-feather";
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryState";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./EmployeeHistory.css";
import moment from "moment";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";

const ActiveEmployeeHistoryList = (props) => {
  const {
    ViewEmployeeHistoryData,
    employeeHistoryData,
    loader,
    total,
  } = useContext(EmployeeHistoryContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { costCenterList, CostCenter } = useContext(AdminContext);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [role, setRole] = useState(0);
  const [activeStatus, setActiveStatus] = useState(true);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  useEffect(() => {
    if (employeeHistoryData !== null && employeeHistoryData !== undefined) {
      setCurrentRecords(employeeHistoryData);
    }
  }, [employeeHistoryData,currentRecords]); 

  useEffect(() => {
    if (rolePermission == "superCostCenterManager") {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [rolePermission]);
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
      ViewEmployeeHistoryData(fromDate,toDate,searchValue, pageNumber-1,role,1);
    
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      ViewEmployeeHistoryData(fromDate,toDate,searchValue, pageCount,role,1);
    } else {
      ViewEmployeeHistoryData(fromDate,toDate,searchValue, pageCount,role,1);
    }
  };

  useEffect(() => {
    ViewEmployeeHistoryData(fromDate,toDate,"all", pageCount,role,1);
    console.log("user role------>", user);
  }, []);

  console.log(rolePermission,employeeHistoryData, "employeeHistoryData");
  const fromDateHandler = (date) => {
    let value = date;
    console.log("fromDate", value);
    setFromDate(value);
  };

  const toDateHandler = (date) => {
    let value1 = date;
    console.log("toDate", value1);
    setToDate(value1);
  };
const handleActiveStatus =(e)=>{
  console.log(e.target.name,"buttton")
if(e.target.name === "active"){
  setActiveStatus(true)
}else{
  setActiveStatus(false)
}
}
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col sm={12}>
         
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <Row>
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
                        value={searchValue}
                        placeholder="Search.."
                        onChange={(e) => searchHandler(e)}
                      />
                      <Search
                        className="search-icon"
                        style={{ color: "#313131" }}
                        onClick={searchDataHandler}
                      />
                      <br></br>
                    </div>
                  </Col>
                  <Col sm={2} style={{ marginTop: "5px",textAlign:"center" }}>
                    <b>EMPLOYEE LIST</b>
                  </Col>
                </Row>
              </div>
           
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">S. No</th>
                      <th scope="col">Employee Id </th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Role</th>
                      <th scope="col">Cost Center</th>
                      <th scope="col">Created By</th>
                      <th scope="col">is Active?</th>
                      <th scope="col">History</th>
                      {activeStatus == true?<>
                      <th scope="col">Edit</th>
                      <th scope="col">Exit User</th>
                  </>:<></>}
                    </tr>
                  </thead>
                  {
                   loader === true &&
                  currentRecords !== null &&
                  currentRecords !== undefined ? (
                    <tbody>
                      <tr>
                        <td colSpan="12">
                          <div
                            className="loader-box loader"
                            style={{ width: "100% !important" }}
                          >
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
                  ) : currentRecords !== undefined &&
                    currentRecords !== null &&
                    currentRecords.length > 0 
                     && total > 0
                     ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={item.employeeId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.position}</td>
                            <td>{item.role}</td>
                            <td>{item.costCentre}</td>
                           <td>{item.createdBy}</td>
                           <td>{item.isActive == 1?"Yes":"No"}</td>
                            <td>
                              <Link to={"/master-history/" + item.employeeId}>
                              <div style={{  paddingTop: "2px",  fontSize: "24px" }}>
                            <i className="fa fa-history"></i>
                          </div>
                              </Link>
                            </td>
                            {activeStatus == true?<>
                            <td>
                            <div style={{  paddingTop: "1px",  fontSize: "24px" }}>
                            <Link to={"/employee_profile/" + item.employeeId}>
                              <Edit2/>
                              </Link>
                              </div>
                            </td>
                           
                            <td>
                            <Link to={"/manager-initiate-exit"}>
                              <div style={{fontSize: "24px" }}>
                            {/* <i className="fas fa-sign-in-alt"></i> */}
                            <LogOut/>
                          </div>
                          </Link>
                            </td>
                            </>:<></>}
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="12">No Record Found</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {currentRecords !== null && currentRecords !== undefined && (
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={currentPage}
          itemsCountPerPage={recordPerPage}
          totalItemsCount={totalRecords}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
          firstPageText="First"
          lastPageText="Last"
        />
      )}
    </Fragment>
  );
};

export default ActiveEmployeeHistoryList;
