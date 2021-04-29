import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
// import { RoleManagementContext } from "../../context/RoleManagementState";
// import { AdminContext } from "../../context/AdminState";

const EmployeeExitList = () => {
  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    loader,
    total,
  } = useContext(EmployeeSeparationContext);

  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    EmployeeSeparationListView("all", pageCount);
  }, []);

  useEffect(() => {
    if (
      EmployeeSeparationList !== null &&
      EmployeeSeparationList !== undefined
    ) {
      setCurrentRecords(EmployeeSeparationList);
    }
  }, [EmployeeSeparationList, currentRecords]);

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
      EmployeeSeparationListView(searchValue, pageNumber - 1);
    } else {
      EmployeeSeparationListView("all", pageNumber - 1);
    }
    setCurrentRecords(EmployeeSeparationList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      EmployeeSeparationListView(searchValue, pageCount);
    } else {
      EmployeeSeparationListView("all", pageCount);
    }
  };

  const fetchCandidateDetails = (candidateId) => {
    // viewCandidateId(candidateId);
    // verificationDocsView(candidateId);
    // personalInfo(candidateId);
    // viewRole();
    // CostCenter();
  };
  return (
    <Fragment>
      <Breadcrumb
        title="Employee Separartion List"
        parent="Employee Separartion List"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>EMPLOYEE SEPARATION LISTING</b>

                {/* <div className="job-filter">
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
                </div> */}
                <Link to="/manager-offer-release">
                  <Button className="apply-button btn btn-light mr-2">
                    Initiate Exit
                  </Button>
                </Link>
              </div>
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th scope="col">S. No</th>
                      <th scope="col">Employee ID</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Resignation Date</th>
                      <th scope="col">Last Working Day</th>
                      <th scope="col">Reason for Resignation</th>
                      <th scope="col">Notice Period</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {loader === true &&
                  EmployeeSeparationList !== null &&
                  EmployeeSeparationList !== undefined ? (
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
                  ) : EmployeeSeparationList !== undefined &&
                    EmployeeSeparationList !== null &&
                    EmployeeSeparationList.length > 0 ? (
                    EmployeeSeparationList.map((item, i) => {
                      return (
                        <tbody key={item.candidateId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.position}</td>
                            <td>{item.contractType}</td>
                            <td>{item.dateOfResignation}</td>
                            <td>{item.lastWorkingDate}</td>
                            <td>{item.reasonForResignation}</td>
                            <td>{item.noticePeriod}</td>

                            <td>
                              <Link to="/offer-relase-and-onboard">
                                <Edit2
                                  onClick={() => {
                                    fetchCandidateDetails(item.employeeId);
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
      {EmployeeSeparationList !== null &&
        EmployeeSeparationList !== undefined && (
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

export default EmployeeExitList;
