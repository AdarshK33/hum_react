import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";
import { SeparationContext } from "../../context/SepearationState";
// import { RoleManagementContext } from "../../context/RoleManagementState";
// import { AdminContext } from "../../context/AdminState";

const EmployeeExitList = () => {
  const {
    EmployeeSeparationListView,
    EmployeeSeparationList,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationView,
    ModeOfSeparationData,
    loader,
    total,
    changeEmployeeId,
    makeEmployeeDataNull,
    setEmpDataNull,
  } = useContext(EmployeeSeparationContext);
  const { MakeCostCenterDataNull } = useContext(SeparationContext);
  const { makeSearchEmp1DataNull } = useContext(OfferContext);
  const [actionStatus, setActionStatus] = useState("9");
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [employeeExitStatus, setEmployeeExitStatus] = useState("");

  useEffect(() => {
    EmployeeSeparationListView("all", pageCount, actionStatus);
  }, []);

  useEffect(() => {
    setEmpDataNull()
    MakeCostCenterDataNull()
  }, []);
  console.log("---->", EmployeeSeparationList);

  // useEffect(() => {
  //   if (
  //     EmployeeSeparationList !== null &&
  //     EmployeeSeparationList !== undefined
  //   ) {
  //     console.log("list");
  //     setCurrentRecords(EmployeeSeparationList);
  //   }
  // }, [EmployeeSeparationList, currentRecords]);
  // console.log("Records-->", currentRecords);

  useEffect(() => {
    if (
      EmployeeSeparationList &&
      EmployeeSeparationList !== null &&
      EmployeeSeparationList !== undefined &&
      Object.keys(EmployeeSeparationList).length !== 0 &&
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      if (EmployeeSeparationList.modeOfSeparationId === 1) {
        console.log(ModeOfSeparationData[0].modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      EmployeeSeparationList.map((rotate, r) => {
        ModeOfSeparationData.map((item, i) => {
          if (EmployeeSeparationList[r].modeOfSeparationId === 0) {
            EmployeeSeparationList[r].modeOfSeparationReasonId = " ";
          } else if (
            EmployeeSeparationList[r].modeOfSeparationId ===
            ModeOfSeparationData[i].modeOfSeparation.separationId
          ) {
            ModeOfSeparationData[i].modeOfSeparationReasonList.map(
              (item1, j) => {
                if (EmployeeSeparationList[r].modeOfSeparationReasonId === 0) {
                  EmployeeSeparationList[r].modeOfSeparationReasonId = " ";
                } else if (
                  EmployeeSeparationList[r].modeOfSeparationReasonId ===
                  ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                    .separationReasonId
                ) {
                  EmployeeSeparationList[r].modeOfSeparationReasonId =
                    ModeOfSeparationData[i].modeOfSeparationReasonList[
                      j
                    ].modeOfSeparationReason;
                  // console.log(
                  //   "sepp",
                  //   ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                  //     .modeOfSeparationReason
                  // );
                }
              }
            );
          }
        });
      });
      setCurrentRecords(EmployeeSeparationList);
    }
  }, [EmployeeSeparationList, ModeOfSeparationData]);

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
      EmployeeSeparationListView(searchValue, pageNumber - 1, actionStatus);
    } else {
      EmployeeSeparationListView("all", pageNumber - 1, actionStatus);
    }
    setCurrentRecords(EmployeeSeparationList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const statusHandler = (e) => {
    setEmployeeExitStatus(e.target.value);
    setActionStatus(e.target.value);
    setPageCount(0);
    setCurrentPage(1);
    setSearchValue("");
    if (e.target.value === "0") {
      EmployeeSeparationListView("all", 0, 0);
    } else if (e.target.value === "1") {
      EmployeeSeparationListView("all", 0, 1);
    } else if (e.target.value === "2") {
      EmployeeSeparationListView("all", 0, 2);
    } else if (e.target.value === "3") {
      EmployeeSeparationListView("all", 0, 3);
    } else if (e.target.value === "4") {
      EmployeeSeparationListView("all", 0, 4);
    } else if (e.target.value === "5") {
      EmployeeSeparationListView("all", 0, 5);
    } else if (e.target.value === "6") {
      EmployeeSeparationListView("all", 0, 6);
    } else if (e.target.value === "7") {
      EmployeeSeparationListView("all", 0, 7);
    } else if (e.target.value === "8") {
      EmployeeSeparationListView("all", 0, 8);
    } else {
      EmployeeSeparationListView("all", 0, 9);
    }
  };
  const searchDataHandler = () => {
    if (searchValue !== "") {
      EmployeeSeparationListView(searchValue, pageCount);
    } else {
      EmployeeSeparationListView("all", pageCount);
    }
  };

  const fetchEmployeeDetails = (employeeId) => {
    changeEmployeeId(employeeId);
    ViewEmployeeDataById(employeeId);
    ModeOfSeparationView();
    // viewCandidateId(candidateId);
    // verificationDocsView(candidateId);
    // personalInfo(candidateId);
    // viewRole();
    // CostCenter();
  };
  return (
    <Fragment>
      <Breadcrumb
        title="Employee Separation List"
        parent="Employee Separation List"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="card" style={{ overflowX: "auto" }}>
              <div
                className="title_bar"
                style={{ textAlign: "center", fontSize: "larger" }}
              >
                <Row>
                  <Col sm="8">
                    <b>EMPLOYEE SEPARATION LISTING</b>
                  </Col>
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
                  <Col sm={2}>
                    <div className="promotion_initiate">
                      <Link to="/manager-initiate-exit">
                        <Button className="apply-button btn btn-light mr-2">
                          Initiate Exit
                        </Button>
                      </Link>
                    </div>
                  </Col>
                  <Col sm={2}>
                    <Form>
                      <div className="promotion_status_search">
                        {/* className="faq-form mr-2""job-filter" */}
                        <Form.Group>
                          <Form.Control
                            as="select"
                            name="employeeExitStatus"
                            value={employeeExitStatus}
                            onChange={statusHandler}
                            // placeholder="Search.."
                            //   disabled={disabled}"

                            style={
                              false
                                ? { borderColor: "red" }
                                : { borderRadius: "20px" }
                            }
                          >
                            <option value="" disabled selected hidden>
                              Search status
                            </option>
                            <option value="9">All</option>
                            <option value="0">Resignation Applied</option>
                            <option value="1">Withdraw</option>
                            <option value="2">Resignation Confirmed</option>
                            <option value="3">Resignation Approved</option>
                            <option value="4">Terminated Confirmed</option>
                            <option value="5">Terminated Approved</option>
                            <option value="6">End of InternShip</option>
                            <option value="7">End of Probation</option>
                            <option value="8">Not Confirmed</option>
                          </Form.Control>
                        </Form.Group>
                        {/* <br></br> */}
                      </div>
                    </Form>
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
                      <th scope="col">Employee ID</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Contract Type</th>
                      <th scope="col">Resignation Date</th>
                      <th scope="col">Last Working Day</th>
                      <th scope="col">Reason for Resignation</th>
                      <th scope="col">Notice Period</th>
                      <th scope="col">Status</th>
                      <th scope="col">View</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {loader === true &&
                  EmployeeSeparationList !== null &&
                  EmployeeSeparationList !== undefined &&
                  ModeOfSeparationData !== null &&
                  ModeOfSeparationData !== undefined ? (
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
                    EmployeeSeparationList.length > 0 &&
                    ModeOfSeparationData !== null &&
                    ModeOfSeparationData !== undefined ? (
                    EmployeeSeparationList.map((item, i) => {
                      return (
                        <tbody key={item.candidateId}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.position}</td>
                            <td>{item.contractType}</td>
                            <td>
                              {item.dateOfResignation !== null &&
                              item.dateOfResignation !== undefined &&
                              item.dateOfResignation !== ""
                                ? item.dateOfResignation
                                : "NA"}
                            </td>
                            <td>
                              {item.lastWorkingDate !== null &&
                              item.lastWorkingDate !== undefined &&
                              item.lastWorkingDate !== ""
                                ? item.lastWorkingDate
                                : "NA"}
                            </td>
                            <td>{item.reasonForResignation}</td>
                            {/* <td>{item.modeOfSeparationReasonId}</td> */}
                            <td>
                              {item.contractType.toLowerCase() === "internship"
                                ? "NA"
                                : item.department == "AFS" ||
                                  item.department == "IT" ||
                                  item.department == "Legal" ||
                                  item.department == "Finance"
                                ? 2
                                : 1}
                            </td>
                            <td>
                              {item.status === 0
                                ? "Resignation Applied"
                                : item.status === 1
                                ? "Withdraw"
                                : item.status === 2
                                ? "Resignation Confirmed"
                                : item.status === 3
                                ? "Resignation Approved"
                                : item.status === 4
                                ? "Terminated Confirmed"
                                : item.status === 5
                                ? "Terminated Approved"
                                : item.status === 6
                                ? "End of InternShip"
                                : item.status === 7
                                ? "End of Probation"
                                : item.status === 8
                                ? "Not Confirmed"
                                : ""}
                            </td>
                            <td>
                              <Link to={"/exit-view/" + item.employeeId}>
                                <Eye
                                  onClick={() => {
                                    fetchEmployeeDetails(item.employeeId);
                                  }}
                                />
                              </Link>
                            </td>

                            <td>
                              {item.status == 2 ||
                              item.status == 3 ||
                              item.status == 4 ||
                              item.status == 5 ||
                              item.status == 6 ||
                              item.status == 7 ? (
                                <Edit2 />
                              ) : item.status == 8 ? (
                                <Link
                                  to={
                                    "/exit-initiate-action/" + item.employeeId
                                  }
                                >
                                  <Edit2
                                    onClick={() => {
                                      fetchEmployeeDetails(item.employeeId);
                                    }}
                                  />
                                </Link>
                              ) : (
                                <Link to={"/exit-action/" + item.employeeId}>
                                  <Edit2
                                    onClick={() => {
                                      fetchEmployeeDetails(item.employeeId);
                                    }}
                                  />
                                </Link>
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
      {EmployeeSeparationList !== null &&
        EmployeeSeparationList !== undefined &&
        ModeOfSeparationData !== null &&
        ModeOfSeparationData !== undefined &&
        Object.keys(ModeOfSeparationData).length !== 0 && (
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
