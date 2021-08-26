import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { OfferContext } from "../../../context/OfferState";
import { DisciplinaryContext } from "../../../context/DisciplinaryState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DocsVerifyContext } from "../../../context/DocverificationState";
import { RoleManagementContext } from "../../../context/RoleManagementState";
import { AdminContext } from "../../../context/AdminState";
import { AppContext } from "../../../context/AppState";
import { PermissionContext } from "../../../context/PermissionState";

import moment from "moment";
const ManagerDisciplinaryList = () => {
  const { candidateView, candidateList, viewCandidateId } =
    useContext(OfferContext);
  const { verificationDocsView, docsToVerify, personalInfo, personalInfoData } =
    useContext(DocsVerifyContext);
  const {
    disciplinaryListView,
    total,
    loader,
    disciplinaryListData,
    disciplinaryEmployeeSearch,
    disciplinarySearchData,
    MakedisciplinaryEmployeeSearchNull,
  } = useContext(DisciplinaryContext);
  const { rolePermission } = useContext(PermissionContext);
  const { user } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { RoleList, viewRole } = useContext(RoleManagementContext);
  const { costCenterList, CostCenter } = useContext(AdminContext);
  useEffect(() => {
    disciplinaryListView("all", pageCount);
    console.log("user role", user);
  }, []);

  // useEffect(() => {
  //   MakedisciplinaryEmployeeSearchNull();
  // }, []);

  useEffect(() => {
    if (disciplinaryListData !== null && disciplinaryListData !== undefined) {
      setCurrentRecords(disciplinaryListData);
    }
  }, [disciplinaryListData, currentRecords]);

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
      disciplinaryListView(searchValue, pageNumber - 1);
    } else {
      disciplinaryListView("all", pageNumber - 1);
    }
    setCurrentRecords(disciplinaryListData);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    setPageCount(0);
    setCurrentPage(1);
    if (searchValue !== "") {
      disciplinaryListView(searchValue, 0);
    } else {
      disciplinaryListView("all", 0);
    }
  };

  const fetchCandidateDetails = (candidateId) => {
    viewCandidateId(candidateId);
    verificationDocsView(candidateId);
    personalInfo(candidateId);
    viewRole();
    CostCenter();
  };
  function getDifferenceInDays(date1, date2) {
    const STdate = new Date(date1);
    const ENDdate = new Date(date2);
    const diffTime = ENDdate - STdate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");
    if (diffDays <= 0) {
      return true;
    } else {
      return false;
    }
  }
  // console.log(getDifferenceInDays("2021-07-03", "2021-07-04"));

  return (
    <Fragment>
      <Breadcrumb
        title="DISCIPLINARY ACTION LIST"
        parent="DISCIPLINARY ACTION LIST"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <b style={{ marginLeft: "320px" }}>DISCIPLINARY ACTION LIST</b>

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
                <Link to="/issue-show-cause-notice">
                  <Button className="apply-button btn btn-light mr-2">
                    Issue Show Cause Notice
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
                      <th scope="col">SL. No</th>
                      <th scope="col">Emp ID</th>
                      <th scope="col">Emp Name</th>
                      <th scope="col">Cost Center Name</th>
                      <th scope="col">Show Cause Date</th>
                      <th scope="col">Warning Issue Date</th>
                      <th scope="col">Issued For</th>
                      <th scope="col">Due Days</th>
                      <th scope="col">Employee Action</th>
                      <th scope="col">Status</th>
                      <th scope="col">PIP</th>
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
                            <td>{item.employeeCostCentre}</td>
                            <td>{item.disciplinaryAction.actionIssuedDate}</td>
                            <td>
                              {item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined
                                ? item.disciplinaryWarning.warningIssuedDate
                                : "NA"}
                            </td>
                            <td>{item.disciplinaryAction.reason}</td>
                            <td>{item.disciplinaryAction.actionDueDays}</td>
                            <td>
                              {item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined &&
                              item.disciplinaryWarning !== "" &&
                              (item.disciplinaryWarning.statusDesc ===
                                "Warning Letter Issued" ||
                                item.disciplinaryWarning.statusDesc ===
                                  "Warning Letter Approved")
                                ? "NA"
                                : item.disciplinaryAction.employeeActionStatus}
                            </td>
                            <td>
                              {item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined
                                ? item.disciplinaryWarning.statusDesc
                                : item.disciplinaryAction.statusDesc}
                            </td>
                            <td>
                              {item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined
                                ? item.disciplinaryWarning.improvementPeriod
                                : "NA"}
                            </td>
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
                            {(user !== null &&
                              user !== undefined &&
                              user.employeeId === item.initiatedBy &&
                              item.disciplinaryAction !== null &&
                              item.disciplinaryAction !== undefined &&
                              item.disciplinaryAction !== "" &&
                              (item.disciplinaryAction.employeeActionStatus ===
                                "Responded" ||
                                item.disciplinaryAction.actionDueDays === 0)) ||
                            (user !== null &&
                              user !== undefined &&
                              user.employeeId === item.initiatedBy &&
                              item.disciplinaryWarning !== null &&
                              item.disciplinaryWarning !== undefined &&
                              item.disciplinaryWarning !== "" &&
                              (item.disciplinaryWarning.statusDesc ===
                                "Warning Letter Issued" ||
                                item.disciplinaryWarning.statusDesc ===
                                  "Warning Letter Approved") &&
                              item.disciplinaryWarning.pipDueDays === 0) ? (
                              <td>
                                <Link
                                  to={
                                    `/manager-warning-action-view/` +
                                    item.employeeId
                                  }
                                >
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryAction.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                              </td>
                            ) : rolePermission == "costCenterManager" &&
                              item.disciplinaryAction !== null &&
                              item.disciplinaryAction !== undefined &&
                              item.disciplinaryAction !== "" &&
                              (item.disciplinaryAction.statusDesc ===
                                "Warning Letter Issued" ||
                                item.disciplinaryAction.statusDesc ===
                                  "Show Cause Notice Issued") ? (
                              <td>
                                {" "}
                                <Link
                                  to={"/disciplinary-action/" + item.employeeId}
                                >
                                  <Edit2
                                    onClick={() => {
                                      disciplinaryEmployeeSearch(
                                        item.disciplinaryAction.disciplinaryId
                                      );
                                    }}
                                  />
                                </Link>
                              </td>
                            ) : (
                              <td>
                                <Edit2 />
                              </td>
                            )}
                            {/* {user !== null &&
                            user !== undefined &&
                            rolePermission == "costCenterManager" ? (
                              <td>
                                {
                                  // item.disciplinaryAction.status !== 2
                                  item.disciplinaryAction !== null &&
                                  item.disciplinaryAction !== undefined &&
                                  item.disciplinaryAction !== "" &&
                                  (item.disciplinaryAction.statusDesc ===
                                    "Warning Letter Issued" ||
                                    item.disciplinaryAction.statusDesc ===
                                      "Show Cause Notice Issued") ? (
                                    <Link
                                      to={
                                        "/disciplinary-action/" +
                                        item.employeeId
                                      }
                                    >
                                      <Edit2
                                        onClick={() => {
                                          disciplinaryEmployeeSearch(
                                            item.disciplinaryAction
                                              .disciplinaryId
                                          );
                                        }}
                                      />
                                    </Link>
                                  ) : (
                                    <Edit2 />
                                  )
                                }
                              </td>
                            ) : (
                              <td>
                                {item.disciplinaryAction !== null &&
                                item.disciplinaryAction !== undefined &&
                                item.disciplinaryAction !== "" &&
                                item.disciplinaryAction.statusDesc ===
                                  "Employee Reason Accepted" ? (
                                  <Edit2 />
                                ) : item.disciplinaryAction !== null &&
                                  item.disciplinaryAction !== undefined &&
                                  item.disciplinaryAction !== "" &&
                                  item.disciplinaryAction.statusDesc ===
                                    "Issue Resolved" ? (
                                  <Edit2 />
                                ) : item.disciplinaryAction !== null &&
                                  item.disciplinaryAction !== undefined &&
                                  item.disciplinaryAction !== "" &&
                                  item.disciplinaryAction.statusDesc ===
                                    "Exit Initiated" ? (
                                  <Edit2 />
                                ) : item.disciplinaryAction !== null &&
                                  item.disciplinaryAction !== undefined &&
                                  item.disciplinaryAction !== "" &&
                                  item.disciplinaryWarning !== null &&
                                  item.disciplinaryWarning !== undefined &&
                                  item.disciplinaryWarning !== "" ? (
                                  (item.disciplinaryWarning.statusDesc ===
                                    "Warning Letter Issued" ||
                                    item.disciplinaryWarning.statusDesc ===
                                      "Warning Letter Approved") &&
                                  item.disciplinaryWarning.pipDueDays === 0 ? (
                                    <Link
                                      to={
                                        `/manager-warning-action-view/` +
                                        item.employeeId
                                      }
                                    >
                                      <Edit2
                                        onClick={() => {
                                          disciplinaryEmployeeSearch(
                                            item.disciplinaryAction
                                              .disciplinaryId
                                          );
                                        }}
                                      />
                                    </Link>
                                  ) : (
                                    <Edit2 />
                                  )
                                ) : item.disciplinaryAction !== null &&
                                  item.disciplinaryAction !== undefined &&
                                  item.disciplinaryAction !== "" &&
                                  (item.disciplinaryAction
                                    .employeeActionStatus === "Responded" ||
                                    item.disciplinaryAction.actionDueDays ===
                                      0) ? (
                                  //   ||
                                  // (
                                  //   new Date(
                                  //     item.disciplinaryWarning.pipEndDate
                                  //   ) - new Date()
                                  // ).getDate() < 15
                                  <Link
                                    to={
                                      `/manager-warning-action-view/` +
                                      item.employeeId
                                    }
                                  >
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
                                  // <Link
                                  //   to={
                                  //     `/manager-warning-action-view/` +
                                  //     item.employeeId
                                  //   }
                                  // >
                                  //   <Edit2
                                  //     onClick={() => {
                                  //       disciplinaryEmployeeSearch(
                                  //         item.disciplinaryAction.disciplinaryId
                                  //       );
                                  //     }}
                                  //   />
                                  // </Link>
                                )}
                              </td>
                            )} */}
                            {/* <td>
                              <Link
                                to={
                                  `/manager-warning-action-view/` +
                                  item.employeeId
                                }
                              >
                                <Edit2
                                  onClick={() => {
                                    disciplinaryEmployeeSearch(
                                      item.disciplinaryAction.disciplinaryId
                                    );
                                  }}
                                />
                              </Link>
                            </td> */}
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

export default ManagerDisciplinaryList;
