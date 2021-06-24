import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { DisciplinaryContext } from "../../context/DisciplinaryState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RoleManagementContext } from "../../context/RoleManagementState";
import { AdminContext } from "../../context/AdminState";
import { AppContext } from "../../context/AppState";
import { MyDocsContext } from "../../context/MyDocsState";
const EmployeeDocementsList = () => {
  const { MyDocsListView, myDocsListData, total, loader } =
    useContext(MyDocsContext);

  const {
    disciplinaryListView,
    disciplinaryListData,
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    MakedisciplinaryEmployeeSearchNull,
  } = useContext(DisciplinaryContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  useEffect(() => {
    if (user !== null && user !== undefined) {
      MyDocsListView(user.employeeId, pageCount);
      console.log("user role", user);
    }
  }, []);

  // useEffect(() => {
  //   MakedisciplinaryEmployeeSearchNull();
  // }, []);

  useEffect(() => {
    if (myDocsListData !== null && myDocsListData !== undefined) {
      setCurrentRecords(myDocsListData);
    }
  }, [myDocsListData, currentRecords]);

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
      MyDocsListView(searchValue, pageNumber - 1);
    } else {
      if (user !== null && user !== undefined) {
        MyDocsListView(user.employeeId, pageNumber - 1);
      }
    }
    setCurrentRecords(myDocsListData);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      MyDocsListView(searchValue, 0);
    } else {
      if (user !== null && user !== undefined) {
        MyDocsListView(user.employeeId, 0);
      }
    }
  };

  const fetchCandidateDetails = (candidateId) => {};
  return (
    <Fragment>
      <Breadcrumb title="MY DOCUMENTS LIST" parent="MY DOCUMENTS LIST" />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>MY DOCUMENTS LIST </b>

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
                  <br></br>
                </div> */}
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
                      <th scope="col">S. No</th>
                      <th scope="col">Document Name</th>
                      <th scope="col">Issued On</th>
                      <th scope="col">Signed On</th>
                      <th scope="col">Documents Link</th>
                      <th scope="col">Download</th>
                      <th scope="col">View</th>
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
                    currentRecords.length > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={item.employeeId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.documentName}</td>
                            <td>{item.issuedOn}</td>
                            <td>{item.signedOn}</td>
                            <td>
                              <a href="/documents">{item.documentName}</a>
                            </td>
                            <td></td>

                            <td>
                              <Link
                                to={"/disciplinary-view/" + item.employeeId}
                                // to={"/disciplinary-action/" + item.employeeId}
                              >
                                <Eye
                                  onClick={() => {
                                    disciplinaryEmployeeSearch(
                                      item.disciplinaryAction.disciplinaryId
                                    );
                                  }}
                                />
                              </Link>
                            </td>

                            <td>
                              {item.documentType === 21 &&
                              item.disciplinaryId !== null &&
                              item.disciplinaryId !== undefined ? (
                                <Link to="/letters/show-cause">
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                              ) : item.documentType === 22 &&
                                item.disciplinaryId !== null &&
                                item.disciplinaryId !== undefined ? (
                                <Link to="/letters/warning">
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Edit2 />
                              )}
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

export default EmployeeDocementsList;
