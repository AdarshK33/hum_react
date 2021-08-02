import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Edit2, Eye, Search } from "react-feather";
import { OfferContext } from "../../context/OfferState";
import Pagination from "react-js-pagination";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EmployeeSeparationContext } from "../../context/EmployeeSeparationState";

const ExitListing = () => {
  const {
    EmployeeSeparationExitList,
    EmployeeSeparationListExitView,
    ViewEmployeeDataById,
    employeeData,
    ModeOfSeparationView,
    ModeOfSeparationData,
    loader,
    total,
    changeEmployeeId,
  } = useContext(EmployeeSeparationContext);

  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    EmployeeSeparationListExitView("all", pageCount,9);
  }, []);

  console.log("---->", EmployeeSeparationExitList);

  // useEffect(() => {
  //   if (
  //     EmployeeSeparationExitList !== null &&
  //     EmployeeSeparationExitList !== undefined
  //   ) {
  //     console.log("list");
  //     setCurrentRecords(EmployeeSeparationExitList);
  //   }
  // }, [EmployeeSeparationExitList, currentRecords]);
  // console.log("Records-->", currentRecords);

  useEffect(() => {
    if (
      EmployeeSeparationExitList &&
      EmployeeSeparationExitList !== null &&
      EmployeeSeparationExitList !== undefined &&
      Object.keys(EmployeeSeparationExitList).length !== 0 &&
      ModeOfSeparationData &&
      ModeOfSeparationData !== null &&
      ModeOfSeparationData !== undefined &&
      Object.keys(ModeOfSeparationData).length !== 0
    ) {
      if (EmployeeSeparationExitList.modeOfSeparationId === 1) {
        console.log(ModeOfSeparationData[0].modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparation.modeOfSeparation);
        console.log(ModeOfSeparationData[0].modeOfSeparationReasonList);
      }
      EmployeeSeparationExitList.map((rotate, r) => {
        ModeOfSeparationData.map((item, i) => {
          if (
            EmployeeSeparationExitList[r].modeOfSeparationId ===
            ModeOfSeparationData[i].modeOfSeparation.separationId
          ) {
            // console.log(
            //   "seww",
            //   ModeOfSeparationData[i].modeOfSeparation.modeOfSeparation
            // );

            ModeOfSeparationData[i].modeOfSeparationReasonList.map(
              (item1, j) => {
                if (EmployeeSeparationExitList[r].modeOfSeparationReasonId === 0) {
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId = "";
                } else if (
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId ===
                  ModeOfSeparationData[i].modeOfSeparationReasonList[j]
                    .separationReasonId
                ) {
                  EmployeeSeparationExitList[r].modeOfSeparationReasonId =
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
      setCurrentRecords(EmployeeSeparationExitList);
    }
  }, [EmployeeSeparationExitList, ModeOfSeparationData]);

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
      EmployeeSeparationListExitView(searchValue, pageNumber - 1,9);
    } else {
      EmployeeSeparationListExitView("all", pageNumber - 1,9);
    }
    setCurrentRecords(EmployeeSeparationExitList);
  };

  /*-----------------Pagination------------------*/
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchDataHandler = () => {
    if (searchValue !== "") {
      EmployeeSeparationListExitView(searchValue, pageCount,9);
    } else {
      EmployeeSeparationListExitView("all", pageCount,9);
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
    console.log(EmployeeSeparationExitList),
    (
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
                  {/* <Link to="/manager-initiate-exit">
                    <Button className="apply-button btn btn-light mr-2">
                      Initiate Exit
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
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Contract Type</th>
                        <th scope="col">Resignation Date</th>
                        <th scope="col">Last Working Day</th>
                        <th scope="col">Reason for Resignation</th>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Notice Period</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {loader === true &&
                    EmployeeSeparationExitList !== null &&
                    EmployeeSeparationExitList !== undefined &&
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
                    ) : EmployeeSeparationExitList !== undefined &&
                      EmployeeSeparationExitList !== null &&
                      EmployeeSeparationExitList.length > 0 &&
                      ModeOfSeparationData !== null &&
                      ModeOfSeparationData !== undefined ? (
                      EmployeeSeparationExitList.map((item, i) => {
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
                              <td>{item.managerName}</td>
                              <td>{item.contractType.toLowerCase() === 'internship' ?"NA":
                            (item.department == "AFS" ||item.department == "IT" ||item.department == "Legal" ||item.department == "Finance")?2:1}</td>

                              <td>
                                {(item.status === 3||item.status === 5)?<Edit2/>:(item.status === 0 ||item.status === 8)?<Link to={"/exit-action/" + item.employeeId}>
                                  <Edit2
                                    onClick={() => {
                                      fetchEmployeeDetails(item.employeeId);
                                    }}
                                  />
                                </Link>:<Link to={"/employee-info/" + item.employeeId}>
                                  <Edit2
                                    onClick={() => {
                                      fetchEmployeeDetails(item.employeeId);
                                    }}
                                  />
                                </Link>}
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
        {EmployeeSeparationExitList !== null &&
          EmployeeSeparationExitList !== undefined &&
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
    )
  );
};

export default ExitListing;
