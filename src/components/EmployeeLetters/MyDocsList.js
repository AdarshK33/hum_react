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
import moment from "moment";
const EmployeeDocementsList = () => {
  const {
    MyDocsListView,
    myDocsListData,
    total,
    loader,
    MyDisciplinaryActionListView,
    myDiscilinaryListData,
  } = useContext(MyDocsContext);

  const {
    disciplinaryListView,
    disciplinaryListData,
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    MakedisciplinaryEmployeeSearchNull,
  } = useContext(DisciplinaryContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  useEffect(() => {
    if (fetchemployeeData !== null && fetchemployeeData !== undefined) {
      MyDisciplinaryActionListView(fetchemployeeData.employeeId, pageCount);
      console.log("user role", fetchemployeeData);
    }
  }, []);

  // useEffect(() => {
  //   MakedisciplinaryEmployeeSearchNull();
  // }, []);

  useEffect(() => {
    if (myDiscilinaryListData !== null && myDiscilinaryListData !== undefined) {
      setCurrentRecords(myDiscilinaryListData);
    }
  }, [myDiscilinaryListData, currentRecords]);
  console.log("myDiscilinaryListData", myDiscilinaryListData);

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
      MyDisciplinaryActionListView(searchValue, pageNumber - 1);
    } else {
      if (fetchemployeeData !== null && fetchemployeeData !== undefined) {
        MyDisciplinaryActionListView(fetchemployeeData.employeeId, pageNumber - 1);
      }
    }
    setCurrentRecords(myDiscilinaryListData);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      MyDisciplinaryActionListView(searchValue, 0);
    } else {
      if (fetchemployeeData !== null && fetchemployeeData !== undefined) {
        MyDisciplinaryActionListView(fetchemployeeData.employeeId, 0);
      }
    }
  };

  const fetchCandidateDetails = (candidateId) => {};
  return (
    <Fragment>
      <Breadcrumb
        title="MY DISCIPLINARY ACTION LIST"
        parent="MY DISCIPLINARY ACTION LIST"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b>MY DISCIPLINARY ACTION LIST </b>

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
                      <th scope="col">SL. No</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Show Cause Notice Issued Date</th>
                      {/* <th scope="col">Signed On</th> */}
                      <th scope="col">Due Days</th>
                      <th scope="col">Show Cause Status</th>
                      <th scope="col">Warning Letter Issue Date</th>
                      <th scope="col">PIP Start Date</th>
                      <th scope="col">PIP End Date</th>
                      <th scope="col">PIP Status</th>
                      <th scope="col">View</th>
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
                    currentRecords.length > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={item.employeeName}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeName}</td>
                            {item.disciplinaryAction !== null &&
                            item.disciplinaryAction !== undefined ? (
                              <td>
                                {item.disciplinaryAction.actionIssuedDate}
                              </td>
                            ) : (
                              <td></td>
                            )}
                            {item.disciplinaryAction !== null &&
                            item.disciplinaryAction !== undefined ? (
                              <td>{item.disciplinaryAction.actionDueDays}</td>
                            ) : (
                              <td></td>
                            )}
                            {item.disciplinaryAction !== null &&
                            item.disciplinaryAction !== undefined ? (
                              <td>
                                {item.disciplinaryAction.statusDesc ===
                                "Action Required By Employee"
                                  ? item.disciplinaryAction.statusDesc
                                  : item.disciplinaryAction
                                      .employeeActionStatus}
                              </td>
                            ) : (
                              <td></td>
                            )}
                            {item.disciplinaryWarning !== null &&
                            item.disciplinaryWarning !== undefined ? (
                              <td>
                                {item.disciplinaryWarning.warningIssuedDate}
                              </td>
                            ) : (
                              <td>NA</td>
                            )}
                            {item.disciplinaryWarning !== null &&
                            item.disciplinaryWarning !== undefined &&
                            item.disciplinaryWarning.pipEndDate !== null &&
                            item.disciplinaryWarning.pipEndDate !==
                              undefined ? (
                              <td>
                                {item.disciplinaryWarning.warningIssuedDate}
                              </td>
                            ) : (
                              <td>NA</td>
                            )}
                            {item.disciplinaryWarning !== null &&
                            item.disciplinaryWarning !== undefined &&
                            item.disciplinaryWarning.pipEndDate !== null &&
                            item.disciplinaryWarning.pipEndDate !==
                              undefined ? (
                              <td>{item.disciplinaryWarning.pipEndDate}</td>
                            ) : (
                              <td>NA</td>
                            )}
                            {/* {((item.disciplinaryAction !== null &&
                              item.disciplinaryAction !== undefined &&item.disciplinaryAction.statusDesc ===
                              "Exit Initiated") ||
                            (item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined&&(item.disciplinaryWarning.statusDesc === "NA" ||
                              item.disciplinaryWarning.statusDesc ===
                                "Exit Initiated"))) ? (
                                <td> NA</td>
                              ) : item.disciplinaryWarning !== null &&
                                item.disciplinaryWarning !== undefined ? (
                                // new Date(item.disciplinaryWarning.pipEndDate) -
                                // new Date()
                                moment(
                                  item.disciplinaryWarning.pipEndDate
                                ).isBefore(new Date()) === false ? (
                                  <td>PIP In-Progress</td>
                                ) : (
                                  <td> PIP Completed</td>
                                )
                              ) : (
                                <td>NA</td>
                              )
                            ) : (
                              <td>NA</td>
                            )} */}

                            {item.disciplinaryWarning !== null &&
                            item.disciplinaryWarning !== undefined &&
                            item.disciplinaryWarning.pipStatus !== null &&
                            item.disciplinaryWarning.pipStatus !== undefined 
                            ? (
                              <td>{item.disciplinaryWarning.pipStatus}</td>
                            ) : (
                              <td>NA</td>
                            )}
                             
                            <td>
                              <Link
                                to={
                                  "/disciplinary-view/" +
                                  item.disciplinaryAction.disciplinaryId
                                }
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
                              {item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined
                                ? item.disciplinaryWarning.statusDesc
                                : item.disciplinaryAction.statusDesc}
                            </td>
                            <td>{item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined && 
                              item.disciplinaryWarning.statusDesc === "Warning Letter Approved"
                             && item.disciplinaryWarning.ccmEsign === true
                              ?
                              <Link to="/letters/warning">
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryAction.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                                :
                              item.disciplinaryAction !== null &&
                              item.disciplinaryAction !== undefined &&
                              (item.disciplinaryAction.statusDesc ===
                                "Action Required By Employee" ||
                                item.disciplinaryAction.employeeActionStatus !==
                                  "Responded") &&
                              item.disciplinaryAction.statusDesc !==
                                "Exit Initiated" &&
                                item.disciplinaryAction.statusDesc !==
                                "Action Required By CCM" &&
                              item.disciplinaryAction.actionDueDays > 0 ? (
                                <Link to="/letters/show-cause">
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryAction.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Edit2 />
                              )}
                              {/* {item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined ? (
                                <Edit2 />
                              ) : item.disciplinaryAction !== null &&
                                item.disciplinaryAction !== undefined &&
                                item.disciplinaryAction.statusDesc !==
                                  "Exit Initiated" &&
                                item.disciplinaryAction.employeeActionStatus !==
                                  "Responded" ? (
                                <Link to="/letters/show-cause">
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryAction.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Edit2 />
                              )} */}
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
