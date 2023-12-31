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
const EmployeeListing = () => {
  const {
    total,
    loader,
    EmployeesDocsVerifyListView,
    EmployeesDocsVerifyList,
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
    EmployeesDocsVerifyListView("all", pageCount);
    console.log("user role", user);
  }, []);
  console.log("ROLEEE", rolePermission);
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
    if (
      EmployeesDocsVerifyList !== null &&
      EmployeesDocsVerifyList !== undefined
    ) {
      setCurrentRecords(EmployeesDocsVerifyList);
    }
  }, [EmployeesDocsVerifyList, currentRecords]);

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
      EmployeesDocsVerifyListView(searchValue, pageNumber - 1);
    } else {
      EmployeesDocsVerifyListView("all", pageNumber - 1);
    }
    setCurrentRecords(EmployeesDocsVerifyList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      EmployeesDocsVerifyListView(searchValue, 0);
    } else {
      EmployeesDocsVerifyListView("all", 0);
    }
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
      <Breadcrumb
        title="EMPLOYEE DOCUMENTS VERIFICATION LIST"
        parent="EMPLOYEE DOCUMENTS VERIFICATION LIST"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>EMPLOYEE DOCUMENTS VERIFICATION LIST</b>

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
                      <th scope="col">Status</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {loader === true &&
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
                    currentRecords.length > 0 &&
                    Object.keys(currentRecords).length !== 0 &&
                    total !== 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={item.employeeId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.costCentre}</td>
                            <td>{item.position}</td>
                            <td>{item.status}</td>
                            <td>
                              <Link
                                to={"/employee_doc_verify/" + item.employeeId}
                              >
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

export default EmployeeListing;
