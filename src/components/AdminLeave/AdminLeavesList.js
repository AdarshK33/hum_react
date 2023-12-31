import React, { useState, useEffect, useContext, Fragment } from "react";
import { Row, Button, Table } from "react-bootstrap";
import { LeaveContext } from "../../context/LeaveState";
import AdminLeaveEdit from "./AdminLeaveEdit";
import AdminDeleteLeaves from "./AdminDeleteLeaves";
import Breadcrumb from "../common/breadcrumb";
import "./AdminLeaves.css";
import "../../assets/css/search.css";
import Pagination from "react-js-pagination";
import { Edit2, Trash2, Search } from "react-feather";
import AdminLeaveAdd from "./AdminLeaveAdd";
import moment from 'moment'
const AdminLeavesList = (props) => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  let [leaveTypeId, setLeaveTypeId] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [ltId, setltId] = useState();
  const [empId, setEmpId] = useState();
  const [reason, setReason] = useState();
  const [searchValue, setSearchValue] = useState(false);
  const [searchLeaveList, setLeaveList] = useState();

  const [pageCount, setPageCount] = useState(0);
  const [searchPageCount, setSearchPageCount] = useState(0);

  const {
    viewList,
    leaveList,
    loader,
    adminTotal,
    viewListSearch,
    viewEmpLeaveData,
    leaveEmpList,
    total,
  } = useContext(LeaveContext);

  const [currentRecords, setCurrentRecords] = useState([]);

  /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchPage, setSearchCurrentPage] = useState(1);
  const [searchClick, setSearchClick] = useState(false);

  const recordPerPage = 10;
  const totalRecords = adminTotal;
  const pageRange = 10;
  const searchTotal = total;

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const indexOfSearchLastRecord = currentSearchPage * recordPerPage;
  const indexOfSearchFirstRecord = indexOfSearchLastRecord - recordPerPage;
  /* const currentRecords = searchLeaveList !== undefined && searchLeaveList !== null ? searchLeaveList.slice(indexOfFirstRecord, indexOfLastRecord) : []; */

  const handlePageChange = (pageNumber) => {
    setPageCount(pageNumber - 1);
    setCurrentPage(pageNumber);
    console.log("searchValue pagination", searchValue);
    if (searchValue !== "") {
      //   viewListSearch(searchValue);
      viewEmpLeaveData(searchValue, pageNumber - 1);
    } else {
      viewList(pageNumber - 1);
    }
    console.log("pageNumber", pageNumber);
  };

  const handleSearchPageChange = (pageNumber) => {
    setSearchPageCount(pageNumber - 1);
    setSearchCurrentPage(pageNumber);
    console.log("searchValue pagination", searchValue);
    if (searchValue !== "") {
      //   viewListSearch(searchValue);
      viewEmpLeaveData(searchValue, pageNumber - 1);
    } else {
      viewList(pageNumber - 1);
    }
    console.log("pageNumber", pageNumber);
  };

  /*-----------------Pagination------------------*/

  const handleClose = () => {
    setModal(false);
    setCurrentPage(1);
  };
  const handleShow = () => setModal(true);

  const handleEditClose = () => setEditModal(false);
  const handleDeleteClose = () => setDeleteModal(false);

  useEffect(() => {
    viewList(pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (leaveList !== undefined && leaveList !== null && leaveList.length > 0) {
      setLeaveList(leaveList);
      setCurrentRecords(leaveList);
    }
  }, [leaveList]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      // viewListSearch(searchValue);
      console.log("searchValue", searchValue);
      viewEmpLeaveData(searchValue, searchPageCount);
      setSearchClick(true);
    } else {
      console.log("searchValue else", searchValue);
      viewList(pageCount);
      setSearchClick(false);
    }
  };
  console.log("search Click", searchClick, leaveEmpList);
  /*  useEffect(() => {
        if (empIdSearchList !== undefined && empIdSearchList !== null && empIdSearchList.length > 0) {
            setLeaveList(empIdSearchList);
            setCurrentRecords(empIdSearchList)
        }
    }, [empIdSearchList]) */

  return (
    <Fragment>
      <Breadcrumb title="Admin " parent="Admin Leave" />
      <div className="container-fluid">
        <Row className="heading-row">
          <h5 className="main-heading">Admin Leaves</h5>
        </Row>
        <Row>
          <div className="col-sm-12">
            <div className="card" style={{ overflowX: "auto" }}>
              <div className="title_bar">
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
                <Button
                  className="apply-button btn btn-light mr-2"
                  onClick={handleShow}
                >
                  Apply
                </Button>
              </div>
              <AdminLeaveAdd
                handleClose={handleClose}
                modal={modal}
                pageNumber={pageCount}
              />
              <div className="table-responsive">
                <Table id="table-to-xls" className="table table-hover">
                  <thead
                    className="thead-light"
                    style={{ backgroundColor: "#2f3c4e" }}
                  >
                    <tr>
                      <th>S. No</th>
                      <th>Employee Id</th>
                      <th>Leave Type</th>
                      <th>Total No. of Days</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  {loader === true &&
                  currentRecords !== null &&
                  currentRecords !== undefined ? (
                    <tbody>
                      <tr>
                        <td colspan="6">
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
                  ) : searchClick === false &&
                    currentRecords !== undefined &&
                    currentRecords !== null &&
                    currentRecords.length > 0 ? (
                    currentRecords.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.empId}</td>
                            <td>
                              {item.leaveTypeId === 1
                                ? "General"
                                : item.leaveTypeId === 2
                                ? "Paternity"
                                : item.leaveTypeId === 3
                                ? "Maternity"
                                : item.leaveTypeId === 0
                                ? "LOP"
                                : ""}
                            </td>
                            <td>{item.numberOfDays}</td>
                            <td>{item.fromDate}</td>
                            <td>{item.toDate}</td>
                            <td>
                              {item.leaveTypeId === 3 ||moment(item.fromDate).format("YYYY-MM-DD") <= moment(moment(), "YYYY-MM-DD").subtract("30", "d").format("YYYY-MM-DD") ? (
                                <Edit2
                                  disabled
                                  style={{ color: "lightgray" }}
                                />
                              ) : (
                                <Edit2
                                  onClick={() => {
                                    setEditModal(true);
                                    setLeaveTypeId(item.leaveTypeId);
                                    setFromDate(item.fromDate);
                                    setToDate(item.toDate);
                                    setReason(item.reason);
                                    setltId(item.ltId);
                                    setEmpId(item.empId);
                                  }}
                                />
                              )}
                            </td>
                            <td>
                              {item.leaveTypeId === 3 || moment(item.fromDate).format("YYYY-MM-DD") <= moment(moment(), "YYYY-MM-DD").subtract("30", "d").format("YYYY-MM-DD") ? (
                                <Trash2
                                  disabled
                                  style={{ color: "lightgray" }}
                                />
                              ) : (
                                <Trash2
                                  onClick={() => {
                                    setDeleteModal(true);
                                    setltId(item.ltId);
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : searchClick === true &&
                    leaveEmpList !== undefined &&
                    leaveEmpList !== null &&
                    leaveEmpList.length > 0 ? (
                    leaveEmpList.map((item, i) => {
                      return (
                        <tbody key={i + 1}>
                          <tr>
                            <td>{i + 1 + indexOfSearchFirstRecord}</td>
                            <td>{item.empId}</td>
                            <td>
                              {item.leaveTypeId === 1
                                ? "General"
                                : item.leaveTypeId === 2
                                ? "Paternity"
                                : item.leaveTypeId === 3
                                ? "Maternity"
                                : item.leaveTypeId === 0
                                ? "LOP"
                                : ""}
                            </td>
                            <td>{item.numberOfDays}</td>
                            <td>{item.fromDate}</td>
                            <td>{item.toDate}</td>
                            <td>
                              {item.leaveTypeId === 3|| moment(item.fromDate).isBefore(moment( moment().subtract(30, 'days') ).format("YYYY-MM-DD")) ? (
                                <Edit2
                                  disabled
                                  style={{ color: "lightgray" }}
                                />
                              ) : (
                                <Edit2
                                  onClick={() => {
                                    setEditModal(true);
                                    setLeaveTypeId(item.leaveTypeId);
                                    setFromDate(item.fromDate);
                                    setToDate(item.toDate);
                                    setReason(item.reason);
                                    setltId(item.ltId);
                                    setEmpId(item.empId);
                                  }}
                                />
                              )}
                            </td>
                            <td>
                              {item.leaveTypeId === 3 ? (
                                <Trash2
                                  disabled
                                  style={{ color: "lightgray" }}
                                />
                              ) : (
                                <Trash2
                                  onClick={() => {
                                    setDeleteModal(true);
                                    setltId(item.ltId);
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colspan="6">No Record Found</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
                {/*  {(leaveList === null ) ? 
                                <p style={{ textAlign: "center" }}>No Record Found</p> : null} */}
              </div>
            </div>
          </div>
          <AdminDeleteLeaves
            handleDeleteClose={handleDeleteClose}
            modal={deleteModal}
            ltId={ltId}
            pageNumber={pageCount}
          />
          <AdminLeaveEdit
            handleEditClose={handleEditClose}
            modal={editModal}
            leaveTypeId={
              leaveTypeId === 0 || leaveTypeId === 1
                ? (leaveTypeId = 1)
                : leaveTypeId === 2
                ? (leaveTypeId = 2)
                : leaveTypeId === 3
                ? (leaveTypeId = 3)
                : ""
            }
            fromDate={fromDate}
            toDate={toDate}
            reason={reason}
            ltId={ltId}
            empId={empId}
            pageNumber={pageCount}
          />
        </Row>
      </div>
      {searchClick === false &&
        leaveList !== undefined &&
        leaveList !== null && (
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

      {searchClick === true &&
        leaveEmpList !== undefined &&
        leaveEmpList !== null && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentSearchPage}
            itemsCountPerPage={recordPerPage}
            totalItemsCount={searchTotal}
            pageRangeDisplayed={pageRange}
            onChange={handleSearchPageChange}
            firstPageText="First"
            lastPageText="Last"
          />
        )}
    </Fragment>
  );
};

export default AdminLeavesList;
