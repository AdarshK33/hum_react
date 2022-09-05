import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { DisciplinaryContext } from "../../context/DisciplinaryState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AppContext } from "../../context/AppState";
import { PermissionContext } from "../../context/PermissionState";
import { EmployeeProfileContext } from "../../context/EmployeeProfileState";

import moment from "moment";
const ManagerProfileListing = () => {
  const {
    total,
    loader,
    EmployeesListView,
    EmployeesList,
    currentEmpId,
    setEmployeeId,
  } = useContext(EmployeeProfileContext);
  const {
    disciplinaryListView,
    disciplinaryListData,
    disciplinaryEmployeeSearch,
  } = useContext(DisciplinaryContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [role, setRole] = useState(0);
  useEffect(() => {
    EmployeesListView(
      "all",
      pageCount,
      rolePermission == "superCostCenterManager" ? 1 : 0
    );
    console.log("user role", user);
  console.log("hello called EmployeesListView");
  }, []);
  
  // useEffect(() => {
  //   MakedisciplinaryEmployeeSearchNull();
  // }, []);
  useEffect(() => {
    if (rolePermission == "superCostCenterManager") {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [rolePermission]);
  useEffect(() => {
    if (EmployeesList !== null && EmployeesList !== undefined) {
      setCurrentRecords(EmployeesList);
    }
  }, [EmployeesList, currentRecords]);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = total;
  const pageRange = 10;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    if (searchValue !== "") {
      EmployeesListView(searchValue, pageNumber - 1, role);
    } else {
      EmployeesListView("all", pageNumber - 1, role);
    }
    setCurrentRecords(EmployeesList);
  };

  /*-----------------Pagination------------------*/


  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    if(e.target.value.length===0){
      EmployeesListView(
        "all",
        pageCount,//pageCount
        rolePermission == "superCostCenterManager" ? 1 : 0
      );
    }
  };

  const searchDataHandler = () => {
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      EmployeesListView(searchValue, 0, role);
    } else {
      EmployeesListView("all", 0, role);
    }
    setCurrentRecords(EmployeesList);
  };

  //   const fetchCandidateDetails = (candidateId) => {
  //     viewCandidateId(candidateId);
  //     verificationDocsView(candidateId);
  //     personalInfo(candidateId);
  //     viewRole();
  //     CostCenter();
  //   };

  return (
    <Fragment>
      <Breadcrumb title="MANAGER PROFILE LIST" parent="MANAGER PROFILE LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>MANAGER PROFILE LIST</b>

                <div className="job-filter">
                  <div className="faq-form mr-2">
                    <input
                      className="form-control searchButton"
                      type="text"
                      placeholder="Search.."
                      onChange={(e) => searchHandler(e)}
                    />
                    <Search
                      className="search-icon"
                      style={{ color: "#313131" }}
                      onClick={searchDataHandler}
                    />
                  </div>
                </div>
                {/* <Link to="/issue-show-cause-notice">
                  <Button className="apply-button btn btn-light mr-2">
                    Issue Show Cause Notice
                  </Button>
                </Link> */}
              </div>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">SL. No</th>
                      <th scope="col">Employee ID</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Cost Center Name</th>
                      <th scope="col">Position</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {loader === true &&
                  EmployeesList !== null &&
                  EmployeesList !== undefined ? (
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
                  ) : EmployeesList !== undefined &&
                  EmployeesList !== null &&
                  EmployeesList.length > 0 &&
                    total > 0 ? (
                      EmployeesList.map((item, i) => {
                      return (
                        <tbody key={i}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.costCentre}</td>
                            <td>{item.position}</td>
                            <td>
                              <Link to={"/employee_profile/" + item.employeeId}>
                                <Edit2
                                  onClick={() => {
                                    setEmployeeId(item.employeeId);
                                  }}
                                />
                              </Link>
                            </td>
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
      {EmployeesList !== null && EmployeesList !== undefined && (
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

export default ManagerProfileListing;
